import { notFound } from "next/navigation";
import { loadReplayAuditReport } from "@/lib/dev/internal-reports";
import ReplayAuditClient from "./ReplayAuditClient";
import "./replay-audit.css";

export default function ReplayAuditPage() {
  if (process.env.NODE_ENV !== "development") {
    notFound();
  }

  const report = loadReplayAuditReport();

  return (
    <main className="replay-audit">
      <header className="replay-audit-header">
        <h1>Replay Audit</h1>
        <p>
          Development-only review of replay link audit results. Run{" "}
          <code>npm run audit-replays</code> to refresh the report.
        </p>
      </header>

      <ReplayAuditClient
        initialReport={report}
        initialError={
          report
            ? null
            : "No reports/replay-audit.json found. Run npm run audit-replays, then reload."
        }
      />
    </main>
  );
}
