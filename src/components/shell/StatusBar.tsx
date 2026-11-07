import { Download, Mail } from "lucide-react";
import type { Dictionary } from "@/i18n/types";
import { profile } from "@/content/profile";

/** VS Code-style status bar: availability on one side, the two hiring actions on the other. Always visible. */
export function StatusBar({ dict }: { dict: Dictionary }) {
  return (
    <footer className="fixed inset-x-0 bottom-0 z-30 flex h-9 items-stretch justify-between border-t border-border bg-panel font-mono text-[12px] text-muted">
      <p className="flex min-w-0 items-center gap-2 px-3">
        <span aria-hidden className="size-2 shrink-0 rounded-full bg-green motion-safe:animate-pulse" />
        <span className="truncate">{dict.hero.availability}</span>
      </p>
      <div className="flex shrink-0 items-stretch">
        <a
          href="#contact"
          className="flex items-center gap-1.5 px-3 text-text hover:bg-white/5 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-green"
        >
          <Mail size={14} aria-hidden />
          <span className="max-sm:sr-only">{dict.cta.contact}</span>
        </a>
        <a
          href={profile.contact.cv}
          download
          className="flex items-center gap-1.5 bg-green px-3 font-semibold text-bg hover:bg-green/90 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-white"
        >
          <Download size={14} aria-hidden />
          <span className="max-sm:sr-only">{dict.cta.downloadCv}</span>
        </a>
      </div>
    </footer>
  );
}
