# ADR: Architecture Review Round 2 — June 2026

## Context

A comprehensive architecture review was performed at v5.4.1 on June 3, 2026. The codebase is a frontend-only SPA with clean layer separation. No critical structural problems were found, but several medium-priority improvements were identified and resolved.

## Findings Resolved

| Priority | Area | Problem | Resolution |
|---|---|---|---|
| Medium | Logic ↔ Store Coupling | `characterAnalyzer.ts` and `buildPlanner.ts` imported from `../../store/selectors` | Moved 3 shared pure functions to `src/logic/analysis/sharedSelectors.ts`; store re-exports for backward compat |
| Medium | Config ↔ Logic Coupling | `inventoryExpansionConfig.ts` imported bracket types from `../logic/ExpansionUtils` | Created `src/config/bracketTypes.ts`; logic re-exports for backward compat |
| Medium | Barrel Export Breadth | `data/inventory/index.ts` used `export *` from 15 modules | Replaced with explicit named exports for all constants and types |
| Medium | ProfileLayout Indirection | Single-line passthrough to CharacterShell | Deleted `ProfileLayout.tsx`; route uses `CharacterShell` directly |
| Low | Dead Code | 3 deprecated shim files in `src/store/` (buildPlanner.ts, characterAnalyzer.ts, equipmentOptimizer.ts) | Deleted — nothing imported from them; barrel already imports from `src/logic/analysis/` |
| Low | Unused Hook Export | Hooks barrel missing `usePersistedTab` | Added to `src/hooks/index.ts` |

## Findings Deferred (Acceptable at Current Scale)

| Priority | Area | Rationale for Deferral |
|---|---|---|
| Medium | Icon Library (4 families) | Requires visual audit of 1500+ icon references; largest non-data bundle contributor but functionally correct |
| Low | Theme Token Duplication | Legacy compat `--token-*` layer exists for redesign transition; will collapse when Cathedral Brass redesign completes |
| Low | Test Coverage Gaps | Not architectural — eventBus, preferencesStore, and analysis engines work correctly per manual verification |
| Low | InventoryEngine.generateLoadout Size | Linear slot-filling procedure with clear section comments; extracting helpers would fragment a top-to-bottom flow and require passing many arguments |

## Architectural State After Changes

### Dependency Direction (verified clean)
```
Routes → Components → Store → Logic → Config → Data
                              ↗ (re-exports only)       ↗ (types only)
```

- **Zero** logic → store imports (was 2, now 0)
- **Zero** config → logic imports (was 1, now 0)
- **Zero** data → logic/store/component imports
- **Zero** dead deprecated shim files
- **Zero** unused barrel exports

### Files Changed
- Created: `src/logic/analysis/sharedSelectors.ts`, `src/config/bracketTypes.ts`
- Modified: `src/store/selectors.ts`, `src/logic/analysis/characterAnalyzer.ts`, `src/logic/analysis/buildPlanner.ts`, `src/logic/analysis/index.ts`, `src/logic/ExpansionUtils.ts`, `src/config/inventoryExpansionConfig.ts`, `src/data/inventory/index.ts`, `src/routes/character.$id.tsx`, `src/components/Layout/index.ts`, `src/hooks/index.ts`
- Deleted: `src/components/Layout/ProfileLayout.tsx`, `src/store/buildPlanner.ts`, `src/store/characterAnalyzer.ts`, `src/store/equipmentOptimizer.ts`

### Verification
- `tsc --noEmit`: passes
- `npm run lint`: passes (1 pre-existing react-refresh warning in ErrorBoundary.tsx)
- `npm test`: 176/176 tests pass across 58 files
- `npm run build`: succeeds, 984 modules transformed

## Status

Complete. No remaining actionable architectural issues at this project's scale.
