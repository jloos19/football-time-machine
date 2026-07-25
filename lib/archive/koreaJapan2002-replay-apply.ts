import type { CanonicalMatch, CanonicalReplaySource } from "./types";
import { teamsMatch, stageMatches } from "./fifa-normalize";
import {
  KOREA_JAPAN_2002_DAILYMOTION_VERIFIED_BY,
  KOREA_JAPAN_2002_FIFA_VERIFIED_BY,
  KOREA_JAPAN_2002_REPLAY_CATALOG,
  type KoreaJapan2002ReplayCatalogEntry,
} from "./koreaJapan2002-replay-catalog";

export type KoreaJapan2002CatalogMapping = {
  entry: (typeof KOREA_JAPAN_2002_REPLAY_CATALOG)[number];
  match: CanonicalMatch;
};

export class KoreaJapan2002CatalogMappingError extends Error {
  constructor(
    public readonly title: string,
    message: string
  ) {
    super(message);
    this.name = "KoreaJapan2002CatalogMappingError";
  }
}

function groupMatches(
  entry: Pick<KoreaJapan2002ReplayCatalogEntry, "group">,
  match: CanonicalMatch
): boolean {
  if (!entry.group) return true;
  return match.group === entry.group;
}

export function findCanonicalMatchForKoreaJapan2002Entry(
  entry: Pick<KoreaJapan2002ReplayCatalogEntry, "title" | "teams" | "stage" | "group">,
  matches: CanonicalMatch[]
): CanonicalMatch {
  const found = matches.filter(
    (match) =>
      match.tournamentId === "korea-japan-2002" &&
      teamsMatch(entry.teams[0], entry.teams[1], match.homeTeam, match.awayTeam) &&
      stageMatches(entry.stage, match.stage) &&
      groupMatches(entry, match)
  );

  if (found.length === 0) {
    throw new KoreaJapan2002CatalogMappingError(
      entry.title,
      `No canonical Korea/Japan 2002 match found for "${entry.title}".`
    );
  }
  if (found.length > 1) {
    throw new KoreaJapan2002CatalogMappingError(
      entry.title,
      `Ambiguous mapping for "${entry.title}": ${found
        .map((m) => m.canonicalMatchId)
        .join(", ")}`
    );
  }
  return found[0]!;
}

export function mapKoreaJapan2002ReplayCatalog(
  matches: CanonicalMatch[]
): KoreaJapan2002CatalogMapping[] {
  return KOREA_JAPAN_2002_REPLAY_CATALOG.map((entry) => ({
    entry,
    match: findCanonicalMatchForKoreaJapan2002Entry(entry, matches),
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
            source.humanVerification.verifiedBy ??
            KOREA_JAPAN_2002_DAILYMOTION_VERIFIED_BY,
        };
      }
      continue;
    }

    source.status = "needs-review";
    source.humanVerification = {
      status: "failed",
      verifiedBy:
        source.provider === "FIFA"
          ? KOREA_JAPAN_2002_FIFA_VERIFIED_BY
          : KOREA_JAPAN_2002_DAILYMOTION_VERIFIED_BY,
      verifiedAt: source.humanVerification.verifiedAt,
      notes:
        "Superseded by manually curated Korea/Japan 2002 Complete Tournament full-match URL; not production-selectable.",
    };
    source.notes =
      "Superseded by manually curated Korea/Japan 2002 Complete Tournament full-match URL; retained as non-production fallback only.";
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
      verifiedBy: KOREA_JAPAN_2002_FIFA_VERIFIED_BY,
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
      verifiedBy: KOREA_JAPAN_2002_DAILYMOTION_VERIFIED_BY,
      verifiedAt,
      notes: "Human-verified Dailymotion full-match (manual curation)",
    },
    notes: "Curated Complete Tournament Dailymotion full-match",
  };
}

export function applyKoreaJapan2002CatalogSource(
  match: CanonicalMatch,
  entry: Pick<KoreaJapan2002ReplayCatalogEntry, "url" | "provider">,
  verifiedAt: string
): CanonicalMatch {
  const updated = structuredClone(match);
  demoteNonExactSources(updated, entry.url);

  if (entry.provider === "FIFA") {
    const existingExact = updated.replaySources.find(
      (s) => s.provider === "FIFA" && s.url === entry.url
    );
    if (existingExact) {
      // Preserve already-verified exact FIFA URLs; only refresh QA fields.
      const preservedAt =
        existingExact.humanVerification.status === "verified" &&
        existingExact.humanVerification.verifiedAt
          ? existingExact.humanVerification.verifiedAt
          : verifiedAt;
      const refreshed = buildFifaSource(
        updated,
        entry.url,
        preservedAt,
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

  const existingExact = updated.replaySources.find(
    (s) => s.provider === "Dailymotion" && s.url === entry.url
  );
  if (existingExact) {
    const preservedAt =
      existingExact.humanVerification.status === "verified" &&
      existingExact.humanVerification.verifiedAt
        ? existingExact.humanVerification.verifiedAt
        : verifiedAt;
    const refreshed = buildDailymotionSource(
      updated,
      entry.url,
      preservedAt,
      existingExact.id
    );
    Object.assign(existingExact, refreshed);
    updated.preferredSourceId = existingExact.id;
  } else {
    const created = buildDailymotionSource(updated, entry.url, verifiedAt);
    updated.replaySources.push(created);
    updated.preferredSourceId = created.id;
  }
  return updated;
}

export function applyKoreaJapan2002ReplayCatalogToArchive(
  matches: CanonicalMatch[],
  verifiedAt = new Date().toISOString()
): {
  matches: CanonicalMatch[];
  mappings: KoreaJapan2002CatalogMapping[];
} {
  const mappings = mapKoreaJapan2002ReplayCatalog(matches);
  const mappedIds = mappings.map((m) => m.match.canonicalMatchId);
  if (new Set(mappedIds).size !== mappings.length) {
    const dupes = mappedIds.filter((id, i) => mappedIds.indexOf(id) !== i);
    throw new Error(
      `Korea/Japan 2002 catalog maps multiple records to the same match: ${[
        ...new Set(dupes),
      ].join(", ")}`
    );
  }
  if (mappings.length !== 64) {
    throw new Error(
      `Expected 64 Korea/Japan 2002 catalog mappings, found ${mappings.length}.`
    );
  }
  const byId = new Map(matches.map((m) => [m.canonicalMatchId, structuredClone(m)]));
  for (const { entry, match } of mappings) {
    const current = byId.get(match.canonicalMatchId)!;
    byId.set(
      match.canonicalMatchId,
      applyKoreaJapan2002CatalogSource(current, entry, verifiedAt)
    );
  }

  const updatedMatches = matches.map((m) => {
    const updated = byId.get(m.canonicalMatchId) ?? m;
    if (updated.tournamentId !== "korea-japan-2002") return updated;
    const preferred = updated.replaySources.find(
      (s) => s.id === updated.preferredSourceId
    );
    const ready =
      preferred != null &&
      preferred.status === "active" &&
      preferred.fullMatch &&
      preferred.humanVerification.status === "verified";
    updated.qaState = {
      ...updated.qaState,
      hasHumanVerifiedFullMatch: ready,
      productionReady: ready,
    };
    return updated;
  });

  return {
    matches: updatedMatches,
    mappings,
  };
}
