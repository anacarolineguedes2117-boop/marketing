import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://carolize.com.br',
  trailingSlash: 'ignore',
  build: {
    inlineStylesheets: 'auto',
    format: 'directory',
    // 'assets' em vez do padrao '_astro': pastas iniciadas por underscore sao
    // ignoradas ou reservadas por varias hospedagens estaticas
    assets: 'assets',
  },
  prefetch: { prefetchAll: true, defaultStrategy: 'viewport' },
  compressHTML: true,
  vite: {
    build: { cssMinify: 'lightningcss', assetsInlineLimit: 2048 },
  },
});
