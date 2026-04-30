/**
 * A notable geographic feature, ruin, or structure in the world of
 * Aetheris. Landmarks serve as quest locations, navigation points,
 * and sources of regional lore.
 */
export interface Landmark {
  name: string;
  region: string;
  type: "Ruins" | "Natural" | "Monument" | "Magical Anomaly";
  dangerLevel: "Low" | "Medium" | "High" | "Extreme";
  description: string;
}

/** Master list of all named landmarks, organized by type. 10 per category, 40 total. */
export const LANDMARKS: Landmark[] = [
  // ==========================================
  // RUINS
  // ==========================================
  {
    name: "The Weeping Spire",
    region: "Morghast Bog",
    type: "Ruins",
    dangerLevel: "High",
    description: "A crumbling obsidian tower half-swallowed by the bog, its stone continually seeping a clear, salt-water liquid that causes rapid decay in organic matter."
  },
  {
    name: "The Shattered Arcanum",
    region: "The Gossamer Isles",
    type: "Ruins",
    dangerLevel: "Extreme",
    description: "The pulverized remains of the great elven mage-college that triggered the First Sundering, still crackling with unstable planar energy after four thousand years."
  },
  {
    name: "Thornwall Citadel",
    region: "The Northern Marches",
    type: "Ruins",
    dangerLevel: "Medium",
    description: "A once-impregnable border fortress breached during the War of the Five Bloods, its walls still bristling with embedded siege-bolts and the rusted blades of the fallen."
  },
  {
    name: "The Drowned Temple of Tethys",
    region: "The Shimmering Sea",
    type: "Ruins",
    dangerLevel: "High",
    description: "A colossal underwater temple dedicated to the Abyssal Mother, accessible only during the lowest tides and swarming with aggressive deep-sea predators guarding its treasures."
  },
  {
    name: "The Hollowed Throne",
    region: "Ashenmoor Wastes",
    type: "Ruins",
    dangerLevel: "Medium",
    description: "The cracked and fire-blackened throne room of a forgotten orcish warchief, half-buried in volcanic ash and rumored to still contain his enchanted war-crown."
  },
  {
    name: "The Bone Cathedral",
    region: "The Southern Blightlands",
    type: "Ruins",
    dangerLevel: "Extreme",
    description: "A massive structure built entirely from the fused skeletal remains of an ancient army, radiating necromantic energy so potent that the dead spontaneously rise within its walls."
  },
  {
    name: "Meridia's Last Stand",
    region: "Blackhollow Crater",
    type: "Ruins",
    dangerLevel: "Extreme",
    description: "The scorched crater where the Archmage Meridia sacrificed herself to seal the Hell-Rift, the ground still glowing with fading divine energy that repels fiends."
  },
  {
    name: "The Sunken Dwarfhold of Khaz-Gorum",
    region: "The Flooded Deeps",
    type: "Ruins",
    dangerLevel: "High",
    description: "Once the richest dwarven mining city in the world, Khaz-Gorum was drowned when miners breached an underground sea, its gold-veined halls now ruled by aquatic horrors."
  },
  {
    name: "The Serpent's Library",
    region: "The Eastern Jungles",
    type: "Ruins",
    dangerLevel: "Medium",
    description: "An ancient naga archive carved into cliff faces, its stone shelves still holding thousands of petrified scroll-cases written in a language no living scholar has deciphered."
  },
  {
    name: "The Tower of Failed Stars",
    region: "The Frigid North",
    type: "Ruins",
    dangerLevel: "High",
    description: "A half-collapsed astral observatory built by elven star-gazers, its shattered lenses still occasionally focusing beams of concentrated moonlight that cut through solid stone."
  },

  // ==========================================
  // NATURAL
  // ==========================================
  {
    name: "The Titan's Ribcage",
    region: "Bonegrasp Plains",
    type: "Natural",
    dangerLevel: "Medium",
    description: "Massive ivory arches curving out of the earth, believed to be the remains of a primordial colossus, now serving as a shaded resting ground for nomadic centaurs."
  },
  {
    name: "The Whispering Falls",
    region: "The Sylvan Concord",
    type: "Natural",
    dangerLevel: "Low",
    description: "A gentle cascade of luminescent water where one can hear disjointed echoes of the past whispering through the mist if they listen closely enough."
  },
  {
    name: "The Bleeding Caverns",
    region: "The Red Mountains",
    type: "Natural",
    dangerLevel: "High",
    description: "A vast cave system whose walls weep a thick, warm, iron-rich liquid that looks and smells exactly like fresh blood, staining everything crimson within hours."
  },
  {
    name: "The Petrified Forest of Ghal",
    region: "The Western Badlands",
    type: "Natural",
    dangerLevel: "Medium",
    description: "An entire forest turned to grey stone by an ancient basilisk colony, the stone trees standing in perfect, eerie silence with calcified birds still perched on their branches."
  },
  {
    name: "The Great Sinkhole of Varn",
    region: "The Free Marches",
    type: "Natural",
    dangerLevel: "Extreme",
    description: "A colossal pit that appeared overnight, swallowing an entire village, its depths seemingly bottomless with strange, rhythmic breathing sounds echoing from far below."
  },
  {
    name: "The Singing Dunes",
    region: "The Golden Desert",
    type: "Natural",
    dangerLevel: "Medium",
    description: "Vast sand dunes that produce a low, haunting hum when the wind blows from the east, luring exhausted travelers off the caravan routes to wander until they die."
  },
  {
    name: "The Moonwell of Ealdor",
    region: "The Heartlands",
    type: "Natural",
    dangerLevel: "Low",
    description: "A perfectly circular pool of silver-tinged water that glows softly under the full moon and is said to heal any wound if applied before the light fades."
  },
  {
    name: "The Thundering Caldera",
    region: "The Ashen Peaks",
    type: "Natural",
    dangerLevel: "Extreme",
    description: "An active volcanic crater that erupts in perfectly rhythmic intervals every nine days, its lava flows home to fire salamanders and magma elementals of terrible fury."
  },
  {
    name: "The Living Glacier of Skorn",
    region: "The Frigid North",
    type: "Natural",
    dangerLevel: "High",
    description: "An impossibly massive glacier that appears to move against the wind and occasionally shifts direction with grinding, thunderous force as if directed by a sleeping intelligence."
  },
  {
    name: "The Corpseflower Fields",
    region: "The Morghast Bog",
    type: "Natural",
    dangerLevel: "Medium",
    description: "A vast meadow of enormous, putrid-smelling flowers that bloom only over buried corpses, their sweet nectar a powerful sedative that renders the unwary unconscious in minutes."
  },

  // ==========================================
  // MONUMENT
  // ==========================================
  {
    name: "Statue of the First King",
    region: "Goldhaven",
    type: "Monument",
    dangerLevel: "Low",
    description: "A three-hundred-foot-tall marble representation of King Eldorath, holding a sword pointed northward toward the frost-wastes from which the original threat once came."
  },
  {
    name: "The Dawnfather's Cathedral",
    region: "Goldhaven",
    type: "Monument",
    dangerLevel: "Low",
    description: "The largest temple to Aelor in the known world, its golden dome visible for miles, housing the sacred eternal flame that has burned without fuel for nine centuries."
  },
  {
    name: "The Wall of Oaths",
    region: "Ironhold",
    type: "Monument",
    dangerLevel: "Low",
    description: "A mile-long granite wall covered in carved dwarven oaths and ancestral pledges, each chisel-mark representing a clan's solemn promise to defend the mountain holds forever."
  },
  {
    name: "The Gallows Tree of Crossways",
    region: "The Free Marches",
    type: "Monument",
    dangerLevel: "Medium",
    description: "An enormous dead oak festooned with hundreds of rusted iron cages, still used by the Free Marches to publicly execute bandits and murderers as a warning to others."
  },
  {
    name: "The Obelisk of the Sealed Rift",
    region: "Blackhollow Crater",
    type: "Monument",
    dangerLevel: "High",
    description: "A towering obsidian obelisk inscribed with binding runes that reinforces the seal over the Hell-Rift, maintained at great cost by a permanent garrison of mage-wardens."
  },
  {
    name: "The Bridge of Titans",
    region: "The World-Spine Mountains",
    type: "Monument",
    dangerLevel: "Medium",
    description: "An impossible natural stone arch spanning a two-mile chasm, carved by primordial hands and wide enough for three war-wagons to pass abreast with room to spare."
  },
  {
    name: "The Victory Column of Thornwall",
    region: "The Northern Marches",
    type: "Monument",
    dangerLevel: "Low",
    description: "A towering stone column listing the names of every soldier who fell during the War of the Five Bloods, its base permanently stained by offerings of wine and blood."
  },
  {
    name: "The Lighthouse of the Drowned",
    region: "The Shattered Coast",
    type: "Monument",
    dangerLevel: "Medium",
    description: "A crumbling coastal lighthouse whose magical beacon still burns with pale green fire, visible for leagues at sea, but attracting ghost ships as often as living ones."
  },
  {
    name: "The Iron Colossus of Varn",
    region: "The Free Marches",
    type: "Monument",
    dangerLevel: "Low",
    description: "A hundred-foot war-golem that ran out of magical fuel mid-stride centuries ago, now standing frozen as a landmark used by caravans to navigate the featureless plains."
  },
  {
    name: "The Throne of the World-Tree",
    region: "The Sylvan Concord",
    type: "Monument",
    dangerLevel: "Medium",
    description: "A massive throne carved into the living trunk of the Great World-Tree, where the Archdruid holds court and dispenses judgment over crimes against the natural order."
  },

  // ==========================================
  // MAGICAL ANOMALY
  // ==========================================
  {
    name: "The Sun-Glass Crater",
    region: "The Golden Desert",
    type: "Magical Anomaly",
    dangerLevel: "Extreme",
    description: "A massive crater lined with iridescent glass formed by ancient dragonfire, whose focused sunlight at midday incinerates anything unfortunate enough to pass overhead."
  },
  {
    name: "The Weeping Wound",
    region: "The Southern Blightlands",
    type: "Magical Anomaly",
    dangerLevel: "Extreme",
    description: "A festering gash in the earth from which pure necrotic energy seeps like pus from an infected wound, slowly spreading the Shadow-Blight across the surrounding countryside."
  },
  {
    name: "The Timeless Glade",
    region: "The Sylvan Concord",
    type: "Magical Anomaly",
    dangerLevel: "Medium",
    description: "A forest clearing where time flows differently, a single day inside equaling a full year outside, trapping unwary travelers in an accelerated prison of seasons."
  },
  {
    name: "The Null-Stone Plateau",
    region: "The Western Badlands",
    type: "Magical Anomaly",
    dangerLevel: "High",
    description: "A flat, featureless expanse of grey rock where all magic ceases to function entirely, rendering spellcasters powerless and causing magical constructs to crumble to inert dust."
  },
  {
    name: "The Inverted Tower",
    region: "The Gossamer Isles",
    type: "Magical Anomaly",
    dangerLevel: "Extreme",
    description: "An entire wizard's tower that hangs upside-down from a floating island, its rooms and corridors obeying reversed gravity and its original occupant still researching inside."
  },
  {
    name: "The Screaming Stones",
    region: "The Ashen Peaks",
    type: "Magical Anomaly",
    dangerLevel: "High",
    description: "A circle of standing stones that emit a deafening, agonized shriek at irregular intervals, believed to be the trapped souls of ancient mages who failed a binding ritual."
  },
  {
    name: "The Mirror Lake",
    region: "The Heartlands",
    type: "Magical Anomaly",
    dangerLevel: "Medium",
    description: "A perfectly still lake whose surface reflects not the current sky but an entirely different world, occasionally allowing objects to pass through to the other side."
  },
  {
    name: "The Gravity Well of Skarn",
    region: "The World-Spine Mountains",
    type: "Magical Anomaly",
    dangerLevel: "High",
    description: "A deep mountain valley where gravity pulls in all directions at once, causing loose rocks, water, and unwary travelers to float helplessly until the effect subsides."
  },
  {
    name: "The Dreamfield",
    region: "The Eastern Isles",
    type: "Magical Anomaly",
    dangerLevel: "Medium",
    description: "A meadow of lavender flowers that induces vivid, shared hallucinations in anyone who breathes the pollen, sometimes revealing truths and sometimes inflicting lasting madness."
  },
  {
    name: "The Frozen Inferno",
    region: "The Frigid North",
    type: "Magical Anomaly",
    dangerLevel: "Extreme",
    description: "A raging magical bonfire that burns with intense cold instead of heat, flash-freezing everything within fifty paces while casting a warm, inviting orange glow visible for miles."
  }
];
