import { createFileRoute, notFound } from "@tanstack/react-router";
import { Shell, CTA } from "@/site";

export const Route = createFileRoute("/proekty")({
  beforeLoad: () => {
    throw notFound();
  },
  component: Page,
});

const projects = [
  ["/pirsy-prichaly", "piers-ponton", "Пирс и причал", "Плавучая платформа для доступа к воде, швартовки и отдыха."],
  ["/plavuchie-garazhi-ellingi", "naves-ponton", "Плавучий гараж", "Платформа для хранения лодки или катера с учётом рабочей нагрузки."],
  ["/pontony-dlya-hausbota", "dom-ponton", "Платформа для хаусбота", "Основание для плавучего дома с расчётом плавучести и крепления."],
  ["/pontony-dlya-restorana", "rest-ponton", "Платформа ресторана", "Коммерческая площадка на воде для ресторана, кафе или летней зоны."],
  ["/pontony-dlya-sceny", "scena-ponton", "Плавучая сцена", "Платформа для мероприятий и выступлений с расчётом эксплуатационной нагрузки."],
  ["/pontony-dlya-katerov", "doc-ponton", "Док для катеров", "Причальная платформа для стоянки и обслуживания катеров и лодок."],
] as const;

function Page() {
  return (
    <Shell>
      <main className="inner-page">
        <section className="page-intro">
          <span className="eyebrow">Реализованные проекты</span>
          <h1>Проекты понтонов и плавучих конструкций</h1>
          <p>
            Решения для частных заказчиков, бизнеса и инфраструктуры на воде.
            Конфигурация каждой конструкции определяется назначением, нагрузкой и условиями объекта.
          </p>
        </section>

        <div className="case-grid">
          {projects.map(([href, img, title, text]) => (
            <a className="case-card" href={href} key={title}>
              <img
                src={`/images/${img}.png`}
                alt={title}
              />
              <span>Реализованный объект</span>
              <h2>{title}</h2>
              <p>{text}</p>
              <b>Посмотреть решение →</b>
            </a>
          ))}
        </div>

        <section className="service-section">
          <span className="eyebrow">Как проектируем</span>
          <h2>Конструкция под реальные условия объекта</h2>
          <p>
            Перед изготовлением учитываем размеры, назначение, нагрузку, глубину и условия
            эксплуатации, а также способ крепления и состав комплектации. Это позволяет
            подобрать решение под конкретную акваторию, а не только под требуемую площадь.
          </p>
        </section>

        <CTA
          title="Нужен похожий объект?"
          text="Отправьте размеры и фотографии места. Рассчитаем конструкцию под ваши условия."
        />
      </main>
    </Shell>
  );
}
