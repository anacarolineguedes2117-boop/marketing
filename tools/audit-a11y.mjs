/**
 * Auditoria de acessibilidade (WCAG 2.1 AA) de todas as paginas.
 *
 *   npm run dev          # em outro terminal
 *   npm run a11y
 *
 * Revela o conteudo antes de auditar: as animacoes de entrada escondem
 * elementos no estado inicial e falseariam o resultado.
 */
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const exigir = createRequire(import.meta.url);

let chromium;
try {
  ({ chromium } = exigir('playwright'));
} catch {
  console.error('Playwright nao encontrado. Instale com `npm i -D playwright`.');
  process.exit(1);
}

const base = process.argv[2] ?? 'http://127.0.0.1:4321';
const rotas = ['/', '/projetos', '/projetos/flora-silvestre', '/marca', '/proposta', '/404'];
const axe = readFileSync(join(raiz, 'node_modules/axe-core/axe.min.js'), 'utf8');

const navegador = await chromium.launch({ args: ['--no-sandbox'] });
let totais = 0;

for (const largura of [390, 1440]) {
  console.log(`\n── ${largura}px ──────────────────────────────────────`);
  for (const rota of rotas) {
    const pagina = await navegador.newPage({
      viewport: { width: largura, height: 900 },
      isMobile: largura < 700,
    });
    try {
      await pagina.goto(base + rota, { waitUntil: 'networkidle' });
      await pagina.addStyleTag({ content: 'astro-dev-toolbar{display:none!important}' });
      await pagina.evaluate(() =>
        document.querySelectorAll('[data-revelar]').forEach((e) => e.setAttribute('data-visivel', '')),
      );
      await pagina.waitForTimeout(350);
      await pagina.addScriptTag({ content: axe });
      const r = await pagina.evaluate(() =>
        window.axe.run(document, {
          runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'] },
        }),
      );
      totais += r.violations.length;
      const marca = r.violations.length === 0 ? '✓' : '✗';
      console.log(`${marca} ${rota.padEnd(28)} ${r.violations.length} violacoes`);
      for (const v of r.violations) {
        console.log(`    [${v.impact}] ${v.id} — ${v.help} (${v.nodes.length}x)`);
        v.nodes.slice(0, 2).forEach((n) => console.log(`        ${n.target.join(' ')}`));
      }
    } catch (e) {
      console.log(`! ${rota.padEnd(28)} ${e.message.split('\n')[0]}`);
    }
    await pagina.close();
  }
}

await navegador.close();
console.log(totais === 0 ? '\nTudo limpo.\n' : `\n${totais} violacoes no total.\n`);
process.exit(totais === 0 ? 0 : 1);
