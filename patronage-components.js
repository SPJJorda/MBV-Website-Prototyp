import { Footer, Header } from "./components.js";
import { flowSteps, paymentMethods, stones } from "./patronage-data.js";

const asset = (name) => `/assets/${name}`;

const FlowSteps = () => `
  <ol class="patron-progress" aria-label="Fortschritt der Patenschaft">
    ${flowSteps.map((label, index) => `<li data-progress-step="${index}" ${index === 0 ? 'class="is-active" aria-current="step"' : ""}><span aria-hidden="true"></span><strong>${label}</strong></li>`).join("")}
  </ol>`;

const StoneMap = () => `
  <div class="stone-map" data-stone-map>
    <div class="stone-map__visual">
      <img src="${asset("tower-sunset.jpg")}" alt="Freiburger Münsterturm im Abendlicht" />
      <div class="stone-map__shade" aria-hidden="true"></div>
      <div class="stone-map__grid" aria-label="Auswählbare Turmsteine">
        ${stones.map((stone) => `<button class="stone ${stone.available ? "is-available" : "is-reserved"}" type="button" style="grid-row:${stone.row};grid-column:${stone.column}" data-stone-id="${stone.id}" data-available="${stone.available}" data-patron="${stone.patron}" aria-label="${stone.label}, ${stone.available ? "verfügbar" : `verpatet an ${stone.patron}`}"><span class="sr-only">${stone.label}</span></button>`).join("")}
      </div>
      <div class="stone-tooltip" data-stone-tooltip role="status" aria-live="polite">
        <strong>Stein entdecken</strong><span>Mit Maus oder Tastatur auswählen</span>
      </div>
    </div>
    <div class="stone-map__legend" aria-label="Legende"><span><i class="is-free"></i>Verfügbar</span><span><i class="is-taken"></i>Bereits verpatet</span><span><i class="is-picked"></i>Ausgewählt</span></div>
  </div>`;

const SelectPanel = () => `
  <section class="flow-panel flow-panel--select is-active" data-flow-panel="0" aria-labelledby="select-title">
    <header class="flow-heading"><p>Steinauswahl</p><h2 id="select-title">Wählen Sie Ihren Stein</h2><span>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor.</span></header>
    ${StoneMap()}
    <div class="selection-bar" data-selection-bar>
      <div><span>Ihre Auswahl</span><strong data-selected-label>Noch kein Stein ausgewählt</strong></div>
      <button class="button button--primary" type="button" data-next disabled><span>Weiter zum Formular</span></button>
    </div>
  </section>`;

const Field = ({ label, name, type = "text", autocomplete = "", wide = false, placeholder = "", required = true }) => `
  <div class="patron-field ${wide ? "patron-field--wide" : ""}"><label for="patron-${name}">${label}</label><input id="patron-${name}" name="${name}" type="${type}" ${autocomplete ? `autocomplete="${autocomplete}"` : ""} placeholder="${placeholder}" ${required ? "required" : ""} /></div>`;

const FormPanel = () => `
  <section class="flow-panel flow-panel--form" data-flow-panel="1" aria-labelledby="form-title" hidden>
    <header class="flow-heading"><p>Ihre Angaben</p><h2 id="form-title">Formular ausfüllen</h2><span>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor.</span></header>
    <form class="patron-form" data-patron-form>
      <div class="patron-summary"><span>Ausgewählter Stein</span><strong data-form-stone>–</strong></div>
      <fieldset class="patron-mode patron-field--wide"><legend>Art der Patenschaft</legend>
        <label><input type="radio" name="patronageType" value="self" checked /><span>Für mich selbst</span></label>
        <label><input type="radio" name="patronageType" value="gift" /><span>Steinpatenschaft verschenken</span></label>
      </fieldset>
      <div class="gift-fields patron-field--wide" data-gift-fields hidden>
        <div class="gift-fields__heading"><strong>Beschenkte Person</strong><span>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</span></div>
        ${Field({ label: "Vorname der Person", name: "recipientFirstName", autocomplete: "off", placeholder: "Mia", required: false })}
        ${Field({ label: "Nachname der Person", name: "recipientLastName", autocomplete: "off", placeholder: "Musterfrau", required: false })}
        <fieldset class="naming-choice patron-field--wide"><legend>Namentliche Nennung</legend><p>Soll die beschenkte Person namentlich genannt werden?</p><div><label><input type="radio" name="recipientPublic" value="yes" checked /><span>Ja, namentlich nennen</span></label><label><input type="radio" name="recipientPublic" value="no" /><span>Nein, anonym</span></label></div></fieldset>
      </div>
      <div class="patron-field patron-field--wide"><label for="patron-amount">Höhe der Spende</label><select id="patron-amount" name="amount"><option value="120">120,00 €</option><option value="180" selected>180,00 €</option><option value="250">250,00 €</option><option value="500">500,00 €</option></select></div>
      ${Field({ label: "Vorname", name: "firstName", autocomplete: "given-name", placeholder: "Max" })}
      ${Field({ label: "Nachname", name: "lastName", autocomplete: "family-name", placeholder: "Mustermann" })}
      ${Field({ label: "E-Mail", name: "email", type: "email", autocomplete: "email", placeholder: "info@mustermann.de" })}
      ${Field({ label: "Telefon", name: "phone", type: "tel", autocomplete: "tel", placeholder: "0123 456 789" })}
      ${Field({ label: "Straße", name: "street", autocomplete: "street-address", placeholder: "Musterstraße" })}
      ${Field({ label: "Hausnummer", name: "houseNumber", placeholder: "12" })}
      ${Field({ label: "PLZ", name: "postalCode", autocomplete: "postal-code", placeholder: "79100" })}
      ${Field({ label: "Ort", name: "city", autocomplete: "address-level2", placeholder: "Musterstadt" })}
      <label class="patron-check patron-field--wide"><input type="checkbox" name="consent" required /><span>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor.</span></label>
    </form>
    <div class="flow-actions"><button class="flow-back" type="button" data-back>Zurück</button><button class="button button--primary" type="button" data-next><span>Zur Zahlungsart</span></button></div>
  </section>`;

const PaymentPanel = () => `
  <section class="flow-panel flow-panel--payment" data-flow-panel="2" aria-labelledby="payment-title" hidden>
    <header class="flow-heading"><p>Zahlung</p><h2 id="payment-title">Zahlungsart wählen</h2><span>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor.</span></header>
    <div class="payment-layout">
      <fieldset class="payment-methods"><legend class="sr-only">Zahlungsart auswählen</legend>
        ${paymentMethods.map(([value, label, text], index) => `<label class="payment-method"><input type="radio" name="payment" value="${value}" ${index === 0 ? "checked" : ""} /><span class="payment-method__mark" aria-hidden="true"></span><span><strong>${label}</strong><small>${text}</small></span></label>`).join("")}
      </fieldset>
      <aside class="order-summary" aria-labelledby="summary-title"><p>Übersicht</p><h3 id="summary-title">Ihre Patenschaft</h3><dl><div><dt>Stein</dt><dd data-summary-stone>–</dd></div><div><dt>Spende</dt><dd data-summary-amount>180,00 €</dd></div><div><dt>Patenschaft</dt><dd data-summary-name>–</dd></div><div><dt>Zahlungsart</dt><dd data-summary-payment>Überweisung</dd></div></dl><p class="order-summary__note">Prototyp – es wird keine Zahlung ausgelöst.</p></aside>
    </div>
    <div class="flow-actions"><button class="flow-back" type="button" data-back>Zurück</button><button class="button button--primary" type="button" data-next><span>Patenschaft abschließen</span></button></div>
  </section>`;

const SuccessPanel = () => `
  <section class="flow-panel flow-panel--success" data-flow-panel="3" aria-labelledby="success-title" hidden>
    <div class="success-mark" aria-hidden="true"><svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="54"></circle><path d="m34 62 17 17 36-40"></path></svg></div>
    <p class="success-kicker">Patenschaft</p>
    <h2 class="brush-title" id="success-title"><span>Jeder Stein</span><span>zählt!</span></h2>
    <p>Vielen Dank, <strong data-success-name></strong>. Ihre Patenschaft für <strong data-success-stone></strong> wurde in diesem Prototyp erfolgreich vorgemerkt.</p>
    <div class="success-card"><span>Ihre Auswahl</span><strong data-success-card-stone></strong><small data-success-recipient></small><small data-success-payment></small></div>
    <div class="button-row"><button class="button button--primary" type="button" data-restart><span>Einen weiteren Stein paten</span></button><a class="button button--outline" href="/"><span>Zurück zur Startseite</span></a></div>
  </section>`;

const Intro = () => `
  <section class="patron-hero" id="top" aria-labelledby="patron-page-title">
    <div class="patron-hero__glow" aria-hidden="true"></div>
    <div class="shell patron-hero__content">
      <h1 class="brush-title" id="patron-page-title"><span>Jeder Stein</span><span>zählt!</span></h1>
      <div class="patron-hero__intro"><p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.</p><a class="button button--outline" href="#patenschaft"><span>Stein auswählen</span></a></div>
    </div>
  </section>`;

const PatronageApp = () => `
  <section class="patron-app" id="patenschaft" aria-label="Steinpatenschaft konfigurieren">
    <aside class="patron-app__rail"><div><p class="rail-kicker">Steinpate werden</p><h2 class="brush-title"><span>Jeder Stein</span><span>zählt!</span></h2><p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</p></div>${FlowSteps()}<div class="rail-pixels" aria-hidden="true"></div></aside>
    <div class="patron-app__content"><div class="mobile-progress">${FlowSteps()}</div>${SelectPanel()}${FormPanel()}${PaymentPanel()}${SuccessPanel()}<p class="flow-alert" data-flow-alert role="alert" aria-live="assertive"></p></div>
  </section>`;

export const PatronagePage = () => `${Header({ homePrefix: "/" })}<main id="main">${Intro()}${PatronageApp()}</main>${Footer({ homePrefix: "/" })}`;
