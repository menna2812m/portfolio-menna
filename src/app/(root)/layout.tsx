import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Mennatullah Mohamed — Frontend Web Developer",
  alternates: { canonical: "/en/" },
  robots: { index: false, follow: true },
};

/** Root layout for "/" only — the real site lives under /en/ and /ar/. */
export default function RootRedirectLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#0b0f14", color: "#c9d1d9", fontFamily: "ui-monospace, monospace" }}>
        {children}
      </body>
    </html>
  );
}
