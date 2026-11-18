/* ============================================================================
   CAROLIZE — tabela comercial  ·  USO INTERNO
   ----------------------------------------------------------------------------
   ATENCAO
   Estes valores NAO aparecem no portfolio publico (/). Eles alimentam apenas
   a pagina de proposta em /proposta, que nao e linkada no site, nao entra no
   sitemap e e marcada como noindex.

   Os valores foram transcritos exatamente como informados. Nao altere nenhum
   numero sem autorizacao da Carol.

   Para publicar uma proposta: edite `propostaAtual` no final do arquivo.
   ========================================================================= */

export interface Item {
  /** id usado para ligar com servicos.ts */
  chave: string;
  nome: string;
  /** Valor em reais. `null` quando for "sob consulta". */
  valor: number | null;
  /** 'mes' para recorrencia mensal, 'unico' para entrega avulsa. */
  recorrencia: 'mes' | 'unico';
  /** Exibe "a partir de" antes do valor. */
  aPartirDe?: boolean;
  nota?: string;
}

export interface Bloco {
  titulo: string;
  itens: Item[];
}

export const tabela: Bloco[] = [
  {
    titulo: 'Gestão',
    itens: [
      { chave: 'gestao-basica', nome: 'Gestão básica', valor: 180, recorrencia: 'mes' },
    ],
  },
  {
    titulo: 'Conteúdo',
    itens: [
      { chave: 'posts-4', nome: '4 posts', valor: 180, recorrencia: 'unico' },
      { chave: 'posts-8', nome: '8 posts', valor: 320, recorrencia: 'unico' },
      { chave: 'reels-1', nome: '1 Reel', valor: 90, recorrencia: 'unico' },
      { chave: 'reels-4', nome: '4 Reels', valor: 320, recorrencia: 'unico' },
      { chave: 'reels-6', nome: '6 Reels', valor: 470, recorrencia: 'unico' },
      { chave: 'stories-8', nome: '8 stories', valor: 160, recorrencia: 'mes' },
      { chave: 'stories-16', nome: '16 stories', valor: 260, recorrencia: 'mes' },
      { chave: 'captacao-2', nome: '2 captações', valor: 280, recorrencia: 'unico' },
      { chave: 'captacao-4', nome: '4 captações', valor: 420, recorrencia: 'unico' },
      { chave: 'motion-1', nome: '1 motion', valor: 60, recorrencia: 'unico' },
      { chave: 'motion-4', nome: '4 motions', valor: 200, recorrencia: 'unico' },
    ],
  },
  {
    titulo: 'Campanhas',
    itens: [
      { chave: 'trafego', nome: 'Tráfego pago', valor: 120, recorrencia: 'unico' },
      { chave: 'campanha', nome: 'Campanha ou lançamento', valor: 270, recorrencia: 'unico' },
    ],
  },
  {
    titulo: 'Branding e materiais',
    itens: [
      { chave: 'identidade', nome: 'Identidade visual e branding', valor: 300, recorrencia: 'unico' },
      { chave: 'lookbook', nome: 'Lookbook', valor: 180, recorrencia: 'unico' },
      { chave: 'catalogo', nome: 'Catálogo', valor: 190, recorrencia: 'unico' },
      { chave: 'materiais', nome: 'Materiais gráficos', valor: 30, recorrencia: 'unico', aPartirDe: true },
    ],
  },
  {
    titulo: 'Soluções digitais',
    itens: [
      { chave: 'minisite', nome: 'Mini site', valor: 300, recorrencia: 'unico' },
      { chave: 'whatsapp', nome: 'WhatsApp Business', valor: 120, recorrencia: 'unico' },
    ],
  },
];

/* ---------------------------------------------------------------------------
   PACOTE DE GESTAO GERAL
   Existe uma proposta de gestao geral com valores e condicoes proprias que
   ainda nao foram informados. Preencha abaixo quando quiser usa-la.
   Enquanto `ativo` for false, o bloco nao aparece em /proposta.
   ------------------------------------------------------------------------ */
export const gestaoGeral = {
  ativo: false,
  titulo: 'Gestão geral',
  descricao: '',
  valor: null as number | null,
  recorrencia: 'mes' as const,
  inclui: [] as string[],
  condicoes: [] as string[],
};

/* ---------------------------------------------------------------------------
   PROPOSTA ATUAL  —  o que /proposta mostra
   Monte uma proposta escolhendo as chaves dos itens acima.
   ------------------------------------------------------------------------ */
export const propostaAtual = {
  /** Nome de quem vai receber. Deixe vazio para uma versao generica. */
  cliente: '',
  /** Validade da proposta, texto livre. */
  validade: '',
  /** Chaves dos itens inclusos, na ordem em que devem aparecer. */
  itens: [] as string[],
  /** Observacoes finais. Uma por linha. */
  observacoes: [
    'Os valores acima não incluem investimento em mídia paga.',
    'Prazos e entregas são combinados no início de cada ciclo.',
  ],
};

/* --- utilidades ----------------------------------------------------------- */

export const todosItens: Item[] = tabela.flatMap((b) => b.itens);

export function item(chave: string): Item | undefined {
  return todosItens.find((i) => i.chave === chave);
}

export function reais(valor: number | null): string {
  if (valor === null) return 'Sob consulta';
  return valor.toLocaleString('pt-BR', {
    style: 'currency', currency: 'BRL', minimumFractionDigits: 0,
  });
}
