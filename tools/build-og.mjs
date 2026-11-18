/**
 * Gera a imagem de compartilhamento (public/og.png, 1200x630).
 * Usa os mesmos arquivos de marca e as mesmas fontes do site.
 *   node tools/build-og.mjs
 */
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

// o Playwright nao e dependencia do projeto: e resolvido da instalacao
// disponivel na maquina, para nao pesar o node_modules do site
const exigir = createRequire(import.meta.url);
let chromium;
try {
  ({ chromium } = exigir('playwright'));
} catch {
  console.error(
    'Playwright nao encontrado. Instale com `npm i -D playwright` e rode de novo,\n' +
    'ou mantenha o public/og.png que ja esta versionado.',
  );
  process.exit(1);
}

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const b64 = (p) => readFileSync(join(raiz, p)).toString('base64');
const logo = readFileSync(join(raiz, 'public/brand/carolize-principal.svg'), 'utf8');
const simbolo = readFileSync(join(raiz, 'public/brand/carolize-simbolo.svg'), 'utf8');

const html = `<!doctype html><meta charset="utf-8"><style>
@font-face{font-family:F;src:url(data:font/woff2;base64,${b64('public/fonts/fraunces-latin.woff2')}) format('woff2');font-weight:300 900}
@font-face{font-family:A;src:url(data:font/woff2;base64,${b64('public/fonts/archivo-latin.woff2')}) format('woff2');font-weight:300 800}
@font-face{font-family:M;src:url(data:font/woff2;base64,${b64('public/fonts/dmmono-latin.woff2')}) format('woff2');font-weight:400}
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;background:#FFF9F5;position:relative;overflow:hidden;
  display:flex;flex-direction:column;justify-content:space-between;padding:66px 72px;font-family:A}
.ruido{position:absolute;inset:0;opacity:.5;mix-blend-mode:multiply;pointer-events:none;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.82' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.16'/%3E%3C/svg%3E")}
.topo{display:flex;justify-content:space-between;align-items:center;
  font-family:M;font-size:15px;letter-spacing:.2em;text-transform:uppercase;color:#8a8080;
  border-bottom:1px solid rgba(36,36,36,.14);padding-bottom:22px}
.topo b{color:#D77D91;font-weight:400}
.logo{width:760px}.logo svg{width:100%;height:auto;display:block}
.frase{font-family:F;font-variation-settings:'opsz' 90,'SOFT' 15;font-size:40px;line-height:1.18;
  font-weight:400;letter-spacing:-.018em;color:#242424;max-width:21ch}
.base{display:flex;justify-content:space-between;align-items:flex-end;gap:40px}
.sim{width:84px;opacity:.95}.sim svg{width:100%;height:auto}
</style>
<div class="ruido"></div>
<div class="topo"><span>Marketing digital · Branding · Conteúdo</span><b>Estúdio independente</b></div>
<div class="logo">${logo}</div>
<div class="base">
  <p class="frase">Marcas têm histórias. A gente transforma a maneira como elas são contadas.</p>
  <div class="sim">${simbolo}</div>
</div>`;

const navegador = await chromium.launch({ args: ['--no-sandbox'] });
const pagina = await navegador.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await pagina.setContent(html, { waitUntil: 'networkidle' });
await pagina.evaluate(() => document.fonts.ready);
await pagina.waitForTimeout(400);
const bruto = await pagina.screenshot();
await navegador.close();

// o ruido de papel infla o PNG: quantizar derruba o peso sem perda visivel
const { default: sharp } = await import('sharp');
const destino = join(raiz, 'public/og.png');
await sharp(bruto).png({ palette: true, colours: 128, compressionLevel: 9 }).toFile(destino);
const { size } = await import('node:fs').then((m) => m.promises.stat(destino));
console.log(`public/og.png gerado (1200x630, ${Math.round(size / 1024)} kB)`);
