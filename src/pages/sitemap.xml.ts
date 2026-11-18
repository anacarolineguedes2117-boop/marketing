import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site } from '~/data/site';

export const GET: APIRoute = async () => {
  const projetos = await getCollection('projetos', (p) => p.data.publicado);
  const rotas = ['/', '/projetos', '/marca', ...projetos.map((p) => `/projetos/${p.id}`)];
  const hoje = new Date().toISOString().slice(0, 10);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${rotas
  .map(
    (r) => `  <url>
    <loc>${new URL(r, site.url).href}</loc>
    <lastmod>${hoje}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${r === '/' ? '1.0' : '0.7'}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
