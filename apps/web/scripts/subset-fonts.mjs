import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';
import subsetFont from 'subset-font';

const DIST = join(import.meta.dirname, '..', 'dist');
const FONTS_DIR = join(DIST, 'fonts');

// 1. Collect all text from built HTML files
function collectChars(dir) {
  const chars = new Set();
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      for (const c of collectChars(full)) chars.add(c);
    } else if (entry.name.endsWith('.html')) {
      const html = readFileSync(full, 'utf-8');
      // Strip HTML tags, keep text content
      const text = html.replace(/<[^>]*>/g, '');
      for (const c of text) chars.add(c);
    }
  }
  return chars;
}

const chars = collectChars(DIST);

// Always include basic punctuation + digits even if not in current content
const safeChars = ' !"#$%&\'()*+,-./0123456789:;<=>?@[\\]^_`{|}~';
for (const c of safeChars) chars.add(c);

const text = [...chars].join('');
console.log(`[subset-fonts] ${chars.size} unique characters collected`);

// 2. Subset each woff2 font in dist/fonts/
const fontFiles = readdirSync(FONTS_DIR).filter((f) => f.endsWith('.woff2'));

for (const file of fontFiles) {
  const fontPath = join(FONTS_DIR, file);
  const original = readFileSync(fontPath);
  const originalSize = original.length;

  const subset = await subsetFont(original, text, { targetFormat: 'woff2' });
  writeFileSync(fontPath, subset);

  const saved = originalSize - subset.length;
  const pct = ((saved / originalSize) * 100).toFixed(1);
  console.log(
    `[subset-fonts] ${file}: ${originalSize} → ${subset.length} bytes (−${saved} bytes, −${pct}%)`,
  );
}

console.log('[subset-fonts] done');
