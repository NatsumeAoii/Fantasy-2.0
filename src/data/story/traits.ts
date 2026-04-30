/**
 * Personality and stat-derived trait pools used by the backstory generator.
 * Maps numerical stats and categorical data to narrative descriptors.
 */
// Trait pools keyed by stat name, race, or role.
// Engine picks 3-5 traits from matching pools.

export const STAT_TRAITS: Record<string, string[]> = {
    strength: [
        'Iron-Fisted', 'Relentless', 'Brutish', 'Unyielding', 'Titan-Born', 'Bone-Breaker',
        'Muscle-Bound', 'Crushing', 'Powerhouse', 'Sinewy', 'Heavy-Handed', 'Immovable',
        'Force of Nature', 'Shatter-Proof', 'Mighty', 'Brawny', 'Herculean', 'Stout',
        'Ox-Strong', 'Thunderous', 'Vigorous', 'Raw Power'
    ],
    agility: [
        'Fleet-Footed', 'Nimble', 'Ghost-Step', 'Wind-Touched', 'Acrobatic', 'Quicksilver',
        'Graceful', 'Elusive', 'Litithe', 'Cat-Like', 'Swift-Striker', 'Untouchable',
        'Fluid', 'Lightning-Fast', 'Shadow-Dancer', 'Sure-Zfooted', 'Spring-Heeled',
        'Blur', 'Feather-Step', 'Reflexive', 'Dancer'
    ],
    dexterity: [
        'Precise', 'Sure-Handed', 'Blade-Dancer', 'Needle-Sharp', 'Ambidextrous', 'Artisan Fingers',
        'Deft', 'Steady-Handed', 'Surgical', 'Masterful', 'Finesse', 'Dead-Eye',
        'Sleight-of-Hand', 'Clockwork-Precision', 'Elegant', 'Skillful', 'Nimble-Fingered',
        'Marksman', 'Virtuoso', 'Craftsman', 'Flawless'
    ],
    endurance: [
        'Unbreakable', 'Tireless', 'Stone-Willed', 'Inexhaustible', 'Iron-Lung', 'Marathon Runner',
        'Indefatigable', 'Rugged', 'Hardy', 'Resilient', 'Pain-Averse', 'Long-Lived',
        'Survivor', 'Unflagging', 'Sturdy', 'Boundless Energy', 'Grit', 'Tenacious',
        'Everlasting', 'Stamina-King', 'Vital', 'Durable'
    ],
    intelligence: [
        'Sharp-Minded', 'Analytical', 'Cunning', 'Bookworm', 'Strategist', 'Quick-Witted',
        'Genius', 'Scholar', 'Logical', 'Brilliant', 'Calculating', 'Mastermind',
        'Encyclopedic', 'Inventive', 'Rational', 'Tactician', 'Deep-Thinker',
        'Learned', 'Astute', 'Visionary', 'Brainy', 'Mentalist'
    ],
    wisdom: [
        'Sage-Like', 'Far-Seeing', 'Contemplative', 'Perceptive', 'Old Soul', 'Patient',
        'Enlightened', 'Intuitive', 'Spiritual', 'Serene', 'Guide', 'Experienced',
        'Prophetic', 'Insightful', 'Calm', 'Balanced', 'Meditative', 'Ancient',
        'Knowing', 'Philosopher', 'Mystic', 'Oracle'
    ],
    charisma: [
        'Silver-Tongued', 'Magnetic', 'Inspiring', 'Charming', 'Natural Leader', 'Persuasive',
        'Enchanting', 'Commanding', 'Diplomatic', 'Regal', 'Smooth', 'Captivating',
        'Orator', 'Famous', 'Beloved', 'Authority', 'Socialite', 'Hypnotic',
        'Dashing', 'Eloquent', 'Radiant', 'Influential'
    ],
    luck: [
        'Fortune-Kissed', 'Lucky Devil', 'Star-Blessed', 'Improbable', 'Serendipitous', 'Charmed',
        'Fate-Weaver', 'Gambler', 'Miraculous', 'Coin-Finder', 'Destiny\'s Favorite',
        'Accidental Hero', 'Golden-Touch', 'Blessed', 'Unsinkable', 'Survivor',
        'Wildcard', 'Propitious', 'Fortunate', 'Karmic', 'Blessed-Path'
    ],
    perception: [
        'Eagle-Eyed', 'Vigilant', 'Alert', 'Sixth Sense', 'Nothing Escapes Them', 'Keen Observer',
        'Watchful', 'Detective', 'All-Seeing', 'Sharp-Eyed', 'Investigative', 'Scout',
        'Aware', 'Detail-Oriented', 'Sentinels-Gaze', 'Hawk-Vision', 'Unmissable',
        'Tracker', 'Hunter\'s Eye', 'Observant', 'Focus'
    ],
    stealth: [
        'Shadow-Born', 'Invisible', 'Silent Step', 'Phantom', 'Unseen', 'Ghost',
        'Whisper', 'Cloaked', 'Hidden', 'Assassin', 'Night-Walker', 'Wraith',
        'Vanish', 'Covert', 'Secretive', 'Camouflaged', 'Shade', 'Silence',
        'Prowler', 'Untraceable', 'Mist-Form'
    ],
};

export const RACE_TRAITS: Record<string, string[]> = {
    'Human': [
        'Adaptable', 'Ambitious', 'Resourceful', 'Versatile', 'Determined', 'Tenacious',
        'Diplomatic', 'Innovator', 'Perseverant', 'Jack-of-All-Trades', 'Resilient',
        'Socialite', 'Trader', 'Politician', 'Builder', 'Expeditionary', 'Hopeful',
        'Mundane-Hero', 'Community-Bound', 'Legacy-Driven', 'History-Maker',
        'Flexible', 'Diplomat', 'Wanderlust', 'Kingdom-Builder'
    ],
    'High Elf': [
        'Ancient Grace', 'Arcane-Blooded', 'Ethereal', 'Haughty', 'Long-Lived',
        'Scholar of Ages', 'Magic-Weaver', 'Starlight-Eyes', 'Elegant', 'Perfectionist',
        'Sylvan-Noble', 'Crystal-Heart', 'Timeless', 'Mystic', 'High-born',
        'Mana-Touched', 'Celestial-Bond', 'Runekeeper', 'Gilded', 'Superior',
        'Artistic', 'Meditative', 'Sun-Kissed', 'Lore-Master', 'Spell-Bound'
    ],
    'Wood Elf': [
        'Nature-Bonded', 'Forest-Born', 'Wild-Hearted', 'Tree-Singer', 'Leaf-Walker',
        'Hunter', 'Camouflaged', 'Introvert', 'Animal-Friend', 'Sharp-Shooter',
        'Canopy-Dweller', 'Root-Bound', 'Green-Thumb', 'Silent-Stalker', 'Feral-Grace',
        'Vine-Armored', 'Moon-Hunter', 'Owl-Eyed', 'Scout', 'Pathfinder',
        'Vigilant', 'Wildering', 'Agile', 'Floramancer', 'Guardian of the Grove'
    ],
    'Shadow Elf': [
        'Dusk-Kissed', 'Penumbral', 'Night-Stalker', 'Cursed-Blood', 'Underdark-Born',
        'Spider-Friend', 'Venomous', 'Silent', 'Assassin-Trained', 'Nocturnal',
        'Light-Sensitive', 'Subterranean', 'Web-Spinner', 'Ruthless', 'Calculating',
        'Shadow-Dancer', 'Eclipse-Bound', 'Dark-Visionary', 'Void-Walker', 'Obsidian-Heart',
        'Secret-Keeper', 'Exile', 'Blade-Master', 'Poison-Ivy', 'Umbral'
    ],
    'Dwarf': [
        'Stubborn', 'Stone-Hearted', 'Mountain-Forged', 'Ale-Lover', 'Gold-Seeker',
        'Craftsman', 'Stout', 'Iron-Willed', 'Gruff', 'Traditionalist',
        'Bearded', 'Miner', 'Gem-Eye', 'Forge-Bound', 'Rune-Smith',
        'Tunnel-Rat', 'Heavy-Drinker', 'Loyal', 'Grudge-Bearer', 'Strong-Back',
        'Earth-Bound', 'Architect', 'History-Keeper', 'Warrior-Poet', 'Honor-Bound'
    ],
    'Half-Orc': [
        'Battle-Bred', 'Fierce', 'Thick-Skinned', 'Outcast', 'Survivor',
        'Warrior-Spirit', 'Intimidating', 'Brutal-Efficiency', 'Scarred', 'Conflict-Born',
        'Strong-Blooded', 'Unstoppable-Force', 'Savage-Grace', 'Tribal', 'Dual-Heritage',
        'Gladiator', 'Meat-Shield', 'Fearless', 'Breaker of Chains', 'Rebel',
        'Warlord-Blood', 'Unstoppable', 'Mighty', 'Brawler', 'Iron-Jaw'
    ],
    'Half-Dragon': [
        'Dragonblood', 'Scale-Touched', 'Fire-Veined', 'Breath-Weapon', 'Gold-Obsessed',
        'Arrogant', 'Ancient-Soul', 'Thermal-Resistant', 'Clawed', 'Fearsome-Glance',
        'Dominant', 'Greedy', 'Noble-Monster', 'Sky-Dreamer', 'Elementalist',
        'Draconic-Roar', 'Treasure-Hunter', 'Wingless-Drake', 'Scale-Armored', 'Wyrm-Kin',
        'Imperious', 'Hot-Blooded', 'Legendary-Lineage', 'Power-Hungry', 'Majestic'
    ],
    'Half-Gnome': [
        'Tinkerer', 'Curious Mind', 'Gadgeteer', 'Small-Statured', 'Clockwork-Soul',
        'Quick-Thinking', 'Eccentric', 'Mechanic', 'Puzzler', 'Toy-Maker',
        'Hybrid-Ingenuity', 'Nimble-Fingered', 'Explosive-Expert', 'Detail-Oriented', 'Whimsical',
        'Gear-Head', 'Inventor', 'Short-Fuse', 'Resourceful', 'Crafty',
        'Techno-Mage', 'Problem-Solver', 'Analytical', 'Busy-Body', 'Precise'
    ],
    'Gnome': [
        'Inventive', 'Meticulous', 'Eccentric', 'Illusionist', 'Burrower',
        'Gem-Cutter', 'Prankster', 'Nature-Friend', 'Underestimated', 'Brilliant',
        'Absent-Minded', 'Fast-Talker', 'Hidden-Eye', 'Garden-Guardian', 'Fingle-Fangled',
        'Technomancer', 'Alchemist', 'Curiosity-Killed-The-Cat', 'Knowledge-Seeker', 'Tiny-Titan',
        'Squeaky', 'Optimistic', 'Puzzle-Master', 'Trap-Setter', 'Secret-Keeper'
    ],
    'Halfling': [
        'Plucky', 'Light-Footed', 'Brave-Hearted', 'Comfort-Seeker', 'Second-Breakfast',
        'Unnoticed', 'Fortunate-Son', 'Community-Pillar', 'Hospitality', 'Storyteller',
        'Hearth-Guardian', 'Farm-Boy', 'Simple-Life', 'Courageous', 'Pint-Sized',
        'Nimble', 'Optimist', 'Friend-Maker', 'Recipe-Keeper', 'Bare-Foot',
        'Stealthy', 'Loyal-Companion', 'Home-Body', 'Adventurous-Spirit', 'Luck-Bringer'
    ],
    'Goblin': [
        'Scrappy', 'Opportunistic', 'Wily', 'Fire-Lover', 'Trash-Treasure',
        'Pack-Rat', 'Cowardly-Clever', 'Explosive', 'Underdog', 'Survivable',
        'Maniacal', 'Short-Tempered', 'Quick-Escape', 'Looter', 'Chaos-Agent',
        'Shinies-Seeker', 'Bug-Eater', 'Tunnel-Runner', 'Sneaky', 'Horde-Mind',
        'Anarchist', 'Pyromaniac', 'Scavenger', 'Tooth-Collector', 'Wild-Card'
    ],
    'Hobgoblin': [
        'Disciplined', 'Militant', 'Iron-Willed', 'Strategic', 'Cruel',
        'Organized', 'Soldier-Born', 'Rank-Respecting', 'Martial', 'Conqueror',
        'Tactical', 'Armor-Clad', 'Regimented', 'Fear-Monger', 'Commander',
        'War-Bred', 'Stoic', 'Efficient', 'Ruthless-Leader', 'Honor-In-War',
        'Defensive', 'Phalanx-Master', 'Calculating', 'Dominator', 'Legionnaire'
    ],
    'Kobold': [
        'Trap-Maker', 'Resourceful', 'Cunning', 'Dragon-Servant', 'Tunnel-Digger',
        'Pack-Hunter', 'Shiny-Seeker', 'Scaly', 'Coward-Hero', 'Gadget-User',
        'Quick-Scuttle', 'Miner', 'Candle-Keeper', 'Swarm-Fighter', 'Underfoot',
        'Ambush-Expert', 'Loyal-Minion', 'Gold-Sniffer', 'Cave-Dweller', 'Small-Target',
        'Trap-Master', 'Sneak-Thief', 'Dragon-Worshipper', 'Skirmisher', 'Survivor'
    ],
    'Troll': [
        'Regenerative', 'Fearsome', 'Thick-Blooded', 'Bridge-Keeper', 'Carnivorous',
        'Voodoo-User', 'Primitives', 'Hulking', 'Unkillable', 'Beserker',
        'Forest-Stalker', 'Club-Wielder', 'Witch-Doctor', 'Scarred', 'Wild-Regeneration',
        'Instinctual', 'Territorial', 'Giant-Kin', 'Rock-Thrower', 'Savage',
        'Bad-Hygiene', 'Hungry', 'Relentless-Healer', 'Monstrous', 'Tusks'
    ],
    'Giant': [
        'Colossal', 'Earth-Shaker', 'Towering', 'Slow-Thinking', 'Crushing',
        'Cloud-Brusher', 'Mountain-Mover', 'Thunder-Step', 'Feared', 'Ancient',
        'Boulder-Tosser', 'Sky-High', 'Immovable-Object', 'Simple-Minded', 'Destructive',
        'Titan-Progeny', 'Storm-Caller', 'Frost-Born', 'Fire-Blooded', 'Hill-Strider',
        'Mighty-Swing', 'Terrifying-Presence', 'Loud-Voice', 'Big-Eater', 'World-Walker'
    ],
    'Ogre': [
        'Brute', 'Dim-Witted', 'Crushing Force', 'Bone-Gnawer', 'Club-Master',
        'Layers', 'Swamp-Smasher', 'Intimidating', 'Short-Fuse', 'Glutton',
        'Dumb-Luck', 'Heavy-Hitter', 'Bully', 'Mercenary', 'Smasher',
        'Rock-Skull', 'Ugly', 'Feared', 'Bone-Cruncher', 'Simple-Pleasures',
        'Loud-Belly', 'Violent', 'Muscle-Brain', 'Tough-Hide', 'Unstoppable-Force'
    ],
    'Fairy': [
        'Whimsical', 'Ethereal', 'Mischievous', 'Tiny', 'Winged',
        'Sparkling', 'Nature-Magic', 'Prank-Lover', 'Light-Bringer', 'Flower-Child',
        'Unseen', 'Playful', 'Vengeful-Small', 'Dust-Spreader', 'Glowing',
        'Forest-Spirit', 'Immortal-Youth', 'Prank-Master', 'Flighty', 'Magical',
        'Dream-Weaver', 'Illusionist', 'Flower-Crowned', 'Giggly', 'Nature-Avatar'
    ],
    'Fae': [
        'Otherworldly', 'Enchanting', 'Mercurial', 'Courtly', 'Deceptive',
        'Timeless', 'Glamour-Weaver', 'Deal-Maker', 'Word-Twister', 'Beautiful-Terror',
        'Mystical', 'Chaotic', 'Nature-Lord', 'Capricious', 'Unearthly',
        'Magic-Addict', 'Soul-Trader', 'Twilight-Walker', 'Seelie/Unseelie', 'Fickle',
        'Rules-Lawyer', 'Ancient-Child', 'Star-Eyed', 'Realm-Walker', 'Eons-Old'
    ],
    'Pixie': [
        'Tiny Terror', 'Sparkling', 'Mischief-Maker', 'High-Energy', 'Inquisitive',
        'Sugar-Rusher', 'Dust-Maker', 'Invisible-Thief', 'Annoying', 'Adorable',
        'Speedster', 'Shiny-Lover', 'Prank-God', 'Forest-Gnat', 'Light-Speed',
        'Glow-Worm', 'Hide-and-Seek', 'Flower-Sleeper', 'Nectar-Drinker', 'Bug-Rider',
        'Zip-Zap', 'Miniature', 'Chaos-Spark', 'Fairy-Dust', 'Zoomies'
    ],
    'Satyr': [
        'Revelrous', 'Hedonistic', 'Free-Spirited', 'Musical', 'Horned',
        'Nature-Lover', 'Party-Animal', 'Wine-Drinker', 'Dancer', 'Flute-Player',
        'Chaotic-Good', 'Wild-Man', 'Forest-Runner', 'Goat-Legged', 'Merry-Maker',
        'Trouble-Finder', 'Primal-Joy', 'Untamed', 'Seductive', 'Merry-Deceiver',
        'Spring-Stepper', 'Woodland-Prince', 'Fey-Touched', 'Laughing', 'Pan-Follower'
    ],
    'Faun': [
        'Gentle', 'Pastoral', 'Nature-Bound', 'Shy', 'Music-Lover',
        'Forest-Guide', 'Peaceful', 'Herbivore', 'Protector', 'Innocent',
        'Deer-Like', 'Silent-Walker', 'Grove-Keeper', 'Animal-Talker', 'Wise-Fool',
        'Soft-Step', 'Wild-Wisdom', 'Curious', 'Fleet-Footed', 'Harmony-Seeker',
        'Wood-Spirit', 'Hidden', 'Dreamy', 'Naturalist', 'Pacifist'
    ],
    'Dragonkin': [
        'Proud', 'Ancient Blood', 'Flame-Touched', 'Scale-Bound', 'Hoarder',
        'Element-Born', 'Regal', 'Fearsome', 'Power-Seeker', 'Dominator',
        'Breath-User', 'Winged-Humanoid', 'Noble', 'Apex-Predator', 'Draconic-Magic',
        'Long-Memory', 'Treasure-Guardian', 'Territorial', 'Mighty', 'Legend-Keeper',
        'Wyrm-Soul', 'Fire-Heart', 'Gold-Eye', 'Imperious', 'Ascended'
    ],
    'Wyvernfolk': [
        'Sky-Born', 'Predatory', 'Wind-Rider', 'Poison-Tail', 'Feral',
        'Hunter', 'Screeching', 'Mountain-Dweller', 'Winged', 'Stinger',
        'Savage', 'Beastly', 'Storm-Chaser', 'Aggressive', 'Pack-Hunter',
        'Meat-Eater', 'Aerial-Ace', 'Diving-Strike', 'Untamable', 'Sharp-Clawed',
        'Wind-Caller', 'Roost-Defender', 'Swift', 'Deadly', 'Sky-Hunter'
    ],
    'Werewolf': [
        'Moon-Cursed', 'Feral', 'Dual-Natured', 'Shape-Shifter', 'Beast-Within',
        'Pack-Alpha', 'Hunter', 'Night-Howler', 'Silver-Averse', 'Savage-Strength',
        'Wild-Senses', 'Predator', 'Uncontrollable', 'Cursed', 'Hair-Trigger',
        'Blood-Thirsty', 'Forest-Runner', 'Transformative', 'Inner-Demon', 'Wolf-Kin',
        'Tracker', 'Survivor', 'Moon-Child', 'Carnivore', 'Restless'
    ],
    'Lupine': [
        'Pack-Minded', 'Loyal', 'Wild', 'Honorable-Hunter', 'Team-Player',
        'Protective', 'Territorial', 'Enhanced-Senses', 'Wolf-Spirit', 'Tracker',
        'Scout', 'Pack-Leader', 'Community-Focus', 'Howler', 'Fierce-Friend',
        'Alpha-Mentality', 'Guardian', 'Nature-Warrior', 'Instinct-Driven', 'Fast-Runner',
        'Enduring', 'Tactical-Pack', 'Noble-Beast', 'Fur-Clad', 'Wild-Heart'
    ],
    'Tiefling': [
        'Hellborn', 'Sinister Grace', 'Infernal Heritage', 'Horned', 'Tail-User',
        'Fire-Resistant', 'Charismatic', 'Schemer', 'Dark-Legacy', 'Misunderstood',
        'Cunning', 'Diabolic', 'Contract-Maker', 'Silver-Tongued', 'Shadow-Caster',
        'Outsider', 'Rebellious', 'Fiendish', 'Beguiling', 'Destiny-Bound',
        'Chaotic', 'Seductive', 'Dark-Vision', 'Infernal-Power', 'Rogue-Vibes'
    ],
    'Aasimar': [
        'Divine-Touched', 'Radiant', 'Blessed', 'Halo-Bearer', 'Healing-Hands',
        'Righteous', 'Celestial-Guide', 'Chosen-One', 'Otherworldly-Beauty', 'Pure-Heart',
        'Light-Wielder', 'Destiny-Driven', 'Prophetic', 'Guardian-Angel', 'Incorruptible',
        'Winged-Light', 'Holy-Warrior', 'Serene', 'Judge', 'Merciful',
        'Glowing', 'Divine-Mission', 'Sacred', 'Hope-Bringer', 'Celestial-Blood'
    ],
    'Nephilim': [
        'Half-Divine', 'Imposing', 'Celestial Fury', 'Giant-Kin', 'Ancient-Power',
        'Forbidden-Birth', 'Demigod', 'War-Machine', 'Feared-Holly', 'Titan-Strength',
        'Judgment-Bringer', 'Lost-Lineage', 'Overpowered', 'Legendary', 'Mythic',
        'Sky-Breaker', 'Holy-Terror', 'Unearthly', 'Destined-Ruler', 'Divine-Wrath',
        'Ascendant', 'World-Walker', 'Eternal-Watcher', 'Sacred-Monster', 'Fallen-Angel-Kin'
    ],
    'Valkyrie': [
        'Battle-Maiden', 'Unwavering', 'Honorable', 'Soul-Guide', 'Winged-Warrior',
        'Chooser-of-Slain', 'Spear-Master', 'Odin-Sworn', 'Fearless', 'Divine-Messenger',
        'Shield-Maiden', 'War-Cry', 'Heavenly', 'Justice-Bringer', 'Valhalla-Bound',
        'Guardian-Spirit', 'Merciless-Judge', 'Sky-Warrior', 'Radiant-Armor', 'Death-dealer',
        'Hero-Maker', 'Resurrected', 'Eternal-Warrior', 'Flighty', 'Myth-Born'
    ],
    'Seraph': [
        'Luminous', 'Holy', 'Incorruptible', 'Six-Winged', 'Burning-Eye',
        'Voice-of-God', 'Terrifying-Beauty', 'Absolutist', 'Divine-Fire', 'Judgment',
        'Sword-of-Light', 'Ancient-Good', 'Celestial-Commander', 'Sin-Purge', 'Ever-Watching',
        'Sacred-Flame', 'Herald', 'Heaven-Sent', 'Pure-Energy', 'Fanatical',
        'Righteous-Fury', 'Beyond-Mortal', 'Song-of-Creation', 'Order-Keeper', 'Blinding'
    ],
    'Succubus': [
        'Alluring', 'Dangerous Beauty', 'Soul-Drinker', 'Seductress', 'Charm-User',
        'Life-Stealer', 'Heart-Controller', 'Diabolic-Lover', 'Dream-Invader', 'Shape-Shifter',
        'Heart-Breaker', 'Infernal-Kiss', 'Vampiric', 'Cruel', 'Desire-Demon',
        'Winged-Temptress', 'Persuasive', 'Lust-Incarnate', 'Social-Predator', 'Beguiler',
        'Chaotic-Evil-Ish', 'Deadly-Grace', 'Siren', 'Femme-Fatale', 'Soul-Bound'
    ],
    'Incubus': [
        'Seductive', 'Shadow-Charming', 'Entrancing', 'Night-Visitor', 'Dream-Weaver',
        'Soul-Thief', 'Puppet-Master', 'Dark-Lover', 'Infernal-Charisma', 'Handsome-Devil',
        'Mind-Bender', 'Phantom-Lover', 'Desire-Feeder', 'Charming-Villain', 'Smooth-Operator',
        'Emotional-Vampire', 'Nightmare-Prince', 'Beguiling', 'Persuasive', 'Forbidden',
        'Secret-Keeper', 'Shadow-Walker', 'Heart-Stealer', 'Wicked', 'Cursed-Touch'
    ],
    'Oni': [
        'Demonic Might', 'Masked', 'Wrathful', 'Ogre-Mage', 'Club-Master',
        'Honor-Bound-Demon', 'Storm-Caller', 'Man-Eater', 'Terrifying', 'Yōkai',
        'Red-Skinned', 'Mountain-Demon', 'Guardian-Demon', 'Punisher', 'Savage-Magic',
        'Iron-Skin', 'Horned-Terror', 'Gate-Keeper', 'Mythic-Strength', 'Thunder-Drum',
        'Cruel-Justice', 'Ancient-Evil', 'Warrior-Demon', 'Indomitable', 'Cursed-Mask'
    ],
    'Imp': [
        'Devilish', 'Scheming', 'Miniature Menace', 'Familiar', 'Prankster',
        'Fire-Starter', 'Cowardly', 'Servant', 'Chaos-Seed', 'Invisible',
        'Spy', 'Trickster', 'Annoying', 'Soul-Broker', 'Messenger',
        'Winged-Rat', 'Infernal-Pet', 'Whisperer', 'Trouble-Maker', 'Sneaky',
        'Magic-Resistant', 'Tiny-Evil', 'Contract-Bound', 'Laughing-Demon', 'Pest'
    ],
    'Cambion': [
        'Half-Fiend', 'Conflicted', 'Dark Prodigy', 'Heir-to-Hell', 'Shadow-Touched',
        'Ambitions', 'Charming-Evil', 'Cursed-Bloodline', 'Magic-Gifted', 'Social-Outcast',
        'Hidden-Horns', 'Plotter', 'Dark-Prince/ss', 'Soul-Eater', 'Infernal-Power',
        'Rejected', 'Power-Seeker', 'Twisted-Destiny', 'Rogue-Mage', 'Dual-Nature',
        'Sin-Eater', 'Hell-Bent', 'Diabolic', 'Cunning', 'Survivor'
    ],
    'Changeling': [
        'Shapeshifter', 'Identity-less', 'Chameleon', 'Face-Stealer', 'Spy',
        'Actor', 'Paranoid', 'Fluid', 'Adaptable', 'Secret-Life',
        'Mimic', 'Doppelganger', 'Infiltrator', 'Faceless', 'Unassuming',
        'Deceiver', 'Hidden-In-Plain-Sight', 'Mirror-Soul', 'Unknown', 'Stranger',
        'Mask-Wearer', 'Lost-Self', 'Ever-Changing', 'Imposter', 'Ghost-Person'
    ],
    'Lizardfolk': [
        'Cold-Blooded', 'Primal', 'Scaled', 'Swamp-Dweller', 'Hunter',
        'Survivor', 'Tribal', 'Emotionless', 'Practical', 'Scavenger',
        'Water-Breather', 'Territorial', 'Spear-Fisher', 'Sun-Bather', 'Ancient-Instinct',
        'Bone-Crafter', 'Alien-Mind', 'Patient', 'Natural-Armor', 'Carnivore',
        'Ritualistic', 'Silent-Swimmer', 'Swamp-King', 'Reptilian', 'Hard-Target'
    ],
    'Minotaur': [
        'Labyrinthine Mind', 'Horn-Crowned', 'Unstoppable', 'Maze-Keeper', 'Bull-Headed',
        'Charger', 'Mighty', 'Navigation-Master', 'Guardian', 'Berserker',
        'Honorable', 'Cursed-Form', 'Warrior', 'Heavy-Weapon', 'Intimidating',
        'Lost', 'Determined', 'Strong-Man', 'Mythic-Beast', 'Arena-Champion',
        'Savage', 'Protector', 'Goring-Charge', 'Stoic', 'Powerful'
    ],
    default: [
        'Resolute', 'Determined', 'Survivor', 'Wanderer', 'Hopeful',
        'Strong', 'Brave', 'Curious', 'Independent', 'Loyal',
        'Friendly', 'Quiet', 'Active', 'Observant', 'Careful',
        'Reckless', 'Kind', 'Stern', 'Funny', 'Serious',
        'Common', 'Ordinary', 'Heroic', 'Villainous', 'Legendary'
    ],
};

export const ROLE_TRAITS: Record<string, string[]> = {
    default: [
        'Battle-Hardened', 'Fearless', 'Seasoned', 'Veteran', 'Tactical',
        'Oath-Keeper', 'Mercenary', 'Warlord-Eye', 'Strategist', 'Commander',
        'Frontline-Fighter', 'Supportive', 'Guardian', 'Aggressive', 'Defender',
        'Skirmisher', 'Duelist', 'Brawler', 'Marksman', 'Spell-Touched',
        'Wild-Magic', 'Divine-Favor', 'Cursed-Blade', 'Shadow-Walker', 'Light-Bringer',
        'Leader', 'Follower', 'Lone-Wolf', 'Team-Player', 'Sacrificial',
        'Glory-Seeker', 'Humble-Servant', 'King-Maker', 'Slayer', 'Protector',
        'Avenger', 'Champion', 'Conqueror', 'Explorer', 'Pathfinder',
        'Scholar-Warrior', 'Mystic-Knight', 'Rogue-Agent', 'Beast-Hunter', 'Demon-Bane',
        'Undead-Slayer', 'Dragon-Knight', 'Witch-Hunter', 'God-Touched', 'Legendary'
    ],
};

// Personality quirks — behavioral, not stat-based.
// Engine picks 2-3 from this pool.
export const PERSONALITY_POOL: string[] = [
    'Always checks exits before sitting down',
    'Hums battle hymns under their breath',
    'Never makes eye contact when lying',
    'Collects small trinkets from every battle',
    'Speaks to their weapon as if it were alive',
    'Refuses to eat anything they did not prepare',
    'Laughs at inappropriate moments',
    'Sleeps with one eye open — literally',
    'Has a habit of counting coins obsessively',
    'Tells wildly different stories about their past',
    'Distrusts anyone who smiles too easily',
    'Always the first to volunteer for danger',
    'Keeps a personal journal, written in code',
    'Whistles the same tune before every fight',
    'Never turns their back on a closed door',
    'Gives nicknames to everyone, often unflattering',
    'Eats meals in complete, reverent silence',
    'Compulsively sharpens blades, even when dull',
    'Quotes old proverbs no one has heard of',
    'Believes they are haunted by a specific ghost',
    'Carries a lucky stone from their childhood home',
    'Refuses to sleep indoors if possible',
    'Talks to animals, convinced they understand',
    'Polishes their boots/armor obsessively',
    'Sneezes loudly when lying',
    'Always carries a backup dagger... or three',
    'Draws maps of everywhere they go',
    'Apologizes to enemies before striking them',
    'Names their equipment after failed romances',
    'Obsessed with finding the perfect tavern ale',
    'Refuses to drink water, only wine or ale',
    'Prays to a different god every day',
    'Always has a piece of chalk to mark paths',
    'Fears the dark and always lights a candle',
    'Speaks in third person when stressed',
    'Challenges strangers to contests of strength',
    'Collects enemy ears (or says they do)',
    'Has a "lucky" coin they flip for decisions',
    'Mistrusts magic and those who use it',
    'Always sits with their back to the wall',
    'Claims to be royalty in disguise',
    'Carries a pouch of "magic dust" (it\'s sand)',
    'Writes bad poetry about their adventures',
    'Insists on haggling for everything, even 1 copper',
    'Thinks they are the chosen one (they aren\'t)',
    'Has a different accent in every town',
    'Refuses to walk on cobblestones',
    'Carries a preserved monster part as a charm',
    'Talks to their own shadow',
    'Starts every sentence with "Legend says..."',
    'Carries a banned book they cannot read',
    'Refuses to accept healing from clerics',
    'Believes birds are spying on them for the king',
    'Always sits facing the door in taverns',
    'Carries a pouch of soil from their homeland',
    'Sleeps in a tree whenever possible',
    'Hums loudly when nervous',
    'Refuses to use magic items, trusting only steel',
    'Thinks they are invisible if they close their eyes',
    'Collects teeth from fallen enemies',
    'Always asks for the "local special" dish',
    'Has a distinct laugh that echoes',
    'Carries a locket with no picture inside',
    'Refuses to walk over graves',
    'Talks to their horse/mount as an equal',
    'Is convinced they are a dragon in human form',
    'Always carries a spare pair of socks',
    'Writes letters to parents who died years ago',
    'Believes gold coins are unlucky',
    'Refuses to kill goblins specifically',
    'Has a scar they refuse to explain',
    'Wears a mask when sleeping',
    'Claims to have met a god once',
    'Is searching for a sword that doesn\'t exist',
    'Refuses to enter a room without knocking',
    'Always orders milk in a tavern',
    'Believes they can understand languages they don\'t speak',
    'Has a different name in every city',
    'Carries a bag of marbles "for tactical reasons"',
    'Refuses to fight on holy days',
    'Is convinced the moon is following them',
    'Always counts the steps of any staircase',
    'Carries a withered flower that never crumbles',
    'Refuses to eat meat on Tuesdays',
    'Believes they are cursed to die by drowning',
    'Always tips the bartender extra "for information"',
    'Has a tattooed map on their back',
    'Refuses to use potions, prefers poultices',
    'Is convinced they are being hunted by a guild',
    'Always sharpens weapons before sleeping',
    'Carries a doll that looks like them',
    'Refuses to say "goodbye", only "until next time"',
    'Believes rain is the sky crying for the dead',
    'Always checks for traps in their own room',
    'Carries a flute they cannot play',
    'Refuses to trust anyone with a beard',
    'Is convinced they are royalty switched at birth',
    'Always flips a coin to decide who to trust'
];

// Stat-influenced personality modifiers — added if highest stat matches.
export const STAT_PERSONALITY: Record<string, string[]> = {
    strength: [
        'Settles most arguments with a firm handshake — or a firmer fist',
        'Unconsciously flexes when making a point',
        'Breaks quills/tankards by accident when emotional',
        'Laughs like thunder, shaking the room',
        'Offers to carry everyone\'s gear "just for the workout"',
        'Prefers actions over words, often aggressively',
        'Respects only those who can stand their ground',
        'Eats twice as much as anyone else at the table',
        'Slaps friends on the back hard enough to bruise',
        'Never uses a door latch when a shoulder will do',
        'Testing structural integrity of furniture by sitting on it',
        'Believes all problems can be solved with enough force',
        'Carries oversized weapons just because they can',
        'Roars in battle, even when silence is preferred',
        'Arm-wrestles strangers for drinks'
    ],
    agility: [
        'Fidgets constantly, cannot sit still',
        'Moves through crowds like water through stone',
        'Perches on chairs/tables instead of sitting',
        'Twirls weapons when bored',
        'Catches falling objects before others realize they dropped',
        'Walks on railings/ledges just for fun',
        'Disappears the moment you look away',
        'Reacts to loud noises before they happen',
        'Is always standing somewhere different than you thought',
        'Sleeps in high places, like rafters or trees',
        'Never trips, even on the roughest terrain',
        'Dodges raindrops for sport',
        'Talks faster than most people can listen',
        'Paces back and forth like a caged cat',
        'Slides down banisters at every opportunity'
    ],
    intelligence: [
        'Corrects people\'s grammar mid-battle',
        'Reads during meals, even in taverns',
        'Analyzes the structural weaknesses of every building',
        'Uses words with more syllables than necessary',
        'Lectures allies on the history of the monsters they kill',
        'Always has ink stains on their fingers',
        'Calculates the probability of survival before acting',
        'Gets distracted by interesting runes/puzzles',
        'Believes everyone else is moving in slow motion',
        'Keeps a detailed bestiary of encountered foes',
        'Quotes obscure academic texts',
        'Argues logic with emotion-driven people',
        'Organizes their inventory alphabetically',
        'Dissects dead monsters for "research"',
        'Sighs loudly when others state the obvious'
    ],
    wisdom: [
        'Pauses too long before answering simple questions',
        'Stares into the distance as if listening to something',
        'Speaks in riddles or metaphors',
        'Notices when the birds stop singing',
        'Offers unsolicited life advice to strangers',
        'Meditates while others sleep',
        'Smells the air to predict the weather',
        'Respects traditions and omens deeply',
        'Never rushes, yet is never late',
        'Sees the truth behind lies easily',
        'Comforts the dying with strange calmness',
        'Predicts "bad feelings" about seemingly safe places',
        'Treats nature/spirits with extreme reverence',
        'Knows the names of stars but not the local king',
        'Smiles knowingly at secrets they haven\'t been told'
    ],
    charisma: [
        'Winks at strangers for no reason',
        'Has never met a crowd they couldn\'t charm',
        'Talks their way out of paying full price',
        'Starts singing when the silence gets too long',
        'Remembers the name of everyone they meet',
        'Attracts attention the moment they enter a room',
        'Flirts with monsters (sometimes successfully)',
        'Inspires confidence by simply standing there',
        'Maintains perfect hair even in a dungeon',
        'Turns enemies into friends over a drink',
        'Lies so convincingly they believe it themselves',
        'Always the center of the tavern\'s attention',
        'Dresses extravagantly, regardless of practicality',
        'Defuses tension with a perfect joke',
        'Leaves a trail of broken hearts in every town'
    ],
    luck: [
        'Flips a coin before every major decision',
        'Things just happen to work out for them, annoyingly so',
        'Finds gold coins in the mud',
        'Dodges arrows by sneezing at the right time',
        'Wins almost every game of chance',
        'Escapes death by pure accident',
        'Guesses passwords correctly on the first try',
        'Is banned from most casinos',
        'Takes impossible risks because "it\'ll be fine"',
        'Finds the one loose stone that opens the secret door',
        'Trips and falls into a better tactical position',
        'Never gets lost, just finds "new shortcuts"',
        'Survives explosions with just soot on their face',
        'Finds legendary items in pile of junk',
        'Everything goes wrong, but always in their favor'
    ],
    endurance: [
        'Never complains about pain, ever',
        'Can sleep anywhere, in any position, instantly',
        'Ignoring arrow wounds like mosquito bites',
        'Marches for days without stopping',
        'Drinks others under the table without getting drunk',
        'Eats raw/spoiled food without getting sick',
        'Stands perfectly still for hours',
        'Swims in freezing water for fun',
        'Outlasts everyone in any physical challenge',
        'Takes the hit so others don\'t have to',
        'Never seems to be out of breath',
        'Is the last one standing, always',
        'Carries the heaviest load without asking for help',
        'Shrugs off insults as easily as blows',
        'Has more scars than skin'
    ],
    dexterity: [
        'Juggles small objects when bored',
        'Catches things mid-air without looking',
        'Tie knots with one hand',
        'Performs coin tricks to pass the time',
        'Fixes broken items while talking',
        'Never drops anything, ever',
        'Sews wounds/clothes with incredible speed',
        'Picks locks as a nervous habit',
        'Spins daggers between fingers absentmindedly',
        'Crafts tiny figurines from wood scraps',
        'Throws objects with terrifying accuracy',
        'Disarms traps without breaking a sweat',
        'Shuffles cards like a professional gambler',
        'Threads needles in the dark',
        'Snaps fingers to create rhythm while thinking'
    ],
    stealth: [
        'Appears behind people without warning',
        'Speaks in a near-whisper at all times',
        'Walks without making a single sound',
        'Merges into shadows when threatened',
        'Is often mistaken for a ghost',
        'Listens to conversations from across the room',
        'Vanishes the moment focus is elsewhere',
        'Never leaves footprints',
        'Avoids direct sunlight whenever possible',
        'Breathes so quietly people think they are dead',
        'Steals small items just to see if they can',
        'Prefers corners and dark alcoves',
        'Startles allies constantly by just... being there',
        'Wears clothes that make no noise',
        'Knows secrets about everyone in the party'
    ],
    perception: [
        'Notices every detail, comments on none',
        'Watches everyone who enters or leaves a room',
        'Points out traps moments before they trigger',
        'Hears whispers through thick doors',
        'Smells ambushes on the wind',
        'Reads lips from across the tavern',
        'Counts arrows in an enemy\'s quiver instantly',
        'Sees through illusions that fool others',
        'Never gets surprised',
        'Identifies poisons by smell alone',
        'Tracks prey over solid stone',
        'Notices when someone swaps their drink',
        'Finds hidden doors by the airflow',
        'Detects lies by a twitch of the eye',
        'Always knows who is watching them'
    ],
};

// Age-bracket traits — added based on character age.
export const AGE_TRAITS: Record<string, string[]> = {
    young: [
        'Reckless', 'Impulsive', 'Eager', 'Naive', 'Quick-Learner',
        'Untested', 'Hopeful', 'Brash', 'Green', 'Overconfident',
        'Fresh-Faced', 'Inexperienced', 'Daring', 'Rebellious', 'Hungry-for-Glory'
    ],
    mature: [
        'Experienced', 'Weathered', 'Battle-Scarred', 'Tempered', 'Steady',
        'Confident', 'World-Wise', 'Pragmatic', 'Mentoring', 'Hardened',
        'Dependable', 'Calculating', 'Seen-It-All', 'War-Tested', 'Prime-of-Life'
    ],
    old: [
        'Ancient-Wisdom', 'Time-Worn', 'Gray-Haired', 'Respected-Elder', 'Slow-but-Sure',
        'Memory-Keeper', 'Legend-Teller', 'Creaking-Bones', 'Patient-as-Stone', 'Nostalgia-Driven',
        'Sage-Counsel', 'Twilight-Warrior', 'Past-Their-Prime', 'Stubbornly-Alive', 'Living-History'
    ],
    ancient: [
        'Immortal-Patience', 'Eons-Old', 'Time-Forgotten', 'Living-Relic', 'Epoch-Walker',
        'Memory-of-Ages', 'Beyond-Mortal', 'Dust-and-Stars', 'Eternal-Witness', 'Undying-Will',
        'World-Weary', 'Cosmic-Perspective', 'Timeless-Soul', 'History-Incarnate', 'Age-Defying'
    ],
};

// Age-bracket personality quirks — behavioral traits that come with age.
export const AGE_PERSONALITY: Record<string, string[]> = {
    young: [
        'Eager to prove themselves at every opportunity',
        'Charges into danger without thinking twice',
        'Asks too many questions, especially during stealth missions',
        'Gets starstruck around famous adventurers',
        'Still flinches at the sight of blood',
        'Keeps a tally of their first kills',
        'Brags about minor accomplishments',
        'Writes home to their parents after every quest',
        'Idolizes a hero they have never met',
        'Volunteers for every task, even impossible ones'
    ],
    mature: [
        'Pauses before every decision, weighing the cost',
        'Has a specific scar they touch when thinking',
        'Mentors younger adventurers whether asked or not',
        'Drinks to forget a specific battle',
        'Recognizes old enemies in every crowd',
        'Keeps a mental count of debts owed and debts paid',
        'Sleeps light, wakes armed',
        'Tells war stories only when drunk',
        'Knows exactly when a fight is unwinnable',
        'Names their weapons after fallen comrades'
    ],
    old: [
        'Tells the same stories repeatedly, with new details each time',
        'Forgets names but never forgets a face',
        'Moves slowly but strikes with terrifying precision',
        'Complains about "adventurers these days"',
        'Has outlived everyone they once called friend',
        'Refuses to rush, even in emergencies',
        'Speaks to the dead as if they can hear',
        'Knows ancient songs no one else remembers',
        'Predicts the weather by the ache in their bones',
        'Has a pocket full of remedies for everything'
    ],
    ancient: [
        'Has forgotten more than most will ever learn',
        'Speaks in languages that died centuries ago',
        'Confuses current events with things from ages past',
        'Watches civilizations rise and fall with detached amusement',
        'Remembers the names of mountains before they were named',
        'Treats decades as most treat hours',
        'Has a collection of artifacts from extinct cultures',
        'Mourns species that no longer exist',
        'Finishes others\' sentences because they have heard it all before',
        'Stares at stars like greeting old friends'
    ],
};
