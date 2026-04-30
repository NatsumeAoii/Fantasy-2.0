import type { RaceData } from '../../types';

/** Master list of all playable races with stat modifiers, lore, and visual traits. */
export const RACES: Record<string, RaceData> = {
  "Human": {
    "baseStats": {
      "luck": 5,
      "charisma": 5,
      "health": 25,
      "stamina": 25,
      "resolve": 5
    },
    "affinities": {
      "luck": 1.05,
      "charisma": 1.05
    }
  },
  "Half-Elf": {
    "baseStats": {
      "dexterity": 3,
      "charisma": 8,
      "mana": 20,
      "persuasion": 10
    },
    "affinities": {
      "agility": 1.05,
      "charisma": 1.1
    }
  },
  "Half-Orc": {
    "baseStats": {
      "strength": 8,
      "endurance": 3,
      "health": 40,
      "attackPower": 5,
      "resolve": 8
    },
    "affinities": {
      "strength": 1.1,
      "intelligence": 0.9
    }
  },
  "Half-Giant": {
    "baseStats": {
      "strength": 15,
      "endurance": 10,
      "health": 100,
      "attackPower": 15,
      "damageAbsorption": 5
    },
    "affinities": {
      "strength": 1.2,
      "agility": 0.8
    }
  },
  "Half-Troll": {
    "baseStats": {
      "strength": 12,
      "endurance": 15,
      "health": 80,
      "hpRegen": 5
    },
    "affinities": {
      "endurance": 1.2,
      "dexterity": 0.85
    }
  },
  "Half-Gnome": {
    "baseStats": {
      "intelligence": 8,
      "dexterity": 3,
      "mana": 30,
      "crafting": 10
    },
    "affinities": {
      "intelligence": 1.1,
      "strength": 0.85
    }
  },
  "Half-Dragon": {
    "baseStats": {
      "strength": 10,
      "intelligence": 10,
      "defense": 10,
      "magicResist": 10,
      "willpower": 5
    },
    "affinities": {
      "strength": 1.1,
      "intelligence": 1.1,
      "charisma": 0.9
    }
  },
  "Half-Fae": {
    "baseStats": {
      "charisma": 10,
      "wisdom": 5,
      "mana": 25,
      "mpRegen": 2
    },
    "affinities": {
      "charisma": 1.15,
      "luck": 1.1,
      "endurance": 0.85
    }
  },
  "Elf": {
    "baseStats": {
      "agility": 8,
      "dexterity": 8,
      "mana": 25,
      "accuracy": 5
    },
    "affinities": {
      "agility": 1.1,
      "dexterity": 1.1
    }
  },
  "Dark Elf": {
    "baseStats": {
      "agility": 10,
      "intelligence": 8,
      "magicPower": 10,
      "stealth": 10
    },
    "affinities": {
      "agility": 1.1,
      "intelligence": 1.1,
      "charisma": 0.9
    }
  },
  "Frost Elf": {
    "baseStats": {
      "agility": 8,
      "endurance": 5,
      "magicResist": 15
    },
    "affinities": {
      "agility": 1.05,
      "endurance": 1.05,
      "wisdom": 1.05
    }
  },
  "Shadow Elf": {
    "baseStats": {
      "agility": 12,
      "dexterity": 8,
      "evasion": 15,
      "stealth": 15
    },
    "affinities": {
      "agility": 1.2,
      "dexterity": 1.1,
      "endurance": 0.85
    }
  },
  "Wood Elf": {
    "baseStats": {
      "agility": 8,
      "wisdom": 8,
      "perception": 15,
      "survival": 10
    },
    "affinities": {
      "agility": 1.1,
      "wisdom": 1.1
    }
  },
  "High Elf": {
    "baseStats": {
      "intelligence": 12,
      "wisdom": 8,
      "mana": 50,
      "magicPower": 15,
      "knowledge": 10
    },
    "affinities": {
      "intelligence": 1.2,
      "wisdom": 1.1,
      "strength": 0.75
    }
  },
  "Sea Elf": {
    "baseStats": {
      "agility": 8,
      "endurance": 5,
      "stamina": 30,
      "survival": 5
    },
    "affinities": {
      "agility": 1.1,
      "endurance": 1.05
    }
  },
  "Sun Elf": {
    "baseStats": {
      "intelligence": 10,
      "charisma": 5,
      "magicPower": 10
    },
    "affinities": {
      "intelligence": 1.15,
      "charisma": 1.05
    }
  },
  "Moon Elf": {
    "baseStats": {
      "agility": 10,
      "wisdom": 5,
      "stealth": 5
    },
    "affinities": {
      "agility": 1.15,
      "wisdom": 1.05
    }
  },
  "Dwarf": {
    "baseStats": {
      "endurance": 10,
      "strength": 8,
      "health": 50,
      "defense": 10,
      "magicResist": 5,
      "willpower": 8
    },
    "affinities": {
      "endurance": 1.15,
      "strength": 1.1,
      "agility": 0.8,
      "resolve": 1.05
    }
  },
  "Gnome": {
    "baseStats": {
      "intelligence": 10,
      "dexterity": 5,
      "mana": 35,
      "crafting": 15,
      "knowledge": 5
    },
    "affinities": {
      "intelligence": 1.15,
      "dexterity": 1.05,
      "strength": 0.8
    }
  },
  "Halfling": {
    "baseStats": {
      "dexterity": 10,
      "luck": 10,
      "evasion": 10,
      "stealth": 10,
      "scavenging": 8
    },
    "affinities": {
      "dexterity": 1.1,
      "luck": 1.15,
      "strength": 0.85
    }
  },
  "Duergar": {
    "baseStats": {
      "endurance": 12,
      "strength": 8,
      "defense": 15,
      "magicResist": 10,
      "willpower": 5
    },
    "affinities": {
      "endurance": 1.1,
      "strength": 1.1,
      "wisdom": 1.05,
      "charisma": 0.8
    }
  },
  "Orc": {
    "baseStats": {
      "strength": 12,
      "endurance": 8,
      "health": 60,
      "attackPower": 10,
      "resolve": 5
    },
    "affinities": {
      "strength": 1.2,
      "endurance": 1.1,
      "intelligence": 0.75
    }
  },
  "Goblin": {
    "baseStats": {
      "dexterity": 8,
      "agility": 5,
      "evasion": 5,
      "scavenging": 5
    },
    "affinities": {
      "dexterity": 1.1,
      "agility": 1.05,
      "strength": 0.85
    }
  },
  "Hobgoblin": {
    "baseStats": {
      "strength": 8,
      "endurance": 8,
      "defense": 5,
      "attackPower": 5
    },
    "affinities": {
      "strength": 1.1,
      "endurance": 1.1
    }
  },
  "Kobold": {
    "baseStats": {
      "dexterity": 8,
      "luck": 5,
      "crafting": 10
    },
    "affinities": {
      "dexterity": 1.1,
      "luck": 1.05
    }
  },
  "Troll": {
    "baseStats": {
      "strength": 15,
      "endurance": 20,
      "health": 150,
      "hpRegen": 10
    },
    "affinities": {
      "endurance": 1.25,
      "strength": 1.15,
      "intelligence": 0.6,
      "agility": 0.7
    }
  },
  "Bugbear": {
    "baseStats": {
      "strength": 10,
      "stealth": 5,
      "attackPower": 8
    },
    "affinities": {
      "strength": 1.15,
      "agility": 0.9
    }
  },
  "Giant": {
    "baseStats": {
      "strength": 25,
      "endurance": 20,
      "health": 200,
      "attackPower": 25,
      "damageAbsorption": 10
    },
    "affinities": {
      "strength": 1.3,
      "endurance": 1.2,
      "agility": 0.65
    }
  },
  "Minotaur": {
    "baseStats": {
      "strength": 18,
      "endurance": 12,
      "attackPower": 15,
      "perception": 5
    },
    "affinities": {
      "strength": 1.25,
      "wisdom": 0.9
    }
  },
  "Cyclops": {
    "baseStats": {
      "strength": 22,
      "endurance": 15,
      "health": 170,
      "accuracy": -10
    },
    "affinities": {
      "strength": 1.2,
      "dexterity": 0.75
    }
  },
  "Ogre": {
    "baseStats": {
      "strength": 16,
      "endurance": 10,
      "health": 120
    },
    "affinities": {
      "strength": 1.2,
      "intelligence": 0.7
    }
  },
  "Fairy": {
    "baseStats": {
      "luck": 15,
      "agility": 10,
      "mana": 40,
      "evasion": 10
    },
    "affinities": {
      "luck": 1.2,
      "agility": 1.15,
      "strength": 0.6
    }
  },
  "Fae": {
    "baseStats": {
      "charisma": 15,
      "wisdom": 10,
      "mana": 50,
      "magicPower": 10
    },
    "affinities": {
      "charisma": 1.2,
      "wisdom": 1.15,
      "endurance": 0.7
    }
  },
  "Sylph": {
    "baseStats": {
      "agility": 15,
      "wisdom": 8,
      "evasion": 15
    },
    "affinities": {
      "agility": 1.2,
      "wisdom": 1.1
    }
  },
  "Dryad": {
    "baseStats": {
      "wisdom": 12,
      "charisma": 10,
      "mpRegen": 3,
      "survival": 8,
      "taming": 5
    },
    "affinities": {
      "wisdom": 1.15,
      "charisma": 1.1
    }
  },
  "Spirit": {
    "baseStats": {
      "wisdom": 15,
      "mana": 60,
      "magicResist": 15,
      "willpower": 10
    },
    "affinities": {
      "wisdom": 1.25,
      "endurance": 0.8
    }
  },
  "Nymph": {
    "baseStats": {
      "charisma": 20,
      "persuasion": 20
    },
    "affinities": {
      "charisma": 1.25,
      "wisdom": 1.1
    }
  },
  "Pixie": {
    "baseStats": {
      "agility": 12,
      "luck": 10,
      "stealth": 15
    },
    "affinities": {
      "agility": 1.15,
      "luck": 1.15
    }
  },
  "Satyr": {
    "baseStats": {
      "charisma": 10,
      "agility": 8,
      "persuasion": 10
    },
    "affinities": {
      "charisma": 1.15,
      "agility": 1.05
    }
  },
  "Faun": {
    "baseStats": {
      "charisma": 8,
      "wisdom": 5,
      "perception": 5
    },
    "affinities": {
      "charisma": 1.1,
      "wisdom": 1.05
    }
  },
  "Draconic": {
    "baseStats": {
      "strength": 12,
      "intelligence": 12,
      "defense": 8,
      "magicResist": 8,
      "willpower": 8
    },
    "affinities": {
      "strength": 1.15,
      "intelligence": 1.15
    }
  },
  "Lamia": {
    "baseStats": {
      "charisma": 12,
      "strength": 8,
      "persuasion": 15
    },
    "affinities": {
      "charisma": 1.15,
      "strength": 1.05
    }
  },
  "Naga": {
    "baseStats": {
      "wisdom": 12,
      "intelligence": 8,
      "mana": 30
    },
    "affinities": {
      "wisdom": 1.15,
      "intelligence": 1.05
    }
  },
  "Lizardfolk": {
    "baseStats": {
      "endurance": 10,
      "strength": 5,
      "defense": 10,
      "survival": 5
    },
    "affinities": {
      "endurance": 1.15,
      "strength": 1.05
    }
  },
  "Wyvernfolk": {
    "baseStats": {
      "agility": 10,
      "strength": 8,
      "attackPower": 5
    },
    "affinities": {
      "agility": 1.15,
      "strength": 1.1
    }
  },
  "Werewolf": {
    "baseStats": {
      "strength": 15,
      "agility": 10,
      "attackPower": 20,
      "hpRegen": 5
    },
    "affinities": {
      "strength": 1.2,
      "agility": 1.1
    }
  },
  "Lupine": {
    "baseStats": {
      "agility": 10,
      "wisdom": 5,
      "perception": 10
    },
    "affinities": {
      "agility": 1.15,
      "wisdom": 1.05
    }
  },
  "Feline": {
    "baseStats": {
      "dexterity": 12,
      "agility": 10,
      "evasion": 15,
      "accuracy": 5
    },
    "affinities": {
      "dexterity": 1.15,
      "agility": 1.15
    }
  },
  "Centaur": {
    "baseStats": {
      "strength": 10,
      "endurance": 10,
      "health": 50,
      "stamina": 50
    },
    "affinities": {
      "strength": 1.1,
      "endurance": 1.1
    }
  },
  "Sphinx": {
    "baseStats": {
      "wisdom": 15,
      "intelligence": 15,
      "mana": 70,
      "perception": 15,
      "knowledge": 20
    },
    "affinities": {
      "wisdom": 1.2,
      "intelligence": 1.2
    }
  },
  "Aasimar": {
    "baseStats": {
      "wisdom": 10,
      "charisma": 10,
      "magicResist": 15,
      "persuasion": 10,
      "willpower": 5
    },
    "affinities": {
      "wisdom": 1.15,
      "charisma": 1.15
    }
  },
  "Nephilim": {
    "baseStats": {
      "strength": 15,
      "charisma": 10,
      "attackPower": 10,
      "health": 50
    },
    "affinities": {
      "strength": 1.15,
      "charisma": 1.1
    }
  },
  "Valkyrie": {
    "baseStats": {
      "strength": 12,
      "agility": 12,
      "attackPower": 8,
      "accuracy": 8,
      "resolve": 5
    },
    "affinities": {
      "strength": 1.1,
      "agility": 1.1
    }
  },
  "Seraph": {
    "baseStats": {
      "wisdom": 20,
      "charisma": 15,
      "magicPower": 20,
      "magicResist": 20,
      "willpower": 15
    },
    "affinities": {
      "wisdom": 1.25,
      "charisma": 1.2
    }
  },
  "Djinn": {
    "baseStats": {
      "agility": 10,
      "intelligence": 10,
      "luck": 5,
      "evasion": 5,
      "magicPower": 5
    },
    "affinities": {
      "agility": 1.1,
      "intelligence": 1.1,
      "luck": 1.1
    }
  },
  "Efreet": {
    "baseStats": {
      "strength": 10,
      "intelligence": 10,
      "endurance": 5,
      "attackPower": 5,
      "magicPower": 5
    },
    "affinities": {
      "strength": 1.1,
      "intelligence": 1.1
    }
  },
  "Tiefling": {
    "baseStats": {
      "intelligence": 10,
      "charisma": 8,
      "magicPower": 10,
      "magicResist": 5
    },
    "affinities": {
      "intelligence": 1.15,
      "charisma": 1.05,
      "wisdom": 0.9
    }
  },
  "Cambion": {
    "baseStats": {
      "dexterity": 10,
      "intelligence": 8,
      "accuracy": 5,
      "stealth": 5
    },
    "affinities": {
      "dexterity": 1.15,
      "intelligence": 1.05
    }
  },
  "Incubus": {
    "baseStats": {
      "charisma": 15,
      "agility": 8,
      "persuasion": 15
    },
    "affinities": {
      "charisma": 1.2,
      "agility": 1.05
    }
  },
  "Oni": {
    "baseStats": {
      "strength": 15,
      "endurance": 10,
      "attackPower": 15,
      "defense": 5
    },
    "affinities": {
      "strength": 1.2,
      "endurance": 1.1
    }
  },
  "Rakshasa": {
    "baseStats": {
      "charisma": 12,
      "dexterity": 10,
      "persuasion": 10,
      "stealth": 10
    },
    "affinities": {
      "charisma": 1.15,
      "dexterity": 1.1
    }
  },
  "Deva": {
    "baseStats": {
      "wisdom": 12,
      "strength": 8,
      "magicResist": 10,
      "defense": 5
    },
    "affinities": {
      "wisdom": 1.15,
      "strength": 1.05
    }
  },
  "Doppelganger": {
    "baseStats": {
      "agility": 10,
      "charisma": 10,
      "persuasion": 5,
      "stealth": 5
    },
    "affinities": {
      "agility": 1.1,
      "charisma": 1.1
    }
  },
  "Shapeshifter": {
    "baseStats": {
      "endurance": 10,
      "agility": 5,
      "health": 30
    },
    "affinities": {
      "endurance": 1.1,
      "agility": 1.05
    }
  },
  "Changeling": {
    "baseStats": {
      "charisma": 12,
      "luck": 5,
      "persuasion": 10
    },
    "affinities": {
      "charisma": 1.15,
      "luck": 1.05
    }
  }
};