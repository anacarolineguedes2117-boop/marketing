/* ============================================================================
   CAROLIZE — configuracao geral
   ----------------------------------------------------------------------------
   EDITE ESTE ARQUIVO para trocar contatos, redes e textos institucionais.
   Nenhuma outra parte do codigo precisa ser alterada.
   ========================================================================= */

export const site = {
  nome: 'CAROLIZE',
  assinatura: 'Marketing Digital por Carol Guedes',
  autora: 'Carol Guedes',

  /** Dominio final do site. Usado em SEO, sitemap e links absolutos. */
  url: 'https://carolize.com.br',

  /** Aparece na aba do navegador e em resultados de busca. */
  titulo: 'CAROLIZE — Marketing Digital por Carol Guedes',
  descricao:
    'Estrategia, criacao e identidade para marcas que querem ser lembradas. ' +
    'Branding, conteudo, design e presenca digital por Carol Guedes.',

  /** Palavras-chave de apoio (nao sao decisivas para ranqueamento). */
  assuntos: [
    'marketing digital', 'identidade visual', 'branding', 'social media',
    'direcao de arte', 'estrategia de conteudo', 'design editorial',
  ],

  /** Idioma e regiao. */
  idioma: 'pt-BR',
  regiao: 'BR',
} as const;

/* ---------------------------------------------------------------------------
   CONTATO
   Substitua pelos dados reais. Deixe a string vazia ('') para ocultar o item.
   O numero de WhatsApp vai no formato internacional, somente digitos:
   55 + DDD + numero.  Exemplo: '5511999999999'
   ------------------------------------------------------------------------ */
export const contato = {
  whatsapp: '',
  /** Mensagem que ja vem escrita quando a pessoa abre a conversa. */
  whatsappMensagem: 'Oi, Carol! Vim pelo site da Carolize e queria conversar sobre um projeto.',

  email: '',
  instagram: '',          // apenas o usuario, sem @  — ex.: 'carolize.studio'
  linkedin: '',           // URL completa, se houver
  behance: '',            // URL completa, se houver

  /** Cidade/estado exibidos no rodape. Opcional. */
  local: '',
} as const;

/* --- helpers: montam os links prontos a partir dos dados acima ------------ */

export const links = {
  get whatsapp() {
    if (!contato.whatsapp) return '';
    const msg = encodeURIComponent(contato.whatsappMensagem);
    return `https://wa.me/${contato.whatsapp}?text=${msg}`;
  },
  get email() {
    return contato.email ? `mailto:${contato.email}` : '';
  },
  get instagram() {
    return contato.instagram ? `https://instagram.com/${contato.instagram}` : '';
  },
  get linkedin() { return contato.linkedin; },
  get behance() { return contato.behance; },
};

/** Lista pronta para o rodape e o capitulo de contato. */
export function redesAtivas() {
  return [
    { nome: 'WhatsApp', url: links.whatsapp, rotulo: contato.whatsapp ? 'Conversar agora' : '' },
    { nome: 'Instagram', url: links.instagram, rotulo: contato.instagram ? `@${contato.instagram}` : '' },
    { nome: 'E-mail', url: links.email, rotulo: contato.email },
    { nome: 'LinkedIn', url: links.linkedin, rotulo: contato.linkedin ? 'Perfil profissional' : '' },
    { nome: 'Behance', url: links.behance, rotulo: contato.behance ? 'Portfolio' : '' },
  ].filter((r) => r.url);
}

/** true quando nenhum canal de contato foi configurado ainda. */
export const contatoPendente = redesAtivas().length === 0;
