import { PatternPage } from "./pattern-components.js";

document.querySelector("#app").innerHTML = PatternPage();

const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const mobileNav = document.querySelector("[data-mobile-nav]");
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

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

if (reduceMotion) {
  document.querySelectorAll(".reveal").forEach((node) => node.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  }), { threshold: 0.1, rootMargin: "0px 0px -5%" });
  document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));
}

if (!reduceMotion && matchMedia("(pointer: fine)").matches) {
  const glow = document.querySelector(".cursor-glow");
  addEventListener("pointermove", (event) => {
    glow.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
  }, { passive: true });

  document.querySelectorAll(".button").forEach((button) => {
    button.addEventListener("pointermove", (event) => {
      const rect = button.getBoundingClientRect();
      button.style.setProperty("--button-x", `${(((event.clientX - rect.left) / rect.width - 0.5) * 8).toFixed(2)}px`);
      button.style.setProperty("--button-y", `${(((event.clientY - rect.top) / rect.height - 0.5) * 6).toFixed(2)}px`);
    }, { passive: true });
    button.addEventListener("pointerleave", () => {
      button.style.setProperty("--button-x", "0px");
      button.style.setProperty("--button-y", "0px");
    });
  });
}

const patternForm = document.querySelector("[data-pattern-form]");
patternForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const status = patternForm.querySelector(".pattern-contact__status");
  status.textContent = "Vielen Dank. Das Formular ist als Muster erfolgreich geprüft.";
  patternForm.classList.add("is-sent");
});
