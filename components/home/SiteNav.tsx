type SiteNavProps = {
  onWorldCups: () => void;
  onScrollToArchive: () => void;
  transparent?: boolean;
};

export function SiteNav({ onWorldCups, onScrollToArchive, transparent = true }: SiteNavProps) {
  return (
    <nav className={`site-nav ${transparent ? "site-nav--transparent" : ""}`} aria-label="Primary">
      <button type="button" className="site-nav__brand" onClick={onScrollToArchive}>
        Football Time Machine
      </button>
      <ul className="site-nav__links">
        <li>
          <button type="button" onClick={onWorldCups}>
            World Cups
          </button>
        </li>
        <li>
          <button type="button" className="site-nav__link--muted" disabled aria-disabled="true">
            Club Football
          </button>
        </li>
        <li>
          <button type="button" onClick={onScrollToArchive}>
            The Archive
          </button>
        </li>
      </ul>
    </nav>
  );
}
