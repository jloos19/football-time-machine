"use client";

import { useEffect, useMemo, useState } from "react";
import { Episode, Season, seasons } from "@/data/seasons";
import { HomePage } from "@/components/home/HomePage";
import { TournamentIntro } from "@/components/TournamentIntro";
import { progressKey, markJourneyEntered } from "@/lib/progress";

type Screen =
  | { type: "home" }
  | { type: "collection" }
  | { type: "tournament-intro"; seasonId: string; returnTo: "home" | "collection" }
  | { type: "season"; seasonId: string; returnTo: "home" | "collection" };

const GROUPS_94: Record<string, string[]> = {
  A: ["United States", "Switzerland", "Romania", "Colombia"],
  B: ["Brazil", "Russia", "Cameroon", "Sweden"],
  C: ["Germany", "Bolivia", "Spain", "South Korea"],
  D: ["Argentina", "Greece", "Nigeria", "Bulgaria"],
  E: ["Italy", "Republic of Ireland", "Norway", "Mexico"],
  F: ["Netherlands", "Saudi Arabia", "Belgium", "Morocco"],
};

const RESULTS_94 = [
  [1,"C","Germany","Bolivia",1,0],[2,"C","Spain","South Korea",2,2],
  [3,"A","United States","Switzerland",1,1],[4,"E","Italy","Republic of Ireland",0,1],
  [5,"A","Colombia","Romania",1,3],[6,"F","Belgium","Morocco",1,0],
  [7,"E","Norway","Mexico",1,0],[8,"B","Cameroon","Sweden",2,2],
  [9,"B","Brazil","Russia",2,0],[10,"F","Netherlands","Saudi Arabia",2,1],
  [11,"D","Argentina","Greece",4,0],[12,"C","Germany","Spain",1,1],
  [13,"D","Nigeria","Bulgaria",3,0],[14,"A","Romania","Switzerland",1,4],
  [15,"A","United States","Colombia",2,1],[16,"E","Italy","Norway",1,0],
  [17,"C","South Korea","Bolivia",0,0],[18,"E","Mexico","Republic of Ireland",2,1],
  [19,"B","Brazil","Cameroon",3,0],[20,"B","Russia","Sweden",1,3],
  [21,"F","Saudi Arabia","Morocco",2,1],[21,"F","Belgium","Netherlands",1,0],
  [22,"D","Argentina","Nigeria",2,1],[23,"D","Bulgaria","Greece",4,0],
  [24,"A","United States","Romania",0,1],[24,"A","Switzerland","Colombia",0,2],
  [25,"C","Bolivia","Spain",1,3],[25,"C","Germany","South Korea",3,2],
  [26,"E","Republic of Ireland","Norway",0,0],[26,"E","Italy","Mexico",1,1],
  [27,"B","Brazil","Sweden",1,1],[27,"B","Russia","Cameroon",6,1],
  [28,"F","Morocco","Netherlands",1,2],[28,"F","Belgium","Saudi Arabia",0,1],
  [29,"D","Greece","Nigeria",0,2],[29,"D","Argentina","Bulgaria",0,2],
] as const;

const MATCH_SLOT_94: Record<string, number> = {
  "Germany vs Bolivia":1,"Spain vs South Korea":2,"United States vs Switzerland":3,
  "Italy vs Republic of Ireland":4,"Brazil vs Russia":9,"Netherlands vs Saudi Arabia":10,
  "Argentina vs Greece":11,"Germany vs Spain":12,"Nigeria vs Bulgaria":13,
  "United States vs Colombia":15,"Italy vs Norway":16,"Brazil vs Cameroon":19,
  "Netherlands vs Belgium":21,"Argentina vs Nigeria":22,"United States vs Romania":24,
  "Germany vs South Korea":25,"Italy vs Mexico":26,"Brazil vs Sweden":27,
  "Belgium vs Saudi Arabia":28,"Argentina vs Bulgaria":29,
};

function progressStorageKey(id: string) {
  return progressKey(id);
}

function standingsForEpisode(episode: Episode) {
  if (episode.tournamentId !== "usa-1994" || episode.n > 20) return null;
  const slot = MATCH_SLOT_94[episode.match];
  if (!slot) return null;
  const current = RESULTS_94.find(([s, , h, a]) => {
    const [left, right] = episode.match.split(" vs ");
    return s === slot && ((h === left && a === right) || (h === right && a === left));
  });
  if (!current) return null;
  const group = current[1];
  const table: Record<string, any> = {};
  GROUPS_94[group].forEach(team => {
    table[team] = { team, p:0,w:0,d:0,l:0,gf:0,ga:0,gd:0,pts:0 };
  });
  RESULTS_94.forEach(([s,g,h,a,hg,ag]) => {
    if (g !== group || s >= slot) return;
    const home = table[h], away = table[a];
    home.p++; away.p++; home.gf += hg; home.ga += ag; away.gf += ag; away.ga += hg;
    if (hg > ag) { home.w++; home.pts += 3; away.l++; }
    else if (hg < ag) { away.w++; away.pts += 3; home.l++; }
    else { home.d++; away.d++; home.pts++; away.pts++; }
  });
  return {
    group,
    rows: Object.values(table).map((x:any)=>({...x,gd:x.gf-x.ga}))
      .sort((a:any,b:any)=>b.pts-a.pts||b.gd-a.gd||b.gf-a.gf||a.team.localeCompare(b.team))
  };
}

export function FootballTimeMachine() {
  const [screen, setScreen] = useState<Screen>({type:"home"});
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);
  const [completed, setCompleted] = useState<Set<number>>(new Set());
  const [progressRevision, setProgressRevision] = useState(0);

  const activeSeason = useMemo(() => {
    if (screen.type !== "season" && screen.type !== "tournament-intro") return null;
    return seasons.find(s => s.id === screen.seasonId) ?? null;
  }, [screen]);

  const introSeason = useMemo(() => {
    if (screen.type !== "tournament-intro") return null;
    return seasons.find(s => s.id === screen.seasonId) ?? null;
  }, [screen]);

  function navigateToSeason(seasonId: string, returnTo: "home" | "collection") {
    const season = seasons.find(s => s.id === seasonId);
    if (season?.intro) {
      setScreen({ type: "tournament-intro", seasonId, returnTo });
      return;
    }
    setScreen({ type: "season", seasonId, returnTo });
  }

  function enterJourney(seasonId: string, returnTo: "home" | "collection") {
    markJourneyEntered(seasonId);
    setScreen({ type: "season", seasonId, returnTo });
  }

  useEffect(() => {
    if (!activeSeason) return;
    const saved = JSON.parse(localStorage.getItem(progressStorageKey(activeSeason.id)) || "[]");
    setCompleted(new Set(saved));
  }, [activeSeason]);

  function saveProgress(next: Set<number>) {
    if (!activeSeason) return;
    setCompleted(next);
    localStorage.setItem(progressStorageKey(activeSeason.id), JSON.stringify([...next]));
    setProgressRevision((revision) => revision + 1);
  }

  function toggleComplete(ep: Episode) {
    const next = new Set(completed);
    if (next.has(ep.n)) next.delete(ep.n); else next.add(ep.n);
    saveProgress(next);
  }

  const unlocked = (n:number) => n === 1 || completed.has(n-1);

  return (
    <main className={
      screen.type === "home" ? "main--home"
      : screen.type === "tournament-intro" ? "main--intro"
      : "main--app"
    }>
      {screen.type !== "home" && screen.type !== "tournament-intro" && (
        <header className="topbar">
          <button onClick={() => setScreen({ type: "home" })} className="wordmark">
            Football <span>Time Machine</span>
          </button>
          <nav className="topbar-nav" aria-label="Secondary">
            <button type="button" onClick={() => setScreen({ type: "collection" })}>
              World Cups
            </button>
          </nav>
        </header>
      )}

      {screen.type === "home" && (
        <HomePage
          progressRevision={progressRevision}
          onNavigateToWorldCups={() => setScreen({ type: "collection" })}
          onSelectSeason={(seasonId) => navigateToSeason(seasonId, "home")}
        />
      )}

      {screen.type === "tournament-intro" && introSeason?.intro && (
        <TournamentIntro
          season={introSeason}
          onEnter={() => enterJourney(introSeason.id, screen.returnTo)}
          onBack={() => {
            setScreen({ type: screen.returnTo });
            setProgressRevision((revision) => revision + 1);
          }}
        />
      )}

      {screen.type === "collection" && (
        <>
          <section className="collection-hero">
            <button className="back" onClick={()=>setScreen({type:"home"})}>← All collections</button>
            <p className="kicker">COLLECTION ONE</p>
            <h1>WORLD CUPS</h1>
            <p>Eight tournaments. One continuous story.</p>
          </section>
          <section className="shelf">
            <div className="viewing-note">
              <strong>Cleaner replay viewing</strong>
              <span>Dailymotion may show ads and recommendations. Install <a href="https://ublockorigin.com/" target="_blank" rel="noreferrer">uBlock Origin</a> for a cleaner experience.</span>
            </div>
            <div className="season-grid">
              {seasons.map(season=>(
                <button
                  key={season.id}
                  className={`season-card ${season.theme} ${season.status}`}
                  disabled={season.status==="coming-soon"}
                  onClick={() => navigateToSeason(season.id, "collection")}
                >
                  <span className="season-year">{season.year}</span>
                  <h3>{season.name}</h3>
                  <p>{season.tagline}</p>
                  <strong>{season.status==="available"?"Available now":season.status==="in-development"?"In development":"Coming soon"}</strong>
                </button>
              ))}
            </div>
          </section>
        </>
      )}

      {screen.type === "season" && activeSeason && (() => {
        const matchTotal = activeSeason.episodes.length;
        const allComplete = matchTotal > 0 && activeSeason.episodes.every((ep) => completed.has(ep.n));
        const nextMatch = activeSeason.episodes.find((ep) => !completed.has(ep.n) && unlocked(ep.n)) ?? null;

        return (
        <>
          <section className={`season-hero ${activeSeason.theme}`}>
            <button className="back" onClick={() => setScreen({ type: screen.returnTo })}>← World Cups</button>
            <p className="kicker">{activeSeason.status==="available"?"TOURNAMENT EDITION":"SEASON IN DEVELOPMENT"}</p>
            <h1>{activeSeason.name}</h1>
            <p>{activeSeason.tagline}</p>
            <div className="season-stat" aria-label={`${completed.size} of ${matchTotal} matches complete`}>
              <strong>{completed.size}</strong>
              <span className="season-stat-total">of {matchTotal}</span>
              <span className="season-stat-label">matches</span>
            </div>
          </section>
          {activeSeason.status==="available" && allComplete && (
            <section className="continue-panel continue-panel--complete">
              <div className="continue-copy">
                <span>JOURNEY COMPLETE</span>
                <strong>{activeSeason.name}</strong>
                <p>All {matchTotal} matches experienced.</p>
              </div>
            </section>
          )}
          {activeSeason.status==="available" && !allComplete && nextMatch && (
            <section className="continue-panel">
              <div className="continue-copy">
                <span>{completed.size===0?"BEGIN THE TOURNAMENT":"CONTINUE YOUR JOURNEY"}</span>
                <strong>Match {String(nextMatch.n).padStart(2,"0")} · {nextMatch.title}</strong>
                <p>{nextMatch.match} · {nextMatch.date}</p>
              </div>
              <button onClick={()=>setSelectedEpisode(nextMatch)}>
                {completed.size===0?`Start Match ${nextMatch.n}`:"Continue Watching"} →
              </button>
            </section>
          )}
          <section className="progress-panel">
            <div><span>YOUR PROGRESS</span><strong>{completed.size} of {matchTotal} complete</strong></div>
            <div className="progress-track"><div style={{width:`${matchTotal ? completed.size/matchTotal*100 : 0}%`}} /></div>
          </section>
          <section className="episodes-section">
            <div className="section-title">
              <div><p className="kicker red">{activeSeason.year}</p><h2>Match list</h2></div>
              {activeSeason.status==="available" && <button className="text-button" onClick={()=>{ if(confirm("Reset progress?")) saveProgress(new Set()); }}>Reset progress</button>}
            </div>
            <div className="episode-grid">
              {activeSeason.episodes.map(ep=>{
                const isUnlocked = activeSeason.status==="available" && unlocked(ep.n);
                const hidden = activeSeason.status==="available" && !isUnlocked && ep.n > 20;
                const done = completed.has(ep.n);
                const isNext = nextMatch?.n === ep.n;
                const statusLabel = done
                  ? "✓ COMPLETED"
                  : isNext
                    ? completed.size > 0 ? "CONTINUE MATCH" : "OPEN MATCH"
                    : isUnlocked
                      ? "OPEN MATCH"
                      : "LOCKED";
                return (
                  <button
                    key={ep.id}
                    className={`episode-card ${done?"done":""} ${isNext?"next":""} ${!isUnlocked?"locked":""}`}
                    disabled={!isUnlocked}
                    onClick={()=>setSelectedEpisode(ep)}
                  >
                    <div className="episode-topline"><span>MATCH {String(ep.n).padStart(2,"0")}</span><small>{ep.stage}</small></div>
                    <h3>{hidden?"CLASSIFIED":ep.title}</h3>
                    <p>{hidden?"Fixture hidden":ep.match}</p>
                    <small className="episode-date">{hidden?"Unlock to reveal":ep.date}</small>
                    <strong>{statusLabel}</strong>
                  </button>
                );
              })}
            </div>
          </section>
        </>
        );
      })()}

      {selectedEpisode && activeSeason && (
        <div className="modal-backdrop" onMouseDown={()=>setSelectedEpisode(null)}>
          <article className="episode-modal" onMouseDown={e=>e.stopPropagation()}>
            <button className="close" onClick={()=>setSelectedEpisode(null)}>×</button>
            <p className="kicker red">MATCH {String(selectedEpisode.n).padStart(2, "0")}</p>
            <h2>{selectedEpisode.title}</h2>
            <h3 className="match-name">{selectedEpisode.match}</h3>
            <p className="episode-meta">{selectedEpisode.date} · {selectedEpisode.city} {selectedEpisode.replay?.runtime ? `· ${selectedEpisode.replay.runtime}` : ""}</p>

            {activeSeason.status==="in-development" && (
              <div className="development-banner">France ’98 research has started. Replay links and editorial content are being verified before release.</div>
            )}

            {selectedEpisode.world && <><h4>June {activeSeason.year}</h4><p>{selectedEpisode.world}</p></>}
            {selectedEpisode.tournament && <><h4>So Far...</h4><p>{selectedEpisode.tournament}</p></>}
            {standingsForEpisode(selectedEpisode) && <StandingsTable data={standingsForEpisode(selectedEpisode)!} />}
            {selectedEpisode.intro && <><h4>Before Kickoff</h4><p>{selectedEpisode.intro}</p></>}

            {selectedEpisode.replay ? (
              <>
                <div className="spoiler-warning">Open the replay directly and avoid comments or recommended videos.</div>
                <div className="actions">
                  <a className="watch-button" target="_blank" rel="noreferrer" href={selectedEpisode.replay.url}>▶ Watch full match</a>
                  {selectedEpisode.replay.continuationUrl && <a className="secondary-button" target="_blank" rel="noreferrer" href={selectedEpisode.replay.continuationUrl}>Continue: extra time / penalties</a>}
                  <button className="secondary-button" onClick={()=>toggleComplete(selectedEpisode)}>
                    {completed.has(selectedEpisode.n)?"Mark incomplete":"✓ Mark complete"}
                  </button>
                </div>
              </>
            ) : <div className="researching">Replay source being researched.</div>}

            {!completed.has(selectedEpisode.n) && selectedEpisode.replay && (
              <div className="locked-report"><span>LOCKED UNTIL COMPLETION</span><strong>Final score · Key moments · Players who shaped the match</strong></div>
            )}

            {completed.has(selectedEpisode.n) && selectedEpisode.postMatch && (
              <PostMatchReport episode={selectedEpisode} />
            )}

            {completed.has(selectedEpisode.n) && selectedEpisode.n < activeSeason.episodes.length && (
              <button className="next-match" onClick={()=>{
                const next = activeSeason.episodes.find(ep=>ep.n===selectedEpisode.n+1);
                if(next) setSelectedEpisode(next);
              }}>
                <span>NEXT MATCH</span>
                <strong>{activeSeason.episodes.find(ep=>ep.n===selectedEpisode.n+1)?.title}</strong>
                <small>{activeSeason.episodes.find(ep=>ep.n===selectedEpisode.n+1)?.match}</small>
              </button>
            )}
          </article>
        </div>
      )}

      {screen.type !== "home" && screen.type !== "tournament-intro" && (
        <footer className="app-footer">Where football history is experienced—not explained.</footer>
      )}
    </main>
  );
}

function StandingsTable({data}:{data:{group:string;rows:any[]}}) {
  return (
    <section>
      <h4>Group {data.group} — Before kickoff</h4>
      <p className="table-note">Official table entering this match. Simultaneous matches are excluded.</p>
      <div className="table-scroll"><table>
        <thead><tr><th>#</th><th>Team</th><th>P</th><th>W</th><th>D</th><th>L</th><th>GD</th><th>Pts</th></tr></thead>
        <tbody>{data.rows.map((r:any,i:number)=><tr key={r.team}><td>{i+1}</td><td>{r.team}</td><td>{r.p}</td><td>{r.w}</td><td>{r.d}</td><td>{r.l}</td><td>{r.gd}</td><td><strong>{r.pts}</strong></td></tr>)}</tbody>
      </table></div>
    </section>
  );
}

function PostMatchReport({episode}:{episode:Episode}) {
  const p = episode.postMatch!;
  return (
    <section className="post-report">
      <span className="unlocked-label">✓ POST-MATCH REPORT UNLOCKED</span>
      <div className="scoreboard"><small>FULL TIME</small><strong>{p.score}</strong><span>{p.halftime}</span></div>
      <div className="deciding-event"><small>GOALS / DECIDING EVENT</small><strong>{p.goal}</strong></div>
      <h4>Key moments</h4>
      <ul>{p.keyEvents.map(event=><li key={event}>{event}</li>)}</ul>
      <h4>Players who shaped the match</h4>
      <div className="impact-list">{p.impactPlayers.map(player=><article key={`${player.name}-${player.role}`}><span>{player.team} · {player.role}</span><h5>{player.name}</h5><p>{player.summary}</p></article>)}</div>
    </section>
  );
}
