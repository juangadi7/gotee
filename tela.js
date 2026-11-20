/* Tela con cuello anclado, inercia y oscilaciones independientes en mangas y bajo. */
(() => {
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  window.crearTela = (element) => {
    const image = element.querySelector('img');
    const canvas = document.createElement('canvas');
    canvas.className = 'g__tela';
    canvas.setAttribute('aria-hidden', 'true');
    const context = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: true, antialias: true });
    if (!context) return { impulse() {} };
    const gl = context;
    function shader(type, source) {
      const value = gl.createShader(type);
      gl.shaderSource(value, source); gl.compileShader(value);
      return value;
    }
    const program = gl.createProgram();
    gl.attachShader(program, shader(gl.VERTEX_SHADER, 'attribute vec4 vertex; varying vec2 uv; void main(){gl_Position=vec4(vertex.xy,0.,1.);uv=vertex.zw;}'));
    gl.attachShader(program, shader(gl.FRAGMENT_SHADER, 'precision mediump float; varying vec2 uv; uniform sampler2D fabric; void main(){gl_FragColor=texture2D(fabric,uv);}'));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return { impulse() {} };
    gl.useProgram(program);
    const buffer = gl.createBuffer(), texture = gl.createTexture();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    const attribute = gl.getAttribLocation(program, 'vertex');
    gl.enableVertexAttribArray(attribute);
    gl.vertexAttribPointer(attribute, 4, gl.FLOAT, false, 0, 0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    let uploaded = '';
    canvas.addEventListener('webglcontextlost', () => reset());
    image.after(canvas);
    const body = element.querySelector('.g__body');
    const phase = Number(element.dataset.i) * 1.73;
    let visible = true, clock = 0, hanger = 0, hangerVelocity = 0;
    let frame = 0, last = 0, displacement = 0, velocity = 0, pull = 0;
    let dragging = null, suppressClick = false;
    const reset = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      displacement = velocity = pull = 0;
      element.classList.remove('has-cloth');
      body.style.transform = '';
    };
    function draw() {
      const width = image.clientWidth, height = image.clientHeight;
      if (!width || !height || !image.naturalWidth) return;
      const ratio = Math.min(devicePixelRatio || 1, 2);
      const padding = 55;
      const cw = Math.round((width + padding * 2) * ratio);
      const ch = Math.round((height + 20) * ratio);
      if (canvas.width !== cw || canvas.height !== ch) {
        canvas.width = cw; canvas.height = ch;
      }
      canvas.style.width = `${width + padding * 2}px`;
      canvas.style.height = `${height + 20}px`;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0,0,0,0); gl.clear(gl.COLOR_BUFFER_BIT);
      if (uploaded !== image.currentSrc) {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        uploaded = image.currentSrc;
      }
      const vertices = [];
      const scale = Math.min(width / image.naturalWidth, height / image.naturalHeight);
      const iw = image.naturalWidth * scale, ih = image.naturalHeight * scale;
      const left = (width - iw) / 2;
      const columns = 8, rows = 16;
      const point = (u, v) => {
        const sleeve = Math.pow(Math.abs(u - .5) * 2, 3);
        const freedom = v * v;
        const wave = Math.sin(clock * 1.8 + phase - v * 3 + u * 2);
        const x = left + u * iw + freedom * (displacement + sleeve * wave * 4);
        const y = v * ih + freedom * sleeve * Math.sin(clock * 1.5 + phase + u * 4) * 2;
        return { x, y, sx: u * image.naturalWidth, sy: v * image.naturalHeight };
      };
      function triangle(a,b,c) {
        for (const p of [a,b,c]) vertices.push(
          (p.x + padding) / (width + padding*2) * 2 - 1,
          1 - p.y / (height + 20) * 2,
          p.sx / image.naturalWidth, p.sy / image.naturalHeight);
      }
      for(let row=0;row<rows;row++) for(let col=0;col<columns;col++) {
        const a=point(col/columns,row/rows), b=point((col+1)/columns,row/rows);
        const c=point(col/columns,(row+1)/rows), d=point((col+1)/columns,(row+1)/rows);
        triangle(a,b,c); triangle(b,d,c);
      }
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW); gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 4); element.classList.add('has-cloth');
    }
    function tick(time) {
      frame = 0;
      if (preference.matches || document.hidden || element.hidden || !visible) return reset();
      const dt = Math.min((time - last) / 1000 || 1 / 60, 1 / 30);
      last = time;
      clock = time / 1000;
      const breeze = Math.sin(clock * 1.3 + phase) * 2.4 + Math.sin(clock * .71 + phase) * 1.2;
      hangerVelocity += ((breeze * .45 + pull * .035 - hanger) * 16 - hangerVelocity * 3.6) * dt;
      hanger += hangerVelocity * dt;
      body.style.transform = `rotate(${hanger.toFixed(3)}deg)`;
      velocity += ((pull + breeze - hangerVelocity * 1.4 - displacement) * 40 - velocity * 5) * dt;
      displacement = Math.max(-44, Math.min(44, displacement + velocity * dt));
      draw();
      frame = requestAnimationFrame(tick);
    }
    function wake() {
      if (preference.matches || document.hidden || !visible || element.hidden || !image.complete || !image.naturalWidth) return;
      if (!frame) { last = performance.now(); frame = requestAnimationFrame(tick); }
    }
    element.addEventListener('pointerdown', (event) => {
      if (event.button !== 0 || !element.classList.contains('is-on') || preference.matches) return;
      // Touch keeps the rack's existing swipe navigation.
      if (event.pointerType !== 'mouse') return;
      dragging = { id: event.pointerId, x: event.clientX, moved: false };
      suppressClick = false;
      element.setPointerCapture(event.pointerId);
      event.stopPropagation();
    });
    element.addEventListener('pointermove', (event) => {
      if (!dragging || dragging.id !== event.pointerId) return;
      event.stopPropagation();
      const delta = event.clientX - dragging.x;
      dragging.moved ||= Math.abs(delta) > 5;
      pull = Math.max(-40, Math.min(40, delta * .5));
      wake();
    });
    function release(event) {
      if (!dragging || dragging.id !== event.pointerId) return;
      suppressClick = dragging.moved;
      dragging = null; pull = 0;
      if (element.hasPointerCapture(event.pointerId)) element.releasePointerCapture(event.pointerId);
      wake();
    }
    element.addEventListener('pointerup', release);
    element.addEventListener('pointercancel', release);
    element.addEventListener('lostpointercapture', release);
    element.addEventListener('click', (event) => {
      if (suppressClick) { event.preventDefault(); event.stopPropagation(); suppressClick = false; }
    });
    preference.addEventListener('change', () => { reset(); wake(); });
    document.addEventListener('visibilitychange', () => { reset(); wake(); });
    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) wake(); else reset();
    }).observe(element);
    new MutationObserver(() => { if (element.hidden) reset(); else wake(); }).observe(element, { attributes:true, attributeFilter:['hidden'] });
    image.addEventListener('load', wake);
    wake();
    return { impulse(direction = 1) { velocity += direction * 360; wake(); } };
  };
})();


