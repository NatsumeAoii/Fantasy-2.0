// Get a random element from an array
export function getRandomElement(arr) {
    // Make sure the array is valid and has elements
    if (arr && arr.length > 0) {
        return arr[Math.floor(Math.random() * arr.length)];
    }
    // Return undefined if the array is invalid or empty
    return undefined;
}

// Get a random number between min and max (inclusive)
export function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Random selection with weights
export function getWeightedRandomElement(items, weights) {
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

// Get multiple random elements from an array, excluding specified items
export function getRandomElements(arr, count, exclude = []) {
    const availableItems = arr.filter(item => !exclude.includes(item));
    const selectedItems = new Set();
    while (selectedItems.size < count) {
        selectedItems.add(getRandomElement(availableItems));
    }
    return Array.from(selectedItems);
}

// Shuffle an array in place (Fisher-Yates shuffle)
export function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}
