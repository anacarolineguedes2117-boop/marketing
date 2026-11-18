import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://carolize.com.br',
  trailingSlash: 'ignore',
  build: { inlineStylesheets: 'auto', format: 'directory' },
  prefetch: { prefetchAll: true, defaultStrategy: 'viewport' },
  compressHTML: true,
  vite: {
    build: { cssMinify: 'lightningcss', assetsInlineLimit: 2048 },
  },
});
