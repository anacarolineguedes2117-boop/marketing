/* ============================================================================
   CAROLIZE — movimento
   Um unico IntersectionObserver para todas as revelacoes da pagina.
   Nada de biblioteca de animacao: CSS faz o trabalho, o JS so marca estado.
   ========================================================================= */

const REDUZIDO = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Revela elementos [data-revelar] quando entram na viewport. */
export function iniciarRevelacoes(raiz: ParentNode = document) {
  const alvos = raiz.querySelectorAll<HTMLElement>('[data-revelar]:not([data-visivel])');
  if (!alvos.length) return;

  if (REDUZIDO()) {
    alvos.forEach((el) => el.setAttribute('data-visivel', ''));
    return;
  }

  const obs = new IntersectionObserver(
    (entradas) => {
      for (const e of entradas) {
        if (!e.isIntersecting) continue;
        (e.target as HTMLElement).setAttribute('data-visivel', '');
        obs.unobserve(e.target);
      }
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
  );
  alvos.forEach((el) => obs.observe(el));
}

/** Marca o capitulo visivel e sincroniza o indice lateral. */
export function iniciarIndice() {
  const secoes = [...document.querySelectorAll<HTMLElement>('[data-capitulo]')];
  const marcas = [...document.querySelectorAll<HTMLAnchorElement>('[data-indice-item]')];
  if (!secoes.length) return;

  const barra = document.querySelector<HTMLElement>('[data-progresso]');

  const obs = new IntersectionObserver(
    (entradas) => {
      for (const e of entradas) {
        if (!e.isIntersecting) continue;
        const id = (e.target as HTMLElement).dataset.capitulo!;
        document.documentElement.dataset.capituloAtual = id;
        marcas.forEach((m) =>
          m.toggleAttribute('data-ativo', m.dataset.indiceItem === id),
        );
      }
    },
    { rootMargin: '-45% 0px -45% 0px' },
  );
  secoes.forEach((s) => obs.observe(s));

  if (barra) {
    let pendente = false;
    const atualizar = () => {
      pendente = false;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      barra.style.setProperty('--p', String(h > 0 ? window.scrollY / h : 0));
    };
    addEventListener('scroll', () => {
      if (pendente) return;
      pendente = true;
      requestAnimationFrame(atualizar);
    }, { passive: true });
    atualizar();
  }
}

/** Parallax discreto em [data-parallax]. Desligado em toque e reduced-motion. */
export function iniciarParallax() {
  if (REDUZIDO() || !matchMedia('(hover: hover) and (min-width: 64rem)').matches) return;
  const itens = [...document.querySelectorAll<HTMLElement>('[data-parallax]')];
  if (!itens.length) return;

  let pendente = false;
  const mover = () => {
    pendente = false;
    const vh = window.innerHeight;
    for (const el of itens) {
      const r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) continue;
      const centro = (r.top + r.height / 2 - vh / 2) / vh;      // -1 .. 1
      const forca = Number(el.dataset.parallax) || 18;
      el.style.setProperty('--py', `${(-centro * forca).toFixed(2)}px`);
    }
  };
  addEventListener('scroll', () => {
    if (pendente) return;
    pendente = true;
    requestAnimationFrame(mover);
  }, { passive: true });
  addEventListener('resize', mover, { passive: true });
  mover();
}

/** Botoes magneticos: o alvo acompanha discretamente o cursor. */
export function iniciarMagnetico() {
  if (REDUZIDO() || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  for (const el of document.querySelectorAll<HTMLElement>('[data-magnetico]')) {
    const forca = Number(el.dataset.magnetico) || 10;
    el.addEventListener('pointermove', (ev) => {
      const r = el.getBoundingClientRect();
      const x = (ev.clientX - r.left - r.width / 2) / (r.width / 2);
      const y = (ev.clientY - r.top - r.height / 2) / (r.height / 2);
      el.style.setProperty('--mx', `${(x * forca).toFixed(2)}px`);
      el.style.setProperty('--my', `${(y * forca).toFixed(2)}px`);
    });
    el.addEventListener('pointerleave', () => {
      el.style.setProperty('--mx', '0px');
      el.style.setProperty('--my', '0px');
    });
  }
}

/** Tooltips dos graficos — so carrega se a pagina tiver algum. */
export async function iniciarGraficos() {
  if (!document.querySelector('[data-grafico]')) return;
  const { iniciarTooltips } = await import('./grafico-hover');
  iniciarTooltips();
}

/** Rolagem com inercia (Lenis). Opcional: so entra em ponteiro fino. */
export async function iniciarRolagem() {
  if (REDUZIDO() || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  try {
    const { default: Lenis } = await import('lenis');
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, wheelMultiplier: 0.95 });
    const quadro = (t: number) => { lenis.raf(t); requestAnimationFrame(quadro); };
    requestAnimationFrame(quadro);
    document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', (ev) => {
        const alvo = document.querySelector(a.getAttribute('href')!);
        if (!alvo) return;
        ev.preventDefault();
        lenis.scrollTo(alvo as HTMLElement, { offset: 0 });
      });
    });
  } catch { /* sem inercia: a rolagem nativa ja resolve */ }
}

export function iniciarTudo() {
  iniciarRevelacoes();
  iniciarGraficos();
  iniciarIndice();
  iniciarParallax();
  iniciarMagnetico();
  iniciarRolagem();
}
