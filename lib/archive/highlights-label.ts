import type { HighlightPackageKind } from "./types";

/**
 * User-facing CTA / button label for a highlights package.
 * Provider and package length stay in metadata — not in the primary button text.
 */
export function officialHighlightsLabel(
  _provider: string,
  _packageKind: HighlightPackageKind
): string {
  return "Highlights";
}

/** Audit / notes text — keeps provider context without surfacing it in the CTA. */
export function officialHighlightsNotes(
  provider: string,
  packageKind: HighlightPackageKind
): string {
  const kind =
    packageKind === "extended-highlights" ? "Extended highlights" : "Highlights";
  return `${kind} (${provider})`;
}
