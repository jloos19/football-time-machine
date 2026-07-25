import Link from "next/link";

export default function NotFound() {
  return (
    <main className="main--home">
      <section className="collection-hero" style={{ paddingTop: "20vh" }}>
        <p className="kicker">Not found</p>
        <h1>This page isn’t in the archive</h1>
        <p>The route may be outdated, or the tournament isn’t available yet.</p>
        <p style={{ marginTop: "1.5rem" }}>
          <Link href="/" className="back">
            ← Back to Football Time Machine
          </Link>
        </p>
      </section>
    </main>
  );
}
