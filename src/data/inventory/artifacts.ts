/** Grammar fragments used to procedurally generate artifact names and descriptions. */
export const ARTIFACT_GRAMMAR = {
    PREFIXES: [
        // Occupations and Titles
        "King's", "Baron's", "Knight's", "Executioner's", "Gravedigger's",
        "Inquisitor's", "Mercenary's", "Plague-Bearer's", "Cultist's", "Martyr's",
        "Tormentor's", "Beggar's", "Assassin's", "Smuggler's", "Leper's",
        "Heretic's", "Deserter's", "Blacksmith's", "Tomb-Robber's", "Widow's",
        "Headsman's", "Jailer's", "Poacher's", "Scavenger's", "Madman's",
        "Warden's", "Hangman's", "Butcher's", "Surgeon's", "Priest's",
        "Admiral's", "Chieftain's", "Hermit's", "Prophet's", "Slave's",
        "Despot's", "Wraith's", "Revenant's", "Lich's", "Dread-Lord's",
        
        // Adjectives and Conditions
        "Blood-Soaked", "Rusted", "Defiled", "Cursed", "Forgotten",
        "Shattered", "Weeping", "Corrupted", "Desecrated", "Moth-Eaten",
        "Tarnished", "Ash-Covered", "Splintered", "Blunted", "Scarred",
        "Flayed", "Torn", "Rot-Blighted", "Withered", "Charred",
        "Diseased", "Mutilated", "Forsaken", "Damned", "Condemned",
        "Sundered", "Hollow", "Petrified", "Molten", "Frozen",
        "Venomous", "Fetid", "Profane", "Unbound", "Entombed",
        "Relentless", "Merciless", "Unforgiving", "Starving", "Drowning",
        
        // Nouns and Elements
        "Abyssal", "Iron", "Bone", "Flesh", "Steel",
        "Grave", "Swamp", "Bog", "Ash", "Soot",
        "Blood", "Tear", "Blight", "Plague", "Rot",
        "Crypt", "Tomb", "Pyre", "Gallows", "Slaughter",
        "Dire", "Grim", "Savage", "Cruel", "Malicious",
        "Obsidian", "Void", "Shadow", "Storm", "Thorn",
        "Ember", "Frost", "Venom", "Carrion", "Worm"
    ],
    
    SUFFIXES: [
        // Actions and Doers
        "Bane", "Cleaver", "Slayer", "Breaker", "Drinker",
        "Eater", "Tearer", "Render", "Flayer", "Reaper",
        "Crusher", "Smiter", "Mangler", "Torturer", "Butcher",
        "Gouger", "Thief", "Taker", "Devourer", "Hunter",
        "Seeker", "Warden", "Keeper", "Stalker", "Ravager",
        "Strangler", "Piercer", "Severer", "Harvester", "Corruptor",
        "Defiler", "Subjugator", "Condemner", "Executioner", "Desecrator",
        
        // Concepts and Emotions
        "Sorrow", "Lament", "Regret", "Despair", "Misery",
        "Torment", "Agony", "Malice", "Spite", "Wrath",
        "Fury", "Vengeance", "Ruin", "Downfall", "Blight",
        "Curse", "Oath", "Treason", "Betrayal", "Guilt",
        "Silence", "Madness", "Doom", "Burdens", "Penance",
        "Oblivion", "Desolation", "Entropy", "Perdition", "Requiem",
        "Judgment", "Anathema", "Dominion", "Subjugation", "Absolution",
        
        // Parts and Objects
        "Spine", "Skull", "Nail", "Tooth", "Fang",
        "Claw", "Heart", "Eye", "Tongue", "Bone",
        "Blood", "Vein", "Talon", "Horn", "Gut",
        "Marrow", "Skin", "Crown", "Ashes", "Dust",
        "Splinter", "Shard", "Fragment", "Relic", "Chain",
        "Sigil", "Brand", "Seal", "Knot", "Effigy"
    ],

    /** Weapon base-types for artifact name generation (e.g. "King's [WEAPON_TYPE] of Sorrow"). */
    WEAPON_TYPES: [
        "Sword", "Blade", "Dagger", "Axe", "Mace", "Hammer",
        "Spear", "Glaive", "Halberd", "Pike", "Staff", "Wand",
        "Bow", "Crossbow", "Flail", "Cleaver", "Saber", "Scythe",
        "Trident", "Greatsword", "Claymore", "Falchion", "Rapier", "Dirk"
    ],

    /** Armor base-types for artifact name generation (e.g. "Cursed [ARMOR_TYPE] of Wrath"). */
    ARMOR_TYPES: [
        "Helm", "Crown", "Hood", "Plate", "Mail", "Cuirass",
        "Breastplate", "Gauntlets", "Greaves", "Boots", "Shield",
        "Buckler", "Pauldrons", "Vambraces", "Coif", "Mantle",
        "Cloak", "Robe", "Girdle", "Sabatons", "Bracers", "Gorget"
    ],

    /** Accessory base-types for artifact name generation. */
    ACCESSORY_TYPES: [
        "Ring", "Amulet", "Pendant", "Talisman", "Torc",
        "Brooch", "Circlet", "Earring", "Signet", "Choker",
        "Fetish", "Relic", "Medallion", "Charm", "Phylactery"
    ],

    /** Epithets appended with 'the' (e.g. "Blade of the Forgotten King"). */
    EPITHETS: [
        "Forgotten King", "Drowned Prophet", "Flayed Saint",
        "Burned Village", "Sunken Empire", "Silent War",
        "Rotting Throne", "Starving Court", "Blinded Oracle",
        "Severed Hand", "Shattered Gate", "Ashen Dawn",
        "Hollow Crown", "Final Breath", "Screaming Void",
        "Bleeding Moon", "Iron Maiden", "Plague Wind",
        "Endless Siege", "Fallen Crusade", "Frozen March",
        "Dead Parley", "Black Tribunal", "Lost Expedition",
        "Weeping God", "Broken Oath", "Eternal Pyre",
        "Unmarked Grave", "Hanged Parliament", "Defiled Altar"
    ],

    /** Name patterns — pick one and fill slots from the above pools. */
    NAME_PATTERNS: [
        "{PREFIX} {WEAPON_TYPE}",
        "{PREFIX} {ARMOR_TYPE}",
        "{PREFIX} {ACCESSORY_TYPE}",
        "{WEAPON_TYPE} of {SUFFIX}",
        "{ARMOR_TYPE} of {SUFFIX}",
        "{PREFIX} {WEAPON_TYPE} of {SUFFIX}",
        "{PREFIX} {ARMOR_TYPE} of {SUFFIX}",
        "{WEAPON_TYPE} of the {EPITHET}",
        "{ARMOR_TYPE} of the {EPITHET}",
        "{PREFIX} {ACCESSORY_TYPE} of {SUFFIX}",
        "The {PREFIX} {SUFFIX}"
    ],
    
    QUOTES: [
        "Forged in the dying embers of a burned village.",
        "The iron is deeply pitted by decades of acidic monster blood.",
        "Still bears the dried, black gore of its previous, unfortunate owner.",
        "Smells unmistakably of an open mass grave after a heavy rain.",
        "A crude weapon born of absolute, starving desperation.",
        "The handle is wrapped in supple leather that feels entirely too human.",
        "Heavy, unbalanced, and designed purely to inflict maximum physical agony.",
        "It hums with a sickly, nauseating vibration when drawn from its scabbard.",
        "The blade weeps a dark, rust-colored sap when exposed to the cold.",
        "Stolen from the lightless crypt of a disgraced and forgotten templar.",
        "Carries the unmistakable, clinging scent of burning flesh and cheap pitch.",
        "Said to have hung from the royal gallows alongside a headless mad king.",
        "Bears deep, frantic scratch marks from someone trying to escape it.",
        "The leather grip is worn smooth by centuries of terrified sweat.",
        "A heretic's tool, completely outlawed by the ruling Inquisition.",
        "So unnaturally heavy it frequently cracks the cobblestones when dropped.",
        "The edges are violently jagged, guaranteeing a severely infected fatal wound.",
        "Wielded in a brutal mud-trench massacre that no history book dared to record.",
        "Constantly freezing to the touch, rapidly chilling the immediate air around it.",
        "Inscribed with frantic, completely illegible prayers for a swift death.",
        "The pommel houses a single, yellowed molar rattling inside a hollow cavity.",
        "Found gripped so tightly in skeletal hands that the fingers had to be shattered.",
        "A merchant's cursed prize, sold thrice because its owners keep turning up dead.",
        "Used extensively in the brutal, freezing trenches of the northern siege.",
        "The metal creaks ominously under stress, sounding exactly like a dying man's rattle.",
        "Covered in a thick layer of greasy soot that simply cannot be scrubbed away.",
        "A makeshift implement that has killed far more men than any castle-forged sword.",
        "Smells faintly of spoiled communion wine and intense, primal fear.",
        "The original maker's mark has been violently hammered flat with a chisel.",
        "It feels perfectly balanced, as if it recognizes your intent to commit murder.",
        "Dug out of a muddy battlefield, completely bypassing the looters' notice.",
        "Often vibrates softly when another living creature is bleeding nearby.",
        "Crafted by a blacksmith who went completely mad shortly after its completion.",
        "Wrapped securely in chains to prevent it from rattling in the dead of night.",
        "The grip is sticky with old pitch to ensure a firm grasp when drenched in gore.",
        "Recovered from the stomach of a sea-drake that swallowed a warship whole.",
        "Its previous owner was found flayed and nailed to a cathedral door.",
        "The enchantment was originally protective, but something inverted it centuries ago.",
        "Radiates a dull warmth that intensifies near sites of historical atrocity.",
        "The steel has been folded so many times it contains visible, ghostly ripple-patterns.",
        "Causes candle flames to bend toward it when brought into an enclosed space.",
        "The weight shifts subtly in the hand, as if something inside is slowly breathing.",
        "A veteran of seven wars, each one inscribed in increasingly desperate handwriting.",
        "The leather wrapping was soaked in the blood of a willing sacrifice, not a victim.",
        "Pulses with a faint heartbeat that quickens when the wielder is in mortal danger.",
        "Found in a lead-lined chest with explicit instructions never to open it.",
        "The cross-guard is deliberately shaped like a screaming human face.",
        "Condensation forms on the blade in the presence of lies and deception.",
        "Leaves a faint afterimage when swung, visible only in peripheral vision.",
        "The maker deliberately broke their hands after completing it, refusing all future work."
    ]
};
