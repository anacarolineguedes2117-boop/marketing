/* ============================================================================
   CAROLIZE — dados do manual da marca (/marca)
   ========================================================================= */

export interface Arquivo { nome: string; arquivo: string; nota: string; fundo?: 'claro' | 'escuro' | 'rosa' }

export const versoes: Arquivo[] = [
  { nome: 'Principal', arquivo: 'carolize-principal.svg',
    nota: 'Uso padrão. Wordmark com a assinatura justificada abaixo.' },
  { nome: 'Vertical', arquivo: 'carolize-vertical.svg',
    nota: 'Formatos estreitos, selos e aplicações centralizadas.' },
  { nome: 'Wordmark', arquivo: 'carolize-wordmark.svg',
    nota: 'Quando a assinatura já aparece em outro ponto da peça.' },
  { nome: 'Negativa', arquivo: 'carolize-principal-negativo.svg', fundo: 'escuro',
    nota: 'Sobre fundos escuros. Nunca aplique a versão clara sobre creme.' },
  { nome: 'Monocromática', arquivo: 'carolize-principal-mono-preto.svg',
    nota: 'Impressão em uma cor, gravação, carimbo e fax de contrato.' },
  { nome: 'Símbolo', arquivo: 'carolize-simbolo.svg',
    nota: 'Assinatura isolada, a partir de 40px. Abaixo disso, sem o fragmento.' },
  { nome: 'Avatar', arquivo: 'carolize-avatar.svg', fundo: 'rosa',
    nota: 'Foto de perfil em redes sociais. Vinho com o anel em creme.' },
  { nome: 'Favicon', arquivo: 'carolize-favicon.svg', fundo: 'escuro',
    nota: 'Aba do navegador e ícone de aplicativo. Sem o fragmento.' },
];

export interface Cor {
  nome: string; hex: string; papel: string; uso: string;
}

export const paleta: Cor[] = [
  { nome: 'Rosa Carolize', hex: '#D77D91', papel: 'Assinatura',
    uso: 'A cor da marca. Usada em pequena quantidade: destaques, detalhes e o fragmento do símbolo. Nunca como fundo de textos longos.' },
  { nome: 'Vinho', hex: '#702B3A', papel: 'Profundidade',
    uso: 'Contraponto grave ao rosa. Fundos de seção, acentos sobre creme e aplicações impressas.' },
  { nome: 'Preto', hex: '#242424', papel: 'Tinta',
    uso: 'Texto principal e fundos escuros. Não é preto puro: tem um resto de calor que combina com o creme.' },
  { nome: 'Creme', hex: '#FFF9F5', papel: 'Papel',
    uso: 'A superfície padrão da marca. Dominante em quase toda a comunicação.' },
  { nome: 'Rosa claro', hex: '#F3D5DA', papel: 'Respiro',
    uso: 'Fundos suaves, blocos de destaque e áreas que precisam de cor sem peso.' },
];

export const regras = {
  certo: [
    'Use sempre os arquivos originais, sem redesenhar nem redigitar.',
    'Respeite a área de proteção: a altura do O ao redor de toda a marca.',
    'Em fundo claro, aplique a versão preta; em fundo escuro, a creme.',
    'Abaixo de 40px, use o símbolo sem o fragmento.',
    'A assinatura mantém sempre a mesma proporção em relação ao wordmark.',
  ],
  errado: [
    'Alterar a proporção, inclinar ou distorcer.',
    'Trocar as cores por outras fora da paleta.',
    'Aplicar sobre fotografia sem área de contraste suficiente.',
    'Adicionar sombra, contorno, brilho ou qualquer efeito.',
    'Reescrever CAROLIZE em outra tipografia.',
    'Usar o fragmento solto como se fosse o símbolo.',
  ],
};

export const tipografia = [
  {
    familia: 'Fraunces',
    papel: 'Display',
    descricao:
      'Serifa de alto contraste e eixo variável. É a voz da marca: títulos, números grandes e o próprio wordmark. Usada em opsz 144 com SOFT 15 — terminais levemente arredondados, o detalhe que tira a frieza.',
    amostra: 'Marcas têm histórias',
    classe: 'esp-serif',
    licenca: 'SIL Open Font License 1.1',
  },
  {
    familia: 'Archivo',
    papel: 'Texto',
    descricao:
      'Grotesca variável, desenhada para leitura em tela e em tamanhos pequenos. Carrega todo o texto corrido, legendas e interface. Neutra o bastante para não disputar com a Fraunces.',
    amostra: 'Estratégia, criação e identidade para marcas que querem ser lembradas.',
    classe: 'esp-sans',
    licenca: 'SIL Open Font License 1.1',
  },
  {
    familia: 'DM Mono',
    papel: 'Etiqueta',
    descricao:
      'Monoespaçada usada apenas em caixa alta, com espacejamento largo. Numeração de capítulos, rótulos, carimbos e metadados — tudo que funciona como anotação sobre a página.',
    amostra: 'CAPÍTULO 03 — O QUE FAZEMOS',
    classe: 'esp-mono',
    licenca: 'SIL Open Font License 1.1',
  },
];
