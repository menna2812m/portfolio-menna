import { profile } from "@/content/profile";
import type { Locale } from "@/i18n/locales";
import { siteUrl } from "@/lib/site";

export function JsonLd({ locale }: { locale: Locale }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.title,
    email: `mailto:${profile.contact.email}`,
    url: `${siteUrl}/${locale}/`,
    image: `${siteUrl}/og.png`,
    address: { "@type": "PostalAddress", addressLocality: "Giza", addressCountry: "EG" },
    alumniOf: { "@type": "CollegeOrUniversity", name: "Cairo University" },
    knowsAbout: profile.skills.frameworks.concat(profile.skills.languages),
    sameAs: [profile.contact.linkedin, profile.contact.github],
  };
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger -- static, build-time JSON only
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
