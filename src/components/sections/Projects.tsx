import { ExternalLink, Lock } from "lucide-react";
import { BrowserFrame } from "@/components/projects/BrowserFrame";
import { PrivateIllustration } from "@/components/projects/PrivateIllustration";
import { StackCard, Tilt } from "@/components/v2/motion";
import { profile, type Project } from "@/content/profile";
import type { Dictionary } from "@/i18n/types";

function StackTags({ stack }: { stack: string[] }) {
  return (
    <ul dir="ltr" className="flex flex-wrap gap-1.5 rtl:justify-end">
      {stack.map((t) => (
        <li key={t} className="rounded bg-white/5 px-2 py-0.5 font-mono text-[12px] text-number">
          {t}
        </li>
      ))}
    </ul>
  );
}

function LiveLink({ url, label }: { url: string; label: string }) {
  const host = new URL(url).host.replace(/^www\./, "");
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 font-mono text-[13px] text-green underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green"
    >
      {label}: <bdi dir="ltr">{host}</bdi>
      <ExternalLink size={13} aria-hidden />
    </a>
  );
}

function GroupTitle({ children }: { children: string }) {
  return <h3 className="mb-6 font-mono text-sm text-muted">{`// ${children}`}</h3>;
}

export function Projects({ dict }: { dict: Dictionary }) {
  const by = (tier: Project["tier"]) => profile.projects.filter((p) => p.tier === tier);
  const L = dict.projectLabels;

  return (
    <div className="space-y-20">
      <div>
        <GroupTitle>{L.featured}</GroupTitle>
        <ul data-tier="featured" className="space-y-8 md:space-y-[30vh] md:pb-[10vh]">
          {by("featured").map((p, i) => {
            const copy = dict.projects[p.id];
            return (
                <StackCard key={p.id} index={i} total={by("featured").length}>
                  <article className="grid gap-8 rounded-xl border border-border bg-[#0d1218] p-5 shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.95)] md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] md:p-8">
                    <a href={p.url} target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden className="block self-start transition-opacity hover:opacity-90">
                      <BrowserFrame parallax url={p.url!} src={p.screenshot!} alt={L.screenshotAlt.replace("{name}", copy.name)} />
                    </a>
                    <div className="flex flex-col">
                      <p aria-hidden dir="ltr" className="font-mono text-xs text-muted rtl:text-end">
                        <span className="text-green">{String(i + 1).padStart(2, "0")}</span> / {String(by("featured").length).padStart(2, "0")}
                      </p>
                      <h3 className="mt-3 text-2xl font-semibold tracking-tight text-text sm:text-3xl">{copy.name}</h3>
                      <p className="mt-1 text-sm text-muted">{copy.tagline}</p>
                      <p className="mt-4 leading-relaxed text-text/85">{copy.description}</p>
                      <ul className="mt-4 space-y-1.5 text-[0.95rem] text-text/80">
                        {copy.features.map((f) => (
                          <li key={f} className="flex gap-3">
                            <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-green" />
                            {f}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-6 flex flex-1 flex-col justify-end gap-4">
                        <StackTags stack={p.stack} />
                        <LiveLink url={p.url!} label={L.liveLabel} />
                      </div>
                    </div>
                  </article>
                </StackCard>
            );
          })}
        </ul>
      </div>

      <div>
        <GroupTitle>{L.private}</GroupTitle>
        <ul data-tier="private" className="grid gap-6 md:grid-cols-3">
          {by("private").map((p) => {
            const copy = dict.projects[p.id];
            return (
              <li key={p.id} className="flex">
                <Tilt className="flex w-full flex-col overflow-hidden rounded-xl border border-border bg-panel/60 transition-colors hover:border-keyword/40">
                <PrivateIllustration id={p.id} />
                <div className="flex flex-1 flex-col p-5">
                  <p className="inline-flex w-fit items-center gap-1.5 rounded border border-keyword/40 px-2 py-0.5 font-mono text-[11px] text-keyword">
                    <Lock size={11} aria-hidden />
                    {L.privateBadge}
                  </p>
                  <h3 className="mt-3 text-lg font-semibold text-text">{copy.name}</h3>
                  <p className="mt-1 text-sm text-muted">{copy.tagline}</p>
                  <p className="mt-3 flex-1 text-[0.93rem] leading-relaxed text-text/80">{copy.description}</p>
                  <div className="mt-4">
                    <StackTags stack={p.stack} />
                  </div>
                </div>
                </Tilt>
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        <GroupTitle>{L.minor}</GroupTitle>
        <ul data-tier="minor" className="divide-y divide-border border-y border-border">
          {by("minor").map((p) => {
            const copy = dict.projects[p.id];
            return (
              <li key={p.id} className="grid gap-3 py-5 md:grid-cols-[minmax(0,14rem)_minmax(0,1fr)_auto] md:items-baseline md:gap-6">
                <h3 className="font-semibold text-text">{copy.name}</h3>
                <div>
                  <p className="text-[0.95rem] text-text/80">{copy.description}</p>
                  <div className="mt-2">
                    <StackTags stack={p.stack} />
                  </div>
                </div>
                {p.url ? <LiveLink url={p.url} label={L.liveLabel} /> : <span />}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
