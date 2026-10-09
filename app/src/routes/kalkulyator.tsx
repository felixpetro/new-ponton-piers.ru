import {createFileRoute} from '@tanstack/react-router'; import {useState, type FormEvent} from 'react'; import {sendLead} from '@/lib/api/send-lead.functions'; import {Shell} from '@/site'; export const Route=createFileRoute('/kalkulyator')({component:Page}); function Page(){
const [sending, setSending] = useState(false);
const [formMessage, setFormMessage] = useState('');
async function handleLeadSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  if (sending) return;
  const form = event.currentTarget;
  const values = new FormData(form);
  setSending(true);
  setFormMessage('');
  try {
    await sendLead({data: {
      purpose: String(values.get('purpose') || ''),
      length: String(values.get('length') || ''),
      width: String(values.get('width') || ''),
      phone: String(values.get('phone') || ''),
      load: String(values.get('load') || ''),
      region: String(values.get('region') || ''),
      source: 'Калькулятор',
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
return <Shell><main className="calculator-page"><div className="calculator-copy"><span className="eyebrow">Онлайн-заявка</span><h1>Рассчитать стоимость понтона</h1><p>Дайте базовые параметры. Специалист уточнит детали и подготовит предварительный вариант.</p><ul><li>Размер и назначение</li><li>Предполагаемая нагрузка</li><li>Место установки</li><li>Комплектация и монтаж</li></ul></div><form className="big-form" onSubmit={handleLeadSubmit}><label>Назначение<select name="purpose"><option>Пирс или причал</option><option>Понтон для катера</option><option>Платформа для бани</option><option>Платформа для ресторана</option><option>Другое</option></select></label><div className="form-grid"><label>Длина, м<input name="length" required placeholder="6"/></label><label>Ширина, м<input name="width" required placeholder="2,5"/></label></div><label>Нагрузка, кг<input name="load" placeholder="Например, 1500"/></label><label>Регион<input name="region" placeholder="Санкт-Петербург"/></label><label>Телефон<input name="phone" type="tel" required minLength={5} placeholder="+7"/></label><div style={{position:"absolute",left:"-10000px"}} aria-hidden="true"><label>Не заполняйте это поле<input name="website" tabIndex={-1} autoComplete="off"/></label></div><button type="submit" disabled={sending}>{sending ? "Отправляем…" : "Получить предварительный расчёт"} <span>→</span></button><small>Мы свяжемся для уточнения параметров проекта.</small>{formMessage && <p role="status" aria-live="polite">{formMessage}</p>}</form></main></Shell>}
