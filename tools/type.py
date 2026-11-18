"""Converte texto em curvas usando as fontes variaveis do projeto."""
import sys, math
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.misc.transform import Transform

FONTS = {
    "fraunces": "public/fonts/fraunces-latin.woff2",
    "archivo": "public/fonts/archivo-latin.woff2",
    "mono": "public/fonts/dmmono-latin.woff2",
}
_cache = {}

def load(name, **axes):
    key = (name, tuple(sorted(axes.items())))
    if key in _cache: return _cache[key]
    f = TTFont(FONTS[name])
    if axes and "fvar" in f:
        f = instancer.instantiateVariableFont(f, axes, inplace=False, updateFontNames=False)
    _cache[key] = f
    return f

def text_paths(name, text, size=100, tracking=0.0, kern=None, **axes):
    """Retorna (lista de paths, largura total). tracking em em/1000."""
    font = load(name, **axes)
    upm = font["head"].unitsPerEm
    gs = font.getGlyphSet()
    cmap = font.getBestCmap()
    scale = size / upm
    out, x = [], 0.0
    kern = kern or {}
    prev = None
    for ch in text:
        gname = cmap.get(ord(ch))
        if gname is None: raise KeyError(f"sem glifo para {ch!r}")
        if prev is not None:
            x += kern.get(prev + ch, 0) / 1000 * upm
        pen = SVGPathPen(gs, ntos=lambda v: f"{v:.2f}".rstrip("0").rstrip("."))
        tp = TransformPen(pen, Transform(scale, 0, 0, -scale, x * scale, 0))
        gs[gname].draw(tp)
        d = pen.getCommands()
        if d.strip(): out.append({"char": ch, "d": d, "x": x * scale})
        x += gs[gname].width + tracking / 1000 * upm
        prev = ch
    if out: x -= tracking / 1000 * upm
    return out, x * scale

def metrics(name, **axes):
    font = load(name, **axes)
    upm = font["head"].unitsPerEm
    os2 = font["OS/2"]
    return {"upm": upm, "cap": os2.sCapHeight / upm, "x": os2.sxHeight / upm,
            "asc": font["hhea"].ascent / upm, "desc": font["hhea"].descent / upm}


def glyph_bbox(name, ch, size=100, **axes):
    """Bounding box real do glifo (em unidades de desenho, y para cima)."""
    from fontTools.pens.boundsPen import BoundsPen
    font = load(name, **axes)
    upm = font["head"].unitsPerEm
    gs = font.getGlyphSet()
    gname = font.getBestCmap()[ord(ch)]
    bp = BoundsPen(gs)
    gs[gname].draw(bp)
    x0, y0, x1, y1 = bp.bounds
    s = size / upm
    return {"x0": x0*s, "y0": y0*s, "x1": x1*s, "y1": y1*s,
            "w": (x1-x0)*s, "h": (y1-y0)*s, "adv": gs[gname].width*s,
            "lsb": x0*s}
