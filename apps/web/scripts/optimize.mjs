import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';
import subsetFont from 'subset-font';
import { minify } from 'html-minifier-terser';

const DIST = join(import.meta.dirname, '..', 'dist');
const FONTS_DIR = join(DIST, 'fonts');

// ── 1. Minify HTML ──────────────────────────────────
function findHTML(dir) {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...findHTML(full));
    else if (entry.name.endsWith('.html')) files.push(full);
  }
  return files;
}

let totalHTMLSaved = 0;
for (const file of findHTML(DIST)) {
  const original = readFileSync(file, 'utf-8');
  const minified = await minify(original, {
    collapseWhitespace: true,
    removeComments: true,
    removeRedundantAttributes: true,
    removeEmptyAttributes: true,
    minifyCSS: true,
    minifyJS: true,
    collapseBooleanAttributes: true,
    sortAttributes: true,
    sortClassName: true,
  });
  writeFileSync(file, minified);
  const saved = Buffer.byteLength(original) - Buffer.byteLength(minified);
  totalHTMLSaved += saved;
}
console.log(`[optimize] HTML minified: −${totalHTMLSaved} bytes`);

// ── 2. Subset fonts ─────────────────────────────────
function collectChars(dir) {
  const chars = new Set();
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      for (const c of collectChars(full)) chars.add(c);
    } else if (entry.name.endsWith('.html')) {
      const text = readFileSync(full, 'utf-8').replace(/<[^>]*>/g, '');
      for (const c of text) chars.add(c);
    }
  }
  return chars;
}

const chars = collectChars(DIST);
const safeChars = ' !"#$%&\'()*+,-./0123456789:;<=>?@[\\]^_`{|}~';
for (const c of safeChars) chars.add(c);
const text = [...chars].join('');
console.log(`[optimize] ${chars.size} unique font characters`);

const fontFiles = readdirSync(FONTS_DIR).filter((f) => f.endsWith('.woff2'));
for (const file of fontFiles) {
  const fontPath = join(FONTS_DIR, file);
  const original = readFileSync(fontPath);
  const subset = await subsetFont(original, text, { targetFormat: 'woff2' });
  writeFileSync(fontPath, subset);
  console.log(`[optimize] ${file}: ${original.length} → ${subset.length} bytes (−${((original.length - subset.length) / original.length * 100).toFixed(0)}%)`);
}

// ── 3. Build report ─────────────────────────────────
function dirSize(dir, ext) {
  let total = 0;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) total += dirSize(full, ext);
    else if (!ext || entry.name.endsWith(ext)) total += statSync(full).size;
  }
  return total;
}

const jsSize = dirSize(join(DIST, '_astro'), '.js');
const cssSize = dirSize(join(DIST, '_astro'), '.css');
const fontSize = dirSize(join(DIST, 'fonts'), '.woff2');
const htmlSize = findHTML(DIST).reduce((s, f) => s + statSync(f).size, 0);

const total = jsSize + cssSize + fontSize + htmlSize;
console.log(`\n[optimize] ═══ BUILD REPORT ═══`);
console.log(`  JS:    ${(jsSize / 1024).toFixed(1)} KiB`);
console.log(`  CSS:   ${(cssSize / 1024).toFixed(1)} KiB`);
console.log(`  Fonts: ${(fontSize / 1024).toFixed(1)} KiB`);
console.log(`  HTML:  ${(htmlSize / 1024).toFixed(1)} KiB`);
console.log(`  TOTAL: ${(total / 1024).toFixed(1)} KiB raw`);

// Budget check
const BUDGET = 200 * 1024; // 200 KiB raw budget (compresses to ~40 KiB)
if (total > BUDGET) {
  console.log(`  ⚠️  OVER BUDGET by ${((total - BUDGET) / 1024).toFixed(1)} KiB`);
} else {
  console.log(`  ✓  Under budget (${((BUDGET - total) / 1024).toFixed(1)} KiB headroom)`);
}
