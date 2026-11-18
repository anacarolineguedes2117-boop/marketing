/** Tipos do sistema de aplicacoes. */

export type TipoPeca =
  | 'cartao' | 'cartaoVerso' | 'papelaria' | 'post' | 'carrossel' | 'story'
  | 'etiqueta' | 'embalagem' | 'catalogo' | 'tela' | 'selo' | 'destaques'
  | 'assinaturaEmail';

export interface MarcaPeca {
  texto: string;
  familia?: 'serif' | 'sans';
  peso?: number;
  tracking?: number;
  caixaAlta?: boolean;
  assinatura?: string;
}

/** Nome legivel de cada peca, usado nas legendas. */
export const rotulosPeca: Record<TipoPeca, string> = {
  cartao: 'Cartão de visita',
  cartaoVerso: 'Cartão — verso',
  papelaria: 'Papelaria',
  post: 'Post de feed',
  carrossel: 'Carrossel',
  story: 'Story',
  etiqueta: 'Etiqueta',
  embalagem: 'Embalagem',
  catalogo: 'Catálogo',
  tela: 'Página digital',
  selo: 'Selo',
  destaques: 'Capas de destaque',
  assinaturaEmail: 'Assinatura de e-mail',
};

/** Modelos editaveis de rede social (Template.astro). */
export type TipoTemplate =
  | 'citacao' | 'anuncio' | 'dica' | 'capaCarrossel' | 'retrato' | 'numero'
  | 'storyCapa' | 'storyCitacao' | 'storyEnquete' | 'storyBastidor';
