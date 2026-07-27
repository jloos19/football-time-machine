# Football Time Machine — Product Roadmap

Planning document for product direction after the live beta launch. Does not describe implemented production behavior; use it to prioritize work and align releases.

---

## Product direction

Football Time Machine is evolving from a **spoiler-safe tournament archive** into an **interactive documentary platform**.

The archive remains the foundation—canonical matches, verified replays, and earned progression—but the product’s north star is cinematic storytelling: orient the viewer, introduce the cast, follow living storylines through the tournament, and let nations and personalities be explored across editions without dumping database density or spoilers.

Roadmap work that deepens documentary framing (prologues, cast, storyline-driven Essentials, national hubs) ranks alongside retention and reliability. Archive expansion without narrative craft is incomplete.

---

## Roadmap philosophy

Now that Football Time Machine is live, roadmap decisions should primarily be driven by **real user feedback and analytics** rather than assumptions.

Every new feature should answer one of three questions:

1. Does this help new users immediately understand the product?
2. Does this increase the likelihood that someone watches another match?
3. Does this strengthen Football Time Machine's identity as an interactive football documentary rather than a football database?

If a proposal fails all three, it belongs in Research, Vision, or Strategic Opportunities—not Committed work.

---

## Organization

Initiatives are grouped to distinguish what we know we are building from long-term ideas:

| Category | Meaning |
|---|---|
| **Committed** | Near-term work we intend to ship (currently V1.0.1) |
| **Planned** | Named releases with clear themes (V1.1, V1.2); within a release, **Very High / High / Medium** priority labels sequence documentary-platform work against retention and shelf growth |
| **Research** | Ideas that need technical, legal, or product validation before commitment |
| **Vision** | Strategic opportunities and long-horizon product ideas—not committed |

---

## Prioritization framework

Score candidate work with the fields below (each typically 1–5):

| Factor | Meaning |
|---|---|
| **User impact** | How much better the experience becomes for people already using the product |
| **Retention** | Likelihood users return, finish journeys, or continue into new tournaments |
| **Product differentiation** | How distinctly this reinforces the interactive-documentary identity |
| **Urgency** | Cost of waiting (broken replays, spoilers, beta trust, blocked launches) |
| **Confidence** | How sure we are about problem, solution, and delivery |
| **Effort** | Relative delivery cost (research, engineering, editorial, QA) |
| **Risk** | Chance of spoiler leaks, inaccurate history, replay breakage, or scope creep |

**Suggested score:**

```text
(User Impact + Retention + Product Differentiation + Urgency + Confidence)
─────────────────────────────────────────────────────────────────────────
                        (Effort + Risk)
```

The score **supports judgment; it does not replace it**. Live feedback, analytics funnel drop-offs, editorial judgment, historical accuracy, spoiler safety, and release sequencing can override a raw number. Prefer shipping smaller MVPs that protect the product principles over optimizing for score alone.

**Analytics should inform prioritization:** funnel events (see Analytics & Monitoring below) tell us where users stall, which CTAs convert, and which replays fail. Pair quantitative signals with feedback categories before promoting Research or Vision items into Committed work.

---

## Committed — V1.0.1

Stabilize and clarify the live product. Priority order:

1. About Page
2. Highlights Support
3. Feedback System
4. Analytics & Monitoring
5. Mobile / Accessibility Polish
6. Replay Reliability Improvements
7. Logo and Brand Identity

---

### 1. About Page

| Field | Detail |
|---|---|
| **Problem / opportunity** | First-time visitors need to understand what Football Time Machine is before committing to a journey. |
| **Intended user value** | Trust, orientation, and clear expectations. |
| **Goals** | Explain what Football Time Machine is; explain the spoiler-free philosophy; explain replay sourcing; introduce the creator; explain the roadmap; build trust for first-time visitors. |
| **MVP scope** | Dedicated About page covering product intent, spoiler policy, sourcing stance, creator intro, and a high-level roadmap summary. |
| **Dependencies** | Product principles; editorial sourcing notes. |
| **Risks** | Overlong copy; promising features not yet shipped. |
| **Success signal** | Fewer “what is this?” questions; users can explain the spoiler-safe model after reading. |
| **Target release** | V1.0.1 |

---

### 2. Highlights Support

| Field | Detail |
|---|---|
| **Problem / opportunity** | Some users will not watch a full match but would still engage with curated highlights. |
| **Intended user value** | Choose between watching the full match or a curated highlights package. |
| **Requirements** | Full Match remains the primary CTA; Highlights appear as a secondary CTA; store highlight URLs separately from full-match URLs; manually curate highlights; prefer official providers; avoid spoiler-heavy thumbnails or titles where possible. |
| **Future tracking** | Support analytics for *Watched Full Match* and *Watched Highlights*. |
| **Dependencies** | Canonical match model; replay/highlight URL fields; editorial curation workflow. |
| **Risks** | Spoilers in titles/thumbnails; diluting Full Match as the primary action; uneven highlight quality across matches. |
| **Success metric** | Increase completion rate among users unwilling to watch an entire replay. |
| **Target release** | V1.0.1 |

---

### 3. Feedback System

| Field | Detail |
|---|---|
| **Problem / opportunity** | Live users hit bugs, broken replays, and UX friction with no clear path to report them. |
| **Intended user value** | Fast, low-friction way to tell us what broke or felt wrong. |
| **MVP scope** | Persistent “Send Feedback” entry across the product. |
| **Auto-include context** | Page URL; tournament; experience; match; replay provider; browser/device (if practical). |
| **Issue categories** | Replay issue; historical correction; spoiler issue; UI bug; feature request. |
| **Dependencies** | Issue templates; feedback log workflow ([FEEDBACK_LOG.md](./FEEDBACK_LOG.md)). |
| **Risks** | Noise without triage; incomplete context; privacy of contact details. |
| **Success signal** | Actionable reports arrive with enough context to reproduce; high-severity items get issues within days. |
| **Target release** | V1.0.1 |

---

### 4. Analytics & Monitoring

| Field | Detail |
|---|---|
| **Problem / opportunity** | We cannot see where users drop off or which errors are widespread. |
| **Intended user value** | Indirect: faster fixes and better prioritization for the paths people actually use. |
| **Track** | Homepage visits; tournament selection; journey selection; match opened; full match clicked; highlights clicked; mark complete; continue watching; tournament completion; replay failures. |
| **MVP scope** | Lightweight analytics for the funnel events above; error/replay-failure monitoring; privacy-respecting defaults. |
| **How analytics inform the roadmap** | Drop-offs after tournament or journey selection → clarify UX / About / Prologues / Cast / Continue Watching; low full-match click-through → Highlights or replay reliability; high mark-complete but low continue → completion experience / next-journey CTAs; replay failures → reliability work before archive expansion; low Essentials completion → storyline framing quality. |
| **Dependencies** | Production hosting; event taxonomy; privacy review. |
| **Risks** | Over-collection; vanity metrics; instrumenting noise instead of journeys. |
| **Success signal** | We can name top drop-off points and top errors weekly; critical failures are alerted; roadmap debates cite funnel evidence. |
| **Target release** | V1.0.1 |

---

### 5. Mobile / Accessibility Polish

| Field | Detail |
|---|---|
| **Problem / opportunity** | Much watching happens on phones; incomplete a11y excludes users and hurts polish. |
| **Intended user value** | Journeys are usable on small screens and with assistive tech. |
| **MVP scope** | Fix high-impact mobile layout/interaction issues; keyboard focus, labels, contrast, and modal accessibility for core flows. |
| **Dependencies** | Feedback from real devices; audit of match modal and experience nav. |
| **Risks** | Visual regressions; partial fixes that feel inconsistent. |
| **Success signal** | Core journeys completable on phone; no known critical a11y blockers on primary paths. |
| **Target release** | V1.0.1 |

---

### 6. Replay Reliability Improvements

| Field | Detail |
|---|---|
| **Problem / opportunity** | Live beta will surface broken or fragile replays that block trust. |
| **Intended user value** | Matches stay watchable; failures are detected and fixed faster. |
| **MVP scope** | Triage feedback and monitoring by severity/frequency; ship high-priority replay fixes; tighten verification for known-bad providers; improve fallback messaging when a replay fails. |
| **Dependencies** | Feedback system; analytics/replay-failure events; existing replay QA / audit paths. |
| **Risks** | Chasing edge cases; scope creep into embedded-player research (see Project Cinema). |
| **Success signal** | Critical/high replay items close steadily; repeat complaints for the same dead link decline. |
| **Target release** | V1.0.1 (ongoing into later releases as needed) |

---

### 7. Logo and Brand Identity

| Field | Detail |
|---|---|
| **Problem / opportunity** | The live product needs a distinctive, restrained visual identity that works across the website, browser, social sharing, and future product surfaces—without locking the brand to a single competition. |
| **Intended user value** | Clearer recognition in the browser tab, homepage, and shared links; a mark that feels native to the archival, cinematic product. |
| **Goal** | Create a distinctive, restrained visual identity for Football Time Machine that works across the website, browser, social sharing, and future product surfaces. |
| **MVP scope** | Primary Football Time Machine logo; compact standalone emblem; wordmark-and-emblem lockup; dark-background, light-background, and monochrome versions; browser favicon; Apple touch icon; 192×192 and 512×512 app icons; Open Graph and social-sharing usage; homepage and global-navigation integration; future share-card and loading-state support. |
| **Design principles** | Archival rather than futuristic; cinematic rather than corporate; simple enough to remain legible at favicon size; visually compatible with the existing serif wordmark, gold accents, and dark editorial palette; no generic soccer-ball logo; no trophy silhouette that implies only the Men’s World Cup; no design that prevents future expansion into Women’s World Cups, continental tournaments, or club competitions; avoid unnecessary detail, gradients, or overly literal clock imagery. |
| **Directions to explore (not committed)** | Several concepts should be explored—do not commit to a final direction in planning. Candidates include: an abstract combination of time, motion, and football; a restrained circular archive seal; a subtle timeline or rewind motif; a monogram using FTM; a mark inspired by vintage broadcast graphics or tournament ephemera. Concepts should be tested at full header size, 32px, 16px favicon size, monochrome, and mobile home-screen size. |
| **Dependencies** | Existing homepage/nav wordmark and editorial palette; Open Graph / social metadata surfaces. |
| **Risks** | Overly literal or competition-specific marks that block Women’s / continental / club expansion; detail that fails at favicon size; identity that feels corporate or futuristic vs archival documentary. |
| **Success criteria** | Recognizable at small sizes; feels native to the current site; improves browser-tab identification; works without the full wordmark; remains inclusive of all future football competitions; receives positive qualitative feedback from beta users. |
| **Target release** | V1.0.1 |

---

## Planned — V1.1

**Theme:** Retention, continuity, and documentary framing—help people come back, keep their place in the story, and enter every tournament as a film, not a fixture list.

**Priority order within V1.1 (documentary track):**

1. Storyline-Driven Essentials — **Very High**
2. Tournament Prologues — **High**
3. Then retention track: Accounts, Cloud Progress, Completion, Continue Watching, Epilogues

---

### 1. Storyline-Driven Essentials — Very High Priority

| Field | Detail |
|---|---|
| **Problem / opportunity** | Essentials today risks reading as “the most important matches,” which can feel like a highlights reel of significance rather than a living narrative. The documentary identity needs Essentials rebuilt around the major storylines entering each tournament. |
| **Intended user value** | Follow 4–6 clear narratives through a tournament—suspense and historical context preserved—so Essentials feels like chapters of a documentary, not a ranked match list. |
| **Editorial philosophy** | Before every tournament begins (in product time), identify **4–6 key storylines**. Select matches that naturally advance those narratives. Prefer progression of drama over “biggest games on paper.” Never spoil outcomes; pre-tournament expectations and in-tournament tension stay intact. |
| **MVP scope** | Redesign Essentials selection criteria and UX around named storylines; apply to existing published tournaments where capacity allows; document the philosophy in product docs ([PRODUCT_PRINCIPLES.md](./PRODUCT_PRINCIPLES.md) and related editorial notes); establish a reusable editorial template for future editions. |
| **Dependencies** | Canonical match model; editorial capacity; spoiler-safe labeling of storylines (no outcome language). |
| **Risks** | Forcing every match into a storyline; over-literary framing that obscures the watch path; inconsistent quality across tournaments. |
| **Success signal** | Users can name the storylines they followed; Essentials completion and continue-to-next-match rates improve vs prior “important matches” framing; editorial reviews cite narrative advancement, not only prestige of fixtures. |
| **Target release** | V1.1 |
| **Priority** | Very High |

---

### 2. Tournament Prologues — High Priority

| Field | Detail |
|---|---|
| **Problem / opportunity** | Users often drop into Match 1 without the historical and cultural frame that makes a tournament feel like a documentary series. |
| **Intended user value** | A cinematic, spoiler-free introduction that sets the stage before any result can leak. |
| **Goals** | Cover historical context, major storylines, biggest stars, tactical trends, political backdrop where relevant, and pre-tournament expectations—without revealing how the tournament unfolds. |
| **MVP scope** | A 2–5 minute spoiler-free prologue before every tournament; positioned as the **first chapter** of every tournament experience (Story, Essentials, and other entry points should route through or clearly offer it); consistent structure across editions with tournament-specific editorial. |
| **Dependencies** | Editorial production; tournament landing / experience entry UX; storyline identification from Storyline-Driven Essentials (can share research). |
| **Risks** | Feeling like a mandatory essay gate; accidental spoilers in “expectations” copy; production cost that delays edition launches. |
| **Success signal** | High prologue start rate among new tournament entrants; qualitative feedback that users “felt oriented” before Match 1; no spoiler incidents attributed to prologue content. |
| **Target release** | V1.1 |
| **Priority** | High |

---

### Accounts

| Field | Detail |
|---|---|
| **Problem / opportunity** | Progress today is local; switching devices or clearing storage loses journeys. |
| **Intended user value** | Sign in to preserve identity and unlock cloud sync. |
| **MVP scope** | Sign-in / sign-out; account-backed session for progress features. |
| **Target release** | V1.1 |

### Cloud Progress

| Field | Detail |
|---|---|
| **Problem / opportunity** | Local-only progress breaks multi-device use. |
| **Intended user value** | Resume the same tournament on another device without restarting. |
| **MVP scope** | Sync progress for Story / Essentials / Team Journey / Every Match; restore on login; migrate from local storage. |
| **Dependencies** | Accounts; progress data model. |
| **Target release** | V1.1 |

### Tournament Completion Experience

| Field | Detail |
|---|---|
| **Problem / opportunity** | Finishing a tournament currently lacks a satisfying, spoiler-safe landing. |
| **Intended user value** | A sense of closure and a natural bridge to the next experience. |
| **MVP scope** | Completion state for each experience type; summary that only unlocks what the user has earned; CTA to related journeys. |
| **Target release** | V1.1 |

### Continue Watching improvements

| Field | Detail |
|---|---|
| **Problem / opportunity** | Users need a faster path back into an unfinished journey. |
| **Intended user value** | One clear resume action that lands in the right place with spoiler safety intact. |
| **MVP scope** | Stronger home/resume surface; accurate last position; clear tournament + experience labeling. |
| **Dependencies** | Reliable progress state; ideally accounts/cloud progress. |
| **Target release** | V1.1 |

### Team Journey Epilogues

| Field | Detail |
|---|---|
| **Problem / opportunity** | After following a team, users want context on what that run meant—without dumping database facts early. |
| **Intended user value** | Earned retrospective storytelling that deepens attachment to Team Journeys. |
| **MVP scope** | Post-journey epilogue unlocked only after the team’s path is complete; editorial, not stats dump. |
| **Target release** | V1.1 |

---

## Planned — V1.2

**Theme:** Expand the archive, deepen discovery, and let nations and cast live beyond a single tournament—without lowering the quality bar.

**Priority order within V1.2 (documentary / discovery track):**

1. National Team Hubs — **High**
2. Tournament Cast — **Medium**
3. Then shelf growth: Germany 2006, Search, Player Profiles, Additional curated journeys

---

### 1. National Team Hubs — High Priority

| Field | Detail |
|---|---|
| **Problem / opportunity** | Team Profiles today are largely tournament-scoped. Users want to explore a nation across every available edition—program history, competitions, and journeys—without leaving the documentary frame for a wiki dump. |
| **Intended user value** | Permanent National Team pages that make a country a first-class destination: understand the program, then jump into any available tournament journey with spoiler-safe presentation. |
| **MVP scope** | Expand Team Profiles into permanent **National Team Hubs**. Each hub includes: history of the program; World Cup history; Women’s World Cup history; continental competitions; qualification history; tactical identity over time; legendary players and managers; available tournament journeys. Users can explore a nation across tournaments, not only within a single edition. Spoiler-gate outcome-heavy retrospectives until earned where needed. |
| **Dependencies** | Existing Team Profile content model; Men’s/Women’s equal collections; journey linking; editorial dossiers (not scraped dumps). |
| **Risks** | Database density crowding out storytelling; Men’s-weighted hubs that undervalue Women’s history; spoilers in “history” sections; scope creep into full federation encyclopedias. |
| **Success signal** | Hub visits convert into journey starts; users return to hubs across multiple tournaments; qualitative feedback that hubs feel like dossiers, not databases. |
| **Target release** | V1.2 |
| **Priority** | High |

---

### 2. Tournament Cast — Medium Priority

| Field | Detail |
|---|---|
| **Problem / opportunity** | New fans often do not know who matters before Match 1—teams, stars, managers, and personalities worth watching. |
| **Intended user value** | A spoiler-free “Meet the Cast” onboarding section that introduces the major figures of the tournament before kickoff. |
| **MVP scope** | Pre-tournament Cast section for each edition: major teams, stars, managers, and personalities to watch; framed as onboarding before Match 1; complements Tournament Prologues (prologue = world and stakes; cast = who to watch); no outcome spoilers or “this is their tournament” retrospective language. |
| **Dependencies** | Tournament entry UX; Prologues pattern (ideally ship Prologues first); Player / manager naming consistent with future profiles and National Team Hubs. |
| **Risks** | Overlap or redundancy with Prologues; cast lists that imply favorites/winners; production cost per edition. |
| **Success signal** | Cast viewed before Match 1 among first-time tournament users; fewer “who is this?” friction reports; cast → match/journey click-through without spoiler incidents. |
| **Target release** | V1.2 |
| **Priority** | Medium |

---

### Germany 2006

| Field | Detail |
|---|---|
| **Problem / opportunity** | Natural next Men’s World Cup after 2002 for chronological archive growth. |
| **Intended user value** | Another complete tournament edition in the same spoiler-safe documentary model. |
| **MVP scope** | Full tournament edition: Prologue, Cast, Story, storyline-driven Essentials, Team Journeys, Every Match, National Team Hub coverage for participating nations, verified replays, canonical match records. |
| **Dependencies** | Storyline-Driven Essentials template; Prologue / Cast patterns from V1.1–V1.2 documentary track. |
| **Target release** | V1.2 |

### Search

| Field | Detail |
|---|---|
| **Problem / opportunity** | As the archive grows, browsing alone will not find matches, teams, or players quickly. |
| **Intended user value** | Jump to a known team, match, or tournament without spoiling unearned outcomes. |
| **MVP scope** | Search across tournaments, teams, National Team Hubs, and matches with spoiler-safe result presentation. |
| **Target release** | V1.2 |

### Player Profiles

| Field | Detail |
|---|---|
| **Problem / opportunity** | Users want to know who players are without leaving the documentary frame. |
| **Intended user value** | Contextual player pages that enrich matches, cast, and journeys. |
| **MVP scope** | Profile pages for featured players tied to tournaments; spoiler-gated career retrospectives; link from Tournament Cast and National Team Hubs where relevant. |
| **Target release** | V1.2 |

### Additional curated journeys

| Field | Detail |
|---|---|
| **Problem / opportunity** | Not every compelling path is “full tournament” or “one team.” |
| **Intended user value** | Shorter or thematic routes (e.g. group of death, underdog runs) with narrative shape—aligned with storyline thinking from Essentials. |
| **MVP scope** | A small number of high-quality curated paths per major tournament. |
| **Target release** | V1.2 |

---

## Research

Ideas that require validation before they become Committed or Planned work. **Nothing in this section is committed.**

---

### Project Cinema

**Vision:** Transform Football Time Machine into the Netflix of football history—in-product watching with resume, fullscreen, and provider-aware playback—rather than only linking out to external players.

**This is NOT committed work.** It requires technical and legal validation before any shipping commitment.

**Research topics**

- Dailymotion embedding
- FIFA embedding feasibility
- YouTube embedding
- Resume playback
- Fullscreen support
- Provider APIs
- Licensing considerations
- External fallback handling when embedding is unavailable or blocked

**Exit criteria to leave Research**

Clear answers on embed feasibility per major provider, licensing/ToS risk, spoiler-safe player chrome, and a fallback path that does not break Full Match / Highlights CTAs.

**Related (also research / later foundations)**

- Automated replay-health monitoring as a systematic check layer once provider assumptions are clearer

---

## Vision

Long-term product opportunities for the interactive documentary platform. These are strategic possibilities, **not committed roadmap items**. Promote only when feedback, analytics, and capacity support it—and when the work still answers the three roadmap questions.

The future product is not “more fixtures in a catalog.” It is a growing shelf of **cinematic tournament experiences**—prologues, cast, storyline-shaped paths, nation hubs, and earned retrospectives—backed by a reliable archive.

| Initiative | Notes |
|---|---|
| **Women’s World Cups** | First-class collection (e.g. beginning with USA 1999); equal IA and quality bar to Men’s; same prologue / cast / storyline Essentials model |
| **Euros** | European Championships as a future collection |
| **Copa América** | Landmark South American tournament stories |
| **Champions League** | Iconic club campaigns as curated journeys—not a full CL database |
| **AI Companion** | Documentary-toned companion that never spoils unearned outcomes |
| **Player Journeys** | Follow a player through a tournament with spoiler-safe progression; pairs with Tournament Cast and Player Profiles |
| **Manager Profiles** | Standalone editorial dossiers beyond what National Team Hubs cover—not coaching databases |
| **Stadium Profiles** | Place and atmosphere as storytelling context |
| **Cross-tournament documentaries** | Multi-edition arcs (dynasties, rivalries, tactical eras) stitched from hubs + journeys |
| **Community Match Ratings** | Post-watch reactions without spoiling others |
| **Personalized Recommendations** | Next-journey suggestions from progress and storylines followed—not scoreboard noise |
| **On This Day** | Calendar discovery that stays spoiler-safe by default |
| **Mobile Apps** | Native clients only after web retention and watching model are strong |

Preserve **separate Men’s and Women’s** collections wherever both exist. Women’s tournaments are first-class, not an add-on under Men’s. National Team Hubs must treat Women’s World Cup and continental women’s history with equal care.

Other continental competitions (AFCON, Asian Cup, Gold Cup, Women’s Euros, historic club seasons) remain vision-tier collection candidates under the same documentary principles.

---

## Strategic Opportunities

Ideas that are **intentionally unprioritized today**. Capture them here so they do not silently compete with Committed work. Revisit when partnerships, monetization, or community demand become real constraints.

| Opportunity | Why it waits |
|---|---|
| **Federation partnerships** | Needs product maturity and clear value exchange |
| **Official replay partnerships** | Licensing complexity; ties to Project Cinema research |
| **Premium subscriptions** | Retention and archive depth should come first |
| **Educational partnerships** | Classroom/museum use cases after About + reliability |
| **Museum integrations** | Physical/digital collab after collection credibility |
| **AI storytelling** | High risk of spoiler/identity drift; research carefully |
| **Community features** | Moderation and spoiler safety cost; post-accounts |
| **Fantasy viewing achievements** | Easy to feel gamey vs documentary; defer |
| **Social sharing** | Spoiler-safe share metadata is foundational; deeper social loops later |
| **Creator tools** | Editorial pipeline must stay curated before opening creation |

---

## Related docs

- [PRODUCT_PRINCIPLES.md](./PRODUCT_PRINCIPLES.md) — decision guardrails
- [FEEDBACK_LOG.md](./FEEDBACK_LOG.md) — intake and triage
- [RELEASES.md](./RELEASES.md) — version themes and scope
