// ============================================================
// statsConfig.ts — Stat Calculation Configuration
// ============================================================
// Base stats, derived formulas, soft caps, and display categories.
// Consumed by StatEngine.
// ============================================================

import { RACES, ROLES } from '../data/character';

export const STATS_CONFIG = {

    // BASE_STAT_RANGE — Initial roll range for each of the 10
    // base attributes (STR, AGI, DEX, END, INT, WIS, LCK, CHA, WIL, RES).
    // Every character starts with a random value between 5–20
    // before racial/role modifiers are applied.
    BASE_STAT_RANGE: { min: 5, max: 20 },

    // BONUS_STAT_RANGE — Additional flat bonus applied to
    // base stats from racial and role modifiers.
    BONUS_STAT_RANGE: { min: 0, max: 15 },

    // Hard cap on any single base stat value.
    MAX_BASE_STAT: 9999,

    // Maximum multiplier for level-based stat scaling.
    // Prevents exponential blow-up at very high levels.
    MAX_SCALING_MODIFIER: 3.5,

    // BASE_STAT_GROWTH_FACTORS — Per-stat scaling curves.
    //   linear      : flat growth per level (stat += linear * level)
    //   diminishing : additional growth subject to diminishing returns
    //     at high levels (applied via applyDiminishingReturns()).
    //
    // Primary combat stats (STR, AGI, DEX, INT, WIS) grow faster.
    // Utility stats (LCK, CHA) grow slower.
    // Tank stats (END) have the highest diminishing factor.
    BASE_STAT_GROWTH_FACTORS: {
        strength: { linear: 0.4, diminishing: 0.8 },
        agility: { linear: 0.4, diminishing: 0.8 },
        dexterity: { linear: 0.4, diminishing: 0.8 },
        endurance: { linear: 0.5, diminishing: 1.0 },
        intelligence: { linear: 0.4, diminishing: 0.8 },
        wisdom: { linear: 0.4, diminishing: 0.8 },
        luck: { linear: 0.2, diminishing: 0.4 },
        charisma: { linear: 0.2, diminishing: 0.4 },
        willpower: { linear: 0.3, diminishing: 0.7 },
        resolve: { linear: 0.3, diminishing: 0.6 },
    },

    // STAT_SOFT_CAPS — Prevents any derived stat from scaling
    // infinitely. Once the stat exceeds `cap`, further gains
    // are reduced by `severity` (0–1, higher = harsher penalty).
    //   Example: critChance caps at 50% with 50% severity,
    //   so going from 50→60 raw only adds 5 effective.
    STAT_SOFT_CAPS: {
        critChance: { cap: 50, severity: 0.5 },
        critDamageBonus: { cap: 300, severity: 0.1 },
        cooldownReduction: { cap: 40, severity: 0.4 },
        lifesteal: { cap: 25, severity: 0.6 },
        manaLeech: { cap: 25, severity: 0.6 },
        blockChance: { cap: 50, severity: 0.75 },
        parryChance: { cap: 50, severity: 0.75 },
        resourceCostReduction: { cap: 30, severity: 0.3 },
        damageReflection: { cap: 35, severity: 0.5 },
    },

    // Injected race/role data — used by StatEngine to apply
    // racial bonuses and role-specific stat weights.
    RACE_DATA: RACES,
    ROLE_DATA: ROLES,

    // DERIVATION_FORMULAS — How derived stats are calculated
    // from base stats.
    //
    // Each entry follows this pattern:
    //   base         : optional flat starting value (e.g. health starts at 200)
    //   dependencies : { baseStat: weight } — each base stat
    //     contributing to this derived stat and its multiplier.
    //   growthFactor : per-level scaling multiplier.
    //   variance     : optional random spread (e.g. DPS ±20%).
    //
    // Formula (simplified):
    //   derivedStat = (base ?? 0)
    //     + Σ(baseStat[i] × weight[i])
    //     + growthFactor × level
    DERIVATION_FORMULAS: {
        // --- Resource Stats ---
        // Pool sizes and regeneration rates.
        health: { base: 200, dependencies: { endurance: 25 }, growthFactor: 50.0 },
        mana: { base: 100, dependencies: { intelligence: 10, wisdom: 8 }, growthFactor: 10.0 },
        stamina: { base: 100, dependencies: { endurance: 8, agility: 6 }, growthFactor: 10.0 },
        hpRegen: { dependencies: { endurance: 0.5, resolve: 0.2 }, growthFactor: 0.1 },
        mpRegen: { dependencies: { wisdom: 0.6, willpower: 0.2 }, growthFactor: 0.1 },
        lifesteal: { dependencies: { strength: 0.02, dexterity: 0.03 }, growthFactor: 0.01 },
        manaLeech: { dependencies: { intelligence: 0.04, wisdom: 0.02 }, growthFactor: 0.01 },
        resourceCostReduction: { dependencies: { intelligence: 0.05, willpower: 0.03 }, growthFactor: 0.02 },
        healingPower: { base: 100, dependencies: { wisdom: 0.2, charisma: 0.1 }, growthFactor: 0.05 },

        // --- Combat Stats ---
        // Offensive power, accuracy, crits, penetration.
        attackPower: { dependencies: { strength: 2.0, dexterity: 0.5 }, growthFactor: 0.3 },
        magicPower: { dependencies: { intelligence: 2.0, willpower: 0.5 }, growthFactor: 0.3 },
        accuracy: { dependencies: { dexterity: 2.5, luck: 0.5 }, growthFactor: 0.15 },
        critChance: { dependencies: { luck: 0.1, dexterity: 0.05 }, growthFactor: 0.03 },
        critDamageBonus: { base: 150, dependencies: { dexterity: 0.05, intelligence: 0.05 }, growthFactor: 0.02 },
        cooldownReduction: { dependencies: { wisdom: 0.04, intelligence: 0.06 }, growthFactor: 0.015 },
        armorPenetration: { dependencies: { dexterity: 0.05, resolve: 0.02 }, growthFactor: 0.02 },
        magicPenetration: { dependencies: { intelligence: 0.05, willpower: 0.02 }, growthFactor: 0.02 },
        dotBonus: { dependencies: { dexterity: 0.03, intelligence: 0.03 }, growthFactor: 0.04 },
        attackSpeed: { dependencies: { agility: 2, dexterity: 1 }, growthFactor: 0.03 },
        dps: { dependencies: { primaryDamage: 0.4, attackSpeed: 0.15 }, variance: 0.2 },

        // --- Defensive Stats ---
        // Damage mitigation, evasion, shields.
        defense: { dependencies: { endurance: 2, strength: 0.5 }, growthFactor: 0.25 },
        magicResist: { dependencies: { wisdom: 2, intelligence: 0.5, willpower: 1.0 }, growthFactor: 0.25 },
        evasion: { dependencies: { agility: 2.5, luck: 0.5 }, growthFactor: 0.15 },
        blockChance: { dependencies: { strength: 0.05, endurance: 0.04 }, growthFactor: 0.01 },
        parryChance: { dependencies: { dexterity: 0.05, agility: 0.04 }, growthFactor: 0.01 },
        elementalResistances: { dependencies: { endurance: 0.2, wisdom: 0.1 }, growthFactor: 0.03 },
        damageReflection: { dependencies: { endurance: 0.03, strength: 0.01 }, growthFactor: 0.01 },
        tenacity: { dependencies: { endurance: 0.05, wisdom: 0.04, willpower: 0.06 }, growthFactor: 0.01 },
        damageAbsorption: { dependencies: { endurance: 0.5, resolve: 0.2 }, growthFactor: 0.1 },
        resilience: { dependencies: { willpower: 0.05, endurance: 0.04, resolve: 0.03 }, growthFactor: 0.01 },
        critResistance: { dependencies: { luck: 0.04, resolve: 0.05, willpower: 0.02 }, growthFactor: 0.01 },
        aegis: { dependencies: { endurance: 1.0, willpower: 0.5, resolve: 0.8 }, growthFactor: 0.12 },

        // --- Utility Stats ---
        // Non-combat exploration and social abilities.
        perception: { dependencies: { wisdom: 1.5, intelligence: 1 }, growthFactor: 0.1 },
        stealth: { dependencies: { agility: 2, luck: 0.5 }, growthFactor: 0.1 },
        crafting: { dependencies: { dexterity: 1, intelligence: 1, wisdom: 0.5 }, growthFactor: 0.15 },
        persuasion: { dependencies: { charisma: 2.5, luck: 0.5 }, growthFactor: 0.15 },
        scavenging: { dependencies: { luck: 2.0, perception: 0.5 }, growthFactor: 0.1 },
        bartering: { dependencies: { charisma: 2.5, intelligence: 0.5 }, growthFactor: 0.15 },
        knowledge: { dependencies: { intelligence: 3.0, wisdom: 1.0 }, growthFactor: 0.2 },
        survival: { dependencies: { wisdom: 2.0, endurance: 1.0 }, growthFactor: 0.15 },
        taming: { dependencies: { charisma: 2.0, wisdom: 1.0 }, growthFactor: 0.1 },
    } as Record<string, { base?: number; dependencies: Record<string, number>; growthFactor?: number; variance?: number; }>,

    // STAT_CATEGORIES — Groups stats into display tabs.
    // Used by the UI to render base/resource/combat/defensive/utility
    // panels on the character sheet.
    STAT_CATEGORIES: {
        base: ['strength', 'agility', 'dexterity', 'endurance', 'intelligence', 'wisdom', 'luck', 'charisma', 'willpower', 'resolve'],
        resource: ['health', 'mana', 'stamina', 'hpRegen', 'mpRegen', 'lifesteal', 'manaLeech', 'resourceCostReduction', 'healingPower'],
        combat: ['dps', 'attackPower', 'magicPower', 'accuracy', 'attackSpeed', 'critChance', 'critDamageBonus', 'cooldownReduction', 'armorPenetration', 'magicPenetration', 'dotBonus'],
        defensive: ['defense', 'magicResist', 'evasion', 'blockChance', 'parryChance', 'elementalResistances', 'damageReflection', 'tenacity', 'damageAbsorption', 'resilience', 'critResistance', 'aegis'],
        utility: ['perception', 'stealth', 'crafting', 'persuasion', 'scavenging', 'bartering', 'knowledge', 'survival', 'taming']
    },
};
