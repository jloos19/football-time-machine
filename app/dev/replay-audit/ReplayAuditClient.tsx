"use client";

import { useMemo, useState } from "react";
import type { ReplayAuditReport } from "@/lib/replays/audit-report";
import type { ReplayProvider, ReplaySourceStatus } from "@/lib/replays/types";

type StatusFilter = ReplaySourceStatus | "all";
type TournamentFilter = "all" | "usa-1994" | "france-1998";
type ProviderFilter = ReplayProvider | "all";

type ReplayAuditClientProps = {
  initialReport: ReplayAuditReport | null;
  initialError?: string | null;
};

function statusClass(auditResult: string): string | undefined {
  if (auditResult === "private") return "replay-audit-row-private";
  if (auditResult === "dead") return "replay-audit-row-dead";
  if (auditResult === "needs-review" || auditResult === "error") {
    return "replay-audit-row-review";
  }
  return undefined;
}

export default function ReplayAuditClient({
  initialReport,
  initialError = null,
}: ReplayAuditClientProps) {
  const [report] = useState<ReplayAuditReport | null>(initialReport);
  const [loadError] = useState<string | null>(initialError);
  const [tournament, setTournament] = useState<TournamentFilter>("all");
  const [provider, setProvider] = useState<ProviderFilter>("all");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [noVerifiedOnly, setNoVerifiedOnly] = useState(false);

  const unavailableMatchKeys = useMemo(() => {
    if (!report) return new Set<string>();
    return new Set(
      report.matches
        .filter((match) => !match.hasVerifiedReplay)
        .map((match) => `${match.tournamentId}:${match.episodeId}`)
    );
  }, [report?.matches]);

  const filteredSources = useMemo(() => {
    if (!report) return [];
    return report.sources.filter((row) => {
      if (tournament !== "all" && row.tournamentId !== tournament) return false;
      if (provider !== "all" && row.provider !== provider) return false;
      if (status !== "all" && row.recommendedStatus !== status) return false;
      if (
        noVerifiedOnly &&
        !unavailableMatchKeys.has(`${row.tournamentId}:${row.episodeId}`)
      ) {
        return false;
      }
      return true;
    });
  }, [
    report?.sources,
    tournament,
    provider,
    status,
    noVerifiedOnly,
    unavailableMatchKeys,
  ]);

  const filteredMatches = useMemo(() => {
    if (!report) return [];
    return report.matches.filter((match) => {
      if (tournament !== "all" && match.tournamentId !== tournament) return false;
      if (noVerifiedOnly && match.hasVerifiedReplay) return false;
      return true;
    });
  }, [report?.matches, tournament, noVerifiedOnly]);

  if (loadError) {
    return (
      <section className="replay-audit-empty">
        <p>Could not load replay audit report.</p>
        <p>{loadError}</p>
        <p>
          Generate one with <code>npm run audit-replays</code>, then reload this page.
        </p>
      </section>
    );
  }

  if (!report) {
    return (
      <section className="replay-audit-empty">
        <p>Loading replay audit report…</p>
      </section>
    );
  }

  return (
    <div className="replay-audit-layout">
      <section className="replay-audit-summary">
        <div className="replay-audit-summary-card">
          <h2>Overall</h2>
          <ul>
            <li>Sources checked: {report.summary.totalSourcesChecked}</li>
            <li>Broken Dailymotion: {report.summary.brokenDailymotion}</li>
            <li>Generated: {new Date(report.generatedAt).toLocaleString()}</li>
          </ul>
        </div>
        <div className="replay-audit-summary-card">
          <h2>USA &apos;94</h2>
          <ul>
            <li>Verified: {report.summary["usa-1994"].verified}</li>
            <li>Needs review: {report.summary["usa-1994"].needsReview}</li>
            <li>Private: {report.summary["usa-1994"].private}</li>
            <li>Dead: {report.summary["usa-1994"].dead}</li>
            <li>No verified replay: {report.summary["usa-1994"].noVerifiedReplay}</li>
          </ul>
        </div>
        <div className="replay-audit-summary-card">
          <h2>France &apos;98</h2>
          <ul>
            <li>Verified: {report.summary["france-1998"].verified}</li>
            <li>Needs review: {report.summary["france-1998"].needsReview}</li>
            <li>Private: {report.summary["france-1998"].private}</li>
            <li>Dead: {report.summary["france-1998"].dead}</li>
            <li>No verified replay: {report.summary["france-1998"].noVerifiedReplay}</li>
          </ul>
        </div>
      </section>

      <section className="replay-audit-filters" aria-label="Replay audit filters">
        <label>
          Tournament
          <select
            value={tournament}
            onChange={(event) =>
              setTournament(event.target.value as TournamentFilter)
            }
          >
            <option value="all">All tournaments</option>
            <option value="usa-1994">USA &apos;94</option>
            <option value="france-1998">France &apos;98</option>
          </select>
        </label>
        <label>
          Provider
          <select
            value={provider}
            onChange={(event) => setProvider(event.target.value as ProviderFilter)}
          >
            <option value="all">All providers</option>
            <option value="FIFA">FIFA</option>
            <option value="Official broadcaster">Official broadcaster</option>
            <option value="Dailymotion">Dailymotion</option>
            <option value="YouTube">YouTube</option>
          </select>
        </label>
        <label>
          Status
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value as StatusFilter)}
          >
            <option value="all">All statuses</option>
            <option value="active">Active</option>
            <option value="needs-review">Needs review</option>
            <option value="private">Private</option>
            <option value="dead">Dead</option>
          </select>
        </label>
        <label className="replay-audit-filter-checkbox">
          <input
            type="checkbox"
            checked={noVerifiedOnly}
            onChange={(event) => setNoVerifiedOnly(event.target.checked)}
          />
          Matches with no verified source
        </label>
      </section>

      <div className="replay-audit-table-wrap">
        <table className="replay-audit-table">
          <thead>
            <tr>
              <th>Tournament</th>
              <th>Match</th>
              <th>Teams</th>
              <th>Provider</th>
              <th>URL</th>
              <th>Previous</th>
              <th>Audit</th>
              <th>Recommended</th>
              <th>Reason</th>
              <th>Last checked</th>
            </tr>
          </thead>
          <tbody>
            {filteredSources.map((row) => (
              <tr
                key={`${row.episodeId}-${row.provider}-${row.url}`}
                className={statusClass(row.auditResult)}
              >
                <td>{row.tournament}</td>
                <td>{String(row.matchNumber).padStart(2, "0")}</td>
                <td>{row.teams}</td>
                <td>{row.provider}</td>
                <td>
                  <a href={row.url} target="_blank" rel="noreferrer">
                    {row.url}
                  </a>
                </td>
                <td>
                  {row.previousStatus}
                  {row.previousVerified ? ", verified" : ", unverified"}
                </td>
                <td>{row.auditResult}</td>
                <td>
                  {row.recommendedStatus}
                  {row.recommendedVerified ? ", verified" : ", unverified"}
                </td>
                <td className="replay-audit-notes">{row.reason}</td>
                <td>{new Date(row.lastChecked).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="replay-audit-unavailable">
        <h2>Matches without a verified replay</h2>
        {filteredMatches.filter((match) => !match.hasVerifiedReplay).length === 0 ? (
          <p>No matches in the current filter lack a verified replay source.</p>
        ) : (
          <ul>
            {filteredMatches
              .filter((match) => !match.hasVerifiedReplay)
              .map((match) => (
                <li key={match.episodeId}>
                  {match.tournament} match {String(match.matchNumber).padStart(2, "0")}:{" "}
                  {match.teams}
                </li>
              ))}
          </ul>
        )}
      </section>
    </div>
  );
}
