// Improved random utility functions
export function getRandomElement(arr) {
    if (!Array.isArray(arr) || arr.length === 0) {
        console.error("Invalid array for random element selection:", arr);
        return null;  // Return null instead of throwing an error
    }
    return arr[Math.floor(Math.random() * arr.length)];
}

export function getRandomNumber(min, max) {
    if (typeof min !== 'number' || typeof max !== 'number' || min > max) throw new Error("Invalid min/max for random number generation");
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Random selection with weights
export function getWeightedRandomElement(items, weights) {
    if (items.length !== weights.length || items.length === 0) throw new Error("Items and weights must be of equal length and non-zero");
    
    const totalWeight = weights.reduce((acc, weight) => acc + weight, 0);
    const random = Math.random() * totalWeight;

    let cumulativeWeight = 0;
    for (let i = 0; i < items.length; i++) {
        cumulativeWeight += weights[i];
        if (random < cumulativeWeight) {
            return items[i];
        }
    }
    return items[items.length - 1];
}

// Get random elements with exclusion
export function getRandomElements(arr, count, exclude = []) {
    if (!Array.isArray(arr) || arr.length === 0) throw new Error("Invalid array for random element selection");
    const availableItems = arr.filter(item => !exclude.includes(item));
    if (availableItems.length < count) throw new Error("Not enough elements to select from");

    const selectedItems = new Set();
    while (selectedItems.size < count) {
        selectedItems.add(getRandomElement(availableItems));
    }
    return Array.from(selectedItems);
}

// Fisher-Yates shuffle algorithm
export function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}
