"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { QaProgressRow } from "@/lib/archive/qa-report-types";
import { buildSearchUrl } from "@/lib/archive/recovery";
import type { RecoveryCandidate, RecoveryCandidatesStore, RecoveryQueueEntry } from "@/lib/archive/recovery-types";

const QA_SERVER = process.env.NEXT_PUBLIC_REPLAY_QA_SERVER ?? "http://localhost:3847";

type RecoveryRejectReason =
  | "wrong-match"
  | "highlights-only"
  | "deleted"
  | "private"
  | "geo-blocked"
  | "rejected";

function formatDuration(seconds: number | undefined): string {
  if (seconds === undefined) return "—";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

function formatFifaDiscoveryStatus(status: string | undefined): string {
  if (!status) return "not run";
  return status.replace(/-/g, " ");
}

function candidateBadgeClass(status: string): string {
  if (status === "promoted") return "qa-badge--verified";
  if (status === "rejected") return "qa-badge--failed";
  if (status === "metadata-valid") return "qa-badge--ok";
  if (status === "needs-human-review") return "qa-badge--review";
  return "qa-badge--untested";
}

async function postRecoveryAction(body: Record<string, unknown>) {
  const response = await fetch(`${QA_SERVER}/recovery`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    const payload = (await response.json().catch(() => ({}))) as { error?: string };
    throw new Error(payload.error ?? `Recovery action failed (${response.status})`);
  }
  return response.json();
}

function SearchShortcuts({ entry }: { entry: RecoveryQueueEntry }) {
  const primaryQuery = entry.searchQueries[0] ?? `${entry.teams} 1998 full match`;
  const fifaQuery =
    entry.fifaSearchQueries?.[0] ??
    `site:plus.fifa.com "${entry.homeTeam} v ${entry.awayTeam}" "Full Match Replay"`;
  return (
    <div className="qa-recovery-search-row">
      <a
        className="qa-recovery-search-btn"
        href={buildSearchUrl("fifa-plus", fifaQuery.replace(/^site:plus\.fifa\.com\s+/, ""))}
        target="_blank"
        rel="noreferrer"
        onClick={(e) => e.stopPropagation()}
      >
        Search FIFA+
      </a>
      <a
        className="qa-recovery-search-btn"
        href={buildSearchUrl("fifa", `"${entry.homeTeam} v ${entry.awayTeam}" "1998 FIFA World Cup"`)}
        target="_blank"
        rel="noreferrer"
        onClick={(e) => e.stopPropagation()}
      >
        Search FIFA
      </a>
      <a
        className="qa-recovery-search-btn"
        href={buildSearchUrl("youtube", primaryQuery)}
        target="_blank"
        rel="noreferrer"
        onClick={(e) => e.stopPropagation()}
      >
        Search YouTube
      </a>
      <a
        className="qa-recovery-search-btn"
        href={buildSearchUrl("dailymotion", primaryQuery)}
        target="_blank"
        rel="noreferrer"
        onClick={(e) => e.stopPropagation()}
      >
        Search Dailymotion
      </a>
      <a
        className="qa-recovery-search-btn"
        href={buildSearchUrl("web", primaryQuery)}
        target="_blank"
        rel="noreferrer"
        onClick={(e) => e.stopPropagation()}
      >
        Web search
      </a>
    </div>
  );
}

function CandidateCard({
  candidate,
  pending,
  serverLive,
  onAction,
}: {
  candidate: RecoveryCandidate;
  pending: string | null;
  serverLive: boolean;
  onAction: (action: string, reason?: RecoveryRejectReason) => void;
}) {
  const isPending = pending === candidate.candidateId;
  const isClosed =
    candidate.candidateStatus === "promoted" || candidate.candidateStatus === "rejected";

  return (
    <div className={`qa-recovery-candidate${isClosed ? " qa-recovery-candidate--closed" : ""}`}>
      <div className="qa-recovery-candidate-head">
        <span className="qa-source-provider">{candidate.provider}</span>
        {candidate.officialSource && (
          <span className="qa-badge qa-badge--verified">Official</span>
        )}
        <span className={`qa-badge ${candidateBadgeClass(candidate.candidateStatus)}`}>
          {candidate.candidateStatus}
        </span>
      </div>
      {candidate.title && <p className="qa-recovery-candidate-title">{candidate.title}</p>}
      <div className="qa-recovery-candidate-meta">
        {candidate.uploader && <span>{candidate.uploader}</span>}
        <span>{formatDuration(candidate.durationSeconds)}</span>
        {candidate.embeddable === false && <span className="qa-badge qa-badge--private">Not embeddable</span>}
      </div>
      <a
        className="qa-source-url"
        href={candidate.url}
        target="_blank"
        rel="noreferrer"
        onClick={(e) => e.stopPropagation()}
      >
        {candidate.url}
      </a>
      {candidate.rejectionReason && (
        <p className="qa-source-notes">{candidate.rejectionReason}</p>
      )}
      {!isClosed && (
        <div className="qa-recovery-candidate-actions">
          <a
            className="qa-action-btn"
            href={candidate.url}
            target="_blank"
            rel="noreferrer"
          >
            Open Candidate
          </a>
          <button
            type="button"
            className="qa-action-btn qa-action-btn--primary"
            disabled={!serverLive || isPending}
            onClick={() => onAction("verify-promote")}
          >
            Verify and Promote
          </button>
          <button
            type="button"
            className="qa-action-btn"
            disabled={!serverLive || isPending}
            onClick={() => onAction("reject", "wrong-match")}
          >
            Wrong Match
          </button>
          <button
            type="button"
            className="qa-action-btn"
            disabled={!serverLive || isPending}
            onClick={() => onAction("reject", "highlights-only")}
          >
            Highlights Only
          </button>
          <button
            type="button"
            className="qa-action-btn"
            disabled={!serverLive || isPending}
            onClick={() => onAction("reject", "deleted")}
          >
            Deleted
          </button>
          <button
            type="button"
            className="qa-action-btn"
            disabled={!serverLive || isPending}
            onClick={() => onAction("reject", "private")}
          >
            Private
          </button>
          <button
            type="button"
            className="qa-action-btn"
            disabled={!serverLive || isPending}
            onClick={() => onAction("reject", "geo-blocked")}
          >
            Geo-blocked
          </button>
          <button
            type="button"
            className="qa-action-btn qa-action-btn--danger"
            disabled={!serverLive || isPending}
            onClick={() => onAction("reject", "rejected")}
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
}

type RecoveryQueueViewProps = {
  serverLive: boolean;
  progress: QaProgressRow[];
  initialStore: RecoveryCandidatesStore;
  onPromoted?: () => void;
};

export default function RecoveryQueueView({
  serverLive,
  progress,
  initialStore,
  onPromoted,
}: RecoveryQueueViewProps) {
  const [store, setStore] = useState<RecoveryCandidatesStore | null>(initialStore);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [pending, setPending] = useState<string | null>(null);
  const [pasteUrl, setPasteUrl] = useState("");

  const loadStore = useCallback(async () => {
    try {
      if (serverLive) {
        const response = await fetch(`${QA_SERVER}/recovery`);
        if (response.ok) {
          setStore((await response.json()) as RecoveryCandidatesStore);
          setLoadError(null);
          return;
        }
      }
      setStore(initialStore);
      setLoadError(null);
    } catch (error) {
      setLoadError(error instanceof Error ? error.message : "Failed to load recovery queue");
    }
  }, [initialStore, serverLive]);

  useEffect(() => {
    loadStore();
  }, [loadStore]);

  const journeyProgress = useMemo(
    () =>
      progress.find(
        (row) => row.tournamentId === "france-1998" && row.kind === "journey"
      ),
    [progress]
  );

  const selectedEntry = useMemo(
    () => store?.queue.find((e) => e.canonicalMatchId === selectedId) ?? null,
    [store, selectedId]
  );

  const selectedCandidates = useMemo(() => {
    if (!store || !selectedId) return [];
    return store.candidates.filter((c) => c.canonicalMatchId === selectedId);
  }, [store, selectedId]);

  const runCandidateAction = useCallback(
    async (candidateId: string, action: string, reason?: RecoveryRejectReason) => {
      if (!serverLive) {
        alert("QA server offline. Run npm run replay-qa-server to persist changes.");
        return;
      }
      setPending(candidateId);
      try {
        if (action === "verify-promote") {
          await postRecoveryAction({ action: "verify-promote", candidateId });
          onPromoted?.();
        } else if (action === "reject" && reason) {
          await postRecoveryAction({ action: "reject", candidateId, reason });
        }
        await loadStore();
      } catch (error) {
        alert(error instanceof Error ? error.message : "Recovery action failed");
      } finally {
        setPending(null);
      }
    },
    [loadStore, onPromoted, serverLive]
  );

  const addCandidate = useCallback(async () => {
    if (!selectedEntry || !pasteUrl.trim()) return;
    if (!serverLive) {
      alert("QA server offline. Run npm run replay-qa-server to add candidates.");
      return;
    }
    setPending("add");
    try {
      await postRecoveryAction({
        action: "add-candidate",
        canonicalMatchId: selectedEntry.canonicalMatchId,
        tournamentId: selectedEntry.tournamentId,
        url: pasteUrl.trim(),
      });
      setPasteUrl("");
      await loadStore();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to add candidate");
    } finally {
      setPending(null);
    }
  }, [loadStore, pasteUrl, selectedEntry, serverLive]);

  if (loadError) {
    return (
      <div className="qa-state">
        <p className="qa-state-error">{loadError}</p>
        <p>
          Run <code>npm run generate-recovery-queue</code> to create the recovery queue.
        </p>
      </div>
    );
  }

  if (!store) {
    return <div className="qa-state">Loading recovery queue…</div>;
  }

  return (
    <div className="qa-recovery-layout">
      <div className="qa-recovery-summary">
        <strong>France &apos;98 Journey Recovery</strong>
        <span>
          {journeyProgress
            ? `${journeyProgress.humanVerified}/${journeyProgress.total} verified · ${store.queue.length} in queue`
            : `${store.queue.length} matches in queue`}
        </span>
        <span className="qa-recovery-summary-note">
          Paste discovered URLs below — never auto-verified without human playback review.
        </span>
      </div>

      <div className="qa-main qa-recovery-main">
        <section className="qa-table-pane" aria-label="Recovery queue">
          <div className="qa-table-scroll">
            <table className="qa-table">
              <thead>
                <tr>
                  <th className="qa-col-match">Match</th>
                  <th className="qa-col-stage">Stage</th>
                  <th className="qa-col-status">Importance</th>
                  <th className="qa-col-provider">Failed source</th>
                  <th className="qa-col-status">FIFA discovery</th>
                  <th className="qa-col-num">Candidates</th>
                </tr>
              </thead>
              <tbody>
                {store.queue.map((entry) => {
                  const candidateCount = store.candidates.filter(
                    (c) =>
                      c.canonicalMatchId === entry.canonicalMatchId &&
                      c.candidateStatus !== "rejected"
                  ).length;
                  const isSelected = entry.canonicalMatchId === selectedId;
                  return (
                    <tr
                      key={entry.canonicalMatchId}
                      className={[
                        isSelected ? "qa-row--selected" : "",
                        "qa-row--warning",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      onClick={() => setSelectedId(entry.canonicalMatchId)}
                    >
                      <td className="qa-col-match">{entry.teams}</td>
                      <td className="qa-col-stage">{entry.stage}</td>
                      <td className="qa-col-status">
                        <span
                          className={`qa-badge ${entry.importance === "knockout" ? "qa-badge--review" : "qa-badge--neutral"}`}
                        >
                          {entry.importance}
                        </span>
                      </td>
                      <td className="qa-col-provider" title={entry.failedSource?.failureReason}>
                        {entry.failedSource
                          ? `${entry.failedSource.provider} · ${entry.failedSource.status}`
                          : "—"}
                      </td>
                      <td className="qa-col-status">
                        <span className="qa-badge qa-badge--neutral">
                          {formatFifaDiscoveryStatus(entry.fifaDiscoveryStatus)}
                        </span>
                      </td>
                      <td className="qa-col-num">{candidateCount}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        <aside className="qa-inspector qa-recovery-inspector" aria-label="Recovery inspector">
          {!selectedEntry ? (
            <div className="qa-inspector--empty">
              Select a missing match to review candidates
              <br />
              Use search shortcuts to discover lawful sources
            </div>
          ) : (
            <>
              <div className="qa-inspector-header">
                <h2>{selectedEntry.teams}</h2>
                <div className="qa-inspector-meta">
                  <span>{selectedEntry.stage}</span>
                  <span>{selectedEntry.importance}</span>
                  <span>{selectedEntry.canonicalMatchId}</span>
                  {selectedEntry.fifaDiscoveryStatus && (
                    <span>FIFA: {formatFifaDiscoveryStatus(selectedEntry.fifaDiscoveryStatus)}</span>
                  )}
                </div>
              </div>

              <div className="qa-inspector-body">
                {selectedEntry.failedSource && (
                  <div>
                    <p className="qa-section-label">Failed source</p>
                    <div className="qa-source-card">
                      <div className="qa-source-card-head">
                        <span className="qa-source-provider">
                          {selectedEntry.failedSource.provider}
                        </span>
                        <span className="qa-badge qa-badge--failed">
                          {selectedEntry.failedSource.status}
                        </span>
                      </div>
                      <a
                        className="qa-source-url"
                        href={selectedEntry.failedSource.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {selectedEntry.failedSource.url}
                      </a>
                      <p className="qa-source-notes">
                        {selectedEntry.failedSource.failureReason}
                      </p>
                    </div>
                  </div>
                )}

                <div>
                  <p className="qa-section-label">Search shortcuts</p>
                  <SearchShortcuts entry={selectedEntry} />
                  <details className="qa-recovery-queries">
                    <summary>FIFA discovery queries</summary>
                    <ul>
                      {(selectedEntry.fifaSearchQueries ?? selectedEntry.searchQueries).map((q) => (
                        <li key={q}>
                          <code>{q}</code>
                        </li>
                      ))}
                    </ul>
                  </details>
                  <details className="qa-recovery-queries">
                    <summary>All discovery queries</summary>
                    <ul>
                      {selectedEntry.searchQueries.map((q) => (
                        <li key={q}>
                          <code>{q}</code>
                        </li>
                      ))}
                    </ul>
                  </details>
                </div>

                <div>
                  <p className="qa-section-label">Add candidate URL</p>
                  <div className="qa-recovery-paste-row">
                    <input
                      type="url"
                      className="qa-search"
                      placeholder="Paste FIFA, YouTube, or Dailymotion URL…"
                      value={pasteUrl}
                      onChange={(e) => setPasteUrl(e.target.value)}
                      disabled={!serverLive || pending === "add"}
                    />
                    <button
                      type="button"
                      className="qa-action-btn qa-action-btn--primary"
                      disabled={!serverLive || !pasteUrl.trim() || pending === "add"}
                      onClick={addCandidate}
                    >
                      Validate &amp; Add
                    </button>
                  </div>
                </div>

                <div>
                  <p className="qa-section-label">
                    Candidates ({selectedCandidates.length})
                  </p>
                  {selectedCandidates.length === 0 ? (
                    <p className="qa-source-notes">
                      No candidates yet. Search official sources and paste URLs above.
                    </p>
                  ) : (
                    <div className="qa-recovery-candidate-list">
                      {selectedCandidates.map((candidate) => (
                        <CandidateCard
                          key={candidate.candidateId}
                          candidate={candidate}
                          pending={pending}
                          serverLive={serverLive}
                          onAction={(action, reason) =>
                            runCandidateAction(candidate.candidateId, action, reason)
                          }
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="qa-inspector-footer">
                {serverLive
                  ? "Promote writes to archive + human-verification.json + replay-qa report"
                  : "Read-only — run npm run replay-qa-server to enable recovery actions"}
              </div>
            </>
          )}
        </aside>
      </div>
    </div>
  );
}
