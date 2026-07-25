import { isSupportedTournamentId } from "@/lib/experiences";
import { tournamentStaticParams } from "@/lib/experiences/static-params";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ tournamentId: string }>;
};

export function generateStaticParams() {
  return tournamentStaticParams();
}

/** Validates the route; AppShell renders the tournament landing. */
export default async function TournamentPage({ params }: PageProps) {
  const { tournamentId } = await params;
  if (!isSupportedTournamentId(tournamentId)) notFound();
  return null;
}
