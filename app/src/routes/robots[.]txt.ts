import { createFileRoute } from "@tanstack/react-router";

const SITE_URL = "https://new.ponton-piers.ru";
const IS_STAGING = SITE_URL.includes("new.");

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: async () => {
        const body = [
          "User-agent: *",
          IS_STAGING ? "Disallow: /" : "Allow: /",
          "",
          `Sitemap: ${SITE_URL}/sitemap.xml`,
        ].join("\n");

        return new Response(body, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=86400",
          },
        });
      },
    },
  },
});
