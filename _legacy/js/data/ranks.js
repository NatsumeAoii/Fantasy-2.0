// ranks.js
export const RANKS = Object.freeze({
    F:         { name: "F",         powerLevel: 0 },
    E:         { name: "E",         powerLevel: 1 },
    D:         { name: "D",         powerLevel: 2 },
    C:         { name: "C",         powerLevel: 3 },
    B:         { name: "B",         powerLevel: 4 },
    A:         { name: "A",         powerLevel: 5 },
    S:         { name: "S",         powerLevel: 6 },
    SS:        { name: "SS",        powerLevel: 7 },
    SSS:       { name: "SSS",       powerLevel: 8 },
    SSSS:      { name: "SSSS",      powerLevel: 9 },
    EX:        { name: "EX",        powerLevel: 10 },
    Legendary: { name: "Legendary", powerLevel: 11 },
    Mythic:    { name: "Mythic",    powerLevel: 12 },
});

export const ORDERED_RANK_NAMES = Object.values(RANKS)
    .sort((a, b) => a.powerLevel - b.powerLevel)
    .map(rank => rank.name);