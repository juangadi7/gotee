/* GOTEE — página de un producto: producto.html?p=sud&c=marron */
(() => {
  const { t, $, $$, reduceMotion } = window.GOTEE;
  const C = window.CATALOGO;
  if (!C || !$("[data-p-main]")) return;

  const q = new URLSearchParams(location.search);
  const prod = C.productos[q.get("p")] || C.productos.sud;
  let color = prod.colores.find((x) => x.c === q.get("c")) ? q.get("c") : prod.colores[0].c;
  let logo = q.get("logo") === "grande" ? "grande" : "pequeno";
  let foto = 0;

  const main = $("[data-p-main]"), cap = $("[data-p-cap]"), zoom = $("[data-p-zoom]");
  const thumbs = $("[data-p-thumbs]"), colores = $("[data-p-colores]");
  const nombreColor = (c) => t(prod.claveColor(c));

  /* ---- galería ---- */
  function fotos() { return prod.fotos(color, logo); }

  function verFoto(i, animar = true) {
    const lista = fotos();
    foto = Math.max(0, Math.min(lista.length - 1, i));
    const [src, clave, ajuste] = lista[foto];
    const poner = () => {
      main.src = src;
      main.dataset.ajuste = ajuste;
      cap.textContent = t(clave);
      main.alt = `${t(`prod.${prod.id}`)} GOTEE, ${nombreColor(color).toLowerCase()} — ${t(clave).toLowerCase()}`;
    };
    if (animar && !reduceMotion && main.getAttribute("src") !== src) {
      main.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 140, fill: "forwards" });
      setTimeout(() => {
        poner();
        main.getAnimations().forEach((a) => a.cancel());
        main.animate([{ opacity: 0, transform: "scale(.98)" }, { opacity: 1, transform: "none" }], { duration: 420, easing: "cubic-bezier(.16,1,.3,1)" });
      }, 150);
    } else poner();
    $$("button", thumbs).forEach((b, k) => b.setAttribute("aria-pressed", String(k === foto)));
  }

  function pintarMiniaturas() {
    thumbs.innerHTML = fotos().map(([src, clave, ajuste], k) => `
      <button type="button" aria-pressed="${k === foto}" aria-label="${t(clave)}">
        <img src="${src}" alt="" loading="lazy" data-ajuste="${ajuste}">
      </button>`).join("");
  }
  thumbs.addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (b) verFoto($$("button", thumbs).indexOf(b));
  });

  /* lupa: al pasar el ratón, la foto se amplía siguiendo el cursor */
  if (matchMedia("(hover: hover) and (pointer: fine)").matches) {
    zoom.addEventListener("pointermove", (e) => {
      const r = zoom.getBoundingClientRect();
      main.style.transformOrigin = `${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`;
      zoom.classList.add("is-zoom");
    });
    zoom.addEventListener("pointerleave", () => zoom.classList.remove("is-zoom"));
  } else {
    $(".prod__zoomtip")?.remove();
  }

  /* deslizar la foto con el dedo */
  let x0 = null;
  zoom.addEventListener("pointerdown", (e) => { if (e.pointerType !== "mouse") x0 = e.clientX; });
  zoom.addEventListener("pointerup", (e) => {
    if (x0 === null) return;
    const d = e.clientX - x0; x0 = null;
    if (Math.abs(d) > 40) verFoto(foto + (d < 0 ? 1 : -1));
  });

  /* ---- color ---- */
  function pintarColores() {
    colores.innerHTML = prod.colores.map((x) => `
      <button type="button" role="radio" class="swatch" data-c="${x.c}" style="--a:${x.a};--b:${x.b || x.a}" aria-checked="${x.c === color}">
        <span class="sr">${nombreColor(x.c)}</span>
      </button>`).join("");
  }
  colores.addEventListener("click", (e) => {
    const b = e.target.closest("[data-c]");
    if (!b || b.dataset.c === color) return;
    color = b.dataset.c;
    actualizar(true);
  });

  /* ---- logo (camisetas) ---- */
  const bloqueLogo = $("[data-p-logo]");
  bloqueLogo.hidden = !prod.logos;
  bloqueLogo.addEventListener("click", (e) => {
    const b = e.target.closest("[data-logo]");
    if (!b || b.dataset.logo === logo) return;
    logo = b.dataset.logo;
    actualizar(true);
  });

  /* ---- otros productos ---- */
  function pintarOtros() {
    const otros = C.lista().filter((x) => !(x.p === prod.id && x.c === color));
    // primero otros colores del mismo producto, luego el otro producto
    otros.sort((a, b) => (a.p === prod.id ? 0 : 1) - (b.p === prod.id ? 0 : 1));
    $("[data-p-otros]").innerHTML = otros.slice(0, 6).map((x) => `
      <li><a href="${C.url(x.p, x.c)}">
        <span class="otros__img" style="--a:${x.a}"><img src="${x.img}" alt="" loading="lazy"></span>
        <span class="otros__n">${t(`prod.${x.p}`)}</span>
        <span class="otros__c">${t(C.productos[x.p].claveColor(x.c))}</span>
      </a></li>`).join("");
  }

  /* ---- todo junto ---- */
  function actualizar(animar = false) {
    const n = t(`prod.${prod.id}`);
    $$("[data-p-nombre]").forEach((el) => { el.textContent = n; });
    $("[data-p-desc]").textContent = t(`prod.${prod.id}.desc`);
    $("[data-p-color]").textContent = nombreColor(color);
    $$("[data-logo]", bloqueLogo).forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.logo === logo)));
    pintarColores();
    pintarMiniaturas();
    verFoto(animar ? foto : 0, animar);
    $("[data-p-detalles]").innerHTML = prod.detalles.map((k) => {
      const [a, b] = t(k).split("|");
      return `<li><span>${a}</span><span>${b}</span></li>`;
    }).join("");
    pintarOtros();
    document.title = `${n} ${nombreColor(color)} — GOTEE®`;
    const url = new URL(location.href);
    url.searchParams.set("p", prod.id);
    url.searchParams.set("c", color);
    if (prod.logos && logo === "grande") url.searchParams.set("logo", "grande"); else url.searchParams.delete("logo");
    history.replaceState(null, "", url);
    $("[data-form]").dataset.origen = `producto-${prod.id}-${color}`;
    const puesta = $("[data-p-puesta]");
    if (puesta) puesta.href = `showroom.html?p=${prod.id}&c=${color}`;
  }

  document.addEventListener("gotee:idioma", () => actualizar(false));
  actualizar(false);
})();
