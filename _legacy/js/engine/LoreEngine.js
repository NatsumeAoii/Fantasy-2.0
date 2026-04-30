import { getRandomElement, getRandomElements, getRandomNumber } from "../randomUtils.js";
import { GENERATION_CONSTANTS } from "../generation.config.js";
import { RANKS, ORDERED_RANK_NAMES } from '../data/ranks.js';
import { races } from '../data/race.js';
import { roles } from '../data/roles.js';
import { unlogicalCombinations } from '../data/unlogicalCombinations.js';
import { raceRegion } from '../data/raceRegion.js';
import { raceGuild } from '../data/raceGuild.js';
import { factions } from '../data/factions.js';
import { roleSkills } from '../data/roleSkills.js';
import { titles as roleTitles } from '../data/roleTitles.js';
import { specialPowersConfig } from '../data/specialPowers.js';

export class LoreEngine {
    static assignRaceAndRole() {
        // Occasionally, bypass logical constraints to create rare, unexpected character combinations.
        if (Math.random() < GENERATION_CONSTANTS.PROBABILITY.UNLOGICAL_COMBO_BYPASS_CHANCE) {
            return { race: getRandomElement(races), role: getRandomElement(roles) };
        }

        const race = getRandomElement(races);

        // Identify roles that are illogical for the selected race
        const invalidRoles = new Set();
        for (const combo of unlogicalCombinations) {
            if (combo.races.includes(race)) {
                combo.roles.forEach(role => invalidRoles.add(role));
            }
        }

        // Filter out invalid roles
        const validRoles = roles.filter(role => !invalidRoles.has(role));

        // Fallback if no valid roles exist (should not happen with current data, but good for safety)
        if (validRoles.length === 0) {
            console.warn(`No logical roles found for race: ${race}. Defaulting to random role.`);
            return { race, role: getRandomElement(roles) };
        }

        return { race, role: getRandomElement(validRoles) };
    }

    static determineAffiliations(race) {
        const regionsForRace = raceRegion[race] ?? [];
        const fallbackRegions = Object.keys(raceRegion);
        const availableRegions = regionsForRace.length > 0 ? regionsForRace : fallbackRegions;
        const region = getRandomElement(availableRegions) || "Unknown Lands";

        const guildsInRegion = raceGuild[region] || [];
        const canHaveGuild = guildsInRegion.length > 0 && Math.random() < GENERATION_CONSTANTS.PROBABILITY.GUILD_MEMBERSHIP_CHANCE;
        const guild = canHaveGuild ? getRandomElement(guildsInRegion) : "None";

        let faction = "None";
        const canHaveFaction = guild !== "None" && Math.random() < GENERATION_CONSTANTS.PROBABILITY.FACTION_ALIGNMENT_CHANCE;
        if (canHaveFaction) {
            const potentialFactions = Object.entries(factions)
                .filter(([, guildsInFaction]) => guildsInFaction.includes(guild))
                .map(([factionName]) => factionName);
            faction = getRandomElement(potentialFactions) || "None";
        }

        return { region, guild, faction };
    }

    static generateSpecialPowers(role, race, level) {
        const { SPECIAL_POWERS } = GENERATION_CONSTANTS;
        const isHighLevel = level >= SPECIAL_POWERS.HIGH_LEVEL_THRESHOLD;
        const powerRange = isHighLevel ? SPECIAL_POWERS.VALUE_RANGE.HIGH_LEVEL : SPECIAL_POWERS.VALUE_RANGE.LOW_LEVEL;

        const specialPowers = {};
        for (const powerConfig of specialPowersConfig) {
            const isEligible = powerConfig.roles?.includes(role) || powerConfig.races?.includes(race);
            if (powerConfig.id && isEligible) {
                specialPowers[powerConfig.id] = getRandomNumber(powerRange.min, powerRange.max);
            }
        }
        return specialPowers;
    }

    static generateSkillsAndTitles(role, level, isWanderer) {
        const { SKILLS_AND_TITLES, PROBABILITY } = GENERATION_CONSTANTS;

        const getConfigForLevel = () => {
            if (isWanderer) return SKILLS_AND_TITLES.WANDERER_CONFIG;
            const levelBrackets = SKILLS_AND_TITLES.CONFIG_BY_LEVEL;
            return levelBrackets.find(bracket => level <= bracket.maxLevel) ?? levelBrackets[levelBrackets.length - 1];
        };

        const config = getConfigForLevel();
        let { skills: { max: maxSkills }, titles: { max: maxTitles } } = config;

        const isProdigy = !isWanderer && config.bonus && Math.random() < PROBABILITY.PRODIGY_BONUS_CHANCE;
        if (isProdigy) {
            maxSkills += config.bonus.skills;
            maxTitles += config.bonus.titles;
        }

        const numSkills = getRandomNumber(config.skills.min, maxSkills);
        const numTitles = getRandomNumber(config.titles.min, maxTitles);

        const minPowerLevel = RANKS[config.ranks.min]?.powerLevel ?? 0;
        const maxPowerLevel = RANKS[config.ranks.max]?.powerLevel ?? Infinity;
        const validRanks = ORDERED_RANK_NAMES.filter(name => {
            const rankPower = RANKS[name].powerLevel;
            return rankPower >= minPowerLevel && rankPower <= maxPowerLevel;
        });

        const createItemObject = (name) => ({ name, rank: getRandomElement(validRanks) || "F" });
        const skills = getRandomElements(roleSkills[role] || [], numSkills).map(createItemObject);
        const titles = getRandomElements(roleTitles[role] || [], numTitles).map(createItemObject);

        return { skills, titles };
    }
}
