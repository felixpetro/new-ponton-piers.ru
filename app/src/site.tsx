import { Link } from '@tanstack/react-router';
import { useEffect, useState, type ReactNode } from 'react';
export const directions=[
['Пирсы и причалы','/pirsy-prichaly','Плавучие пирсы для частных и коммерческих объектов.','piers-ponton'],
['Плавучие гаражи Эллинги','/plavuchie-garazhi-ellingi','Платформы для хранения лодок, катеров и яхт.','naves-ponton'],
['Понтоны для хаусбота','/pontony-dlya-hausbota','Надёжное основание для плавучего дома.','dom-ponton'],
['Понтоны для бани','/pontony-dlya-bani','Плавучая платформа под баню на воде.','bani-ponton'],
['Понтоны для беседки','/pontony-dlya-besedki','Платформа для зоны отдыха у воды.','besedka-ponton'],
['Понтоны для сцены','/pontony-dlya-sceny','Плавучие сцены для мероприятий и площадок.','scena-ponton'],
['Понтоны для катеров','/pontony-dlya-katerov','Доковые и причальные решения для техники.','doc-ponton'],
['Понтоны для ресторанов','/pontony-dlya-restorana','Платформы для ресторанов и объектов на воде.','rest-ponton'],
['Понтоны для садков','/pontony-dlya-sadkov','Плавучие конструкции для рыбоводческих хозяйств.','piers-ponton']] as const;
const img=(name:string)=>`/images/${name}_760x400_898.png`;
const navItems=[['Конструкции','/plavuchie-konstrukcii'],['Услуги','/uslugi'],['Производство','/proizvodstvo'],['О компании','/o-kompanii'],['Контакты','/kontakty']] as const;
export const serviceItems=[['Регистрация плавучих конструкций','/registraciya-plavuchih-konstrukcii'],['Договор водопользования','/dogovor-vodopolzovaniya'],['Техническое обслуживание пирсов','/texnicheskoe-obsluzhivanie-pirsov']] as const;
export function Header(){
  const [open,setOpen]=useState(false);
  const [servicesOpen,setServicesOpen]=useState(false);
  const close=()=>{setOpen(false);setServicesOpen(false)};
  useEffect(()=>{
    if(!servicesOpen) return;
    const handleOutside=(event:MouseEvent)=>{
      const target=event.target as HTMLElement;
      if(!target.closest('.nav-dropdown')) setServicesOpen(false);
    };
    document.addEventListener('mousedown',handleOutside);
    return()=>document.removeEventListener('mousedown',handleOutside);
  },[servicesOpen]);
  return <header className={`site-header${open?' menu-open':''}`}>
    <Link to="/" className="brand" onClick={close}><img className="site-logo-img" src="/images/logo.svg" alt="Понтон Пирс" /></Link>
    <nav className="desktop-nav">
      {navItems.map(([label,href])=><a key={href} href={href}>{label}</a>)}
    </nav>
    <a className="header-cta" href="/kalkulyator">Рассчитать стоимость <span>↗</span></a>
    <button className="mobile-menu-toggle" type="button" aria-label={open?'Закрыть меню':'Открыть меню'} aria-expanded={open} onClick={()=>setOpen(v=>!v)}>
      <span></span><span></span><span></span>
    </button>
    {open&&<nav className="mobile-nav" aria-label="Мобильное меню">
      {navItems.map(([label,href])=>label==='Услуги' ? <div className="mobile-nav-group" key={href}>
        <a className="mobile-nav-parent" href={href} onClick={close}>Услуги</a>
        <div className="mobile-nav-submenu">
          {serviceItems.map(([serviceLabel,serviceHref])=><a key={serviceHref} href={serviceHref} onClick={close}>{serviceLabel}</a>)}
        </div>
      </div> : <a key={href} href={href} onClick={close}>{label}</a>)}
      <a className="mobile-nav-cta" href="/kalkulyator" onClick={close}>Рассчитать стоимость <span>↗</span></a>
    </nav>}
  </header>
}
export function Footer(){return <footer className="footer"><div className="footer-top"><div><div className="brand footer-brand"><img className="site-logo-img footer-logo-img" src="/images/logo.svg" alt="Понтон Пирс" /></div><p>Проектируем и производим понтоны, пирсы и плавучие конструкции по индивидуальным задачам.</p></div><div><strong>Конструкции</strong>{directions.slice(0,5).map(d=><a key={d[1]} href={d[1]}>{d[0]}</a>)}</div><div><strong>Компания</strong><a href="/uslugi">Услуги</a><a href="/proizvodstvo">Производство</a><a href="/o-kompanii">О компании</a><a href="/otzyvy">Отзывы</a></div><div><strong>Связь</strong><a href="/kontakty">Контакты</a><a href="/kalkulyator">Рассчитать стоимость</a><a href="/faq">FAQ</a><a href="tel:+78003501181">8 (800) 350-11-81</a><a href="mailto:info@ponton-piers.ru">info@ponton-piers.ru</a><span>Санкт-Петербург, проспект Энергетиков, 10</span><span>Пн–Пт, 09:00–18:00</span></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Понтон Пирс · ООО «ВУОКСА»</span><span>Санкт-Петербург · проспект Энергетиков, 10 · Доставка и монтаж по России</span><a href="/privacy">Политика конфиденциальности</a></div></footer>}
export function Shell({children}:{children:ReactNode}){return <><Header/>{children}<Footer/></>}
export function DirectionGrid(){return <section className="section direction-section" id="directions"><div className="section-head"><span className="eyebrow">09 направлений</span><h2>Плавучие конструкции<br/>для любых задач</h2><p>От частного пирса до сложного коммерческого объекта. Подбираем конструкцию под нагрузку, размеры и условия эксплуатации.</p></div><div className="direction-grid">{directions.map((d,i)=><a className="direction-card" href={d[1]} key={d[1]}><img src={img(d[3])} alt={d[0]}/><div className="direction-copy"><span>0{i+1}</span><h3>{d[0]}</h3><p>{d[2]}</p><b>Смотреть решение ↗</b></div></a>)}</div></section>}
export function CTA({title='Обсудим ваш проект',text='Опишите задачу, приложите размеры или фотографию места. Мы предложим конструкцию и подготовим расчёт.'}:{title?:string;text?:string}){return <section className="cta-section"><div><span className="eyebrow">Начнём с задачи</span><h2>{title}</h2><p>{text}</p></div><a className="cta-dark" href="/kalkulyator">Получить расчёт <span>→</span></a></section>}
export function InnerHero({eyebrow,title,text,image='piers-ponton'}:{eyebrow:string;title:string;text:string;image?:string}){return <section className="inner-hero"><div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{text}</p><a className="cta-dark" href="/kalkulyator">Рассчитать конструкцию <span>→</span></a></div><img src={img(image)} alt={title}/></section>}
export function FeatureRows({items}:{items:[string,string,string][]}){return <div className="feature-rows">{items.map(([n,t,d])=><div className="feature-row" key={n}><span>{n}</span><div><h3>{t}</h3><p>{d}</p></div></div>)}</div>}
export function ServiceSection({eyebrow,title,children}:{eyebrow:string;title:string;children:ReactNode}){return <section className="service-section"><div className="service-section-head"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div><div className="service-section-body">{children}</div></section>}
export function SimplePage({eyebrow,title,text,children}:{eyebrow:string;title:string;text:string;children:ReactNode}){return <Shell><main className="inner-page"><InnerHero eyebrow={eyebrow} title={title} text={text}/>{children}<CTA/></main></Shell>}

export function CommercialDetails({lead,uses,related}:{lead:string;uses:string[];related:[string,string][]}){return <section className="commercial-details">
  <ServiceSection eyebrow="Проектирование" title="Конструкция под реальные условия объекта"><p>{lead}</p><p>Перед изготовлением определяем габариты, расчётную нагрузку, схему крепления, условия эксплуатации и необходимую комплектацию. Это позволяет подобрать решение не только по площади, но и по фактическим условиям на воде.</p></ServiceSection>
  <ServiceSection eyebrow="Применение" title="Для каких задач подходит"><ul className="service-list">{uses.map((item)=><li key={item}>{item}</li>)}</ul></ServiceSection>
  <ServiceSection eyebrow="Процесс" title="От расчёта до монтажа"><FeatureRows items={[["01","Исходные данные","Получаем размеры, назначение, нагрузку и фотографии или данные по месту установки."],["02","Инженерный расчёт","Определяем конфигурацию платформы, плавучесть, крепление и состав комплектации."],["03","Изготовление","Производим конструкцию и контролируем комплектность перед отгрузкой."],["04","Доставка и монтаж","Организуем доставку до объекта и монтаж в рамках согласованного проекта."]]}/></ServiceSection>
  <ServiceSection eyebrow="FAQ" title="Частые вопросы"><div className="faq-list"><details><summary>Можно ли изготовить конструкцию по индивидуальным размерам?</summary><p>Да. Размеры и конфигурация определяются по задаче, нагрузке и условиям эксплуатации конкретного объекта.</p></details><details><summary>Что нужно для предварительного расчёта?</summary><p>Достаточно сообщить назначение, примерные размеры, предполагаемую нагрузку и место установки. Фотография объекта также помогает оценить задачу.</p></details><details><summary>Можно ли заказать доставку и монтаж?</summary><p>Да, доставку и монтаж можно включить в состав проекта. Конкретный состав работ определяется после уточнения объекта и условий доступа.</p></details><details><summary>Как узнать стоимость?</summary><p>Стоимость зависит от размеров, нагрузки, комплектации, доставки и монтажа. Для предварительного расчёта отправьте исходные данные через калькулятор.</p></details></div></ServiceSection>
  <ServiceSection eyebrow="Другие решения" title="Посмотрите похожие конструкции"><div className="service-cards">{related.map(([label,href])=><a className="service-card" href={href} key={href}><span>{label}</span><b>Подробнее ↗</b></a>)}</div></ServiceSection>
</section>}
