import type { ReactNode } from "react";
import type { Dictionary } from "@/i18n/types";
import type { Locale } from "@/i18n/locales";
import { FileTree } from "./FileTree";
import { LangToggle } from "./LangToggle";
import { MobileDrawer } from "./MobileDrawer";
import { StatusBar } from "./StatusBar";
import { ScrollProgress, Spotlight } from "@/components/v2/motion";

type Props = { locale: Locale; dict: Dictionary; children: ReactNode };

export function EditorChrome({ locale, dict, children }: Props) {
  return (
    <div className="min-h-dvh pb-9">
      <Spotlight />
      <header className="sticky top-0 z-30 flex h-11 items-center gap-3 border-b border-border bg-panel px-3">
        <MobileDrawer label={dict.chrome.explorer} openLabel={dict.chrome.openMenu} closeLabel={dict.chrome.closeMenu} />
        <div aria-hidden className="hidden gap-1.5 lg:flex">
          <span className="size-3 rounded-full bg-[#ff5f56]" />
          <span className="size-3 rounded-full bg-[#ffbd2e]" />
          <span className="size-3 rounded-full bg-[#27c93f]" />
        </div>
        <p dir="ltr" className="min-w-0 flex-1 truncate text-center font-mono text-xs text-muted">
          {dict.chrome.windowTitle}
        </p>
        <LangToggle locale={locale} label={dict.chrome.switchLanguage} text={dict.chrome.otherLanguageLabel} />
      </header>
      <ScrollProgress />
      <div className="lg:grid lg:grid-cols-[15rem_minmax(0,1fr)]">
        <aside className="hidden border-e border-border bg-panel/60 lg:block">
          <div className="sticky top-11 h-[calc(100dvh-5rem)] overflow-y-auto">
            <FileTree label={dict.chrome.explorer} />
          </div>
        </aside>
        <main className="relative z-10 min-w-0">{children}</main>
      </div>
      <StatusBar dict={dict} />
    </div>
  );
}
