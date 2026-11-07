import type { ReactNode } from "react";
import { Reveal } from "@/components/v2/motion";
import type { SectionCopy } from "@/i18n/types";

type Props = { id: string; file: string; copy: SectionCopy; children?: ReactNode };

/** One editor "file": a tab strip with the filename, a plain heading and summary, then the content. */
export function Section({ id, file, copy, children }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="relative scroll-mt-11 border-b border-border">
      <div className="flex border-b border-border bg-panel/40">
        <span dir="ltr" className="border-t-2 border-green bg-bg px-4 py-2 font-mono text-xs text-text">
          {file}
        </span>
      </div>
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-8 lg:py-24">
        <Reveal>
          <h2 id={`${id}-title`} className="text-3xl font-semibold tracking-[-0.02em] text-text sm:text-5xl">
            {copy.title}
          </h2>
          <p className="mt-3 text-lg text-muted">{copy.summary}</p>
        </Reveal>
        <Reveal delay={0.12} className="mt-10">
          {children}
        </Reveal>
      </div>
    </section>
  );
}
