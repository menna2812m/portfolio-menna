import { profile, type SkillGroupId } from "@/content/profile";
import type { Dictionary } from "@/i18n/types";

/** skills.json: real JSON punctuation, but values wrap as chips so it reads on a phone. */
export function Skills({ dict }: { dict: Dictionary }) {
  const groups = Object.entries(profile.skills) as [SkillGroupId, string[]][];
  return (
    <div dir="ltr" className="rounded-md border border-border bg-panel/70 p-4 text-start font-mono text-sm sm:p-6">
      <p className="text-muted">{"{"}</p>
      <dl className="space-y-5 ps-4 sm:ps-6">
        {groups.map(([id, items], gi) => (
          <div key={id}>
            <dt>
              <span className="text-number">&quot;{dict.skillGroups[id]}&quot;</span>
              <span className="text-muted">: [</span>
            </dt>
            <dd className="mt-2 flex flex-wrap gap-2 ps-4">
              {items.map((s) => (
                <span key={s} className="rounded border border-border bg-bg px-2.5 py-1 text-[13px] text-string">
                  {s}
                </span>
              ))}
            </dd>
            <p className="mt-2 text-muted">{gi < groups.length - 1 ? "]," : "]"}</p>
          </div>
        ))}
      </dl>
      <p className="mt-1 text-muted">{"}"}</p>
    </div>
  );
}
