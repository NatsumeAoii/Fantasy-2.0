/**
 * A divine being worshipped within the world of Aetheris.
 * Deities have domains of influence, an alignment, and a holy symbol
 * that clerics and paladins may invoke.
 */
export interface Deity {
  id: string;
  name: string;
  domains: string[];
  alignment: string;
  symbol: string;
  description: string;
  tier: 1 | 2 | 3;
  favoredRoles: string[];
  favoredRaces: string[];
  connectedQuests: string[];
}

/** Master list of all deities in the Aetheris pantheon. 25 total. */
export const DEITIES: Deity[] = [
  {
    id: "aelor",
    name: "Aelor, the Dawnfather",
    domains: ["Light", "Life", "Justice"],
    alignment: "Order / Benevolent",
    symbol: "A golden sunburst over a shield",
    description: "Worshipped by paladins and clerics across the Eldorath Kingdom, Aelor represents truth, healing, and the breaking of darkness wherever it festers.",
    tier: 2,
    favoredRoles: ["High Paladin", "Lightbringer", "Celestial Knight", "Hierophant"],
    favoredRaces: ["Human", "Aasimar", "High Elf", "Valkyrie"],
    connectedQuests: ["trial_of_the_dawn", "the_sundered_shield", "pilgrimage_of_radiance", "heresy_of_the_false_light"]
  },
  {
    id: "nyx",
    name: "Nyx, the Weaver of Shadows",
    domains: ["Trickery", "Twilight", "Knowledge"],
    alignment: "Chaos / Impartial",
    symbol: "A silver spiderweb snaring a crescent moon",
    description: "Patron of rogues and secret-keepers, Nyx teaches that truth is best hidden and real power lies in the unseen corridors of the world.",
    tier: 2,
    favoredRoles: ["Master Assassin", "Shadowblade", "Grandmaster Spy", "Faceless King"],
    favoredRaces: ["Shadow Elf", "Changeling", "Doppelganger", "Dark Elf"],
    connectedQuests: ["the_web_of_whispers", "moonlit_heist", "nyx_riddle_of_masks", "the_secret_ledger"]
  },
  {
    id: "tharros",
    name: "Tharros, the Iron Anvil",
    domains: ["Forge", "War", "Protection"],
    alignment: "Order / Impartial",
    symbol: "A flaming warhammer crossed over an anvil",
    description: "Revered by dwarven smiths and soldiers alike, Tharros teaches that resilience and disciplined craftsmanship form the unshakeable foundation of civilization.",
    tier: 2,
    favoredRoles: ["Forge Master", "Iron Lord", "Runesmith", "Ironbound Champion"],
    favoredRaces: ["Dwarf", "Duergar", "Human", "Half-Orc"],
    connectedQuests: ["the_iron_anvil_pact", "forging_the_worldbreaker", "tharros_crucible", "the_shattered_hammer"]
  },
  {
    id: "sylvana",
    name: "Sylvana, the Wild Mother",
    domains: ["Nature", "Tempest", "Beasts"],
    alignment: "Balance / Impartial",
    symbol: "An ancient oak wreathed in crackling lightning",
    description: "The primal force of the untamed wilderness, merciless to those who defile nature but absolute in her provision to those who revere it.",
    tier: 2,
    favoredRoles: ["Archdruid", "Shapeshifter Master", "Ranger", "Storm Herald"],
    favoredRaces: ["Wood Elf", "Dryad", "Centaur", "Feline"],
    connectedQuests: ["wrath_of_the_wild_mother", "the_bleeding_grove", "sylvanas_chosen", "rite_of_the_ancient_oak", "the_last_beast_king"]
  },
  {
    id: "moros",
    name: "Moros, the Pale Judge",
    domains: ["Death", "Grave", "Order"],
    alignment: "Order / Impartial",
    symbol: "A balanced scale carved from bleached bone",
    description: "The inevitable end personified, Moros does not seek to hasten death but ensures the dead are respected and the transition of souls remains undisturbed.",
    tier: 2,
    favoredRoles: ["Soulbinder", "Hierophant", "Battle Oracle", "High Inquisitor"],
    favoredRaces: ["Human", "Aasimar", "Deva", "Spirit"],
    connectedQuests: ["the_pale_judgment", "souls_unmoored", "balance_of_the_grave", "moros_final_toll"]
  },
  {
    id: "verathos",
    name: "Verathos, the Blood Tyrant",
    domains: ["War", "Conquest", "Domination"],
    alignment: "Order / Malevolent",
    symbol: "A crowned iron fist dripping with dark crimson blood",
    description: "God of ruthless ambition and martial supremacy, Verathos demands absolute obedience and rewards only those who conquer through strength of arms and will.",
    tier: 2,
    favoredRoles: ["Warlord", "Skullcrusher", "Iron Lord", "Abyssal Tyrant"],
    favoredRaces: ["Orc", "Half-Orc", "Hobgoblin", "Minotaur"],
    connectedQuests: ["the_blood_tyrants_decree", "verathos_iron_crown", "conquest_of_the_weeping_vale", "the_crimson_oath"]
  },
  {
    id: "lythara",
    name: "Lythara, the Dream Weaver",
    domains: ["Twilight", "Trickery", "Fate"],
    alignment: "Chaos / Impartial",
    symbol: "A blindfolded face trailing threads of starlight",
    description: "Mistress of prophecy and madness, Lythara sends visions through the dreaming world that drive mortals to greatness or to utter, gibbering ruin.",
    tier: 2,
    favoredRoles: ["Dreamweaver", "Voidseer", "Chronomancer", "Star-Caller"],
    favoredRaces: ["Fae", "Nymph", "Half-Fae", "Moon Elf"],
    connectedQuests: ["whispered_madness", "the_dream_eaters_gambit", "lytharas_labyrinth", "thread_of_fates"]
  },
  {
    id: "kharuum",
    name: "Kharuum, the Hungering Void",
    domains: ["Death", "Destruction", "Entropy"],
    alignment: "Chaos / Malevolent",
    symbol: "A gaping black maw ringed by shattered teeth of stone",
    description: "An ancient, formless horror that devours light, warmth, and hope, worshipped only by nihilistic cults who seek the unraveling of all creation.",
    tier: 3,
    favoredRoles: ["Void Lord", "Abyssal Sage", "Shadowmancer", "Void Knight"],
    favoredRaces: ["Tiefling", "Cambion", "Spirit", "Oni"],
    connectedQuests: ["the_hungering_dark", "kharuums_maw", "eclipse_of_all_suns", "the_void_covenant", "unraveling_of_creation"]
  },
  {
    id: "elara",
    name: "Elara, the Silver Maiden",
    domains: ["Moon", "Protection", "Healing"],
    alignment: "Balance / Benevolent",
    symbol: "A full silver moon cradled by two cupped hands",
    description: "Benevolent guardian of travelers and the lost, Elara shines her pale light on those wandering dangerous roads and shields them from the predators of night.",
    tier: 1,
    favoredRoles: ["Lightbringer", "Ranger", "Hierophant", "Celestial Knight"],
    favoredRaces: ["Moon Elf", "Half-Elf", "Fairy", "Sylph"],
    connectedQuests: ["elaras_silver_vigil", "the_moonlit_sanctuary", "tears_of_the_maiden"]
  },
  {
    id: "grakthor",
    name: "Grakthor, the Warchief Eternal",
    domains: ["War", "Strength", "Survival"],
    alignment: "Chaos / Impartial",
    symbol: "A broken tusk impaled through a bleeding skull",
    description: "The savage god of the orcish warclans, Grakthor values nothing but raw strength and the will to take what one desires through violence and cunning.",
    tier: 2,
    favoredRoles: ["Warlord", "Skullcrusher", "Blood Knight", "Titan Slayer"],
    favoredRaces: ["Orc", "Half-Orc", "Bugbear", "Troll"],
    connectedQuests: ["grakthors_trial_of_blood", "the_warchief_challenge", "rite_of_the_broken_tusk", "the_eternal_warcamp"]
  },
  {
    id: "thessane",
    name: "Thessane, the Plaguemother",
    domains: ["Death", "Nature", "Pestilence"],
    alignment: "Balance / Malevolent",
    symbol: "A bloated green fly perched on a rotting lily",
    description: "The patient, festering goddess of disease and decay, Thessane views plague as simply nature's way of pruning the weak from the herd of the living.",
    tier: 1,
    favoredRoles: ["Archdruid", "Necromancer", "Shadowmancer", "Soulbinder"],
    favoredRaces: ["Goblin", "Half-Troll", "Lizardfolk", "Kobold"],
    connectedQuests: ["thessanes_bloom", "the_festering_garden", "plague_of_the_rotmarsh", "gift_of_the_plaguemother"]
  },
  {
    id: "runegar",
    name: "Runegar, the Earthshaper",
    domains: ["Forge", "Earth", "Protection"],
    alignment: "Order / Impartial",
    symbol: "A stone hammer embedded in a cracked geode of amber crystal",
    description: "God of the deep mountain and the living stone, Runegar is invoked by dwarven miners and masons who carve their homes from the world's ancient bones.",
    tier: 1,
    favoredRoles: ["Forge Master", "Runesmith", "Earthshaker", "Dreadnought"],
    favoredRaces: ["Dwarf", "Duergar", "Gnome", "Half-Gnome"],
    connectedQuests: ["the_earthshapers_resonance", "heart_of_the_mountain", "runegars_lost_chisel"]
  },
  {
    id: "zephyra",
    name: "Zephyra, the Storm Dancer",
    domains: ["Tempest", "Freedom", "Travel"],
    alignment: "Chaos / Benevolent",
    symbol: "A pair of outstretched wings made entirely of rolling thunderclouds",
    description: "Goddess of wind and wanderlust, Zephyra blesses sailors, explorers, and all who refuse to be caged by the walls of a single settlement.",
    tier: 1,
    favoredRoles: ["Stormcaller", "Stormbringer", "Ranger", "Chaos Knight"],
    favoredRaces: ["Sylph", "Sea Elf", "Djinn", "Fairy"],
    connectedQuests: ["zephyras_gale", "the_storm_dancers_passage", "wind_unchained", "voyage_of_the_tempest_queen"]
  },
  {
    id: "ashkael",
    name: "Ashkael, the Chained One",
    domains: ["Knowledge", "Madness", "Forbidden Lore"],
    alignment: "Balance / Malevolent",
    symbol: "An open tome with chains binding its pages shut",
    description: "A trapped god of forbidden knowledge, Ashkael whispers terrible truths through the cracks of his divine prison to anyone desperate enough to listen.",
    tier: 3,
    favoredRoles: ["Lorekeeper", "Abyssal Sage", "Voidseer", "Runelord"],
    favoredRaces: ["Tiefling", "High Elf", "Sphinx", "Naga"],
    connectedQuests: ["ashkaels_whisper", "the_chained_gods_prison", "pages_of_the_unbound", "the_price_of_knowing", "madness_of_the_deep_archive"]
  },
  {
    id: "valoris",
    name: "Valoris, the Shield-Saint",
    domains: ["Protection", "Life", "Devotion"],
    alignment: "Order / Benevolent",
    symbol: "A tower shield bearing a radiant golden eye at its center",
    description: "Patron saint of city guards and sworn protectors, Valoris empowers those who place the safety of the innocent above their own mortal survival.",
    tier: 1,
    favoredRoles: ["High Paladin", "Ironbound Champion", "Dreadnought", "Arcane Warden"],
    favoredRaces: ["Human", "Aasimar", "Dwarf", "Nephilim"],
    connectedQuests: ["valoris_unyielding_watch", "the_shield_saints_test", "oath_of_the_golden_eye"]
  },
  {
    id: "morvaine",
    name: "Morvaine, the Queen of Thorns",
    domains: ["Nature", "Vengeance", "Poison"],
    alignment: "Balance / Malevolent",
    symbol: "A black rose with thorns dripping viscous green venom",
    description: "A bitter and wrathful goddess of poisoners and scorned lovers, Morvaine teaches that betrayal is best repaid slowly, painfully, and with botanical precision.",
    tier: 1,
    favoredRoles: ["Shadowblade", "Master Assassin", "Archdruid", "Darkblade"],
    favoredRaces: ["Dark Elf", "Dryad", "Lamia", "Naga"],
    connectedQuests: ["morvaines_bitter_root", "the_thorn_queens_vengeance", "garden_of_scorned_blades"]
  },
  {
    id: "solrath",
    name: "Solrath, the Everburning",
    domains: ["Fire", "Purification", "Zeal"],
    alignment: "Order / Benevolent",
    symbol: "A sword with a blade made entirely of white-hot sacred flame",
    description: "God of cleansing fire and holy inquisition, Solrath commands his followers to burn corruption from the world and leave only purified ash behind.",
    tier: 2,
    favoredRoles: ["High Inquisitor", "Flame Adept", "High Paladin", "Lightbringer"],
    favoredRaces: ["Human", "Efreet", "Sun Elf", "Aasimar"],
    connectedQuests: ["solraths_pyre", "the_everburning_inquisition", "trial_by_sacred_flame", "ash_of_the_heretic"]
  },
  {
    id: "umbrath",
    name: "Umbrath, the Shadow-King",
    domains: ["Trickery", "Shadow", "Assassination"],
    alignment: "Balance / Malevolent",
    symbol: "A dagger plunged into the center of a pool of absolute darkness",
    description: "Lord of assassins and shadow-walkers, Umbrath is the silent patron of every blade that strikes from behind and every poison poured into an unsuspecting chalice.",
    tier: 2,
    favoredRoles: ["Master Assassin", "Shadowblade", "Faceless King", "Grandmaster Spy"],
    favoredRaces: ["Shadow Elf", "Dark Elf", "Cambion", "Rakshasa"],
    connectedQuests: ["umbraths_mark", "the_shadow_kings_contract", "veil_of_the_unseen_blade", "the_chalice_of_final_silence"]
  },
  {
    id: "tethys",
    name: "Tethys, the Abyssal Mother",
    domains: ["Ocean", "Tempest", "Beasts"],
    alignment: "Chaos / Impartial",
    symbol: "A colossal wave cresting over a swallowed merchant galleon",
    description: "The terrible goddess of the deep ocean and everything that lurks within it, Tethys demands offerings of treasure cast overboard before any major voyage.",
    tier: 2,
    favoredRoles: ["Stormcaller", "Stormbringer", "Grand Summoner", "Elementalist"],
    favoredRaces: ["Sea Elf", "Naga", "Lizardfolk", "Djinn"],
    connectedQuests: ["tethys_abyssal_tithe", "the_drowned_armada", "leviathans_wake", "offering_to_the_deep"]
  },
  {
    id: "oghran",
    name: "Oghran, the Hearthkeeper",
    domains: ["Life", "Community", "Harvest"],
    alignment: "Balance / Benevolent",
    symbol: "A steaming cauldron hung over a roaring hearthfire",
    description: "The humble god of farmers, cooks, and innkeepers, Oghran blesses the hearth and the harvest and asks for nothing but a seat at the table.",
    tier: 1,
    favoredRoles: ["Forge Master", "Lorekeeper", "Hierophant", "Archdruid"],
    favoredRaces: ["Halfling", "Human", "Gnome", "Half-Gnome"],
    connectedQuests: ["oghrans_golden_harvest", "the_hearthkeepers_feast", "famine_of_the_blighted_vale"]
  },
  {
    id: "xalthis",
    name: "Xalthis, the Undying Worm",
    domains: ["Undeath", "Corruption", "Forbidden Lore"],
    alignment: "Balance / Malevolent",
    symbol: "A pale serpent devouring its own rotting, skeletal tail",
    description: "The patron of liches and necromancers who defy the cycle of life and death, Xalthis promises immortality but demands the total surrender of one's soul.",
    tier: 3,
    favoredRoles: ["Necromancer", "Abyssal Sage", "Soulbinder", "Void Lord"],
    favoredRaces: ["Tiefling", "Dark Elf", "Cambion", "Spirit"],
    connectedQuests: ["xalthis_undying_bargain", "the_worms_phylactery", "rite_of_the_deathless", "the_soul_tithe", "lichdom_ascendant"]
  },
  {
    id: "veridia",
    name: "Veridia, the Green Lady",
    domains: ["Nature", "Growth", "Healing"],
    alignment: "Balance / Benevolent",
    symbol: "A blooming verdant tree sprouting from a bed of skull-white stones",
    description: "Goddess of growth, renewal, and the slow reclamation of ruins by the patient, creeping forest, Veridia is beloved by druids and herbalists.",
    tier: 1,
    favoredRoles: ["Archdruid", "Hierophant", "Lightbringer", "Ranger"],
    favoredRaces: ["Wood Elf", "Dryad", "Fae", "Centaur"],
    connectedQuests: ["veridias_reclamation", "the_green_ladys_tears", "bloom_amid_bones"]
  },
  {
    id: "kragthan",
    name: "Kragthan, the Mountain's Wrath",
    domains: ["Earth", "Destruction", "Fire"],
    alignment: "Chaos / Malevolent",
    symbol: "An erupting volcano splitting a mountain chain in two",
    description: "The raging god of earthquakes and volcanic fury, Kragthan is feared by all who dwell in the shadow of the great mountain ranges of Aetheris.",
    tier: 2,
    favoredRoles: ["Earthshaker", "Elementalist", "Flame Adept", "Titan Lord"],
    favoredRaces: ["Giant", "Half-Giant", "Efreet", "Minotaur"],
    connectedQuests: ["kragthans_eruption", "the_mountains_wrath_unleashed", "caldera_of_the_damned", "seismic_reckoning"]
  },
  {
    id: "illythis",
    name: "Illythis, the Weeping Muse",
    domains: ["Art", "Sorrow", "Knowledge"],
    alignment: "Balance / Impartial",
    symbol: "A lyre with strings made of crystallized, frozen tears",
    description: "Patroness of bards, painters, and poets who draw their greatest art from profound suffering, Illythis weeps eternally so that beauty may endure.",
    tier: 1,
    favoredRoles: ["Dreamweaver", "Lorekeeper", "Spellslinger", "Star-Caller"],
    favoredRaces: ["Half-Elf", "Nymph", "Fae", "Satyr"],
    connectedQuests: ["illythis_weeping_sonata", "the_muses_tears", "requiem_of_the_broken_lyre"]
  },
  {
    id: "baelthor",
    name: "Baelthor, the Gate-Warden",
    domains: ["Protection", "Order", "Warding"],
    alignment: "Order / Impartial",
    symbol: "An iron portcullis barring a doorway filled with hellish fire",
    description: "The stern guardian of the barriers between planes, Baelthor empowers abjurers and banishers who keep fiends and horrors sealed in their own wretched dimensions.",
    tier: 3,
    favoredRoles: ["Arcane Warden", "Runelord", "High Paladin", "Dreadnought"],
    favoredRaces: ["Dwarf", "Aasimar", "Deva", "Nephilim"],
    connectedQuests: ["baelthors_seal", "the_gate_wardens_vigil", "breach_in_the_veil", "the_planar_lock", "warding_the_hellgate"]
  }
];
