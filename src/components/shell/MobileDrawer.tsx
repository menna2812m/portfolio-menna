"use client";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { FileTree } from "./FileTree";

type Props = { label: string; openLabel: string; closeLabel: string };

export function MobileDrawer({ label, openLabel, closeLabel }: Props) {
  const [open, setOpen] = useState(false);
  const burger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    panel.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        burger.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const close = (restoreFocus: boolean) => {
    setOpen(false);
    if (restoreFocus) burger.current?.focus();
  };

  return (
    <div className="lg:hidden">
      <button
        ref={burger}
        type="button"
        aria-label={openLabel}
        aria-expanded={open}
        aria-controls="mobile-explorer"
        onClick={() => setOpen((o) => !o)}
        className="grid size-8 place-items-center rounded text-text hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-green"
      >
        <Menu size={18} aria-hidden />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40 bg-black/60" aria-hidden onClick={() => close(true)} />
          <div
            ref={panel}
            id="mobile-explorer"
            role="dialog"
            aria-modal="true"
            aria-label={label}
            className="fixed inset-y-0 start-0 z-50 w-72 max-w-[85vw] border-e border-border bg-panel shadow-2xl"
          >
            <div className="flex justify-end p-2">
              <button
                type="button"
                aria-label={closeLabel}
                onClick={() => close(true)}
                className="grid size-8 place-items-center rounded text-muted hover:text-text focus-visible:outline-2 focus-visible:outline-green"
              >
                <X size={18} aria-hidden />
              </button>
            </div>
            <FileTree label={label} onNavigate={() => close(false)} />
          </div>
        </>
      )}
    </div>
  );
}
