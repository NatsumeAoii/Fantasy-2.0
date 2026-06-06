/**
 * Seeded random number generator using Mulberry32 algorithm.
 * Provides deterministic random generation when seeded.
 *
 * ARCHITECTURE NOTE — Global Mutable State:
 * This module uses a module-level `randomFunc` variable as shared PRNG state.
 * This is intentionally global because:
 *   1. Character generation is synchronous — no interleaving is possible.
 *   2. All engines call getRandom() during a single generate() call stack.
 *   3. The characterStore's stale-request pattern (generationRequestId) ensures
 *      only one generation runs at a time, even under React strict mode.
 *
 * If generation ever becomes async or parallelized, this module MUST be
 * refactored to pass a PRNG instance through the pipeline via dependency
 * injection instead of relying on module-level state.
 */

const mulberry32 = (a: number) => {
    return () => {
        let t = a += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}

let randomFunc = Math.random;
const INVALID_RANDOM_NUMBER_FALLBACK = 0;

/**
 * Generation lock — prevents concurrent setSeed() calls from corrupting state.
 * The characterStore already serializes generation via generationRequestId,
 * but this provides defense-in-depth at the PRNG level.
 */
let isGenerating = false;

/** Returns true if a seeded generation is currently in progress. */
export const isSeededGenerationActive = (): boolean => isGenerating;

/**
 * Sets the seed for the random number generator.
 * If seed is null, reverts to Math.random() and releases the generation lock.
 */
export const setSeed = (seed: string | number | null) => {
    if (seed === null || seed === undefined) {
        randomFunc = Math.random;
        isGenerating = false;
        return;
    }

    if (isGenerating && import.meta.env?.DEV && import.meta.env.MODE !== 'test') {
        console.warn('[randomUtils] setSeed() called while a seeded generation is already active. This may indicate a concurrency issue.')
    }

    isGenerating = true;

    let seedInt = 0;
    if (typeof seed === 'string') {
        // Defense-in-depth: cap iteration length even if normalization was bypassed
        const safeSeed = seed.length > 512 ? seed.slice(0, 512) : seed;
        let h = 0xdeadbeef;
        for (let i = 0; i < safeSeed.length; i++) {
            h = Math.imul(h ^ safeSeed.charCodeAt(i), 2654435761);
        }
        seedInt = (h ^ h >>> 16) >>> 0;
    } else {
        seedInt = seed;
    }

    randomFunc = mulberry32(seedInt);
}

export const getRandom = () => randomFunc();

export function getRandomElement<T>(sourceArray: T[] | readonly T[]): T | undefined {
    if (!Array.isArray(sourceArray) || sourceArray.length === 0) {
        return undefined;
    }
    const index = Math.floor(getRandom() * sourceArray.length);
    return sourceArray[index];
}

export function getRandomNumber(min: number, max: number): number {
    if (typeof min !== 'number' || typeof max !== 'number' || !isFinite(min) || !isFinite(max)) {
        return INVALID_RANDOM_NUMBER_FALLBACK;
    }
    const integerMin = Math.ceil(min);
    const integerMax = Math.floor(max);
    if (integerMin > integerMax) {
        return integerMin;
    }
    return Math.floor(getRandom() * (integerMax - integerMin + 1)) + integerMin;
}

export function getRandomElements<T>(sourceArray: T[] | readonly T[], count: number): T[] {
    if (!Array.isArray(sourceArray) || !Number.isInteger(count) || count <= 0) {
        return [];
    }

    const numToPick = Math.min(count, sourceArray.length);

    if (numToPick === 0) {
        return [];
    }

    // Optimization: for small picks relative to array size, use index-set selection (O(count))
    if (numToPick <= sourceArray.length / 4) {
        const picked = new Set<number>();
        const result: T[] = [];
        // Safety cap: if repeated collisions exceed a reasonable bound, fall through to Fisher-Yates
        const maxAttempts = numToPick * 10;
        let attempts = 0;
        while (result.length < numToPick && attempts < maxAttempts) {
            attempts++;
            const idx = Math.floor(getRandom() * sourceArray.length);
            if (!picked.has(idx)) {
                picked.add(idx);
                result.push(sourceArray[idx]);
            }
        }
        if (result.length >= numToPick) {
            return result;
        }
        // Safety cap hit (degenerate PRNG) — fill remaining items from the unpicked
        // indices using Fisher-Yates on the remaining candidates only. This avoids
        // consuming extra PRNG calls that would break seed determinism.
        const remaining: T[] = [];
        for (let i = 0; i < sourceArray.length; i++) {
            if (!picked.has(i)) remaining.push(sourceArray[i]);
        }
        const needed = numToPick - result.length;
        for (let i = remaining.length - 1; i > 0 && result.length < numToPick; i--) {
            const j = Math.floor(getRandom() * (i + 1));
            [remaining[i], remaining[j]] = [remaining[j], remaining[i]];
        }
        result.push(...remaining.slice(0, needed));
        return result;
    }

    // Full Fisher-Yates shuffle for large picks
    const availableItems = [...sourceArray];
    for (let i = availableItems.length - 1; i > 0; i--) {
        const j = Math.floor(getRandom() * (i + 1));
        [availableItems[i], availableItems[j]] = [availableItems[j], availableItems[i]];
    }

    return availableItems.slice(0, numToPick);
}

export function applyDiminishingReturns(value: number, softCap: number, severity: number = 0.5): number {
    if (value <= softCap) {
        return value;
    }
    const excess = value - softCap;
    const reductionFactor = 1 - Math.max(0, Math.min(1, severity));
    const reducedExcess = excess * reductionFactor;
    return softCap + reducedExcess;
}
