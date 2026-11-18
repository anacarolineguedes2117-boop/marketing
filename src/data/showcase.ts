/* ============================================================================
   CAROLIZE — conteúdo da apresentação de marca (/marca)
   ----------------------------------------------------------------------------
   Esta página mostra a identidade da Carolize como se fosse um projeto
   entregue a um cliente. Tudo que está aqui descreve o que você realmente
   entrega — nenhum número foi inventado.
   ========================================================================= */

/* --- números do próprio sistema (contados, não estimados) ---------------- */
export const numeros = [
  { valor: '15', rotulo: 'arquivos de marca', nota: 'SVG vetorial, impressão e digital' },
  { valor: '20', rotulo: 'elementos gráficos', nota: 'adesivos, carimbos e recortes autorais' },
  { valor: '13', rotulo: 'peças de aplicação', nota: 'do cartão ao story' },
  { valor: '03', rotulo: 'famílias tipográficas', nota: 'licença livre, uso comercial' },
];

/* --- o pacote: o que o cliente recebe ------------------------------------ */
export interface Entregavel {
  n: string;
  nome: string;
  descricao: string;
  itens: string[];
  adesivo: string;
}

export const pacote: Entregavel[] = [
  {
    n: '01', nome: 'Conceito e naming', adesivo: 'asterisco',
    descricao: 'Antes do desenho, a ideia. O que a marca significa e por que ela se chama assim.',
    itens: ['Diagnóstico da marca', 'Conceito criativo', 'Justificativa do nome', 'Tom de voz'],
  },
  {
    n: '02', nome: 'Logo e variações', adesivo: 'selo',
    descricao: 'Não um arquivo: um sistema que funciona do outdoor ao favicon.',
    itens: ['Versão principal', 'Horizontal e vertical', 'Monocromática e negativa', 'Símbolo isolado', 'Avatar e favicon'],
  },
  {
    n: '03', nome: 'Paleta de cores', adesivo: 'organica',
    descricao: 'Cores com papel definido e contraste verificado — não um apanhado bonito.',
    itens: ['Cores principais e de apoio', 'Códigos HEX, RGB e CMYK', 'Regra de proporção', 'Verificação de acessibilidade'],
  },
  {
    n: '04', nome: 'Tipografia', adesivo: 'etiqueta',
    descricao: 'Famílias escolhidas, hierarquia definida e licenças resolvidas.',
    itens: ['Família de destaque', 'Família de texto', 'Família de etiqueta', 'Escala e hierarquia'],
  },
  {
    n: '05', nome: 'Universo gráfico', adesivo: 'estrela',
    descricao: 'A coleção de elementos que só pertencem à sua marca.',
    itens: ['Adesivos e selos', 'Texturas e recortes', 'Molduras e setas', 'Regras de composição'],
  },
  {
    n: '06', nome: 'Templates de social', adesivo: 'janela',
    descricao: 'Modelos editáveis para você publicar sem precisar de designer toda semana.',
    itens: ['Grade de feed', 'Posts e carrosséis', 'Stories', 'Capas de destaque'],
  },
  {
    n: '07', nome: 'Papelaria e aplicações', adesivo: 'carimbo',
    descricao: 'A marca saindo da tela: impresso, embalagem e assinatura.',
    itens: ['Cartão de visita', 'Papel timbrado', 'Etiqueta e embalagem', 'Assinatura de e-mail'],
  },
  {
    n: '08', nome: 'Manual da marca', adesivo: 'moldura',
    descricao: 'O documento que mantém tudo coerente quando outra pessoa for aplicar.',
    itens: ['Construção e proporção', 'Área de proteção', 'Usos corretos e incorretos', 'Arquivos editáveis'],
  },
];

/* --- proporção de uso da paleta: é REGRA de aplicação, não medição ------- */
export const proporcaoPaleta = [
  { nome: 'Creme', hex: '#FFF9F5', pct: 62, papel: 'Superfície' },
  { nome: 'Preto', hex: '#242424', pct: 20, papel: 'Tinta e blocos' },
  { nome: 'Vinho', hex: '#702B3A', pct: 10, papel: 'Profundidade' },
  { nome: 'Rosa', hex: '#D77D91', pct: 6, papel: 'Assinatura' },
  { nome: 'Rosa claro', hex: '#F3D5DA', pct: 2, papel: 'Respiro' },
];

/* --- escala tipográfica: valores reais em px na tela larga --------------- */
export const escalaTipo = [
  { nome: 'Mega', px: 240, uso: 'Abertura de capítulo', familia: 'serif' },
  { nome: 'Display', px: 131, uso: 'Título de seção', familia: 'serif' },
  { nome: 'Título', px: 74, uso: 'Subtítulo', familia: 'serif' },
  { nome: 'Sub', px: 40, uso: 'Destaque de texto', familia: 'serif' },
  { nome: 'Lede', px: 26, uso: 'Parágrafo de entrada', familia: 'sans' },
  { nome: 'Corpo', px: 18, uso: 'Texto corrido', familia: 'sans' },
  { nome: 'Etiqueta', px: 12, uso: 'Rótulo e metadado', familia: 'mono' },
];

/* --- processo ------------------------------------------------------------ */
export const etapasMarca = [
  { n: '01', nome: 'Imersão', o: 'Conversa, leitura do mercado e do que a marca já comunica.', entrega: 'Diagnóstico' },
  { n: '02', nome: 'Conceito', o: 'A ideia que organiza todas as decisões visuais seguintes.', entrega: 'Direção criativa' },
  { n: '03', nome: 'Desenho', o: 'Logo, paleta, tipografia e universo gráfico em rodadas de ajuste.', entrega: 'Sistema visual' },
  { n: '04', nome: 'Sistema', o: 'Templates, aplicações e o manual que mantém tudo coerente.', entrega: 'Kit completo' },
  { n: '05', nome: 'Entrega', o: 'Arquivos organizados, editáveis e prontos para uso.', entrega: 'Arquivos finais' },
];

/* --- critérios de naming (metodologia, não história inventada) ----------- */
export const criteriosNome = [
  { c: 'Diz o que faz', nota: 'O sufixo -izar transforma substantivo em verbo. O nome é uma ação.' },
  { c: 'Cabe na boca', nota: 'Três sílabas, sem ambiguidade de grafia ao ditar por telefone.' },
  { c: 'Tem gancho visual', nota: 'A letra O vira o símbolo. O nome já contém a marca.' },
  { c: 'Sobrevive ao crescimento', nota: 'Não prende a marca a um serviço nem a uma plataforma.' },
];

/* --- usos incorretos (demonstrados, não só descritos) -------------------- */
export const usosIncorretos = [
  { id: 'distorcer', rotulo: 'Distorcer a proporção' },
  { id: 'girar', rotulo: 'Inclinar a marca' },
  { id: 'recolorir', rotulo: 'Cor fora da paleta' },
  { id: 'sombra', rotulo: 'Sombra ou efeito' },
  { id: 'contraste', rotulo: 'Contraste insuficiente' },
  { id: 'refonte', rotulo: 'Redigitar em outra fonte' },
];
