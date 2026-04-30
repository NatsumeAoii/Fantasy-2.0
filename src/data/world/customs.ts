export type CustomType = "Taboo" | "Greeting" | "Superstition" | "Festival";

export interface CustomVariation {
  name: string;
  desc: string;
}

/**
 * A cultural tradition or social practice observed by a specific race
 * or faction within Aetheris. Organized by cultural lineages to apply 
 * variations to grouped races efficiently.
 */
export interface Custom {
  associatedRaceOrFaction: string | string[];
  type: CustomType;
  variations: CustomVariation[];
}

const HUMAN_KIN = ["Human", "Half-Elf", "Half-Orc", "Half-Giant", "Half-Troll", "Half-Gnome", "Half-Dragon", "Half-Fae"];
const ELVEN_KIN = ["Elf", "Dark Elf", "Frost Elf", "Shadow Elf", "Wood Elf", "High Elf", "Sea Elf", "Sun Elf", "Moon Elf"];
const STOUT_KIN = ["Dwarf", "Duergar", "Gnome", "Halfling"];
const GOBLINOID = ["Orc", "Goblin", "Hobgoblin", "Kobold", "Troll", "Bugbear"];
const GIANT_KIN = ["Giant", "Minotaur", "Cyclops", "Ogre"];
const FEY_KIN = ["Fairy", "Fae", "Sylph", "Dryad", "Spirit", "Nymph", "Pixie", "Satyr", "Faun"];
const REPTILIAN = ["Draconic", "Lamia", "Naga", "Lizardfolk", "Wyvernfolk"];
const BEAST_KIN = ["Werewolf", "Lupine", "Feline", "Centaur", "Sphinx"];
const CELESTIAL = ["Aasimar", "Nephilim", "Valkyrie", "Seraph", "Deva"];
const FIENDISH = ["Djinn", "Efreet", "Tiefling", "Cambion", "Incubus", "Oni", "Rakshasa"];
const SHAPESHIFTER = ["Doppelganger", "Shapeshifter", "Changeling"];

/** Master list of all cultural customs grouped by related races. */
export const CUSTOMS: Custom[] = [
  // ==========================================
  // HUMANITY & HYBRIDS
  // ==========================================
  {
    associatedRaceOrFaction: HUMAN_KIN,
    type: "Taboo",
    variations: [
      { name: "Pointing at a Pyre", desc: "Gesturing toward a cremation pyre with a bare finger invites ghosts to follow." },
      { name: "Whistling at Night", desc: "Whistling after sundown mimics the call of grave-robbers and barrow wights." },
      { name: "Spilling Salt", desc: "Wasting salt invites rot upon the household crops for an entire year." },
      { name: "Stepping on Graves", desc: "Walking over a marked grave curses the offender with chronic joint pain." },
      { name: "Leaving Bread Upside Down", desc: "Placing a loaf upside down on a table summons extreme bad luck and poverty." }
    ]
  },
  {
    associatedRaceOrFaction: HUMAN_KIN,
    type: "Greeting",
    variations: [
      { name: "The Forearm Clasp", desc: "Grasping forearms firmly to check for hidden daggers." },
      { name: "The Coin Toss", desc: "Flipping a copper coin to a stranger to prove good intentions." },
      { name: "The Hearth-Nod", desc: "A slow nod performed only while holding a lit torch or candle." },
      { name: "The Open Palm", desc: "Showing both empty palms at waist-height to prove you bear no hostility." },
      { name: "The Doorstep Bow", desc: "Bowing deeply but refusing to step inside until verbally invited twice." }
    ]
  },
  {
    associatedRaceOrFaction: HUMAN_KIN,
    type: "Superstition",
    variations: [
      { name: "Coin on the Sill", desc: "Leaving copper on the window ensures wandering spirits do not enter." },
      { name: "Crossed Doorways", desc: "Sprinkling iron dust across thresholds wards off petty hexes." },
      { name: "The Third Knock", desc: "Always knock three times; fewer summons thieves, more summons guards." },
      { name: "Mirror Turning", desc: "Turning all mirrors to the wall during a thunderstorm prevents lightning strikes." },
      { name: "Spilled Wine", desc: "Dabbing spilled wine behind the ears guarantees you will not die of thirst." }
    ]
  },
  {
    associatedRaceOrFaction: HUMAN_KIN,
    type: "Festival",
    variations: [
      { name: "Night of Hollow Masks", desc: "Donning carved masks in autumn to confuse wandering death spirits." },
      { name: "The Tithe of Bread", desc: "A spring festival where all stale bread is publicly burned." },
      { name: "Day of the Founders", desc: "A solemn parade honoring the first kings of the realm." },
      { name: "The Burning of the Straw", desc: "Incinerating a massive straw effigy to banish winter frost." },
      { name: "The Mud-Wrestling", desc: "A boisterous summer solstice event where grudges are settled in mud pits." }
    ]
  },

  // ==========================================
  // ELVEN LINEAGES
  // ==========================================
  {
    associatedRaceOrFaction: ELVEN_KIN,
    type: "Taboo",
    variations: [
      { name: "Speaking Dead Names", desc: "Naming a deceased kin anchors their spirit away from the afterlife." },
      { name: "Breaking Living Wood", desc: "Snapping a branch off a tree instead of cutting it cleanly is an omen." },
      { name: "Wearing White", desc: "White is the color of absolute surrender and spiritual weakness." },
      { name: "Sleeping Underground", desc: "Sleeping without a view of the sky causes severe claustrophobic madness." },
      { name: "Eating Scavenged Meat", desc: "Consuming an animal that was killed by another predator pollutes the soul." }
    ]
  },
  {
    associatedRaceOrFaction: ELVEN_KIN,
    type: "Greeting",
    variations: [
      { name: "The Bow of Branches", desc: "Bending an unbroken branch toward a guest to show flexibility." },
      { name: "Silence of Three Breaths", desc: "Sharing three synchronized breaths before speaking to avoid curses." },
      { name: "The Starlit Stare", desc: "Locking eyes unblinking for ten seconds before acknowledging presence." },
      { name: "The Blade-Tap", desc: "Gently tapping the hilts of sheathed swords together to acknowledge martial skill." },
      { name: "The Hand-Over-Heart", desc: "Placing the right hand over the heart while looking directly at the moon." }
    ]
  },
  {
    associatedRaceOrFaction: ELVEN_KIN,
    type: "Superstition",
    variations: [
      { name: "Moonflower Pillow", desc: "Sleeping with moonflowers filters nightmares into prophetic visions." },
      { name: "The Silver Thread", desc: "Tying silver threads to weapons prevents the metal from rusting." },
      { name: "Mirror Avoidance", desc: "Never looking in a mirror during an eclipse to avoid soul-theft." },
      { name: "The Silent Owl", desc: "If an owl hoots thrice near your tent, someone you know will fall in battle." },
      { name: "Water Reflection", desc: "Never drinking from a pond if you cannot see your own clear reflection." }
    ]
  },
  {
    associatedRaceOrFaction: ELVEN_KIN,
    type: "Festival",
    variations: [
      { name: "The Verdant Rebirth", desc: "Planting a sapling and swearing a binding blood oath to the forest." },
      { name: "The Eclipse Dance", desc: "A silent, maskless dance held only when the sun is fully blocked." },
      { name: "The Starfall Vigil", desc: "Staying awake for three days awaiting meteor showers." },
      { name: "The Weaving of the Silk", desc: "A communal gathering where stories are literally woven into massive tapestries." },
      { name: "The Song of the Ancestors", desc: "A mournful, beautiful twilight choir honoring those lost in ancient wars." }
    ]
  },

  // ==========================================
  // STOUT KIN (Dwarves & Smallfolk)
  // ==========================================
  {
    associatedRaceOrFaction: STOUT_KIN,
    type: "Taboo",
    variations: [
      { name: "Breaking Forged Steel", desc: "Deliberately snapping a blade curses the smith's entire lineage." },
      { name: "Unpaid Debts", desc: "Dying with a debt condemns the soul to mine spectral ore forever." },
      { name: "Killing a Raven", desc: "Ravens report to the judges of the dead; harming them invites vengeance." },
      { name: "Shaving the Beard", desc: "A voluntary shave implies the admission of a deeply shameful, unforgivable crime." },
      { name: "Leaving a Drink Unfinished", desc: "Walking away from a half-full ale invites bad spirits to finish it." }
    ]
  },
  {
    associatedRaceOrFaction: STOUT_KIN,
    type: "Greeting",
    variations: [
      { name: "The Iron Handshake", desc: "Gripping forearms to check for physical frailty and weapons." },
      { name: "The Beard Clasp", desc: "Touching one's own beard lightly when addressing an esteemed elder." },
      { name: "The Anvil Strike", desc: "Clashing a hammer against a shield to announce arrival." },
      { name: "The Mug-Smash", desc: "Smashing empty tankards together violently to show camaraderie." },
      { name: "The Boot-Tap", desc: "Tapping boots together twice to acknowledge shared mining heritage." }
    ]
  },
  {
    associatedRaceOrFaction: STOUT_KIN,
    type: "Superstition",
    variations: [
      { name: "Crossed Hammers", desc: "Hanging iron hammers over doors satisfies the hunger of stone spirits." },
      { name: "The Gem-Bite", desc: "Biting a gemstone transfers a fragment of your luck into the stone." },
      { name: "Pocket of Dirt", desc: "Carrying a scoop of homeland soil prevents getting lost underground." },
      { name: "The Echo-Hex", desc: "If a cavern does not echo your call, a cave-in is imminent. Flee instantly." },
      { name: "Moth in the Mine", desc: "A white moth near a mining shaft means digging further will hit lava." }
    ]
  },
  {
    associatedRaceOrFaction: STOUT_KIN,
    type: "Festival",
    variations: [
      { name: "Feast of Embers", desc: "A brewing contest where losers must drink the winner's entire barrel." },
      { name: "Festival of the First Spark", desc: "Explosive celebration displaying the most volatile clockwork creations." },
      { name: "The Runestone Carving", desc: "An annual gathering to carve the year's triumphs into a central monolith." },
      { name: "The Great Cavern Shout", desc: "Standing in the deepest cavern and yelling in unison to test structural integrity." },
      { name: "The Gold-Weighing", desc: "Publicly weighing clan vaults to determine political rank for the coming year." }
    ]
  },

  // ==========================================
  // GOBLINOIDS & ORCS
  // ==========================================
  {
    associatedRaceOrFaction: GOBLINOID,
    type: "Taboo",
    variations: [
      { name: "Eating Before the Hunt", desc: "Eating blunts the warrior spirit; you must hunt with a starving stomach." },
      { name: "Counting the Stars", desc: "Stars are dead gods. Counting them draws their hungry gaze." },
      { name: "Sheathing a Clean Blade", desc: "Drawing a weapon and sheathing it without drawing blood is cowardly." },
      { name: "Burying the Dead", desc: "Burying corpses is insulting. They must be burned or left for carrion." },
      { name: "Using a Shield", desc: "Hiding behind wood or iron implies you lack faith in your own skin and fury." }
    ]
  },
  {
    associatedRaceOrFaction: GOBLINOID,
    type: "Greeting",
    variations: [
      { name: "Bloodletting Salute", desc: "Nicking the palm and pressing bleeding hands together to seal respect." },
      { name: "Spitting on the Ground", desc: "Spitting wards the earth against lies between honorable warriors." },
      { name: "The Tusk-Clack", desc: "Snapping jaws together loudly three times to show combat readiness." },
      { name: "The Shoulder-Ram", desc: "A heavy, bruising bodily collision used to test a stranger's footing and strength." },
      { name: "The Weapon-Drop", desc: "Throwing your main weapon to the dirt to prove you can kill unarmed if needed." }
    ]
  },
  {
    associatedRaceOrFaction: GOBLINOID,
    type: "Superstition",
    variations: [
      { name: "Bones on the Threshold", desc: "Piling gnawed bones outside dens wards off larger predators." },
      { name: "The Red Skull", desc: "Painting a skull thick red guarantees victory in tomorrow's raid." },
      { name: "Storm-Screaming", desc: "Yelling at thunder frightens the sky gods into granting clear weather." },
      { name: "Crow-Counting", desc: "Seeing an odd number of crows means an ambush. Even numbers mean good looting." },
      { name: "The Rust-Omen", desc: "If a blade rusts overnight, the warrior has displeased their ancestors severely." }
    ]
  },
  {
    associatedRaceOrFaction: GOBLINOID,
    type: "Festival",
    variations: [
      { name: "The Trial of Iron", desc: "A bare-knuckle tournament to crown the strongest warrior." },
      { name: "The Bone-Fire", desc: "Burning the skeletal remains of the year's kills in a massive pyre." },
      { name: "The Blood Moon Revel", desc: "A thunderous hunt where the strongest prey is offered to the war god." },
      { name: "The Warg-Taming", desc: "Youths must ride a wild, untamed dire wolf until it submits or kills them." },
      { name: "The Plunder-Share", desc: "The warlord violently distributes all stolen gold to loyal captains." }
    ]
  },

  // ==========================================
  // GIANTS & MINOTAURS
  // ==========================================
  {
    associatedRaceOrFaction: GIANT_KIN,
    type: "Taboo",
    variations: [
      { name: "Looking Down", desc: "Bowing one's head is considered submissive and invites immediate challenge." },
      { name: "Refusing a Contest", desc: "Rejecting a challenge of strength is punishable by exile." },
      { name: "Using Ranged Weapons", desc: "Bows and throwing spears are tools for cowards who fear melee." },
      { name: "Whispering", desc: "Speaking quietly implies you are plotting treachery or lack chest volume." },
      { name: "Riding Mounts", desc: "Allowing an animal to carry you proves your legs are weak and worthless." }
    ]
  },
  {
    associatedRaceOrFaction: GIANT_KIN,
    type: "Greeting",
    variations: [
      { name: "The Chest-Beat", desc: "Striking one's own breastplate loudly to demonstrate vitality." },
      { name: "The Rock-Toss", desc: "Tossing a heavy boulder casually to an ally as a display of power." },
      { name: "The Horn-Lock", desc: "Minotaurs press their horns together to assert dominance playfully." },
      { name: "The Ground-Stomp", desc: "Stomping a boot until the surrounding area noticeably shakes." },
      { name: "The Bellow", desc: "Screaming one's own title at maximum volume before engaging in dialogue." }
    ]
  },
  {
    associatedRaceOrFaction: GIANT_KIN,
    type: "Superstition",
    variations: [
      { name: "The Earthquake Omen", desc: "Tremors mean the earth-mother is demanding a sacrifice of meat." },
      { name: "The Shattered Club", desc: "If a weapon splinters during a hunt, you must go home immediately." },
      { name: "Cloud-Watching", desc: "Dark clouds gather specifically when a chief is about to die." },
      { name: "The Avalanche-Curse", desc: "Pebbles rolling uphill means you are walking into an ancestral trap." },
      { name: "Missing Teeth", desc: "Losing a molar ensures bad luck in wrestling matches for a full moon cycle." }
    ]
  },
  {
    associatedRaceOrFaction: GIANT_KIN,
    type: "Festival",
    variations: [
      { name: "The Boulder Toss", desc: "A multi-day event trying to throw marked stones across ravines." },
      { name: "The Great Feast", desc: "A mountain-wide gathering where entire herds of cattle are consumed." },
      { name: "The Labyrinth Run", desc: "Minotaurs navigate complex caves blindfolded to honor their ancestors." },
      { name: "The Tree-Snapping", desc: "Rivals attempt to uproot the thickest old-growth trees barehanded." },
      { name: "The Mountain-Scream", desc: "A choral shouting match echoing across valleys to assert territorial rights." }
    ]
  },

  // ==========================================
  // FEY & SPIRITS
  // ==========================================
  {
    associatedRaceOrFaction: FEY_KIN,
    type: "Taboo",
    variations: [
      { name: "Sleeping near Iron", desc: "Cold iron poisons the dreaming mind and severs the soul from the Feywild." },
      { name: "Saying Thank You", desc: "Expressing gratitude incurs a literal, binding magical debt." },
      { name: "Stepping in Circles", desc: "Walking backward in a circle traps the walker in a time-loop." },
      { name: "Lying Boldly", desc: "Direct lies burn the tongue; fey speak purely in misleading half-truths instead." },
      { name: "Accepting Food", desc: "Eating mortal food anchors a fey to the material plane permanently." }
    ]
  },
  {
    associatedRaceOrFaction: FEY_KIN,
    type: "Greeting",
    variations: [
      { name: "The Name-Trap", desc: "Asking 'May I have your name?' to steal identities from the unwary." },
      { name: "The Petal-Drop", desc: "Dropping a single flower petal to indicate peaceful intentions." },
      { name: "The Mirror's Glance", desc: "Briefly shifting features to resemble the greeter, showing high respect." },
      { name: "The Rhyme-Match", desc: "Replying to a spoken greeting with a perfectly matched rhyming couplet." },
      { name: "The Bow of Shadows", desc: "Bowing deeply so only the shadow moves, while the physical body remains static." }
    ]
  },
  {
    associatedRaceOrFaction: FEY_KIN,
    type: "Superstition",
    variations: [
      { name: "The Salt Line", desc: "Fey firmly believe salt blocks magic; they will aggressively sweep it away." },
      { name: "The Shadow-Tether", desc: "Belief that your shadow can detach and attack you if untended." },
      { name: "The Coin-Curse", desc: "Touching gold minted by mortal kings burns the spirit." },
      { name: "The Clock-Fear", desc: "The ticking of mortal clocks drains their immortality. They smash them on sight." },
      { name: "Toadstools", desc: "Sleeping inside a ring of toadstools invites banishment from the Seelie court." }
    ]
  },
  {
    associatedRaceOrFaction: FEY_KIN,
    type: "Festival",
    variations: [
      { name: "The Veil-Thinning", desc: "Dancing in spiraling rings to pull mortals into the Feywild." },
      { name: "The Wild Hunt", desc: "A spectral ride across the sky to capture chaotic nightmares." },
      { name: "The Midsummer Tithe", desc: "Offering the best wine and honey to keep the dark fey asleep." },
      { name: "The Prankster's Eve", desc: "A night devoted completely to harmlessly stealing small objects from human villages." },
      { name: "The Chorus of Leaves", desc: "A melodic ritual causing autumn trees to shed their leaves simultaneously." }
    ]
  },

  // ==========================================
  // REPTILIAN (Serpent & Draconic)
  // ==========================================
  {
    associatedRaceOrFaction: REPTILIAN,
    type: "Taboo",
    variations: [
      { name: "Mixing Blood and Water", desc: "Rivers are the veins of the earth; bleeding in them is blasphemy." },
      { name: "Slaying a Hatchling", desc: "Murdering the unborn or newly hatched carries a blood-curse." },
      { name: "Sleeping in the Open", desc: "Exposing one's belly to the sky while resting invites eagle-spirits to strike." },
      { name: "Discarding Fangs", desc: "Leaving fallen teeth on the soil allows enemies to scry upon you." },
      { name: "Cold-Stone Worship", desc: "Praying in shaded, damp caves angers the sun deities." }
    ]
  },
  {
    associatedRaceOrFaction: REPTILIAN,
    type: "Greeting",
    variations: [
      { name: "The Scale-Touch", desc: "Pressing foreheads together to read thermal patterns and emotions." },
      { name: "The Tongue-Flick", desc: "Tasting the air around a stranger to determine their truthfulness." },
      { name: "The Wing-Flare", desc: "Draconic kin flair their cloaks or wings to show total wingspan." },
      { name: "The Hiss-Rattle", desc: "A low vibration from the throat to show readiness perfectly safely without violence." },
      { name: "The Tail-Thump", desc: "Slapping a heavy tail onto the dirt twice to acknowledge presence." }
    ]
  },
  {
    associatedRaceOrFaction: REPTILIAN,
    type: "Superstition",
    variations: [
      { name: "The Cold-Blood Curse", desc: "Mammal fur brings sickness to the nest and must be burned." },
      { name: "Shedding Season", desc: "Old skin must be buried deeply, lest enemies use it for scrying." },
      { name: "The Golden Hoard", desc: "Sleeping on gold elongates your lifespan indefinitely." },
      { name: "The Egg-Hex", desc: "Cracking a bird's egg out of anger curses your own children." },
      { name: "Clouded Eyes", desc: "If a reptile's eyes go milky before shedding, they are seeing the ghost-world." }
    ]
  },
  {
    associatedRaceOrFaction: REPTILIAN,
    type: "Festival",
    variations: [
      { name: "Ashfall Remembrance", desc: "Breathing fire into the dusk sky to honor ancient wyrms." },
      { name: "The Drowning Festival", desc: "Staying submerged in deep water to honor marine ancestors." },
      { name: "The Sun-Basking", desc: "A three-day meditation sitting motionless on heated rocks." },
      { name: "The Fang-Dance", desc: "A mock-battle displaying martial skill without drawing a single drop of blood." },
      { name: "The Serpent Coil", desc: "A massive group dance intertwining participants into a giant moving knot." }
    ]
  },

  // ==========================================
  // BEAST KIN
  // ==========================================
  {
    associatedRaceOrFaction: BEAST_KIN,
    type: "Taboo",
    variations: [
      { name: "Burying the Afterbirth", desc: "Afterbirth must be left on a high rock for carrion birds." },
      { name: "Feeding on Carrion", desc: "True hunters only eat what they kill themselves." },
      { name: "Declawing", desc: "Removing claws voluntarily or forcefully is worse than execution." },
      { name: "Denying Shelter", desc: "Refusing a wandering beast-kin warmth during a blizzard angers the ancestor-wolves." },
      { name: "Wearing Perfume", desc: "Masking your natural scent proves you are hiding cowardice or disease." }
    ]
  },
  {
    associatedRaceOrFaction: BEAST_KIN,
    type: "Greeting",
    variations: [
      { name: "The Throat-Baring", desc: "Tilting the head back to expose the throat to a superior." },
      { name: "The Muzzle-Bump", desc: "Pressing noses together as a sign of deep familial affection." },
      { name: "The Roar-Call", desc: "Announcing presence miles in advance to avoid territorial clashes." },
      { name: "The Scent-Check", desc: "Inhaling deeply near the collar to memorize an individual smell." },
      { name: "The Play-Bite", desc: "A gentle snap at the arm to show joyful recognition without threat." }
    ]
  },
  {
    associatedRaceOrFaction: BEAST_KIN,
    type: "Superstition",
    variations: [
      { name: "The Silver Terror", desc: "Even touching silver cutlery is believed to turn the blood to ash." },
      { name: "The Full Moon Madness", desc: "Looking directly at a full moon invites the beast to take over permanently." },
      { name: "The Flea-Hex", desc: "Witches send parasites as spies; scratching them reveals your secrets." },
      { name: "Lightning-Omen", desc: "Dogs barking at lightning signifies the arrival of a demonic pack-master." },
      { name: "Water-Bathing", desc: "Washing entirely in a river washes away the hunter's protective spiritual oils." }
    ]
  },
  {
    associatedRaceOrFaction: BEAST_KIN,
    type: "Festival",
    variations: [
      { name: "The Long Run", desc: "Running for three days straight without water to prove endurance." },
      { name: "The Howling", desc: "Gathering at peaks to howl until their collective voices shatter stone." },
      { name: "The First Gore", desc: "A rite of passage where young warriors hunt a boar unassisted." },
      { name: "The Moon-Feast", desc: "Consuming raw meat exclusively under the light of the hunter's moon." },
      { name: "The Pack-Mending", desc: "A night dedicated explicitly to grooming and tending elder injuries." }
    ]
  },

  // ==========================================
  // CELESTIAL
  // ==========================================
  {
    associatedRaceOrFaction: CELESTIAL,
    type: "Taboo",
    variations: [
      { name: "Lying in Sanctuaries", desc: "Telling a lie in a holy place strips away celestial resistance permanently." },
      { name: "Touching Defiled Idols", desc: "Handling the unholy items of fiends causes severe physical blistering." },
      { name: "Refusing a Beggar", desc: "Ignoring a request for charity invites the silent judgment of the gods." },
      { name: "Stealing from the Dead", desc: "Taking copper from eyes traps the soul in purgatory forever." },
      { name: "Cursing the Sun", desc: "Complaining about intense heat angers the dawn-bringer entities." }
    ]
  },
  {
    associatedRaceOrFaction: CELESTIAL,
    type: "Greeting",
    variations: [
      { name: "The Wing-Cover", desc: "Draping a wing over an ally's shoulder as a protective mantle." },
      { name: "The Luminous Gaze", desc: "Letting their eyes glow radiantly to prove their heritage." },
      { name: "The Two-Finger Blessing", desc: "Tracing a holy symbol lightly on the forehead of a guest." },
      { name: "The Palm-Glow", desc: "Emitting a soft, warm light from the palms when shaking hands." },
      { name: "The Bow of Grace", desc: "A flawless, kneeling bow performed strictly to honor martyrs." }
    ]
  },
  {
    associatedRaceOrFaction: CELESTIAL,
    type: "Superstition",
    variations: [
      { name: "Red Thread on the Wrist", desc: "Keeps celestial blood from attracting the envious gaze of demons." },
      { name: "The Shadow-Fear", desc: "Standing in total darkness allows fiendish whispers to enter the mind." },
      { name: "The Halo-Dim", desc: "A flickering candle indicates a fallen angel is standing nearby." },
      { name: "The Feather-Fall", desc: "Finding a single white feather means an ancestor just saved your life." },
      { name: "Tarnished Silver", desc: "Silver that turns black instantly detects poison in the aura." }
    ]
  },
  {
    associatedRaceOrFaction: CELESTIAL,
    type: "Festival",
    variations: [
      { name: "The Dawn-Chant", desc: "Singing in perfect harmony as the sun crests the horizon." },
      { name: "The Cleansing Pyre", desc: "Burning corrupted magical items in a massive holy bonfire." },
      { name: "The Feather-Drop", desc: "A ceremony dropping radiant feathers to bless local farmlands." },
      { name: "The Light-Vigil", desc: "Ensuring all temple candles remain entirely lit for sixty days." },
      { name: "The Ascendant Parade", desc: "Marching while casting harmless illusionary wings overhead." }
    ]
  },

  // ==========================================
  // FIENDISH & ELEMENTAL
  // ==========================================
  {
    associatedRaceOrFaction: FIENDISH,
    type: "Taboo",
    variations: [
      { name: "Breaking a Contract", desc: "Violating a sworn deal invites immediate retaliation from hellish bounty hunters." },
      { name: "Sparing a Traitor", desc: "Forgiveness is viewed as a grotesque form of weakness." },
      { name: "Putting out the Flame", desc: "Extinguishing an eternal flame is deeply offensive to Efreet." },
      { name: "Entering Holy Sites", desc: "Crossing consecrated ground willingly physically burns the soles of the feet." },
      { name: "Swearing on Truth", desc: "Making oaths involving the word 'truth' causes horrific tongue-blisters." }
    ]
  },
  {
    associatedRaceOrFaction: FIENDISH,
    type: "Greeting",
    variations: [
      { name: "Offering the Left Hand", desc: "Offering the non-casting hand signals genuine non-aggression." },
      { name: "The Ember-Toss", desc: "Throwing a hot coal into the air and catching it." },
      { name: "The Brimstone Sniff", desc: "Inhaling deeply near a stranger to judge their soul's corruption." },
      { name: "The Horn-Tap", desc: "Subtly grazing horns together to display dominance in infernal courts." },
      { name: "The Shadow-Wink", desc: "Blinking one eye slowly, causing the surrounding shadows to ripple." }
    ]
  },
  {
    associatedRaceOrFaction: FIENDISH,
    type: "Superstition",
    variations: [
      { name: "Dagger at Crossroads", desc: "Burying a rusted blade severs ancestral demonic contracts." },
      { name: "The Holy-Water Paranoia", desc: "Refusing to drink out of wooden cups just in case." },
      { name: "The Iron-Ring Omen", desc: "Wearing iron rings traps your magical essence inside your body." },
      { name: "The Bleeding Coin", desc: "Gold that feels warm to the touch has been handled by a devil." },
      { name: "Salt-Blindness", desc: "Walking over a line of salt causes temporary ocular necrosis." }
    ]
  },
  {
    associatedRaceOrFaction: FIENDISH,
    type: "Festival",
    variations: [
      { name: "The Night of Chains", desc: "A grim parade celebrating freedom from abyssal subjugation." },
      { name: "The Lava-Walk", desc: "Walking across molten rock to prove elemental superiority." },
      { name: "The Contract Burn", desc: "A massive bonfire where old grudges and debts are incinerated." },
      { name: "The Ashen Feast", desc: "Eating charcoal and charred meat to harden the stomach against poisons." },
      { name: "The Horn-Sharpening", desc: "An aggressive contest carving the sharpest points onto natural horns." }
    ]
  },

  // ==========================================
  // SHAPESHIFTERS
  // ==========================================
  {
    associatedRaceOrFaction: SHAPESHIFTER,
    type: "Taboo",
    variations: [
      { name: "Stealing a Dead Face", desc: "Taking the form of the recently deceased invites their ghost to possess you." },
      { name: "Staying One Form", desc: "Remaining in a single form for a year causes you to permanently lock into it." },
      { name: "Mirrors at Midnight", desc: "Mirrors show the void where the shapeshifter's true soul should be." },
      { name: "Imitating Royalty", desc: "Copying a king or queen brings the wrath of magical seers universally." },
      { name: "Wearing Silver Chains", desc: "Silver binds the flesh, causing agonizing cramps when attempting to shift." }
    ]
  },
  {
    associatedRaceOrFaction: SHAPESHIFTER,
    type: "Greeting",
    variations: [
      { name: "The Eye-Color Shift", desc: "Flashing eye colors rapidly to prove control over one's form." },
      { name: "The Imitator's Bow", desc: "Perfectly mirroring the exact physical movements of the person they are meeting." },
      { name: "The Voice-Match", desc: "Repeating the greeter's last word in their exact voice." },
      { name: "The Blank Face", desc: "Smoothing away all facial features for two seconds to show true neutrality." },
      { name: "The Handshake-Meld", desc: "Matching the exact temperature and texture of the other person's hand." }
    ]
  },
  {
    associatedRaceOrFaction: SHAPESHIFTER,
    type: "Superstition",
    variations: [
      { name: "The Silver Sickness", desc: "Silver objects supposedly force them to revert to their base form." },
      { name: "The Name-Loss", desc: "Using a fake name too often causes you to completely forget your real one." },
      { name: "The Dog's Gaze", desc: "Dogs can smell the shifting skin; they are avoided entirely." },
      { name: "The Canvas Fear", desc: "Having your portrait painted locks away your ability to use that face again." },
      { name: "The Shadow-Taint", desc: "Mimicking an evil person darkens your own soul permanently." }
    ]
  },
  {
    associatedRaceOrFaction: SHAPESHIFTER,
    type: "Festival",
    variations: [
      { name: "The Masquerade of One", desc: "A secretive gathering where everyone takes the exact same form to discuss politics." },
      { name: "The Shedding", desc: "A chaotic night abandoning old personas and forging entirely new identities." },
      { name: "The Mirror Smashing", desc: "Breaking glass to symbolize liberation from fixed physical shapes." },
      { name: "The Form-Race", desc: "Changing into a different animal every ten steps in a mad forest sprint." },
      { name: "The True-Face Toast", desc: "The only night of the year they revert to their base, featureless forms to drink." }
    ]
  }
];
