#!/usr/bin/env node
/**
 * Production builds must not include internal /dev tooling.
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

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function assertNoDevInProductionBuild() {
  const routesManifestPath = path.join(ROOT, ".next/app-path-routes-manifest.json");
  if (!fs.existsSync(routesManifestPath)) {
    throw new Error(
      "Missing .next/app-path-routes-manifest.json — production build did not complete"
    );
  }

  const routesManifest = readJson(routesManifestPath);
  const routePaths = Object.keys(routesManifest);
  const leakedDevRoutes = routePaths.filter(
    (routePath) => routePath === "/dev" || routePath.startsWith("/dev/")
  );
  if (leakedDevRoutes.length > 0) {
    throw new Error(
      `Production build still contains /dev routes: ${leakedDevRoutes.join(", ")}`
    );
  }

  const serverDevDir = path.join(ROOT, ".next/server/app/dev");
  if (fs.existsSync(serverDevDir)) {
    throw new Error("Production build still contains .next/server/app/dev — aborting");
  }

  // Internal reports must never be published under public/ (served as static assets).
  const publicReports = path.join(ROOT, "public/reports");
  if (fs.existsSync(publicReports)) {
    throw new Error("Production tree still contains public/reports — aborting");
  }

  // Stale static-export output must not be mistaken for the deployable artifact.
  const outDir = path.join(ROOT, "out");
  if (fs.existsSync(outDir)) {
    fs.rmSync(outDir, { recursive: true, force: true });
  }
}

function assertFeedbackApiRouteBuilt() {
  const feedbackRoute = path.join(
    ROOT,
    ".next/server/app/api/feedback/route.js"
  );
  if (!fs.existsSync(feedbackRoute)) {
    throw new Error(
      "Production build is missing the Feedback API route (.next/server/app/api/feedback/route.js)"
    );
  }

  const routesManifest = readJson(
    path.join(ROOT, ".next/app-path-routes-manifest.json")
  );
  const hasFeedbackRoute = Object.entries(routesManifest).some(
    ([appPath, routePath]) =>
      appPath === "/api/feedback/route" || routePath === "/api/feedback"
  );
  if (!hasFeedbackRoute) {
    throw new Error(
      "Production build routes manifest is missing /api/feedback"
    );
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
  assertNoDevInProductionBuild();
  assertFeedbackApiRouteBuilt();
  console.log(
    "Verified production build excludes /dev, excludes public/reports, and includes /api/feedback."
  );
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  if (stashed) {
    restoreDevRoutes();
    stashed = false;
  }
}
