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

const sources = ["FIFA World Cup squad lists", "RSSSF", "FIFA/Coca-Cola World Ranking (May 1998)"];

export const FRANCE_1998_DOSSIERS: TeamTournamentDossier[] = [
  {
    tournamentId: "france-1998",
    teamId: "france",
    title: "A Nation on Home Soil",
    introduction:
      "France prepare to host the World Cup with a gifted, diverse squad and the scrutiny that comes with home expectation after missing the previous two finals.",
    beforeTheTournament: {
      stateOfTeam:
        "Aimé Jacquet has patiently shaped a group around defensive authority, midfield control and a new generation of attackers led by Zinedine Zidane.",
      expectations:
        "A home World Cup demands a deep run; the French public will accept nothing less than a serious challenge for the latter stages.",
      majorStorylines:
        "Whether Jacquet’s cautious methods can satisfy a demanding audience, and whether Zidane can become the tournament’s creative centre, dominate the conversation.",
    },
    qualification: {
      method: "Host Nation",
      summary: "France qualified automatically as tournament hosts.",
      automaticQualifier: true,
      notableAchievements:
        "Hosting ends an eight-year absence from the finals after missing Italia ’90 and USA ’94.",
    },
    history: {
      worldCupAppearances: 10,
      previousAppearance: "1986",
      bestFinishEntering: "Third place (1958, 1986)",
      summary:
        "France produced memorable tournament teams in 1958 and 1986 but missed the two most recent World Cups. France ’98 is a tenth finals and a home return.",
    },
    confederation: "UEFA",
    fifaRanking: 18,
    manager: "Aimé Jacquet",
    captain: "Didier Deschamps",
    tacticalIdentity: "Disciplined defensive structure",
    style:
      "Compact defending, midfield control through Deschamps and Petit, and quick wide transitions into Djorkaeff and the young forwards.",
    tournamentOutlook: {
      label: "Host nation under pressure",
      summary:
        "Ranked outside the world’s top fifteen, France still carry the burden of a home tournament. Organisation and belief will be measured from the opening match.",
    },
    keyPlayers: [
      { name: "Zinedine Zidane", position: "Midfielder", note: "Juventus’s elegant playmaker was the creative reference entering the tournament." },
      { name: "Didier Deschamps", position: "Midfielder", note: "The captain supplied leadership, balance and protection in front of the defence." },
      { name: "Marcel Desailly", position: "Defender", note: "A powerful, experienced central defender with elite club pedigree." },
      { name: "Youri Djorkaeff", position: "Forward", note: "A clever second striker with international pedigree and movement between lines." },
      { name: "Lilian Thuram", position: "Defender", note: "An athletic defender equally comfortable at full-back or in central positions." },
    ],
    roster: roster(
      ["Fabien Barthez", "Bernard Lama", "Lionel Charbonnier"],
      ["Marcel Desailly", "Laurent Blanc", "Lilian Thuram", "Bixente Lizarazu", "Vincent Candela", "Frank Leboeuf", "Alain Boghossian"],
      ["Didier Deschamps", "Zinedine Zidane", "Emmanuel Petit", "Christian Karembeu", "Robert Pirès", "Bernard Diomède", "Patrick Vieira"],
      ["Youri Djorkaeff", "Stéphane Guivarc'h", "Christophe Dugarry", "Thierry Henry", "David Trezeguet"],
    ),
    sources,
  },
  {
    tournamentId: "france-1998",
    teamId: "brazil",
    title: "Brazil in France",
    introduction:
      "Brazil enter as defending world champions with a dazzling attacking cast and a squad accustomed to carrying the heaviest expectation in the game.",
    beforeTheTournament: {
      stateOfTeam:
        "Mário Zagallo blends senior winners from USA ’94 with the extraordinary talent of Ronaldo and a deep pool of creative options.",
      expectations:
        "As holders and the world’s top-ranked side, Brazil are expected to contend for the title again from the first whistle.",
      majorStorylines:
        "Whether Ronaldo’s club form translates to a World Cup stage, and how Zagallo balances flair with structure, define the pre-tournament debate.",
    },
    qualification: {
      method: "Defending champions",
      summary: "Brazil qualified automatically as winners of the 1994 FIFA World Cup.",
      automaticQualifier: true,
      notableAchievements: "Entered as holders without needing to contest CONMEBOL qualifying.",
    },
    history: {
      worldCupAppearances: 16,
      previousAppearance: "1994",
      bestFinishEntering: "Winners (1958, 1962, 1970, 1994)",
      summary:
        "Brazil’s World Cup record makes them the constant benchmark for attacking football, returning as champions seeking a fifth title.",
    },
    confederation: "CONMEBOL",
    fifaRanking: 1,
    manager: "Mário Zagallo",
    captain: "Dunga",
    tacticalIdentity: "Technical individual quality",
    style:
      "Adventurous full-backs, fast attacking combinations and individual brilliance from Ronaldo, Rivaldo and the supporting cast.",
    tournamentOutlook: {
      label: "Defending champions",
      summary:
        "Ranked number one and stocked with world-class attackers, Brazil enter as the benchmark side against which every other contender is measured.",
    },
    keyPlayers: [
      { name: "Ronaldo", position: "Forward", note: "The world’s most feared young forward after a remarkable season at Inter Milan." },
      { name: "Rivaldo", position: "Midfielder", note: "A left-footed creator with goals in him and the ability to decide tight matches." },
      { name: "Dunga", position: "Midfielder", note: "The captain set the competitive tone and protected the defensive line." },
      { name: "Roberto Carlos", position: "Defender", note: "A relentlessly attacking left-back with set-piece power." },
      { name: "Cafu", position: "Defender", note: "An energetic right-sided defender who joined attacks as a second winger." },
    ],
    roster: roster(
      ["Taffarel", "Dida", "Carlos Germano"],
      ["Cafu", "Roberto Carlos", "Aldair", "Júnior Baiano", "Gonçalves", "Zé Carlos", "André Cruz"],
      ["Dunga", "Rivaldo", "Leonardo", "César Sampaio", "Emerson", "Denílson", "Giovanni"],
      ["Ronaldo", "Bebeto", "Edmundo", "Sávio", "Zé Roberto"],
    ),
    sources,
  },
  {
    tournamentId: "france-1998",
    teamId: "croatia",
    title: "Croatia’s First World Cup",
    introduction:
      "Croatia’s first World Cup squad brings together a generation that has already made an impact in European club football for a newly independent footballing nation.",
    beforeTheTournament: {
      stateOfTeam:
        "Miroslav Blažević leads a technically gifted group built around Boban, Prosinečki and Šuker’s finishing.",
      expectations:
        "As debutants, Croatia are not expected to dominate, but their club-level talent suggests they can surprise stronger names.",
      majorStorylines:
        "A first finals as an independent nation carries national symbolism; converting Euro 1996 promise into World Cup belief is the task.",
    },
    qualification: {
      method: "UEFA play-off winners",
      summary: "Croatia finished second in UEFA Group 1 behind Denmark, then defeated Ukraine in the play-offs.",
      record: "4W-3D-1L in the group",
      notableAchievements: "Play-off winners over Ukraine after a competitive group campaign alongside Denmark and Greece.",
    },
    history: {
      worldCupAppearances: 1,
      previousAppearance: "Debut",
      bestFinishEntering: "No previous finals",
      summary:
        "This is Croatia’s first World Cup as an independent nation, though several players previously represented Yugoslavia at major tournaments.",
    },
    confederation: "UEFA",
    fifaRanking: 19,
    manager: "Miroslav Blažević",
    captain: "Zvonimir Boban",
    tacticalIdentity: "Technical midfield play",
    style:
      "Clever passing through Boban and Prosinečki, with Šuker as the clinical central reference.",
    tournamentOutlook: {
      label: "Debutants with belief",
      summary:
        "A first finals appearance comes with modest external expectation and high internal confidence in a generation already proven at club level.",
    },
    keyPlayers: [
      { name: "Davor Šuker", position: "Forward", note: "Real Madrid’s accomplished goal scorer led the line with composure and movement." },
      { name: "Zvonimir Boban", position: "Midfielder", note: "The captain was the side’s cultured heartbeat and tactical organiser." },
      { name: "Robert Prosinečki", position: "Midfielder", note: "A gifted creator with prior World Cup experience from 1990." },
      { name: "Robert Jarni", position: "Defender", note: "An attacking left-sided defender with pace and delivery from wide areas." },
    ],
    roster: roster(
      ["Dražen Ladić", "Marijan Mrmić", "Vladimir Vasilj"],
      ["Slaven Bilić", "Igor Štimac", "Robert Jarni", "Dario Šimić", "Zoran Mamić", "Igor Tudor", "Goran Jurić"],
      ["Zvonimir Boban", "Robert Prosinečki", "Aljoša Asanović", "Krunoslav Jurčić", "Niko Kovač", "Zvonimir Soldo", "Mario Stanić"],
      ["Davor Šuker", "Alen Bokšić", "Goran Vlaović", "Ardian Kozniku", "Igor Cvitanović"],
    ),
    sources,
  },
  {
    tournamentId: "france-1998",
    teamId: "netherlands",
    title: "The Dutch Talent Pool",
    introduction:
      "The Netherlands travel with an exceptional group of technical players drawn from Europe’s leading clubs and a reputation for ambitious football.",
    beforeTheTournament: {
      stateOfTeam:
        "Guus Hiddink has the challenge of arranging powerful individual talents into a coherent tournament side around Bergkamp and a rising Ajax-influenced core.",
      expectations:
        "A nation with two World Cup final appearances expects to contend again, even if the world ranking understates the squad’s quality.",
      majorStorylines:
        "Whether Hiddink can unify strong personalities, and how Bergkamp links with Kluivert and Overmars, shape Dutch anticipation.",
    },
    qualification: {
      method: "UEFA Group 7 winners",
      summary: "The Netherlands won UEFA Group 7 ahead of Belgium.",
      record: "6W-1D-1L",
      notableAchievements: "Group winners with nineteen points and a +22 goal difference.",
    },
    history: {
      worldCupAppearances: 7,
      previousAppearance: "1994",
      bestFinishEntering: "Runners-up (1974, 1978)",
      summary:
        "Dutch teams carry a rich tactical tradition and a history of reaching the final without yet claiming the world title.",
    },
    confederation: "UEFA",
    fifaRanking: 25,
    manager: "Guus Hiddink",
    captain: "Frank de Boer",
    tacticalIdentity: "Possession and interchange",
    style:
      "Positional interchange, aggressive wide attacking and technical midfield control through Davids and Seedorf.",
    tournamentOutlook: {
      label: "Dark horse",
      summary:
        "A ranking of twenty-five disguises a squad many observers rate among the tournament’s most talented. Expectation inside the Netherlands remains high.",
    },
    keyPlayers: [
      { name: "Dennis Bergkamp", position: "Forward", note: "Arsenal’s refined forward gave the attack imagination and composure." },
      { name: "Edgar Davids", position: "Midfielder", note: "A combative midfielder with elite technical quality and drive." },
      { name: "Clarence Seedorf", position: "Midfielder", note: "A powerful passer with major-club experience and range." },
      { name: "Jaap Stam", position: "Defender", note: "An imposing central defender whose physical presence set the back line." },
      { name: "Patrick Kluivert", position: "Forward", note: "A young striker with pace, power and finishing instinct." },
    ],
    roster: roster(
      ["Edwin van der Sar", "Ed de Goey", "Sander Westerveld"],
      ["Frank de Boer", "Jaap Stam", "Michael Reiziger", "Arthur Numan", "Winston Bogarde", "Giovanni van Bronckhorst", "Boudewijn Zenden"],
      ["Edgar Davids", "Clarence Seedorf", "Ronald de Boer", "Wim Jonk", "Aron Winter", "Phillip Cocu"],
      ["Dennis Bergkamp", "Patrick Kluivert", "Marc Overmars", "Jimmy Floyd Hasselbaink", "Pierre van Hooijdonk", "Roy Makaay"],
    ),
    sources,
  },
  {
    tournamentId: "france-1998",
    teamId: "italy",
    title: "Italy’s Deep Squad",
    introduction:
      "Italy arrive with a wealth of defensive mastery and several of Serie A’s most accomplished attackers under Cesare Maldini.",
    beforeTheTournament: {
      stateOfTeam:
        "Maldini balances famous veterans with a younger core after an unbeaten qualifying group and a play-off passage.",
      expectations:
        "A three-time world champion nation expects another serious challenge; defensive excellence remains the foundation.",
      majorStorylines:
        "How Roberto Baggio, Del Piero and Vieri share attacking responsibility is the central selection puzzle entering the tournament.",
    },
    qualification: {
      method: "UEFA play-off winners",
      summary: "Italy finished second in UEFA Group 2 behind England, then defeated Russia in the play-offs.",
      record: "5W-3D-0L in the group",
      notableAchievements: "Unbeaten through the group stage before securing qualification via the play-offs.",
    },
    history: {
      worldCupAppearances: 14,
      previousAppearance: "1994",
      bestFinishEntering: "Winners (1934, 1938, 1982)",
      summary:
        "Italy’s tournament history is built on outstanding defensive sides, three world titles and repeated deep runs.",
    },
    confederation: "UEFA",
    fifaRanking: 14,
    manager: "Cesare Maldini",
    captain: "Paolo Maldini",
    tacticalIdentity: "Defensive control",
    style:
      "Measured possession, organised defending and varied forward combinations depending on selection.",
    tournamentOutlook: {
      label: "Established contender",
      summary:
        "Even without a top-ten ranking, Italy’s defensive pedigree and attacking options leave them among the sides expected to endure into the knockout rounds.",
    },
    keyPlayers: [
      { name: "Paolo Maldini", position: "Defender", note: "The captain was one of football’s finest defenders and the side’s organiser." },
      { name: "Roberto Baggio", position: "Forward", note: "A celebrated creator with a unique match-winning touch in tight games." },
      { name: "Christian Vieri", position: "Forward", note: "A powerful striker in form for Atlético Madrid and a focal point up front." },
      { name: "Alessandro Del Piero", position: "Forward", note: "Juventus’s inventive forward supplied flair and set-piece threat." },
    ],
    roster: roster(
      ["Gianluca Pagliuca", "Francesco Toldo", "Gianluigi Buffon"],
      ["Paolo Maldini", "Fabio Cannavaro", "Alessandro Costacurta", "Giuseppe Bergomi", "Alessandro Nesta", "Ciro Ferrara", "Gianluca Pessotto"],
      ["Demetrio Albertini", "Dino Baggio", "Angelo Di Livio", "Luigi Di Biagio", "Diego Fuser", "Francesco Moriero"],
      ["Roberto Baggio", "Christian Vieri", "Alessandro Del Piero", "Filippo Inzaghi", "Enrico Chiesa", "Pierluigi Casiraghi"],
    ),
    sources,
  },
  {
    tournamentId: "france-1998",
    teamId: "germany",
    title: "Germany’s Transition",
    introduction:
      "Germany’s squad combines established international leaders with players representing a changing generation under Berti Vogts.",
    beforeTheTournament: {
      stateOfTeam:
        "Vogts is managing the gradual replacement of the 1990 core while leaning on Klinsmann’s leadership and Matthäus’s experience.",
      expectations:
        "A three-time world champion programme still expects to be present when the tournament becomes decisive.",
      majorStorylines:
        "Ageing icons, emerging midfielders and questions about attacking fluency frame a side in transition rather than at its peak.",
    },
    qualification: {
      method: "UEFA Group 9 winners",
      summary: "Germany won UEFA Group 9 unbeaten ahead of Ukraine and Portugal.",
      record: "6W-4D-0L",
      notableAchievements: "Group winners with twenty-two points and no defeats in ten matches.",
    },
    history: {
      worldCupAppearances: 14,
      previousAppearance: "1994",
      bestFinishEntering: "Winners (1954, 1974, 1990)",
      summary:
        "Germany have set the standard for consistency in major international tournaments and return seeking another deep campaign.",
    },
    confederation: "UEFA",
    fifaRanking: 2,
    manager: "Berti Vogts",
    captain: "Jürgen Klinsmann",
    tacticalIdentity: "Structured and physical",
    style:
      "Organised, physically strong football with experience in every line and aerial threat from Bierhoff.",
    tournamentOutlook: {
      label: "Tournament favorite",
      summary:
        "Ranked second in the world and built on tournament experience, Germany remain among the sides expected to shape the later stages.",
    },
    keyPlayers: [
      { name: "Jürgen Klinsmann", position: "Forward", note: "The captain remained a relentless leader of the line and dressing-room figure." },
      { name: "Lothar Matthäus", position: "Defender", note: "A record-setting veteran with vast tournament experience from deeper positions." },
      { name: "Oliver Kahn", position: "Goalkeeper", note: "Bayern’s forceful goalkeeper brought authority and presence." },
      { name: "Oliver Bierhoff", position: "Forward", note: "Aerial strength and penalty-area instinct gave a different attacking option." },
    ],
    roster: roster(
      ["Oliver Kahn", "Andreas Köpke", "Jens Lehmann"],
      ["Lothar Matthäus", "Jürgen Kohler", "Markus Babbel", "Thomas Linke", "Christian Wörns", "Michael Tarnat", "Jörg Heinrich"],
      ["Dietmar Hamann", "Thomas Häßler", "Andreas Möller", "Mario Basler", "Stefan Reuter", "Jens Jeremies"],
      ["Jürgen Klinsmann", "Oliver Bierhoff", "Ulf Kirsten", "Fredi Bobic", "Olaf Marschall", "Marco Bode"],
    ),
    sources,
  },
  {
    tournamentId: "france-1998",
    teamId: "argentina",
    title: "Argentina’s Attacking Identity",
    introduction:
      "Argentina bring a technically rich side with established leaders and a formidable selection of forwards after topping the CONMEBOL qualifying table.",
    beforeTheTournament: {
      stateOfTeam:
        "Daniel Passarella’s team leans on a group familiar with European football, captained by Diego Simeone and powered by Batistuta.",
      expectations:
        "A two-time world champion nation expects to contend; topping South American qualifying reinforced that belief.",
      majorStorylines:
        "Batistuta’s finishing, Ortega’s invention and Passarella’s demanding standards define the Albiceleste outlook.",
    },
    qualification: {
      method: "CONMEBOL winners",
      summary: "Argentina topped the CONMEBOL qualifying league table to secure first place among the South American entrants.",
      record: "8W-6D-2L",
      notableAchievements: "Finished first in the sixteen-match CONMEBOL table with thirty points.",
    },
    history: {
      worldCupAppearances: 12,
      previousAppearance: "1994",
      bestFinishEntering: "Winners (1978, 1986)",
      summary:
        "Argentina’s World Cup identity is shaped by two titles and a succession of great forwards, returning as one of South America’s constant powers.",
    },
    confederation: "CONMEBOL",
    fifaRanking: 6,
    manager: "Daniel Passarella",
    captain: "Diego Simeone",
    tacticalIdentity: "Aggressive midfield pressure",
    style:
      "Intense midfield pressing, technical playmakers and explosive strikers led by Batistuta.",
    tournamentOutlook: {
      label: "Tournament favorite",
      summary:
        "A top-six ranking, CONMEBOL primacy and a deep attacking pool leave Argentina among the leading contenders before kickoff.",
    },
    keyPlayers: [
      { name: "Gabriel Batistuta", position: "Forward", note: "A prolific leader of the line in his prime and Argentina’s attacking reference." },
      { name: "Ariel Ortega", position: "Midfielder", note: "A mercurial dribbler and creator capable of unlocking compact defences." },
      { name: "Juan Sebastián Verón", position: "Midfielder", note: "A gifted passer with range from deep midfield positions." },
      { name: "Diego Simeone", position: "Midfielder", note: "The captain brought intensity, authority and competitive edge." },
      { name: "Javier Zanetti", position: "Defender", note: "An athletic, dependable right-sided defender with endless running." },
    ],
    roster: roster(
      ["Carlos Roa", "Germán Burgos", "Pablo Cavallero"],
      ["Javier Zanetti", "Roberto Ayala", "José Chamot", "Nelson Vivas", "Pablo Paz", "José Basualdo"],
      ["Diego Simeone", "Fernando Redondo", "Juan Sebastián Verón", "Ariel Ortega", "Marcelo Gallardo", "Matías Almeyda", "Leonardo Astrada"],
      ["Gabriel Batistuta", "Hernán Crespo", "Claudio López", "Abel Balbo", "Claudio Caniggia"],
    ),
    sources,
  },
  {
    tournamentId: "france-1998",
    teamId: "denmark",
    title: "Denmark’s Experienced Core",
    introduction:
      "Denmark arrive with a familiar spine and two Laudrup brothers capable of deciding matches through technique after topping their qualifying group.",
    beforeTheTournament: {
      stateOfTeam:
        "Bo Johansson’s squad mixes European Championship pedigree with younger pace around a settled defensive base.",
      expectations:
        "Denmark are respected rather than favoured, but few sides will relish facing the Laudrups in open play.",
      majorStorylines:
        "Michael Laudrup’s leadership and Brian Laudrup’s invention give a second World Cup appearance unusual creative quality.",
    },
    qualification: {
      method: "UEFA Group 1 winners",
      summary: "Denmark won UEFA Group 1 ahead of Croatia and Greece.",
      record: "5W-2D-1L",
      notableAchievements: "Group winners with seventeen points in a competitive five-team section.",
    },
    history: {
      worldCupAppearances: 2,
      previousAppearance: "1986",
      bestFinishEntering: "Round of 16 (1986)",
      summary:
        "Denmark’s previous finals appearance in 1986 established a reputation for adventurous football; France ’98 is only their second World Cup.",
    },
    confederation: "UEFA",
    fifaRanking: 27,
    manager: "Bo Johansson",
    captain: "Michael Laudrup",
    tacticalIdentity: "Creative passing",
    style:
      "Inventive combination play through the Laudrups, supported by Schmeichel’s authority and an organised defensive base.",
    tournamentOutlook: {
      label: "Dark horse",
      summary:
        "A modest ranking belies Euro 1992 pedigree and two world-class creators. Denmark are an awkward draw for any group opponent.",
    },
    keyPlayers: [
      { name: "Michael Laudrup", position: "Midfielder", note: "The captain was among Europe’s most imaginative playmakers and organisers." },
      { name: "Brian Laudrup", position: "Forward", note: "A quick, inventive attacker with major tournament experience and dribbling threat." },
      { name: "Peter Schmeichel", position: "Goalkeeper", note: "A commanding goalkeeper and vocal leader from the Manchester United side." },
      { name: "Thomas Helveg", position: "Defender", note: "An energetic, technically sound full-back who joined attacks from wide areas." },
    ],
    roster: roster(
      ["Peter Schmeichel", "Mogens Krogh", "Peter Kjær"],
      ["Thomas Helveg", "Marc Rieper", "Jan Heintze", "Jes Høgh", "Jacob Laursen", "Søren Colding"],
      ["Michael Laudrup", "Thomas Gravesen", "Allan Nielsen", "Jesper Grønkjær", "Morten Wieghorst", "Stig Tøfting"],
      ["Brian Laudrup", "Ebbe Sand", "Mikkel Beck", "Peter Møller", "Martin Jørgensen"],
    ),
    sources,
  },
];
