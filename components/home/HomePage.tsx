"use client";

import { Hero } from "./Hero";
import { PosterShelf } from "./PosterShelf";
import { SiteNav } from "./SiteNav";

type HomePageProps = {
  onNavigateToWorldCups: () => void;
  onSelectSeason: (seasonId: string) => void;
};

export function HomePage({ onNavigateToWorldCups, onSelectSeason }: HomePageProps) {
  function scrollToArchive() {
    document.getElementById("archive")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="home-page">
      <SiteNav onWorldCups={onNavigateToWorldCups} onScrollToArchive={scrollToArchive} />
      <Hero onBegin={scrollToArchive} />
      <PosterShelf onSelectSeason={onSelectSeason} />
      <footer className="home-footer">
        <p>Where football history is experienced — not explained.</p>
      </footer>
    </div>
  );
}
