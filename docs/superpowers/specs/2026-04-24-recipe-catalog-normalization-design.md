# Recipe Catalog Normalization Design

**Date:** 2026-04-24

**Goal**

Normalize crafting recipes in the `cathedral-brass-redesign` worktree so every recipe output and ingredient resolves to an existing inventory-data name, while expanding each recipe category to 30 entries.

**Scope**

- Update `src/data/inventory/recipes.ts`.
- Add data validation coverage for recipe counts and catalog references.
- Update tests that assert recipe output names via recipe ids.

**Constraints**

- Work only in the linked worktree, not the main checkout.
- Do not add new product definitions to inventory catalogs.
- Recipe outputs must be exact existing names from current inventory data.
- Recipe materials must be exact existing names from current inventory data.
- Each category must end at exactly 30 recipes.

**Approach**

1. Keep the existing recipe structure and ids unless a rename is required for clarity.
2. Replace non-existent `outputItem` values with exact catalog names already present in inventory data.
3. Add missing recipes per category using existing material names and existing output names only.
4. Prefer category-matching source catalogs where available:
   - Weapon outputs from `weapons.ts` and existing ammo/tool data when the crafted result is ammunition.
   - Armor outputs from existing inventory data names, favoring `armors.ts`.
   - Alchemy outputs from `consumables.ts` and compatible quickslot/bomb names already present in inventory data.
   - Tool outputs from existing tool names and variants in `consumables.ts`.
   - Cooking outputs from `cuisine.ts`.
   - Enchanting outputs from `enchantments.ts`.

**Validation**

- Category counts must be:
  - Alchemy: 30
  - Weapon: 30
  - Armor: 30
  - Tool: 30
  - Cooking: 30
  - Enchanting: 30
- Every `outputItem` string must be found in imported inventory catalogs.
- Every `materialsRequired` string must be found in imported inventory catalogs.
- Existing crafting-panel tests must reflect the normalized recipe outputs for the recipe ids they use.

**Files**

- Modify: `src/data/inventory/recipes.ts`
- Add: `src/data/inventory/recipes.test.ts`
- Modify: `src/logic/inventoryCrafting.test.ts`
- Modify: `src/components/Inventory/InventoryCraftingPanel.test.tsx`
- Modify: `src/components/Inventory/InventoryPanel.test.tsx`
