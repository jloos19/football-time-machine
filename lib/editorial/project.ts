import type { ImpactPlayer, PostMatch } from "@/data/seasons";
import type { CanonicalMatchEditorial } from "./types";

/** Project canonical editorial into the Episode postMatch shape used by the UI. */
export function projectPostMatch(
  editorial: CanonicalMatchEditorial
): NonNullable<PostMatch> {
  const pm = editorial.postMatch;
  const keyEvents =
    pm.keyMoments.length > 0
      ? pm.keyMoments.map((moment) => {
          const base = moment.description
            ? `${moment.title}: ${moment.description}`
            : moment.title;
          return moment.minute ? `${moment.minute} ${base}` : base;
        })
      : [pm.matchReport];

  const impactPlayers: ImpactPlayer[] = pm.playersWhoShapedTheMatch.map(
    (player) => ({
      name: player.player,
      team: player.team,
      role: player.role,
      summary: player.description,
    })
  );

  return {
    score: pm.score,
    halftime: pm.halftime,
    goal: pm.goal,
    keyEvents,
    matchReport: pm.matchReport,
    keyMoments: pm.keyMoments,
    impactPlayers,
    sourceNote: pm.archiveNote,
  };
}
