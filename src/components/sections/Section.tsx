import type { ReactNode } from "react";
import type { SectionCopy } from "@/i18n/types";

type Props = { id: string; file: string; copy: SectionCopy; children?: ReactNode };

/** One editor "file": a tab strip with the filename, a plain heading and summary, then the content. */
export function Section({ id, file, copy, children }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-11 border-b border-border">
      <div className="flex border-b border-border bg-panel/40">
        <span dir="ltr" className="border-t-2 border-green bg-bg px-4 py-2 font-mono text-xs text-text">
          {file}
        </span>
      </div>
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-8 lg:py-20">
        <h2 id={`${id}-title`} className="text-2xl font-semibold tracking-tight text-text sm:text-3xl">
          {copy.title}
        </h2>
        <p className="mt-2 text-muted">{copy.summary}</p>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}
