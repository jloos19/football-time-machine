"use client";

import { SiteFooter } from "@/components/feedback/SiteFooter";
import { ContinueWatching } from "./ContinueWatching";
import { Hero } from "./Hero";
import { PosterShelf } from "./PosterShelf";
import { SiteNav } from "./SiteNav";
import { MENS_WORLD_CUPS_SECTION_ID } from "@/lib/home";
import type { TournamentExperience } from "@/lib/experiences";
import type { TournamentId } from "@/lib/archive/types";

type HomePageProps = {
  onNavigateToWorldCups: () => void;
  onNavigateToOurStory: () => void;
  onSelectSeason: (seasonId: string) => void;
  onBeginJourney: () => void;
  onContinueWatching: (args: {
    tournamentId: TournamentId;
    experience: TournamentExperience;
  }) => void;
  progressRevision?: number;
};

export function HomePage({
  onNavigateToWorldCups,
  onNavigateToOurStory,
  onSelectSeason,
  onBeginJourney,
  onContinueWatching,
  progressRevision,
}: HomePageProps) {
  function scrollToArchive() {
    document
      .getElementById(MENS_WORLD_CUPS_SECTION_ID)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="home-page">
      <SiteNav
        onWorldCups={onNavigateToWorldCups}
        onScrollToArchive={scrollToArchive}
        onOurStory={onNavigateToOurStory}
      />
      <Hero
        progressRevision={progressRevision}
        onBeginJourney={onBeginJourney}
        onContinueWatching={onContinueWatching}
      />
      <ContinueWatching onSelectSeason={onSelectSeason} progressRevision={progressRevision} />
      <PosterShelf onSelectSeason={onSelectSeason} progressRevision={progressRevision} />
      <SiteFooter variant="home" />
    </div>
  );
}
