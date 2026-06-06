import { getRandomElement, getRandomElements, getRandomNumber, getRandom } from '../lib/randomUtils';
import { GENERATION_CONSTANTS } from '../config';
import { resolveIconName } from '../data/inventory/icons';
import {
    RANKS, ORDERED_RANK_NAMES, RACES, ROLES,
    unlogicalCombinations, ROLE_SKILLS, ROLE_TITLES,
    specialPowersConfig, SKILL_DESC_TEMPLATES, TITLE_DESC_TEMPLATES,
} from '../data/character';
import { RACE_REGIONS, REGION_GUILDS, FACTIONS } from '../data/world';

const RACE_NAMES = Object.keys(RACES);
const ROLE_NAMES = Object.keys(ROLES);

// Pre-compute invalid roles per race from unlogicalCombinations (static data).
// Eliminates per-call Set construction and array filtering.
const INVALID_ROLES_BY_RACE = new Map<string, Set<string>>();
for (const combo of unlogicalCombinations) {
    for (const race of combo.races) {
        const existing = INVALID_ROLES_BY_RACE.get(race);
        if (existing) {
            combo.roles.forEach(role => existing.add(role));
        } else {
            INVALID_ROLES_BY_RACE.set(race, new Set(combo.roles));
        }
    }
}

// Pre-compute valid roles per race for O(1) lookup during generation.
const VALID_ROLES_BY_RACE = new Map<string, string[]>();
for (const race of RACE_NAMES) {
    const invalidRoles = INVALID_ROLES_BY_RACE.get(race);
    if (invalidRoles && invalidRoles.size > 0) {
        VALID_ROLES_BY_RACE.set(race, ROLE_NAMES.filter(role => !invalidRoles.has(role)));
    } else {
        VALID_ROLES_BY_RACE.set(race, ROLE_NAMES);
    }
}

function reportLoreWarning(message: string): void {
    if (import.meta.env?.DEV && import.meta.env.MODE !== 'test') {
        console.warn(message);
    }
}

export const LoreEngine = {
    assignRaceAndRole() {
        if (RACE_NAMES.length === 0 || ROLE_NAMES.length === 0) {
            reportLoreWarning('[LoreEngine] RACE_NAMES or ROLE_NAMES is empty — data may have failed to load.');
            return { race: 'Human', role: 'Warrior' };
        }

        if (getRandom() < GENERATION_CONSTANTS.PROBABILITY.UNLOGICAL_COMBO_BYPASS_CHANCE) {
            return { race: getRandomElement(RACE_NAMES) ?? 'Human', role: getRandomElement(ROLE_NAMES) ?? 'Warrior' };
        }

        const race = getRandomElement(RACE_NAMES) ?? 'Human';
        const validRoles = VALID_ROLES_BY_RACE.get(race) ?? ROLE_NAMES;

        if (validRoles.length === 0) {
            reportLoreWarning(`No logical roles found for race: ${race}. Defaulting to random role.`);
            return { race, role: getRandomElement(ROLE_NAMES) ?? 'Warrior' };
        }

        return { race, role: getRandomElement(validRoles) ?? getRandomElement(ROLE_NAMES) ?? 'Warrior' };
    },

    determineAffiliations(race: string): { region: string; guild: string; faction: string } {
        const regionsForRace = RACE_REGIONS[race] ?? [];
        const fallbackRegions = Object.keys(RACE_REGIONS);
        const availableRegions = regionsForRace.length > 0 ? regionsForRace : fallbackRegions;
        const region: string = getRandomElement(availableRegions) || "Unknown Lands";

        const guildsInRegion = REGION_GUILDS[region] || [];
        const canHaveGuild = guildsInRegion.length > 0 && getRandom() < GENERATION_CONSTANTS.PROBABILITY.GUILD_MEMBERSHIP_CHANCE;
        const guild: string = canHaveGuild ? getRandomElement(guildsInRegion) ?? "None" : "None";

        let faction: string = "None";
        const canHaveFaction = guild !== "None" && getRandom() < GENERATION_CONSTANTS.PROBABILITY.FACTION_ALIGNMENT_CHANCE;
        if (canHaveFaction) {
            const potentialFactions = Object.entries(FACTIONS)
                .filter(([, guildsInFaction]) => (guildsInFaction as string[]).includes(guild))
                .map(([factionName]) => factionName);
            faction = getRandomElement(potentialFactions) || "None";
        }

        return { region, guild, faction };
    },

    generateSpecialPowers(role: string, race: string, level: number) {
        const { SPECIAL_POWERS } = GENERATION_CONSTANTS;
        const isHighLevel = level >= SPECIAL_POWERS.HIGH_LEVEL_THRESHOLD;
        const powerRange = isHighLevel ? SPECIAL_POWERS.VALUE_RANGE.HIGH_LEVEL : SPECIAL_POWERS.VALUE_RANGE.LOW_LEVEL;

        const specialPowers: Record<string, number> = {};
        for (const powerConfig of specialPowersConfig) {
            const isEligible = powerConfig.roles?.includes(role) || powerConfig.races?.includes(race);
            if (powerConfig.id && isEligible) {
                specialPowers[powerConfig.id] = getRandomNumber(powerRange.min, powerRange.max);
            }
        }
        return specialPowers;
    },

    generateSkillsAndTitles(role: string, level: number, isWanderer: boolean) {
        const { SKILLS_AND_TITLES, PROBABILITY } = GENERATION_CONSTANTS;

        const getConfigForLevel = () => {
            if (isWanderer) return SKILLS_AND_TITLES.WANDERER_CONFIG;
            const levelBrackets = SKILLS_AND_TITLES.CONFIG_BY_LEVEL;
            return levelBrackets.find(bracket => level <= bracket.maxLevel) ?? levelBrackets[levelBrackets.length - 1];
        };

        const config = getConfigForLevel();

        let maxSkills = config.skills.max;
        let maxTitles = config.titles.max;

        const hasBonus = 'bonus' in config;
        const isProdigy = !isWanderer && hasBonus && getRandom() < PROBABILITY.PRODIGY_BONUS_CHANCE;

        if (isProdigy && hasBonus) {
            const bonus = (config as { bonus: { skills: number; titles: number } }).bonus;
            maxSkills += bonus.skills;
            maxTitles += bonus.titles;
        }

        const numSkills = getRandomNumber(config.skills.min, maxSkills);
        const numTitles = getRandomNumber(config.titles.min, maxTitles);

        const minRankCode = config.ranks.min;
        const maxRankCode = config.ranks.max;

        const minPowerLevel = RANKS[minRankCode]?.powerLevel ?? 0;
        const maxPowerLevel = RANKS[maxRankCode]?.powerLevel ?? Infinity;

        const validRanks = ORDERED_RANK_NAMES.filter(name => {
            const rankPower = RANKS[name]?.powerLevel;
            return rankPower !== undefined && rankPower >= minPowerLevel && rankPower <= maxPowerLevel;
        });

        const { SKILL_COST_TABLE } = GENERATION_CONSTANTS;

        const createSkillObject = (name: string) => {
            const rank = getRandomElement(validRanks) || "F";
            let cdString = "Unknown";
            let costString = "Unknown";

            const costData = SKILL_COST_TABLE[rank as keyof typeof SKILL_COST_TABLE];
            if (costData) {
                const cdVal = getRandomNumber(costData.cd.min, costData.cd.max);
                if (costData.cd.unit === 'var') {
                    cdString = "Passive / 12 Hours";
                } else {
                    cdString = `${cdVal}${costData.cd.unit}`;
                }

                const costVal = getRandomNumber(costData.cost.min, costData.cost.max);
                costString = `${costVal} Mana`;
            }

            const descTemplates = SKILL_DESC_TEMPLATES[rank as keyof typeof SKILL_DESC_TEMPLATES] || SKILL_DESC_TEMPLATES["F"];
            const description = getRandomElement(descTemplates);

            return {
                name,
                rank,
                icon: resolveIconName({ name, description, type: 'SKILL' }),
                cooldown: cdString,
                cost: costString,
                description
            };
        };

        const createTitleObject = (name: string) => {
            const rank = getRandomElement(validRanks) || "F";
            const descTemplates = TITLE_DESC_TEMPLATES[rank as keyof typeof TITLE_DESC_TEMPLATES] || TITLE_DESC_TEMPLATES["F"];
            const description = getRandomElement(descTemplates);

            return {
                name,
                rank,
                icon: resolveIconName({ name, description, type: 'TITLE' }),
                description
            };
        };

        const possibleSkills: string[] = ROLE_SKILLS[role] || [];
        const possibleTitles: string[] = ROLE_TITLES[role] || [];

        if (possibleSkills.length === 0) reportLoreWarning(`[LoreEngine] No skills defined for role: ${role}`);
        if (possibleTitles.length === 0) reportLoreWarning(`[LoreEngine] No titles defined for role: ${role}`);

        const skills = getRandomElements(possibleSkills, numSkills).map(createSkillObject);
        const titles = getRandomElements(possibleTitles, numTitles).map(createTitleObject);

        return { skills, titles };
    }
};
