import { navigation, news, people, steps } from "./data.js";

const asset = (name) => `/assets/${name}`;
const homeHref = (href, homePrefix = "") => `${homePrefix}${href}`;

export const Button = ({ label, kind = "primary", href = "#" }) =>
  `<a class="button button--${kind}" href="${href}"><span>${label}</span></a>`;

export const Header = ({ homePrefix = "" } = {}) => `
  <header class="site-header" data-header>
    <a class="brand" href="${homeHref("#top", homePrefix)}" aria-label="Münsterbauverein Freiburg – Startseite">
      <img src="${asset("logo-mark.svg")}" alt="Münsterbauverein Freiburg" width="239" height="113" />
    </a>
    <nav class="desktop-nav" aria-label="Hauptnavigation">
      ${navigation.map(([href, label]) => `<a href="${homeHref(href, homePrefix)}">${label}</a>`).join("")}
      ${Button({ label: "Steinpate werden", kind: "outline", href: "/steinpate.html" })}
    </nav>
    <button class="menu-toggle" type="button" aria-label="Menü öffnen" aria-expanded="false" data-menu-toggle>
      <span></span><span></span><span></span>
    </button>
    <nav class="mobile-nav" aria-label="Mobile Navigation" data-mobile-nav>
      ${navigation.map(([href, label]) => `<a href="${homeHref(href, homePrefix)}">${label}</a>`).join("")}
      ${Button({ label: "Steinpate werden", href: "/steinpate.html" })}
    </nav>
  </header>`;

export const Hero = () => `
  <section class="hero" id="top" aria-labelledby="hero-title">
    <div class="hero__image" data-parallax></div>
    <div class="hero__shade"></div>
    <div class="hero__content shell">
      <h1 class="brush-title hero__title" id="hero-title"><span>Liegt in</span><span>deiner Hand.</span></h1>
      <div class="hero__intro reveal">
        <p>Das Oktogon des Münsterturms<br />muss restauriert werden.<br /><strong>Jeder Stein zählt.</strong></p>
        <div class="button-row">
          ${Button({ label: "Steinpate werden", href: "/steinpate.html" })}
          ${Button({ label: "Direkt spenden", action: "donate", href: "#spenden" })}
        </div>
        <small>Ihre Spende geht an den Münsterbauverein Freiburg e. V.</small>
      </div>
    </div>
  </section>`;

export const Patronage = () => `
  <section class="patronage section shell" id="pate" aria-labelledby="patronage-title">
    <div class="patronage__hero reveal">
      <img src="${asset("patronage-raw-01.jpg")}" alt="Das Freiburger Münster im Stadtpanorama" loading="lazy" />
      <div class="orange-panel">
        <h2 id="patronage-title">Werden Sie Steinpate!</h2>
        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
        ${Button({ label: "Steinpate werden", kind: "light", href: "/steinpate.html" })}
      </div>
    </div>
    <ol class="steps" aria-label="In vier Schritten zur Patenschaft">
      ${steps.map((step, index) => `<li class="step reveal" style="--step-index:${index}" tabindex="0">
        <span class="step__number" aria-hidden="true">${index + 1}.</span>
        <div class="step__heading"><img src="${asset(step.icon)}" alt="" width="32" height="32" /><h3>${step.title}</h3></div>
        <p>${step.text}</p>
      </li>`).join("")}
    </ol>
  </section>`;

export const TowerStory = () => `
  <section class="tower-story" id="turm" aria-label="Der Turm und das Oktogon">
    <span class="chapter-anchor" id="restaurierung" aria-hidden="true"></span>
    <div class="story-stage">
      <article class="story-panel story-panel--base" data-story-chapter="base">
        <div class="story-panel__copy">
          <h2 class="brush-title"><span>Unser</span><span>Turm.</span></h2>
          <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
        </div>
        <div class="story-panel__visual">
          <img src="${asset("tower-sunset.jpg")}" alt="Freiburger Münsterturm im Abendlicht" width="4032" height="3024" loading="eager" decoding="async" />
        </div>
      </article>
      <article class="story-panel story-panel--next" data-story-chapter="next">
        <div class="story-panel__copy">
          <h2 class="brush-title"><span>Das</span><span>Oktogon.</span></h2>
          <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
        </div>
        <div class="story-panel__visual story-panel__visual--marked">
          <img src="${asset("tower-sunset.jpg")}" alt="Das Oktogon des Münsterturms" width="4032" height="3024" loading="eager" decoding="async" />
          <span class="tower-highlight" aria-hidden="true"></span>
          <div class="story-detail"><p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>${Button({ label: "Mehr erfahren", kind: "outline", href: "#arbeit" })}</div>
        </div>
      </article>
    </div>
  </section>`;

export const People = () => `
  <section class="people section" id="menschen" aria-labelledby="people-title">
    <div class="section-heading shell reveal">
      <h2 id="people-title">Menschen für den Turm</h2>
      <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
      <button class="button button--outline section-heading__action" type="button" data-carousel-next>Alle sehen</button>
    </div>
    <div class="people-track" data-carousel>
      ${people.map((person, index) => `<article class="person-card reveal" style="--card-index:${index}">
        <img src="${asset(person.image)}" alt="${person.name}" loading="lazy" />
        <div class="person-card__overlay"><p>${person.quote}</p><span>${person.name}</span><img class="person-card__arrow" src="${asset("icon-arrow.svg")}" alt="" width="36" height="36" /></div>
      </article>`).join("")}
    </div>
  </section>`;

export const Work = () => `
  <section class="work" id="arbeit" aria-labelledby="work-title">
    <h2 class="brush-title brush-title--orange reveal" id="work-title"><span>Unsere Arbeit.</span></h2>
    <p class="work-copy work-copy--intro reveal">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
    <figure class="work-image work-image--top reveal"><img src="${asset("work-01.jpg")}" alt="Restauriertes Sandsteinornament am Münsterturm" loading="lazy" /></figure>
    <figure class="work-image work-image--large reveal"><img src="${asset("work-03.jpg")}" alt="Steinmetz bei der Arbeit in der Münsterbauhütte" loading="lazy" /></figure>
    <p class="work-copy work-copy--detail reveal">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
    <figure class="work-image work-image--small reveal"><img src="${asset("work-02.jpg")}" alt="Historisches Sandsteinornament" loading="lazy" /></figure>
  </section>`;

export const News = () => `
  <section class="news section" id="aktuelles" aria-labelledby="news-title">
    <div class="section-heading section-heading--inverse shell reveal">
      <h2 id="news-title">Aktuelle Meldungen</h2>
      <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
      <a class="button button--outline section-heading__action" href="#aktuelles">Alle Meldungen</a>
    </div>
    <div class="news-grid shell">
      ${news.map((item, index) => `<article class="news-card reveal" style="--card-index:${index}">
        <div class="news-card__image"><img src="${asset(item.image)}" alt="" loading="lazy" /></div>
        <div class="news-card__body"><time>${item.date}</time><h3>${item.title}</h3><p>${item.text}</p><a href="#kontakt" aria-label="${item.title} lesen"><img src="${asset("icon-arrow.svg")}" alt="" width="36" height="36" /></a></div>
      </article>`).join("")}
    </div>
  </section>`;

export const FinalCta = () => `
  <section class="final-cta" id="helfen" aria-labelledby="final-title">
    <span class="anchor-target" id="unternehmen" aria-hidden="true"></span>
    <div class="final-cta__image"><img src="${asset("final-statue.jpg")}" alt="Restaurierter Engel am Freiburger Münster" loading="lazy" /></div>
    <div class="orange-panel orange-panel--large reveal">
      <h2 id="final-title">Jeder Stein zählt!</h2>
      <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
      <div class="button-row">${Button({ label: "Steinpate werden", kind: "light", href: "/steinpate.html" })}${Button({ label: "Direkt spenden", kind: "light", href: "#kontakt" })}</div>
    </div>
  </section>`;

export const Footer = ({ homePrefix = "" } = {}) => `
  <footer class="footer" id="kontakt">
    <div class="shell"><img class="footer__logo" src="${asset("logo-mark.svg")}" alt="Münsterbauverein Freiburg" width="239" height="113" />
      <div class="footer__grid">
        <div><h2>Kontakt</h2><address>Freiburger Münsterbauverein e. V.<br />Schoferstraße 4<br />79098 Freiburg<br />Tel. 0761 214027-0<br /><a href="mailto:info@muensterbauverein-freiburg.de">info@muensterbauverein-freiburg.de</a></address></div>
        <div><h2>Seiten</h2>${navigation.map(([href, label]) => `<a href="${homeHref(href, homePrefix)}">${label}</a>`).join("")}<a href="${homeHref("#helfen", homePrefix)}">Jetzt helfen</a><a class="footer__subtle-link" href="/muster.html">Muster</a></div>
        <div><h2>Helfen Sie mit</h2><div class="footer__buttons">${Button({ label: "Steinpate werden", href: "/steinpate.html" })}${Button({ label: "Direkt spenden", href: homeHref("#kontakt", homePrefix) })}</div></div>
      </div>
    </div>
  </footer>`;

export const Dialog = () => "";

export const Page = () => `${Header()}<main id="main">${Hero()}${Patronage()}${TowerStory()}${People()}${Work()}${News()}${FinalCta()}</main>${Footer()}`;
