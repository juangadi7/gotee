/* GOTEE — el armario (página Productos)
   Las prendas cuelgan DE LADO en una barra, como en un perchero de verdad.
   Al pasar el ratón por encima, la prenda que toca gira y sale al frente.
   Al pulsar se abre SIEMPRE la que está al frente, en su propia página. */
(() => {
  const { t, $, $$, reduceMotion } = window.GOTEE;
  const C = window.CATALOGO;
  const rack = $("[data-rack]");
  if (!rack || !C) return;

  const todas = C.lista();
  const capa = $("[data-rack-items]");
  capa.innerHTML = todas.map((x, i) => `
    <a class="g" href="${C.url(x.p, x.c)}" data-i="${i}" data-tipo="${x.p}" style="--a:${x.a}">
      <svg class="g__hook" viewBox="0 0 24 34" aria-hidden="true"><path d="M12 33V21C12 16 18 14 18 9C18 2 7 2 7 9"/></svg>
      <span class="g__body">
        <svg class="percha" viewBox="0 0 120 56" aria-hidden="true"><use href="#percha"/></svg>
        <img src="${x.img}" alt="" decoding="async" draggable="false">
      </span>
    </a>`).join("");
  const els = $$(".g", capa);
  const telas = new Map(els.map((el) => [el, window.crearTela?.(el)]));
  $("[data-cloth-demo]").addEventListener("click", () => telas.get(visibles[activo])?.impulse());

  const nombreProd = (x) => t(`prod.${x.p}`);
  const nombreColor = (x) => t(C.productos[x.p].claveColor(x.c));

  let visibles = els.slice();          // prendas que se ven con el filtro actual
  let activo = 0;                      // posición (dentro de visibles) de la que está al frente
  let medidas = { w: 300, paso: 50 };
  let ampliado = false;
  function ampliar(value) {
    if (ampliado === value) return;
    ampliado = value;
    rack.classList.toggle('is-inspecting', value);
    colocar();
  }

  function medir() {
    const w = els[0].offsetWidth || 300;
    medidas = { w, paso: Math.max(28, w * 0.17) };
  }

  /* coloca cada prenda: la activa de frente; las demás de lado, a izquierda y derecha */
  function colocar() {
    const { w, paso } = medidas;
    const xDe = (k) => {
      const o = k - activo, d = Math.abs(o), s = Math.sign(o);
      return o === 0 ? 0 : s * (w * 0.5 + paso * 1.25 + (d - 1) * paso);
    };
    // el perchero entero queda centrado, así la prenda que sale queda debajo del ratón
    const n = visibles.length;
    const izq = xDe(0) - (activo === 0 ? w / 2 : paso / 2);
    const der = xDe(n - 1) + (activo === n - 1 ? w / 2 : paso / 2);
    const centro = (izq + der) / 2;
    rack.style.setProperty("--x", `${(-centro).toFixed(1)}px`); // la luz y la sombra siguen a la prenda
    visibles.forEach((el, k) => {
      const o = k - activo, d = Math.abs(o), s = Math.sign(o);
      let x = xDe(k) - centro, z = 70, ry = 0, sh = 0;
      if (o !== 0) {
        x += ampliado ? s * w * .24 : 0;
        z = -30 - d * 10;
        ry = s > 0 ? -74 : 74;
        sh = Math.min(0.18 + d * 0.06, 0.5);
      }
      el.style.transform = `translate3d(${x.toFixed(1)}px, 0, ${z}px) rotateY(${ry}deg)`;
      el.style.zIndex = String(100 - d);
      el.style.setProperty("--sh", sh.toFixed(2));
      el.classList.toggle("is-on", o === 0);
      el.tabIndex = o === 0 ? 0 : -1;
    });
  }

  /* info de la prenda de frente */
  const nCount = $("[data-rack-count]"), nName = $("[data-rack-name]"), nColor = $("[data-rack-color]");
  const nDot = $("[data-rack-dot]"), nLink = $("[data-rack-link]"), texto = $(".rack__text");
  function info(animar = true) {
    const x = todas[+visibles[activo].dataset.i];
    const nuevo = `${nombreProd(x)}|${nombreColor(x)}`;
    const cambia = texto.dataset.actual !== nuevo;
    texto.dataset.actual = nuevo;
    nCount.textContent = `${String(activo + 1).padStart(2, "0")} / ${String(visibles.length).padStart(2, "0")}`;
    nName.textContent = nombreProd(x);
    nColor.textContent = nombreColor(x);
    nDot.style.background = `linear-gradient(135deg, ${x.a} 50%, ${x.b} 50%)`;
    nLink.href = C.url(x.p, x.c);
    rack.style.setProperty("--spot", x.a);
    visibles.forEach((el) => el.setAttribute("aria-label", `${nombreProd(todas[+el.dataset.i])}, ${nombreColor(todas[+el.dataset.i])}`));
    if (animar && cambia && !reduceMotion) {
      nName.animate([{ opacity: 0, transform: "translateY(10px)" }, { opacity: 1, transform: "none" }], { duration: 380, easing: "cubic-bezier(.16,1,.3,1)" });
    }
  }

  function poner(k, { foco = false } = {}) {
    k = Math.max(0, Math.min(visibles.length - 1, k));
    if (k === activo) return;
    const direccion = Math.sign(k - activo);
    activo = k;
    colocar();
    info();
    const el = visibles[activo];
    telas.get(el)?.impulse(direccion);
    if (!reduceMotion) {
      el.classList.remove("sway");
      void el.offsetWidth;
      el.classList.add("sway");
    }
    if (foco) el.focus({ preventScroll: true });
  }

  /* abrir la prenda de frente (con transición a su página si el navegador la soporta) */
  function abrir() {
    const el = visibles[activo];
    $("img", el).style.viewTransitionName = "prenda";
    location.href = el.getAttribute("href");
  }

  /* ===== RATÓN: la posición del ratón sobre el perchero elige la prenda ===== */
  const conRaton = matchMedia("(hover: hover) and (pointer: fine)").matches;
  rack.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') ampliar(true); });
  rack.addEventListener('pointerleave', () => ampliar(false));
  rack.addEventListener("pointermove", (e) => {
    if (e.pointerType !== "mouse") return;
    const hovered = e.target.closest('.g');
    if (hovered && visibles.includes(hovered)) {
      poner(visibles.indexOf(hovered));
      return;
    }
    const r = rack.getBoundingClientRect();
    const margen = r.width * 0.12;
    const f = (e.clientX - r.left - margen) / (r.width - margen * 2);
    poner(Math.round(Math.max(0, Math.min(1, f)) * (visibles.length - 1)));
  });

  /* ===== DEDO: deslizar cambia de prenda; tocar abre la de frente ===== */
  let toque = null;
  rack.addEventListener("pointerdown", (e) => {
    if (e.pointerType === "mouse") return;
    toque = { x: e.clientX, base: activo, movido: false };
  });
  rack.addEventListener("pointermove", (e) => {
    if (!toque) return;
    const d = e.clientX - toque.x;
    if (Math.abs(d) > 10) toque.movido = true;
    poner(toque.base - Math.round(d / 46));
  });
  const soltar = () => { setTimeout(() => { toque = null; }, 0); };
  rack.addEventListener("pointerup", soltar);
  rack.addEventListener("pointercancel", soltar);

  rack.addEventListener("click", (e) => {
    e.preventDefault();
    if (toque && toque.movido) return;
    const el = e.target.closest(".g");
    // con el dedo, tocar una prenda de lado la trae al frente; con el ratón ya está al frente
    if (el && !conRaton && visibles.indexOf(el) !== activo) return poner(visibles.indexOf(el));
    abrir();
  });

  /* ===== TECLADO Y FLECHAS ===== */
  els.forEach((el) => el.addEventListener("focus", () => {
    ampliar(true);
    const k = visibles.indexOf(el);
    if (k >= 0) poner(k);
  }));
  rack.addEventListener('focusout', (e) => {
    if (!rack.contains(e.relatedTarget) && !rack.matches(':hover')) ampliar(false);
  });
  rack.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") { e.preventDefault(); poner(activo + 1, { foco: true }); }
    if (e.key === "ArrowLeft") { e.preventDefault(); poner(activo - 1, { foco: true }); }
    if (e.key === "Enter") { e.preventDefault(); abrir(); }
  });
  $("[data-rack-prev]").addEventListener("click", () => poner(activo - 1));
  $("[data-rack-next]").addEventListener("click", () => poner(activo + 1));
  nLink.addEventListener("click", (e) => { e.preventDefault(); abrir(); });

  /* ===== FILTROS ===== */
  $$("[data-filtro]").forEach((b) => b.addEventListener("click", () => {
    const f = b.dataset.filtro;
    $$("[data-filtro]").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
    els.forEach((el) => { el.hidden = !(f === "todo" || el.dataset.tipo === f); });
    visibles = els.filter((el) => !el.hidden);
    activo = Math.floor((visibles.length - 1) / 2);
    entrada();
  }));

  /* ===== ENTRADA: las prendas llegan deslizándose por la barra ===== */
  function entrada() {
    medir();
    if (reduceMotion) { colocar(); info(false); return; }
    visibles.forEach((el) => {
      el.style.transition = "none";
      el.style.transform = `translate3d(${innerWidth * 0.6}px, 0, -200px) rotateY(-80deg)`;
      el.style.opacity = "0";
    });
    void capa.offsetWidth;
    visibles.forEach((el, k) => {
      el.style.transition = "";
      el.style.transitionDelay = `${k * 55}ms`;
      el.style.opacity = "";
    });
    colocar();
    info(false);
    setTimeout(() => visibles.forEach((el) => { el.style.transitionDelay = ""; }), 1400);
  }

  /* textos según se use ratón o dedo */
  const pista = $("[data-rack-hint]");
  function textos() {
    $("[data-cloth-demo]").textContent = document.documentElement.lang === "en" ? "Move the fabric" : "Mover la tela";
    $("[data-cloth-demo]").hidden = reduceMotion;
    pista.textContent = t(conRaton ? "pr.hint2" : "pr.hintTouch");
    info(false);
  }
  document.addEventListener("gotee:idioma", textos);
  addEventListener("resize", () => { medir(); colocar(); });

  activo = Math.floor((visibles.length - 1) / 2);
  entrada();
  textos();
})();
