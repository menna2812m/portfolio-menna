import { Download, Mail, MessageCircle } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/code/BrandIcons";
import type { ReactNode } from "react";
import { profile } from "@/content/profile";
import type { Dictionary } from "@/i18n/types";

type Row = { cmd: string; label: string; value: string; href: string; icon: ReactNode; external?: boolean; download?: boolean };

/** contact.sh: each line is a real command-looking link. */
export function Contact({ dict }: { dict: Dictionary }) {
  const c = profile.contact;
  const rows: Row[] = [
    { cmd: "mail", label: dict.contact.email, value: c.email, href: `mailto:${c.email}`, icon: <Mail size={18} aria-hidden /> },
    { cmd: "open", label: dict.contact.linkedin, value: "linkedin.com/in/mennatullah-mohamed", href: c.linkedin, icon: <LinkedinIcon />, external: true },
    { cmd: "chat", label: dict.contact.whatsapp, value: "+20 114 953 3878", href: c.whatsapp, icon: <MessageCircle size={18} aria-hidden />, external: true },
    { cmd: "git", label: dict.contact.github, value: "github.com/menna2812m", href: c.github, icon: <GithubIcon />, external: true },
    { cmd: "curl -O", label: dict.contact.cv, value: "Mennatullah_Mohamed-CV.pdf", href: c.cv, icon: <Download size={18} aria-hidden />, download: true },
  ];

  return (
    <div>
      <p className="max-w-[40ch] text-2xl font-medium leading-snug text-text sm:text-3xl">{dict.contact.intro}</p>
      <ul className="mt-10 space-y-2">
        {rows.map((r) => (
          <li key={r.cmd}>
            <a
              href={r.href}
              dir="ltr"
              {...(r.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              {...(r.download ? { download: true } : {})}
              className="group flex items-center gap-4 rounded-md border border-border bg-panel/60 px-4 py-3.5 transition-colors hover:border-green/60 hover:bg-green/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green"
            >
              <span className="text-muted group-hover:text-green">{r.icon}</span>
              <span className="min-w-0 flex-1">
                <span className="block font-mono text-[12px] text-muted">
                  <span className="text-green">$</span> {r.cmd}
                </span>
                <span className="block break-all font-mono text-[15px] text-text">{r.value}</span>
              </span>
              <span dir="auto" className="hidden text-sm text-muted sm:block">
                {r.label}
              </span>
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-16 font-mono text-[12px] text-muted">{dict.footer}</p>
    </div>
  );
}
