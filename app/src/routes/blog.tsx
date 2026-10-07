import { createFileRoute } from "@tanstack/react-router";
import { Shell, CTA } from "@/site";

export const Route = createFileRoute("/blog")({ component: Page });

const articles = [
  ["Как выбрать понтон под нужную нагрузку", "Как определить нагрузку, размеры и условия эксплуатации перед расчётом понтона.", "/blog/kak-vybrat-ponton", "статье о выборе понтона"],
  ["ПНД-модули или металлическая конструкция: что важно знать", "Сравниваем модульное и каркасное решения по назначению, жёсткости, нагрузке и обслуживанию.", "/blog/pnd-ili-metall", "сравнении конструкций"],
  ["Как подготовить место для установки пирса", "Какие данные собрать по берегу, глубине, уровню воды, доступу и креплению до начала монтажа.", "/blog/podgotovka-mesta-pirs", "подготовке места для пирса"],
  ["Понтонный док для катера: основные параметры", "Размеры, масса судна, швартовка, крепление и эксплуатация понтонного дока.", "/blog/dok-dlya-katera", "доке для катера"],
] as const;

function Page() {
  return (
    <Shell>
      <main className="inner-page">
        <section className="page-intro">
          <span className="eyebrow">База знаний</span>
          <h1>Статьи о понтонах и плавучих конструкциях</h1>
          <p>
            Практические материалы о выборе понтонов, расчёте плавучести, материалах,
            креплении, монтаже и эксплуатации конструкций на воде.
          </p>
        </section>
        <div className="article-list">
          {articles.map(([title, text, href, label], i) => (
            <article key={title}>
              <span>0{i + 1} · Практика</span>
              <h2>{title}</h2>
              <p>{text}</p>
              <a href={href}>Подробнее о {label} →</a>
            </article>
          ))}
        </div>
        <CTA />
      </main>
    </Shell>
  );
}
