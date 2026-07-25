#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  FIFA_ARCHIVE_INDEX_PATH,
  buildFifaArchiveIndex,
  emptyFifaArchiveIndex,
} from "../lib/archive/fifa-index";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const INDEX_PATH = path.join(ROOT, FIFA_ARCHIVE_INDEX_PATH);

function readExistingIndex() {
  if (!fs.existsSync(INDEX_PATH)) return emptyFifaArchiveIndex();
  const raw = JSON.parse(fs.readFileSync(INDEX_PATH, "utf8"));
  return raw.version === 1 ? raw : emptyFifaArchiveIndex();
}

function main(): void {
  const manualUrls = process.argv.slice(2).filter((arg) => arg.startsWith("http"));
  const existing = readExistingIndex();
  const index = buildFifaArchiveIndex({ existing, manualUrls });

  fs.mkdirSync(path.dirname(INDEX_PATH), { recursive: true });
  fs.writeFileSync(INDEX_PATH, `${JSON.stringify(index, null, 2)}\n`, "utf8");

  console.log(`FIFA archive index`);
  console.log(`  Items: ${index.items.length}`);
  console.log(`  Full-match replays: ${index.items.filter((item) => item.fullMatchReplay).length}`);
  console.log(`Wrote ${path.relative(ROOT, INDEX_PATH)}`);

  if (manualUrls.length > 0) {
    console.log(`  Manual URLs ingested: ${manualUrls.length}`);
  }
}

main();
