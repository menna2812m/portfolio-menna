const items = [
  "React",
  "Next.js",
  "Angular",
  "Vue.js",
  "TypeScript",
  "Nuxt.js",
  "RxJS",
  "Tailwind CSS",
  "WebSockets",
  "Ionic",
  "Quasar",
  "i18n / RTL",
  "Accessibility",
  "Google Maps",
  "Pinia",
  "Vite",
];

/** Endless ticker of the stack, like a scrolling build log. CSS-only; stops for reduced motion. */
export function Marquee() {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-10 pe-10">
      {items.map((t, i) => (
        <li key={t} className="flex items-center gap-10 whitespace-nowrap font-mono text-sm text-muted">
          <span className={i % 3 === 0 ? "text-green" : i % 3 === 1 ? "text-number" : "text-purple"}>{t}</span>
          <span aria-hidden className="text-border">
            ✦
          </span>
        </li>
      ))}
    </ul>
  );
  return (
    <div
      data-marquee
      dir="ltr"
      className="marquee group relative overflow-hidden border-b border-border bg-panel/40 py-4 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]"
    >
      <div className="marquee-track flex w-max group-hover:[animation-play-state:paused]">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
