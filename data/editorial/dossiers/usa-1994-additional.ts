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

const sources = ["FIFA World Cup squad lists", "RSSSF", "FIFA/Coca-Cola World Ranking (June 1994)", "Wikipedia: 1994 FIFA World Cup squads"];

/** Additional participant Team Profiles beyond curated Team Journey nations. */
export const USA_1994_ADDITIONAL_DOSSIERS: TeamTournamentDossier[] = [
  {
    tournamentId: "usa-1994",
    teamId: "argentina",
    title: "Argentina at USA ’94",
    introduction:
      "Argentina arrive among the tournament’s elite, carrying club-hardened talent and the enduring presence of Diego Maradona into a demanding Group D.",
    beforeTheTournament: {
      stateOfTeam:
        "Alfio Basile has blended experienced internationals with a new generation around a still-central Maradona.",
      expectations:
        "Anything short of a deep run will be judged harshly for a side that reached the previous final.",
      majorStorylines:
        "Whether Maradona can still shape matches at this stage of his career, and how Basile balances attack with control, dominate the Argentine conversation.",
    },
    qualification: {
      method: "CONMEBOL qualifying winners",
      summary: "Argentina topped the CONMEBOL qualifying group to book another place among the finals’ traditional powers.",
      notableAchievements: "Finished ahead of Colombia and a strong South American field despite a heavy home defeat during qualifying.",
    },
    history: {
      worldCupAppearances: 11,
      previousAppearance: "1990",
      bestFinishEntering: "Winners (1978, 1986)",
      summary:
        "Two-time world champions and runners-up in 1990, Argentina remain a perpetual contender with successive finals appearances.",
    },
    confederation: "CONMEBOL",
    fifaRanking: 8,
    manager: "Alfio Basile",
    captain: "Diego Maradona",
    tacticalIdentity: "Creative and combative",
    style:
      "Technical midfield invention feeding quick combinations, with Maradona still the creative reference.",
    tournamentOutlook: {
      label: "Tournament favorite",
      summary:
        "Ranked among the world’s best and stocked with experienced attackers, Argentina enter among the sides expected to contend deep into the knockout rounds.",
    },
    keyPlayers: [
      { name: "Diego Maradona", position: "Midfielder", note: "The captain remains the programme’s defining creative presence entering the tournament." },
      { name: "Gabriel Batistuta", position: "Forward", note: "A ruthless centre-forward whose finishing made him Argentina’s primary goal threat." },
      { name: "Fernando Redondo", position: "Midfielder", note: "A composed holding midfielder trusted to organise play from deep." },
      { name: "Claudio Caniggia", position: "Forward", note: "A direct attacker whose pace stretched defences in transition." }
    ],
    roster: roster(
      ["Sergio Goycochea", "Luis Islas", "Norberto Scoponi"],
      ["Sergio Vázquez", "José Chamot", "Roberto Sensini", "Oscar Ruggeri", "Fernando Cáceres", "Jorge Borelli", "Hernán Díaz"],
      ["Fernando Redondo", "José Basualdo", "Diego Maradona", "Diego Simeone", "Ariel Ortega", "Hugo Pérez", "Leonardo Rodríguez", "Alejandro Mancuso"],
      ["Claudio Caniggia", "Gabriel Batistuta", "Ramón Medina Bello", "Abel Balbo"],
    ),
    sources,
  },
  {
    tournamentId: "usa-1994",
    teamId: "belgium",
    title: "Belgium at USA ’94",
    introduction:
      "Belgium return with a seasoned European squad under Paul Van Himst, seeking to convert steady qualifying form into a competitive group campaign.",
    beforeTheTournament: {
      stateOfTeam:
        "A settled defensive core around Michel Preud’homme gives Belgium a platform built on organisation rather than spectacle.",
      expectations:
        "Progress from the group would be considered a successful opening chapter for a side rarely tipped among the favourites.",
      majorStorylines:
        "Whether Belgium’s experienced core can still impose itself against stronger technical opponents is the central question.",
    },
    qualification: {
      method: "UEFA Group 4 runners-up",
      summary: "Belgium finished second in UEFA Group 4 behind Romania to secure qualification.",
    },
    history: {
      worldCupAppearances: 9,
      previousAppearance: "1990",
      bestFinishEntering: "Fourth place (1986)",
      summary:
        "Belgium have been regular World Cup participants since the 1980s, with a best finish of fourth in Mexico 1986.",
    },
    confederation: "UEFA",
    fifaRanking: 27,
    manager: "Paul Van Himst",
    captain: "Georges Grün",
    tacticalIdentity: "Organised and compact",
    style:
      "Disciplined defending, set-piece threat and selective transitions rather than sustained possession.",
    tournamentOutlook: {
      label: "Expected to reach the second round",
      summary:
        "Belgium’s experience and defensive reliability make a competitive group campaign a realistic opening target.",
    },
    keyPlayers: [
      { name: "Michel Preud'homme", position: "Goalkeeper", note: "An elite shot-stopper and the side’s defensive cornerstone." },
      { name: "Georges Grün", position: "Defender", note: "The captain brought leadership and aerial presence at the back." },
      { name: "Enzo Scifo", position: "Midfielder", note: "A creative midfielder capable of unlocking compact defences." },
      { name: "Luc Nilis", position: "Forward", note: "A technically refined forward trusted in and around the penalty area." }
    ],
    roster: roster(
      ["Michel Preud'homme", "Filip De Wilde", "Dany Verlinden"],
      ["Dirk Medved", "Vital Borkelmans", "Philippe Albert", "Rudi Smidts", "Georges Grün", "Michel De Wolf", "Eric Van Meir", "Pascal Renier"],
      ["Lorenzo Staelens", "Franky Van der Elst", "Enzo Scifo", "Marc Emmers", "Danny Boffin", "Marc Wilmots", "Stephan Van der Heyden"],
      ["Luc Nilis", "Marc Degryse", "Alexandre Czerniatynski", "Josip Weber"],
    ),
    sources,
  },
  {
    tournamentId: "usa-1994",
    teamId: "bolivia",
    title: "Bolivia at USA ’94",
    introduction:
      "Bolivia return to the World Cup for the first time since 1950, carrying altitude-hardened CONMEBOL experience and a clear sense of historic occasion.",
    beforeTheTournament: {
      stateOfTeam:
        "Xabier Azkargorta has built a compact unit around Marco Etcheverry and a defensive structure adapted to life away from La Paz.",
      expectations:
        "A competitive showing in the group would mark a successful return after more than four decades away.",
      majorStorylines:
        "Whether Bolivia can translate their qualifying resilience to sea-level venues is the defining pre-tournament question.",
    },
    qualification: {
      method: "CONMEBOL qualifying runners-up",
      summary: "Bolivia finished second in the CONMEBOL qualifying group to return to the finals for the first time since 1950.",
      notableAchievements: "A landmark away win in Buenos Aires during qualifying underlined their competitive rise.",
    },
    history: {
      worldCupAppearances: 3,
      previousAppearance: "1950",
      bestFinishEntering: "Group stage",
      summary:
        "Bolivia appeared in 1930 and 1950 before a long absence; USA ’94 is their third finals and first in forty-four years.",
    },
    confederation: "CONMEBOL",
    fifaRanking: 43,
    manager: "Xabier Azkargorta",
    captain: "Carlos Borja",
    tacticalIdentity: "Compact and resilient",
    style:
      "Tight defending, quick counters and set-piece threat, with Etcheverry the creative outlet.",
    tournamentOutlook: {
      label: "Returning after long absence",
      summary:
        "Ranked outside the world’s top forty, Bolivia’s priority is to prove they belong among the finals’ twenty-four.",
    },
    keyPlayers: [
      { name: "Marco Etcheverry", position: "Midfielder", note: "The creative heartbeat of the side and Bolivia’s most recognised international talent." },
      { name: "Erwin Sánchez", position: "Midfielder", note: "A technically gifted midfielder capable of arriving late in the box." },
      { name: "Carlos Borja", position: "Midfielder", note: "The captain brought experience and leadership through midfield." },
      { name: "Jaime Moreno", position: "Forward", note: "A mobile forward option trusted to stretch opposing defences." }
    ],
    roster: roster(
      ["Carlos Trucco", "Darío Rojas", "Marcelo Torrico"],
      ["Juan Manuel Peña", "Marco Sandy", "Miguel Rimba", "Gustavo Quinteros", "Modesto Soruco", "Luis Cristaldo", "Óscar Sánchez"],
      ["Carlos Borja", "Mario Pinedo", "José Milton Melgar", "Marco Etcheverry", "Mauricio Ramos", "Vladimir Soria", "Ramiro Castillo", "Erwin Sánchez", "Julio César Baldivieso"],
      ["Álvaro Peña", "Jaime Moreno", "William Ramallo"],
    ),
    sources,
  },
  {
    tournamentId: "usa-1994",
    teamId: "cameroon",
    title: "Cameroon at USA ’94",
    introduction:
      "Cameroon arrive with African pedigree after Italia ’90 and a squad still capable of unsettling established European and South American sides.",
    beforeTheTournament: {
      stateOfTeam:
        "Henri Michel inherits a programme seeking to renew the belief that followed their quarter-final run four years earlier.",
      expectations:
        "A place in the second round remains the opening standard for a nation that announced itself so forcefully in 1990.",
      majorStorylines:
        "How Cameroon manage the transition with an ageing Roger Milla still in the party, and whether their athletic intensity still translates, frame the build-up.",
    },
    qualification: {
      method: "CAF finalists",
      summary: "Cameroon secured one of Africa’s three finals places through the CAF qualifying path.",
    },
    history: {
      worldCupAppearances: 3,
      previousAppearance: "1990",
      bestFinishEntering: "Quarter-finals (1990)",
      summary:
        "Cameroon debuted in 1982 and reached the quarter-finals in 1990, establishing themselves as Africa’s standard-bearers.",
    },
    confederation: "CAF",
    fifaRanking: 24,
    manager: "Henri Michel",
    captain: "Stephen Tataw",
    tacticalIdentity: "Athletic and direct",
    style:
      "Powerful running, aggressive pressing and transitions designed to stretch opponents in wide areas.",
    tournamentOutlook: {
      label: "Expected to reach the second round",
      summary:
        "Cameroon’s ranking and recent tournament pedigree leave them among the African sides expected to compete for a knockout place.",
    },
    keyPlayers: [
      { name: "François Omam-Biyik", position: "Forward", note: "An aerial threat and established international forward." },
      { name: "Roger Milla", position: "Forward", note: "A veteran attacker whose presence still carried symbolic and sporting weight." },
      { name: "Stephen Tataw", position: "Defender", note: "The captain organised a physically imposing defensive unit." },
      { name: "Jacques Songo'o", position: "Goalkeeper", note: "An experienced goalkeeper option behind the veteran first-choice pair." }
    ],
    roster: roster(
      ["Joseph-Antoine Bell", "Thomas N'Kono", "Jacques Songo'o"],
      ["André Kana-Biyik", "Rigobert Song", "Samuel Ekemé", "Victor N'Dip", "Raymond Kalla", "Stephen Tataw", "Hans Agbo"],
      ["Thomas Libiih", "Emile M'Bouh", "Emmanuel Maboang", "Paul Loga", "Marc-Vivien Foé", "Jean-Pierre Fiala"],
      ["François Omam-Biyik", "Roger Milla", "Louis-Paul M'Fédé", "Alphonse Tchami", "David Embé", "Georges Mouyémé"],
    ),
    sources,
  },
  {
    tournamentId: "usa-1994",
    teamId: "colombia",
    title: "Colombia at USA ’94",
    introduction:
      "Colombia enter among the most admired sides in the draw, celebrated for fluent combination play and the vision of Carlos Valderrama.",
    beforeTheTournament: {
      stateOfTeam:
        "Francisco Maturana’s group arrives with confidence after a strong CONMEBOL campaign and a settled creative midfield.",
      expectations:
        "Public expectation is unusually high; a place beyond the group is widely treated as the minimum standard.",
      majorStorylines:
        "Whether Colombia’s elegant style can survive the intensity of a World Cup group is the debate that follows them into the United States.",
    },
    qualification: {
      method: "CONMEBOL qualifying third place",
      summary: "Colombia finished among the CONMEBOL qualifying leaders to book a second consecutive finals appearance.",
      notableAchievements: "A historic 5–0 win away to Argentina during qualifying became the defining image of their rise.",
    },
    history: {
      worldCupAppearances: 3,
      previousAppearance: "1990",
      bestFinishEntering: "Round of 16 (1990)",
      summary:
        "Colombia returned to the finals in 1990 after a long absence and arrive in 1994 with greater belief and deeper talent.",
    },
    confederation: "CONMEBOL",
    fifaRanking: 17,
    manager: "Francisco Maturana",
    captain: "Carlos Valderrama",
    tacticalIdentity: "Fluid and inventive",
    style:
      "Patient build-up through Valderrama, with runners from midfield and a varied forward line.",
    tournamentOutlook: {
      label: "Dark horse",
      summary:
        "Widely discussed as one of the most stylish sides in the tournament, Colombia are tipped by many observers to be present in the later rounds.",
    },
    keyPlayers: [
      { name: "Carlos Valderrama", position: "Midfielder", note: "The captain and playmaker whose vision organised Colombia’s attacking patterns." },
      { name: "Faustino Asprilla", position: "Forward", note: "A dynamic forward capable of deciding matches with individual quality." },
      { name: "Freddy Rincón", position: "Midfielder", note: "A powerful midfielder who arrived late in the box and covered huge distances." },
      { name: "Óscar Córdoba", position: "Goalkeeper", note: "A young goalkeeper trusted with the number-one role entering the tournament." }
    ],
    roster: roster(
      ["Óscar Córdoba", "Faryd Mondragón", "José María Pazo"],
      ["Andrés Escobar", "Alexis Mendoza", "Luis Herrera", "Néstor Ortiz", "Luis Carlos Perea", "Óscar Cortés", "Wilson Pérez"],
      ["Hermán Gaviria", "Gabriel Gómez", "Harold Lozano", "Carlos Valderrama", "Leonel Álvarez", "Mauricio Serna", "Freddy Rincón"],
      ["Antony de Ávila", "Iván Valenciano", "Adolfo Valencia", "Víctor Aristizábal", "Faustino Asprilla"],
    ),
    sources,
  },
  {
    tournamentId: "usa-1994",
    teamId: "greece",
    title: "Greece at USA ’94",
    introduction:
      "Greece make their first World Cup appearance, carrying the pride of a breakthrough qualifying campaign under Alketas Panagoulias.",
    beforeTheTournament: {
      stateOfTeam:
        "A largely domestic-based squad arrives with limited finals experience but clear organisation and set-piece threat.",
      expectations:
        "A competitive group showing would already mark a successful debut for a first-time finalist.",
      majorStorylines:
        "Whether Greece can translate qualifying discipline onto the World Cup stage is the open question.",
    },
    qualification: {
      method: "UEFA Group 5 winners",
      summary: "Greece topped UEFA Group 5 to qualify for a first World Cup finals.",
      notableAchievements: "Debutants after finishing ahead of Russia in their qualifying section.",
    },
    history: {
      worldCupAppearances: 1,
      previousAppearance: "Debut",
      bestFinishEntering: "Debutants",
      summary:
        "USA ’94 is Greece’s first World Cup finals appearance after decades of near-misses in European qualifying.",
    },
    confederation: "UEFA",
    fifaRanking: 31,
    manager: "Alketas Panagoulias",
    captain: "Tasos Mitropoulos",
    tacticalIdentity: "Organised and cautious",
    style:
      "Compact defending, direct distribution and reliance on set pieces against stronger possession sides.",
    tournamentOutlook: {
      label: "Debutants with belief",
      summary:
        "Ranked outside the top thirty, Greece’s first target is to prove they can compete in every group fixture.",
    },
    keyPlayers: [
      { name: "Tasos Mitropoulos", position: "Midfielder", note: "The captain brought leadership and experience to a debutant midfield." },
      { name: "Nikos Machlas", position: "Forward", note: "A sharp finisher trusted as Greece’s primary attacking reference." },
      { name: "Panagiotis Tsalouchidis", position: "Midfielder", note: "An energetic midfielder central to Greece’s work rate." },
      { name: "Antonis Minou", position: "Goalkeeper", note: "The established first-choice goalkeeper entering the tournament." }
    ],
    roster: roster(
      ["Antonis Minou", "Christos Karkamanis", "Ilias Atmatsidis"],
      ["Stratos Apostolakis", "Thanasis Kolitsidakis", "Stelios Manolas", "Giannis Kalitzakis", "Vaios Karagiannis", "Kyriakos Karataidis", "Alexandros Alexiou"],
      ["Panagiotis Tsalouchidis", "Nikos Nioplias", "Tasos Mitropoulos", "Nikos Tsiantakis", "Spyros Marangos", "Minas Hantzidis", "Savvas Kofidis"],
      ["Dimitris Saravakos", "Nikos Machlas", "Vasilis Dimitriadis", "Alexis Alexoudis", "Alexis Alexandris"],
    ),
    sources,
  },
  {
    tournamentId: "usa-1994",
    teamId: "mexico",
    title: "Mexico at USA ’94",
    introduction:
      "Mexico return to the World Cup after missing Italia ’90, bringing flair, a distinctive goalkeeper and renewed CONCACAF ambition.",
    beforeTheTournament: {
      stateOfTeam:
        "Miguel Mejía Barón has assembled a side mixing domestic stars with European experience and Jorge Campos’ unconventional presence in goal.",
      expectations:
        "A place in the second round is the clear opening target for a programme eager to reassert itself.",
      majorStorylines:
        "How Mexico manage expectation after a qualifying return, and whether their attacking talent can overcome defensive frailty, frame the build-up.",
    },
    qualification: {
      method: "CONCACAF qualifiers",
      summary: "Mexico secured qualification through the CONCACAF path after missing the 1990 finals.",
    },
    history: {
      worldCupAppearances: 10,
      previousAppearance: "1986",
      bestFinishEntering: "Quarter-finals (1970, 1986)",
      summary:
        "Mexico have a long finals history and hosted in 1970 and 1986; USA ’94 is their return after missing Italia ’90.",
    },
    confederation: "CONCACAF",
    fifaRanking: 16,
    manager: "Miguel Mejía Barón",
    captain: "Ignacio Ambríz",
    tacticalIdentity: "Attacking and expressive",
    style:
      "Quick combinations, wide play and inventive goalkeeping distribution from Campos.",
    tournamentOutlook: {
      label: "Expected to reach the second round",
      summary:
        "A top-twenty ranking and a talented attack leave Mexico among the sides expected to compete for a knockout place.",
    },
    keyPlayers: [
      { name: "Jorge Campos", position: "Goalkeeper", note: "An unorthodox goalkeeper whose distribution and personality made him a focal point." },
      { name: "Hugo Sánchez", position: "Forward", note: "A veteran goalscorer still capable of decisive moments in the box." },
      { name: "Luis García", position: "Forward", note: "A mobile attacker trusted to link midfield and the final third." },
      { name: "Alberto García Aspe", position: "Midfielder", note: "A midfield organiser and set-piece threat." }
    ],
    roster: roster(
      ["Jorge Campos", "Félix Fernández", "Adrián Chávez"],
      ["Claudio Suárez", "Juan Ramírez Perales", "Ignacio Ambríz", "José Luis Salgado", "Raúl Gutiérrez"],
      ["Ramón Ramírez", "Marcelino Bernal", "Alberto García Aspe", "Juan Carlos Chávez", "Joaquín del Olmo", "Missael Espinoza", "Benjamín Galindo", "Jorge Rodríguez"],
      ["Carlos Hermosillo", "Hugo Sánchez", "Luis García", "Zague", "Luis Antonio Valdéz", "Luis Miguel Salvador"],
    ),
    sources,
  },
  {
    tournamentId: "usa-1994",
    teamId: "morocco",
    title: "Morocco at USA ’94",
    introduction:
      "Morocco arrive seeking to renew African credibility with a compact, well-drilled side under Abdellah Blinda.",
    beforeTheTournament: {
      stateOfTeam:
        "A balanced squad mixes domestic experience with European-based talent and a clear preference for organisation.",
      expectations:
        "Progress from a difficult European-heavy group would be treated as a major success.",
      majorStorylines:
        "Whether Morocco can convert defensive discipline into enough attacking threat is the central pre-tournament question.",
    },
    qualification: {
      method: "CAF finalists",
      summary: "Morocco earned one of Africa’s three finals places through the CAF qualifying competition.",
    },
    history: {
      worldCupAppearances: 3,
      previousAppearance: "1986",
      bestFinishEntering: "Round of 16 (1986)",
      summary:
        "Morocco reached the second round in 1986 and return in 1994 after missing Italia ’90.",
    },
    confederation: "CAF",
    fifaRanking: 28,
    manager: "Abdellah Blinda",
    captain: "Mustafa El Haddaoui",
    tacticalIdentity: "Compact and disciplined",
    style:
      "Low defensive block, quick counters and set-piece threat through midfield runners.",
    tournamentOutlook: {
      label: "Dark horse",
      summary:
        "Morocco’s ranking sits outside the favourites, but their organisation makes them a difficult group opponent.",
    },
    keyPlayers: [
      { name: "Mustapha Hadji", position: "Midfielder", note: "A creative midfielder capable of unlocking compact defences." },
      { name: "Mustafa El Haddaoui", position: "Midfielder", note: "The captain brought experience and leadership in midfield." },
      { name: "Noureddine Naybet", position: "Defender", note: "A commanding centre-back central to Morocco’s defensive structure." },
      { name: "Mohammed Chaouch", position: "Forward", note: "A forward reference trusted to finish transitions." }
    ],
    roster: roster(
      ["Khalil Azmi", "Said Dghay", "Zakaria Alaoui"],
      ["Nacer Abdellah", "Abdelkrim El Hadrioui", "Smahi Triki", "Noureddine Naybet", "Ahmed Masbahi", "Rachid Neqrouz"],
      ["Tahar El Khalej", "Mustapha Hadji", "Rachid Azzouzi", "Mustafa El Haddaoui", "Rachid Daoudi", "El Arbi Hababi", "Hassan Kachloul", "Mohamed Samadi"],
      ["Mohammed Chaouch", "Ahmed Bahja", "Hassan Nader", "Abdeslam Laghrissi", "Abdelmajid Bouyboud"],
    ),
    sources,
  },
  {
    tournamentId: "usa-1994",
    teamId: "nigeria",
    title: "Nigeria at USA ’94",
    introduction:
      "Nigeria make a highly anticipated debut, arriving with pace, technical quality and one of the tournament’s most exciting young squads.",
    beforeTheTournament: {
      stateOfTeam:
        "Clemens Westerhof has shaped a confident Super Eagles side around Rashidi Yekini and a fearless midfield.",
      expectations:
        "Many observers tip Nigeria to be the African side most likely to advance from the group stage.",
      majorStorylines:
        "Whether debutant nerves can be managed, and how Yekini’s finishing translates at this level, dominate the conversation.",
    },
    qualification: {
      method: "CAF finalists",
      summary: "Nigeria qualified for a first World Cup by securing one of Africa’s three finals places.",
      notableAchievements: "Debutants ranked as high as eleventh in the world entering the tournament.",
    },
    history: {
      worldCupAppearances: 1,
      previousAppearance: "Debut",
      bestFinishEntering: "Debutants",
      summary:
        "USA ’94 is Nigeria’s first World Cup finals after a rapid rise through African and global rankings.",
    },
    confederation: "CAF",
    fifaRanking: 11,
    manager: "Clemens Westerhof",
    captain: "Stephen Keshi",
    tacticalIdentity: "Fast and expressive",
    style:
      "Vertical attacking play, wide pace and inventive midfield combinations through Okocha and Finidi.",
    tournamentOutlook: {
      label: "Debutants with belief",
      summary:
        "A top-fifteen ranking and exceptional athleticism leave Nigeria widely tipped to make an immediate impact.",
    },
    keyPlayers: [
      { name: "Rashidi Yekini", position: "Forward", note: "Africa’s leading centre-forward and Nigeria’s primary goal threat." },
      { name: "Jay-Jay Okocha", position: "Midfielder", note: "A dazzling dribbler capable of creating chances from nothing." },
      { name: "Finidi George", position: "Midfielder", note: "A wide midfielder whose delivery stretched opposing full-backs." },
      { name: "Stephen Keshi", position: "Defender", note: "The captain organised a powerful defensive unit." }
    ],
    roster: roster(
      ["Peter Rufai", "Alloysius Agu", "Wilfred Agbonavbare"],
      ["Augustine Eguavoen", "Benedict Iroha", "Stephen Keshi", "Uche Okechukwu", "Chidi Nwanu", "Emeka Ezeugo", "Michael Emenalo", "Uche Okafor"],
      ["Finidi George", "Thompson Oliha", "Jay-Jay Okocha", "Emmanuel Amunike", "Sunday Oliseh", "Mutiu Adepoju"],
      ["Rashidi Yekini", "Samson Siasia", "Daniel Amokachi", "Victor Ikpeba", "Efan Ekoku"],
    ),
    sources,
  },
  {
    tournamentId: "usa-1994",
    teamId: "norway",
    title: "Norway at USA ’94",
    introduction:
      "Norway return after a fifty-six-year absence, carrying a clear Egil Olsen method and one of the highest FIFA rankings in the draw.",
    beforeTheTournament: {
      stateOfTeam:
        "Olsen’s direct, physically demanding style has produced a settled group that punches above traditional Norwegian expectation.",
      expectations:
        "A place in the second round is a realistic aim for a side ranked inside the world’s top ten.",
      majorStorylines:
        "Whether Norway’s long-ball principles can unsettle more technical opponents is the tactical debate surrounding them.",
    },
    qualification: {
      method: "UEFA Group 2 winners",
      summary: "Norway topped UEFA Group 2 to qualify for a first World Cup since 1938.",
    },
    history: {
      worldCupAppearances: 2,
      previousAppearance: "1938",
      bestFinishEntering: "Round of 16 (1938)",
      summary:
        "Norway’s only previous finals came in 1938; the fifty-six-year gap equals a modern record for absence between appearances.",
    },
    confederation: "UEFA",
    fifaRanking: 6,
    manager: "Egil Olsen",
    captain: "Rune Bratseth",
    tacticalIdentity: "Direct and physical",
    style:
      "Long diagonals, aggressive pressing on the second ball and aerial threat from set pieces.",
    tournamentOutlook: {
      label: "Dark horse",
      summary:
        "A top-ten ranking and a distinctive method make Norway one of the more intriguing European sides in the field.",
    },
    keyPlayers: [
      { name: "Rune Bratseth", position: "Defender", note: "The captain and defensive organiser of Olsen’s system." },
      { name: "Kjetil Rekdal", position: "Midfielder", note: "A midfield leader trusted from open play and set pieces." },
      { name: "Jostein Flo", position: "Forward", note: "A target forward central to Norway’s direct attacking plan." },
      { name: "Erik Thorstvedt", position: "Goalkeeper", note: "An experienced international goalkeeper behind a high defensive line." }
    ],
    roster: roster(
      ["Erik Thorstvedt", "Frode Grodås", "Ola By Rise"],
      ["Gunnar Halle", "Erland Johnsen", "Rune Bratseth", "Stig Inge Bjørnebye", "Roger Nilsen", "Karl Petter Løken", "Dan Eggen", "Alfie Haaland", "Henning Berg"],
      ["Erik Mykland", "Øyvind Leonhardsen", "Kjetil Rekdal", "Roar Strand", "Lars Bohinen"],
      ["Jostein Flo", "Jan Åge Fjørtoft", "Mini Jakobsen", "Gøran Sørloth", "Sigurd Rushfeldt"],
    ),
    sources,
  },
  {
    tournamentId: "usa-1994",
    teamId: "republic-of-ireland",
    title: "Republic of Ireland at USA ’94",
    introduction:
      "The Republic of Ireland arrive with Jack Charlton’s familiar collective identity and the confidence of successive finals appearances.",
    beforeTheTournament: {
      stateOfTeam:
        "A largely British-based squad remains built on work rate, set pieces and defensive resolve rather than possession dominance.",
      expectations:
        "Reaching the second round again would sustain the progress of Italia ’90.",
      majorStorylines:
        "Whether Charlton’s methods still hold against more technical groups, and how Roy Keane’s emergence fits the plan, shape the narrative.",
    },
    qualification: {
      method: "UEFA Group 3 runners-up",
      summary: "The Republic of Ireland finished second in UEFA Group 3 behind Spain to qualify.",
    },
    history: {
      worldCupAppearances: 2,
      previousAppearance: "1990",
      bestFinishEntering: "Quarter-finals (1990)",
      summary:
        "Italia ’90 was Ireland’s first finals; USA ’94 is their second consecutive appearance under Charlton.",
    },
    confederation: "UEFA",
    fifaRanking: 14,
    manager: "Jack Charlton",
    captain: "Andy Townsend",
    tacticalIdentity: "Direct and collective",
    style:
      "High work rate, long deliveries into the box and aggressive defending of territory.",
    tournamentOutlook: {
      label: "Expected to reach the second round",
      summary:
        "Ireland’s ranking and tournament experience leave them among the European sides expected to compete for a knockout place.",
    },
    keyPlayers: [
      { name: "Roy Keane", position: "Midfielder", note: "A young midfielder whose drive and timing already marked him as a central figure." },
      { name: "Andy Townsend", position: "Midfielder", note: "The captain set the side’s tempo and leadership standard." },
      { name: "Packie Bonner", position: "Goalkeeper", note: "An experienced goalkeeper trusted in high-pressure matches." },
      { name: "John Aldridge", position: "Forward", note: "A proven penalty-box striker and reference in the final third." }
    ],
    roster: roster(
      ["Packie Bonner", "Alan Kelly"],
      ["Denis Irwin", "Terry Phelan", "Kevin Moran", "Paul McGrath", "Steve Staunton", "Gary Kelly", "Alan Kernaghan", "Phil Babb"],
      ["Roy Keane", "Andy Townsend", "Ray Houghton", "John Sheridan", "Ronnie Whelan", "Alan McLoughlin", "Jason McAteer"],
      ["John Aldridge", "Tommy Coyne", "Tony Cascarino", "Eddie McGoldrick", "David Kelly"],
    ),
    sources,
  },
  {
    tournamentId: "usa-1994",
    teamId: "russia",
    title: "Russia at USA ’94",
    introduction:
      "Russia appear as an independent nation for the first time, carrying Soviet-era pedigree into a new political and sporting identity.",
    beforeTheTournament: {
      stateOfTeam:
        "Pavel Sadyrin has assembled a technically capable squad seeking continuity after the dissolution of the Soviet Union.",
      expectations:
        "A competitive group campaign is expected from a programme with deep tournament history under a new flag.",
      majorStorylines:
        "How Russia manage the transition from the Soviet team, and whether their attacking talent can settle quickly, frame the build-up.",
    },
    qualification: {
      method: "UEFA Group 5 runners-up",
      summary: "Russia finished second in UEFA Group 5 behind Greece to qualify for a first finals as an independent nation.",
    },
    history: {
      worldCupAppearances: 8,
      previousAppearance: "1990",
      bestFinishEntering: "Fourth place (1966, as Soviet Union)",
      summary:
        "Counting the Soviet Union’s record, this programme has a long finals history; USA ’94 is the first appearance as Russia.",
    },
    confederation: "UEFA",
    fifaRanking: 19,
    manager: "Pavel Sadyrin",
    captain: "Dmitri Kharine",
    tacticalIdentity: "Technical and forceful",
    style:
      "Strong running from midfield, direct attacking combinations and set-piece threat.",
    tournamentOutlook: {
      label: "Expected to reach the second round",
      summary:
        "Russia’s ranking and inherited experience leave them among the sides expected to push for a knockout place.",
    },
    keyPlayers: [
      { name: "Dmitri Kharine", position: "Goalkeeper", note: "The captain and established first-choice goalkeeper." },
      { name: "Oleg Salenko", position: "Forward", note: "A clinical centre-forward trusted as a primary goal threat." },
      { name: "Valeri Karpin", position: "Midfielder", note: "A dynamic midfielder capable of arriving late in the box." },
      { name: "Aleksandr Mostovoi", position: "Midfielder", note: "A creative midfielder with vision between the lines." }
    ],
    roster: roster(
      ["Stanislav Cherchesov", "Dmitri Kharine"],
      ["Dmitri Kuznetsov", "Sergei Gorlukovich", "Dmitri Galiamin", "Yuriy Nikiforov", "Vladislav Ternavsky", "Omari Tetradze", "Viktor Onopko"],
      ["Andrey Pyatnitsky", "Dmitri Popov", "Valeri Karpin", "Aleksandr Borodyuk", "Igor Korneev", "Ilya Tsymbalar", "Aleksandr Mostovoi", "Igor Lediakhov", "Dmitri Khlestov"],
      ["Oleg Salenko", "Vladimir Beschastnykh", "Dmitri Radchenko", "Sergei Yuran"],
    ),
    sources,
  },
  {
    tournamentId: "usa-1994",
    teamId: "saudi-arabia",
    title: "Saudi Arabia at USA ’94",
    introduction:
      "Saudi Arabia make their World Cup debut after topping Asia’s final qualifying round, arriving with domestic-based cohesion and growing regional ambition.",
    beforeTheTournament: {
      stateOfTeam:
        "Jorge Solari leads a squad built almost entirely from Saudi clubs, organised around Majed Abdullah and a confident midfield.",
      expectations:
        "A competitive debut and lessons for a rising Asian programme are the realistic opening aims.",
      majorStorylines:
        "Whether Asian champions’ form can translate against European and South American opposition is the central question.",
    },
    qualification: {
      method: "AFC final round winners",
      summary: "Saudi Arabia topped Asia’s final qualifying round ahead of South Korea to reach a first World Cup.",
      notableAchievements: "Debutants after edging Japan in a dramatic final Asian qualifying group.",
    },
    history: {
      worldCupAppearances: 1,
      previousAppearance: "Debut",
      bestFinishEntering: "Debutants",
      summary:
        "USA ’94 is Saudi Arabia’s first World Cup finals after emerging as Asia’s strongest qualifying side.",
    },
    confederation: "AFC",
    fifaRanking: 34,
    manager: "Jorge Solari",
    captain: "Majed Abdullah",
    tacticalIdentity: "Organised and energetic",
    style:
      "Compact defending, quick wide transitions and technical midfield combinations.",
    tournamentOutlook: {
      label: "Debutants with belief",
      summary:
        "Ranked outside the top thirty, Saudi Arabia’s first task is to stay competitive in every group match.",
    },
    keyPlayers: [
      { name: "Majed Abdullah", position: "Forward", note: "The captain and historic goalscorer of the Saudi programme." },
      { name: "Saeed Al-Owairan", position: "Midfielder", note: "A powerful midfielder capable of carrying the ball over long distances." },
      { name: "Sami Al-Jaber", position: "Forward", note: "A mobile forward option in and around the penalty area." },
      { name: "Mohamed Al-Deayea", position: "Goalkeeper", note: "A young goalkeeper already established as a national-team reference." }
    ],
    roster: roster(
      ["Mohamed Al-Deayea", "Hussein Al-Sadiq", "Ibrahim Al-Helwah"],
      ["Abdullah Al-Dosari", "Mohammed Al-Khilaiwi", "Abdullah Sulaiman", "Ahmed Jamil", "Mohamed Abd Al-Jawad", "Saleh Al-Dawod", "Yassir Al-Taifi", "Awad Al-Anazi"],
      ["Fuad Anwar", "Fahad Al-Bishi", "Saeed Al-Owairan", "Khaled Massad", "Talal Jebreen", "Hamzah Saleh"],
      ["Fahad Al-Ghesheyan", "Majed Abdullah", "Fahad Al-Mehallel", "Sami Al-Jaber", "Hamzah Idris"],
    ),
    sources,
  },
  {
    tournamentId: "usa-1994",
    teamId: "south-korea",
    title: "South Korea at USA ’94",
    introduction:
      "South Korea return seeking to improve on successive finals appearances with a disciplined, industrious Asian side under Kim Ho.",
    beforeTheTournament: {
      stateOfTeam:
        "A hard-working squad built on domestic familiarity arrives with clear organisation and limited star power by European standards.",
      expectations:
        "A first knockout appearance remains the long-term target; a competitive group showing is the immediate measure.",
      majorStorylines:
        "Whether South Korea can score enough goals to match their defensive effort is the recurring pre-tournament concern.",
    },
    qualification: {
      method: "AFC final round qualifiers",
      summary: "South Korea finished among the top sides in Asia’s final qualifying round to book another finals place.",
    },
    history: {
      worldCupAppearances: 4,
      previousAppearance: "1990",
      bestFinishEntering: "Group stage",
      summary:
        "South Korea have appeared in every World Cup since 1986 and seek a first move beyond the group stage.",
    },
    confederation: "AFC",
    fifaRanking: 37,
    manager: "Kim Ho",
    captain: "Choi In-young",
    tacticalIdentity: "Industrious and compact",
    style:
      "High work rate, disciplined shape and quick counters through wide runners.",
    tournamentOutlook: {
      label: "Expected to reach the second round",
      summary:
        "South Korea’s tournament experience makes a competitive group campaign the standard against which they will be judged.",
    },
    keyPlayers: [
      { name: "Hwang Sun-hong", position: "Forward", note: "The side’s primary centre-forward and finishing reference." },
      { name: "Kim Joo-sung", position: "Forward", note: "An experienced attacker capable of dropping into midfield spaces." },
      { name: "Choi In-young", position: "Goalkeeper", note: "The captain and established first-choice goalkeeper." },
      { name: "Hong Myung-bo", position: "Defender", note: "A composed defender trusted to organise from the back." }
    ],
    roster: roster(
      ["Choi In-young", "Park Chul-woo", "Lee Woon-jae"],
      ["Lee Jong-hwa", "Kim Pan-keun", "Park Jung-bae", "Shin Hong-gi", "Choi Young-il", "An Ik-soo", "Gu Sang-bum", "Hong Myung-bo"],
      ["Chung Jong-son", "Lee Young-jin", "Noh Jung-yoon", "Choi Dae-shik", "Cho Jin-ho", "Ha Seok-ju", "Choi Moon-sik"],
      ["Kim Joo-sung", "Ko Jeong-woon", "Seo Jung-won", "Hwang Sun-hong"],
    ),
    sources,
  },
  {
    tournamentId: "usa-1994",
    teamId: "switzerland",
    title: "Switzerland at USA ’94",
    introduction:
      "Switzerland return after a twenty-eight-year absence, carrying Roy Hodgson’s organisation and a confident European qualifying campaign.",
    beforeTheTournament: {
      stateOfTeam:
        "Hodgson has built a settled side around Alain Geiger and the Borussia Dortmund threat of Stéphane Chapuisat.",
      expectations:
        "A place in the second round would confirm Switzerland’s return as more than a nostalgic storyline.",
      majorStorylines:
        "Whether Hodgson’s methods can translate from qualifying into a World Cup group is the central debate.",
    },
    qualification: {
      method: "UEFA Group 1 runners-up",
      summary: "Switzerland finished second in UEFA Group 1 behind Italy to qualify for a first finals since 1966.",
    },
    history: {
      worldCupAppearances: 7,
      previousAppearance: "1966",
      bestFinishEntering: "Quarter-finals (1934, 1938, 1954)",
      summary:
        "Switzerland were regular finalists before a long absence; USA ’94 ends a twenty-eight-year wait.",
    },
    confederation: "UEFA",
    fifaRanking: 12,
    manager: "Roy Hodgson",
    captain: "Alain Geiger",
    tacticalIdentity: "Organised and balanced",
    style:
      "Compact defending, measured possession and clinical transitions through Chapuisat.",
    tournamentOutlook: {
      label: "Expected to reach the second round",
      summary:
        "A top-fifteen ranking and strong qualifying form leave Switzerland among the European sides expected to compete for a knockout place.",
    },
    keyPlayers: [
      { name: "Stéphane Chapuisat", position: "Forward", note: "A proven Bundesliga forward and Switzerland’s primary attacking threat." },
      { name: "Ciriaco Sforza", position: "Midfielder", note: "A refined midfielder capable of controlling tempo between the lines." },
      { name: "Alain Geiger", position: "Defender", note: "The captain and defensive organiser of Hodgson’s side." },
      { name: "Adrian Knup", position: "Forward", note: "A complementary forward option with movement across the front line." }
    ],
    roster: roster(
      ["Marco Pascolo", "Stephan Lehmann", "Martin Brunner"],
      ["Marc Hottiger", "Yvan Quentin", "Alain Geiger", "Christophe Ohrel", "André Egli", "Martin Rueda", "Jürg Studer"],
      ["Dominique Herr", "Georges Bregy", "Alain Sutter", "Ciriaco Sforza", "Thomas Bickel", "Sébastien Fournier", "Patrick Sylvestre", "Thomas Wyss"],
      ["Adrian Knup", "Stéphane Chapuisat", "Nestor Subiat", "Marco Grassi"],
    ),
    sources,
  },
];
