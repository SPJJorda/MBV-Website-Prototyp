import { Button, Footer, Header } from "./components.js";

const asset = (name) => `/assets/${name}`;

const colors = [
  ["Orange 300", "--color-orange-300", "#EE7700"],
  ["Orange 400", "--color-orange-400", "#EE4400"],
  ["Orange 500", "--color-orange-500", "#E94F1D"],
  ["Orange 600", "--color-orange-600", "#C34F26"],
  ["Orange 700", "--color-orange-700", "#A64E2F"],
  ["Orange 800", "--color-orange-800", "#8B4D34"],
  ["Orange 900", "--color-orange-900", "#754935"],
  ["Teal 300", "--color-teal-300", "#83989B"],
  ["Teal 600", "--color-teal-600", "#485B63"],
  ["Teal 900", "--color-teal-900", "#102528"],
  ["Blue 300", "--color-blue-300", "#69C1F1"],
  ["Blue 700", "--color-blue-700", "#1069CF"]
];

const semanticColors = [
  ["Background / Default", "--background-default", "var(--background-default)"],
  ["Background / Subtle", "--background-subtle", "var(--background-subtle)"],
  ["Background / Dark", "--background-dark", "var(--background-dark)"],
  ["Background / Inverse", "--background-inverse", "var(--background-inverse)"],
  ["Gradient / Brand", "--background-gradient-brand", "var(--background-gradient-brand)"],
  ["Gradient / Dark", "--background-gradient-dark", "var(--background-gradient-dark)"],
  ["Gradient / Testimonial", "--background-gradient-testimonial", "var(--background-gradient-testimonial)"],
  ["Text / Brand", "--text-brand", "var(--text-brand)"],
  ["Text / Link", "--text-link", "var(--text-link)"]
];

const spacing = [
  ["xxxs", "4"], ["xxs", "8"], ["xs", "16"], ["s", "24"], ["m", "32"],
  ["l", "48"], ["xl", "64"], ["xxl", "80"], ["xxxl", "120"]
];

const radii = [["0", "0"], ["s", "4"], ["m", "8"], ["l", "16"], ["xl", "32"], ["full", "999"]];

const ColorCard = ([label, token, value]) => `
  <article class="ds-color" style="--swatch:${value}">
    <span class="ds-color__swatch" aria-hidden="true"></span>
    <div><strong>${label}</strong><code>${token}</code><small>${value.startsWith("#") ? value : token}</small></div>
  </article>`;

const PatternHeading = ({ title, text }) => `
  <div class="pattern-heading reveal">
    <h2>${title}</h2>
    <p>${text}</p>
  </div>`;

const Foundations = () => `
  <section class="ds-foundations section" id="grundlagen" aria-labelledby="foundations-title">
    <div class="shell">
      <div class="pattern-heading pattern-heading--wide reveal">
        <h2 id="foundations-title">Grundlagen</h2>
        <p>Farben, Typografie, Abstände und Radien bilden den gemeinsamen Rahmen für bestehende und neue Module.</p>
      </div>

      <div class="ds-block reveal">
        <h3>Farbprimitiven</h3>
        <div class="ds-color-grid">${colors.map(ColorCard).join("")}</div>
      </div>

      <div class="ds-block reveal">
        <h3>Semantische Farben</h3>
        <div class="ds-color-grid ds-color-grid--semantic">${semanticColors.map(ColorCard).join("")}</div>
      </div>

      <div class="ds-block ds-type-block reveal">
        <h3>Textstile</h3>
        <div class="ds-type-list">
          <div><code>H1</code><p class="ds-type ds-type--h1">Jeder Stein zählt.</p></div>
          <div><code>H2</code><p class="ds-type ds-type--h2">Unser Turm.</p></div>
          <div><code>H3</code><p class="ds-type ds-type--h3">Gemeinsam bewahren.</p></div>
          <div><code>H4</code><p class="ds-type ds-type--h4">Eine starke Überschrift</p></div>
          <div><code>H5</code><p class="ds-type ds-type--h5">Modulare Inhalte</p></div>
          <div><code>p l</code><p class="ds-type ds-type--pl">Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</p></div>
          <div><code>p</code><p class="ds-type ds-type--p">Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</p></div>
          <div><code>p s</code><p class="ds-type ds-type--ps">Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</p></div>
        </div>
      </div>

      <div class="ds-token-columns">
        <div class="ds-block reveal">
          <h3>Spacing</h3>
          <div class="ds-scale">${spacing.map(([name, value]) => `<div><span class="ds-space" style="--size:${value}px"></span><strong>Space ${name}</strong><code>--space-${name}</code><small>${value}px</small></div>`).join("")}</div>
        </div>
        <div class="ds-block reveal">
          <h3>Radien</h3>
          <div class="ds-scale ds-scale--radius">${radii.map(([name, value]) => `<div><span class="ds-radius" style="--curve:${value}px"></span><strong>Radius ${name}</strong><code>--radius-${name}</code><small>${value}px</small></div>`).join("")}</div>
        </div>
      </div>
    </div>
  </section>`;

const EditorialSplit = () => `
  <section class="pattern-section pattern-split" aria-labelledby="split-title">
    <div class="pattern-split__image reveal"><img src="${asset("work-03.jpg")}" alt="Steinmetz bei der Arbeit" loading="lazy" /></div>
    <div class="pattern-split__copy reveal">
      <h2 class="brush-title brush-title--pattern" id="split-title"><span>Bild trifft</span><span>Geschichte.</span></h2>
      <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.</p>
      ${Button({ label: "Mehr erfahren", href: "/#arbeit" })}
    </div>
  </section>`;

const FeatureCards = () => `
  <section class="pattern-section pattern-cards section" aria-labelledby="cards-title">
    <div class="shell">
      ${PatternHeading({ title: "Kartenraster", text: "Gleichwertige Inhalte werden als flexibel erweiterbares Raster zusammengefasst." }).replace("<h2>", '<h2 id="cards-title">')}
      <div class="pattern-card-grid">
        ${[
          ["Bewahren", "icon-diamond.svg"], ["Vermitteln", "icon-clipboard.svg"], ["Unterstützen", "icon-heart.svg"]
        ].map(([title, icon]) => `<article class="pattern-card reveal"><img src="${asset(icon)}" alt="" width="40" height="40" /><h3>${title}</h3><p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor.</p><a href="/#kontakt" aria-label="${title}: mehr erfahren"><img src="${asset("icon-arrow.svg")}" alt="" width="36" height="36" /></a></article>`).join("")}
      </div>
    </div>
  </section>`;

const ImageStatement = () => `
  <section class="pattern-section pattern-statement" aria-labelledby="statement-title">
    <img src="${asset("tower-sunset.jpg")}" alt="Freiburger Münsterturm im Abendlicht" loading="lazy" />
    <div class="pattern-statement__panel reveal">
      <h2 class="brush-title" id="statement-title"><span>Ein Motiv.</span><span>Klare Haltung.</span></h2>
      <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.</p>
    </div>
  </section>`;

const Testimonial = () => `
  <section class="pattern-section pattern-quote section" aria-labelledby="quote-title">
    <div class="shell pattern-quote__grid">
      <div class="pattern-quote__portrait reveal"><img src="${asset("person-03.jpg")}" alt="Engagierte Unterstützerin vor dem Freiburger Münster" loading="lazy" /></div>
      <blockquote class="reveal">
        <p class="brush-title" id="quote-title">„Der ist zum Staunen schön!“</p>
        <footer>Jessica, Architektin aus Freiburg</footer>
      </blockquote>
    </div>
  </section>`;

const Process = () => `
  <section class="pattern-section pattern-process section" aria-labelledby="process-title">
    <div class="shell">
      ${PatternHeading({ title: "Prozessstrecke", text: "Aufeinanderfolgende Schritte bleiben als eigenständige Module lesbar." }).replace("<h2>", '<h2 id="process-title">')}
      <div class="pattern-process__grid">
        ${[
          ["Entdecken", "icon-diamond.svg"], ["Auswählen", "icon-clipboard.svg"], ["Mitmachen", "icon-card.svg"], ["Bewahren", "icon-heart.svg"]
        ].map(([title, icon], index) => `<article class="pattern-process__step reveal" style="--step:${index}"><img src="${asset(icon)}" alt="" width="32" height="32" /><h3>${title}</h3><p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</p></article>`).join("")}
      </div>
    </div>
  </section>`;

const ImpactBand = () => `
  <section class="pattern-section pattern-impact" aria-labelledby="impact-title">
    <div class="shell">
      <h2 class="brush-title reveal" id="impact-title"><span>Was zählt.</span></h2>
      <div class="pattern-impact__grid">
        <article class="reveal"><h3>Handwerk</h3><p>Wissen erhalten und weitergeben.</p></article>
        <article class="reveal"><h3>Gemeinschaft</h3><p>Menschen für den Turm verbinden.</p></article>
        <article class="reveal"><h3>Zukunft</h3><p>Substanz dauerhaft bewahren.</p></article>
      </div>
    </div>
  </section>`;

const Faq = () => `
  <section class="pattern-section pattern-faq section" aria-labelledby="faq-title">
    <div class="shell pattern-faq__grid">
      ${PatternHeading({ title: "Fragen und Antworten", text: "Ein ruhiges Akkordeon für erklärungsbedürftige Inhalte." }).replace("<h2>", '<h2 id="faq-title">')}
      <div class="pattern-faq__items reveal">
        ${[
          ["Wie kann ich den Turm unterstützen?", "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor."],
          ["Wofür wird eine Spende eingesetzt?", "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor."],
          ["Kann ich eine Patenschaft verschenken?", "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor."]
        ].map(([question, answer]) => `<details><summary>${question}<span aria-hidden="true"></span></summary><p>${answer}</p></details>`).join("")}
      </div>
    </div>
  </section>`;

const EditorialArticle = () => `
  <section class="pattern-section pattern-editorial section" aria-labelledby="editorial-title">
    <div class="shell pattern-editorial__grid">
      <header class="pattern-editorial__header reveal">
        <p class="pattern-kicker">Editorial</p>
        <h2 class="brush-title" id="editorial-title"><span>Raum für</span><span>Geschichten.</span></h2>
        <p class="pattern-editorial__lead">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.</p>
      </header>
      <div class="pattern-editorial__body reveal">
        <p class="pattern-editorial__dropcap">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</p>
        <p>Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.</p>
        <blockquote>„Lorem ipsum dolor sit amet, consetetur sadipscing elitr.“</blockquote>
        <p>At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
      </div>
      <figure class="pattern-editorial__figure reveal">
        <img src="${asset("work-02.jpg")}" alt="Detail eines historischen Sandsteinornaments" loading="lazy" />
        <figcaption>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</figcaption>
      </figure>
    </div>
  </section>`;

const Timeline = () => `
  <section class="pattern-section pattern-timeline section" aria-labelledby="timeline-title">
    <div class="shell">
      ${PatternHeading({ title: "Chronik", text: "Längere Entwicklungen lassen sich in klar gegliederten Etappen erzählen, ohne den Lesefluss zu unterbrechen." }).replace("<h2>", '<h2 id="timeline-title">')}
      <div class="pattern-timeline__list">
        ${[
          ["Ursprung", "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat."],
          ["Bewahren", "At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."],
          ["Heute", "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat."],
          ["Morgen", "Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. At vero eos et accusam et justo duo dolores et ea rebum."]
        ].map(([title, text]) => `<article class="pattern-timeline__item reveal"><span class="pattern-timeline__dot" aria-hidden="true"></span><h3>${title}</h3><p>${text}</p></article>`).join("")}
      </div>
    </div>
  </section>`;

const TopicIndex = () => `
  <section class="pattern-section pattern-topics section" aria-labelledby="topics-title">
    <div class="shell pattern-topics__layout">
      <header class="pattern-topics__intro reveal">
        <p class="pattern-kicker">Themenübersicht</p>
        <h2 id="topics-title">Inhalte mit Tiefe</h2>
        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.</p>
      </header>
      <div class="pattern-topics__list">
        ${[
          ["Baukultur", "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."],
          ["Handwerk", "At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."],
          ["Gemeinschaft", "Lorem ipsum dolor sit amet, consetetur sadipscing elitr. At vero eos et accusam et justo duo dolores et ea rebum."],
          ["Vermittlung", "Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet, consetetur sadipscing elitr."]
        ].map(([title, text]) => `<article class="pattern-topics__item reveal"><div><h3>${title}</h3><p>${text}</p></div><a href="/#arbeit" aria-label="${title}: mehr erfahren"><img src="${asset("icon-arrow.svg")}" alt="" width="36" height="36" /></a></article>`).join("")}
      </div>
    </div>
  </section>`;

const ImageGallery = () => `
  <section class="pattern-section pattern-gallery section" aria-labelledby="gallery-title">
    <div class="shell">
      ${PatternHeading({ title: "Bilderstrecke", text: "Ein variables Bildraster schafft Rhythmus und bietet Raum für Details, Arbeit und Atmosphäre." }).replace("<h2>", '<h2 id="gallery-title">')}
      <div class="pattern-gallery__grid">
        ${[
          ["work-03.jpg", "Handwerk", "Steinmetz bei der Arbeit"],
          ["image-06.jpg", "Detail", "Architektonisches Detail am Freiburger Münster"],
          ["tower-sunset.jpg", "Turm", "Freiburger Münsterturm im Abendlicht"],
          ["image-13.jpg", "Substanz", "Historisches Detail des Münsters"],
          ["work-01.jpg", "Bewahren", "Restauriertes Sandsteinornament"]
        ].map(([image, label, alt]) => `<figure class="pattern-gallery__item reveal"><img src="${asset(image)}" alt="${alt}" loading="lazy" /><figcaption>${label}</figcaption></figure>`).join("")}
      </div>
    </div>
  </section>`;

const ContactModule = () => `
  <section class="pattern-section pattern-contact section" aria-labelledby="contact-pattern-title">
    <div class="shell pattern-contact__grid">
      <div class="pattern-contact__copy reveal">
        <p class="pattern-kicker">Kontaktmodul</p>
        <h2 class="brush-title" id="contact-pattern-title"><span>Im Austausch</span><span>bleiben.</span></h2>
        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.</p>
      </div>
      <form class="pattern-contact__form reveal" data-pattern-form>
        <div class="pattern-field"><label for="pattern-name">Name</label><input id="pattern-name" name="name" type="text" autocomplete="name" required /></div>
        <div class="pattern-field"><label for="pattern-email">E-Mail</label><input id="pattern-email" name="email" type="email" autocomplete="email" required /></div>
        <div class="pattern-field pattern-field--wide"><label for="pattern-message">Nachricht</label><textarea id="pattern-message" name="message" rows="4" required></textarea></div>
        <div class="pattern-contact__action"><button class="button button--primary" type="submit"><span>Nachricht senden</span></button><p class="pattern-contact__status" role="status" aria-live="polite"></p></div>
      </form>
    </div>
  </section>`;

const SplitCta = () => `
  <section class="pattern-section pattern-cta" aria-labelledby="cta-title">
    <div class="pattern-cta__image"><img src="${asset("final-statue.jpg")}" alt="Restaurierter Engel am Freiburger Münster" loading="lazy" /></div>
    <div class="pattern-cta__panel">
      <h2 id="cta-title">Jeder Stein zählt!</h2>
      <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.</p>
      <div class="button-row">${Button({ label: "Steinpate werden", kind: "light", href: "/#pate" })}${Button({ label: "Direkt spenden", kind: "light", href: "/#kontakt" })}</div>
    </div>
  </section>`;

const PatternIntro = () => `
  <section class="pattern-hero" id="top" aria-labelledby="pattern-title">
    <div class="pattern-hero__glow" aria-hidden="true"></div>
    <div class="shell pattern-hero__content">
      <h1 class="brush-title" id="pattern-title"><span>Design</span><span>Muster.</span></h1>
      <div class="pattern-hero__intro">
        <p>Ein modularer Baukasten für konsistente Seiten des Münsterbauvereins.</p>
        <nav aria-label="Inhalte dieser Seite"><a href="#grundlagen">Grundlagen</a><a href="#sections">Section-Muster</a></nav>
      </div>
    </div>
  </section>`;

export const PatternPage = () => `
  ${Header({ homePrefix: "/" })}
  <main id="main">
    ${PatternIntro()}
    ${Foundations()}
    <div class="pattern-catalog" id="sections">
      <div class="shell pattern-catalog__intro reveal"><h2 class="brush-title brush-title--orange"><span>Section-</span><span>Muster.</span></h2><p>Die folgenden Module zeigen wiederkehrende Seitenbausteine in unterschiedlichen Gewichtungen und Hintergründen.</p></div>
      ${EditorialSplit()}
      ${FeatureCards()}
      ${ImageStatement()}
      ${Testimonial()}
      ${Process()}
      ${ImpactBand()}
      ${Faq()}
      ${EditorialArticle()}
      ${Timeline()}
      ${TopicIndex()}
      ${ImageGallery()}
      ${ContactModule()}
      ${SplitCta()}
    </div>
  </main>
  ${Footer({ homePrefix: "/" })}`;
