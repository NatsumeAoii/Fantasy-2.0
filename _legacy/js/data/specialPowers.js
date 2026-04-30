import { roles } from './roles.js';
import { races } from './race.js';

const POWER_DEFINITIONS = {
    divinePower: {
        roleNames: ["Healer", "Paladin", "Saint", "Priest", "Holy Knight", "Templar", "Crusader", "High Paladin", "Lightbringer", "High Inquisitor", "Divine Champion", "Sun Priest", "Battle Cleric", "Battle Priest", "Sword Saint", "Celestial Knight", "Hierophant"],
        raceNames: ["Aasimar", "Seraph", "Valkyrie", "Nephilim", "Deva", "Celestial"],
    },
    darkEnergy: {
        roleNames: ["Necromancer", "Unknown", "Death Knight", "Demon King", "Vampire Lord", "Dark Knight", "Warlock", "Faceless King", "Shadowmancer", "Soulbinder", "Voidseer", "Abyssal Sage", "Blood Knight", "Hexblade", "Demonologist", "Void Lord", "Abyssal Tyrant", "God-Slayer"],
        raceNames: ["Demon", "Vampire", "Tiefling", "Cambion", "Rakshasa", "Oni", "Incubus", "Undead", "Skeleton", "Zombie"],
    },
    elementalPower: {
        roleNames: ["Druid", "Elementalist", "Shaman", "Ranger", "Beastmaster", "Archdruid", "Totem Warden", "Elemental Warden", "Stormcaller", "Earthshaker", "Pyromancer", "Frost Mage", "Windrider", "Rockwarden", "Genesis Sage"],
        raceNames: ["Fae", "Dryad", "Sylph", "Fairy", "Spirit", "Nymph", "Pixie", "Centaur", "Djinn", "Efreet"],
    },
    draconicPower: {
        roleNames: ["Dragon Rider", "Rune Priest", "Magic Swordsman", "Battlemage", "Dragon Knight", "Dragon Sage"],
        raceNames: ["Draconic", "Lamia", "Naga", "Lizardfolk", "Wyvernfolk", "Half-Dragon"],
    },
    stealthPower: {
        roleNames: ["Rogue", "Assassin", "Scout", "Thief", "Shadow Dancer", "Shadowblade", "Shadow Infiltrator", "Infernal Assassin", "Shadow Hunter", "Master Assassin", "Grandmaster Spy"],
        raceNames: ["Doppelganger", "Shapeshifter", "Changeling", "Werewolf", "Lupine", "Feline"],
    },
};

export const specialPowersConfig = Object.freeze(
    Object.entries(POWER_DEFINITIONS).map(([powerId, definition]) => {
        return {
            id: powerId,
            roles: roles.filter(role => definition.roleNames.includes(role)),
            races: races.filter(race => definition.raceNames.includes(race)),
        };
    })
);