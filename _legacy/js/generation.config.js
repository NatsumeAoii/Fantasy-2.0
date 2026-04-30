import { RACE_STATS, ROLE_STATS } from './data/racerolestats.js';

export const MAX_LEVEL = 9999;
export const GENERATION_CONSTANTS = Object.freeze({
    PROBABILITY: {
        PRODIGY_BONUS_CHANCE: 0.05,
        GUILD_MEMBERSHIP_CHANCE: 0.5,
        FACTION_ALIGNMENT_CHANCE: 0.3,
        UNLOGICAL_COMBO_BYPASS_CHANCE: 0.05,
    },

    LEVEL: {
        MAX: MAX_LEVEL,
        DISTRIBUTION: [
            { threshold: 0.001, range: { min: 5000, max: MAX_LEVEL }, isWanderer: true },
            { threshold: 0.006, range: { min: 500, max: 4999 }, isWanderer: false },
            { threshold: 0.055, range: { min: 101, max: 499 }, isWanderer: false },
            { threshold: 0.305, range: { min: 70, max: 100 }, isWanderer: false },
            { threshold: 1.0, range: { min: 1, max: 69 }, isWanderer: false }
        ],
    },

    AGE: {
        BRACKETS: [
            { maxLevel: 69, range: { min: 5, max: 40 } },
            { maxLevel: 100, range: { min: 20, max: 60 } },
            { maxLevel: 499, range: { min: 50, max: 250 } },
            { maxLevel: 2999, range: { min: 200, max: 1500 } },
            { maxLevel: Infinity, range: { min: 1000, max: 5000 } },
        ],
    },

    STATS: {
        BASE_STAT_RANGE: { min: 5, max: 20 },
        BONUS_STAT_RANGE: { min: 0, max: 15 },
        MAX_BASE_STAT: 9999,
        MAX_SCALING_MODIFIER: 3.5,
        BASE_STAT_GROWTH_FACTORS: {
            strength:     { linear: 0.4, diminishing: 0.8 },
            agility:      { linear: 0.4, diminishing: 0.8 },
            dexterity:    { linear: 0.4, diminishing: 0.8 },
            endurance:    { linear: 0.5, diminishing: 1.0 },
            intelligence: { linear: 0.4, diminishing: 0.8 },
            wisdom:       { linear: 0.4, diminishing: 0.8 },
            luck:         { linear: 0.2, diminishing: 0.4 },
            charisma:     { linear: 0.2, diminishing: 0.4 },
            willpower:    { linear: 0.3, diminishing: 0.7 },
            resolve:      { linear: 0.3, diminishing: 0.6 },
        },
        STAT_SOFT_CAPS: {
            critChance:          { cap: 50, severity: 0.5 },
            cooldownReduction:   { cap: 40, severity: 0.4 },
            lifesteal:           { cap: 25, severity: 0.6 },
            manaLeech:           { cap: 25, severity: 0.6 },
            blockChance:         { cap: 50, severity: 0.75 },
            parryChance:         { cap: 50, severity: 0.75 },
            resourceCostReduction: { cap: 30, severity: 0.3 },
            damageReflection:    { cap: 35, severity: 0.5 },
        },
        RACE_DATA: RACE_STATS,
        ROLE_DATA: ROLE_STATS,
        DERIVATION_FORMULAS: {
            // Resource
            health:      { base: 50, dependencies: { endurance: 10 }, growthFactor: 2.5 },
            mana:        { base: 20, dependencies: { intelligence: 8, wisdom: 4 }, growthFactor: 1.5 },
            stamina:     { base: 30, dependencies: { endurance: 6, agility: 4 }, growthFactor: 2.0 },
            hpRegen:     { dependencies: { endurance: 0.5, resolve: 0.2 }, growthFactor: 0.05 },
            mpRegen:     { dependencies: { wisdom: 0.6, willpower: 0.2 }, growthFactor: 0.05 },
            lifesteal:   { dependencies: { strength: 0.02, dexterity: 0.03 }, growthFactor: 0.01 },
            manaLeech:   { dependencies: { intelligence: 0.04, wisdom: 0.02 }, growthFactor: 0.01 },
            resourceCostReduction: { dependencies: { intelligence: 0.05, willpower: 0.03 }, growthFactor: 0.02 },
            healingPower: { base: 100, dependencies: { wisdom: 0.2, charisma: 0.1 }, growthFactor: 0.05 },
            // Combat
            attackPower: { dependencies: { strength: 2.5, dexterity: 0.5 }, growthFactor: 0.3 },
            magicPower:  { dependencies: { intelligence: 3, willpower: 0.5 }, growthFactor: 0.3 },
            accuracy:    { dependencies: { dexterity: 2.5, luck: 0.5 }, growthFactor: 0.15 },
            critChance:  { dependencies: { luck: 0.1, dexterity: 0.05 }, growthFactor: 0.03 },
            critDamageBonus: { base: 150, dependencies: { dexterity: 0.1, intelligence: 0.1, luck: 0.05 }, growthFactor: 0.05 },
            cooldownReduction: { dependencies: { wisdom: 0.04, intelligence: 0.06 }, growthFactor: 0.015 },
            armorPenetration: { dependencies: { dexterity: 0.05, resolve: 0.02 }, growthFactor: 0.02 },
            magicPenetration: { dependencies: { intelligence: 0.05, willpower: 0.02 }, growthFactor: 0.02 },
            dotBonus: { dependencies: { dexterity: 0.03, intelligence: 0.03 }, growthFactor: 0.04 },
            attackSpeed: { dependencies: { agility: 2, dexterity: 1 }, growthFactor: 0.03 },
            dps:         { dependencies: { primaryDamage: 0.4, attackSpeed: 0.15 }, variance: 0.2 },
            // Defensive
            defense:     { dependencies: { endurance: 2, strength: 0.5 }, growthFactor: 0.25 },
            magicResist: { dependencies: { wisdom: 2, intelligence: 0.5, willpower: 1.0 }, growthFactor: 0.25 },
            evasion:     { dependencies: { agility: 2.5, luck: 0.5 }, growthFactor: 0.15 },
            blockChance: { dependencies: { strength: 0.05, endurance: 0.04 }, growthFactor: 0.01 },
            parryChance: { dependencies: { dexterity: 0.05, agility: 0.04 }, growthFactor: 0.01 },
            elementalResistances: { dependencies: { endurance: 0.2, wisdom: 0.1 }, growthFactor: 0.03 },
            damageReflection: { dependencies: { endurance: 0.03, strength: 0.01 }, growthFactor: 0.01 },
            tenacity:    { dependencies: { endurance: 0.05, wisdom: 0.04, willpower: 0.06 }, growthFactor: 0.01 },
            damageAbsorption: { dependencies: { endurance: 0.5, resolve: 0.2 }, growthFactor: 0.1 },
            resilience:  { dependencies: { willpower: 0.05, endurance: 0.04, resolve: 0.03 }, growthFactor: 0.01 },
            critResistance: { dependencies: { luck: 0.04, resolve: 0.05, willpower: 0.02 }, growthFactor: 0.01 },
            aegis:       { dependencies: { endurance: 1.0, willpower: 0.5, resolve: 0.8 }, growthFactor: 0.12 },
            // Utility
            perception:  { dependencies: { wisdom: 1.5, intelligence: 1 }, growthFactor: 0.1 },
            stealth:     { dependencies: { agility: 2, luck: 0.5 }, growthFactor: 0.1 },
            crafting:    { dependencies: { dexterity: 1, intelligence: 1, wisdom: 0.5 }, growthFactor: 0.15 },
            persuasion:  { dependencies: { charisma: 2.5, luck: 0.5 }, growthFactor: 0.15 },
            scavenging:  { dependencies: { luck: 2.0, perception: 0.5 }, growthFactor: 0.1 },
            bartering:   { dependencies: { charisma: 2.5, intelligence: 0.5 }, growthFactor: 0.15 },
            knowledge:   { dependencies: { intelligence: 3.0, wisdom: 1.0 }, growthFactor: 0.2 },
            survival:    { dependencies: { wisdom: 2.0, endurance: 1.0 }, growthFactor: 0.15 },
            taming:      { dependencies: { charisma: 2.0, wisdom: 1.0 }, growthFactor: 0.1 },
        },
        STAT_CATEGORIES: {
            base: ['strength', 'agility', 'dexterity', 'endurance', 'intelligence', 'wisdom', 'luck', 'charisma', 'willpower', 'resolve'],
            resource: ['health', 'mana', 'stamina', 'hpRegen', 'mpRegen', 'lifesteal', 'manaLeech', 'resourceCostReduction', 'healingPower'],
            combat: ['dps', 'attackPower', 'magicPower', 'accuracy', 'attackSpeed', 'critChance', 'critDamageBonus', 'cooldownReduction', 'armorPenetration', 'magicPenetration', 'dotBonus'],
            defensive: ['defense', 'magicResist', 'evasion', 'blockChance', 'parryChance', 'elementalResistances', 'damageReflection', 'tenacity', 'damageAbsorption', 'resilience', 'critResistance', 'aegis'],
            utility: ['perception', 'stealth', 'crafting', 'persuasion', 'scavenging', 'bartering', 'knowledge', 'survival', 'taming']
        },
    },

    SKILLS_AND_TITLES: {
        CONFIG_BY_LEVEL: [
            { maxLevel: 69, skills: { min: 2, max: 6 }, titles: { min: 1, max: 2 }, ranks: { min: "F", max: "A" }, bonus: { skills: 2, titles: 1 } },
            { maxLevel: 100, skills: { min: 5, max: 10 }, titles: { min: 2, max: 3 }, ranks: { min: "C", max: "SS" }, bonus: { skills: 3, titles: 2 } },
            { maxLevel: 499, skills: { min: 8, max: 14 }, titles: { min: 3, max: 5 }, ranks: { min: "A", max: "SSSS" }, bonus: { skills: 4, titles: 3 } },
            { maxLevel: 2999, skills: { min: 12, max: 18 }, titles: { min: 4, max: 7 }, ranks: { min: "S", max: "Legendary" }, bonus: { skills: 5, titles: 4 } },
            { maxLevel: Infinity, skills: { min: 18, max: 25 }, titles: { min: 6, max: 10 }, ranks: { min: "SS", max: "Mythic" }, bonus: { skills: 6, titles: 5 } },
        ],
        WANDERER_CONFIG: {
            skills: { min: 20, max: 30 },
            titles: { min: 8, max: 15 },
            ranks: { min: "SSSS", max: "Mythic" },
        },
    },

    SPECIAL_POWERS: {
        VALUE_RANGE: {
            LOW_LEVEL: { min: 10, max: 49 },
            HIGH_LEVEL: { min: 50, max: 100 },
        },
        HIGH_LEVEL_THRESHOLD: 100
    }
});
