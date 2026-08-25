# Oktogon – Münsterbauverein Freiburg

Responsive, interaktive Umsetzung des Figma-Onepagers ohne Build-Abhängigkeiten.

## Start

```bash
npm run dev
```

Danach ist die Seite unter `http://localhost:4173` erreichbar.

## Aufbau

- `components.js` enthält die wiederverwendbaren Seitenmodule und UI-Komponenten.
- `data.js` trennt redaktionelle Inhalte von der Darstellung.
- `styles.css` bündelt Design-Tokens, Layout, Breakpoints und Motion.
- `app.js` steuert Navigation, Reveal-Animationen, Parallax, Carousel und Spenden-Dialog.
- `assets/` enthält die lokal gesicherten Originalbilder und Vektor-Assets aus Figma.

Die Seite ist bewusst frameworkfrei gehalten. Die Komponentenfunktionen lassen sich später direkt in React, Vue, Svelte oder ein CMS-Schema übertragen.
