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

export const KOREA_JAPAN_2002_DOSSIERS: TeamTournamentDossier[] = [
  {
    tournamentId: "korea-japan-2002",
    teamId: "brazil",
    title: "Brazil: Scolari, scars, and a restless public",
    introduction:
      "Brazil still travel as football’s most watched caravan, but the mood is not the old swagger. A laboured CONMEBOL campaign—third behind Argentina and Ecuador—Scolari’s appointment amid turbulence, and the long shadow of the 1998 final defeat have left the Seleção facing unusual public skepticism even as Ronaldo’s return from injury rekindles hope.",
    beforeTheTournament: {
      stateOfTeam:
        "The attacking names remain intoxicating: Ronaldo’s comeback narrative, Rivaldo’s Barcelona craft, Ronaldinho’s Paris Saint-Germain invention, supported by Cafu and Roberto Carlos as perpetual-motion full-backs. Defensively and psychologically, questions linger louder than in most Brazilian World Cup build-ups.",
      expectations:
        "Despite qualifiers that dented aura, Brazil remain among the shortlist of tournament favourites in global betting markets—though Brazilian commentary itself is more conflicted than in cycles past.",
      majorStorylines:
        "Ronaldo’s fitness after years of knee trauma; whether Scolari can impose hierarchy on a star dressing room; Rivaldo–Ronaldinho creative balance; and a nation still processing France ’98 while demanding another deep run as a birthright.",
    },
    qualification: {
      method: "CONMEBOL qualifying (3rd place)",
      summary:
        "Brazil finished third in the CONMEBOL 18-team group with 30 points (9W-3D-6L), behind Argentina and Ecuador—a historically awkward campaign by Seleção standards that nonetheless secured automatic qualification after Luiz Felipe Scolari steadied the side late in the cycle.",
      record: "9W-3D-6L",
      notableAchievements: "Four-time World Cup winners (1958, 1962, 1970, 1994); runners-up in 1998; perpetual global standard-bearers despite a difficult qualifying cycle.",
    },
    history: {
      worldCupAppearances: 17,
      previousAppearance: "1998",
      bestFinishEntering: "Winners (1958, 1962, 1970, 1994)",
      summary:
        "No nation owns the World Cup myth like Brazil. Four titles and an unbroken finals attendance record create expectations that even rocky qualifying cannot erase—yet the manner of the road to 2002 has invited a rarer tone of doubt around a side still stacked with generational attackers.",
    },
    confederation: "CONMEBOL",
    fifaRanking: 2,
    manager: "Luiz Felipe Scolari",
    captain: "Cafu",
    tacticalIdentity: "Scolari’s pragmatic 3-4-2-1/3-5-2 variants emphasising wing-back width, midfield steel, and freedom for Ronaldo–Rivaldo–Ronaldinho to combine ahead of a protective block.",
    style:
      "Vertical and emotionally explosive when the front three click; less about endless keep-ball than about sudden overloads on the flanks and ruthless finishing once the game stretches.",
    tournamentOutlook: {
      label: "Tournament favorite",
      summary:
        "Still widely bracketed among the sides most likely to lift the trophy, even as Brazilian discourse debates whether this squad’s chemistry matches its talent after a stuttering qualifying year.",
    },
    keyPlayers: [
      { name: "Ronaldo", position: "Forward", note: "Inter striker returning from long-term knee injury; his fitness and sharpness are Brazil’s most scrutinised pre-tournament variables." },
      { name: "Rivaldo", position: "Attacking midfielder / forward", note: "Barcelona’s Ballon d’Or-era creator, expected to supply goals and invention between midfield and attack." },
      { name: "Ronaldinho", position: "Attacking midfielder / winger", note: "Paris Saint-Germain’s young star whose improvisation offers Brazil a different creative angle beside Rivaldo." },
      { name: "Cafu", position: "Right-back / captain", note: "Roma wing-back and official captain, the relentless overlapping constant in Scolari’s structure." },
      { name: "Roberto Carlos", position: "Left-back", note: "Real Madrid’s attacking left-back, a set-piece weapon and primary width-provider on the opposite flank to Cafu." }
    ],
    roster: roster(
      ["Marcos", "Dida", "Rogério Ceni"],
      ["Cafu", "Lúcio", "Roque Júnior", "Edmílson", "Roberto Carlos", "Juliano Belletti", "Ânderson Polga", "Júnior"],
      ["Ricardinho", "Gilberto Silva", "Rivaldo", "Ronaldinho", "Kléberson", "Vampeta", "Juninho Paulista", "Kaká"],
      ["Ronaldo", "Denílson", "Edílson", "Luizão"],
    ),
    sources: ["FIFA World Cup squad lists", "RSSSF 2002 World Cup qualification", "FIFA/Coca-Cola World Ranking (15 May 2002)", "CBF / CONMEBOL qualifying tables", "Folha de S.Paulo and Globo Esporte previews"],
  },
  {
    tournamentId: "korea-japan-2002",
    teamId: "germany",
    title: "Germany Under Scrutiny",
    introduction:
      "Germany arrive in Asia carrying a pedigree that still intimidates opponents, yet also a reputation newly dented by Euro 2000 and a qualifying campaign that never felt serene.",
    beforeTheTournament: {
      stateOfTeam:
        "Rudi Völler has steadied a side still rebuilding after a bleak European Championship, with Oliver Kahn’s authority in goal and Michael Ballack’s rise in midfield giving the squad a clearer spine than two years earlier.",
      expectations:
        "Few outside Germany treat them as outright favourites, but history alone means a second-round place is treated as a minimum and a deep run remains plausible if the new hierarchy holds.",
      majorStorylines:
        "Whether a post–Euro 2000 reset under Völler can silence domestic skepticism; Kahn’s captaincy from the back; Ballack’s emergence as the creative engine; and how Germany cope without injured talents such as Sebastian Deisler as they reopen an old rivalry narrative with England from qualifying.",
    },
    qualification: {
      method: "UEFA Group 9 runners-up and play-off winners",
      summary:
        "Germany finished second to England in UEFA Group 9 after a difficult campaign that included a heavy home defeat in Munich’s return fixture narrative, then booked their place by defeating Ukraine over two legs in the play-offs.",
      record: "UEFA Group 9 runners-up behind England; defeated Ukraine 1–1, 4–1 in the play-offs",
      notableAchievements: "Three-time world champions entering 2002, with titles in 1954, 1974 and 1990.",
    },
    history: {
      worldCupAppearances: 15,
      previousAppearance: "1998",
      bestFinishEntering: "Winners (1954, 1974, 1990)",
      summary:
        "Germany enter a fifteenth World Cup as one of the tournament’s most decorated nations, still measured against three previous titles even after missing the Euro 2000 knockout stage and needing a play-off route to Asia.",
    },
    confederation: "UEFA",
    fifaRanking: 11,
    manager: "Rudi Völler",
    captain: "Oliver Kahn",
    tacticalIdentity: "Compact, counter-punching tournament side",
    style:
      "A disciplined shape built to absorb pressure, spring through midfield runners, and rely on Kahn’s shot-stopping and Ballack’s late arrivals rather than sustained possession dominance.",
    tournamentOutlook: {
      label: "Established contender",
      summary:
        "Skepticism after Euro 2000 is real, but Germany’s tournament pedigree and a hardened qualifying finish leave them among the European sides still capable of a long run if concentration matches reputation.",
    },
    keyPlayers: [
      { name: "Oliver Kahn", position: "Goalkeeper", note: "The captain and competitive heartbeat; Germany’s last line and loudest organiser." },
      { name: "Michael Ballack", position: "Midfielder", note: "The emerging midfield reference, timed runs and set-piece threat defining Völler’s rebuild." },
      { name: "Miroslav Klose", position: "Forward", note: "A mobile striker whose aerial presence and work rate give Germany a different attacking profile." },
      { name: "Dietmar Hamann", position: "Midfielder", note: "Premier League-hardened destroyer trusted to break play and protect the back four." },
      { name: "Christian Ziege", position: "Defender", note: "An experienced left-sided attacker from deep, valuable on dead balls and transitions." }
    ],
    roster: roster(
      ["Oliver Kahn", "Jens Lehmann", "Hans-Jörg Butt"],
      ["Thomas Linke", "Marko Rehmer", "Frank Baumann", "Christian Ziege", "Sebastian Kehl", "Christoph Metzelder"],
      ["Carsten Ramelow", "Dietmar Hamann", "Lars Ricken", "Michael Ballack", "Jens Jeremies", "Marco Bode", "Jörg Böhme", "Bernd Schneider", "Torsten Frings"],
      ["Oliver Neuville", "Carsten Jancker", "Miroslav Klose", "Gerald Asamoah", "Oliver Bierhoff"],
    ),
    sources: ["FIFA World Cup Korea/Japan 2002 squad lists", "RSSSF: 2002 FIFA World Cup UEFA qualification", "FIFA/Coca-Cola World Ranking (15 May 2002)", "UEFA qualifying archives: Group 9 and Ukraine play-offs"],
  },
  {
    tournamentId: "korea-japan-2002",
    teamId: "korea-republic",
    title: "Korea Republic: Co-hosts hunting a first win",
    introduction:
      "Guus Hiddink’s Korea Republic step into a co-hosted World Cup with a statistical ghost at their shoulder: five previous finals, zero victories. Intensive training camps, European friendlies, and a fitness-first pressing culture have been designed to break that stigma under the loudest home expectation Asia’s first World Cup can generate.",
    beforeTheTournament: {
      stateOfTeam:
        "Hong Myung-bo captains a side drilled into Hiddink’s athletic template—high work-rate, compact distances, and young legs in midfield and attack. Talent is improving; the leap asked of them is psychological as much as technical.",
      expectations:
        "Korean public pressure demands a first World Cup win and a competitive showing in Group D. International analysts praise the preparation while remaining uncertain how far organisation alone can carry them against Portugal, the United States and Poland.",
      majorStorylines:
        "Co-host burden; Hiddink’s methods and European sparring schedule; the never-won-a-World-Cup-match stigma entering 2002; and whether home support becomes fuel or weight across the group.",
    },
    qualification: {
      method: "Host nation",
      summary:
        "As co-hosts with Japan, Korea Republic received an automatic berth and spent the unused qualifying cycle on Hiddink’s long training camps, European friendlies and a fitness programme built for a home finals.",
      notableAchievements: "Five prior World Cup appearances without a win entering 2002; Asian Cup winners (1956, 1960) in the competition’s early history; co-hosts of Asia’s first World Cup.",
      automaticQualifier: true,
    },
    history: {
      worldCupAppearances: 6,
      previousAppearance: "1998",
      bestFinishEntering: "Group stage (best finish entering 2002)",
      summary:
        "Korea have been Asia’s most frequent World Cup travellers, yet the finals have repeatedly ended at the group stage without a victory. Hiddink’s appointment was a deliberate attempt to modernise methods and finally convert participation into results on home soil.",
    },
    confederation: "AFC",
    fifaRanking: 40,
    manager: "Guus Hiddink",
    captain: "Hong Myung-bo",
    tacticalIdentity: "Fitness-first pressing host side",
    style:
      "Relentless without the ball, built on stamina and collective triggers rather than star improvisation; games are meant to become athletic examinations Hiddink believes his squad can win.",
    tournamentOutlook: {
      label: "Host nation under pressure",
      summary:
        "Every preview circles the same demand: end the winless World Cup history and make co-hosting count in Group D, where Portugal’s pedigree makes the assignment unforgiving.",
    },
    keyPlayers: [
      { name: "Hong Myung-bo", position: "Centre-back / sweeper / captain", note: "Official captain and defensive organiser across multiple World Cups; the leadership axis of Hiddink’s project." },
      { name: "Park Ji-sung", position: "Midfielder / winger", note: "Kyoto Purple Sanga midfielder whose engine and pressing embody Hiddink’s athletic ideal." },
      { name: "Ahn Jung-hwan", position: "Forward / attacking midfielder", note: "Perugia forward expected to provide technical finishing and link play in tight spaces." },
      { name: "Kim Nam-il", position: "Midfielder", note: "Defensive midfielder tasked with screening and ball-winning in Hiddink’s high-energy structure." },
      { name: "Seol Ki-hyeon", position: "Forward / winger", note: "Anderlecht attacker offering European club pace on the break." }
    ],
    roster: roster(
      ["Lee Woon-jae", "Kim Byung-ji", "Choi Eun-sung"],
      ["Hyun Young-min", "Choi Jin-cheul", "Kim Tae-young", "Lee Young-pyo", "Lee Min-sung", "Hong Myung-bo"],
      ["Choi Sung-yong", "Kim Nam-il", "Yoo Sang-chul", "Lee Eul-yong", "Yoon Jong-hwan", "Park Ji-sung", "Song Chong-gug"],
      ["Choi Tae-uk", "Seol Ki-hyeon", "Choi Yong-soo", "Lee Chun-soo", "Cha Du-ri", "Hwang Sun-hong", "Ahn Jung-hwan"],
    ),
    sources: ["FIFA World Cup squad lists", "RSSSF 2002 World Cup qualification", "FIFA/Coca-Cola World Ranking (15 May 2002)", "Korea Football Association / Hiddink appointment coverage", "FIFA host-nation preparation reports"],
  },
  {
    tournamentId: "korea-japan-2002",
    teamId: "turkey",
    title: "Turkey: Back after nearly half a century",
    introduction:
      "Turkey’s wait since Switzerland 1954 finally ends. Şenol Güneş brings a side built around a Galatasaray European core and captained by Hakan Şükür—the nation’s enduring centre-forward—into Group C with the sense that Turkish football’s club renaissance must now prove itself in national colours.",
    beforeTheTournament: {
      stateOfTeam:
        "The spine that conquered the UEFA Cup with Galatasaray—Özcan, Hakan Ünsal pathways, and Şükür’s finishing—gives Güneş a club-honed understanding rare at this level. Qualifying required a play-off demolition of Austria after a competitive UEFA group.",
      expectations:
        "Turkish media dream of a first meaningful World Cup imprint; international previews treat them as capable Group C spoilers rather than favourites, with respect for the Galatasaray pedigree.",
      majorStorylines:
        "The 48-year absence; Şükür’s captaincy burden; Güneş’s organisation; and whether a generation celebrated in European club competition can translate that belief onto the World Cup stage.",
    },
    qualification: {
      method: "UEFA play-off winners",
      summary:
        "Turkey took the UEFA play-off route after finishing runners-up in their section, then dismantled Austria over two legs (1–0 in Vienna, 5–0 in Istanbul) to end a forty-eight-year wait for the finals.",
      notableAchievements: "First World Cup appearance since 1954; Galatasaray’s 2000 UEFA Cup triumph supplied much of the national team’s experienced core.",
    },
    history: {
      worldCupAppearances: 2,
      previousAppearance: "1954",
      bestFinishEntering: "Group stage (1954)",
      summary:
        "Turkey’s only previous finals were a brief 1954 chapter. The intervening decades saw growing club strength—especially Galatasaray’s European breakthrough—without a World Cup stage, making this return feel like unfinished national business.",
    },
    confederation: "UEFA",
    fifaRanking: 22,
    manager: "Şenol Güneş",
    captain: "Hakan Şükür",
    tacticalIdentity: "Güneş’s compact midfield platform releasing Şükür and wide runners; disciplined distances and aggressive second-ball recovery.",
    style:
      "Collectively hard-running and emotionally loud, blending Anatolian intensity with the tactical familiarity of players who week-in, week-out understand each other’s club patterns.",
    tournamentOutlook: {
      label: "Returning after long absence",
      summary:
        "Approached as a romantic and dangerous Group C presence—boosted by European club pedigree—but still seeking proof that Turkey belong among the tournament’s established European names.",
    },
    keyPlayers: [
      { name: "Hakan Şükür", position: "Forward / captain", note: "Inter / Galatasaray-linked centre-forward and official captain; Turkey’s all-time focal point entering the finals." },
      { name: "Hasan Şaş", position: "Winger", note: "Galatasaray wide attacker whose dribbling and delivery are central to Güneş’s transition game." },
      { name: "Yıldıray Baştürk", position: "Attacking midfielder", note: "Bayer Leverkusen playmaker supplying European Champions League-season craft to Turkey’s creation." },
      { name: "Rüştü Reçber", position: "Goalkeeper", note: "Fenerbahçe shot-stopper and one of Turkey’s most trusted performers under tournament pressure expectations." }
    ],
    roster: roster(
      ["Rüştü Reçber", "Ömer Çatkıç", "Zafer Özgültekin"],
      ["Emre Aşık", "Bülent Korkmaz", "Fatih Akyel", "Alpay Özalan", "Ümit Özat", "Hakan Ünsal"],
      ["Okan Buruk", "Tugay Kerimoğlu", "Yıldıray Baştürk", "Muzzy Izzet", "Tayfur Havutçu", "Ergün Penbe", "Abdullah Ercan", "Emre Belözoğlu", "Ümit Davala"],
      ["Arif Erdem", "Hakan Şükür", "Hasan Şaş", "Nihat Kahveci", "İlhan Mansız"],
    ),
    sources: ["FIFA World Cup squad lists", "RSSSF 2002 World Cup qualification", "FIFA/Coca-Cola World Ranking (15 May 2002)", "UEFA play-off reports (Turkey–Austria)", "Turkish FA / contemporary Milliyet coverage"],
  },
  {
    tournamentId: "korea-japan-2002",
    teamId: "united-states",
    title: "United States: Hex recovery, Group D uncertainty",
    introduction:
      "Bruce Arena’s United States reach Korea/Japan through a Hexagonal campaign that lurched before stabilising into third place—enough to qualify, not enough to silence doubts after the 1998 collapse. Group D, with Portugal’s golden generation, co-host Korea Republic and a returning Poland, frames this as an American side still arguing for respect rather than assuming it.",
    beforeTheTournament: {
      stateOfTeam:
        "A blend of 1994-cycle veterans and a younger MLS-to-Europe pipeline: Claudio Reyna’s midfield captaincy, Eddie Pope’s defending, and attackers such as McBride and Donovan offering different profiles. Arena has restored organisational standards; ruthlessness in front of goal remains the standing question.",
      expectations:
        "U.S. Soccer talks openly about escaping the group; overseas tipsters are split, with many treating the Americans as the fourth name in a volatile Group D rather than a sure second-round side.",
      majorStorylines:
        "Living down France ’98; Reyna’s leadership from Sunderland/Manchester City pathways; Donovan’s emergence; Arena’s tactical control; and the specific puzzle of matching Portugal’s individual quality while navigating co-host atmosphere against Korea.",
    },
    qualification: {
      method: "CONCACAF Hexagonal (3rd place)",
      summary:
        "The United States finished third in the CONCACAF Hexagonal with 17 points (5W-2D-3L), level with Mexico on points but behind on goal difference, and six points adrift of Costa Rica’s 23—recovering from mid-cycle stumbles to claim the region’s final automatic berth.",
      record: "5W-2D-3L",
      notableAchievements: "World Cup semi-finalists in 1930 (third place); hosted the 1994 finals; seeking to rebuild reputation after a winless group exit in 1998.",
    },
    history: {
      worldCupAppearances: 7,
      previousAppearance: "1998",
      bestFinishEntering: "Third place (1930)",
      summary:
        "American World Cup history swings between early mythology (1930), long absence, the 1994 host rebirth, and the humiliation of 1998. Arena’s project is explicitly corrective: qualify with structure, then prove the U.S. belong in conversations with Europe’s established names.",
    },
    confederation: "CONCACAF",
    fifaRanking: 13,
    manager: "Bruce Arena",
    captain: "Claudio Reyna",
    tacticalIdentity: "Arena’s 4-4-2/4-5-1 hybrid stressing midfield congestion, disciplined full-backs, and selective counters rather than sustained territorial dominance.",
    style:
      "Athletically stubborn and positionally conservative—content to keep games ugly, win second balls, and ask Reyna to connect defence to the front two without exposing the back four to Portuguese-style isolation.",
    tournamentOutlook: {
      label: "Dark horse",
      summary:
        "Enter Group D with more hope than certainty: capable of taking points if structure holds, yet widely viewed as needing near-perfect nights against Portugal and favourable margins elsewhere to advance.",
    },
    keyPlayers: [
      { name: "Claudio Reyna", position: "Midfielder / captain", note: "Sunderland midfielder and official captain; Arena’s on-field metronome for tempo and positioning." },
      { name: "Brian McBride", position: "Forward", note: "Columbus Crew target man whose aerial strength gives the U.S. a direct outlet against packed European defences." },
      { name: "Landon Donovan", position: "Forward / winger", note: "San Jose Earthquakes attacker and the squad’s most explosive young talent entering his first World Cup cycle." },
      { name: "Eddie Pope", position: "Centre-back", note: "D.C. United / MLS defensive leader expected to organise Arena’s back line beside veteran partners." },
      { name: "Brad Friedel", position: "Goalkeeper", note: "Blackburn Rovers goalkeeper whose Premier League shot-stopping underpins American hopes of staying in tight matches." }
    ],
    roster: roster(
      ["Brad Friedel", "Kasey Keller", "Tony Meola"],
      ["Gregg Berhalter", "Pablo Mastroeni", "David Regis", "Jeff Agoos", "Steve Cherundolo", "Carlos Llamosa", "Tony Sanneh", "Eddie Pope"],
      ["Frankie Hejduk", "John O'Brien", "Eddie Lewis", "Earnie Stewart", "Claudio Reyna", "Cobi Jones", "DaMarcus Beasley"],
      ["Joe-Max Moore", "Clint Mathis", "Josh Wolff", "Brian McBride", "Landon Donovan"],
    ),
    sources: ["FIFA World Cup squad lists", "RSSSF 2002 World Cup qualification", "FIFA/Coca-Cola World Ranking (15 May 2002)", "CONCACAF Hexagonal final tables", "USSF / Soccer America pre-tournament coverage"],
  },
  {
    tournamentId: "korea-japan-2002",
    teamId: "senegal",
    title: "Senegal: Debutants from the French league pipeline",
    introduction:
      "Senegal’s first World Cup is already a national event before kick-off: a French-trained, French-club squad under Bruno Metsu, fresh from reaching the 2002 Africa Cup of Nations final, drawn to open against the world champions who still cast a long shadow over West African football’s talent pathways.",
    beforeTheTournament: {
      stateOfTeam:
        "Metsu has welded a cohesive unit around Aliou Cissé’s leadership, with El Hadji Diouf’s unpredictability up front and a midfield comfortable in European club rhythms. Confidence from the AFCON run is high, even as inexperience at this level remains the obvious unknown.",
      expectations:
        "Progress from a group containing France, Uruguay and Denmark would be celebrated as historic; simply competing without being overawed is the baseline many African observers set for a debutant side this talented.",
      majorStorylines:
        "The France opener is the narrative gravitational centre—former colonial power, many Senegalese players’ club homes, and the defending champions all in one fixture. Diouf’s form, Metsu’s tactical clarity, and whether a debutant defence can withstand elite pressure will define the early judgment.",
    },
    qualification: {
      method: "CAF qualifying group winners",
      summary:
        "Senegal secured their first World Cup place by winning their African qualifying group, finishing ahead of established regional rivals including Morocco and Egypt in the final CAF group stage to book a historic debut in Korea/Japan.",
      notableAchievements: "Africa Cup of Nations 2002 runners-up; first FIFA World Cup qualification.",
    },
    history: {
      worldCupAppearances: 1,
      previousAppearance: "None",
      bestFinishEntering: "Debut",
      summary:
        "Long a producer of European-based professionals without a World Cup stage to call their own, Senegal’s breakthrough closes a generational wait. The AFCON final appearance earlier in 2002 confirmed that Metsu’s project was more than a one-off qualifying surge.",
    },
    confederation: "CAF",
    fifaRanking: 42,
    manager: "Bruno Metsu",
    captain: "Aliou Cissé",
    tacticalIdentity: "Compact defensive block with rapid breaks through Diouf and wide runners; organised pressing triggers rather than constant high press.",
    style:
      "Athletic, direct when space appears, and emotionally charged in big occasions—comfortable absorbing pressure then striking through individual brilliance rather than prolonged possession sequences.",
    tournamentOutlook: {
      label: "Debutants with belief",
      summary:
        "Respected as dangerous outsiders in Group A after their AFCON showing, with the France match framed as both opportunity and ordeal for a side still writing its World Cup identity.",
    },
    keyPlayers: [
      { name: "El Hadji Diouf", position: "Forward", note: "Lens attacker and Senegal’s most watched offensive threat, expected to carry the creative burden in a debut tournament." },
      { name: "Aliou Cissé", position: "Midfielder / captain", note: "Montpellier (and previously Paris Saint-Germain) midfielder captaining the debutants; the organisational hub of Metsu’s side." },
      { name: "Khalilou Fadiga", position: "Midfielder", note: "Auxerre wide midfielder whose delivery and set-piece threat give Senegal a different attacking gear." },
      { name: "Henri Camara", position: "Forward", note: "Sedan striker offering pace and finishing depth alongside Diouf in Metsu’s forward options." }
    ],
    roster: roster(
      ["Tony Sylva", "Omar Diallo", "Kalidou Cissokho"],
      ["Omar Daf", "Pape Malick Diop", "Alassane N'Dour", "Aliou Cissé", "Lamine Diatta", "Ferdinand Coly", "Habib Beye"],
      ["Pape Sarr", "Khalilou Fadiga", "Amdy Faye", "Moussa N'Diaye", "Salif Diao", "Papa Bouba Diop", "Sylvain N'Diaye", "Makhtar N'Diaye"],
      ["Henri Camara", "Amara Traoré", "Souleymane Camara", "El Hadji Diouf", "Pape Thiaw"],
    ),
    sources: ["FIFA World Cup squad lists", "RSSSF 2002 World Cup qualification", "FIFA/Coca-Cola World Ranking (15 May 2002)", "CAF / Africa Cup of Nations 2002 reports", "BBC Sport Africa World Cup previews"],
  },
  {
    tournamentId: "korea-japan-2002",
    teamId: "spain",
    title: "Spain: Talent forever awaiting its tournament",
    introduction:
      "Spain’s pre-tournament ritual is painfully familiar: a squad stacked with club excellence, a public convinced this should finally be their cycle, and a history of early exits that turns every optimistic headline into a dare. José Antonio Camacho’s side again carry that burden into Group B.",
    beforeTheTournament: {
      stateOfTeam:
        "Raúl leads a generation rich in Real Madrid and Barcelona pedigree—Hierro’s authority at the back, Valerón’s craft, Morientes and Tristan among the finishing options. On paper few European sides look cleaner; the scar tissue is psychological more than technical.",
      expectations:
        "Domestic and continental opinion places Spain among the serious contenders. Second-round qualification from Group B is treated as a minimum; anything less would reopen the underachievement inquest immediately.",
      majorStorylines:
        "Camacho’s pragmatic hand versus Spain’s attacking instincts; Raúl’s burden as the face of a nation’s impatience; and whether a group with Paraguay, Slovenia and South Africa offers the soft landing Spain never quite trust themselves to take.",
    },
    qualification: {
      method: "UEFA Group 7 winners",
      summary:
        "Spain won UEFA Group 7 ahead of Austria, Israel, Bosnia and Herzegovina and Liechtenstein, securing direct qualification with the attacking fluency that fuels perennial favouritism—and the accompanying pressure.",
      notableAchievements: "European Championship winners (1964); World Cup fourth place in 1950 remains their best finals finish entering 2002.",
    },
    history: {
      worldCupAppearances: 11,
      previousAppearance: "1998",
      bestFinishEntering: "Fourth place (1950)",
      summary:
        "Spain’s club football has long outpaced its World Cup résumé. Fourth in Brazil in 1950 still stands as the high-water mark on the global stage, a statistic that haunts a football culture accustomed to domestic brilliance and international frustration.",
    },
    confederation: "UEFA",
    fifaRanking: 8,
    manager: "José Antonio Camacho",
    captain: "Fernando Hierro",
    tacticalIdentity: "Camacho’s structured 4-4-2/4-2-3-1 leaning on full-back width, midfield industry, and Raúl as the reference forward between the lines.",
    style:
      "Technically polished in possession, occasionally over-elaborate under stress, and heavily reliant on moments of individual class from Raúl and the creative midfield to break stubborn blocks.",
    tournamentOutlook: {
      label: "Established contender",
      summary:
        "Seeded among the tournament’s stronger European sides and expected to navigate Group B, with the familiar caveat that Spain’s ceiling has always been higher than their historical World Cup delivery.",
    },
    keyPlayers: [
      { name: "Raúl", position: "Forward", note: "Real Madrid captain at club level and Spain’s talismanic scorer; the player on whom national expectation most heavily settles." },
      { name: "Fernando Hierro", position: "Centre-back / captain", note: "Real Madrid defender and official Spain captain, organising the back line and contributing from set pieces." },
      { name: "Juan Carlos Valerón", position: "Attacking midfielder", note: "Deportivo La Coruña playmaker whose vision gives Camacho a different creative register beside more direct options." },
      { name: "Iker Casillas", position: "Goalkeeper", note: "Real Madrid’s young first-choice keeper, already established as Spain’s last line entering the finals." },
      { name: "Luis Enrique", position: "Midfielder / forward", note: "Barcelona veteran offering leadership, work-rate and versatility across Camacho’s midfield and attack." }
    ],
    roster: roster(
      ["Iker Casillas", "Ricardo", "Pedro Contreras"],
      ["Curro Torres", "Juanfran", "Carles Puyol", "Fernando Hierro", "Enrique Romero", "Miguel Ángel Nadal"],
      ["Iván Helguera", "Rubén Baraja", "Javier de Pedro", "David Albelda", "Gaizka Mendieta", "Juan Carlos Valerón", "Sergio", "Xavi", "Luis Enrique", "Joaquín"],
      ["Raúl", "Fernando Morientes", "Diego Tristán", "Albert Luque"],
    ),
    sources: ["FIFA World Cup squad lists", "RSSSF 2002 World Cup qualification", "FIFA/Coca-Cola World Ranking (15 May 2002)", "RFEF / UEFA Group 7 archives", "Marca and AS pre-tournament coverage"],
  },
  {
    tournamentId: "korea-japan-2002",
    teamId: "england",
    title: "England’s Narrow Escape Becomes Belief",
    introduction:
      "England reach Asia on the back of a dramatic qualifying climax and a restored sense that Sven-Göran Eriksson’s project can travel deep into a World Cup.",
    beforeTheTournament: {
      stateOfTeam:
        "Eriksson has blended experienced leaders with a younger midfield core, while captain David Beckham’s fitness after a metatarsal injury has dominated the final weeks of preparation alongside Michael Owen’s finishing threat.",
      expectations:
        "A quarter-final or better is the vernacular standard at home; topping a group that includes Argentina would be treated as a statement, though preview talk carefully stops short of assuming any single result.",
      majorStorylines:
        "Beckham’s free-kick salvation against Greece in qualifying and the subsequent metatarsal fitness watch; Owen’s form as the central striker; a midfield generation coming of age; and the psychological charge of sharing a group with Argentina without presuming how that meeting unfolds.",
    },
    qualification: {
      method: "UEFA Group 9 winners",
      summary:
        "England won UEFA Group 9 ahead of Germany, sealing qualification in memorable fashion when Beckham’s last-gasp free-kick against Greece preserved their path at Old Trafford.",
      record: "UEFA Group 9 winners ahead of Germany",
      notableAchievements: "World Cup winners in 1966; semi-finalists in 1990.",
    },
    history: {
      worldCupAppearances: 11,
      previousAppearance: "1998",
      bestFinishEntering: "Winners (1966)",
      summary:
        "England’s eleventh World Cup is still measured against 1966, but Eriksson’s qualifying command—especially finishing above Germany—has refreshed belief that a serious knockout campaign is within reach.",
    },
    confederation: "UEFA",
    fifaRanking: 12,
    manager: "Sven-Göran Eriksson",
    captain: "David Beckham",
    tacticalIdentity: "Balanced 4-4-2 / flexible midfield",
    style:
      "Wide supply for Owen, Beckham’s delivery from the right, and a midfield designed to mix control with aggressive transitions rather than pure possession dominance.",
    tournamentOutlook: {
      label: "Established contender",
      summary:
        "Dramatic qualifying, a top-twelve ranking and Eriksson’s calm hierarchy place England among the European sides expected to contend well beyond the group stage—if Beckham’s recovery holds.",
    },
    keyPlayers: [
      { name: "David Beckham", position: "Midfielder", note: "Captain, set-piece specialist and the central fitness narrative of England’s build-up." },
      { name: "Michael Owen", position: "Forward", note: "The primary goal threat and reference point of Eriksson’s attack." },
      { name: "Paul Scholes", position: "Midfielder", note: "Manchester United midfielder trusted to supply goals and control from central areas after Steven Gerrard’s pre-tournament withdrawal." },
      { name: "Rio Ferdinand", position: "Defender", note: "A composed centre-back increasingly trusted as the defensive organiser." },
      { name: "Paul Scholes", position: "Midfielder", note: "The side’s sharpest passer between the lines when given licence to arrive in advanced zones." }
    ],
    roster: roster(
      ["David Seaman", "Nigel Martyn", "David James"],
      ["Danny Mills", "Ashley Cole", "Rio Ferdinand", "Sol Campbell", "Wes Brown", "Wayne Bridge", "Martin Keown", "Gareth Southgate"],
      ["Trevor Sinclair", "David Beckham", "Paul Scholes", "Owen Hargreaves", "Joe Cole", "Nicky Butt", "Kieron Dyer"],
      ["Robbie Fowler", "Michael Owen", "Emile Heskey", "Teddy Sheringham", "Darius Vassell"],
    ),
    sources: ["FIFA World Cup Korea/Japan 2002 squad lists", "RSSSF: 2002 FIFA World Cup UEFA qualification", "FIFA/Coca-Cola World Ranking (15 May 2002)", "UEFA Group 9 archives (England vs Greece; Germany)"],
  },
  {
    tournamentId: "korea-japan-2002",
    teamId: "japan",
    title: "Japan at Home, Still Seeking a First Win",
    introduction:
      "Japan enter their own co-hosted World Cup with technical promise, public expectation and the unfinished business of never having won a finals match.",
    beforeTheTournament: {
      stateOfTeam:
        "Philippe Troussier has shaped a young, technically fluent side around captain Tsuneyasu Miyamoto, buoyed by reaching the Confederations Cup final on home soil in 2001 before falling to France.",
      expectations:
        "A first World Cup victory is the emotional floor; progressing from the group would transform co-host optimism into lasting belief.",
      majorStorylines:
        "Co-host pressure without a prior finals win; Troussier’s trust in a technical young generation; the confidence hangover and lift from the 2001 Confederations Cup final; and whether Miyamoto’s defence can protect a creative midfield against European and African power.",
    },
    qualification: {
      method: "Host nation",
      summary:
        "Japan’s place was automatic as co-host. Troussier used the free cycle—and a Confederations Cup final on home soil in 2001—to accelerate a young national project ahead of the shared Asian finals.",
      notableAchievements: "Confederations Cup finalists as hosts in 2001; first World Cup appearance came in 1998.",
      automaticQualifier: true,
    },
    history: {
      worldCupAppearances: 2,
      previousAppearance: "1998",
      bestFinishEntering: "Group stage (1998)",
      summary:
        "Japan’s second World Cup is also their first as hosts. France ’98 brought experience without a win; Korea/Japan ’02 is the attempt to convert home stages and Confed Cup progress into a first knockout chapter.",
    },
    confederation: "AFC",
    fifaRanking: 32,
    manager: "Philippe Troussier",
    captain: "Tsuneyasu Miyamoto",
    tacticalIdentity: "Technical, possession-oriented",
    style:
      "Short passing through midfield, quick combinations in advanced areas, and a compact defensive block designed to frustrate stronger athletic sides.",
    tournamentOutlook: {
      label: "Host nation under pressure",
      summary:
        "Home support and Confed Cup momentum raise expectation, yet the absence of a World Cup win entering the tournament makes every group point a national story.",
    },
    keyPlayers: [
      { name: "Tsuneyasu Miyamoto", position: "Defender", note: "Captain and defensive organiser of Troussier’s young co-host side." },
      { name: "Hidetoshi Nakata", position: "Midfielder", note: "Japan’s highest-profile midfielder and the creative reference in Europe’s club game." },
      { name: "Junichi Inamoto", position: "Midfielder", note: "An energetic midfielder expected to press and connect midfield to attack." },
      { name: "Shinji Ono", position: "Midfielder", note: "A technically refined passer trusted to dictate quieter passages of play." },
      { name: "Atsushi Yanagisawa", position: "Forward", note: "Kashima Antlers striker and a primary reference in Troussier’s attacking plans entering the co-hosted finals." }
    ],
    roster: roster(
      ["Yoshikatsu Kawaguchi", "Seigo Narazaki", "Hitoshi Sogahata"],
      ["Yutaka Akita", "Naoki Matsuda", "Ryuzo Morioka", "Toshihiro Hattori", "Kōji Nakata", "Tsuneyasu Miyamoto"],
      ["Junichi Inamoto", "Hidetoshi Nakata", "Hiroaki Morishima", "Alessandro Santos", "Takashi Fukunishi", "Shinji Ono", "Mitsuo Ogasawara", "Tomokazu Myojin", "Kazuyuki Toda", "Daisuke Ichikawa"],
      ["Akinori Nishizawa", "Masashi Nakayama", "Takayuki Suzuki", "Atsushi Yanagisawa"],
    ),
    sources: ["FIFA World Cup Korea/Japan 2002 squad lists", "FIFA Confederations Cup 2001 archives", "FIFA/Coca-Cola World Ranking (15 May 2002)", "FIFA host-nation qualification records"],
  },
];
