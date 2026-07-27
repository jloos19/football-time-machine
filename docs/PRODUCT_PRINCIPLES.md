# Football Time Machine — Product Principles

Decision guardrails for product, editorial, and engineering work. When a feature conflicts with these principles, change the feature—or explicitly document a temporary exception with a path back to compliance.

---

## 1. Spoiler-free by default

Users should be able to experience a tournament as if it were unfolding live. Scores, outcomes, and retrospective framing stay hidden until earned.

**Aligns**
- Match cards omit results until the match is completed in the journey.
- Share metadata never includes final scores in default titles/descriptions.
- Search snippets avoid leaking outcomes for unearned matches.

**Conflicts**
- Homepage modules titled with champions or famous final results.
- “Jump to final” shortcuts that reveal bracket outcomes.
- Autoplaying post-match analysis before the user marks the match watched.

---

## 2. Experience history before explaining it

The primary verb is watch and progress—not read a Wikipedia-shaped summary first. Spoiler-free **Tournament Prologues** and **Meet the Cast** may orient the viewer before Match 1; they set context and expectations, they never explain how the tournament turned out.

**Aligns**
- Story / Essentials / Team Journeys lead with matches and pre-match context.
- Cinematic, spoiler-free prologues as the first chapter of a tournament experience.
- Deeper historical essays and outcome retrospectives unlock after relevant progression.
- About copy explains the product model without narrating tournament outcomes.

**Conflicts**
- Tournament landing pages that summarize who won and why before any match.
- Mandatory encyclopedic history dumps (wiki-shaped) before the first kickoff.
- Feature tours that spoil iconic moments as examples.

---

## 3. One canonical match record across all experiences

A match has a single source of truth. Story, Essentials, Team Journeys, Every Match, and future journeys all reference the same record.

**Aligns**
- Shared match IDs, replays, and editorial fields reused across experiences.
- Fixing a wrong kickoff time or replay once corrects it everywhere.
- Progress keyed to canonical match identity, not duplicate copies per experience.

**Conflicts**
- Forked “Story version” vs “Every Match version” of the same fixture with divergent facts.
- Experience-specific replay URLs that drift out of sync.
- Duplicate standings logic that disagrees between modes.

---

## 4. Editorial storytelling over database density

Curated narrative beats beat exhaustive tables. Density is allowed only when it serves the story the user is in.

**Aligns**
- Essentials built around **4–6 major storylines** entering each tournament—matches selected to advance those narratives while preserving suspense—not merely “the most important fixtures.”
- National Team Hubs (and Team Profiles) written as dossiers, not scraped dumps.
- Optional advanced analysis kept optional and secondary.

**Conflicts**
- Default views dominated by sortable mega-tables.
- Shipping every available Opta-style metric in the match modal.
- Player pages that are career databases with no editorial point of view.

---

## 5. Premium restraint over feature clutter

Fewer, sharper surfaces. If a control does not help someone continue a journey, question it.

**Aligns**
- One clear primary action on tournament and match surfaces.
- Full Match as the primary CTA; Highlights only as a secondary path when curated.
- Shipping completion experiences before adding parallel mini-products.
- Declining “nice to have” widgets that compete with Continue Watching.

**Conflicts**
- Dashboard-style home packed with stats strips, promo chips, and competing CTAs.
- Multiple overlapping ways to open the same match.
- Equal-weight Full Match and Highlights CTAs that dilute the documentary watch path.
- Permanent experimental toggles left in production “just in case.”

---

## 6. Retrospective information must be earned through progression

What happened next—and what it meant later—is a reward for watching, not a free sidebar.

**Aligns**
- Post-match reports after completion.
- Team Journey epilogues only after the path is finished.
- Career retrospectives gated behind relevant matches or journeys.

**Conflicts**
- “Where are they now?” blocks visible before kickoff.
- Bracket graphics filled in for future rounds.
- Tooltips that reveal later-group implications early.

---

## 7. Men’s and Women’s competitions are equal first-class collections

Women’s tournaments are not a submenu under Men’s. Equal care in IA, editorial standard, replay reliability, and roadmap status.

**Aligns**
- Separate Men’s and Women’s World Cup collections.
- USA 1999 planned as a full edition, not a teaser list.
- Shared experience patterns with equal quality bars.
- Brand marks and lockups that do not imply only the Men’s World Cup, so Women’s and other competitions can share the same identity.

**Conflicts**
- Women’s entries only as “also available” footnotes on Men’s pages.
- Lower replay-verification standards for Women’s matches.
- Roadmap language that treats Women’s as optional stretch goals only.
- Logos or trophies that visually brand the product as Men’s-only.

---

## 8. Historical accuracy is more important than publishing speed

Wrong kickoff contexts, inverted scorers, or invented narratives are product defects. Delay beats distortion.

**Aligns**
- Holding an edition until standings, reports, and key facts are verified.
- Preferring corrections over silent “good enough” ship.
- Historical correction issue template and feedback category.

**Conflicts**
- Publishing a thin season of placeholder copy to hit a calendar date.
- Auto-generating match reports without editorial review.
- Leaving known factual errors because “we’ll fix it in a polish pass.”

---

## 9. Replay reliability is part of the product experience

A beautiful journey with a dead video link is a broken product. Replay health is core UX.

**Aligns**
- Replay QA / audit tooling and human verification workflows.
- Treating broken providers as high-severity incidents.
- Automated replay-health monitoring on the roadmap.

**Conflicts**
- Shipping matches with “replay TBD” as if complete.
- Ignoring provider rot because editorial pages still render.
- Multiple unverified mirror links presented without a known-good primary.

---

## 10. New features must reinforce the interactive-documentary identity

If a feature makes Football Time Machine feel like a generic scores app, fantasy product, or cluttered portal, it does not belong—or must be reshaped.

**Aligns**
- Continue Watching as resume-into-documentary.
- Tournament Prologues, Tournament Cast, storyline-driven Essentials, and National Team Hubs as documentary framing—not archive chrome.
- Curated journeys and epilogues.
- Spoiler-safe search and profiles that support watching.
- Visual identity that is archival and cinematic—compatible with the editorial palette—rather than generic sports-app chrome.

**Conflicts**
- Live odds, betting CTAs, or prediction leaderboards as primary surfaces.
- Real-time score spam for historical tournaments.
- Features justified only by “engagement metrics” that break spoiler safety or editorial tone.
- Brand assets that read as corporate, futuristic, or interchangeable with a scores portal.

---

## Using these principles

1. Check new work against the ten principles before build.
2. If two principles tension (e.g. richer match pages vs restraint), prefer the smaller spoiler-safe MVP.
3. Log lasting exceptions in the relevant release or roadmap note with an owner and revisit date.
4. Score features with the roadmap prioritization framework, then let these principles veto or reshape high-scoring ideas that harm identity.
5. After launch, prefer evidence from user feedback and analytics when prioritizing—but never let engagement metrics justify breaking spoiler safety, accuracy, or documentary identity (see principle 10 and the roadmap’s three questions).
