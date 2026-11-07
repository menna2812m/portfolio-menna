/** Public site origin. Set SITE_URL in Cloudflare Pages once the final domain is known. */
export const siteUrl = (process.env.SITE_URL ?? "https://mennatullah-portfolio.pages.dev").replace(/\/$/, "");
