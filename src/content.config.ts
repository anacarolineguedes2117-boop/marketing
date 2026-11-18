import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/* ============================================================================
   PROJETOS
   ----------------------------------------------------------------------------
   Cada projeto e um arquivo .md em src/content/projetos/.
   Para criar um novo: copie um existente, troque o nome do arquivo (ele vira a
   URL) e preencha os campos. Nada mais precisa ser alterado.

   IMPORTANTE: mantenha `conceitual: true` em estudos demonstrativos. O site
   carimba esses projetos como conceituais para que nunca sejam confundidos
   com trabalho entregue a cliente.
   ========================================================================= */

const cor = z.object({
  nome: z.string(),
  hex: z.string().regex(/^#[0-9a-fA-F]{6}$/, 'use #rrggbb'),
  /** Marque a cor que deve ser usada como texto sobre as demais. */
  tinta: z.boolean().optional(),
});

const projetos = defineCollection({
  loader: glob({ base: './src/content/projetos', pattern: '**/*.md' }),
  schema: z.object({
    titulo: z.string(),
    /** Aparece como subtítulo: ramo de atuação. */
    segmento: z.string(),
    /** Uma frase. Vai na listagem e nas prévias. */
    resumo: z.string(),
    /** Frase CURTA (até ~9 palavras) usada dentro das peças de aplicação.
     *  Sem ela, as peças usam o título do projeto. */
    frase: z.string().optional(),

    /** true = estudo demonstrativo, carimbado como conceitual no site. */
    conceitual: z.boolean().default(true),
    ano: z.string().optional(),
    /** Ordem na listagem: menor aparece primeiro. */
    ordem: z.number().default(50),
    publicado: z.boolean().default(true),

    /* --- narrativa do caso ------------------------------------------- */
    desafio: z.string(),
    conceito: z.string(),
    solucao: z.string(),

    /** O que foi entregue. Vira a lista lateral do estudo. */
    entregas: z.array(z.string()).default([]),

    /** Resultados reais. Deixe vazio quando não houver números verificáveis. */
    resultados: z.array(z.object({
      valor: z.string(),
      rotulo: z.string(),
    })).default([]),

    /* --- sistema visual do projeto ------------------------------------ */
    paleta: z.array(cor).min(2),
    /** Palavra usada nas aplicações como marca do projeto. */
    marca: z.object({
      texto: z.string(),
      /** 'serif' (Fraunces) ou 'sans' (Archivo). */
      familia: z.enum(['serif', 'sans']).default('serif'),
      peso: z.number().default(500),
      /** Espaçamento entre letras, em em. */
      tracking: z.number().default(0.02),
      caixaAlta: z.boolean().default(true),
      assinatura: z.string().optional(),
    }),
    /** Decisões tipográficas, descritas. */
    tipografia: z.array(z.object({
      nome: z.string(),
      papel: z.string(),
    })).default([]),

    /** Peças mostradas na galeria do estudo, na ordem. */
    pecas: z.array(z.enum([
      'cartao', 'papelaria', 'post', 'carrossel', 'story',
      'etiqueta', 'embalagem', 'catalogo', 'tela', 'selo',
    ])).default(['cartao', 'post', 'story', 'papelaria']),

    /** Fotografia real do projeto, quando existir (coloque em /public/projetos/). */
    foto: z.string().optional(),
    fotoAlt: z.string().optional(),
  }),
});

export const collections = { projetos };
