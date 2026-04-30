import { RACES } from './races';
import { ROLES } from './roles';

const raceKeys = Object.keys(RACES);
const roleKeys = Object.keys(ROLES);

const RACE_GROUP_NAMES = {
    MASSIVE: ["Giant", "Half-Giant", "Ogre", "Minotaur", "Cyclops", "Troll"],
    BRUTISH_AND_FERAL: ["Orc", "Goblin", "Hobgoblin", "Bugbear", "Kobold", "Werewolf", "Lupine", "Feline", "Lizardfolk"],
    UNHOLY: ["Tiefling", "Cambion", "Incubus", "Oni", "Rakshasa"],
    CELESTIAL: ["Aasimar", "Nephilim", "Valkyrie", "Seraph", "Deva"],
    MAGICAL_AND_GRACEFUL: ["Elf", "Dark Elf", "Frost Elf", "Shadow Elf", "Wood Elf", "High Elf", "Sea Elf", "Sun Elf", "Moon Elf", "Fairy", "Fae", "Sylph", "Dryad", "Nymph", "Pixie", "Draconic", "Half-Dragon"],
    SMALL_AND_DIMINUTIVE: ["Gnome", "Halfling", "Kobold", "Goblin", "Fairy", "Pixie", "Half-Gnome"],
    AQUATIC_AND_SERPENTINE: ["Sea Elf", "Naga", "Lamia"],
    UNDEAD: ["Undead", "Skeleton", "Zombie"],
    SHAPESHIFTERS: ["Doppelganger", "Shapeshifter", "Changeling"],
    STOUT_AND_RIGID: ["Dwarf", "Duergar", "Half-Giant", "Centaur"],
};

const ROLE_GROUP_NAMES = {
    STEALTH_AND_AGILITY: [
        "Rogue", "Thief", "Master Assassin", "Grandmaster Spy", "Spymaster", "Shadow Infiltrator",
        "Shadowblade", "Spectral Blade", "Darkblade", "Infernal Assassin", "Jester",
        "Bladedancer", "Duelist", "Fencer", "Skirmisher", "Scout", "Page", "Street Urchin"
    ],
    HOLY_AND_DIVINE: [
        "High Paladin", "Lightbringer", "Grandmaster Knight", "Celestial", "Healer", "Sun Priest",
        "Crusader", "Exorcist", "Pilgrim",
        "High Inquisitor", "Inquisitor", "Divine Champion", "Warpriest", "Battle Priest", "Battle Cleric", "Clerk", "Acolyte"
    ],
    DARK_AND_UNHOLY: [
        "Faceless King", "Necromancer", "Shadowmancer", "Voidseer", "Abyssal Sage", "Void Lord",
        "Abyssal Tyrant", "Blood Knight", "Shadowblade", "Darkblade", "Dreadnought", "Warlock",
        "Chaos Knight", "Void Knight", "Demonologist", "Nightmare Binder", "Executioner", "Hangman", "Grave Robber", "Bandit"
    ],
    SCHOLARLY_ARCANE: [
        "Archmage", "Runelord", "Chronomancer", "Arcane Warden", "World-Forger", "Reality-Weaver",
        "Genesis Sage", "High Inquisitor", "Runesmith", "Dreamweaver", "Battle Sage", "Grand Summoner",
        "Time Warden", "Lorekeeper", "Hierophant", "Mystic Knight", "Illusionist", "Scholar", "Arcanist", "Astrologer", "Scribe"
    ],
    MUNDANE_AND_LABORER: [
        "Fletcher", "Trader", "Blacksmith", "Hunter", "Farmer", "Herbalist", "Alchemist",
        "Servant", "Laborer", "Scavenger", "Barkeep", "Woodsman", "Gatherer", "Mercenary",
        "Caravan Guard", "Miner", "Bounty Hunter", "Messenger", "Apothecary", "Sailor",
        "Trapmaker", "Nomad", "Woodcarver", "Sentinel", "Harvester", "Outlaw", "Innkeeper",
        "Stablehand", "Leatherworker", "Fisherman", "Cartographer", "Cook", "Artisan",
        "Minstrel", "Tailor", "Shepherd", "Potter", "Stone Mason", "Baker", "Miller",
        "Pelt Trader", "Brewer", "Gravedigger", "Butcher", "Squire", "Guard", "City Watch",
        "Page", "Street Urchin", "Peddler", "Rat Catcher", "Town Crier", "Carpenter", "Mason",
        "Weaver", "Chandler", "Cobbler", "Jeweler", "Glassblower", "Bookbinder", "Fishmonger",
        "Vintner", "Groom", "Troubadour", "Man-at-Arms", "Clerk", "Tavern Wench"
    ],
    HEAVY_FRONTLINE: [
        "Knight", "Paladin", "Warlord", "Berserker", "Gladiator", "Champion",
        "Iron Sentinel", "Dreadnought", "War Chief", "Crusader", "Battle Cleric", "Warpriest",
        "Grandmaster Knight", "Dragon Knight", "Templar"
    ],
    NATURE_AND_WILD: [
        "Druid", "Ranger", "Beastmaster", "Archdruid", "Totem Warden", "Shaman",
        "Windrider", "Rockwarden", "Stormcaller", "Earthshaker", "Elementalist", "Herbalist", "Woodsman"
    ],
};

const validatedRaceGroups = {
    massive: raceKeys.filter(race => RACE_GROUP_NAMES.MASSIVE.includes(race)),
    unholy: raceKeys.filter(race => RACE_GROUP_NAMES.UNHOLY.includes(race)),
    celestial: raceKeys.filter(race => RACE_GROUP_NAMES.CELESTIAL.includes(race)),
    magicalAndGraceful: raceKeys.filter(race => RACE_GROUP_NAMES.MAGICAL_AND_GRACEFUL.includes(race)),
    brutishAndFeral: raceKeys.filter(race => RACE_GROUP_NAMES.BRUTISH_AND_FERAL.includes(race)),
    smallAndDiminutive: raceKeys.filter(race => RACE_GROUP_NAMES.SMALL_AND_DIMINUTIVE.includes(race)),
    aquaticAndSerpentine: raceKeys.filter(race => RACE_GROUP_NAMES.AQUATIC_AND_SERPENTINE.includes(race)),
    undead: raceKeys.filter(race => RACE_GROUP_NAMES.UNDEAD.includes(race)),
    shapeshifters: raceKeys.filter(race => RACE_GROUP_NAMES.SHAPESHIFTERS.includes(race)),
    stoutAndRigid: raceKeys.filter(race => RACE_GROUP_NAMES.STOUT_AND_RIGID.includes(race)),
};

const validatedRoleGroups = {
    stealthAndAgility: roleKeys.filter(role => ROLE_GROUP_NAMES.STEALTH_AND_AGILITY.includes(role)),
    holyAndDivine: roleKeys.filter(role => ROLE_GROUP_NAMES.HOLY_AND_DIVINE.includes(role)),
    darkAndUnholy: roleKeys.filter(role => ROLE_GROUP_NAMES.DARK_AND_UNHOLY.includes(role)),
    scholarlyArcane: roleKeys.filter(role => ROLE_GROUP_NAMES.SCHOLARLY_ARCANE.includes(role)),
    mundaneAndLaborer: roleKeys.filter(role => ROLE_GROUP_NAMES.MUNDANE_AND_LABORER.includes(role)),
    heavyFrontline: roleKeys.filter(role => ROLE_GROUP_NAMES.HEAVY_FRONTLINE.includes(role)),
    natureAndWild: roleKeys.filter(role => ROLE_GROUP_NAMES.NATURE_AND_WILD.includes(role)),
};

/** Blacklist of race-role combinations that are narratively or mechanically incompatible. */
export const unlogicalCombinations = [
    // Rule 1: Massive races are not sneaky or agile.
    {
        races: validatedRaceGroups.massive,
        roles: validatedRoleGroups.stealthAndAgility,
    },
    // Rule 2: Unholy beings cannot wield holy power.
    {
        races: validatedRaceGroups.unholy,
        roles: validatedRoleGroups.holyAndDivine,
    },
    // Rule 3: Celestial beings do not use dark or demonic powers.
    {
        races: validatedRaceGroups.celestial,
        roles: validatedRoleGroups.darkAndUnholy,
    },
    // Rule 4: Magical and graceful races do not perform mundane labor.
    {
        races: validatedRaceGroups.magicalAndGraceful,
        roles: validatedRoleGroups.mundaneAndLaborer,
    },
    // Rule 5: Brutish and feral races lack the discipline for scholarly arcane study.
    {
        races: validatedRaceGroups.brutishAndFeral,
        roles: validatedRoleGroups.scholarlyArcane,
    },
    // Rule 6: Small and diminutive races cannot hold the frontline in heavy armor.
    {
        races: validatedRaceGroups.smallAndDiminutive,
        roles: validatedRoleGroups.heavyFrontline,
    },
    // Rule 7: Undead cannot channel divine or holy power.
    {
        races: validatedRaceGroups.undead,
        roles: validatedRoleGroups.holyAndDivine,
    },
    // Rule 8: Undead cannot work nature or wild magic — nature rejects them.
    {
        races: validatedRaceGroups.undead,
        roles: validatedRoleGroups.natureAndWild,
    },
    // Rule 9: Aquatic and serpentine races are not suited for mundane landlocked labor.
    {
        races: validatedRaceGroups.aquaticAndSerpentine,
        roles: validatedRoleGroups.mundaneAndLaborer,
    },
    // Rule 10: Shapeshifters cannot maintain the rigid discipline of holy orders.
    {
        races: validatedRaceGroups.shapeshifters,
        roles: validatedRoleGroups.holyAndDivine,
    },
    // Rule 11: Stout and rigid races are not agile enough for stealth work.
    {
        races: validatedRaceGroups.stoutAndRigid,
        roles: validatedRoleGroups.stealthAndAgility,
    },
] as const;
