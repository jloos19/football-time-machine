import type { CanonicalMatch, CanonicalReplaySource } from "./types";
import { teamsMatch, stageMatches } from "./fifa-normalize";
import {
  USA_1994_DAILYMOTION_VERIFIED_BY,
  USA_1994_FIFA_VERIFIED_BY,
  USA_1994_JOURNEY_MEMBERSHIP,
  USA_1994_REPLAY_CATALOG,
  type Usa1994JourneyMembershipEntry,
  type Usa1994ReplayCatalogEntry,
} from "./usa1994-replay-catalog";

export type Usa1994CatalogMapping = {
  entry: (typeof USA_1994_REPLAY_CATALOG)[number];
  match: CanonicalMatch;
};

export class Usa1994CatalogMappingError extends Error {
  constructor(
    public readonly title: string,
    message: string
  ) {
    super(message);
    this.name = "Usa1994CatalogMappingError";
  }
}

function groupMatches(
  entry: Pick<Usa1994ReplayCatalogEntry, "group"> | Pick<Usa1994JourneyMembershipEntry, "group">,
  match: CanonicalMatch
): boolean {
  if (!entry.group) return true;
  return match.group === entry.group;
}

export function findCanonicalMatchForUsa1994Entry(
  entry: Pick<Usa1994ReplayCatalogEntry, "title" | "teams" | "stage" | "group">,
  matches: CanonicalMatch[]
): CanonicalMatch {
  const found = matches.filter(
    (match) =>
      match.tournamentId === "usa-1994" &&
      teamsMatch(entry.teams[0], entry.teams[1], match.homeTeam, match.awayTeam) &&
      stageMatches(entry.stage, match.stage) &&
      groupMatches(entry, match)
  );

  if (found.length === 0) {
    throw new Usa1994CatalogMappingError(
      entry.title,
      `No canonical USA 1994 match found for "${entry.title}".`
    );
  }
  if (found.length > 1) {
    throw new Usa1994CatalogMappingError(
      entry.title,
      `Ambiguous mapping for "${entry.title}": ${found
        .map((m) => m.canonicalMatchId)
        .join(", ")}`
    );
  }
  return found[0]!;
}

export function mapUsa1994ReplayCatalog(
  matches: CanonicalMatch[]
): Usa1994CatalogMapping[] {
  return USA_1994_REPLAY_CATALOG.map((entry) => ({
    entry,
    match: findCanonicalMatchForUsa1994Entry(entry, matches),
  }));
}

function nextSourceId(match: CanonicalMatch): string {
  const used = new Set(match.replaySources.map((s) => s.id));
  let index = match.replaySources.length + 1;
  while (used.has(`${match.canonicalMatchId}-src-${index}`)) {
    index += 1;
  }
  return `${match.canonicalMatchId}-src-${index}`;
}

function demoteNonExactSources(match: CanonicalMatch, exactUrl: string): void {
  for (const source of match.replaySources) {
    if (source.url === exactUrl) continue;

    if (
      source.status === "dead" ||
      source.status === "wrong-match" ||
      source.status === "private"
    ) {
      if (source.humanVerification.status !== "failed") {
        source.humanVerification = {
          ...source.humanVerification,
          status: "failed",
          verifiedBy:
            source.humanVerification.verifiedBy ?? USA_1994_DAILYMOTION_VERIFIED_BY,
        };
      }
      continue;
    }

    source.status = "needs-review";
    source.humanVerification = {
      status: "failed",
      verifiedBy:
        source.provider === "FIFA"
          ? USA_1994_FIFA_VERIFIED_BY
          : USA_1994_DAILYMOTION_VERIFIED_BY,
      verifiedAt: source.humanVerification.verifiedAt,
      notes:
        "Superseded by manually curated USA 1994 Complete Tournament full-match URL; not production-selectable.",
    };
    source.notes =
      "Superseded by manually curated USA 1994 Complete Tournament full-match URL; retained as non-production fallback only.";
  }
}

function buildFifaSource(
  match: CanonicalMatch,
  url: string,
  verifiedAt: string,
  existingId?: string
): CanonicalReplaySource {
  return {
    id: existingId ?? nextSourceId(match),
    provider: "FIFA",
    url,
    status: "active",
    fullMatch: true,
    officialSource: true,
    automatedCheck: {
      status: "ok",
      lastChecked: verifiedAt.slice(0, 10),
      reason: "Official FIFA full-match replay; browser-extracted manual curation",
      recheckRecommended: false,
    },
    humanVerification: {
      status: "verified",
      verifiedBy: USA_1994_FIFA_VERIFIED_BY,
      verifiedAt,
      notes: "Official FIFA full-match replay (browser-extracted manual curation)",
    },
    notes: "Official FIFA full-match replay",
  };
}

function buildDailymotionSource(
  match: CanonicalMatch,
  url: string,
  verifiedAt: string,
  existingId?: string
): CanonicalReplaySource {
  return {
    id: existingId ?? nextSourceId(match),
    provider: "Dailymotion",
    url,
    status: "active",
    fullMatch: true,
    officialSource: false,
    automatedCheck: {
      status: "ok",
      lastChecked: verifiedAt.slice(0, 10),
      reason: "Human-verified Dailymotion full-match; manual curation",
      recheckRecommended: false,
    },
    humanVerification: {
      status: "verified",
      verifiedBy: USA_1994_DAILYMOTION_VERIFIED_BY,
      verifiedAt,
      notes: "Human-verified Dailymotion full-match (manual curation)",
    },
    notes: "Curated Complete Tournament Dailymotion full-match",
  };
}

export function applyUsa1994CatalogSource(
  match: CanonicalMatch,
  entry: Pick<Usa1994ReplayCatalogEntry, "url" | "provider">,
  verifiedAt: string
): CanonicalMatch {
  const updated = structuredClone(match);
  demoteNonExactSources(updated, entry.url);

  if (entry.provider === "FIFA") {
    const existingExact = updated.replaySources.find(
      (s) => s.provider === "FIFA" && s.url === entry.url
    );
    if (existingExact) {
      const refreshed = buildFifaSource(updated, entry.url, verifiedAt, existingExact.id);
      Object.assign(existingExact, refreshed);
      updated.preferredSourceId = existingExact.id;
    } else {
      const created = buildFifaSource(updated, entry.url, verifiedAt);
      updated.replaySources.unshift(created);
      updated.preferredSourceId = created.id;
    }
    return updated;
  }

  const existingExact = updated.replaySources.find(
    (s) => s.provider === "Dailymotion" && s.url === entry.url
  );
  const targetId = existingExact?.id ?? nextSourceId(updated);
  const refreshed = buildDailymotionSource(updated, entry.url, verifiedAt, targetId);
  if (existingExact) {
    Object.assign(existingExact, refreshed);
  } else {
    updated.replaySources.push(refreshed);
  }
  updated.preferredSourceId = targetId;
  return updated;
}

export function buildUsa1994JourneyIds(matches: CanonicalMatch[]): string[] {
  const journeyIds = new Set<string>();

  for (const entry of USA_1994_JOURNEY_MEMBERSHIP) {
    const match = findCanonicalMatchForUsa1994Entry(entry, matches);
    if (journeyIds.has(match.canonicalMatchId)) {
      throw new Error(
        `Duplicate Journey membership for "${entry.title}" → ${match.canonicalMatchId}`
      );
    }
    journeyIds.add(match.canonicalMatchId);
  }

  const journeyMatches = matches
    .filter(
      (m) => m.tournamentId === "usa-1994" && journeyIds.has(m.canonicalMatchId)
    )
    .sort((a, b) => a.chronologicalIndex - b.chronologicalIndex);

  if (journeyMatches.length !== 32) {
    throw new Error(
      `Expected 32 USA 1994 Journey matches, found ${journeyMatches.length}.`
    );
  }

  const groupStage = journeyMatches.filter((m) => m.stage === "Group Stage");
  const knockout = journeyMatches.filter((m) => m.stage !== "Group Stage");
  if (groupStage.length !== 16 || knockout.length !== 16) {
    throw new Error(
      `Expected Journey mix 16 group / 16 knockout, found ${groupStage.length} / ${knockout.length}.`
    );
  }

  const groupCounts: Record<string, number> = {
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    E: 0,
    F: 0,
  };
  for (const match of groupStage) {
    if (!match.group) {
      throw new Error(`Journey group-stage match ${match.canonicalMatchId} missing group.`);
    }
    groupCounts[match.group] = (groupCounts[match.group] ?? 0) + 1;
  }
  const expected = { A: 4, B: 2, C: 3, D: 3, E: 2, F: 2 };
  for (const [group, count] of Object.entries(expected)) {
    if (groupCounts[group] !== count) {
      throw new Error(
        `Expected Group ${group} Journey count ${count}, found ${groupCounts[group] ?? 0}.`
      );
    }
  }

  return journeyMatches.map((m) => m.canonicalMatchId);
}

export function applyUsa1994ReplayCatalogToArchive(
  matches: CanonicalMatch[],
  verifiedAt = new Date().toISOString()
): {
  matches: CanonicalMatch[];
  journeyIds: string[];
  mappings: Usa1994CatalogMapping[];
} {
  const mappings = mapUsa1994ReplayCatalog(matches);
  const mappedIds = mappings.map((m) => m.match.canonicalMatchId);
  if (new Set(mappedIds).size !== mappings.length) {
    const dupes = mappedIds.filter((id, i) => mappedIds.indexOf(id) !== i);
    throw new Error(
      `USA 1994 catalog maps multiple records to the same match: ${[...new Set(dupes)].join(", ")}`
    );
  }
  if (mappings.length !== 52) {
    throw new Error(`Expected 52 USA 1994 catalog mappings, found ${mappings.length}.`);
  }

  const byId = new Map(matches.map((m) => [m.canonicalMatchId, structuredClone(m)]));

  for (const { entry, match } of mappings) {
    const current = byId.get(match.canonicalMatchId)!;
    byId.set(
      match.canonicalMatchId,
      applyUsa1994CatalogSource(current, entry, verifiedAt)
    );
  }

  const updatedMatches = matches.map((m) => byId.get(m.canonicalMatchId) ?? m);
  const journeyIds = buildUsa1994JourneyIds(updatedMatches);

  for (const match of updatedMatches) {
    if (match.tournamentId !== "usa-1994") continue;
    const slot = journeyIds.indexOf(match.canonicalMatchId);
    if (slot === -1) {
      if (match.editorial) {
        const { journeyEpisodeId: _a, journeySlot: _b, ...rest } = match.editorial;
        match.editorial = Object.keys(rest).length > 0 ? rest : undefined;
      }
      continue;
    }
    match.editorial = {
      ...match.editorial,
      journeyEpisodeId: `usa-1994-${String(slot + 1).padStart(2, "0")}`,
      journeySlot: slot + 1,
    };
  }

  return { matches: updatedMatches, journeyIds, mappings };
}
