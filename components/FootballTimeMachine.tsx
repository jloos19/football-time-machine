"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Episode, Season, seasons } from "@/data/seasons";
import { SiteFooter } from "@/components/feedback/SiteFooter";
import { HomePage } from "@/components/home/HomePage";
import { OurStoryPage } from "@/components/our-story/OurStoryPage";
import { ExperiencePicker } from "@/components/experiences/ExperiencePicker";
import { TeamPicker } from "@/components/experiences/TeamPicker";
import { TournamentLanding } from "@/components/experiences/TournamentLanding";
import { JourneyView } from "@/components/experiences/StoryView";
import { MatchExperienceModal } from "@/components/experiences/MatchExperienceModal";
import type { FeedbackPageContext } from "@/lib/feedback";
import {
  EMPTY_RESUME_HINTS,
  FRANCE_1998_GROUPS,
  KOREA_JAPAN_2002_GROUPS,
  USA_1994_GROUPS,
  buildTournamentHeroAction,
  continueWatchingDetail,
  experiencePath,
  experienceProgress,
  getExperienceByRoute,
  getSupportedTeamJourneys,
  isExperienceMatchUnlocked,
  isSupportedTournamentId,
  listContinueCandidateExperiences,
  resolveContinueCanonicalMatchId,
  resolveContinueWatchingExperience,
  resolveExperienceEpisodes,
  tournamentLandingPath,
  type ExperienceEpisode,
  type ExperienceOption,
  type ResumeHints,
  type TournamentExperience,
} from "@/lib/experiences";
import {
  mergeScreenFromPath,
  parseAppPathname,
  screenToPath,
  type AppScreen,
} from "@/lib/experiences/app-routes";
import type { TournamentId } from "@/lib/archive/types";
import {
  requestScrollToMensWorldCups,
  scrollToMensWorldCups,
} from "@/lib/home";
import { OUR_STORY_TITLE } from "@/lib/our-story";
import { SITE_NAME } from "@/lib/site";
import {
  hasEnteredExperience,
  markExperienceEntered,
  markJourneyEntered,
  readCompletedCanonicalMatches,
  readLastViewedMatch,
  writeCompletedCanonicalMatches,
  writeLastViewedMatch,
} from "@/lib/progress";

type ReturnTarget = "home" | "collection";

type Screen = AppScreen;

const GROUPS_94: Record<string, string[]> = {
  A: [...USA_1994_GROUPS.A],
  B: [...USA_1994_GROUPS.B],
  C: [...USA_1994_GROUPS.C],
  D: [...USA_1994_GROUPS.D],
  E: [...USA_1994_GROUPS.E],
  F: [...USA_1994_GROUPS.F],
};

const RESULTS_94 = [
  [1,"C","Germany","Bolivia",1,0],[2,"C","Spain","South Korea",2,2],
  [3,"A","United States","Switzerland",1,1],[4,"E","Italy","Republic of Ireland",0,1],
  [5,"A","Colombia","Romania",1,3],[6,"F","Belgium","Morocco",1,0],
  [7,"E","Norway","Mexico",1,0],[8,"B","Cameroon","Sweden",2,2],
  [9,"B","Brazil","Russia",2,0],[10,"F","Netherlands","Saudi Arabia",2,1],
  [11,"D","Argentina","Greece",4,0],[12,"C","Germany","Spain",1,1],
  [13,"D","Nigeria","Bulgaria",3,0],[14,"A","Romania","Switzerland",1,4],
  [15,"A","United States","Colombia",2,1],[16,"E","Italy","Norway",1,0],
  [17,"C","South Korea","Bolivia",0,0],[18,"E","Mexico","Republic of Ireland",2,1],
  [19,"B","Brazil","Cameroon",3,0],[20,"B","Russia","Sweden",1,3],
  [21,"F","Saudi Arabia","Morocco",2,1],[21,"F","Belgium","Netherlands",1,0],
  [22,"D","Argentina","Nigeria",2,1],[23,"D","Bulgaria","Greece",4,0],
  [24,"A","United States","Romania",0,1],[24,"A","Switzerland","Colombia",0,2],
  [25,"C","Bolivia","Spain",1,3],[25,"C","Germany","South Korea",3,2],
  [26,"E","Republic of Ireland","Norway",0,0],[26,"E","Italy","Mexico",1,1],
  [27,"B","Brazil","Sweden",1,1],[27,"B","Russia","Cameroon",6,1],
  [28,"F","Morocco","Netherlands",1,2],[28,"F","Belgium","Saudi Arabia",0,1],
  [29,"D","Greece","Nigeria",0,2],[29,"D","Argentina","Bulgaria",0,2],
] as const;

const MATCH_SLOT_94: Record<string, number> = {
  "Germany vs Bolivia":1,"Spain vs South Korea":2,"United States vs Switzerland":3,
  "Italy vs Republic of Ireland":4,"Brazil vs Russia":9,"Netherlands vs Saudi Arabia":10,
  "Argentina vs Greece":11,"Germany vs Spain":12,"Nigeria vs Bulgaria":13,
  "United States vs Colombia":15,"Italy vs Norway":16,"Brazil vs Cameroon":19,
  "Netherlands vs Belgium":21,"Argentina vs Nigeria":22,"United States vs Romania":24,
  "Germany vs South Korea":25,"Italy vs Mexico":26,"Brazil vs Sweden":27,
  "Belgium vs Saudi Arabia":28,"Argentina vs Bulgaria":29,
  "Colombia vs Romania":5,"Cameroon vs Sweden":8,"Belgium vs Morocco":6,
  "Norway vs Mexico":7,"South Korea vs Bolivia":17,"Mexico vs Republic of Ireland":18,
  "Russia vs Sweden":20,"Saudi Arabia vs Morocco":21,"Bulgaria vs Greece":23,
  "Switzerland vs Colombia":24,"Bolivia vs Spain":25,"Republic of Ireland vs Norway":26,
  "Russia vs Cameroon":27,"Morocco vs Netherlands":28,"Greece vs Nigeria":29,
};

const GROUPS_98: Record<string, string[]> = {
  A: [...FRANCE_1998_GROUPS.A],
  B: [...FRANCE_1998_GROUPS.B],
  C: [...FRANCE_1998_GROUPS.C],
  D: [...FRANCE_1998_GROUPS.D],
  E: [...FRANCE_1998_GROUPS.E],
  F: [...FRANCE_1998_GROUPS.F],
  G: [...FRANCE_1998_GROUPS.G],
  H: [...FRANCE_1998_GROUPS.H],
};

const RESULTS_98 = [
  [1,"A","Brazil","Scotland",2,1],[2,"A","Morocco","Norway",2,2],
  [3,"B","Italy","Chile",2,2],[4,"B","Cameroon","Austria",1,1],
  [5,"C","France","South Africa",3,0],[5,"C","Denmark","Saudi Arabia",1,0],
  [6,"D","Paraguay","Bulgaria",0,0],[7,"D","Spain","Nigeria",2,3],
  [8,"E","South Korea","Mexico",1,3],[9,"E","Netherlands","Belgium",0,0],
  [10,"H","Argentina","Japan",1,0],[11,"F","Yugoslavia","Iran",1,0],
  [12,"F","Germany","United States",2,0],[13,"G","Romania","Colombia",1,0],
  [14,"G","England","Tunisia",2,0],[14,"H","Croatia","Jamaica",3,1],
  [15,"B","Chile","Austria",2,0],[15,"B","Italy","Cameroon",3,0],
  [16,"C","France","Saudi Arabia",4,0],[16,"C","South Africa","Denmark",1,1],
  [17,"D","Nigeria","Bulgaria",1,0],[17,"D","Spain","Paraguay",1,0],
  [18,"E","Belgium","Mexico",1,1],[18,"E","Netherlands","South Korea",5,0],
  [19,"F","Germany","Yugoslavia",2,2],[19,"F","United States","Iran",1,2],
  [20,"G","Colombia","Tunisia",1,0],[20,"G","Romania","England",2,1],
  [21,"H","Japan","Croatia",0,1],[21,"H","Argentina","Jamaica",5,0],
  [22,"A","Brazil","Morocco",3,1],[22,"A","Scotland","Norway",1,1],
  [23,"A","Brazil","Norway",1,2],[23,"A","Scotland","Morocco",0,3],
  [24,"B","Italy","Austria",2,1],[24,"B","Chile","Cameroon",1,1],
  [25,"C","France","Denmark",2,1],[25,"C","South Africa","Saudi Arabia",2,2],
  [26,"D","Nigeria","Paraguay",1,3],[26,"D","Spain","Bulgaria",6,1],
  [27,"E","Mexico","Netherlands",2,2],[27,"E","Belgium","South Korea",1,0],
  [28,"F","Germany","Iran",2,0],[28,"F","Yugoslavia","United States",1,0],
  [29,"G","Colombia","England",1,0],[29,"G","Romania","Tunisia",0,0],
  [30,"H","Argentina","Croatia",1,0],[30,"H","Jamaica","Japan",2,1],
] as const;

const MATCH_SLOT_98: Record<string, number> = {
  "Brazil vs Scotland":1,"Morocco vs Norway":2,"Italy vs Chile":3,
  "Cameroon vs Austria":4,"France vs South Africa":5,"Paraguay vs Bulgaria":6,
  "Spain vs Nigeria":7,"South Korea vs Mexico":8,"Netherlands vs Belgium":9,
  "Argentina vs Japan":10,"Yugoslavia vs Iran":11,"Germany vs United States":12,
  "England vs Tunisia":14,"Croatia vs Jamaica":14,"Brazil vs Norway":23,
  "Nigeria vs Paraguay":26,"France vs Denmark":25,"Argentina vs Croatia":30,
  "Germany vs Iran":28,"Colombia vs England":29,"Romania vs Colombia":13,
  "Romania vs England":20,"Denmark vs Saudi Arabia":5,"Nigeria vs Spain":7,
  "Nigeria vs Bulgaria":17,"Spain vs Paraguay":17,"Belgium vs Mexico":18,
  "Netherlands vs South Korea":18,"Germany vs Yugoslavia":19,"United States vs Iran":19,
  "Colombia vs Tunisia":20,"Japan vs Croatia":21,"Argentina vs Jamaica":21,
  "Brazil vs Morocco":22,"Scotland vs Norway":22,"Scotland vs Morocco":23,
  "Italy vs Austria":24,"Chile vs Cameroon":24,"South Africa vs Saudi Arabia":25,
  "Spain vs Bulgaria":26,"Mexico vs Netherlands":27,"Belgium vs South Korea":27,
  "Yugoslavia vs United States":28,"Romania vs Tunisia":29,"Jamaica vs Japan":30,
  "France vs Saudi Arabia":16,"South Africa vs Denmark":16,"Chile vs Austria":15,
  "Italy vs Cameroon":15,
};

const GROUPS_02: Record<string, string[]> = {
  A: [...KOREA_JAPAN_2002_GROUPS.A],
  B: [...KOREA_JAPAN_2002_GROUPS.B],
  C: [...KOREA_JAPAN_2002_GROUPS.C],
  D: [...KOREA_JAPAN_2002_GROUPS.D],
  E: [...KOREA_JAPAN_2002_GROUPS.E],
  F: [...KOREA_JAPAN_2002_GROUPS.F],
  G: [...KOREA_JAPAN_2002_GROUPS.G],
  H: [...KOREA_JAPAN_2002_GROUPS.H],
};

const RESULTS_02 = [
  [1,"A","France","Senegal",0,1],[1,"E","Republic of Ireland","Cameroon",1,1],
  [1,"A","Uruguay","Denmark",1,2],[1,"E","Germany","Saudi Arabia",8,0],
  [2,"F","Argentina","Nigeria",1,0],[2,"F","England","Sweden",1,1],
  [2,"B","Paraguay","South Africa",2,2],[2,"B","Spain","Slovenia",3,1],
  [3,"G","Croatia","Mexico",0,1],[3,"G","Italy","Ecuador",2,0],
  [3,"C","Brazil","Turkey",2,1],[4,"D","Korea Republic","Poland",2,0],
  [4,"H","Japan","Belgium",2,2],[4,"C","China","Costa Rica",0,2],
  [5,"H","Russia","Tunisia",2,0],[5,"D","United States","Portugal",3,2],
  [5,"E","Germany","Republic of Ireland",1,1],[6,"E","Cameroon","Saudi Arabia",1,0],
  [6,"A","Denmark","Senegal",1,1],[6,"A","France","Uruguay",0,0],
  [7,"F","Sweden","Nigeria",2,1],[7,"B","Spain","Paraguay",3,1],
  [7,"F","Argentina","England",0,1],[8,"B","South Africa","Slovenia",1,0],
  [8,"G","Italy","Croatia",1,2],[8,"C","Brazil","China",4,0],
  [9,"C","Costa Rica","Turkey",1,1],[9,"G","Mexico","Ecuador",2,1],
  [9,"H","Japan","Russia",1,0],[10,"H","Tunisia","Belgium",1,1],
  [10,"D","Korea Republic","United States",1,1],[10,"D","Portugal","Poland",4,0],
  [11,"A","Denmark","France",2,0],[11,"A","Senegal","Uruguay",3,3],
  [11,"E","Cameroon","Germany",0,2],[11,"E","Saudi Arabia","Republic of Ireland",0,3],
  [12,"F","Sweden","Argentina",1,1],[12,"F","Nigeria","England",0,0],
  [12,"B","South Africa","Spain",2,3],[12,"B","Slovenia","Paraguay",1,3],
  [13,"C","Costa Rica","Brazil",2,5],[13,"C","Turkey","China",3,0],
  [13,"G","Mexico","Italy",1,1],[13,"G","Ecuador","Croatia",1,0],
  [14,"D","Portugal","Korea Republic",0,1],[14,"D","Poland","United States",3,1],
  [14,"H","Tunisia","Japan",0,2],[14,"H","Belgium","Russia",3,2],
] as const;

const MATCH_SLOT_02: Record<string, number> = {
  "France vs Senegal":1,"Republic of Ireland vs Cameroon":1,"Uruguay vs Denmark":1,
  "Germany vs Saudi Arabia":1,"Argentina vs Nigeria":2,"England vs Sweden":2,
  "Paraguay vs South Africa":2,"Spain vs Slovenia":2,"Croatia vs Mexico":3,
  "Italy vs Ecuador":3,"Brazil vs Turkey":3,"Korea Republic vs Poland":4,
  "Japan vs Belgium":4,"China vs Costa Rica":4,"Russia vs Tunisia":5,
  "United States vs Portugal":5,"Germany vs Republic of Ireland":5,
  "Cameroon vs Saudi Arabia":6,"Denmark vs Senegal":6,"France vs Uruguay":6,
  "Sweden vs Nigeria":7,"Spain vs Paraguay":7,"Argentina vs England":7,
  "South Africa vs Slovenia":8,"Italy vs Croatia":8,"Brazil vs China":8,
  "Costa Rica vs Turkey":9,"Mexico vs Ecuador":9,"Japan vs Russia":9,
  "Tunisia vs Belgium":10,"Korea Republic vs United States":10,"Portugal vs Poland":10,
  "Denmark vs France":11,"Senegal vs Uruguay":11,"Cameroon vs Germany":11,
  "Saudi Arabia vs Republic of Ireland":11,"Sweden vs Argentina":12,
  "Nigeria vs England":12,"South Africa vs Spain":12,"Slovenia vs Paraguay":12,
  "Costa Rica vs Brazil":13,"Turkey vs China":13,"Mexico vs Italy":13,
  "Ecuador vs Croatia":13,"Portugal vs Korea Republic":14,"Poland vs United States":14,
  "Tunisia vs Japan":14,"Belgium vs Russia":14,
};

type StandingsConfig = {
  groups: Record<string, string[]>;
  results: readonly (readonly [number, string, string, string, number, number])[];
  matchSlots: Record<string, number>;
};

const STANDINGS: Record<string, StandingsConfig> = {
  "usa-1994": { groups: GROUPS_94, results: RESULTS_94, matchSlots: MATCH_SLOT_94 },
  "france-1998": { groups: GROUPS_98, results: RESULTS_98, matchSlots: MATCH_SLOT_98 },
  "korea-japan-2002": { groups: GROUPS_02, results: RESULTS_02, matchSlots: MATCH_SLOT_02 },
};

function readResumeHints(tournamentId: TournamentId): ResumeHints {
  const enteredExperienceIds = new Set<string>();
  const lastViewedByExperienceId = new Map<string, string | null>();
  for (const exp of listContinueCandidateExperiences(tournamentId)) {
    if (hasEnteredExperience(exp.id)) enteredExperienceIds.add(exp.id);
    lastViewedByExperienceId.set(exp.id, readLastViewedMatch(exp.id));
  }
  return { enteredExperienceIds, lastViewedByExperienceId };
}

function standingsForEpisode(episode: Episode) {
  const config = STANDINGS[episode.tournamentId];
  if (!config) return null;
  if (!episode.stage.toLowerCase().includes("group")) return null;

  const [left, right] = episode.match.split(" vs ");
  if (!left || !right) return null;

  let slot = config.matchSlots[episode.match];
  let current = config.results.find(([s, , h, a]) => {
    return s === slot && ((h === left && a === right) || (h === right && a === left));
  });

  if (!current) {
    current = config.results.find(([, , h, a]) => {
      return (h === left && a === right) || (h === right && a === left);
    });
    if (!current) return null;
    slot = current[0];
  }

  const group = current[1];
  const table: Record<
    string,
    {
      team: string;
      p: number;
      w: number;
      d: number;
      l: number;
      gf: number;
      ga: number;
      gd: number;
      pts: number;
    }
  > = {};
  config.groups[group].forEach((team) => {
    table[team] = { team, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 };
  });
  config.results.forEach(([s, g, h, a, hg, ag]) => {
    if (g !== group || s >= slot!) return;
    const home = table[h],
      away = table[a];
    if (!home || !away) return;
    home.p++;
    away.p++;
    home.gf += hg;
    home.ga += ag;
    away.gf += ag;
    away.ga += hg;
    if (hg > ag) {
      home.w++;
      home.pts += 3;
      away.l++;
    } else if (hg < ag) {
      away.w++;
      away.pts += 3;
      home.l++;
    } else {
      home.d++;
      away.d++;
      home.pts++;
      away.pts++;
    }
  });
  return {
    group,
    rows: Object.values(table)
      .map((x) => ({ ...x, gd: x.gf - x.ga }))
      .sort(
        (a, b) =>
          b.pts - a.pts ||
          b.gd - a.gd ||
          b.gf - a.gf ||
          a.team.localeCompare(b.team)
      ),
  };
}

export function FootballTimeMachine() {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const [screen, setScreenState] = useState<Screen>(
    () => parseAppPathname(pathname) ?? { type: "home" }
  );
  const [selectedEpisode, setSelectedEpisode] = useState<ExperienceEpisode | null>(null);
  const [completed, setCompleted] = useState<Set<string>>(() => new Set());
  const [resumeHints, setResumeHints] = useState<ResumeHints>(EMPTY_RESUME_HINTS);
  const [hasHydratedProgress, setHasHydratedProgress] = useState(false);
  const [progressRevision, setProgressRevision] = useState(0);
  /** Match to open with the next experience route (survives URL sync). */
  const pendingEpisodeRef = useRef<ExperienceEpisode | null>(null);
  const experienceIdRef = useRef<string | null>(
    screen.type === "experience" ? screen.experience.id : null
  );

  function setScreen(next: Screen) {
    setScreenState(next);
    const path = screenToPath(next);
    if (path !== pathname) {
      router.push(path, { scroll: true });
    }
  }

  /** WORLD CUPS nav: scroll on homepage; otherwise go home then scroll to the shelf. */
  function navigateToMensWorldCups() {
    if (screen.type === "home") {
      scrollToMensWorldCups("smooth");
      if (pathname === "/world-cups" || pathname === "/collection") {
        router.replace("/", { scroll: false });
      }
      return;
    }
    clearMatchState();
    requestScrollToMensWorldCups();
    setScreen({ type: "home" });
  }

  function navigateToOurStory() {
    if (screen.type === "our-story") {
      window.scrollTo(0, 0);
      return;
    }
    clearMatchState();
    setScreen({ type: "our-story" });
  }

  function navigateToHome() {
    clearMatchState();
    setScreen({ type: "home" });
  }

  /** Browse the Archive / Men's World Cups shelf from editorial surfaces. */
  function browseArchive() {
    clearMatchState();
    requestScrollToMensWorldCups();
    setScreen({ type: "home" });
  }

  /** Resolve legacy `returnTo: "collection"` into homepage + Men's World Cups scroll. */
  function navigateReturnTo(returnTo: ReturnTarget) {
    clearMatchState();
    if (returnTo === "collection") {
      requestScrollToMensWorldCups();
    }
    setScreen({ type: "home" });
    setProgressRevision((revision) => revision + 1);
  }

  useLayoutEffect(() => {
    // Collapse legacy collection URLs without stacking an extra history entry.
    if (pathname === "/world-cups" || pathname === "/collection") {
      requestScrollToMensWorldCups();
      router.replace("/", { scroll: false });
      return;
    }

    const parsed = parseAppPathname(pathname);
    if (!parsed) return;

    setScreenState((prev) => mergeScreenFromPath(prev, parsed));

    if (parsed.type !== "experience") {
      pendingEpisodeRef.current = null;
      setSelectedEpisode(null);
      experienceIdRef.current = null;
      return;
    }

    const nextExperienceId = parsed.experience.id;
    const experienceChanged = experienceIdRef.current !== nextExperienceId;
    experienceIdRef.current = nextExperienceId;

    const pending = pendingEpisodeRef.current;
    if (pending) {
      pendingEpisodeRef.current = null;
      const allowed = new Set(
        resolveExperienceEpisodes(parsed.experience).map((ep) => ep.canonicalMatchId)
      );
      setSelectedEpisode(allowed.has(pending.canonicalMatchId) ? pending : null);
      return;
    }

    if (experienceChanged) {
      setSelectedEpisode(null);
    }
  }, [pathname, router]);

  const activeSeason: Season | null = useMemo(() => {
    if (
      screen.type !== "tournament-landing" &&
      screen.type !== "team-picker" &&
      screen.type !== "experience"
    ) {
      return null;
    }
    return seasons.find((s) => s.id === screen.tournamentId) ?? null;
  }, [screen]);

  const experienceEpisodes = useMemo(() => {
    if (screen.type !== "experience") return [];
    return resolveExperienceEpisodes(screen.experience);
  }, [screen]);

  // Layout effect so progress/resume restore before paint — avoids flashing
  // another tournament's progress or a stale Explore→Continue CTA swap mid-frame.
  useLayoutEffect(() => {
    if (!activeSeason || !isSupportedTournamentId(activeSeason.id)) {
      setHasHydratedProgress(false);
      return;
    }
    setCompleted(readCompletedCanonicalMatches(activeSeason.id));
    setResumeHints(readResumeHints(activeSeason.id));
    setHasHydratedProgress(true);
  }, [activeSeason, progressRevision]);

  // Keep the document title in sync for shell-owned screens (page children are not mounted).
  useEffect(() => {
    if (screen.type === "our-story") {
      document.title = OUR_STORY_TITLE;
      return;
    }
    if (screen.type === "home") {
      document.title = SITE_NAME;
    }
  }, [screen.type]);

  // Prefetch likely next routes so destination screens paint in one step.
  useEffect(() => {
    if (screen.type === "home") {
      router.prefetch(tournamentLandingPath("usa-1994"));
      router.prefetch(tournamentLandingPath("france-1998"));
      router.prefetch(tournamentLandingPath("korea-japan-2002"));
      router.prefetch("/our-story");
      return;
    }
    if (screen.type === "our-story") {
      router.prefetch("/");
      router.prefetch(tournamentLandingPath("usa-1994"));
      router.prefetch(tournamentLandingPath("france-1998"));
      router.prefetch(tournamentLandingPath("korea-japan-2002"));
      return;
    }
    if (
      screen.type === "tournament-landing" ||
      screen.type === "team-picker" ||
      screen.type === "experience"
    ) {
      const id = screen.tournamentId;
      router.prefetch(tournamentLandingPath(id));
      router.prefetch(experiencePath(id, "story"));
      router.prefetch(experiencePath(id, "essentials"));
      router.prefetch(experiencePath(id, "every-match"));
      router.prefetch(experiencePath(id, "team"));
      for (const team of getSupportedTeamJourneys(id)) {
        router.prefetch(experiencePath(id, "team", team.teamId));
      }
    }
  }, [router, screen]);

  function clearMatchState() {
    pendingEpisodeRef.current = null;
    setSelectedEpisode(null);
  }

  function navigateToSeason(seasonId: string, returnTo: ReturnTarget) {
    clearMatchState();
    if (!isSupportedTournamentId(seasonId)) {
      return;
    }
    setScreen({ type: "tournament-landing", tournamentId: seasonId, returnTo });
  }

  function openTeamPicker(tournamentId: TournamentId, returnTo: ReturnTarget) {
    clearMatchState();
    experienceIdRef.current = null;
    setScreen({
      type: "team-picker",
      tournamentId,
      returnTo,
    });
  }

  function rememberExperienceEntered(experience: TournamentExperience) {
    markJourneyEntered(experience.tournamentId);
    markExperienceEntered(experience.id);
    setResumeHints((prev) => {
      const enteredExperienceIds = new Set(prev.enteredExperienceIds);
      enteredExperienceIds.add(experience.id);
      return { ...prev, enteredExperienceIds };
    });
  }

  /** Navigate to an experience landing page. Never opens a match. */
  function openExperience(experience: TournamentExperience, returnTo: ReturnTarget) {
    rememberExperienceEntered(experience);
    clearMatchState();
    experienceIdRef.current = experience.id;
    setScreen({
      type: "experience",
      tournamentId: experience.tournamentId,
      experience,
      returnTo,
    });
  }

  /**
   * Explicit Resume / Continue Journey action only.
   * Opens the resume match together with the experience route — never used for
   * experience-card or nation selection.
   */
  function continueExperience(
    experience: TournamentExperience,
    returnTo: ReturnTarget
  ) {
    rememberExperienceEntered(experience);
    const lastViewed =
      resumeHints.lastViewedByExperienceId.get(experience.id) ??
      readLastViewedMatch(experience.id);
    const targetId = resolveContinueCanonicalMatchId(experience, completed, lastViewed);
    const episodes = resolveExperienceEpisodes(experience);
    const ep = targetId
      ? episodes.find((e) => e.canonicalMatchId === targetId) ?? null
      : null;

    // Open match with the destination screen in one transition — never paint
    // journey-without-match or match-without-journey as an intermediate state.
    pendingEpisodeRef.current = ep;
    setSelectedEpisode(ep);
    experienceIdRef.current = experience.id;
    setScreen({
      type: "experience",
      tournamentId: experience.tournamentId,
      experience,
      returnTo,
    });
  }

  function saveProgress(next: Set<string>) {
    if (!activeSeason || !isSupportedTournamentId(activeSeason.id)) return;
    setCompleted(next);
    writeCompletedCanonicalMatches(activeSeason.id, next);
    setProgressRevision((revision) => revision + 1);
  }

  function toggleComplete(ep: ExperienceEpisode) {
    const next = new Set(completed);
    if (next.has(ep.canonicalMatchId)) next.delete(ep.canonicalMatchId);
    else next.add(ep.canonicalMatchId);
    saveProgress(next);
  }

  function openEpisode(ep: ExperienceEpisode, experience: TournamentExperience) {
    writeLastViewedMatch(experience.id, ep.canonicalMatchId);
    setResumeHints((prev) => {
      const lastViewedByExperienceId = new Map(prev.lastViewedByExperienceId);
      lastViewedByExperienceId.set(experience.id, ep.canonicalMatchId);
      return { ...prev, lastViewedByExperienceId };
    });
    setSelectedEpisode(ep);
  }

  const isJourneyExperience = screen.type === "experience";

  const showChrome =
    screen.type !== "home" &&
    screen.type !== "our-story" &&
    screen.type !== "tournament-landing" &&
    !isJourneyExperience;

  /** Match-page context for feedback — only when a match is open. */
  const matchFeedbackContext = useMemo((): FeedbackPageContext | null => {
    if (
      !selectedEpisode ||
      !activeSeason ||
      screen.type !== "experience"
    ) {
      return null;
    }
    return {
      tournament: activeSeason.name,
      journey: screen.experience.title,
      experience: screen.experience.title,
      match: selectedEpisode.match,
      route: pathname,
      currentRoute: pathname,
    };
  }, [selectedEpisode, activeSeason, screen, pathname]);

  const overallArchive = useMemo(() => {
    if (
      screen.type !== "tournament-landing" &&
      screen.type !== "team-picker" &&
      screen.type !== "experience"
    ) {
      return null;
    }
    return getExperienceByRoute(screen.tournamentId, "every-match");
  }, [screen]);

  const showAppFooter =
    screen.type === "tournament-landing" ||
    screen.type === "team-picker" ||
    screen.type === "experience" ||
    showChrome;

  return (
    <main
      className={
        screen.type === "home" || screen.type === "our-story"
          ? "main--home"
          : screen.type === "tournament-landing" || isJourneyExperience
            ? "main--intro"
            : "main--app"
      }
    >
      {showChrome && (
        <header className="topbar">
          <button onClick={() => setScreen({ type: "home" })} className="wordmark">
            Football <span>Time Machine</span>
          </button>
          <nav className="topbar-nav" aria-label="Secondary">
            <button type="button" onClick={navigateToMensWorldCups}>
              World Cups
            </button>
            <button type="button" onClick={navigateToOurStory}>
              Our Story
            </button>
          </nav>
        </header>
      )}

      {screen.type === "home" && (
        <HomePage
          progressRevision={progressRevision}
          onNavigateToWorldCups={navigateToMensWorldCups}
          onNavigateToOurStory={navigateToOurStory}
          onSelectSeason={(seasonId) => navigateToSeason(seasonId, "home")}
          onBeginJourney={() => navigateToSeason("usa-1994", "home")}
          onContinueWatching={({ experience }) =>
            continueExperience(experience, "home")
          }
        />
      )}

      {screen.type === "our-story" && (
        <OurStoryPage
          onNavigateHome={navigateToHome}
          onBrowseArchive={browseArchive}
          onWorldCups={navigateToMensWorldCups}
          onSelectTournament={(href) => {
            const parsed = parseAppPathname(href);
            if (parsed?.type === "tournament-landing") {
              clearMatchState();
              setScreen(parsed);
            }
          }}
        />
      )}

      {screen.type === "tournament-landing" && activeSeason?.intro && (() => {
        const archiveProgress = overallArchive
          ? experienceProgress(overallArchive, completed)
          : { completed: 0, total: 0, percent: 0 };
        const defaultStory = getExperienceByRoute(screen.tournamentId, "story");
        const continueExp = hasHydratedProgress
          ? resolveContinueWatchingExperience(
              screen.tournamentId,
              completed,
              resumeHints
            )
          : null;
        const continueDetail =
          continueExp != null
            ? continueWatchingDetail(
                continueExp,
                completed,
                resumeHints.lastViewedByExperienceId.get(continueExp.id) ?? null
              )
            : null;
        const heroAction = buildTournamentHeroAction({
          hasHydratedProgress,
          seasonName: activeSeason.name,
          defaultStory,
          continueExperience: continueExp,
          continueDetail,
          continueLabel: activeSeason.intro.ctaContinue,
        });

        return (
          <TournamentLanding
            season={activeSeason}
            overallProgress={archiveProgress}
            heroAction={heroAction}
            onHeroAction={() => {
              if (heroAction.kind === "continue" && continueExp) {
                continueExperience(continueExp, screen.returnTo);
                return;
              }
              if (defaultStory) openExperience(defaultStory, screen.returnTo);
            }}
            onBack={() => navigateReturnTo(screen.returnTo)}
          >
            <ExperiencePicker
              tournamentId={screen.tournamentId}
              completedCanonicalIds={completed}
              onSelectOption={(option: ExperienceOption) => {
                if (option.type === "team") {
                  openTeamPicker(screen.tournamentId, screen.returnTo);
                  return;
                }
                const experience = getExperienceByRoute(
                  screen.tournamentId,
                  option.slug
                );
                if (experience) openExperience(experience, screen.returnTo);
              }}
              onOpenTeamPicker={() =>
                openTeamPicker(screen.tournamentId, screen.returnTo)
              }
              onSelectTeam={(teamId) => {
                const experience = getExperienceByRoute(
                  screen.tournamentId,
                  "team",
                  teamId
                );
                if (experience) openExperience(experience, screen.returnTo);
              }}
            />
          </TournamentLanding>
        );
      })()}

      {screen.type === "team-picker" && activeSeason && (
        <TeamPicker
          tournamentId={screen.tournamentId}
          tournamentName={activeSeason.name}
          completedCanonicalIds={completed}
          onBack={() => {
            clearMatchState();
            setScreen({
              type: "tournament-landing",
              tournamentId: screen.tournamentId,
              returnTo: screen.returnTo,
            });
          }}
          onSelectTeam={(teamId) => {
            const experience = getExperienceByRoute(
              screen.tournamentId,
              "team",
              teamId
            );
            if (experience) openExperience(experience, screen.returnTo);
          }}
        />
      )}

      {screen.type === "experience" && activeSeason && (() => {
        const experience = screen.experience;
        const goTournamentHome = () => {
          clearMatchState();
          setScreen({
            type: "tournament-landing",
            tournamentId: screen.tournamentId,
            returnTo: screen.returnTo,
          });
        };
        const teamName =
          experience.type === "team" && experience.teamId
            ? getSupportedTeamJourneys(screen.tournamentId).find(
                (t) => t.teamId === experience.teamId
              )?.teamName
            : undefined;

        return (
          <JourneyView
            season={activeSeason}
            experience={experience}
            episodes={experienceEpisodes}
            completedCanonicalIds={completed}
            teamName={teamName}
            onBack={goTournamentHome}
            onOpenEpisode={(ep) => openEpisode(ep, experience)}
          />
        );
      })()}

      {selectedEpisode && activeSeason && screen.type === "experience" && (() => {
        const experience = screen.experience;
        const index = experienceEpisodes.findIndex(
          (ep) => ep.canonicalMatchId === selectedEpisode.canonicalMatchId
        );
        const prev =
          index > 0 &&
          isExperienceMatchUnlocked(experience, index - 1, completed)
            ? experienceEpisodes[index - 1]
            : null;
        const nextCandidate = experienceEpisodes[index + 1] ?? null;
        const next =
          nextCandidate &&
          isExperienceMatchUnlocked(experience, index + 1, completed)
            ? nextCandidate
            : completed.has(selectedEpisode.canonicalMatchId) && nextCandidate
              ? isExperienceMatchUnlocked(
                  experience,
                  index + 1,
                  new Set([...completed, selectedEpisode.canonicalMatchId])
                )
                ? nextCandidate
                : null
              : null;

        return (
          <MatchExperienceModal
            episode={selectedEpisode}
            experience={experience}
            tournamentName={activeSeason.name}
            completed={completed.has(selectedEpisode.canonicalMatchId)}
            prev={prev}
            next={next}
            standings={standingsForEpisode(selectedEpisode)}
            feedbackContext={matchFeedbackContext}
            onClose={() => setSelectedEpisode(null)}
            onToggleComplete={() => toggleComplete(selectedEpisode)}
            onOpen={(ep) => openEpisode(ep, experience)}
            onBackToList={() => setSelectedEpisode(null)}
            onBackToExperienceHome={() => {
              clearMatchState();
              setScreen({
                type: "tournament-landing",
                tournamentId: screen.tournamentId,
                returnTo: screen.returnTo,
              });
            }}
          />
        );
      })()}

      {showAppFooter && (
        <SiteFooter
          variant="app"
          tagline="Where football history is experienced—not explained."
          feedbackContext={matchFeedbackContext}
        />
      )}
    </main>
  );
}
