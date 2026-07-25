#!/usr/bin/env node
/**
 * Production static export must not include internal /dev tooling.
 * Temporarily move app/dev out of the App Router tree for `next build`,
 * then restore it so local `next dev` keeps working.
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DEV_DIR = path.join(ROOT, "app/dev");
const STASH_DIR = path.join(ROOT, ".tmp-dev-routes");

function restoreDevRoutes() {
  if (fs.existsSync(STASH_DIR)) {
    if (fs.existsSync(DEV_DIR)) {
      fs.rmSync(DEV_DIR, { recursive: true, force: true });
    }
    fs.renameSync(STASH_DIR, DEV_DIR);
  }
}

function stashDevRoutes() {
  if (!fs.existsSync(DEV_DIR)) return false;
  if (fs.existsSync(STASH_DIR)) {
    fs.rmSync(STASH_DIR, { recursive: true, force: true });
  }
  fs.renameSync(DEV_DIR, STASH_DIR);
  return true;
}

function assertNoDevExport() {
  const outDev = path.join(ROOT, "out/dev");
  if (fs.existsSync(outDev)) {
    throw new Error("Production export still contains out/dev — aborting");
  }
  const outReports = path.join(ROOT, "out/reports");
  if (fs.existsSync(outReports)) {
    throw new Error("Production export still contains out/reports — aborting");
  }
}

let stashed = false;
process.on("exit", () => {
  if (stashed) restoreDevRoutes();
});
process.on("SIGINT", () => {
  if (stashed) restoreDevRoutes();
  process.exit(130);
});
process.on("SIGTERM", () => {
  if (stashed) restoreDevRoutes();
  process.exit(143);
});

try {
  stashed = stashDevRoutes();
  const result = spawnSync("npx", ["next", "build"], {
    cwd: ROOT,
    stdio: "inherit",
    env: process.env,
    shell: process.platform === "win32",
  });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
  assertNoDevExport();
  console.log("Verified production export excludes /dev and /reports.");
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  if (stashed) {
    restoreDevRoutes();
    stashed = false;
  }
}
