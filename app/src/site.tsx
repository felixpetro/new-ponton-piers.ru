import { Link } from '@tanstack/react-router';
import { useState, type ReactNode } from 'react';
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
const img=(name:string)=>`https://ponton-piers.ru/assets/cache_image/images/${name}_760x400_898.png`;
const navItems=[['Конструкции','/plavuchie-konstrukcii'],['Проекты','/proekty'],['Услуги','/uslugi'],['Производство','/proizvodstvo'],['О компании','/o-kompanii'],['Контакты','/kontakty']] as const;
export const serviceItems=[['Регистрация плавучих конструкций','/registraciya-plavuchih-konstrukcii'],['Договор водопользования','/dogovor-vodopolzovaniya'],['Техническое обслуживание пирсов','/texnicheskoe-obsluzhivanie-pirsov']] as const;
export function Header(){
  const [open,setOpen]=useState(false);
  const [servicesOpen,setServicesOpen]=useState(false);
  const close=()=>{setOpen(false);setServicesOpen(false)};
  return <header className={`site-header${open?' menu-open':''}`}>
    <Link to="/" className="brand" onClick={close}><img className="site-logo-img" src="https://felixpetro.github.io/ponton-piers.ru/images/logo.svg" alt="Понтон Пирс" /></Link>
    <nav className="desktop-nav">
      {navItems.map(([label,href])=>label==='Услуги' ? <div className={`nav-dropdown${servicesOpen?' is-open':''}`} key={href}>
        <button type="button" className="nav-dropdown-trigger" aria-expanded={servicesOpen} onClick={()=>setServicesOpen(v=>!v)}>Услуги <span>⌄</span></button>
        <div className="nav-dropdown-menu">
          {serviceItems.map(([serviceLabel,serviceHref])=><a key={serviceHref} href={serviceHref}>{serviceLabel}</a>)}
        </div>
      </div> : <a key={href} href={href}>{label}</a>)}
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
export function Footer(){return <footer className="footer"><div className="footer-top"><div><div className="brand footer-brand"><img className="site-logo-img footer-logo-img" src="https://felixpetro.github.io/ponton-piers.ru/images/logo.svg" alt="Понтон Пирс" /></div><p>Проектируем и производим понтоны, пирсы и плавучие конструкции по индивидуальным задачам.</p></div><div><strong>Конструкции</strong>{directions.slice(0,5).map(d=><a key={d[1]} href={d[1]}>{d[0]}</a>)}</div><div><strong>Компания</strong><a href="/proekty">Проекты</a><a href="/uslugi">Услуги</a><a href="/proizvodstvo">Производство</a><a href="/o-kompanii">О компании</a><a href="/otzyvy">Отзывы</a></div><div><strong>Связь</strong><a href="/kontakty">Контакты</a><a href="/kalkulyator">Рассчитать стоимость</a><a href="/faq">FAQ</a><span>Пн–Пт, 09:00–18:00</span></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Понтон Пирс</span><span>Производство · Санкт-Петербург · Доставка по России</span><a href="/privacy">Политика конфиденциальности</a></div></footer>}
export function Shell({children}:{children:ReactNode}){return <><Header/>{children}<Footer/></>}
export function DirectionGrid(){return <section className="section direction-section" id="directions"><div className="section-head"><span className="eyebrow">09 направлений</span><h2>Плавучие конструкции<br/>для любых задач</h2><p>От частного пирса до сложного коммерческого объекта. Подбираем конструкцию под нагрузку, размеры и условия эксплуатации.</p></div><div className="direction-grid">{directions.map((d,i)=><a className="direction-card" href={d[1]} key={d[1]}><img src={img(d[3])} alt={d[0]}/><div className="direction-copy"><span>0{i+1}</span><h3>{d[0]}</h3><p>{d[2]}</p><b>Смотреть решение ↗</b></div></a>)}</div></section>}
export function CTA({title='Обсудим ваш проект',text='Опишите задачу, приложите размеры или фотографию места. Мы предложим конструкцию и подготовим расчёт.'}:{title?:string;text?:string}){return <section className="cta-section"><div><span className="eyebrow">Начнём с задачи</span><h2>{title}</h2><p>{text}</p></div><a className="cta-dark" href="/kalkulyator">Получить расчёт <span>→</span></a></section>}
export function InnerHero({eyebrow,title,text,image='piers-ponton'}:{eyebrow:string;title:string;text:string;image?:string}){return <section className="inner-hero"><div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{text}</p><a className="cta-dark" href="/kalkulyator">Рассчитать конструкцию <span>→</span></a></div><img src={img(image)} alt={title}/></section>}
export function FeatureRows({items}:{items:[string,string,string][]}){return <div className="feature-rows">{items.map(([n,t,d])=><div className="feature-row" key={n}><span>{n}</span><div><h3>{t}</h3><p>{d}</p></div></div>)}</div>}
export function ServiceSection({eyebrow,title,children}:{eyebrow:string;title:string;children:ReactNode}){return <section className="service-section"><div className="service-section-head"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div><div className="service-section-body">{children}</div></section>}
export function SimplePage({eyebrow,title,text,children}:{eyebrow:string;title:string;text:string;children:ReactNode}){return <Shell><main className="inner-page"><InnerHero eyebrow={eyebrow} title={title} text={text}/>{children}<CTA/></main></Shell>}
