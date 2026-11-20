/* GOTEE — catálogo de productos (lo usan el armario y la página de cada producto).
   Para añadir un color o un producto nuevo, se añade aquí y se pone su foto recortada en img/armario/. */
window.CATALOGO = (() => {
  const productos = {
    sud: {
      id: "sud",
      colores: [
        { c: "marron", a: "#4D3423", b: "#9CC4EA" },
        { c: "beige", a: "#E6DCCB", b: "#4A3020" },
        { c: "azul", a: "#A9CBEA", b: "#F2D64B" },
        { c: "burdeos", a: "#2B1C1C", b: "#8E1F2C" },
        { c: "marino", a: "#2B3550", b: "#EFE6D2" },
      ],
      claveColor: (c) => `c.${c}`,
      recorte: (c) => `img/armario/sud-${c}-delante-v2.png`,
      /* fotos de su página: [archivo, clave del texto, ajuste] */
      fotos: (c) => [
        [`img/armario/sud-${c}-delante-v2.png`, "g.delante", "contain"],
        [`img/armario/sud-${c}-detras-v2.png`, "g.espalda", "contain"],
      ],
      detalles: ["p.sud.corte", "p.sud.logo", "p.sud.extra"],
    },
    tee: {
      id: "tee",
      colores: [
        { c: "oliva", a: "#878D55" },
        { c: "arena", a: "#D1BA9D" },
        { c: "mantequilla", a: "#F0D999" },
        { c: "cielo", a: "#9DBED5" },
        { c: "petroleo", a: "#1D4657" },
      ],
      claveColor: (c) => `t.${c}`,
      recorte: (c) => `img/armario/tee-${c}-pequeno.webp`,
      logos: true,
      fotos: (c, logo = "pequeno") => [
        [`img/armario/tee-${c}-${logo}.webp`, "g.delante", "contain"],
        [`img/armario/tee-${c}-detras.webp`, "g.espalda", "contain"],
      ],
      detalles: ["p.tee.corte", "p.tee.logo", "p.tee.extra"],
    },
  };

  /* todas las prendas en orden, una por color */
  const lista = () => Object.values(productos).flatMap((p) =>
    p.colores.map((x) => ({ p: p.id, c: x.c, a: x.a, b: x.b || x.a, img: p.recorte(x.c) })));

  const url = (p, c) => `producto.html?p=${p}&c=${c}`;

  return { productos, lista, url };
})();

