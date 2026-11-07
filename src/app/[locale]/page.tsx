import { notFound } from "next/navigation";
import { EditorChrome } from "@/components/shell/EditorChrome";
import { Section } from "@/components/sections/Section";
import { sections } from "@/content/sections";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale } from "@/i18n/locales";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  return (
    <EditorChrome locale={locale} dict={dict}>
      <div id="top" className="min-h-[60vh]" />
      {sections.map((s) => (
        <Section key={s.id} id={s.id} file={s.file} copy={dict.sections[s.id]}>
          <div className="min-h-[50vh]" />
        </Section>
      ))}
    </EditorChrome>
  );
}
