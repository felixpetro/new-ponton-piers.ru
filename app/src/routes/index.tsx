import {createFileRoute} from '@tanstack/react-router';
import {useState, type FormEvent} from 'react';
import {sendLead} from '@/lib/api/send-lead.functions';
import {Shell,DirectionGrid,CTA} from '@/site';
export const Route=createFileRoute('/')({component:Home});
function Home(){
const [sending, setSending] = useState(false);
const [formMessage, setFormMessage] = useState('');
async function handleLeadSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  if (sending) return;
  const form = event.currentTarget;
  const values = new FormData(form);
  if (values.get('consent') !== 'on') {
    setFormMessage('Для отправки заявки необходимо согласие на обработку персональных данных.');
    return;
  }
  setSending(true);
  setFormMessage('');
  try {
    await sendLead({data: {
      purpose: String(values.get('purpose') || ''),
      length: String(values.get('length') || ''),
      width: String(values.get('width') || ''),
      phone: String(values.get('phone') || ''),
      load: '',
      region: '',
      source: 'Главная',
      consent: true,
      website: String(values.get('website') || ''),
    }});
    setFormMessage('Спасибо! Заявка отправлена. Мы свяжемся с вами.');
    form.reset();
  } catch {
    setFormMessage('Не удалось отправить заявку. Попробуйте позже.');
  } finally {
    setSending(false);
  }
}
return <Shell><main>
<section className="journey-wrap"><div className="hero-overlay"><span className="eyebrow">ПРОИЗВОДСТВО · САНКТ-ПЕТЕРБУРГ</span><h1>Понтоны и плавучие<br/><em>конструкции</em> на заказ</h1><p>Проектируем и производим надёжные платформы для воды. От первого расчёта до доставки и монтажа.</p><div className="hero-actions"><a className="cta-light" href="/kalkulyator">Рассчитать стоимость <span>↗</span></a><a className="text-link" href="#directions">Смотреть решения ↓</a></div></div></section>
<section className="proof-strip"><div><b>10+</b><span>лет производства</span></div><div><b>450+</b><span>реализованных объектов</span></div><div><b>100%</b><span>индивидуальный расчёт</span></div><div><b>РФ</b><span>доставка и монтаж</span></div></section>
<DirectionGrid/>
<section className="split-section"><div className="split-image"><img src="/images/doc-ponton.png" alt="Понтонный док для катеров"/></div><div className="split-copy"><span className="eyebrow">Как создаём</span><h2>Инженерное решение начинается с условий</h2><p>Мы не предлагаем типовую платформу вслепую. Сначала учитываем размеры, нагрузку, волну, сезонность, способ крепления и логистику.</p><div className="process-list"><div><b>01</b><span>Задача и замеры</span></div><div><b>02</b><span>Расчёт плавучести</span></div><div><b>03</b><span>Проектирование</span></div><div><b>04</b><span>Производство и монтаж</span></div></div><a className="outline-link" href="/uslugi">Все услуги →</a></div></section>
<section className="production-band"><div><span className="eyebrow">Собственное производство</span><h2>Производим сами.<br/>Отвечаем за результат.</h2><p>Контролируем конструкцию на каждом этапе: от каркаса и модулей плавучести до комплектации и отгрузки.</p><a className="cta-dark" href="/proizvodstvo">О производстве <span>→</span></a></div><div className="tech-diagram"><span>ПНД</span><span>КАРКАС</span><span>НАСТИЛ</span><span>КРЕПЛЕНИЕ</span><i></i></div></section>
<section className="calc-section"><div><span className="eyebrow">Предварительный расчёт</span><h2>Узнайте, какой понтон нужен вашей задаче</h2><p>Укажите назначение, размеры и нагрузку. Мы подготовим предварительный вариант и свяжемся для уточнения деталей.</p></div><form className="calc-card" onSubmit={handleLeadSubmit}><label>Назначение<select name="purpose"><option>Пирс / причал</option><option>Понтон для катера</option><option>Платформа для бани</option><option>Другое</option></select></label><div className="form-grid"><label>Длина, м<input name="length" placeholder="Например, 6"/></label><label>Ширина, м<input name="width" placeholder="Например, 2,5"/></label></div><label>Телефон<input name="phone" type="tel" required minLength={5} placeholder="+7 ___ ___-__-__"/></label><div style={{position:"absolute",left:"-10000px"}} aria-hidden="true"><label>Не заполняйте это поле<input name="website" tabIndex={-1} autoComplete="off"/></label></div><label className="privacy-consent"><input type="checkbox" name="consent" required/> Я даю согласие на обработку персональных данных на условиях <a href="/soglasie" target="_blank" rel="noreferrer">согласия</a> и ознакомился(ась) с <a href="/privacy" target="_blank" rel="noreferrer">политикой обработки персональных данных</a>.</label><button type="submit" disabled={sending}>{sending ? "Отправляем…" : "Получить расчёт"} <span>→</span></button>{formMessage && <p role="status" aria-live="polite">{formMessage}</p>}</form></section>
<CTA title="Есть идея для объекта на воде?" text="Расскажите, что хотите построить. Поможем превратить задачу в понятное инженерное решение."/>
</main></Shell>}
