/**
 * Aetheris denomination hierarchy (smallest → largest):
 *   Shard → Copper → Silver → Gold → Crown
 *
 * All item prices in data files are expressed as a `basePrice: number`
 * denominated in Gold. The engine converts to shards internally for
 * wealth calculations and precise currency splitting.
 */

/** Wealth tier labels used by the economy engine. */
export type WealthTier = 'DESTITUTE' | 'POOR' | 'COMMON' | 'WELL_OFF' | 'WEALTHY' | 'NOBLE' | 'ROYAL';

/** Shape of a character's coin purse after wealth generation. */
export interface CurrencyPurse {
    crown: number;
    gold: number;
    silver: number;
    copper: number;
    shard: number;
}

/** Exchange rate constants and wealth tier multipliers. */
export interface CurrencyTable {
    /** 1 Crown = N Gold */
    CROWN_TO_GOLD: number;
    /** 1 Gold = N Silver */
    GOLD_TO_SILVER: number;
    /** 1 Silver = N Copper */
    SILVER_TO_COPPER: number;
    /** 1 Copper = N Shards */
    COPPER_TO_SHARD: number;
    /** Pre-computed: shards per Crown */
    SHARD_PER_CROWN: number;
    /** Pre-computed: shards per Gold */
    SHARD_PER_GOLD: number;
    /** Pre-computed: shards per Silver */
    SHARD_PER_SILVER: number;
    /** Pre-computed: shards per Copper */
    SHARD_PER_COPPER: number;
    /** Base shard amounts for each wealth tier (before variance). */
    TIER_MULTIPLIERS: Record<WealthTier, number>;
}

/** Denomination table mapping coin types to their relative exchange values. */
export const CURRENCY: CurrencyTable = {
    CROWN_TO_GOLD: 1000,
    GOLD_TO_SILVER: 100,
    SILVER_TO_COPPER: 100,
    COPPER_TO_SHARD: 10,
    // 1 Crown = 1,000 Gold = 100,000 Silver = 10,000,000 Copper = 100,000,000 Shards
    SHARD_PER_CROWN: 100_000_000,
    SHARD_PER_GOLD: 100_000,
    SHARD_PER_SILVER: 1_000,
    SHARD_PER_COPPER: 10,
    TIER_MULTIPLIERS: {
        DESTITUTE: 100_000,
        POOR: 500_000,
        COMMON: 5_000_000,
        WELL_OFF: 20_000_000,
        WEALTHY: 100_000_000,
        NOBLE: 500_000_000,
        ROYAL: 10_000_000_000,
    },
};


/** Returns the wealth tier label for a given character level and role. */
export const getWealthTier = (level: number, role: string): WealthTier => {
    const r = role.toLowerCase();
    if (r.includes('king') || r.includes('queen') || r.includes('emperor') || r.includes('royal')) return 'ROYAL';
    if (r.includes('noble') || r.includes('lord') || r.includes('lady') || r.includes('duke')) return 'NOBLE';
    if (r.includes('merchant') || r.includes('guild master')) return 'WEALTHY';
    if (r.includes('beggar') || r.includes('slave') || r.includes('peasant')) return 'DESTITUTE';
    if (level < 5) return 'POOR';
    if (level < 25) return 'COMMON';
    if (level < 50) return 'WELL_OFF';
    if (level < 100) return 'WEALTHY';
    if (level < 250) return 'NOBLE';
    return 'ROYAL';
};
