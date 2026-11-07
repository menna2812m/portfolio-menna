const colors: Record<string, string> = {
  ts: "text-number",
  log: "text-muted",
  json: "text-string",
  md: "text-purple",
  sh: "text-green",
};

export function FileIcon({ file }: { file: string }) {
  if (file.endsWith("/"))
    return (
      <span aria-hidden className="text-keyword">
        ▸
      </span>
    );
  const ext = file.split(".").pop() ?? "";
  return (
    <span aria-hidden className={`w-6 text-[10px] font-semibold ${colors[ext] ?? "text-muted"}`}>
      {ext.toUpperCase().slice(0, 3)}
    </span>
  );
}
