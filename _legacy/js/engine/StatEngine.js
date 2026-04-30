import { getRandomNumber, applyDiminishingReturns } from "../randomUtils.js";
import { GENERATION_CONSTANTS } from "../generation.config.js";

export class StatEngine {
    static calculateLevelBasedBonus(level, linearFactor, diminishingFactor) {
        if (level <= 1) return 0;
        const linearBonus = level * linearFactor;
        const diminishingBonus = Math.sqrt(level) * diminishingFactor;
        return Math.floor(linearBonus + diminishingBonus);
    }

    static calculateBaseStats(race, role, level) {
        const { STATS } = GENERATION_CONSTANTS;
        const baseStats = {};

        // This modifier provides a powerful boost at higher levels but is capped to prevent runaway stat inflation.
        const logarithmicModifier = 1 + Math.log1p(level / 25);
        const scalingModifier = Math.min(logarithmicModifier, STATS.MAX_SCALING_MODIFIER);

        const raceData = STATS.RACE_DATA[race] || {};
        const roleData = STATS.ROLE_DATA[role] || {};

        for (const stat of Object.keys(STATS.BASE_STAT_GROWTH_FACTORS)) {
            const growthFactors = STATS.BASE_STAT_GROWTH_FACTORS[stat];
            const levelBonus = this.calculateLevelBasedBonus(level, growthFactors.linear, growthFactors.diminishing);

            const randomBase = getRandomNumber(STATS.BASE_STAT_RANGE.min, STATS.BASE_STAT_RANGE.max);
            const randomBonus = getRandomNumber(STATS.BONUS_STAT_RANGE.min, STATS.BONUS_STAT_RANGE.max);

            const totalStat = (raceData.baseStats?.[stat] || 0) +
                (roleData.baseStats?.[stat] || 0) +
                randomBase +
                randomBonus +
                levelBonus;

            const raceAffinity = raceData.affinities?.[stat] || 1.0;
            const roleAffinity = roleData.affinities?.[stat] || 1.0;
            const finalStat = totalStat * scalingModifier * raceAffinity * roleAffinity;

            baseStats[stat] = Math.min(Math.floor(finalStat), STATS.MAX_BASE_STAT);
        }
        return baseStats;
    }

    static calculateDerivedStat(statKey, baseStats, level, context) {
        const { raceData, roleData, formulas } = context;
        const formula = formulas[statKey];
        if (!formula) return 0;

        let total = formula.base || 0;
        for (const [key, multiplier] of Object.entries(formula.dependencies || {})) {
            total += (baseStats[key] || 0) * multiplier;
        }

        if (formula.growthFactor) {
            total += level * formula.growthFactor;
        }

        total += (raceData.derivedStats?.[statKey] || 0) + (roleData.derivedStats?.[statKey] || 0);

        return Math.max(0, Math.floor(total));
    }

    static calculateDps(combatStats) {
        const { attackPower, magicPower, attackSpeed, critChance, critDamageBonus } = combatStats;
        const { dps: dpsFormula } = GENERATION_CONSTANTS.STATS.DERIVATION_FORMULAS;

        const primaryDamage = Math.max(attackPower, magicPower);
        const baseDamageComponent = (primaryDamage * dpsFormula.dependencies.primaryDamage) + (attackSpeed * dpsFormula.dependencies.attackSpeed);

        const effectiveCritChance = Math.min(critChance, 100) / 100;
        const effectiveCritBonus = Math.max(0, critDamageBonus - 100) / 100;
        const critMultiplier = 1 + (effectiveCritChance * effectiveCritBonus);

        const centralDps = baseDamageComponent * critMultiplier;
        const dpsVariance = Math.max(1, Math.floor(centralDps * dpsFormula.variance));

        return {
            min: Math.max(1, Math.floor(centralDps - dpsVariance)),
            max: Math.floor(centralDps + dpsVariance),
        };
    }

    static generateCharacterStats(race, role, level) {
        const { STATS } = GENERATION_CONSTANTS;
        const baseStats = this.calculateBaseStats(race, role, level);

        const calculationContext = {
            raceData: STATS.RACE_DATA[race] || {},
            roleData: STATS.ROLE_DATA[role] || {},
            formulas: STATS.DERIVATION_FORMULAS,
        };

        const allDerivedStats = {};
        const derivedStatKeys = Object.keys(STATS.DERIVATION_FORMULAS).filter(key => key !== 'dps');
        for (const key of derivedStatKeys) {
            allDerivedStats[key] = this.calculateDerivedStat(key, baseStats, level, calculationContext);
        }

        // Apply diminishing returns to specific stats after initial calculation to enforce soft caps.
        for (const [statKey, config] of Object.entries(STATS.STAT_SOFT_CAPS)) {
            if (allDerivedStats[statKey] !== undefined) {
                allDerivedStats[statKey] = applyDiminishingReturns(
                    allDerivedStats[statKey],
                    config.cap,
                    config.severity
                );
            }
        }

        const dps = this.calculateDps(allDerivedStats);

        const categorizedStats = {};
        for (const [category, statKeys] of Object.entries(STATS.STAT_CATEGORIES)) {
            categorizedStats[category] = {};
            for (const key of statKeys) {
                if (category === 'base' && baseStats[key] !== undefined) {
                    categorizedStats[category][key] = baseStats[key];
                } else if (allDerivedStats[key] !== undefined) {
                    categorizedStats[category][key] = allDerivedStats[key];
                }
            }
        }

        if (categorizedStats.combat) {
            categorizedStats.combat.dps = dps;
        }

        return categorizedStats;
    }
}
