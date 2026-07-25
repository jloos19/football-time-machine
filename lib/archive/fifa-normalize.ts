const TEAM_ALIASES: Record<string, string> = {
  brasil: "brazil",
  holland: "netherlands",
  "republic of ireland": "ireland",
  "korea republic": "south korea",
  "ir iran": "iran",
  usa: "united states",
  "united states of america": "united states",
  "russian federation": "russia",
};

const STAGE_ALIASES: Record<string, string> = {
  semifinal: "semi final",
  "semi-finals": "semi final",
  "semi-final": "semi final",
  "third-place play-off": "play off for third place",
  "third place play off": "play off for third place",
  "play-off for third place": "play off for third place",
  "round of 16": "round of 16",
  "quarter-final": "quarter final",
  "quarter-finals": "quarter final",
  "group stage": "group",
};

export function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/™|®/g, "")
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function normalizeTeamName(team: string): string {
  const normalized = normalizeText(team);
  return TEAM_ALIASES[normalized] ?? normalized;
}

export function normalizeStage(stage: string): string {
  const normalized = normalizeText(stage);
  return STAGE_ALIASES[normalized] ?? normalized;
}

export function normalizeTournamentLabel(value: string): string {
  return normalizeText(value)
    .replace(/1998 fifa world cup france/g, "1998 world cup")
    .replace(/fifa world cup france 1998/g, "1998 world cup")
    .replace(/copa mundial de la fifa francia 1998/g, "1998 world cup");
}

export function normalizeVersus(value: string): string {
  return normalizeText(value).replace(/\bvs\b/g, "v");
}

export function teamsMatch(
  homeA: string,
  awayA: string,
  homeB: string,
  awayB: string
): boolean {
  const aHome = normalizeTeamName(homeA);
  const aAway = normalizeTeamName(awayA);
  const bHome = normalizeTeamName(homeB);
  const bAway = normalizeTeamName(awayB);
  return (
    (aHome === bHome && aAway === bAway) || (aHome === bAway && aAway === bHome)
  );
}

export function stageMatches(stageA: string, stageB: string): boolean {
  const a = normalizeStage(stageA);
  const b = normalizeStage(stageB);
  if (!a || !b) return true;
  if (a === b) return true;
  if (a.includes("group") && b.includes("group")) return true;
  return false;
}

export function titleLooksLikeFullMatch(title: string): boolean {
  const lower = normalizeText(title);
  if (lower.includes("full match replay") || lower.includes("full match")) {
    return true;
  }
  if (
    lower.includes("highlights") ||
    lower.includes("extended highlights") ||
    lower.includes("goal") ||
    lower.includes("classic matches") ||
    lower.includes("penalty shoot")
  ) {
    return false;
  }
  return false;
}

export function parseTeamsFromTitle(title: string): { homeTeam?: string; awayTeam?: string } {
  const pipeParts = title.split("|").map((part) => part.trim());
  const head = pipeParts[0] ?? title;
  const match = head.match(/^(.+?)\s+v\s+(.+)$/i);
  if (!match) return {};
  return { homeTeam: match[1]!.trim(), awayTeam: match[2]!.trim() };
}

export function parseStageFromTitle(title: string): string | undefined {
  const parts = title.split("|").map((part) => part.trim());
  for (const part of parts.slice(1)) {
    if (/group [a-h]/i.test(part)) return "Group Stage";
    if (/round of 16/i.test(part)) return "Round of 16";
    if (/quarter/i.test(part)) return "Quarter-final";
    if (/semi/i.test(part)) return "Semi-final";
    if (/third place|play-off for third/i.test(part)) return "Third-place play-off";
    if (/final/i.test(part) && !/semi|quarter|round/i.test(part)) return "Final";
  }
  return undefined;
}

export function parseTournamentYear(value: string): number | undefined {
  const match = value.match(/\b(19|20)\d{2}\b/);
  return match ? Number.parseInt(match[0], 10) : undefined;
}
