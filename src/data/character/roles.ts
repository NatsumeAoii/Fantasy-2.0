import type { RoleData } from '../../types';

/** Master list of all playable roles (classes) with stat profiles and descriptions. */
export const ROLES: Record<string, RoleData> = {
  "Archmage": {
    "baseStats": {
      "intelligence": 45,
      "wisdom": 30,
      "mana": 200,
      "magicPower": 150,
      "willpower": 20,
      "knowledge": 25
    },
    "affinities": {
      "intelligence": 1.25,
      "wisdom": 1.19
    }
  },
  "Warlord": {
    "baseStats": {
      "strength": 45,
      "endurance": 30,
      "health": 150,
      "attackPower": 150,
      "resolve": 20
    },
    "affinities": {
      "strength": 1.25,
      "endurance": 1.19
    }
  },
  "High Paladin": {
    "baseStats": {
      "strength": 38,
      "endurance": 23,
      "charisma": 23,
      "health": 113,
      "defense": 75,
      "willpower": 15
    },
    "affinities": {
      "strength": 1.19,
      "endurance": 1.12,
      "charisma": 1.19,
      "willpower": 1.12
    }
  },
  "Faceless King": {
    "baseStats": {
      "agility": 45,
      "dexterity": 30,
      "stealth": 75,
      "evasion": 38
    },
    "affinities": {
      "agility": 1.25,
      "dexterity": 1.19
    }
  },
  "Titan Lord": {
    "baseStats": {
      "strength": 53,
      "endurance": 38,
      "health": 225,
      "attackPower": 188,
      "resolve": 25
    },
    "affinities": {
      "strength": 1.31,
      "endurance": 1.25
    }
  },
  "Eclipse Knight": {
    "baseStats": {
      "strength": 30,
      "intelligence": 30,
      "attackPower": 113,
      "magicPower": 113
    },
    "affinities": {
      "strength": 1.19,
      "intelligence": 1.19
    }
  },
  "Spiritcaller": {
    "baseStats": {
      "wisdom": 45,
      "charisma": 30,
      "mana": 150,
      "magicPower": 75
    },
    "affinities": {
      "wisdom": 1.25,
      "charisma": 1.19
    }
  },
  "Necromancer": {
    "baseStats": {
      "intelligence": 45,
      "wisdom": 23,
      "mana": 188,
      "magicPower": 150
    },
    "affinities": {
      "intelligence": 1.25,
      "wisdom": 1.12
    }
  },
  "Stormcaller": {
    "baseStats": {
      "intelligence": 45,
      "agility": 23,
      "magicPower": 150,
      "evasion": 19
    },
    "affinities": {
      "intelligence": 1.25,
      "agility": 1.12
    }
  },
  "Runelord": {
    "baseStats": {
      "intelligence": 38,
      "endurance": 30,
      "crafting": 75,
      "defense": 38,
      "knowledge": 20
    },
    "affinities": {
      "intelligence": 1.25,
      "endurance": 1.19
    }
  },
  "Lightbringer": {
    "baseStats": {
      "wisdom": 45,
      "charisma": 30,
      "magicPower": 75,
      "magicResist": 38
    },
    "affinities": {
      "wisdom": 1.25,
      "charisma": 1.19
    }
  },
  "Shadowmancer": {
    "baseStats": {
      "intelligence": 45,
      "agility": 23,
      "magicPower": 150,
      "stealth": 38
    },
    "affinities": {
      "intelligence": 1.25,
      "agility": 1.12
    }
  },
  "Storm Herald": {
    "baseStats": {
      "strength": 38,
      "wisdom": 30,
      "attackPower": 113,
      "magicPower": 75
    },
    "affinities": {
      "strength": 1.19,
      "wisdom": 1.19
    }
  },
  "Earthshaker": {
    "baseStats": {
      "strength": 45,
      "endurance": 30,
      "attackPower": 150,
      "defense": 75
    },
    "affinities": {
      "strength": 1.25,
      "endurance": 1.19
    }
  },
  "Arcane Warden": {
    "baseStats": {
      "intelligence": 38,
      "endurance": 30,
      "mana": 113,
      "defense": 75
    },
    "affinities": {
      "intelligence": 1.19,
      "endurance": 1.19
    }
  },
  "Grandmaster Knight": {
    "baseStats": {
      "strength": 38,
      "dexterity": 30,
      "attackPower": 113,
      "accuracy": 38
    },
    "affinities": {
      "strength": 1.19,
      "dexterity": 1.19
    }
  },
  "Soulbinder": {
    "baseStats": {
      "wisdom": 45,
      "endurance": 23,
      "mana": 150,
      "health": 75
    },
    "affinities": {
      "wisdom": 1.25,
      "endurance": 1.12
    }
  },
  "Voidseer": {
    "baseStats": {
      "wisdom": 53,
      "intelligence": 23,
      "perception": 75,
      "mana": 150
    },
    "affinities": {
      "wisdom": 1.31,
      "intelligence": 1.12
    }
  },
  "Abyssal Sage": {
    "baseStats": {
      "intelligence": 53,
      "wisdom": 23,
      "magicPower": 188,
      "mana": 150
    },
    "affinities": {
      "intelligence": 1.31,
      "wisdom": 1.12
    }
  },
  "Elementalist": {
    "baseStats": {
      "intelligence": 45,
      "wisdom": 23,
      "magicPower": 150,
      "elementalResistances": 38
    },
    "affinities": {
      "intelligence": 1.25,
      "wisdom": 1.12
    }
  },
  "Chronomancer": {
    "baseStats": {
      "intelligence": 45,
      "wisdom": 30,
      "mana": 150,
      "attackSpeed": 38
    },
    "affinities": {
      "intelligence": 1.25,
      "wisdom": 1.19
    }
  },
  "World-Forger": {
    "baseStats": {
      "endurance": 45,
      "intelligence": 30,
      "crafting": 150,
      "defense": 75
    },
    "affinities": {
      "endurance": 1.25,
      "intelligence": 1.19
    }
  },
  "Celestial": {
    "baseStats": {
      "wisdom": 38,
      "charisma": 38,
      "magicPower": 113,
      "magicResist": 56
    },
    "affinities": {
      "wisdom": 1.25,
      "charisma": 1.25
    }
  },
  "Void Lord": {
    "baseStats": {
      "intelligence": 45,
      "endurance": 30,
      "magicPower": 150,
      "health": 113
    },
    "affinities": {
      "intelligence": 1.25,
      "endurance": 1.19
    }
  },
  "God-Slayer": {
    "baseStats": {
      "strength": 30,
      "dexterity": 30,
      "endurance": 30,
      "attackPower": 113,
      "defense": 38
    },
    "affinities": {
      "strength": 1.19,
      "dexterity": 1.19,
      "endurance": 1.19
    }
  },
  "The Firstborn": {
    "baseStats": {
      "strength": 23,
      "agility": 23,
      "dexterity": 23,
      "endurance": 23,
      "intelligence": 23,
      "wisdom": 23,
      "luck": 23,
      "charisma": 23,
      "willpower": 10,
      "resolve": 10
    },
    "affinities": {
      "strength": 1.12,
      "agility": 1.12,
      "dexterity": 1.12,
      "endurance": 1.12,
      "intelligence": 1.12,
      "wisdom": 1.12,
      "luck": 1.12,
      "charisma": 1.12
    }
  },
  "Reality-Weaver": {
    "baseStats": {
      "intelligence": 45,
      "wisdom": 30,
      "luck": 15
    },
    "affinities": {
      "intelligence": 1.25,
      "wisdom": 1.19,
      "luck": 1.12
    }
  },
  "Star-Caller": {
    "baseStats": {
      "wisdom": 45,
      "intelligence": 30,
      "magicPower": 113,
      "perception": 38
    },
    "affinities": {
      "wisdom": 1.25,
      "intelligence": 1.19
    }
  },
  "Abyssal Tyrant": {
    "baseStats": {
      "strength": 45,
      "intelligence": 30,
      "attackPower": 150,
      "magicPower": 75
    },
    "affinities": {
      "strength": 1.25,
      "intelligence": 1.19
    }
  },
  "Genesis Sage": {
    "baseStats": {
      "wisdom": 53,
      "intelligence": 30,
      "mana": 188,
      "mpRegen": 19
    },
    "affinities": {
      "wisdom": 1.31,
      "intelligence": 1.19
    }
  },
  "Forge Master": {
    "baseStats": {
      "strength": 30,
      "endurance": 20,
      "crafting": 100,
      "attackPower": 50
    },
    "affinities": {
      "strength": 1.15,
      "endurance": 1.1
    }
  },
  "Blood Knight": {
    "baseStats": {
      "strength": 30,
      "endurance": 20,
      "attackPower": 70,
      "hpRegen": 5
    },
    "affinities": {
      "strength": 1.15,
      "endurance": 1.1
    }
  },
  "Blademaster": {
    "baseStats": {
      "dexterity": 30,
      "strength": 20,
      "attackPower": 60,
      "accuracy": 20
    },
    "affinities": {
      "dexterity": 1.15,
      "strength": 1.1
    }
  },
  "High Inquisitor": {
    "baseStats": {
      "strength": 25,
      "wisdom": 25,
      "attackPower": 50,
      "magicResist": 25,
      "willpower": 10
    },
    "affinities": {
      "strength": 1.12,
      "wisdom": 1.12
    }
  },
  "Iron Lord": {
    "baseStats": {
      "strength": 25,
      "endurance": 30,
      "attackPower": 60,
      "defense": 50,
      "resolve": 10
    },
    "affinities": {
      "strength": 1.12,
      "endurance": 1.15
    }
  },
  "Skullcrusher": {
    "baseStats": {
      "strength": 40,
      "endurance": 20,
      "attackPower": 80,
      "health": 50
    },
    "affinities": {
      "strength": 1.2,
      "endurance": 1.1
    }
  },
  "Archdruid": {
    "baseStats": {
      "wisdom": 35,
      "endurance": 15,
      "mana": 100,
      "mpRegen": 8,
      "survival": 20,
      "taming": 15
    },
    "affinities": {
      "wisdom": 1.18,
      "endurance": 1.08
    }
  },
  "Shadowblade": {
    "baseStats": {
      "agility": 30,
      "dexterity": 20,
      "stealth": 40,
      "attackPower": 50
    },
    "affinities": {
      "agility": 1.15,
      "dexterity": 1.1
    }
  },
  "Runesmith": {
    "baseStats": {
      "intelligence": 25,
      "strength": 20,
      "crafting": 70
    },
    "affinities": {
      "intelligence": 1.12,
      "strength": 1.1
    }
  },
  "Dreamweaver": {
    "baseStats": {
      "wisdom": 30,
      "charisma": 20,
      "mana": 80
    },
    "affinities": {
      "wisdom": 1.15,
      "charisma": 1.1
    }
  },
  "Spectral Blade": {
    "baseStats": {
      "agility": 25,
      "intelligence": 25,
      "attackPower": 40,
      "magicPower": 40
    },
    "affinities": {
      "agility": 1.12,
      "intelligence": 1.12
    }
  },
  "Ashenblade": {
    "baseStats": {
      "strength": 25,
      "dexterity": 25,
      "attackPower": 60
    },
    "affinities": {
      "strength": 1.12,
      "dexterity": 1.12
    }
  },
  "Ironbound Champion": {
    "baseStats": {
      "endurance": 35,
      "strength": 20,
      "defense": 60,
      "health": 80,
      "resolve": 15
    },
    "affinities": {
      "endurance": 1.18,
      "strength": 1.1
    }
  },
  "Shapeshifter Master": {
    "baseStats": {
      "endurance": 25,
      "agility": 25
    },
    "affinities": {
      "endurance": 1.12,
      "agility": 1.12
    }
  },
  "Battle Oracle": {
    "baseStats": {
      "wisdom": 30,
      "strength": 20,
      "perception": 30
    },
    "affinities": {
      "wisdom": 1.15,
      "strength": 1.1
    }
  },
  "Battle Sage": {
    "baseStats": {
      "intelligence": 30,
      "strength": 20
    },
    "affinities": {
      "intelligence": 1.15,
      "strength": 1.1
    }
  },
  "Darkblade": {
    "baseStats": {
      "strength": 25,
      "intelligence": 25,
      "attackPower": 50,
      "magicPower": 20
    },
    "affinities": {
      "strength": 1.12,
      "intelligence": 1.12
    }
  },
  "Stormbringer": {
    "baseStats": {
      "strength": 20,
      "intelligence": 30,
      "attackPower": 30,
      "magicPower": 50
    },
    "affinities": {
      "strength": 1.1,
      "intelligence": 1.15
    }
  },
  "Flame Adept": {
    "baseStats": {
      "intelligence": 35,
      "dexterity": 15,
      "magicPower": 70
    },
    "affinities": {
      "intelligence": 1.18,
      "dexterity": 1.08
    }
  },
  "Sword Saint": {
    "baseStats": {
      "dexterity": 35,
      "wisdom": 20,
      "accuracy": 40
    },
    "affinities": {
      "dexterity": 1.18,
      "wisdom": 1.1
    }
  },
  "Grand Summoner": {
    "baseStats": {
      "intelligence": 30,
      "charisma": 20,
      "mana": 120
    },
    "affinities": {
      "intelligence": 1.15,
      "charisma": 1.1
    }
  },
  "Spellslinger": {
    "baseStats": {
      "dexterity": 25,
      "intelligence": 25,
      "attackSpeed": 20
    },
    "affinities": {
      "dexterity": 1.12,
      "intelligence": 1.12
    }
  },
  "Dreadnought": {
    "baseStats": {
      "endurance": 40,
      "strength": 20,
      "defense": 70,
      "health": 100
    },
    "affinities": {
      "endurance": 1.2,
      "strength": 1.1
    }
  },
  "Master Assassin": {
    "baseStats": {
      "agility": 35,
      "dexterity": 25,
      "stealth": 50
    },
    "affinities": {
      "agility": 1.18,
      "dexterity": 1.12
    }
  },
  "Hierophant": {
    "baseStats": {
      "wisdom": 40,
      "charisma": 20,
      "mana": 100
    },
    "affinities": {
      "wisdom": 1.2,
      "charisma": 1.1
    }
  },
  "Time Warden": {
    "baseStats": {
      "intelligence": 30,
      "wisdom": 20,
      "attackSpeed": 15
    },
    "affinities": {
      "intelligence": 1.15,
      "wisdom": 1.1
    }
  },
  "Chaos Knight": {
    "baseStats": {
      "strength": 30,
      "luck": 20
    },
    "affinities": {
      "strength": 1.15,
      "luck": 1.1
    }
  },
  "Phoenixmancer": {
    "baseStats": {
      "intelligence": 30,
      "endurance": 15,
      "magicPower": 60
    },
    "affinities": {
      "intelligence": 1.15,
      "endurance": 1.08
    }
  },
  "Lorekeeper": {
    "baseStats": {
      "wisdom": 35,
      "intelligence": 25,
      "knowledge": 50
    },
    "affinities": {
      "wisdom": 1.18,
      "intelligence": 1.12
    }
  },
  "Grandmaster Spy": {
    "baseStats": {
      "agility": 30,
      "charisma": 20,
      "stealth": 40,
      "persuasion": 20
    },
    "affinities": {
      "agility": 1.15,
      "charisma": 1.1
    }
  },
  "Celestial Knight": {
    "baseStats": {
      "strength": 25,
      "wisdom": 25,
      "attackPower": 50
    },
    "affinities": {
      "strength": 1.12,
      "wisdom": 1.12
    }
  },
  "Void Knight": {
    "baseStats": {
      "strength": 25,
      "intelligence": 25,
      "attackPower": 50
    },
    "affinities": {
      "strength": 1.12,
      "intelligence": 1.12
    }
  },
  "Dragon Sage": {
    "baseStats": {
      "wisdom": 30,
      "strength": 15,
      "intelligence": 15
    },
    "affinities": {
      "wisdom": 1.15,
      "strength": 1.08,
      "intelligence": 1.08
    }
  },
  "Titan Slayer": {
    "baseStats": {
      "strength": 35,
      "endurance": 25,
      "attackPower": 70
    },
    "affinities": {
      "strength": 1.18,
      "endurance": 1.12
    }
  },
  "Archon": {
    "baseStats": {
      "wisdom": 30,
      "intelligence": 30
    },
    "affinities": {
      "wisdom": 1.15,
      "intelligence": 1.15
    }
  },
  "Ranger": {
    "baseStats": {
      "dexterity": 15,
      "wisdom": 8,
      "accuracy": 15,
      "perception": 10,
      "survival": 10
    },
    "affinities": {
      "dexterity": 1.1,
      "wisdom": 1.05
    }
  },
  "Bladedancer": {
    "baseStats": {
      "agility": 15,
      "dexterity": 8,
      "evasion": 10,
      "attackSpeed": 5
    },
    "affinities": {
      "agility": 1.1,
      "dexterity": 1.05
    }
  },
  "Ironclad": {
    "baseStats": {
      "endurance": 15,
      "strength": 8,
      "defense": 20,
      "health": 40,
      "resolve": 10
    },
    "affinities": {
      "endurance": 1.1,
      "strength": 1.05
    }
  },
  "Hexblade": {
    "baseStats": {
      "strength": 10,
      "intelligence": 10,
      "attackPower": 10,
      "magicPower": 10
    },
    "affinities": {
      "strength": 1.07,
      "intelligence": 1.07
    }
  },
  "Stonebreaker": {
    "baseStats": {
      "strength": 15,
      "endurance": 8,
      "attackPower": 20
    },
    "affinities": {
      "strength": 1.1,
      "endurance": 1.05
    }
  },
  "Rockwarden": {
    "baseStats": {
      "endurance": 15,
      "wisdom": 8,
      "defense": 15
    },
    "affinities": {
      "endurance": 1.1,
      "wisdom": 1.05
    }
  },
  "Warlock": {
    "baseStats": {
      "intelligence": 15,
      "charisma": 8,
      "magicPower": 20
    },
    "affinities": {
      "intelligence": 1.1,
      "charisma": 1.05
    }
  },
  "Shieldmaster": {
    "baseStats": {
      "endurance": 15,
      "strength": 8,
      "defense": 25
    },
    "affinities": {
      "endurance": 1.1,
      "strength": 1.05
    }
  },
  "Spirit Weaver": {
    "baseStats": {
      "wisdom": 15,
      "intelligence": 8,
      "mana": 40
    },
    "affinities": {
      "wisdom": 1.1,
      "intelligence": 1.05
    }
  },
  "Forest Sentinel": {
    "baseStats": {
      "dexterity": 10,
      "wisdom": 10,
      "perception": 15
    },
    "affinities": {
      "dexterity": 1.07,
      "wisdom": 1.07
    }
  },
  "Arcane Archer": {
    "baseStats": {
      "dexterity": 12,
      "intelligence": 12,
      "accuracy": 10,
      "magicPower": 10
    },
    "affinities": {
      "dexterity": 1.08,
      "intelligence": 1.08
    }
  },
  "Cave Warden": {
    "baseStats": {
      "endurance": 12,
      "dexterity": 8,
      "defense": 10,
      "perception": 5
    },
    "affinities": {
      "endurance": 1.08,
      "dexterity": 1.05
    }
  },
  "Mystic Knight": {
    "baseStats": {
      "strength": 10,
      "wisdom": 10,
      "attackPower": 10,
      "magicResist": 10
    },
    "affinities": {
      "strength": 1.07,
      "wisdom": 1.07
    }
  },
  "Infernal Assassin": {
    "baseStats": {
      "agility": 12,
      "intelligence": 8,
      "stealth": 15,
      "magicPower": 5
    },
    "affinities": {
      "agility": 1.08,
      "intelligence": 1.05
    }
  },
  "Divine Champion": {
    "baseStats": {
      "strength": 12,
      "wisdom": 8,
      "attackPower": 15
    },
    "affinities": {
      "strength": 1.08,
      "wisdom": 1.05
    }
  },
  "Illusionist": {
    "baseStats": {
      "intelligence": 15,
      "charisma": 8,
      "stealth": 10
    },
    "affinities": {
      "intelligence": 1.1,
      "charisma": 1.05
    }
  },
  "Totem Warden": {
    "baseStats": {
      "wisdom": 12,
      "endurance": 8,
      "mana": 20,
      "health": 20
    },
    "affinities": {
      "wisdom": 1.08,
      "endurance": 1.05
    }
  },
  "Sun Priest": {
    "baseStats": {
      "wisdom": 15,
      "charisma": 8,
      "magicPower": 15
    },
    "affinities": {
      "wisdom": 1.1,
      "charisma": 1.05
    }
  },
  "Moon Sage": {
    "baseStats": {
      "wisdom": 15,
      "agility": 8,
      "stealth": 10
    },
    "affinities": {
      "wisdom": 1.1,
      "agility": 1.05
    }
  },
  "Frost Mage": {
    "baseStats": {
      "intelligence": 15,
      "endurance": 8,
      "magicPower": 20
    },
    "affinities": {
      "intelligence": 1.1,
      "endurance": 1.05
    }
  },
  "Spellsword": {
    "baseStats": {
      "strength": 12,
      "intelligence": 12,
      "attackPower": 10,
      "magicPower": 10
    },
    "affinities": {
      "strength": 1.08,
      "intelligence": 1.08
    }
  },
  "Inquisitor": {
    "baseStats": {
      "wisdom": 12,
      "strength": 8,
      "perception": 10,
      "willpower": 5
    },
    "affinities": {
      "wisdom": 1.08,
      "strength": 1.05
    }
  },
  "Gladiator": {
    "baseStats": {
      "strength": 12,
      "dexterity": 8,
      "attackPower": 15
    },
    "affinities": {
      "strength": 1.08,
      "dexterity": 1.05
    }
  },
  "Warden": {
    "baseStats": {
      "endurance": 12,
      "wisdom": 8,
      "defense": 15
    },
    "affinities": {
      "endurance": 1.08,
      "wisdom": 1.05
    }
  },
  "Templar": {
    "baseStats": {
      "strength": 10,
      "wisdom": 10,
      "defense": 10,
      "magicResist": 10
    },
    "affinities": {
      "strength": 1.07,
      "wisdom": 1.07
    }
  },
  "Shaman": {
    "baseStats": {
      "wisdom": 15,
      "intelligence": 8
    },
    "affinities": {
      "wisdom": 1.1,
      "intelligence": 1.05
    }
  },
  "Monk": {
    "baseStats": {
      "agility": 12,
      "wisdom": 8,
      "stamina": 30,
      "resolve": 5
    },
    "affinities": {
      "agility": 1.08,
      "wisdom": 1.05
    }
  },
  "Bard": {
    "baseStats": {
      "charisma": 15,
      "dexterity": 8,
      "persuasion": 20
    },
    "affinities": {
      "charisma": 1.1,
      "dexterity": 1.05
    }
  },
  "Artificer": {
    "baseStats": {
      "intelligence": 12,
      "dexterity": 8,
      "crafting": 25
    },
    "affinities": {
      "intelligence": 1.08,
      "dexterity": 1.05
    }
  },
  "Psion": {
    "baseStats": {
      "wisdom": 15,
      "intelligence": 8,
      "willpower": 8
    },
    "affinities": {
      "wisdom": 1.1,
      "intelligence": 1.05
    }
  },
  "Blood Mage": {
    "baseStats": {
      "intelligence": 12,
      "endurance": 8,
      "magicPower": 15
    },
    "affinities": {
      "intelligence": 1.08,
      "endurance": 1.05
    }
  },
  "Demonologist": {
    "baseStats": {
      "intelligence": 12,
      "charisma": 8,
      "magicPower": 15
    },
    "affinities": {
      "intelligence": 1.08,
      "charisma": 1.05
    }
  },
  "Dragon Knight": {
    "baseStats": {
      "strength": 12,
      "endurance": 12,
      "attackPower": 10,
      "defense": 10
    },
    "affinities": {
      "strength": 1.08,
      "endurance": 1.08
    }
  },
  "Spirit Knight": {
    "baseStats": {
      "strength": 10,
      "wisdom": 10
    },
    "affinities": {
      "strength": 1.07,
      "wisdom": 1.07
    }
  },
  "Sky-Captain": {
    "baseStats": {
      "dexterity": 10,
      "charisma": 10
    },
    "affinities": {
      "dexterity": 1.07,
      "charisma": 1.07
    }
  },
  "Duelist": {
    "baseStats": {
      "dexterity": 15,
      "agility": 8,
      "accuracy": 15,
      "evasion": 5
    },
    "affinities": {
      "dexterity": 1.1,
      "agility": 1.05
    }
  },
  "Executioner": {
    "baseStats": {
      "strength": 15,
      "endurance": 8,
      "attackPower": 20
    },
    "affinities": {
      "strength": 1.1,
      "endurance": 1.05
    }
  },
  "Warpriest": {
    "baseStats": {
      "strength": 10,
      "wisdom": 10,
      "attackPower": 10,
      "magicPower": 5
    },
    "affinities": {
      "strength": 1.07,
      "wisdom": 1.07
    }
  },
  "Marshal": {
    "baseStats": {
      "strength": 8,
      "charisma": 12,
      "persuasion": 15
    },
    "affinities": {
      "strength": 1.05,
      "charisma": 1.08
    }
  },
  "Spymaster": {
    "baseStats": {
      "agility": 10,
      "intelligence": 10,
      "stealth": 15,
      "perception": 10
    },
    "affinities": {
      "agility": 1.07,
      "intelligence": 1.07
    }
  },
  "Rogue": {
    "baseStats": {
      "agility": 9,
      "dexterity": 5,
      "stealth": 12,
      "evasion": 6
    },
    "affinities": {
      "agility": 0.99,
      "dexterity": 0.95
    }
  },
  "Pyromancer": {
    "baseStats": {
      "intelligence": 9,
      "magicPower": 12
    },
    "affinities": {
      "intelligence": 0.99
    }
  },
  "Battle Druid": {
    "baseStats": {
      "wisdom": 7,
      "strength": 5
    },
    "affinities": {
      "wisdom": 0.97,
      "strength": 0.95
    }
  },
  "Seer": {
    "baseStats": {
      "wisdom": 9,
      "perception": 12
    },
    "affinities": {
      "wisdom": 0.99
    }
  },
  "Rift Mage": {
    "baseStats": {
      "intelligence": 9,
      "mana": 24
    },
    "affinities": {
      "intelligence": 0.99
    }
  },
  "Windrider": {
    "baseStats": {
      "agility": 9,
      "evasion": 9
    },
    "affinities": {
      "agility": 0.99
    }
  },
  "Beastmaster": {
    "baseStats": {
      "wisdom": 7,
      "endurance": 5,
      "health": 12,
      "taming": 10
    },
    "affinities": {
      "wisdom": 0.97,
      "endurance": 0.95
    }
  },
  "Shadow Infiltrator": {
    "baseStats": {
      "agility": 9,
      "dexterity": 5,
      "stealth": 18
    },
    "affinities": {
      "agility": 0.99,
      "dexterity": 0.95
    }
  },
  "Stoneguard": {
    "baseStats": {
      "endurance": 9,
      "defense": 12
    },
    "affinities": {
      "endurance": 0.99
    }
  },
  "Battle Cleric": {
    "baseStats": {
      "wisdom": 7,
      "strength": 5
    },
    "affinities": {
      "wisdom": 0.97,
      "strength": 0.95
    }
  },
  "Shifting Blade": {
    "baseStats": {
      "agility": 9,
      "dexterity": 5
    },
    "affinities": {
      "agility": 0.99,
      "dexterity": 0.95
    }
  },
  "Veilblade": {
    "baseStats": {
      "agility": 7,
      "intelligence": 5
    },
    "affinities": {
      "agility": 0.97,
      "intelligence": 0.95
    }
  },
  "Battle Mystic": {
    "baseStats": {
      "wisdom": 7,
      "strength": 5
    },
    "affinities": {
      "wisdom": 0.97,
      "strength": 0.95
    }
  },
  "Battle Priest": {
    "baseStats": {
      "wisdom": 7,
      "strength": 5
    },
    "affinities": {
      "wisdom": 0.97,
      "strength": 0.95
    }
  },
  "Runeblade": {
    "baseStats": {
      "strength": 7,
      "intelligence": 5
    },
    "affinities": {
      "strength": 0.97,
      "intelligence": 0.95
    }
  },
  "Druid": {
    "baseStats": {
      "wisdom": 9
    },
    "affinities": {
      "wisdom": 0.99
    }
  },
  "Nightmare Binder": {
    "baseStats": {
      "intelligence": 9,
      "wisdom": 5
    },
    "affinities": {
      "intelligence": 0.99,
      "wisdom": 0.95
    }
  },
  "Shadow Hunter": {
    "baseStats": {
      "dexterity": 9,
      "agility": 5,
      "stealth": 9
    },
    "affinities": {
      "dexterity": 0.99,
      "agility": 0.95
    }
  },
  "Elemental Warden": {
    "baseStats": {
      "endurance": 7,
      "intelligence": 5
    },
    "affinities": {
      "endurance": 0.97,
      "intelligence": 0.95
    }
  },
  "Feral Bladesman": {
    "baseStats": {
      "strength": 9,
      "agility": 5
    },
    "affinities": {
      "strength": 0.99,
      "agility": 0.95
    }
  },
  "Skirmisher": {
    "baseStats": {
      "agility": 9,
      "dexterity": 5
    },
    "affinities": {
      "agility": 0.99,
      "dexterity": 0.95
    }
  },
  "Spellbinder": {
    "baseStats": {
      "intelligence": 9,
      "wisdom": 5
    },
    "affinities": {
      "intelligence": 0.99,
      "wisdom": 0.95
    }
  },
  "Pugilist": {
    "baseStats": {
      "strength": 9,
      "agility": 5
    },
    "affinities": {
      "strength": 0.99,
      "agility": 0.95
    }
  },
  "Marksman": {
    "baseStats": {
      "dexterity": 9,
      "accuracy": 12
    },
    "affinities": {
      "dexterity": 0.99
    }
  },
  "Guardian": {
    "baseStats": {
      "endurance": 9,
      "defense": 12,
      "health": 24
    },
    "affinities": {
      "endurance": 0.99
    }
  },
  "Zealot": {
    "baseStats": {
      "strength": 7,
      "wisdom": 5
    },
    "affinities": {
      "strength": 0.97,
      "wisdom": 0.95
    }
  },
  "Charlatan": {
    "baseStats": {
      "charisma": 9,
      "persuasion": 12
    },
    "affinities": {
      "charisma": 0.99
    }
  },
  "Investigator": {
    "baseStats": {
      "intelligence": 7,
      "wisdom": 5,
      "perception": 9,
      "knowledge": 5
    },
    "affinities": {
      "intelligence": 0.97,
      "wisdom": 0.95
    }
  },
  "Exorcist": {
    "baseStats": {
      "wisdom": 9,
      "magicResist": 9
    },
    "affinities": {
      "wisdom": 0.99
    }
  },
  "Beast Tamer": {
    "baseStats": {
      "wisdom": 7,
      "charisma": 5,
      "taming": 8
    },
    "affinities": {
      "wisdom": 0.97,
      "charisma": 0.95
    }
  },
  "Hedge Knight": {
    "baseStats": {
      "strength": 7,
      "endurance": 5
    },
    "affinities": {
      "strength": 0.97,
      "endurance": 0.95
    }
  },
  "Sapper": {
    "baseStats": {
      "dexterity": 7,
      "intelligence": 5
    },
    "affinities": {
      "dexterity": 0.97,
      "intelligence": 0.95
    }
  },
  "Fencer": {
    "baseStats": {
      "dexterity": 9,
      "agility": 5
    },
    "affinities": {
      "dexterity": 0.99,
      "agility": 0.95
    }
  },
  "Chirurgeon": {
    "baseStats": {
      "dexterity": 7,
      "wisdom": 5
    },
    "affinities": {
      "dexterity": 0.97,
      "wisdom": 0.95
    }
  },
  "Runecarver": {
    "baseStats": {
      "dexterity": 7,
      "intelligence": 5,
      "crafting": 9
    },
    "affinities": {
      "dexterity": 0.97,
      "intelligence": 0.95
    }
  },
  "Astrologer": {
    "baseStats": {
      "wisdom": 9,
      "perception": 6
    },
    "affinities": {
      "wisdom": 0.99
    }
  },
  "Navigator": {
    "baseStats": {
      "wisdom": 9,
      "perception": 6
    },
    "affinities": {
      "wisdom": 0.99
    }
  },
  "Falconer": {
    "baseStats": {
      "dexterity": 7,
      "wisdom": 5,
      "perception": 6
    },
    "affinities": {
      "dexterity": 0.97,
      "wisdom": 0.95
    }
  },
  "Pit Fighter": {
    "baseStats": {
      "strength": 9,
      "endurance": 5
    },
    "affinities": {
      "strength": 0.99,
      "endurance": 0.95
    }
  },
  "Monster Hunter": {
    "baseStats": {
      "dexterity": 7,
      "endurance": 5,
      "perception": 6,
      "survival": 5
    },
    "affinities": {
      "dexterity": 0.97,
      "endurance": 0.95
    }
  },
  "Crusader": {
    "baseStats": {
      "strength": 7,
      "wisdom": 5
    },
    "affinities": {
      "strength": 0.97,
      "wisdom": 0.95
    }
  },
  "Scholar": {
    "baseStats": {
      "intelligence": 9,
      "wisdom": 5,
      "knowledge": 10
    },
    "affinities": {
      "intelligence": 0.99,
      "wisdom": 0.95
    }
  },
  "Arcanist": {
    "baseStats": {
      "intelligence": 9
    },
    "affinities": {
      "intelligence": 0.99
    }
  },
  "Privateer": {
    "baseStats": {
      "dexterity": 7,
      "agility": 5
    },
    "affinities": {
      "dexterity": 0.97,
      "agility": 0.95
    }
  },
  "Man-at-Arms": {
    "baseStats": {
      "strength": 7,
      "endurance": 5
    },
    "affinities": {
      "strength": 0.97,
      "endurance": 0.95
    }
  },
  "Fletcher": {
    "baseStats": {
      "dexterity": 5,
      "crafting": 3
    },
    "affinities": {
      "dexterity": 0.95
    }
  },
  "Trader": {
    "baseStats": {
      "charisma": 5,
      "persuasion": 3,
      "bartering": 5
    },
    "affinities": {
      "charisma": 0.95
    }
  },
  "Blacksmith": {
    "baseStats": {
      "strength": 5,
      "crafting": 6
    },
    "affinities": {
      "strength": 0.95
    }
  },
  "Hunter": {
    "baseStats": {
      "dexterity": 5,
      "perception": 3,
      "survival": 3
    },
    "affinities": {
      "dexterity": 0.95
    }
  },
  "Farmer": {
    "baseStats": {
      "endurance": 5,
      "health": 5,
      "stamina": 5
    },
    "affinities": {
      "endurance": 0.95
    }
  },
  "Herbalist": {
    "baseStats": {
      "wisdom": 5
    },
    "affinities": {
      "wisdom": 0.95
    }
  },
  "Alchemist": {
    "baseStats": {
      "intelligence": 5,
      "crafting": 3
    },
    "affinities": {
      "intelligence": 0.95
    }
  },
  "Servant": {
    "baseStats": {
      "endurance": 3,
      "charisma": 2
    },
    "affinities": {
      "endurance": 0.92,
      "charisma": 0.9
    }
  },
  "Laborer": {
    "baseStats": {
      "strength": 3,
      "endurance": 2
    },
    "affinities": {
      "strength": 0.92,
      "endurance": 0.9
    }
  },
  "Thief": {
    "baseStats": {
      "agility": 5,
      "stealth": 3,
      "scavenging": 3
    },
    "affinities": {
      "agility": 0.95
    }
  },
  "Scavenger": {
    "baseStats": {
      "luck": 5,
      "perception": 2,
      "scavenging": 5
    },
    "affinities": {
      "luck": 0.95
    }
  },
  "Barkeep": {
    "baseStats": {
      "charisma": 5,
      "persuasion": 2
    },
    "affinities": {
      "charisma": 0.95
    }
  },
  "Woodsman": {
    "baseStats": {
      "strength": 3,
      "endurance": 2
    },
    "affinities": {
      "strength": 0.92,
      "endurance": 0.9
    }
  },
  "Scout": {
    "baseStats": {
      "agility": 3,
      "wisdom": 2,
      "perception": 3
    },
    "affinities": {
      "agility": 0.92,
      "wisdom": 0.9
    }
  },
  "Gatherer": {
    "baseStats": {
      "wisdom": 3,
      "endurance": 2
    },
    "affinities": {
      "wisdom": 0.92,
      "endurance": 0.9
    }
  },
  "Mercenary": {
    "baseStats": {
      "strength": 3,
      "endurance": 2,
      "health": 6
    },
    "affinities": {
      "strength": 0.92,
      "endurance": 0.9
    }
  },
  "Bandit": {
    "baseStats": {
      "agility": 3,
      "strength": 2
    },
    "affinities": {
      "agility": 0.92,
      "strength": 0.9
    }
  },
  "Caravan Guard": {
    "baseStats": {
      "endurance": 3,
      "strength": 2,
      "perception": 2
    },
    "affinities": {
      "endurance": 0.92,
      "strength": 0.9
    }
  },
  "Miner": {
    "baseStats": {
      "strength": 3,
      "endurance": 2
    },
    "affinities": {
      "strength": 0.92,
      "endurance": 0.9
    }
  },
  "Bounty Hunter": {
    "baseStats": {
      "dexterity": 3,
      "wisdom": 2,
      "perception": 2
    },
    "affinities": {
      "dexterity": 0.92,
      "wisdom": 0.9
    }
  },
  "Messenger": {
    "baseStats": {
      "agility": 3,
      "endurance": 2
    },
    "affinities": {
      "agility": 0.92,
      "endurance": 0.9
    }
  },
  "Apothecary": {
    "baseStats": {
      "intelligence": 3,
      "wisdom": 2
    },
    "affinities": {
      "intelligence": 0.92,
      "wisdom": 0.9
    }
  },
  "Sailor": {
    "baseStats": {
      "dexterity": 3,
      "endurance": 2
    },
    "affinities": {
      "dexterity": 0.92,
      "endurance": 0.9
    }
  },
  "Trapmaker": {
    "baseStats": {
      "dexterity": 3,
      "intelligence": 2,
      "crafting": 2
    },
    "affinities": {
      "dexterity": 0.92,
      "intelligence": 0.9
    }
  },
  "Healer": {
    "baseStats": {
      "wisdom": 5
    },
    "affinities": {
      "wisdom": 0.95
    }
  },
  "Nomad": {
    "baseStats": {
      "endurance": 3,
      "wisdom": 2
    },
    "affinities": {
      "endurance": 0.92,
      "wisdom": 0.9
    }
  },
  "Woodcarver": {
    "baseStats": {
      "dexterity": 3,
      "crafting": 2
    },
    "affinities": {
      "dexterity": 0.92
    }
  },
  "Sentinel": {
    "baseStats": {
      "endurance": 3,
      "perception": 2
    },
    "affinities": {
      "endurance": 0.92
    }
  },
  "Harvester": {
    "baseStats": {
      "endurance": 3,
      "strength": 2
    },
    "affinities": {
      "endurance": 0.92,
      "strength": 0.9
    }
  },
  "Outlaw": {
    "baseStats": {
      "agility": 3,
      "dexterity": 2
    },
    "affinities": {
      "agility": 0.92,
      "dexterity": 0.9
    }
  },
  "Innkeeper": {
    "baseStats": {
      "charisma": 5,
      "persuasion": 2
    },
    "affinities": {
      "charisma": 0.95
    }
  },
  "Stablehand": {
    "baseStats": {
      "strength": 2,
      "endurance": 2
    },
    "affinities": {
      "strength": 0.9,
      "endurance": 0.9
    }
  },
  "Leatherworker": {
    "baseStats": {
      "dexterity": 3,
      "crafting": 2
    },
    "affinities": {
      "dexterity": 0.92
    }
  },
  "Fisherman": {
    "baseStats": {
      "dexterity": 3,
      "endurance": 2
    },
    "affinities": {
      "dexterity": 0.92,
      "endurance": 0.9
    }
  },
  "Scribe": {
    "baseStats": {
      "intelligence": 5
    },
    "affinities": {
      "intelligence": 0.95
    }
  },
  "Cartographer": {
    "baseStats": {
      "wisdom": 3,
      "dexterity": 2
    },
    "affinities": {
      "wisdom": 0.92,
      "dexterity": 0.9
    }
  },
  "Cook": {
    "baseStats": {
      "dexterity": 3,
      "wisdom": 2
    },
    "affinities": {
      "dexterity": 0.92,
      "wisdom": 0.9
    }
  },
  "Artisan": {
    "baseStats": {
      "dexterity": 3,
      "crafting": 2
    },
    "affinities": {
      "dexterity": 0.92
    }
  },
  "Minstrel": {
    "baseStats": {
      "charisma": 5
    },
    "affinities": {
      "charisma": 0.95
    }
  },
  "Tailor": {
    "baseStats": {
      "dexterity": 3,
      "crafting": 2
    },
    "affinities": {
      "dexterity": 0.92
    }
  },
  "Shepherd": {
    "baseStats": {
      "wisdom": 3,
      "endurance": 2
    },
    "affinities": {
      "wisdom": 0.92,
      "endurance": 0.9
    }
  },
  "Potter": {
    "baseStats": {
      "dexterity": 3,
      "crafting": 2
    },
    "affinities": {
      "dexterity": 0.92
    }
  },
  "Stone Mason": {
    "baseStats": {
      "strength": 3,
      "dexterity": 2
    },
    "affinities": {
      "strength": 0.92,
      "dexterity": 0.9
    }
  },
  "Baker": {
    "baseStats": {
      "dexterity": 3,
      "endurance": 2
    },
    "affinities": {
      "dexterity": 0.92,
      "endurance": 0.9
    }
  },
  "Miller": {
    "baseStats": {
      "strength": 3,
      "endurance": 2
    },
    "affinities": {
      "strength": 0.92,
      "endurance": 0.9
    }
  },
  "Pelt Trader": {
    "baseStats": {
      "charisma": 3,
      "dexterity": 2
    },
    "affinities": {
      "charisma": 0.92,
      "dexterity": 0.9
    }
  },
  "Brewer": {
    "baseStats": {
      "intelligence": 3,
      "dexterity": 2
    },
    "affinities": {
      "intelligence": 0.92,
      "dexterity": 0.9
    }
  },
  "Gravedigger": {
    "baseStats": {
      "strength": 3,
      "endurance": 2
    },
    "affinities": {
      "strength": 0.92,
      "endurance": 0.9
    }
  },
  "Butcher": {
    "baseStats": {
      "strength": 3,
      "dexterity": 2
    },
    "affinities": {
      "strength": 0.92,
      "dexterity": 0.9
    }
  },
  "Acolyte": {
    "baseStats": {
      "wisdom": 3,
      "intelligence": 2
    },
    "affinities": {
      "wisdom": 0.92,
      "intelligence": 0.9
    }
  },
  "Apprentice": {
    "baseStats": {},
    "affinities": {}
  },
  "Squire": {
    "baseStats": {
      "strength": 2,
      "endurance": 2
    },
    "affinities": {
      "strength": 0.9,
      "endurance": 0.9
    }
  },
  "Guard": {
    "baseStats": {
      "endurance": 5,
      "defense": 3
    },
    "affinities": {
      "endurance": 0.95
    }
  },
  "City Watch": {
    "baseStats": {
      "endurance": 4,
      "perception": 2
    },
    "affinities": {
      "endurance": 0.93
    }
  },
  "Page": {
    "baseStats": {
      "agility": 2,
      "charisma": 2
    },
    "affinities": {
      "agility": 0.9,
      "charisma": 0.9
    }
  },
  "Street Urchin": {
    "baseStats": {
      "agility": 3,
      "luck": 2
    },
    "affinities": {
      "agility": 0.92,
      "luck": 0.9
    }
  },
  "Peddler": {
    "baseStats": {
      "charisma": 4
    },
    "affinities": {
      "charisma": 0.93
    }
  },
  "Rat Catcher": {
    "baseStats": {
      "dexterity": 3,
      "agility": 2
    },
    "affinities": {
      "dexterity": 0.92,
      "agility": 0.9
    }
  },
  "Town Crier": {
    "baseStats": {
      "charisma": 4
    },
    "affinities": {
      "charisma": 0.93
    }
  },
  "Carpenter": {
    "baseStats": {
      "strength": 2,
      "dexterity": 2,
      "crafting": 1
    },
    "affinities": {
      "strength": 0.9,
      "dexterity": 0.9
    }
  },
  "Mason": {
    "baseStats": {
      "strength": 3,
      "endurance": 2
    },
    "affinities": {
      "strength": 0.92,
      "endurance": 0.9
    }
  },
  "Weaver": {
    "baseStats": {
      "dexterity": 3,
      "crafting": 1
    },
    "affinities": {
      "dexterity": 0.92
    }
  },
  "Chandler": {
    "baseStats": {
      "dexterity": 3,
      "crafting": 1
    },
    "affinities": {
      "dexterity": 0.92
    }
  },
  "Cobbler": {
    "baseStats": {
      "dexterity": 3,
      "crafting": 1
    },
    "affinities": {
      "dexterity": 0.92
    }
  },
  "Jeweler": {
    "baseStats": {
      "dexterity": 4,
      "crafting": 2
    },
    "affinities": {
      "dexterity": 0.93
    }
  },
  "Glassblower": {
    "baseStats": {
      "dexterity": 3,
      "endurance": 2,
      "crafting": 1
    },
    "affinities": {
      "dexterity": 0.92,
      "endurance": 0.9
    }
  },
  "Bookbinder": {
    "baseStats": {
      "dexterity": 3,
      "intelligence": 2,
      "crafting": 1
    },
    "affinities": {
      "dexterity": 0.92,
      "intelligence": 0.9
    }
  },
  "Fishmonger": {
    "baseStats": {
      "charisma": 3,
      "endurance": 2
    },
    "affinities": {
      "charisma": 0.92,
      "endurance": 0.9
    }
  },
  "Vintner": {
    "baseStats": {
      "wisdom": 3,
      "dexterity": 2
    },
    "affinities": {
      "wisdom": 0.92,
      "dexterity": 0.9
    }
  },
  "Hangman": {
    "baseStats": {
      "strength": 3,
      "endurance": 2
    },
    "affinities": {
      "strength": 0.92,
      "endurance": 0.9
    }
  },
  "Grave Robber": {
    "baseStats": {
      "agility": 3,
      "dexterity": 2
    },
    "affinities": {
      "agility": 0.92,
      "dexterity": 0.9
    }
  },
  "Beggar": {
    "baseStats": {
      "charisma": 2
    },
    "affinities": {
      "charisma": 0.9
    }
  },
  "Pilgrim": {
    "baseStats": {
      "wisdom": 3,
      "endurance": 2
    },
    "affinities": {
      "wisdom": 0.92,
      "endurance": 0.9
    }
  },
  "Courtier": {
    "baseStats": {
      "charisma": 4,
      "persuasion": 2
    },
    "affinities": {
      "charisma": 0.93
    }
  },
  "Jester": {
    "baseStats": {
      "agility": 3,
      "charisma": 2
    },
    "affinities": {
      "agility": 0.92,
      "charisma": 0.9
    }
  },
  "Clerk": {
    "baseStats": {
      "intelligence": 3,
      "dexterity": 2
    },
    "affinities": {
      "intelligence": 0.92,
      "dexterity": 0.9
    }
  },
  "Tavern Wench": {
    "baseStats": {
      "charisma": 3,
      "endurance": 2
    },
    "affinities": {
      "charisma": 0.92,
      "endurance": 0.9
    }
  },
  "Groom": {
    "baseStats": {
      "strength": 2,
      "wisdom": 2
    },
    "affinities": {
      "strength": 0.9,
      "wisdom": 0.9
    }
  },
  "Troubadour": {
    "baseStats": {
      "charisma": 4
    },
    "affinities": {
      "charisma": 0.93
    }
  }
};