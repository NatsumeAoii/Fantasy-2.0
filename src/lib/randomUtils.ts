/**
 * Seeded random number generator using Mulberry32 algorithm.
 * Provides deterministic random generation when seeded.
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
 * Sets the seed for the random number generator.
 * If seed is null, reverts to Math.random().
 */
export const setSeed = (seed: string | number | null) => {
    if (seed === null || seed === undefined) {
        randomFunc = Math.random;
        return;
    }

    let seedInt = 0;
    if (typeof seed === 'string') {
        let h = 0xdeadbeef;
        for (let i = 0; i < seed.length; i++) {
            h = Math.imul(h ^ seed.charCodeAt(i), 2654435761);
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
        while (result.length < numToPick) {
            const idx = Math.floor(getRandom() * sourceArray.length);
            if (!picked.has(idx)) {
                picked.add(idx);
                result.push(sourceArray[idx]);
            }
        }
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
