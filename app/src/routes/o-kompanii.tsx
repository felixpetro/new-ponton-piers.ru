import {createFileRoute} from "@tanstack/react-router";
import {FeatureRows,CTA,Shell,InnerHero} from "@/site";

export const Route=createFileRoute("/o-kompanii")({component:Page});

function Page(){
  return <Shell>
    <main className="inner-page">
      <InnerHero
        eyebrow="О компании"
        title="Понтон Пирс"
        text="Производитель понтонов и плавучих конструкций. Работаем с частными и коммерческими задачами, где важны расчёт, надёжность и понятная реализация."
      />
      <FeatureRows items={[
        ["01","Проектирование","Определяем размеры, конфигурацию, нагрузку и способ установки."],
        ["02","Расчёт плавучести","Подбираем объём плавучести с запасом под реальную эксплуатацию."],
        ["03","Производство","Изготавливаем конструкцию на собственном производстве."],
        ["04","Доставка и монтаж","Организуем логистику до объекта и выполняем монтаж."]
      ]}/>
      <section className="service-section">
        <div className="service-section-head">
          <span className="eyebrow">Преимущества</span>
          <h2 className="advantages-title">Преимущества заказа плавучей конструкции у компании "Понтон Пирс"</h2>
        </div>
        <div className="service-options">
          <div>
            <h3>Почему выбирают нас</h3>
            <p>Любое конструктивное и дизайнерское решение</p>
            <p>Собственное производство и свой штат высококвалифицированных специалистов</p>
            <p>Собственное производство и прямые поставки материалов</p>
            <p>Собственный отдел проектировщиков и качества</p>
            <p>Любая комплектация — изготовление готовых решений под ключ</p>
          </div>
          <div>
            <h3>При стандартном заказе</h3>
            <p>Только готовые решения, порой не подходящие под ваши нужды</p>
            <p>Трата времени на ожидания изготовления и доставки</p>
            <p>Стандартные материалы отделки</p>
            <p>Риск неправильного расчёта силового каркаса и грузоподъёмности</p>
            <p>Стандартная комплектация</p>
          </div>
        </div>
      </section>
      <section className="certificates-section">
        <div className="certificates-head">
          <span className="eyebrow">Сертификация</span>
          <h2>Вся выпускаемая продукция сертифицирована</h2>
        </div>
        <div className="certificates-grid">
          <img src="https://ponton-piers.ru/assets/cache_image/assets/avto/img/sertificate/sert-9001_215x300_90b.jpeg" alt="Сертификат" />
          <img src="https://ponton-piers.ru/assets/cache_image/assets/avto/img/sertificate/sert-14001_215x300_90b.jpeg" alt="Сертификат" />
          <img src="https://ponton-piers.ru/assets/cache_image/assets/avto/img/sertificate/sert-45001_215x300_90b.jpeg" alt="Сертификат" />
          <img src="https://ponton-piers.ru/assets/cache_image/assets/avto/img/sertificate/sert-idr-1_215x300_90b.jpeg" alt="Индекс деловой репутации" />
        </div>
      </section>
      <CTA/>
    </main>
  </Shell>
}
