import {
  getExperienceByRoute,
  isSupportedTournamentId,
} from "@/lib/experiences";
import { teamStaticParams } from "@/lib/experiences/static-params";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ tournamentId: string; teamId: string }>;
};

export function generateStaticParams() {
  return teamStaticParams();
}

/** Validates the route; AppShell renders the team experience. */
export default async function TeamExperiencePage({ params }: PageProps) {
  const { tournamentId, teamId } = await params;
  if (!isSupportedTournamentId(tournamentId)) notFound();
  const experience = getExperienceByRoute(tournamentId, "team", teamId);
  if (!experience) notFound();
  return null;
}
