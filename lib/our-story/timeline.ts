import { seasons } from "@/data/seasons";
import {
  isSupportedTournamentId,
  tournamentLandingPath,
} from "@/lib/experiences";

export type ArchiveTimelineStatus = "available" | "next" | "planned";

export type ArchiveTimelineItem = {
  year: number;
  /** Short host label for the timeline (editorial, not season.name). */
  host: string;
  status: ArchiveTimelineStatus;
  /** Status label shown in the UI. */
  statusLabel: "AVAILABLE" | "NEXT" | "PLANNED";
  seasonId?: string;
  /** Real tournament route when available; otherwise null (no dead links). */
  href: string | null;
};

export type HorizonItem = {
  label: string;
};

/** Editorial host labels for known Men's World Cup editions. */
const HOST_LABELS: Record<string, string> = {
  "usa-1994": "USA",
  "france-1998": "France",
  "korea-japan-2002": "Korea/Japan",
  "germany-2006": "Germany",
  "south-africa-2010": "South Africa",
  "brazil-2014": "Brazil",
};

/** Future Men's World Cup editions not yet in the season registry. */
const FUTURE_EDITIONS: Array<{ year: number; host: string }> = [
  { year: 2018, host: "Russia" },
  { year: 2022, host: "Qatar" },
];

function statusForSeasonId(
  seasonId: string,
  seasonStatus: string
): ArchiveTimelineStatus {
  if (seasonStatus === "available" && isSupportedTournamentId(seasonId)) {
    return "available";
  }
  if (seasonId === "germany-2006") return "next";
  return "planned";
}

function statusLabel(status: ArchiveTimelineStatus): ArchiveTimelineItem["statusLabel"] {
  if (status === "available") return "AVAILABLE";
  if (status === "next") return "NEXT";
  return "PLANNED";
}

/**
 * Men's World Cup archive timeline for the Our Story page.
 * Available editions prefer the season registry for year/host/route.
 */
export function getArchiveTimeline(): ArchiveTimelineItem[] {
  const fromSeasons: ArchiveTimelineItem[] = seasons.map((season) => {
    const status = statusForSeasonId(season.id, season.status);
    const href =
      status === "available" && isSupportedTournamentId(season.id)
        ? tournamentLandingPath(season.id)
        : null;
    return {
      year: season.year,
      host: HOST_LABELS[season.id] ?? season.host,
      status,
      statusLabel: statusLabel(status),
      seasonId: season.id,
      href,
    };
  });

  const future: ArchiveTimelineItem[] = FUTURE_EDITIONS.map((edition) => ({
    year: edition.year,
    host: edition.host,
    status: "planned" as const,
    statusLabel: "PLANNED" as const,
    href: null,
  }));

  return [...fromSeasons, ...future].sort((a, b) => a.year - b.year);
}

/** Beyond the Men's World Cup — restrained horizon, not release commitments. */
export const ARCHIVE_HORIZON: readonly HorizonItem[] = [
  { label: "Women’s World Cups" },
  { label: "UEFA European Championships" },
  { label: "Copa América" },
  { label: "Player Profiles" },
  { label: "Highlights" },
  { label: "Search" },
  { label: "New ways to experience football history" },
] as const;

export const OUR_STORY_PATH = "/our-story";
export const OUR_STORY_NAV_LABEL = "Our Story";
