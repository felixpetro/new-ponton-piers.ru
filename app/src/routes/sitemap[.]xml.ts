import { createFileRoute } from "@tanstack/react-router";

const SITE_URL = "https://new.ponton-piers.ru";

const INDEXABLE_URLS = [
  ["/", "1.0"],
  ["/plavuchie-konstrukcii", "0.9"],
  ["/pirsy-prichaly", "0.9"],
  ["/plavuchie-garazhi-ellingi", "0.8"],
  ["/pontony-dlya-hausbota", "0.8"],
  ["/pontony-dlya-bani", "0.8"],
  ["/pontony-dlya-besedki", "0.8"],
  ["/pontony-dlya-sceny", "0.8"],
  ["/pontony-dlya-katerov", "0.8"],
  ["/pontony-dlya-restorana", "0.8"],
  ["/pontony-dlya-sadkov", "0.8"],
  ["/uslugi", "0.8"],
  ["/registraciya-plavuchih-konstrukcii", "0.7"],
  ["/dogovor-vodopolzovaniya", "0.7"],
  ["/texnicheskoe-obsluzhivanie-pirsov", "0.7"],
  ["/proizvodstvo", "0.7"],
  ["/proekty", "0.7"],
  ["/o-kompanii", "0.6"],
  ["/kontakty", "0.6"],
  ["/faq", "0.6"],
  ["/otzyvy", "0.5"],
  ["/kalkulyator", "0.7"],
  ["/blog", "0.5"],
  ["/blog/kak-vybrat-ponton", "0.6"],
  ["/blog/pnd-ili-metall", "0.6"],
  ["/blog/podgotovka-mesta-pirs", "0.6"],
  ["/blog/dok-dlya-katera", "0.6"],
] as const;

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const xml = [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
          ...INDEXABLE_URLS.flatMap(([path, priority]) => [
            "  <url>",
            `    <loc>${SITE_URL}${path}</loc>`,
            `    <priority>${priority}</priority>`,
            `    <lastmod>2026-10-08</lastmod>`,
            "  </url>",
          ]),
          "</urlset>",
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
