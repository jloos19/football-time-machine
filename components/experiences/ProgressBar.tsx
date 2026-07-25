type ProgressBarProps = {
  value: number;
  max: number;
  label: string;
  /** Optional visible percent text beside the track. */
  showPercent?: boolean;
  /** Journey accent — gold (story), blue (essentials), green (archive), warm (team). */
  accent?: "gold" | "blue" | "green" | "warm";
  className?: string;
};

export function ProgressBar({
  value,
  max,
  label,
  showPercent = true,
  accent = "gold",
  className = "",
}: ProgressBarProps) {
  const percent = max <= 0 ? 0 : Math.round((value / max) * 100);
  const clamped = Math.max(0, Math.min(100, percent));

  return (
    <div
      className={`progress-bar progress-bar--${accent} ${className}`.trim()}
    >
      <div className="progress-bar__meta">
        <span className="progress-bar__label">{label}</span>
        {showPercent && (
          <span className="progress-bar__percent" aria-hidden="true">
            {`${clamped}%`}
          </span>
        )}
      </div>
      <div
        className="progress-bar__track"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={clamped}
        aria-label={label}
      >
        <div className="progress-bar__fill" style={{ width: `${clamped}%` }} />
      </div>
    </div>
  );
}
