import {FeatureRows,CTA,Shell,InnerHero} from "@/site";

export const Route=createFileRoute("/o-kompanii")({component:Page});

function Page(){
  return <Shell>
    <main className="inner-page">
      <InnerHero
        eyebrow="О компании"
        title="О компании Понтон Пирс"
        text="Производитель понтонов и плавучих конструкций в Санкт-Петербурге. Работаем с частными и коммерческими задачами: проектируем, изготавливаем, доставляем и монтируем конструкции по России."
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
          <img src="/images/sert-9001.jpeg" alt="Сертификат ISO 9001 Понтон Пирс" />
          <img src="/images/sert-14001.jpeg" alt="Сертификат ISO 14001 Понтон Пирс" />
          <img src="/images/sert-45001.jpeg" alt="Сертификат ISO 45001 Понтон Пирс" />
          <img src="/images/sert-idr-1.jpeg" alt="Индекс деловой репутации ООО «ВУОКСА»" />
        </div>
      </section>
      <section className="service-section">
        <div className="service-section-head">
          <span className="eyebrow">Контакты</span>
          <h2>Производство в Санкт-Петербурге</h2>
        </div>
        <div className="service-section-body">
          <p>ООО «ВУОКСА» · 195027, Санкт-Петербург, проспект Энергетиков, 10.</p>
          <p><a href="tel:+78003501181">8 (800) 350-11-81</a> · <a href="mailto:info@ponton-piers.ru">info@ponton-piers.ru</a></p>
          <p>Пн–Пт, 09:00–18:00. Доставка и монтаж по России.</p>
        </div>
      </section>
      <CTA/>
    </main>
  </Shell>
}
