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