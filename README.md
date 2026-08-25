# Oktogon – Münsterbauverein Freiburg

Responsive, interaktive Umsetzung des Figma-Onepagers ohne Build-Abhängigkeiten.

## Start

```bash
npm run dev
```

Danach ist die Seite unter `http://localhost:4173` erreichbar.

Die modulare Muster- und Design-System-Seite ist unter `http://localhost:4173/muster.html` erreichbar.

## Aufbau

- `components.js` enthält die wiederverwendbaren Seitenmodule und UI-Komponenten.
- `pattern-components.js` enthält die Foundations und wiederverwendbaren Section-Muster der Unterseite.
- `data.js` trennt redaktionelle Inhalte von der Darstellung.
- `styles.css` bündelt Design-Tokens, Layout, Breakpoints und Motion.
- `muster.css` ergänzt ausschließlich die Layouts der Musterseite.
- `app.js` steuert Navigation, Reveal-Animationen, Parallax, Carousel und Spenden-Dialog.
- `assets/` enthält die lokal gesicherten Originalbilder und Vektor-Assets aus Figma.

Mit `npm run build` wird die statische Vercel-Ausgabe in `dist/` erzeugt.

Die Seite ist bewusst frameworkfrei gehalten. Die Komponentenfunktionen lassen sich später direkt in React, Vue, Svelte oder ein CMS-Schema übertragen.
