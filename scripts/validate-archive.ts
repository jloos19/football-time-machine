#!/usr/bin/env node
import { validateArchive, getCandidateReplacements } from "../lib/archive/validate";

const errors = validateArchive({ strictProduction: true });

if (errors.length > 0) {
  console.error("Archive validation failed:\n");
  for (const error of errors) {
    console.error(`- [${error.code}] ${error.message}`);
  }

  const replacements = [
    ...getCandidateReplacements("usa-1994", "journey"),
    ...getCandidateReplacements("usa-1994", "essential"),
    ...getCandidateReplacements("france-1998", "journey"),
    ...getCandidateReplacements("france-1998", "essential"),
  ];

  if (replacements.length > 0) {
    console.error("\nCandidate replacement matches for curated experiences:");
    for (const row of replacements) {
      console.error(
        `  slot ${row.slot}: ${row.current} → candidates: ${row.candidates.join(", ")}`
      );
    }
  }

  process.exit(1);
}

console.log("Archive validation passed.");
console.log("- USA '94: 52 canonical matches");
console.log("- France '98: 64 canonical matches");
console.log("- Experience references valid");
console.log("- Journey production replays human-verified");
console.log("- No duplicated replay data outside canonical library");
