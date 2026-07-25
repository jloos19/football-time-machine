import { getExperienceByRoute, isSupportedTournamentId } from "@/lib/experiences";
import { tournamentStaticParams } from "@/lib/experiences/static-params";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ tournamentId: string }>;
};

export function generateStaticParams() {
  return tournamentStaticParams();
}

/** Validates the route; AppShell renders the story experience. */
export default async function StoryPage({ params }: PageProps) {
  const { tournamentId } = await params;
  if (!isSupportedTournamentId(tournamentId)) notFound();
  const experience = getExperienceByRoute(tournamentId, "story");
  if (!experience) notFound();
  return null;
}
