import type { CanonicalHighlightSource, CanonicalMatch } from "./types";
import { findCanonicalMatchForFifaEntry } from "./france1998-fifa-apply";
import {
  FRANCE_1998_HIGHLIGHTS_CATALOG,
  FRANCE_1998_HIGHLIGHTS_VERIFIED_BY,
  type France1998HighlightsCatalogEntry,
} from "./france1998-highlights-catalog";
import {
  officialHighlightsLabel,
  officialHighlightsNotes,
} from "./highlights-label";

export type France1998HighlightsMapping = {
  entry: (typeof FRANCE_1998_HIGHLIGHTS_CATALOG)[number];
  match: CanonicalMatch;
};

export { officialHighlightsLabel, officialHighlightsNotes };

export function mapFrance1998HighlightsCatalog(
  matches: CanonicalMatch[]
): France1998HighlightsMapping[] {
  return FRANCE_1998_HIGHLIGHTS_CATALOG.map((entry) => ({
    entry,
    match: findCanonicalMatchForFifaEntry(entry, matches),
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
    France1998HighlightsCatalogEntry,
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
      verifiedBy: FRANCE_1998_HIGHLIGHTS_VERIFIED_BY,
      verifiedAt,
      notes: `${notes} (browser-extracted manual curation)`,
    },
    notes,
  };
}

export function applyFrance1998HighlightsCatalogSource(
  match: CanonicalMatch,
  entry: Pick<
    France1998HighlightsCatalogEntry,
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

export function applyFrance1998HighlightsCatalogToArchive(
  matches: CanonicalMatch[],
  verifiedAt: string = new Date().toISOString()
): { matches: CanonicalMatch[]; mappings: France1998HighlightsMapping[] } {
  const mappings = mapFrance1998HighlightsCatalog(matches);
  const byId = new Map(
    matches.map((m) => [m.canonicalMatchId, structuredClone(m)])
  );

  for (const { entry, match } of mappings) {
    const current = byId.get(match.canonicalMatchId);
    if (!current) continue;
    byId.set(
      match.canonicalMatchId,
      applyFrance1998HighlightsCatalogSource(current, entry, verifiedAt)
    );
  }

  return {
    matches: matches.map(
      (m) => byId.get(m.canonicalMatchId) ?? structuredClone(m)
    ),
    mappings,
  };
}
