import type { CanonicalMatch, CanonicalReplaySource } from "./types";
import { teamsMatch, stageMatches } from "./fifa-normalize";
import {
  FRANCE_1998_COMPLETE_COVERAGE_REPLAYS,
  FRANCE_1998_DAILYMOTION_VERIFIED_BY,
  FRANCE_1998_FIFA_REPLAYS,
  FRANCE_1998_FIFA_VERIFIED_BY,
  FRANCE_1998_JOURNEY_DAILYMOTION_EXTRAS,
  FRANCE_1998_JOURNEY_FIFA_EXCLUSIONS,
  FRANCE_1998_RETIRED_JOURNEY_DAILYMOTION_SOURCES,
  type France1998CompleteCoverageEntry,
  type France1998FifaCatalogEntry,
} from "./france1998-fifa-catalog";

function isProductionReadySource(source: CanonicalReplaySource): boolean {
  return (
    source.status === "active" &&
    source.fullMatch &&
    source.humanVerification.status === "verified"
  );
}

export type FifaCatalogMapping = {
  entry: (typeof FRANCE_1998_FIFA_REPLAYS)[number];
  match: CanonicalMatch;
};

export type CompleteCoverageMapping = {
  entry: (typeof FRANCE_1998_COMPLETE_COVERAGE_REPLAYS)[number];
  match: CanonicalMatch;
};

export class FifaCatalogMappingError extends Error {
  constructor(public readonly title: string, message: string) {
    super(message);
    this.name = "FifaCatalogMappingError";
  }
}

function groupMatches(
  entry: Pick<France1998FifaCatalogEntry, "group">,
  match: CanonicalMatch
): boolean {
  if (!entry.group) return true;
  return match.group === entry.group;
}

export function findCanonicalMatchForFifaEntry(
  entry: Pick<France1998FifaCatalogEntry, "title" | "teams" | "stage" | "group">,
  matches: CanonicalMatch[]
): CanonicalMatch {
  const found = matches.filter(
    (match) =>
      match.tournamentId === "france-1998" &&
      teamsMatch(entry.teams[0], entry.teams[1], match.homeTeam, match.awayTeam) &&
      stageMatches(entry.stage, match.stage) &&
      groupMatches(entry, match)
  );

  if (found.length === 0) {
    throw new FifaCatalogMappingError(
      entry.title,
      `No canonical France 1998 match found for "${entry.title}".`
    );
  }
  if (found.length > 1) {
    throw new FifaCatalogMappingError(
      entry.title,
      `Ambiguous mapping for "${entry.title}": ${found
        .map((m) => m.canonicalMatchId)
        .join(", ")}`
    );
  }
  return found[0]!;
}

export function findCanonicalMatchForCompleteCoverageEntry(
  entry: Pick<
    France1998CompleteCoverageEntry,
    "title" | "teams" | "stage" | "group"
  >,
  matches: CanonicalMatch[]
): CanonicalMatch {
  return findCanonicalMatchForFifaEntry(entry, matches);
}

export function mapFrance1998FifaCatalog(
  matches: CanonicalMatch[]
): FifaCatalogMapping[] {
  return FRANCE_1998_FIFA_REPLAYS.map((entry) => ({
    entry,
    match: findCanonicalMatchForFifaEntry(entry, matches),
  }));
}

export function mapFrance1998CompleteCoverage(
  matches: CanonicalMatch[]
): CompleteCoverageMapping[] {
  return FRANCE_1998_COMPLETE_COVERAGE_REPLAYS.map((entry) => ({
    entry,
    match: findCanonicalMatchForCompleteCoverageEntry(entry, matches),
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

function demoteNonExactFifaSources(
  match: CanonicalMatch,
  exactUrl: string
): void {
  for (const source of match.replaySources) {
    if (source.provider !== "FIFA") continue;
    if (source.url === exactUrl) continue;
    source.status = "needs-review";
    source.humanVerification = {
      status: "failed",
      verifiedBy: FRANCE_1998_FIFA_VERIFIED_BY,
      verifiedAt: source.humanVerification.verifiedAt,
      notes:
        "Superseded by browser-extracted fifa.com/en/watch full-match URL; not production-selectable.",
    };
    source.notes =
      "Replaced by curated browser-extracted FIFA full-match URL; retained as non-production fallback only.";
  }
}

function demoteConflictingSources(
  match: CanonicalMatch,
  exactUrl: string,
  preferredProvider: "FIFA" | "Dailymotion"
): void {
  for (const source of match.replaySources) {
    if (source.url === exactUrl) continue;

    const isCompetingProvider =
      source.provider === preferredProvider ||
      source.provider === "FIFA" ||
      source.provider === "Dailymotion" ||
      source.provider === "YouTube" ||
      source.provider === "Official broadcaster";

    if (!isCompetingProvider) continue;

    // Keep explicitly retired statuses (dead / wrong-match / private) as-is.
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
            source.humanVerification.verifiedBy ??
            FRANCE_1998_DAILYMOTION_VERIFIED_BY,
        };
      }
      continue;
    }

    source.status = "needs-review";
    source.humanVerification = {
      status: "failed",
      verifiedBy:
        preferredProvider === "FIFA"
          ? FRANCE_1998_FIFA_VERIFIED_BY
          : FRANCE_1998_DAILYMOTION_VERIFIED_BY,
      verifiedAt: source.humanVerification.verifiedAt,
      notes:
        "Superseded by manually curated Complete Tournament full-match URL; not production-selectable.",
    };
    source.notes =
      "Superseded by manually curated Complete Tournament full-match URL; retained as non-production fallback only.";
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
      verifiedBy: FRANCE_1998_FIFA_VERIFIED_BY,
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
  existingId?: string,
  notes = "Curated Complete Tournament Dailymotion full-match"
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
      verifiedBy: FRANCE_1998_DAILYMOTION_VERIFIED_BY,
      verifiedAt,
      notes: "Human-verified Dailymotion full-match (manual curation)",
    },
    notes,
  };
}

export function applyFifaCatalogSource(
  match: CanonicalMatch,
  url: string,
  verifiedAt: string
): CanonicalMatch {
  const updated = structuredClone(match);
  demoteNonExactFifaSources(updated, url);

  const existingExact = updated.replaySources.find(
    (s) => s.provider === "FIFA" && s.url === url
  );

  if (existingExact) {
    const refreshed = buildFifaSource(updated, url, verifiedAt, existingExact.id);
    Object.assign(existingExact, refreshed);
    updated.preferredSourceId = existingExact.id;
  } else {
    const created = buildFifaSource(updated, url, verifiedAt);
    updated.replaySources.unshift(created);
    updated.preferredSourceId = created.id;
  }

  return updated;
}

/** Prefer a curated Dailymotion URL and demote competing non-exact sources. */
export function preferVerifiedDailymotion(
  match: CanonicalMatch,
  url: string,
  verifiedAt: string,
  notes = "Curated Journey Dailymotion full-match"
): CanonicalMatch {
  const updated = structuredClone(match);
  demoteConflictingSources(updated, url, "Dailymotion");

  const existingExact = updated.replaySources.find(
    (s) => s.provider === "Dailymotion" && s.url === url
  );
  const targetId = existingExact?.id ?? nextSourceId(updated);

  const refreshed = buildDailymotionSource(
    updated,
    url,
    verifiedAt,
    targetId,
    notes
  );

  if (existingExact) {
    Object.assign(existingExact, refreshed);
  } else {
    updated.replaySources.push(refreshed);
  }

  updated.preferredSourceId = targetId;
  return updated;
}

export function applyCompleteCoverageSource(
  match: CanonicalMatch,
  entry: Pick<France1998CompleteCoverageEntry, "url" | "provider">,
  verifiedAt: string
): CanonicalMatch {
  if (entry.provider === "FIFA") {
    const updated = structuredClone(match);
    demoteConflictingSources(updated, entry.url, "FIFA");

    const existingExact = updated.replaySources.find(
      (s) => s.provider === "FIFA" && s.url === entry.url
    );
    if (existingExact) {
      const refreshed = buildFifaSource(
        updated,
        entry.url,
        verifiedAt,
        existingExact.id
      );
      Object.assign(existingExact, refreshed);
      updated.preferredSourceId = existingExact.id;
    } else {
      const created = buildFifaSource(updated, entry.url, verifiedAt);
      updated.replaySources.unshift(created);
      updated.preferredSourceId = created.id;
    }
    return updated;
  }

  return preferVerifiedDailymotion(
    match,
    entry.url,
    verifiedAt,
    "Curated Complete Tournament Dailymotion full-match"
  );
}

/** Mark retired Journey Dailymotion sources dead / wrong-match and clear preferred if needed. */
export function retireFrance1998JourneyDailymotionSources(
  match: CanonicalMatch,
  verifiedAt: string
): CanonicalMatch {
  const retired = FRANCE_1998_RETIRED_JOURNEY_DAILYMOTION_SOURCES.filter(
    (entry) => entry.canonicalMatchId === match.canonicalMatchId
  );
  if (retired.length === 0) return match;

  const updated = structuredClone(match);
  for (const entry of retired) {
    for (const source of updated.replaySources) {
      if (source.provider !== "Dailymotion" || source.url !== entry.url) continue;
      source.status = entry.status;
      source.humanVerification = {
        status: "failed",
        verifiedBy: FRANCE_1998_DAILYMOTION_VERIFIED_BY,
        verifiedAt,
        notes: entry.reason,
      };
      source.notes = entry.reason;
      if (updated.preferredSourceId === source.id) {
        delete updated.preferredSourceId;
      }
    }
  }
  return updated;
}

export function buildFrance1998JourneyIds(
  matches: CanonicalMatch[]
): string[] {
  const mappings = mapFrance1998FifaCatalog(matches);
  const excludedFifa = new Set<string>(FRANCE_1998_JOURNEY_FIFA_EXCLUSIONS);
  const fifaIds = new Set(
    mappings
      .map((m) => m.match.canonicalMatchId)
      .filter((id) => !excludedFifa.has(id))
  );
  const extraIds: Set<string> = new Set(
    FRANCE_1998_JOURNEY_DAILYMOTION_EXTRAS.map((e) => e.canonicalMatchId)
  );

  for (const id of excludedFifa) {
    const match = matches.find((m) => m.canonicalMatchId === id);
    if (!match) {
      throw new Error(`Missing Journey FIFA exclusion match ${id}.`);
    }
  }

  for (const id of extraIds) {
    if (fifaIds.has(id)) {
      throw new Error(
        `Dailymotion Journey extra ${id} is also in the FIFA Journey set.`
      );
    }
    if (excludedFifa.has(id)) {
      throw new Error(
        `Dailymotion Journey extra ${id} is also listed as a FIFA Journey exclusion.`
      );
    }
    const match = matches.find((m) => m.canonicalMatchId === id);
    if (!match) {
      throw new Error(`Missing Dailymotion Journey extra match ${id}.`);
    }
    if (match.stage !== "Group Stage") {
      throw new Error(`Dailymotion Journey extra ${id} must be group stage.`);
    }
    const dm = match.replaySources.find(
      (s) => s.provider === "Dailymotion" && isProductionReadySource(s)
    );
    if (!dm) {
      throw new Error(
        `Dailymotion Journey extra ${id} lacks an active human-verified full-match Dailymotion source.`
      );
    }
  }

  const journeyMatches = matches
    .filter(
      (m) =>
        m.tournamentId === "france-1998" &&
        (fifaIds.has(m.canonicalMatchId) || extraIds.has(m.canonicalMatchId))
    )
    .sort((a, b) => a.chronologicalIndex - b.chronologicalIndex);

  if (journeyMatches.length !== 36) {
    throw new Error(
      `Expected 36 Journey matches after FIFA catalog rebuild, found ${journeyMatches.length}.`
    );
  }

  const groupStage = journeyMatches.filter((m) => m.stage === "Group Stage");
  const knockout = journeyMatches.filter((m) => m.stage !== "Group Stage");
  if (groupStage.length !== 20 || knockout.length !== 16) {
    throw new Error(
      `Expected Journey mix 20 group / 16 knockout, found ${groupStage.length} / ${knockout.length}.`
    );
  }

  return journeyMatches.map((m) => m.canonicalMatchId);
}

export function applyFrance1998FifaCatalogToArchive(
  matches: CanonicalMatch[],
  verifiedAt = new Date().toISOString()
): {
  matches: CanonicalMatch[];
  journeyIds: string[];
  mappings: FifaCatalogMapping[];
  coverageMappings: CompleteCoverageMapping[];
} {
  const mappings = mapFrance1998FifaCatalog(matches);
  const coverageMappings = mapFrance1998CompleteCoverage(matches);
  const byId = new Map(matches.map((m) => [m.canonicalMatchId, structuredClone(m)]));

  // 1. Official FIFA Collection (34) — preferred on those matches.
  for (const { entry, match } of mappings) {
    const current = byId.get(match.canonicalMatchId)!;
    byId.set(
      match.canonicalMatchId,
      applyFifaCatalogSource(current, entry.url, verifiedAt)
    );
  }

  // 2. Remaining Complete Tournament coverage (28) — must not outrank catalog FIFA.
  const catalogIds = new Set(mappings.map((m) => m.match.canonicalMatchId));
  for (const { entry, match } of coverageMappings) {
    if (catalogIds.has(match.canonicalMatchId)) {
      throw new Error(
        `Complete coverage entry "${entry.title}" overlaps Official FIFA Collection match ${match.canonicalMatchId}.`
      );
    }
    const current = byId.get(match.canonicalMatchId)!;
    byId.set(
      match.canonicalMatchId,
      applyCompleteCoverageSource(current, entry, verifiedAt)
    );
  }

  // 3. Journey Dailymotion extras — ensure preferred DM URLs for Journey slots.
  for (const extra of FRANCE_1998_JOURNEY_DAILYMOTION_EXTRAS) {
    const current = byId.get(extra.canonicalMatchId);
    if (!current) {
      throw new Error(`Missing Journey Dailymotion extra ${extra.canonicalMatchId}`);
    }
    byId.set(
      extra.canonicalMatchId,
      preferVerifiedDailymotion(current, extra.url, verifiedAt, extra.reason)
    );
  }

  // 4. Retire known-bad former Journey Dailymotion sources.
  for (const retired of FRANCE_1998_RETIRED_JOURNEY_DAILYMOTION_SOURCES) {
    const current = byId.get(retired.canonicalMatchId);
    if (!current) {
      throw new Error(`Missing retired Journey match ${retired.canonicalMatchId}`);
    }
    byId.set(
      retired.canonicalMatchId,
      retireFrance1998JourneyDailymotionSources(current, verifiedAt)
    );
  }

  const updatedMatches = matches.map((m) => byId.get(m.canonicalMatchId) ?? m);
  const journeyIds = buildFrance1998JourneyIds(updatedMatches);

  // Rebuild editorial journey slots chronologically for Journey members only.
  for (const match of updatedMatches) {
    const slot = journeyIds.indexOf(match.canonicalMatchId);
    if (slot === -1) {
      if (match.editorial) {
        const { journeyEpisodeId: _a, journeySlot: _b, ...rest } = match.editorial;
        match.editorial =
          Object.keys(rest).length > 0
            ? rest
            : undefined;
      }
      continue;
    }
    match.editorial = {
      ...match.editorial,
      journeyEpisodeId: `france-1998-${String(slot + 1).padStart(2, "0")}`,
      journeySlot: slot + 1,
    };
  }

  return { matches: updatedMatches, journeyIds, mappings, coverageMappings };
}
