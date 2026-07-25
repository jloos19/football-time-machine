import {
  experiencePath,
  getExperienceByRoute,
  isSupportedTournamentId,
  tournamentLandingPath,
} from "./registry";
import type { TournamentExperience } from "./types";
import type { TournamentId } from "@/lib/archive/types";

export type AppScreen =
  | { type: "home" }
  | {
      type: "tournament-landing";
      tournamentId: TournamentId;
      returnTo: "home" | "collection";
    }
  | {
      type: "team-picker";
      tournamentId: TournamentId;
      returnTo: "home" | "collection";
    }
  | {
      type: "experience";
      tournamentId: TournamentId;
      experience: TournamentExperience;
      returnTo: "home" | "collection";
    };

/** Parse app pathname into a screen. Returns null for unknown / invalid routes. */
export function parseAppPathname(pathname: string): AppScreen | null {
  if (pathname === "/" || pathname === "") return { type: "home" };
  // Legacy collection URLs resolve to home; the shell replaces them with `/`
  // and scrolls to the Men's World Cups shelf.
  if (pathname === "/collection" || pathname === "/world-cups") {
    return { type: "home" };
  }

  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] !== "tournaments" || !parts[1] || !isSupportedTournamentId(parts[1])) {
    return null;
  }

  const tournamentId = parts[1];
  const returnTo = "home" as const;

  if (parts.length === 2) {
    return { type: "tournament-landing", tournamentId, returnTo };
  }

  if (parts[2] === "team" && parts.length === 3) {
    return { type: "team-picker", tournamentId, returnTo };
  }

  if (parts[2] === "team" && parts[3]) {
    const experience = getExperienceByRoute(tournamentId, "team", parts[3]);
    if (!experience) return null;
    return { type: "experience", tournamentId, experience, returnTo };
  }

  if (parts[2] === "story" || parts[2] === "essentials" || parts[2] === "every-match") {
    const experience = getExperienceByRoute(tournamentId, parts[2]);
    if (!experience) return null;
    return { type: "experience", tournamentId, experience, returnTo };
  }

  return null;
}

export function screenToPath(screen: AppScreen): string {
  switch (screen.type) {
    case "home":
      return "/";
    case "tournament-landing":
      return tournamentLandingPath(screen.tournamentId);
    case "team-picker":
      return experiencePath(screen.tournamentId, "team");
    case "experience": {
      const exp = screen.experience;
      if (exp.type === "team" && exp.teamId) {
        return experiencePath(screen.tournamentId, "team", exp.teamId);
      }
      if (exp.type === "story") return experiencePath(screen.tournamentId, "story");
      if (exp.type === "essentials") {
        return experiencePath(screen.tournamentId, "essentials");
      }
      return experiencePath(screen.tournamentId, "every-match");
    }
    default:
      return "/";
  }
}

/** Preserve returnTo across URL sync when staying in the same tournament flow. */
export function mergeScreenFromPath(prev: AppScreen, parsed: AppScreen): AppScreen {
  if (
    "returnTo" in parsed &&
    "returnTo" in prev &&
    "tournamentId" in prev &&
    "tournamentId" in parsed &&
    prev.tournamentId === parsed.tournamentId
  ) {
    return { ...parsed, returnTo: prev.returnTo };
  }
  return parsed;
}

/** True when the client shell should own the UI for this path. */
export function isAppShellPath(pathname: string): boolean {
  if (pathname.startsWith("/dev")) return false;
  return parseAppPathname(pathname) !== null;
}
