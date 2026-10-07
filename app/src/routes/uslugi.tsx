import { createFileRoute } from "@tanstack/react-router";
import { SimplePage, FeatureRows, ServiceSection, CTA, serviceItems } from "@/site";

export const Route = createFileRoute("/uslugi")({
  component: Page,
});

const descriptions: Record<string,string> = {
  "/registraciya-plavuchih-konstrukcii":"Помощь в регистрации плавучих домов, дач, беседок, пирсов и бань.",
  "/dogovor-vodopolzovaniya":"Оформление права пользования водным объектом и сопровождение согласований.",
  "/texnicheskoe-obsluzhivanie-pirsov":"Диагностика, регулировка, ремонт и сезонное обслуживание пирсов.",
};

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
      <ServiceSection eyebrow="Основные этапы" title="Берём задачу на себя">
        <FeatureRows items={[
          ["01","Проектирование","Определяем размеры, конфигурацию, нагрузку и способ установки."],
          ["02","Расчёт плавучести","Подбираем объём плавучести с запасом под реальную эксплуатацию."],
          ["03","Производство","Изготавливаем конструкцию на собственном производстве."],
          ["04","Доставка и монтаж","Организуем логистику до объекта и выполняем монтаж."],
        ]}/>
      </ServiceSection>
      <CTA />
    </SimplePage>
  );
}
