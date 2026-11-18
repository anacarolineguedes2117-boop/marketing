/* ============================================================================
   CAROLIZE — servicos
   ----------------------------------------------------------------------------
   Cada categoria vira um bloco editorial no capitulo 03.
   Para adicionar um servico basta inserir uma linha em `itens`.
   `chave` liga o item a tabela comercial em comercial.ts (opcional).
   ========================================================================= */

export interface Servico {
  nome: string;
  chave?: string;        // id correspondente em comercial.ts
}

export interface Categoria {
  n: string;
  id: string;
  titulo: string;
  /** Uma frase que explica o valor da categoria, nao o que ela entrega. */
  premissa: string;
  itens: Servico[];
  /** Adesivo decorativo associado (ver src/data/adesivos.ts). */
  adesivo: string;
}

export const categorias: Categoria[] = [
  {
    n: '01',
    id: 'estrategia',
    titulo: 'Estratégia e presença digital',
    premissa:
      'Antes de publicar, decidir. Uma presença só sustenta quando existe um plano por trás dela.',
    adesivo: 'bussola',
    itens: [
      { nome: 'Planejamento estratégico' },
      { nome: 'Gestão de redes sociais', chave: 'gestao-basica' },
      { nome: 'Calendário editorial' },
      { nome: 'Planejamento de conteúdo' },
      { nome: 'Gestão de comunicação' },
      { nome: 'Análise de desempenho' },
    ],
  },
  {
    n: '02',
    id: 'conteudo',
    titulo: 'Conteúdo e criação',
    premissa:
      'O conteúdo é onde a estratégia encontra as pessoas. Precisa ter ritmo, voz e intenção.',
    adesivo: 'estrela',
    itens: [
      { nome: 'Criação de posts', chave: 'posts-4' },
      { nome: 'Carrosséis' },
      { nome: 'Stories', chave: 'stories-8' },
      { nome: 'Reels', chave: 'reels-1' },
      { nome: 'Edição de vídeos' },
      { nome: 'Motion design', chave: 'motion-1' },
      { nome: 'Direção criativa' },
      { nome: 'Captação de conteúdo', chave: 'captacao-2' },
    ],
  },
  {
    n: '03',
    id: 'branding',
    titulo: 'Branding e design',
    premissa:
      'Identidade não é só o que a marca mostra. É o que ela decide ser toda vez que aparece.',
    adesivo: 'asterisco',
    itens: [
      { nome: 'Identidade visual', chave: 'identidade' },
      { nome: 'Branding', chave: 'identidade' },
      { nome: 'Materiais gráficos', chave: 'materiais' },
      { nome: 'Direção de arte' },
      { nome: 'Lookbooks', chave: 'lookbook' },
      { nome: 'Catálogos digitais', chave: 'catalogo' },
    ],
  },
  {
    n: '04',
    id: 'campanhas',
    titulo: 'Marketing e campanhas',
    premissa:
      'Datas, lançamentos e promoções não são improviso: são um arco com começo, meio e fim.',
    adesivo: 'seta',
    itens: [
      { nome: 'Campanhas comerciais', chave: 'campanha' },
      { nome: 'Lançamentos', chave: 'campanha' },
      { nome: 'Tráfego pago', chave: 'trafego' },
      { nome: 'Estratégias promocionais' },
      { nome: 'Comunicação de datas especiais' },
    ],
  },
  {
    n: '05',
    id: 'digital',
    titulo: 'Soluções digitais',
    premissa:
      'O lugar onde a marca é encontrada, atende e vende — organizado e com a mesma identidade.',
    adesivo: 'janela',
    itens: [
      { nome: 'WhatsApp Business', chave: 'whatsapp' },
      { nome: 'Catálogos digitais', chave: 'catalogo' },
      { nome: 'Mini sites', chave: 'minisite' },
      { nome: 'Vitrines digitais' },
      { nome: 'Páginas de apresentação' },
    ],
  },
];
