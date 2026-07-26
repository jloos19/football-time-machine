import assert from "node:assert/strict";
import {
  existsSync,
  readdirSync,
  readFileSync,
  statSync,
} from "node:fs";
import { join, relative } from "node:path";
import { describe, it } from "node:test";
import {
  INTERNAL_REPORT_PATHS,
  PUBLIC_REPORTS_DIR,
  assertDevOnly,
  listPublicReportFiles,
  loadRecoveryCandidatesReport,
  loadReplayAuditReport,
  loadReplayQaReport,
  publicReportsDirExists,
} from "./internal-reports";

const ROOT = process.cwd();

function walkSourceFiles(dir: string, out: string[] = []): string[] {
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir)) {
    if (entry === "node_modules" || entry === ".next" || entry === ".git") continue;
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      walkSourceFiles(full, out);
      continue;
    }
    if (/\.(ts|tsx|js|jsx|mjs|cjs)$/.test(entry)) out.push(full);
  }
  return out;
}

describe("internal tooling security", () => {
  it("guards /dev/replay-audit with server-side notFound in production", () => {
    const page = readFileSync(join(ROOT, "app/dev/replay-audit/page.tsx"), "utf8");
    assert.match(page, /notFound\s*\(/);
    assert.match(page, /NODE_ENV\s*!==\s*["']development["']/);
    assert.match(page, /loadReplayAuditReport/);
    assert.doesNotMatch(page, /fetch\s*\(\s*["'`]\/reports\//);
  });

  it("guards /dev/replay-qa with server-side notFound in production", () => {
    const page = readFileSync(join(ROOT, "app/dev/replay-qa/page.tsx"), "utf8");
    assert.match(page, /notFound\s*\(/);
    assert.match(page, /NODE_ENV\s*!==\s*["']development["']/);
    assert.match(page, /loadReplayQaReport/);
    assert.match(page, /loadRecoveryCandidatesReport/);
    assert.doesNotMatch(page, /fetch\s*\(\s*["'`]\/reports\//);
  });

  it("loads replay-audit and replay-qa data in non-production", async () => {
    const previous = process.env.NODE_ENV;
    process.env.NODE_ENV = "development";
    try {
      assert.doesNotThrow(() => assertDevOnly());
      const qa = await loadReplayQaReport();
      assert.ok(Array.isArray(qa.matches));
      assert.ok(Array.isArray(qa.progress));
      const recovery = loadRecoveryCandidatesReport();
      assert.equal(recovery.version, 1);
      assert.ok(Array.isArray(recovery.queue));
      // Optional generated file — null is valid until audit-replays runs.
      const audit = loadReplayAuditReport();
      assert.ok(audit === null || typeof audit.generatedAt === "string");
    } finally {
      process.env.NODE_ENV = previous;
    }
  });

  it("refuses internal report helpers in production", async () => {
    const previous = process.env.NODE_ENV;
    process.env.NODE_ENV = "production";
    try {
      assert.throws(() => assertDevOnly(), /development-only/);
      await assert.rejects(() => loadReplayQaReport(), /development-only/);
      assert.throws(() => loadRecoveryCandidatesReport(), /development-only/);
      assert.throws(() => loadReplayAuditReport(), /development-only/);
    } finally {
      process.env.NODE_ENV = previous;
    }
  });

  it("keeps internal report files out of public/reports", () => {
    assert.equal(publicReportsDirExists(), false);
    assert.deepEqual(listPublicReportFiles(), []);
    assert.equal(existsSync(PUBLIC_REPORTS_DIR), false);
    for (const name of [
      "replay-audit.json",
      "replay-qa.json",
      "recovery-candidates.json",
      "current-state.json",
      "human-verification.json",
      "fifa-archive-index.json",
      "flag-audit.md",
    ]) {
      assert.equal(existsSync(join(PUBLIC_REPORTS_DIR, name)), false);
    }
  });

  it("stores internal reports outside public/", () => {
    assert.ok(
      INTERNAL_REPORT_PATHS.replayAuditJson.includes(`${join("reports", "replay-audit.json")}`) ||
        INTERNAL_REPORT_PATHS.replayAuditJson.endsWith("reports/replay-audit.json")
    );
    assert.ok(
      INTERNAL_REPORT_PATHS.replayQaJson.includes(`${join("reports", "replay-qa.json")}`) ||
        INTERNAL_REPORT_PATHS.replayQaJson.endsWith("reports/replay-qa.json")
    );
    assert.ok(
      INTERNAL_REPORT_PATHS.recoveryCandidates.includes(
        join("data", "replay-qa", "recovery-candidates.json")
      )
    );
    assert.ok(
      INTERNAL_REPORT_PATHS.humanVerification.includes(
        join("data", "replay-qa", "human-verification.json")
      )
    );
    assert.ok(existsSync(INTERNAL_REPORT_PATHS.humanVerification));
    assert.ok(existsSync(INTERNAL_REPORT_PATHS.recoveryCandidates));
  });

  it("does not fetch /reports paths from production app or components", () => {
    const productionDirs = [
      join(ROOT, "app"),
      join(ROOT, "components"),
      join(ROOT, "lib"),
    ];
    const offenders: string[] = [];
    for (const dir of productionDirs) {
      for (const file of walkSourceFiles(dir)) {
        const rel = relative(ROOT, file);
        if (rel.startsWith(`app${join("/", "dev")}`) || rel.startsWith("app/dev/")) continue;
        if (rel.startsWith(`lib${join("/", "dev")}`) || rel.startsWith("lib/dev/")) continue;
        const source = readFileSync(file, "utf8");
        if (/["'`]\/reports\//.test(source) || /["'`]public\/reports/.test(source)) {
          offenders.push(rel);
        }
      }
    }
    assert.deepEqual(offenders, []);
  });

  it("dev clients do not fetch static /reports URLs", () => {
    const clients = [
      "app/dev/replay-audit/ReplayAuditClient.tsx",
      "app/dev/replay-qa/ReplayQAClient.tsx",
      "app/dev/replay-qa/RecoveryQueueView.tsx",
    ];
    for (const rel of clients) {
      const source = readFileSync(join(ROOT, rel), "utf8");
      assert.doesNotMatch(source, /["'`]\/reports\//);
      assert.doesNotMatch(source, /public\/reports/);
    }
  });

  it("scripts and persist helpers no longer write into public/reports", () => {
    const files = [
      "scripts/audit-replays.ts",
      "scripts/generate-replay-qa.ts",
      "scripts/generate-recovery-queue.ts",
      "lib/archive/qa-persist.server.ts",
      "lib/archive/recovery-persist.server.ts",
    ];
    for (const rel of files) {
      const source = readFileSync(join(ROOT, rel), "utf8");
      assert.doesNotMatch(source, /public\/reports/);
    }
  });

  it("production navigation does not link to internal tooling", () => {
    const navSources = walkSourceFiles(join(ROOT, "components")).concat(
      walkSourceFiles(join(ROOT, "app")).filter((f) => !f.includes(`${join("app", "dev")}`))
    );
    const offenders: string[] = [];
    for (const file of navSources) {
      const source = readFileSync(file, "utf8");
      if (
        /\/dev\/replay-audit/.test(source) ||
        /\/dev\/replay-qa/.test(source) ||
        /\/reports\//.test(source)
      ) {
        offenders.push(relative(ROOT, file));
      }
    }
    assert.deepEqual(offenders, []);
    assert.equal(existsSync(join(ROOT, "public/robots.txt")), false);
    assert.equal(existsSync(join(ROOT, "public/sitemap.xml")), false);
    assert.equal(existsSync(join(ROOT, "app/robots.ts")), false);
    assert.equal(existsSync(join(ROOT, "app/sitemap.ts")), false);
  });

  it("production build excludes app/dev and keeps the Feedback API route", () => {
    const pkg = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8")) as {
      scripts: Record<string, string>;
    };
    assert.equal(pkg.scripts.build, "node scripts/build-production.mjs");
    const buildScript = readFileSync(join(ROOT, "scripts/build-production.mjs"), "utf8");
    assert.match(buildScript, /app\/dev/);
    assert.match(buildScript, /\.tmp-dev-routes/);
    assert.match(buildScript, /\.next\/server\/app\/dev/);
    assert.match(buildScript, /public\/reports/);
    assert.match(buildScript, /\/api\/feedback/);
    assert.match(buildScript, /assertFeedbackApiRouteBuilt/);
  });

  it("keeps internal tooling styles out of the production globals stylesheet", () => {
    const globals = readFileSync(join(ROOT, "app/globals.css"), "utf8");
    assert.doesNotMatch(globals, /\.replay-audit\b/);
    assert.doesNotMatch(globals, /\.replay-qa-/);
    assert.ok(existsSync(join(ROOT, "app/dev/replay-audit/replay-audit.css")));
    assert.ok(existsSync(join(ROOT, "app/dev/replay-qa/replay-qa.css")));
  });
});
