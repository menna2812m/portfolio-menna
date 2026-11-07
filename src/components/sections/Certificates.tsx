import { ExternalLink } from "lucide-react";
import { profile } from "@/content/profile";
import type { Dictionary } from "@/i18n/types";

export function Certificates({ dict }: { dict: Dictionary }) {
  return (
    <ul className="divide-y divide-border border-y border-border">
      {profile.certificates.map((c) => (
        <li key={c.id} className="flex flex-wrap items-baseline gap-x-4 gap-y-1 py-4">
          <span aria-hidden className="font-mono text-muted">
            -
          </span>
          <span className="min-w-0 flex-1">
            <span className="font-medium text-text">{dict.certificates[c.id]}</span>
            <span className="ms-2 text-sm text-muted">
              <bdi>{c.issuer}</bdi>
            </span>
          </span>
          {c.url && (
            <a
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-mono text-[13px] text-number underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green"
            >
              {dict.certificateView}
              <ExternalLink size={13} aria-hidden />
            </a>
          )}
        </li>
      ))}
    </ul>
  );
}
