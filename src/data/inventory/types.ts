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

// Re-export potion stat types from the shared types layer.
// This keeps the data layer's public API unchanged while
// fixing the dependency inversion (types/ no longer imports data/).
export type {
    RestoreStats,
    AntidoteStats,
    OilStats,
    ResistanceStats,
    BuffStats,
    PotionStats,
} from '../../types/potionStats';
