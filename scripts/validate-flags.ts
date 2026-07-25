/**
 * Validation report: every participating nation has a team ID, country code, and flag.
 *
 * Usage: npx tsx scripts/validate-flags.ts
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import type { TournamentId } from "../lib/archive/types";
import { teamIdFromName } from "../lib/experiences/membership";
import {
  FRANCE_1998_PARTICIPANT_NAMES,
  KOREA_JAPAN_2002_PARTICIPANT_NAMES,
  USA_1994_PARTICIPANT_NAMES,
} from "../lib/experiences/participants";
import {
  teamCountryCode,
  teamFlagEmoji,
} from "../lib/ui/team-marks";

type Row = {
  tournament: string;
  teamId: string;
  displayName: string;
  countryCode: string;
  flag: string;
  status: "ok" | "missing";
};

const TOURNAMENTS: Array<{
  id: TournamentId;
  label: string;
  names: readonly string[];
}> = [
  { id: "usa-1994", label: "USA 1994", names: USA_1994_PARTICIPANT_NAMES },
  {
    id: "france-1998",
    label: "France 1998",
    names: FRANCE_1998_PARTICIPANT_NAMES,
  },
  {
    id: "korea-japan-2002",
    label: "Korea/Japan 2002",
    names: KOREA_JAPAN_2002_PARTICIPANT_NAMES,
  },
];

function auditRows(): Row[] {
  const rows: Row[] = [];
  for (const t of TOURNAMENTS) {
    for (const displayName of t.names) {
      const teamId = teamIdFromName(displayName);
      const countryCode = teamCountryCode(displayName) ?? "—";
      const flag = teamFlagEmoji(displayName);
      const status = flag === "🏳️" || countryCode === "—" ? "missing" : "ok";
      rows.push({
        tournament: t.label,
        teamId,
        displayName,
        countryCode,
        flag,
        status,
      });
    }
  }
  return rows;
}

function formatMarkdown(rows: Row[]): string {
  const ok = rows.filter((r) => r.status === "ok").length;
  const total = rows.length;
  const lines: string[] = [
    "# Flag system validation report",
    "",
    `Generated: ${new Date().toISOString().slice(0, 10)}`,
    "",
    `**Result: ${ok} of ${total} participating nations successfully render flags.**`,
    "",
    "Display names may differ from the canonical country code (e.g. `Korea Republic` and `South Korea` both resolve to `KR` / 🇰🇷).",
    "",
  ];

  for (const t of TOURNAMENTS) {
    const slice = rows.filter((r) => r.tournament === t.label);
    const sliceOk = slice.filter((r) => r.status === "ok").length;
    lines.push(`## ${t.label} (${sliceOk}/${slice.length})`);
    lines.push("");
    lines.push("| Team ID | Display name | Country code | Flag | Status |");
    lines.push("| --- | --- | --- | --- | --- |");
    for (const r of slice) {
      lines.push(
        `| \`${r.teamId}\` | ${r.displayName} | ${r.countryCode} | ${r.flag} | ${r.status} |`
      );
    }
    lines.push("");
  }

  return lines.join("\n");
}

const rows = auditRows();
const ok = rows.filter((r) => r.status === "ok").length;
const report = formatMarkdown(rows);
const outPath = join(process.cwd(), "reports", "flag-audit.md");
writeFileSync(outPath, report, "utf8");

console.log(report);
console.log(`Wrote ${outPath}`);
if (ok !== rows.length) {
  console.error(`\nFAIL: ${ok}/${rows.length} nations have flags.`);
  process.exit(1);
}
console.log(`\nPASS: ${ok}/${rows.length} nations have flags.`);
