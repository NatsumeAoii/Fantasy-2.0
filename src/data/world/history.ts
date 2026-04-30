/**
 * A perspective-driven account of a historical era from a specific
 * cultural, racial, or ideological viewpoint.
 */
export interface HistoricalSource {
  source: string;
  text: string;
}

/**
 * A named period of Aetheris history spanning centuries or millennia.
 * Each era contains key events and multiple perspective-driven accounts.
 */
export interface HistoricalEra {
  eraName: string;
  yearRange: string;
  keyEvents: string[];
  description: string;
  sources: HistoricalSource[];
}

/**
 * A major epoch grouping multiple sequential eras under a shared
 * thematic heading (e.g. "The Dawn of the World").
 */
export interface HistoricalTimeframe {
  timeframeName: string;
  timeframeRange: string;
  eras: HistoricalEra[];
}

/** Master list of all historical timeframes in chronological order. 5 timeframes, 5 eras each, 5 sources per era. */
export const HISTORICAL_TIMEFRAMES: HistoricalTimeframe[] = [
  // =====================================================================
  // TIMEFRAME 1
  // =====================================================================
  {
    timeframeName: "The Dawn of the World",
    timeframeRange: "Before Time - 10,000 P.E.",
    eras: [
      {
        eraName: "The Age of Creation",
        yearRange: "Before Recorded Time",
        keyEvents: ["The Weaving of the Elements", "Birth of the Primordials", "The First Spark of Magic"],
        description: "A violent, chaotic epoch where the raw forces of nature clashed in the formless void, forging the structural boundaries of the material plane.",
        sources: [
          { source: "Elven High Scholar", text: "The cosmos was a tuneless, screaming cacophony until the ancient ones wove delicate harmony from the raw elements, shaping a grand and resonant melody that still echoes in the leylines." },
          { source: "Dwarven Runemaster", text: "Stone and fire were hammered upon the great anvil of existence. The heat was oppressive, the gravity crushing, and between the blows the first runes etched themselves into cooling basalt." },
          { source: "Orcish Shaman", text: "Blood and thunder mixed in the primordial dark, giving birth to the first great spirits of war who would eventually lend their ferocity to our ancestors." },
          { source: "Human Theologian", text: "The divine spark of the gods ignited the void, breathing purpose and law into the formless realms. All that exists was willed into being by sacred intention." },
          { source: "Feywild Wanderer", text: "A wild, untamed dream where the boundaries of reality shifted and danced to the whims of raw magic, before the mortals came along and ruined it with their tedious rules." },
          { source: "Gnomish Elementalist", text: "We have measured the residual harmonic frequencies left in the oldest stone. Creation was not an act of will — it was a catastrophic accident of colliding forces that happened to produce something stable by sheer probability." },
          { source: "Deep-Gnome Mystic", text: "The Underdark remembers the first moments. The deep stone hums with the vibration of original creation even now. Press your ear to the bedrock in the lightless places and listen. It has not forgotten what it witnessed." },
          { source: "Void-Touched Seer", text: "Before form there was hunger. The void did not create — it was filled. Something pushed matter into the emptiness with a purpose the gods have since claimed as their own. I have seen its shadow in the leylines." },
          { source: "Drow Theologian", text: "The gods did not create the void — they emerged from it. Whatever primordial intent shaped the material plane preceded divinity entirely. Our dark patrons are ancient, but they are not first." },
          { source: "Sea Elf Elder", text: "The deep ocean preserves what the surface destroys. In the oldest trenches, we have found crystallized formations that predate any known geological process. Creation left debris, and the sea has kept it." }
        ]
      },
      {
        eraName: "The Shaping of Stone",
        yearRange: "Approx. 15,000 P.E. - 14,000 P.E.",
        keyEvents: ["The Raising of the World-Spine", "Formation of the Underdark", "Birth of the Elemental Courts"],
        description: "The titanic primordials carved the geography of Aetheris, raising mountain ranges of impossible height and gouging oceans into the cooling crust.",
        sources: [
          { source: "Dwarven Historian", text: "The deep halls were first hollowed out by the massive hands of the titans, leaving behind the perfect canvas for our ancestral engineers to refine and fortify." },
          { source: "Deep-Gnome Record", text: "The rampaging primordials carved through the bedrock without care, leaving behind the twisting, lightless scars that we eventually claimed as our vast underground home." },
          { source: "Sea Elf Guide", text: "The great ocean trenches were torn violently into the earth, filling with the tears of retreating elements. Our ancestors swam those newborn currents before any land-dweller drew breath." },
          { source: "Human Scholar", text: "These geological shifts occurred as the unstable young world cooled and solidified. What the elder races attribute to divine titans, natural philosophy explains through pressure and heat." },
          { source: "Giant Pillar-Carver", text: "The mighty earth-shapers raised the great mountains specifically for our kind, forming the colossal steps upon which we built our first magnificent sky-cities." },
          { source: "Orcish Earth-Binder", text: "The earth-spirits we commune with still carry rage from those first contortions. The stone remembers being forced into shape against its will. Its anger is why the mountains still occasionally shrug." },
          { source: "Elven Geomancer", text: "The ley-network we use today runs along the exact fault lines carved by the primordials. We did not build that infrastructure — we colonized their wound." },
          { source: "Halfling Chronicler", text: "My grandmother's grandmother said the mountains were not always there. That the flat land stretched forever once. I thought it was a story until I found seabeds embedded halfway up the World-Spine." },
          { source: "Drow Cartographer", text: "The Underdark's oldest tunnel systems run perpendicular to the surface geography in ways that only make sense if you understand the topology existed before the mountains were raised. We mapped what was here first." },
          { source: "Gnomish Seismologist", text: "The resonant frequency of the World-Spine suggests it was raised in a single geological event lasting less than a decade. The energy required would have boiled the atmosphere. How anything survived to record it remains an open question." }
        ]
      },
      {
        eraName: "The Reign of the Primordials",
        yearRange: "Approx. 14,000 P.E. - 12,000 P.E.",
        keyEvents: ["The Elemental Wars", "The Binding of Fire", "The Flooding of the Chthonic Basins"],
        description: "Colossal beings of pure elemental matter dominated the globe, continuously reshaping the landscape through endless wars of territorial dominance and raw power.",
        sources: [
          { source: "Gnomish Elementalist", text: "The elemental energies were untethered, raging across the surface in storms of such magnitude they would instantly vaporize any modern arcane practitioner foolish enough to observe them." },
          { source: "Dwarven Runesmith", text: "They fought with mountains instead of swords. Their earth-shaking battles compressed the deep ores into the dense mithril veins we mine to this day." },
          { source: "Elven Archivist", text: "A time of terrible destruction. The mindless elemental forces battered each other without purpose, leaving scars on the leylines that remain stubbornly unhealed even now." },
          { source: "Orcish Blood-Caller", text: "The first true wars! Wind fought stone and fire burned the seas. We study their ancient conflicts to sharpen our primal rites and honor their savage legacy." },
          { source: "Halfling Folklore", text: "The earth would erupt into fire without warning, or gentle rivers would freeze into jagged ice in heartbeats. Grandmother said even the sky itself changed color daily." },
          { source: "Human Naturalist", text: "The geological record of this era reads like a battlefield report written in fire and pressure. The magnetic irregularities, the mineral impossibilities — whatever fought here left scars we are still mapping." },
          { source: "Deep-Gnome Survivor", text: "Our ancestors lived through the tail end of the primordial age. The great elementals were weakening even then. We tunneled through their cooling bodies like maggots through a carcass, eating what they left behind." },
          { source: "Feywild Refugee", text: "We fled the material plane entirely when the elementals clashed at their height. Three of the original Sylvan Courts were simply erased as raw elemental energy bled through the planar veil. We do not speak their names anymore." },
          { source: "Dwarven Elder", text: "The deepest veins of elemental iron are not mined — they are found where elemental lords were slain. Every strike of a primordial fist compressed ore into forms no modern forge could replicate. We mine their graves." },
          { source: "Orcish War-Prophet", text: "The war-spirits say this age has not ended. The primordials only sleep. Our rituals exist not to honor the past but to ensure the sleeping things do not feel us walking above them." }
        ]
      },
      {
        eraName: "The Dawning of Beasts",
        yearRange: "Approx. 12,000 P.E. - 10,000 P.E.",
        keyEvents: ["The First Great Hunts", "The Awakening of the Behemoths", "The Silence of the Primordials"],
        description: "As the primordials fell into eternal slumber, massive apex predators rose to claim the untamed wilderness, establishing a brutal hierarchy of fang and claw.",
        sources: [
          { source: "Wood Elf Guardian", text: "The great beasts were sacred guardians of the wild. They roamed freely, testing the strength of the forests long before the smaller races corrupted the natural order." },
          { source: "Human Frontiersman", text: "A terrifying age where survival meant hiding from colossal predators that could swallow an entire modern village whole. Only the cunning and the lucky endured." },
          { source: "Orcish Beast-Tamer", text: "The true testing ground. Our earliest ancestors earned their scars by taming the lesser beasts and surviving the thunderous footfalls of the greater ones." },
          { source: "Dwarven Scout", text: "We remained safely locked underground while the oversized brutes tore each other apart on the surface. Wiser to perfect our ironwork than to become something's meal." },
          { source: "Gnomish Naturalist", text: "The biodiversity of the mega-fauna was staggering. Many of the colossal skeletal remains we study today belong exclusively to this fascinating and lethally productive period." },
          { source: "Halfling Elder", text: "The old stories speak of creatures so large that their footfalls were mistaken for thunder. Our ancestors survived by staying small, staying still, and pretending to be something not worth the effort of eating." },
          { source: "Drow Tracker", text: "The Underdark predators of that age were smaller than the surface behemoths but no less lethal. We learned in those killing grounds that darkness is simultaneously shelter and weapon, and that patience outlasts any apex predator." },
          { source: "Sea Elf Voyager", text: "The oceans were ruled by leviathans during this age. We did not sail — we dove, and we moved carefully in the pressure gaps between the vast breathing things that owned every deep current." },
          { source: "Feywild Emissary", text: "The great beasts were not mindless. Some of the oldest behemoths were dreaming in a language older than speech. We listened. Most of what they dreamed was hunger and territory. But some of it was something else entirely." },
          { source: "Human Archaeologist", text: "We found the fossilized remains of a creature with no classification in any bestiary. Seventy feet of articulated bone, designed for neither land nor sea. Whatever filled this age, we have not identified all of it." }
        ]
      },
      {
        eraName: "The Giant Kingdoms",
        yearRange: "Approx. 10,000 P.E. - 9,000 P.E.",
        keyEvents: ["The Carving of the Megaliths", "The First Sky-Castles", "The Subjugation of the Behemoths"],
        description: "The intelligent giant-kin rose to prominence, constructing monolithic cities that scraped the clouds and subjugating the massive beasts of the previous era under their iron will.",
        sources: [
          { source: "Giant Pillar-Carver", text: "We were the masters of the young world. We stacked the clouds, bound the beasts, and carved our language into the thunder itself. None dared challenge our dominion." },
          { source: "Elven Chronicler", text: "Brutish, lumbering half-wits who stacked crude stones and mistook it for culture. Their clumsy kingdoms were always destined for collapse under the weight of their own ignorance." },
          { source: "Human Historian", text: "Their ruins still dot our landscapes. Massive stone blocks that no modern engineering could lift, standing as grim reminders of a grandeur long since crumbled to dust." },
          { source: "Halfling Wanderer", text: "To the giants, we were merely pests. We lived in the cracks of their stone steps, carefully stealing dropped crumbs the size of whole loaves and counting ourselves fortunate." },
          { source: "Dwarven Engineer", text: "They built tall, but they did not build deep. Their foundations were flawed from the start, relying on brute strength rather than the precise geometry that endures." },
          { source: "Orcish Shaman", text: "The giant-kind possessed spirits of towering wrath. We honored their rage with blood-rites and learned from their bones when they fell. Even a dead colossus teaches the wise." },
          { source: "Gnomish Archivist", text: "Their megalithic writing system is carved into cliff faces across three continents. We have translated perhaps a tenth of it. The rest describes wars and grievances we lack the context to fully comprehend." },
          { source: "Draconic Heir", text: "The giants believed themselves supreme. They had not yet met us. When the wyrms descended, those grand sky-castles became nothing more than convenient perches from which to survey conquered territory." },
          { source: "Sea Elf Diplomat", text: "The giant kingdoms extended to the coastline. Their harbors were carved from cliff faces and could birth vessels the size of small villages. We traded with them cautiously. They measured distance in strides we could not reasonably replicate." },
          { source: "Deep-Gnome Historian", text: "The giant ruins we inhabit in the upper Underdark were not designed as ruins. They are the foundation substructures of sky-castles whose upper levels were destroyed. We live in their basements and call it home." }
        ]
      }
    ]
  },

  // =====================================================================
  // TIMEFRAME 2
  // =====================================================================
  {
    timeframeName: "The Age of Myths",
    timeframeRange: "10,000 P.E. - 4,000 P.E.",
    eras: [
      {
        eraName: "The Era of Dragons",
        yearRange: "Approx. 9,000 P.E. - 7,500 P.E.",
        keyEvents: ["The Descent of the Wyrms", "The Fall of the Giant Kingdoms", "The Establishing of the Hoards"],
        description: "Ancient, colossal wyrms descended upon the material plane, toppling the giant empires and demanding tribute from all lesser beings to fill their unfathomable hoards.",
        sources: [
          { source: "Draconic Zealot", text: "The golden age of absolute perfection. Our majestic ancestors ruled with iron claw and fiery breath, as was their divine right, and all lesser creatures knelt in proper reverence." },
          { source: "Dwarven Grudge-Bearer", text: "A shameful era where the skies rained fire and our ancestors were forced to pay extortionate tributes of our finest gold. Every coin lost is recorded in the Book of Grudges." },
          { source: "Human Serf", text: "We were enslaved, used as replaceable labor to polish stolen coins and scrub blackened soot from massive scales. Our lives held less value than a single copper piece." },
          { source: "Elven Arcanist", text: "The wyrms hoarded magic itself. They jealously guarded the world's most potent arcane artifacts, forcefully stunting the magical growth of every other mortal race for millennia." },
          { source: "Giant Remnant", text: "The flying lizards used fire from above like cowards. Had they met us fairly on the ground, our hammers would have shattered their skulls like rotten eggshells." },
          { source: "Orcish Captive", text: "They sorted us by size and kept the largest for mine labor. The small ones were fed to the hatchlings for amusement. We counted the dead and swore a blood oath whose weight has never fully lifted from our bloodlines." },
          { source: "Halfling House-Servant", text: "My ancestors polished the hoarded coins with small brushes and were paid in scraps. We learned to steal without moving, and that particular skill fed our descendants across three civilizational collapses." },
          { source: "Gnomish Chronicler", text: "The mathematical reality of draconic tribute extraction was the simultaneous removal of all surplus wealth from every civilization at once. We calculate the wyrm hoards represented roughly ninety percent of the plane's liquid capital." },
          { source: "Wood Elf Druid", text: "The wyrms did not only hoard gold. They hoarded old-growth forest. Several of the great wyrms simply occupied entire mountain valleys and killed anything that entered. Much of the ancient forest we now cultivate was their territory once." },
          { source: "Shadow-Elf Sage", text: "Draconic rule had one overlooked benefit: it enforced a brutal peace between mortal races. When the alternative to submission is incineration, tribal conflicts tend to become logistically inconvenient." }
        ]
      },
      {
        eraName: "The Sundering of the Wyrms",
        yearRange: "Approx. 7,500 P.E. - 6,500 P.E.",
        keyEvents: ["The Mortal Uprising", "The Fall of Wyrm Lord Azharak", "The Scattering of Dragonkind"],
        description: "Driven to the brink of extinction, the younger mortal races formed a desperate alliance, shattering the dominion of the scaled lords and scattering the survivors to remote lairs.",
        sources: [
          { source: "Orcish War-Chanter", text: "The glorious day the flying lizards finally bled! We broke their wings, shattered their fangs, and danced upon their rotting scales. The war-songs of that age still stir our blood." },
          { source: "Elven War-Mage", text: "We organized the squabbling tribes and provided the arcane artillery necessary to penetrate draconic scale armor. Without our coordination, the uprising would have been a slaughter." },
          { source: "Dwarven War-Thane", text: "Our heavy ballistas brought the arrogant beasts crashing down to the mud where they belonged. We slaughtered them in their own lairs and melted their hoards for war-steel." },
          { source: "Human Footsoldier", text: "Countless thousands died in the roaring flames, but we held the line with simple spears and unbroken courage until the great winged tyrants finally fell from the burning sky." },
          { source: "Draconic Survivor", text: "A cowardly betrayal by the lesser races. They swarmed us with pathetic numbers like desperate insects, too weak to face us alone but lethal in their billions." },
          { source: "Halfling Herbalist", text: "We supplied the poultices that kept burned and maimed warriors alive long enough to fight again. Nobody sings of the healers, but without us the uprising would have dissolved into a field hospital." },
          { source: "Gnomish Alchemist", text: "Draconic scale is impervious to most conventional weaponry. We spent three decades formulating an acid compound that could soften the joints. The final formula cost nine of my colleagues their lives." },
          { source: "Sea Elf Admiral", text: "The coastal wyrms retreated to the open ocean when the inland battles turned against them. We blockaded the sea-lanes with iron-hulled ships and ensured they found no safe harbor there either." },
          { source: "Deep-Gnome Remembrancer", text: "The wyrm lairs breached in this period released hoarded magical artifacts into the hands of armies that had no framework for their safe operation. The casualties from looted draconic relics rivaled those of the battles themselves." },
          { source: "Feywild Emissary", text: "We watched from across the veil with genuine uncertainty. The mortal races had surprised us before, but toppling the draconic order in a single generation struck even the Sylvan Lords as implausibly ambitious. We sent no aid. We did not expect them to succeed." }
        ]
      },
      {
        eraName: "The Rise of the Fey Courts",
        yearRange: "Approx. 6,500 P.E. - 6,000 P.E.",
        keyEvents: ["The Thinning of the Veil", "Arrival of the Sylvan Lords", "The Seeding of the World-Tree"],
        description: "With the dragons banished, immortal fey entities crossed over in great numbers, planting the World-Tree to anchor their wild magic and establishing the capricious Sylvan Courts.",
        sources: [
          { source: "Wood Elf Guardian", text: "The Sylvan Lords arrived bearing the true, untamed magic. They planted the World-Tree to heal the scorched earth, and with it came the resurgence of the old forests." },
          { source: "Human Frontiersman", text: "Treacherous spirits bled into the darkened forests. They stole our children and demanded strange tributes for safe passage through woods that had once been freely traveled." },
          { source: "Dwarven Diplomat", text: "You cannot negotiate with creatures who view reality as a joke. We barred our stone doors and ignored the dancing lights in the woods. Let the surface races deal with them." },
          { source: "Feywild Emissary", text: "We brought vibrant color and song back to a material plane that had been rendered into dull ash by the fire-breathing lizards. You should be thanking us, really." },
          { source: "Gnomish Naturalist", text: "The influx of wild magic mutated the local flora at an astonishing rate. Entire new species of bioluminescent fungi appeared overnight. A fascinating if hazardous time for field research." },
          { source: "Orcish Shaman", text: "The fey spirits were nothing like the war-spirits we know. They did not want offerings of blood. They wanted songs. We gave them songs. The bargains struck in that age still quietly bind some of our bloodlines." },
          { source: "Halfling Wanderer", text: "We found the fey courts fascinating rather than frightening. They liked our food, our music, and our complete inability to take anything too seriously. We were the only race they never played cruel tricks on." },
          { source: "Deep-Gnome Warden", text: "The wild magic bleeding in from the Feywild reached even our deep tunnels. Plants grew on bare stone. Two of our eldest elders transformed into something luminous and walked away without explanation. They never came back." },
          { source: "Dwarven Cleric", text: "The fey courts presented a theological crisis. Our gods are gods of forge, stone, and craft. The sylvan entities operated outside divine structures entirely. They were older than our pantheon and seemed not to notice." },
          { source: "Drow Exile", text: "We had dealings with the fey before the Sylvan Lords crossed over. Older things lived in the spaces between. The courts the surface races celebrated were a civilized front for something considerably less negotiable underneath." }
        ]
      },
      {
        eraName: "The Elven Dominion",
        yearRange: "Approx. 6,000 P.E. - 4,000 P.E.",
        keyEvents: ["The Founding of the Gossamer Isles", "The Verdant Accords", "The First Planar Gates"],
        description: "The elven kingdoms flourished for two millennia, building magical civilizations of breathtaking beauty and pushing the boundaries of arcane knowledge to connect to other planes.",
        sources: [
          { source: "High Elf Archivist", text: "The pinnacle of mortal achievement. We eradicated mundane disease, bent planar energies to our will, and built a civilization of such beauty that even the gods took notice." },
          { source: "Dwarven Runesmith", text: "The sharp-ears grew overconfident during those centuries. They played with unstable planar magic they barely understood, blinded by the glow of their own crystalline towers." },
          { source: "Human Scholar", text: "They looked down upon us as uncultured beasts. We lived in squalor while they danced across their glittering, levitating bridges, never once offering to share their knowledge." },
          { source: "Orcish Chieftain", text: "Tricks and illusions. They fought with unseen magic instead of honest steel. We raided their shimmering borders simply to prove that glass shatters when you hit it hard enough." },
          { source: "Drow Observer", text: "Our naive cousins bathed in the starlight above, ignoring the potent darkness that whispered to us from below. We listened, and we grew stronger in the deep places." },
          { source: "Halfling Merchant", text: "They maintained their monopoly on planar trade goods with ruthless efficiency. You could buy a portal key at an elven market, but only if you already possessed enough gold that you clearly didn't need to buy one." },
          { source: "Gnomish Philosopher", text: "For all their millennia of progress, the elves never developed a theory of thermodynamics. They simply enchanted the heat away. Magical solutions to physical problems produce magical blindness to physical consequences." },
          { source: "Sea Elf Navigator", text: "The surface elves extended their dominion to the coastal waters and demanded maritime tribute. We accommodated them to their faces and rerouted our deepest trade lanes entirely. Patience is a more durable weapon than a fleet." },
          { source: "Goblin Wanderer", text: "The elves were indifferent to goblins in the way that stone is indifferent to rain. We were beneath classification. We moved through the margins of their gleaming empire and saw what they kept in the margins. It was not beautiful." },
          { source: "Halfling Diplomat", text: "We established formal trade relations with the Gossamer Isles in this period. The elven courts were extraordinarily complicated to navigate, but the market access was worth the investment in protocol. We were the only race they did not condescend to — they simply could not see the angle." }
        ]
      },
      {
        eraName: "The Deep-Dwarf Golden Age",
        yearRange: "Approx. 5,000 P.E. - 4,200 P.E.",
        keyEvents: ["The Forging of Khaz-Gorum", "The Discovery of Mithril", "The Iron Treaty with the Surface"],
        description: "Deep below the surface elven empires, the dwarven clans struck pure mithril, ushering in an unprecedented era of wealth and peerless underground craftsmanship.",
        sources: [
          { source: "Dwarven King", text: "The era of true mastery. We discovered mithril in the deep veins, fortified our impenetrable stone halls, and forged armaments that remain unmatched by any smith alive today." },
          { source: "Drow Exile", text: "The bearded fools dug greedily, hoarding the earth's light while remaining ignorant of the suffocating darkness gathering in the tunnels just beyond their torchlight." },
          { source: "Elven Diplomat", text: "Stubborn, filthy, and uncultured, yet their metalwork was necessary to anchor our delicate arcane structures. We tolerated their bluntness for the sake of superior alloys." },
          { source: "Gnomish Jeweler", text: "A wonderfully prosperous time. We traded our finest cut gems for their indestructible mithril settings, creating masterpieces of combined artistry that collectors still covet." },
          { source: "Deep-Horror Spawn", text: "The constant clinking of their hammers disturbed our ancient slumber. They brought painful light to places that belonged to the dark. We marked them for eventual consumption." },
          { source: "Human Miner", text: "A handful of human laborers worked alongside the dwarves on the surface hauls. They paid fairly and worked us nearly to death. I would not call it exploitation. I would not call it friendship either." },
          { source: "Halfling Gem-Cutter", text: "The mithril settings they produced were flawless. Our cut gems seated in those settings became heirlooms that outlasted three civilizational collapses. The craftsmanship of that era shames everything produced today." },
          { source: "Orcish Raider", text: "We breached their iron gates three times and were repelled three times. On the fourth approach, the gates opened and they sold us food at a profit. We stopped raiding and started trading. They had planned it that way from the beginning." },
          { source: "Feywild Emissary", text: "The dwarves during their golden age were the only mortal race whose underground infrastructure actually troubled the Sylvan Courts. Their mithril harvest disrupted ley convergence points we had used for centuries. We lodged formal complaints. They did not respond." },
          { source: "Shadow-Elf Broker", text: "The deep dwarves created a secondary economy in magical components stripped from the deep ores. They did not always know what they were selling. We did. We established buying networks and said nothing to correct the misclassification." }
        ]
      }
    ]
  },

  // =====================================================================
  // TIMEFRAME 3
  // =====================================================================
  {
    timeframeName: "The Cataclysm and Darkness",
    timeframeRange: "4,000 P.E. - 1,000 P.E.",
    eras: [
      {
        eraName: "The First Sundering",
        yearRange: "Approx. 4,000 P.E.",
        keyEvents: ["The Hubris of the Arcanum", "Splitting of the Gossamer Isles", "The Planar Fracture"],
        description: "A cataclysm triggered by arrogant elven arcanists who breached the dimensional veil, permanently fracturing the land and sinking entire kingdoms beneath boiling seas.",
        sources: [
          { source: "Elven Penitent", text: "Our darkest hour. In unbridled arrogance, we tore the veil between worlds. We sank our own magnificent home beneath the boiling waves and condemned millions to the deep." },
          { source: "Dwarven Chronicler", text: "The inevitable result of limitless elven hubris. The sky cracked open and millions died because a handful of delusional archmages refused to accept the boundaries of mortal magic." },
          { source: "Human Survivor", text: "The ground vanished beneath our feet. Magic fell from the sky like burning acid, and the seas boiled white. It was the end of the world as anyone knew it." },
          { source: "Orcish Shaman", text: "The spirits screamed in pure agony as the arrogant wizards shattered the bones of the earth. We abandoned the coasts and fled for the high mountains." },
          { source: "Fiendish Observer", text: "A deliciously foolish mistake. They cracked open the locked doors of their reality, and through those cracks we caught our very first, tantalizing taste of mortal flesh." },
          { source: "Halfling Hermit", text: "I watched the horizon split. I do not mean metaphorically. The sky tore open and something looked back at me from inside the tear. I walked for thirty years afterward without sleeping more than an hour at a time." },
          { source: "Deep-Gnome Witness", text: "The pressure waves from the surface catastrophe reached our deepest tunnels as a bone-dissolving resonance. We thought it was a primordial awakening. In several important ways, it was considerably worse." },
          { source: "Sea Elf Exile", text: "Three of our coastal cities simply ceased to exist. Not destroyed — ceased. No rubble, no bodies, no scar in the seafloor. The current filled the space where they had been and moved on as if they had never stood." },
          { source: "Gnomish Arcanist", text: "The planar fracture emitted a resonance frequency that shattered every scrying mirror in a radius we have since calculated at four hundred miles. The silence that followed was its own kind of message. All the instruments that survived were measuring the wrong things." },
          { source: "Wood Elf Keeper", text: "The World-Tree cracked down to its third root on the day of the Sundering. It did not die. But something entered through the crack that has never been fully expelled. The healers know. They do not speak of it at open councils." }
        ]
      },
      {
        eraName: "The Ash-Winter",
        yearRange: "Approx. 4,000 P.E. - 3,800 P.E.",
        keyEvents: ["The Long Twilight", "The Famine of Ashes", "The Freezing of the Shimmering Sea"],
        description: "The Sundering threw so much pulverized rock into the atmosphere that the sun was blotted out for two centuries, causing widespread famine and the collapse of surface civilizations.",
        sources: [
          { source: "Halfling Survivor", text: "The warm sun vanished behind endless grey clouds. We ate bitter roots and huddled in the freezing dark for generations, telling stories of a warmth our children had never known." },
          { source: "Necromantic Cultist", text: "A blessed time of quiet and preserving cold. The weak races withered beautifully, providing an unending harvest of fresh bone for our sacred work." },
          { source: "Dwarven Record", text: "We sealed our heavy stone doors and stoked the deep magma forges. Our granaries held while the surface-dwellers starved. We offered no charity. Our stores were for our own." },
          { source: "Elven Refugee", text: "Without the light of the sun, our ancient forests blackened and turned to brittle glass. Our culture shattered alongside them, and we scattered like ash upon the wind." },
          { source: "Human Scholar", text: "The few starving tribes that survived this frozen nightmare were hardened into the fiercely resilient stock from which all modern human civilizations eventually descend." },
          { source: "Orcish Wanderer", text: "We moved. When the food died in one place, we walked to the next. Some of our clans were in motion for three generations without stopping. The clans that stood still and waited for the sky to clear were not there when it finally did." },
          { source: "Gnomish Artificer", text: "I engineered a lamp that synthesized light in the wavelength range of direct sunlight. It kept three hundred people alive long enough to reach the southern coast. Two thousand more didn't reach my door before I had to leave." },
          { source: "Deep-Gnome Forager", text: "Underground, the famine took a different form. The fungi that fed us required some ambient surface light bleeding through the upper stone. When that light died for two centuries, the fungi died with it. We ate blind fish and stone-beetles in the dark." },
          { source: "Drow Survivor", text: "The Ash-Winter was a gift we did not ask for. The surface races weakened. The light above thinned. Our patrols extended further upward than in any previous generation. We marked new territory. We kept the maps." },
          { source: "Feywild Emissary", text: "The Feywild reflected the Ash-Winter as a twilight that lasted two centuries. Plants grew sideways. The stars moved wrong. We sent emissaries to the material plane and lost contact with four of them. We still do not know precisely what happened." }
        ]
      },
      {
        eraName: "The Undead Warlords",
        yearRange: "Approx. 3,800 P.E. - 3,500 P.E.",
        keyEvents: ["The March of the Bone Legions", "The Rise of Xalthis' Chosen", "The Fall of the Sun-Temples"],
        description: "In the frozen darkness, necromancers seized control of the devastated surface, raising immense legions of undead from the mass graves of the famine to enforce their will.",
        sources: [
          { source: "Paladin of the Dawn", text: "A nightmare epoch where necromancers openly mocked the sanctity of death. Endless skeletal legions marched across the ash-choked plains, and the living cowered in their shadow." },
          { source: "Lich-King's Thrall", text: "A perfectly ordered society. No hunger, no dissent, no wasted potential. The silent dead served the immortal masters who had transcended the petty frailties of mortal flesh." },
          { source: "Human Peasant", text: "They offered protection in exchange for obedience. Some villages prospered under their cold rule. We learned not to mourn our dead too loudly, lest they be taken for the legions." },
          { source: "Orcish Warrior", text: "Smashing skulls was pointless when they simply reassembled in the dark. We had to learn fire-based shamanic tactics, burning the bones to powder to keep them down." },
          { source: "Dwarven Guard", text: "The rotting hordes scratched at our iron gates for decades. They lacked the intelligence to breach our holds, but their noxious stench contaminated our ventilation shafts for a century." },
          { source: "Halfling Smuggler", text: "We moved the living out from under the dead using tiny tunnels, false wagon floors, and barrels with breathing holes. The necromancers were powerful. They never learned to count halflings accurately." },
          { source: "Elven Exile", text: "We had outlasted dragons, fey courts, and the Sundering itself. But the undead legions broke something in us that none of those had. It was not the danger that hollowed us out — it was the hopelessness. Dead things feel no exhaustion." },
          { source: "Gnomish Tinkerer", text: "I built a pressure-triggered bone-fragment dispersal charge. Effective against skeletal constructs within blast radius, cheap to produce, undetectable until detonated. The necromancers adapted within a season. I attempted to adapt faster." },
          { source: "Sea Elf Cleric", text: "The undead warlords had no interest in the ocean. The sea remained free throughout this era, which made our coastal enclaves the only genuinely sovereign territory on the surface world for three centuries. We welcomed refugees. We charged for passage. We are not proud of the second part." },
          { source: "Drow Emissary", text: "We had trade agreements with three of the Lich-King's courts. Undead do not need food, which made them poor customers for most goods, but their demand for alchemical preservatives and binding reagents was consistent and substantial." }
        ]
      },
      {
        eraName: "The Age of the Pale Kings",
        yearRange: "Approx. 3,500 P.E. - 3,000 P.E.",
        keyEvents: ["The Vampire Courts Established", "The Blood-Tithe Edicts", "The Enslavement of the Surviving Tribes"],
        description: "Ancient vampire lords established nightmarish feudal kingdoms in the sunless gloom, treating surviving mortals as livestock to feed their eternally thirsting courts.",
        sources: [
          { source: "Vampire Lord", text: "We brought refined civilization to savage remnants. In fair exchange for blood, we offered genuine protection from the horrors outside our walls. It was an equitable arrangement." },
          { source: "Human Rebel", text: "We were kept in iron cages like cattle. The pale leeches drained our families to feed their decadent courts, selecting victims by age and health like butchers choosing cuts." },
          { source: "Halfling Smuggler", text: "We specialized in smuggling terrified victims out of the blood-farming pens. Dangerous work, but the look in their eyes when they saw the open road was worth every risk." },
          { source: "Wood Elf Hunter", text: "They perverted the natural order entirely. We hunted them with blessed wooden stakes, reclaiming the corrupted forests one dead leech at a time over bitter centuries." },
          { source: "Dwarven Historian", text: "They avoided us entirely. The thick minerals present in dwarven blood are apparently toxic to their undead constitutions. A rare advantage of our stubborn biology." },
          { source: "Orcish Blood-Caller", text: "No shaman worth their bones would let a pale lord drink kin-blood. We burned our fallen rather than bury them, denying the pale courts their freshest recruits. Fire is the only honest burial." },
          { source: "Elven Exile", text: "Some of our kind accepted the courts' offer of immortality willingly. I do not condemn them. When you have watched your civilization collapse twice in a century, undeath carries a certain grim appeal." },
          { source: "Gnomish Tinkerer", text: "I reverse-engineered a crude ultraviolet lamp powered by alchemical phosphor and a clockwork bellows. It proved effective within twelve feet. Beyond that range, the pale lords simply laughed." },
          { source: "Deep-Gnome Tunneler", text: "The blood-pens built by the pale courts used architectural principles our engineers still study. Perfect environmental control — temperature, humidity, light, sound — all optimized to keep mortal cattle calm and their blood chemistry stable. It was infrastructure built by monsters with genuine talent." },
          { source: "Sea Elf Refugee", text: "The vampire courts did not extend their dominion to the sea. We offered harbor to those who could reach us. Many could not. We ferried survivors from the coastal settlements until the pale lords began building their own ships. Then we stopped making the same runs twice." }
        ]
      },
      {
        eraName: "The Cleansing Crusades",
        yearRange: "Approx. 3,000 P.E. - 2,500 P.E.",
        keyEvents: ["The Sunbreak Miracles", "The Rise of the Dawn-Paladins", "The Shattering of the Pale Thrones"],
        description: "As the sun finally pierced the centuries-long gloom, empowered paladins and clerics launched a relentless holy war that purged the undead kings from the continent.",
        sources: [
          { source: "Cleric of Aelor", text: "The Dawnfather answered our prayers at last. Armed with holy fire, we smashed the pale thrones and burned the festering rot from our world. The sun itself was our weapon." },
          { source: "Shadow-Elf Assassin", text: "The clanking paladins slaughtered everything in their burning path without distinction. They replaced cold tyranny with the oppressive tyranny of blinding, sanctimonious light." },
          { source: "Vampire Survivor", text: "An unjust genocide. They destroyed centuries of irreplaceable art and refined culture simply to protect the sweating herds. History is always written by the ones holding the torch." },
          { source: "Human Infantry", text: "We marched behind the shining knights, hammering wooden stakes into the burning ash to ensure the blood-suckers could never rise again. Grim work, but necessary." },
          { source: "Dwarven Smith", text: "We sold heavy weapons to the crusaders at fair market rates. War is a tragedy for those who fight it, but the forge-fires burned bright and our coffers overflowed." },
          { source: "Orcish Scout", text: "The paladins burned everything that smelled of death magic. We had three shamans who communed with ancestor spirits — which is entirely distinct from necromancy — and lost two of them to crusader torches before the distinction was understood." },
          { source: "Halfling Herald", text: "I ran messages between the mobile crusading columns for six years. I am not a knight. I am not holy. I am very fast and very small, and I learned the location of every blind spot in a paladin's helmet visor." },
          { source: "Gnomish Medic", text: "The purifying fire the clerics used on corrupted wounds was effective but catastrophically imprecise. We developed a targeted alchemical wash that accomplished the same result without taking the surrounding tissue with it. They called it witchcraft. We called it surgery." },
          { source: "Drow Watcher", text: "The crusades burned many things we had trade relationships with. We lodged no formal objection. The pale courts had been poor business partners — unpredictable, eternally thirsty, and inclined to renegotiate contracts by killing the other party. We watched the pyres without grief." },
          { source: "Wood Elf Chronicler", text: "The crusaders claimed the forests as they passed through them. They built field shrines on ancient grove sites and called it consecration. We dismantled the shrines the night after each column moved on. This pattern repeated for sixty years before they stopped building them." }
        ]
      }
    ]
  },

  // =====================================================================
  // TIMEFRAME 4
  // =====================================================================
  {
    timeframeName: "The Awakening of Mortals",
    timeframeRange: "1,000 P.E. - 0 P.E.",
    eras: [
      {
        eraName: "The Dwarven Resurgence",
        yearRange: "Approx. 2,500 P.E. - 1,500 P.E.",
        keyEvents: ["The Opening of the Iron Gates", "The Deepforge Compact", "The Rebuilding of the Surface Trade"],
        description: "The dwarves emerged from their sealed holds to find a shattered surface world and provided the iron, stone, and engineering expertise needed to help the younger races rebuild.",
        sources: [
          { source: "Dwarven Diplomat", text: "We opened our gates to find the surface races utterly helpless. We gave them the iron and stone required to rebuild, and in return secured trade agreements that endure to this day." },
          { source: "Human Merchant", text: "The dwarves sold us the stone to rebuild our own cities at inflated prices, securing economic dominance over the surface for generations. Generosity was never their primary motive." },
          { source: "Elven Architect", text: "Their blocky, utilitarian rock structures lacked any trace of the soaring elegance our lost crystal spires once possessed. Functional, certainly, but devoid of beauty or soul." },
          { source: "Halfling Trader", text: "Gruff and stubborn business partners, but they valued our ales above nearly all other forms of currency. A barrel of Thornfield Reserve could purchase a cart of iron ingots." },
          { source: "Orcish Raider", text: "They hid like cowards in the rocks while the rest of us bled on the surface. When they finally emerged fat and wealthy, we raided their heavy caravans on principle." },
          { source: "Gnomish Engineer", text: "We quietly assisted in their surface fortification work in exchange for access to their deep-forge techniques. A fair trade. They received walls that didn't crack; we received metallurgical knowledge two centuries ahead of the field." },
          { source: "Deep-Gnome Emissary", text: "The dwarven surface gates reopening meant we could finally establish sanctioned trade with the world above without routing everything through drow intermediaries. The reduction in commission margins alone was worth the diplomatic effort." },
          { source: "Wood Elf Observer", text: "They emerged like something exhumed — pale, blinking, smelling of forge-smoke and old stone, carrying twice their weight in armament. They surveyed the ruined surface with an expression I can only describe as professional disappointment." },
          { source: "Goblin Scavenger", text: "The dwarven gates opening was the best thing that happened to us in four centuries. The caravans they ran were badly guarded at the rear. We followed every convoy for three months before they hired enough sentries to make it not worth it." },
          { source: "Drow Merchant", text: "We had maintained underground commerce throughout the entire period the surface dwarves were sealed. When they finally reopened, they found us already embedded in every major trade network they intended to build. Renegotiating our position took them forty years." }
        ]
      },
      {
        eraName: "The Gnomish Innovations",
        yearRange: "Approx. 2,000 P.E. - 1,500 P.E.",
        keyEvents: ["The Discovery of Black Powder", "The First Steam-Forges", "The Founding of the Artificers' Guild"],
        description: "Brilliant gnomish alchemists experimented with volatile compounds and crude clockwork, inventing black powder and steam mechanisms that revolutionized warfare and industry.",
        sources: [
          { source: "Gnomish Artificer", text: "We discovered the explosive potential of precise alchemy and mechanical engineering. Some call it reckless; we call it progress. The world moved forward because we dared to tinker." },
          { source: "Elven Traditionalist", text: "They replaced the quiet weave of true magic with unstable metal contraptions that belch smoke and fouled the air. Progress, they called it. Desecration is the more honest word." },
          { source: "Dwarven Engineer", text: "We grudgingly admit their volatile powders made excavating the hardest bedrock significantly faster, albeit with a casualty rate we found professionally unacceptable." },
          { source: "Human Commander", text: "The deafening roar of our first crude cannons permanently changed the nature of siege warfare. Walls that once held for years fell in days. The old tactics died with them." },
          { source: "Orcish Warlord", text: "The small ones brought thunder in metal tubes. Many of our bravest fell before we learned to fear the sound. Those who adapted became stronger for the lesson." },
          { source: "Halfling Tinker", text: "A gnomish artificer sold me a set of pocket-sized spring mechanisms that could drive a bolt through half-inch oak at thirty feet. I dismantled them and sold the springs separately at twice the price of the assembled unit." },
          { source: "Deep-Gnome Miner", text: "Black powder reached the Underdark through gnomish traders within a decade of its invention. We used it to clear collapse sites. The first three attempts killed the miners. The fourth cleared a tunnel sealed for two centuries." },
          { source: "Sea Elf Shipwright", text: "Gnomish steam-forge mechanisms were adapted to maritime use within a generation. Hull-mounted propulsion units were crude and prone to catastrophic failure, but they moved a laden vessel directly against the wind. That changes every equation." },
          { source: "Drow Alchemist", text: "The gnomish innovations in volatile compounds were independently developed in the Underdark two centuries prior. We had discarded the approach as impractical for subterranean use. Watching the surface races celebrate the discovery as revolutionary was instructive about the nature of innovation." },
          { source: "Feywild Scholar", text: "The introduction of mechanical logic to the material plane coincided with a measurable weakening of sympathetic enchantment in the surrounding leylines. We documented the correlation. The gnomes, when informed, found the data interesting and continued their work." }
        ]
      },
      {
        eraName: "The Deep-Horror Invasions",
        yearRange: "Approx. 1,500 P.E. - 1,000 P.E.",
        keyEvents: ["The Breaching of the Lower Tunnels", "The Fall of Khaz-Gorum", "The Sealing of the Deep Roads"],
        description: "Dwarven mining pierced the deepest abysses of the Underdark, unleashing mind-flaying aberrations that destroyed several major holds and forced the permanent sealing of the lower tunnels.",
        sources: [
          { source: "Dwarven Defender", text: "Aberrations boiled up from unmapped chasms in the deep. We held the line for decades, but were forced to permanently seal our ancestral halls. The cost was beyond reckoning." },
          { source: "Drow Stalker", text: "The dwarves dug too deep and stumbled into territories claimed by things far older and hungrier than anything their hammers could break. We tried to warn them. They never listen." },
          { source: "Gnomish Survivor", text: "Their alien minds crushed our sanity like parchment. Our clockwork inventions were useless against foes who could simply command you to stop breathing with a thought." },
          { source: "Deep-Gnome Scout", text: "We warned the greedy bearded fools not to breach the black stone barrier. They ignored us as they always do, and paid the ultimate price in blood and madness." },
          { source: "Human Scholar", text: "The sudden halt of all dwarven subterranean trade triggered a continent-wide economic depression that lasted roughly four decades. The surface suffered for the hubris of the deep." },
          { source: "Paladin of the Dawn", text: "No holy rite can consecrate a mind-flayer's lair. The aberrations did not fear divine light. They simply peeled the prayer from the inside of your skull and left the shell standing." },
          { source: "Elven Arcanist", text: "The psionic resonance emanating from the breach warped divination spells cast within forty miles. We lost three scrying circles and a gifted apprentice before we understood the cause." },
          { source: "Halfling Courier", text: "The sealed deep-road gates meant every supply route below the Ashstone Range was cut permanently. Rerouting cargo overland added six weeks to every journey and trebled every price." },
          { source: "Drow Survivor", text: "The aberrations that came through the dwarven breach did not stop at the surface-dwellers. They pushed down into our territory as well. We fought them in the dark for decades in a war the surface races never acknowledged because they did not know it was happening." },
          { source: "Orcish Blood-Shaman", text: "The things that came from the deep breach were beyond our war-spirits' comprehension. They did not bleed in ways we understood. They did not die in ways we knew. We fought them for seven years before we learned what ritual kept them from re-forming after death. It cost us our eldest shaman to find out." }
        ]
      },
      {
        eraName: "The Age of Wandering",
        yearRange: "Approx. 1,000 P.E. - 800 P.E.",
        keyEvents: ["The Great Migration of the Human Tribes", "The Halfling Diaspora", "The Charting of the Free Marches"],
        description: "Younger mortal races spread across the recovering plains in massive migratory waves, following beast-herds and establishing the first palisaded settlements along major rivers.",
        sources: [
          { source: "Halfling Trailblazer", text: "We packed our creaking wagons and explored the recovering continent with nothing but optimism and good provisions. The rolling hills we found were worth every mile of rough road." },
          { source: "Human Frontiersman", text: "A brutal scramble for viable land. We fought off lingering horrors and harsh weather to stake our claims, paying for every acre in sweat and blood." },
          { source: "Wood Elf Ranger", text: "The rapidly multiplying humans trampled through our sacred boundary woods, treating ancient groves as mere lumber yards. Their axes never rested, and neither did our arrows." },
          { source: "Orcish Nomad", text: "The soft humans chased our sacred herds across the plains. We raided their poorly defended wooden camps to teach them the boundaries they refused to learn peacefully." },
          { source: "Dwarven Cartographer", text: "We sold the desperate wanderers detailed maps of the unmarked surface at premium rates. Accurate cartography is worth its weight in gold when you are lost and starving." },
          { source: "Elven Pathfinder", text: "We blazed marks on the ancient trees to guide the wandering tribes safely past our sacred groves. Most followed the marks and ignored their intent. We removed the markers. They wandered directly into the groves regardless." },
          { source: "Gnomish Surveyor", text: "We recorded every settlement site the wanderers established across those decades. Three in four failed within a generation. The survivors became the ancestors of every major city on the modern map. Progress exacts a heavy tithe from people who receive no credit." },
          { source: "Deep-Gnome Guide", text: "Surface wanderers occasionally breached our tunnel systems seeking shelter from the elements. We guided them back to the surface rather than allow them to stumble deeper. Not out of hospitality. Out of pragmatic self-preservation." },
          { source: "Drow Scout", text: "The surface migrations pushed settlement boundaries closer to our access tunnels than we preferred. We collapsed seventeen entry points in the first fifty years of this era. We opened them again once the wanderers had moved further on and become somebody else's problem." },
          { source: "Hobgoblin Outrider", text: "The wandering human and halfling tribes had no territory and no defensible position. We raided them freely for a generation before they learned to dig and build walls with anything available. Necessity produces better engineers than formal training." }
        ]
      },
      {
        eraName: "The Goblinoid Ascendancy",
        yearRange: "Approx. 800 P.E. - 600 P.E.",
        keyEvents: ["The March of the Iron Legion", "The Hobgoblin Warlords Unite", "The Razing of the Border Towns"],
        description: "A disciplined hobgoblin empire rose from the eastern badlands, uniting the disparate goblin tribes under iron-fisted martial law and razing dozens of frontier settlements.",
        sources: [
          { source: "Hobgoblin General", text: "Our Iron Legion marched in perfect formation, conquering the squabbling tribes and bringing them discipline and purpose. We forged an empire from chaos through superior tactics alone." },
          { source: "Orcish Chieftain", text: "Armored runts marching in straight lines. They burned our camps and demanded we bow like dogs. We taught them that formation means nothing when a berserker breaks your front rank." },
          { source: "Human Defender", text: "They were not mindless savages. They employed advanced siege tactics, synchronized volleys, and ruthlessly efficient battlefield maneuvers. Underestimating them cost us three border towns." },
          { source: "Elven Scout", text: "A swarm of organized violence that systematically burned everything in its path. Their discipline was terrifying precisely because it was applied with such methodical, joyless efficiency." },
          { source: "Dwarven Mercenary", text: "We respected their shield walls, if nothing else. Tight formation, overlapping coverage, coordinated advance. Crude compared to our phalanx, but effective against the rabble they fought." },
          { source: "Goblin Conscript", text: "They put weapons in our hands and called us soldiers. We were inventory. The hobgoblin commanders logged our attrition rates in the same supply column as arrow expenditure, and the math never bothered them." },
          { source: "Halfling Refugee", text: "We fled two weeks ahead of the Iron Legion. Anyone who waited for confirmation the army was coming did not flee. They became rubble, or they became conscripted porters for the empire's supply train." },
          { source: "Gnomish Spy", text: "I infiltrated three hobgoblin supply columns over two years, disguised as a halfling-sized quartermaster's assistant. Their logistics were genuinely impressive. Their security screening was not. I was never once questioned." },
          { source: "Drow Arms-Broker", text: "The hobgoblin empire was an excellent customer. Disciplined purchasing, consistent specifications, prompt payment. We maintained supply agreements with the Iron Legion for forty years and carefully did not ask about the end recipients of our more specialized inventory." },
          { source: "Sea Elf Captain", text: "The hobgoblin empire never attempted maritime expansion. Their generals understood land warfare with precision and the sea not at all. We exploited this gap systematically, running supply lines to their opponents along the coast they could neither patrol nor threaten." }
        ]
      }
    ]
  },

  // =====================================================================
  // TIMEFRAME 5
  // =====================================================================
  {
    timeframeName: "The Age of Eldorath",
    timeframeRange: "0 A.E. - Present",
    eras: [
      {
        eraName: "The War of the Five Bloods",
        yearRange: "Approx. 500 P.E. - 100 P.E.",
        keyEvents: ["The Siege of Thornwall", "The Breaking of the Iron Legion", "The Treaty of Broken Swords"],
        description: "Humans, orcs, dwarves, elves, and hobgoblins clashed in a devastating centuries-long conflict over arable territory, leaving deep cultural scars and bitterly contested borders.",
        sources: [
          { source: "Human Strategist", text: "A chaotic meat-grinder of a war. Alliances shifted by the month, and hundreds of thousands died to move borders that would shift again within a decade." },
          { source: "Elven Ranger", text: "The aggressive younger races squabbled like rabid dogs over patches of dirt. We were reluctantly drawn into the bloodshed to protect our ancient, sacred borders from encroachment." },
          { source: "Orcish Warlord", text: "The greatest time of testing. Only the strongest bloodlines survived the endless churning of the battlefield. Our people were forged anew in that crucible of iron and fire." },
          { source: "Dwarven Arms-Dealer", text: "We sold heavy weapons to all sides at fair market rates. War is a tragedy for those who fight it, but the forge-fires burned bright and our coffers overflowed." },
          { source: "Hobgoblin Remnant", text: "Our empire was broken by a desperate alliance of the lesser races. They could not defeat us individually, so they combined their mediocrity into a force of overwhelming numbers." },
          { source: "Halfling Field-Medic", text: "I pulled dying soldiers from five different races out of the same ditch on the same campaign night. None cared what had killed the others. Suffering is the only language spoken fluently by every race in Aetheris simultaneously." },
          { source: "Gnomish Siege Engineer", text: "We sold siege specifications to three separate factions and designed the countermeasures sold to all three opponents. Everyone knew. No one could afford to stop purchasing. We called it consulting. They called it what it was." },
          { source: "Deep-Gnome Neutral Observer", text: "We maintained active trade routes beneath all five factions throughout the conflict. The surface armies shuffled the same hills back and forth for a century while our tunnel commerce ran uninterrupted. War is predominantly a surface concern." },
          { source: "Drow Mercenary", text: "We hired out to three of the five factions at different points in the war, always through intermediaries, always for specific engagements, always extracting full payment before delivery. Shadow-elves have no standing armies, but we have a reputation that functions as one." },
          { source: "Wood Elf Peacekeeper", text: "We attempted formal mediation in the forty-second year of the war. Both sides agreed to a summit. Forty-seven delegates arrived. Thirty-one left. The remaining sixteen became the basis of a prisoner-exchange negotiation that lasted fourteen additional years." }
        ]
      },
      {
        eraName: "The Human Tribal Unification",
        yearRange: "Approx. 100 P.E. - Year 0 A.E.",
        keyEvents: ["The Council of the Nine Crowns", "The Oath of the Dawn", "The Crowning of the First King"],
        description: "Human warlords were steadily brought to heel through diplomacy, marriage, and conquest. This bloody process of unification forged the foundation of the dominant human empire.",
        sources: [
          { source: "Eldorath Historian", text: "Through masterful diplomacy and unmatched martial resolve, our ancestors ended the petty tribal skirmishing and forged a single, loyal human entity capable of shaping the continent." },
          { source: "Barbarian Exile", text: "Treachery, forced marriages, and blackmail. The so-called unification was nothing but a bloody conquest by the wealthiest southern tyrants wearing the mask of diplomacy." },
          { source: "Elven Observer", text: "We watched as the short-lived mortals consolidated power, forging a unified front far faster than any of our councils anticipated. Their ambition should not have been underestimated." },
          { source: "Dwarven Ambassador", text: "It is vastly easier to negotiate trade agreements with a single crowned king than a dozen squabbling warlords. We endorsed the unification for purely practical reasons." },
          { source: "Halfling Bard", text: "I composed the finest ballads of the age, documenting the bloody treaties and the triumphant crowning. My songs are still sung in every tavern from Goldhaven to the marches." },
          { source: "Orcish War-Chief", text: "Three clans before mine resisted the unification and were exterminated. I submitted. Our historians call me a coward. My descendants call me their ancestor. I have never found these two facts contradictory." },
          { source: "Gnomish Scribe", text: "I transcribed seventeen of the founding documents of the unified kingdom. The originals were dictated by warlords who were functionally illiterate. The actual drafts were composed by their advisors. History records the names of the kings." },
          { source: "Wood Elf Witness", text: "We watched the human consolidation with detached interest for the first forty years, then gradual alarm for the following sixty, until by the time the first king was crowned, our border fortifications were already complete." },
          { source: "Drow Strategist", text: "The human unification was the first political event in a century that gave our Deep Council genuine concern. A fragmented surface is an exploitable surface. A unified surface with a standing army is a different variable entirely. We updated our contingency planning." },
          { source: "Goblin Elder", text: "The new human king sent unification envoys to every neighboring people, including us. We listened politely, accepted the offered gifts, and asked a great many questions about army size and patrol frequency. The envoy took this as enthusiastic engagement. We took it as intelligence." }
        ]
      },
      {
        eraName: "The Crowning of Eldorath",
        yearRange: "Year 0 A.E. - 200 A.E.",
        keyEvents: ["The Founding of Goldhaven", "The Codification of the Royal Laws", "The Subjugation of the Northern Marches"],
        description: "The official beginning of the current calendar, marking the golden age of humanity under a single banner. King Eldorath established the dominant kingdom of the modern era.",
        sources: [
          { source: "Royal Chronicler", text: "The radiant dawn of the true golden age. The glorious King Eldorath raised Goldhaven from the dirt, codified just laws, and brought order to a continent scarred by centuries of war." },
          { source: "Dwarven Merchant", text: "The humans finally stopped killing each other long enough to build a city worth trading with. Goldhaven is crude compared to our holds, but their coin spends well enough." },
          { source: "Orcish Captive", text: "They trapped us in thick stone cages. The armored humans celebrated their false king while we starved in the dark, stripped of weapons and what dignity remained." },
          { source: "Wood Elf Scout", text: "Their sprawling stone cities grew like a plague across the green. We watched their golden monuments rise with mounting concern for the forests they consumed as fuel." },
          { source: "Human Peasant", text: "The wars finally stopped. We were given safe land to farm, and for the first time in generations, our children slept through the night without fear." },
          { source: "Halfling Mayor", text: "The new royal tax laws meant the king's collectors could now legally claim a portion of our produce. We adjusted our inventory practices accordingly. The collectors never found the secondary cellar beneath the root store." },
          { source: "Elven Diplomat", text: "We attended the coronation as a courtesy and offered measured congratulations. Privately, we opened a new administrative file labeled 'Human Expansion: Long-Term Threat Assessment.' It is now twelve volumes." },
          { source: "Gnomish Clockmaker", text: "They commissioned a great clock for Goldhaven's central tower to mark the opening of the new era. We built it to last five centuries. It is still running. The kingdom it was built to celebrate has changed hands four times." },
          { source: "Drow Observer", text: "The founding of Goldhaven moved the surface center of economic gravity closer to two of our primary tunnelhead access points than we were comfortable with. We relocated three networks. The inconvenience cost us a decade of repositioning and the king never knew we existed." },
          { source: "Feywild Emissary", text: "We attended the coronation in disguise, out of academic curiosity. The ceremony was sincere, which surprised us. Mortals building kingdoms usually have more calculation in their architecture. This one had something closer to hope. We found it both touching and deeply alarming." }
        ]
      },
      {
        eraName: "The Expansion Years",
        yearRange: "200 A.E. - 400 A.E.",
        keyEvents: ["The Founding of the Free Marches", "The Taming of the Eastern Isles", "The Construction of the Lighthouse Chain"],
        description: "The Eldorath Kingdom aggressively expanded its borders. Heavy infantry legions pushed back the wilderness while naval architects established profitable maritime colonies.",
        sources: [
          { source: "Royal Naval Captain", text: "We mapped the treacherous Shimmering Sea and civilized the remote Eastern Isles. Every lighthouse in the chain bears the king's seal and the blood of the sailors who built it." },
          { source: "Sea Elf Islander", text: "Armored invaders arrived on unnatural timber ships, driving off the native fauna and claiming our ancestral reefs as property of a king we had never heard of and never consented to obey." },
          { source: "Halfling Merchant", text: "The new roads stretched far and wide. We packed our carts with exotic goods and traveled the expanding kingdom in relative safety for the first time in living memory." },
          { source: "Orcish Rebel", text: "The armored men brought walls and iron wherever they marched. We fought back with everything we had, but their numbers rolled in like the endless tide." },
          { source: "Dwarven Bank Clerk", text: "The human expansion caused an unprecedented surge in coin circulation. We established the first secure vaults to hold their newly minted gold and charged handsomely for the privilege." },
          { source: "Elven Naturalist", text: "Each new territory the armored legions absorbed lost approximately sixty percent of its endemic species within the first generation of settlement. They called it civilization. We recorded it as silence spreading across our maps." },
          { source: "Gnomish Cartographer", text: "We were contracted to map the expansion routes and then watched in professional anguish as the legions ignored our recommended paths entirely in favor of whatever direction the nearest general happened to be pointing that morning." },
          { source: "Human Missionary", text: "I followed the legions to bring the Dawnfather's word to the conquered peoples. By the time I reached the frontier, the people there generally had more pressing theological questions than I had prepared answers for." },
          { source: "Drow Analyst", text: "The lighthouse chain the humans built along the Shimmering Sea was, from a strategic standpoint, the most consequential thing they built in this entire period. We spent thirty years mapping their blind spots between towers. There were fewer than we hoped." },
          { source: "Wood Elf Exile", text: "I was driven from my grove when the expansion reached our valley. I watched the trees come down from a hillside thirty miles away. I spent twelve years working my way through the eastern courts before finding a grove still untouched. It is smaller than I remembered from my childhood. Everything is smaller." }
        ]
      },
      {
        eraName: "The Second Sundering & Shadow-Blight Crisis",
        yearRange: "650 A.E. - Present",
        keyEvents: ["The Rift at Blackhollow", "The Mage-Guard Inquisitions", "The Withering of the World-Tree"],
        description: "The modern era defines the closing of the Hell-Rift, the subsequent paranoid suppression of magic by the newly formed Mage-Guard, and the terrifying rise of necrotic corruption threatening the roots of Aetheris.",
        sources: [
          { source: "Mage-Guard Veteran", text: "The bleeding sky burned the color of bruised flesh. We barely held the line at Blackhollow until Archmage Meridia paid the ultimate price to seal the rift with her own life-force." },
          { source: "Fiendish Survivor", text: "Our glorious invasion was thwarted by a single mortal's desperate sacrifice. The portal collapsed, leaving us stranded in this miserable realm with no path of retreat." },
          { source: "Hedge-Witch Exile", text: "The Mage-Guard inquisitions that followed were a century of blind witch-hunts. Innocent rural healers were dragged from their homes and burned on pyres for the crime of knowing herb-lore." },
          { source: "Royal Advisor", text: "The new blight spreads faster than our scholars can map it. Entire provinces have lost their harvests, and the wildlife grows feral and twisted. We are running out of time." },
          { source: "Druidic Elder", text: "The World-Tree is dying from within. The roots of the domain are being devoured by an unnatural rot that no healing magic can halt. If it falls, everything falls with it." },
          { source: "Drow Inquisitor", text: "The blight seeping through the World-Tree's roots has reached the upper levels of the Underdark. Whatever is consuming it from below is older than anything in our theologians' records. We are not its first meal." },
          { source: "Gnomish Plague-Warden", text: "I have catalogued forty-seven distinct mutations in blight-afflicted fauna across six provinces. The rate of novel mutations is accelerating. Whatever intelligence guides this rot is learning from each failed organism." },
          { source: "Orcish Blood-Prophet", text: "The great spirits of war are silent. They do not answer our rites, and their totems crack in their sleep. When the war-spirits go quiet, the wise do not ask why. They run." },
          { source: "Deep-Gnome Elder", text: "The shadow-blight is not spreading upward from the roots. It is spreading laterally through the leyline substrate at a rate that suggests the surface has already lost. We have begun relocating archives to the deepest accessible levels. We are not announcing this." },
          { source: "Sea Elf Warden", text: "The ocean shows the blight differently than the land does. The fish do not mutate. They disappear. The migration routes empty ahead of the spreading corruption like water draining from a basin. We are following the migration routes backward to find the source. We have not found the end of them yet." }
        ]
      }
    ]
  }
];
