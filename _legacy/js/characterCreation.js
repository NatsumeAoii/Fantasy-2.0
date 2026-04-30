import { getRandomNumber } from "./randomUtils.js";
import { GENERATION_CONSTANTS } from "./generation.config.js";
import { races } from './data/race.js';
import { roles } from './data/roles.js';
import { StatEngine } from "./engine/StatEngine.js";
import { LoreEngine } from "./engine/LoreEngine.js";
import { GenerationStateManager } from "./state/GenerationStateManager.js";

const DEFAULT_NAME = "Nameless Wanderer";

function determineCharacterLevel(generationCount) {
    // Pity System: Guaranteed drops based on generation count
    if (generationCount > 0) {
        if (generationCount % 1000 === 0) {
            return {
                level: getRandomNumber(1000, GENERATION_CONSTANTS.LEVEL.MAX),
                isWanderer: true
            };
        }
        if (generationCount % 100 === 0) {
            return {
                level: getRandomNumber(500, 1000),
                isWanderer: false
            };
        }
        if (generationCount % 10 === 0) {
            return {
                level: getRandomNumber(100, 500),
                isWanderer: false
            };
        }
    }

    const rules = GENERATION_CONSTANTS.LEVEL.DISTRIBUTION;
    const randomValue = Math.random();

    const bracket = rules.find(b => randomValue < b.threshold) ?? rules[rules.length - 1];

    return {
        level: getRandomNumber(bracket.range.min, bracket.range.max),
        isWanderer: bracket.isWanderer ?? false
    };
}

function determineCharacterAge(level) {
    const brackets = GENERATION_CONSTANTS.AGE.BRACKETS;
    const applicableBracket = brackets.find(b => level <= b.maxLevel) ?? brackets[brackets.length - 1];
    return getRandomNumber(applicableBracket.range.min, applicableBracket.range.max);
}

export function generateCharacter(name) {
    const hasCoreData = Array.isArray(races) && races.length > 0 && Array.isArray(roles) && roles.length > 0;
    if (!hasCoreData) {
        throw new Error("Core character data (races, roles) is not configured or is empty.");
    }

    const generationCount = GenerationStateManager.incrementGenerationCount();
    const sanitizedName = (typeof name === 'string' && name.trim()) ? name.trim() : DEFAULT_NAME;

    // 1. Lore Engine: Determine Identity
    const { race, role } = LoreEngine.assignRaceAndRole();
    const { level, isWanderer } = determineCharacterLevel(generationCount);
    const age = determineCharacterAge(level);

    // 2. Lore Engine: Determine Affiliations
    const affiliations = isWanderer
        ? { region: "Wanderer", guild: "None", faction: "None" }
        : LoreEngine.determineAffiliations(race);

    // 3. Stat Engine: Calculate Stats
    const stats = StatEngine.generateCharacterStats(race, role, level);

    // 4. Lore Engine: Generate Fluff (Skills, Titles, Powers)
    const specialPowers = LoreEngine.generateSpecialPowers(role, race, level);
    const { skills, titles } = LoreEngine.generateSkillsAndTitles(role, level, isWanderer);

    return {
        name: sanitizedName,
        race,
        role,
        level,
        age,
        ...affiliations,
        stats,
        specialPowers,
        skills,
        titles
    };
}
