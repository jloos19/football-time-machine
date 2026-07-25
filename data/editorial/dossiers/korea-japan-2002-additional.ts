import type { TeamTournamentDossier } from "@/lib/editorial/types";

const roster = (
  goalkeepers: string[],
  defenders: string[],
  midfielders: string[],
  forwards: string[],
): TeamTournamentDossier["roster"] => [
  ...goalkeepers.map((name) => ({ name, positionGroup: "Goalkeepers" as const })),
  ...defenders.map((name) => ({ name, positionGroup: "Defenders" as const })),
  ...midfielders.map((name) => ({ name, positionGroup: "Midfielders" as const })),
  ...forwards.map((name) => ({ name, positionGroup: "Forwards" as const })),
];

/** Additional participant Team Profiles beyond curated Team Journey nations. */
export const KOREA_JAPAN_2002_ADDITIONAL_DOSSIERS: TeamTournamentDossier[] = [
  {
    tournamentId: "korea-japan-2002",
    teamId: "france",
    title: "France: Champions under a microscope",
    introduction:
      "No side enters Korea/Japan carrying a heavier crown than France. Holders of both the World Cup and the European Championship, Les Bleus are treated less as contenders than as the standard against which everyone else will be measured—an expectation that has grown sharper as Zinedine Zidane’s fitness became the dominant pre-tournament subplot after he damaged a thigh in Real Madrid’s Champions League final on 15 May.",
    beforeTheTournament: {
      stateOfTeam:
        "Roger Lemerre inherits a generation still intact from Saint-Denis and Rotterdam: Desailly anchoring the defence, Thuram and Lizarazu on the flanks, Vieira and Petit in midfield, Henry and Trezeguet as the cutting edge. Depth is exceptional by any historical measure, yet the late injury cloud around Zidane has injected genuine uncertainty into a squad otherwise regarded as settled and star-laden.",
      expectations:
        "Bookmakers and most preview panels list France among the outright favourites to retain the trophy. Anything short of a deep run would be framed as underachievement for a side that has redefined French football’s self-image since 1998.",
      majorStorylines:
        "Automatic qualification as 1998 holders—the last champions granted that privilege—means France arrive without the hardening rhythm of a full qualifying campaign. The opening Group A date with Senegal, a side built largely from French clubs and coached by Bruno Metsu, has already been cast as a culturally charged first examination. Over it all hangs the Zidane question: how complete is the team if the world’s most influential midfielder is unavailable or restricted?",
    },
    qualification: {
      method: "Automatic qualifier (1998 FIFA World Cup holders)",
      summary:
        "France did not contest UEFA qualifying, entering as defending world champions under the final holders’ automatic berth. Their competitive focus between tournaments centred on Euro 2000 success and subsequent friendlies rather than a World Cup qualifying group.",
      notableAchievements: "Reigning World Cup (1998) and European Championship (2000) holders; FIFA/Coca-Cola world No. 1 entering the finals.",
      automaticQualifier: true,
    },
    history: {
      worldCupAppearances: 11,
      previousAppearance: "1998",
      bestFinishEntering: "Winners (1998)",
      summary:
        "From early-tournament absences and near-misses through the Platini era’s continental peak, France’s modern identity was sealed on home soil in 1998. That triumph—and the Euro title that followed—created a rare dual-champion status that frames every conversation about this squad before a ball is kicked in Asia.",
    },
    confederation: "UEFA",
    fifaRanking: 1,
    manager: "Roger Lemerre",
    captain: "Marcel Desailly",
    tacticalIdentity: "Compact 4-2-3-1/4-3-3 hybrid built around midfield control, full-back width, and sudden vertical acceleration through Henry.",
    style:
      "Patient possession that suddenly becomes lethal when Zidane or Henry receive between the lines; physically imposing in duels, rarely frantic, and comfortable dictating tempo against lesser opposition.",
    tournamentOutlook: {
      label: "Defending champions",
      summary:
        "Widely expected to advance from Group A and remain in the conversation until the late stages, provided the attacking spine—and especially Zidane—can be managed through the opening fortnight.",
    },
    keyPlayers: [
      { name: "Zinedine Zidane", position: "Attacking midfielder", note: "Real Madrid playmaker and the side’s creative axis; his thigh injury from the 15 May Champions League final is the central fitness story of the French camp." },
      { name: "Thierry Henry", position: "Forward", note: "Arsenal’s Premier League spearhead, expected to stretch defences with pace and finishing if France need a cutting edge without full Zidane minutes." },
      { name: "Marcel Desailly", position: "Centre-back / captain", note: "Chelsea’s defensive leader and official captain, the organisational voice at the back of a champion side under scrutiny." },
      { name: "Patrick Vieira", position: "Midfielder", note: "Arsenal engine room presence tasked with screening the defence and driving transitions alongside Petit." },
      { name: "Fabien Barthez", position: "Goalkeeper", note: "Manchester United keeper whose shot-stopping and distribution remain part of France’s established tournament identity." }
    ],
    roster: roster(
      ["Ulrich Ramé", "Fabien Barthez", "Grégory Coupet"],
      ["Vincent Candela", "Bixente Lizarazu", "Philippe Christanval", "Marcel Desailly", "Mikaël Silvestre", "Lilian Thuram", "Frank Leboeuf", "Willy Sagnol"],
      ["Patrick Vieira", "Youri Djorkaeff", "Claude Makélélé", "Zinedine Zidane", "Alain Boghossian", "Emmanuel Petit", "Johan Micoud"],
      ["Djibril Cissé", "Sylvain Wiltord", "Thierry Henry", "David Trezeguet", "Christophe Dugarry"],
    ),
    sources: ["FIFA World Cup squad lists", "RSSSF 2002 World Cup qualification", "FIFA/Coca-Cola World Ranking (15 May 2002)", "UEFA / Champions League final reports (15 May 2002)", "L'Équipe pre-tournament coverage"],
  },
  {
    tournamentId: "korea-japan-2002",
    teamId: "uruguay",
    title: "Uruguay: Celeste pedigree back on the stage",
    introduction:
      "Absence has not softened Uruguay’s self-image. Missing the 1994 and 1998 finals, the two-time world champions return via a nerve-shredding play-off with Australia, bringing Álvaro Recoba’s left foot, a hard defensive core, and the familiar tension between historic aura and recent inconsistency.",
    beforeTheTournament: {
      stateOfTeam:
        "Víctor Púa’s side mixes Serie A steel—Montero, Recoba’s Inter pedigree—with domestic grit. Qualifying was a grind through CONMEBOL’s 18-team marathon before the Australia play-off finally restored their place among the 32.",
      expectations:
        "Group A offers a realistic path if Uruguay can marry concentration to talent; few outside Montevideo tip them as favourites, but fewer still dismiss a Celeste side that has historically punched above population weight.",
      majorStorylines:
        "The long exile from the World Cup finals colours every preview. Recoba’s fitness and influence, Montero’s leadership at the back, and whether Uruguay’s famous tournament temperament survives a brutal modern group will dominate discussion before their first match.",
    },
    qualification: {
      method: "CONMEBOL intercontinental play-off",
      summary:
        "Uruguay finished fifth in the CONMEBOL 18-team qualifying group, then defeated Australia in the intercontinental play-off—losing 1–0 in Melbourne before winning 3–0 in Montevideo (3–1 on aggregate)—to reclaim a World Cup place after missing 1994 and 1998.",
      notableAchievements: "Two-time World Cup winners (1930, 1950); return to the finals after an eight-year absence from the tournament.",
    },
    history: {
      worldCupAppearances: 10,
      previousAppearance: "1990",
      bestFinishEntering: "Winners (1930, 1950)",
      summary:
        "Uruguay’s early World Cup mythology—hosts and winners in 1930, Maracanazo champions in 1950—still defines national football culture. The barren 1990s finals drought made this return feel like restoration rather than routine qualification.",
    },
    confederation: "CONMEBOL",
    fifaRanking: 24,
    manager: "Víctor Púa",
    captain: "Paolo Montero",
    tacticalIdentity: "Deep, confrontational defensive structure with quick release into Recoba and Forlán; set pieces as a primary scoring route.",
    style:
      "Streetwise and physically uncompromising, happier spoiling rhythm than dominating possession; capable of moments of genuine quality when Recoba finds space to open the pitch.",
    tournamentOutlook: {
      label: "Dark horse",
      summary:
        "Viewed as capable of unsettling Group A’s bigger names if concentration holds, though pre-tournament form leaves room for skepticism about consistency over three matches.",
    },
    keyPlayers: [
      { name: "Álvaro Recoba", position: "Attacking midfielder / forward", note: "Inter’s left-footed magician, Uruguay’s chief creator and the player most capable of deciding tight World Cup matches." },
      { name: "Paolo Montero", position: "Centre-back / captain", note: "Juventus defender and official captain, embodying Uruguay’s confrontational defensive tradition." },
      { name: "Diego Forlán", position: "Forward", note: "Manchester United striker bringing Premier League sharpness to Uruguay’s attacking rotation." },
      { name: "Darío Rodríguez", position: "Defender / midfielder", note: "Versatile Peñarol-linked presence (also capped while in Europe) expected to add steel and set-piece threat." }
    ],
    roster: roster(
      ["Fabián Carini", "Gustavo Munúa", "Federico Elduayen"],
      ["Gustavo Méndez", "Alejandro Lembo", "Paolo Montero", "Darío Rodríguez", "Gonzalo Sorondo", "Joe Bizera"],
      ["Pablo García", "Gianni Guigou", "Fabián O'Neill", "Marcelo Romero", "Mario Regueiro", "Álvaro Recoba", "Gonzalo de los Santos"],
      ["Gustavo Varela", "Darío Silva", "Federico Magallanes", "Sebastián Abreu", "Nicolás Olivera", "Richard Morales", "Diego Forlán"],
    ),
    sources: ["FIFA World Cup squad lists", "RSSSF 2002 World Cup qualification", "FIFA/Coca-Cola World Ranking (15 May 2002)", "CONMEBOL qualifying archives", "El País (Uruguay) World Cup preview coverage"],
  },
  {
    tournamentId: "korea-japan-2002",
    teamId: "denmark",
    title: "Denmark: Olsen’s unbeaten qualifiers",
    introduction:
      "Denmark arrive without the melodrama that surrounds several Group A rivals—just a clear tactical identity under Morten Olsen and an unbeaten UEFA qualifying campaign that marked them as one of Europe’s most reliable sides on the road to Asia.",
    beforeTheTournament: {
      stateOfTeam:
        "The Olsen System—fluid midfield interchange, high defensive line principles adapted to personnel—is well understood by a core that includes the Laudrup-era afterglow players and a new wave led by Tomasson and Rommedahl. Experience from France ’98 still sits in the dressing room.",
      expectations:
        "Widely tipped to compete seriously for second round qualification from Group A; Danish media treat advancement as a fair demand rather than a fantasy.",
      majorStorylines:
        "Can an organised, technically clean Denmark impose their rhythm against France’s star power and Uruguay’s physical edge? Jan Heintze’s veteran captaincy and Tomasson’s club form at Feyenoord/Milan pathways give them a settled hierarchy rarely questioned before kick-off.",
    },
    qualification: {
      method: "UEFA Group 3 winners",
      summary:
        "Denmark topped UEFA Group 3 unbeaten, finishing ahead of the Czech Republic, Bulgaria, Northern Ireland and Malta to qualify directly for the finals—one of the cleanest European qualifying records of the cycle.",
      record: "6W-2D-0L",
      notableAchievements: "European Championship winners (1992); World Cup quarter-finalists in 1998.",
    },
    history: {
      worldCupAppearances: 3,
      previousAppearance: "1998",
      bestFinishEntering: "Quarter-finals (1998)",
      summary:
        "Since the shock Euro ’92 triumph, Denmark have been a consistent European presence without always converting organisation into deep World Cup runs. The 1998 quarter-final raised the bar; Olsen’s unbeaten qualifying has restored belief that the ceiling remains high.",
    },
    confederation: "UEFA",
    fifaRanking: 20,
    manager: "Morten Olsen",
    captain: "Jan Heintze",
    tacticalIdentity: "Olsen’s flexible 4-2-3-1/4-3-3 with positional rotation, midfield triangles, and coordinated pressing from the front.",
    style:
      "Technically tidy and geometrically disciplined—preferring patterned build-up and intelligent movement over chaos—yet able to strike quickly through Rommedahl’s pace when the block is broken.",
    tournamentOutlook: {
      label: "Expected to reach the second round",
      summary:
        "Preview consensus places Denmark among the likeliest Group A sides to advance, trusting qualifying form and tactical coherence more than raw star power.",
    },
    keyPlayers: [
      { name: "Jon Dahl Tomasson", position: "Forward", note: "Feyenoord striker (moving in European club circles toward Serie A attention) and Denmark’s principal goal threat under Olsen." },
      { name: "Thomas Gravesen", position: "Midfielder", note: "Everton’s combative midfielder, expected to win balls and drive the Danish engine room." },
      { name: "Dennis Rommedahl", position: "Winger", note: "PSV Eindhoven wide runner whose acceleration is central to Denmark’s transition threat." },
      { name: "Jan Heintze", position: "Left-back / captain", note: "Veteran PSV full-back captaining the side; leadership and positional experience across Olsen’s back line." }
    ],
    roster: roster(
      ["Thomas Sørensen", "Peter Kjær", "Jesper Christiansen"],
      ["René Henriksen", "Martin Laursen", "Jan Heintze", "Thomas Helveg", "Niclas Jensen", "Steven Lustü", "Kasper Bøgelund"],
      ["Stig Tøfting", "Thomas Gravesen", "Jesper Grønkjær", "Martin Jørgensen", "Claus Jensen", "Jan Michaelsen", "Christian Poulsen", "Dennis Rommedahl", "Brian Steen Nielsen"],
      ["Jon Dahl Tomasson", "Ebbe Sand", "Peter Løvenkrands", "Peter Madsen"],
    ),
    sources: ["FIFA World Cup squad lists", "RSSSF 2002 World Cup qualification", "FIFA/Coca-Cola World Ranking (15 May 2002)", "Danish FA / UEFA Group 3 archives", "Politiken World Cup preview coverage"],
  },
  {
    tournamentId: "korea-japan-2002",
    teamId: "poland",
    title: "Poland: Sixteen years away, suddenly solid",
    introduction:
      "Poland’s long exile since Mexico ’86 ends with quiet European authority. Jerzy Engel’s side won UEFA Group 5, lean on Emmanuel Olisadebe’s striker’s instinct, and return to the World Cup less as nostalgists for the 1974 and 1982 bronze sides than as a freshly built qualifying machine.",
    beforeTheTournament: {
      stateOfTeam:
        "Tomasz Wałdoch captains a functional, hard-to-beat unit: organised defence, industrious midfield, and Olisadebe as the focal scorer who carried much of the qualifying burden. Star dust is limited; collective clarity is the selling point.",
      expectations:
        "Polish expectation centres on a respectable Group D showing and a genuine push for second round football alongside—or against—Portugal, Korea Republic and the United States.",
      majorStorylines:
        "First finals since 1986; Olisadebe’s status as the team’s goal reference; Engel’s consolidation after qualification; and whether Poland’s group-stage pragmatism can survive co-host noise and Portuguese individual quality.",
    },
    qualification: {
      method: "UEFA Group 5 winners",
      summary:
        "Poland won UEFA Group 5 ahead of Ukraine, Belarus, Norway, Wales and Armenia, securing direct qualification and ending a 16-year absence from the World Cup finals.",
      notableAchievements: "World Cup third place in 1974 and 1982; return to the finals after missing 1990, 1994 and 1998.",
    },
    history: {
      worldCupAppearances: 6,
      previousAppearance: "1986",
      bestFinishEntering: "Third place (1974, 1982)",
      summary:
        "The golden Poland of Lato and Boniek set a third-place standard the country has never forgotten. The long post-1986 drought made Engel’s Group 5 triumph feel like reconnection with that serious past rather than a soft nostalgia tour.",
    },
    confederation: "UEFA",
    fifaRanking: 38,
    manager: "Jerzy Engel",
    captain: "Tomasz Wałdoch",
    tacticalIdentity: "Compact 4-4-2 built to stay narrow, protect the box, and release Olisadebe early on turnovers.",
    style:
      "Direct without being crude—prioritising defensive distances and second balls, then asking Olisadebe to occupy centre-backs while wide midfielders deliver.",
    tournamentOutlook: {
      label: "Expected to reach the second round",
      summary:
        "Rated as Group D’s most straightforward European challenger to Portugal for advancement, with qualifying solidity the basis for cautious optimism rather than extravagance.",
    },
    keyPlayers: [
      { name: "Emmanuel Olisadebe", position: "Forward", note: "Panathinaikos striker and Poland’s chief qualifying scorer; the attack runs through his movement and finishing." },
      { name: "Tomasz Wałdoch", position: "Centre-back / captain", note: "Schalke 04 defender and official captain, organising Engel’s back line." },
      { name: "Jerzy Dudek", position: "Goalkeeper", note: "Liverpool goalkeeper whose Premier League form makes him one of Poland’s highest-profile selections." },
      { name: "Jacek Krzynówek", position: "Midfielder / wing-back", note: "1. FC Nürnberg wide midfielder offering delivery and work-rate on the flank." }
    ],
    roster: roster(
      ["Jerzy Dudek", "Radosław Majdan", "Adam Matysek"],
      ["Tomasz Kłos", "Jacek Zieliński", "Michał Żewłakow", "Tomasz Rząsa", "Tomasz Hajto", "Arkadiusz Głowacki", "Tomasz Wałdoch", "Maciej Murawski", "Jacek Bąk"],
      ["Piotr Świerczewski", "Radosław Kałużny", "Arkadiusz Bąk", "Marek Koźmiński", "Paweł Sibik"],
      ["Cezary Kucharski", "Paweł Kryszałowicz", "Emmanuel Olisadebe", "Marcin Żewłakow", "Jacek Krzynówek", "Maciej Żurawski"],
    ),
    sources: ["FIFA World Cup squad lists", "RSSSF 2002 World Cup qualification", "FIFA/Coca-Cola World Ranking (15 May 2002)", "PZPN / UEFA Group 5 archives", "Polish press World Cup preview coverage"],
  },
  {
    tournamentId: "korea-japan-2002",
    teamId: "portugal",
    title: "Portugal: Golden generation, unfinished World Cup business",
    introduction:
      "Portugal’s gifted cohort has already rewritten the country’s European story—Euro 2000 semi-finalists, Luís Figo as FIFA World Player of the Year for 2001—yet the World Cup itself remains the stage where this generation’s reputation is still incomplete. António Oliveira brings that expectation into Group D as a side many tip among the tournament’s elite talents.",
    beforeTheTournament: {
      stateOfTeam:
        "Figo, Rui Costa, João Pinto, Sérgio Conceição and Pauleta form an attacking constellation few groups can match, with Fernando Couto captaining a defence that must match the midfield’s glamour. Club form across Real Madrid, Middlesbrough pathways for Figo’s peers, and Pauleta’s Bordeaux scoring reinforce the sense of a squad ready now.",
      expectations:
        "Portuguese and much of the European press treat second-round qualification as a near-requirement and a deep run as a realistic ambition. The standing question is not talent but whether tournament temperament finally matches the names on the teamsheet.",
      majorStorylines:
        "Figo’s Ballon-level stardom as the face of the side; Rui Costa’s creative partnership with him; Pauleta’s responsibility as the finishing reference; Oliveira’s balancing of flair and control; and the recurring theme that this golden generation has dazzled Europe without yet authoring a defining World Cup chapter.",
    },
    qualification: {
      method: "UEFA Group 2 winners",
      summary:
        "Portugal won UEFA Group 2 ahead of the Republic of Ireland, the Netherlands, Estonia, Cyprus and Andorra, securing direct qualification in a group that also featured one of Europe’s strongest supporting casts.",
      notableAchievements: "World Cup third place in 1966; UEFA Euro 2000 semi-finalists; Luís Figo named FIFA World Player of the Year for 2001.",
    },
    history: {
      worldCupAppearances: 3,
      previousAppearance: "1986",
      bestFinishEntering: "Third place (1966)",
      summary:
        "Eusébio’s 1966 bronze remains Portugal’s World Cup summit. The current generation—so often brilliant at club level and at Euro 2000—arrives determined that Korea/Japan will not become another footnote beneath that distant third place.",
    },
    confederation: "UEFA",
    fifaRanking: 5,
    manager: "António Oliveira",
    captain: "Fernando Couto",
    tacticalIdentity: "Attacking, combination-led European side",
    style:
      "Technically extravagant and combination-heavy—happy to monopolise the ball, overload Figo’s flank, and win matches through individual quality in the final third rather than attrition.",
    tournamentOutlook: {
      label: "Established contender",
      summary:
        "Widely ranked among the sides expected to leave Group D and remain dangerous deep into the bracket, provided the golden generation’s club brilliance finally aligns over a World Cup fortnight.",
    },
    keyPlayers: [
      { name: "Luís Figo", position: "Winger / attacking midfielder", note: "Real Madrid star and FIFA World Player of the Year for 2001; Portugal’s talisman and primary creator from the right." },
      { name: "Rui Costa", position: "Attacking midfielder", note: "AC Milan playmaker whose vision partners Figo as the dual creative engine of Oliveira’s side." },
      { name: "Pauleta", position: "Forward", note: "Bordeaux striker and Portugal’s club-level scoring guarantee, expected to convert the supply from Figo and Rui Costa." },
      { name: "João Pinto", position: "Forward / attacking midfielder", note: "Sporting CP attacker offering movement, pressing and finishing as a flexible partner in the front line." },
      { name: "Fernando Couto", position: "Centre-back / captain", note: "Lazio defender and official captain, charged with giving a star-studded side defensive authority." }
    ],
    roster: roster(
      ["Vítor Baía", "Nélson Pereira", "Ricardo"],
      ["Jorge Costa", "Abel Xavier", "Marco Caneira", "Fernando Couto", "Jorge Andrade", "Nuno Frechaut", "Beto", "Rui Jorge"],
      ["Paulo Sousa", "Luís Figo", "Rui Costa", "Sérgio Conceição", "Hugo Viana", "Pedro Barbosa", "Paulo Bento", "Capucho", "Petit"],
      ["João Pinto", "Pauleta", "Nuno Gomes"],
    ),
    sources: ["FIFA World Cup squad lists", "RSSSF 2002 World Cup qualification", "FIFA/Coca-Cola World Ranking (15 May 2002)", "UEFA Group 2 archives", "Record and A Bola pre-tournament coverage"],
  },
  {
    tournamentId: "korea-japan-2002",
    teamId: "slovenia",
    title: "Slovenia: Small nation, first World Cup",
    introduction:
      "For a country that only declared independence in 1991, reaching Korea/Japan is already a national milestone. Slovenia’s debut arrives with Zlatko Zahovič as the creative emblem, Srečko Katanec as coach—and a publicly frayed relationship between those two figures that has become part of the pre-tournament noise.",
    beforeTheTournament: {
      stateOfTeam:
        "Built around a core that shocked Romania in the UEFA play-offs, Slovenia are compact, motivated, and heavily dependent on Zahovič’s invention. Depth is limited; cohesion and tournament naivety are the twin variables.",
      expectations:
        "Most external forecasts place them as Group B outsiders, though the play-off triumph proved they can rise for singular nights. A point or a memorable performance would satisfy many at home; advancement would be sensational.",
      majorStorylines:
        "Debutant status; Zahovič’s burden as the side’s one true world-level creator; and the Katanec–Zahovič tension already aired in public before the squad landed in Asia—an internal subplot unusual even by World Cup standards.",
    },
    qualification: {
      method: "UEFA play-off winners",
      summary:
        "After finishing runners-up behind Russia in UEFA Group 1, Slovenia beat Romania in the play-offs (2–1 in Ljubljana, 1–1 in Bucharest; 3–2 on aggregate) to reach a first World Cup.",
      notableAchievements: "First FIFA World Cup qualification; UEFA Euro 2000 participants, marking a rapid rise for a young football nation.",
    },
    history: {
      worldCupAppearances: 1,
      previousAppearance: "None",
      bestFinishEntering: "Debut",
      summary:
        "Slovenia’s football story is compressed into a decade of statehood: building a national team from Yugoslav-era talent pathways, reaching Euro 2000, then completing the journey to a World Cup via the Romania play-off. Few debutants arrive with so clear a single creative figurehead.",
    },
    confederation: "UEFA",
    fifaRanking: 25,
    manager: "Srečko Katanec",
    captain: "Aleš Čeh",
    tacticalIdentity: "Compact 4-4-2/4-5-1 designed to protect a deep line and funnel creation through Zahovič between the lines.",
    style:
      "Economical and counter-minded, rarely dominating territory, but capable of intricate combinations when Zahovič drops into pockets and the wide runners break beyond a settled defence.",
    tournamentOutlook: {
      label: "Debutants with belief",
      summary:
        "Seen as Group B’s longest shot by most tipsters, yet respected for the Romania play-off and for possessing in Zahovič a player who can distort any single match.",
    },
    keyPlayers: [
      { name: "Zlatko Zahovič", position: "Attacking midfielder", note: "Benfica playmaker and Slovenia’s indispensable creator; his form—and his public friction with coach Katanec—dominate pre-tournament coverage." },
      { name: "Aleš Čeh", position: "Midfielder / captain", note: "Official captain and midfield organiser, tasked with steadying a debutant side amid off-field noise." },
      { name: "Milan Osterc", position: "Forward", note: "Club-level striker expected to finish the chances Zahovič and the wide players create." },
      { name: "Miran Pavlin", position: "Midfielder", note: "Experienced central midfielder offering balance and qualifying-cycle know-how beside Čeh." }
    ],
    roster: roster(
      ["Marko Simeunovič", "Mladen Dabanovič", "Dejan Nemec"],
      ["Goran Sankovič", "Željko Milinovič", "Muamer Vugdalić", "Marinko Galič", "Aleksander Knavs", "Saša Gajser", "Amir Karić", "Spasoje Bulajič"],
      ["Džoni Novak", "Aleš Čeh", "Zlatko Zahovič*", "Miran Pavlin", "Rajko Tavčar", "Zoran Pavlović", "Nastja Čeh"],
      ["Milan Osterc", "Mladen Rudonja", "Senad Tiganj", "Milenko Ačimovič", "Sebastjan Cimirotič"],
    ),
    sources: ["FIFA World Cup squad lists", "RSSSF 2002 World Cup qualification", "FIFA/Coca-Cola World Ranking (15 May 2002)", "UEFA play-off reports (Slovenia–Romania)", "Contemporary Slovenian press on Katanec–Zahovič"],
  },
  {
    tournamentId: "korea-japan-2002",
    teamId: "paraguay",
    title: "Paraguay: Chilavert’s wall and CONMEBOL steel",
    introduction:
      "Paraguay’s reputation precedes them: a CONMEBOL qualifier forged in attrition, a goalkeeper-captain who is also a free-kick threat, and a defensive identity that made them awkward opponents throughout South American qualifying. José Luis Chilavert’s pre-tournament suspension for spitting at Colombia’s Roberto Carlos Cortés in qualifying only sharpens the drama around their Group B opener.",
    beforeTheTournament: {
      stateOfTeam:
        "Cesare Maldini brings Italian organisational emphasis to a squad already comfortable sitting deep and countering. Ayala’s centre-back partnership culture, Santa Cruz’s emerging threat, and midfield graft define a side that rarely concedes cheaply when fully focused.",
      expectations:
        "Respected as a difficult Group B out—especially for Spain—and capable of contesting second place if their defensive structure holds across three matches.",
      majorStorylines:
        "Chilavert’s ban for the opening fixture forces an early goalkeeping subplot; Maldini’s methods meeting Paraguayan grit; and whether Roque Santa Cruz can turn flashes of club form into a World Cup focal point.",
    },
    qualification: {
      method: "CONMEBOL qualifying (4th place)",
      summary:
        "Paraguay finished fourth in the CONMEBOL 18-team qualifying group, securing an automatic finals place behind Argentina, Ecuador and Brazil in one of world football’s most demanding qualifying formats.",
      notableAchievements: "Reached the World Cup round of 16 in 1998; established as a consistent CONMEBOL finals presence through the late 1990s.",
    },
    history: {
      worldCupAppearances: 6,
      previousAppearance: "1998",
      bestFinishEntering: "Round of 16 (1998)",
      summary:
        "Paraguay’s modern World Cup story is one of stubborn progress rather than glamour—surviving South American qualifying, then making France ’98 remember their organisation. Chilavert’s larger-than-life persona has become inseparable from that identity.",
    },
    confederation: "CONMEBOL",
    fifaRanking: 18,
    manager: "Cesare Maldini",
    captain: "José Luis Chilavert",
    tacticalIdentity: "Low block, narrow midfield channels, and rapid counters; set pieces—including Chilavert’s dead balls—as a deliberate attacking weapon.",
    style:
      "Defensively miserly and emotionally intense, content to frustrate favourites and punish mistakes rather than chase aesthetic dominance.",
    tournamentOutlook: {
      label: "Dark horse",
      summary:
        "Rated as Group B’s most awkward non-Spanish side—capable of stealing points through structure and set pieces, especially once Chilavert returns from his opening-match suspension.",
    },
    keyPlayers: [
      { name: "José Luis Chilavert", position: "Goalkeeper / captain", note: "Vélez Sarsfield legend and official captain; suspended for the opening match after spitting at Colombia’s Roberto Carlos Cortés in qualifying, but still Paraguay’s symbolic and sporting centrepiece." },
      { name: "Celso Ayala", position: "Centre-back", note: "Experienced South American club defender anchoring Paraguay’s back line with Maldini’s organisational demands." },
      { name: "Roque Santa Cruz", position: "Forward", note: "Bayern Munich striker and Paraguay’s most high-profile attacking outlet entering the tournament." },
      { name: "Carlos Gamarra", position: "Centre-back", note: "Serie A-tested defender forming the spine of Paraguay’s CONMEBOL-hardened back four." }
    ],
    roster: roster(
      ["José Luis Chilavert", "Justo Villar", "Ricardo Tavarelli"],
      ["Francisco Arce", "Pedro Sarabia", "Carlos Gamarra", "Celso Ayala", "Juan Carlos Franco", "Julio César Cáceres", "Daniel Sanabria", "Denis Caniza"],
      ["Estanislao Struway", "Guido Alvarenga", "Roberto Acuña", "Carlos Paredes", "Diego Gavilán", "Carlos Bonet", "Gustavo Morínigo"],
      ["Richart Báez", "Roque Santa Cruz", "Jorge Luis Campos", "José Cardozo", "Nelson Cuevas"],
    ),
    sources: ["FIFA World Cup squad lists", "RSSSF 2002 World Cup qualification", "FIFA/Coca-Cola World Ranking (15 May 2002)", "CONMEBOL qualifying reports", "FIFA disciplinary notes on Chilavert suspension"],
  },
  {
    tournamentId: "korea-japan-2002",
    teamId: "south-africa",
    title: "South Africa: Bafana Bafana under a late reset",
    introduction:
      "South Africa’s second World Cup begins in managerial turbulence. After Carlos Queiroz stepped aside in March 2002 following a public struggle over selection authority with technical director Jomo Sono, Sono himself takes charge—asking a talented but unsettled squad to find clarity in Group B with almost no runway.",
    beforeTheTournament: {
      stateOfTeam:
        "The playing group still carries the 1998 experience of veterans such as Lucas Radebe and Quinton Fortune’s Premier League edge, alongside Shaun Bartlett’s finishing. Tactical continuity from the Queiroz qualifying period is the open question under Sono’s late appointment.",
      expectations:
        "Domestic hope remains emotional and high; cooler international previews treat South Africa as Group B underdogs who must rediscover structure quickly against Spain and Paraguay.",
      majorStorylines:
        "The coaching handover weeks before the tournament; Radebe’s leadership from Leeds; whether Bartlett and McCarthy can supply goals; and how a nation that hosted AFCON 1996 processes another global appearance without a settled dugout narrative.",
    },
    qualification: {
      method: "CAF qualifying",
      summary:
        "South Africa booked a second consecutive World Cup through CAF qualifying, navigating African group competition to join the finals again after their 1998 debut—before the spring 2002 coaching crisis reshaped preparations.",
      notableAchievements: "Africa Cup of Nations winners on home soil in 1996; World Cup debutants in 1998.",
    },
    history: {
      worldCupAppearances: 2,
      previousAppearance: "1998",
      bestFinishEntering: "Group stage (1998)",
      summary:
        "Readmitted to international football after apartheid, South Africa’s rise was rapid: AFCON hosts and champions in 1996, World Cup participants by 1998. The 2002 cycle kept them among Africa’s qualifiers, but the Queiroz–Sono rupture has left the finals campaign feeling improvised.",
    },
    confederation: "CAF",
    fifaRanking: 37,
    manager: "Jomo Sono",
    captain: "Lucas Radebe",
    tacticalIdentity: "Transitional 4-4-2 aiming for Radebe’s defensive organisation and quick release into Bartlett and the wide attackers—still being reasserted after the coaching change.",
    style:
      "Physically willing and attack-minded in intention, but vulnerable if midfield distances open; emotional energy has often been both asset and liability in big weeks.",
    tournamentOutlook: {
      label: "Expected to reach the second round",
      summary:
        "Pre-tournament forecasts are cautious: Group B advancement is possible on talent, yet the late coaching reset leaves South Africa among the less predictable European/African sides entering the finals.",
    },
    keyPlayers: [
      { name: "Lucas Radebe", position: "Centre-back / captain", note: "Leeds United captain for club and country figurehead; the defensive leader Sono needs for organisational calm." },
      { name: "Benni McCarthy", position: "Forward", note: "Porto forward and South Africa’s most recognised international finisher entering a second successive World Cup." },
      { name: "Quinton Fortune", position: "Midfielder / wing-back", note: "Manchester United utility man bringing Premier League tempo to South Africa’s left side and midfield." },
      { name: "Benni McCarthy", position: "Forward", note: "Porto forward whose club scoring pedigree makes him a key alternative or partner in attack." }
    ],
    roster: roster(
      ["Hans Vonk", "Andre Arendse", "Calvin Marlin"],
      ["Cyril Nzama", "Bradley Carnell", "Aaron Mokoena", "Jacob Lekgetho", "Pierre Issa", "Lucas Radebe", "Thabang Molefe"],
      ["MacBeth Sibaya", "Quinton Fortune", "Thabo Mngomeni", "MacDonald Mukansi", "Bennett Mnguni", "Jabu Pule", "Teboho Mokoena", "Sibusiso Zuma", "Delron Buckley", "Steven Pienaar"],
      ["Siyabonga Nomvethe", "Benni McCarthy", "George Koumantarakis"],
    ),
    sources: ["FIFA World Cup squad lists", "RSSSF 2002 World Cup qualification", "FIFA/Coca-Cola World Ranking (15 May 2002)", "BBC Sport: Queiroz resignation / Sono appointment (March 2002)", "SAFA contemporary statements"],
  },
  {
    tournamentId: "korea-japan-2002",
    teamId: "china",
    title: "China: A nation’s first World Cup",
    introduction:
      "Qualification alone rewrote Chinese sporting history. Under itinerant World Cup specialist Bora Milutinović, China PR reach a first finals amid enormous domestic attention—television audiences and public expectation that far outstrip what cool-eyed analysts predict from the squad itself.",
    beforeTheTournament: {
      stateOfTeam:
        "Milutinović has organised a limited talent pool around defensive shape and set-piece vigilance, with Ma Mingyu captaining a side short on European club regulars. The project is explicitly about arrival and dignity as much as advancement.",
      expectations:
        "International consensus is modest: China are heavy underdogs in Group C. At home, the emotional stakes of simply appearing—and competing—dominate more than bracket projections.",
      majorStorylines:
        "Historic debut; Milutinović’s fifth different World Cup nation as coach; captain Ma Mingyu’s leadership; and managing a billion hopes without a deep reservoir of top-level match experience.",
    },
    qualification: {
      method: "AFC final round qualifiers",
      summary:
        "China advanced through Asia’s multi-stage qualifying and sealed a first World Cup place via the AFC final round, topping their final group ahead of regional rivals including the United Arab Emirates, Uzbekistan and Qatar.",
      notableAchievements: "First FIFA World Cup qualification in Chinese football history.",
    },
    history: {
      worldCupAppearances: 1,
      previousAppearance: "None",
      bestFinishEntering: "Debut",
      summary:
        "Decades of near-misses in Asian qualifying made this breakthrough a cultural event beyond sport. Milutinović’s appointment signalled a pragmatic bid to convert long-sought qualification into a composed first appearance on the global stage.",
    },
    confederation: "AFC",
    fifaRanking: 50,
    manager: "Bora Milutinović",
    captain: "Ma Mingyu",
    tacticalIdentity: "Milutinović low block: narrow lines, minimal risk in possession, and emphasis on surviving territory rather than controlling it.",
    style:
      "Cautious and structurally obedient, built to stay in games through organisation and hope for dead-ball moments—consciously avoiding open-field exchanges with superior technical sides.",
    tournamentOutlook: {
      label: "Debutants with belief",
      summary:
        "Domestic belief is sky-high; external expectation is tempered. China’s success metric entering the tournament is competitive honour in a difficult Group C more than a projected path beyond it.",
    },
    keyPlayers: [
      { name: "Ma Mingyu", position: "Midfielder / captain", note: "Official captain and midfield reference point for Milutinović’s debutants." },
      { name: "Fan Zhiyi", position: "Defender", note: "Experienced defender with Crystal Palace pedigree in England, among China’s more globally seasoned voices." },
      { name: "Hao Haidong", position: "Forward", note: "Dalian Shide striker and China’s long-time goal threat, expected to take whatever chances the structure creates." },
      { name: "Li Tie", position: "Midfielder", note: "Liaoning midfielder eyed for energy and discipline in Milutinović’s protective central areas." }
    ],
    roster: roster(
      ["An Qi", "Jiang Jin", "Ou Chuliang"],
      ["Zhang Enhua", "Yang Pu", "Wu Chengying", "Fan Zhiyi", "Sun Jihai", "Li Weifeng", "Du Wei", "Xu Yunlong"],
      ["Shao Jiayi", "Li Tie", "Ma Mingyu", "Yu Genwei", "Gao Yao", "Zhao Junzhe", "Li Xiaopeng", "Qi Hong"],
      ["Hao Haidong", "Su Maozhen", "Qu Bo", "Yang Chen"],
    ),
    sources: ["FIFA World Cup squad lists", "RSSSF 2002 World Cup qualification", "FIFA/Coca-Cola World Ranking (15 May 2002)", "AFC qualifying archives", "Xinhua / Chinese FA qualification coverage"],
  },
  {
    tournamentId: "korea-japan-2002",
    teamId: "costa-rica",
    title: "Costa Rica: Hexagonal champions return",
    introduction:
      "Costa Rica did not tip-toe into Asia—they topped the CONCACAF Hexagonal with 23 points, the region’s outstanding qualifying record, and return to the World Cup for the first time since Italia ’90 with Paulo Wanchope as the unmistakable attacking emblem under Alexandre Guimarães.",
    beforeTheTournament: {
      stateOfTeam:
        "A confident, vertically ambitious side built on Hexagonal momentum: Lonnis in goal as captain, a midfield comfortable dictating against regional rivals, and Wanchope’s Manchester City aerial and link play as the spearhead. Belief is high after finishing clear of Mexico and the United States.",
      expectations:
        "CONCACAF observers rate Los Ticos as genuine Group C competitors capable of pressing for second-round football; global previews increasingly echo that respect after the Hexagonal statement.",
      majorStorylines:
        "First finals since the 1990 round-of-16 run; Wanchope’s form as the difference-maker; Guimarães’s attacking mandate; and whether Hexagonal dominance translates against European and Asian opposition in Group C.",
    },
    qualification: {
      method: "CONCACAF Hexagonal winners",
      summary:
        "Costa Rica won the CONCACAF final round (Hexagonal) with a 7W-2D-1L record and 23 points—first ahead of Mexico and the United States (both on 17)—posting the strongest Hexagonal performance of the cycle to qualify automatically.",
      record: "7W-2D-1L",
      notableAchievements: "World Cup round of 16 in 1990; CONCACAF Hexagonal winners for 2002 qualification.",
    },
    history: {
      worldCupAppearances: 2,
      previousAppearance: "1990",
      bestFinishEntering: "Round of 16 (1990)",
      summary:
        "The 1990 Italy adventure remains Costa Rica’s footballing folklore. Twelve years on, a new generation has earned return not as hopefuls but as Hexagonal champions—raising the standard against which this squad will be judged before their first match.",
    },
    confederation: "CONCACAF",
    fifaRanking: 29,
    manager: "Alexandre Guimarães",
    captain: "Erick Lonnis",
    tacticalIdentity: "Proactive 4-4-2 / attacking full-back shape designed to feed Wanchope early and press regional-style opponents high when momentum allows.",
    style:
      "Front-foot CONCACAF football: quick combinations into the striker, willingness to play on the front foot at altitude-honed confidence levels, and less of the deep-block caution associated with some Central American predecessors.",
    tournamentOutlook: {
      label: "Expected to reach the second round",
      summary:
        "Enter Group C with genuine advancement talk after topping the Hex—more than sentimental underdogs, if still needing to prove the leap from regional dominance to world-stage consistency.",
    },
    keyPlayers: [
      { name: "Paulo Wanchope", position: "Forward", note: "Manchester City striker and Costa Rica’s primary goal threat; the focal point of Guimarães’s attacking plan." },
      { name: "Erick Lonnis", position: "Goalkeeper / captain", note: "Sibir / domestic-league captain figure and official squad captain, organising the defensive unit from the back." },
      { name: "Walter Centeno", position: "Midfielder", note: "Creative midfielder expected to supply Wanchope and control tempo against deep defences." },
      { name: "Rónald Gómez", position: "Forward / winger", note: "Experienced attacker offering a second scoring line and European club know-how beside Wanchope." }
    ],
    roster: roster(
      ["Erick Lonnis", "Álvaro Mesén", "Lester Morgan"],
      ["Jervis Drummond", "Luis Marín", "Mauricio Wright", "Gilberto Martínez", "Daniel Vallejos", "Juan José Rodríguez", "Harold Wallace", "Pablo Chinchilla", "Carlos Castro"],
      ["Wílmer López", "Mauricio Solís", "Walter Centeno", "Hernán Medford", "Rodrigo Cordero"],
      ["Rolando Fonseca", "Paulo Wanchope", "Rónald Gómez", "Winston Parks", "Steven Bryce", "William Sunsing"],
    ),
    sources: ["FIFA World Cup squad lists", "RSSSF 2002 World Cup qualification", "FIFA/Coca-Cola World Ranking (15 May 2002)", "CONCACAF Hexagonal final tables", "La Nación (Costa Rica) World Cup preview coverage"],
  },
  {
    tournamentId: "korea-japan-2002",
    teamId: "saudi-arabia",
    title: "Saudi Arabia’s Third Landing",
    introduction:
      "Saudi Arabia return for a third successive World Cup as Asia’s most consistent qualifiers of the decade, carrying familiarity more than fear into a demanding group.",
    beforeTheTournament: {
      stateOfTeam:
        "Nasser Al-Johar leads a largely domestic-based squad still organised around experienced campaigners and the finishing reference of captain Sami Al-Jaber.",
      expectations:
        "Progress from the group would be treated as a genuine achievement; the more common preview framing is a competitive showing without automatic knockout assumptions.",
      majorStorylines:
        "Can a predominantly home-based core match the physical and tactical intensity of European and African opponents; Al-Jaber’s leadership in a third finals; and whether Asian qualifying form travels to co-hosted venues far from Riyadh.",
    },
    qualification: {
      method: "AFC qualifiers",
      summary:
        "Saudi Arabia secured a third consecutive finals place through the Asian qualifying pathway, confirming their status as one of the confederation’s most reliable World Cup nations of the era.",
      notableAchievements: "Reached the round of 16 at USA ’94, still the programme’s high-water mark entering 2002.",
    },
    history: {
      worldCupAppearances: 3,
      previousAppearance: "1998",
      bestFinishEntering: "Round of 16 (1994)",
      summary:
        "Saudi Arabia’s modern World Cup story begins with the 1994 breakthrough and continues through France ’98 into a third straight appearance, still chasing a first knockout return since that debut summer.",
    },
    confederation: "AFC",
    fifaRanking: 34,
    manager: "Nasser Al-Johar",
    captain: "Sami Al-Jaber",
    tacticalIdentity: "Organised and compact",
    style:
      "A cautious defensive block, quick switches into wide areas, and reliance on Al-Jaber’s movement and finishing in limited chances.",
    tournamentOutlook: {
      label: "Expected to reach the second round",
      summary:
        "Preview expectations are modest, yet the 1994 knockout precedent and consecutive qualifying success keep a second-round push as the optimistic ceiling rather than a given.",
    },
    keyPlayers: [
      { name: "Sami Al-Jaber", position: "Forward", note: "Captain and lasting goal threat; the face of Saudi Arabia’s three-tournament run." },
      { name: "Nawaf Al-Temyat", position: "Midfielder", note: "A creative midfielder capable of unlocking compact European shapes." },
      { name: "Mohamed Al-Deayea", position: "Goalkeeper", note: "A vast-experience goalkeeper and stabilising presence behind a young defensive unit." },
      { name: "Abdullah Zubromawi", position: "Defender", note: "An experienced defender trusted to organise the back line in Asia’s toughest fixtures." }
    ],
    roster: roster(
      ["Mohamed Al-Deayea", "Mabrouk Zaid", "Mohammed Al-Khojali"],
      ["Mohammed Sheliah", "Redha Tukar", "Abdullah Zubromawi", "Mohsin Al-Harthi", "Fouzi Al-Shehri", "Ahmed Al-Dokhi", "Hussein Abdulghani", "Mansour Al-Thagafi"],
      ["Ibrahim Suwayed", "Mohammed Noor", "Mohammad Al-Shalhoub", "Abdulaziz Al-Khathran", "Khamis Al-Owairan", "Abdullah Al-Waked", "Nawaf Al-Temyat", "Omar Al-Ghamdi"],
      ["Sami Al-Jaber", "Obeid Al-Dosari", "Abdullah Al-Jumaan", "Al-Hasan Al-Yami"],
    ),
    sources: ["FIFA World Cup Korea/Japan 2002 squad lists", "RSSSF: 2002 FIFA World Cup AFC qualification", "FIFA/Coca-Cola World Ranking (15 May 2002)", "AFC qualifying archives"],
  },
  {
    tournamentId: "korea-japan-2002",
    teamId: "republic-of-ireland",
    title: "Ireland’s Unbeaten Road—and a Fracture",
    introduction:
      "The Republic of Ireland reach Asia unbeaten through UEFA qualifying and hardened by a play-off against Iran, yet arrive amid the most public squad rupture of the pre-tournament fortnight.",
    beforeTheTournament: {
      stateOfTeam:
        "Mick McCarthy’s side is built as a defensive collective around captain Steve Staunton, with club-honed competitiveness compensating for a thinner creative pool once Roy Keane’s Saipan dispute ended with the midfielder being sent home before the opening match.",
      expectations:
        "A second-round place remains the clear target for a side that refused to lose in Europe and thrives on organisation more than star depth.",
      majorStorylines:
        "The Keane–McCarthy fallout in Saipan in late May 2002, settled with Keane’s departure before kick-off; Staunton’s captaincy of a reshaped midfield; and whether an unbeaten qualifying identity can survive the emotional noise around the camp.",
    },
    qualification: {
      method: "UEFA Group 2 runners-up and intercontinental play-off winners",
      summary:
        "Ireland finished unbeaten behind Portugal in UEFA Group 2, then defeated Iran over two legs in the UEFA–AFC play-off to secure a third World Cup appearance.",
      record: "Unbeaten in UEFA Group 2 (behind Portugal); defeated Iran 2–0, 0–1 in the play-offs",
      notableAchievements: "Reached the quarter-finals at Italia ’90, still the Republic’s best World Cup finish entering 2002.",
    },
    history: {
      worldCupAppearances: 3,
      previousAppearance: "1994",
      bestFinishEntering: "Quarter-finals (1990)",
      summary:
        "Ireland’s modern finals story runs through Italia ’90 and USA ’94; Korea/Japan ’02 is a third appearance built on defensive resolve and play-off steel rather than glittering attacking reputation.",
    },
    confederation: "UEFA",
    fifaRanking: 15,
    manager: "Mick McCarthy",
    captain: "Steve Staunton",
    tacticalIdentity: "Defensive collective",
    style:
      "Compact lines, aerial duels, set-piece threat and relentless midfield pressing, with limited possession against technical favourites.",
    tournamentOutlook: {
      label: "Expected to reach the second round",
      summary:
        "An unbeaten European qualifying campaign and ranking inside the world’s top twenty support knockout ambitions, even after the late May squad upheaval in Saipan.",
    },
    keyPlayers: [
      { name: "Steve Staunton", position: "Defender", note: "The captain and defensive organiser asked to steady the dressing room after Keane’s exit." },
      { name: "Shay Given", position: "Goalkeeper", note: "A reliable last line whose shot-stopping underpins Ireland’s low-block method." },
      { name: "Robbie Keane", position: "Forward", note: "The young attacking reference and most natural finisher in McCarthy’s selection." },
      { name: "Damien Duff", position: "Midfielder", note: "A direct wide runner capable of turning compact games with individual quality." },
      { name: "Matt Holland", position: "Midfielder", note: "A box-to-box midfielder expected to absorb Keane’s absence with energy and discipline." }
    ],
    roster: roster(
      ["Shay Given", "Dean Kiely", "Alan Kelly"],
      ["Steve Finnan", "Ian Harte", "Kenny Cunningham", "Steve Staunton", "Gary Breen", "Richard Dunne", "Gary Kelly", "Andrew O'Brien"],
      ["Roy Keane*", "Jason McAteer", "Matt Holland", "Damien Duff", "Kevin Kilbane", "Mark Kinsella", "Steven Reid", "Lee Carsley"],
      ["Robbie Keane", "David Connolly", "Niall Quinn", "Clinton Morrison"],
    ),
    sources: ["FIFA World Cup Korea/Japan 2002 squad lists", "RSSSF: 2002 FIFA World Cup UEFA qualification and UEFA–AFC play-off", "FIFA/Coca-Cola World Ranking (15 May 2002)", "Contemporary reporting on the May 2002 Saipan dispute"],
  },
  {
    tournamentId: "korea-japan-2002",
    teamId: "cameroon",
    title: "Cameroon’s Double Crown Arrives in Asia",
    introduction:
      "Cameroon enter Korea/Japan ’02 as African champions and Olympic champions, a rare double that has pushed the Indomitable Lions from respected outsiders toward genuine group favourites.",
    beforeTheTournament: {
      stateOfTeam:
        "Winfried Schäfer inherits a confident generation led by Rigobert Song, with Samuel Eto’o and Patrick Mboma giving Cameroon one of the tournament’s most feared attacking pairings.",
      expectations:
        "Anything short of a knockout place would disappoint a side ranked among Africa’s elite and drawn with belief after continental and Olympic success.",
      majorStorylines:
        "Living up to AFCON 2000 and Sydney 2000 gold; Eto’o’s rising stardom beside Mboma; Song’s leadership at the back; and a pre-tournament kit dispute with FIFA over Cameroon’s sleeveless design that forced a late uniform compromise.",
    },
    qualification: {
      method: "CAF qualifiers",
      summary:
        "Cameroon came through CAF qualifying for a fifth World Cup while already carrying continental gold from AFCON 2000 and Olympic gold from Sydney—an unprecedented African double that framed their status entering Asia.",
      notableAchievements: "AFCON winners (2000), Olympic champions (2000), and World Cup quarter-finalists in 1990.",
    },
    history: {
      worldCupAppearances: 5,
      previousAppearance: "1998",
      bestFinishEntering: "Quarter-finals (1990)",
      summary:
        "Cameroon’s World Cup legend still orbits Italia ’90, but the 2000 continental and Olympic double has refreshed expectation for a fifth finals appearance that feels more loaded than France ’98.",
    },
    confederation: "CAF",
    fifaRanking: 17,
    manager: "Winfried Schäfer",
    captain: "Rigobert Song",
    tacticalIdentity: "Athletic, transition-heavy",
    style:
      "Power through midfield, rapid breaks into Eto’o and Mboma, and aggressive defending that looks to turn recoveries into immediate attacks.",
    tournamentOutlook: {
      label: "Dark horse",
      summary:
        "Cameroon’s recent titles and ranking inside the world’s top twenty make them one of the more dangerous non-European outsiders, especially if their attacking pair settles quickly in Asia.",
    },
    keyPlayers: [
      { name: "Samuel Eto'o", position: "Forward", note: "The young spearhead whose pace and finishing make Cameroon a genuine knockout threat." },
      { name: "Patrick M'Boma", position: "Forward", note: "An established international striker and foil for Eto’o in Schäfer’s forward line." },
      { name: "Rigobert Song", position: "Defender", note: "Captain and defensive leader, the organisational voice of the Indomitable Lions." },
      { name: "Geremi", position: "Midfielder", note: "A versatile wide midfielder who carries the ball and delivers set pieces." },
      { name: "Lauren", position: "Defender", note: "A Premier League full-back bringing athleticism and recovery pace to the back line." }
    ],
    roster: roster(
      ["Alioum Boukar", "Jacques Songo'o", "Carlos Kameni"],
      ["Bill Tchato", "Pierre Womé", "Rigobert Song", "Raymond Kalla", "Pierre Njanka", "Geremi", "Lucien Mettomo"],
      ["Joseph N'Do", "Lauren", "Joël Epalle", "Nicolas Alnoudji", "Marc-Vivien Foé", "Eric Djemba-Djemba", "Salomon Olembé", "Daniel N'Gom Kome"],
      ["Samuel Eto'o", "Patrick M'Boma", "Pius N'Diefi", "Patrick Suffo", "Joseph-Désiré Job"],
    ),
    sources: ["FIFA World Cup Korea/Japan 2002 squad lists", "RSSSF: 2002 FIFA World Cup CAF qualification", "FIFA/Coca-Cola World Ranking (15 May 2002)", "CAF and Olympic archives (AFCON 2000; Sydney 2000)", "Contemporary reporting on Cameroon’s sleeveless kit dispute with FIFA"],
  },
  {
    tournamentId: "korea-japan-2002",
    teamId: "argentina",
    title: "Argentina as the Standard",
    introduction:
      "Argentina enter Asia as the most complete qualifying machine in South America and, for many preview desks, the side best equipped to win the tournament.",
    beforeTheTournament: {
      stateOfTeam:
        "Marcelo Bielsa has forged a high-intensity squad of extraordinary depth, with Gabriel Batistuta’s captaincy sitting atop a selection debate that could fill two competitive XIs.",
      expectations:
        "Ranked third in the world and fresh from topping CONMEBOL, Argentina are judged against a deep run; a group exit would be considered a failure of historic proportions.",
      majorStorylines:
        "Bielsa’s relentless pressing identity; who starts among an overcrowded attacking and midfield pool; Batistuta’s last great stage as captain; and the psychological weight of being cast as a leading favourite before a ball is kicked.",
    },
    qualification: {
      method: "CONMEBOL qualifiers — group winners",
      summary:
        "Argentina topped the South American qualifying table with a record 43 points from 18 matches, finishing clear of Ecuador and Brazil and confirming the most dominant CONMEBOL campaign of the cycle.",
      record: "CONMEBOL winners: 43 points from 18 matches (record points total for the format)",
      notableAchievements: "Two-time world champions (1978, 1986) entering Korea/Japan ’02.",
    },
    history: {
      worldCupAppearances: 13,
      previousAppearance: "1998",
      bestFinishEntering: "Winners (1978, 1986)",
      summary:
        "Argentina’s thirteenth World Cup is framed by two titles and a generation of depth that, on paper, looks as stacked as any Albiceleste squad since the mid-1980s.",
    },
    confederation: "CONMEBOL",
    fifaRanking: 3,
    manager: "Marcelo Bielsa",
    captain: "Gabriel Batistuta",
    tacticalIdentity: "Bielsa high-intensity pressing",
    style:
      "Vertical aggression, constant pressure on the ball, full-back width and rapid combinations through a crowded creative midfield.",
    tournamentOutlook: {
      label: "Tournament favorite",
      summary:
        "A record CONMEBOL points haul, elite ranking and Bielsa’s intensity leave Argentina among the narrow circle of sides expected to contend for the trophy itself.",
    },
    keyPlayers: [
      { name: "Gabriel Batistuta", position: "Forward", note: "Captain and historic finisher; still the emotional reference of Argentina’s attack." },
      { name: "Juan Sebastián Verón", position: "Midfielder", note: "The midfield conductor trusted to set tempo under Bielsa’s demanding structure." },
      { name: "Javier Zanetti", position: "Defender", note: "An indefatigable full-back and leader across Argentina’s right flank." },
      { name: "Hernán Crespo", position: "Forward", note: "A refined striker applying constant selection pressure on Batistuta’s starting place." },
      { name: "Roberto Ayala", position: "Defender", note: "The defensive organiser whose reading of the game anchors Bielsa’s high line." }
    ],
    roster: roster(
      ["Germán Burgos", "Pablo Cavallero", "Roberto Bonano"],
      ["Roberto Ayala", "Juan Pablo Sorín", "Mauricio Pochettino", "Walter Samuel", "Javier Zanetti", "Diego Placente", "José Chamot"],
      ["Matías Almeyda", "Ariel Ortega", "Juan Sebastián Verón", "Diego Simeone", "Claudio Husaín", "Pablo Aimar", "Gustavo López", "Kily González", "Marcelo Gallardo"],
      ["Claudio López", "Gabriel Batistuta", "Hernán Crespo", "Claudio Caniggia"],
    ),
    sources: ["FIFA World Cup Korea/Japan 2002 squad lists", "RSSSF: 2002 FIFA World Cup CONMEBOL qualification", "FIFA/Coca-Cola World Ranking (15 May 2002)", "CONMEBOL qualifying table archives (Argentina 43 pts)"],
  },
  {
    tournamentId: "korea-japan-2002",
    teamId: "nigeria",
    title: "Nigeria in Transition",
    introduction:
      "Nigeria return to the World Cup amid coaching upheaval and a generational handoff from the Super Eagles sides that lit up the 1990s.",
    beforeTheTournament: {
      stateOfTeam:
        "Adegboye Onigbinde takes a squad still rich in individual talent—Jay-Jay Okocha foremost among them—but less settled in structure after a turbulent qualifying and selection period.",
      expectations:
        "A second-round place remains the historical standard from 1994 and 1998, yet Group F’s strength makes even that target a stern examination.",
      majorStorylines:
        "Onigbinde’s late stewardship after coaching instability; whether Okocha can carry a side between eras; integrating younger attackers with remaining 1990s names; and surviving a group that offers little margin for disjointed preparation.",
    },
    qualification: {
      method: "CAF qualifiers",
      summary:
        "Nigeria completed CAF qualifying for a third successive finals, but the appointment of Adegboye Onigbinde late in the cycle left preparation and selection less settled than the Super Eagles’ talent list suggested.",
      notableAchievements: "Reached the round of 16 at both USA ’94 and France ’98.",
    },
    history: {
      worldCupAppearances: 3,
      previousAppearance: "1998",
      bestFinishEntering: "Round of 16 (1994, 1998)",
      summary:
        "Nigeria’s three World Cups have already produced two knockout appearances; Korea/Japan ’02 asks whether a transitional Super Eagles side can match that floor without the settled hierarchy of the previous decade.",
    },
    confederation: "CAF",
    fifaRanking: 27,
    manager: "Adegboye Onigbinde",
    captain: "Jay-Jay Okocha",
    tacticalIdentity: "Talent-led, transitional",
    style:
      "Moments of individual brilliance through Okocha, athletic wide running and opportunistic counters, with defensive organisation still a work in progress under a new coach.",
    tournamentOutlook: {
      label: "Dark horse",
      summary:
        "Individual quality keeps Nigeria dangerous, but coaching flux and a brutal group mean knockout progress would confirm they have bridged generations successfully.",
    },
    keyPlayers: [
      { name: "Jay-Jay Okocha", position: "Midfielder", note: "Captain and creative heartbeat; Nigeria’s clearest difference-maker on the ball." },
      { name: "Nwankwo Kanu", position: "Forward", note: "A technically gifted forward whose link play can elevate fragmented attacking moves." },
      { name: "Julius Aghahowa", position: "Forward", note: "A pacey young striker representing the next Super Eagles generation." },
      { name: "Joseph Yobo", position: "Defender", note: "An emerging centre-back asked to harden a defence still finding its balance." }
    ],
    roster: roster(
      ["Ike Shorunmu", "Austin Ejide", "Vincent Enyeama"],
      ["Joseph Yobo", "Celestine Babayaro", "Isaac Okoronkwo", "Taribo West", "Rabiu Afolabi", "Ifeanyi Udeze", "Efe Sodje", "Eric Ejiofor"],
      ["Pius Ikedia", "Mutiu Adepoju", "Jay-Jay Okocha", "Garba Lawal", "Justice Christopher", "James Obiorah", "John Utaka", "Femi Opabunmi"],
      ["Nwankwo Kanu", "Bartholomew Ogbeche", "Julius Aghahowa", "Benedict Akwuegbu"],
    ),
    sources: ["FIFA World Cup Korea/Japan 2002 squad lists", "RSSSF: 2002 FIFA World Cup CAF qualification", "FIFA/Coca-Cola World Ranking (15 May 2002)", "CAF qualifying and coaching appointment archives"],
  },
  {
    tournamentId: "korea-japan-2002",
    teamId: "sweden",
    title: "Sweden’s Quiet Discipline",
    introduction:
      "Sweden enter a so-called Group of Death without noise or vanity, trusting dual coaches and a familiar Scandinavian shape more than individual celebrity.",
    beforeTheTournament: {
      stateOfTeam:
        "Lars Lagerbäck and Tommy Söderberg oversee a settled, hard-running side captained by Patrik Andersson, with Henrik Larsson and Freddie Ljungberg supplying the cutting edge.",
      expectations:
        "Survival from a brutal group would be a triumph; Sweden are widely framed as the outsider asked to spoil more decorated neighbours.",
      majorStorylines:
        "Whether dual-coach continuity can out-organise starrier squads; Larsson’s fitness and finishing after club success; Ljungberg’s ability to decide tight matches; and Sweden’s comfort playing as the underestimated side in a group heavy with pedigree.",
    },
    qualification: {
      method: "UEFA Group 4 winners",
      summary:
        "Sweden topped UEFA Group 4 to qualify automatically, confirming a strong European campaign built on structure rather than spectacle.",
      record: "UEFA Group 4 winners",
      notableAchievements: "World Cup runners-up in 1958; semi-finalists as hosts that year remain the high watermark.",
    },
    history: {
      worldCupAppearances: 10,
      previousAppearance: "1994",
      bestFinishEntering: "Runners-up (1958)",
      summary:
        "Sweden’s tenth World Cup returns them to the finals after missing France ’98, carrying a 1958 finalist legacy and a more recent USA ’94 semi-final memory into Asia as disciplined outsiders.",
    },
    confederation: "UEFA",
    fifaRanking: 19,
    manager: "Lars Lagerbäck and Tommy Söderberg",
    captain: "Patrik Andersson",
    tacticalIdentity: "Disciplined 4-4-2",
    style:
      "Compact distances, aggressive wide midfielders, aerial strength and selective counters through Larsson’s movement.",
    tournamentOutlook: {
      label: "Dark horse",
      summary:
        "Strong qualifying and a coherent dual-coach system give Sweden upset potential in a group where reputation may not decide every night.",
    },
    keyPlayers: [
      { name: "Henrik Larsson", position: "Forward", note: "Sweden’s premier finisher and the attacker opponents plan around." },
      { name: "Freddie Ljungberg", position: "Midfielder", note: "An Arsenal-honed wide midfielder who arrives late and forces defensive errors." },
      { name: "Patrik Andersson", position: "Defender", note: "Captain and defensive organiser of a side built on collective shape." },
      { name: "Anders Svensson", position: "Midfielder", note: "A composed central midfielder trusted with tempo and set-piece delivery." }
    ],
    roster: roster(
      ["Magnus Hedman", "Magnus Kihlstedt", "Andreas Isaksson"],
      ["Olof Mellberg", "Patrik Andersson", "Johan Mjällby", "Michael Svensson", "Tomas Antonelius", "Erik Edman", "Andreas Jakobsson", "Teddy Lučić"],
      ["Tobias Linderoth", "Niclas Alexandersson", "Anders Svensson", "Freddie Ljungberg", "Magnus Svensson", "Mattias Jonson", "Pontus Farnerud", "Daniel Andersson"],
      ["Marcus Allbäck", "Henrik Larsson", "Zlatan Ibrahimović", "Andreas Andersson"],
    ),
    sources: ["FIFA World Cup Korea/Japan 2002 squad lists", "RSSSF: 2002 FIFA World Cup UEFA qualification", "FIFA/Coca-Cola World Ranking (15 May 2002)", "UEFA Group 4 archives"],
  },
  {
    tournamentId: "korea-japan-2002",
    teamId: "italy",
    title: "Italy’s Familiar Burden",
    introduction:
      "Italy arrive with elite personnel and the old Azzurri expectation that anything short of a serious title challenge will be dissected at home.",
    beforeTheTournament: {
      stateOfTeam:
        "Giovanni Trapattoni commands a squad stacked from Paolo Maldini’s defence through Francesco Totti, Christian Vieri and Alessandro Del Piero—an embarrassment of creative and finishing options that invites endless tactical debate.",
      expectations:
        "A deep knockout run is treated as the baseline; Italy’s ranking and history leave little patience for early exits.",
      majorStorylines:
        "Trapattoni’s balance between caution and flair; which of Totti, Del Piero and supporting creators start together; Vieri’s fitness as the reference striker; and Maldini’s leadership of a defence still regarded among the world’s best.",
    },
    qualification: {
      method: "UEFA Group 8 winners",
      summary:
        "Italy won UEFA Group 8 to qualify automatically, confirming control of their European section without recourse to the play-offs.",
      record: "UEFA Group 8 winners",
      notableAchievements: "Three-time world champions (1934, 1938, 1982).",
    },
    history: {
      worldCupAppearances: 15,
      previousAppearance: "1998",
      bestFinishEntering: "Winners (1934, 1938, 1982)",
      summary:
        "Italy enter a fifteenth World Cup still defined by three titles and a culture of knockout steel, with Trapattoni asked to convert exceptional club talent into another deep Asian summer.",
    },
    confederation: "UEFA",
    fifaRanking: 6,
    manager: "Giovanni Trapattoni",
    captain: "Paolo Maldini",
    tacticalIdentity: "Flexible, defence-first Italian method",
    style:
      "Compact defending, rapid release into Vieri, and creative supply from Totti or Del Piero depending on Trapattoni’s selection lean.",
    tournamentOutlook: {
      label: "Established contender",
      summary:
        "Personnel, ranking and tournament culture place Italy among the sides expected to be alive deep into the knockout bracket.",
    },
    keyPlayers: [
      { name: "Paolo Maldini", position: "Defender", note: "Captain and defensive standard-bearer across a generation of Azzurri sides." },
      { name: "Francesco Totti", position: "Forward", note: "The creative fulcrum whose form often dictates Italy’s attacking fluency." },
      { name: "Christian Vieri", position: "Forward", note: "A powerful centre-forward and Trapattoni’s primary penalty-box reference." },
      { name: "Alessandro Del Piero", position: "Forward", note: "A refined second striker and set-piece threat in perpetual selection conversation with Totti." },
      { name: "Gianluigi Buffon", position: "Goalkeeper", note: "Already among the world’s outstanding keepers and a cornerstone of Italy’s floor." }
    ],
    roster: roster(
      ["Gianluigi Buffon", "Christian Abbiati", "Francesco Toldo"],
      ["Christian Panucci", "Paolo Maldini", "Francesco Coco", "Fabio Cannavaro", "Alessandro Nesta", "Mark Iuliano", "Gianluca Zambrotta", "Marco Materazzi"],
      ["Cristiano Zanetti", "Gennaro Gattuso", "Cristiano Doni", "Luigi Di Biagio", "Angelo Di Livio", "Damiano Tommasi"],
      ["Alessandro Del Piero", "Filippo Inzaghi", "Francesco Totti", "Marco Delvecchio", "Vincenzo Montella", "Christian Vieri"],
    ),
    sources: ["FIFA World Cup Korea/Japan 2002 squad lists", "RSSSF: 2002 FIFA World Cup UEFA qualification", "FIFA/Coca-Cola World Ranking (15 May 2002)", "UEFA Group 8 archives"],
  },
  {
    tournamentId: "korea-japan-2002",
    teamId: "croatia",
    title: "Croatia After the Miracle",
    introduction:
      "Croatia return as the side that finished third at France ’98, now asking whether an aging core can summon one more serious World Cup under Mirko Jozić.",
    beforeTheTournament: {
      stateOfTeam:
        "Jozić inherits much of the golden generation’s remaining leadership, with Davor Šuker still captain in name and aura even as younger legs are needed around the veterans of 1998.",
      expectations:
        "Knockout football is the inherited standard; anything less invites talk of decline from the bronze-medal peak.",
      majorStorylines:
        "Transition from the 1998 semi-finalists; Šuker’s leadership in a second finals; whether Jozić can refresh a familiar spine without losing identity; and proving that France ’98 was a platform, not a solitary peak.",
    },
    qualification: {
      method: "UEFA Group 6 winners",
      summary:
        "Croatia won UEFA Group 6 unbeaten—finishing above Belgium—to qualify automatically as one of Europe’s group winners, returning as the 1998 third-placed side.",
      record: "UEFA Group 6 winners: 5 wins, 3 draws, 0 defeats (18 points)",
      notableAchievements: "Third place at France ’98 on their World Cup debut as an independent nation.",
    },
    history: {
      worldCupAppearances: 2,
      previousAppearance: "1998",
      bestFinishEntering: "Third place (1998)",
      summary:
        "Only a second World Cup, yet already carrying bronze-medal weight: Croatia’s story entering 2002 is inseparable from the France ’98 run and the question of how long that generation can stretch.",
    },
    confederation: "UEFA",
    fifaRanking: 21,
    manager: "Mirko Jozić",
    captain: "Davor Šuker",
    tacticalIdentity: "Experienced, possession-capable European side",
    style:
      "Technical midfield combinations, set-piece threat and selective vertical passes into Šuker and supporting forwards, with experience valued over youthful chaos.",
    tournamentOutlook: {
      label: "Expected to reach the second round",
      summary:
        "Unbeaten qualifying and 1998 pedigree keep Croatia among Europe’s expected knockout sides, even as questions about aging legs follow them to Asia.",
    },
    keyPlayers: [
      { name: "Davor Šuker", position: "Forward", note: "Captain and 1998 top scorer winner; still the emotional centre of Croatian expectation." },
      { name: "Robert Prosinečki", position: "Midfielder", note: "A veteran creator whose passing can still dictate tempo in tight tournament matches." },
      { name: "Robert Jarni", position: "Midfielder", note: "An experienced wide midfielder from the France ’98 core." },
      { name: "Dario Šimić", position: "Defender", note: "A reliable centre-back bridging Croatia’s golden generation and the next cycle." }
    ],
    roster: roster(
      ["Stipe Pletikosa", "Tomislav Butina", "Vladimir Vasilj"],
      ["Anthony Šerić", "Josip Šimunić", "Stjepan Tomas", "Boris Živković", "Daniel Šarić", "Robert Jarni", "Dario Šimić", "Robert Kovač"],
      ["Milan Rapaić", "Robert Prosinečki", "Niko Kovač", "Mario Stanić", "Zvonimir Soldo", "Jurica Vranješ"],
      ["Davor Vugrinec", "Davor Šuker", "Alen Bokšić", "Ivica Olić", "Goran Vlaović", "Boško Balaban"],
    ),
    sources: ["FIFA World Cup Korea/Japan 2002 squad lists", "RSSSF: 2002 FIFA World Cup UEFA qualification", "FIFA/Coca-Cola World Ranking (15 May 2002)", "UEFA Group 6 archives (Croatia winners ahead of Belgium)"],
  },
  {
    tournamentId: "korea-japan-2002",
    teamId: "mexico",
    title: "Mexico Restored Under Aguirre",
    introduction:
      "Mexico reach Asia after a Hexagonal rescue act, with Javier Aguirre turning mid-campaign anxiety into a second-place finish and renewed knockout ambition.",
    beforeTheTournament: {
      stateOfTeam:
        "Aguirre’s appointment steadied El Tri around Rafael Márquez’s defensive maturity and Cuauhtémoc Blanco’s inventiveness, restoring belief after Enrique Meza’s difficult Hex start.",
      expectations:
        "A round-of-16 appearance is the habitual standard; Mexico’s ranking and Hex recovery leave them expected to compete for more than mere survival.",
      majorStorylines:
        "Aguirre’s mid-qualifying turnaround; Márquez’s leadership at a young age for a captain; Blanco’s creativity as the side’s spark; and Mexico’s perennial question of converting CONCACAF control into a deeper World Cup run.",
    },
    qualification: {
      method: "CONCACAF Hexagonal — automatic qualification",
      summary:
        "Mexico secured automatic qualification by finishing second in the CONCACAF Hexagonal with 17 points under Aguirre after a mid-campaign coaching change, behind Costa Rica and ahead of the United States on goal difference.",
      record: "CONCACAF Hexagonal runners-up: 17 points from 10 matches (behind Costa Rica on 23)",
      notableAchievements: "Quarter-finalists as hosts in 1970 and 1986.",
    },
    history: {
      worldCupAppearances: 12,
      previousAppearance: "1998",
      bestFinishEntering: "Quarter-finals (1970, 1986)",
      summary:
        "Mexico’s twelfth World Cup continues a near-permanent presence since the 1990s, still chasing a first quarter-final away from home soil after successive modern knockout appearances.",
    },
    confederation: "CONCACAF",
    fifaRanking: 7,
    manager: "Javier Aguirre",
    captain: "Rafael Márquez",
    tacticalIdentity: "Compact, technically fluent",
    style:
      "Midfield control, Blanco’s improvisation between lines, and Márquez stepping into midfield from defence to start attacks.",
    tournamentOutlook: {
      label: "Expected to reach the second round",
      summary:
        "A top-ten ranking and Aguirre’s Hex salvage job keep Mexico among the sides previewed as consistent knockout contenders entering Asia.",
    },
    keyPlayers: [
      { name: "Rafael Márquez", position: "Defender", note: "Captain and defensive-midfield hybrid already central to Mexico’s modern identity." },
      { name: "Cuauhtémoc Blanco", position: "Forward", note: "The creative spark and set-piece threat of Aguirre’s attack." },
      { name: "Jared Borgetti", position: "Forward", note: "A clinical striker and aerial reference from the Hexagonal run." },
      { name: "Gerardo Torrado", position: "Midfielder", note: "A combative midfielder who gives Mexico bite without the ball." },
      { name: "Óscar Pérez", position: "Goalkeeper", note: "A trusted shot-stopper through the qualifying recovery." }
    ],
    roster: roster(
      ["Óscar Pérez", "Oswaldo Sánchez", "Jorge Campos"],
      ["Francisco Gabriel de Anda", "Rafael Márquez", "Manuel Vidrio", "Salvador Carmona", "Melvin Brown", "Alberto Rodríguez"],
      ["Rafael García", "Gerardo Torrado", "Ramón Morales", "Alberto García Aspe", "Braulio Luna", "Sigifredo Mercado", "Germán Villa", "Johan Rodríguez", "Gabriel Caballero"],
      ["Jared Borgetti", "Cuauhtémoc Blanco", "Luis Hernández", "Francisco Palencia", "Jesús Arellano"],
    ),
    sources: ["FIFA World Cup Korea/Japan 2002 squad lists", "RSSSF: 2002 FIFA World Cup CONCACAF Hexagonal", "FIFA/Coca-Cola World Ranking (15 May 2002)", "CONCACAF Hexagonal table (Costa Rica 23, Mexico 17, USA 17)"],
  },
  {
    tournamentId: "korea-japan-2002",
    teamId: "ecuador",
    title: "Ecuador’s First Horizon",
    introduction:
      "Ecuador step onto a World Cup stage for the first time after a historic CONMEBOL campaign that rewrote what the programme believed possible.",
    beforeTheTournament: {
      stateOfTeam:
        "Hernán Darío Gómez leads a side forged in Quito’s altitude during qualifying, with captain Álex Aguinaga’s experience guiding Agustín Delgado and a confident young supporting cast.",
      expectations:
        "Simply competing with dignity would once have sufficed; finishing second in South America has raised the bar toward a first-group escape as a believable ambition.",
      majorStorylines:
        "A debut nation’s nerve on the biggest stage; how Ecuador adapt without home altitude; Aguinaga’s leadership in a first finals; Delgado’s finishing as the side’s clearest weapon; and whether Gómez can translate qualifying belief into June results.",
    },
    qualification: {
      method: "CONMEBOL qualifiers — runners-up",
      summary:
        "Ecuador finished second in the South American table with 31 points—ahead of Brazil—securing a historic first World Cup place and the country’s greatest qualifying achievement.",
      record: "CONMEBOL runners-up: 31 points from 18 matches (ahead of Brazil on 30)",
      notableAchievements: "Highest CONMEBOL finish in Ecuadorian history entering the tournament; first World Cup qualification.",
    },
    history: {
      worldCupAppearances: 1,
      previousAppearance: "Debut",
      bestFinishEntering: "Debutants",
      summary:
        "Ecuador had never reached a World Cup before this cycle; Korea/Japan ’02 is both arrival and examination after a qualifying campaign that briefly placed them among South America’s elite.",
    },
    confederation: "CONMEBOL",
    fifaRanking: 35,
    manager: "Hernán Darío Gómez",
    captain: "Álex Aguinaga",
    tacticalIdentity: "Compact, counter-attacking debutants",
    style:
      "Organised defending, quick outlets into Delgado, and midfield control through Aguinaga’s timing rather than sustained territorial dominance.",
    tournamentOutlook: {
      label: "Debutants with belief",
      summary:
        "A historic second place in CONMEBOL gives Ecuador more than novelty status; they enter as debutants who have already proven they can beat established South American powers over a long campaign.",
    },
    keyPlayers: [
      { name: "Álex Aguinaga", position: "Midfielder", note: "Captain and creative veteran; the organiser of Ecuador’s first World Cup midfield." },
      { name: "Agustín Delgado", position: "Forward", note: "The side’s leading goal threat and qualifying talisman." },
      { name: "Iván Hurtado", position: "Defender", note: "An experienced centre-back central to Ecuador’s defensive discipline." },
      { name: "Édison Méndez", position: "Midfielder", note: "A dynamic midfielder who can carry the ball out of pressure and join attacks." }
    ],
    roster: roster(
      ["José Francisco Cevallos", "Oswaldo Ibarra", "Daniel Viteri"],
      ["Augusto Poroso", "Iván Hurtado", "Ulises de la Cruz", "Raúl Guerrón", "Marlon Ayoví", "Giovanny Espinoza", "Walter Ayoví"],
      ["Alfonso Obregón", "Luis Gómez", "Álex Aguinaga", "Juan Carlos Burbano", "Cléber Chalá", "Edwin Tenorio", "Wellington Sánchez"],
      ["Nicolás Asencio", "Iván Kaviedes", "Agustín Delgado", "Ángel Fernández", "Carlos Tenorio", "Édison Méndez"],
    ),
    sources: ["FIFA World Cup Korea/Japan 2002 squad lists", "RSSSF: 2002 FIFA World Cup CONMEBOL qualification", "FIFA/Coca-Cola World Ranking (15 May 2002)", "CONMEBOL qualifying table archives (Ecuador 31 pts, 2nd)"],
  },
  {
    tournamentId: "korea-japan-2002",
    teamId: "belgium",
    title: "Belgium’s Experienced Core",
    introduction:
      "Belgium reach Asia through the play-off door with a veteran squad that knows how World Cups feel and how quickly they can slip away.",
    beforeTheTournament: {
      stateOfTeam:
        "Robert Waseige relies on captain Marc Wilmots and a deeply experienced European core that finished second to Croatia in qualifying before seeing off the Czech Republic over two tense legs.",
      expectations:
        "A second-round place is the traditional Belgian target; age in key positions makes anything deeper a bonus rather than a promise.",
      majorStorylines:
        "An aging but battle-hardened spine; Wilmots’ leadership and midfield goals; recovering from finishing behind Croatia in Group 6; and whether play-off steel against the Czech Republic can carry into a balanced finals group.",
    },
    qualification: {
      method: "UEFA Group 6 runners-up and play-off winners",
      summary:
        "Belgium finished second to Croatia in UEFA Group 6, then defeated the Czech Republic 1–0 and 1–0 in the play-offs to secure an eleventh World Cup appearance.",
      record: "UEFA Group 6 runners-up (17 points); defeated Czech Republic 2–0 on aggregate in the play-offs",
      notableAchievements: "Fourth place at Mexico ’86 remains Belgium’s best World Cup finish.",
    },
    history: {
      worldCupAppearances: 11,
      previousAppearance: "1998",
      bestFinishEntering: "Fourth place (1986)",
      summary:
        "Belgium’s eleventh finals continues a long run of appearances since the 1980s, still measured against the 1986 semi-final run and recent group-stage ceilings.",
    },
    confederation: "UEFA",
    fifaRanking: 23,
    manager: "Robert Waseige",
    captain: "Marc Wilmots",
    tacticalIdentity: "Pragmatic, experience-led",
    style:
      "Compact defending, Wilmots arriving from midfield, and selective wide service rather than high-risk possession.",
    tournamentOutlook: {
      label: "Expected to reach the second round",
      summary:
        "Play-off resilience and deep tournament experience leave Belgium among the European sides previewed to contest a knockout place, provided veteran legs hold across a condensed schedule.",
    },
    keyPlayers: [
      { name: "Marc Wilmots", position: "Midfielder", note: "Captain and midfield goal threat; Belgium’s competitive reference in big fixtures." },
      { name: "Bart Goor", position: "Midfielder", note: "A wide midfielder who stretches defences and delivers from the flanks." },
      { name: "Gert Verheyen", position: "Midfielder", note: "An experienced attacker whose play-off goal helped book Belgium’s place." },
      { name: "Daniel Van Buyten", position: "Defender", note: "A commanding centre-back emerging as a long-term defensive pillar." }
    ],
    roster: roster(
      ["Geert De Vlieger", "Franky Vandendriessche", "Frédéric Herpoel"],
      ["Eric Deflandre", "Glen De Boeck", "Eric Van Meir", "Nico Van Kerckhoven", "Peter Van der Heyden", "Jacky Peeters", "Daniel Van Buyten"],
      ["Timmy Simons", "Bart Goor", "Johan Walem", "Sven Vermant", "Gaëtan Englebert", "Yves Vanderhaeghe", "Bernd Thijs", "Danny Boffin"],
      ["Marc Wilmots", "Wesley Sonck", "Gert Verheyen", "Branko Strupar", "Mbo Mpenza"],
    ),
    sources: ["FIFA World Cup Korea/Japan 2002 squad lists", "RSSSF: 2002 FIFA World Cup UEFA qualification and play-offs", "FIFA/Coca-Cola World Ranking (15 May 2002)", "UEFA Group 6 and Belgium–Czech Republic play-off archives"],
  },
  {
    tournamentId: "korea-japan-2002",
    teamId: "russia",
    title: "Russia’s Return Under Romantsev",
    introduction:
      "Russia come back to the World Cup after missing France ’98, with Oleg Romantsev restoring structure and a recognisable competitive identity.",
    beforeTheTournament: {
      stateOfTeam:
        "Romantsev’s side is organised around captain Viktor Onopko, with Aleksandr Mostovoi and Valery Karpin offering the creative thrust in a balanced, physically robust European unit.",
      expectations:
        "A second-round place is realistic in a Group H that looks more open than the so-called groups of death; Russia are neither dismissed nor heavily fancied.",
      majorStorylines:
        "A first finals since USA ’94; Romantsev’s club-to-country imprint; Mostovoi and Karpin’s creativity; and whether Onopko’s defence can turn qualifying control into June consistency.",
    },
    qualification: {
      method: "UEFA Group 1 winners",
      summary:
        "Russia won UEFA Group 1 to qualify automatically, completing a return to the World Cup after failing to reach France ’98.",
      record: "UEFA Group 1 winners",
      notableAchievements: "As the Soviet Union, finished fourth in 1966; Russia’s best as an independent nation entering 2002 remains the 1994 group-stage campaign.",
    },
    history: {
      worldCupAppearances: 2,
      previousAppearance: "1994",
      bestFinishEntering: "Fourth place as USSR (1966); group stage as Russia (1994)",
      summary:
        "Only a second World Cup as Russia after the Soviet era’s deeper runs, Korea/Japan ’02 is framed as a return under Romantsev following the absence of 1998.",
    },
    confederation: "UEFA",
    fifaRanking: 28,
    manager: "Oleg Romantsev",
    captain: "Viktor Onopko",
    tacticalIdentity: "Balanced, physically disciplined",
    style:
      "Strong defensive spacing, vertical midfield passing through Karpin and Mostovoi, and selective wide attacks rather than sterile possession.",
    tournamentOutlook: {
      label: "Returning after long absence",
      summary:
        "Missing 1998 still defines the narrative, but Group 1 success and Romantsev’s organisation make Russia a plausible knockout side in a comparatively balanced group.",
    },
    keyPlayers: [
      { name: "Viktor Onopko", position: "Defender", note: "Captain and defensive organiser of Russia’s return to the finals." },
      { name: "Aleksandr Mostovoi", position: "Midfielder", note: "A creative midfielder capable of deciding matches with a single pass or strike." },
      { name: "Valery Karpin", position: "Midfielder", note: "An experienced wide creator and set-piece threat from the qualifying campaign." },
      { name: "Vladimir Beschastnykh", position: "Forward", note: "A proven international finisher trusted as Russia’s central attacking outlet." },
      { name: "Ruslan Nigmatullin", position: "Goalkeeper", note: "The first-choice goalkeeper through Romantsev’s qualifying push." }
    ],
    roster: roster(
      ["Ruslan Nigmatullin", "Stanislav Cherchesov", "Aleksandr Filimonov"],
      ["Yuri Kovtun", "Yuriy Nikiforov", "Andrei Solomatin", "Viktor Onopko", "Vyacheslav Dayev", "Igor Chugainov", "Dmitri Sennikov"],
      ["Alexey Smertin", "Igor Semshov", "Valery Karpin", "Yegor Titov", "Aleksandr Mostovoi", "Dmitri Alenichev", "Sergei Semak", "Marat Izmailov", "Dmitri Khokhlov"],
      ["Vladimir Beschastnykh", "Aleksandr Kerzhakov", "Ruslan Pimenov", "Dmitri Sychev"],
    ),
    sources: ["FIFA World Cup Korea/Japan 2002 squad lists", "RSSSF: 2002 FIFA World Cup UEFA qualification", "FIFA/Coca-Cola World Ranking (15 May 2002)", "UEFA Group 1 archives"],
  },
  {
    tournamentId: "korea-japan-2002",
    teamId: "tunisia",
    title: "Tunisia’s Third Attempt",
    introduction:
      "Tunisia return for a third World Cup as North Africa’s representative with clear limits on hype and a focus on competitive dignity in a tough section.",
    beforeTheTournament: {
      stateOfTeam:
        "Ammar Souayah leads a disciplined CAF-qualified side captained by Khaled Badra, built more on organisation and collective work than on a cluster of global stars.",
      expectations:
        "Preview expectations are modest: compete, frustrate higher-ranked opponents, and treat a first finals win or unlikely group escape as a ceiling rather than a promise.",
      majorStorylines:
        "A third finals without a win to date entering the tournament conversation; Souayah’s organisation; Badra’s defensive leadership; and whether Tunisia’s CAF qualifying habits can travel against European and Asian hosts’ group rivals.",
    },
    qualification: {
      method: "CAF qualifiers",
      summary:
        "Tunisia came through CAF qualifying for a third World Cup appearance, building on their 1998 return and a familiar mix of domestic core players and Europe-based specialists under Ammar Souayah.",
      notableAchievements: "First African side to win a World Cup match (1978), still a landmark in continental history entering 2002.",
    },
    history: {
      worldCupAppearances: 3,
      previousAppearance: "1998",
      bestFinishEntering: "Group stage (1978, 1998)",
      summary:
        "Tunisia’s three World Cups have yet to produce a knockout place; Korea/Japan ’02 is another chance to turn CAF qualification into a first lasting imprint on the June stage.",
    },
    confederation: "CAF",
    fifaRanking: 31,
    manager: "Ammar Souayah",
    captain: "Khaled Badra",
    tacticalIdentity: "Compact and pragmatic",
    style:
      "Deep defending, disciplined midfield distances and selective counters, prioritising structure over open exchange with technical favourites.",
    tournamentOutlook: {
      label: "Dark horse",
      summary:
        "Modest specific expectations define the preview, yet Tunisia’s organisation and CAF pedigree leave room for a result that would rearrange a group table if concentration holds.",
    },
    keyPlayers: [
      { name: "Khaled Badra", position: "Defender", note: "Captain and defensive organiser of Souayah’s compact side." },
      { name: "Riadh Bouazizi", position: "Midfielder", note: "A tireless midfielder who screens the defence and breaks opposition rhythm." },
      { name: "Hassen Gabsi", position: "Midfielder", note: "A creative option trusted to turn rare possessions into shots." },
      { name: "Ziad Jaziri", position: "Forward", note: "A mobile forward and Tunisia’s clearest route to goals in open play." }
    ],
    roster: roster(
      ["Ali Boumnijel", "Hassen Bejaoui", "Ahmed El-Jaouachi"],
      ["Khaled Badra", "Mohamed Mkacher", "Hatem Trabelsi", "Raouf Bouzaiene", "Hamdi Marzouki", "Radhi Jaïdi", "Tarek Thabet", "Emir Mkademi", "José Clayton"],
      ["Zoubeir Baya", "Hassen Gabsi", "Kaies Ghodhbane", "Riadh Bouazizi", "Selim Benachour", "Mourad Melki"],
      ["Ziad Jaziri", "Imed Mhedhebi", "Riadh Jelassi", "Adel Sellimi", "Ali Zitouni"],
    ),
    sources: ["FIFA World Cup Korea/Japan 2002 squad lists", "RSSSF: 2002 FIFA World Cup CAF qualification", "FIFA/Coca-Cola World Ranking (15 May 2002)", "CAF qualifying archives"],
  },
];
