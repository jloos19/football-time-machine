"use client";

type Crumb = {
  label: string;
  onClick?: () => void;
  current?: boolean;
};

type ExperienceNavProps = {
  crumbs: Crumb[];
  tournamentLabel: string;
  experienceLabel?: string;
};

export function ExperienceNav({
  crumbs,
  tournamentLabel,
  experienceLabel,
}: ExperienceNavProps) {
  return (
    <nav className="experience-nav" aria-label="Experience location">
      <p className="experience-nav__context">
        <span className="experience-nav__tournament">{tournamentLabel}</span>
        {experienceLabel ? (
          <>
            <span aria-hidden="true" className="experience-nav__sep">
              /
            </span>
            <span className="experience-nav__experience">{experienceLabel}</span>
          </>
        ) : null}
      </p>
      <ol className="experience-nav__crumbs">
        {crumbs.map((crumb, index) => (
          <li key={`${crumb.label}-${index}`}>
            {crumb.current || !crumb.onClick ? (
              <span aria-current={crumb.current ? "page" : undefined}>
                {crumb.label}
              </span>
            ) : (
              <button type="button" onClick={crumb.onClick}>
                {crumb.label}
              </button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
