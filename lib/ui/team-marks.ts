/**
 * Flag marks for participating World Cup nations.
 *
 * Display names in archives/UI may differ (e.g. "Korea Republic" vs "South Korea");
 * both resolve to the same canonical country code and a single flag emoji asset.
 */

/** Canonical country/region code → flag emoji (one asset per code). */
const CODE_TO_FLAG: Record<string, string> = {
  AR: "🇦🇷",
  AT: "🇦🇹",
  BE: "🇧🇪",
  BG: "🇧🇬",
  BO: "🇧🇴",
  BR: "🇧🇷",
  CH: "🇨🇭",
  CL: "🇨🇱",
  CM: "🇨🇲",
  CN: "🇨🇳",
  CO: "🇨🇴",
  CR: "🇨🇷",
  DE: "🇩🇪",
  DK: "🇩🇰",
  EC: "🇪🇨",
  ES: "🇪🇸",
  FR: "🇫🇷",
  GB: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  GR: "🇬🇷",
  HR: "🇭🇷",
  IE: "🇮🇪",
  IR: "🇮🇷",
  IT: "🇮🇹",
  JM: "🇯🇲",
  JP: "🇯🇵",
  KR: "🇰🇷",
  MA: "🇲🇦",
  MX: "🇲🇽",
  NG: "🇳🇬",
  NL: "🇳🇱",
  NO: "🇳🇴",
  PL: "🇵🇱",
  PT: "🇵🇹",
  PY: "🇵🇾",
  RO: "🇷🇴",
  RU: "🇷🇺",
  SA: "🇸🇦",
  SCO: "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
  SE: "🇸🇪",
  SI: "🇸🇮",
  SN: "🇸🇳",
  TN: "🇹🇳",
  TR: "🇹🇷",
  US: "🇺🇸",
  UY: "🇺🇾",
  YU: "🇷🇸",
  ZA: "🇿🇦",
};

/**
 * Archive / UI display name → canonical country code.
 * Prefer the name used in match data; aliases share one code (no duplicate assets).
 */
const TEAM_CODES: Record<string, string> = {
  Argentina: "AR",
  Austria: "AT",
  Belgium: "BE",
  Bolivia: "BO",
  Brazil: "BR",
  Bulgaria: "BG",
  Cameroon: "CM",
  Chile: "CL",
  China: "CN",
  Colombia: "CO",
  "Costa Rica": "CR",
  Croatia: "HR",
  Denmark: "DK",
  Ecuador: "EC",
  England: "GB",
  France: "FR",
  Germany: "DE",
  Greece: "GR",
  Iran: "IR",
  Italy: "IT",
  Jamaica: "JM",
  Japan: "JP",
  /** FIFA finals name (Korea/Japan 2002); same asset as South Korea. */
  "Korea Republic": "KR",
  Mexico: "MX",
  Morocco: "MA",
  Netherlands: "NL",
  Nigeria: "NG",
  Norway: "NO",
  Paraguay: "PY",
  Poland: "PL",
  Portugal: "PT",
  "Republic of Ireland": "IE",
  Romania: "RO",
  Russia: "RU",
  "Saudi Arabia": "SA",
  Scotland: "SCO",
  Senegal: "SN",
  Slovenia: "SI",
  "South Africa": "ZA",
  /** Common English name (USA 1994 / France 1998 archives). */
  "South Korea": "KR",
  Spain: "ES",
  Sweden: "SE",
  Switzerland: "CH",
  Tunisia: "TN",
  Turkey: "TR",
  "United States": "US",
  Uruguay: "UY",
  Yugoslavia: "YU",
};

export function teamCountryCode(teamName: string): string | null {
  const key = teamName.trim();
  return TEAM_CODES[key] ?? null;
}

export function teamFlagEmoji(teamName: string): string {
  const code = teamCountryCode(teamName);
  if (!code) return "🏳️";
  return CODE_TO_FLAG[code] ?? "🏳️";
}

/** True when a display name resolves to a known flag asset. */
export function hasTeamFlag(teamName: string): boolean {
  return teamFlagEmoji(teamName) !== "🏳️";
}

export function teamInitials(teamName: string): string {
  const words = teamName.trim().split(/\s+/).filter(Boolean);
  if (words.length === 1) return words[0]!.slice(0, 3).toUpperCase();
  return words
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}
