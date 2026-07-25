import { WORLD_CUPS_NAV_LABEL } from "@/lib/home";

type SiteNavProps = {
  onWorldCups: () => void;
  onScrollToArchive: () => void;
  transparent?: boolean;
  active?: "world-cups" | "archive" | null;
};

export function SiteNav({
  onWorldCups,
  onScrollToArchive,
  transparent = true,
  active = null,
}: SiteNavProps) {
  return (
    <nav className={`site-nav ${transparent ? "site-nav--transparent" : ""}`} aria-label="Primary">
      <button type="button" className="site-nav__brand" onClick={onScrollToArchive}>
        Football Time Machine
      </button>
      <ul className="site-nav__links">
        <li>
          <button
            type="button"
            onClick={onWorldCups}
            aria-current={active === "world-cups" ? "page" : undefined}
            className={active === "world-cups" ? "site-nav__link--active" : undefined}
          >
            {WORLD_CUPS_NAV_LABEL}
          </button>
        </li>
        <li>
          <button
            type="button"
            className="site-nav__link--muted"
            disabled
            aria-disabled="true"
            title="Coming soon"
          >
            Club Football
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={onScrollToArchive}
            aria-current={active === "archive" ? "page" : undefined}
            className={active === "archive" ? "site-nav__link--active" : undefined}
          >
            The Archive
          </button>
        </li>
      </ul>
    </nav>
  );
}
