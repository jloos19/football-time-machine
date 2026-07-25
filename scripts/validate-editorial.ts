import {
  findDuplicateEditorialReports,
  formatCoverageTable,
  formatKoreaJapan2002ProfileAudit,
  formatTeamProfileCoverage,
  validateDossierSimilarity,
  validateTeamDossiers,
  validateTournamentEditorial,
} from "../lib/editorial/validate";

const usa = validateTournamentEditorial("usa-1994");
const fra = validateTournamentEditorial("france-1998");
const kor = validateTournamentEditorial("korea-japan-2002");
const dossiers = validateTeamDossiers();
const profileCoverage = formatTeamProfileCoverage(dossiers);
const dupes = findDuplicateEditorialReports();
const similarity2002 = validateDossierSimilarity("korea-japan-2002");
const audit2002 = formatKoreaJapan2002ProfileAudit(similarity2002);

console.log("tournament | canonical matches | pre-match complete | post-match complete | missing");
console.log(formatCoverageTable(usa));
console.log(formatCoverageTable(fra));
console.log(formatCoverageTable(kor));
console.log("");
console.log("tournament | team | dossier complete | roster | sources | spoiler-safe | fallback");
for (const row of dossiers) {
  console.log(
    `${row.tournament} | ${row.team} | ${row.dossierComplete ? "yes" : "no"} | ${
      row.rosterPresent ? "yes" : "no"
    } | ${row.sourcesPresent ? "yes" : "no"} | ${row.spoilerSafe ? "yes" : "no"} | ${
      row.usesFallback ? "yes" : "no"
    }`
  );
}
console.log("");
console.log("tournament | teams | profiles complete | missing | fallback");
for (const row of profileCoverage) {
  console.log(
    `${row.tournament} | ${row.teams} | ${row.profilesComplete} | ${row.missing} | ${row.fallback}`
  );
}
console.log("");
console.log(
  "team | intro bespoke | qualification verified | history verified | manager/style verified | outlook bespoke | key players verified | roster verified | sources present | similarity passed | spoiler-safe"
);
for (const row of audit2002) {
  const yn = (v: boolean) => (v ? "yes" : "no");
  console.log(
    [
      row.team,
      yn(row.introBespoke),
      yn(row.qualificationVerified),
      yn(row.historyVerified),
      yn(row.managerStyleVerified),
      yn(row.outlookBespoke),
      yn(row.keyPlayersVerified),
      yn(row.rosterVerified),
      yn(row.sourcesPresent),
      yn(row.similarityPassed),
      yn(row.spoilerSafe),
    ].join(" | ")
  );
}

const failures: string[] = [];
if (usa.missing !== 0 || usa.preMatchComplete !== 52 || usa.postMatchComplete !== 52) {
  failures.push("USA 1994 editorial coverage incomplete");
}
if (fra.missing !== 0 || fra.preMatchComplete !== 64 || fra.postMatchComplete !== 64) {
  failures.push("France 1998 editorial coverage incomplete");
}
if (kor.missing !== 0 || kor.preMatchComplete !== 64 || kor.postMatchComplete !== 64) {
  failures.push("Korea/Japan 2002 editorial coverage incomplete");
}
if (
  dossiers.length !== 88 ||
  dossiers.some(
    (d) =>
      !d.dossierComplete ||
      !d.spoilerSafe ||
      !d.rosterPresent ||
      !d.sourcesPresent ||
      d.usesFallback
  )
) {
  failures.push("Team dossier validation failed (expected 88/88 complete, spoiler-safe profiles)");
}
for (const row of profileCoverage) {
  if (row.missing !== 0 || row.fallback !== 0 || row.profilesComplete !== row.teams) {
    failures.push(`Team Profile coverage incomplete for ${row.tournament}`);
  }
}
if (dupes.length) {
  failures.push(`Duplicate reports: ${dupes.join("; ")}`);
}
if (similarity2002.length) {
  failures.push(
    `Korea/Japan 2002 similarity failures: ${similarity2002
      .slice(0, 8)
      .map((i) => `${i.teamA}/${i.teamB}:${i.kind}`)
      .join("; ")}`
  );
}
if (audit2002.some((r) => Object.entries(r).some(([k, v]) => k !== "team" && v === false))) {
  failures.push("Korea/Japan 2002 Team Profile audit incomplete");
}

if (failures.length) {
  console.error("\nFAILED:");
  for (const f of failures) console.error(`- ${f}`);
  process.exit(1);
}

console.log("\nEditorial validation passed.");
