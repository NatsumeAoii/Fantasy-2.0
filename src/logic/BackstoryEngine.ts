import type { Character } from '../types';
import { getRandomElement, getRandom } from '../lib/randomUtils';
import * as Story from '../data/story/backstory';
import { STAT_TRAITS, RACE_TRAITS, ROLE_TRAITS, PERSONALITY_POOL, STAT_PERSONALITY, AGE_TRAITS, AGE_PERSONALITY } from '../data/story';
import { getSpecialPowerDisplayNames } from '../lib/specialPowerText';
import { GENERATION_CONSTANTS } from '../config';

const FALLBACK_TEXT = 'An unknown chapter in the chronicle.';

function safeTemplate(pool: Story.TemplateFn[], ctx: Story.BackstoryContext, fallback = FALLBACK_TEXT): string {
    const fn = getRandomElement(pool);
    return fn ? fn(ctx) : fallback;
}

export interface Backstory {
    paragraphs: string[];
    summary: string;
    attribution: string;
    traits: string[];
    personality: string[];
}

function buildContext(character: Character): Story.BackstoryContext {
    const baseEntries = Object.entries(character.stats.base) as [string, number][];
    const highestStat = baseEntries.reduce(
        (best, curr) => curr[1] > best[1] ? curr : best,
        baseEntries[0] ?? ['strength', 0]
    )[0];

    return {
        name: character.name,
        race: character.race,
        role: character.role,
        level: character.level,
        age: character.age,
        region: character.region,
        guild: character.guild,
        faction: character.faction,
        skills: character.skills.map(s => s.name),
        titles: character.titles.map(t => t.name),
        specialPowers: getSpecialPowerDisplayNames(character.specialPowers),
        highestStat: highestStat.replace(/([A-Z])/g, ' $1').trim(),
    };
}

function getTieredTemplates(low: Story.TemplateFn[], mid: Story.TemplateFn[], high: Story.TemplateFn[], level: number): Story.TemplateFn[] {
    if (level >= 500) return high;
    if (level >= 70) return mid;
    return low;
}

function pickUnique<T>(pool: T[], count: number): T[] {
    const available = [...pool];
    const result: T[] = [];
    const target = Math.min(count, available.length);
    while (result.length < target) {
        const idx = Math.floor(getRandom() * available.length);
        result.push(available.splice(idx, 1)[0]);
    }
    return result;
}

function getStoryConfig(level: number) {
    const cfg = GENERATION_CONSTANTS.STORY.CONFIG_BY_LEVEL;
    return cfg.find(c => level <= c.maxLevel) || cfg[cfg.length - 1];
}

function getAgeBonus(age: number) {
    const cfg = GENERATION_CONSTANTS.STORY.AGE_BONUS;
    return (cfg.find(c => age <= c.maxAge) || cfg[cfg.length - 1]).bonus;
}

function getAgeBracket(age: number): string {
    if (age <= 25) return 'young';
    if (age <= 200) return 'mature';
    if (age <= 1500) return 'old';
    return 'ancient';
}

function hasAnyKeyword(value: string, keywords: string[]): boolean {
    const normalized = value.toLowerCase();
    return keywords.some(keyword => normalized.includes(keyword));
}

function getFactionFlavorPool(ctx: Story.BackstoryContext): Story.TemplateFn[] | null {
    if (ctx.guild === 'None' || ctx.faction === 'None') return null;

    const profile = `${ctx.faction} ${ctx.guild} ${ctx.role}`;
    if (hasAnyKeyword(profile, ['arcane', 'mage', 'magi', 'wizard', 'scholar', 'archive', 'lore', 'college', 'witch'])) {
        return Story.FACTION_ARCANE_POOL;
    }
    if (hasAnyKeyword(profile, ['shadow', 'assassin', 'thief', 'rogue', 'smuggler', 'raider', 'marauder', 'black', 'night'])) {
        return Story.FACTION_SHADOW_POOL;
    }

    return Story.FACTION_MILITARY_POOL;
}

function generateTraits(ctx: Story.BackstoryContext): string[] {
    const traits: string[] = [];
    const cfg = getStoryConfig(ctx.level);
    const ageBonus = getAgeBonus(ctx.age);

    const statKey = ctx.highestStat.toLowerCase().replace(/ /g, '');
    const statPool = STAT_TRAITS[statKey];
    if (statPool) {
        traits.push(...pickUnique(statPool, cfg.traits.stat));
    }

    const racePool = RACE_TRAITS[ctx.race] || RACE_TRAITS['default'] || [];
    traits.push(...pickUnique(racePool, cfg.traits.race));

    const rolePool = ROLE_TRAITS[ctx.role] || ROLE_TRAITS['default'] || [];
    traits.push(...pickUnique(rolePool, cfg.traits.role));

    // Age-based bonus traits
    const bracket = getAgeBracket(ctx.age);
    const agePool = AGE_TRAITS[bracket] || [];
    if (ageBonus.traits > 0 && agePool.length > 0) {
        const ageTraits = pickUnique(agePool, ageBonus.traits).filter(t => !traits.includes(t));
        traits.push(...ageTraits);
    }

    // Fill to minimum from defaults if short
    if (traits.length < cfg.traits.min) {
        const fallback = RACE_TRAITS['default'] || [];
        const remaining = fallback.filter(t => !traits.includes(t));
        traits.push(...pickUnique(remaining, cfg.traits.min - traits.length));
    }

    return [...new Set(traits)];
}

function generatePersonality(ctx: Story.BackstoryContext): string[] {
    const cfg = getStoryConfig(ctx.level);
    const ageBonus = getAgeBonus(ctx.age);
    const pool = [...PERSONALITY_POOL];

    // Add stat-influenced personality
    const statKey = ctx.highestStat.toLowerCase().replace(/ /g, '');
    const statPersonality = STAT_PERSONALITY[statKey];
    if (statPersonality) {
        pool.push(...statPersonality);
    }

    // Base personality count (random between min and max)
    const baseCount = cfg.personality.min + Math.floor(getRandom() * (cfg.personality.max - cfg.personality.min + 1));
    const result = pickUnique(pool, baseCount);

    // Age-based bonus personality
    const bracket = getAgeBracket(ctx.age);
    const agePool = AGE_PERSONALITY[bracket] || [];
    if (ageBonus.personality > 0 && agePool.length > 0) {
        const ageQuirks = pickUnique(agePool, ageBonus.personality).filter(q => !result.includes(q));
        result.push(...ageQuirks);
    }

    return result;
}

export const BackstoryEngine = {
    generate(character: Character): Backstory {
        const ctx = buildContext(character);
        const paragraphs: string[] = [];

        // 1. Origin
        const originTmpls = getTieredTemplates(Story.ORIGIN_LOW, Story.ORIGIN_MID, Story.ORIGIN_HIGH, ctx.level);
        paragraphs.push(safeTemplate(originTmpls, ctx));

        // 2. Calling
        const callingTmpls = getTieredTemplates(Story.CALLING_LOW, Story.CALLING_MID, Story.CALLING_HIGH, ctx.level);
        paragraphs.push(safeTemplate(callingTmpls, ctx));

        // 3. Allegiance
        let allegianceTmpls: Story.TemplateFn[];
        if (ctx.guild !== 'None' && ctx.faction !== 'None') {
            allegianceTmpls = getTieredTemplates(Story.ALLEGIANCE_FULL_LOW, Story.ALLEGIANCE_FULL_MID, Story.ALLEGIANCE_FULL_HIGH, ctx.level);
        } else if (ctx.guild !== 'None') {
            allegianceTmpls = getTieredTemplates(Story.ALLEGIANCE_GUILD_LOW, Story.ALLEGIANCE_GUILD_MID, Story.ALLEGIANCE_GUILD_HIGH, ctx.level);
        } else {
            allegianceTmpls = getTieredTemplates(Story.ALLEGIANCE_NONE_LOW, Story.ALLEGIANCE_NONE_MID, Story.ALLEGIANCE_NONE_HIGH, ctx.level);
        }
        paragraphs.push(safeTemplate(allegianceTmpls, ctx));

        // 4. Faction flavor
        const factionFlavorPool = getFactionFlavorPool(ctx);
        if (factionFlavorPool) {
            paragraphs.push(safeTemplate(factionFlavorPool, ctx));
        }

        // 5. Present
        const presentTmpls = getTieredTemplates(Story.PRESENT_LOW, Story.PRESENT_MID, Story.PRESENT_HIGH, ctx.level);
        paragraphs.push(safeTemplate(presentTmpls, ctx));

        // 6. Destiny or Closing
        if (ctx.specialPowers.length > 0) {
            const destinyTmpls = getTieredTemplates(Story.DESTINY_LOW, Story.DESTINY_MID, Story.DESTINY_HIGH, ctx.level);
            paragraphs.push(safeTemplate(destinyTmpls, ctx));
        } else {
            const closingTmpls = getTieredTemplates(Story.CLOSING_LOW, Story.CLOSING_MID, Story.CLOSING_HIGH, ctx.level);
            paragraphs.push(safeTemplate(closingTmpls, ctx));
        }

        // Summary
        const summaryTmpls = getTieredTemplates(Story.SUMMARY_LOW, Story.SUMMARY_MID, Story.SUMMARY_HIGH, ctx.level);
        const summary = safeTemplate(summaryTmpls, ctx, `A ${ctx.race} ${ctx.role} of level ${ctx.level}.`);

        // Attribution
        const attributionTmpls = getTieredTemplates(Story.ATTRIBUTION_LOW, Story.ATTRIBUTION_MID, Story.ATTRIBUTION_HIGH, ctx.level);
        const attribution = safeTemplate(attributionTmpls, ctx, '— Chronicles of Aetheris');

        // Traits & Personality
        const traits = generateTraits(ctx);
        const personality = generatePersonality(ctx);

        return { paragraphs, summary, attribution, traits, personality };
    }
};
