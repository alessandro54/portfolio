// @ts-check
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

import tailwindcss from '@tailwindcss/vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  prefetch: { defaultStrategy: 'hover' },
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@components': path.resolve(__dirname, './src/components'),
        '@sections': path.resolve(__dirname, './src/sections'),
        '@lib': path.resolve(__dirname, './src/lib'),
        '@layouts': path.resolve(__dirname, './src/layouts'),
        '@i18n': path.resolve(__dirname, './src/i18n'),
      },
    },
    server: {
      allowedHosts: ['watts-private-minnesota-phantom.trycloudflare.com']
    }
  }
});
