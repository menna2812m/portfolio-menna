import { profile } from "@/content/profile";
import type { Locale } from "@/i18n/locales";
import type { Dictionary } from "@/i18n/types";

export function formatMonth(ym: string, locale: Locale): string {
  const [y, m] = ym.split("-").map(Number);
  return new Intl.DateTimeFormat(locale === "ar" ? "ar-u-nu-latn" : "en", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(y, m - 1, 1)));
}

/** Rendered like a `git log --graph`: one commit per role, newest at the top. */
export function Experience({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  return (
    <ol className="relative border-s border-border">
      {profile.jobs.map((job, i) => {
        const copy = dict.jobs[job.id];
        const current = job.end === null;
        return (
          <li key={job.id} className="relative pb-12 ps-8 last:pb-0">
            <span
              aria-hidden
              className={`absolute -start-[7px] top-1.5 size-3.5 rounded-full border-2 ${
                current ? "border-green bg-green" : "border-muted bg-bg"
              }`}
            />
            <p className="font-mono text-[13px] text-muted">
              <span className="text-keyword">commit</span>{" "}
              <bdi dir="ltr">
                {formatMonth(job.start, locale)} → {current ? dict.present : formatMonth(job.end!, locale)}
              </bdi>
              {current && (
                <span dir="ltr" className="ms-2 text-number">
                  (HEAD → main)
                </span>
              )}
              {i === profile.jobs.length - 1 && (
                <span dir="ltr" className="ms-2 text-muted">
                  (initial commit)
                </span>
              )}
            </p>
            <h3 className="mt-2 text-xl font-semibold text-text">
              <bdi>{job.company}</bdi>
            </h3>
            <p className="mt-0.5 text-sm text-muted">
              <bdi dir="ltr">{copy.role}</bdi> · {job.location}
            </p>
            <ul className="mt-4 max-w-[68ch] space-y-2 text-[0.97rem] leading-relaxed text-text/85">
              {copy.summary.map((line) => (
                <li key={line} className="flex gap-3">
                  <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-muted" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <ul dir="ltr" className="mt-4 flex flex-wrap gap-1.5 rtl:justify-end">
              {job.stack.map((t) => (
                <li key={t} className="rounded bg-white/5 px-2 py-0.5 font-mono text-[12px] text-number">
                  {t}
                </li>
              ))}
            </ul>
          </li>
        );
      })}
    </ol>
  );
}
