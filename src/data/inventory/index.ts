// ============================================================
// Inventory Data — Barrel Export
// ============================================================
// Explicit named exports for better tooling support and
// clearer dependency graphs. Types are re-exported from types.ts.
// ============================================================

// Types (all interfaces and type aliases)
export * from './types';

// Static data constants
export { MATERIAL_GROUPS, CONDITIONS, type MaterialDef } from './materials';
export { WEAPONS } from './weapons';
export { ARMORS } from './armors';
export { ACCESSORIES, CURIOS } from './accessories';
export { CONSUMABLES } from './consumables';
export { CURRENCY, getWealthTier } from './currency';
export { ARTIFACT_GRAMMAR } from './artifacts';
export { CONTAINERS } from './containers';
export { THROWABLES, TORCHES, QUICK_POTIONS, QUICK_FOODS } from './quickslots';
export { ENCHANTMENTS } from './enchantments';
export { CUISINE } from './cuisine';
export { INSTRUMENTS } from './instruments';
export { MERCHANDISE } from './merchandise';
export { RECIPES, type Recipe, type RecipeCategory, type CraftingStation } from './recipes';
