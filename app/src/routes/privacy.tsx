import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/site";

export const Route = createFileRoute("/privacy")({ component: Page });

function Page() {
  return (
    <Shell>
      <main className="inner-page">
        <section className="page-intro">
          <span className="eyebrow">Документы</span>
          <h1>Политика конфиденциальности</h1>
          <p>
            Здесь размещается информация о порядке обработки и защиты персональных
            данных пользователей сайта Понтон Пирс.
          </p>
        </section>
        <section className="technical-note">
          <h2>Обработка персональных данных</h2>
          <p>
            Персональные данные, которые пользователь предоставляет через формы
            сайта, используются для обработки обращения, подготовки расчёта и
            связи по вопросам проекта.
          </p>
          <p>
            Для уточнения актуальных условий обработки данных свяжитесь с нами
            через раздел «Контакты».
          </p>
          <a className="outline-link" href="/kontakty">
            Контакты →
          </a>
        </section>
      </main>
    </Shell>
  );
}
