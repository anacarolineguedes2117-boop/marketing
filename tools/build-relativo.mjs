/**
 * Reescreve o build para caminhos relativos.
 *
 * O site publicado num dominio proprio usa caminhos absolutos (/marca,
 * /fonts/...). Para abrir de dentro de uma subpasta — pre-visualizacao,
 * pendrive, abrir o arquivo direto no navegador — tudo precisa ser relativo.
 *
 *   npm run build && node tools/build-relativo.mjs [pasta]
 *
 * Trabalha sobre uma copia em dist-relativo/, deixando dist/ intacto.
 */
import { cp, readFile, writeFile, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative, posix } from 'node:path';
import { glob } from 'node:fs/promises';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const origem = join(raiz, 'dist');
const destino = join(raiz, process.argv[2] ?? 'dist-relativo');

await rm(destino, { recursive: true, force: true });
await cp(origem, destino, { recursive: true });

/** Resolve uma URL absoluta do site para o arquivo correspondente. */
function arquivoDe(url) {
  const limpo = url.replace(/^\//, '').split(/[?#]/)[0];
  if (limpo === '') return 'index.html';
  if (existsSync(join(destino, limpo)) && limpo.includes('.')) return limpo;
  if (existsSync(join(destino, limpo, 'index.html'))) return posix.join(limpo, 'index.html');
  if (existsSync(join(destino, limpo + '.html'))) return limpo + '.html';
  return null;
}

/** Caminho relativo de `dePagina` ate `paraArquivo`, ambos a partir da raiz. */
function relativizar(dePagina, paraArquivo) {
  const base = posix.dirname(dePagina);
  const r = posix.relative(base, paraArquivo);
  return r.startsWith('.') ? r : './' + r;
}

let paginas = 0, trocas = 0;

for await (const caminho of glob('**/*.html', { cwd: destino })) {
  const abs = join(destino, caminho);
  let html = await readFile(abs, 'utf8');
  const pagina = caminho.split(/[\\/]/).join('/');

  html = html.replace(/(href|src|content)="(\/[^"]*)"/g, (todo, attr, url) => {
    // metadados de SEO precisam continuar absolutos
    if (attr === 'content' && !url.startsWith('/')) return todo;
    const [caminhoUrl, ancora = ''] = url.split('#');
    const alvo = arquivoDe(caminhoUrl);
    if (!alvo) return todo;
    trocas++;
    const rel = relativizar(pagina, alvo) + (ancora ? '#' + ancora : '');
    return `${attr}="${rel}"`;
  });

  await writeFile(abs, html);
  paginas++;
}

// os @font-face vivem no CSS empacotado, sempre em _astro/
for await (const caminho of glob('**/*.css', { cwd: destino })) {
  const abs = join(destino, caminho);
  let css = await readFile(abs, 'utf8');
  const pagina = caminho.split(/[\\/]/).join('/');
  css = css.replace(/url\((\/[^)"']+)\)/g, (todo, url) => {
    const alvo = arquivoDe(url);
    if (!alvo) return todo;
    trocas++;
    return `url(${relativizar(pagina, alvo)})`;
  });
  await writeFile(abs, css);
}

console.log(`${paginas} páginas · ${trocas} caminhos relativizados → ${relative(raiz, destino)}/`);
