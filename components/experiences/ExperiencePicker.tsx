"use client";

import type { ExperienceOption } from "@/lib/experiences";
import {
  experienceProgress,
  getExperienceByRoute,
  getSupportedTeamJourneys,
  getTournamentExperienceOptions,
} from "@/lib/experiences";
import type { TournamentId } from "@/lib/archive/types";
import { ExperienceCard } from "./ExperienceCard";

type ExperiencePickerProps = {
  tournamentId: TournamentId;
  completedCanonicalIds: ReadonlySet<string>;
  /** Enter an experience landing page (never opens a match). */
  onSelectOption: (option: ExperienceOption) => void;
  /** Enter a team-journey landing page (never opens a match). */
  onSelectTeam?: (teamId: string) => void;
  /** Open the Follow a Team nation-selection page (never opens a match). */
  onOpenTeamPicker?: () => void;
};

export function ExperiencePicker({
  tournamentId,
  completedCanonicalIds,
  onSelectOption,
  onSelectTeam,
  onOpenTeamPicker,
}: ExperiencePickerProps) {
  const options = getTournamentExperienceOptions(tournamentId);
  const teams = getSupportedTeamJourneys(tournamentId);

  return (
    <div className="experience-picker" data-testid="experience-picker">
      <div className="section-title experience-picker__intro">
        <div>
          <p className="kicker red">Journeys</p>
          <h2>How will you enter the summer?</h2>
          <p className="experience-picker__lede">
            Each path is a distinct way to experience the same tournament. Start
            with The Story — or choose the route that fits how you want to watch.
          </p>
        </div>
      </div>

      <div className="experience-grid" role="list">
        {options.map((option) => {
          const featured =
            option.type === "story"
              ? ("primary" as const)
              : option.type === "essentials"
                ? ("secondary" as const)
                : false;

          if (option.type === "team") {
            return (
              <div
                key={option.slug}
                role="listitem"
                className="experience-grid__item experience-grid__item--team"
              >
                <ExperienceCard
                  type="team"
                  title={option.title}
                  description={option.shortDescription}
                  matchCount={0}
                  completedCount={0}
                  percent={0}
                  featured={featured}
                  hidePrimary
                  teamPreview={teams}
                  onSelectTeam={onSelectTeam}
                  onPrimary={() =>
                    onOpenTeamPicker ? onOpenTeamPicker() : onSelectOption(option)
                  }
                />
              </div>
            );
          }

          const experience = getExperienceByRoute(tournamentId, option.slug);
          if (!experience || experience.canonicalMatchIds.length === 0) {
            return null;
          }
          const progress = experienceProgress(experience, completedCanonicalIds);
          const itemClass =
            featured === "primary"
              ? "experience-grid__item experience-grid__item--primary"
              : featured === "secondary"
                ? "experience-grid__item experience-grid__item--secondary"
                : "experience-grid__item";

          return (
            <div key={option.slug} role="listitem" className={itemClass}>
              <ExperienceCard
                type={option.type}
                title={option.title}
                description={option.shortDescription}
                matchCount={progress.total}
                completedCount={progress.completed}
                percent={progress.percent}
                featured={featured}
                onPrimary={() => onSelectOption(option)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
