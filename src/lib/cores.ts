/** Utilidades de cor usadas pelas paginas de projeto. */

export function luminancia(hex: string): number {
  const n = parseInt(hex.slice(1), 16);
  const f = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * f((n >> 16) & 255) + 0.7152 * f((n >> 8) & 255) + 0.0722 * f(n & 255);
}

export function contraste(a: string, b: string): number {
  const [x, y] = [luminancia(a), luminancia(b)].sort((p, q) => q - p) as [number, number];
  return (x + 0.05) / (y + 0.05);
}

/** Escolhe entre preto e creme a cor de texto com melhor contraste sobre `fundo`. */
export function tintaSobre(fundo: string, escuro = '#242424', claro = '#fff9f5'): string {
  return contraste(fundo, escuro) >= contraste(fundo, claro) ? escuro : claro;
}

export interface Paleta { nome: string; hex: string; tinta?: boolean }

/** Deriva os papeis de cor de um projeto a partir da paleta declarada. */
export function papeis(paleta: readonly Paleta[]) {
  const ordenada = [...paleta].sort((a, b) => luminancia(b.hex) - luminancia(a.hex));
  const claro = ordenada[0]!.hex;
  const escuro = ordenada[ordenada.length - 1]!.hex;
  const tinta = paleta.find((c) => c.tinta)?.hex ?? escuro;
  const acento =
    paleta.map((c) => c.hex).find((h) => h !== tinta && h !== claro) ?? ordenada[1]!.hex;
  const apoio =
    paleta.map((c) => c.hex).find((h) => h !== tinta && h !== claro && h !== acento) ?? claro;
  return { claro, escuro, tinta, acento, apoio, pecas: [claro, tinta, acento, apoio] };
}
