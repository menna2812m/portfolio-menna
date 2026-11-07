"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import landPoints from "./land-points.json";

/** Home base and the places the work reaches: Saudi clients and remote teams. */
const HOME = { lat: 30.04, lon: 31.24 }; // Cairo / Giza
const DESTINATIONS = [
  { lat: 24.71, lon: 46.68 }, // Riyadh
  { lat: 21.49, lon: 39.19 }, // Jeddah
  { lat: 25.2, lon: 55.27 }, // Dubai
  { lat: 51.5, lon: -0.13 }, // London
  { lat: 52.52, lon: 13.4 }, // Berlin
  { lat: 40.71, lon: -74.0 }, // New York
];

const GREEN = new THREE.Color("#3fb950");
const BLUE = new THREE.Color("#79c0ff");
const PURPLE = new THREE.Color("#d2a8ff");

function toVec(lat: number, lon: number, r = 1) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lon + 180) * Math.PI) / 180;
  return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta));
}

const dotVertex = /* glsl */ `
  attribute float aSeed;
  uniform float uTime;
  uniform float uPixelRatio;
  varying float vSeed;
  varying float vFacing;
  void main() {
    vSeed = aSeed;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vec3 n = normalize(normalMatrix * position);
    vFacing = dot(n, normalize(-mv.xyz));
    gl_Position = projectionMatrix * mv;
    float twinkle = 0.75 + 0.25 * sin(uTime * 1.6 + aSeed * 40.0);
    gl_PointSize = (2.8 + aSeed * 1.6) * twinkle * uPixelRatio * (4.4 / -mv.z);
  }
`;

const dotFragment = /* glsl */ `
  uniform vec3 uGreen;
  uniform vec3 uBlue;
  varying float vSeed;
  varying float vFacing;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float edge = smoothstep(0.5, 0.05, d);
    vec3 col = mix(uGreen, uBlue, step(0.82, vSeed));
    float fade = smoothstep(-0.05, 0.45, vFacing);
    gl_FragColor = vec4(col * 1.15, edge * fade);
  }
`;

const arcVertex = /* glsl */ `
  varying float vT;
  void main() {
    vT = uv.x;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const arcFragment = /* glsl */ `
  uniform float uTime;
  uniform float uOffset;
  uniform vec3 uColor;
  varying float vT;
  void main() {
    float head = fract(uTime * 0.28 + uOffset);
    float trail = smoothstep(head - 0.35, head, vT) * step(vT, head);
    float base = 0.14;
    gl_FragColor = vec4(uColor, base + trail * 0.95);
  }
`;

const atmosphereVertex = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

const atmosphereFragment = /* glsl */ `
  uniform vec3 uColor;
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    // Back-face shell: brightest just outside the planet's edge, fading outwards.
    float edge = clamp(-dot(vNormal, vView), 0.0, 1.0);
    float glow = pow(edge, 2.2) * 0.45;
    gl_FragColor = vec4(uColor, glow);
  }
`;

/**
 * Interactive dotted-earth globe: real land outlines as glowing points, arcs travelling
 * from Cairo to Saudi Arabia and remote-work cities. Drag to spin; it follows the pointer
 * slightly and pauses rendering when off-screen or in a background tab.
 */
export default function Globe({ className = "" }: { className?: string }) {
  const mount = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = mount.current;
    if (!host) return;

    const coarse = window.matchMedia("(pointer: coarse)").matches;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: !coarse, alpha: true, powerPreference: "high-performance" });
    } catch {
      host.dataset.webgl = "unavailable";
      return;
    }
    const pixelRatio = Math.min(window.devicePixelRatio || 1, coarse ? 1.5 : 1.75);
    renderer.setPixelRatio(pixelRatio);
    renderer.setClearColor(0x000000, 0);
    const canvas = renderer.domElement;
    canvas.setAttribute("aria-hidden", "true");
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    canvas.style.touchAction = "pan-y";
    host.appendChild(canvas);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 50);
    camera.position.set(0, 0, 4.4);

    const globe = new THREE.Group();
    scene.add(globe);

    // Occluder so back-side dots are hidden behind the planet.
    const core = new THREE.Mesh(
      new THREE.SphereGeometry(0.985, 64, 64),
      new THREE.MeshBasicMaterial({ color: 0x0b0f14 }),
    );
    globe.add(core);

    // Land dots
    const pts = landPoints as number[];
    const count = pts.length / 2;
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const v = toVec(pts[i * 2], pts[i * 2 + 1]);
      positions.set([v.x, v.y, v.z], i * 3);
      seeds[i] = Math.random();
    }
    const dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    dotGeo.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    const dotMat = new THREE.ShaderMaterial({
      vertexShader: dotVertex,
      fragmentShader: dotFragment,
      uniforms: { uTime: { value: 0 }, uPixelRatio: { value: pixelRatio }, uGreen: { value: GREEN }, uBlue: { value: BLUE } },
      transparent: true,
      depthWrite: false,
    });
    globe.add(new THREE.Points(dotGeo, dotMat));

    // Arcs from home
    const start = toVec(HOME.lat, HOME.lon);
    const arcMats: THREE.ShaderMaterial[] = [];
    DESTINATIONS.forEach((d, i) => {
      const end = toVec(d.lat, d.lon);
      const lift = 1 + start.distanceTo(end) * 0.45;
      const mid = start.clone().add(end).multiplyScalar(0.5).normalize().multiplyScalar(lift);
      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const mat = new THREE.ShaderMaterial({
        vertexShader: arcVertex,
        fragmentShader: arcFragment,
        uniforms: { uTime: { value: 0 }, uOffset: { value: i * 0.17 }, uColor: { value: i < 3 ? GREEN : PURPLE } },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      arcMats.push(mat);
      globe.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 80, 0.0055, 6, false), mat));

      const ring = new THREE.Mesh(
        new THREE.RingGeometry(0.018, 0.028, 32),
        new THREE.MeshBasicMaterial({ color: i < 3 ? GREEN : PURPLE, transparent: true, side: THREE.DoubleSide }),
      );
      ring.position.copy(end.clone().multiplyScalar(1.004));
      ring.lookAt(end.clone().multiplyScalar(2));
      ring.userData.phase = i * 0.6;
      globe.add(ring);
    });

    // Home beacon
    const beacon = new THREE.Mesh(
      new THREE.RingGeometry(0.02, 0.034, 40),
      new THREE.MeshBasicMaterial({ color: GREEN, transparent: true, side: THREE.DoubleSide }),
    );
    beacon.position.copy(start.clone().multiplyScalar(1.005));
    beacon.lookAt(start.clone().multiplyScalar(2));
    globe.add(beacon);
    const homeDot = new THREE.Mesh(new THREE.CircleGeometry(0.014, 24), new THREE.MeshBasicMaterial({ color: 0xffffff }));
    homeDot.position.copy(start.clone().multiplyScalar(1.006));
    homeDot.lookAt(start.clone().multiplyScalar(2));
    globe.add(homeDot);

    // Atmosphere glow
    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.2, 64, 64),
      new THREE.ShaderMaterial({
        vertexShader: atmosphereVertex,
        fragmentShader: atmosphereFragment,
        uniforms: { uColor: { value: GREEN } },
        side: THREE.BackSide,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    scene.add(atmosphere);

    // Start with Cairo → Riyadh facing the viewer.
    const baseYaw = -((HOME.lon + 180) * Math.PI) / 180 + Math.PI / 2 - 0.35;
    let yaw = baseYaw;
    let pitch = 0.42;
    let velocity = 0;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let hoverX = 0;
    let hoverY = 0;

    const onDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      canvas.setPointerCapture(e.pointerId);
      canvas.style.cursor = "grabbing";
    };
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      hoverX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      hoverY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      velocity = dx * 0.0045;
      yaw += velocity;
      pitch = Math.max(-0.3, Math.min(1.0, pitch + dy * 0.003));
    };
    const onUp = (e: PointerEvent) => {
      dragging = false;
      canvas.style.cursor = "grab";
      if (canvas.hasPointerCapture(e.pointerId)) canvas.releasePointerCapture(e.pointerId);
    };
    const onLeave = () => {
      hoverX = 0;
      hoverY = 0;
    };
    canvas.style.cursor = "grab";
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    canvas.addEventListener("pointerleave", onLeave);

    const resize = () => {
      const { width, height } = host.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    resize();

    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) loop();
    });
    io.observe(host);

    const clock = new THREE.Clock();
    let raf = 0;
    let started = false;
    let intro = 0;
    function loop() {
      cancelAnimationFrame(raf);
      if (!started || !visible || document.hidden) return;
      raf = requestAnimationFrame(loop);
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.elapsedTime;

      intro = Math.min(1, intro + dt * 0.8);
      const ease = 1 - Math.pow(1 - intro, 3);

      if (!dragging) {
        velocity *= 0.95;
        yaw += velocity + dt * 0.06;
      }
      globe.rotation.y = yaw;
      globe.rotation.x = pitch * ease + hoverY * 0.06;
      globe.rotation.z = hoverX * -0.04;
      const s = 0.82 + 0.18 * ease;
      globe.scale.setScalar(s);
      atmosphere.scale.setScalar(s);

      dotMat.uniforms.uTime.value = t;
      for (const m of arcMats) m.uniforms.uTime.value = t;
      globe.children.forEach((c) => {
        if (c instanceof THREE.Mesh && c.userData.phase !== undefined) {
          const p = (t * 0.8 + c.userData.phase) % 1;
          c.scale.setScalar(1 + p * 1.6);
          (c.material as THREE.MeshBasicMaterial).opacity = 1 - p;
        }
      });
      const bp = (t * 0.6) % 1;
      beacon.scale.setScalar(1 + bp * 2.2);
      (beacon.material as THREE.MeshBasicMaterial).opacity = 1 - bp;

      renderer.render(scene, camera);
    }
    const onVisibility = () => {
      if (!document.hidden) {
        clock.getDelta();
        loop();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    // Compile shaders off the critical path (parallel compile where supported), then start drawing.
    let disposed = false;
    renderer
      .compileAsync(scene, camera)
      .catch(() => undefined)
      .then(() => {
        if (disposed) return;
        canvas.dataset.globe = "";
        host.dataset.ready = "true";
        clock.getDelta();
        started = true;
        loop();
      });

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      canvas.removeEventListener("pointerleave", onLeave);
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh || o instanceof THREE.Points) {
          o.geometry.dispose();
          const m = o.material as THREE.Material | THREE.Material[];
          (Array.isArray(m) ? m : [m]).forEach((x) => x.dispose());
        }
      });
      renderer.dispose();
      canvas.remove();
    };
  }, []);

  return <div ref={mount} className={className} />;
}
