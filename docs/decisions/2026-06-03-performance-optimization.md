# ADR: Performance Optimization Pass — June 2026

## Context

Performance profiling pass on v5.4.1. The critical path is `CharacterGenerator.generate()` — a synchronous pipeline that runs once per character load. Generation is typically < 100ms, but repeated array scans on static data represent unnecessary work that can be eliminated with zero downside.

## Bottlenecks Identified

The `InventoryEngine.generateLoadout()` function performed ~15 array filter/find operations per call on static data arrays (ARMORS, ACCESSORIES, CONTAINERS, CONSUMABLES, WEAPONS) that never change at runtime. Each scan is O(n) where n = array length.

The `LoreEngine.assignRaceAndRole()` function built a new `Set<string>` of invalid roles and filtered the 229-role array on every call, despite the `unlogicalCombinations` data being static.

## Changes Made

### 1. Created `src/logic/inventory/inventoryLookups.ts`

Pre-computed lookup tables built once at module load time:
- `getArmorsBySlotAndType(slot, type)` — Map keyed by `slot:type` → O(1) vs O(n) filter
- `getShoulderArmors()` — cached result
- `getAccessoriesBySlot(slot)` — Map keyed by slot → O(1) vs O(n) filter
- `getContainersBySlot(slot)` — Map keyed by slot → O(1) vs O(n) filter
- `getWeaponsForRole(role)` — pre-indexed by role keyword → faster than full scan
- `getFilteredConsumables(tiers)` — pre-split potions from non-potions
- `ONE_HANDED_WEAPONS` — pre-filtered once
- `DUAL_WIELD_OFFHANDS` — pre-filtered once
- `DAGGER_WEAPON` — pre-found once

### 2. Updated `src/logic/inventory/InventoryEngine.ts`

Replaced all inline `.filter()` / `.find()` calls in `generateLoadout()` with pre-computed lookups. Removed now-unused imports (ARMORS, ACCESSORIES, CONSUMABLES, CONTAINERS).

### 3. Updated `src/logic/LoreEngine.ts`

Pre-computed `VALID_ROLES_BY_RACE` map at module load time. Eliminates per-call Set construction and 229-element array filter.

## Impact

| Operation | Before | After |
|---|---|---|
| Armor slot lookup (×5 per call) | O(n) filter on ~30 items | O(1) Map lookup |
| Accessory slot lookup (×4) | O(n) filter on ~15 items | O(1) Map lookup |
| Container slot lookup (×2) | O(n) filter on ~8 items | O(1) Map lookup |
| Weapon role matching (×1) | O(n×m) nested loop on ~18 weapons × roles | Pre-indexed keyword map |
| Consumable tier filter (×1) | O(n) filter on ~54 consumables | Pre-split + set check |
| Offhand weapon selection (×2) | O(n) filter on ~18 weapons | Pre-filtered arrays |
| Race→Role validation (×1) | O(n) filter on 229 roles + Set construction | O(1) Map lookup |

**Estimated improvement**: Eliminates ~15+ array scans per `generateLoadout()` call and ~1 per `assignRaceAndRole()` call. For typical generation (< 100ms), this removes approximately 20-30% of the array iteration work in the inventory pipeline.

**Memory cost**: ~2KB of Map/Array references at module load. Negligible vs the data arrays themselves (hundreds of KB).

## Verification

- `tsc --noEmit`: passes
- `npm test`: 176/176 tests pass
- `npm run build`: succeeds (985 modules)
- All existing tests exercise the optimized code paths and confirm identical behavior

## Status

Complete.
