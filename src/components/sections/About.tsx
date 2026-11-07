import type { Dictionary } from "@/i18n/types";

export function About({ dict }: { dict: Dictionary }) {
  const { about } = dict;
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
      <div className="relative ps-6">
        <span aria-hidden dir="ltr" className="absolute start-0 top-0 font-mono text-sm text-muted">
          /**
        </span>
        <div className="space-y-5 pt-7 text-[1.05rem] leading-relaxed text-text/90">
          {about.paragraphs.map((p) => (
            <p key={p} className="max-w-[62ch]">
              {p}
            </p>
          ))}
        </div>
        <span aria-hidden dir="ltr" className="mt-3 block font-mono text-sm text-muted">
          {" */"}
        </span>
      </div>

      <dl className="space-y-6 font-mono text-sm">
        <div>
          <dt className="text-muted">
            <bdi dir="ltr">{about.educationLabel}:</bdi>
          </dt>
          <dd className="mt-2 font-sans text-[0.95rem] leading-relaxed text-string">{about.education}</dd>
        </div>
        <div>
          <dt className="text-muted">
            <bdi dir="ltr">{about.softSkillsLabel}:</bdi>
          </dt>
          <dd className="mt-3">
            <ul className="flex flex-wrap gap-2 font-sans">
              {about.softSkills.map((s) => (
                <li key={s} className="rounded border border-border bg-panel px-2.5 py-1 text-[0.85rem] text-text/90">
                  {s}
                </li>
              ))}
            </ul>
          </dd>
        </div>
      </dl>
    </div>
  );
}
