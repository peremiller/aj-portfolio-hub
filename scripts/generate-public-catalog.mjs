import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { applications, telegramBots } from "../src/catalog-data.js";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const outputPath = resolve(scriptDirectory, "../public/portfolio-catalog.json");

const payload = {
  schemaVersion: 1,
  source: "AJ Portfolio Hub",
  applications,
  telegramBots,
};

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");

console.log(
  `Generated portfolio-catalog.json with ${applications.length} applications and ${telegramBots.length} Telegram bots.`,
);
