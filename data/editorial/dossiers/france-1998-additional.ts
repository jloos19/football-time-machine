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

const sources = ["FIFA World Cup squad lists", "RSSSF", "FIFA/Coca-Cola World Ranking (May 1998)", "Wikipedia: 1998 FIFA World Cup squads"];

/** Additional participant Team Profiles beyond curated Team Journey nations. */
export const FRANCE_1998_ADDITIONAL_DOSSIERS: TeamTournamentDossier[] = [
  {
    tournamentId: "france-1998",
    teamId: "austria",
    title: "Austria at France ’98",
    introduction:
      "Austria return after missing USA ’94, bringing Toni Polster’s experience and Herbert Prohaska’s organised European method.",
    beforeTheTournament: {
      stateOfTeam:
        "A compact squad built around domestic and Bundesliga experience seeks to restore Austria to the knockout conversation.",
      expectations:
        "A competitive group campaign would mark a successful return to the finals.",
      majorStorylines:
        "Whether Polster can still lead the line at this level is the defining personnel question.",
    },
    qualification: {
      method: "UEFA Group 4 winners",
      summary: "Austria topped UEFA Group 4 to qualify for a first World Cup since 1990.",
    },
    history: {
      worldCupAppearances: 7,
      previousAppearance: "1990",
      bestFinishEntering: "Third place (1954)",
      summary:
        "Austria were a mid-century power and return in 1998 after missing the 1994 finals.",
    },
    confederation: "UEFA",
    fifaRanking: 31,
    manager: "Herbert Prohaska",
    captain: "Toni Polster",
    tacticalIdentity: "Organised and direct",
    style:
      "Compact shape, set-piece threat and selective attacks through experienced forwards.",
    tournamentOutlook: {
      label: "Expected to reach the second round",
      summary:
        "Austria’s ranking sits outside the favourites, but their qualifying discipline makes a knockout push plausible.",
    },
    keyPlayers: [
      { name: "Toni Polster", position: "Forward", note: "The captain and historic goalscorer of the modern Austrian side." },
      { name: "Andi Herzog", position: "Midfielder", note: "A creative midfielder trusted to unlock defences." },
      { name: "Ivica Vastić", position: "Forward", note: "A mobile forward capable of finishing transitions." },
      { name: "Wolfgang Feiersinger", position: "Defender", note: "An experienced defender central to Austria’s organisation." }
    ],
    roster: roster(
      ["Michael Konsel", "Franz Wohlfahrt", "Wolfgang Knaller"],
      ["Peter Schöttel", "Anton Pfeffer", "Wolfgang Feiersinger", "Walter Kogler", "Martin Hiden"],
      ["Markus Schopp", "Heimo Pfeifenberger", "Andi Herzog", "Martin Amerhauser", "Harald Cerny", "Arnold Wetl", "Roman Mählich", "Peter Stöger", "Andreas Heraf", "Dietmar Kühbauer"],
      ["Mario Haas", "Ivica Vastić", "Hannes Reinmayr", "Toni Polster"],
    ),
    sources,
  },
  {
    tournamentId: "france-1998",
    teamId: "belgium",
    title: "Belgium at France ’98",
    introduction:
      "Belgium arrive with a transitional European squad under Georges Leekens, seeking to convert qualifying solidity into group-stage progress.",
    beforeTheTournament: {
      stateOfTeam:
        "An experienced midfield around Franky Van der Elst remains the side’s organisational spine.",
      expectations:
        "A place in the second round is the clear opening target.",
      majorStorylines:
        "How Belgium replace fading generation markers while remaining competitive is the central build-up theme.",
    },
    qualification: {
      method: "UEFA play-off winners",
      summary: "Belgium won a UEFA qualifying play-off to secure their place in France.",
    },
    history: {
      worldCupAppearances: 10,
      previousAppearance: "1994",
      bestFinishEntering: "Fourth place (1986)",
      summary:
        "Belgium have been regular finalists since the 1980s and return seeking to improve on recent group exits.",
    },
    confederation: "UEFA",
    fifaRanking: 36,
    manager: "Georges Leekens",
    captain: "Franky Van der Elst",
    tacticalIdentity: "Compact and pragmatic",
    style:
      "Disciplined defending, midfield control and selective forward running.",
    tournamentOutlook: {
      label: "Expected to reach the second round",
      summary:
        "Belgium’s tournament experience leaves them among the European sides expected to compete for a knockout place.",
    },
    keyPlayers: [
      { name: "Franky Van der Elst", position: "Midfielder", note: "The captain and midfield organiser with vast international experience." },
      { name: "Luc Nilis", position: "Forward", note: "A technically refined striker trusted in the penalty area." },
      { name: "Marc Wilmots", position: "Midfielder", note: "An energetic midfielder capable of arriving late in the box." },
      { name: "Gert Verheyen", position: "Midfielder", note: "A wide midfielder who stretched opposing full-backs." }
    ],
    roster: roster(
      ["Filip De Wilde", "Philippe Vande Walle", "Dany Verlinden"],
      ["Bertrand Crasson", "Lorenzo Staelens", "Gordan Vidović", "Vital Borkelmans", "Glen De Boeck", "Mike Verstraeten", "Eric Van Meir", "Éric Deflandre"],
      ["Franky Van der Elst", "Marc Wilmots", "Nico Van Kerckhoven", "Enzo Scifo", "Philippe Clement", "Danny Boffin"],
      ["Luís Oliveira", "Mbo Mpenza", "Luc Nilis", "Gert Verheyen", "Émile Mpenza"],
    ),
    sources,
  },
  {
    tournamentId: "france-1998",
    teamId: "bulgaria",
    title: "Bulgaria at France ’98",
    introduction:
      "Bulgaria return with Hristo Stoichkov still central to expectation after their remarkable USA ’94 run.",
    beforeTheTournament: {
      stateOfTeam:
        "Hristo Bonev leads a side seeking continuity from the previous tournament’s breakthrough generation.",
      expectations:
        "A place beyond the group remains the standard against which this squad will be judged.",
      majorStorylines:
        "Whether Stoichkov and company can recapture 1994’s belief is the dominant pre-tournament narrative.",
    },
    qualification: {
      method: "UEFA Group 5 winners",
      summary: "Bulgaria topped UEFA Group 5 to qualify for a second consecutive World Cup.",
    },
    history: {
      worldCupAppearances: 7,
      previousAppearance: "1994",
      bestFinishEntering: "Fourth place (1994)",
      summary:
        "Bulgaria’s fourth-place finish in 1994 transformed expectations; France ’98 is the attempt to sustain that rise.",
    },
    confederation: "UEFA",
    fifaRanking: 35,
    manager: "Hristo Bonev",
    captain: "Trifon Ivanov",
    tacticalIdentity: "Counter-attacking",
    style:
      "Compact defending and rapid transitions through Stoichkov and Balakov.",
    tournamentOutlook: {
      label: "Dark horse",
      summary:
        "Bulgaria’s recent pedigree makes them a dangerous group opponent despite a mid-tier ranking.",
    },
    keyPlayers: [
      { name: "Hristo Stoichkov", position: "Forward", note: "The side’s talismanic attacker and primary creative threat." },
      { name: "Krasimir Balakov", position: "Midfielder", note: "A refined playmaker capable of controlling tempo." },
      { name: "Trifon Ivanov", position: "Defender", note: "The captain and commanding presence in central defence." },
      { name: "Emil Kostadinov", position: "Forward", note: "An experienced forward trusted to finish transitions." }
    ],
    roster: roster(
      ["Zdravko Zdravkov", "Borislav Mihaylov"],
      ["Radostin Kishishev", "Trifon Ivanov", "Ivaylo Petkov", "Gosho Ginchev", "Adalbert Zafirov", "Rosen Kirilov"],
      ["Ivaylo Yordanov", "Zlatko Yankov", "Krasimir Balakov", "Ilian Iliev", "Marian Hristov", "Anatoli Nankov", "Stoycho Stoilov", "Daniel Borimirov", "Milen Petkov"],
      ["Emil Kostadinov", "Hristo Stoichkov", "Lyuboslav Penev", "Georgi Bachev", "Georgi Ivanov"],
    ),
    sources,
  },
  {
    tournamentId: "france-1998",
    teamId: "cameroon",
    title: "Cameroon at France ’98",
    introduction:
      "Cameroon arrive seeking to renew African authority under Claude Le Roy with a blend of experience and emerging talent.",
    beforeTheTournament: {
      stateOfTeam:
        "A physically imposing squad still looks to François Omam-Biyik for leadership in the final third.",
      expectations:
        "A competitive group showing is the opening measure for a programme with quarter-final pedigree.",
      majorStorylines:
        "Whether Cameroon can rediscover the cohesion of earlier tournaments frames the build-up.",
    },
    qualification: {
      method: "CAF finalists",
      summary: "Cameroon secured one of Africa’s five finals places through the CAF qualifying path.",
    },
    history: {
      worldCupAppearances: 4,
      previousAppearance: "1994",
      bestFinishEntering: "Quarter-finals (1990)",
      summary:
        "Cameroon’s 1990 run remains the programme’s high-water mark entering France ’98.",
    },
    confederation: "CAF",
    fifaRanking: 49,
    manager: "Claude Le Roy",
    captain: "François Omam-Biyik",
    tacticalIdentity: "Athletic and direct",
    style:
      "Powerful running, aggressive duels and transitions through wide areas.",
    tournamentOutlook: {
      label: "Dark horse",
      summary:
        "Ranked outside the top forty, Cameroon remain capable of unsettling more established European sides.",
    },
    keyPlayers: [
      { name: "François Omam-Biyik", position: "Forward", note: "The captain and aerial reference in attack." },
      { name: "Patrick Mboma", position: "Forward", note: "A powerful forward option with pace in behind." },
      { name: "Rigobert Song", position: "Defender", note: "A young defender already trusted with major responsibility." },
      { name: "Jacques Songo'o", position: "Goalkeeper", note: "An experienced goalkeeper at European club level." }
    ],
    roster: roster(
      ["Jacques Songo'o", "William Andem", "Alioum Boukar"],
      ["Joseph Elanga", "Pierre Womé", "Rigobert Song", "Raymond Kalla", "Pierre Njanka", "Lauren", "Patrice Abanda", "Michel Pensée"],
      ["Didier Angibeaud", "Augustine Simo", "Joseph Ndo", "Marcel Mahouvé", "Salomon Olembé"],
      ["François Omam-Biyik", "Alphonse Tchami", "Patrick Mboma", "Samuel Eto'o", "Samuel Ipoua", "Joseph-Désiré Job"],
    ),
    sources,
  },
  {
    tournamentId: "france-1998",
    teamId: "chile",
    title: "Chile at France ’98",
    introduction:
      "Chile return after a ban that kept them out of the previous two tournaments, led by the Zamorano–Salas partnership.",
    beforeTheTournament: {
      stateOfTeam:
        "Nelson Acosta has built an attacking identity around two elite strikers and a hard-working midfield.",
      expectations:
        "A place in the second round would mark a successful return to the finals.",
      majorStorylines:
        "Whether Chile’s attack can outscore defensive vulnerability is the central pre-tournament debate.",
    },
    qualification: {
      method: "CONMEBOL qualifiers",
      summary: "Chile secured qualification through the CONMEBOL round-robin after returning from suspension.",
      notableAchievements: "First finals since 1982 following a ban that covered the 1990 and 1994 cycles.",
    },
    history: {
      worldCupAppearances: 7,
      previousAppearance: "1982",
      bestFinishEntering: "Third place (1962)",
      summary:
        "Chile hosted and finished third in 1962; France ’98 is their return after a long enforced absence.",
    },
    confederation: "CONMEBOL",
    fifaRanking: 9,
    manager: "Nelson Acosta",
    captain: "Iván Zamorano",
    tacticalIdentity: "Attacking and vertical",
    style:
      "Quick service into Zamorano and Salas, with energetic midfield support.",
    tournamentOutlook: {
      label: "Dark horse",
      summary:
        "A top-ten ranking and a formidable strike pair leave Chile among the more dangerous outsider sides.",
    },
    keyPlayers: [
      { name: "Iván Zamorano", position: "Forward", note: "The captain and established international centre-forward." },
      { name: "Marcelo Salas", position: "Forward", note: "A clinical striker at the peak of his powers." },
      { name: "José Luis Sierra", position: "Midfielder", note: "A creative midfielder trusted to supply the forward line." },
      { name: "Nelson Tapia", position: "Goalkeeper", note: "The established first-choice goalkeeper entering the tournament." }
    ],
    roster: roster(
      ["Nelson Tapia", "Marcelo Ramírez", "Carlos Tejas"],
      ["Cristián Castañeda", "Ronald Fuentes", "Francisco Rojas", "Javier Margas", "Pedro Reyes", "Miguel Ramírez", "Moisés Villarroel", "Mauricio Aros"],
      ["Nelson Parraguez", "Clarence Acuña", "José Luis Sierra", "Marcelo Vega", "Luis Musrri", "Fernando Cornejo", "Fabián Estay"],
      ["Iván Zamorano", "Marcelo Salas", "Manuel Neira", "Rodrigo Barrera"],
    ),
    sources,
  },
  {
    tournamentId: "france-1998",
    teamId: "colombia",
    title: "Colombia at France ’98",
    introduction:
      "Colombia return with Carlos Valderrama still orchestrating midfield and renewed hope after a painful USA ’94 exit.",
    beforeTheTournament: {
      stateOfTeam:
        "Hernán Darío Gómez leads a side that retains its creative identity while seeking greater defensive control.",
      expectations:
        "A place beyond the group is the clear ambition for a talented CONMEBOL programme.",
      majorStorylines:
        "Whether Colombia can convert style into knockout progress dominates the pre-tournament conversation.",
    },
    qualification: {
      method: "CONMEBOL qualifiers",
      summary: "Colombia finished among the CONMEBOL qualifying places to reach a third consecutive World Cup.",
    },
    history: {
      worldCupAppearances: 4,
      previousAppearance: "1994",
      bestFinishEntering: "Round of 16 (1990)",
      summary:
        "Colombia’s early-1990s rise made them perennial contenders; France ’98 is another chance to match reputation with progress.",
    },
    confederation: "CONMEBOL",
    fifaRanking: 10,
    manager: "Hernán Darío Gómez",
    captain: "Carlos Valderrama",
    tacticalIdentity: "Fluid and inventive",
    style:
      "Patient build-up through Valderrama with runners from midfield and varied forward options.",
    tournamentOutlook: {
      label: "Dark horse",
      summary:
        "A top-ten ranking and retained creative quality leave Colombia tipped by many to advance from the group.",
    },
    keyPlayers: [
      { name: "Carlos Valderrama", position: "Midfielder", note: "The captain and playmaker whose vision still organises Colombia’s patterns." },
      { name: "Faustino Asprilla", position: "Forward", note: "A dynamic forward capable of deciding matches with individual quality." },
      { name: "Freddy Rincón", position: "Midfielder", note: "A powerful midfielder who arrives late in the box." },
      { name: "Adolfo Valencia", position: "Forward", note: "An experienced forward option across the front line." }
    ],
    roster: roster(
      ["Óscar Córdoba", "Miguel Calero", "Faryd Mondragón"],
      ["Iván Córdoba", "Ever Palacios", "José Santa", "Jorge Bermúdez", "Wílmer Cabrera", "Luis Antonio Moreno"],
      ["Mauricio Serna", "Harold Lozano", "Carlos Valderrama", "Jorge Bolaño", "Andrés Estrada", "John Wilmar Pérez", "Freddy Rincón"],
      ["Antony de Ávila", "Adolfo Valencia", "Faustino Asprilla", "Víctor Aristizábal", "Hámilton Ricard", "Léider Preciado"],
    ),
    sources,
  },
  {
    tournamentId: "france-1998",
    teamId: "england",
    title: "England at France ’98",
    introduction:
      "England return after missing USA ’94, carrying Glenn Hoddle’s tactical ideas and Alan Shearer as the attacking reference.",
    beforeTheTournament: {
      stateOfTeam:
        "A young midfield featuring David Beckham sits behind an experienced forward line seeking to restore England to the knockout stage.",
      expectations:
        "A deep run is expected by a public that treats qualification as the start, not the achievement.",
      majorStorylines:
        "How Hoddle’s methods fit a squad mixing youth and experience is the dominant English debate.",
    },
    qualification: {
      method: "UEFA Group 2 winners",
      summary: "England topped UEFA Group 2 to qualify for a first World Cup since 1990.",
    },
    history: {
      worldCupAppearances: 10,
      previousAppearance: "1990",
      bestFinishEntering: "Winners (1966)",
      summary:
        "England missed 1994 after finishing fourth in 1990; France ’98 is their return under Hoddle.",
    },
    confederation: "UEFA",
    fifaRanking: 5,
    manager: "Glenn Hoddle",
    captain: "Alan Shearer",
    tacticalIdentity: "Balanced and direct",
    style:
      "Structured possession into wide areas, with Shearer the focal point in the box.",
    tournamentOutlook: {
      label: "Established contender",
      summary:
        "A top-five ranking and strong qualifying form leave England among the sides expected to be present beyond the opening week.",
    },
    keyPlayers: [
      { name: "Alan Shearer", position: "Forward", note: "The captain and established centre-forward of the side." },
      { name: "David Beckham", position: "Midfielder", note: "A young wide midfielder already known for delivery and work rate." },
      { name: "Paul Ince", position: "Midfielder", note: "A combative midfielder trusted to protect the defence." },
      { name: "Tony Adams", position: "Defender", note: "An experienced centre-back and organisational presence." }
    ],
    roster: roster(
      ["David Seaman", "Nigel Martyn", "Tim Flowers"],
      ["Sol Campbell", "Graeme Le Saux", "Tony Adams", "Gareth Southgate", "Gary Neville", "Martin Keown", "Rio Ferdinand"],
      ["Paul Ince", "David Beckham", "David Batty", "Steve McManaman", "Darren Anderton", "Paul Merson", "Paul Scholes", "Rob Lee"],
      ["Alan Shearer", "Teddy Sheringham", "Les Ferdinand", "Michael Owen"],
    ),
    sources,
  },
  {
    tournamentId: "france-1998",
    teamId: "iran",
    title: "Iran at France ’98",
    introduction:
      "Iran return for a first World Cup since 1978 after a dramatic play-off win over Australia, led by Ali Daei’s presence in attack.",
    beforeTheTournament: {
      stateOfTeam:
        "Jalal Talebi takes a side energised by late qualification and a clear aerial threat.",
      expectations:
        "A competitive debut return would already mark success after twenty years away.",
      majorStorylines:
        "Whether Iran can convert play-off belief into group-stage competitiveness is the open question.",
    },
    qualification: {
      method: "AFC/OFC play-off winners",
      summary: "Iran defeated Australia in a two-legged intercontinental play-off to book the final finals place.",
      notableAchievements: "Last team to qualify, sealing their berth in November 1997.",
    },
    history: {
      worldCupAppearances: 2,
      previousAppearance: "1978",
      bestFinishEntering: "Group stage",
      summary:
        "Iran’s only previous finals came in 1978; France ’98 ends a twenty-year absence.",
    },
    confederation: "AFC",
    fifaRanking: 42,
    manager: "Jalal Talebi",
    captain: "Ahmad Reza Abedzadeh",
    tacticalIdentity: "Compact and direct",
    style:
      "Organised defending and service into Daei, with midfield runners supporting transitions.",
    tournamentOutlook: {
      label: "Returning after long absence",
      summary:
        "Ranked outside the top forty, Iran’s first target is to stay competitive in every group fixture.",
    },
    keyPlayers: [
      { name: "Ali Daei", position: "Forward", note: "A dominant centre-forward and Iran’s primary goal threat." },
      { name: "Mehdi Mahdavikia", position: "Midfielder", note: "A dynamic wide midfielder capable of carrying the ball at pace." },
      { name: "Karim Bagheri", position: "Midfielder", note: "A powerful midfielder trusted from open play and set pieces." },
      { name: "Ahmad Reza Abedzadeh", position: "Goalkeeper", note: "The captain and established first-choice goalkeeper." }
    ],
    roster: roster(
      ["Ahmad Reza Abedzadeh", "Nima Nakisa", "Parviz Boroumand"],
      ["Naeim Saadavi", "Mohammad Khakpour", "Afshin Peyrovani", "Nader Mohammadkhani", "Ali Akbar Ostad-Asadi", "Reza Shahroudi", "Javad Zarincheh", "Mehdi Pashazadeh"],
      ["Mehdi Mahdavikia", "Karim Bagheri", "Alireza Mansourian", "Sirous Dinmohammadi", "Hamid Estili", "Sattar Hamedani", "Mehrdad Minavand"],
      ["Ali Daei", "Khodadad Azizi", "Ali Latifi", "Behnam Seraj"],
    ),
    sources,
  },
  {
    tournamentId: "france-1998",
    teamId: "jamaica",
    title: "Jamaica at France ’98",
    introduction:
      "Jamaica make a historic debut as the Reggae Boyz, carrying Caribbean pride and Renê Simões’ organisation into Group H.",
    beforeTheTournament: {
      stateOfTeam:
        "A largely overseas-based squad has been assembled around pace, spirit and a clear collective identity.",
      expectations:
        "A competitive debut and moments of belief would already mark a successful first finals.",
      majorStorylines:
        "Whether Jamaica can translate qualifying romance onto the World Cup stage dominates the narrative.",
    },
    qualification: {
      method: "CONCACAF qualifiers",
      summary: "Jamaica secured one of CONCACAF’s three finals places to reach a first World Cup.",
      notableAchievements: "Debutants alongside Japan, Croatia and South Africa in the 1998 finals field.",
    },
    history: {
      worldCupAppearances: 1,
      previousAppearance: "Debut",
      bestFinishEntering: "Debutants",
      summary:
        "France ’98 is Jamaica’s first World Cup finals after a breakthrough CONCACAF qualifying campaign.",
    },
    confederation: "CONCACAF",
    fifaRanking: 30,
    manager: "Renê Simões",
    captain: "Warren Barrett",
    tacticalIdentity: "Energetic and direct",
    style:
      "High work rate, wide pace and set-piece threat rather than sustained possession.",
    tournamentOutlook: {
      label: "Debutants with belief",
      summary:
        "Ranked thirtieth, Jamaica’s opening aim is to compete physically and stay organised against stronger technical sides.",
    },
    keyPlayers: [
      { name: "Warren Barrett", position: "Goalkeeper", note: "The captain and established first-choice goalkeeper." },
      { name: "Theodore Whitmore", position: "Midfielder", note: "A creative midfielder capable of linking play between the lines." },
      { name: "Deon Burton", position: "Forward", note: "A forward option trusted to stretch defences." },
      { name: "Robbie Earle", position: "Midfielder", note: "An experienced midfielder bringing Premier League know-how." }
    ],
    roster: roster(
      ["Warren Barrett", "Aaron Lawrence", "Donovan Ricketts"],
      ["Stephen Malcolm", "Linval Dixon", "Ian Goodison", "Dean Sewell", "Ricardo Gardner", "Frank Sinclair", "Durrant Brown"],
      ["Chris Dawes", "Fitzroy Simpson", "Peter Cargill", "Theodore Whitmore", "Robbie Earle", "Darryl Powell"],
      ["Marcus Gayle", "Andy Williams", "Walter Boyd", "Onandi Lowe", "Deon Burton", "Paul Hall"],
    ),
    sources,
  },
  {
    tournamentId: "france-1998",
    teamId: "japan",
    title: "Japan at France ’98",
    introduction:
      "Japan make their World Cup debut after years of investment in the J.League generation, led by Takeshi Okada.",
    beforeTheTournament: {
      stateOfTeam:
        "A technically tidy squad built around Masami Ihara seeks to announce Asian football’s rising competitiveness.",
      expectations:
        "A competitive debut is the immediate target; belief already runs ahead of ranking alone.",
      majorStorylines:
        "Whether Japan’s possession habits can survive World Cup intensity is the central question.",
    },
    qualification: {
      method: "AFC final round qualifiers",
      summary: "Japan secured one of Asia’s finals places through the AFC qualifying path.",
      notableAchievements: "Debutants after a dramatic late qualifying surge.",
    },
    history: {
      worldCupAppearances: 1,
      previousAppearance: "Debut",
      bestFinishEntering: "Debutants",
      summary:
        "France ’98 is Japan’s first World Cup finals following the professionalisation of the domestic game.",
    },
    confederation: "AFC",
    fifaRanking: 12,
    manager: "Takeshi Okada",
    captain: "Masami Ihara",
    tacticalIdentity: "Technical and organised",
    style:
      "Patient build-up, quick combinations and disciplined defensive shape.",
    tournamentOutlook: {
      label: "Debutants with belief",
      summary:
        "A top-fifteen ranking makes Japan one of the more carefully watched debutants in the field.",
    },
    keyPlayers: [
      { name: "Hidetoshi Nakata", position: "Midfielder", note: "A creative midfielder already marked as the face of Japan’s new generation." },
      { name: "Masami Ihara", position: "Defender", note: "The captain and defensive organiser of the side." },
      { name: "Masashi Nakayama", position: "Forward", note: "A centre-forward trusted as Japan’s finishing reference." },
      { name: "Yoshikatsu Kawaguchi", position: "Goalkeeper", note: "A young goalkeeper established as a national-team option." }
    ],
    roster: roster(
      ["Nobuyuki Kojima", "Yoshikatsu Kawaguchi", "Seigō Narazaki"],
      ["Akira Narahashi", "Naoki Sōma", "Masami Ihara", "Norio Omura", "Toshihide Saitō", "Yutaka Akita", "Eisuke Nakanishi"],
      ["Motohiro Yamaguchi", "Teruyoshi Itō", "Hidetoshi Nakata", "Hiroshi Nanami", "Shinji Ono", "Toshihiro Hattori", "Hiroaki Morishima", "Takashi Hirano"],
      ["Masashi Nakayama", "Wagner Lopes", "Masayuki Okano", "Shōji Jō"],
    ),
    sources,
  },
  {
    tournamentId: "france-1998",
    teamId: "mexico",
    title: "Mexico at France ’98",
    introduction:
      "Mexico arrive among the highest-ranked sides in the draw, carrying CONCACAF authority and Manuel Lapuente’s attacking intent.",
    beforeTheTournament: {
      stateOfTeam:
        "A confident squad mixes domestic stars with European experience and Cuauhtémoc Blanco’s invention.",
      expectations:
        "A place beyond the group is widely treated as the minimum standard.",
      majorStorylines:
        "Whether Mexico can convert ranking and flair into knockout progress frames the build-up.",
    },
    qualification: {
      method: "CONCACAF qualifiers",
      summary: "Mexico secured qualification through the CONCACAF final round.",
    },
    history: {
      worldCupAppearances: 11,
      previousAppearance: "1994",
      bestFinishEntering: "Quarter-finals (1970, 1986)",
      summary:
        "Mexico have been regular finalists and enter France ’98 with one of their strongest pre-tournament rankings.",
    },
    confederation: "CONCACAF",
    fifaRanking: 4,
    manager: "Manuel Lapuente",
    captain: "Alberto García Aspe",
    tacticalIdentity: "Attacking and inventive",
    style:
      "Quick combinations, wide creativity and aggressive pressing in advanced areas.",
    tournamentOutlook: {
      label: "Established contender",
      summary:
        "A top-five ranking leaves Mexico among the sides expected to be present beyond the opening week.",
    },
    keyPlayers: [
      { name: "Cuauhtémoc Blanco", position: "Forward", note: "An inventive attacker capable of creating chances in tight spaces." },
      { name: "Alberto García Aspe", position: "Midfielder", note: "The captain and midfield organiser." },
      { name: "Luis Hernández", position: "Forward", note: "A pacey forward threat in behind opposing defences." },
      { name: "Jorge Campos", position: "Goalkeeper", note: "An unorthodox goalkeeper still central to Mexico’s identity." }
    ],
    roster: roster(
      ["Jorge Campos", "Oswaldo Sánchez", "Óscar Pérez"],
      ["Claudio Suárez", "Joel Sánchez", "Duilio Davino", "Isaac Terrazas", "Salvador Carmona"],
      ["Germán Villa", "Marcelino Bernal", "Ramón Ramírez", "Alberto García Aspe", "Pável Pardo", "Raúl Lara", "Braulio Luna", "Jaime Ordiales", "Jesús Arellano"],
      ["Ricardo Peláez", "Luis García", "Cuauhtémoc Blanco", "Luis Hernández", "Francisco Palencia"],
    ),
    sources,
  },
  {
    tournamentId: "france-1998",
    teamId: "morocco",
    title: "Morocco at France ’98",
    introduction:
      "Morocco arrive with Henri Michel’s organisation and one of Africa’s more balanced squads, led by Noureddine Naybet.",
    beforeTheTournament: {
      stateOfTeam:
        "A disciplined defensive structure supports creative outlets such as Mustapha Hadji.",
      expectations:
        "A place in the second round is a realistic aim in a demanding group.",
      majorStorylines:
        "Whether Morocco can turn defensive control into enough goals is the recurring question.",
    },
    qualification: {
      method: "CAF finalists",
      summary: "Morocco secured one of Africa’s five finals places through the CAF qualifying path.",
    },
    history: {
      worldCupAppearances: 4,
      previousAppearance: "1994",
      bestFinishEntering: "Round of 16 (1986)",
      summary:
        "Morocco have been regular African qualifiers since the 1980s and enter France ’98 with rising belief.",
    },
    confederation: "CAF",
    fifaRanking: 13,
    manager: "Henri Michel",
    captain: "Noureddine Naybet",
    tacticalIdentity: "Compact and balanced",
    style:
      "Organised defending, quick wide transitions and technical midfield combinations.",
    tournamentOutlook: {
      label: "Expected to reach the second round",
      summary:
        "A top-fifteen ranking leaves Morocco among the African sides expected to compete for a knockout place.",
    },
    keyPlayers: [
      { name: "Mustapha Hadji", position: "Midfielder", note: "A creative midfielder capable of unlocking compact defences." },
      { name: "Noureddine Naybet", position: "Defender", note: "The captain and commanding presence in central defence." },
      { name: "Salaheddine Bassir", position: "Forward", note: "A forward option trusted to finish transitions." },
      { name: "Abdeljalil Hadda", position: "Forward", note: "A complementary attacker with movement across the front line." }
    ],
    roster: roster(
      ["Abdelkader El Brazi", "Driss Benzekri", "Mustapha Chadili"],
      ["Abdelilah Saber", "Abdelkrim El Hadrioui", "Youssef Rossi", "Smahi Triki", "Noureddine Naybet", "Rachid Neqrouz", "Lahcen Abrami", "Jamal Sellami", "Tahar El Khalej"],
      ["Mustapha Hadji", "Saïd Chiba", "Ali Elkhattabi", "Rachid Azzouzi", "Gharib Amzine", "Youssef Chippo"],
      ["Abdeljalil Hadda", "Abderrahim Ouakili", "Salaheddine Bassir", "Rachid Rokki"],
    ),
    sources,
  },
  {
    tournamentId: "france-1998",
    teamId: "nigeria",
    title: "Nigeria at France ’98",
    introduction:
      "Nigeria return under Bora Milutinović with pace, invention and the Olympic generation now hardened by senior experience.",
    beforeTheTournament: {
      stateOfTeam:
        "A gifted midfield around Jay-Jay Okocha remains the side’s clearest route to unlocking opponents.",
      expectations:
        "Many observers again tip Nigeria among Africa’s strongest candidates to advance.",
      majorStorylines:
        "Whether Milutinović can harness individual brilliance into a settled tournament side frames the build-up.",
    },
    qualification: {
      method: "CAF finalists",
      summary: "Nigeria secured one of Africa’s five finals places through the CAF qualifying path.",
    },
    history: {
      worldCupAppearances: 2,
      previousAppearance: "1994",
      bestFinishEntering: "Round of 16 (1994)",
      summary:
        "Nigeria’s debut in 1994 announced a major African force; France ’98 is the attempt to go further.",
    },
    confederation: "CAF",
    fifaRanking: 74,
    manager: "Bora Milutinović",
    captain: "Uche Okechukwu",
    tacticalIdentity: "Fast and expressive",
    style:
      "Vertical attacking play, wide pace and inventive midfield dribbling.",
    tournamentOutlook: {
      label: "Dark horse",
      summary:
        "Despite a modest ranking, Nigeria’s talent level keeps them among the most watched African sides in the field.",
    },
    keyPlayers: [
      { name: "Jay-Jay Okocha", position: "Midfielder", note: "A dazzling dribbler capable of creating chances from nothing." },
      { name: "Nwankwo Kanu", position: "Forward", note: "A technically gifted forward with European club pedigree." },
      { name: "Finidi George", position: "Midfielder", note: "A wide midfielder whose delivery stretched opposing full-backs." },
      { name: "Uche Okechukwu", position: "Defender", note: "The captain and defensive organiser of the side." }
    ],
    roster: roster(
      ["Peter Rufai", "Willy Okpara", "Abiodun Baruwa"],
      ["Mobi Oparaku", "Celestine Babayaro", "Uche Okechukwu", "Taribo West", "Uche Okafor", "Augustine Eguavoen", "Benedict Iroha", "Godwin Okpara"],
      ["Finidi George", "Mutiu Adepoju", "Jay-Jay Okocha", "Garba Lawal", "Tijani Babangida", "Sunday Oliseh", "Wilson Oruma"],
      ["Nwankwo Kanu", "Rashidi Yekini", "Daniel Amokachi", "Victor Ikpeba"],
    ),
    sources,
  },
  {
    tournamentId: "france-1998",
    teamId: "norway",
    title: "Norway at France ’98",
    introduction:
      "Norway return with Egil Olsen’s unmistakable method and a top-ten ranking that demands respect.",
    beforeTheTournament: {
      stateOfTeam:
        "A physically imposing, well-drilled squad remains built on second balls, set pieces and relentless organisation.",
      expectations:
        "A place in the second round is again treated as a realistic opening target.",
      majorStorylines:
        "Whether Norway’s direct style can still unsettle more technical opponents is the tactical debate around them.",
    },
    qualification: {
      method: "UEFA Group 3 runners-up",
      summary: "Norway finished second in UEFA Group 3 to qualify for a second consecutive World Cup.",
    },
    history: {
      worldCupAppearances: 3,
      previousAppearance: "1994",
      bestFinishEntering: "Round of 16 (1938, 1994)",
      summary:
        "Norway’s return in 1994 ended a long absence; France ’98 is their second consecutive finals under Olsen.",
    },
    confederation: "UEFA",
    fifaRanking: 7,
    manager: "Egil Olsen",
    captain: "Frode Grodås",
    tacticalIdentity: "Direct and physical",
    style:
      "Long diagonals, aggressive pressing on the second ball and aerial threat from set pieces.",
    tournamentOutlook: {
      label: "Dark horse",
      summary:
        "A top-ten ranking and a distinctive method make Norway one of the more intriguing European sides in the field.",
    },
    keyPlayers: [
      { name: "Tore André Flo", position: "Forward", note: "A target forward central to Norway’s direct attacking plan." },
      { name: "Øyvind Leonhardsen", position: "Midfielder", note: "An energetic midfielder trusted to win second balls." },
      { name: "Frode Grodås", position: "Goalkeeper", note: "The captain and established first-choice goalkeeper." },
      { name: "Henning Berg", position: "Defender", note: "An experienced defender organised within Olsen’s system." }
    ],
    roster: roster(
      ["Frode Grodås", "Thomas Myhre", "Espen Baardsen"],
      ["Gunnar Halle", "Ronny Johnsen", "Henning Berg", "Stig Inge Bjørnebye", "Vegard Heggem", "Dan Eggen", "Erik Hoftun", "Vidar Riseth"],
      ["Ståle Solbakken", "Erik Mykland", "Øyvind Leonhardsen", "Kjetil Rekdal", "Mini Jakobsen", "Roar Strand"],
      ["Tore André Flo", "Jostein Flo", "Håvard Flo", "Egil Østenstad", "Ole Gunnar Solskjær"],
    ),
    sources,
  },
  {
    tournamentId: "france-1998",
    teamId: "paraguay",
    title: "Paraguay at France ’98",
    introduction:
      "Paraguay return after missing USA ’94, organised around José Luis Chilavert’s unique presence as a goalkeeping captain and free-kick threat.",
    beforeTheTournament: {
      stateOfTeam:
        "Paulo César Carpegiani has built a compact, competitive CONMEBOL side with clear defensive identity.",
      expectations:
        "A place in the second round would mark a successful return to the finals.",
      majorStorylines:
        "Whether Chilavert’s personality and set-piece threat can lift a disciplined unit is the defining storyline.",
    },
    qualification: {
      method: "CONMEBOL qualifiers",
      summary: "Paraguay secured qualification through the CONMEBOL round-robin to reach a first finals since 1986.",
    },
    history: {
      worldCupAppearances: 5,
      previousAppearance: "1986",
      bestFinishEntering: "Round of 16 (1986)",
      summary:
        "Paraguay return in 1998 after missing 1990 and 1994, seeking to rebuild their finals presence.",
    },
    confederation: "CONMEBOL",
    fifaRanking: 29,
    manager: "Paulo César Carpegiani",
    captain: "José Luis Chilavert",
    tacticalIdentity: "Compact and resilient",
    style:
      "Deep defending, rapid counters and set-piece threat, including from the goalkeeper.",
    tournamentOutlook: {
      label: "Dark horse",
      summary:
        "Paraguay’s organisation and Chilavert’s presence make them a difficult group opponent.",
    },
    keyPlayers: [
      { name: "José Luis Chilavert", position: "Goalkeeper", note: "The captain, shot-stopper and set-piece specialist." },
      { name: "José Cardozo", position: "Forward", note: "A centre-forward trusted as Paraguay’s primary finishing reference." },
      { name: "Carlos Gamarra", position: "Defender", note: "A commanding centre-back central to the defensive structure." },
      { name: "Roberto Acuña", position: "Midfielder", note: "A midfield runner capable of linking defence and attack." }
    ],
    roster: roster(
      ["José Luis Chilavert", "Danilo Aceval", "Rubén Ruiz Díaz"],
      ["Francisco Arce", "Catalino Rivarola", "Carlos Gamarra", "Celso Ayala", "Edgar Aguilera", "Pedro Sarabia", "Ricardo Rojas", "Denis Caniza"],
      ["Julio César Yegros", "Roberto Acuña", "Carlos Paredes", "Julio César Enciso", "Carlos Morales", "Jorge Luis Campos"],
      ["Arístides Rojas", "José Cardozo", "Miguel Ángel Benítez", "Hugo Brizuela", "César Ramírez"],
    ),
    sources,
  },
  {
    tournamentId: "france-1998",
    teamId: "romania",
    title: "Romania at France ’98",
    introduction:
      "Romania return with Gheorghe Hagi still the creative heartbeat and Anghel Iordănescu again in charge.",
    beforeTheTournament: {
      stateOfTeam:
        "A familiar generation seeks to extend the progress that made Romania one of USA ’94’s most watched European sides.",
      expectations:
        "A place beyond the group is the clear ambition.",
      majorStorylines:
        "Whether Hagi can still decide matches at this stage of his career dominates the Romanian conversation.",
    },
    qualification: {
      method: "UEFA Group 8 winners",
      summary: "Romania topped UEFA Group 8 to qualify for a third consecutive World Cup.",
    },
    history: {
      worldCupAppearances: 7,
      previousAppearance: "1994",
      bestFinishEntering: "Quarter-finals (1994)",
      summary:
        "Romania’s quarter-final run in 1994 raised expectation; France ’98 is the attempt to sustain that level.",
    },
    confederation: "UEFA",
    fifaRanking: 22,
    manager: "Anghel Iordănescu",
    captain: "Gheorghe Hagi",
    tacticalIdentity: "Technical and inventive",
    style:
      "Possession through Hagi and Popescu, with runners arriving from midfield.",
    tournamentOutlook: {
      label: "Expected to reach the second round",
      summary:
        "Romania’s recent pedigree and ranking leave them among the European sides expected to compete for a knockout place.",
    },
    keyPlayers: [
      { name: "Gheorghe Hagi", position: "Midfielder", note: "The captain and creative reference of the Romanian side." },
      { name: "Gheorghe Popescu", position: "Defender", note: "A composed defender and midfield screen with elite club experience." },
      { name: "Adrian Ilie", position: "Forward", note: "A mobile forward capable of finishing and creating." },
      { name: "Dorinel Munteanu", position: "Midfielder", note: "An energetic midfielder trusted to cover ground and support attacks." }
    ],
    roster: roster(
      ["Dumitru Stângaciu", "Bogdan Stelea", "Florin Prunea"],
      ["Dan Petrescu", "Cristian Dulca", "Anton Doboș", "Gheorghe Popescu", "Liviu Ciobotariu", "Tibor Selymes"],
      ["Constantin Gâlcă", "Dorinel Munteanu", "Gheorghe Hagi", "Lucian Marinescu", "Gabriel Popescu", "Iulian Filipescu", "Ovidiu Stîngă"],
      ["Marius Lăcătuș", "Viorel Moldovan", "Adrian Ilie", "Radu Niculescu", "Ilie Dumitrescu", "Gheorghe Craioveanu"],
    ),
    sources,
  },
  {
    tournamentId: "france-1998",
    teamId: "saudi-arabia",
    title: "Saudi Arabia at France ’98",
    introduction:
      "Saudi Arabia return under Carlos Alberto Parreira seeking to build on their debut progress from USA ’94.",
    beforeTheTournament: {
      stateOfTeam:
        "A more experienced Asian side retains technical midfield quality and clearer tournament know-how.",
      expectations:
        "A competitive group campaign is the opening measure for Asia’s most consistent recent qualifiers.",
      majorStorylines:
        "Whether Parreira’s methods can lift Saudi Arabia beyond debutant status frames the build-up.",
    },
    qualification: {
      method: "AFC final round qualifiers",
      summary: "Saudi Arabia secured one of Asia’s finals places through the AFC qualifying path.",
    },
    history: {
      worldCupAppearances: 2,
      previousAppearance: "1994",
      bestFinishEntering: "Round of 16 (1994)",
      summary:
        "Saudi Arabia reached the second round on debut in 1994 and return seeking continuity.",
    },
    confederation: "AFC",
    fifaRanking: 34,
    manager: "Carlos Alberto Parreira",
    captain: "Yousuf Al-Thunayan",
    tacticalIdentity: "Organised and energetic",
    style:
      "Compact defending, quick wide transitions and technical midfield combinations.",
    tournamentOutlook: {
      label: "Expected to reach the second round",
      summary:
        "Saudi Arabia’s recent finals experience makes a competitive group campaign the standard.",
    },
    keyPlayers: [
      { name: "Sami Al-Jaber", position: "Forward", note: "An established forward and finishing reference." },
      { name: "Saeed Al-Owairan", position: "Forward", note: "A powerful attacker capable of carrying the ball over long distances." },
      { name: "Yousuf Al-Thunayan", position: "Midfielder", note: "The captain and experienced midfield leader." },
      { name: "Mohamed Al-Deayea", position: "Goalkeeper", note: "The established first-choice goalkeeper of the programme." }
    ],
    roster: roster(
      ["Mohamed Al-Deayea", "Hussein Al-Sadiq", "Tisir Al-Antaif"],
      ["Mohammed Sheliah", "Mohammed Al-Khilaiwi", "Ahmed Jamil", "Hussein Abdulghani", "Ahmed Al-Dokhi", "Abdulaziz Al-Janoubi"],
      ["Abdullah Sulaiman Zubromawi", "Fuad Anwar", "Ibrahim Suwayed", "Ibrahim Mater", "Khaled Massad", "Yousuf Al-Thunayan", "Khamis Al-Owairan", "Nawaf Al-Temyat", "Hamzah Saleh"],
      ["Obeid Al-Dosari", "Sami Al-Jaber", "Saeed Al-Owairan", "Fahd Al-Mehallel"],
    ),
    sources,
  },
  {
    tournamentId: "france-1998",
    teamId: "scotland",
    title: "Scotland at France ’98",
    introduction:
      "Scotland return after missing USA ’94, carrying Craig Brown’s organisation and a familiar blend of domestic and Premier League experience.",
    beforeTheTournament: {
      stateOfTeam:
        "A hard-working squad built around Colin Hendry seeks to make a difficult opening group competitive.",
      expectations:
        "Points from the group would already mark a successful return against elite opposition.",
      majorStorylines:
        "Whether Scotland can stay organised against stronger technical sides is the central pre-tournament question.",
    },
    qualification: {
      method: "UEFA Group 4 runners-up",
      summary: "Scotland finished second in UEFA Group 4 behind Austria to qualify.",
    },
    history: {
      worldCupAppearances: 8,
      previousAppearance: "1990",
      bestFinishEntering: "Group stage",
      summary:
        "Scotland have a long finals history without a knockout appearance and return in 1998 after missing 1994.",
    },
    confederation: "UEFA",
    fifaRanking: 41,
    manager: "Craig Brown",
    captain: "Colin Hendry",
    tacticalIdentity: "Organised and industrious",
    style:
      "Compact defending, set-piece threat and direct distribution into the forward line.",
    tournamentOutlook: {
      label: "Expected to reach the second round",
      summary:
        "Scotland’s ranking sits outside the favourites, but their collective discipline makes every group fixture competitive.",
    },
    keyPlayers: [
      { name: "Colin Hendry", position: "Defender", note: "The captain and defensive organiser of the side." },
      { name: "John Collins", position: "Midfielder", note: "A composed midfielder trusted to keep possession under pressure." },
      { name: "Kevin Gallacher", position: "Forward", note: "A forward option with pace in behind." },
      { name: "Jim Leighton", position: "Goalkeeper", note: "An experienced international goalkeeper." }
    ],
    roster: roster(
      ["Jim Leighton", "Neil Sullivan", "Jonathan Gould"],
      ["Tom Boyd", "Colin Calderwood", "Colin Hendry", "Tosh McKinlay", "David Weir", "Matt Elliott", "Derek Whyte", "Christian Dailly"],
      ["Jackie McNamara", "Craig Burley", "John Collins", "Paul Lambert", "Scot Gemmill", "Billy McKinlay"],
      ["Kevin Gallacher", "Gordon Durie", "Darren Jackson", "Simon Donnelly", "Scott Booth"],
    ),
    sources,
  },
  {
    tournamentId: "france-1998",
    teamId: "south-africa",
    title: "South Africa at France ’98",
    introduction:
      "South Africa make their World Cup debut as a democratic footballing nation, led by Lucas Radebe and coached by Philippe Troussier.",
    beforeTheTournament: {
      stateOfTeam:
        "Bafana Bafana arrive with continental belief after African success and a squad mixing domestic and European experience.",
      expectations:
        "A competitive debut would mark a symbolic and sporting success for a first-time finalist.",
      majorStorylines:
        "Whether South Africa can convert African championship belief onto the World Cup stage frames the narrative.",
    },
    qualification: {
      method: "CAF finalists",
      summary: "South Africa secured one of Africa’s five finals places through the CAF qualifying path.",
      notableAchievements: "Debutants after winning the 1996 Africa Cup of Nations on home soil.",
    },
    history: {
      worldCupAppearances: 1,
      previousAppearance: "Debut",
      bestFinishEntering: "Debutants",
      summary:
        "France ’98 is South Africa’s first World Cup finals after readmission to international football in the early 1990s.",
    },
    confederation: "CAF",
    fifaRanking: 24,
    manager: "Philippe Troussier",
    captain: "Lucas Radebe",
    tacticalIdentity: "Energetic and expressive",
    style:
      "High work rate, wide combinations and set-piece threat through an athletic midfield.",
    tournamentOutlook: {
      label: "Debutants with belief",
      summary:
        "A mid-twenties ranking and continental pedigree leave South Africa among the more watched debutants.",
    },
    keyPlayers: [
      { name: "Lucas Radebe", position: "Defender", note: "The captain and defensive leader of the side." },
      { name: "Phil Masinga", position: "Forward", note: "A centre-forward trusted as a primary goal threat." },
      { name: "John Moshoeu", position: "Midfielder", note: "A creative midfielder capable of linking play." },
      { name: "Quinton Fortune", position: "Midfielder", note: "A versatile midfielder with energy in both directions." }
    ],
    roster: roster(
      ["Hans Vonk", "Brian Baloyi", "Paul Evans*", "Simon Gopane*"],
      ["Themba Mnguni", "David Nyathi", "Willem Jackson", "Mark Fish", "Lucas Radebe", "Pierre Issa"],
      ["Quinton Fortune", "Alfred Phiri", "John Moshoeu", "Helman Mkhalele", "Doctor Khumalo", "Lebogang Morula", "William Mokoena"],
      ["Phil Masinga", "Shaun Bartlett", "Brendan Augustine", "Delron Buckley", "Jerry Sikhosana", "Benni McCarthy"],
    ),
    sources,
  },
  {
    tournamentId: "france-1998",
    teamId: "south-korea",
    title: "South Korea at France ’98",
    introduction:
      "South Korea return under Cha Bum-kun seeking a first knockout appearance after successive group-stage campaigns.",
    beforeTheTournament: {
      stateOfTeam:
        "An industrious squad built on domestic familiarity arrives with clear organisation and improving technical standards.",
      expectations:
        "A first move beyond the group remains the long-term measure of progress.",
      majorStorylines:
        "Whether Cha’s authority can lift a hard-working side past familiar limitations is the central question.",
    },
    qualification: {
      method: "AFC final round qualifiers",
      summary: "South Korea secured one of Asia’s finals places through the AFC qualifying path.",
    },
    history: {
      worldCupAppearances: 5,
      previousAppearance: "1994",
      bestFinishEntering: "Group stage",
      summary:
        "South Korea have appeared in every World Cup since 1986 and still seek a first knockout place.",
    },
    confederation: "AFC",
    fifaRanking: 20,
    manager: "Cha Bum-kun",
    captain: "Choi Young-il",
    tacticalIdentity: "Industrious and compact",
    style:
      "High work rate, disciplined shape and quick counters through wide runners.",
    tournamentOutlook: {
      label: "Expected to reach the second round",
      summary:
        "South Korea’s ranking and experience make a competitive group campaign the standard.",
    },
    keyPlayers: [
      { name: "Choi Yong-soo", position: "Forward", note: "A centre-forward trusted as a finishing reference." },
      { name: "Yoo Sang-chul", position: "Midfielder", note: "An energetic midfielder capable of arriving late in the box." },
      { name: "Choi Young-il", position: "Defender", note: "The captain and defensive organiser." },
      { name: "Kim Byung-ji", position: "Goalkeeper", note: "An established goalkeeper option for the national side." }
    ],
    roster: roster(
      ["Kim Byung-ji", "Seo Dong-myung"],
      ["Lee Lim-saeng", "Choi Young-il", "Lee Min-sung", "Lee Sang-hun", "Kim Tae-young", "Jang Hyung-seok", "Jang Dae-il", "Hong Myung-bo"],
      ["Choi Sung-yong", "Yoo Sang-chul", "Kim Do-keun", "Noh Jung-yoon", "Ko Jong-soo", "Lee Sang-yoon", "Ha Seok-ju"],
      ["Kim Do-hoon", "Choi Yong-soo", "Seo Jung-won", "Hwang Sun-hong", "Lee Dong-gook"],
    ),
    sources,
  },
  {
    tournamentId: "france-1998",
    teamId: "spain",
    title: "Spain at France ’98",
    introduction:
      "Spain arrive with club pedigree and Javier Clemente’s organisation, again seeking a tournament that matches domestic reputation.",
    beforeTheTournament: {
      stateOfTeam:
        "A technically gifted squad remains built on La Liga quality and Andoni Zubizarreta’s vast experience.",
      expectations:
        "A deep run is expected; an early exit would renew familiar scrutiny.",
      majorStorylines:
        "Whether Spain can convert control into knockout authority remains the open question entering France.",
    },
    qualification: {
      method: "UEFA Group 6 winners",
      summary: "Spain topped UEFA Group 6 to qualify for another World Cup finals.",
    },
    history: {
      worldCupAppearances: 10,
      previousAppearance: "1994",
      bestFinishEntering: "Fourth place (1950)",
      summary:
        "Spain have often arrived with talent and club pedigree but still seek a modern tournament that matches that reputation.",
    },
    confederation: "UEFA",
    fifaRanking: 15,
    manager: "Javier Clemente",
    captain: "Andoni Zubizarreta",
    tacticalIdentity: "Technical control",
    style:
      "Compact organisation, composed possession and varied attacking options through midfield runners.",
    tournamentOutlook: {
      label: "Established contender",
      summary:
        "Spain’s ranking and squad depth leave them among the sides expected to be present beyond the opening week.",
    },
    keyPlayers: [
      { name: "Andoni Zubizarreta", position: "Goalkeeper", note: "The captain brought enormous experience and calm to the defensive unit." },
      { name: "Raúl", position: "Forward", note: "A young forward already established as a Real Madrid and Spain reference." },
      { name: "Fernando Hierro", position: "Midfielder", note: "A commanding presence capable of playing in defence or midfield." },
      { name: "Luis Enrique", position: "Midfielder", note: "An energetic midfielder trusted to arrive in advanced areas." }
    ],
    roster: roster(
      ["Andoni Zubizarreta", "Santiago Cañizares", "José Molina"],
      ["Albert Ferrer", "Agustín Aranzábal", "Rafael Alkorta", "Abelardo", "Sergi", "Iván Campo", "Carlos Aguilera", "Miguel Ángel Nadal"],
      ["Fernando Hierro", "Julen Guerrero", "Albert Celades", "Joseba Etxeberria", "Guillermo Amor", "Luis Enrique"],
      ["Fernando Morientes", "Juan Antonio Pizzi", "Raúl", "Alfonso", "Kiko"],
    ),
    sources,
  },
  {
    tournamentId: "france-1998",
    teamId: "tunisia",
    title: "Tunisia at France ’98",
    introduction:
      "Tunisia arrive under Henryk Kasperczak seeking to make Africa’s expanded finals allocation count.",
    beforeTheTournament: {
      stateOfTeam:
        "A compact, well-drilled side looks to Sami Trabelsi’s leadership and midfield structure for control.",
      expectations:
        "A competitive group showing would mark a successful return to the finals.",
      majorStorylines:
        "Whether Tunisia can score enough goals to match their organisation is the central concern.",
    },
    qualification: {
      method: "CAF finalists",
      summary: "Tunisia secured one of Africa’s five finals places through the CAF qualifying path.",
    },
    history: {
      worldCupAppearances: 2,
      previousAppearance: "1978",
      bestFinishEntering: "Group stage",
      summary:
        "Tunisia’s only previous finals came in 1978; France ’98 is their return after twenty years.",
    },
    confederation: "CAF",
    fifaRanking: 21,
    manager: "Henryk Kasperczak",
    captain: "Sami Trabelsi",
    tacticalIdentity: "Compact and disciplined",
    style:
      "Low defensive block, patient midfield circulation and selective counters.",
    tournamentOutlook: {
      label: "Expected to reach the second round",
      summary:
        "Tunisia’s ranking inside the world’s top twenty-five makes a competitive group campaign a realistic aim.",
    },
    keyPlayers: [
      { name: "Sami Trabelsi", position: "Defender", note: "The captain and defensive organiser of the side." },
      { name: "Zoubeir Baya", position: "Midfielder", note: "A creative midfielder trusted to link play." },
      { name: "Adel Sellimi", position: "Forward", note: "A forward option capable of finishing transitions." },
      { name: "Chokri El Ouaer", position: "Goalkeeper", note: "The established first-choice goalkeeper entering the tournament." }
    ],
    roster: roster(
      ["Chokri El Ouaer", "Radhouane Salhi", "Ali Boumnijel"],
      ["Sami Trabelsi", "Mounir Boukadida", "Hatem Trabelsi", "Ferid Chouchane", "Tarek Thabet", "José Clayton", "Sabri Jaballah", "Khaled Badra"],
      ["Zoubeir Baya", "Kaies Ghodhbane", "Mourad Melki", "Riadh Bouazizi", "Sirajeddine Chihi", "Skander Souayah", "Faysal Ben Ahmed"],
      ["Imed Ben Younes", "Riadh Jelassi", "Adel Sellimi", "Mehdi Ben Slimane"],
    ),
    sources,
  },
  {
    tournamentId: "france-1998",
    teamId: "united-states",
    title: "United States at France ’98",
    introduction:
      "The United States return under Steve Sampson seeking to build on home progress from USA ’94 with a more experienced core.",
    beforeTheTournament: {
      stateOfTeam:
        "A settled group featuring Thomas Dooley and Eric Wynalda arrives with clearer tournament know-how than four years earlier.",
      expectations:
        "A place in the second round would confirm the programme’s continued rise.",
      majorStorylines:
        "Whether Sampson’s side can compete in a difficult European-heavy group frames the American conversation.",
    },
    qualification: {
      method: "CONCACAF qualifiers",
      summary: "The United States secured qualification through the CONCACAF final round.",
    },
    history: {
      worldCupAppearances: 6,
      previousAppearance: "1994",
      bestFinishEntering: "Third place (1930)",
      summary:
        "The United States returned to successive finals in 1990 and 1994; France ’98 is their third consecutive appearance.",
    },
    confederation: "CONCACAF",
    fifaRanking: 11,
    manager: "Steve Sampson",
    captain: "Thomas Dooley",
    tacticalIdentity: "Organised and direct",
    style:
      "Compact defending, energetic wide running and set-piece threat.",
    tournamentOutlook: {
      label: "Expected to reach the second round",
      summary:
        "A top-fifteen ranking and recent finals experience leave the United States among the sides expected to compete for a knockout place.",
    },
    keyPlayers: [
      { name: "Eric Wynalda", position: "Forward", note: "The side’s leading attacking reference and most reliable international finisher." },
      { name: "Thomas Dooley", position: "Midfielder", note: "The captain brought leadership and defensive balance." },
      { name: "Tab Ramos", position: "Midfielder", note: "A creative link player trusted between the lines." },
      { name: "Kasey Keller", position: "Goalkeeper", note: "An established goalkeeper with European club experience." }
    ],
    roster: roster(
      ["Brad Friedel", "Juergen Sommer", "Kasey Keller"],
      ["Frankie Hejduk", "Eddie Pope", "Mike Burns", "David Regis", "Jeff Agoos", "Marcelo Balboa", "Alexi Lalas"],
      ["Thomas Dooley", "Earnie Stewart", "Tab Ramos", "Cobi Jones", "Predrag Radosavljević", "Chad Deering", "Brian Maisonneuve", "Claudio Reyna"],
      ["Roy Wegerle", "Joe-Max Moore", "Eric Wynalda", "Brian McBride"],
    ),
    sources,
  },
  {
    tournamentId: "france-1998",
    teamId: "yugoslavia",
    title: "Yugoslavia at France ’98",
    introduction:
      "FR Yugoslavia return to the World Cup after missing USA ’94 under sanctions, carrying a gifted generation around Dragan Stojković.",
    beforeTheTournament: {
      stateOfTeam:
        "Slobodan Santrač leads a technically rich squad eager to reassert a historic footballing identity under a new name.",
      expectations:
        "A deep run is expected by a public that remembers Yugoslavia’s pedigree.",
      majorStorylines:
        "Whether the side can convert individual quality into collective tournament authority is the central debate.",
    },
    qualification: {
      method: "UEFA play-off winners",
      summary: "Yugoslavia won a UEFA qualifying play-off to return to the World Cup finals.",
      notableAchievements: "First finals appearance as FR Yugoslavia after missing 1994 due to international sanctions.",
    },
    history: {
      worldCupAppearances: 9,
      previousAppearance: "1990",
      bestFinishEntering: "Fourth place (1930, 1962)",
      summary:
        "Counting earlier Yugoslav sides, the programme has a deep finals history; France ’98 is the return after sanctions barred 1994.",
    },
    confederation: "UEFA",
    fifaRanking: 8,
    manager: "Slobodan Santrač",
    captain: "Dragan Stojković",
    tacticalIdentity: "Technical and inventive",
    style:
      "Possessive midfield combinations, intelligent movement and finishing through Mijatović and Milošević.",
    tournamentOutlook: {
      label: "Established contender",
      summary:
        "A top-ten ranking and exceptional technical quality leave Yugoslavia among the sides expected to contend deep into the knockout rounds.",
    },
    keyPlayers: [
      { name: "Dragan Stojković", position: "Midfielder", note: "The captain and creative reference of the side." },
      { name: "Predrag Mijatović", position: "Forward", note: "A refined forward capable of deciding matches in the box." },
      { name: "Savo Milošević", position: "Forward", note: "A centre-forward trusted as a primary goal threat." },
      { name: "Vladimir Jugović", position: "Midfielder", note: "A complete midfielder with elite European club experience." }
    ],
    roster: roster(
      ["Ivica Kralj", "Dragoje Leković"],
      ["Zoran Mirković", "Goran Đorović", "Miroslav Đukić", "Siniša Mihajlović", "Slobodan Komljenović", "Niša Saveljić", "Željko Petrović"],
      ["Slaviša Jokanović", "Branko Brnović", "Vladimir Jugović", "Dejan Savićević", "Dragan Stojković", "Ljubinko Drulović", "Dejan Govedarica", "Miroslav Stević", "Dejan Stanković"],
      ["Predrag Mijatović", "Savo Milošević", "Perica Ognjenović", "Darko Kovačević"],
    ),
    sources,
  },
];
