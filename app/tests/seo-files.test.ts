import { describe, expect, test } from "bun:test";
import { existsSync, readFileSync } from "node:fs";
import { buildSeoFiles, PUBLIC_ROUTES } from "../scripts/generate-seo-files.mjs";

describe("SEO files", () => {
  test("robots and sitemap are generated as public assets, not competing route handlers", () => {
    expect(existsSync(new URL("../src/routes/robots[.]txt.ts", import.meta.url))).toBe(false);
    expect(existsSync(new URL("../src/routes/sitemap[.]xml.ts", import.meta.url))).toBe(false);
  });
  test("production sitemap uses production canonicals and excludes private or disabled routes", () => {
    const files = buildSeoFiles("https://ponton-piers.ru", "production");
    expect(files.robots).toContain("Sitemap: https://ponton-piers.ru/sitemap.xml");
    expect(files.robots).toContain("Allow: /");
    expect(files.robots).not.toContain("Disallow: /privacy");
    expect(files.robots).not.toContain("Disallow: /soglasie");
    expect(files.sitemap).toContain("<loc>https://ponton-piers.ru/</loc>");
    expect(files.sitemap).not.toContain("new.ponton-piers.ru");
    expect(files.sitemap).not.toContain("/privacy");
    expect(files.sitemap).not.toContain("/soglasie");
    expect(files.sitemap).not.toContain("/proekty");
    expect(files.sitemap).not.toContain("/app");
    expect(files.urlCount).toBe(PUBLIC_ROUTES.length);
  });

  test("staging cannot be indexed and does not publish staging URLs in sitemap", () => {
    const files = buildSeoFiles("https://new.ponton-piers.ru", "staging");
    expect(files.robots).toContain("Disallow: /");
    expect(files.robots).not.toContain("Sitemap:");
    expect(files.robots).not.toContain("Sitemap:");
    expect(files.sitemap).not.toContain("https://new.ponton-piers.ru");
    expect(files.sitemap).not.toContain("<url>");
    expect(files.sitemap).toContain("<urlset");
    expect((files.sitemap.match(/<url>/g) || []).length).toBe(PUBLIC_ROUTES.length);
    expect(files.sitemap).toContain("<loc>https://ponton-piers.ru/o-kompanii</loc>");
    expect(files.urlCount).toBe(0);
  });

  test("legacy projects URL redirects and is not linked from main landing components", () => {
    const projectsRoute = readFileSync(new URL("../src/routes/proekty.tsx", import.meta.url), "utf8");
    const siteComponents = readFileSync(new URL("../src/site.tsx", import.meta.url), "utf8");
    const homepage = readFileSync(new URL("../src/routes/index.tsx", import.meta.url), "utf8");
    expect(projectsRoute).toContain('redirect({ to: "/o-kompanii" })');
    expect(siteComponents).not.toContain('href="/proekty"');
    expect(homepage).not.toContain('href="/proekty"');
  });
});
