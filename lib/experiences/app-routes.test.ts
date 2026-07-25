import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import {
  isAppShellPath,
  mergeScreenFromPath,
  parseAppPathname,
  screenToPath,
} from "./app-routes";

describe("app-routes", () => {
  it("parses core app paths", () => {
    assert.deepEqual(parseAppPathname("/"), { type: "home" });
    // Legacy collection URLs map to home (shell replaces URL + scrolls to shelf).
    assert.deepEqual(parseAppPathname("/world-cups"), { type: "home" });
    assert.deepEqual(parseAppPathname("/collection"), { type: "home" });
    assert.equal(parseAppPathname("/tournaments/usa-1994")?.type, "tournament-landing");
    assert.equal(parseAppPathname("/tournaments/usa-1994/story")?.type, "experience");
    assert.equal(parseAppPathname("/tournaments/usa-1994/team")?.type, "team-picker");
    assert.equal(
      parseAppPathname("/tournaments/usa-1994/team/united-states")?.type,
      "experience"
    );
  });

  it("rejects unknown routes so the shell can show not-found", () => {
    assert.equal(parseAppPathname("/tournaments/not-real"), null);
    assert.equal(parseAppPathname("/tournaments/usa-1994/team/not-a-team"), null);
    assert.equal(parseAppPathname("/nope"), null);
    assert.equal(isAppShellPath("/dev/replay-qa"), false);
    assert.equal(isAppShellPath("/tournaments/usa-1994"), true);
  });

  it("preserves returnTo when syncing within a tournament", () => {
    const prev = {
      type: "tournament-landing" as const,
      tournamentId: "usa-1994" as const,
      returnTo: "collection" as const,
    };
    const parsed = parseAppPathname("/tournaments/usa-1994/story");
    assert.ok(parsed);
    const merged = mergeScreenFromPath(prev, parsed);
    assert.equal(merged.type, "experience");
    if (merged.type === "experience") {
      assert.equal(merged.returnTo, "collection");
    }
  });

  it("round-trips screen paths", () => {
    const story = parseAppPathname("/tournaments/france-1998/essentials");
    assert.ok(story);
    assert.equal(screenToPath(story), "/tournaments/france-1998/essentials");
  });

  it("resets scroll to top on every route change", () => {
    const root = process.cwd();
    const shell = readFileSync(join(root, "components/AppShell.tsx"), "utf8");
    const scrollToTop = readFileSync(join(root, "components/ScrollToTop.tsx"), "utf8");
    const machine = readFileSync(
      join(root, "components/FootballTimeMachine.tsx"),
      "utf8"
    );
    const modal = readFileSync(
      join(root, "components/experiences/MatchExperienceModal.tsx"),
      "utf8"
    );

    assert.match(shell, /<ScrollToTop\s*\/>/);
    assert.match(scrollToTop, /history\.scrollRestoration\s*=\s*["']manual["']/);
    assert.match(scrollToTop, /window\.scrollTo\(0,\s*0\)/);
    assert.match(scrollToTop, /consumeScrollToMensWorldCups/);
    assert.match(scrollToTop, /\[pathname\]/);
    assert.match(machine, /router\.push\(path,\s*\{\s*scroll:\s*true\s*\}\)/);
    assert.match(modal, /modalRef\.current\?\.scrollTo\(0,\s*0\)/);
    assert.match(modal, /\[episode\.canonicalMatchId\]/);
  });
});
