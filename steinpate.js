import { PatronagePage } from "./patronage-components.js";

document.querySelector("#app").innerHTML = PatronagePage();

const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const mobileNav = document.querySelector("[data-mobile-nav]");
const panels = [...document.querySelectorAll("[data-flow-panel]")];
const progressItems = [...document.querySelectorAll("[data-progress-step]")];
const form = document.querySelector("[data-patron-form]");
const alert = document.querySelector("[data-flow-alert]");
const tooltip = document.querySelector("[data-stone-tooltip]");
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const state = { step: 0, stone: null };
const giftFields = document.querySelector("[data-gift-fields]");
const giftRequiredFields = [...giftFields.querySelectorAll('input[name="recipientFirstName"], input[name="recipientLastName"]')];

const closeMenu = () => {
  menuToggle.setAttribute("aria-expanded", "false");
  mobileNav.classList.remove("is-open");
  document.body.classList.remove("menu-open");
};

menuToggle.addEventListener("click", () => {
  const open = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!open));
  mobileNav.classList.toggle("is-open", !open);
  document.body.classList.toggle("menu-open", !open);
});
mobileNav.addEventListener("click", (event) => event.target.closest("a") && closeMenu());

const updateHeader = () => header.classList.toggle("is-scrolled", scrollY > 24);
addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

const showAlert = (message) => {
  alert.textContent = message;
  alert.classList.add("is-visible");
  setTimeout(() => alert.classList.remove("is-visible"), 2600);
};

const formatAmount = () => `${Number(form.elements.amount.value).toLocaleString("de-DE", { minimumFractionDigits: 2 })} €`;

const patronageDescription = () => {
  const data = new FormData(form);
  if (data.get("patronageType") !== "gift") return "Für mich selbst";
  const recipient = `${data.get("recipientFirstName") || ""} ${data.get("recipientLastName") || ""}`.trim();
  return `${recipient || "Als Geschenk"} · ${data.get("recipientPublic") === "yes" ? "namentliche Nennung" : "anonym"}`;
};

const updatePatronageMode = () => {
  const isGift = form.elements.patronageType.value === "gift";
  giftFields.hidden = !isGift;
  giftRequiredFields.forEach((field) => { field.required = isGift; });
};

const syncSummary = () => {
  const selectedPayment = document.querySelector('input[name="payment"]:checked')?.closest(".payment-method")?.querySelector("strong")?.textContent || "Überweisung";
  document.querySelector("[data-summary-stone]").textContent = state.stone?.label || "–";
  document.querySelector("[data-summary-amount]").textContent = formatAmount();
  document.querySelector("[data-summary-name]").textContent = patronageDescription();
  document.querySelector("[data-summary-payment]").textContent = selectedPayment;
};

const setStep = (nextStep) => {
  state.step = nextStep;
  panels.forEach((panel, index) => {
    const active = index === nextStep;
    panel.hidden = !active;
    panel.classList.toggle("is-active", active);
  });
  progressItems.forEach((item) => {
    const index = Number(item.dataset.progressStep);
    item.classList.toggle("is-active", index === nextStep);
    item.classList.toggle("is-complete", index < nextStep);
    if (index === nextStep) item.setAttribute("aria-current", "step");
    else item.removeAttribute("aria-current");
  });
  if (nextStep === 2) syncSummary();
  document.querySelector("#patenschaft").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  requestAnimationFrame(() => panels[nextStep].querySelector("h2")?.focus?.());
};

const showStoneTooltip = (stone) => {
  const available = stone.dataset.available === "true";
  tooltip.innerHTML = `<strong>${stone.getAttribute("aria-label").split(",")[0]}</strong><span>${available ? "Verfügbar – jetzt auswählen" : `Bereits verpatet an ${stone.dataset.patron}`}</span>`;
  tooltip.classList.toggle("is-reserved", !available);
  tooltip.classList.add("is-visible");
  const map = document.querySelector(".stone-map__visual").getBoundingClientRect();
  const rect = stone.getBoundingClientRect();
  tooltip.style.setProperty("--tooltip-x", `${Math.min(map.width - 250, Math.max(16, rect.left - map.left + rect.width / 2 - 115))}px`);
  tooltip.style.setProperty("--tooltip-y", `${Math.max(16, rect.top - map.top - 88)}px`);
};

document.querySelectorAll("[data-stone-id]").forEach((stone) => {
  stone.addEventListener("pointerenter", () => showStoneTooltip(stone));
  stone.addEventListener("focus", () => showStoneTooltip(stone));
  stone.addEventListener("pointerleave", () => tooltip.classList.remove("is-visible"));
  stone.addEventListener("blur", () => tooltip.classList.remove("is-visible"));
  stone.addEventListener("click", () => {
    if (stone.dataset.available !== "true") {
      showAlert(`${stone.getAttribute("aria-label").split(",")[0]} ist bereits verpatet.`);
      return;
    }
    document.querySelector(".stone.is-selected")?.classList.remove("is-selected");
    stone.classList.add("is-selected");
    state.stone = { id: Number(stone.dataset.stoneId), label: `Turmstein ${stone.dataset.stoneId}` };
    document.querySelector("[data-selected-label]").textContent = state.stone.label;
    document.querySelector("[data-form-stone]").textContent = state.stone.label;
    document.querySelector(".flow-panel--select [data-next]").disabled = false;
    showStoneTooltip(stone);
  });
});

document.querySelectorAll("[data-next]").forEach((button) => button.addEventListener("click", () => {
  if (state.step === 0 && !state.stone) return showAlert("Bitte wählen Sie zuerst einen verfügbaren Stein aus.");
  if (state.step === 1 && !form.reportValidity()) return;
  if (state.step === 2) {
    const data = new FormData(form);
    const payment = document.querySelector('input[name="payment"]:checked')?.closest(".payment-method")?.querySelector("strong")?.textContent || "Überweisung";
    document.querySelector("[data-success-name]").textContent = data.get("firstName");
    document.querySelector("[data-success-card-stone]").textContent = state.stone.label;
    document.querySelector("[data-success-recipient]").textContent = patronageDescription();
    document.querySelector("[data-success-payment]").textContent = `${formatAmount()} · ${payment}`;
  }
  setStep(Math.min(3, state.step + 1));
}));

document.querySelectorAll("[data-back]").forEach((button) => button.addEventListener("click", () => setStep(Math.max(0, state.step - 1))));
document.querySelectorAll('input[name="payment"]').forEach((input) => input.addEventListener("change", syncSummary));
document.querySelectorAll('input[name="patronageType"]').forEach((input) => input.addEventListener("change", updatePatronageMode));
form.elements.amount.addEventListener("change", syncSummary);
updatePatronageMode();

document.querySelector("[data-restart]").addEventListener("click", () => {
  document.querySelector(".stone.is-selected")?.classList.remove("is-selected");
  state.stone = null;
  form.reset();
  updatePatronageMode();
  document.querySelector("[data-selected-label]").textContent = "Noch kein Stein ausgewählt";
  document.querySelector(".flow-panel--select [data-next]").disabled = true;
  setStep(0);
});

if (!reduceMotion && matchMedia("(pointer: fine)").matches) {
  const glow = document.querySelector(".cursor-glow");
  addEventListener("pointermove", (event) => { glow.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`; }, { passive: true });
}
