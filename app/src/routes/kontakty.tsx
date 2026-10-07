import {createFileRoute} from '@tanstack/react-router'; import {Shell,CTA} from '@/site';

export const Route=createFileRoute('/kontakty')({component:Page});

function Page(){
  return <Shell><main className="inner-page">
    <section className="page-intro">
      <span className="eyebrow">Контакты</span>
      <h1>Контакты</h1>
      <p>Свяжитесь с нами удобным способом. Обсудим задачу, сроки и комплектацию.</p>
    </section>

    <section className="contact-grid">
      <div>
        <span>Контактная информация</span>
        <h2>Как с нами связаться</h2>
        <p>Адрес: г. Санкт-Петербург, пр-т Энергетиков, д. 10 литера А, офис 216</p>
        <a href="tel:+78003501181">8 (800) 350-11-81</a>
        <a href="mailto:info@ponton-piers.ru">info@ponton-piers.ru</a>
        <p>Пн–Пт, 09:00–18:00</p>
      </div>
      <div>
        <span>Производство</span>
        <h2>Санкт-Петербург</h2>
        <p>Производство в Санкт-Петербурге. Доставка по всей России.</p>
        <a className="outline-link" href="/kalkulyator">Отправить задачу →</a>
      </div>
    </section>

    <section className="contact-grid">
      <div>
        <span>Реквизиты</span>
        <h2>ООО «ВУОКСА»</h2>
        <p>Банк: Северо-Западный Банк ПАО Сбербанк</p>
        <p>Юридический адрес: 195027, г. Санкт-Петербург, пр-т Энергетиков, д. 10 литера А, офис 216</p>
        <p>Р/с: 40702810355000071757</p>
        <p>К/с: 30101810500000000653</p>
        <p>ИНН: 7806593743</p>
        <p>ОГРН: 1217800191234</p>
        <p>БИК: 044030653</p>
      </div>
      <div>
        <span>Связь</span>
        <h2>Производство в Санкт-Петербурге</h2>
        <p>Доставка по всей России.</p>
        <a className="outline-link" href="tel:+78003501181">Позвонить →</a>
      </div>
    </section>

    <CTA/>
  </main></Shell>
}