import { Children, type ReactNode } from "react";

type Props = { children: ReactNode; className?: string; animate?: boolean };

/**
 * An editor pane with a line-number gutter. Each child is one line.
 * Always left-to-right, even inside the Arabic page, like a real editor.
 * With `animate`, lines appear one after another (pure CSS, so the text is
 * always present in the HTML and reduced-motion users see it all at once).
 */
export function CodeBlock({ children, className = "", animate = false }: Props) {
  const lines = Children.toArray(children);
  return (
    <div
      dir="ltr"
      className={`overflow-x-auto rounded-md border border-border bg-panel/70 py-3 text-start font-mono text-[13px] leading-6 sm:text-sm ${className}`}
    >
      <ol className="min-w-max">
        {lines.map((line, i) => (
          <li
            key={i}
            className={`flex gap-4 pe-4 ${animate ? "code-line-in" : ""}`}
            style={animate ? ({ "--i": i } as React.CSSProperties) : undefined}
          >
            <span aria-hidden className="w-8 shrink-0 select-none text-end text-muted/60">
              {i + 1}
            </span>
            <span className="whitespace-pre">{line}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
