import { Dialog, Page } from "./components.js";

const app = document.querySelector("#app");
const dialogRoot = document.querySelector("#dialog-root");
app.innerHTML = Page();
dialogRoot.innerHTML = Dialog();

const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const mobileNav = document.querySelector("[data-mobile-nav]");
const towerStory = document.querySelector(".tower-story");
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const smoothstep = (value) => value * value * (3 - 2 * value);

const updateTowerStory = () => {
  const rect = towerStory.getBoundingClientRect();
  const scrollRange = Math.max(1, towerStory.offsetHeight - innerHeight);
  const sectionProgress = clamp(-rect.top / scrollRange);
  const transitionProgress = clamp((sectionProgress - 0.18) / 0.64);
  const progress = reduceMotion ? (transitionProgress < 0.5 ? 0 : 1) : smoothstep(transitionProgress);
  const baseOpacity = 1 - smoothstep(clamp((progress - 0.05) / 0.55));
  const nextOpacity = smoothstep(clamp(progress / 0.72));

  towerStory.style.setProperty("--chapter-progress", progress.toFixed(4));
  towerStory.style.setProperty("--chapter-reveal", `${((1 - progress) * 100).toFixed(2)}%`);
  towerStory.style.setProperty("--chapter-base-opacity", baseOpacity.toFixed(4));
  towerStory.style.setProperty("--chapter-base-shift", `${(-28 * progress).toFixed(2)}px`);
  towerStory.style.setProperty("--chapter-base-scale", (1.04 + progress * 0.04).toFixed(4));
  towerStory.style.setProperty("--chapter-next-opacity", nextOpacity.toFixed(4));
  towerStory.style.setProperty("--chapter-next-shift", `${(34 * (1 - progress)).toFixed(2)}px`);
  towerStory.style.setProperty("--chapter-next-scale", (1.1 - progress * 0.06).toFixed(4));
  towerStory.style.setProperty("--chapter-mark-scale", (0.72 + progress * 0.28).toFixed(4));
};

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

const onScroll = () => {
  header.classList.toggle("is-scrolled", scrollY > 24);
  updateTowerStory();
  if (!reduceMotion) {
    const parallax = document.querySelector("[data-parallax]");
    if (scrollY < innerHeight * 1.2) parallax.style.transform = `translate3d(0, ${scrollY * 0.16}px, 0) scale(1.04)`;
  }
};
addEventListener("scroll", onScroll, { passive: true });
addEventListener("resize", updateTowerStory, { passive: true });
onScroll();

if (reduceMotion) {
  document.querySelectorAll(".reveal").forEach((node) => node.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  }), { threshold: 0.12, rootMargin: "0px 0px -5%" });
  document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));
}

const carousel = document.querySelector("[data-carousel]");
const moveCarousel = (direction) => carousel.scrollBy({ left: direction * Math.min(carousel.clientWidth * 0.72, 560), behavior: reduceMotion ? "auto" : "smooth" });
document.querySelector("[data-carousel-next]")?.addEventListener("click", () => moveCarousel(1));

if (!reduceMotion && matchMedia("(pointer: fine)").matches) {
  const glow = document.querySelector(".cursor-glow");
  addEventListener("pointermove", (event) => {
    glow.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
  }, { passive: true });

  document.querySelectorAll(".button").forEach((button) => {
    button.addEventListener("pointermove", (event) => {
      const rect = button.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 6;
      button.style.setProperty("--button-x", `${x.toFixed(2)}px`);
      button.style.setProperty("--button-y", `${y.toFixed(2)}px`);
    }, { passive: true });
    button.addEventListener("pointerleave", () => {
      button.style.setProperty("--button-x", "0px");
      button.style.setProperty("--button-y", "0px");
    });
  });
}
