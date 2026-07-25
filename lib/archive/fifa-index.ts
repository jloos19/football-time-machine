import { usa1994Matches } from "./matches/usa1994";
import { france1998Matches } from "./matches/france1998";
import type { CanonicalMatch } from "./types";
import type {
  FifaArchiveIndex,
  FifaArchiveIndexItem,
  FifaMatchCandidate,
  FifaMatchQuery,
} from "./fifa-types";
import {
  normalizeTeamName,
  normalizeTournamentLabel,
  parseStageFromTitle,
  parseTeamsFromTitle,
  parseTournamentYear,
  stageMatches,
  teamsMatch,
  titleLooksLikeFullMatch,
} from "./fifa-normalize";
import { normalizeFifaUrl, parseFifaUrl, titleFromFifaSlug } from "./fifa-url";
import { FIFA_RECOVERY_SEEDS } from "./fifa-seeds";

const ALL_MATCHES: CanonicalMatch[] = [...usa1994Matches, ...france1998Matches];

export const FIFA_ARCHIVE_INDEX_PATH = "data/replay-qa/fifa-archive-index.json";

export function emptyFifaArchiveIndex(generatedAt = new Date().toISOString()): FifaArchiveIndex {
  return { version: 1, generatedAt, items: [] };
}

function tournamentLabelForMatch(match: CanonicalMatch): string {
  return match.tournamentId === "usa-1994"
    ? "1994 FIFA World Cup USA™"
    : "1998 FIFA World Cup France™";
}

function tournamentYearForMatch(match: CanonicalMatch): number {
  return match.tournamentId === "usa-1994" ? 1994 : 1998;
}

function indexItemKey(item: Pick<FifaArchiveIndexItem, "canonicalUrl">): string {
  return normalizeFifaUrl(item.canonicalUrl);
}

function buildIndexItemFromArchiveSource(
  match: CanonicalMatch,
  url: string
): FifaArchiveIndexItem | null {
  const parsed = parseFifaUrl(url);
  if (!parsed) return null;

  const titleParts = [
    `${match.homeTeam} v ${match.awayTeam}`,
    match.stage,
    tournamentLabelForMatch(match),
    "Full Match Replay",
  ];

  return {
    fifaContentId: parsed.fifaContentId,
    uuid: parsed.uuid,
    canonicalUrl: parsed.canonicalUrl,
    title: titleParts.join(" | "),
    tournament: tournamentLabelForMatch(match),
    tournamentYear: tournamentYearForMatch(match),
    homeTeam: match.homeTeam,
    awayTeam: match.awayTeam,
    stage: match.stage,
    fullMatchReplay: true,
    discoveredAt: new Date().toISOString(),
    discoveryMethod: "archive-library",
    metadataSource: "archive-match",
    humanVerification: { status: "untested" },
    canonicalMatchId: match.canonicalMatchId,
  };
}

function buildIndexItemFromSeed(seed: (typeof FIFA_RECOVERY_SEEDS)[number]): FifaArchiveIndexItem {
  const parsed = parseFifaUrl(seed.url);
  if (!parsed) {
    throw new Error(`Invalid FIFA seed URL: ${seed.url}`);
  }

  return {
    fifaContentId: parsed.fifaContentId,
    uuid: parsed.uuid,
    canonicalUrl: parsed.canonicalUrl,
    alternateLocaleUrls: seed.alternateLocaleUrls,
    title: seed.title,
    tournament: seed.tournament,
    tournamentYear: seed.tournamentYear,
    homeTeam: seed.homeTeam,
    awayTeam: seed.awayTeam,
    stage: seed.stage,
    durationSeconds: seed.durationSeconds,
    fullMatchReplay: seed.fullMatchReplay,
    discoveredAt: new Date().toISOString(),
    discoveryMethod: "seed-catalog",
    metadataSource: seed.metadataSource ?? "manual",
    humanVerification: { status: "untested" },
    canonicalMatchId: seed.canonicalMatchId,
    confidenceNotes: seed.notes,
  };
}

function buildIndexItemFromManualUrl(url: string, title?: string): FifaArchiveIndexItem | null {
  const parsed = parseFifaUrl(url);
  if (!parsed) return null;

  const slugTitle = parsed.slug ? titleFromFifaSlug(parsed.slug) : undefined;
  const resolvedTitle = title ?? slugTitle ?? url;
  const teams = parseTeamsFromTitle(resolvedTitle);
  const stage = parseStageFromTitle(resolvedTitle) ?? "Group Stage";
  const tournamentYear = parseTournamentYear(resolvedTitle) ?? 1998;

  return {
    fifaContentId: parsed.fifaContentId,
    uuid: parsed.uuid,
    canonicalUrl: parsed.canonicalUrl,
    title: resolvedTitle,
    tournament:
      tournamentYear === 1994
        ? "1994 FIFA World Cup USA™"
        : "1998 FIFA World Cup France™",
    tournamentYear,
    homeTeam: teams.homeTeam ?? "Unknown",
    awayTeam: teams.awayTeam ?? "Unknown",
    stage,
    fullMatchReplay: titleLooksLikeFullMatch(resolvedTitle),
    discoveredAt: new Date().toISOString(),
    discoveryMethod: "manual-url",
    metadataSource: parsed.slug ? "url-slug" : "manual",
    humanVerification: { status: "untested" },
  };
}

export function mergeFifaIndexItems(
  existing: FifaArchiveIndexItem[],
  incoming: FifaArchiveIndexItem[]
): FifaArchiveIndexItem[] {
  const byUrl = new Map<string, FifaArchiveIndexItem>();
  for (const item of existing) {
    byUrl.set(indexItemKey(item), item);
  }
  for (const item of incoming) {
    const key = indexItemKey(item);
    const prior = byUrl.get(key);
    byUrl.set(key, prior ? { ...prior, ...item, discoveredAt: item.discoveredAt } : item);
  }
  return [...byUrl.values()].sort((a, b) => a.title.localeCompare(b.title));
}

export function buildFifaArchiveIndexFromArchive(): FifaArchiveIndexItem[] {
  const items: FifaArchiveIndexItem[] = [];
  for (const match of ALL_MATCHES) {
    for (const source of match.replaySources) {
      if (source.provider !== "FIFA") continue;
      const item = buildIndexItemFromArchiveSource(match, source.url);
      if (item) items.push(item);
    }
  }
  return items;
}

export function buildFifaArchiveIndexFromSeeds(): FifaArchiveIndexItem[] {
  return FIFA_RECOVERY_SEEDS.map(buildIndexItemFromSeed);
}

export function buildFifaArchiveIndex(options?: {
  manualUrls?: string[];
  existing?: FifaArchiveIndex;
}): FifaArchiveIndex {
  const fromArchive = buildFifaArchiveIndexFromArchive();
  const fromSeeds = buildFifaArchiveIndexFromSeeds();
  const fromManual = (options?.manualUrls ?? [])
    .map((url) => buildIndexItemFromManualUrl(url))
    .filter((item): item is FifaArchiveIndexItem => item != null);

  return {
    version: 1,
    generatedAt: new Date().toISOString(),
    items: mergeFifaIndexItems(options?.existing?.items ?? [], [
      ...fromArchive,
      ...fromSeeds,
      ...fromManual,
    ]),
  };
}

export function scoreFifaIndexMatch(
  query: FifaMatchQuery,
  item: FifaArchiveIndexItem
): FifaMatchCandidate | null {
  const reasons: string[] = [];
  let score = 0;

  if (query.tournamentYear !== item.tournamentYear) {
    return null;
  }
  score += 20;
  reasons.push("tournament-year");

  if (!teamsMatch(query.homeTeam, query.awayTeam, item.homeTeam, item.awayTeam)) {
    return null;
  }
  score += 40;
  reasons.push("teams");

  if (stageMatches(query.stage, String(item.stage))) {
    score += 20;
    reasons.push("stage");
  } else {
    score -= 10;
    reasons.push("stage-mismatch");
  }

  if (item.fullMatchReplay) {
    score += 15;
    reasons.push("full-match-replay");
  } else {
    score -= 25;
    reasons.push("not-full-match");
  }

  if (item.canonicalMatchId === query.canonicalMatchId) {
    score += 10;
    reasons.push("canonical-match-id");
  }

  const normalizedTitle = normalizeTournamentLabel(item.title);
  const home = normalizeTeamName(query.homeTeam);
  const away = normalizeTeamName(query.awayTeam);
  if (normalizedTitle.includes(home) && normalizedTitle.includes(away)) {
    score += 5;
    reasons.push("title-teams");
  }

  return { indexItem: item, confidence: score, matchReasons: reasons };
}

export function findBestFifaIndexMatches(
  query: FifaMatchQuery,
  index: FifaArchiveIndex,
  minConfidence = 60
): FifaMatchCandidate[] {
  return index.items
    .map((item) => scoreFifaIndexMatch(query, item))
    .filter((candidate): candidate is FifaMatchCandidate => candidate != null)
    .filter((candidate) => candidate.confidence >= minConfidence)
    .sort((a, b) => b.confidence - a.confidence);
}

export function findBestFifaIndexMatch(
  query: FifaMatchQuery,
  index: FifaArchiveIndex,
  minConfidence = 60
): FifaMatchCandidate | null {
  return findBestFifaIndexMatches(query, index, minConfidence)[0] ?? null;
}

export function toFifaMatchQuery(match: CanonicalMatch): FifaMatchQuery {
  return {
    tournamentId: match.tournamentId,
    canonicalMatchId: match.canonicalMatchId,
    homeTeam: match.homeTeam,
    awayTeam: match.awayTeam,
    stage: match.stage,
    tournamentYear: tournamentYearForMatch(match),
  };
}
