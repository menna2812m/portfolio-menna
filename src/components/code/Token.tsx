import type { ReactNode } from "react";

export type TokenKind = "keyword" | "string" | "number" | "prop" | "comment" | "punct" | "fn";

const color: Record<TokenKind, string> = {
  keyword: "text-keyword",
  string: "text-string",
  number: "text-number",
  prop: "text-text",
  comment: "text-muted italic",
  punct: "text-muted",
  fn: "text-purple",
};

/** A syntax-highlighted span. */
export function Token({ kind, children }: { kind: TokenKind; children: ReactNode }) {
  return <span className={color[kind]}>{children}</span>;
}

/** A quoted string literal, e.g. "React". */
export function Str({ children }: { children: ReactNode }) {
  return <Token kind="string">&quot;{children}&quot;</Token>;
}
