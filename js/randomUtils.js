export function getRandomElement(arr) {
    if (arr && arr.length > 0) {
        return arr[Math.floor(Math.random() * arr.length)];
    }
    return undefined;
}

export function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

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

export function getRandomElements(arr, count, exclude = []) {
    const availableItems = arr.filter(item => !exclude.includes(item));
    const selectedItems = new Set();
    while (selectedItems.size < count) {
        selectedItems.add(getRandomElement(availableItems));
    }
    return Array.from(selectedItems);
}

export const shuffleArray = (arr) => {
    if (!Array.isArray(arr)) return arr;
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
};
