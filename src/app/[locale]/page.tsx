import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { EditorChrome } from "@/components/shell/EditorChrome";
import { About } from "@/components/sections/About";
import { Certificates } from "@/components/sections/Certificates";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/sections/Section";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { sections, type SectionId } from "@/content/sections";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale } from "@/i18n/locales";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  const content: Record<SectionId, ReactNode> = {
    about: <About dict={dict} />,
    experience: <Experience dict={dict} locale={locale} />,
    projects: <Projects dict={dict} />,
    skills: <Skills dict={dict} />,
    certificates: <Certificates dict={dict} />,
    contact: <Contact dict={dict} />,
  };

  return (
    <EditorChrome locale={locale} dict={dict}>
      <Hero dict={dict} />
      {sections.map((s) => (
        <Section key={s.id} id={s.id} file={s.file} copy={dict.sections[s.id]}>
          {content[s.id]}
        </Section>
      ))}
    </EditorChrome>
  );
}
