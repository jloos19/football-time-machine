"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { filterQaMatches, type QaMatchRow, type QaProgressRow } from "@/lib/archive/qa-report-types";
import type { RecoveryCandidatesStore } from "@/lib/archive/recovery-types";
import type { ExperienceKind, TournamentId } from "@/lib/archive/types";
import RecoveryQueueView from "./RecoveryQueueView";

const QA_SERVER = process.env.NEXT_PUBLIC_REPLAY_QA_SERVER ?? "http://localhost:3847";

type DashboardView = "qa" | "recovery";

type QaResponse = {
  generatedAt: string;
  progress: QaProgressRow[];
  matches: QaMatchRow[];
};

type ReplayQAClientProps = {
  initialReport: QaResponse;
  initialRecoveryStore: RecoveryCandidatesStore;
};

type HumanStatusFilter =
  | "all"
  | "untested"
  | "verified"
  | "failed"
  | "no-working-replay";

type LoadErrorDetails = {
  message: string;
  url: string;
  status?: number;
  responseText?: string;
};

type QaSource = {
  id: string;
  provider: string;
  url: string;
  humanStatus: string;
  automatedStatus: string;
  recheckRecommended: boolean;
  notes?: string;
  preferred?: boolean;
};

const EXPERIENCE_LABELS: Record<ExperienceKind, string> = {
  complete: "Complete",
  journey: "Journey",
  essential: "Essential",
};

const STATUS_PILLS: { value: HumanStatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "untested", label: "Untested" },
  { value: "verified", label: "Verified" },
  { value: "failed", label: "Failed" },
  { value: "no-working-replay", label: "No replay" },
];

const SHORTCUTS: [string, string][] = [
  ["/", "Focus search"],
  ["j / ↓", "Next match"],
  ["k / ↑", "Previous match"],
  ["Enter / o", "Open replay URL"],
  ["v", "Verify source"],
  ["f", "Fail source"],
  ["p", "Mark private"],
  ["d", "Mark dead"],
  ["w", "Wrong match"],
  ["n", "Save notes"],
  ["s", "Set preferred"],
  ["[ / ]", "Previous / next source"],
  ["?", "Toggle shortcuts"],
  ["Esc", "Clear selection"],
];

async function fetchJsonReport(url: string): Promise<QaResponse> {
  let response: Response;
  try {
    response = await fetch(url);
  } catch (error) {
    throw {
      message: error instanceof Error ? error.message : "Network request failed",
      url,
    } satisfies LoadErrorDetails;
  }

  const responseText = await response.text();
  if (!response.ok) {
    throw {
      message: `HTTP ${response.status}`,
      url,
      status: response.status,
      responseText: responseText.slice(0, 1000) || undefined,
    } satisfies LoadErrorDetails;
  }

  try {
    return JSON.parse(responseText) as QaResponse;
  } catch {
    throw {
      message: "Response was not valid JSON",
      url,
      status: response.status,
      responseText: responseText.slice(0, 1000) || undefined,
    } satisfies LoadErrorDetails;
  }
}

async function postQaAction(body: Record<string, unknown>) {
  const response = await fetch(`${QA_SERVER}/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error(`QA action failed (${response.status})`);
  }
}

async function pingQaServer(): Promise<boolean> {
  try {
    const response = await fetch(`${QA_SERVER}/`, { method: "GET" });
    return response.ok;
  } catch {
    return false;
  }
}

function getMatchSources(match: QaMatchRow): QaSource[] {
  const sources: QaSource[] = [];
  if (match.preferredSource) {
    sources.push({ ...match.preferredSource, preferred: true });
  }
  for (const alt of match.alternativeSources) {
    sources.push({
      id: alt.id,
      provider: alt.provider,
      url: alt.url,
      humanStatus: alt.humanStatus,
      automatedStatus: alt.automatedStatus,
      recheckRecommended: alt.recheckRecommended,
      notes: alt.notes,
    });
  }
  return sources;
}

function tournamentTag(id: TournamentId) {
  return id === "usa-1994" ? "USA" : "FRA";
}

function tournamentClass(id: TournamentId) {
  return id === "usa-1994" ? "qa-tourn-tag--usa" : "qa-tourn-tag--fra";
}

function formatDateShort(date: string) {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date.slice(0, 8);
  return parsed.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function humanBadgeClass(status: string) {
  if (status === "verified") return "qa-badge--verified";
  if (status === "failed") return "qa-badge--failed";
  if (status === "untested") return "qa-badge--untested";
  return "qa-badge--neutral";
}

function autoBadgeClass(status: string) {
  if (status === "ok") return "qa-badge--ok";
  if (status === "needs-review") return "qa-badge--review";
  if (status === "private" || status === "dead") return "qa-badge--private";
  return "qa-badge--neutral";
}

function StatusBadge({ status, kind }: { status: string; kind: "human" | "auto" }) {
  const cls = kind === "human" ? humanBadgeClass(status) : autoBadgeClass(status);
  const label =
    kind === "human" && status === "untested"
      ? "Untested"
      : status.replace(/-/g, " ");
  return <span className={`qa-badge ${cls}`}>{label}</span>;
}

function ProgressStrip({ rows }: { rows: QaProgressRow[] }) {
  return (
    <div className="qa-progress-strip">
      {rows.map((row) => {
        const pct = row.total > 0 ? Math.round((row.humanVerified / row.total) * 100) : 0;
        const tourn = row.tournamentId === "usa-1994" ? "USA" : "FRA";
        return (
          <div key={`${row.tournamentId}-${row.kind}`} className="qa-progress-item">
            <span>
              {tourn} {row.label.split(" ").slice(-1)[0]}
            </span>
            <div className="qa-progress-bar" title={`${pct}%`}>
              <div className="qa-progress-bar-fill" style={{ width: `${pct}%` }} />
            </div>
            <strong>
              {row.humanVerified}/{row.total}
            </strong>
          </div>
        );
      })}
    </div>
  );
}

function ShortcutsOverlay({ onClose }: { onClose: () => void }) {
  return (
    <div className="qa-shortcuts-overlay" onClick={onClose} role="presentation">
      <div
        className="qa-shortcuts-panel"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Keyboard shortcuts"
      >
        <h3>Keyboard shortcuts</h3>
        <dl className="qa-shortcuts-grid">
          {SHORTCUTS.map(([key, desc]) => (
            <div key={key} className="qa-shortcuts-row">
              <dt>
                <kbd>{key}</kbd>
              </dt>
              <dd>{desc}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

export default function ReplayQAClient({
  initialReport,
  initialRecoveryStore,
}: ReplayQAClientProps) {
  const [report, setReport] = useState<QaResponse | null>(initialReport);
  const [loadError, setLoadError] = useState<LoadErrorDetails | null>(null);
  const [serverLive, setServerLive] = useState(false);
  const [tournament, setTournament] = useState<TournamentId | "all">("all");
  const [experience, setExperience] = useState<ExperienceKind | "all">("all");
  const [status, setStatus] = useState<HumanStatusFilter>("all");
  const [provider, setProvider] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [pending, setPending] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [sourceIndex, setSourceIndex] = useState(0);
  const [notesDraft, setNotesDraft] = useState("");
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [view, setView] = useState<DashboardView>("qa");

  const searchRef = useRef<HTMLInputElement>(null);
  const rowRefs = useRef<Map<string, HTMLTableRowElement>>(new Map());

  const refreshAfterWrite = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (tournament !== "all") params.set("tournament", tournament);
      if (experience !== "all") params.set("experience", experience);
      if (status !== "all") params.set("status", status);
      if (provider !== "all") params.set("provider", provider);
      if (search.trim()) params.set("search", search.trim());
      const live = await fetchJsonReport(`${QA_SERVER}/?${params.toString()}`);
      setServerLive(true);
      return {
        generatedAt: live.generatedAt,
        progress: live.progress,
        matches: live.matches,
      } satisfies QaResponse;
    } catch {
      setServerLive(false);
      return initialReport;
    }
  }, [initialReport, tournament, experience, status, provider, search]);

  useEffect(() => {
    let cancelled = false;
    pingQaServer().then((live) => {
      if (!cancelled) {
        setServerLive(live);
        setLoadError(null);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredMatches = useMemo(() => {
    if (!report) return [];
    return filterQaMatches(report.matches, {
      tournament,
      experience,
      status,
      provider,
      search,
    });
  }, [report, tournament, experience, status, provider, search]);

  const progressSummary = useMemo(() => {
    if (!report) return [];
    return report.progress.filter((row) => row.total > 0);
  }, [report]);

  const selectedMatch = useMemo(
    () => filteredMatches.find((m) => m.canonicalMatchId === selectedId) ?? null,
    [filteredMatches, selectedId]
  );

  const selectedSources = useMemo(
    () => (selectedMatch ? getMatchSources(selectedMatch) : []),
    [selectedMatch]
  );

  const activeSource = selectedSources[sourceIndex] ?? null;

  const warningCount = useMemo(
    () => filteredMatches.filter((m) => m.noHumanVerifiedReplay).length,
    [filteredMatches]
  );

  const selectedRowIndex = useMemo(
    () =>
      selectedId
        ? filteredMatches.findIndex((m) => m.canonicalMatchId === selectedId)
        : -1,
    [filteredMatches, selectedId]
  );

  useEffect(() => {
    if (selectedMatch) {
      const sources = getMatchSources(selectedMatch);
      const src = sources[sourceIndex];
      setNotesDraft(src?.notes ?? "");
    }
  }, [selectedMatch, sourceIndex]);

  useEffect(() => {
    if (selectedId && !filteredMatches.some((m) => m.canonicalMatchId === selectedId)) {
      setSelectedId(null);
    }
  }, [filteredMatches, selectedId]);

  useEffect(() => {
    if (sourceIndex >= selectedSources.length) {
      setSourceIndex(Math.max(0, selectedSources.length - 1));
    }
  }, [selectedSources.length, sourceIndex]);

  const selectMatch = useCallback(
    (match: QaMatchRow, index?: number) => {
      setSelectedId(match.canonicalMatchId);
      setSourceIndex(0);
      requestAnimationFrame(() => {
        const row = rowRefs.current.get(match.canonicalMatchId);
        row?.scrollIntoView({ block: "nearest" });
      });
      if (index !== undefined) return;
    },
    []
  );

  const navigateRow = useCallback(
    (delta: number) => {
      if (filteredMatches.length === 0) return;
      const current = selectedRowIndex >= 0 ? selectedRowIndex : -1;
      const next = Math.max(0, Math.min(filteredMatches.length - 1, current + delta));
      selectMatch(filteredMatches[next]!);
    },
    [filteredMatches, selectedRowIndex, selectMatch]
  );

  const runAction = useCallback(
    async (
      match: QaMatchRow,
      sourceId: string,
      action: string,
      notes?: string
    ) => {
      if (!serverLive) {
        alert("QA server offline. Run npm run replay-qa-server to persist changes.");
        return;
      }
      const key = `${match.canonicalMatchId}:${sourceId}:${action}`;
      setPending(key);
      try {
        await postQaAction({
          tournamentId: match.tournamentId,
          canonicalMatchId: match.canonicalMatchId,
          sourceId,
          action,
          notes,
        });
        const refreshed = await refreshAfterWrite();
        setReport(refreshed);
      } catch (error) {
        alert(error instanceof Error ? error.message : "QA action failed");
      } finally {
        setPending(null);
      }
    },
    [refreshAfterWrite, serverLive]
  );

  const runOnActiveSource = useCallback(
    (action: string, notes?: string) => {
      if (!selectedMatch || !activeSource) return;
      runAction(selectedMatch, activeSource.id, action, notes);
    },
    [selectedMatch, activeSource, runAction]
  );

  const openActiveReplay = useCallback(() => {
    if (activeSource?.url) {
      window.open(activeSource.url, "_blank", "noopener,noreferrer");
    }
  }, [activeSource]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement)?.tagName;
      const inField = tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";

      if (e.key === "?" && !inField) {
        e.preventDefault();
        setShowShortcuts((v) => !v);
        return;
      }

      if (showShortcuts && e.key === "Escape") {
        setShowShortcuts(false);
        return;
      }

      if (inField && e.key !== "Escape") return;

      if (e.key === "/" && !inField) {
        e.preventDefault();
        searchRef.current?.focus();
        return;
      }

      if (e.key === "Escape") {
        setSelectedId(null);
        searchRef.current?.blur();
        return;
      }

      if (e.key === "j" || e.key === "ArrowDown") {
        e.preventDefault();
        navigateRow(1);
        return;
      }

      if (e.key === "k" || e.key === "ArrowUp") {
        e.preventDefault();
        navigateRow(-1);
        return;
      }

      if (!selectedMatch || !activeSource) return;

      if (e.key === "Enter" || e.key === "o") {
        e.preventDefault();
        openActiveReplay();
        return;
      }

      if (e.key === "[") {
        e.preventDefault();
        setSourceIndex((i) => Math.max(0, i - 1));
        return;
      }

      if (e.key === "]") {
        e.preventDefault();
        setSourceIndex((i) => Math.min(selectedSources.length - 1, i + 1));
        return;
      }

      if (pending) return;

      switch (e.key) {
        case "v":
          e.preventDefault();
          runOnActiveSource("verify");
          break;
        case "f":
          e.preventDefault();
          runOnActiveSource("fail", notesDraft || undefined);
          break;
        case "p":
          e.preventDefault();
          runOnActiveSource("private");
          break;
        case "d":
          e.preventDefault();
          runOnActiveSource("dead");
          break;
        case "w":
          e.preventDefault();
          runOnActiveSource("wrong-match", notesDraft || "Marked as wrong match.");
          break;
        case "n":
          e.preventDefault();
          runOnActiveSource("notes", notesDraft);
          break;
        case "s":
          e.preventDefault();
          runOnActiveSource("set-preferred");
          break;
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [
    navigateRow,
    openActiveReplay,
    pending,
    runOnActiveSource,
    selectedMatch,
    activeSource,
    selectedSources.length,
    notesDraft,
    showShortcuts,
  ]);

  function handleSearchKeyDown(e: ReactKeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (filteredMatches[0]) selectMatch(filteredMatches[0]);
    }
  }

  if (loadError) {
    return (
      <div className="replay-qa-ops">
        <div className="qa-state">
          <p className="qa-state-error">Could not load replay QA data: {loadError.message}</p>
          <p>
            Requested <code>{loadError.url}</code>
            {loadError.status !== undefined && ` · HTTP ${loadError.status}`}
          </p>
          <p>
            Generate with <code>npm run audit-replays</code>, then reload.
          </p>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="replay-qa-ops">
        <div className="qa-state">Loading replay QA data…</div>
      </div>
    );
  }

  const generatedLabel = new Date(report.generatedAt).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <div className="replay-qa-ops">
      <header className="qa-topbar">
        <div className="qa-topbar-title">
          <span
            className={`qa-server-dot ${serverLive ? "qa-server-dot--live" : "qa-server-dot--readonly"}`}
            title={serverLive ? "QA server connected" : "Read-only (start replay-qa-server)"}
          />
          Replay QA
          <span>ops</span>
        </div>
        <ProgressStrip rows={progressSummary} />
        <span className="qa-topbar-meta">{generatedLabel}</span>
        <div className="qa-topbar-actions">
          <div className="qa-view-tabs" role="tablist" aria-label="Dashboard view">
            <button
              type="button"
              role="tab"
              aria-selected={view === "qa"}
              className={`qa-view-tab${view === "qa" ? " qa-view-tab--active" : ""}`}
              onClick={() => setView("qa")}
            >
              QA
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={view === "recovery"}
              className={`qa-view-tab${view === "recovery" ? " qa-view-tab--active" : ""}`}
              onClick={() => setView("recovery")}
            >
              Recovery Queue
            </button>
          </div>
          <button
            type="button"
            className="qa-icon-btn"
            title="Keyboard shortcuts (?)"
            onClick={() => setShowShortcuts(true)}
          >
            ?
          </button>
        </div>
      </header>

      {view === "recovery" ? (
        <RecoveryQueueView
          serverLive={serverLive}
          progress={progressSummary}
          initialStore={initialRecoveryStore}
          onPromoted={async () => {
            const refreshed = await refreshAfterWrite();
            setReport(refreshed);
          }}
        />
      ) : (
        <>
      <div className="qa-filterbar">
        <div className="qa-search-wrap">
          <input
            ref={searchRef}
            type="search"
            className="qa-search"
            placeholder="Search teams or ID…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearchKeyDown}
          />
          <kbd>/</kbd>
        </div>

        <select
          className="qa-select"
          value={tournament}
          onChange={(e) => setTournament(e.target.value as TournamentId | "all")}
          aria-label="Tournament"
        >
          <option value="all">All tournaments</option>
          <option value="usa-1994">USA &apos;94</option>
          <option value="france-1998">France &apos;98</option>
        </select>

        <select
          className="qa-select"
          value={experience}
          onChange={(e) => setExperience(e.target.value as ExperienceKind | "all")}
          aria-label="Experience"
        >
          <option value="all">All experiences</option>
          <option value="complete">Complete</option>
          <option value="journey">Journey</option>
          <option value="essential">Essential</option>
        </select>

        <select
          className="qa-select"
          value={provider}
          onChange={(e) => setProvider(e.target.value)}
          aria-label="Provider"
        >
          <option value="all">All providers</option>
          <option value="FIFA">FIFA</option>
          <option value="Official broadcaster">Broadcaster</option>
          <option value="Dailymotion">Dailymotion</option>
          <option value="YouTube">YouTube</option>
        </select>

        <div className="qa-pills" role="group" aria-label="Status filter">
          {STATUS_PILLS.map((pill) => (
            <button
              key={pill.value}
              type="button"
              className={`qa-pill${status === pill.value ? " qa-pill--active" : ""}`}
              onClick={() => setStatus(pill.value)}
            >
              {pill.label}
            </button>
          ))}
        </div>

        <span className="qa-filter-count">
          {filteredMatches.length} / {report.matches.length}
        </span>
      </div>

      {warningCount > 0 && status !== "no-working-replay" && (
        <div className="qa-warning-banner">
          {warningCount} match{warningCount === 1 ? "" : "es"} in view without a verified replay
        </div>
      )}

      <div className="qa-main">
        <section className="qa-table-pane" aria-label="Match list">
          <div className="qa-table-scroll">
            <table className="qa-table">
              <thead>
                <tr>
                  <th className="qa-col-num">#</th>
                  <th className="qa-col-tourn">T</th>
                  <th className="qa-col-match">Match</th>
                  <th className="qa-col-stage">Stage</th>
                  <th className="qa-col-date">Date</th>
                  <th className="qa-col-status">Human</th>
                  <th className="qa-col-provider">Provider</th>
                  <th className="qa-col-auto">Auto</th>
                </tr>
              </thead>
              <tbody>
                {filteredMatches.length === 0 ? (
                  <tr>
                    <td colSpan={8}>
                      <div className="qa-table-empty">No matches match current filters</div>
                    </td>
                  </tr>
                ) : (
                  filteredMatches.map((match) => {
                    const isSelected = match.canonicalMatchId === selectedId;
                    const providerLabel =
                      match.preferredSource?.provider ??
                      match.alternativeSources[0]?.provider ??
                      "—";
                    const autoStatus =
                      match.preferredSource?.automatedStatus ??
                      match.alternativeSources[0]?.automatedStatus ??
                      "—";

                    return (
                      <tr
                        key={match.canonicalMatchId}
                        ref={(el) => {
                          if (el) rowRefs.current.set(match.canonicalMatchId, el);
                          else rowRefs.current.delete(match.canonicalMatchId);
                        }}
                        className={[
                          isSelected ? "qa-row--selected" : "",
                          match.noHumanVerifiedReplay ? "qa-row--warning" : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        onClick={() => selectMatch(match)}
                        onDoubleClick={() => {
                          selectMatch(match);
                          const url =
                            match.preferredSource?.url ??
                            match.alternativeSources[0]?.url;
                          if (url) window.open(url, "_blank", "noopener,noreferrer");
                        }}
                      >
                        <td className="qa-col-num">
                          {String(match.officialMatchNumber ?? match.chronologicalIndex).padStart(
                            2,
                            "0"
                          )}
                        </td>
                        <td className="qa-col-tourn">
                          <span
                            className={`qa-tourn-tag ${tournamentClass(match.tournamentId)}`}
                          >
                            {tournamentTag(match.tournamentId)}
                          </span>
                        </td>
                        <td className="qa-col-match" title={match.teams}>
                          {match.teams}
                        </td>
                        <td className="qa-col-stage" title={match.stage}>
                          {match.stage}
                        </td>
                        <td className="qa-col-date">{formatDateShort(match.date)}</td>
                        <td className="qa-col-status">
                          {match.noHumanVerifiedReplay ? (
                            <span className="qa-badge qa-badge--missing">No replay</span>
                          ) : (
                            <StatusBadge status={match.humanStatus} kind="human" />
                          )}
                        </td>
                        <td className="qa-col-provider" title={providerLabel}>
                          {providerLabel}
                        </td>
                        <td className="qa-col-auto">
                          {autoStatus !== "—" ? (
                            <StatusBadge status={autoStatus} kind="auto" />
                          ) : (
                            "—"
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </section>

        <aside className="qa-inspector" aria-label="Match inspector">
          {!selectedMatch ? (
            <div className="qa-inspector--empty">
              Select a match to inspect
              <br />
              <kbd>j</kbd> <kbd>k</kbd> navigate · <kbd>/</kbd> search · <kbd>?</kbd> shortcuts
            </div>
          ) : (
            <>
              <div className="qa-inspector-header">
                <h2>{selectedMatch.teams}</h2>
                <div className="qa-inspector-meta">
                  <span>{selectedMatch.date}</span>
                  <span>{selectedMatch.stage}</span>
                  <span>{selectedMatch.canonicalMatchId}</span>
                  <span>
                    #{selectedMatch.officialMatchNumber ?? selectedMatch.chronologicalIndex}
                  </span>
                </div>
              </div>

              <div className="qa-inspector-body">
                <div>
                  <p className="qa-section-label">Experiences</p>
                  <div className="qa-experience-tags">
                    {selectedMatch.experiences.map((exp) => (
                      <span key={exp} className="qa-exp-tag">
                        {EXPERIENCE_LABELS[exp]}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="qa-section-label">
                    Sources ({selectedSources.length}) · <kbd>[</kbd> <kbd>]</kbd>
                  </p>
                  <div className="qa-source-list">
                    {selectedSources.length === 0 ? (
                      <p className="qa-source-notes">No replay sources available</p>
                    ) : (
                      selectedSources.map((source, idx) => (
                        <div
                          key={source.id}
                          className={`qa-source-card${idx === sourceIndex ? " qa-source-card--active" : ""}`}
                          onClick={() => setSourceIndex(idx)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") setSourceIndex(idx);
                          }}
                          role="button"
                          tabIndex={0}
                        >
                          <div className="qa-source-card-head">
                            <span className="qa-source-provider">
                              {source.provider}
                              {source.preferred && " · preferred"}
                            </span>
                            <StatusBadge status={source.humanStatus} kind="human" />
                          </div>
                          <a
                            className="qa-source-url"
                            href={source.url}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {source.url}
                          </a>
                          <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                            <StatusBadge status={source.automatedStatus} kind="auto" />
                            {source.recheckRecommended && (
                              <span className="qa-badge qa-badge--review">Recheck</span>
                            )}
                          </div>
                          {source.notes && (
                            <p className="qa-source-notes">{source.notes}</p>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {activeSource && (
                  <>
                    <a
                      className="qa-open-btn"
                      href={activeSource.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Open replay · <kbd>Enter</kbd>
                    </a>

                    <div>
                      <p className="qa-section-label">Notes · <kbd>n</kbd> save</p>
                      <textarea
                        className="qa-notes-field"
                        value={notesDraft}
                        onChange={(e) => setNotesDraft(e.target.value)}
                        placeholder="Verification notes…"
                        rows={3}
                      />
                    </div>

                    <div>
                      <p className="qa-section-label">Actions</p>
                      <div className="qa-action-grid">
                        <button
                          type="button"
                          className="qa-action-btn qa-action-btn--primary"
                          disabled={
                            pending ===
                            `${selectedMatch.canonicalMatchId}:${activeSource.id}:verify`
                          }
                          onClick={() => runOnActiveSource("verify")}
                        >
                          Verify <kbd>v</kbd>
                        </button>
                        <button
                          type="button"
                          className="qa-action-btn qa-action-btn--danger"
                          disabled={
                            pending ===
                            `${selectedMatch.canonicalMatchId}:${activeSource.id}:fail`
                          }
                          onClick={() =>
                            runOnActiveSource("fail", notesDraft || undefined)
                          }
                        >
                          Fail <kbd>f</kbd>
                        </button>
                        <button
                          type="button"
                          className="qa-action-btn"
                          disabled={!!pending}
                          onClick={() => runOnActiveSource("private")}
                        >
                          Private <kbd>p</kbd>
                        </button>
                        <button
                          type="button"
                          className="qa-action-btn"
                          disabled={!!pending}
                          onClick={() => runOnActiveSource("dead")}
                        >
                          Dead <kbd>d</kbd>
                        </button>
                        <button
                          type="button"
                          className="qa-action-btn"
                          disabled={!!pending}
                          onClick={() =>
                            runOnActiveSource(
                              "wrong-match",
                              notesDraft || "Marked as wrong match."
                            )
                          }
                        >
                          Wrong match <kbd>w</kbd>
                        </button>
                        <button
                          type="button"
                          className="qa-action-btn"
                          disabled={!!pending}
                          onClick={() => runOnActiveSource("set-preferred")}
                        >
                          Set preferred <kbd>s</kbd>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="qa-inspector-footer">
                {serverLive
                  ? "Changes persist to data/replay-qa/human-verification.json"
                  : "Read-only — run npm run replay-qa-server to enable writes"}
              </div>
            </>
          )}
        </aside>
      </div>
        </>
      )}

      {showShortcuts && <ShortcutsOverlay onClose={() => setShowShortcuts(false)} />}
    </div>
  );
}
