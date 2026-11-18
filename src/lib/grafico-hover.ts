/* Tooltip único e delegado para todos os gráficos da página.
   Cada marca carrega data-ponto, data-rotulo e data-valor. */
export function iniciarTooltips() {
  const graficos = document.querySelectorAll<HTMLElement>('[data-grafico]');
  if (!graficos.length) return;

  const dica = document.createElement('div');
  dica.className = 'g-dica';
  dica.setAttribute('role', 'status');
  dica.setAttribute('aria-live', 'polite');
  dica.hidden = true;
  document.body.append(dica);

  let visivel: Element | null = null;

  const mostrar = (alvo: HTMLElement, x: number, y: number) => {
    dica.innerHTML =
      `<strong>${alvo.dataset.rotulo ?? ''}</strong>` +
      (alvo.dataset.valor ? `<span>${alvo.dataset.valor}</span>` : '') +
      (alvo.dataset.nota ? `<em>${alvo.dataset.nota}</em>` : '');
    dica.hidden = false;
    const r = dica.getBoundingClientRect();
    const px = Math.min(Math.max(8, x - r.width / 2), innerWidth - r.width - 8);
    dica.style.transform = `translate(${px}px, ${Math.max(8, y - r.height - 14)}px)`;
  };

  const esconder = () => { dica.hidden = true; visivel = null; };

  for (const g of graficos) {
    g.addEventListener('pointermove', (e) => {
      const alvo = (e.target as Element).closest<HTMLElement>('[data-ponto]');
      if (!alvo) { if (visivel) esconder(); return; }
      visivel = alvo;
      mostrar(alvo, e.clientX, e.clientY);
    });
    g.addEventListener('pointerleave', esconder);
    // teclado: o foco em uma marca mostra o mesmo conteúdo
    g.addEventListener('focusin', (e) => {
      const alvo = (e.target as Element).closest<HTMLElement>('[data-ponto]');
      if (!alvo) return;
      const r = alvo.getBoundingClientRect();
      mostrar(alvo, r.left + r.width / 2, r.top);
    });
    g.addEventListener('focusout', esconder);
  }
  addEventListener('scroll', esconder, { passive: true });
}
