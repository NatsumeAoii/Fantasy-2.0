
/**
 * A hierarchical title tier that scales with character progression.
 * Ranks determine access to guild facilities, quest tiers, and
 * social standing within the faction system.
 */
export interface RankInfo { name: string; powerLevel: number; }

/** Map of all rank names to their tier data. */
export const RANKS: Record<string, RankInfo> = {
  "F": {
    "name": "F",
    "powerLevel": 0
  },
  "E": {
    "name": "E",
    "powerLevel": 1
  },
  "D": {
    "name": "D",
    "powerLevel": 2
  },
  "C": {
    "name": "C",
    "powerLevel": 3
  },
  "B": {
    "name": "B",
    "powerLevel": 4
  },
  "A": {
    "name": "A",
    "powerLevel": 5
  },
  "S": {
    "name": "S",
    "powerLevel": 6
  },
  "SS": {
    "name": "SS",
    "powerLevel": 7
  },
  "SSS": {
    "name": "SSS",
    "powerLevel": 8
  },
  "SSSS": {
    "name": "SSSS",
    "powerLevel": 9
  },
  "EX": {
    "name": "EX",
    "powerLevel": 10
  },
  "Legendary": {
    "name": "Legendary",
    "powerLevel": 11
  },
  "Mythic": {
    "name": "Mythic",
    "powerLevel": 12
  }
};

/** Rank names sorted from lowest to highest tier. */
export const ORDERED_RANK_NAMES: string[] = [
  "F",
  "E",
  "D",
  "C",
  "B",
  "A",
  "S",
  "SS",
  "SSS",
  "SSSS",
  "EX",
  "Legendary",
  "Mythic"
];
