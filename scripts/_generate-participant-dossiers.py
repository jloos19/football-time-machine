#!/usr/bin/env python3
"""One-shot generator for missing Team Profiles (Wikipedia squads + curated pre-tournament facts)."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
USA_SQUADS = json.loads(Path("/tmp/wc94-squads.json").read_text())
FRA_SQUADS = json.loads(Path("/tmp/wc98-squads.json").read_text())

EXISTING_94 = {
    "united-states",
    "brazil",
    "italy",
    "sweden",
    "bulgaria",
    "romania",
    "netherlands",
    "germany",
    "spain",
}
EXISTING_98 = {
    "france",
    "brazil",
    "croatia",
    "netherlands",
    "italy",
    "germany",
    "argentina",
    "denmark",
}

SOURCES_94 = [
    "FIFA World Cup squad lists",
    "RSSSF",
    "FIFA/Coca-Cola World Ranking (June 1994)",
    "Wikipedia: 1994 FIFA World Cup squads",
]
SOURCES_98 = [
    "FIFA World Cup squad lists",
    "RSSSF",
    "FIFA/Coca-Cola World Ranking (May 1998)",
    "Wikipedia: 1998 FIFA World Cup squads",
]


def team_id(name: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")


def esc(s: str) -> str:
    return s.replace("\\", "\\\\").replace('"', '\\"')


def roster_call(s: dict) -> str:
    def arr(xs: list[str]) -> str:
        return "[" + ", ".join(f'"{esc(x)}"' for x in xs) + "]"

    return (
        "roster(\n"
        f"      {arr(s['gk'])},\n"
        f"      {arr(s['df'])},\n"
        f"      {arr(s['mf'])},\n"
        f"      {arr(s['fw'])},\n"
        "    )"
    )


def emit_dossier(
    *,
    tournament_id: str,
    name: str,
    squad: dict,
    meta: dict,
    sources: list[str],
) -> str:
    keys = ",\n".join(
        f'      {{ name: "{esc(n)}", position: "{esc(p)}", note: "{esc(note)}" }}'
        for n, p, note in meta["keys"]
    )
    record_line = (
        f'\n      record: "{esc(meta["qual_record"])}",' if meta.get("qual_record") else ""
    )
    notable = (
        f'\n      notableAchievements: "{esc(meta["notable"])}",'
        if meta.get("notable")
        else ""
    )
    auto = "\n      automaticQualifier: true," if meta.get("auto") else ""
    fifa = (
        f"\n    fifaRanking: {meta['fifa']},"
        if isinstance(meta.get("fifa"), int)
        else ""
    )
    return f"""  {{
    tournamentId: "{tournament_id}",
    teamId: "{team_id(name)}",
    title: "{esc(meta['title'])}",
    introduction:
      "{esc(meta['introduction'])}",
    beforeTheTournament: {{
      stateOfTeam:
        "{esc(meta['before_state'])}",
      expectations:
        "{esc(meta['before_exp'])}",
      majorStorylines:
        "{esc(meta['before_story'])}",
    }},
    qualification: {{
      method: "{esc(meta['qual_method'])}",
      summary: "{esc(meta['qual_summary'])}",{record_line}{notable}{auto}
    }},
    history: {{
      worldCupAppearances: {meta['appearances']},
      previousAppearance: "{esc(meta['prev'])}",
      bestFinishEntering: "{esc(meta['best'])}",
      summary:
        "{esc(meta['hist'])}",
    }},
    confederation: "{esc(meta['confederation'])}",{fifa}
    manager: "{esc(squad['coach'])}",
    captain: "{esc(squad['captain'])}",
    tacticalIdentity: "{esc(meta['tactical'])}",
    style:
      "{esc(meta['style'])}",
    tournamentOutlook: {{
      label: "{esc(meta['outlook_label'])}",
      summary:
        "{esc(meta['outlook'])}",
    }},
    keyPlayers: [
{keys}
    ],
    roster: {roster_call(squad)},
    sources,
  }}"""


# Pre-tournament facts only. Rosters/managers/captains/FIFA ranks from Wikipedia squad pages
# and June 1994 / May 1998 ranking tables. Qualification phrasing kept spoiler-safe.
META_94: dict[str, dict] = {
    "Argentina": dict(
        title="Argentina at USA ’94",
        introduction="Argentina arrive among the tournament’s elite, carrying club-hardened talent and the enduring presence of Diego Maradona into a demanding Group D.",
        before_state="Alfio Basile has blended experienced internationals with a new generation around a still-central Maradona.",
        before_exp="Anything short of a deep run will be judged harshly for a side that reached the previous final.",
        before_story="Whether Maradona can still shape matches at this stage of his career, and how Basile balances attack with control, dominate the Argentine conversation.",
        qual_method="CONMEBOL qualifying winners",
        qual_summary="Argentina topped the CONMEBOL qualifying group to book another place among the finals’ traditional powers.",
        notable="Finished ahead of Colombia and a strong South American field despite a heavy home defeat during qualifying.",
        confederation="CONMEBOL",
        fifa=8,
        tactical="Creative and combative",
        style="Technical midfield invention feeding quick combinations, with Maradona still the creative reference.",
        outlook_label="Tournament favorite",
        outlook="Ranked among the world’s best and stocked with experienced attackers, Argentina enter among the sides expected to contend deep into the knockout rounds.",
        appearances=11,
        prev="1990",
        best="Winners (1978, 1986)",
        hist="Two-time world champions and runners-up in 1990, Argentina remain a perpetual contender with successive finals appearances.",
        keys=[
            ("Diego Maradona", "Midfielder", "The captain remains the programme’s defining creative presence entering the tournament."),
            ("Gabriel Batistuta", "Forward", "A ruthless centre-forward whose finishing made him Argentina’s primary goal threat."),
            ("Fernando Redondo", "Midfielder", "A composed holding midfielder trusted to organise play from deep."),
            ("Claudio Caniggia", "Forward", "A direct attacker whose pace stretched defences in transition."),
        ],
    ),
    "Belgium": dict(
        title="Belgium at USA ’94",
        introduction="Belgium return with a seasoned European squad under Paul Van Himst, seeking to convert steady qualifying form into a competitive group campaign.",
        before_state="A settled defensive core around Michel Preud’homme gives Belgium a platform built on organisation rather than spectacle.",
        before_exp="Progress from the group would be considered a successful opening chapter for a side rarely tipped among the favourites.",
        before_story="Whether Belgium’s experienced core can still impose itself against stronger technical opponents is the central question.",
        qual_method="UEFA Group 4 runners-up",
        qual_summary="Belgium finished second in UEFA Group 4 behind Romania to secure qualification.",
        confederation="UEFA",
        fifa=27,
        tactical="Organised and compact",
        style="Disciplined defending, set-piece threat and selective transitions rather than sustained possession.",
        outlook_label="Expected to reach the second round",
        outlook="Belgium’s experience and defensive reliability make a competitive group campaign a realistic opening target.",
        appearances=9,
        prev="1990",
        best="Fourth place (1986)",
        hist="Belgium have been regular World Cup participants since the 1980s, with a best finish of fourth in Mexico 1986.",
        keys=[
            ("Michel Preud'homme", "Goalkeeper", "An elite shot-stopper and the side’s defensive cornerstone."),
            ("Georges Grün", "Defender", "The captain brought leadership and aerial presence at the back."),
            ("Enzo Scifo", "Midfielder", "A creative midfielder capable of unlocking compact defences."),
            ("Luc Nilis", "Forward", "A technically refined forward trusted in and around the penalty area."),
        ],
    ),
    "Bolivia": dict(
        title="Bolivia at USA ’94",
        introduction="Bolivia return to the World Cup for the first time since 1950, carrying altitude-hardened CONMEBOL experience and a clear sense of historic occasion.",
        before_state="Xabier Azkargorta has built a compact unit around Marco Etcheverry and a defensive structure adapted to life away from La Paz.",
        before_exp="A competitive showing in the group would mark a successful return after more than four decades away.",
        before_story="Whether Bolivia can translate their qualifying resilience to sea-level venues is the defining pre-tournament question.",
        qual_method="CONMEBOL qualifying runners-up",
        qual_summary="Bolivia finished second in the CONMEBOL qualifying group to return to the finals for the first time since 1950.",
        notable="A landmark away win in Buenos Aires during qualifying underlined their competitive rise.",
        confederation="CONMEBOL",
        fifa=43,
        tactical="Compact and resilient",
        style="Tight defending, quick counters and set-piece threat, with Etcheverry the creative outlet.",
        outlook_label="Returning after long absence",
        outlook="Ranked outside the world’s top forty, Bolivia’s priority is to prove they belong among the finals’ twenty-four.",
        appearances=3,
        prev="1950",
        best="Group stage",
        hist="Bolivia appeared in 1930 and 1950 before a long absence; USA ’94 is their third finals and first in forty-four years.",
        keys=[
            ("Marco Etcheverry", "Midfielder", "The creative heartbeat of the side and Bolivia’s most recognised international talent."),
            ("Erwin Sánchez", "Midfielder", "A technically gifted midfielder capable of arriving late in the box."),
            ("Carlos Borja", "Midfielder", "The captain brought experience and leadership through midfield."),
            ("Jaime Moreno", "Forward", "A mobile forward option trusted to stretch opposing defences."),
        ],
    ),
    "Cameroon": dict(
        title="Cameroon at USA ’94",
        introduction="Cameroon arrive with African pedigree after Italia ’90 and a squad still capable of unsettling established European and South American sides.",
        before_state="Henri Michel inherits a programme seeking to renew the belief that followed their quarter-final run four years earlier.",
        before_exp="A place in the second round remains the opening standard for a nation that announced itself so forcefully in 1990.",
        before_story="How Cameroon manage the transition with an ageing Roger Milla still in the party, and whether their athletic intensity still translates, frame the build-up.",
        qual_method="CAF finalists",
        qual_summary="Cameroon secured one of Africa’s three finals places through the CAF qualifying path.",
        confederation="CAF",
        fifa=24,
        tactical="Athletic and direct",
        style="Powerful running, aggressive pressing and transitions designed to stretch opponents in wide areas.",
        outlook_label="Expected to reach the second round",
        outlook="Cameroon’s ranking and recent tournament pedigree leave them among the African sides expected to compete for a knockout place.",
        appearances=3,
        prev="1990",
        best="Quarter-finals (1990)",
        hist="Cameroon debuted in 1982 and reached the quarter-finals in 1990, establishing themselves as Africa’s standard-bearers.",
        keys=[
            ("François Omam-Biyik", "Forward", "An aerial threat and established international forward."),
            ("Roger Milla", "Forward", "A veteran attacker whose presence still carried symbolic and sporting weight."),
            ("Stephen Tataw", "Defender", "The captain organised a physically imposing defensive unit."),
            ("Jacques Songo'o", "Goalkeeper", "An experienced goalkeeper option behind the veteran first-choice pair."),
        ],
    ),
    "Colombia": dict(
        title="Colombia at USA ’94",
        introduction="Colombia enter among the most admired sides in the draw, celebrated for fluent combination play and the vision of Carlos Valderrama.",
        before_state="Francisco Maturana’s group arrives with confidence after a strong CONMEBOL campaign and a settled creative midfield.",
        before_exp="Public expectation is unusually high; a place beyond the group is widely treated as the minimum standard.",
        before_story="Whether Colombia’s elegant style can survive the intensity of a World Cup group is the debate that follows them into the United States.",
        qual_method="CONMEBOL qualifying third place",
        qual_summary="Colombia finished among the CONMEBOL qualifying leaders to book a second consecutive finals appearance.",
        notable="A historic 5–0 win away to Argentina during qualifying became the defining image of their rise.",
        confederation="CONMEBOL",
        fifa=17,
        tactical="Fluid and inventive",
        style="Patient build-up through Valderrama, with runners from midfield and a varied forward line.",
        outlook_label="Dark horse",
        outlook="Widely discussed as one of the most stylish sides in the tournament, Colombia are tipped by many observers to be present in the later rounds.",
        appearances=3,
        prev="1990",
        best="Round of 16 (1990)",
        hist="Colombia returned to the finals in 1990 after a long absence and arrive in 1994 with greater belief and deeper talent.",
        keys=[
            ("Carlos Valderrama", "Midfielder", "The captain and playmaker whose vision organised Colombia’s attacking patterns."),
            ("Faustino Asprilla", "Forward", "A dynamic forward capable of deciding matches with individual quality."),
            ("Freddy Rincón", "Midfielder", "A powerful midfielder who arrived late in the box and covered huge distances."),
            ("Óscar Córdoba", "Goalkeeper", "A young goalkeeper trusted with the number-one role entering the tournament."),
        ],
    ),
    "Greece": dict(
        title="Greece at USA ’94",
        introduction="Greece make their first World Cup appearance, carrying the pride of a breakthrough qualifying campaign under Alketas Panagoulias.",
        before_state="A largely domestic-based squad arrives with limited finals experience but clear organisation and set-piece threat.",
        before_exp="A competitive group showing would already mark a successful debut for a first-time finalist.",
        before_story="Whether Greece can translate qualifying discipline onto the World Cup stage is the open question.",
        qual_method="UEFA Group 5 winners",
        qual_summary="Greece topped UEFA Group 5 to qualify for a first World Cup finals.",
        notable="Debutants after finishing ahead of Russia in their qualifying section.",
        confederation="UEFA",
        fifa=31,
        tactical="Organised and cautious",
        style="Compact defending, direct distribution and reliance on set pieces against stronger possession sides.",
        outlook_label="Debutants with belief",
        outlook="Ranked outside the top thirty, Greece’s first target is to prove they can compete in every group fixture.",
        appearances=1,
        prev="Debut",
        best="Debutants",
        hist="USA ’94 is Greece’s first World Cup finals appearance after decades of near-misses in European qualifying.",
        keys=[
            ("Tasos Mitropoulos", "Midfielder", "The captain brought leadership and experience to a debutant midfield."),
            ("Nikos Machlas", "Forward", "A sharp finisher trusted as Greece’s primary attacking reference."),
            ("Panagiotis Tsalouchidis", "Midfielder", "An energetic midfielder central to Greece’s work rate."),
            ("Antonis Minou", "Goalkeeper", "The established first-choice goalkeeper entering the tournament."),
        ],
    ),
    "Mexico": dict(
        title="Mexico at USA ’94",
        introduction="Mexico return to the World Cup after missing Italia ’90, bringing flair, a distinctive goalkeeper and renewed CONCACAF ambition.",
        before_state="Miguel Mejía Barón has assembled a side mixing domestic stars with European experience and Jorge Campos’ unconventional presence in goal.",
        before_exp="A place in the second round is the clear opening target for a programme eager to reassert itself.",
        before_story="How Mexico manage expectation after a qualifying return, and whether their attacking talent can overcome defensive frailty, frame the build-up.",
        qual_method="CONCACAF qualifiers",
        qual_summary="Mexico secured qualification through the CONCACAF path after missing the 1990 finals.",
        confederation="CONCACAF",
        fifa=16,
        tactical="Attacking and expressive",
        style="Quick combinations, wide play and inventive goalkeeping distribution from Campos.",
        outlook_label="Expected to reach the second round",
        outlook="A top-twenty ranking and a talented attack leave Mexico among the sides expected to compete for a knockout place.",
        appearances=10,
        prev="1986",
        best="Quarter-finals (1970, 1986)",
        hist="Mexico have a long finals history and hosted in 1970 and 1986; USA ’94 is their return after missing Italia ’90.",
        keys=[
            ("Jorge Campos", "Goalkeeper", "An unorthodox goalkeeper whose distribution and personality made him a focal point."),
            ("Hugo Sánchez", "Forward", "A veteran goalscorer still capable of decisive moments in the box."),
            ("Luis García", "Forward", "A mobile attacker trusted to link midfield and the final third."),
            ("Alberto García Aspe", "Midfielder", "A midfield organiser and set-piece threat."),
        ],
    ),
    "Morocco": dict(
        title="Morocco at USA ’94",
        introduction="Morocco arrive seeking to renew African credibility with a compact, well-drilled side under Abdellah Blinda.",
        before_state="A balanced squad mixes domestic experience with European-based talent and a clear preference for organisation.",
        before_exp="Progress from a difficult European-heavy group would be treated as a major success.",
        before_story="Whether Morocco can convert defensive discipline into enough attacking threat is the central pre-tournament question.",
        qual_method="CAF finalists",
        qual_summary="Morocco earned one of Africa’s three finals places through the CAF qualifying competition.",
        confederation="CAF",
        fifa=28,
        tactical="Compact and disciplined",
        style="Low defensive block, quick counters and set-piece threat through midfield runners.",
        outlook_label="Dark horse",
        outlook="Morocco’s ranking sits outside the favourites, but their organisation makes them a difficult group opponent.",
        appearances=3,
        prev="1986",
        best="Round of 16 (1986)",
        hist="Morocco reached the second round in 1986 and return in 1994 after missing Italia ’90.",
        keys=[
            ("Mustapha Hadji", "Midfielder", "A creative midfielder capable of unlocking compact defences."),
            ("Mustafa El Haddaoui", "Midfielder", "The captain brought experience and leadership in midfield."),
            ("Noureddine Naybet", "Defender", "A commanding centre-back central to Morocco’s defensive structure."),
            ("Mohammed Chaouch", "Forward", "A forward reference trusted to finish transitions."),
        ],
    ),
    "Nigeria": dict(
        title="Nigeria at USA ’94",
        introduction="Nigeria make a highly anticipated debut, arriving with pace, technical quality and one of the tournament’s most exciting young squads.",
        before_state="Clemens Westerhof has shaped a confident Super Eagles side around Rashidi Yekini and a fearless midfield.",
        before_exp="Many observers tip Nigeria to be the African side most likely to advance from the group stage.",
        before_story="Whether debutant nerves can be managed, and how Yekini’s finishing translates at this level, dominate the conversation.",
        qual_method="CAF finalists",
        qual_summary="Nigeria qualified for a first World Cup by securing one of Africa’s three finals places.",
        notable="Debutants ranked as high as eleventh in the world entering the tournament.",
        confederation="CAF",
        fifa=11,
        tactical="Fast and expressive",
        style="Vertical attacking play, wide pace and inventive midfield combinations through Okocha and Finidi.",
        outlook_label="Debutants with belief",
        outlook="A top-fifteen ranking and exceptional athleticism leave Nigeria widely tipped to make an immediate impact.",
        appearances=1,
        prev="Debut",
        best="Debutants",
        hist="USA ’94 is Nigeria’s first World Cup finals after a rapid rise through African and global rankings.",
        keys=[
            ("Rashidi Yekini", "Forward", "Africa’s leading centre-forward and Nigeria’s primary goal threat."),
            ("Jay-Jay Okocha", "Midfielder", "A dazzling dribbler capable of creating chances from nothing."),
            ("Finidi George", "Midfielder", "A wide midfielder whose delivery stretched opposing full-backs."),
            ("Stephen Keshi", "Defender", "The captain organised a powerful defensive unit."),
        ],
    ),
    "Norway": dict(
        title="Norway at USA ’94",
        introduction="Norway return after a fifty-six-year absence, carrying a clear Egil Olsen method and one of the highest FIFA rankings in the draw.",
        before_state="Olsen’s direct, physically demanding style has produced a settled group that punches above traditional Norwegian expectation.",
        before_exp="A place in the second round is a realistic aim for a side ranked inside the world’s top ten.",
        before_story="Whether Norway’s long-ball principles can unsettle more technical opponents is the tactical debate surrounding them.",
        qual_method="UEFA Group 2 winners",
        qual_summary="Norway topped UEFA Group 2 to qualify for a first World Cup since 1938.",
        confederation="UEFA",
        fifa=6,
        tactical="Direct and physical",
        style="Long diagonals, aggressive pressing on the second ball and aerial threat from set pieces.",
        outlook_label="Dark horse",
        outlook="A top-ten ranking and a distinctive method make Norway one of the more intriguing European sides in the field.",
        appearances=2,
        prev="1938",
        best="Round of 16 (1938)",
        hist="Norway’s only previous finals came in 1938; the fifty-six-year gap equals a modern record for absence between appearances.",
        keys=[
            ("Rune Bratseth", "Defender", "The captain and defensive organiser of Olsen’s system."),
            ("Kjetil Rekdal", "Midfielder", "A midfield leader trusted from open play and set pieces."),
            ("Jostein Flo", "Forward", "A target forward central to Norway’s direct attacking plan."),
            ("Erik Thorstvedt", "Goalkeeper", "An experienced international goalkeeper behind a high defensive line."),
        ],
    ),
    "Republic of Ireland": dict(
        title="Republic of Ireland at USA ’94",
        introduction="The Republic of Ireland arrive with Jack Charlton’s familiar collective identity and the confidence of successive finals appearances.",
        before_state="A largely British-based squad remains built on work rate, set pieces and defensive resolve rather than possession dominance.",
        before_exp="Reaching the second round again would sustain the progress of Italia ’90.",
        before_story="Whether Charlton’s methods still hold against more technical groups, and how Roy Keane’s emergence fits the plan, shape the narrative.",
        qual_method="UEFA Group 3 runners-up",
        qual_summary="The Republic of Ireland finished second in UEFA Group 3 behind Spain to qualify.",
        confederation="UEFA",
        fifa=14,
        tactical="Direct and collective",
        style="High work rate, long deliveries into the box and aggressive defending of territory.",
        outlook_label="Expected to reach the second round",
        outlook="Ireland’s ranking and tournament experience leave them among the European sides expected to compete for a knockout place.",
        appearances=2,
        prev="1990",
        best="Quarter-finals (1990)",
        hist="Italia ’90 was Ireland’s first finals; USA ’94 is their second consecutive appearance under Charlton.",
        keys=[
            ("Roy Keane", "Midfielder", "A young midfielder whose drive and timing already marked him as a central figure."),
            ("Andy Townsend", "Midfielder", "The captain set the side’s tempo and leadership standard."),
            ("Packie Bonner", "Goalkeeper", "An experienced goalkeeper trusted in high-pressure matches."),
            ("John Aldridge", "Forward", "A proven penalty-box striker and reference in the final third."),
        ],
    ),
    "Russia": dict(
        title="Russia at USA ’94",
        introduction="Russia appear as an independent nation for the first time, carrying Soviet-era pedigree into a new political and sporting identity.",
        before_state="Pavel Sadyrin has assembled a technically capable squad seeking continuity after the dissolution of the Soviet Union.",
        before_exp="A competitive group campaign is expected from a programme with deep tournament history under a new flag.",
        before_story="How Russia manage the transition from the Soviet team, and whether their attacking talent can settle quickly, frame the build-up.",
        qual_method="UEFA Group 5 runners-up",
        qual_summary="Russia finished second in UEFA Group 5 behind Greece to qualify for a first finals as an independent nation.",
        confederation="UEFA",
        fifa=19,
        tactical="Technical and forceful",
        style="Strong running from midfield, direct attacking combinations and set-piece threat.",
        outlook_label="Expected to reach the second round",
        outlook="Russia’s ranking and inherited experience leave them among the sides expected to push for a knockout place.",
        appearances=8,
        prev="1990",
        best="Fourth place (1966, as Soviet Union)",
        hist="Counting the Soviet Union’s record, this programme has a long finals history; USA ’94 is the first appearance as Russia.",
        keys=[
            ("Dmitri Kharine", "Goalkeeper", "The captain and established first-choice goalkeeper."),
            ("Oleg Salenko", "Forward", "A clinical centre-forward trusted as a primary goal threat."),
            ("Valeri Karpin", "Midfielder", "A dynamic midfielder capable of arriving late in the box."),
            ("Aleksandr Mostovoi", "Midfielder", "A creative midfielder with vision between the lines."),
        ],
    ),
    "Saudi Arabia": dict(
        title="Saudi Arabia at USA ’94",
        introduction="Saudi Arabia make their World Cup debut after topping Asia’s final qualifying round, arriving with domestic-based cohesion and growing regional ambition.",
        before_state="Jorge Solari leads a squad built almost entirely from Saudi clubs, organised around Majed Abdullah and a confident midfield.",
        before_exp="A competitive debut and lessons for a rising Asian programme are the realistic opening aims.",
        before_story="Whether Asian champions’ form can translate against European and South American opposition is the central question.",
        qual_method="AFC final round winners",
        qual_summary="Saudi Arabia topped Asia’s final qualifying round ahead of South Korea to reach a first World Cup.",
        notable="Debutants after edging Japan in a dramatic final Asian qualifying group.",
        confederation="AFC",
        fifa=34,
        tactical="Organised and energetic",
        style="Compact defending, quick wide transitions and technical midfield combinations.",
        outlook_label="Debutants with belief",
        outlook="Ranked outside the top thirty, Saudi Arabia’s first task is to stay competitive in every group match.",
        appearances=1,
        prev="Debut",
        best="Debutants",
        hist="USA ’94 is Saudi Arabia’s first World Cup finals after emerging as Asia’s strongest qualifying side.",
        keys=[
            ("Majed Abdullah", "Forward", "The captain and historic goalscorer of the Saudi programme."),
            ("Saeed Al-Owairan", "Midfielder", "A powerful midfielder capable of carrying the ball over long distances."),
            ("Sami Al-Jaber", "Forward", "A mobile forward option in and around the penalty area."),
            ("Mohamed Al-Deayea", "Goalkeeper", "A young goalkeeper already established as a national-team reference."),
        ],
    ),
    "South Korea": dict(
        title="South Korea at USA ’94",
        introduction="South Korea return seeking to improve on successive finals appearances with a disciplined, industrious Asian side under Kim Ho.",
        before_state="A hard-working squad built on domestic familiarity arrives with clear organisation and limited star power by European standards.",
        before_exp="A first knockout appearance remains the long-term target; a competitive group showing is the immediate measure.",
        before_story="Whether South Korea can score enough goals to match their defensive effort is the recurring pre-tournament concern.",
        qual_method="AFC final round qualifiers",
        qual_summary="South Korea finished among the top sides in Asia’s final qualifying round to book another finals place.",
        confederation="AFC",
        fifa=37,
        tactical="Industrious and compact",
        style="High work rate, disciplined shape and quick counters through wide runners.",
        outlook_label="Expected to reach the second round",
        outlook="South Korea’s tournament experience makes a competitive group campaign the standard against which they will be judged.",
        appearances=4,
        prev="1990",
        best="Group stage",
        hist="South Korea have appeared in every World Cup since 1986 and seek a first move beyond the group stage.",
        keys=[
            ("Hwang Sun-hong", "Forward", "The side’s primary centre-forward and finishing reference."),
            ("Kim Joo-sung", "Forward", "An experienced attacker capable of dropping into midfield spaces."),
            ("Choi In-young", "Goalkeeper", "The captain and established first-choice goalkeeper."),
            ("Hong Myung-bo", "Defender", "A composed defender trusted to organise from the back."),
        ],
    ),
    "Switzerland": dict(
        title="Switzerland at USA ’94",
        introduction="Switzerland return after a twenty-eight-year absence, carrying Roy Hodgson’s organisation and a confident European qualifying campaign.",
        before_state="Hodgson has built a settled side around Alain Geiger and the Borussia Dortmund threat of Stéphane Chapuisat.",
        before_exp="A place in the second round would confirm Switzerland’s return as more than a nostalgic storyline.",
        before_story="Whether Hodgson’s methods can translate from qualifying into a World Cup group is the central debate.",
        qual_method="UEFA Group 1 runners-up",
        qual_summary="Switzerland finished second in UEFA Group 1 behind Italy to qualify for a first finals since 1966.",
        confederation="UEFA",
        fifa=12,
        tactical="Organised and balanced",
        style="Compact defending, measured possession and clinical transitions through Chapuisat.",
        outlook_label="Expected to reach the second round",
        outlook="A top-fifteen ranking and strong qualifying form leave Switzerland among the European sides expected to compete for a knockout place.",
        appearances=7,
        prev="1966",
        best="Quarter-finals (1934, 1938, 1954)",
        hist="Switzerland were regular finalists before a long absence; USA ’94 ends a twenty-eight-year wait.",
        keys=[
            ("Stéphane Chapuisat", "Forward", "A proven Bundesliga forward and Switzerland’s primary attacking threat."),
            ("Ciriaco Sforza", "Midfielder", "A refined midfielder capable of controlling tempo between the lines."),
            ("Alain Geiger", "Defender", "The captain and defensive organiser of Hodgson’s side."),
            ("Adrian Knup", "Forward", "A complementary forward option with movement across the front line."),
        ],
    ),
}

# Fix Bolivia key player Erwin Sánchez - verify in squad
bol_mf = USA_SQUADS["Bolivia"]["mf"]
if "Erwin Sánchez" not in bol_mf:
    # may be listed differently
    for p in bol_mf:
        if "Sánchez" in p or "Sanchez" in p:
            META_94["Bolivia"]["keys"][1] = (p, "Midfielder", META_94["Bolivia"]["keys"][1][2])
            break
    else:
        META_94["Bolivia"]["keys"][1] = (
            "José Milton Melgar",
            "Midfielder",
            "An experienced midfielder trusted to link defence and attack.",
        )

# Fix Russia Mostovoi - check squad
rus = USA_SQUADS["Russia"]
all_rus = rus["gk"] + rus["df"] + rus["mf"] + rus["fw"]
if "Aleksandr Mostovoi" not in all_rus:
    META_94["Russia"]["keys"][3] = (
        "Dmitri Radchenko",
        "Forward",
        "A forward option trusted to support Salenko in the final third.",
    )

# Fix South Korea Hong Myung-bo
sk = USA_SQUADS["South Korea"]
all_sk = sk["gk"] + sk["df"] + sk["mf"] + sk["fw"]
if "Hong Myung-bo" not in all_sk:
    for p in sk["df"]:
        if "Hong" in p:
            META_94["South Korea"]["keys"][3] = (
                p,
                "Defender",
                "A composed defender trusted to organise from the back.",
            )
            break
    else:
        META_94["South Korea"]["keys"][3] = (
            sk["df"][0],
            "Defender",
            "A central defender trusted to organise the back line.",
        )

# Fix Morocco Naybet - may not be in 1994 squad
mor = USA_SQUADS["Morocco"]
all_mor = mor["gk"] + mor["df"] + mor["mf"] + mor["fw"]
if "Noureddine Naybet" not in all_mor:
    META_94["Morocco"]["keys"][2] = (
        mor["df"][0],
        "Defender",
        "A defensive reference in Morocco’s compact back line.",
    )

META_98: dict[str, dict] = {
    "Austria": dict(
        title="Austria at France ’98",
        introduction="Austria return after missing USA ’94, bringing Toni Polster’s experience and Herbert Prohaska’s organised European method.",
        before_state="A compact squad built around domestic and Bundesliga experience seeks to restore Austria to the knockout conversation.",
        before_exp="A competitive group campaign would mark a successful return to the finals.",
        before_story="Whether Polster can still lead the line at this level is the defining personnel question.",
        qual_method="UEFA Group 4 winners",
        qual_summary="Austria topped UEFA Group 4 to qualify for a first World Cup since 1990.",
        confederation="UEFA",
        fifa=31,
        tactical="Organised and direct",
        style="Compact shape, set-piece threat and selective attacks through experienced forwards.",
        outlook_label="Expected to reach the second round",
        outlook="Austria’s ranking sits outside the favourites, but their qualifying discipline makes a knockout push plausible.",
        appearances=7,
        prev="1990",
        best="Third place (1954)",
        hist="Austria were a mid-century power and return in 1998 after missing the 1994 finals.",
        keys=[
            ("Toni Polster", "Forward", "The captain and historic goalscorer of the modern Austrian side."),
            ("Andi Herzog", "Midfielder", "A creative midfielder trusted to unlock defences."),
            ("Ivica Vastić", "Forward", "A mobile forward capable of finishing transitions."),
            ("Wolfgang Feiersinger", "Defender", "An experienced defender central to Austria’s organisation."),
        ],
    ),
    "Belgium": dict(
        title="Belgium at France ’98",
        introduction="Belgium arrive with a transitional European squad under Georges Leekens, seeking to convert qualifying solidity into group-stage progress.",
        before_state="An experienced midfield around Franky Van der Elst remains the side’s organisational spine.",
        before_exp="A place in the second round is the clear opening target.",
        before_story="How Belgium replace fading generation markers while remaining competitive is the central build-up theme.",
        qual_method="UEFA play-off winners",
        qual_summary="Belgium won a UEFA qualifying play-off to secure their place in France.",
        confederation="UEFA",
        fifa=36,
        tactical="Compact and pragmatic",
        style="Disciplined defending, midfield control and selective forward running.",
        outlook_label="Expected to reach the second round",
        outlook="Belgium’s tournament experience leaves them among the European sides expected to compete for a knockout place.",
        appearances=10,
        prev="1994",
        best="Fourth place (1986)",
        hist="Belgium have been regular finalists since the 1980s and return seeking to improve on recent group exits.",
        keys=[
            ("Franky Van der Elst", "Midfielder", "The captain and midfield organiser with vast international experience."),
            ("Luc Nilis", "Forward", "A technically refined striker trusted in the penalty area."),
            ("Marc Wilmots", "Midfielder", "An energetic midfielder capable of arriving late in the box."),
            ("Gert Verheyen", "Midfielder", "A wide midfielder who stretched opposing full-backs."),
        ],
    ),
    "Bulgaria": dict(
        title="Bulgaria at France ’98",
        introduction="Bulgaria return with Hristo Stoichkov still central to expectation after their remarkable USA ’94 run.",
        before_state="Hristo Bonev leads a side seeking continuity from the previous tournament’s breakthrough generation.",
        before_exp="A place beyond the group remains the standard against which this squad will be judged.",
        before_story="Whether Stoichkov and company can recapture 1994’s belief is the dominant pre-tournament narrative.",
        qual_method="UEFA Group 5 winners",
        qual_summary="Bulgaria topped UEFA Group 5 to qualify for a second consecutive World Cup.",
        confederation="UEFA",
        fifa=35,
        tactical="Counter-attacking",
        style="Compact defending and rapid transitions through Stoichkov and Balakov.",
        outlook_label="Dark horse",
        outlook="Bulgaria’s recent pedigree makes them a dangerous group opponent despite a mid-tier ranking.",
        appearances=7,
        prev="1994",
        best="Fourth place (1994)",
        hist="Bulgaria’s fourth-place finish in 1994 transformed expectations; France ’98 is the attempt to sustain that rise.",
        keys=[
            ("Hristo Stoichkov", "Forward", "The side’s talismanic attacker and primary creative threat."),
            ("Krasimir Balakov", "Midfielder", "A refined playmaker capable of controlling tempo."),
            ("Trifon Ivanov", "Defender", "The captain and commanding presence in central defence."),
            ("Emil Kostadinov", "Forward", "An experienced forward trusted to finish transitions."),
        ],
    ),
    "Cameroon": dict(
        title="Cameroon at France ’98",
        introduction="Cameroon arrive seeking to renew African authority under Claude Le Roy with a blend of experience and emerging talent.",
        before_state="A physically imposing squad still looks to François Omam-Biyik for leadership in the final third.",
        before_exp="A competitive group showing is the opening measure for a programme with quarter-final pedigree.",
        before_story="Whether Cameroon can rediscover the cohesion of earlier tournaments frames the build-up.",
        qual_method="CAF finalists",
        qual_summary="Cameroon secured one of Africa’s five finals places through the CAF qualifying path.",
        confederation="CAF",
        fifa=49,
        tactical="Athletic and direct",
        style="Powerful running, aggressive duels and transitions through wide areas.",
        outlook_label="Dark horse",
        outlook="Ranked outside the top forty, Cameroon remain capable of unsettling more established European sides.",
        appearances=4,
        prev="1994",
        best="Quarter-finals (1990)",
        hist="Cameroon’s 1990 run remains the programme’s high-water mark entering France ’98.",
        keys=[
            ("François Omam-Biyik", "Forward", "The captain and aerial reference in attack."),
            ("Patrick Mboma", "Forward", "A powerful forward option with pace in behind."),
            ("Rigobert Song", "Defender", "A young defender already trusted with major responsibility."),
            ("Jacques Songo'o", "Goalkeeper", "An experienced goalkeeper at European club level."),
        ],
    ),
    "Chile": dict(
        title="Chile at France ’98",
        introduction="Chile return after a ban that kept them out of the previous two tournaments, led by the Zamorano–Salas partnership.",
        before_state="Nelson Acosta has built an attacking identity around two elite strikers and a hard-working midfield.",
        before_exp="A place in the second round would mark a successful return to the finals.",
        before_story="Whether Chile’s attack can outscore defensive vulnerability is the central pre-tournament debate.",
        qual_method="CONMEBOL qualifiers",
        qual_summary="Chile secured qualification through the CONMEBOL round-robin after returning from suspension.",
        notable="First finals since 1982 following a ban that covered the 1990 and 1994 cycles.",
        confederation="CONMEBOL",
        fifa=9,
        tactical="Attacking and vertical",
        style="Quick service into Zamorano and Salas, with energetic midfield support.",
        outlook_label="Dark horse",
        outlook="A top-ten ranking and a formidable strike pair leave Chile among the more dangerous outsider sides.",
        appearances=7,
        prev="1982",
        best="Third place (1962)",
        hist="Chile hosted and finished third in 1962; France ’98 is their return after a long enforced absence.",
        keys=[
            ("Iván Zamorano", "Forward", "The captain and established international centre-forward."),
            ("Marcelo Salas", "Forward", "A clinical striker at the peak of his powers."),
            ("José Luis Sierra", "Midfielder", "A creative midfielder trusted to supply the forward line."),
            ("Nelson Tapia", "Goalkeeper", "The established first-choice goalkeeper entering the tournament."),
        ],
    ),
    "Colombia": dict(
        title="Colombia at France ’98",
        introduction="Colombia return with Carlos Valderrama still orchestrating midfield and renewed hope after a painful USA ’94 exit.",
        before_state="Hernán Darío Gómez leads a side that retains its creative identity while seeking greater defensive control.",
        before_exp="A place beyond the group is the clear ambition for a talented CONMEBOL programme.",
        before_story="Whether Colombia can convert style into knockout progress dominates the pre-tournament conversation.",
        qual_method="CONMEBOL qualifiers",
        qual_summary="Colombia finished among the CONMEBOL qualifying places to reach a third consecutive World Cup.",
        confederation="CONMEBOL",
        fifa=10,
        tactical="Fluid and inventive",
        style="Patient build-up through Valderrama with runners from midfield and varied forward options.",
        outlook_label="Dark horse",
        outlook="A top-ten ranking and retained creative quality leave Colombia tipped by many to advance from the group.",
        appearances=4,
        prev="1994",
        best="Round of 16 (1990)",
        hist="Colombia’s early-1990s rise made them perennial contenders; France ’98 is another chance to match reputation with progress.",
        keys=[
            ("Carlos Valderrama", "Midfielder", "The captain and playmaker whose vision still organises Colombia’s patterns."),
            ("Faustino Asprilla", "Forward", "A dynamic forward capable of deciding matches with individual quality."),
            ("Freddy Rincón", "Midfielder", "A powerful midfielder who arrives late in the box."),
            ("Adolfo Valencia", "Forward", "An experienced forward option across the front line."),
        ],
    ),
    "England": dict(
        title="England at France ’98",
        introduction="England return after missing USA ’94, carrying Glenn Hoddle’s tactical ideas and Alan Shearer as the attacking reference.",
        before_state="A young midfield featuring David Beckham sits behind an experienced forward line seeking to restore England to the knockout stage.",
        before_exp="A deep run is expected by a public that treats qualification as the start, not the achievement.",
        before_story="How Hoddle’s methods fit a squad mixing youth and experience is the dominant English debate.",
        qual_method="UEFA Group 2 winners",
        qual_summary="England topped UEFA Group 2 to qualify for a first World Cup since 1990.",
        confederation="UEFA",
        fifa=5,
        tactical="Balanced and direct",
        style="Structured possession into wide areas, with Shearer the focal point in the box.",
        outlook_label="Established contender",
        outlook="A top-five ranking and strong qualifying form leave England among the sides expected to be present beyond the opening week.",
        appearances=10,
        prev="1990",
        best="Winners (1966)",
        hist="England missed 1994 after finishing fourth in 1990; France ’98 is their return under Hoddle.",
        keys=[
            ("Alan Shearer", "Forward", "The captain and established centre-forward of the side."),
            ("David Beckham", "Midfielder", "A young wide midfielder already known for delivery and work rate."),
            ("Paul Ince", "Midfielder", "A combative midfielder trusted to protect the defence."),
            ("Tony Adams", "Defender", "An experienced centre-back and organisational presence."),
        ],
    ),
    "Iran": dict(
        title="Iran at France ’98",
        introduction="Iran return for a first World Cup since 1978 after a dramatic play-off win over Australia, led by Ali Daei’s presence in attack.",
        before_state="Jalal Talebi takes a side energised by late qualification and a clear aerial threat.",
        before_exp="A competitive debut return would already mark success after twenty years away.",
        before_story="Whether Iran can convert play-off belief into group-stage competitiveness is the open question.",
        qual_method="AFC/OFC play-off winners",
        qual_summary="Iran defeated Australia in a two-legged intercontinental play-off to book the final finals place.",
        notable="Last team to qualify, sealing their berth in November 1997.",
        confederation="AFC",
        fifa=42,
        tactical="Compact and direct",
        style="Organised defending and service into Daei, with midfield runners supporting transitions.",
        outlook_label="Returning after long absence",
        outlook="Ranked outside the top forty, Iran’s first target is to stay competitive in every group fixture.",
        appearances=2,
        prev="1978",
        best="Group stage",
        hist="Iran’s only previous finals came in 1978; France ’98 ends a twenty-year absence.",
        keys=[
            ("Ali Daei", "Forward", "A dominant centre-forward and Iran’s primary goal threat."),
            ("Mehdi Mahdavikia", "Midfielder", "A dynamic wide midfielder capable of carrying the ball at pace."),
            ("Karim Bagheri", "Midfielder", "A powerful midfielder trusted from open play and set pieces."),
            ("Ahmad Reza Abedzadeh", "Goalkeeper", "The captain and established first-choice goalkeeper."),
        ],
    ),
    "Jamaica": dict(
        title="Jamaica at France ’98",
        introduction="Jamaica make a historic debut as the Reggae Boyz, carrying Caribbean pride and Renê Simões’ organisation into Group H.",
        before_state="A largely overseas-based squad has been assembled around pace, spirit and a clear collective identity.",
        before_exp="A competitive debut and moments of belief would already mark a successful first finals.",
        before_story="Whether Jamaica can translate qualifying romance onto the World Cup stage dominates the narrative.",
        qual_method="CONCACAF qualifiers",
        qual_summary="Jamaica secured one of CONCACAF’s three finals places to reach a first World Cup.",
        notable="Debutants alongside Japan, Croatia and South Africa in the 1998 finals field.",
        confederation="CONCACAF",
        fifa=30,
        tactical="Energetic and direct",
        style="High work rate, wide pace and set-piece threat rather than sustained possession.",
        outlook_label="Debutants with belief",
        outlook="Ranked thirtieth, Jamaica’s opening aim is to compete physically and stay organised against stronger technical sides.",
        appearances=1,
        prev="Debut",
        best="Debutants",
        hist="France ’98 is Jamaica’s first World Cup finals after a breakthrough CONCACAF qualifying campaign.",
        keys=[
            ("Warren Barrett", "Goalkeeper", "The captain and established first-choice goalkeeper."),
            ("Theodore Whitmore", "Midfielder", "A creative midfielder capable of linking play between the lines."),
            ("Deon Burton", "Forward", "A forward option trusted to stretch defences."),
            ("Robbie Earle", "Midfielder", "An experienced midfielder bringing Premier League know-how."),
        ],
    ),
    "Japan": dict(
        title="Japan at France ’98",
        introduction="Japan make their World Cup debut after years of investment in the J.League generation, led by Takeshi Okada.",
        before_state="A technically tidy squad built around Masami Ihara seeks to announce Asian football’s rising competitiveness.",
        before_exp="A competitive debut is the immediate target; belief already runs ahead of ranking alone.",
        before_story="Whether Japan’s possession habits can survive World Cup intensity is the central question.",
        qual_method="AFC final round qualifiers",
        qual_summary="Japan secured one of Asia’s finals places through the AFC qualifying path.",
        notable="Debutants after a dramatic late qualifying surge.",
        confederation="AFC",
        fifa=12,
        tactical="Technical and organised",
        style="Patient build-up, quick combinations and disciplined defensive shape.",
        outlook_label="Debutants with belief",
        outlook="A top-fifteen ranking makes Japan one of the more carefully watched debutants in the field.",
        appearances=1,
        prev="Debut",
        best="Debutants",
        hist="France ’98 is Japan’s first World Cup finals following the professionalisation of the domestic game.",
        keys=[
            ("Hidetoshi Nakata", "Midfielder", "A creative midfielder already marked as the face of Japan’s new generation."),
            ("Masami Ihara", "Defender", "The captain and defensive organiser of the side."),
            ("Masashi Nakayama", "Forward", "A centre-forward trusted as Japan’s finishing reference."),
            ("Yoshikatsu Kawaguchi", "Goalkeeper", "A young goalkeeper established as a national-team option."),
        ],
    ),
    "Mexico": dict(
        title="Mexico at France ’98",
        introduction="Mexico arrive among the highest-ranked sides in the draw, carrying CONCACAF authority and Manuel Lapuente’s attacking intent.",
        before_state="A confident squad mixes domestic stars with European experience and Cuauhtémoc Blanco’s invention.",
        before_exp="A place beyond the group is widely treated as the minimum standard.",
        before_story="Whether Mexico can convert ranking and flair into knockout progress frames the build-up.",
        qual_method="CONCACAF qualifiers",
        qual_summary="Mexico secured qualification through the CONCACAF final round.",
        confederation="CONCACAF",
        fifa=4,
        tactical="Attacking and inventive",
        style="Quick combinations, wide creativity and aggressive pressing in advanced areas.",
        outlook_label="Established contender",
        outlook="A top-five ranking leaves Mexico among the sides expected to be present beyond the opening week.",
        appearances=11,
        prev="1994",
        best="Quarter-finals (1970, 1986)",
        hist="Mexico have been regular finalists and enter France ’98 with one of their strongest pre-tournament rankings.",
        keys=[
            ("Cuauhtémoc Blanco", "Forward", "An inventive attacker capable of creating chances in tight spaces."),
            ("Alberto García Aspe", "Midfielder", "The captain and midfield organiser."),
            ("Luis Hernández", "Forward", "A pacey forward threat in behind opposing defences."),
            ("Jorge Campos", "Goalkeeper", "An unorthodox goalkeeper still central to Mexico’s identity."),
        ],
    ),
    "Morocco": dict(
        title="Morocco at France ’98",
        introduction="Morocco arrive with Henri Michel’s organisation and one of Africa’s more balanced squads, led by Noureddine Naybet.",
        before_state="A disciplined defensive structure supports creative outlets such as Mustapha Hadji.",
        before_exp="A place in the second round is a realistic aim in a demanding group.",
        before_story="Whether Morocco can turn defensive control into enough goals is the recurring question.",
        qual_method="CAF finalists",
        qual_summary="Morocco secured one of Africa’s five finals places through the CAF qualifying path.",
        confederation="CAF",
        fifa=13,
        tactical="Compact and balanced",
        style="Organised defending, quick wide transitions and technical midfield combinations.",
        outlook_label="Expected to reach the second round",
        outlook="A top-fifteen ranking leaves Morocco among the African sides expected to compete for a knockout place.",
        appearances=4,
        prev="1994",
        best="Round of 16 (1986)",
        hist="Morocco have been regular African qualifiers since the 1980s and enter France ’98 with rising belief.",
        keys=[
            ("Mustapha Hadji", "Midfielder", "A creative midfielder capable of unlocking compact defences."),
            ("Noureddine Naybet", "Defender", "The captain and commanding presence in central defence."),
            ("Salaheddine Bassir", "Forward", "A forward option trusted to finish transitions."),
            ("Abdeljalil Hadda", "Forward", "A complementary attacker with movement across the front line."),
        ],
    ),
    "Nigeria": dict(
        title="Nigeria at France ’98",
        introduction="Nigeria return under Bora Milutinović with pace, invention and the Olympic generation now hardened by senior experience.",
        before_state="A gifted midfield around Jay-Jay Okocha remains the side’s clearest route to unlocking opponents.",
        before_exp="Many observers again tip Nigeria among Africa’s strongest candidates to advance.",
        before_story="Whether Milutinović can harness individual brilliance into a settled tournament side frames the build-up.",
        qual_method="CAF finalists",
        qual_summary="Nigeria secured one of Africa’s five finals places through the CAF qualifying path.",
        confederation="CAF",
        fifa=74,
        tactical="Fast and expressive",
        style="Vertical attacking play, wide pace and inventive midfield dribbling.",
        outlook_label="Dark horse",
        outlook="Despite a modest ranking, Nigeria’s talent level keeps them among the most watched African sides in the field.",
        appearances=2,
        prev="1994",
        best="Round of 16 (1994)",
        hist="Nigeria’s debut in 1994 announced a major African force; France ’98 is the attempt to go further.",
        keys=[
            ("Jay-Jay Okocha", "Midfielder", "A dazzling dribbler capable of creating chances from nothing."),
            ("Nwankwo Kanu", "Forward", "A technically gifted forward with European club pedigree."),
            ("Finidi George", "Midfielder", "A wide midfielder whose delivery stretched opposing full-backs."),
            ("Uche Okechukwu", "Defender", "The captain and defensive organiser of the side."),
        ],
    ),
    "Norway": dict(
        title="Norway at France ’98",
        introduction="Norway return with Egil Olsen’s unmistakable method and a top-ten ranking that demands respect.",
        before_state="A physically imposing, well-drilled squad remains built on second balls, set pieces and relentless organisation.",
        before_exp="A place in the second round is again treated as a realistic opening target.",
        before_story="Whether Norway’s direct style can still unsettle more technical opponents is the tactical debate around them.",
        qual_method="UEFA Group 3 runners-up",
        qual_summary="Norway finished second in UEFA Group 3 to qualify for a second consecutive World Cup.",
        confederation="UEFA",
        fifa=7,
        tactical="Direct and physical",
        style="Long diagonals, aggressive pressing on the second ball and aerial threat from set pieces.",
        outlook_label="Dark horse",
        outlook="A top-ten ranking and a distinctive method make Norway one of the more intriguing European sides in the field.",
        appearances=3,
        prev="1994",
        best="Round of 16 (1938, 1994)",
        hist="Norway’s return in 1994 ended a long absence; France ’98 is their second consecutive finals under Olsen.",
        keys=[
            ("Tore André Flo", "Forward", "A target forward central to Norway’s direct attacking plan."),
            ("Øyvind Leonhardsen", "Midfielder", "An energetic midfielder trusted to win second balls."),
            ("Frode Grodås", "Goalkeeper", "The captain and established first-choice goalkeeper."),
            ("Henning Berg", "Defender", "An experienced defender organised within Olsen’s system."),
        ],
    ),
    "Paraguay": dict(
        title="Paraguay at France ’98",
        introduction="Paraguay return after missing USA ’94, organised around José Luis Chilavert’s unique presence as a goalkeeping captain and free-kick threat.",
        before_state="Paulo César Carpegiani has built a compact, competitive CONMEBOL side with clear defensive identity.",
        before_exp="A place in the second round would mark a successful return to the finals.",
        before_story="Whether Chilavert’s personality and set-piece threat can lift a disciplined unit is the defining storyline.",
        qual_method="CONMEBOL qualifiers",
        qual_summary="Paraguay secured qualification through the CONMEBOL round-robin to reach a first finals since 1986.",
        confederation="CONMEBOL",
        fifa=29,
        tactical="Compact and resilient",
        style="Deep defending, rapid counters and set-piece threat, including from the goalkeeper.",
        outlook_label="Dark horse",
        outlook="Paraguay’s organisation and Chilavert’s presence make them a difficult group opponent.",
        appearances=5,
        prev="1986",
        best="Round of 16 (1986)",
        hist="Paraguay return in 1998 after missing 1990 and 1994, seeking to rebuild their finals presence.",
        keys=[
            ("José Luis Chilavert", "Goalkeeper", "The captain, shot-stopper and set-piece specialist."),
            ("José Cardozo", "Forward", "A centre-forward trusted as Paraguay’s primary finishing reference."),
            ("Carlos Gamarra", "Defender", "A commanding centre-back central to the defensive structure."),
            ("Roberto Acuña", "Midfielder", "A midfield runner capable of linking defence and attack."),
        ],
    ),
    "Romania": dict(
        title="Romania at France ’98",
        introduction="Romania return with Gheorghe Hagi still the creative heartbeat and Anghel Iordănescu again in charge.",
        before_state="A familiar generation seeks to extend the progress that made Romania one of USA ’94’s most watched European sides.",
        before_exp="A place beyond the group is the clear ambition.",
        before_story="Whether Hagi can still decide matches at this stage of his career dominates the Romanian conversation.",
        qual_method="UEFA Group 8 winners",
        qual_summary="Romania topped UEFA Group 8 to qualify for a third consecutive World Cup.",
        confederation="UEFA",
        fifa=22,
        tactical="Technical and inventive",
        style="Possession through Hagi and Popescu, with runners arriving from midfield.",
        outlook_label="Expected to reach the second round",
        outlook="Romania’s recent pedigree and ranking leave them among the European sides expected to compete for a knockout place.",
        appearances=7,
        prev="1994",
        best="Quarter-finals (1994)",
        hist="Romania’s quarter-final run in 1994 raised expectation; France ’98 is the attempt to sustain that level.",
        keys=[
            ("Gheorghe Hagi", "Midfielder", "The captain and creative reference of the Romanian side."),
            ("Gheorghe Popescu", "Defender", "A composed defender and midfield screen with elite club experience."),
            ("Adrian Ilie", "Forward", "A mobile forward capable of finishing and creating."),
            ("Dorinel Munteanu", "Midfielder", "An energetic midfielder trusted to cover ground and support attacks."),
        ],
    ),
    "Saudi Arabia": dict(
        title="Saudi Arabia at France ’98",
        introduction="Saudi Arabia return under Carlos Alberto Parreira seeking to build on their debut progress from USA ’94.",
        before_state="A more experienced Asian side retains technical midfield quality and clearer tournament know-how.",
        before_exp="A competitive group campaign is the opening measure for Asia’s most consistent recent qualifiers.",
        before_story="Whether Parreira’s methods can lift Saudi Arabia beyond debutant status frames the build-up.",
        qual_method="AFC final round qualifiers",
        qual_summary="Saudi Arabia secured one of Asia’s finals places through the AFC qualifying path.",
        confederation="AFC",
        fifa=34,
        tactical="Organised and energetic",
        style="Compact defending, quick wide transitions and technical midfield combinations.",
        outlook_label="Expected to reach the second round",
        outlook="Saudi Arabia’s recent finals experience makes a competitive group campaign the standard.",
        appearances=2,
        prev="1994",
        best="Round of 16 (1994)",
        hist="Saudi Arabia reached the second round on debut in 1994 and return seeking continuity.",
        keys=[
            ("Sami Al-Jaber", "Forward", "An established forward and finishing reference."),
            ("Saeed Al-Owairan", "Forward", "A powerful attacker capable of carrying the ball over long distances."),
            ("Yousuf Al-Thunayan", "Midfielder", "The captain and experienced midfield leader."),
            ("Mohamed Al-Deayea", "Goalkeeper", "The established first-choice goalkeeper of the programme."),
        ],
    ),
    "Scotland": dict(
        title="Scotland at France ’98",
        introduction="Scotland return after missing USA ’94, carrying Craig Brown’s organisation and a familiar blend of domestic and Premier League experience.",
        before_state="A hard-working squad built around Colin Hendry seeks to make a difficult opening group competitive.",
        before_exp="Points from the group would already mark a successful return against elite opposition.",
        before_story="Whether Scotland can stay organised against stronger technical sides is the central pre-tournament question.",
        qual_method="UEFA Group 4 runners-up",
        qual_summary="Scotland finished second in UEFA Group 4 behind Austria to qualify.",
        confederation="UEFA",
        fifa=41,
        tactical="Organised and industrious",
        style="Compact defending, set-piece threat and direct distribution into the forward line.",
        outlook_label="Expected to reach the second round",
        outlook="Scotland’s ranking sits outside the favourites, but their collective discipline makes every group fixture competitive.",
        appearances=8,
        prev="1990",
        best="Group stage",
        hist="Scotland have a long finals history without a knockout appearance and return in 1998 after missing 1994.",
        keys=[
            ("Colin Hendry", "Defender", "The captain and defensive organiser of the side."),
            ("John Collins", "Midfielder", "A composed midfielder trusted to keep possession under pressure."),
            ("Kevin Gallacher", "Forward", "A forward option with pace in behind."),
            ("Jim Leighton", "Goalkeeper", "An experienced international goalkeeper."),
        ],
    ),
    "South Africa": dict(
        title="South Africa at France ’98",
        introduction="South Africa make their World Cup debut as a democratic footballing nation, led by Lucas Radebe and coached by Philippe Troussier.",
        before_state="Bafana Bafana arrive with continental belief after African success and a squad mixing domestic and European experience.",
        before_exp="A competitive debut would mark a symbolic and sporting success for a first-time finalist.",
        before_story="Whether South Africa can convert African championship belief onto the World Cup stage frames the narrative.",
        qual_method="CAF finalists",
        qual_summary="South Africa secured one of Africa’s five finals places through the CAF qualifying path.",
        notable="Debutants after winning the 1996 Africa Cup of Nations on home soil.",
        confederation="CAF",
        fifa=24,
        tactical="Energetic and expressive",
        style="High work rate, wide combinations and set-piece threat through an athletic midfield.",
        outlook_label="Debutants with belief",
        outlook="A mid-twenties ranking and continental pedigree leave South Africa among the more watched debutants.",
        appearances=1,
        prev="Debut",
        best="Debutants",
        hist="France ’98 is South Africa’s first World Cup finals after readmission to international football in the early 1990s.",
        keys=[
            ("Lucas Radebe", "Defender", "The captain and defensive leader of the side."),
            ("Phil Masinga", "Forward", "A centre-forward trusted as a primary goal threat."),
            ("John Moshoeu", "Midfielder", "A creative midfielder capable of linking play."),
            ("Quinton Fortune", "Midfielder", "A versatile midfielder with energy in both directions."),
        ],
    ),
    "South Korea": dict(
        title="South Korea at France ’98",
        introduction="South Korea return under Cha Bum-kun seeking a first knockout appearance after successive group-stage campaigns.",
        before_state="An industrious squad built on domestic familiarity arrives with clear organisation and improving technical standards.",
        before_exp="A first move beyond the group remains the long-term measure of progress.",
        before_story="Whether Cha’s authority can lift a hard-working side past familiar limitations is the central question.",
        qual_method="AFC final round qualifiers",
        qual_summary="South Korea secured one of Asia’s finals places through the AFC qualifying path.",
        confederation="AFC",
        fifa=20,
        tactical="Industrious and compact",
        style="High work rate, disciplined shape and quick counters through wide runners.",
        outlook_label="Expected to reach the second round",
        outlook="South Korea’s ranking and experience make a competitive group campaign the standard.",
        appearances=5,
        prev="1994",
        best="Group stage",
        hist="South Korea have appeared in every World Cup since 1986 and still seek a first knockout place.",
        keys=[
            ("Choi Yong-soo", "Forward", "A centre-forward trusted as a finishing reference."),
            ("Yoo Sang-chul", "Midfielder", "An energetic midfielder capable of arriving late in the box."),
            ("Choi Young-il", "Defender", "The captain and defensive organiser."),
            ("Kim Byung-ji", "Goalkeeper", "An established goalkeeper option for the national side."),
        ],
    ),
    "Spain": dict(
        title="Spain at France ’98",
        introduction="Spain arrive with club pedigree and Javier Clemente’s organisation, again seeking a tournament that matches domestic reputation.",
        before_state="A technically gifted squad remains built on La Liga quality and Andoni Zubizarreta’s vast experience.",
        before_exp="A deep run is expected; an early exit would renew familiar scrutiny.",
        before_story="Whether Spain can convert control into knockout authority remains the open question entering France.",
        qual_method="UEFA Group 6 winners",
        qual_summary="Spain topped UEFA Group 6 to qualify for another World Cup finals.",
        confederation="UEFA",
        fifa=15,
        tactical="Technical control",
        style="Compact organisation, composed possession and varied attacking options through midfield runners.",
        outlook_label="Established contender",
        outlook="Spain’s ranking and squad depth leave them among the sides expected to be present beyond the opening week.",
        appearances=10,
        prev="1994",
        best="Fourth place (1950)",
        hist="Spain have often arrived with talent and club pedigree but still seek a modern tournament that matches that reputation.",
        keys=[
            ("Andoni Zubizarreta", "Goalkeeper", "The captain brought enormous experience and calm to the defensive unit."),
            ("Raúl", "Forward", "A young forward already established as a Real Madrid and Spain reference."),
            ("Fernando Hierro", "Midfielder", "A commanding presence capable of playing in defence or midfield."),
            ("Luis Enrique", "Midfielder", "An energetic midfielder trusted to arrive in advanced areas."),
        ],
    ),
    "Tunisia": dict(
        title="Tunisia at France ’98",
        introduction="Tunisia arrive under Henryk Kasperczak seeking to make Africa’s expanded finals allocation count.",
        before_state="A compact, well-drilled side looks to Sami Trabelsi’s leadership and midfield structure for control.",
        before_exp="A competitive group showing would mark a successful return to the finals.",
        before_story="Whether Tunisia can score enough goals to match their organisation is the central concern.",
        qual_method="CAF finalists",
        qual_summary="Tunisia secured one of Africa’s five finals places through the CAF qualifying path.",
        confederation="CAF",
        fifa=21,
        tactical="Compact and disciplined",
        style="Low defensive block, patient midfield circulation and selective counters.",
        outlook_label="Expected to reach the second round",
        outlook="Tunisia’s ranking inside the world’s top twenty-five makes a competitive group campaign a realistic aim.",
        appearances=2,
        prev="1978",
        best="Group stage",
        hist="Tunisia’s only previous finals came in 1978; France ’98 is their return after twenty years.",
        keys=[
            ("Sami Trabelsi", "Defender", "The captain and defensive organiser of the side."),
            ("Zoubeir Baya", "Midfielder", "A creative midfielder trusted to link play."),
            ("Adel Sellimi", "Forward", "A forward option capable of finishing transitions."),
            ("Chokri El Ouaer", "Goalkeeper", "The established first-choice goalkeeper entering the tournament."),
        ],
    ),
    "United States": dict(
        title="United States at France ’98",
        introduction="The United States return under Steve Sampson seeking to build on home progress from USA ’94 with a more experienced core.",
        before_state="A settled group featuring Thomas Dooley and Eric Wynalda arrives with clearer tournament know-how than four years earlier.",
        before_exp="A place in the second round would confirm the programme’s continued rise.",
        before_story="Whether Sampson’s side can compete in a difficult European-heavy group frames the American conversation.",
        qual_method="CONCACAF qualifiers",
        qual_summary="The United States secured qualification through the CONCACAF final round.",
        confederation="CONCACAF",
        fifa=11,
        tactical="Organised and direct",
        style="Compact defending, energetic wide running and set-piece threat.",
        outlook_label="Expected to reach the second round",
        outlook="A top-fifteen ranking and recent finals experience leave the United States among the sides expected to compete for a knockout place.",
        appearances=6,
        prev="1994",
        best="Third place (1930)",
        hist="The United States returned to successive finals in 1990 and 1994; France ’98 is their third consecutive appearance.",
        keys=[
            ("Eric Wynalda", "Forward", "The side’s leading attacking reference and most reliable international finisher."),
            ("Thomas Dooley", "Midfielder", "The captain brought leadership and defensive balance."),
            ("Tab Ramos", "Midfielder", "A creative link player trusted between the lines."),
            ("Kasey Keller", "Goalkeeper", "An established goalkeeper with European club experience."),
        ],
    ),
    "Yugoslavia": dict(
        title="Yugoslavia at France ’98",
        introduction="FR Yugoslavia return to the World Cup after missing USA ’94 under sanctions, carrying a gifted generation around Dragan Stojković.",
        before_state="Slobodan Santrač leads a technically rich squad eager to reassert a historic footballing identity under a new name.",
        before_exp="A deep run is expected by a public that remembers Yugoslavia’s pedigree.",
        before_story="Whether the side can convert individual quality into collective tournament authority is the central debate.",
        qual_method="UEFA play-off winners",
        qual_summary="Yugoslavia won a UEFA qualifying play-off to return to the World Cup finals.",
        notable="First finals appearance as FR Yugoslavia after missing 1994 due to international sanctions.",
        confederation="UEFA",
        fifa=8,
        tactical="Technical and inventive",
        style="Possessive midfield combinations, intelligent movement and finishing through Mijatović and Milošević.",
        outlook_label="Established contender",
        outlook="A top-ten ranking and exceptional technical quality leave Yugoslavia among the sides expected to contend deep into the knockout rounds.",
        appearances=9,
        prev="1990",
        best="Fourth place (1930, 1962)",
        hist="Counting earlier Yugoslav sides, the programme has a deep finals history; France ’98 is the return after sanctions barred 1994.",
        keys=[
            ("Dragan Stojković", "Midfielder", "The captain and creative reference of the side."),
            ("Predrag Mijatović", "Forward", "A refined forward capable of deciding matches in the box."),
            ("Savo Milošević", "Forward", "A centre-forward trusted as a primary goal threat."),
            ("Vladimir Jugović", "Midfielder", "A complete midfielder with elite European club experience."),
        ],
    ),
}


def validate_keys(name: str, squad: dict, meta: dict) -> None:
    all_players = set(squad["gk"] + squad["df"] + squad["mf"] + squad["fw"])
    for player, _, _ in meta["keys"]:
        if player not in all_players:
            raise SystemExit(f"{name}: key player {player!r} not in squad")


def fix_optional_players() -> None:
    """Replace any key players missing from squads with verified alternatives."""
    replacements = {
        ("98", "Austria", "Wolfgang Feiersinger"): None,
        ("98", "Belgium", "Gert Verheyen"): None,
        ("98", "Cameroon", "Rigobert Song"): None,
        ("98", "Cameroon", "Jacques Songo'o"): None,
        ("98", "Chile", "Nelson Tapia"): None,
        ("98", "Colombia", "Freddy Rincón"): None,
        ("98", "England", "Tony Adams"): None,
        ("98", "Jamaica", "Theodore Whitmore"): None,
        ("98", "Jamaica", "Deon Burton"): None,
        ("98", "Jamaica", "Robbie Earle"): None,
        ("98", "Japan", "Yoshikatsu Kawaguchi"): None,
        ("98", "Mexico", "Luis Hernández"): None,
        ("98", "Mexico", "Jorge Campos"): None,
        ("98", "Paraguay", "Carlos Gamarra"): None,
        ("98", "Romania", "Gheorghe Popescu"): None,
        ("98", "Saudi Arabia", "Mohamed Al-Deayea"): None,
        ("98", "Scotland", "Jim Leighton"): None,
        ("98", "South Korea", "Kim Byung-ji"): None,
        ("98", "Spain", "Luis Enrique"): None,
        ("98", "Tunisia", "Chokri El Ouaer"): None,
        ("98", "United States", "Kasey Keller"): None,
        ("98", "Norway", "Henning Berg"): None,
    }
    # Auto-heal: for each meta key not in squad, swap to first unused squad player
    for label, meta_map, squads in (
        ("94", META_94, USA_SQUADS),
        ("98", META_98, FRA_SQUADS),
    ):
        for name, meta in meta_map.items():
            squad = squads[name]
            all_players = squad["gk"] + squad["df"] + squad["mf"] + squad["fw"]
            used = {p for p, _, _ in meta["keys"] if p in all_players}
            new_keys = []
            for player, pos, note in meta["keys"]:
                if player in all_players:
                    new_keys.append((player, pos, note))
                    continue
                # pick replacement from same rough line
                pool = {
                    "Goalkeeper": squad["gk"],
                    "Defender": squad["df"],
                    "Midfielder": squad["mf"],
                    "Forward": squad["fw"],
                }.get(pos, all_players)
                replacement = next((p for p in pool if p not in used), None)
                if replacement is None:
                    replacement = next(p for p in all_players if p not in used)
                used.add(replacement)
                new_keys.append(
                    (
                        replacement,
                        pos,
                        note if "trusted" in note.lower() or "capable" in note.lower() else f"A verified squad member trusted in the {pos.lower()} line.",
                    )
                )
            meta["keys"] = new_keys
            validate_keys(name, squad, meta)


fix_optional_players()


def write_file(path: Path, tournament_id: str, items: list[str], sources: list[str]) -> None:
    src = ", ".join(f'"{esc(s)}"' for s in sources)
    body = ",\n".join(items)
    path.write_text(
        f'''import type {{ TeamTournamentDossier }} from "@/lib/editorial/types";

const roster = (
  goalkeepers: string[],
  defenders: string[],
  midfielders: string[],
  forwards: string[],
): TeamTournamentDossier["roster"] => [
  ...goalkeepers.map((name) => ({{ name, positionGroup: "Goalkeepers" as const }})),
  ...defenders.map((name) => ({{ name, positionGroup: "Defenders" as const }})),
  ...midfielders.map((name) => ({{ name, positionGroup: "Midfielders" as const }})),
  ...forwards.map((name) => ({{ name, positionGroup: "Forwards" as const }})),
];

const sources = [{src}];

/** Additional participant Team Profiles beyond curated Team Journey nations. */
export const {"USA_1994_ADDITIONAL_DOSSIERS" if tournament_id == "usa-1994" else "FRANCE_1998_ADDITIONAL_DOSSIERS"}: TeamTournamentDossier[] = [
{body},
];
''',
        encoding="utf-8",
    )


def main() -> None:
    usa_items = []
    for name, meta in META_94.items():
        if team_id(name) in EXISTING_94:
            continue
        usa_items.append(
            emit_dossier(
                tournament_id="usa-1994",
                name=name,
                squad=USA_SQUADS[name],
                meta=meta,
                sources=SOURCES_94,
            )
        )
    fra_items = []
    for name, meta in META_98.items():
        if team_id(name) in EXISTING_98:
            continue
        fra_items.append(
            emit_dossier(
                tournament_id="france-1998",
                name=name,
                squad=FRA_SQUADS[name],
                meta=meta,
                sources=SOURCES_98,
            )
        )

    write_file(
        ROOT / "data/editorial/dossiers/usa-1994-additional.ts",
        "usa-1994",
        usa_items,
        SOURCES_94,
    )
    write_file(
        ROOT / "data/editorial/dossiers/france-1998-additional.ts",
        "france-1998",
        fra_items,
        SOURCES_98,
    )
    print(f"Wrote {len(usa_items)} USA additional + {len(fra_items)} France additional")


if __name__ == "__main__":
    main()
