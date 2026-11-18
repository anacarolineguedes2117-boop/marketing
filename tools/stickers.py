"""
CAROLIZE — universo grafico.

Adesivos, selos, carimbos, recortes e intervencoes. Tudo gerado com geometria
controlada e ruido deterministico (semente fixa): o resultado e identico a cada
build, mas a mao nao parece de regua.
"""
import math, random

def f(v):
    s = f"{v:.2f}".rstrip("0").rstrip(".")
    return "0" if s in ("-0", "") else s

def P(x, y): return f"{f(x)} {f(y)}"

def rng(seed):
    r = random.Random(seed); return lambda a=-1.0, b=1.0: r.uniform(a, b)


# ---------------------------------------------------------------- estrelas
def sparkle(n=4, R=50, inner=0.17, cx=50, cy=50, rot=-90):
    """Brilho de pontas concavas. O classico do vocabulario editorial."""
    pts = []
    for i in range(n):
        a = math.radians(rot + i * 360 / n)
        pts.append((cx + R * math.cos(a), cy + R * math.sin(a)))
    d = f"M{P(*pts[0])}"
    for i in range(n):
        p, q = pts[i], pts[(i + 1) % n]
        am = math.radians(rot + (i + 0.5) * 360 / n)
        mx, my = cx + R * inner * math.cos(am), cy + R * inner * math.sin(am)
        c1 = (p[0] + (mx - p[0]) * 0.55, p[1] + (my - p[1]) * 0.55)
        c2 = (q[0] + (mx - q[0]) * 0.55, q[1] + (my - q[1]) * 0.55)
        d += f"C{P(*c1)} {P(*c2)} {P(*q)}"
    return d + "Z"


def asterisco(n=6, R=46, w=7.5, cx=50, cy=50, rot=-90):
    """Asterisco de hastes afiladas — pontuacao grafica da marca."""
    out = []
    for i in range(n):
        a = math.radians(rot + i * 360 / n)
        ca, sa = math.cos(a), math.sin(a)
        px, py = -sa, ca                       # perpendicular
        tip = (cx + R * ca, cy + R * sa)
        b1 = (cx + px * w / 2, cy + py * w / 2)
        b2 = (cx - px * w / 2, cy - py * w / 2)
        t1 = (tip[0] + px * w * 0.17, tip[1] + py * w * 0.17)
        t2 = (tip[0] - px * w * 0.17, tip[1] - py * w * 0.17)
        out.append(f"M{P(*b1)}L{P(*t1)}L{P(*t2)}L{P(*b2)}Z")
    return "".join(out)


# ----------------------------------------------------------------- organico
def blob(lobos=5, R=44, var=0.16, cx=50, cy=50, seed=7):
    """Forma organica fechada — contraponto macio a rigidez da grade."""
    j = rng(seed)
    n = lobos * 2
    pts = []
    for i in range(n):
        a = 2 * math.pi * i / n
        r = R * (1 + j(-var, var))
        pts.append((cx + r * math.cos(a), cy + r * math.sin(a), a, r))
    d = f"M{P(pts[0][0], pts[0][1])}"
    k = 4 / 3 * math.tan(math.pi / (2 * n))
    for i in range(n):
        x0, y0, a0, r0 = pts[i]
        x1, y1, a1, r1 = pts[(i + 1) % n]
        c1 = (x0 - k * r0 * math.sin(a0), y0 + k * r0 * math.cos(a0))
        c2 = (x1 + k * r1 * math.sin(a1), y1 - k * r1 * math.cos(a1))
        d += f"C{P(*c1)} {P(*c2)} {P(x1, y1)}"
    return d + "Z"


# ------------------------------------------------------------------ carimbo
def carimbo_borda(w=100, h=100, dente=4.6, seed=11):
    """Moldura de carimbo: borda denteada, como selo postal recortado."""
    j = rng(seed)
    pts = []
    def lado(x0, y0, x1, y1):
        dist = math.hypot(x1 - x0, y1 - y0)
        n = max(3, round(dist / dente))
        for i in range(n):
            t = i / n
            x, y = x0 + (x1 - x0) * t, y0 + (y1 - y0) * t
            nx, ny = -(y1 - y0) / dist, (x1 - x0) / dist
            o = (dente * 0.42) * (1 if i % 2 else -1) * (1 + j(-.18, .18))
            pts.append((x + nx * o, y + ny * o))
    lado(0, 0, w, 0); lado(w, 0, w, h); lado(w, h, 0, h); lado(0, h, 0, 0)
    return "M" + "L".join(P(*p) for p in pts) + "Z"


def recorte(w=100, h=100, rasgo=3.2, seed=23, lados=(0, 1, 1, 0)):
    """Recorte de papel. `lados` = (topo, direita, base, esquerda), 1 = rasgado."""
    j = rng(seed)
    pts = []
    def lado(x0, y0, x1, y1, rasgado):
        if not rasgado:
            pts.append((x1, y1)); return
        dist = math.hypot(x1 - x0, y1 - y0)
        n = max(6, round(dist / rasgo))
        nx, ny = -(y1 - y0) / dist, (x1 - x0) / dist
        for i in range(1, n + 1):
            t = i / n
            x, y = x0 + (x1 - x0) * t, y0 + (y1 - y0) * t
            o = j(-rasgo * .78, rasgo * .78)
            pts.append((x + nx * o, y + ny * o))
    pts.append((0, 0))
    lado(0, 0, w, 0, lados[0]); lado(w, 0, w, h, lados[1])
    lado(w, h, 0, h, lados[2]); lado(0, h, 0, 0, lados[3])
    return "M" + "L".join(P(*p) for p in pts) + "Z"


# --------------------------------------------------------------- intervencoes
def rabisco(w=160, h=22, voltas=1, seed=5):
    """Sublinhado feito a mao — marca de leitura sobre a palavra."""
    j = rng(seed)
    y = h * 0.62
    d = f"M{P(1, y + j(-1.4, 1.4))}"
    passos = 7
    for i in range(1, passos + 1):
        t = i / passos
        x = 1 + (w - 2) * t
        cy1 = y + math.sin(t * math.pi * 2.1) * h * 0.22 + j(-1.6, 1.6)
        cy2 = y - math.sin(t * math.pi * 1.7) * h * 0.18 + j(-1.6, 1.6)
        px = 1 + (w - 2) * (t - 1 / passos)
        d += f"C{P(px + (x - px) * .35, cy1)} {P(px + (x - px) * .7, cy2)} {P(x, y + j(-1.8, 1.8))}"
    return d


def onda(w=160, h=16, ciclos=4):
    """Linha ondulada — divisor e acento ritmico."""
    y, amp = h / 2, h * 0.36
    seg = w / ciclos
    d = f"M{P(0, y)}"
    for i in range(ciclos):
        x0 = i * seg
        d += (f"C{P(x0 + seg * .25, y - amp)} {P(x0 + seg * .25, y + amp)} {P(x0 + seg * .5, y)}"
              f"C{P(x0 + seg * .75, y - amp)} {P(x0 + seg * .75, y + amp)} {P(x0 + seg, y)}")
    return d


def seta(w=120, h=64, seed=3):
    """Seta curva desenhada a mao. Conduz o olhar sem apontar o obvio."""
    j = rng(seed)
    x0, y0 = 4, h - 8
    x1, y1 = w - 12, 10
    corpo = (f"M{P(x0, y0)}C{P(w * .28, h * .96 + j())} {P(w * .52, h * .22 + j())} {P(x1, y1)}")
    ang = math.atan2(y1 - (h * .22 + j()), x1 - w * .52)
    L = 16
    for d_ in (143, -143):
        a = ang + math.radians(d_)
        corpo += f"M{P(x1, y1)}L{P(x1 + L * math.cos(a), y1 + L * math.sin(a))}"
    return corpo


def colchete(w=26, h=120, lado='esq'):
    """Colchete editorial — enquadra sem fechar."""
    b = 3
    if lado == 'esq':
        return f"M{P(w, b)}L{P(b, b)}L{P(b, h - b)}L{P(w, h - b)}"
    return f"M{P(0, b)}L{P(w - b, b)}L{P(w - b, h - b)}L{P(0, h - b)}"


def fita(w=150, h=46, dente=5.5, seed=17):
    """Fita adesiva: topo e base retos com leve ondulacao, pontas rasgadas em
    dente de serra — o gesto de quem arranca a fita do rolo."""
    j = rng(seed)
    pts = []
    n = 10
    for i in range(n + 1):                                  # topo
        pts.append((dente + (w - 2 * dente) * i / n, j(-1.2, 1.2)))
    m = 5
    for i in range(1, m + 1):                               # ponta direita
        pts.append((w - (dente if i % 2 else 0) + j(-.8, .8), h * i / m))
    for i in range(n, -1, -1):                              # base
        pts.append((dente + (w - 2 * dente) * i / n, h + j(-1.2, 1.2)))
    for i in range(m - 1, 0, -1):                           # ponta esquerda
        pts.append(((dente if i % 2 else 0) + j(-.8, .8), h * i / m))
    return "M" + "L".join(P(*p) for p in pts) + "Z"


def etiqueta(w=140, h=54, corte=20, furo=6):
    """Etiqueta com ponta cortada e furo — rotulo de arquivo."""
    d = (f"M{P(corte, 0)}L{P(w, 0)}L{P(w, h)}L{P(corte, h)}L{P(0, h / 2)}Z")
    cx, cy = corte * .92, h / 2
    d += (f"M{P(cx - furo, cy)}a{f(furo)} {f(furo)} 0 1 0 {f(2 * furo)} 0"
          f"a{f(furo)} {f(furo)} 0 1 0 {f(-2 * furo)} 0Z")
    return d


def alvo(cx=50, cy=50, aneis=3, R=44):
    """Alvo concentrico — estrategia, direcao, foco."""
    out = []
    for i in range(aneis):
        r = R * (1 - i / aneis)
        out.append(f"M{P(cx - r, cy)}a{f(r)} {f(r)} 0 1 0 {f(2 * r)} 0a{f(r)} {f(r)} 0 1 0 {f(-2 * r)} 0Z")
    return "".join(out)


def janela(w=100, h=78, barra=16):
    """Janela — a marca vista por dentro de uma tela."""
    return (f"M0 0L{P(w, 0)}L{P(w, h)}L{P(0, h)}Z"
            f"M0 {f(barra)}L{P(w, barra)}")


def moldura_cantos(w=100, h=100, L=22):
    """Quatro cantos — enquadramento de visor fotografico."""
    return (f"M0 {f(L)}L0 0L{f(L)} 0"
            f"M{f(w - L)} 0L{f(w)} 0L{f(w)} {f(L)}"
            f"M{f(w)} {f(h - L)}L{f(w)} {f(h)}L{f(w - L)} {f(h)}"
            f"M{f(L)} {f(h)}L0 {f(h)}L0 {f(h - L)}")


def build():
    """Devolve o catalogo completo. `t` = 'preenchido' ou 'traco'."""
    return {
        'estrela':    {'vb': '0 0 100 100', 'd': sparkle(4), 't': 'preenchido'},
        'estrela6':   {'vb': '0 0 100 100', 'd': sparkle(6, inner=.2), 't': 'preenchido'},
        'brilho':     {'vb': '0 0 100 100', 'd': sparkle(4, inner=.055, R=49), 't': 'preenchido'},
        'asterisco':  {'vb': '0 0 100 100', 'd': asterisco(), 't': 'preenchido'},
        'organica':   {'vb': '0 0 100 100', 'd': blob(lobos=5, var=.21, seed=7), 't': 'preenchido'},
        'organica2':  {'vb': '0 0 100 100', 'd': blob(lobos=3, var=.3, seed=31), 't': 'preenchido'},
        'carimbo':    {'vb': '-4 -4 108 108', 'd': carimbo_borda(dente=7.2), 't': 'preenchido'},
        'recorte':    {'vb': '-4 -4 108 108', 'd': recorte(rasgo=5.4), 't': 'preenchido'},
        'recorteTodo':{'vb': '-4 -4 108 108', 'd': recorte(rasgo=5.4, lados=(1, 1, 1, 1), seed=41), 't': 'preenchido'},
        'etiqueta':   {'vb': '0 0 140 54', 'd': etiqueta(), 't': 'preenchido'},
        'fita':       {'vb': '0 0 150 46', 'd': fita(), 't': 'preenchido'},
        'rabisco':    {'vb': '0 0 160 22', 'd': rabisco(), 't': 'traco', 'lw': 2.6},
        'onda':       {'vb': '0 0 160 16', 'd': onda(), 't': 'traco', 'lw': 2},
        'seta':       {'vb': '0 0 120 64', 'd': seta(), 't': 'traco', 'lw': 2.8},
        'colcheteEsq':{'vb': '0 0 26 120', 'd': colchete(), 't': 'traco', 'lw': 2.4},
        'colcheteDir':{'vb': '0 0 26 120', 'd': colchete(lado='dir'), 't': 'traco', 'lw': 2.4},
        'bussola':    {'vb': '0 0 100 100', 'd': alvo(), 't': 'traco', 'lw': 3},
        'janela':     {'vb': '0 0 100 78', 'd': janela(), 't': 'traco', 'lw': 3},
        'moldura':    {'vb': '0 0 100 100', 'd': moldura_cantos(), 't': 'traco', 'lw': 2.6},
        'selo':       {'vb': '0 0 100 100', 'd': alvo(aneis=1, R=46), 't': 'traco', 'lw': 2.4},
    }
