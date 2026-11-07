"use client";
import { useEffect, useState } from "react";

type Props = { text: string; speedMs?: number; startDelayMs?: number };

/**
 * Types `text` out character by character. The full text is always in the DOM
 * (visually hidden) so crawlers and screen readers get it from the first render;
 * reduced-motion users see the full text immediately.
 */
export function TypeWriter({ text, speedMs = 70, startDelayMs = 0 }: Props) {
  const [count, setCount] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    if (prefersReduced) {
      setReduced(true);
      return;
    }
    let i = 0;
    let interval: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setCount(i);
        if (i >= text.length && interval) clearInterval(interval);
      }, speedMs);
    }, startDelayMs);
    return () => {
      clearTimeout(start);
      if (interval) clearInterval(interval);
    };
  }, [text, speedMs, startDelayMs]);

  const visible = reduced ? text : text.slice(0, count);

  return (
    <>
      <span className="sr-only" data-testid="typewriter-full">
        {text}
      </span>
      <span aria-hidden data-testid="typewriter-visible">
        {visible}
      </span>
    </>
  );
}
