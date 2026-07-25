#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { ReplayAuditReport, ReplayAuditSourceRow } from "../lib/replays/audit-report";
import { TOURNAMENT_NAMES, hasHumanVerifiedFullMatch } from "../lib/replays/index";
import { curatedJourneyExclusions } from "../lib/replays/curated-journey";
import type { ReplayProvider, ReplaySourceStatus } from "../lib/replays/types";
import type { CanonicalMatch, CanonicalReplaySource } from "../lib/archive/types";
import { usa1994Matches } from "../lib/archive/matches/usa1994";
import { france1998Matches } from "../lib/archive/matches/france1998";
import { serializeCanonicalMatches } from "../lib/archive/serialize";
import { validateAllCuratedReplays } from "../lib/replays/validate";
import { validateArchive } from "../lib/archive/validate";
import { buildQaReport } from "../lib/archive/qa-report";
import usa1994Episodes from "../data/usa1994.json";
import france1998Episodes from "../data/france1998.json";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const REPORTS_DIR = path.join(ROOT, "reports");

const FETCH_TIMEOUT_MS = 20_000;
const USER_AGENT =
  "FootballTimeMachine-ReplayAudit/1.0 (+https://github.com/football-time-machine)";

type AuditCheck = {
  auditResult: ReplayAuditSourceRow["auditResult"];
  recommendedStatus: ReplaySourceStatus;
  recommendedVerified: boolean;
  reason: string;
};

type Archives = Record<string, CanonicalMatch[]>;

const archives: Archives = {
  "usa-1994": structuredClone(usa1994Matches),
  "france-1998": structuredClone(france1998Matches),
};

const archiveFiles: Record<string, string> = {
  "usa-1994": path.join(ROOT, "lib/archive/matches/usa1994.ts"),
  "france-1998": path.join(ROOT, "lib/archive/matches/france1998.ts"),
};

const archiveExportNames: Record<string, string> = {
  "usa-1994": "usa1994Matches",
  "france-1998": "france1998Matches",
};

function todayIsoDate(): string {
  return new Date().toISOString().slice(0, 10);
}

function nowIsoTimestamp(): string {
  return new Date().toISOString();
}

function matchNumberFromId(episodeId: string): number {
  const suffix = episodeId.split("-").pop() ?? "0";
  return Number.parseInt(suffix, 10);
}

async function fetchWithTimeout(
  url: string,
  init: RequestInit = {}
): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    return await fetch(url, {
      ...init,
      signal: controller.signal,
      headers: {
        "User-Agent": USER_AGENT,
        ...(init.headers ?? {}),
      },
      redirect: "follow",
    });
  } finally {
    clearTimeout(timeout);
  }
}

function extractDailymotionVideoId(url: string): string | null {
  const match = url.match(/dailymotion\.com\/video\/([^/?#]+)/i);
  return match?.[1] ?? null;
}

function isFifaWatchUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return (
      /(^|\.)fifa\.com$/i.test(parsed.hostname) &&
      (parsed.pathname.includes("/watch/") ||
        parsed.pathname.includes("/archive/") ||
        parsed.pathname.includes("/plus/"))
    );
  } catch {
    return false;
  }
}

function parseJsonSafe(text: string): Record<string, unknown> | null {
  try {
    return JSON.parse(text) as Record<string, unknown>;
  } catch {
    return null;
  }
}

function oembedIndicatesUnavailable(
  payload: Record<string, unknown> | null,
  status: number,
  rawText: string
): AuditCheck | null {
  if (status === 401 || status === 403) {
    return {
      auditResult: "private",
      recommendedStatus: "private",
      recommendedVerified: false,
      reason: `oEmbed returned HTTP ${status} — video is private or access-restricted`,
    };
  }

  if (status === 404) {
    return {
      auditResult: "dead",
      recommendedStatus: "dead",
      recommendedVerified: false,
      reason: "oEmbed returned 404 — video metadata unavailable",
    };
  }

  const rawLower = rawText.toLowerCase();

  if (
    rawLower.includes("private") ||
    rawLower.includes("access denied") ||
    rawLower.includes("not accessible")
  ) {
    return {
      auditResult: "private",
      recommendedStatus: "private",
      recommendedVerified: false,
      reason: "oEmbed response indicates the video is private or access-restricted",
    };
  }

  if (!payload) {
    if (
      rawLower.includes("deleted") ||
      rawLower.includes("not found") ||
      rawLower.includes("removed")
    ) {
      return {
        auditResult: "dead",
        recommendedStatus: "dead",
        recommendedVerified: false,
        reason: "oEmbed response indicates the video was deleted or removed",
      };
    }

    return null;
  }

  const errorMessage = String(
    payload.error ?? payload.message ?? payload.title ?? ""
  ).toLowerCase();

  if (
    errorMessage.includes("private") ||
    errorMessage.includes("not accessible") ||
    errorMessage.includes("access denied")
  ) {
    return {
      auditResult: "private",
      recommendedStatus: "private",
      recommendedVerified: false,
      reason: "oEmbed indicates the video is private or access-restricted",
    };
  }

  if (
    errorMessage.includes("deleted") ||
    errorMessage.includes("not found") ||
    errorMessage.includes("removed") ||
    errorMessage.includes("does not exist")
  ) {
    return {
      auditResult: "dead",
      recommendedStatus: "dead",
      recommendedVerified: false,
      reason: "oEmbed indicates the video was deleted or removed",
    };
  }

  if (typeof payload.title === "string" && payload.title.trim().length > 0) {
    return {
      auditResult: "ok",
      recommendedStatus: "active",
      recommendedVerified: true,
      reason: "oEmbed returned playable metadata with a title",
    };
  }

  return null;
}

async function auditDailymotionUrl(
  url: string,
  existing?: CanonicalReplaySource
): Promise<AuditCheck> {
  const videoId = extractDailymotionVideoId(url);
  if (!videoId) {
    return {
      auditResult: "dead",
      recommendedStatus: "dead",
      recommendedVerified: false,
      reason: "Could not extract a Dailymotion video ID from the URL",
    };
  }

  const oembedUrl = `https://www.dailymotion.com/services/oembed?url=${encodeURIComponent(url)}&format=json`;

  try {
    const response = await fetchWithTimeout(oembedUrl, {
      headers: { Accept: "application/json" },
    });
    const text = await response.text();
    const payload = parseJsonSafe(text);
    const fromOembed = oembedIndicatesUnavailable(payload, response.status, text);

    if (fromOembed && fromOembed.auditResult !== "ok") {
      return fromOembed;
    }

    if (fromOembed?.auditResult === "ok") {
      return fromOembed;
    }

    const pageResponse = await fetchWithTimeout(url);
    const pageText = (await pageResponse.text()).toLowerCase();

    if (
      pageResponse.status === 403 ||
      pageText.includes("error_page-403") ||
      pageText.includes("this video is private") ||
      pageText.includes("video is private") ||
      pageText.includes("content is private")
    ) {
      return {
        auditResult: "private",
        recommendedStatus: "private",
        recommendedVerified: false,
        reason: "Dailymotion page indicates the video is private",
      };
    }

    if (
      pageResponse.status === 404 ||
      pageText.includes("video has been removed") ||
      pageText.includes("video doesn't exist") ||
      pageText.includes("video does not exist") ||
      pageText.includes("page you requested cannot be found")
    ) {
      return {
        auditResult: "dead",
        recommendedStatus: "dead",
        recommendedVerified: false,
        reason: "Dailymotion page indicates the video was removed or not found",
      };
    }

    if (!response.ok) {
      if (existing?.status === "private" || existing?.status === "dead") {
        return {
          auditResult: existing.status,
          recommendedStatus: existing.status,
          recommendedVerified: false,
          reason: `Audit inconclusive (HTTP ${response.status}); preserving prior ${existing.status} status`,
        };
      }

      return {
        auditResult: "needs-review",
        recommendedStatus: "needs-review",
        recommendedVerified: false,
        reason: `oEmbed request failed with HTTP ${response.status}`,
      };
    }

    if (payload && typeof payload.title === "string" && payload.title.trim()) {
      return {
        auditResult: "ok",
        recommendedStatus: "active",
        recommendedVerified: true,
        reason: "oEmbed and page check confirm playable Dailymotion metadata",
      };
    }

    if (existing?.status === "private" || existing?.status === "dead") {
      return {
        auditResult: existing.status,
        recommendedStatus: existing.status,
        recommendedVerified: false,
        reason: `Audit inconclusive; preserving prior ${existing.status} status`,
      };
    }

    return {
      auditResult: "needs-review",
      recommendedStatus: "needs-review",
      recommendedVerified: false,
      reason: "Dailymotion response was inconclusive — manual review required",
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown Dailymotion audit error";

    if (existing?.status === "private" || existing?.status === "dead") {
      return {
        auditResult: existing.status,
        recommendedStatus: existing.status,
        recommendedVerified: false,
        reason: `Audit failed (${message}); preserving prior ${existing.status} status`,
      };
    }

    return {
      auditResult: "error",
      recommendedStatus: "needs-review",
      recommendedVerified: false,
      reason: `Dailymotion audit failed: ${message}`,
    };
  }
}

async function auditFifaUrl(
  url: string,
  source: CanonicalReplaySource
): Promise<AuditCheck> {
  try {
    const response = await fetchWithTimeout(url, { method: "GET" });
    const finalUrl = response.url;
    const body = (await response.text()).toLowerCase();

    if (!response.ok) {
      return {
        auditResult: "needs-review",
        recommendedStatus: "needs-review",
        recommendedVerified: false,
        reason: `FIFA URL returned HTTP ${response.status}`,
      };
    }

    if (!isFifaWatchUrl(finalUrl)) {
      return {
        auditResult: "needs-review",
        recommendedStatus: "needs-review",
        recommendedVerified: false,
        reason: `FIFA URL redirected away from a watch/archive page (${finalUrl})`,
      };
    }

    if (
      body.includes("page not found") ||
      body.includes("content unavailable") ||
      body.includes("no longer available") ||
      body.includes("something went wrong")
    ) {
      return {
        auditResult: "needs-review",
        recommendedStatus: "needs-review",
        recommendedVerified: false,
        reason: "FIFA page content suggests the replay may be unavailable",
      };
    }

    if (
      source.humanVerification.status === "verified" &&
      source.status === "active" &&
      body.includes("watch") &&
      (body.includes("fifa") || body.includes("archive"))
    ) {
      return {
        auditResult: "ok",
        recommendedStatus: "active",
        recommendedVerified: true,
        reason: "FIFA watch/archive page responded and matches an existing verified record",
      };
    }

    return {
      auditResult: "needs-review",
      recommendedStatus: "needs-review",
      recommendedVerified: false,
      reason:
        "FIFA page loaded but player availability could not be confirmed automatically",
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown FIFA audit error";
    return {
      auditResult: "needs-review",
      recommendedStatus: "needs-review",
      recommendedVerified: false,
      reason: `FIFA audit failed: ${message}`,
    };
  }
}

async function auditYouTubeUrl(url: string): Promise<AuditCheck> {
  const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`;

  try {
    const response = await fetchWithTimeout(oembedUrl, {
      headers: { Accept: "application/json" },
    });
    const text = await response.text();
    const payload = parseJsonSafe(text);

    if (response.status === 404) {
      return {
        auditResult: "dead",
        recommendedStatus: "dead",
        recommendedVerified: false,
        reason: "YouTube oEmbed returned 404",
      };
    }

    if (!response.ok) {
      return {
        auditResult: "needs-review",
        recommendedStatus: "needs-review",
        recommendedVerified: false,
        reason: `YouTube oEmbed failed with HTTP ${response.status}`,
      };
    }

    if (payload && typeof payload.title === "string" && payload.title.trim()) {
      return {
        auditResult: "ok",
        recommendedStatus: "active",
        recommendedVerified: true,
        reason: "YouTube oEmbed returned playable metadata",
      };
    }

    return {
      auditResult: "needs-review",
      recommendedStatus: "needs-review",
      recommendedVerified: false,
      reason: "YouTube oEmbed response was inconclusive",
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown YouTube audit error";
    return {
      auditResult: "needs-review",
      recommendedStatus: "needs-review",
      recommendedVerified: false,
      reason: `YouTube audit failed: ${message}`,
    };
  }
}

async function auditGenericUrl(url: string): Promise<AuditCheck> {
  try {
    const response = await fetchWithTimeout(url, { method: "GET" });
    if (!response.ok) {
      return {
        auditResult: "needs-review",
        recommendedStatus: "needs-review",
        recommendedVerified: false,
        reason: `URL returned HTTP ${response.status}`,
      };
    }

    return {
      auditResult: "needs-review",
      recommendedStatus: "needs-review",
      recommendedVerified: false,
      reason: "URL responded but provider availability requires manual review",
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown availability error";
    return {
      auditResult: "needs-review",
      recommendedStatus: "needs-review",
      recommendedVerified: false,
      reason: `Availability check failed: ${message}`,
    };
  }
}

function matchNumberFromCanonical(match: CanonicalMatch): number {
  return match.chronologicalIndex;
}

async function auditSource(source: CanonicalReplaySource): Promise<AuditCheck> {
  switch (source.provider) {
    case "Dailymotion":
      return auditDailymotionUrl(source.url, source);
    case "FIFA":
      return auditFifaUrl(source.url, source);
    case "YouTube":
      return auditYouTubeUrl(source.url);
    default:
      return auditGenericUrl(source.url);
  }
}

function shouldAutoApplyUpdate(
  provider: ReplayProvider,
  check: AuditCheck
): boolean {
  if (provider === "FIFA") {
    return false;
  }

  if (provider === "Dailymotion") {
    return (
      check.auditResult === "private" ||
      check.auditResult === "dead" ||
      check.auditResult === "ok"
    );
  }

  return false;
}

/** Update automated audit fields only — never overwrite human verification. */
function applyAuditToSource(source: CanonicalReplaySource, check: AuditCheck): void {
  const wasHumanVerified = source.humanVerification.status === "verified";

  source.automatedCheck = {
    status: check.auditResult === "ok" ? "ok" : check.auditResult,
    lastChecked: todayIsoDate(),
    reason: check.reason,
    recheckRecommended:
      wasHumanVerified &&
      check.auditResult !== "ok" &&
      check.auditResult !== "needs-review",
  };

  if (shouldAutoApplyUpdate(source.provider, check)) {
    source.status = check.recommendedStatus;
  }

  if (check.auditResult !== "ok" && check.auditResult !== "needs-review") {
    const prefix =
      check.auditResult === "private"
        ? "Dailymotion returns a private-video page"
        : check.auditResult === "dead"
          ? "Dailymotion video unavailable"
          : "Replay audit flagged this source";
    source.notes = `${prefix}; excluded from replay options. (${check.reason})`;
  }
}

function countSourceBucket(
  row: ReplayAuditSourceRow
): keyof Omit<
  ReplayAuditReport["summary"]["usa-1994"],
  "noVerifiedReplay"
> {
  if (row.recommendedStatus === "private") return "private";
  if (row.recommendedStatus === "dead") return "dead";
  if (row.recommendedStatus === "needs-review") return "needsReview";
  if (row.recommendedStatus === "active" && row.recommendedVerified) {
    return "verified";
  }
  return "needsReview";
}

function buildMarkdownReport(report: ReplayAuditReport): string {
  const lines: string[] = [
    "# Replay Audit Report",
    "",
    `Generated: ${report.generatedAt}`,
    "",
    "## Summary",
    "",
    `- Total sources checked: **${report.summary.totalSourcesChecked}**`,
    `- Broken Dailymotion sources: **${report.summary.brokenDailymotion}**`,
    "",
    "### USA '94",
    "",
    `- Verified: ${report.summary["usa-1994"].verified}`,
    `- Needs review: ${report.summary["usa-1994"].needsReview}`,
    `- Private: ${report.summary["usa-1994"].private}`,
    `- Dead: ${report.summary["usa-1994"].dead}`,
    `- No verified replay: ${report.summary["usa-1994"].noVerifiedReplay}`,
    "",
    "### France '98",
    "",
    `- Verified: ${report.summary["france-1998"].verified}`,
    `- Needs review: ${report.summary["france-1998"].needsReview}`,
    `- Private: ${report.summary["france-1998"].private}`,
    `- Dead: ${report.summary["france-1998"].dead}`,
    `- No verified replay: ${report.summary["france-1998"].noVerifiedReplay}`,
    "",
    "## Source results",
    "",
    "| Tournament | Match | Teams | Provider | Previous | Audit | Recommended | Reason | Last checked |",
    "| --- | ---: | --- | --- | --- | --- | --- | --- | --- |",
  ];

  for (const row of report.sources) {
    lines.push(
      `| ${row.tournament} | ${String(row.matchNumber).padStart(2, "0")} | ${row.teams} | ${row.provider} | ${row.previousStatus}${row.previousVerified ? ", verified" : ", unverified"} | ${row.auditResult} | ${row.recommendedStatus}${row.recommendedVerified ? ", verified" : ", unverified"} | ${row.reason.replace(/\|/g, "\\|")} | ${row.lastChecked} |`
    );
  }

  lines.push("", "## Matches without a verified replay", "");

  const unavailable = report.matches.filter((match) => !match.hasVerifiedReplay);
  if (unavailable.length === 0) {
    lines.push("None.");
  } else {
    for (const match of unavailable) {
      lines.push(
        `- ${match.tournament} match ${String(match.matchNumber).padStart(2, "0")}: ${match.teams}`
      );
    }
  }

  lines.push("", "## Excluded from curated journey", "");

  if (report.curatedExclusions.length === 0) {
    lines.push("None.");
  } else {
    for (const exclusion of report.curatedExclusions) {
      lines.push(
        `- ${exclusion.tournament} match ${String(exclusion.originalMatchNumber).padStart(2, "0")}: ${exclusion.match} — ${exclusion.reason} Replaced in journey by ${exclusion.replacedByMatch} (${exclusion.replacedByEpisodeId}).`
      );
    }
  }

  lines.push("");
  return lines.join("\n");
}

async function runAudit(): Promise<ReplayAuditReport> {
  const sourceRows: ReplayAuditSourceRow[] = [];
  const checkedAt = nowIsoTimestamp();
  let brokenDailymotion = 0;
  const tournamentsUpdated = new Set<string>();

  for (const [tournamentId, matches] of Object.entries(archives)) {
    const tournament =
      TOURNAMENT_NAMES[tournamentId as keyof typeof TOURNAMENT_NAMES] ?? tournamentId;
    const sorted = [...matches].sort(
      (a, b) => a.chronologicalIndex - b.chronologicalIndex
    );

    for (const match of sorted) {
      for (const source of match.replaySources) {
        const check = await auditSource(source);

        if (source.continuationUrl && source.provider === "Dailymotion") {
          const continuationCheck = await auditDailymotionUrl(
            source.continuationUrl,
            source
          );
          if (continuationCheck.auditResult !== "ok") {
            check.auditResult = continuationCheck.auditResult;
            check.recommendedStatus = continuationCheck.recommendedStatus;
            check.recommendedVerified = false;
            check.reason = `Continuation URL failed: ${continuationCheck.reason}`;
          }
        }

        if (
          source.provider === "Dailymotion" &&
          (check.auditResult === "private" || check.auditResult === "dead")
        ) {
          brokenDailymotion += 1;
        }

        const previousStatus = source.status;
        const previousVerified = source.humanVerification.status === "verified";

        if (shouldAutoApplyUpdate(source.provider, check)) {
          applyAuditToSource(source, check);
          tournamentsUpdated.add(tournamentId);
        } else if (source.provider === "FIFA") {
          source.automatedCheck.lastChecked = todayIsoDate();
        }

        sourceRows.push({
          tournament,
          tournamentId,
          episodeId: match.editorial?.journeyEpisodeId ?? match.canonicalMatchId,
          canonicalMatchId: match.canonicalMatchId,
          matchNumber: matchNumberFromCanonical(match),
          teams: `${match.homeTeam} vs ${match.awayTeam}`,
          provider: source.provider,
          url: source.url,
          previousStatus,
          previousVerified,
          auditResult: check.auditResult,
          recommendedStatus: check.recommendedStatus,
          recommendedVerified: check.recommendedVerified,
          reason: check.reason,
          lastChecked: checkedAt,
        });
      }
    }
  }

  for (const tournamentId of tournamentsUpdated) {
    const exportName = archiveExportNames[tournamentId];
    const filePath = archiveFiles[tournamentId];
    const contents = serializeCanonicalMatches(exportName, archives[tournamentId]);
    fs.writeFileSync(filePath, contents, "utf8");
    console.log(`Updated ${path.relative(ROOT, filePath)}`);
  }

  const summary: ReplayAuditReport["summary"] = {
    totalSourcesChecked: sourceRows.length,
    brokenDailymotion,
    "usa-1994": {
      verified: 0,
      needsReview: 0,
      private: 0,
      dead: 0,
      noVerifiedReplay: 0,
    },
    "france-1998": {
      verified: 0,
      needsReview: 0,
      private: 0,
      dead: 0,
      noVerifiedReplay: 0,
    },
  };

  for (const row of sourceRows) {
    const bucket = countSourceBucket(row);
    summary[row.tournamentId as "usa-1994" | "france-1998"][bucket] += 1;
  }

  const matches = Object.entries(archives).flatMap(([tournamentId, archiveMatches]) => {
    const tournament =
      TOURNAMENT_NAMES[tournamentId as keyof typeof TOURNAMENT_NAMES] ?? tournamentId;
    return [...archiveMatches]
      .sort((a, b) => a.chronologicalIndex - b.chronologicalIndex)
      .map((match) => ({
        tournament,
        tournamentId,
        episodeId: match.editorial?.journeyEpisodeId ?? match.canonicalMatchId,
        canonicalMatchId: match.canonicalMatchId,
        matchNumber: match.chronologicalIndex,
        teams: `${match.homeTeam} vs ${match.awayTeam}`,
        hasVerifiedReplay: hasHumanVerifiedFullMatch(match),
        preferredProvider:
          match.replaySources.find(
            (s) => s.humanVerification.status === "verified" && s.status === "active"
          )?.provider ?? null,
      }));
  });

  for (const match of matches) {
    if (!match.hasVerifiedReplay) {
      summary[match.tournamentId as "usa-1994" | "france-1998"].noVerifiedReplay += 1;
    }
  }

  return {
    generatedAt: checkedAt,
    summary,
    sources: sourceRows,
    matches,
    curatedExclusions: curatedJourneyExclusions.map((exclusion) => ({
      tournament:
        TOURNAMENT_NAMES[exclusion.tournamentId as keyof typeof TOURNAMENT_NAMES] ??
        exclusion.tournamentId,
      tournamentId: exclusion.tournamentId,
      match: exclusion.match,
      date: exclusion.date,
      originalEpisodeId: exclusion.originalEpisodeId,
      originalMatchNumber: exclusion.originalMatchNumber,
      reason: exclusion.reason,
      replacedByEpisodeId: exclusion.replacedByEpisodeId,
      replacedByMatch: exclusion.replacedByMatch,
    })),
  };
}

async function main(): Promise<void> {
  console.log("Football Time Machine — Replay link audit");
  console.log("Checking every replay source in the centralized library...\n");

  const report = await runAudit();

  fs.mkdirSync(REPORTS_DIR, { recursive: true });

  const jsonPath = path.join(REPORTS_DIR, "replay-audit.json");
  const mdPath = path.join(REPORTS_DIR, "replay-audit.md");
  const jsonContents = `${JSON.stringify(report, null, 2)}\n`;

  fs.writeFileSync(jsonPath, jsonContents, "utf8");
  fs.writeFileSync(mdPath, buildMarkdownReport(report), "utf8");

  const qaReport = buildQaReport(report.generatedAt);
  const qaJsonPath = path.join(REPORTS_DIR, "replay-qa.json");
  const qaJsonContents = `${JSON.stringify(qaReport, null, 2)}\n`;
  fs.writeFileSync(qaJsonPath, qaJsonContents, "utf8");

  console.log(`Wrote ${path.relative(ROOT, jsonPath)}`);
  console.log(`Wrote ${path.relative(ROOT, qaJsonPath)}`);
  console.log(`Wrote ${path.relative(ROOT, mdPath)}`);
  console.log("");
  console.log(`Total sources checked: ${report.summary.totalSourcesChecked}`);
  console.log(`Broken Dailymotion sources: ${report.summary.brokenDailymotion}`);
  console.log(
    `Matches with no verified replay: ${
      report.summary["usa-1994"].noVerifiedReplay +
      report.summary["france-1998"].noVerifiedReplay
    }`
  );
  console.log("");
  console.log("Open the dev audit page after starting the app:");
  console.log("  npm run dev");
  console.log("  http://localhost:3000/dev/replay-audit");
  console.log("  http://localhost:3000/dev/replay-qa");

  console.log("\nRunning replay integrity validation...");
  const validationErrors = validateAllCuratedReplays([
    { tournamentId: "usa-1994", episodes: usa1994Episodes },
    { tournamentId: "france-1998", episodes: france1998Episodes },
  ]);

  const archiveErrors = validateArchive({ strictProduction: true });

  if (validationErrors.length === 0 && archiveErrors.length === 0) {
    console.log("Replay integrity validation passed.");
    return;
  }

  const allErrors = [...validationErrors, ...archiveErrors];
  console.error(`\nReplay integrity validation failed (${allErrors.length} issue(s)):`);
  for (const error of allErrors) {
    const match =
      "matchNumber" in error && error.matchNumber !== undefined
        ? ` match ${String(error.matchNumber).padStart(2, "0")}`
        : "";
    const tournamentId = "tournamentId" in error ? error.tournamentId : "";
    const code = "code" in error ? error.code : "error";
    const message = "message" in error ? error.message : String(error);
    console.error(`  [${code}] ${tournamentId}${match}: ${message}`);
  }

  process.exit(1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
