/* ============================================================================
   CAROLIZE — metodo de trabalho (capitulo 04)
   ========================================================================= */

export interface Etapa {
  n: string;
  verbo: string;
  resumo: string;
  /** O que acontece de concreto nesta etapa. */
  detalhe: string;
  /** O que a cliente recebe ao final dela. */
  entrega: string;
}

export const etapas: Etapa[] = [
  {
    n: '01',
    verbo: 'Descobrir',
    resumo: 'Entender o negócio e seus objetivos.',
    detalhe:
      'Conversa de imersão, leitura do mercado e do que a marca já comunica hoje. ' +
      'Antes de propor, escutar.',
    entrega: 'Diagnóstico e direção',
  },
  {
    n: '02',
    verbo: 'Planejar',
    resumo: 'Construir uma estratégia coerente.',
    detalhe:
      'Definição de posicionamento, pilares de conteúdo, tom de voz e calendário. ' +
      'Cada peça passa a ter um motivo para existir.',
    entrega: 'Plano e calendário editorial',
  },
  {
    n: '03',
    verbo: 'Criar',
    resumo: 'Transformar ideias em soluções visuais.',
    detalhe:
      'Direção de arte, identidade, conceito das campanhas e dos formatos. ' +
      'É aqui que a marca ganha rosto.',
    entrega: 'Conceito e sistema visual',
  },
  {
    n: '04',
    verbo: 'Desenvolver',
    resumo: 'Produzir e implementar.',
    detalhe:
      'Produção das peças, montagem dos materiais, publicação e ajuste fino ' +
      'em cada canal onde a marca aparece.',
    entrega: 'Peças, materiais e canais no ar',
  },
  {
    n: '05',
    verbo: 'Evoluir',
    resumo: 'Acompanhar, analisar e aprimorar.',
    detalhe:
      'Leitura dos números, do que funcionou e do que não funcionou. ' +
      'O plano do mês seguinte nasce do mês anterior.',
    entrega: 'Análise e próximos passos',
  },
];
