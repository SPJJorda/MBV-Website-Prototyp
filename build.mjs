import { copyFile, cp, mkdir, rm } from "node:fs/promises";

const output = new URL("./dist/", import.meta.url);
const rootFiles = [
  "index.html", "styles.css", "app.js", "components.js", "data.js",
  "muster.html", "muster.css", "muster.js", "pattern-components.js",
  "steinpate.html", "steinpate.css", "steinpate.js", "patronage-components.js", "patronage-data.js"
];

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

await Promise.all([
  ...rootFiles.map((file) => copyFile(new URL(file, import.meta.url), new URL(file, output))),
  cp(new URL("assets/", import.meta.url), new URL("assets/", output), { recursive: true }),
  cp(new URL("fonts/", import.meta.url), new URL("fonts/", output), { recursive: true })
]);

console.log("Static website built in dist/");
