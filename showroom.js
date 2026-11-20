/* GOTEE — showroom: la chica de la marca se pone la prenda que elijas.
   FOTOS PROVISIONALES (15-nov): sudaderas recoloreadas y camisetas pegadas encima.
   Cuando lleguen las fotos generadas, basta con sustituir los archivos img/showroom/look-*.webp (mismos nombres). */
(() => {
  const { t, $, $$, reduceMotion } = window.GOTEE;
  const C = window.CATALOGO;
  const sala = $("[data-sala]");
  if (!sala || !C) return;

  const LOOKS = [
    ...C.productos.sud.colores.map((x) => ({ p: "sud", c: x.c, a: x.a, b: x.b })),
    ...C.productos.tee.colores.map((x) => ({ p: "tee", c: x.c, a: x.a, b: x.a })),
    { p: "quillo", c: "crudo", a: "#EFE8DA", b: "#1F3A6B", sinTienda: true },
  ].map((x) => ({
    ...x,
    look: x.p === "quillo" ? "img/showroom/look-quillo.webp" : `img/showroom/look-${x.p}-${x.c}.webp`,
    thumb: x.p === "quillo" ? "img/showroom/thumb-quillo.webp" : `img/showroom/thumb-${x.p}-${x.c}.webp`,
  }));

  const nombre = (x) => t(`prod.${x.p}`);
  const color = (x) => (x.p === "quillo" ? t("sh.crudo") : t(C.productos[x.p].claveColor(x.c)));

  /* ---- tarjetas ---- */
  const lista = $("[data-sh-tarjetas]");
  lista.innerHTML = LOOKS.map((x, i) => `
    <li><button type="button" role="radio" class="tarjeta" data-i="${i}" style="--a:${x.a};--b:${x.b}" aria-checked="false">
      <span class="tarjeta__img"><img src="${x.thumb}" alt="" loading="lazy" draggable="false"></span>
      <span class="tarjeta__n"></span><span class="tarjeta__c"></span>
    </button></li>`).join("");
  const tarjetas = $$(".tarjeta", lista);
  function textosTarjetas() {
    tarjetas.forEach((b, i) => {
      $(".tarjeta__n", b).textContent = nombre(LOOKS[i]);
      $(".tarjeta__c", b).textContent = color(LOOKS[i]);
    });
  }

  /* ---- cambiar de ropa ---- */
  const capas = $$("[data-capa]");
  const barrido = $(".modelo__barrido");
  let actual = 0, ocupado = false, pendiente = null;

  async function cargar(src) {
    const im = new Image();
    im.src = src;
    try { await Promise.race([im.decode(), new Promise((r) => setTimeout(r, 1500))]); } catch (e) {}
  }

  function info(i) {
    const x = LOOKS[i];
    $("[data-sh-nombre]").textContent = nombre(x);
    $("[data-sh-color]").textContent = color(x);
    $("[data-sh-dot]").style.background = `linear-gradient(135deg, ${x.a} 50%, ${x.b} 50%)`;
    const link = $("[data-sh-link]");
    link.hidden = !!x.sinTienda;
    $("[data-sh-pronto]").hidden = !x.sinTienda;
    if (!x.sinTienda) link.href = C.url(x.p, x.c);
    sala.style.setProperty("--tinte", x.a);
    tarjetas.forEach((b, k) => b.setAttribute("aria-checked", String(k === i)));
    $$("img", capas[0].parentElement).forEach((im) => { im.alt = `${nombre(x)} GOTEE, ${color(x).toLowerCase()}`; });
  }

  async function poner(i, { animar = true } = {}) {
    i = (i + LOOKS.length) % LOOKS.length;
    if (ocupado) { pendiente = i; return; }
    if (i === actual && animar) return;
    ocupado = true;
    actual = i;
    const x = LOOKS[i];
    info(i);
    const visible = capas.find((c) => c.classList.contains("is-on"));
    const oculta = capas.find((c) => c !== visible);
    await cargar(x.look);
    oculta.src = x.look;
    if (!animar || reduceMotion) {
      oculta.classList.add("is-on"); visible.classList.remove("is-on");
    } else {
      // la ropa nueva entra con un barrido de luz de arriba abajo
      oculta.classList.add("is-on", "is-entrando");
      oculta.style.zIndex = "2"; visible.style.zIndex = "1";
      const dur = 900;
      oculta.animate([{ clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)" }], { duration: dur, easing: "cubic-bezier(.65,0,.35,1)" });
      barrido.animate([{ transform: "translateY(-10%)", opacity: 0 }, { opacity: 1, offset: 0.15 }, { opacity: 1, offset: 0.85 }, { transform: "translateY(1000%)", opacity: 0 }], { duration: dur, easing: "cubic-bezier(.65,0,.35,1)" });
      capas[0].parentElement.animate([{ transform: "scale(1)" }, { transform: "scale(1.015)" }, { transform: "scale(1)" }], { duration: dur });
      await new Promise((r) => setTimeout(r, dur + 30));
      visible.classList.remove("is-on");
      oculta.classList.remove("is-entrando");
    }
    ocupado = false;
    if (pendiente !== null) { const p = pendiente; pendiente = null; poner(p); }
  }

  /* ---- elegir ---- */
  function elegir(i) { pararPasarela(); poner(i); centrarTarjeta(i); }
  function centrarTarjeta(i) {
    const b = tarjetas[(i + LOOKS.length) % LOOKS.length];
    const l = lista.getBoundingClientRect(), r = b.getBoundingClientRect();
    lista.scrollBy({ left: r.left + r.width / 2 - (l.left + l.width / 2), behavior: reduceMotion ? "auto" : "smooth" });
  }
  lista.addEventListener("click", (e) => {
    const b = e.target.closest(".tarjeta");
    if (b) elegir(+b.dataset.i);
  });
  lista.addEventListener("keydown", (e) => {
    const paso = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!paso) return;
    e.preventDefault();
    const sig = (actual + paso + LOOKS.length) % LOOKS.length;
    elegir(sig);
    tarjetas[sig].focus({ preventScroll: true });
  });
  $("[data-sh-prev]").addEventListener("click", () => elegir(actual - 1));
  $("[data-sh-next]").addEventListener("click", () => elegir(actual + 1));

  /* ---- pasarela: cambia sola cada pocos segundos hasta que tocas algo ---- */
  const btnAuto = $("[data-sh-auto]"), barra = $("[data-sh-progreso]");
  const CADA = 4200;
  let reloj = null, enVista = true, anim = null;
  function arrancar() {
    clearTimeout(reloj);
    if (btnAuto.getAttribute("aria-pressed") !== "true" || !enVista || document.hidden || reduceMotion) return;
    anim?.cancel();
    anim = barra.animate([{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }], { duration: CADA, easing: "linear", fill: "forwards" });
    reloj = setTimeout(() => { poner(actual + 1); centrarTarjeta(actual + 1); arrancar(); }, CADA);
  }
  function pararPasarela() {
    btnAuto.setAttribute("aria-pressed", "false");
    clearTimeout(reloj); anim?.cancel();
  }
  btnAuto.addEventListener("click", () => {
    const on = btnAuto.getAttribute("aria-pressed") !== "true";
    btnAuto.setAttribute("aria-pressed", String(on));
    if (on) { poner(actual + 1); arrancar(); } else pararPasarela();
  });
  new IntersectionObserver(([e]) => { enVista = e.isIntersecting; if (enVista) arrancar(); else { clearTimeout(reloj); anim?.cancel(); } }, { threshold: 0.3 }).observe(sala);
  document.addEventListener("visibilitychange", () => (document.hidden ? clearTimeout(reloj) : arrancar()));

  /* precarga del resto de looks */
  (window.requestIdleCallback || setTimeout)(() => LOOKS.forEach((x) => { new Image().src = x.look; }));

  /* ---- idioma ---- */
  document.addEventListener("gotee:idioma", () => { textosTarjetas(); info(actual); });

  /* abrir con una prenda concreta: showroom.html?p=tee&c=oliva */
  const q = new URLSearchParams(location.search);
  const inicio = Math.max(0, LOOKS.findIndex((x) => x.p === q.get("p") && x.c === q.get("c")));
  textosTarjetas();
  actual = -1;
  poner(inicio, { animar: false }).then(() => { if (q.get("p")) pararPasarela(); else arrancar(); });
})();
