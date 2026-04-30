/**
 * A named sub-variant of an item, providing alternate stats, cosmetics,
 * or pricing. Used across all item categories that support variants.
 */
export interface VariantDef {
    name: string;
    desc: string;
    price?: number;
    duration?: number;   // Effect duration in seconds (for buff potions)
    cooldown?: number;   // Cooldown before next use in seconds
}

// ============================================================
// Potion Stat Interfaces
// ============================================================
// Used by ConsumableDef.potionStats to provide mechanical depth
// to consumable items. Each stat block is optional and keyed
// to the consumable's functional category.
// ============================================================

/** Flat HP/MP/Stamina restoration potions. */
export interface RestoreStats {
    /** Resource restored, such as health, mana, or stamina. */
    resource?: string;
    /** Base amount restored on use. */
    baseRestore: number;
    /** Percentage of max resource restored (0–1). Stacks with baseRestore. */
    percentRestore?: number;
}

/** Antidote / cleansing potions. */
export interface AntidoteStats {
    /** Maximum poison tier this antidote can cure (1–6). */
    maxPoisonTier: number;
    /** Chance to cure (0–1). 1.0 = guaranteed. */
    cureChance: number;
    /** If true, also removes disease effects. */
    curesDisease?: boolean;
}

/** Weapon oils / coatings. */
export interface OilStats {
    /** Flat bonus damage added per hit. */
    bonusDamage: number;
    /** Damage type applied (e.g. 'fire', 'frost', 'poison', 'physical'). */
    damageType: string;
    /** Applies to N hits before expiring. 0 = duration-based only. */
    chargesPerUse?: number;
}

/** Elemental resistance potions. */
export interface ResistanceStats {
    /** Element resisted (e.g. 'fire', 'frost', 'lightning', 'poison'). */
    element: string;
    /** Percentage of incoming elemental damage reduced (0–1). */
    resistPercent: number;
    /** If true, also grants immunity to associated status effect. */
    statusImmunity?: boolean;
}

/** Buff potions (Strength, Invisibility, etc). */
export interface BuffStats {
    /** Primary stat or attribute modified (e.g. 'strength', 'stealth'). */
    buffTarget: string;
    /** Flat bonus to the target stat. */
    flatBonus: number;
    /** Percentage bonus to the target stat (0–1). Stacks with flatBonus. */
    percentBonus?: number;
    /** If true, buff breaks on taking damage or attacking. */
    breaksOnAction?: boolean;
}

/**
 * Union of all potion stat blocks. ConsumableDef.potionStats
 * uses this to provide type-safe mechanical data for any
 * consumable that has gameplay-relevant stats.
 */
export type PotionStats =
    | { type: 'restore'; stats: RestoreStats }
    | { type: 'antidote'; stats: AntidoteStats }
    | { type: 'oil'; stats: OilStats }
    | { type: 'resistance'; stats: ResistanceStats }
    | { type: 'buff'; stats: BuffStats };
