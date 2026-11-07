import type { ProjectId } from "@/content/profile";

const stroke = "var(--color-border)";
const green = "var(--color-green)";
const blue = "var(--color-number)";
const purple = "var(--color-purple)";
const muted = "var(--color-muted)";

/** Themed line illustrations standing in for private (NDA) projects — no real UI is shown. */
export function PrivateIllustration({ id }: { id: ProjectId }) {
  return (
    <svg viewBox="0 0 320 180" role="presentation" aria-hidden className="block h-auto w-full">
      <rect width="320" height="180" fill="var(--color-panel)" />
      <g opacity="0.5" stroke={stroke}>
        {Array.from({ length: 9 }, (_, i) => (
          <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40} y2="180" />
        ))}
        {Array.from({ length: 5 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 40} x2="320" y2={i * 40} />
        ))}
      </g>
      {id === "sahl" && (
        <g fill="none" strokeWidth="2">
          <rect x="118" y="22" width="84" height="146" rx="12" stroke={muted} />
          <rect x="130" y="44" width="60" height="22" rx="3" stroke={blue} />
          <rect x="130" y="74" width="12" height="40" fill={green} stroke="none" opacity="0.8" />
          <rect x="148" y="88" width="12" height="26" fill={blue} stroke="none" opacity="0.8" />
          <rect x="166" y="80" width="12" height="34" fill={purple} stroke="none" opacity="0.8" />
          <line x1="130" y1="128" x2="190" y2="128" stroke={muted} />
          <line x1="130" y1="140" x2="172" y2="140" stroke={muted} />
          <circle cx="160" cy="156" r="4" stroke={muted} />
        </g>
      )}
      {id === "boulevard" && (
        <g fill="none" strokeWidth="2">
          <path d="M40 140 C 90 100, 120 150, 170 110 S 250 70, 290 90" stroke={blue} strokeDasharray="5 6" />
          <path d="M170 54 a18 18 0 0 1 18 18 c0 14 -18 34 -18 34 s-18 -20 -18 -34 a18 18 0 0 1 18 -18z" stroke={green} />
          <circle cx="170" cy="72" r="6" fill={green} stroke="none" />
          <g transform="translate(232 112)" fill={purple} stroke="none" opacity="0.85">
            {[0, 1, 2, 3, 4].flatMap((r) =>
              [0, 1, 2, 3, 4].map((c) =>
                (r * 7 + c * 3) % 3 !== 0 || (r % 4 === 0 && c % 4 === 0) ? (
                  <rect key={`${r}-${c}`} x={c * 8} y={r * 8} width="7" height="7" />
                ) : null,
              ),
            )}
          </g>
        </g>
      )}
      {id === "mlDashboard" && (
        <g fill="none" strokeWidth="2">
          <polyline points="30,140 75,118 120,126 165,84 210,96 255,52 290,60" stroke={green} />
          <polyline points="30,150 75,140 120,146 165,122 210,128 255,104 290,110" stroke={blue} opacity="0.8" />
          {[
            [75, 118],
            [165, 84],
            [255, 52],
          ].map(([x, y]) => (
            <circle key={x} cx={x} cy={y} r="4" fill="var(--color-panel)" stroke={green} />
          ))}
          <circle cx="62" cy="52" r="22" stroke={muted} />
          <path d="M62 30 a22 22 0 0 1 21 28" stroke={purple} strokeWidth="6" />
        </g>
      )}
    </svg>
  );
}
