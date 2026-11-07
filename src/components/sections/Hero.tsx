import { Download, FolderGit2, Mail } from "lucide-react";
import { CodeBlock } from "@/components/code/CodeBlock";
import { Str, Token } from "@/components/code/Token";
import { TypeWriter } from "@/components/code/TypeWriter";
import { profile } from "@/content/profile";
import type { Dictionary } from "@/i18n/types";

const heroStack = ["React", "Next.js", "Angular", "Vue"];

export function Hero({ dict }: { dict: Dictionary }) {
  return (
    <section id="top" aria-labelledby="hero-name" className="scroll-mt-11 border-b border-border">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 pb-16 pt-14 sm:px-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-center lg:pb-24 lg:pt-20">
        <div>
          <p className="font-mono text-sm text-muted">
            {dict.hero.comment}
          </p>
          <h1
            id="hero-name"
            className="mt-4 text-[clamp(2.5rem,7vw,4.75rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-text"
          >
            {dict.hero.name}
          </h1>
          <p className="mt-4 font-mono text-lg text-green sm:text-xl">
            <bdi dir="ltr">{dict.hero.role}</bdi>
          </p>
          <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-text/85">{dict.hero.tagline}</p>
          <p className="mt-3 text-sm text-muted">{dict.hero.location}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#contact" className="btn-primary">
              <Mail size={16} aria-hidden />
              {dict.cta.contact}
            </a>
            <a href={profile.contact.cv} download className="btn-secondary">
              <Download size={16} aria-hidden />
              {dict.cta.downloadCv}
            </a>
            <a href="#projects" className="btn-ghost">
              <FolderGit2 size={16} aria-hidden />
              {dict.cta.viewProjects}
            </a>
          </div>
        </div>

        <CodeBlock animate className="shadow-[0_30px_80px_-30px_rgba(63,185,80,0.25)]">
          <>
            <Token kind="keyword">const</Token> <Token kind="fn">developer</Token> <Token kind="punct">=</Token>{" "}
            <Token kind="punct">{"{"}</Token>
          </>
          <>
            {"  "}name<Token kind="punct">:</Token> <Str>{profile.name}</Str>
            <Token kind="punct">,</Token>
          </>
          <>
            {"  "}role<Token kind="punct">:</Token> <Str>{profile.title}</Str>
            <Token kind="punct">,</Token>
          </>
          <>
            {"  "}stack<Token kind="punct">: [</Token>
            {heroStack.map((s, i) => (
              <span key={s}>
                <Str>{s}</Str>
                {i < heroStack.length - 1 && <Token kind="punct">, </Token>}
              </span>
            ))}
            <Token kind="punct">],</Token>
          </>
          <>
            {"  "}yearsOfExperience<Token kind="punct">:</Token> <Token kind="number">{profile.years}</Token>
            <Token kind="punct">,</Token>
          </>
          <>
            {"  "}basedIn<Token kind="punct">:</Token> <Str>Cairo, Egypt</Str>
            <Token kind="punct">,</Token>
          </>
          <>
            {"  "}openToWork<Token kind="punct">:</Token> <Token kind="keyword">true</Token>
          </>
          <>
            <Token kind="punct">{"};"}</Token>
          </>
          <> </>
          <>
            <Token kind="fn">$</Token>{" "}
            <span className="text-green">
              <TypeWriter text={dict.cta.hireMe} startDelayMs={1100} />
            </span>
            <span aria-hidden className="caret ms-0.5 inline-block h-4 w-2 translate-y-0.5 bg-green" />
          </>
        </CodeBlock>
      </div>
    </section>
  );
}
