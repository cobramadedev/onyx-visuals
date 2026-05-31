import { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';

const hexToRgb = hex => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [1, 0.5, 0.2];
  return [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255];
};

const vertex = `#version 300 es
precision highp float;
in vec2 position;
in vec2 uv;
out vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}`;

// Reduced from 60 to 28 iterations — visually near-identical, ~2x faster
const fragment = `#version 300 es
precision mediump float;
uniform vec2 iResolution;
uniform float iTime;
uniform vec3 uCustomColor;
uniform float uUseCustomColor;
uniform float uSpeed;
uniform float uDirection;
uniform float uScale;
uniform float uOpacity;
out vec4 fragColor;

void mainImage(out vec4 o, vec2 C) {
  vec2 center = iResolution.xy * 0.5;
  C = (C - center) / uScale + center;
  float i, d, z, T = iTime * uSpeed * uDirection;
  vec3 O, p, S;
  for (vec2 r = iResolution.xy, Q; ++i < 28.; O += o.w/d*o.xyz) {
    p = z*normalize(vec3(C-.5*r,r.y));
    p.z -= 4.; S = p; d = p.y-T;
    p.x += .4*(1.+p.y)*sin(d + p.x*0.1)*cos(.34*d + p.x*0.05);
    Q = p.xz *= mat2(cos(p.y+vec4(0,11,33,0)-T));
    z+= d = abs(sqrt(length(Q*Q)) - .25*(5.+S.y))/3.+8e-4;
    o = 1.+sin(S.y+p.z*.5+S.z-length(S-p)+vec4(2,1,0,8));
  }
  o.xyz = tanh(O/1e4);
}

bool finite1(float x){ return !(isnan(x) || isinf(x)); }
vec3 sanitize(vec3 c){
  return vec3(finite1(c.r)?c.r:0.0, finite1(c.g)?c.g:0.0, finite1(c.b)?c.b:0.0);
}

void main() {
  vec4 o = vec4(0.0);
  mainImage(o, gl_FragCoord.xy);
  vec3 rgb = sanitize(o.rgb);
  float intensity = (rgb.r + rgb.g + rgb.b) / 3.0;
  vec3 finalColor = mix(rgb, intensity * uCustomColor, step(0.5, uUseCustomColor));
  fragColor = vec4(finalColor, length(rgb) * uOpacity);
}`;

const Plasma = ({
  color = '#ffffff',
  speed = 1,
  direction = 'forward',
  scale = 1,
  opacity = 1,
  mouseInteractive = false,
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const containerEl = containerRef.current;

    const customColorRgb = hexToRgb(color);
    const directionMultiplier = direction === 'reverse' ? -1.0 : 1.0;

    let renderer;
    try {
      renderer = new Renderer({
        webgl: 2,
        alpha: true,
        antialias: false,
        // Cap DPR at 1 — biggest single perf win, barely visible difference
        dpr: 1,
      });
    } catch { return; }

    const gl = renderer.gl;
    if (!gl) return;
    const canvas = gl.canvas;
    canvas.style.display = 'block';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    containerEl.appendChild(canvas);

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex, fragment,
      uniforms: {
        iTime:          { value: 0 },
        iResolution:    { value: new Float32Array([1, 1]) },
        uCustomColor:   { value: new Float32Array(customColorRgb) },
        uUseCustomColor:{ value: color ? 1.0 : 0.0 },
        uSpeed:         { value: speed * 0.4 },
        uDirection:     { value: directionMultiplier },
        uScale:         { value: scale },
        uOpacity:       { value: opacity },
      }
    });

    const mesh = new Mesh(gl, { geometry, program });

    const setSize = () => {
      const rect = containerEl.getBoundingClientRect();
      // Render at 50% resolution and upscale via CSS — major perf boost
      const w = Math.max(1, Math.floor(rect.width * 0.5));
      const h = Math.max(1, Math.floor(rect.height * 0.5));
      renderer.setSize(w, h);
      program.uniforms.iResolution.value[0] = w;
      program.uniforms.iResolution.value[1] = h;
    };
    const ro = new ResizeObserver(setSize);
    ro.observe(containerEl);
    setSize();

    let raf = 0, contextLost = false, isVisible = true, isPageVisible = true;
    const t0 = performance.now();

    const loop = t => {
      if (contextLost || !isVisible || !isPageVisible) return;
      program.uniforms.iTime.value = (t - t0) * 0.001;
      renderer.render({ scene: mesh });
      raf = requestAnimationFrame(loop);
    };

    // Pause when tab is hidden
    const onVisChange = () => {
      isPageVisible = document.visibilityState === 'visible';
      if (isPageVisible && isVisible && !contextLost) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(loop);
      }
    };
    document.addEventListener('visibilitychange', onVisChange);

    const onLost = e => { e.preventDefault(); contextLost = true; cancelAnimationFrame(raf); };
    const onRestored = () => { contextLost = false; if (isVisible && isPageVisible) { cancelAnimationFrame(raf); raf = requestAnimationFrame(loop); } };
    canvas.addEventListener('webglcontextlost', onLost);
    canvas.addEventListener('webglcontextrestored', onRestored);

    // Pause when scrolled out of view
    const io = new IntersectionObserver(([entry]) => {
      const was = isVisible; isVisible = entry.isIntersecting;
      if (isVisible && !was && !contextLost && isPageVisible) { cancelAnimationFrame(raf); raf = requestAnimationFrame(loop); }
    }, { threshold: 0 });
    io.observe(containerEl);

    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect(); io.disconnect();
      document.removeEventListener('visibilitychange', onVisChange);
      canvas.removeEventListener('webglcontextlost', onLost);
      canvas.removeEventListener('webglcontextrestored', onRestored);
      try {
        const ext = gl.getExtension('WEBGL_lose_context');
        if (ext) ext.loseContext();
        containerEl?.removeChild(canvas);
      } catch {}
    };
  }, [color, speed, direction, scale, opacity]);

  return (
    <div
      ref={containerRef}
      style={{ position:'relative', width:'100%', height:'100%', overflow:'hidden' }}
    />
  );
};

export default Plasma;