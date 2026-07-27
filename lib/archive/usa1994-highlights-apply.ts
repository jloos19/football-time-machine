import type { CanonicalHighlightSource, CanonicalMatch } from "./types";
import {
  officialHighlightsLabel,
  officialHighlightsNotes,
} from "./highlights-label";
import { findCanonicalMatchForUsa1994Entry } from "./usa1994-replay-apply";
import {
  USA_1994_HIGHLIGHTS_CATALOG,
  USA_1994_HIGHLIGHTS_VERIFIED_BY,
  type Usa1994HighlightsCatalogEntry,
} from "./usa1994-highlights-catalog";

export type Usa1994HighlightsMapping = {
  entry: (typeof USA_1994_HIGHLIGHTS_CATALOG)[number];
  match: CanonicalMatch;
};

export { officialHighlightsLabel, officialHighlightsNotes };

export function mapUsa1994HighlightsCatalog(
  matches: CanonicalMatch[]
): Usa1994HighlightsMapping[] {
  return USA_1994_HIGHLIGHTS_CATALOG.map((entry) => ({
    entry,
    match: findCanonicalMatchForUsa1994Entry(entry, matches),
  }));
}

function nextHighlightSourceId(match: CanonicalMatch): string {
  const used = new Set((match.highlightSources ?? []).map((s) => s.id));
  let index = (match.highlightSources?.length ?? 0) + 1;
  while (used.has(`${match.canonicalMatchId}-hl-${index}`)) {
    index += 1;
  }
  return `${match.canonicalMatchId}-hl-${index}`;
}

function buildHighlightSource(
  match: CanonicalMatch,
  entry: Pick<
    Usa1994HighlightsCatalogEntry,
    "url" | "provider" | "packageKind"
  >,
  verifiedAt: string,
  existingId?: string
): CanonicalHighlightSource {
  const notes = officialHighlightsNotes(entry.provider, entry.packageKind);
  return {
    id: existingId ?? nextHighlightSourceId(match),
    provider: entry.provider,
    url: entry.url,
    status: "active",
    packageKind: entry.packageKind,
    officialSource: entry.provider === "FIFA",
    automatedCheck: {
      status: "ok",
      lastChecked: verifiedAt.slice(0, 10),
      reason: `${notes}; browser-extracted manual curation`,
      recheckRecommended: false,
    },
    humanVerification: {
      status: "verified",
      verifiedBy: USA_1994_HIGHLIGHTS_VERIFIED_BY,
      verifiedAt,
      notes: `${notes} (browser-extracted manual curation)`,
    },
    notes,
  };
}

export function applyUsa1994HighlightsCatalogSource(
  match: CanonicalMatch,
  entry: Pick<
    Usa1994HighlightsCatalogEntry,
    "url" | "provider" | "packageKind"
  >,
  verifiedAt: string
): CanonicalMatch {
  const updated = structuredClone(match);
  const sources = updated.highlightSources ? [...updated.highlightSources] : [];

  const existingExact = sources.find(
    (s) => s.provider === entry.provider && s.url === entry.url
  );

  if (existingExact) {
    Object.assign(
      existingExact,
      buildHighlightSource(updated, entry, verifiedAt, existingExact.id)
    );
    updated.highlightSources = sources;
    updated.preferredHighlightSourceId = existingExact.id;
    return updated;
  }

  // Prefer a single production highlight URL per match — replace prior active
  // sources for the same provider so catalog re-applies are idempotent.
  const retained = sources.filter((s) => s.provider !== entry.provider);
  const created = buildHighlightSource(updated, entry, verifiedAt);
  updated.highlightSources = [created, ...retained];
  updated.preferredHighlightSourceId = created.id;
  return updated;
}

export function applyUsa1994HighlightsCatalogToArchive(
  matches: CanonicalMatch[],
  verifiedAt: string = new Date().toISOString()
): { matches: CanonicalMatch[]; mappings: Usa1994HighlightsMapping[] } {
  const mappings = mapUsa1994HighlightsCatalog(matches);
  const byId = new Map(matches.map((m) => [m.canonicalMatchId, structuredClone(m)]));

  for (const { entry, match } of mappings) {
    const current = byId.get(match.canonicalMatchId);
    if (!current) continue;
    byId.set(
      match.canonicalMatchId,
      applyUsa1994HighlightsCatalogSource(current, entry, verifiedAt)
    );
  }

  return {
    matches: matches.map(
      (m) => byId.get(m.canonicalMatchId) ?? structuredClone(m)
    ),
    mappings,
  };
}
