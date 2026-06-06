# ADR: Architecture Review — May 2026

## Context

A full architecture review was performed at v5.4.1. The codebase is a frontend-only SPA with clean layer separation. No critical structural problems were found, but several medium-priority improvements were identified.

## Decisions Made

### 1. Analysis engines moved to `src/logic/analysis/`

**Problem**: `characterAnalyzer.ts`, `equipmentOptimizer.ts`, and `buildPlanner.ts` were located in `src/store/` despite having zero Zustand dependency. They are pure functions that operate on Character objects.

**Decision**: Moved canonical implementations to `src/logic/analysis/`. The old `src/store/` files now re-export from the new location for backward compatibility. The store barrel (`src/store/index.ts`) imports directly from `src/logic/analysis/`.

**Consequence**: The logic layer now owns all pure computation. The store layer is reserved for actual state management.

### 2. PRNG safety documentation and generation lock

**Problem**: `randomUtils.ts` uses module-level mutable state (global `randomFunc`). This is safe because generation is synchronous, but the constraint was undocumented and fragile for future changes.

**Decision**: Added comprehensive architecture documentation to `randomUtils.ts` explaining why global state is safe. Added a `isGenerating` lock that warns in development if `setSeed()` is called while a generation is already active.

**Consequence**: Future developers will understand the constraint. The warning provides early detection if the invariant is violated.

### 3. Event bus integration for character generation

**Problem**: `characterStore` did not emit events on generation completion. Other stores that need to react (e.g., history) had to be called imperatively.

**Decision**: Added `eventBus.emit({ type: 'character:generated', ... })` after successful generation in the store.

**Consequence**: The history store (or any future subscriber) can now react to generation via the event bus without tight coupling.

### 4. CharacterExpansionEngine export standardization

**Problem**: `CharacterExpansionEngine` exported both a named function (`generateCharacterExpansions`) and an object wrapper. Other engines use only the object pattern.

**Decision**: Made the internal function private, exposed it via both the object pattern (`CharacterExpansionEngine.generate`) and a named export (`generateCharacterExpansions`) for test compatibility.

**Consequence**: Consistent engine API surface. Tests continue to work.

## Deferred — Icon Library Consolidation

**Problem**: The project imports from 4 react-icons families (gi, fa, tb, lu), creating 5+ separate chunks. This is likely the largest non-data contributor to bundle size.

**Recommendation**: Audit icon usage and consolidate to 1-2 families, or migrate to a tree-shakeable library like Lucide. This is deferred because it requires a visual audit of all 1500+ lines in `src/data/inventory/icons.ts` and equivalent replacements.

**Estimated effort**: Medium-High (visual audit + replacement + testing).

## Status

Implemented (except icon consolidation, which is deferred).
