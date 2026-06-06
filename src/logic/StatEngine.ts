import { GENERATION_CONSTANTS } from '../config';
import { getRandomNumber, applyDiminishingReturns } from '../lib/randomUtils';
import type { Stats, RaceData, RoleData, CategorizedCharactersStats, Dps } from '../types';

interface StatCalculationContext {
    raceData: RaceData;
    roleData: RoleData;
    formulas: typeof GENERATION_CONSTANTS.STATS.DERIVATION_FORMULAS;
}

export const StatEngine = {
    calculateLevelBasedBonus(level: number, linearFactor: number, diminishingFactor: number): number {
        if (level <= 1) return 0;
        const linearBonus = level * linearFactor;
        const diminishingBonus = Math.sqrt(level) * diminishingFactor;
        return Math.floor(linearBonus + diminishingBonus);
    },

    calculateBaseStats(race: string, role: string, level: number): Stats {
        const { STATS } = GENERATION_CONSTANTS;
        const baseStats: Stats = {};

        const logarithmicModifier = 1 + Math.log1p(level / 25);
        const scalingModifier = Math.min(logarithmicModifier, STATS.MAX_SCALING_MODIFIER);

        const raceData = STATS.RACE_DATA[race] || { baseStats: {}, affinities: {} };
        const roleData = STATS.ROLE_DATA[role] || { baseStats: {}, affinities: {} };

        for (const stat of Object.keys(STATS.BASE_STAT_GROWTH_FACTORS)) {
            const growthFactors = STATS.BASE_STAT_GROWTH_FACTORS[stat as keyof typeof STATS.BASE_STAT_GROWTH_FACTORS];
            const levelBonus = this.calculateLevelBasedBonus(level, growthFactors.linear, growthFactors.diminishing);

            const randomBase = getRandomNumber(STATS.BASE_STAT_RANGE.min, STATS.BASE_STAT_RANGE.max);
            const randomBonus = getRandomNumber(STATS.BONUS_STAT_RANGE.min, STATS.BONUS_STAT_RANGE.max);

            const raceStat = raceData.baseStats?.[stat] ?? 0;
            const roleStat = roleData.baseStats?.[stat] ?? 0;

            const totalStat = raceStat + roleStat + randomBase + randomBonus + levelBonus;

            const raceAffinity = raceData.affinities?.[stat] ?? 1.0;
            const roleAffinity = roleData.affinities?.[stat] ?? 1.0;

            const finalStat = totalStat * scalingModifier * raceAffinity * roleAffinity;

            baseStats[stat] = Math.min(Math.floor(finalStat), STATS.MAX_BASE_STAT);
        }
        return baseStats;
    },

    calculateDerivedStat(statKey: string, baseStats: Stats, level: number, context: StatCalculationContext): number {
        const { raceData, roleData, formulas } = context;
        const formula = formulas[statKey];
        if (!formula) return 0;

        let total = formula.base || 0;

        if (formula.dependencies) {
            for (const [key, multiplier] of Object.entries(formula.dependencies)) {
                total += (baseStats[key] || 0) * multiplier;
            }
        }

        if (formula.growthFactor) {
            total += level * formula.growthFactor;
        }

        total += (raceData.derivedStats?.[statKey] || 0) + (roleData.derivedStats?.[statKey] || 0);

        return Math.max(0, Math.floor(total));
    },

    calculateDps(combatStats: Stats, level: number = 1): Dps {
        const { attackPower = 0, magicPower = 0, attackSpeed = 0, critChance = 0, critDamageBonus = 0 } = combatStats;
        const { dps: dpsFormula } = GENERATION_CONSTANTS.STATS.DERIVATION_FORMULAS;
        const mitConfig = GENERATION_CONSTANTS.STATS.DEFENSE_MITIGATION;

        const primaryDamage = Math.max(attackPower, magicPower);
        const baseDamageComponent = (primaryDamage * dpsFormula.dependencies.primaryDamage) + (attackSpeed * dpsFormula.dependencies.attackSpeed);

        const effectiveCritChance = Math.max(0, Math.min(critChance, 100)) / 100;
        const effectiveCritBonus = Math.max(0, critDamageBonus - 100) / 100;
        const critMultiplier = 1 + (effectiveCritChance * effectiveCritBonus);

        const centralDps = baseDamageComponent * critMultiplier;
        const dpsVariance = Math.max(1, Math.floor(centralDps * (dpsFormula.variance || 0.2)));

        // Apply defense mitigation to produce effective DPS values.
        // defense and magicResist from combatStats are passed through the
        // same object — use the higher of the two as the defender's mitigation.
        const defense = (combatStats.defense ?? 0);
        const magicResist = (combatStats.magicResist ?? 0);
        const effectiveDefense = Math.max(defense, magicResist);
        const K = mitConfig.K_BASE + level * mitConfig.K_PER_LEVEL;
        const mitigationFactor = 1 - (effectiveDefense / (effectiveDefense + K));

        // Evasion reduces effective DPS by a miss chance (capped).
        const evasion = (combatStats.evasion ?? 0);
        const rawMissChance = evasion / (evasion + K);
        const missChance = Math.min(rawMissChance, mitConfig.EVASION_MISS_CHANCE_CAP);
        const hitChance = 1 - missChance;

        const effectiveDps = centralDps * mitigationFactor * hitChance;
        const effectiveVariance = Math.max(1, Math.floor(dpsVariance * mitigationFactor * hitChance));

        // Sustain reduction: hpRegen and lifesteal reduce net incoming DPS.
        // High-level characters have more skills, healing abilities, and sustain,
        // so their effective TTK is longer than raw DPS math suggests.
        //
        // hpRegen heals a flat amount per second.
        // lifesteal heals a fraction of outgoing DPS per second (capped via LIFESTEAL_DPS_FRACTION).
        // Combined sustain is capped at SUSTAIN_REDUCTION_CAP × effectiveDps so characters
        // can never regenerate faster than they take damage (infinite TTK).
        const hpRegen = (combatStats.hpRegen ?? 0);
        const lifesteal = (combatStats.lifesteal ?? 0);
        const lifestealHealPerSec = effectiveDps * (lifesteal / 100) * mitConfig.LIFESTEAL_DPS_FRACTION;
        const rawSustainPerSec = hpRegen + lifestealHealPerSec;
        const sustainCap = effectiveDps * mitConfig.SUSTAIN_REDUCTION_CAP;
        const sustainPerSec = Math.min(rawSustainPerSec, sustainCap);
        const netEffectiveDps = Math.max(1, effectiveDps - sustainPerSec);
        const netEffectiveVariance = Math.max(1, Math.floor(effectiveVariance * (netEffectiveDps / effectiveDps)));

        return {
            min: Math.max(1, Math.floor(netEffectiveDps - netEffectiveVariance)),
            max: Math.floor(netEffectiveDps + netEffectiveVariance),
        };
    },

    generateCharacterStats(race: string, role: string, level: number): CategorizedCharactersStats {
        const { STATS } = GENERATION_CONSTANTS;
        const baseStats = this.calculateBaseStats(race, role, level);

        const calculationContext: StatCalculationContext = {
            raceData: STATS.RACE_DATA[race] || { baseStats: {}, affinities: {} },
            roleData: STATS.ROLE_DATA[role] || { baseStats: {}, affinities: {} },
            formulas: STATS.DERIVATION_FORMULAS,
        };

        const allDerivedStats: Stats = {};
        const derivedStatKeys = Object.keys(STATS.DERIVATION_FORMULAS).filter(key => key !== 'dps');

        for (const key of derivedStatKeys) {
            allDerivedStats[key] = this.calculateDerivedStat(key, baseStats, level, calculationContext);
        }

        for (const [statKey, config] of Object.entries(STATS.STAT_SOFT_CAPS)) {
            if (allDerivedStats[statKey] !== undefined) {
                allDerivedStats[statKey] = applyDiminishingReturns(
                    allDerivedStats[statKey]!,
                    config.cap,
                    config.severity
                );
            }
        }

        const fullStatsForDps = { ...baseStats, ...allDerivedStats };
        const dps = this.calculateDps(fullStatsForDps, level);

        const categorizedStats: CategorizedCharactersStats = {
            base: {},
            resource: {},
            combat: {},
            defensive: {},
            utility: {}
        };

        for (const [category, statKeys] of Object.entries(STATS.STAT_CATEGORIES)) {
            for (const key of statKeys) {
                if (category === 'base' && baseStats[key] !== undefined) {
                    categorizedStats[category as keyof CategorizedCharactersStats][key] = baseStats[key];
                } else if (allDerivedStats[key] !== undefined) {
                    categorizedStats[category as keyof CategorizedCharactersStats][key] = allDerivedStats[key];
                }
            }
        }

        categorizedStats.combat.dps = dps;

        return categorizedStats;
    }
};
