/* GOTEE — lógica común de todas las páginas */

/* ===== CONFIGURACIÓN =====
   Pega aquí la dirección del servicio que guarda los emails (por ejemplo, un formulario de Formspree:
   "https://formspree.io/f/xxxxxxx"). Mientras esté vacío, la web funciona en modo prueba y no guarda nada. */
const ENDPOINT_LISTA = "";

/* Enlaces de redes. Rellenar cuando existan las cuentas. */
const REDES = { instagram: "", tiktok: "" };

/* ===== TEXTOS ES / EN ===== */
const T = {
  es: {
    /* menú y comunes */
    "nav.inicio": "Inicio", "nav.productos": "Productos", "nav.lookbook": "Lookbook", "nav.nosotros": "Nosotros",
    "nav.cta": "Lista de espera", "nav.menu": "Menú",
    "cta.armario": "Ver el armario", "cta.verArmario": "Verla en el armario", "cta.lookbook": "Ver el lookbook",
    "cta.historia": "Nuestra historia", "cta.productos": "Ver los productos",
    "form.label": "Tu email", "form.ph": "tu@email.com", "form.btn": "Avisarme", "form.sending": "Enviando…",
    "form.note": "Un correo cuando salga. Nada más.",
    "form.ok": "Dentro. Te avisamos el día del drop.",
    "err.empty": "Escribe tu email.", "err.invalid": "Ese email no parece correcto.", "err.net": "No se ha podido enviar. Prueba otra vez.",
    "foot.copy": "Gotee Studio® · Est. 2026, Andalucía.",
    "final.title": "Quédate<br>en el <em>drop.</em>", "final.sub": "No te pierdas ni una gota.",

    /* inicio */
    "hero.label": "Drop 01 · Lista de espera abierta",
    "hero.title": "Gotta<br>get <em>Gotee.</em>",
    "hero.sub": "Sudaderas de rayas, camisetas anchas y un monigote que se viene contigo. El primer drop sale pronto y la lista se entera antes.",
    "badge": "ORBITING ANDALUSIA · GOTEE DESIGNS · ",
    "ray.label": "01 — Sudadera Rayas", "ray.title": "Cinco colores. Un solo corte.",
    "ray.desc": "Rayas finas, hombro caído y corte ancho. GOTEE con monigote delante y monigote pequeño abajo en la espalda.",
    "spec.1k": "Corte", "spec.1v": "Ancho, largo cropped", "spec.2k": "Logo", "spec.2v": "Delante y en la espalda", "spec.3k": "Precio", "spec.3v": "El día del drop",
    "tee.label": "02 — Camiseta Ancha", "tee.title": "Delante, discreta.<br>Detrás, <em>él.</em>",
    "tee.desc": "Corte boxy y cuello de canalé, en cinco colores. Delante el logo, Mon&Gotee's en la manga y el monigote en la etiqueta de la espalda.",
    "tee.back": "Ver espalda", "tee.front": "Ver delante",
    "look.cap": "Sudadera Rayas, marrón / azul claro. El monigote va escondido en el bajo.",

    /* colores */
    "c.beige": "Beige / Marrón", "c.azul": "Azul claro / Amarillo", "c.burdeos": "Negro / Burdeos", "c.marino": "Azul marino / Crema", "c.marron": "Marrón / Azul claro",
    "t.oliva": "Verde oliva", "t.arena": "Beige arena", "t.mantequilla": "Amarillo mantequilla", "t.cielo": "Azul cielo", "t.petroleo": "Azul petróleo",

    /* productos (armario) */
    "pr.label": "Drop 01 · El armario", "pr.title": "Productos",
    "pr.hint": "Pulsa una prenda para verla de cerca",
    "f.todo": "Todo", "f.sud": "Sudaderas", "f.tee": "Camisetas",
    "prod.sud": "Sudadera Rayas", "prod.tee": "Camiseta Ancha",
    "fo.logoG": "Logo grande", "fo.logoP": "Logo pequeño", "fo.front": "Delante", "fo.back": "Espalda",
    "fo.avail": "Ver disponibilidad", "fo.close": "Cerrar", "fo.prev": "Anterior", "fo.next": "Siguiente",
    "av.title": "Llega con el Drop 01",
    "av.text": "Tallas, precio y unidades se anuncian el día del drop. Apúntate y te avisamos antes que a nadie.",
    "pr.hint2": "Pasa por encima para ver cada prenda · pulsa para abrirla",
    "pr.hintTouch": "Desliza para ver cada prenda · toca para abrirla",
    "p.ver": "Ver producto",
    "nav.showroom": "Showroom", "sh.label": "Showroom · Drop 01", "sh.hint": "Elige una prenda y ella se la pone",
    "sh.pronto": "Próximamente en la tienda", "sh.auto": "Pasarela", "prod.quillo": "Camiseta Take it easy", "sh.crudo": "Crudo / Azul marino", "p.puesta": "Verla puesta en el showroom",

    /* página de producto */
    "p.migas": "Productos", "p.color": "Color", "p.logo": "Logo del pecho",
    "p.precio": "Precio", "p.precioV": "El día del drop",
    "p.tallas": "Tallas y unidades se anuncian el día del drop.",
    "p.avisar": "Avísame cuando salga", "p.detalles": "Detalles",
    "p.otros": "También en el Drop 01", "p.volver": "Volver al armario",
    "p.zoom": "Pasa el ratón por la foto para verla de cerca",
    "prod.sud.desc": "Sudadera de punto con rayas finas, hombro caído y largo cropped. GOTEE con monigote en el pecho y monigote pequeño abajo a la derecha en la espalda.",
    "prod.tee.desc": "Camiseta de corte boxy con cuello de canalé. Logo en el pecho, Mon&Gotee's en la manga y la etiqueta del monigote en la espalda.",
    "p.sud.corte": "Corte|Ancho, hombro caído, largo cropped", "p.sud.logo": "Logo|GOTEE con monigote delante; monigote pequeño detrás", "p.sud.extra": "Tejido|Punto con rayas finas",
    "p.tee.corte": "Corte|Boxy, cuello de canalé", "p.tee.logo": "Logo|En el pecho: pequeño o grande", "p.tee.extra": "Detalles|Mon&Gotee's en la manga y etiqueta del monigote",
    "g.delante": "Delante", "g.espalda": "Espalda", "g.modelo": "Puesta", "g.par": "Delante y detrás", "g.detalle": "Detalle",

    /* lookbook */
    "lb.label": "Drop 01 · Lookbook", "lb.title": "Look<em>book.</em>",
    "lb.intro": "La ropa puesta. Rayas, camisetas anchas y mucha calma.",
    "lb.cap1": "La cara de GOTEE con la Sudadera Rayas marrón / azul claro.",
    "lb.cap2": "Sudadera Rayas de frente y de espalda. El monigote, escondido en el bajo.",
    "lb.cap3": "El monigote bordado en el bajo.",
    "lb.strip": "Cinco colores", "lb.stripSub": "Desliza para ver todos",

    /* nosotros */
    "no.label": "Gotee Designs · Est. 2026",
    "no.intro": "Ropa ancha hecha en el sur, con nombre en inglés y alma andaluza.",
    "no.v1": "Hecha en Andalucía, para llevarla en cualquier parte.",
    "no.v2": "Para los de aquí, y para los que les gustaría serlo.",
    "no.v3": "Cada pieza, pensada con calma y con gusto.",
    "mon.label": "El monigote", "mon.title": "Siesta<br><em>approved.</em>",
    "mon.desc": "Lo dibujamos para que cada prenda tenga a alguien dentro. Cada drop trae una postura nueva.",

    /* lista */
    "li.label": "Drop 01 · Lista de espera",
    "li.s1": "Te apuntas con tu email.", "li.s2": "El día del drop te llega un correo.", "li.s3": "Entras antes que nadie.",
    "li.contact": "Contacto", "li.contactTxt": "Para colaboraciones, tiendas o cualquier cosa:",

    /* alt de imágenes */
    "alt.hero": "Chico con sudadera GOTEE de rayas marrones y azules y vaqueros anchos",
    "alt.teeFront": "Camiseta ancha GOTEE de frente, con el logo, en",
    "alt.teeBack": "Camiseta ancha GOTEE de espalda, con la etiqueta del monigote, en",
    "alt.look": "Sudadera de rayas GOTEE vista de frente y de espalda, con detalle del monigote en el bajo",
    "alt.look.color": "Sudadera Rayas GOTEE en color",
    "alt.flat.color": "Sudadera Rayas GOTEE delante y detrás en color",
    "alt.chica": "Chica con la sudadera GOTEE de rayas marrones y azules en un estudio",
  },
  en: {
    "nav.inicio": "Home", "nav.productos": "Products", "nav.lookbook": "Lookbook", "nav.nosotros": "About",
    "nav.cta": "Join the list", "nav.menu": "Menu",
    "cta.armario": "See the closet", "cta.verArmario": "See it in the closet", "cta.lookbook": "See the lookbook",
    "cta.historia": "Our story", "cta.productos": "See the products",
    "form.label": "Your email", "form.ph": "you@email.com", "form.btn": "Notify me", "form.sending": "Sending…",
    "form.note": "One email when it drops. That's it.",
    "form.ok": "You're in. We'll let you know on drop day.",
    "err.empty": "Enter your email.", "err.invalid": "That email doesn't look right.", "err.net": "Couldn't send it. Try again.",
    "foot.copy": "Gotee Studio® · Est. 2026, Andalusia.",
    "final.title": "Stay in<br>the <em>drop.</em>", "final.sub": "Don't miss a drip.",

    "hero.label": "Drop 01 · Waitlist open",
    "hero.title": "Gotta<br>get <em>Gotee.</em>",
    "hero.sub": "Striped sweaters, boxy tees and a little guy who tags along. The first drop lands soon and the list hears first.",
    "badge": "ORBITING ANDALUSIA · GOTEE DESIGNS · ",
    "ray.label": "01 — Stripe Crew", "ray.title": "Five colorways. One cut.",
    "ray.desc": "Fine stripes, dropped shoulder, loose fit. GOTEE character on the front, small character at the lower back.",
    "spec.1k": "Fit", "spec.1v": "Loose, cropped length", "spec.2k": "Logo", "spec.2v": "Front and back", "spec.3k": "Price", "spec.3v": "On drop day",
    "tee.label": "02 — Boxy Tee", "tee.title": "Quiet front.<br>Him on the <em>back.</em>",
    "tee.desc": "Boxy fit and a ribbed collar, in five colors. Logo on the front, Mon&Gotee's on the sleeve and the little guy on the back label.",
    "tee.back": "See back", "tee.front": "See front",
    "look.cap": "Stripe Crew in brown / light blue. The little guy hides on the hem.",

    "c.beige": "Beige / Brown", "c.azul": "Light blue / Yellow", "c.burdeos": "Black / Burgundy", "c.marino": "Navy / Cream", "c.marron": "Brown / Light blue",
    "t.oliva": "Olive green", "t.arena": "Sand beige", "t.mantequilla": "Butter yellow", "t.cielo": "Sky blue", "t.petroleo": "Petrol blue",

    "pr.label": "Drop 01 · The closet", "pr.title": "Products",
    "pr.hint": "Tap a piece to see it up close",
    "f.todo": "All", "f.sud": "Sweaters", "f.tee": "Tees",
    "prod.sud": "Stripe Crew", "prod.tee": "Boxy Tee",
    "fo.logoG": "Big logo", "fo.logoP": "Small logo", "fo.front": "Front", "fo.back": "Back",
    "fo.avail": "See availability", "fo.close": "Close", "fo.prev": "Previous", "fo.next": "Next",
    "av.title": "Coming with Drop 01",
    "av.text": "Sizes, price and units are announced on drop day. Join the list and you'll hear first.",
    "pr.hint2": "Hover to browse each piece · click to open it",
    "pr.hintTouch": "Swipe to browse each piece · tap to open it",
    "p.ver": "View product",
    "nav.showroom": "Showroom", "sh.label": "Showroom · Drop 01", "sh.hint": "Pick a piece and she puts it on",
    "sh.pronto": "Coming soon to the shop", "sh.auto": "Runway", "prod.quillo": "Take it easy Tee", "sh.crudo": "Natural / Navy", "p.puesta": "See it worn in the showroom",

    "p.migas": "Products", "p.color": "Color", "p.logo": "Chest logo",
    "p.precio": "Price", "p.precioV": "On drop day",
    "p.tallas": "Sizes and units are announced on drop day.",
    "p.avisar": "Notify me when it drops", "p.detalles": "Details",
    "p.otros": "Also in Drop 01", "p.volver": "Back to the closet",
    "p.zoom": "Hover the photo to see it up close",
    "prod.sud.desc": "Fine-stripe knit sweater with a dropped shoulder and cropped length. GOTEE character on the chest, small character at the lower right back.",
    "prod.tee.desc": "Boxy tee with a ribbed collar. Logo on the chest, Mon&Gotee's on the sleeve and the little guy label on the back.",
    "p.sud.corte": "Fit|Loose, dropped shoulder, cropped", "p.sud.logo": "Logo|GOTEE character at front; small character at back", "p.sud.extra": "Fabric|Fine-stripe knit",
    "p.tee.corte": "Fit|Boxy, ribbed collar", "p.tee.logo": "Logo|Chest: small or big", "p.tee.extra": "Details|Mon&Gotee's on the sleeve and little guy label",
    "g.delante": "Front", "g.espalda": "Back", "g.modelo": "Worn", "g.par": "Front and back", "g.detalle": "Detail",

    "lb.label": "Drop 01 · Lookbook", "lb.title": "Look<em>book.</em>",
    "lb.intro": "The clothes, worn. Stripes, boxy tees and plenty of calm.",
    "lb.cap1": "The face of GOTEE in the brown / light blue Stripe Crew.",
    "lb.cap2": "Stripe Crew, front and back. The little guy hides on the hem.",
    "lb.cap3": "The little guy stitched on the hem.",
    "lb.strip": "Five colorways", "lb.stripSub": "Swipe to see them all",

    "no.label": "Gotee Designs · Est. 2026",
    "no.intro": "Loose clothes made in the south, with an English name and an Andalusian soul.",
    "no.v1": "Made in Andalusia, to be worn anywhere.",
    "no.v2": "For the locals, and for everyone who wishes they were.",
    "no.v3": "Every piece, made slowly and with taste.",
    "mon.label": "The little guy", "mon.title": "Siesta<br><em>approved.</em>",
    "mon.desc": "We drew him so every piece has someone inside. Every drop brings a new pose.",

    "li.label": "Drop 01 · Waitlist",
    "li.s1": "Sign up with your email.", "li.s2": "On drop day, you get an email.", "li.s3": "You get in before anyone else.",
    "li.contact": "Contact", "li.contactTxt": "For collabs, stockists or anything else:",

    "alt.hero": "Guy wearing a brown and blue striped GOTEE sweater and loose jeans",
    "alt.teeFront": "GOTEE boxy tee from the front, with the logo, in",
    "alt.teeBack": "GOTEE boxy tee from the back, with the little guy label, in",
    "alt.look": "GOTEE striped sweater from the front and back, with a close-up of the little guy on the hem",
    "alt.look.color": "GOTEE Stripe Crew in",
    "alt.flat.color": "GOTEE Stripe Crew front and back in",
    "alt.chica": "Girl wearing the brown and blue striped GOTEE sweater in a studio",
  },
};

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

function guardar(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
function leer(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }

/* ===== IDIOMA ===== */
let lang = leer("gotee-lang") || ((navigator.language || "es").toLowerCase().startsWith("es") ? "es" : "en");
const t = (k) => (T[lang] && T[lang][k]) || T.es[k] || k;

function aplicarIdioma(nuevo) {
  lang = nuevo;
  document.documentElement.lang = lang;
  $$("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
  $$("[data-i18n-html]").forEach((el) => { el.innerHTML = t(el.dataset.i18nHtml); });
  $$("[data-i18n-ph]").forEach((el) => { el.placeholder = t(el.dataset.i18nPh); });
  $$("[data-i18n-alt]").forEach((el) => { el.alt = t(el.dataset.i18nAlt); });
  $$("[data-i18n-aria]").forEach((el) => { el.setAttribute("aria-label", t(el.dataset.i18nAria)); });
  $$("[data-lang]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
  guardar("gotee-lang", lang);
  document.dispatchEvent(new CustomEvent("gotee:idioma", { detail: lang }));
}
$$("[data-lang]").forEach((b) => b.addEventListener("click", () => aplicarIdioma(b.dataset.lang)));

/* cambia una imagen con un fundido suave */
function cambiarImagen(img, src) {
  if (!img || img.getAttribute("src") === src) return;
  if (reduceMotion) { img.src = src; return; }
  img.classList.add("is-swapping");
  const pre = new Image();
  pre.src = src;
  pre.decode().catch(() => {}).then(() => setTimeout(() => {
    img.src = src;
    requestAnimationFrame(() => img.classList.remove("is-swapping"));
  }, 180));
}

/* selector de color reutilizable: clic y flechas del teclado */
function selectorColores(grupo, pintar) {
  if (!grupo) return;
  $$(".swatch", grupo).forEach((s, i, todos) => {
    s.addEventListener("click", () => pintar(s.dataset.c));
    s.addEventListener("keydown", (e) => {
      const paso = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
      if (!paso) return;
      e.preventDefault();
      const sig = todos[(i + paso + todos.length) % todos.length];
      sig.focus();
      pintar(sig.dataset.c);
    });
  });
}

/* lo que usan otras páginas (armario.js) */
window.GOTEE = { t, lang: () => lang, $, $$, cambiarImagen, reduceMotion };

/* ===== MENÚ: página actual, fondo al bajar, menú de móvil ===== */
const pagina = document.body.dataset.page;
$$(".nav__links a, .menu__links a, .foot__links a").forEach((a) => {
  const destino = (a.getAttribute("href") || "").replace(".html", "").replace("index", "inicio");
  if (destino === pagina) a.setAttribute("aria-current", "page");
});

const nav = $("#nav");
if (nav) {
  const onScroll = () => nav.classList.toggle("is-scrolled", scrollY > 24);
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

const burger = $(".nav__burger"), menu = $("#menu");
if (burger && menu) {
  const abrir = (si) => {
    burger.setAttribute("aria-expanded", String(si));
    document.body.classList.toggle("menu-open", si);
    if (si) { menu.hidden = false; requestAnimationFrame(() => menu.classList.add("is-open")); }
    else { menu.classList.remove("is-open"); setTimeout(() => { if (!menu.classList.contains("is-open")) menu.hidden = true; }, 400); }
  };
  burger.addEventListener("click", () => abrir(burger.getAttribute("aria-expanded") !== "true"));
  addEventListener("keydown", (e) => { if (e.key === "Escape" && burger.getAttribute("aria-expanded") === "true") abrir(false); });
  $$("a", menu).forEach((a) => a.addEventListener("click", () => abrir(false)));
}

/* ===== APARICIÓN AL HACER SCROLL ===== */
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
}, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
function observarReveal(raiz = document) {
  $$(".reveal", raiz).forEach((el) => {
    const hermanos = $$(":scope > .reveal", el.parentElement);
    el.style.setProperty("--d", `${Math.min(hermanos.indexOf(el), 6) * 0.08}s`);
    io.observe(el);
  });
}
observarReveal();

/* ===== INICIO: COLORES DE LA SUDADERA ===== */
let colorActual = "marron";
const look = $("[data-look]"), flat = $("[data-flat]"), nombre = $("[data-name]"), rayLink = $("[data-ray-link]");
function pintarColor(c, animar = true) {
  if (!look) return;
  colorActual = c;
  $$("[data-ray-swatches] .swatch").forEach((s) => s.setAttribute("aria-checked", String(s.dataset.c === c)));
  nombre.textContent = t(`c.${c}`);
  look.alt = `${t("alt.look.color")} ${t(`c.${c}`).toLowerCase()}`;
  flat.alt = `${t("alt.flat.color")} ${t(`c.${c}`).toLowerCase()}`;
  if (rayLink) rayLink.href = `producto.html?p=sud&c=${c}`;
  if (animar) {
    cambiarImagen(look, `img/modelos-${c}.webp`);
    cambiarImagen(flat, `img/plano-${c}.webp`);
  }
}
selectorColores($("[data-ray-swatches]"), pintarColor);

/* ===== INICIO: COLORES DE LA CAMISETA ===== */
let teeActual = "oliva";
const teeFront = $("[data-tee-front]"), teeBack = $("[data-tee-back]"), teeNombre = $("[data-tee-name]"), teeLink = $("[data-tee-link]");
function pintarTee(c, animar = true) {
  if (!teeFront) return;
  teeActual = c;
  $$("[data-tee-swatches] .swatch").forEach((s) => s.setAttribute("aria-checked", String(s.dataset.c === c)));
  const n = t(`t.${c}`);
  teeNombre.textContent = n;
  teeFront.alt = `${t("alt.teeFront")} ${n.toLowerCase()}`;
  teeBack.alt = `${t("alt.teeBack")} ${n.toLowerCase()}`;
  if (teeLink) teeLink.href = `producto.html?p=tee&c=${c}`;
  if (animar) {
    cambiarImagen(teeFront, `img/tee-${c}-delante.webp`);
    cambiarImagen(teeBack, `img/tee-${c}-detras.webp`);
  }
}
selectorColores($("[data-tee-swatches]"), pintarTee);

if (look || teeFront) {
  (window.requestIdleCallback || setTimeout)(() => {
    ["beige", "azul", "burdeos", "marino"].forEach((c) => { new Image().src = `img/modelos-${c}.webp`; new Image().src = `img/plano-${c}.webp`; });
    ["arena", "mantequilla", "cielo", "petroleo"].forEach((c) => { new Image().src = `img/tee-${c}-delante.webp`; new Image().src = `img/tee-${c}-detras.webp`; });
  });
}

/* ===== INICIO: CAMISETA delante / detrás ===== */
const flipBox = $("[data-flip]"), flipBtn = $("[data-flip-btn]");
function textoGiro() {
  if (flipBox) $("[data-flip-label]").textContent = t(flipBox.classList.contains("is-back") ? "tee.front" : "tee.back");
}
if (flipBox && flipBtn) {
  const girar = () => {
    const atras = flipBox.classList.toggle("is-back");
    flipBtn.setAttribute("aria-pressed", String(atras));
    textoGiro();
  };
  flipBtn.addEventListener("click", girar);
  flipBox.addEventListener("click", girar);
}

document.addEventListener("gotee:idioma", () => {
  pintarColor(colorActual, false);
  pintarTee(teeActual, false);
  textoGiro();
});

/* ===== MONIGOTE QUE MIRA AL RATÓN + botones magnéticos ===== */
if (!reduceMotion && matchMedia("(pointer: fine)").matches) {
  const monis = $$("[data-follow]");
  let mx = innerWidth / 2, my = innerHeight / 2, pendiente = false;
  if (monis.length) {
    addEventListener("pointermove", (e) => {
      mx = e.clientX; my = e.clientY;
      if (pendiente) return;
      pendiente = true;
      requestAnimationFrame(() => {
        pendiente = false;
        monis.forEach((m) => {
          const r = m.getBoundingClientRect();
          const dx = (mx - (r.left + r.width / 2)) / innerWidth;
          const dy = (my - (r.top + r.height / 2)) / innerHeight;
          m.style.transform = `rotate(${(dx * 14).toFixed(2)}deg) translate(${(dx * 10).toFixed(1)}px, ${(dy * 6).toFixed(1)}px)`;
        });
      });
    }, { passive: true });
    monis.forEach((m) => { m.style.transition = "transform .9s cubic-bezier(.16,1,.3,1)"; });
  }

  $$("[data-magnetic]").forEach((b) => {
    b.addEventListener("pointermove", (e) => {
      const r = b.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.18;
      const y = (e.clientY - r.top - r.height / 2) * 0.3;
      b.style.transform = `translate(${x}px, ${y}px)`;
    });
    b.addEventListener("pointerleave", () => { b.style.transform = ""; });
  });
}

/* ===== LISTA DE ESPERA (todos los formularios de la web) ===== */
const EMAIL_OK = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function marcarApuntado() {
  $$("[data-form]").forEach((f) => { f.classList.add("is-done"); const ok = $(".form__ok", f); if (ok) ok.hidden = false; });
}

$$("[data-form]").forEach((form) => {
  const input = $("input", form), btn = $("button[type=submit]", form);
  const btnTxt = $("span", btn), error = $(".form__error", form);

  const fallo = (k) => {
    error.textContent = t(k);
    form.classList.remove("is-invalid");
    void form.offsetWidth;
    form.classList.add("is-invalid");
    input.setAttribute("aria-invalid", "true");
    input.focus();
  };
  input.addEventListener("input", () => {
    if (!form.classList.contains("is-invalid")) return;
    form.classList.remove("is-invalid");
    error.textContent = "";
    input.removeAttribute("aria-invalid");
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = input.value.trim();
    if (!email) return fallo("err.empty");
    if (!EMAIL_OK.test(email)) return fallo("err.invalid");

    btn.disabled = true;
    btnTxt.textContent = t("form.sending");
    try {
      if (ENDPOINT_LISTA) {
        const res = await fetch(ENDPOINT_LISTA, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ email, idioma: lang, origen: form.dataset.origen || pagina || "web" }),
        });
        if (!res.ok) throw new Error(res.status);
      } else {
        console.warn("GOTEE: modo prueba, falta ENDPOINT_LISTA en app.js. No se ha guardado:", email);
        await new Promise((r) => setTimeout(r, 700));
      }
      error.textContent = "";
      form.classList.remove("is-invalid");
      marcarApuntado();
    } catch (err) {
      fallo("err.net");
    } finally {
      btn.disabled = false;
      btnTxt.textContent = t("form.btn");
    }
  });
});

/* ===== REDES ===== */
$$("[data-social]").forEach((a) => {
  const url = REDES[a.dataset.social];
  if (url) { a.href = url; a.target = "_blank"; a.rel = "noopener"; }
  else a.addEventListener("click", (e) => e.preventDefault());
});

aplicarIdioma(lang);


