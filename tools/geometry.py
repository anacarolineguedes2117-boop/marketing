"""Geometria do simbolo CAROLIZE. Anel de peso modulado (contraste tipografico
didone) aberto na diagonal: um O que se torna C — a transformacao do sufixo -IZE."""
import math

R_OUT = 50.0          # raio externo
R_IN = 32.0           # raio interno
STRESS_DEG = -38.0    # eixo de afinamento (SVG: y para baixo => -38 = diagonal superior-direita)
OFFSET = 6.0          # deslocamento do circulo interno ao longo do eixo de stress
GAP_HALF = 25.0       # meia-abertura angular da boca
FRAG_SPAN = 17.0      # extensao angular do fragmento destacado
FRAG_SCALE = 1.165    # afastamento radial do fragmento


def pol(cx, cy, r, deg):
    a = math.radians(deg)
    return (cx + r * math.cos(a), cy + r * math.sin(a))


def f(v):
    s = f"{v:.3f}".rstrip("0").rstrip(".")
    return "0" if s in ("-0", "") else s


def ring_path(gap_half=GAP_HALF, r_out=R_OUT, r_in=R_IN, offset=OFFSET, stress=STRESS_DEG):
    """Anel aberto: arco externo longo, corte terminal, arco interno de volta."""
    icx, icy = pol(0, 0, offset, stress)
    a1 = stress + gap_half   # borda inferior da boca
    a2 = stress - gap_half   # borda superior da boca
    o1, o2 = pol(0, 0, r_out, a1), pol(0, 0, r_out, a2)
    i1, i2 = pol(icx, icy, r_in, a1), pol(icx, icy, r_in, a2)
    return (
        f"M{f(o1[0])} {f(o1[1])}"
        f"A{f(r_out)} {f(r_out)} 0 1 1 {f(o2[0])} {f(o2[1])}"   # externo, sentido horario, arco maior
        f"L{f(i2[0])} {f(i2[1])}"
        f"A{f(r_in)} {f(r_in)} 0 1 0 {f(i1[0])} {f(i1[1])}"     # interno, de volta
        "Z"
    )


def fragment_path(gap_half=GAP_HALF, span=FRAG_SPAN, scale=FRAG_SCALE,
                  r_out=R_OUT, r_in=R_IN, offset=OFFSET, stress=STRESS_DEG):
    """Fragmento destacado: o pedaco que se soltou do anel. Mantem o mesmo
    afinamento, deslocado para fora — o gesto de transformacao."""
    icx, icy = pol(0, 0, offset, stress)
    ro, ri = r_out * scale, r_in * scale
    icx, icy = icx * scale, icy * scale
    a1, a2 = stress + span / 2, stress - span / 2
    o1, o2 = pol(0, 0, ro, a1), pol(0, 0, ro, a2)
    i1, i2 = pol(icx, icy, ri, a1), pol(icx, icy, ri, a2)
    return (
        f"M{f(o1[0])} {f(o1[1])}"
        f"A{f(ro)} {f(ro)} 0 0 0 {f(o2[0])} {f(o2[1])}"
        f"L{f(i2[0])} {f(i2[1])}"
        f"A{f(ri)} {f(ri)} 0 0 1 {f(i1[0])} {f(i1[1])}"
        "Z"
    )


def dot_path(scale=1.165, r=5.4, stress=STRESS_DEG, r_out=R_OUT, r_in=R_IN):
    cx, cy = pol(0, 0, (r_out + r_in) / 2 * scale, stress)
    return f"M{f(cx - r)} {f(cy)}a{f(r)} {f(r)} 0 1 0 {f(2*r)} 0a{f(r)} {f(r)} 0 1 0 {f(-2*r)} 0Z"
