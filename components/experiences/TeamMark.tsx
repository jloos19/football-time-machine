"use client";

import { teamFlagEmoji, teamInitials } from "@/lib/ui/team-marks";

type TeamMarkProps = {
  teamName: string;
  size?: "sm" | "md" | "lg";
  /** Decorative by default; set labelled when the name is not adjacent. */
  labelled?: boolean;
};

export function TeamMark({
  teamName,
  size = "md",
  labelled = false,
}: TeamMarkProps) {
  const flag = teamFlagEmoji(teamName);
  const initials = teamInitials(teamName);

  return (
    <span
      className={`team-mark team-mark--${size}`}
      aria-hidden={labelled ? undefined : true}
      aria-label={labelled ? teamName : undefined}
      title={teamName}
    >
      <span className="team-mark__flag">{flag}</span>
      <span className="team-mark__fallback" aria-hidden="true">
        {initials}
      </span>
    </span>
  );
}
