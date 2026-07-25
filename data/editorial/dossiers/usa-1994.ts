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

const sources = ["FIFA World Cup squad lists", "RSSSF", "FIFA/Coca-Cola World Ranking (June 1994)"];

export const USA_1994_DOSSIERS: TeamTournamentDossier[] = [
  {
    tournamentId: "usa-1994",
    teamId: "united-states",
    title: "A Summer at Home",
    introduction:
      "The United States enter their own World Cup carrying the responsibility of introducing a vast new audience to the tournament while proving that a CONCACAF host can compete with the established powers.",
    beforeTheTournament: {
      stateOfTeam:
        "Bora Milutinović has shaped a settled core that stayed together through the 1990 finals and the build-up to a first domestic professional league later in the decade.",
      expectations:
        "At home, anything short of a competitive group-stage showing will be judged harshly; progressing from the group would be treated as a genuine success.",
      majorStorylines:
        "The hosts must convert local curiosity into belief, manage enormous attention, and show that Italia ’90 was the start of a sustained return rather than a one-off.",
    },
    qualification: {
      method: "Host Nation",
      summary: "The United States qualified automatically as tournament hosts.",
      automaticQualifier: true,
      notableAchievements:
        "Hosting followed the programme’s return to the finals in 1990 after a forty-year absence from qualification success.",
    },
    history: {
      worldCupAppearances: 5,
      previousAppearance: "1990",
      bestFinishEntering: "Third place (1930)",
      summary:
        "The United States appeared in 1930, 1934 and 1950, then returned in 1990. USA ’94 is their fifth finals and their second consecutive appearance.",
    },
    confederation: "CONCACAF",
    fifaRanking: 23,
    manager: "Bora Milutinović",
    captain: "John Harkes",
    tacticalIdentity: "Organised and direct",
    style:
      "Compact defending, energetic wide running and set-piece threat, with limited possession against stronger technical sides.",
    tournamentOutlook: {
      label: "Host nation under pressure",
      summary:
        "Public and media expectation is high for a home side ranked outside the world’s top twenty. A disciplined group campaign is the opening standard against which they will be measured.",
    },
    keyPlayers: [
      { name: "Alexi Lalas", position: "Defender", note: "An assertive centre-back whose personality made him a focal point of the host narrative." },
      { name: "John Harkes", position: "Midfielder", note: "The captain brought Premier League experience and set the midfield tempo." },
      { name: "Tab Ramos", position: "Midfielder", note: "A creative link player returning from a serious injury sustained at Italia ’90." },
      { name: "Eric Wynalda", position: "Forward", note: "The side’s leading attacking reference and most reliable international finisher." },
    ],
    roster: roster(
      ["Tony Meola", "Juergen Sommer", "Brad Friedel"],
      ["Alexi Lalas", "Marcelo Balboa", "Paul Caligiuri", "Fernando Clavijo", "Thomas Dooley", "Mike Lapper", "Cle Kooiman"],
      ["John Harkes", "Tab Ramos", "Cobi Jones", "Earnie Stewart", "Hugo Pérez", "Claudio Reyna", "Mike Sorber"],
      ["Eric Wynalda", "Roy Wegerle", "Joe-Max Moore", "Frank Klopas", "Chris Henderson"],
    ),
    sources,
  },
  {
    tournamentId: "usa-1994",
    teamId: "brazil",
    title: "Brazil at USA ’94",
    introduction:
      "Brazil arrive with immense expectation and a gifted attacking core hardened by a demanding CONMEBOL qualifying campaign.",
    beforeTheTournament: {
      stateOfTeam:
        "Four years after a painful exit at Italia ’90, Carlos Alberto Parreira has built a side around defensive balance and a lethal Romário–Bebeto partnership.",
      expectations:
        "Anything short of a deep run will be considered failure for a nation still chasing a first world title since 1970.",
      majorStorylines:
        "Whether Parreira’s more pragmatic Seleção can satisfy a public raised on attacking romance is the central debate entering the tournament.",
    },
    qualification: {
      method: "CONMEBOL Group B winners",
      summary: "Brazil topped CONMEBOL Group B to book their place among the finals’ fifteen consecutive qualifiers.",
      record: "5W-2D-1L",
      notableAchievements:
        "Group winners despite a historic away defeat in La Paz; Romário’s late qualifying form sealed the berth.",
    },
    history: {
      worldCupAppearances: 15,
      previousAppearance: "1990",
      bestFinishEntering: "Winners (1958, 1962, 1970)",
      summary:
        "Brazil are ever-present at the World Cup and remain the competition’s defining attacking nation, still seeking another world title after 24 years.",
    },
    confederation: "CONMEBOL",
    fifaRanking: 3,
    manager: "Carlos Alberto Parreira",
    captain: "Dunga",
    tacticalIdentity: "Compact and clinical",
    style:
      "Protected midfield structure feeding quick, technical combinations for Romário and Bebeto in the final third.",
    tournamentOutlook: {
      label: "Tournament favorite",
      summary:
        "Ranked among the world’s best and stocked with elite attackers, Brazil are widely tipped to contend for the title from the opening whistle.",
    },
    keyPlayers: [
      { name: "Romário", position: "Forward", note: "A brilliant penalty-box finisher at the peak of his powers after a decisive qualifying surge." },
      { name: "Bebeto", position: "Forward", note: "An intelligent partner capable of drifting between lines and creating space." },
      { name: "Dunga", position: "Midfielder", note: "The captain brought steel, balance and authority in front of the defence." },
      { name: "Taffarel", position: "Goalkeeper", note: "An experienced international goalkeeper trusted in high-stakes matches." },
      { name: "Raí", position: "Midfielder", note: "A refined playmaker and the squad’s creative reference from deeper positions." },
    ],
    roster: roster(
      ["Taffarel", "Zetti", "Gilmar"],
      ["Aldair", "Branco", "Cafu", "Jorginho", "Leonardo", "Ricardo Rocha", "Ronaldão", "Márcio Santos"],
      ["Dunga", "Mazinho", "Mauro Silva", "Raí", "Zinho"],
      ["Bebeto", "Romário", "Müller", "Viola", "Ronaldo", "Paulo Sérgio"],
    ),
    sources,
  },
  {
    tournamentId: "usa-1994",
    teamId: "italy",
    title: "Tradition Under Pressure",
    introduction:
      "Italy bring a deep, tactically sophisticated squad and the weight of a near-miss from four years earlier under Arrigo Sacchi.",
    beforeTheTournament: {
      stateOfTeam:
        "Sacchi’s Milan-influenced pressing ideas meet a group with proven defenders and several contrasting attackers led by Roberto Baggio.",
      expectations:
        "A nation with two world titles expects another serious challenge; an early exit would renew familiar scrutiny.",
      majorStorylines:
        "Whether Sacchi can translate club principles to a tournament setting, and how Baggio’s invention fits the collective plan, dominate the Italian conversation.",
    },
    qualification: {
      method: "UEFA Group 1 winners",
      summary: "Italy topped UEFA Group 1 ahead of Switzerland, Portugal and Scotland.",
      record: "7W-2D-1L",
      notableAchievements: "Group winners with 16 points under the two-points-for-a-win system.",
    },
    history: {
      worldCupAppearances: 13,
      previousAppearance: "1990",
      bestFinishEntering: "Winners (1934, 1938)",
      summary:
        "Italy’s World Cup history is marked by early titles, repeated deep runs and the unfinished business of Italia ’90 on home soil.",
    },
    confederation: "UEFA",
    fifaRanking: 4,
    manager: "Arrigo Sacchi",
    captain: "Franco Baresi",
    tacticalIdentity: "High line and pressing",
    style:
      "A high defensive line, coordinated pressing and disciplined collective movement across the pitch.",
    tournamentOutlook: {
      label: "Tournament favorite",
      summary:
        "Seeded among the elite and rich in Serie A quality, Italy are expected to be present when the tournament narrows to its decisive matches.",
    },
    keyPlayers: [
      { name: "Roberto Baggio", position: "Forward", note: "The Ballon d’Or holder supplied individual invention when matches tightened." },
      { name: "Franco Baresi", position: "Defender", note: "A commanding organiser whose reading of the game anchored the back line." },
      { name: "Paolo Maldini", position: "Defender", note: "A versatile elite defender equally comfortable wide or centrally." },
      { name: "Gianluca Pagliuca", position: "Goalkeeper", note: "A dependable goalkeeper with proven big-match experience." },
    ],
    roster: roster(
      ["Gianluca Pagliuca", "Luca Marchegiani", "Luca Bucci"],
      ["Franco Baresi", "Paolo Maldini", "Alessandro Costacurta", "Antonio Benarrivo", "Luigi Apolloni", "Mauro Tassotti", "Roberto Mussi"],
      ["Demetrio Albertini", "Dino Baggio", "Roberto Donadoni", "Antonio Conte", "Alberigo Evani", "Nicola Berti", "Attilio Lombardo"],
      ["Roberto Baggio", "Giuseppe Signori", "Daniele Massaro", "Pierluigi Casiraghi", "Gianfranco Zola"],
    ),
    sources,
  },
  {
    tournamentId: "usa-1994",
    teamId: "sweden",
    title: "A Northern Challenge",
    introduction:
      "Sweden pair a settled defensive spine with an unusually productive front line and arrive with quiet confidence from an impressive qualifying campaign.",
    beforeTheTournament: {
      stateOfTeam:
        "Tommy Svensson’s side is built around experienced Europeans and a generation comfortable in major club leagues.",
      expectations:
        "Sweden are not billed as favourites, but their qualifying form suggests a team capable of troubling anyone in open play.",
      majorStorylines:
        "Whether the Dahlin–Andersson attacking axis can translate domestic and club scoring form onto the World Cup stage is the key question.",
    },
    qualification: {
      method: "UEFA Group 6 winners",
      summary: "Sweden won UEFA Group 6 ahead of Bulgaria and France.",
      record: "6W-3D-1L",
      notableAchievements: "Group winners with fifteen points, finishing above a strong French side.",
    },
    history: {
      worldCupAppearances: 9,
      previousAppearance: "1990",
      bestFinishEntering: "Runners-up (1958)",
      summary:
        "Sweden have a distinguished World Cup past, including a home final in 1958, and return seeking to restore that competitive standard.",
    },
    confederation: "UEFA",
    fifaRanking: 10,
    manager: "Tommy Svensson",
    captain: "Jonas Thern",
    tacticalIdentity: "Direct and robust",
    style:
      "Physically strong football with quality on the break and aerial threat from the forward line.",
    tournamentOutlook: {
      label: "Dark horse",
      summary:
        "Respected rather than hyped, Sweden are viewed as a dangerous outsider with the organisation to outlast more glamorous names.",
    },
    keyPlayers: [
      { name: "Tomas Brolin", position: "Midfielder", note: "A dynamic, inventive player arriving in excellent club form." },
      { name: "Kennet Andersson", position: "Forward", note: "A powerful aerial striker capable of deciding matches in the air." },
      { name: "Martin Dahlin", position: "Forward", note: "A quick, prolific partner whose pace stretched defences." },
      { name: "Thomas Ravelli", position: "Goalkeeper", note: "A veteran goalkeeper and vocal leader of the defensive unit." },
    ],
    roster: roster(
      ["Thomas Ravelli", "Magnus Hedman", "Lars Eriksson"],
      ["Roland Nilsson", "Patrik Andersson", "Joachim Björklund", "Mikael Nilsson", "Roger Ljung", "Pontus Kåmark", "Magnus Erlingmark"],
      ["Jonas Thern", "Tomas Brolin", "Klas Ingesson", "Stefan Schwarz", "Anders Limpar", "Jesper Blomqvist", "Håkan Mild"],
      ["Martin Dahlin", "Kennet Andersson", "Henrik Larsson", "Mats Sundin", "Stefan Rehn"],
    ),
    sources,
  },
  {
    tournamentId: "usa-1994",
    teamId: "bulgaria",
    title: "Bulgaria’s New Generation",
    introduction:
      "Bulgaria come to the United States with their most gifted modern attacking group and little fear of established names.",
    beforeTheTournament: {
      stateOfTeam:
        "Dimitar Penev’s squad mixes uncompromising defenders with Stoichkov’s star quality and inventive midfield support.",
      expectations:
        "Few tip Bulgaria for a long run, yet their late qualifying surge created genuine belief inside the camp.",
      majorStorylines:
        "The last-gasp win in Paris that eliminated France remains the emotional fuel; converting that momentum on a bigger stage is the challenge.",
    },
    qualification: {
      method: "UEFA Group 6 runners-up",
      summary: "Bulgaria finished second in UEFA Group 6, sealing qualification with a decisive final-night win in Paris.",
      record: "6W-2D-2L",
      notableAchievements:
        "Emil Kostadinov’s late goals in Paris eliminated France and sent Bulgaria to a sixth World Cup.",
    },
    history: {
      worldCupAppearances: 6,
      previousAppearance: "1986",
      bestFinishEntering: "Round of 16 (1986)",
      summary:
        "Bulgaria’s previous five finals yielded no World Cup wins. This sixth appearance arrives with the strongest attacking talent the programme has produced.",
    },
    confederation: "UEFA",
    fifaRanking: 29,
    manager: "Dimitar Penev",
    captain: "Borislav Mihaylov",
    tacticalIdentity: "Technical and opportunistic",
    style:
      "Technical attacking football built around inventive midfielders and Stoichkov’s threat between the lines.",
    tournamentOutlook: {
      label: "Dark horse",
      summary:
        "Ranked outside the world’s top twenty-five, Bulgaria are outsiders on paper but carry the confidence of a qualifying escape that stunned Europe.",
    },
    keyPlayers: [
      { name: "Hristo Stoichkov", position: "Forward", note: "Barcelona’s Ballon d’Or contender was the team’s attacking star and emotional leader." },
      { name: "Krasimir Balakov", position: "Midfielder", note: "A creative midfielder with Bundesliga polish and vision from deep." },
      { name: "Yordan Letchkov", position: "Midfielder", note: "An energetic, unpredictable runner capable of arriving late in the box." },
      { name: "Trifon Ivanov", position: "Defender", note: "An uncompromising centre-back who set the defensive tone." },
    ],
    roster: roster(
      ["Borislav Mihaylov", "Zdravko Zdravkov", "Plamen Nikolov"],
      ["Trifon Ivanov", "Tzanko Tzvetanov", "Petar Hubchev", "Ilian Kiriakov", "Emil Kremenliev"],
      ["Krasimir Balakov", "Yordan Letchkov", "Zlatko Yankov", "Daniel Borimirov", "Boncho Genchev", "Ivaylo Yordanov"],
      ["Hristo Stoichkov", "Emil Kostadinov", "Lyuboslav Penev", "Nasko Sirakov", "Petar Mihtarski"],
    ),
    sources,
  },
  {
    tournamentId: "usa-1994",
    teamId: "romania",
    title: "Romania’s Golden Midfield",
    introduction:
      "Romania’s technically elegant side is led by a playmaker widely considered among Europe’s finest and arrives with genuine belief after a strong qualifying campaign.",
    beforeTheTournament: {
      stateOfTeam:
        "Anghel Iordănescu inherits a creative core around Gheorghe Hagi, supported by experienced defenders and Serie A forwards.",
      expectations:
        "Romania expect to be competitive in their group and believe their midfield quality can stretch any opponent.",
      majorStorylines:
        "Hagi’s left foot is the headline, but the supporting cast of Răducioiu, Dumitrescu and Popescu gives the side unusual balance.",
    },
    qualification: {
      method: "UEFA Group 4 winners",
      summary: "Romania won UEFA Group 4 ahead of Belgium and Wales.",
      record: "7W-1D-2L",
      notableAchievements: "Group winners with fifteen points in a competitive section.",
    },
    history: {
      worldCupAppearances: 6,
      previousAppearance: "1990",
      bestFinishEntering: "Round of 16 (1934, 1938, 1990)",
      summary:
        "Romania have qualified regularly in recent cycles and return seeking to turn technical reputation into a deeper tournament presence.",
    },
    confederation: "UEFA",
    fifaRanking: 7,
    manager: "Anghel Iordănescu",
    captain: "Gheorghe Hagi",
    tacticalIdentity: "Fluid possession",
    style:
      "Ambitious passing, fluid movement and attacks channelled through Hagi’s vision and left foot.",
    tournamentOutlook: {
      label: "Dark horse",
      summary:
        "A top-ten ranking and an admired midfield make Romania one of the more intriguing European outsiders before kickoff.",
    },
    keyPlayers: [
      { name: "Gheorghe Hagi", position: "Midfielder", note: "A world-class creator and the team’s captain, capable of deciding matches alone." },
      { name: "Florin Răducioiu", position: "Forward", note: "A mobile forward with Serie A experience and sharp movement." },
      { name: "Ilie Dumitrescu", position: "Forward", note: "A clever attacker who combined with Hagi in tight spaces." },
      { name: "Gheorghe Popescu", position: "Defender", note: "A composed central defender with leadership and reading of the game." },
    ],
    roster: roster(
      ["Bogdan Stelea", "Florin Prunea", "Ştefan Preda"],
      ["Gheorghe Popescu", "Dan Petrescu", "Miodrag Belodedici", "Daniel Prodan", "Tibor Selymes", "Ion Vlădoiu"],
      ["Gheorghe Hagi", "Ilie Dumitrescu", "Dorinel Munteanu", "Ioan Lupescu", "Basarab Panduru", "Ioan Sabău", "Ovidiu Stîngă"],
      ["Florin Răducioiu", "Viorel Moldovan", "Marius Lăcătuş", "Ionel Ganea"],
    ),
    sources,
  },
  {
    tournamentId: "usa-1994",
    teamId: "netherlands",
    title: "The Dutch Balance",
    introduction:
      "The Netherlands assemble a side of technical distinction, with Ajax and Milan experience running through a squad reshaped after Ruud Gullit’s late withdrawal.",
    beforeTheTournament: {
      stateOfTeam:
        "Dick Advocaat leads a technically gifted group captained by Ronald Koeman, blending established names with emerging Ajax talent.",
      expectations:
        "Ranked second in the world, the Dutch are expected to challenge for the latter stages despite the disruption in camp.",
      majorStorylines:
        "Gullit’s departure weeks before the opening match forced a recalibration of leadership and attacking roles around Bergkamp and Koeman.",
    },
    qualification: {
      method: "UEFA Group 2 runners-up",
      summary: "The Netherlands finished second in UEFA Group 2 behind Norway, edging England on the final day.",
      record: "6W-3D-1L",
      notableAchievements: "Qualified as group runners-up with fifteen points after a decisive win over England.",
    },
    history: {
      worldCupAppearances: 6,
      previousAppearance: "1990",
      bestFinishEntering: "Runners-up (1974, 1978)",
      summary:
        "Dutch football retains a reputation for ambitious, influential tournament teams, still seeking a first world title after two final appearances.",
    },
    confederation: "UEFA",
    fifaRanking: 2,
    manager: "Dick Advocaat",
    captain: "Ronald Koeman",
    tacticalIdentity: "Technical possession",
    style:
      "Flexible attacking movement, overlapping full-backs and possession built through technically sharp midfielders.",
    tournamentOutlook: {
      label: "Tournament favorite",
      summary:
        "A world ranking of two and a deep pool of technical talent leave the Netherlands among the sides expected to shape the tournament’s later rounds.",
    },
    keyPlayers: [
      { name: "Dennis Bergkamp", position: "Forward", note: "An elegant forward entering his prime as the attack’s imaginative reference." },
      { name: "Ronald Koeman", position: "Defender", note: "The captain added set-piece threat, range of passing and on-field authority." },
      { name: "Frank Rijkaard", position: "Midfielder", note: "A versatile defensive leader with vast European experience." },
      { name: "Marc Overmars", position: "Forward", note: "A rapid wide threat capable of stretching the highest defensive lines." },
    ],
    roster: roster(
      ["Ed de Goey", "Stanley Menzo", "Theo Snelders"],
      ["Frank de Boer", "Ronald Koeman", "Danny Blind", "Ulrich van Gobbel", "Arthur Numan", "Stan Valckx", "Frank Rijkaard"],
      ["Ronald de Boer", "Wim Jonk", "Rob Witschge", "Aron Winter", "Jan Wouters", "Clarence Seedorf", "Gaston Taument"],
      ["Dennis Bergkamp", "Marc Overmars", "Peter van Vossen", "Bryan Roy", "John Bosman"],
    ),
    sources,
  },
  {
    tournamentId: "usa-1994",
    teamId: "germany",
    title: "Germany’s Established Core",
    introduction:
      "Germany arrive as defending world champions, blending the core of Italia ’90 with newer attacking talent under Berti Vogts.",
    beforeTheTournament: {
      stateOfTeam:
        "Vogts retains much of the side that won in 1990 while managing gradual generational change around Matthäus and Klinsmann.",
      expectations:
        "As holders and the world’s top-ranked team, Germany are expected to remain among the leading contenders throughout.",
      majorStorylines:
        "How long the Italia ’90 spine can carry another campaign, and whether newer attackers can refresh the side, frame the German outlook.",
    },
    qualification: {
      method: "Defending champions",
      summary: "Germany qualified automatically as winners of the 1990 FIFA World Cup.",
      automaticQualifier: true,
      notableAchievements: "Entered as holders without needing to contest UEFA qualifying.",
    },
    history: {
      worldCupAppearances: 13,
      previousAppearance: "1990",
      bestFinishEntering: "Winners (1954, 1974, 1990)",
      summary:
        "Germany have reached the latter stages with exceptional consistency and return as reigning champions seeking to defend the title.",
    },
    confederation: "UEFA",
    fifaRanking: 1,
    manager: "Berti Vogts",
    captain: "Lothar Matthäus",
    tacticalIdentity: "Structured and powerful",
    style:
      "Organised, adaptable football with quality from midfield, aerial strength and set-piece threat.",
    tournamentOutlook: {
      label: "Defending champions",
      summary:
        "Ranked number one and carrying the prestige of Italia ’90, Germany enter as the standard against which other contenders are measured.",
    },
    keyPlayers: [
      { name: "Lothar Matthäus", position: "Midfielder", note: "The captain remained one of the game’s defining competitors and organisers." },
      { name: "Jürgen Klinsmann", position: "Forward", note: "A relentless forward with top-level European pedigree and movement." },
      { name: "Andreas Brehme", position: "Defender", note: "A two-footed full-back with vast tournament experience and delivery." },
      { name: "Thomas Häßler", position: "Midfielder", note: "A compact creator whose set pieces and quick feet unlocked defences." },
    ],
    roster: roster(
      ["Bodo Illgner", "Andreas Köpke", "Oliver Kahn"],
      ["Andreas Brehme", "Jürgen Kohler", "Thomas Helmer", "Guido Buchwald", "Stefan Reuter", "Martin Wagner", "Thomas Berthold"],
      ["Lothar Matthäus", "Matthias Sammer", "Thomas Häßler", "Mehmet Scholl", "Stefan Effenberg", "Mario Basler", "Andreas Möller"],
      ["Jürgen Klinsmann", "Rudi Völler", "Karl-Heinz Riedle", "Fredi Bobic", "Ulf Kirsten"],
    ),
    sources,
  },
  {
    tournamentId: "usa-1994",
    teamId: "spain",
    title: "Spain’s Technical Conviction",
    introduction:
      "Spain’s squad holds considerable club pedigree and a clear faith in composed, possession-led football under Javier Clemente.",
    beforeTheTournament: {
      stateOfTeam:
        "Clemente’s balanced group topped a difficult qualifying section and arrives with experience across every line.",
      expectations:
        "Spain are expected to navigate the group stage; whether they can finally convert talent into a defining modern tournament remains the open question.",
      majorStorylines:
        "A generation rich in La Liga quality seeks to shed the reputation of promising sides that fall short when matches tighten.",
    },
    qualification: {
      method: "UEFA Group 3 winners",
      summary: "Spain won UEFA Group 3 ahead of the Republic of Ireland and Denmark.",
      record: "8W-3D-1L",
      notableAchievements: "Group winners with nineteen points in a seven-team section.",
    },
    history: {
      worldCupAppearances: 9,
      previousAppearance: "1990",
      bestFinishEntering: "Fourth place (1950)",
      summary:
        "Spain have often arrived with talent and club pedigree but still seek a modern tournament that matches their domestic reputation.",
    },
    confederation: "UEFA",
    fifaRanking: 5,
    manager: "Javier Clemente",
    captain: "Andoni Zubizarreta",
    tacticalIdentity: "Technical control",
    style:
      "Compact organisation, composed possession and varied attacking options through midfield runners.",
    tournamentOutlook: {
      label: "Established contender",
      summary:
        "A top-five ranking and a strong qualifying campaign leave Spain among the sides expected to be present beyond the opening week.",
    },
    keyPlayers: [
      { name: "Andoni Zubizarreta", position: "Goalkeeper", note: "The captain brought enormous experience and calm to the defensive unit." },
      { name: "José Luis Caminero", position: "Midfielder", note: "An inventive attacking presence capable of arriving late in the box." },
      { name: "Fernando Hierro", position: "Defender", note: "A commanding centre-back with range of passing from the back." },
      { name: "Julio Salinas", position: "Forward", note: "A seasoned international striker trusted for movement and finishing." },
    ],
    roster: roster(
      ["Andoni Zubizarreta", "Santiago Cañizares", "Julen Lopetegui"],
      ["Fernando Hierro", "Rafael Alkorta", "Abelardo", "Sergi Barjuán", "Albert Ferrer", "Miguel Ángel Nadal", "Jorge Otero"],
      ["José Luis Caminero", "Pep Guardiola", "Guillermo Amor", "Jon Andoni Goikoetxea", "Donato", "Luis Enrique"],
      ["Julio Salinas", "Kiko", "Txiki Begiristain", "Felipe Miñambres", "José María Bakero"],
    ),
    sources,
  },
];
