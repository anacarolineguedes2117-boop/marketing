#!/usr/bin/env python3
"""
CAROLIZE — gerador do sistema de marca.

Produz, a partir da geometria em tools/geometry.py e das fontes variaveis
self-hosted, todos os arquivos vetoriais da marca e o modulo TypeScript que
alimenta os componentes animados do site.

    python3 tools/build-brand.py

Saidas:
    public/brand/*.svg      arquivos para download / uso em impressos
    src/lib/brand-paths.ts  curvas para os componentes Astro
"""
import json, math, os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__)))
os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))

from geometry import ring_path, fragment_path, R_OUT
import stickers
from type import text_paths, glyph_bbox, metrics

# ---------------------------------------------------------------- parametros
C = {"rosa": "#D77D91", "rosaClaro": "#F3D5DA", "creme": "#FFF9F5",
     "preto": "#242424", "vinho": "#702B3A"}

WORD_AXES = dict(opsz=144, wght=600, SOFT=15, WONK=0)
WORD_TRACK = 46           # em/1000
SIG_AXES = dict(wght=500, wdth=100)
GAP = 26                  # abertura da boca do simbolo
FRAG = dict(gap_half=GAP, span=20, scale=1.135)

SIZE = 100                # altura de referencia do texto
CAP = metrics("fraunces", **WORD_AXES)["cap"] * SIZE   # 70


# ------------------------------------------------------------------ wordmark
def build_wordmark(size=SIZE, track=WORD_TRACK, axes=None, gap=GAP):
    """CAROLIZE com o O substituido pelo simbolo. Devolve (partes, largura, cap)."""
    axes = axes or WORD_AXES
    glyphs, _ = text_paths("fraunces", "CAROLIZE", size=size, tracking=track, **axes)
    ob = glyph_bbox("fraunces", "O", size, **axes)
    cap = metrics("fraunces", **axes)["cap"] * size
    # Diametro calibrado opticamente contra o O tipografico (ver docs/DIRECAO.md).
    # O avanco do glifo original e preservado: o anel ocupa o lugar do O sem
    # alterar o ritmo da palavra.
    d = cap * 1.0
    delta = 0.0
    parts, shift = [], 0.0
    for g in glyphs:
        if g["char"] == "O":
            cx = g["x"] + shift + ob["lsb"] + ob["w"] / 2
            cy = -(ob["y0"] + ob["h"] / 2)
            s = d / (2 * R_OUT)
            parts.append({"char": "O", "kind": "ring", "cx": round(cx, 3),
                          "cy": round(cy, 3), "s": round(s, 5),
                          "d": ring_path(gap_half=gap),
                          "frag": fragment_path(**FRAG)})
            shift += delta
        else:
            parts.append({"char": g["char"], "kind": "glyph",
                          "d": shift_path(g["d"], shift)})
    width = glyphs[-1]["x"] + shift + glyph_bbox("fraunces", "E", size, **axes)["x1"]
    return parts, width, cap


def shift_path(d, dx):
    """Translada um path horizontalmente sem reparsear: embrulha em <g>."""
    return d if dx == 0 else ("@%.3f@" % dx) + d   # marcador resolvido no render


def render_parts(parts, color, accent=None, frag=False):
    out = []
    for p in parts:
        if p["kind"] == "ring":
            g = f'<g transform="translate({p["cx"]} {p["cy"]}) scale({p["s"]})">'
            g += f'<path d="{p["d"]}" fill="{color}"/>'
            if frag and accent:
                g += f'<path d="{p["frag"]}" fill="{accent}"/>'
            out.append(g + "</g>")
        else:
            d = p["d"]
            if d.startswith("@"):
                dx, d = d[1:].split("@", 1)
                out.append(f'<g transform="translate({dx} 0)"><path d="{d}" fill="{color}"/></g>')
            else:
                out.append(f'<path d="{d}" fill="{color}"/>')
    return "".join(out)


# ----------------------------------------------------------------- assinatura
SIG = "MARKETING DIGITAL POR CAROL GUEDES"

def build_signature(target_width, size):
    """Assinatura em Archivo, tracking calculado para casar exatamente com a
    largura do wordmark — justificacao optica, recurso editorial classico."""
    base, w0 = text_paths("archivo", SIG, size=size, tracking=0, **SIG_AXES)
    n = len(SIG) - 1
    track = (target_width - w0) / n / size * 1000
    parts, w = text_paths("archivo", SIG, size=size, tracking=track, **SIG_AXES)
    return parts, w, track


# ----------------------------------------------------------------------- selo
def build_seal(text="CAROLIZE · MARKETING DIGITAL · POR CAROL GUEDES · ", r=86, size=9.6):
    """Selo circular: simbolo ao centro, texto correndo na circunferencia."""
    return {"text": text, "r": r, "size": size}


# -------------------------------------------------------------------- escrita
def svg(viewbox, body, title, desc=""):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{viewbox}" role="img" '
            f'aria-label="{title}">\n  <title>{title}</title>\n'
            + (f"  <desc>{desc}</desc>\n" if desc else "")
            + f"  {body}\n</svg>\n")


def write(name, content):
    path = os.path.join("public/brand", name)
    with open(path, "w", encoding="utf-8") as fh:
        fh.write(content)
    print(f"  {path}  ({len(content)//1024 or 1}kb)")


def main():
    os.makedirs("public/brand", exist_ok=True)
    parts, W, cap = build_wordmark()
    pad = cap * 0.22

    print("marca:")
    # --- wordmark puro -----------------------------------------------------
    for fname, fg, ac, frag, bg in [
        ("carolize-wordmark.svg", C["preto"], C["rosa"], False, None),
        ("carolize-wordmark-rosa.svg", C["rosa"], None, False, None),
        ("carolize-wordmark-vinho.svg", C["vinho"], None, False, None),
        ("carolize-wordmark-negativo.svg", C["creme"], C["rosa"], False, C["preto"]),
    ]:
        body = render_parts(parts, fg, ac, frag)
        if bg:
            body = f'<rect x="{-pad}" y="{-cap-pad}" width="{W+2*pad}" height="{cap+2*pad}" fill="{bg}"/>' + body
        write(fname, svg(f"{-pad} {-cap-pad} {W+2*pad} {cap+2*pad}", body,
                         "CAROLIZE", "Wordmark. O contador do O abre-se: a marca em transformacao."))

    # --- lockup principal (wordmark + assinatura justificada) --------------
    sig_size = cap * 0.142
    sig_parts, sig_w, track = build_signature(W, sig_size)
    gap_y = cap * 0.30
    sig_y = gap_y + sig_size * metrics("archivo", **SIG_AXES)["cap"]
    sigbody = lambda col: "".join(
        f'<path d="{g["d"]}" fill="{col}"/>' for g in sig_parts)

    for fname, fg, ac, bg in [
        ("carolize-principal.svg", C["preto"], C["rosa"], None),
        ("carolize-principal-negativo.svg", C["creme"], C["rosa"], C["preto"]),
        ("carolize-principal-mono-preto.svg", C["preto"], None, None),
        ("carolize-principal-mono-creme.svg", C["creme"], None, C["preto"]),
    ]:
        inner = render_parts(parts, fg, ac, False)
        inner += f'<g transform="translate(0 {sig_y:.2f})">{sigbody(fg)}</g>'
        h = cap + gap_y + sig_size * metrics("archivo", **SIG_AXES)["cap"]
        body = inner
        if bg:
            body = (f'<rect x="{-pad}" y="{-cap-pad}" width="{W+2*pad}" '
                    f'height="{h+2*pad}" fill="{bg}"/>' + inner)
        write(fname, svg(f"{-pad} {-cap-pad} {W+2*pad} {h+2*pad}", body,
                         "CAROLIZE — Marketing Digital por Carol Guedes"))

    # --- versao vertical ---------------------------------------------------
    sym_d = cap * 1.78
    vs = sym_d / (2 * R_OUT)
    vgap = cap * 0.40
    inner = (f'<g transform="translate({W/2:.2f} {-cap-vgap-sym_d/2:.2f}) scale({vs:.5f})">'
             f'<path d="{ring_path(gap_half=GAP)}" fill="{C["preto"]}"/>'
             f'<path d="{fragment_path(**FRAG)}" fill="{C["rosa"]}"/></g>')
    inner += render_parts(parts, C["preto"], C["rosa"], False)
    inner += f'<g transform="translate(0 {sig_y:.2f})">{sigbody(C["preto"])}</g>'
    top = cap + vgap + sym_d
    hh = top + gap_y + sig_size * metrics("archivo", **SIG_AXES)["cap"]
    write("carolize-vertical.svg",
          svg(f"{-pad} {-top-pad} {W+2*pad} {hh+2*pad}", inner,
              "CAROLIZE — versao vertical"))

    # --- simbolo isolado ---------------------------------------------------
    vb = "-62 -62 124 124"
    write("carolize-simbolo.svg", svg(vb,
          f'<path d="{ring_path(gap_half=GAP)}" fill="{C["preto"]}"/>'
          f'<path d="{fragment_path(**FRAG)}" fill="{C["rosa"]}"/>',
          "CAROLIZE — simbolo",
          "O que se abre em C. Um fragmento destaca-se: a transformacao."))
    write("carolize-simbolo-rosa.svg", svg(vb,
          f'<path d="{ring_path(gap_half=GAP)}" fill="{C["rosa"]}"/>'
          f'<path d="{fragment_path(**FRAG)}" fill="{C["vinho"]}"/>', "CAROLIZE — simbolo rosa"))
    write("carolize-simbolo-mono.svg", svg(vb,
          f'<path d="{ring_path(gap_half=GAP)}" fill="{C["preto"]}"/>'
          f'<path d="{fragment_path(**FRAG)}" fill="{C["preto"]}"/>', "CAROLIZE — simbolo monocromatico"))
    write("carolize-simbolo-negativo.svg", svg(vb,
          f'<rect x="-62" y="-62" width="124" height="124" fill="{C["preto"]}"/>'
          f'<path d="{ring_path(gap_half=GAP)}" fill="{C["creme"]}"/>'
          f'<path d="{fragment_path(**FRAG)}" fill="{C["rosa"]}"/>', "CAROLIZE — simbolo negativo"))

    # --- reducao: anel sem fragmento (favicon / <=32px) --------------------
    write("carolize-favicon.svg", svg("-58 -58 116 116",
          f'<rect x="-58" y="-58" width="116" height="116" rx="26" fill="{C["preto"]}"/>'
          f'<path d="{ring_path(gap_half=GAP)}" fill="{C["creme"]}" transform="scale(.78)"/>',
          "CAROLIZE"))
    write("carolize-avatar.svg", svg("-80 -80 160 160",
          f'<rect x="-80" y="-80" width="160" height="160" fill="{C["vinho"]}"/>'
          f'<g transform="scale(.70)"><path d="{ring_path(gap_half=GAP)}" fill="{C["creme"]}"/>'
          f'<path d="{fragment_path(**FRAG)}" fill="{C["rosa"]}"/></g>',
          "CAROLIZE — avatar"))

    # --- modulo TS para os componentes -------------------------------------
    data = {
        "wordmark": {"parts": parts, "width": round(W, 3), "cap": round(cap, 3),
                     "pad": round(pad, 3)},
        "signature": {"text": SIG, "size": round(sig_size, 3), "y": round(sig_y, 3),
                      "track": round(track, 3),
                      "paths": [{"d": g["d"]} for g in sig_parts]},
        "symbol": {"ring": ring_path(gap_half=GAP), "frag": fragment_path(**FRAG),
                   "ringClosed": ring_path(gap_half=0.35), "r": R_OUT},
        "seal": build_seal(),
        "colors": C,
    }
    # --- universo grafico --------------------------------------------------
    cat = stickers.build()
    with open("src/lib/stickers.ts", "w", encoding="utf-8") as fh:
        fh.write("// GERADO POR tools/build-brand.py — nao editar a mao.\n"
                 "// Formas definidas em tools/stickers.py. Rode `npm run brand`.\n\n"
                 "export interface Adesivo { vb: string; d: string; "
                 "t: 'preenchido' | 'traco'; lw?: number }\n\n"
                 "export const adesivos = " + json.dumps(cat, ensure_ascii=False, indent=1)
                 + " satisfies Record<string, Adesivo>;\n\n"
                 "export type NomeAdesivo = keyof typeof adesivos;\n"
                 "export default adesivos;\n")
    print(f"  src/lib/stickers.ts  ({len(cat)} formas)")

    os.makedirs("src/lib", exist_ok=True)
    with open("src/lib/brand-paths.ts", "w", encoding="utf-8") as fh:
        fh.write("// GERADO POR tools/build-brand.py — nao editar a mao.\n"
                 "// Rode `npm run brand` apos alterar tools/geometry.py.\n"
                 "export const brand = " + json.dumps(data, ensure_ascii=False, indent=1)
                 + " as const;\nexport default brand;\n")
    print("  src/lib/brand-paths.ts")

if __name__ == "__main__":
    main()
