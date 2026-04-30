/**
 * A spoken or written language used by the peoples of Aetheris.
 * Languages determine which races or factions the character can
 * communicate with and what inscriptions they can decipher.
 */
export interface Language {
  id: string;
  name: string;
  type: 'Common' | 'Exotic' | 'Secret' | 'Dead';
  speakers: string[];
  script: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  learnable: boolean;
  description: string;
}

/** Master list of all languages spoken in Aetheris, organized by type. */
export const LANGUAGES: Language[] = [
  // ==========================================
  // COMMON
  // ==========================================
  {
    id: 'common',
    name: 'Common',
    type: 'Common',
    speakers: ['Human', 'Half-Elf', 'Halfling', 'Half-Orc'],
    script: 'Common',
    difficulty: 1,
    learnable: true,
    description: 'The standard trade language spoken across most major settlements and kingdoms, highly versatile with dozens of regional dialects and slang variations.'
  },
  {
    id: 'dwarvish',
    name: 'Dwarvish',
    type: 'Common',
    speakers: ['Dwarf', 'Duergar', 'Gnome'],
    script: 'Dwarvish (Runic)',
    difficulty: 2,
    learnable: true,
    description: 'A harsh, angular language carved into stone more often than written on parchment, each rune carrying weight and precision befitting the mountain folk.'
  },
  {
    id: 'elvish',
    name: 'Elvish',
    type: 'Common',
    speakers: ['Elf', 'High Elf', 'Wood Elf', 'Moon Elf', 'Sun Elf'],
    script: 'Elvish (Flowing Script)',
    difficulty: 2,
    learnable: true,
    description: 'A melodic and fluid language with an almost musical cadence, written in sweeping curves that elven poets claim mirror the movement of wind through leaves.'
  },
  {
    id: 'orcish',
    name: 'Orcish',
    type: 'Common',
    speakers: ['Orc', 'Half-Orc', 'Goblin', 'Hobgoblin'],
    script: 'Orcish (Tribal Glyphs)',
    difficulty: 2,
    learnable: true,
    description: 'A guttural, forceful language built for shouting commands across battlefields, with a surprisingly rich oral tradition of war-songs and blood-oaths passed down by warpriests.'
  },
  {
    id: 'halfling_patois',
    name: 'Halfling Patois',
    type: 'Common',
    speakers: ['Halfling'],
    script: 'Common (Modified)',
    difficulty: 1,
    learnable: true,
    description: 'A rapid-fire, cheerful dialect of Common peppered with unique idioms, double-meanings, and folksy euphemisms that outsiders often find maddeningly imprecise.'
  },

  // ==========================================
  // EXOTIC
  // ==========================================
  {
    id: 'sylvan',
    name: 'Sylvan',
    type: 'Exotic',
    speakers: ['Fairy', 'Dryad', 'Fae', 'Nymph', 'Satyr', 'Pixie'],
    script: 'Elvish (Archaic)',
    difficulty: 3,
    learnable: true,
    description: 'A melodic, flowing language tied to the ancient magic of nature, where many nuances are conveyed through tone and subtle magical flares in the speaker\'s aura.'
  },
  {
    id: 'undercommon',
    name: 'Undercommon',
    type: 'Exotic',
    speakers: ['Dark Elf', 'Duergar', 'Shadow Elf'],
    script: 'Elvish (Inverted)',
    difficulty: 3,
    learnable: true,
    description: 'A harsh, whispered derivative of Elvish mixed with Dwarvish, heavily reliant on hand gestures and shadow-play for silent communication in lightless tunnels.'
  },
  {
    id: 'draconic',
    name: 'Draconic',
    type: 'Exotic',
    speakers: ['Draconic', 'Kobold', 'Half-Dragon', 'Wyvernfolk'],
    script: 'Wyrm-Script',
    difficulty: 3,
    learnable: true,
    description: 'One of the oldest spoken languages in existence, characterized by harsh consonants and roaring vowels, and widely used as the foundational tongue of arcane spellcasting.'
  },
  {
    id: 'giant',
    name: 'Giant',
    type: 'Exotic',
    speakers: ['Giant', 'Half-Giant', 'Ogre', 'Cyclops'],
    script: 'Giant (Megalithic)',
    difficulty: 3,
    learnable: true,
    description: 'A booming, resonant language where individual syllables can shake loose stones from cave ceilings, carved in massive runes on cliff-faces and standing stones.'
  },
  {
    id: 'abyssal',
    name: 'Abyssal',
    type: 'Exotic',
    speakers: ['Tiefling', 'Cambion'],
    script: 'Infernal',
    difficulty: 4,
    learnable: true,
    description: 'The screaming, gibbering tongue of the lower planes, physically painful for mortal throats to pronounce correctly and capable of causing nosebleeds in unpracticed speakers.'
  },
  {
    id: 'celestial',
    name: 'Celestial',
    type: 'Exotic',
    speakers: ['Aasimar', 'Seraph', 'Deva', 'Valkyrie'],
    script: 'Celestial',
    difficulty: 4,
    learnable: true,
    description: 'The luminous, crystalline language of the upper planes, said to be impossible to use for lying because the words themselves resist carrying false meaning.'
  },
  {
    id: 'goblin_tongue',
    name: 'Goblin-Tongue',
    type: 'Exotic',
    speakers: ['Goblin', 'Hobgoblin', 'Bugbear'],
    script: 'Orcish (Simplified)',
    difficulty: 2,
    learnable: true,
    description: 'A clipped, rapid-fire language built for efficiency and deception, full of double-meanings and contextual traps that allow goblins to insult visitors to their faces.'
  },
  {
    id: 'serpentine',
    name: 'Serpentine',
    type: 'Exotic',
    speakers: ['Naga', 'Lamia', 'Lizardfolk'],
    script: 'Serpentine (Coil-Glyphs)',
    difficulty: 4,
    learnable: true,
    description: 'A sibilant, hissing language written in spiraling coil-shaped glyphs, unpronounceable without a forked tongue or significant magical enhancement to the vocal cords.'
  },
  {
    id: 'trollish',
    name: 'Trollish',
    type: 'Exotic',
    speakers: ['Troll', 'Half-Troll'],
    script: 'None (Oral Only)',
    difficulty: 4,
    learnable: false,
    description: 'A crude, monosyllabic language with no written form, consisting primarily of grunts, growls, and tonal shifts that somehow convey surprisingly complex territorial boundaries.'
  },
  {
    id: 'djinni',
    name: 'Djinni',
    type: 'Exotic',
    speakers: ['Djinn', 'Efreet'],
    script: 'Primordial (Flowing)',
    difficulty: 3,
    learnable: true,
    description: 'A warm, resonant language that shifts pitch like a desert wind, spoken by the wish-granting entities of the elemental courts and their mortal pact-makers.'
  },
  {
    id: 'lupine',
    name: 'Lupine',
    type: 'Exotic',
    speakers: ['Werewolf', 'Lupine'],
    script: 'None (Howl-Patterns)',
    difficulty: 5,
    learnable: false,
    description: 'A primal language communicated through howls, growls, and body posture, allowing pack communication across vast distances using the wind to carry layered meaning.'
  },
  {
    id: 'feline',
    name: 'Feline',
    type: 'Exotic',
    speakers: ['Feline'],
    script: 'Claw-Mark Pictographs',
    difficulty: 5,
    learnable: false,
    description: 'A subtle language relying on ear position, tail movement, and barely audible vocal purrs, developed by the reclusive feline folk of the southern savannah.'
  },
  {
    id: 'minotauri',
    name: 'Minotauri',
    type: 'Exotic',
    speakers: ['Minotaur'],
    script: 'Labyrinthine (Wall-Carvings)',
    difficulty: 3,
    learnable: true,
    description: 'A territorial language where grammar follows the structure of a labyrinth, with layered clauses that must be navigated like corridors to reach the sentence\'s true meaning.'
  },

  // ==========================================
  // SECRET
  // ==========================================
  {
    id: 'thieves_cant',
    name: 'Thieves\' Cant',
    type: 'Secret',
    speakers: ['Criminal Underworld', 'Smuggler Factions'],
    script: 'None (Verbal Codes and Chalk Symbols)',
    difficulty: 3,
    learnable: true,
    description: 'A secret mix of dialects, jargon, and coded chalk-marks used to hide messages in plain sight among the criminal underworld\'s far-reaching network.'
  },
  {
    id: 'druidic',
    name: 'Druidic',
    type: 'Secret',
    speakers: ['Druids of the Green Circle'],
    script: 'Ogham (Living Wood Carvings)',
    difficulty: 3,
    learnable: true,
    description: 'The sacred, hidden language of the druidic orders, carved only into living wood and never onto dead parchment, its words said to resonate with the world itself.'
  },
  {
    id: 'the_silent_tongue',
    name: 'The Silent Tongue',
    type: 'Secret',
    speakers: ['Assassin Guilds'],
    script: 'None (Gesture-Only)',
    difficulty: 3,
    learnable: true,
    description: 'A purely gestural language using finger positions, eye movements, and subtle body shifts, developed by assassin guilds for communication during silent infiltration operations.'
  },
  {
    id: 'infernal_legalese',
    name: 'Infernal Legalese',
    type: 'Secret',
    speakers: ['Devil Pact-Brokers', 'Oni', 'Rakshasa'],
    script: 'Infernal (Contractual Sub-Script)',
    difficulty: 4,
    learnable: true,
    description: 'An impossibly precise sub-dialect of Abyssal used exclusively for drafting binding contracts with fiends, where a single misplaced clause can cost the signee their immortal soul.'
  },
  {
    id: 'the_watchers_code',
    name: 'The Watcher\'s Code',
    type: 'Secret',
    speakers: ['Mage-Guard Intelligence'],
    script: 'Encrypted Celestial',
    difficulty: 4,
    learnable: true,
    description: 'A classified cipher language developed by the Mage-Guard for secure military communication, rotating its encryption keys with every phase of the moon.'
  },

  // ==========================================
  // DEAD
  // ==========================================
  {
    id: 'primordial',
    name: 'Primordial',
    type: 'Dead',
    speakers: ['Elementals', 'Ancient Spirits'],
    script: 'Barazhad',
    difficulty: 4,
    learnable: true,
    description: 'The erratic, chaotic language of the primordial elements, rarely spoken by mortals unless communing with the ancient, untamed forces that shaped the world.'
  },
  {
    id: 'old_elvish',
    name: 'Old Elvish',
    type: 'Dead',
    speakers: ['Ancient Elven Ruins', 'Arcane Scholars'],
    script: 'Elvish (Pre-Sundering Glyphs)',
    difficulty: 3,
    learnable: true,
    description: 'The pre-Sundering dialect of the elven high courts, now used only by scholars deciphering ancient magical texts and inscriptions in ruins across the Gossamer Isles.'
  },
  {
    id: 'titanic',
    name: 'Titanic',
    type: 'Dead',
    speakers: ['None Living'],
    script: 'Megalithic (World-Carved)',
    difficulty: 5,
    learnable: false,
    description: 'The language of the primordial titans who shaped the mountains and oceans, found only in massive rune-carvings on the world\'s oldest geological formations.'
  },
  {
    id: 'void_speech',
    name: 'Void-Speech',
    type: 'Dead',
    speakers: ['Eldritch Entities', 'Mad Cultists'],
    script: 'Unknown (Mind-Searing Glyphs)',
    difficulty: 5,
    learnable: false,
    description: 'The language of the things that exist beyond the known planes, its written form causes headaches and nosebleeds, and prolonged study inevitably leads to madness.'
  },
  {
    id: 'high_draconic',
    name: 'High Draconic',
    type: 'Dead',
    speakers: ['Ancient Wyrm-Lords'],
    script: 'Wyrm-Script (Elder Form)',
    difficulty: 4,
    learnable: true,
    description: 'The ceremonial dialect of the ancient Wyrm Lords who ruled during the Era of Dragons, far more complex than modern Draconic with layered meanings per syllable.'
  }
];
