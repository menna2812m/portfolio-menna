import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const dynamic = "force-static";
const size = { width: 1200, height: 630 };

const c = {
  bg: "#0b0f14",
  panel: "#11161d",
  border: "#1f2933",
  text: "#c9d1d9",
  muted: "#6e7681",
  green: "#3fb950",
  keyword: "#ff7b72",
  string: "#a5d6ff",
  number: "#79c0ff",
  purple: "#d2a8ff",
};

/** GET /og.png — link preview for LinkedIn / WhatsApp: the editor window with the hero object. */
export async function GET() {
  const line = (n: number, children: React.ReactNode) => (
    <div style={{ display: "flex", fontSize: 30, lineHeight: 1.55 }}>
      <span style={{ width: 56, color: c.muted, opacity: 0.6 }}>{n}</span>
      <span style={{ display: "flex", whiteSpace: "pre" }}>{children}</span>
    </div>
  );
  const s = (t: string) => <span style={{ color: c.string }}>&quot;{t}&quot;</span>;

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: c.bg, padding: 48, fontFamily: "monospace" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            border: `2px solid ${c.border}`,
            borderRadius: 16,
            background: c.panel,
            overflow: "hidden",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "18px 24px", borderBottom: `2px solid ${c.border}` }}>
            <div style={{ width: 18, height: 18, borderRadius: 9, background: "#ff5f56" }} />
            <div style={{ width: 18, height: 18, borderRadius: 9, background: "#ffbd2e" }} />
            <div style={{ width: 18, height: 18, borderRadius: 9, background: "#27c93f" }} />
            <span style={{ marginLeft: 24, color: c.muted, fontSize: 24 }}>~/mennatullah — portfolio.tsx</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", padding: "36px 40px", color: c.text }}>
            {line(1, <span style={{ color: c.muted }}>{"// hello world"}</span>)}
            {line(
              2,
              <>
                <span style={{ color: c.keyword }}>const </span>
                <span style={{ color: c.purple }}>developer</span>
                <span style={{ color: c.muted }}> = {"{"}</span>
              </>,
            )}
            {line(3, <>{"  name: "}{s(profile.name)},</>)}
            {line(4, <>{"  role: "}{s(profile.title)},</>)}
            {line(5, <>{"  stack: ["}{s("React")}, {s("Next.js")}, {s("Angular")}, {s("Vue")}],</>)}
            {line(
              6,
              <>
                {"  openToWork: "}
                <span style={{ color: c.keyword }}>true</span>
              </>,
            )}
            {line(7, <span style={{ color: c.muted }}>{"};"}</span>)}
            {line(
              8,
              <>
                <span style={{ color: c.purple }}>$ </span>
                <span style={{ color: c.green }}>npm run hire-me</span>
                <span style={{ width: 16, height: 32, background: c.green, marginLeft: 6 }} />
              </>,
            )}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
