"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Globe = dynamic(() => import("./Globe"), { ssr: false });

function webglAvailable() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/** Static stand-in: shown for reduced motion, without WebGL, and underneath while the 3D globe loads. */
function GlobeFallback({ hidden }: { hidden: boolean }) {
  return (
    <svg
      data-globe-fallback
      viewBox="0 0 400 400"
      aria-hidden
      className={`absolute inset-0 m-auto h-[82%] w-[82%] transition-opacity duration-700 ${hidden ? "opacity-0" : "opacity-100"}`}
    >
      <defs>
        <radialGradient id="gf-body" cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#3fb950" stopOpacity="0.16" />
          <stop offset="70%" stopColor="#0b0f14" stopOpacity="0.9" />
        </radialGradient>
        <radialGradient id="gf-glow" cx="50%" cy="50%" r="50%">
          <stop offset="85%" stopColor="#3fb950" stopOpacity="0" />
          <stop offset="100%" stopColor="#3fb950" stopOpacity="0.35" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="200" r="196" fill="url(#gf-glow)" />
      <circle cx="200" cy="200" r="170" fill="url(#gf-body)" stroke="#1f2933" />
      {[-60, -30, 0, 30, 60].map((lat) => (
        <ellipse key={lat} cx="200" cy={200 - lat * 2.2} rx={170 * Math.cos((lat * Math.PI) / 180)} ry={18 * Math.cos((lat * Math.PI) / 180)} fill="none" stroke="#1f2933" />
      ))}
      {[0, 45, 90, 135].map((a) => (
        <ellipse key={a} cx="200" cy="200" rx={170 * Math.abs(Math.cos((a * Math.PI) / 180))} ry="170" fill="none" stroke="#1f2933" />
      ))}
      <path d="M190 150 Q 240 110 262 176" fill="none" stroke="#3fb950" strokeWidth="2" />
      <path d="M190 150 Q 220 150 236 196" fill="none" stroke="#3fb950" strokeWidth="2" opacity="0.7" />
      <path d="M190 150 Q 140 70 118 96" fill="none" stroke="#d2a8ff" strokeWidth="2" opacity="0.7" />
      <circle cx="190" cy="150" r="5" fill="#fff" />
      <circle cx="262" cy="176" r="4" fill="#3fb950" />
      <circle cx="236" cy="196" r="4" fill="#3fb950" />
      <circle cx="118" cy="96" r="4" fill="#d2a8ff" />
    </svg>
  );
}

export function HeroGlobe({ className = "relative" }: { className?: string }) {
  const [mode, setMode] = useState<"pending" | "3d" | "static">("pending");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !webglAvailable()) {
      setMode("static");
      return;
    }
    // Load Three.js on the visitor's first interaction, or once the page has loaded and stayed
    // idle for a moment — so the 3D globe never competes with first paint or early input.
    let idle = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const events = ["pointermove", "pointerdown", "scroll", "keydown", "touchstart"] as const;
    const start = () => {
      cleanup();
      setMode("3d");
    };
    const schedule = () => {
      timer = setTimeout(() => {
        if ("requestIdleCallback" in window) idle = window.requestIdleCallback(start, { timeout: 2000 });
        else start();
      }, 4000);
    };
    function cleanup() {
      events.forEach((e) => window.removeEventListener(e, start));
      window.removeEventListener("load", schedule);
      clearTimeout(timer);
      if (idle) window.cancelIdleCallback(idle);
    }
    events.forEach((e) => window.addEventListener(e, start, { once: true, passive: true }));
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
    return cleanup;
  }, []);

  useEffect(() => {
    if (mode !== "3d") return;
    // Fade the globe in once its canvas exists.
    const id = setInterval(() => {
      if (document.querySelector("#top canvas[data-globe]")) {
        setReady(true);
        clearInterval(id);
      }
    }, 100);
    return () => clearInterval(id);
  }, [mode]);

  return (
    <div className={className}>
      <GlobeFallback hidden={mode === "3d" && ready} />
      {mode === "3d" && (
        <Globe className={`absolute inset-0 transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`} />
      )}
    </div>
  );
}
