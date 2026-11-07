type Props = { url: string; src: string; alt: string };

/** A small browser window around a live-site screenshot; the address bar shows the real domain. */
export function BrowserFrame({ url, src, alt }: Props) {
  const host = new URL(url).host.replace(/^www\./, "");
  return (
    <div dir="ltr" className="overflow-hidden rounded-md border border-border bg-panel">
      <div className="flex items-center gap-2 border-b border-border px-3 py-2">
        <span aria-hidden className="flex gap-1">
          <span className="size-2 rounded-full bg-muted/50" />
          <span className="size-2 rounded-full bg-muted/50" />
          <span className="size-2 rounded-full bg-muted/50" />
        </span>
        <span className="ms-2 min-w-0 flex-1 truncate rounded bg-bg px-2 py-0.5 font-mono text-[11px] text-muted">
          <span className="text-green">https://</span>
          {host}
        </span>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element -- static export, pre-optimised WebP */}
      <img
        src={src}
        alt={alt}
        width={1200}
        height={750}
        loading="lazy"
        decoding="async"
        className="block aspect-[16/10] w-full object-cover object-top"
      />
    </div>
  );
}
