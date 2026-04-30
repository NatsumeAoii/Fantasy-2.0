import { roles } from './roles.js';
import { races } from './race.js';

const RACE_GROUP_NAMES = {
    MASSIVE: ["Giant", "Half-Giant", "Ogre", "Minotaur", "Cyclops", "Troll"],
    BRUTISH_AND_FERAL: ["Orc", "Goblin", "Hobgoblin", "Bugbear", "Kobold", "Werewolf", "Lupine", "Feline", "Lizardfolk"],
    UNHOLY: ["Tiefling", "Cambion", "Incubus", "Oni", "Rakshasa"],
    CELESTIAL: ["Aasimar", "Nephilim", "Valkyrie", "Seraph", "Deva"],
    MAGICAL_AND_GRACEFUL: ["Elf", "Dark Elf", "Frost Elf", "Shadow Elf", "Wood Elf", "High Elf", "Sea Elf", "Sun Elf", "Moon Elf", "Fairy", "Fae", "Sylph", "Dryad", "Nymph", "Pixie", "Draconic", "Half-Dragon"],
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
};

const validatedRaceGroups = {
    massive: races.filter(race => RACE_GROUP_NAMES.MASSIVE.includes(race)),
    unholy: races.filter(race => RACE_GROUP_NAMES.UNHOLY.includes(race)),
    celestial: races.filter(race => RACE_GROUP_NAMES.CELESTIAL.includes(race)),
    magicalAndGraceful: races.filter(race => RACE_GROUP_NAMES.MAGICAL_AND_GRACEFUL.includes(race)),
    brutishAndFeral: races.filter(race => RACE_GROUP_NAMES.BRUTISH_AND_FERAL.includes(race)),
};

const validatedRoleGroups = {
    stealthAndAgility: roles.filter(role => ROLE_GROUP_NAMES.STEALTH_AND_AGILITY.includes(role)),
    holyAndDivine: roles.filter(role => ROLE_GROUP_NAMES.HOLY_AND_DIVINE.includes(role)),
    darkAndUnholy: roles.filter(role => ROLE_GROUP_NAMES.DARK_AND_UNHOLY.includes(role)),
    scholarlyArcane: roles.filter(role => ROLE_GROUP_NAMES.SCHOLARLY_ARCANE.includes(role)),
    mundaneAndLaborer: roles.filter(role => ROLE_GROUP_NAMES.MUNDANE_AND_LABORER.includes(role)),
};

export const unlogicalCombinations = Object.freeze([
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
    // Rule 4: Epic and graceful races do not perform mundane labor.
    {
        races: validatedRaceGroups.magicalAndGraceful,
        roles: validatedRoleGroups.mundaneAndLaborer,
    },
    // Rule 5: Brutish and feral races are not suited for high-level intellectual or scholarly magic.
    {
        races: validatedRaceGroups.brutishAndFeral,
        roles: validatedRoleGroups.scholarlyArcane,
    }
]);