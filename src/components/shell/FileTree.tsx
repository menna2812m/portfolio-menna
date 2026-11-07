"use client";
import { sections, sectionIds } from "@/content/sections";
import { useActiveSection } from "./useActiveSection";
import { FileIcon } from "./FileIcon";

type Props = { label: string; onNavigate?: () => void; className?: string };

export function FileTree({ label, onNavigate, className = "" }: Props) {
  const active = useActiveSection(sectionIds);
  return (
    <nav aria-label={label} className={className}>
      <p className="px-4 pb-2 pt-4 font-mono text-[11px] text-muted">{label}</p>
      <p className="flex items-center gap-1.5 px-4 py-1 font-mono text-[13px] text-text">
        <span aria-hidden className="text-muted">▾</span> src
      </p>
      <ul className="font-mono text-[13px]">
        {sections.map((s) => {
          const isActive = active === s.id;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={isActive ? "true" : undefined}
                onClick={onNavigate}
                className={`flex items-center gap-2 border-s-2 py-1.5 pe-4 ps-8 transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-green ${
                  isActive
                    ? "border-green bg-green/10 text-text"
                    : "border-transparent text-muted hover:bg-white/5 hover:text-text"
                }`}
              >
                <FileIcon file={s.file} />
                <bdi dir="ltr">{s.file}</bdi>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
