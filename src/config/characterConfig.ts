export const MAX_LEVEL = 9999

export const CHARACTER_CONFIG = {
  PROBABILITY: {
    PRODIGY_BONUS_CHANCE: 0.05,
    GUILD_MEMBERSHIP_CHANCE: 0.5,
    FACTION_ALIGNMENT_CHANCE: 0.3,
    UNLOGICAL_COMBO_BYPASS_CHANCE: 0.05,
  },

  LEVEL: {
    MAX: MAX_LEVEL,
    DISTRIBUTION: [
      { threshold: 0.001, range: { min: 5000, max: MAX_LEVEL }, isWanderer: true },
      { threshold: 0.006, range: { min: 500, max: 4999 }, isWanderer: false },
      { threshold: 0.055, range: { min: 101, max: 499 }, isWanderer: false },
      { threshold: 0.305, range: { min: 70, max: 100 }, isWanderer: false },
      { threshold: 7.0, range: { min: 1, max: 69 }, isWanderer: false },
    ],
  },

  AGE: {
    BRACKETS: [
      { maxLevel: 69, range: { min: 5, max: 40 } },
      { maxLevel: 100, range: { min: 20, max: 60 } },
      { maxLevel: 499, range: { min: 50, max: 250 } },
      { maxLevel: 2999, range: { min: 200, max: 1500 } },
      { maxLevel: Infinity, range: { min: 1000, max: 5000 } },
    ],
  },

  SKILLS_AND_TITLES: {
    CONFIG_BY_LEVEL: [
      { maxLevel: 69, skills: { min: 4, max: 8 }, titles: { min: 2, max: 4 }, ranks: { min: 'F', max: 'A' }, bonus: { skills: 3, titles: 2 } },
      { maxLevel: 100, skills: { min: 8, max: 15 }, titles: { min: 3, max: 6 }, ranks: { min: 'C', max: 'SS' }, bonus: { skills: 4, titles: 3 } },
      { maxLevel: 499, skills: { min: 12, max: 20 }, titles: { min: 5, max: 8 }, ranks: { min: 'A', max: 'SSSS' }, bonus: { skills: 5, titles: 4 } },
      { maxLevel: 2999, skills: { min: 18, max: 25 }, titles: { min: 6, max: 10 }, ranks: { min: 'S', max: 'Legendary' }, bonus: { skills: 6, titles: 5 } },
      { maxLevel: Infinity, skills: { min: 25, max: 35 }, titles: { min: 8, max: 15 }, ranks: { min: 'SS', max: 'Mythic' }, bonus: { skills: 8, titles: 6 } },
    ],
    WANDERER_CONFIG: {
      skills: { min: 20, max: 40 },
      titles: { min: 10, max: 20 },
      ranks: { min: 'SSSS', max: 'Mythic' },
    },
  },

  SPECIAL_POWERS: {
    VALUE_RANGE: {
      LOW_LEVEL: { min: 10, max: 49 },
      HIGH_LEVEL: { min: 50, max: 100 },
    },
    HIGH_LEVEL_THRESHOLD: 100,
  },

  SKILL_COST_TABLE: {
    F: { cd: { min: 15, max: 30, unit: 'm' }, cost: { min: 15, max: 30 } },
    E: { cd: { min: 10, max: 20, unit: 'm' }, cost: { min: 30, max: 50 } },
    D: { cd: { min: 5, max: 10, unit: 'm' }, cost: { min: 50, max: 80 } },
    C: { cd: { min: 1, max: 3, unit: 'm' }, cost: { min: 80, max: 150 } },
    B: { cd: { min: 30, max: 60, unit: 's' }, cost: { min: 150, max: 250 } },
    A: { cd: { min: 15, max: 30, unit: 's' }, cost: { min: 250, max: 450 } },
    S: { cd: { min: 10, max: 20, unit: 's' }, cost: { min: 300, max: 600 } },
    SS: { cd: { min: 5, max: 10, unit: 's' }, cost: { min: 600, max: 1200 } },
    SSS: { cd: { min: 3, max: 8, unit: 's' }, cost: { min: 1200, max: 2500 } },
    SSSS: { cd: { min: 2, max: 5, unit: 's' }, cost: { min: 2000, max: 3500 } },
    EX: { cd: { min: 1, max: 3, unit: 's' }, cost: { min: 3000, max: 5000 } },
    Legendary: { cd: { min: 1, max: 5, unit: 's' }, cost: { min: 2500, max: 4500 } },
    Mythic: { cd: { min: 0, max: 0, unit: 'var' }, cost: { min: 4500, max: 6500 } },
  },

  STORY: {
    CONFIG_BY_LEVEL: [
      { maxLevel: 25, traits: { stat: 1, race: 1, role: 1, min: 2 }, personality: { min: 2, max: 2 } },
      { maxLevel: 69, traits: { stat: 1, race: 1, role: 1, min: 3 }, personality: { min: 2, max: 4 } },
      { maxLevel: 100, traits: { stat: 2, race: 2, role: 2, min: 4 }, personality: { min: 2, max: 5 } },
      { maxLevel: 499, traits: { stat: 2, race: 3, role: 3, min: 5 }, personality: { min: 3, max: 6 } },
      { maxLevel: 2999, traits: { stat: 3, race: 3, role: 3, min: 7 }, personality: { min: 4, max: 7 } },
      { maxLevel: Infinity, traits: { stat: 4, race: 5, role: 4, min: 8 }, personality: { min: 6, max: 10 } },
    ],
    AGE_BONUS: [
      { maxAge: 25, bonus: { traits: 0, personality: 0 } },
      { maxAge: 40, bonus: { traits: 1, personality: 1 } },
      { maxAge: 100, bonus: { traits: 1, personality: 2 } },
      { maxAge: 500, bonus: { traits: 2, personality: 2 } },
      { maxAge: 1500, bonus: { traits: 3, personality: 4 } },
      { maxAge: Infinity, bonus: { traits: 6, personality: 6 } },
    ],
  },
} as const
