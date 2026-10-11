import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const PUBLIC_ROUTES = [
  "/", "/plavuchie-konstrukcii", "/pirsy-prichaly", "/plavuchie-garazhi-ellingi",
  "/pontony-dlya-hausbota", "/pontony-dlya-bani", "/pontony-dlya-besedki",
  "/pontony-dlya-sceny", "/pontony-dlya-katerov", "/pontony-dlya-restorana",
  "/pontony-dlya-sadkov", "/uslugi", "/registraciya-plavuchih-konstrukcii",
  "/dogovor-vodopolzovaniya", "/texnicheskoe-obsluzhivanie-pirsov", "/o-kompanii",
  "/proizvodstvo", "/otzyvy", "/faq", "/kontakty", "/kalkulyator", "/blog",
  "/blog/kak-vybrat-ponton", "/blog/pnd-ili-metall", "/blog/podgotovka-mesta-pirs",
  "/blog/dok-dlya-katera",
];

export function buildSeoFiles(siteUrl, environment = "production") {
  const baseUrl = String(siteUrl || "https://ponton-piers.ru").replace(/\/$/, "");
  const hostname = new URL(baseUrl).hostname.toLowerCase();
  const staging = environment === "staging" || hostname === "new.ponton-piers.ru";
  const robots = staging
    ? "User-agent: *\nDisallow: /\n"
    : [
        "User-agent: *",
        "Allow: /",
        "Sitemap: " + baseUrl + "/sitemap.xml",
        "",
      ].join("\n");
  const routes = staging ? [] : PUBLIC_ROUTES;
  const urls = routes.map((route) => "  <url><loc>" + baseUrl + (route === "/" ? "/" : route) + "</loc></url>");
  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    "</urlset>",
    "",
  ].join("\n");
  return { robots, sitemap, staging, baseUrl, urlCount: routes.length };
}

export async function writeSeoFiles() {
  const siteUrl = process.env.SITE_URL || process.env.VITE_SITE_URL || "https://ponton-piers.ru";
  const environment = process.env.SITE_ENV || process.env.VITE_SITE_ENV || (siteUrl.includes("new.") ? "staging" : "production");
  const { robots, sitemap, staging, urlCount } = buildSeoFiles(siteUrl, environment);
  const publicDir = resolve(dirname(fileURLToPath(import.meta.url)), "../public");
  await mkdir(publicDir, { recursive: true });
  await Promise.all([
    writeFile(resolve(publicDir, "robots.txt"), robots, "utf8"),
    writeFile(resolve(publicDir, "sitemap.xml"), sitemap, "utf8"),
  ]);
  console.log("Generated robots.txt and sitemap.xml for " + (staging ? "staging (blocked from crawling)" : "production") + "; sitemap URLs: " + urlCount);
}

if (import.meta.main) await writeSeoFiles();
