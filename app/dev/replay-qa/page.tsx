import { notFound } from "next/navigation";
import {
  loadRecoveryCandidatesReport,
  loadReplayQaReport,
} from "@/lib/dev/internal-reports";
import ReplayQAClient from "./ReplayQAClient";
import "./replay-qa.css";

export default async function ReplayQAPage() {
  if (process.env.NODE_ENV !== "development") {
    notFound();
  }

  const report = await loadReplayQaReport();
  const recoveryStore = loadRecoveryCandidatesReport();

  return (
    <ReplayQAClient
      initialReport={{
        generatedAt: report.generatedAt,
        progress: report.progress,
        matches: report.matches,
      }}
      initialRecoveryStore={recoveryStore}
    />
  );
}
