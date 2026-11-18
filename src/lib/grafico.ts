/* ============================================================================
   CAROLIZE — base dos gráficos
   ----------------------------------------------------------------------------
   A marca tem um único matiz (rosa → vinho). Três cores categóricas distintas
   reprovam em simulação de daltonismo (ΔE 3.5, abaixo do piso 6). Por isso
   todo gráfico aqui é de MATIZ ÚNICA com rótulo direto: a identidade nunca
   depende só da cor.

   A rampa abaixo passou no validador ordinal (monotonia de luminância, degrau
   mínimo de 0.06 e ponta clara acima de 2:1 sobre o creme).
   ========================================================================= */

/** Rampa ordinal da marca, do claro ao escuro. 5 passos. */
export const RAMPA = ['#E0A2B0', '#CD8296', '#B5637A', '#96475B', '#702B3A'] as const;

export const TINTA = '#242424';
export const SUPERFICIE = '#FFF9F5';
export const GRADE = 'rgba(36,36,36,.12)';
export const EIXO = 'rgba(36,36,36,.52)';

/** Passo da rampa para uma posição relativa (0 = claro, 1 = escuro). */
export function passo(t: number): string {
  const i = Math.round(Math.min(1, Math.max(0, t)) * (RAMPA.length - 1));
  return RAMPA[i]!;
}

/** Passo por índice, com retorno circular pela ponta escura. */
export function passoN(i: number, total: number): string {
  if (total <= 1) return RAMPA[RAMPA.length - 1]!;
  return passo(i / (total - 1));
}

/** Formata número no padrão brasileiro. */
export function num(v: number, casas = 0): string {
  return v.toLocaleString('pt-BR', { minimumFractionDigits: casas, maximumFractionDigits: casas });
}

/** Caminho de um arco de rosca (donut). Ângulos em graus, 0 = topo. */
export function arco(cx: number, cy: number, rExt: number, rInt: number, de: number, ate: number) {
  const r = (g: number) => ((g - 90) * Math.PI) / 180;
  const p = (raio: number, g: number) => [cx + raio * Math.cos(r(g)), cy + raio * Math.sin(r(g))];
  const grande = ate - de > 180 ? 1 : 0;
  const [x1, y1] = p(rExt, de);
  const [x2, y2] = p(rExt, ate);
  const [x3, y3] = p(rInt, ate);
  const [x4, y4] = p(rInt, de);
  const f = (n: number) => n.toFixed(2);
  return `M${f(x1)} ${f(y1)}A${rExt} ${rExt} 0 ${grande} 1 ${f(x2)} ${f(y2)}` +
         `L${f(x3)} ${f(y3)}A${rInt} ${rInt} 0 ${grande} 0 ${f(x4)} ${f(y4)}Z`;
}

/* --- contraste (mesma matemática usada em src/lib/cores.ts) --------------- */
function lin(c: number) {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}
export function luminancia(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  return 0.2126 * lin((n >> 16) & 255) + 0.7152 * lin((n >> 8) & 255) + 0.0722 * lin(n & 255);
}
export function contraste(a: string, b: string) {
  const [x, y] = [luminancia(a), luminancia(b)].sort((p, q) => q - p) as [number, number];
  return (x + 0.05) / (y + 0.05);
}
