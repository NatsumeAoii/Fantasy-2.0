# ADR: Correctness & Robustness Review — June 2026

## Context

Code review of v5.4.1 focused on correctness, resilience, and maintainability. Identified one critical bug and one robustness improvement.

## Bug Fixed: Non-deterministic IDs during seeded generation

**Problem**: `makeId()` in `src/lib/idUtils.ts` always used `crypto.randomUUID()` (available in all modern browsers) as its first choice. This meant that during seeded generation, item IDs were non-deterministic — the same seed would produce different item IDs on each generation. This violated the core seed contract: "same seed → same character".

**Evidence**: The `randomUtils.ts` architecture note explicitly states that all randomness during generation must come from the seeded PRNG. The `isSeededGenerationActive()` function was already exported for this exact purpose but was not being used by `makeId()`.

**Fix**: When `isSeededGenerationActive()` returns true, `makeId()` now generates a deterministic UUID-format string from the seeded PRNG. When no seed is active (UI interactions, non-seeded mode), it still uses `crypto.randomUUID()` for maximum entropy.

**Impact**: Characters generated from the same seed will now produce identical item IDs, making seed-based sharing and reproducibility fully reliable.

## Robustness Fix: getRandomElements infinite loop guard

**Problem**: The index-set selection path in `getRandomElements()` used a `while` loop with no upper bound on iterations. If the PRNG produced repeated values (degenerate seed, very small array + high pick count ratio), the loop could spin for an unbounded number of iterations before naturally converging.

**Fix**: Added a safety cap of `numToPick * 10` iterations. If the cap is hit, the function falls through to the Fisher-Yates shuffle path which is guaranteed to terminate in O(n) time. In practice, this safety cap will never trigger with a well-distributed PRNG — it exists purely as defense-in-depth against pathological inputs.

**Impact**: No behavioral change under normal conditions. Prevents theoretical hangs under degenerate PRNG states.

## Verification

- `tsc --noEmit`: passes
- `npm test`: 176/176 tests pass
- `npm run build`: succeeds (985 modules)

## Status

Complete.
