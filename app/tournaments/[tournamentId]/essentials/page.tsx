import { getExperienceByRoute, isSupportedTournamentId } from "@/lib/experiences";
import { tournamentStaticParams } from "@/lib/experiences/static-params";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ tournamentId: string }>;
};

export function generateStaticParams() {
  return tournamentStaticParams();
}

/** Validates the route; AppShell renders the essentials experience. */
export default async function EssentialsPage({ params }: PageProps) {
  const { tournamentId } = await params;
  if (!isSupportedTournamentId(tournamentId)) notFound();
  const experience = getExperienceByRoute(tournamentId, "essentials");
  if (!experience || experience.canonicalMatchIds.length === 0) notFound();
  return null;
}
