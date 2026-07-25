import type { ExperienceKind, TournamentId } from "./types";

export type QaMatchRow = {
  tournamentId: TournamentId;
  canonicalMatchId: string;
  chronologicalIndex: number;
  officialMatchNumber?: number;
  teams: string;
  date: string;
  stage: string;
  experiences: ExperienceKind[];
  preferredSource: {
    id: string;
    provider: string;
    url: string;
    humanStatus: string;
    automatedStatus: string;
    recheckRecommended: boolean;
  } | null;
  alternativeSources: Array<{
    id: string;
    provider: string;
    url: string;
    status: string;
    humanStatus: string;
    automatedStatus: string;
    fullMatch: boolean;
    notes?: string;
    recheckRecommended: boolean;
  }>;
  noHumanVerifiedReplay: boolean;
  humanStatus: string;
};

export type QaProgressRow = {
  tournamentId: TournamentId;
  kind: ExperienceKind;
  label: string;
  total: number;
  humanVerified: number;
  noWorkingReplay: number;
};

export type QaReport = {
  generatedAt: string;
  progress: QaProgressRow[];
  matches: QaMatchRow[];
};

export function filterQaMatches(
  matches: QaMatchRow[],
  filters: {
    tournament?: TournamentId | "all";
    experience?: ExperienceKind | "all";
    status?: string;
    provider?: string;
    search?: string;
  }
): QaMatchRow[] {
  const tournament = filters.tournament ?? "all";
  const experience = filters.experience ?? "all";
  const status = filters.status ?? "all";
  const provider = filters.provider ?? "all";
  const search = (filters.search ?? "").toLowerCase();

  let filtered = matches;

  if (tournament !== "all") {
    filtered = filtered.filter((row) => row.tournamentId === tournament);
  }

  if (experience !== "all") {
    filtered = filtered.filter((row) => row.experiences.includes(experience));
  }

  if (search) {
    filtered = filtered.filter(
      (row) =>
        row.teams.toLowerCase().includes(search) ||
        row.canonicalMatchId.toLowerCase().includes(search)
    );
  }

  return filtered.filter((row) => {
    if (status === "verified" && row.humanStatus !== "verified") return false;
    if (status === "untested" && row.humanStatus !== "untested") return false;
    if (status === "failed" && row.humanStatus !== "failed") return false;
    if (status === "no-working-replay" && !row.noHumanVerifiedReplay) return false;
    if (provider !== "all") {
      const hasProvider =
        row.preferredSource?.provider === provider ||
        row.alternativeSources.some((s) => s.provider === provider);
      if (!hasProvider) return false;
    }
    return true;
  });
}
