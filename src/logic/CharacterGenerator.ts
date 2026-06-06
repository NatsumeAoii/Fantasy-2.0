import { GENERATION_CONSTANTS } from '../config';
import { makeId } from '../lib/idUtils';
import { getRandomNumber, getRandom } from '../lib/randomUtils';
import { StatEngine } from './StatEngine';
import { LoreEngine } from './LoreEngine';
import { InventoryEngine } from './inventory/InventoryEngine';
import { BackstoryEngine } from './BackstoryEngine';
import { CharacterExpansionEngine } from './CharacterExpansionEngine';
import { mergeMagicSpellsIntoSkills } from './MagicEngine';
import { addInventoryContextItemsToSatchel } from './inventory/inventoryContextItems';
import { RACES, ROLES } from '../data/character';
import type { Character, CharacterCore } from '../types';
import { normalizeCharacterName } from '../lib/characterInput';

const DEFAULT_NAME = "Nameless Wanderer";

export const CharacterGenerator = {
    determineCharacterLevel(generationCount: number) {
        if (generationCount > 0) {
            if (generationCount % 1000 === 0) {
                return { level: getRandomNumber(1000, GENERATION_CONSTANTS.LEVEL.MAX), isWanderer: true };
            }
            if (generationCount % 100 === 0) {
                return { level: getRandomNumber(500, 1000), isWanderer: false };
            }
            if (generationCount % 10 === 0) {
                return { level: getRandomNumber(100, 500), isWanderer: false };
            }
        }

        const rules = GENERATION_CONSTANTS.LEVEL.DISTRIBUTION;
        const randomValue = getRandom();
        const bracket = rules.find(b => randomValue < b.threshold) ?? rules[rules.length - 1];

        return {
            level: getRandomNumber(bracket.range.min, bracket.range.max),
            isWanderer: bracket.isWanderer ?? false
        };
    },

    determineCharacterAge(level: number) {
        const brackets = GENERATION_CONSTANTS.AGE.BRACKETS;
        const applicableBracket = brackets.find(b => level <= b.maxLevel) ?? brackets[brackets.length - 1];
        return getRandomNumber(applicableBracket.range.min, applicableBracket.range.max);
    },

    /**
     * Generate a complete character from a name and generation count.
     * @param name Display name for the character (trimmed, falls back to DEFAULT_NAME).
     * @param currentGenerationCount Lifetime roll counter — triggers pity-system bonus tiers.
     * @returns A frozen, ready-to-render Character object with pre-sorted skills/titles.
     */
    generate(name: string = DEFAULT_NAME, currentGenerationCount: number): Character {
        if (Object.keys(RACES).length === 0 || Object.keys(ROLES).length === 0) {
            throw new Error("Core character data (races, roles) is empty.");
        }

        const sanitizedName = normalizeCharacterName(name) || DEFAULT_NAME;

        const { race, role } = LoreEngine.assignRaceAndRole();
        const { level, isWanderer } = this.determineCharacterLevel(currentGenerationCount);
        const age = this.determineCharacterAge(level);

        const affiliations = isWanderer
            ? { region: "Wanderer", guild: "None", faction: "None" }
            : LoreEngine.determineAffiliations(race);

        const stats = StatEngine.generateCharacterStats(race, role, level);

        const specialPowers = LoreEngine.generateSpecialPowers(role, race, level);
        const { skills, titles } = LoreEngine.generateSkillsAndTitles(role, level, isWanderer);

        const inventory = InventoryEngine.generateLoadout(role, level);
        const { dps: _dps, ...combatWithoutDps } = stats.combat;
        inventory.weight.max = InventoryEngine.calculateMaxWeight(
            { ...stats.base, ...combatWithoutDps, ...stats.resource },
            inventory.equipment
        );

        const characterCore: CharacterCore = {
            id: makeId(),
            name: sanitizedName,
            race,
            role,
            level,
            age,
            ...affiliations,
            stats,
            specialPowers,
            skills,
            titles,
            inventory,
            backstory: { paragraphs: [], summary: '', attribution: '', traits: [], personality: [] },
        };

        const expansions = CharacterExpansionEngine.generate(characterCore);
        const inventoryWithGeneratedGoods = addInventoryContextItemsToSatchel(characterCore.inventory, expansions.inventoryContext);

        const character: Character = {
            ...characterCore,
            ...expansions,
            inventory: inventoryWithGeneratedGoods,
            skills: mergeMagicSpellsIntoSkills(characterCore.skills, expansions.magic.spells),
        };

        character.backstory = BackstoryEngine.generate(character);

        return Object.freeze(character) as Character;
    }
};
