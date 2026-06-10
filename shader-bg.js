/**
 * Cosmic nebula background — a full-bleed WebGL fragment shader that sits
 * behind the parallax star layers on the home page. Domain-warped FBM clouds
 * tinted with the site's deep-space palette, drifting slowly, with a faint
 * twinkling starfield on top.
 *
 * Progressive enhancement: only runs when #cosmic-bg exists (home page) and
 * WebGL is available. Honors prefers-reduced-motion (renders one static frame),
 * caps DPR, and pauses while the tab is hidden.
 */
(function () {
  'use strict';

  var canvas = document.getElementById('cosmic-bg');
  if (!canvas) return;

  var gl = canvas.getContext('webgl', { antialias: false, alpha: false });
  if (!gl) return; // body background gradient remains as fallback

  var VERT = 'attribute vec2 aPos;void main(){gl_Position=vec4(aPos,0.0,1.0);}';

  var FRAG = [
    'precision highp float;',
    'uniform vec2 uRes;',
    'uniform float uTime;',
    'float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}',
    'float noise(vec2 p){vec2 i=floor(p),f=fract(p);vec2 u=f*f*(3.0-2.0*f);',
    ' return mix(mix(hash(i),hash(i+vec2(1.0,0.0)),u.x),mix(hash(i+vec2(0.0,1.0)),hash(i+vec2(1.0,1.0)),u.x),u.y);}',
    'float fbm(vec2 p){float v=0.0,a=0.5;for(int i=0;i<6;i++){v+=a*noise(p);p*=2.0;a*=0.5;}return v;}',
    'void main(){',
    ' vec2 uv=gl_FragCoord.xy/uRes.xy;',
    ' float asp=uRes.x/uRes.y;',
    ' vec2 p=vec2(uv.x*asp,uv.y);',
    ' float t=uTime*0.02;',
    // domain warp for billowing clouds
    ' vec2 q=vec2(fbm(p*1.5+vec2(0.0,t)),fbm(p*1.5+vec2(5.2,1.3-t)));',
    ' float n=fbm(p*2.0+q*1.8+vec2(t*0.5,0.0));',
    ' vec3 base=vec3(0.043,0.051,0.090);',         // #0B0D17 deep space
    ' vec3 blue=vec3(0.039,0.145,0.360);',          // hsl(220,80%,20%)
    ' vec3 teal=vec3(0.0,0.298,0.298);',            // hsl(180,100%,15%)
    ' vec3 violet=vec3(0.039,0.039,0.160);',        // hsl(240,60%,10%)
    ' vec3 col=base;',
    ' col=mix(col,violet,smoothstep(0.25,0.75,n));',
    ' col=mix(col,blue,smoothstep(0.45,0.9,n)*0.7);',
    ' col=mix(col,teal,smoothstep(0.6,0.95,q.x)*0.35);',
    // faint cyan rim where clouds thin near top
    ' col+=vec3(0.0,0.95,1.0)*smoothstep(0.8,1.0,n)*0.06*uv.y;',
    // sparse twinkling stars
    ' vec2 sp=floor(p*220.0);',
    ' float star=hash(sp);',
    ' float tw=step(0.997,star)*(0.6+0.4*sin(uTime*2.0+star*100.0));',
    ' col+=vec3(0.9,0.95,1.0)*tw;',
    ' gl_FragColor=vec4(col,1.0);',
    '}'
  ].join('\n');

  function compile(type, src) {
    var sh = gl.createShader(type);
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      gl.deleteShader(sh);
      return null;
    }
    return sh;
  }

  var vert = compile(gl.VERTEX_SHADER, VERT);
  var frag = compile(gl.FRAGMENT_SHADER, FRAG);
  if (!vert || !frag) return;
  var prog = gl.createProgram();
  gl.attachShader(prog, vert);
  gl.attachShader(prog, frag);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;

  var buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  var aPos = gl.getAttribLocation(prog, 'aPos');
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
  gl.useProgram(prog);

  var uRes = gl.getUniformLocation(prog, 'uRes');
  var uTime = gl.getUniformLocation(prog, 'uTime');

  function draw(seconds) {
    var dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    var w = Math.floor(canvas.clientWidth * dpr);
    var h = Math.floor(canvas.clientHeight * dpr);
    if (w === 0 || h === 0) return;
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
    }
    gl.uniform2f(uRes, w, h);
    gl.uniform1f(uTime, seconds);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) {
    draw(12);
    window.addEventListener('resize', function () { draw(12); });
    return;
  }

  var raf = 0;
  var start = 0;
  var running = true;

  function loop(now) {
    if (!running) return;
    if (!start) start = now;
    draw((now - start) / 1000);
    raf = requestAnimationFrame(loop);
  }
  raf = requestAnimationFrame(loop);

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      running = false;
      if (raf) cancelAnimationFrame(raf);
    } else if (!running) {
      running = true;
      start = 0;
      raf = requestAnimationFrame(loop);
    }
  });
})();
