export function getRandomElement(sourceArray) {
    if (!Array.isArray(sourceArray) || sourceArray.length === 0) {
        return undefined;
    }
    const index = Math.floor(Math.random() * sourceArray.length);
    return sourceArray[index];
}

export function getRandomNumber(min, max) {
    if (typeof min !== 'number' || typeof max !== 'number' || !isFinite(min) || !isFinite(max)) {
        console.error(`Invalid arguments: min (${min}) and max (${max}) must be finite numbers.`);
        return 0;
    }
    const integerMin = Math.ceil(min);
    const integerMax = Math.floor(max);
    if (integerMin > integerMax) {
        return integerMin;
    }
    return Math.floor(Math.random() * (integerMax - integerMin + 1)) + integerMin;
}

export function getRandomElements(sourceArray, count) {
    if (!Array.isArray(sourceArray) || !Number.isInteger(count) || count <= 0) {
        return [];
    }

    const availableItems = [...sourceArray];
    const numToPick = Math.min(count, availableItems.length);

    if (numToPick === 0) {
        return [];
    }

    for (let i = availableItems.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [availableItems[i], availableItems[j]] = [availableItems[j], availableItems[i]];
    }

    return availableItems.slice(0, numToPick);
}

export function applyDiminishingReturns(value, softCap, severity = 0.5) {
    if (value <= softCap) {
        return value;
    }
    const excess = value - softCap;
    const reductionFactor = 1 - Math.max(0, Math.min(1, severity));
    const reducedExcess = excess * reductionFactor;
    return softCap + reducedExcess;
}