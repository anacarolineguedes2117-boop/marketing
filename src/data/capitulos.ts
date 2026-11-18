/* ============================================================================
   CAROLIZE — indice dos capitulos
   Controla a navegacao, o indicador de progresso e o tema de cor de cada parte.
   A ordem desta lista e a ordem da pagina.
   ========================================================================= */

export type Tema = 'claro' | 'escuro' | 'vinho' | 'rosa' | 'papel';

export interface Capitulo {
  n: string;       // numero exibido
  id: string;      // ancora (#id) — nao mude sem atualizar os links
  titulo: string;  // nome no menu e no indicador
  tema: Tema;
}

export const capitulos: Capitulo[] = [
  { n: '01', id: 'abertura',  titulo: 'Abertura',       tema: 'claro' },
  { n: '02', id: 'marca',     titulo: 'Quem é',         tema: 'escuro' },
  { n: '03', id: 'servicos',  titulo: 'O que fazemos',  tema: 'claro' },
  { n: '04', id: 'processo',  titulo: 'Processo',       tema: 'vinho' },
  { n: '05', id: 'projetos',  titulo: 'Projetos',       tema: 'papel' },
  { n: '06', id: 'criadora',  titulo: 'A criadora',     tema: 'rosa' },
  { n: '07', id: 'contato',   titulo: 'Contato',        tema: 'escuro' },
];
