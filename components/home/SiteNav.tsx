import { WORLD_CUPS_NAV_LABEL } from "@/lib/home";
import { OUR_STORY_NAV_LABEL } from "@/lib/our-story";

type SiteNavProps = {
  onWorldCups: () => void;
  onScrollToArchive: () => void;
  onOurStory: () => void;
  /** Brand click — defaults to archive scroll when omitted. */
  onBrand?: () => void;
  transparent?: boolean;
  active?: "world-cups" | "archive" | "our-story" | null;
};

export function SiteNav({
  onWorldCups,
  onScrollToArchive,
  onOurStory,
  onBrand,
  transparent = true,
  active = null,
}: SiteNavProps) {
  return (
    <nav className={`site-nav ${transparent ? "site-nav--transparent" : ""}`} aria-label="Primary">
      <button type="button" className="site-nav__brand" onClick={onBrand ?? onScrollToArchive}>
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
        <li>
          <button
            type="button"
            onClick={onOurStory}
            aria-current={active === "our-story" ? "page" : undefined}
            className={active === "our-story" ? "site-nav__link--active" : undefined}
          >
            {OUR_STORY_NAV_LABEL}
          </button>
        </li>
      </ul>
    </nav>
  );
}
