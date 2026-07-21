"use client";

import { useEffect, useMemo, useState } from "react";
import { Episode, Season, seasons } from "@/data/seasons";

type Screen =
  | { type: "home" }
  | { type: "collection" }
  | { type: "season"; seasonId: string };

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

function progressKey(id: string) {
  return `ftm-progress-${id}`;
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

  const activeSeason = useMemo(() => {
    if (screen.type !== "season") return null;
    return seasons.find(s => s.id === screen.seasonId) ?? null;
  }, [screen]);

  useEffect(() => {
    if (!activeSeason) return;
    const saved = JSON.parse(localStorage.getItem(progressKey(activeSeason.id)) || "[]");
    setCompleted(new Set(saved));
  }, [activeSeason]);

  function saveProgress(next: Set<number>) {
    if (!activeSeason) return;
    setCompleted(next);
    localStorage.setItem(progressKey(activeSeason.id), JSON.stringify([...next]));
  }

  function toggleComplete(ep: Episode) {
    const next = new Set(completed);
    if (next.has(ep.n)) next.delete(ep.n); else next.add(ep.n);
    saveProgress(next);
  }

  const unlocked = (n:number) => n === 1 || completed.has(n-1);

  return (
    <main>
      <header className="topbar">
        <button onClick={()=>setScreen({type:"home"})} className="wordmark">
          FOOTBALL <span>TIME MACHINE</span>
        </button>
        <span className="topbar-note">EXPERIENCE HISTORY FORWARDS</span>
      </header>

      {screen.type === "home" && (
        <>
          <section className="home-hero">
            <div className="hero-copy">
              <p className="kicker">A SPOILER-FREE ARCHIVE OF FOOTBALL HISTORY</p>
              <h1>EXPERIENCE<br/><em>THE STORY.</em></h1>
              <p className="hero-dek">Classic tournaments, revealed one match at a time. No brackets. No hindsight. No spoilers.</p>
              <div className="hero-actions">
                <button className="cta" onClick={()=>setScreen({type:"collection"})}>Explore World Cups</button>
                <span className="hero-status"><b>USA ’94</b> available now</span>
              </div>
            </div>
            <aside className="hero-manifesto">
              <span>HOW IT WORKS</span>
              <ol>
                <li><b>01</b><div><strong>Read the moment</strong><small>Only what was known before kickoff.</small></div></li>
                <li><b>02</b><div><strong>Watch the match</strong><small>Full replays, curated in order.</small></div></li>
                <li><b>03</b><div><strong>Unlock the story</strong><small>Scores, key moments and impact players.</small></div></li>
              </ol>
            </aside>
          </section>
          <section className="shelf">
            <div className="shelf-head">
              <div><p className="kicker red">COLLECTIONS</p><h2>Choose a destination</h2></div>
              <p>World Cups are only the beginning.</p>
            </div>
            <div className="collection-grid">
              <button className="collection-card live world-cup-cover" onClick={()=>setScreen({type:"collection"})}>
                <div className="collection-index">01</div>
                <span>ACTIVE COLLECTION</span><h3>World Cups</h3><p>Eight tournaments from 1994 to 2022.</p><strong>Explore collection →</strong>
              </button>
              {["Champions League","European Championships","Copa América","Women’s World Cup"].map(name=>(
                <article className="collection-card muted-card" key={name}>
                  <div className="collection-index">—</div>
                  <span>FUTURE COLLECTION</span><h3>{name}</h3><p>Coming soon</p>
                </article>
              ))}
            </div>
          </section>
        </>
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
                  onClick={()=>setScreen({type:"season",seasonId:season.id})}
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

      {screen.type === "season" && activeSeason && (
        <>
          <section className={`season-hero ${activeSeason.theme}`}>
            <button className="back" onClick={()=>setScreen({type:"collection"})}>← World Cups</button>
            <p className="kicker">{activeSeason.status==="available"?"TOURNAMENT EDITION":"SEASON IN DEVELOPMENT"}</p>
            <h1>{activeSeason.name}</h1>
            <p>{activeSeason.tagline}</p>
            <div className="season-stat">
              <strong>{activeSeason.episodes.length}</strong><span>matches</span>
            </div>
          </section>
          {activeSeason.status==="available" && (()=>{
            const nextEpisode = activeSeason.episodes.find(ep=>!completed.has(ep.n) && unlocked(ep.n)) ?? activeSeason.episodes[0];
            return <section className="continue-panel">
              <div className="continue-copy">
                <span>{completed.size===0?"BEGIN THE TOURNAMENT":"CONTINUE YOUR JOURNEY"}</span>
                <strong>{nextEpisode.title}</strong>
                <p>{nextEpisode.match} · {nextEpisode.date}</p>
              </div>
              <button onClick={()=>setSelectedEpisode(nextEpisode)}>{completed.size===0?"Start Episode 1":"Continue watching"} →</button>
            </section>;
          })()}
          <section className="progress-panel">
            <div><span>YOUR PROGRESS</span><strong>{completed.size} of {activeSeason.episodes.length} complete</strong></div>
            <div className="progress-track"><div style={{width:`${activeSeason.episodes.length ? completed.size/activeSeason.episodes.length*100 : 0}%`}} /></div>
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
                return (
                  <button
                    key={ep.id}
                    className={`episode-card ${done?"done":""} ${!isUnlocked?"locked":""}`}
                    disabled={!isUnlocked}
                    onClick={()=>setSelectedEpisode(ep)}
                  >
                    <div className="episode-topline"><span>EPISODE {String(ep.n).padStart(2,"0")}</span><small>{ep.stage}</small></div>
                    <h3>{hidden?"CLASSIFIED":ep.title}</h3>
                    <p>{hidden?"Fixture hidden":ep.match}</p>
                    <small className="episode-date">{hidden?"Unlock to reveal":ep.date}</small>
                    <strong>{done?"✓ COMPLETED":isUnlocked?"OPEN MATCH":"LOCKED"}</strong>
                  </button>
                );
              })}
            </div>
          </section>
        </>
      )}

      {selectedEpisode && activeSeason && (
        <div className="modal-backdrop" onMouseDown={()=>setSelectedEpisode(null)}>
          <article className="episode-modal" onMouseDown={e=>e.stopPropagation()}>
            <button className="close" onClick={()=>setSelectedEpisode(null)}>×</button>
            <p className="kicker red">EPISODE {selectedEpisode.n}</p>
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

      <footer>Where football history is experienced—not explained.</footer>
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
