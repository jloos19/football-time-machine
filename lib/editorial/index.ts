import usaMatches from "@/data/editorial/usa-1994-matches.json";
import franceMatches from "@/data/editorial/france-1998-matches.json";
import koreaJapanMatches from "@/data/editorial/korea-japan-2002-matches.json";
import { USA_1994_DOSSIERS as USA_1994_JOURNEY_DOSSIERS } from "@/data/editorial/dossiers/usa-1994";
import { USA_1994_ADDITIONAL_DOSSIERS } from "@/data/editorial/dossiers/usa-1994-additional";
import { FRANCE_1998_DOSSIERS as FRANCE_1998_JOURNEY_DOSSIERS } from "@/data/editorial/dossiers/france-1998";
import { FRANCE_1998_ADDITIONAL_DOSSIERS } from "@/data/editorial/dossiers/france-1998-additional";
import { KOREA_JAPAN_2002_DOSSIERS as KOREA_JAPAN_2002_JOURNEY_DOSSIERS } from "@/data/editorial/dossiers/korea-japan-2002";
import { KOREA_JAPAN_2002_ADDITIONAL_DOSSIERS } from "@/data/editorial/dossiers/korea-japan-2002-additional";
import { USA_1994_EPILOGUES } from "@/data/editorial/epilogues/usa-1994";
import { FRANCE_1998_EPILOGUES } from "@/data/editorial/epilogues/france-1998";
import { KOREA_JAPAN_2002_EPILOGUES } from "@/data/editorial/epilogues/korea-japan-2002";
import type { TournamentId } from "@/lib/archive/types";
import type {
  CanonicalMatchEditorial,
  TeamCampaignEpilogue,
  TeamTournamentDossier,
} from "./types";

export type {
  CanonicalMatchEditorial,
  MatchKeyMoment,
  MatchShapingPlayer,
  TeamCampaignEpilogue,
  TeamDossierKeyPlayer,
  TeamDossierRosterPlayer,
  TeamTournamentDossier,
  TournamentOutlookLabel,
} from "./types";

export { projectPostMatch } from "./project";
export {
  dossierPairSimilarityPassed,
  findDuplicateEditorialReports,
  formatCoverageTable,
  formatKoreaJapan2002ProfileAudit,
  formatTeamProfileCoverage,
  listRequiredDossierSections,
  validateDossierSimilarity,
  validateTeamDossiers,
  validateTournamentEditorial,
  type DossierCoverageReportRow,
  type DossierSimilarityIssue,
  type DossierValidationRow,
  type MatchEditorialRow,
  type TeamProfileCoverageRow,
  type TournamentEditorialCoverage,
} from "./validate";

const USA_MATCHES = usaMatches as CanonicalMatchEditorial[];
const FRANCE_MATCHES = franceMatches as CanonicalMatchEditorial[];
const KOREA_JAPAN_MATCHES = koreaJapanMatches as CanonicalMatchEditorial[];

const MATCH_BY_ID: Map<string, CanonicalMatchEditorial> = new Map(
  [...USA_MATCHES, ...FRANCE_MATCHES, ...KOREA_JAPAN_MATCHES].map((row) => [
    row.canonicalMatchId,
    row,
  ])
);

const USA_1994_DOSSIERS: TeamTournamentDossier[] = [
  ...USA_1994_JOURNEY_DOSSIERS,
  ...USA_1994_ADDITIONAL_DOSSIERS,
];
const FRANCE_1998_DOSSIERS: TeamTournamentDossier[] = [
  ...FRANCE_1998_JOURNEY_DOSSIERS,
  ...FRANCE_1998_ADDITIONAL_DOSSIERS,
];
const KOREA_JAPAN_2002_DOSSIERS: TeamTournamentDossier[] = [
  ...KOREA_JAPAN_2002_JOURNEY_DOSSIERS,
  ...KOREA_JAPAN_2002_ADDITIONAL_DOSSIERS,
];

const DOSSIERS_BY_TOURNAMENT: Record<TournamentId, TeamTournamentDossier[]> = {
  "usa-1994": USA_1994_DOSSIERS,
  "france-1998": FRANCE_1998_DOSSIERS,
  "korea-japan-2002": KOREA_JAPAN_2002_DOSSIERS,
};

const EPILOGUES_BY_TOURNAMENT: Record<TournamentId, TeamCampaignEpilogue[]> = {
  "usa-1994": USA_1994_EPILOGUES,
  "france-1998": FRANCE_1998_EPILOGUES,
  "korea-japan-2002": KOREA_JAPAN_2002_EPILOGUES,
};

export function getCanonicalMatchEditorial(
  canonicalMatchId: string
): CanonicalMatchEditorial | null {
  return MATCH_BY_ID.get(canonicalMatchId) ?? null;
}

export function listCanonicalMatchEditorials(
  tournamentId: TournamentId
): CanonicalMatchEditorial[] {
  const prefix =
    tournamentId === "usa-1994"
      ? "usa-1994-"
      : tournamentId === "france-1998"
        ? "france-1998-"
        : "korea-japan-2002-";
  return [...MATCH_BY_ID.values()].filter((row) =>
    row.canonicalMatchId.startsWith(prefix)
  );
}

export function getTeamDossier(
  tournamentId: TournamentId,
  teamId: string
): TeamTournamentDossier | null {
  return (
    DOSSIERS_BY_TOURNAMENT[tournamentId].find((d) => d.teamId === teamId) ??
    null
  );
}

export function listTeamDossiers(
  tournamentId: TournamentId
): TeamTournamentDossier[] {
  return DOSSIERS_BY_TOURNAMENT[tournamentId];
}

export function getTeamEpilogue(
  tournamentId: TournamentId,
  teamId: string
): TeamCampaignEpilogue | null {
  return (
    EPILOGUES_BY_TOURNAMENT[tournamentId].find((e) => e.teamId === teamId) ??
    null
  );
}

/** Epilogue is only returned when the campaign is complete. */
export function resolveTeamEpilogue(args: {
  tournamentId: TournamentId;
  teamId: string;
  campaignComplete: boolean;
}): TeamCampaignEpilogue | null {
  if (!args.campaignComplete) return null;
  return getTeamEpilogue(args.tournamentId, args.teamId);
}
