import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { button } from "@higgsfield/quanta/button";
import { NotFound } from "@higgsfield/quanta/not-found";

import appCss from "../styles.css?url";
import { reportHiggsfieldError } from "../lib/higgsfield-error-reporting";
import appMetaJson from "../app-meta.json";

declare const __HF_DESIGN_INSPECTOR__: boolean;

const SITE_URL = "https://new.ponton-piers.ru";
const DEFAULT_TITLE = "Понтон Пирс";
const DEFAULT_DESCRIPTION =
  "Понтоны, пирсы и плавучие конструкции на заказ. Проектирование, производство, доставка и монтаж по России.";
const IS_STAGING = SITE_URL.includes("new.");

type SeoEntry = {
  title: string;
  description: string;
  type?: "website" | "article";
  noindex?: boolean;
  service?: string;
};

const SEO: Record<string, SeoEntry> = {
  "/": {
    title: "Понтоны и плавучие конструкции на заказ в Санкт-Петербурге | Понтон Пирс",
    description:
      "Проектируем и производим понтоны, пирсы и плавучие конструкции на заказ. Расчёт, производство, доставка и монтаж по России.",
  },
  "/plavuchie-konstrukcii": {
    title: "Понтоны и плавучие конструкции на заказ | Понтон Пирс",
    description:
      "Плавучие платформы и понтоны под индивидуальные размеры и нагрузку. Проектирование, производство, доставка и монтаж.",
    service: "Понтоны и плавучие конструкции",
  },
  "/pirsy-prichaly": {
    title: "Пирсы и причалы на заказ в Санкт-Петербурге | Понтон Пирс",
    description:
      "Понтонные пирсы и причалы на заказ. Расчёт плавучести, индивидуальные размеры, комплектация, доставка и монтаж.",
    service: "Пирсы и причалы",
  },
  "/plavuchie-garazhi-ellingi": {
    title: "Плавучие гаражи и эллинги на заказ | Понтон Пирс",
    description:
      "Плавучие гаражи и эллинги на понтонах для лодок, катеров и яхт. Проектирование, производство и монтаж.",
    service: "Плавучие гаражи и эллинги",
  },
  "/pontony-dlya-hausbota": {
    title: "Понтоны для хаусбота и плавучего дома | Понтон Пирс",
    description:
      "Понтонные платформы для хаусботов и плавучих домов. Расчёт грузоподъёмности и плавучести, изготовление и монтаж.",
    service: "Понтоны для хаусбота",
  },
  "/pontony-dlya-bani": {
    title: "Понтоны для бани на воде на заказ | Понтон Пирс",
    description:
      "Изготовление понтонов и плавучих платформ для бани. Расчёт нагрузки, проектирование, производство, доставка и монтаж.",
    service: "Понтоны для бани",
  },
  "/pontony-dlya-besedki": {
    title: "Понтоны для беседки на воде на заказ | Понтон Пирс",
    description:
      "Плавучие платформы для беседок и зон отдыха на воде. Индивидуальные размеры, расчёт нагрузки, изготовление и монтаж.",
    service: "Понтоны для беседки",
  },
  "/pontony-dlya-sceny": {
    title: "Понтон для сцены на воде на заказ | Понтон Пирс",
    description:
      "Плавучие понтоны и платформы для сцен на воде. Расчёт нагрузки, индивидуальные размеры, производство, доставка и монтаж.",
    service: "Понтоны для сцены",
  },
  "/pontony-dlya-katerov": {
    title: "Понтоны и доки для катеров и яхт | Понтон Пирс",
    description:
      "Понтонные доки и причальные платформы для катеров, яхт и лодок. Проектирование, производство и монтаж.",
    service: "Понтоны для катеров",
  },
  "/pontony-dlya-restorana": {
    title: "Понтоны для ресторанов на воде на заказ | Понтон Пирс",
    description:
      "Понтонные платформы для ресторанов, кафе и коммерческих объектов на воде. Проектирование, производство и монтаж.",
    service: "Понтоны для ресторанов",
  },
  "/pontony-dlya-sadkov": {
    title: "Понтоны для рыбоводческих садков | Понтон Пирс",
    description:
      "Плавучие понтонные конструкции для рыбоводческих садков и хозяйств. Расчёт нагрузки, производство и монтаж.",
    service: "Понтоны для садков",
  },
  "/uslugi": {
    title: "Услуги для плавучих конструкций | Понтон Пирс",
    description:
      "Проектирование, производство, регистрация плавучих конструкций, водопользование и обслуживание пирсов. Полный цикл услуг.",
    service: "Услуги для плавучих конструкций",
  },
  "/registraciya-plavuchih-konstrukcii": {
    title: "Регистрация плавучих конструкций | Понтон Пирс",
    description:
      "Помощь в регистрации плавучих домов, дач, беседок, пирсов и бань. Подготовка документов и сопровождение процедуры.",
    service: "Регистрация плавучих конструкций",
  },
  "/dogovor-vodopolzovaniya": {
    title: "Договор водопользования для плавучих объектов | Понтон Пирс",
    description:
      "Помощь в оформлении договора водопользования и права пользования акваторией для пирсов, понтонов, хаусботов и других объектов.",
    service: "Договор водопользования",
  },
  "/texnicheskoe-obsluzhivanie-pirsov": {
    title: "Техническое обслуживание и ремонт пирсов | Понтон Пирс",
    description:
      "Диагностика, ремонт, регулировка и сезонное обслуживание пирсов и понтонных конструкций. Выезд и подготовка сметы.",
    service: "Техническое обслуживание пирсов",
  },
  "/o-kompanii": {
    title: "О компании Понтон Пирс — производство понтонов в Санкт-Петербурге",
    description:
      "Понтон Пирс — производитель понтонов и плавучих конструкций в Санкт-Петербурге. Проектирование, собственное производство, доставка и монтаж по России.",
  },
  "/proizvodstvo": {
    title: "Производство понтонов и плавучих конструкций | Понтон Пирс",
    description:
      "Собственное производство понтонов и плавучих конструкций в Санкт-Петербурге. Проектирование, расчёт, изготовление, комплектация и монтаж.",
  },
  "/proekty": {
    title: "Проекты понтонов и плавучих конструкций | Понтон Пирс",
    description:
      "Реализованные проекты понтонов, пирсов, доков, плавучих платформ и коммерческих объектов на воде.",
  },
  "/otzyvy": {
    title: "Отзывы о Понтон Пирс — понтоны и плавучие конструкции",
    description:
      "Отзывы заказчиков о проектировании, производстве и монтаже понтонов, пирсов и плавучих конструкций.",
  },
  "/faq": {
    title: "Часто задаваемые вопросы о понтонах и пирсах | Понтон Пирс",
    description:
      "Ответы на вопросы о стоимости, проектировании, нагрузке, монтаже, эксплуатации и доставке понтонных конструкций.",
  },
  "/kontakty": {
    title: "Контакты Понтон Пирс — производство понтонов в Санкт-Петербурге",
    description:
      "Контакты Понтон Пирс: Санкт-Петербург, проспект Энергетиков, 10. Телефон, email, режим работы и реквизиты компании.",
  },
  "/kalkulyator": {
    title: "Рассчитать стоимость понтона онлайн | Понтон Пирс",
    description:
      "Рассчитайте предварительную стоимость понтона или плавучей конструкции. Укажите размеры, нагрузку, назначение и место установки.",
  },
  "/blog": {
    title: "Статьи о понтонах и плавучих конструкциях | Понтон Пирс",
    description:
      "Полезные статьи о выборе понтонов, расчёте плавучести, материалах, креплении, монтаже и эксплуатации плавучих конструкций.",
    type: "article",
  },
  "/privacy": {
    title: "Политика конфиденциальности | Понтон Пирс",
    description: "Политика конфиденциальности сайта Понтон Пирс.",
    noindex: true,
  },
  "/app": {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    noindex: true,
  },
};

type AppMeta = {
  og_title?: string | null;
  og_description?: string | null;
  og_image_url?: string | null;
  favicon_url?: string | null;
  og_video_url?: string | null;
  marketplace_cover_url?: string | null;
};

const appMeta = appMetaJson as AppMeta;
const APP_HOST_ZONES = ["higgsfield.app", "higgsfield-dev.app"];

function toOwnAssetUrl(value: string | null | undefined): string | null {
  if (!value) return null;
  if (value.startsWith("/")) return value;
  try {
    const u = new URL(value);
    const isAppHost = APP_HOST_ZONES.some(
      (zone) => u.hostname === zone || u.hostname.endsWith(`.${zone}`),
    );
    if (isAppHost) return u.pathname + u.search;
    return value;
  } catch {
    return value;
  }
}

function buildJsonLd(pathname: string, entry: SeoEntry, canonical: string) {
  const graph: Record<string, unknown>[] = [
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#organization`,
      name: "Понтон Пирс",
      url: SITE_URL,
      logo: `${SITE_URL}/favicon.svg`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Санкт-Петербург",
        postalCode: "195027",
        streetAddress: "проспект Энергетиков, 10",
        addressCountry: "RU",
      },
      telephone: "+78003501181",
      email: "info@ponton-piers.ru",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+78003501181",
        contactType: "customer service",
        areaServed: "RU",
        availableLanguage: ["ru"],
      },
      openingHours: ["Mo-Fr 09:00-18:00"],
      areaServed: "Россия",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "Понтон Пирс",
      url: SITE_URL,
      inLanguage: "ru-RU",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ];

  if (pathname !== "/") {
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL + "/" },
        { "@type": "ListItem", position: 2, name: entry.title.split(" | ")[0], item: canonical },
      ],
    });
  }

  if (entry.service) {
    graph.push({
      "@type": "Service",
      name: entry.service,
      serviceType: entry.service,
      provider: { "@id": `${SITE_URL}/#organization` },
      areaServed: { "@type": "Country", name: "Россия" },
      url: canonical,
    });
  }

  if (pathname === "/faq") {
    const questions = [
      ["Сколько стоит понтон?", "Стоимость зависит от размеров, нагрузки, назначения, комплектации и условий установки."],
      ["Можно сделать конструкцию по индивидуальным размерам?", "Да. Большинство задач проектируются под конкретное место и нагрузку."],
      ["Можно установить понтон зимой?", "Зависит от условий на объекте, ледовой обстановки и выбранной системы крепления."],
      ["Доставляете по России?", "Да, организуем логистику до объекта и при необходимости монтаж."],
    ];
    graph.push({
      "@type": "FAQPage",
      mainEntity: questions.map(([name, text]) => ({
        "@type": "Question",
        name,
        acceptedAnswer: { "@type": "Answer", text },
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

function buildHead(meta: AppMeta, pathname: string) {
  const entry = SEO[pathname] ?? {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  };
  const title = entry.title;
  const description = entry.description;
  const canonical = SITE_URL + (pathname === "/" ? "/" : pathname);
  const assetUrl = (value: string | null | undefined) => {
    if (!value) return null;
    if (value.startsWith("/")) return SITE_URL + value;
    return value;
  };
  const ogImage = assetUrl(meta.og_image_url);
  const favicon = toOwnAssetUrl(meta.favicon_url);
  const ogVideo = assetUrl(meta.og_video_url);

  return {
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title },
      { name: "description", content: description },
      { name: "author", content: "Понтон Пирс" },
      { name: "robots", content: entry.noindex || IS_STAGING ? "noindex, follow" : "index, follow" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: entry.type ?? "website" },
      { property: "og:url", content: canonical },
      { property: "og:locale", content: "ru_RU" },
      { property: "og:site_name", content: "Понтон Пирс" },
      { name: "twitter:card", content: ogImage ? "summary_large_image" : "summary" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      ...(ogImage
        ? [
            { property: "og:image", content: ogImage },
            { property: "og:image:secure_url", content: ogImage },
            { property: "og:image:alt", content: title },
            { name: "twitter:image", content: ogImage },
            { name: "twitter:image:alt", content: title },
          ]
        : []),
      ...(ogVideo ? [{ property: "og:video", content: ogVideo }] : []),
    ],
    links: [
      { rel: "canonical", href: canonical },
      { rel: "stylesheet", href: appCss },
      ...(favicon ? [{ rel: "icon", href: favicon }] : []),
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(buildJsonLd(pathname, entry, canonical)),
      },
    ],
  };
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-q-background-primary px-4">
      <NotFound
        className="mx-auto max-w-md"
        icon={<span className="text-q-title-md-semi-bold text-q-text-primary">404</span>}
        title="Page not found"
        subtitle="The page you're looking for doesn't exist or has been moved."
      >
        <Link to="/" className={button({ variant: "primary", size: "md" }, "mt-3")}>
          Go home
        </Link>
      </NotFound>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportHiggsfieldError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-dvh items-center justify-center bg-q-background-primary px-4">
      <div className="max-w-md text-center">
        <h1 className="text-q-title-lg-semi-bold text-q-text-primary">This page didn't load</h1>
        <p className="mt-2 text-q-body-sm-regular text-q-text-secondary">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className={button({ variant: "primary", size: "md" })}
          >
            Try again
          </button>
          <a href="/" className={button({ variant: "outline", size: "md" })}>
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: ({ match, matches }) => {
    const pathname = matches.at(-1)?.pathname ?? match.pathname;
    return buildHead(appMeta, pathname);
  },
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" data-theme="default-dark" style={{ colorScheme: "light" }}>
      <head>
        <HeadContent />
      </head>
      <body className="pp-site">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    if (!__HF_DESIGN_INSPECTOR__) {
      return;
    }

    void import("../module/design-inspector/runtime")
      .then(({ installHiggsfieldDesignInspector }) => {
        installHiggsfieldDesignInspector();
      })
      .catch((error) => {
        reportHiggsfieldError(
          error instanceof Error ? error : new Error("Failed to load design inspector"),
          {
            boundary: "higgsfield_design_inspector_import",
          },
        );
      });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
