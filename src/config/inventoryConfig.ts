// ============================================================
// inventoryConfig.ts — Inventory Generation Configuration
// ============================================================
// Equipment tiers, slot chances, rarities, container modifiers,
// potion tiers, grades, and role-armor mappings.
// Consumed by InventoryEngine.
// ============================================================

export const INVENTORY_CONFIG = {

    // TIER_RANGES - Maps character level to equipment item tier.
    // Higher level bands steadily unlock stronger rarity/power ranges.
    TIER_RANGES: [
        { maxLevel: 10, range: { min: 1, max: 1 } },
        { maxLevel: 25, range: { min: 1, max: 1 } },
        { maxLevel: 50, range: { min: 1, max: 1 } },
        { maxLevel: 69, range: { min: 1, max: 2 } },
        { maxLevel: 100, range: { min: 2, max: 3 } },
        { maxLevel: 249, range: { min: 3, max: 4 } },
        { maxLevel: 499, range: { min: 3, max: 5 } },
        { maxLevel: 999, range: { min: 4, max: 6 } },
        { maxLevel: 2999, range: { min: 5, max: 7 } },
        { maxLevel: Infinity, range: { min: 6, max: 8 } },
    ],

    // BACKPACK_QUANTITY — How many misc items go into the backpack.
    // Scales with level so high-level characters feel "loaded".
    BACKPACK_QUANTITY: [
        { maxLevel: 10, range: { min: 5, max: 8 } },
        { maxLevel: 25, range: { min: 7, max: 9 } },
        { maxLevel: 50, range: { min: 8, max: 12 } },
        { maxLevel: 69, range: { min: 10, max: 14 } },
        { maxLevel: 100, range: { min: 12, max: 18 } },
        { maxLevel: 249, range: { min: 15, max: 22 } },
        { maxLevel: 499, range: { min: 17, max: 28 } },
        { maxLevel: 999, range: { min: 19, max: 30 } },
        { maxLevel: 2999, range: { min: 22, max: 32 } },
        { maxLevel: Infinity, range: { min: 25, max: 35 } },
    ],

    // EQUIPMENT_GUARANTEE — Level-based guaranteed slot spawns.
    // When a guarantee is TRUE, every slot in that group is
    // always filled. When FALSE, each slot falls back to its
    // individual SLOT_GENERATION_CHANCE probability below.
    //
    // Groups:
    //   coreArmor   → HEAD, BODY, HANDS, LEGS, FEET
    //   accessories → SHOULDER, RING, RING_2, NECK, BELT, BACK, HANDS_2
    //   quickslots  → THROWABLE, TORCH, POTION, FOOD, OFF_HAND
    EQUIPMENT_GUARANTEE: [
        { maxLevel: 10, coreArmor: false, accessories: false, quickslots: false },
        { maxLevel: 25, coreArmor: false, accessories: false, quickslots: false },
        { maxLevel: 50, coreArmor: true, accessories: false, quickslots: false },
        { maxLevel: 69, coreArmor: true, accessories: true, quickslots: false },
        { maxLevel: 100, coreArmor: true, accessories: true, quickslots: true },
        { maxLevel: 249, coreArmor: true, accessories: true, quickslots: true },
        { maxLevel: 499, coreArmor: true, accessories: true, quickslots: true },
        { maxLevel: 999, coreArmor: true, accessories: true, quickslots: true },
        { maxLevel: 2999, coreArmor: true, accessories: true, quickslots: true },
        { maxLevel: Infinity, coreArmor: true, accessories: true, quickslots: true },
    ],

    // ROLE_ARMOR_TYPE — Maps role keywords to preferred armor class.
    // InventoryEngine checks the character's role name against
    // each keyword list. First match wins.
    //   Mage/Wizard/etc.  → LIGHT armor
    //   Rogue/Ranger/etc. → MEDIUM armor
    //   Warrior/Knight    → HEAVY armor
    // If no keyword matches, InventoryEngine defaults to MEDIUM.
    ROLE_ARMOR_TYPE: [
        { keywords: ['mage', 'wizard', 'warlock', 'monk', 'druid'], armor: 'LIGHT' as const },
        { keywords: ['rogue', 'thief', 'ranger', 'assassin', 'hunter'], armor: 'MEDIUM' as const },
        { keywords: ['warrior', 'knight', 'paladin', 'guard'], armor: 'HEAVY' as const },
    ],

    // Characters at or above this level receive a large backpack
    // (more base capacity) instead of a small one.
    LARGE_BACKPACK_LEVEL: 20,

    // SLOT_GENERATION_CHANCE — Per-slot spawn probability.
    // Only consulted when the slot is NOT guaranteed by
    // EQUIPMENT_GUARANTEE above.
    SLOT_GENERATION_CHANCE: {
        ARMOR_OPTIONAL: 0.8,
        BACK_SLOT: 0.5,
        SHOULDER: 0.5,
        RING: 0.5,
        RING_2: 0.3,
        NECK: 0.5,
        EAR: 0.35,
        WAIST: 0.45,
        HANDS_2: 0.4,
        BELT: 0.6,
        OFF_HAND: 0.6,
        CASTER_OFFHAND: 0.3,
        GENERIC_OFFHAND: 0.5,
        THROWABLE: 0.25,
        TORCH: 0.30,
        POTION: 0.50,
        FOOD: 0.40,
    },

    // RARITY — Maps numeric tier (1–8) to rarity label.
    RARITY: {
        TIER_MAP: {
            1: 'COMMON',
            2: 'UNCOMMON',
            3: 'RARE',
            4: 'EPIC',
            5: 'LEGENDARY',
            6: 'MYTHIC',
            7: 'DIVINE',
            8: 'ARTIFACT',
        } as Record<number, string>,
    },

    // GRADE_BY_LEVEL — Letter grade pool per level bracket.
    GRADE_BY_LEVEL: [
        { maxLevel: 10, grades: ['F', 'F', 'E'] },
        { maxLevel: 25, grades: ['F', 'F', 'E', 'E', 'D'] },
        { maxLevel: 50, grades: ['E', 'E', 'D', 'D', 'C'] },
        { maxLevel: 69, grades: ['E', 'D', 'C', 'C', 'B'] },
        { maxLevel: 100, grades: ['C', 'B', 'B', 'A', 'A'] },
        { maxLevel: 249, grades: ['B', 'A', 'A', 'S'] },
        { maxLevel: 499, grades: ['A', 'A', 'S', 'S', 'SS'] },
        { maxLevel: 999, grades: ['A', 'S', 'SS', 'SSS'] },
        { maxLevel: 2999, grades: ['S', 'SS', 'SSS', 'MY'] },
        { maxLevel: Infinity, grades: ['SS', 'SSS', 'MY', 'EX', '???'] },
    ],

    // MECHANIC_QUALITY — Tier-weighted mechanical item quality.
    // Low item tiers skew toward degraded values. High item tiers
    // skew toward enhanced values. Benefit multipliers improve
    // damage/defense/effects/potion stats, penalty multipliers
    // adjust drawbacks, and durability multipliers adjust durability.
    MECHANIC_QUALITY: {
        MODIFIERS: {
            DAMAGED: {
                benefitMultiplier: 0.75,
                penaltyMultiplier: 1.25,
                durabilityMultiplier: 0.65,
            },
            WORN: {
                benefitMultiplier: 0.9,
                penaltyMultiplier: 1.1,
                durabilityMultiplier: 0.85,
            },
            STANDARD: {
                benefitMultiplier: 1,
                penaltyMultiplier: 1,
                durabilityMultiplier: 1,
            },
            FINE: {
                benefitMultiplier: 1.15,
                penaltyMultiplier: 0.9,
                durabilityMultiplier: 1.1,
            },
            SUPERIOR: {
                benefitMultiplier: 1.35,
                penaltyMultiplier: 0.75,
                durabilityMultiplier: 1.25,
            },
        },
        TIER_POOLS: {
            1: [
                { tier: 'DAMAGED', weight: 49 },
                { tier: 'WORN', weight: 30 },
                { tier: 'STANDARD', weight: 15 },
                { tier: 'FINE', weight: 5 },
                { tier: 'SUPERIOR', weight: 1 },
            ],
            2: [
                { tier: 'DAMAGED', weight: 29 },
                { tier: 'WORN', weight: 35 },
                { tier: 'STANDARD', weight: 25 },
                { tier: 'FINE', weight: 10 },
                { tier: 'SUPERIOR', weight: 1 },
            ],
            3: [
                { tier: 'DAMAGED', weight: 15 },
                { tier: 'WORN', weight: 30 },
                { tier: 'STANDARD', weight: 35 },
                { tier: 'FINE', weight: 18 },
                { tier: 'SUPERIOR', weight: 2 },
            ],
            4: [
                { tier: 'DAMAGED', weight: 5 },
                { tier: 'WORN', weight: 20 },
                { tier: 'STANDARD', weight: 35 },
                { tier: 'FINE', weight: 30 },
                { tier: 'SUPERIOR', weight: 10 },
            ],
            5: [
                { tier: 'DAMAGED', weight: 2 },
                { tier: 'WORN', weight: 10 },
                { tier: 'STANDARD', weight: 28 },
                { tier: 'FINE', weight: 40 },
                { tier: 'SUPERIOR', weight: 20 },
            ],
            6: [
                { tier: 'DAMAGED', weight: 1 },
                { tier: 'WORN', weight: 5 },
                { tier: 'STANDARD', weight: 19 },
                { tier: 'FINE', weight: 45 },
                { tier: 'SUPERIOR', weight: 30 },
            ],
            7: [
                { tier: 'DAMAGED', weight: 1 },
                { tier: 'WORN', weight: 2 },
                { tier: 'STANDARD', weight: 12 },
                { tier: 'FINE', weight: 45 },
                { tier: 'SUPERIOR', weight: 40 },
            ],
            8: [
                { tier: 'DAMAGED', weight: 1 },
                { tier: 'WORN', weight: 4 },
                { tier: 'STANDARD', weight: 10 },
                { tier: 'FINE', weight: 35 },
                { tier: 'SUPERIOR', weight: 50 },
            ],
        },
    },

    // CONTAINER_MODIFIERS — Per-rarity bonuses for container items
    // (backpacks, bags, pouches).
    CONTAINER_MODIFIERS: {
        COMMON: {
            capacity: { bonusChance: 0.4, positive: { min: 1, max: 5 }, negative: { min: -8, max: -3 } },
            slots: { min: 1, max: 3 },
        },
        UNCOMMON: {
            capacity: { bonusChance: 0.5, positive: { min: 3, max: 8 }, negative: { min: -5, max: -2 } },
            slots: { min: 2, max: 4 },
        },
        RARE: {
            capacity: { bonusChance: 0.6, positive: { min: 5, max: 12 }, negative: { min: -3, max: -1 } },
            slots: { min: 3, max: 5 },
        },
        EPIC: {
            capacity: { bonusChance: 0.75, positive: { min: 8, max: 18 }, negative: { min: -2, max: 0 } },
            slots: { min: 4, max: 7 },
        },
        LEGENDARY: {
            capacity: { bonusChance: 0.9, positive: { min: 12, max: 25 }, negative: { min: 0, max: 0 } },
            slots: { min: 6, max: 10 },
        },
        MYTHIC: {
            capacity: { bonusChance: 0.95, positive: { min: 18, max: 35 }, negative: { min: 0, max: 0 } },
            slots: { min: 8, max: 12 },
        },
        DIVINE: {
            capacity: { bonusChance: 1.0, positive: { min: 25, max: 50 }, negative: { min: 0, max: 0 } },
            slots: { min: 10, max: 15 },
        },
        ARTIFACT: {
            capacity: { bonusChance: 1.0, positive: { min: 35, max: 75 }, negative: { min: 0, max: 0 } },
            slots: { min: 12, max: 20 },
        },
    } as Record<string, { capacity: { bonusChance: number; positive: { min: number; max: number }; negative: { min: number; max: number } }; slots: { min: number; max: number } }>,

    // POTION_TIER_RANGES — Which potion tiers are available
    // at each character level.
    POTION_TIER_RANGES: [
        { maxLevel: 10, tiers: ['minor'] },
        { maxLevel: 25, tiers: ['minor'] },
        { maxLevel: 50, tiers: ['minor', 'lesser'] },
        { maxLevel: 69, tiers: ['minor', 'lesser'] },
        { maxLevel: 100, tiers: ['minor', 'lesser', 'standard'] },
        { maxLevel: 249, tiers: ['lesser', 'standard', 'greater'] },
        { maxLevel: 499, tiers: ['standard', 'greater', 'superior'] },
        { maxLevel: 999, tiers: ['standard', 'greater', 'superior'] },
        { maxLevel: 2999, tiers: ['greater', 'superior', 'ultimate'] },
        { maxLevel: Infinity, tiers: ['greater', 'superior', 'ultimate'] },
    ] as { maxLevel: number; tiers: string[] }[],
};
