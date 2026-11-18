import type { APIRoute } from 'astro';
import { site } from '~/data/site';

export const GET: APIRoute = () =>
  new Response(
    [
      'User-agent: *',
      'Allow: /',
      // páginas internas: propostas comerciais não entram em buscador
      'Disallow: /proposta',
      '',
      `Sitemap: ${new URL('sitemap.xml', site.url).href}`,
      '',
    ].join('\n'),
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
