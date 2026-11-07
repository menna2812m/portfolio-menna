"use client";
import {
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Fades/rises content in when it scrolls into view.
 * Content is fully visible in the server HTML and for reduced-motion users; only blocks that
 * start below the fold are hidden (after hydration, off-screen) and then revealed.
 */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    if (r.top > window.innerHeight) setArmed(true);
  }, [reduce]);

  const hidden = armed && !inView;
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={false}
      animate={hidden ? { opacity: 0, y, filter: "blur(6px)" } : { opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={hidden ? { duration: 0 } : { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Thin progress bar under the title bar that fills with page scroll. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      data-scroll-progress
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-11 z-30 h-[2px] origin-left bg-gradient-to-r from-green via-number to-purple rtl:origin-right"
    />
  );
}

/** Soft green light that follows the pointer across the dark background (fine pointers only). */
export function Spotlight() {
  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const background = useMotionTemplate`radial-gradient(520px circle at ${x}px ${y}px, rgba(63,185,80,0.07), transparent 70%)`;

  useEffect(() => {
    if (reduce || !window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [reduce, x, y]);

  if (!enabled) return null;
  return <motion.div aria-hidden className="pointer-events-none fixed inset-0 z-0" style={{ background }} />;
}

/** Parallax for the hero: the globe drifts and shrinks, the copy lifts away as you scroll past. */
export function HeroParallax({ copy, visual }: { copy: ReactNode; visual: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const globeY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const globeScale = useTransform(scrollYProgress, [0, 1], [1, 0.82]);
  const globeOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.15]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -70]);

  return (
    <div ref={ref} className="relative mx-auto grid max-w-6xl items-center gap-6 px-4 pb-16 pt-6 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:pb-24 lg:pt-10">
      <motion.div style={reduce ? undefined : { y: copyY }} className="relative z-10 order-2 lg:order-1">
        {copy}
      </motion.div>
      <motion.div
        style={reduce ? undefined : { y: globeY, scale: globeScale, opacity: globeOpacity }}
        className="relative order-1 lg:order-2"
      >
        {visual}
      </motion.div>
    </div>
  );
}

/** Draws the git-graph line of the experience timeline as you scroll through it. */
export function ScrollLine({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });
  return (
    <div ref={ref} className="relative">
      <motion.span
        aria-hidden
        style={reduce ? { scaleY: 1 } : { scaleY }}
        className="absolute -start-px top-0 z-10 h-full w-[2px] origin-top bg-gradient-to-b from-green via-number to-purple"
      />
      {children}
    </div>
  );
}

/**
 * Featured project card (the <li> itself, so it can stick inside the list): pins near the top
 * while the next card slides over it, and shrinks/dims as it gets covered.
 */
export function StackCard({ children, index, total }: { children: ReactNode; index: number; total: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const reduce = useReducedMotion();
  // Progress runs while this card is pinned and the following cards scroll over it.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 96px", "end 96px"] });
  const isLast = index === total - 1;
  const scale = useTransform(scrollYProgress, [0, 1], [1, isLast ? 1 : 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, isLast ? 1 : 0.35]);
  return (
    <li ref={ref} className="md:sticky" style={{ top: `${72 + index * 22}px` }}>
      <motion.div style={reduce ? undefined : { scale, opacity }} className="origin-top">
        {children}
      </motion.div>
    </li>
  );
}

/** Screenshot that drifts inside its frame while the card scrolls (parallax). */
export function ParallaxImage({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div style={reduce ? undefined : { y, scale: 1.14 }}>{children}</motion.div>
    </div>
  );
}

/** 3D tilt toward the pointer, with a light sheen. */
export function Tilt({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const rx = useSpring(0, { stiffness: 200, damping: 20 });
  const ry = useSpring(0, { stiffness: 200, damping: 20 });
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const sheen = useMotionTemplate`radial-gradient(380px circle at ${gx}% ${gy}%, rgba(255,255,255,0.07), transparent 60%)`;

  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 10);
    rx.set((0.5 - py) * 10);
    gx.set(px * 100);
    gy.set(py * 100);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className={`relative ${className}`}
    >
      {children}
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit]" style={{ background: sheen }} />
    </motion.div>
  );
}
