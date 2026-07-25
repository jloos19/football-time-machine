"use client";

import type { TournamentId } from "@/lib/archive/types";
import {
  experienceProgress,
  getExperienceByRoute,
  getSupportedTeamJourneys,
} from "@/lib/experiences";
import { experienceActionLabel } from "@/lib/experiences/presentation";
import { ExperienceNav } from "./ExperienceNav";
import { TeamMark } from "./TeamMark";

type TeamPickerProps = {
  tournamentId: TournamentId;
  tournamentName: string;
  completedCanonicalIds: ReadonlySet<string>;
  onBack: () => void;
  onSelectTeam: (teamId: string) => void;
};

export function TeamPicker({
  tournamentId,
  tournamentName,
  completedCanonicalIds,
  onBack,
  onSelectTeam,
}: TeamPickerProps) {
  const teams = getSupportedTeamJourneys(tournamentId);

  return (
    <section className="team-picker" aria-label="Follow a team" data-testid="team-picker">
      <ExperienceNav
        tournamentLabel={tournamentName}
        experienceLabel="Follow a Team"
        crumbs={[
          { label: "Tournament home", onClick: onBack },
          { label: "Choose a team", current: true },
        ]}
      />

      <div className="section-title">
        <div>
          <p className="kicker red">Follow a Team</p>
          <h2>Choose a nation</h2>
          <p className="team-picker__lede">
            Experience the tournament through one nation’s eyes. How far each
            campaign goes stays hidden until you watch it unfold.
          </p>
        </div>
      </div>

      {teams.length === 0 ? (
        <div className="empty-state" role="status">
          <strong>No team journeys yet</strong>
          <p>Team paths for this tournament are still being prepared.</p>
        </div>
      ) : (
        <div className="team-grid" role="list">
          {teams.map((team) => {
            const experience = getExperienceByRoute(
              tournamentId,
              "team",
              team.teamId
            );
            if (!experience) return null;
            const progress = experienceProgress(
              experience,
              completedCanonicalIds
            );
            const action = experienceActionLabel(progress);
            const complete =
              progress.total > 0 && progress.completed >= progress.total;
            const started = progress.completed > 0;

            const statusLabel = complete
              ? "Campaign complete"
              : started
                ? "Journey begun"
                : "Begin campaign";

            return (
              <button
                key={team.teamId}
                type="button"
                role="listitem"
                className={[
                  "team-card",
                  started ? "team-card--started" : "",
                  complete ? "team-card--complete" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => onSelectTeam(team.teamId)}
                aria-label={`${action} ${team.teamName}. ${statusLabel}.`}
                data-team-id={team.teamId}
              >
                <span className="team-card__mark">
                  <TeamMark teamName={team.teamName} size="lg" labelled />
                </span>
                <span className="team-card__body">
                  <span className="team-card__name">{team.teamName}</span>
                  {team.shortDescription ? (
                    <span className="team-card__journey">
                      {team.shortDescription}
                    </span>
                  ) : null}
                  <span className="team-card__meta">{statusLabel}</span>
                </span>
                <strong className="team-card__cta">
                  {complete ? "Review" : started ? "Continue" : "Start"}
                  <span aria-hidden="true"> →</span>
                </strong>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}
