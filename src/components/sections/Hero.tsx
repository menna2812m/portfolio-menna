import { Download, FolderGit2, Mail, MapPin } from "lucide-react";
import { CodeBlock } from "@/components/code/CodeBlock";
import { Str, Token } from "@/components/code/Token";
import { TypeWriter } from "@/components/code/TypeWriter";
import { HeroGlobe } from "@/components/v2/HeroGlobe";
import { HeroParallax } from "@/components/v2/motion";
import { profile } from "@/content/profile";
import type { Dictionary } from "@/i18n/types";

const heroStack = ["React", "Next.js"];

/** Splits text into words that rise in one after another (CSS only; static for reduced motion). */
function RiseWords({ text, startMs = 0 }: { text: string; startMs?: number }) {
  return (
    <>
      {text.split(" ").map((w, i, all) => (
        <span key={i}>
          <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            <span className="rise-word inline-block" style={{ animationDelay: `${startMs + i * 110}ms` }}>
              {w}
            </span>
          </span>
          {i < all.length - 1 ? " " : null}
        </span>
      ))}
    </>
  );
}

export function Hero({ dict }: { dict: Dictionary }) {
  const copy = (
    <div>
      <p className="fade-in font-mono text-sm text-muted" style={{ animationDelay: "100ms" }}>
        {dict.hero.comment}
      </p>
      <h1
        id="hero-name"
        className="mt-4 text-[clamp(2.75rem,8vw,5.5rem)] font-semibold leading-[0.98] tracking-[-0.035em] text-text"
      >
        <RiseWords text={dict.hero.name} startMs={200} />
      </h1>
      <p className="fade-in mt-5 font-mono text-lg text-green sm:text-xl" style={{ animationDelay: "650ms" }}>
        <span aria-hidden className="text-muted">
          {"> "}
        </span>
        <bdi dir="ltr">{dict.hero.role}</bdi>
      </p>
      <p className="fade-in mt-6 max-w-[34rem] text-lg leading-relaxed text-text/85" style={{ animationDelay: "800ms" }}>
        {dict.hero.tagline}
      </p>
      <p className="fade-in mt-3 flex items-center gap-1.5 text-sm text-muted" style={{ animationDelay: "900ms" }}>
        <MapPin size={14} aria-hidden className="text-green" />
        {dict.hero.location}
      </p>
      <div className="fade-in mt-8 flex flex-wrap gap-3" style={{ animationDelay: "1000ms" }}>
        <a href="#contact" className="btn-primary btn-glow">
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
  );

  const visual = (
    <div className="relative mx-auto aspect-square w-full max-w-[34rem]">
      <div aria-hidden className="absolute inset-[12%] rounded-full bg-green/10 blur-3xl" />
      <HeroGlobe className="absolute inset-0" />
      <CodeBlock
        animate
        className="absolute -bottom-6 start-0 hidden w-[22rem] max-w-[80%] bg-panel/85 shadow-[0_30px_80px_-30px_rgba(63,185,80,0.35)] backdrop-blur-md sm:block"
      >
        <>
          <Token kind="keyword">const</Token> <Token kind="fn">developer</Token> <Token kind="punct">=</Token>{" "}
          <Token kind="punct">{"{"}</Token>
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
          <Token kind="punct">, …],</Token>
        </>
        <>
          {"  "}basedIn<Token kind="punct">:</Token> <Str>Giza, Egypt</Str>
          <Token kind="punct">,</Token>
        </>
        <>
          {"  "}openToWork<Token kind="punct">:</Token> <Token kind="keyword">true</Token>
        </>
        <>
          <Token kind="punct">{"};"}</Token>
        </>
        <>
          <Token kind="fn">$</Token>{" "}
          <span className="text-green">
            <TypeWriter text={dict.cta.hireMe} startDelayMs={1400} />
          </span>
          <span aria-hidden className="caret ms-0.5 inline-block h-4 w-2 translate-y-0.5 bg-green" />
        </>
      </CodeBlock>
      <p
        dir="ltr"
        className="fade-in absolute end-2 top-6 hidden items-center gap-2 rounded-full border border-border bg-panel/80 px-3 py-1 font-mono text-[11px] text-muted backdrop-blur sm:flex"
        style={{ animationDelay: "1600ms" }}
      >
        <span className="size-1.5 rounded-full bg-green" />
        Giza → Riyadh · Jeddah · remote
      </p>
    </div>
  );

  return (
    <section id="top" aria-labelledby="hero-name" className="relative scroll-mt-11 overflow-hidden border-b border-border">
      <div aria-hidden className="hero-grid pointer-events-none absolute inset-0" />
      <HeroParallax copy={copy} visual={visual} />
    </section>
  );
}
