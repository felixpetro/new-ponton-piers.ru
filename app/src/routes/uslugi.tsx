import { createFileRoute } from "@tanstack/react-router";
import { SimplePage, FeatureRows, ServiceSection, CTA, serviceItems } from "@/site";

export const Route = createFileRoute("/uslugi")({
  component: Page,
});

const descriptions: Record<string, string> = {
  "/registraciya-plavuchih-konstrukcii":
    "Помощь в регистрации плавучих домов, дач, беседок, пирсов и бань.",
  "/dogovor-vodopolzovaniya":
    "Оформление права пользования водным объектом и сопровождение согласований.",
  "/texnicheskoe-obsluzhivanie-pirsov":
    "Диагностика, регулировка, ремонт и сезонное обслуживание пирсов.",
};

const constructionLinks = [
  ["/pirsy-prichaly", "пирсов и причалов"],
  ["/plavuchie-garazhi-ellingi", "плавучих гаражей и эллингов"],
  ["/pontony-dlya-hausbota", "понтонов для хаусботов"],
  ["/pontony-dlya-bani", "понтонов для бань"],
  ["/pontony-dlya-besedki", "понтонов для беседок"],
  ["/pontony-dlya-sceny", "понтонов для сцен"],
  ["/pontony-dlya-katerov", "понтонов для катеров"],
  ["/pontony-dlya-restorana", "понтонов для ресторанов"],
  ["/pontony-dlya-sadkov", "понтонов для рыбоводческих садков"],
] as const;

function Page() {
  return (
    <SimplePage
      eyebrow="Полный цикл"
      title="Услуги для плавучих конструкций"
      text="Помогаем не только спроектировать и изготовить конструкцию, но и оформить документы, согласовать размещение и поддерживать пирс в рабочем состоянии."
    >
      <ServiceSection eyebrow="Сервисы Понтон Пирс" title="От оформления до эксплуатации">
        <div className="service-cards">
          {serviceItems.map(([title, href]) => (
            <a className="service-card" href={href} key={href}>
              <span>{title}</span>
              <p>{descriptions[href]}</p>
              <b>Подробнее ↗</b>
            </a>
          ))}
        </div>
      </ServiceSection>

      <ServiceSection eyebrow="Конструкции" title="Для каких объектов оказываем услуги">
        <p>
          Оформление, согласование и сопровождение можно связать с конкретной задачей —
          от частного пирса до коммерческого объекта на воде.
        </p>
        <div className="service-cards">
          {constructionLinks.map(([href, label]) => (
            <a className="service-card" href={href} key={href}>
              <span>{label}</span>
              <b>Посмотреть решение ↗</b>
            </a>
          ))}
        </div>
      </ServiceSection>

      <ServiceSection eyebrow="Проектирование и производство" title="Один подрядчик для всей задачи">
        <p>
          Для каждого объекта определяем назначение, размеры, расчётную нагрузку, условия
          эксплуатации и способ крепления. После согласования решения можно организовать
          изготовление, комплектацию, доставку и монтаж.
        </p>
        <p>
          Такой подход удобен для частных пирсов, плавучих платформ, доков, бань, беседок,
          хаусботов и коммерческих объектов на воде.
        </p>
      </ServiceSection>

      <ServiceSection eyebrow="Основные этапы" title="Берём задачу на себя">
        <FeatureRows
          items={[
            ["01", "Исходные данные", "Определяем размеры, назначение, нагрузку и условия установки."],
            ["02", "Проектирование и расчёт", "Подбираем конфигурацию, плавучесть, крепление и необходимую комплектацию."],
            ["03", "Производство", "Изготавливаем конструкцию и проверяем комплектность перед отгрузкой."],
            ["04", "Доставка и монтаж", "Организуем логистику до объекта и выполняем согласованный монтаж."],
          ]}
        />
      </ServiceSection>

      <ServiceSection eyebrow="Частые вопросы" title="Что входит в услуги">
        <div className="faq-list">
          <details>
            <summary>Можно ли заказать только проектирование?</summary>
            <p>Да. Состав работ определяется задачей и может включать расчёты, проектирование, производство или полный комплекс.</p>
          </details>
          <details>
            <summary>Помогаете ли вы с доставкой?</summary>
            <p>Да, доставку до объекта можно включить в состав проекта. Условия определяются после уточнения региона и места установки.</p>
          </details>
          <details>
            <summary>Можно ли заказать монтаж?</summary>
            <p>Да. Монтаж можно выполнить как часть комплексного заказа с учётом условий доступа к объекту.</p>
          </details>
        </div>
      </ServiceSection>

      <CTA />
    </SimplePage>
  );
}
