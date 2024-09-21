const roles = [
    "Knight", "Mage", "Rogue", "Archer", "Paladin", "Blacksmith", "Healer", "Assassin", "Saint", "Tamer",
    "Necromancer", "Unknown", "Death Knight", "Farmer", "Demon King", "Swordman", "Magic Swordman",
    "Martial Artist", "Trader", "Archmage", "Slave", "Chef", "Berserker", "Bard", "Pirate", "Priest", "Alchemist", "Ranger", "Samurai", "Monk", "Vampire Lord", 
    "Warlock", "Warrior", "Shaman", "Gunslinger", "Sorcerer", "Druid", "Templar", "Gladiator", "Summoner", 
    "Beastmaster", "Witch Hunter", "Duelist", "Sage", "Oracle", "Illusionist", "Psychic", "Dark Knight", 
    "Inquisitor", "Scout", "Lancer", "Runesmith", "Champion"
];

const races = [
    "Human", "Elf", "Dwarf", "Orc", "Beast", "Dark Elf", "Dragon", "Half Dragon", "Half Elf", "Demon",
    "Werewolf", "Succubus", "Divine Being", "Feline", "Frogman", "Lizardman", "Slime", "Jawir",
    "Sarkaz", "Liberi", "Sankta", "Deer", "Fishman", "Unknown", "Vampire", "Phoenix", "Giant", "Fairy", "Merfolk", "Gnome", "Troll", "Gargoyle", "Zombie", "Skeleton", 
    "Harpy", "Minotaur", "Djinn", "Centaur", "Cyclops", "Satyr", "Dryad", "Spirit", "Naga", "Undead", 
    "Goblin", "Elemental", "Chimera", "Griffin", "Treant", "Yeti", "Ogre"
];

const regions = [
    "LowRess Kingdom", "Liberia", "Great Forest", "Heavenhold",
    "Drakenfell Mountains", "Evershade Isles", "Frostspire Tundra", "Ashenmoor Wastes", "Valoria", 
    "Silverpeak Highlands", "Thornwood Vale", "Eldergrove", "Blackwater Marsh", "Suncrest Plains", 
    "Ironcliff Bastion", "Whispering Sands", "Starlight Hollow", "Glimmerfall Cove", "Shadowfen Swamp", 
    "Stormveil Coast", "Crimson Hollow", "Verdantwild", "Obsidian Flats", "Azurelake Shores", 
    "Emberstone Citadel", "Duskmire Reach", "Wildthorn Expanse", "Goldenleaf Glade", "Ivoryspire City"
];


const roleSkills = {
    "Knight": ["Sword Mastery", "Shield Mastery", "Mounted Combat", "War Cry", "Heavy Armor", "Tactical Strategy", "Battle Charge", "Shield Bash", "Combat Reflexes", "Defensive Stance", "Sword Block", "Battlefield Awareness", "Parry", "Shield Slam", "Armor Reinforcement", "Toughness", "Sword Precision", "Holy Vow", "Defender's Resolve", "Battle Endurance"],
    "Mage": ["Fireball", "Arcane Blast", "Mana Shield", "Teleportation", "Elemental Mastery", "Frost Nova", "Lightning Bolt", "Magic Missile", "Arcane Intellect", "Spell Weaving", "Mana Surge", "Blizzard", "Arcane Barrage", "Mystic Ward", "Summon Elemental", "Mana Control", "Energy Barrier", "Time Warp", "Teleport", "Magic Amplification"],
    "Rogue": ["Stealth", "Backstab", "Lockpicking", "Evasion", "Poison Mastery", "Ambush", "Dual Wielding", "Shadow Step", "Smoke Bomb", "Agility Boost", "Critical Strike", "Sleight of Hand", "Cloak and Dagger", "Trap Disarm", "Shadow Strike", "Silent Movement", "Escape Artist", "Venom Blade", "Quick Reflexes", "Throat Cutter"],
    "Archer": ["Bow Mastery", "Eagle Eye", "Piercing Arrow", "Quick Shot", "Snipe", "Camouflage", "Windrunner", "Multishot", "Aimed Shot", "Trap Setting", "Precision Strike", "Arrow Barrage", "Rapid Fire", "Hawk Vision", "Volley", "Long-Range Targeting", "Tracking", "Deadly Aim", "Explosive Arrow", "Evasion Tactics"],
    "Paladin": ["Holy Light", "Divine Shield", "Crusader's Strike", "Aura of Protection", "Lay on Hands", "Blessed Hammer", "Judgment", "Sanctified Strike", "Consecration", "Holy Vengeance", "Righteous Fury", "Hammer of Justice", "Shield of Faith", "Divine Protection", "Martyrdom", "Aura of Courage", "Holy Smite", "Beacon of Hope", "Retribution", "Heavenly Wrath"],
    "Blacksmith": ["Metalworking", "Weapon Crafting", "Armor Forging", "Toolmaking", "Material Refinement", "Enhance Durability", "Repair Mastery", "Hammer Mastery", "Metal Tempering", "Smithing Techniques", "Craftsmanship", "Weapon Balancing", "Ingot Creation", "Alloy Expertise", "Anvil Mastery", "Reforge", "Heat Control", "Forge Efficiency", "Rune Inscription", "Shield Crafting"],
    "Healer": ["Healing Touch", "Regeneration", "Purify", "Resurrect", "Healing Wave", "Life Surge", "Cleanse", "Mend Wounds", "Divine Healing", "Rejuvenation", "Restoration Aura", "Prayer of Healing", "Revitalize", "Blessing of Life", "Mass Heal", "Soothing Light", "Protective Aura", "Cure Disease", "Invigorate", "Spiritual Grace"],
    "Assassin": ["Assassination", "Deadly Poison", "Vanish", "Shadowstep", "Silent Kill", "Vital Strike", "Garrote", "Shadow Dance", "Death Mark", "Agility Mastery", "Fatal Blow", "Disguise", "Poisoned Dagger", "Bleed Strike", "Night Tactics", "Execute", "Ambush", "Swift Death", "Target Mark", "Infiltration"],
    "Saint": ["Divine Protection", "Holy Prayer", "Martyr's Blessing", "Blessing of Light", "Sanctify", "Holy Grace", "Atonement", "Sermon of Peace", "Healing Prayer", "Protection Aura", "Miracle", "Holy Radiance", "Divine Wrath", "Ascension", "Faithful Shield", "Crusade", "Light's Favor", "Redemption", "Aura of Virtue", "Purity"],
    "Tamer": ["Animal Bond", "Beast Summoning", "Tame Creature", "Beast Command", "Nature’s Call", "Predator's Instinct", "Beast Training", "Wild Empathy", "Mount Mastery", "Companion Healing", "Savage Assault", "Tracking", "Call of the Wild", "Companion's Roar", "Whistle Command", "Beast Empowerment", "Pack Mastery", "Animal Whisper", "Swift Companion", "Predatory Strike"],
    "Necromancer": ["Raise Dead", "Soul Harvest", "Death Pact", "Bone Armor", "Dark Ritual", "Corpse Explosion", "Summon Skeleton", "Life Drain", "Plague Curse", "Animate Corpse", "Reanimate", "Necrotic Grasp", "Spirit Link", "Dark Command", "Gravewalker", "Soul Siphon", "Undead Horde", "Cursed Touch", "Death's Embrace", "Blood Ritual"],
    "Unknown": ["Mysterious Aura", "Shapeshift", "Unpredictable Attack", "Hidden Power", "Adaptation", "Masked Presence", "Arcane Shift", "Disguise", "Shadow Veil", "Unseen Hand", "Mystic Barrier", "Psychic Manipulation", "Mystery Strike", "Illusion Mastery", "Hidden Strength", "Unknown Forces", "Fate Shift", "Reality Twist", "Obfuscation", "Quantum Step"],
    "Death Knight": ["Death Coil", "Unholy Aura", "Blood Plague", "Frozen Grasp", "Dark Strike", "Ghoul Summoning", "Plague Strike", "Death Grip", "Blood Shield", "Heart Strike", "Rune Mastery", "Dark Crusader", "Soul Reaper", "Anti-Magic Shell", "Obliterate", "Death Gate", "Frostbound", "Death Strike", "Wraithwalk", "Grave Chill"],
    "Farmer": ["Crop Harvesting", "Animal Husbandry", "Soil Tilling", "Seed Planting", "Watering Mastery", "Irrigation Control", "Crop Rotation", "Farm Management", "Weather Prediction", "Fertilizer Knowledge", "Plow Control", "Herbalism", "Livestock Care", "Barn Management", "Tractor Mastery", "Field Plowing", "Agriculture Knowledge", "Compost Mastery", "Pest Control", "Grain Storage"],
    "Demon King": ["Demonic Power", "Hellfire", "Infernal Summoning", "Dark Domination", "Void Eruption", "Soul Devour", "Demonic Presence", "Chaos Burst", "Abyssal Wrath", "Corruption Aura", "Fear Mastery", "Flame of Destruction", "Summon Legion", "Hellish Command", "Void Chain", "Flame Strike", "Eternal Darkness", "Soulfire", "Voidstep", "Devour Essence"],
    "Swordman": ["Sword Mastery", "Swift Slash", "Blade Dance", "Parry", "Defensive Stance", "Weapon Sharpening", "Dual Wield", "Cross Slash", "Heavy Slash", "Sword Draw", "Whirlwind Strike", "Blade Storm", "Precision Cut", "Sword Focus", "Riposte", "Battle Focus", "Sword Art", "Piercing Thrust", "Blade Rush", "Counterstrike"],
    "Magic Swordman": ["Spellblade", "Sword of Magic", "Elemental Slash", "Mana Infusion", "Arcane Blade", "Frost Slash", "Flame Edge", "Blade of the Arcane", "Magic Barrage", "Sword Mastery", "Mana Burst", "Sword of Elements", "Arcane Flow", "Enchant Weapon", "Rune Strike", "Swordwave", "Mana Shield", "Ethereal Slash", "Arcane Strike", "Magical Defense"],
    "Martial Artist": ["Punch Mastery", "Kick Mastery", "Chi Control", "Pressure Point Strike", "Swift Fists", "Flying Kick", "Inner Focus", "Tiger Palm", "Eagle Claw", "Iron Body", "Quick Reflexes", "Chi Burst", "Leg Sweep", "Dodge Mastery", "Counterattack", "Tornado Kick", "Fist of Fury", "Palm Strike", "Chi Shield", "Meditation"],
    "Trader": ["Market Knowledge", "Bartering", "Price Negotiation", "Trade Routes", "Business Insight", "Wealth Generation", "Item Appraisal", "Economic Strategy", "Market Manipulation", "Logistics Mastery", "Supply Chain Management", "Merchant's Eye", "Inventory Control", "Business Expansion", "Trade Secrets", "Price Forecasting", "Stockpile Management", "Trading Reputation", "Investment Planning", "Contract Negotiation"],
    "Archmage": ["Meteor Shower", "Arcane Nova", "Mana Overload", "Dimensional Shift", "Elemental Mastery", "Mana Surge", "Teleportation", "Temporal Freeze", "Arcane Barrage", "Grand Summon", "Ethereal Chains", "Mystic Insight", "Arcane Pulse", "Elemental Rift", "Mystic Storm", "Teleport Mastery", "Mana Rift", "Spell Weaving", "Arcane Explosion", "Arcane Power"],
    "Slave": ["Endurance Training", "Hard Labor", "Survival Instinct", "Obedience", "Pain Tolerance", "Escape Plan", "Stealth Movement", "Cunning Instinct", "Heavy Lifting", "Agility Boost", "Endure Hardship", "Silent Resolve", "Quick Learning", "Work Efficiency", "Mental Resilience", "Combat Reflexes", "Defensive Movement", "Servant's Grace", "Fear Suppression", "Tactical Escape"],
    "Chef": ["Culinary Expertise", "Knife Mastery", "Fire Control", "Ingredient Knowledge", "Spice Mastery", "Meal Planning", "Recipe Innovation", "Food Preservation", "Herb Utilization", "Quick Cooking", "Gourmet Presentation", "Plating Techniques", "Seasoning Mastery", "Food Plating", "Tasting Expertise", "Nutrition Knowledge", "Sauce Creation", "Baking Skills", "Menu Crafting", "Kitchen Management"],
    "Berserker": ["Rage Unleashed", "Bloodlust", "Frenzied Strikes", "Battle Roar", "Relentless Assault", "Fearless Charge", "Savage Blow", "Battle Frenzy", "Bloodthirst", "Weapon Smash", "War Cry", "Unstoppable Force", "Rampage", "Critical Strike", "Battlefield Fury", "Rage Recovery", "Adrenaline Surge", "Destruction Wave", "Uncontrolled Rage", "Death Rage"],
    "Bard": ["Song of Valor", "Melodic Healing", "Inspiring Anthem", "Lute Mastery", "Song of Protection", "Charming Tune", "Magical Melody", "Harmonic Harmony", "Ballad of Bravery", "Rhythmic Defense", "Melody of Recovery", "Tune of Tranquility", "Battle Hymn", "Sonic Burst", "Hymn of Power", "Lullaby of Sleep", "Musical Shield", "Soundwave Shock", "Note of Clarity", "Inspiration Aura"],
    "Pirate": ["Swordplay", "Navigation", "Pistol Mastery", "Rum Drinking", "Sea Tactics", "Ship Management", "Plundering", "Treasure Hunting", "Cannon Operation", "Sea Combat", "Boarding Mastery", "Anchor Toss", "Sea Legs", "Whirlwind Slash", "Jolly Roger Spirit", "Oceanic Maneuvering", "Sail Mastery", "Rope Swing", "Pirate's Code", "Storm Riding"],
    "Priest": ["Holy Prayer", "Purify", "Healing Light", "Divine Intervention", "Blessing of Protection", "Resurrection", "Smite", "Holy Aura", "Faith Shield", "Prayer of Hope", "Restoration", "Spiritual Guidance", "Divine Judgment", "Miracle Healing", "Aura of Devotion", "Sermon of Light", "Benediction", "Martyrdom", "Prayer of Salvation", "Divine Grace"],
    "Alchemist": ["Potion Crafting", "Transmutation", "Herb Knowledge", "Elemental Infusion", "Elixir Mastery", "Alchemy Circle", "Catalyst Expertise", "Mana Elixirs", "Poison Brewing", "Stone Transmutation", "Antidote Creation", "Explosive Concoctions", "Potion of Speed", "Regeneration Brew", "Flame Essence", "Alchemy Enhancement", "Mana Restoration", "Resilience Brew", "Healing Elixirs", "Elemental Fusion"],
    "Ranger": ["Bow Mastery", "Tracking", "Stealth", "Hunting", "Nature Knowledge", "Animal Companion", "Cloak of Shadows", "Precision Shot", "Silent Kill", "Trap Setting", "Camouflage", "Survival Instinct", "Arrow Mastery", "Rapid Fire", "Animal Bond", "Foraging", "Evasion", "Swift Movements", "Lethal Arrow", "Wilderness Navigation"],
    "Samurai": ["Katana Mastery", "Bushido Code", "Quick Draw", "Parry", "Iaijutsu", "Sword Stance", "Focused Strike", "Spiritual Resolve", "Deflect Arrows", "Blade of Honor", "Perfect Focus", "Kiai", "Dual Katana", "Swift Blade", "Martial Spirit", "Battle Discipline", "Zen Meditation", "Blade Fury", "Warrior's Patience", "Sacred Oath"],
    "Monk": ["Chi Mastery", "Meditation", "Palm Strike", "Iron Fist", "Serene Mind", "Tiger Claw", "Pressure Point", "Swift Movement", "Chi Shield", "Inner Strength", "Spiritual Awareness", "Energy Channeling", "Keen Reflexes", "Healing Meditation", "Chi Burst", "Mystic Harmony", "Whirling Kick", "Fist of Fury", "Evasion", "Focused Breathing"],
    "Vampire Lord": ["Blood Drain", "Bat Transformation", "Night Vision", "Immortal Presence", "Vampiric Aura", "Shadow Strike", "Dark Seduction", "Blood Pact", "Mist Form", "Blood Frenzy", "Summon Bats", "Night Stalker", "Immortal Regeneration", "Crimson Fury", "Charm of the Undead", "Blood Ritual", "Shadow Dash", "Nightwalker", "Hypnotic Gaze", "Vampire's Thrall"],
    "Warlock": ["Curse of Agony", "Shadow Bolt", "Soul Harvest", "Summon Demon", "Dark Pact", "Fear", "Doom Bolt", "Life Drain", "Demonic Power", "Soulstone", "Curse of Weakness", "Hellfire", "Shadow Grasp", "Summon Imp", "Corruption", "Fel Flame", "Demonic Circle", "Nether Bind", "Chaos Bolt", "Unstable Affliction"],
    "Warrior": ["Sword Mastery", "Shield Slam", "Battle Shout", "Defensive Stance", "Charge", "Berserker Rage", "Cleave", "Shield Wall", "Critical Strike", "Armor Break", "Taunt", "Overpower", "Heroic Leap", "Whirlwind", "Shield Block", "Battle Endurance", "Savage Strike", "Bloodthirst", "Victory Rush", "Unyielding Force"],
    "Shaman": ["Totem Summoning", "Chain Lightning", "Earthquake", "Ancestral Spirit", "Healing Rain", "Windfury", "Flame Shock", "Water Shield", "Spirit Walk", "Frost Shock", "Nature's Fury", "Lightning Bolt", "Elemental Mastery", "Reincarnation", "Earth Shield", "Ghost Wolf", "Thunderstrike", "Stormcaller", "Totemic Mastery", "Elemental Fury"],
    "Gunslinger": ["Pistol Mastery", "Quickdraw", "Bullet Storm", "Explosive Shot", "Dual Wield", "Reload Mastery", "Sharpshooter", "Cover Fire", "Piercing Shot", "Ricochet", "Deadeye", "Rapid Fire", "Grenade Toss", "Evasion Tactics", "Headshot", "Suppressing Fire", "Trick Shot", "Flare Gun", "High Caliber Shot", "Marksmanship"],
    "Sorcerer": ["Arcane Mastery", "Fireball", "Lightning Bolt", "Ice Spear", "Teleportation", "Mana Shield", "Spell Casting", "Elemental Fury", "Meteor Strike", "Summon Familiar", "Mana Drain", "Frost Nova", "Arcane Blast", "Conjure Elemental", "Chain Lightning", "Firestorm", "Mystic Shield", "Mana Surge", "Time Warp", "Arcane Torrent"],
    "Druid": ["Nature's Touch", "Wild Shape", "Animal Companions", "Healing Rain", "Thorn Armor", "Call of the Wild", "Moonfire", "Regeneration", "Earthquake", "Entangling Roots", "Stormcaller", "Bear Form", "Tree of Life", "Natural Regrowth", "Wind Gust", "Wild Fury", "Shapeshift Mastery", "Summon Treants", "Feral Claws", "Nature's Wrath"],
    "Templar": ["Holy Blade", "Divine Judgment", "Shield of Faith", "Righteous Strike", "Sanctuary", "Aura of Protection", "Holy Smite", "Divine Healing", "Sword of Justice", "Blessing of Light", "Defender's Resolve", "Martyr's Shield", "Crusader's Charge", "Vow of Protection", "Wrath of Heaven", "Sanctified Blade", "Aura of Courage", "Holy Crusade", "Sacred Oath", "Divine Strike"],
    "Gladiator": ["Arena Mastery", "Combat Reflexes", "Dual Weapon Mastery", "Shield Slam", "Battle Cry", "Whirlwind Slash", "Arena Tactics", "Victory Rush", "Savage Strike", "Unbreakable Will", "Counterstrike", "Weapon Throw", "Critical Slash", "Cleave", "Overpower", "Last Stand", "Shield Breaker", "Sword Dance", "Arena Dominance", "Bloodlust"],
    "Summoner": ["Summon Beast", "Arcane Summoning", "Summon Elemental", "Summon Golem", "Mana Channeling", "Familiar Mastery", "Summon Phoenix", "Spirit Bond", "Summon Doppelganger", "Ethereal Binding", "Summon Undead", "Mana Surge", "Summon Hydra", "Soul Link", "Summon Titan", "Elemental Convergence", "Arcane Familiar", "Conjure Guardian", "Planar Rift", "Summon Chimera"],
    "Beastmaster": ["Animal Bond", "Tame Beast", "Beast Command", "Savage Claw", "Wild Instincts", "Predator's Call", "Beast Roar", "Feral Strike", "Companion's Fury", "Alpha Bond", "Summon Pack", "Nature's Whisper", "Tracking", "Beast Empowerment", "Hunter's Mark", "Savage Onslaught", "Wild Companion", "Animal Wrath", "Feral Charge", "Predatory Senses"],
    "Witch Hunter": ["Dark Detection", "Purifying Flame", "Holy Shot", "Hunter's Mark", "Silver Bullets", "Dark Magic Nullification", "Curse Breaking", "Demonbane", "Vampire Slayer", "Purity of Will", "Mystic Ward", "Crossbow Mastery", "Exorcism", "Hunter’s Reflexes", "Witch’s Bane", "Trap Mastery", "Evil Scent", "Divine Smite", "Shadow Purge", "True Sight"],
    "Duelist": ["Rapier Mastery", "Parry and Riposte", "Quick Thrust", "Evasive Maneuver", "Lunge Strike", "Fencing Footwork", "Blade Feint", "Precision Strike", "Disarm Opponent", "Swift Counter", "Dancing Blade", "Agility Boost", "Flicker Thrust", "Sword Flourish", "Master Duelist", "Perfect Timing", "Counterstrike", "Flash Step", "Blade Storm", "Flawless Defense"],
    "Sage": ["Wisdom of Ages", "Arcane Meditation", "Insightful Strike", "Mana Mastery", "Barrier of Wisdom", "Mind Over Matter", "Ethereal Wisdom", "Spell Reinforcement", "Ancient Knowledge", "Mystic Barrier", "Inner Peace", "Aura of Enlightenment", "Mana Infusion", "Calm Mind", "Telekinetic Mastery", "Clairvoyance", "Spiritual Protection", "Illumination", "Astral Projection", "Eldritch Power"],
    "Oracle": ["Future Sight", "Prophecy", "Divine Insight", "Clairvoyance", "Precognition", "Spirit Connection", "Foresight", "Astral Vision", "Mind Link", "Time Shift", "Spiritual Guidance", "Fate Weaving", "Omniscient Awareness", "Aura of Destiny", "Dreamwalk", "Vision of Truth", "Cosmic Knowledge", "Fortune Telling", "Destiny's Hand", "Timeless Presence"],
    "Illusionist": ["Mirror Image", "Phantom Strike", "Invisibility", "Mind Trick", "Illusionary Barrage", "Shimmering Cloak", "Phantasmal Force", "Mass Hallucination", "Veil of Shadows", "Mesmerize", "Arcane Mirage", "False Reality", "Spectral Manipulation", "Distort Perception", "Mirage Dash", "Ethereal Form", "Psychic Veil", "Light Distortion", "Cloak of Deception", "Spectral Dance"],
    "Psychic": ["Mind Control", "Telepathy", "Psychic Blast", "Mental Shield", "Mind Crush", "Telekinesis", "Precognitive Reflex", "Psionic Storm", "Empathic Link", "Psychic Scream", "Astral Projection", "Mind Fortress", "Psychic Wave", "Mental Assault", "Thought Probe", "Willpower Boost", "Mind Push", "Psionic Reflection", "Psychic Drain", "Psi Barrage"],
    "Dark Knight": ["Shadow Strike", "Death Blade", "Dark Aura", "Nightmare Slash", "Soul Corruption", "Void Edge", "Unholy Strength", "Vampiric Touch", "Fell Cleave", "Shadow Barrier", "Blackened Blade", "Dark Shield", "Abyssal Wrath", "Soul Drain", "Grim Resolve", "Spectral Slash", "Voidwalker", "Dread Charge", "Cursed Armor", "Siphon Life"],
    "Inquisitor": ["Holy Inquisition", "Judgment", "Purge Evil", "Interrogate", "Holy Fire", "Searing Light", "Scourge of Darkness", "Divine Retribution", "Cleansing Flame", "Hammer of Justice", "Witch Trial", "Torture Knowledge", "Faith's Judgment", "Smite the Unholy", "Truth Seeker", "Exorcism", "Chains of Faith", "Burn the Wicked", "Heavenly Wrath", "Vow of Purity"],
    "Scout": ["Keen Eye", "Ambush", "Tracking", "Silent Step", "Sniper Shot", "Camouflage", "Hawk’s Vision", "Quick Shot", "Evasion", "Trap Mastery", "Trailblazer", "Agility Boost", "Escape Artist", "Deadly Aim", "Stealth Tactics", "Bow Mastery", "Terrain Mastery", "Survivalist", "Vantage Point", "Reconnaissance"],
    "Lancer": ["Spear Mastery", "Shield Bash", "Charging Thrust", "Lunging Strike", "Deflect", "Piercing Blow", "Phalanx Formation", "Shield Wall", "Counter Thrust", "Skewer", "Javelin Throw", "Polearm Precision", "Battle Roar", "Shield Charge", "Sweeping Strike", "Tactical Stance", "Spartan Discipline", "Storm Thrust", "Rending Spear", "Unbreakable Defense"],
    "Runesmith": ["Rune Crafting", "Weapon Inscription", "Armor Engraving", "Rune Empowerment", "Magic Infusion", "Rune of Fire", "Rune of Frost", "Rune of Protection", "Mystic Inscription", "Arcane Engravings", "Rune of Lightning", "Rune of Life", "Stone Rune", "Empowered Glyphs", "Rune Channeling", "Spirit Binding", "Rune of Destruction", "Mystic Warding", "Rune of Clarity", "Enchantment Mastery"],
    "Champion": ["Heroic Strike", "Battle Charge", "Defensive Posture", "War Cry", "Shield Bash", "Mighty Cleave", "Champion’s Roar", "Battle Endurance", "Hero’s Resolve", "Overpower", "Critical Blow", "Tactical Defense", "Rallying Cry", "Victory Rush", "Stalwart Defense", "Unyielding Strength", "Shield Mastery", "Battlefield Domination", "Power Slam", "Warrior's Wrath"]
};

const ranks = ["N/A", "F", "E", "D", "C", "B", "A", "S", "SS", "SSS", "SSSS", "EX", "Legendary", "Mythic", "Godly"];

const guilds = ["None", "RHODES", "Silverthorn", "Dragonshade", "Shadowspire", "El Gasing", "Eternal Flame", "Nightstalkers", "Blood Oath", "Celestial Order", "Iron Fist", "Golden Claw", "Dark Covenant", "Crimson Fang", "Stormborn", "Whisperwind", "Frostward", "Sunbreakers", "Serpent's Coil"];

const titles = {
    "Knight": ["Champion of Light", "Guardian of the Realm", "Master of Arms", "Sword Guardian", "Defender of the Weak", "Shieldbearer", "Protector of Kings", "Knight of Valor", "Sword of Justice", "Ironclad Defender"],
    "Mage": ["Archmage of Flames", "Master of the Arcane", "Conjurer of Storms", "Keeper of Secrets", "Elemental Sage", "Sorcerer Supreme", "Mystic of the Ether", "Weaver of Magic", "Invoker of Realms", "Arcane Adept"],
    "Rogue": ["Shadow Stalker", "Master of Stealth", "Cloaked Assassin", "Whisper in the Night", "Thief of Shadows", "Shadowblade", "Silent Dagger", "Night Walker", "Master of Guile", "Specter of Darkness"],
    "Archer": ["Eagle-Eyed Marksman", "Master of the Bow", "Windstrider", "Sharpshooter", "Hawk-Eye", "Forest Ranger", "Sniper of the Wilds", "Bowmaster", "Quicksilver Archer", "Huntsman of the Realm"],
    "Paladin": ["Holy Guardian", "Champion of the Light", "Shield of Virtue", "Sword of the Divine", "Crusader of Righteousness", "Holy Defender", "Lightbringer", "Divine Protector", "Sacred Warrior", "Knight of Faith"],
    "Blacksmith": ["Forge Master", "Hammer of the Gods", "Crafter of Steel", "Iron Lord", "Smith of Legends", "Weapon Forger", "Master of Metal", "Anvil Keeper", "Bladesmith", "Master Craftsman"],
    "Healer": ["Light of Salvation", "Divine Medic", "Holy Lifebringer", "Protector of Life", "Angel of Mercy", "Soul Healer", "Restorer of Hope", "Cleric of Restoration", "Blessed Healer", "Faithful Lifesaver"],
    "Assassin": ["Blade of Death", "Shadow Killer", "Master of the Silent Kill", "Executioner in the Dark", "Silent Blade", "Night Stalker", "Venomous Shadow", "Deathbringer", "Dark Slayer", "Specter of Death"],
    "Saint": ["Divine Luminary", "Holy Icon", "Beacon of Light", "Avatar of Purity", "Blessed One", "Messenger of the Divine", "Herald of Virtue", "Chosen of the Heavens", "Voice of the Sacred", "Guardian of Faith"],
    "Tamer": ["Beast Whisperer", "Master of Creatures", "Lord of the Wild", "Animal Companion", "Beast Lord", "Rider of Beasts", "Wild Keeper", "Beast Commander", "Nature’s Ally", "Wild Guardian"],
    "Necromancer": ["Lord of the Dead", "Master of Souls", "Ruler of the Undead", "Deathcaller", "Gravewalker", "Soulbinder", "Summoner of the Damned", "Harbinger of Death", "Bone Conjuror", "Dark Lord of Decay"],
    "Unknown": ["Enigma of the Realms", "Bearer of Mystery", "Wanderer of the Unknown", "The Unseen", "Fate's Hidden One", "Shrouded Figure", "Whisper of the Void", "Mysterious Traveler", "Silent Stranger", "The Forgotten"],
    "Death Knight": ["Dark Champion", "Scourge of Life", "Knight of Death", "Harbinger of Doom", "Shadowed Warrior", "Knight of the Grave", "Deathbringer", "Warrior of the Void", "Soul Reaper", "Knight of Despair"],
    "Farmer": ["Harvest Guardian", "Tiller of Lands", "Master of Crops", "Earthbound Cultivator", "Grainkeeper", "Lord of the Harvest", "Field Tiller", "Soil Master", "Guardian of Fields", "Reaper of Bounty"],
    "Demon King": ["Lord of Hell", "Ruler of Flames", "Bringer of Destruction", "Master of Chaos", "Infernal Emperor", "Hellfire Tyrant", "Dark Sovereign", "Wielder of Malice", "King of the Abyss", "Dark Lord of Chaos"],
    "Swordman": ["Blade Master", "Sword Dancer", "Wielder of Steel", "Edge of Victory", "Warrior of Blades", "Swordbearer", "Master of the Sword", "Iron Blade", "Blade of Justice", "Warrior of Steel"],
    "Magic Swordman": ["Arcane Blade", "Mystic Swordsman", "Enchanted Warrior", "Spellbound Sword", "Mage of the Blade", "Sorcerous Warrior", "Arcane Weapon Master", "Blade of Magic", "Conjuror of Steel", "Mystic Fencer"],
    "Martial Artist": ["Fist of Fury", "Master of Combat", "Grandmaster of Techniques", "Disciple of the Fist", "Iron Fist", "Silent Fighter", "Combat Master", "Warrior of the Hand", "Fist of Shadows", "Guardian of the Fist"],
    "Trader": ["Merchant of Gold", "Master of Trade", "Wheeler and Dealer", "Coin Collector", "Market King", "Lord of Commerce", "Keeper of Wealth", "Trader of Fortune", "The Negotiator", "Tycoon of the Bazaar"],
    "Archmage": ["Supreme Sorcerer", "Master of the Arcane", "Grand Sage of Magic", "Weaver of the Ether", "Arcane Overlord", "High Magician", "Sorcerer of Realms", "Wizard King", "Supreme Mystic", "Arcane Master"],
    "Slave": ["Bound Servant", "Servant of Chains", "Indentured Soul", "Fettered Worker", "Bound by Chains", "Unfree Soul", "Captive Worker", "Servant of Oppression", "Tethered One", "Unwilling Servant"],
    "Chef": ["Master of Flavors", "King of the Kitchen", "Culinary Artist", "Lord of the Ladle", "Flame Chef", "Cuisine Connoisseur", "Taste Crafter", "Recipe Master", "Culinary Alchemist", "Gourmet Champion"],
    "Berserker": ["Rage of the Battlefield", "Warrior of Fury", "Bloodthirsty Destroyer", "Wielder of Wrath", "Fury Unleashed", "Madman of Battle", "Bringer of Carnage", "The Frenzied", "Wrathbringer", "Destroyer of Foes"],
    "Bard": ["Songweaver", "Master of Melody", "Minstrel of Legends", "Keeper of Tales", "Harmonious Singer", "Traveler's Song", "Poet of Ages", "Muse of the Realm", "Melody Maker", "Voice of the Ages"],
    "Pirate": ["Captain of the Seas", "Sea Rover", "Lord of the Ocean", "Buccaneer King", "Ruler of the Waves", "Master of the High Seas", "Ocean Raider", "Corsair Champion", "Scourge of the Waters", "Seafaring Marauder"],
    "Priest": ["Blessed Cleric", "Voice of the Divine", "Keeper of Faith", "Holy Shepherd", "Bearer of Grace", "Soul Keeper", "Divine Intercessor", "Servant of the Light", "Harbinger of the Sacred", "Guardian of the Faithful"],
    "Alchemist": ["Master of Transmutation", "Potion Master", "Crafter of Elixirs", "Herbalist of the Realms", "Arcane Chemist", "Wielder of Elements", "Mixer of Potions", "Catalyst of Change", "Enchanter of Potions", "Alchemical Sage"],
    "Ranger": ["Warden of the Wilds", "Guardian of Nature", "Tracker of Beasts", "Forest Wanderer", "Nature’s Protector", "Hunter of the Wild", "Beast Seeker", "Woodsman of the Realm", "Pathfinder", "Wilds Keeper"],
    "Samurai": ["Warrior of Honor", "Master of the Katana", "Bushido Blade", "Sword of Honor", "Lord of the Katana", "Disciple of Bushido", "Master of the Sword", "Ronin of Valor", "Keeper of the Code", "Blade of Honor"],
    "Monk": ["Disciple of Peace", "Master of Tranquility", "Fist of the Ancients", "Silent Guardian", "Wanderer of Virtue", "Keeper of Balance", "Mystic Warrior", "Guardian of Serenity", "Devout of the Spirit", "Master of Harmony"],
    "Vampire Lord": ["Dark Blood King", "Lord of Night", "Sovereign of Shadows", "Ruler of the Undead", "Master of Vampires", "Night Stalker", "Bloodthirsty Monarch", "Shadow Emperor", "Darkblood Ruler", "Wraith of the Night"],
    "Warlock": ["Master of Dark Magic", "Weaver of the Infernal", "Lord of Curses", "Shadow Magician", "Hex Weaver", "Bearer of Dark Knowledge", "Coven Leader", "Master of Hexes", "Dark Sorcerer", "Shadow Sage"],
    "Warrior": ["Warlord of Valor", "Master of Combat", "Champion of War", "Warblade", "Shieldbearer", "Warbringer", "Sword of Victory", "Warrior of Legends", "Battle-Hardened Hero", "Lord of the Battlefield"],
    "Shaman": ["Keeper of Spirits", "Master of Totems", "Spirit Walker", "Invoker of the Ancients", "Voice of the Spirits", "Mystic of the Elements", "Elemental Conduit", "Warden of the Spirit Realm", "Totem Keeper", "Sage of the Spirits"],
    "Gunslinger": ["Deadeye Marksman", "Master of Firearms", "Sharpshooter of the West", "Bulletstorm", "Quickdraw Champion", "Wielder of Iron", "Sharp Eye", "Pistol Master", "Marksman of the Wild", "Gunsmith Champion"],
    "Sorcerer": ["Master of the Arcane", "Lord of Magic", "Weaver of Spells", "Enchanter of Realms", "Sorcerous Ruler", "Keeper of Magic", "Arcane Wielder", "Master of the Elements", "Mystic Conjuror", "Wizard of the Realms"],
    "Druid": ["Nature’s Guardian", "Protector of the Wilds", "Shapeshifter", "Keeper of the Groves", "Voice of the Forest", "Warden of Nature", "Beast Whisperer", "Caller of the Wilds", "Mystic of the Wild", "Keeper of the Earth"],
    "Templar": ["Holy Crusader", "Sword of the Divine", "Shield of Righteousness", "Champion of Faith", "Knight of the Cross", "Protector of the Holy", "Defender of the Light", "Warrior of the Sacred", "Guardian of the Faith", "Sword of Virtue"],
    "Gladiator": ["Champion of the Arena", "Master of the Colosseum", "Pit Fighter", "Warlord of the Sands", "Blood Champion", "Arena Warrior", "Battle-Hardened Fighter", "Lord of the Pit", "Sword of the Arena", "Colosseum Victor"],
    "Summoner": ["Caller of Beasts", "Master of Summons", "Wielder of Creatures", "Invoker of Allies", "Summoner of Realms", "Creature Caller", "Beast Conjuror", "Spirit Summoner", "Master of Conjurations", "Herald of Creatures"],
    "Beastmaster": ["Lord of Beasts", "Master of Creatures", "Tamer of the Wild", "Warden of the Beasts", "Beast Commander", "Protector of Creatures", "Beast Conjuror", "Wild Guardian", "Keeper of the Beasts", "Nature's Commander"],
    "Witch Hunter": ["Hunter of Witches", "Bane of Sorcery", "Protector of Innocents", "Cleansing Flame", "Purger of Darkness", "Slayer of Magic", "Witchbane", "Champion of Light", "Shadow Purger", "Light's Retribution"],
    "Duelist": ["Master of Blades", "Sword Champion", "Wielder of Precision", "Master of the Duel", "Fencer of Honor", "Duel Master", "Blademaster", "Champion of the Duel", "Lord of the Blade", "Master of the Duel"],
    "Sage": ["Master of Wisdom", "Keeper of Ancient Knowledge", "Seeker of Enlightenment", "Wise One", "Bearer of the Truth", "Mystic of the Ages", "Sage of the Realms", "Enlightened Master", "Wisdom Keeper", "Elder of the Realms"],
    "Oracle": ["Seer of the Future", "Prophet of the Realms", "Bearer of Visions", "Mystic of Fate", "Voice of the Gods", "Fortune Keeper", "Keeper of Fate", "Visionary of the Realms", "Herald of Destiny", "Wielder of Foresight"],
    "Illusionist": ["Master of Deception", "Weaver of Illusions", "Mystic of the Mind", "Wielder of Trickery", "Phantom Conjuror", "Enchanter of Illusions", "Mindspeaker", "Keeper of Mirage", "Fooler of Perception", "Master of the Unreal"],
    "Psychic": ["Mindbender", "Telepath of Power", "Wielder of the Mind", "Master of Thought", "Seer of Minds", "Psychic Conjuror", "Mindwalker", "Telekinetic Master", "Keeper of Thoughts", "Mentalist Sage"],
    "Dark Knight": ["Knight of Shadows", "Bearer of Darkness", "Ruler of Night", "Wielder of the Void", "Shadowbringer", "Champion of Despair", "Harbinger of Night", "Darkblade", "Knight of the Abyss", "Warlord of the Void"],
    "Inquisitor": ["Seeker of Truth", "Hunter of Heretics", "Purger of Sins", "Judge of the Damned", "Cleansing Light", "Heretic Slayer", "Wielder of Righteousness", "Judge of the Faithless", "Sword of the Inquisition", "Righteous Flame"],
    "Scout": ["Pathfinder of the Wild", "Master Tracker", "Seeker of Secrets", "Ranger of the Unknown", "Warden of the Wilds", "Lightfoot", "Silent Watcher", "Tracker of Beasts", "Explorer of Realms", "Wilderness Wanderer"],
    "Lancer": ["Spear Wielder", "Master of the Lance", "Knight of the Spear", "Piercer of Shields", "Spear of the Skies", "Spear Champion", "Knight of the Lance", "Lancebearer", "Wielder of the Spear", "Lancer of Legends"],
    "Runesmith": ["Master of Runes", "Carver of Magic", "Wielder of Ancient Symbols", "Runewright", "Smith of Power", "Crafter of Enchantment", "Runescribe", "Bearer of Magical Symbols", "Runeforge Master", "Lord of the Runes"],
    "Champion": ["Hero of the People", "Guardian of the Realm", "Sword of Victory", "Master of the Arena", "Warlord of Glory", "Victor of the Colosseum", "Lord of Triumph", "Conqueror of Realms", "Battle Champion", "Champion of Legends"]
};


function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function submitName() {
    const name = document.getElementById("nameInput").value;
    if (name) {
        const race = getRandomElement(races);

        let role;
        do {
            role = getRandomElement(roles);
        } while (
            (["Demon", "Sarkaz", "Orc"].includes(race) && ["Healer", "Paladin", "Saint"].includes(role)) ||
            (role === "Blacksmith" && race !== "Dwarf")
        );


        document.getElementById("inputForm").style.display = "none";

        const strength = getRandomNumber(1, 100);
        const health = getRandomNumber(25, 100);
        const mana = getRandomNumber(1, 100);
        const agi = getRandomNumber(1, 100);
        const lev = getRandomNumber(1, 100);
        const guild = getRandomElement(guilds);
        const ra = getRandomElement(ranks);
        const region = getRandomElement(regions);
        const characterSkills = [];
        const numberOfSkills = getRandomNumber(3, 5);

        const skillList = document.getElementById("charSkill");
        skillList.innerHTML = "";

        const availableSkills = roleSkills[role];

        for (let i = 0; i < numberOfSkills; i++) {
            const skill = getRandomElement(availableSkills);
            const rank = getRandomElement(ranks);
            if (!characterSkills.includes(skill)) {
                // characterSkills.push(${skill} (Rank ${rank}));
                characterSkills.push({
                    skill: skill,
                    rank: rank
                })
            }

            const listItem = document.createElement("li");
            listItem.textContent = `${skill} (Rank ${rank})`;
            skillList.appendChild(listItem);
        }

        const titlesCount = getRandomNumber(1, 2);
        const titleList = document.getElementById("charTitle");
        titleList.innerHTML = "";

        const availableTitles = titles[role];


        for (let i = 0; i < titlesCount; i++) {
            const title = getRandomElement(availableTitles);
            const titleRank = getRandomElement(ranks);
            const listItem = document.createElement("li");
            listItem.textContent = `${title} (Rank ${titleRank})`;
            titleList.appendChild(listItem);
        }

        document.getElementById("charName").textContent = name;
        document.getElementById("charAgi").textContent = agi;
        document.getElementById("charLev").textContent = lev;
        document.getElementById("charRole").textContent = role;
        document.getElementById("charRace").textContent = race;
        document.getElementById("charStrength").textContent = strength;
        document.getElementById("charHealth").textContent = health;
        document.getElementById("charMana").textContent = mana;
        // document.getElementById("charRank").textContent = ra;
        document.getElementById("charGuild").textContent = guild;
        document.getElementById("charRegion").textContent = region;

        if (["Healer", "Paladin", "Saint"].includes(role)) {
            const divinePower = getRandomNumber(50, 100);
            document.getElementById("charDivinePower").textContent = divinePower;
            document.getElementById("divinePower").style.display = "block";
        }

        if (["Necromancer", "Unknown", "Death Knight", "Demon King"].includes(role) || race === "Demon") {
            const darkEnergy = getRandomNumber(50, 100);
            document.getElementById("charDarkEnergy").textContent = darkEnergy;
            document.getElementById("darkEnergy").style.display = "block";
        }

        document.getElementById("characterDisplay").style.display = "block";
    } else {
        alert("Please enter a name.");
    }
}
