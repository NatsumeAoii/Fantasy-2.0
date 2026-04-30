/**
 * A milestone reward earned by accomplishing a notable in-world deed.
 * Achievements grant renown, base XP, and base gold upon completion.
 * They serve as a secondary progression system alongside leveling.
 */
export interface Achievement {
  id: string;
  title: string;
  category: 'Combat' | 'Exploration' | 'Crafting' | 'Social' | 'Survival' | 'Arcane' | 'Wealth' | 'Infamy' | 'Faction' | 'Lore';
  requirement: string;
  renownReward: number;
  baseXP: number;
  baseGold: number;
  /** Power tier: 1 = common, 2 = notable, 3 = legendary. */
  tier: 1 | 2 | 3;
  /** If true, the achievement is not shown in the tracker until earned. */
  hidden: boolean;
}

/** Master list of all achievements, organized by category. */
export const ACHIEVEMENTS: Achievement[] = [
  // ==========================================
  // COMBAT
  // ==========================================
  {
    id: 'first_blood',
    title: 'First Blood',
    category: 'Combat',
    requirement: 'Draw blood and land your very first completely unaided kill in mortal combat.',
    renownReward: 10,
    baseXP: 50,
    baseGold: 5,
    tier: 1,
    hidden: false
  },
  {
    id: 'dragonslayer',
    title: 'Dragonslayer',
    category: 'Combat',
    requirement: 'Land the killing blow on an adult or ancient dragon.',
    renownReward: 500,
    baseXP: 750,
    baseGold: 250,
    tier: 3,
    hidden: false
  },
  {
    id: 'giant_feller',
    title: 'Giant-Feller',
    category: 'Combat',
    requirement: 'Defeat a true giant in single combat without using magic.',
    renownReward: 300,
    baseXP: 500,
    baseGold: 100,
    tier: 2,
    hidden: false
  },
  {
    id: 'blood_gladiator',
    title: 'Champion of the Pit',
    category: 'Combat',
    requirement: 'Survive ten consecutive bloody matches in the sand of an underground fighting arena without rest.',
    renownReward: 200,
    baseXP: 400,
    baseGold: 500,
    tier: 2,
    hidden: false
  },
  {
    id: 'beast_bane',
    title: 'Beast Bane',
    category: 'Combat',
    requirement: 'Track down and slay fifty hostile natural predators roaming the untamed wilderness.',
    renownReward: 50,
    baseXP: 150,
    baseGold: 20,
    tier: 1,
    hidden: false
  },
  {
    id: 'undead_scourge',
    title: 'Scourge of the Restless',
    category: 'Combat',
    requirement: 'Hunt down and permanently destroy one hundred restless undead creatures that plague the living.',
    renownReward: 75,
    baseXP: 200,
    baseGold: 30,
    tier: 1,
    hidden: false
  },
  {
    id: 'demon_hunter',
    title: 'Slayer of the Abyss',
    category: 'Combat',
    requirement: 'Banish or destroy a High Fiend from the mortal plane.',
    renownReward: 400,
    baseXP: 600,
    baseGold: 150,
    tier: 3,
    hidden: false
  },
  {
    id: 'perfect_parry',
    title: 'Master of Arms',
    category: 'Combat',
    requirement: 'Perform 20 successful parries or counters in a single combat encounter.',
    renownReward: 100,
    baseXP: 250,
    baseGold: 0,
    tier: 1,
    hidden: false
  },
  {
    id: 'marksman_eye',
    title: 'Dead-Eye',
    category: 'Combat',
    requirement: 'Land five consecutive, perfectly aimed lethal headshots with a ranged weapon without a single miss.',
    renownReward: 150,
    baseXP: 300,
    baseGold: 50,
    tier: 1,
    hidden: false
  },
  {
    id: 'bare_knuckle',
    title: 'Iron Fists',
    category: 'Combat',
    requirement: 'Defeat a fully armed and armored opponent using nothing but your bare, bleeding hands.',
    renownReward: 120,
    baseXP: 200,
    baseGold: 10,
    tier: 1,
    hidden: false
  },
  {
    id: 'last_stand',
    title: 'Determined Survivor',
    category: 'Combat',
    requirement: 'Survive a battle where your vitality dropped below 5%.',
    renownReward: 100,
    baseXP: 300,
    baseGold: 0,
    tier: 1,
    hidden: false
  },
  {
    id: 'swift_blade',
    title: 'Vanguard\'s Edge',
    category: 'Combat',
    requirement: 'Strike so swiftly that you defeat three separate enemies in the very first round of combat.',
    renownReward: 150,
    baseXP: 350,
    baseGold: 50,
    tier: 1,
    hidden: false
  },
  {
    id: 'colossus_climber',
    title: 'Shadow of the Colossus',
    category: 'Combat',
    requirement: 'Climb onto the hide of a gargantuan creature and drive your blade into its flesh until it falls.',
    renownReward: 600,
    baseXP: 800,
    baseGold: 200,
    tier: 3,
    hidden: false
  },
  {
    id: 'mage_breaker',
    title: 'Silencer',
    category: 'Combat',
    requirement: 'Interrupt ten separate enemy spellcasts mid-incantation by striking them with brutal physical attacks.',
    renownReward: 200,
    baseXP: 400,
    baseGold: 100,
    tier: 2,
    hidden: false
  },
  {
    id: 'one_man_army',
    title: 'One Against Many',
    category: 'Combat',
    requirement: 'Defeat ten enemies in a single chaotic engagement without any ally suffering so much as a scratch.',
    renownReward: 300,
    baseXP: 500,
    baseGold: 200,
    tier: 2,
    hidden: false
  },
  {
    id: 'crimson_harvester',
    title: 'Crimson Harvest',
    category: 'Combat',
    requirement: 'Tear open enough wounds to deal over five hundred points of bleeding damage across a single battle.',
    renownReward: 150,
    baseXP: 350,
    baseGold: 0,
    tier: 1,
    hidden: false
  },
  {
    id: 'bone_crusher',
    title: 'Shattered Resolve',
    category: 'Combat',
    requirement: 'Shatter, snap, or crush the limbs of fifty different enemies across your violent career.',
    renownReward: 150,
    baseXP: 300,
    baseGold: 25,
    tier: 1,
    hidden: false
  },
  {
    id: 'golem_smash',
    title: 'Stone-Breaker',
    category: 'Combat',
    requirement: 'Smash apart a fully animate, magically powered golem or construct until it ceases to function.',
    renownReward: 200,
    baseXP: 400,
    baseGold: 150,
    tier: 2,
    hidden: false
  },
  {
    id: 'assassin_strike',
    title: 'Death from the Shadows',
    category: 'Combat',
    requirement: 'Assassinate a heavily guarded, elite enemy target without ever breaking your concealment or stealth.',
    renownReward: 250,
    baseXP: 500,
    baseGold: 300,
    tier: 2,
    hidden: false
  },
  {
    id: 'war_cry_hero',
    title: 'Roar of the Vanquisher',
    category: 'Combat',
    requirement: 'Win a battle so terrifyingly that the number of fleeing enemies outnumbers those still fighting upon victory.',
    renownReward: 100,
    baseXP: 300,
    baseGold: 50,
    tier: 1,
    hidden: false
  },
  {
    id: 'unyielding_wall',
    title: 'The Anvil',
    category: 'Combat',
    requirement: 'Absorb or block over 1000 damage in a single fight.',
    renownReward: 250,
    baseXP: 450,
    baseGold: 0,
    tier: 2,
    hidden: false
  },
  {
    id: 'friendly_fire',
    title: 'Collateral Master',
    category: 'Combat',
    requirement: 'Manipulate the chaos of battle to trick enemies into accidentally killing five of their own allies.',
    renownReward: 200,
    baseXP: 400,
    baseGold: 0,
    tier: 2,
    hidden: false
  },
  {
    id: 'duel_honor',
    title: 'Honorable Duelist',
    category: 'Combat',
    requirement: 'Win a formally declared one-on-one duel of honor without resorting to potions, poisons, or consumables.',
    renownReward: 100,
    baseXP: 250,
    baseGold: 150,
    tier: 1,
    hidden: false
  },
  {
    id: 'siege_breaker',
    title: 'Siege Breaker',
    category: 'Combat',
    requirement: 'Single-handedly dismantle a massive enemy siege engine in the heat of active, ongoing combat.',
    renownReward: 250,
    baseXP: 600,
    baseGold: 100,
    tier: 2,
    hidden: false
  },
  {
    id: 'immortal_foe',
    title: 'Cheating Death',
    category: 'Combat',
    requirement: 'Kill an enemy that possesses natural regeneration or immortality protocols.',
    renownReward: 350,
    baseXP: 700,
    baseGold: 200,
    tier: 2,
    hidden: false
  },

  // ==========================================
  // EXPLORATION
  // ==========================================
  {
    id: 'first_steps',
    title: 'Into the Unknown',
    category: 'Exploration',
    requirement: 'Leave the familiar borders of your starting region for the very first time.',
    renownReward: 10,
    baseXP: 50,
    baseGold: 0,
    tier: 1,
    hidden: false
  },
  {
    id: 'cartographer',
    title: 'Master Cartographer',
    category: 'Exploration',
    requirement: 'Fully chart and map every named region, coast, and border of a major continent.',
    renownReward: 300,
    baseXP: 600,
    baseGold: 200,
    tier: 2,
    hidden: false
  },
  {
    id: 'abyss_diver',
    title: 'Depths of the Abyss',
    category: 'Exploration',
    requirement: 'Descend into the crushing darkness and reach the deepest known level of the Underdark.',
    renownReward: 400,
    baseXP: 800,
    baseGold: 100,
    tier: 3,
    hidden: false
  },
  {
    id: 'peak_climber',
    title: 'Sky-Piercer',
    category: 'Exploration',
    requirement: 'Climb to the absolute highest geographical peak in all of Aetheris and gaze upon the world.',
    renownReward: 250,
    baseXP: 500,
    baseGold: 0,
    tier: 2,
    hidden: false
  },
  {
    id: 'ruin_scavenger',
    title: 'Tomb Raider',
    category: 'Exploration',
    requirement: 'Discover, enter, and loot twenty distinct, previously unmapped ancient ruins lost to time.',
    renownReward: 200,
    baseXP: 450,
    baseGold: 800,
    tier: 2,
    hidden: false
  },
  {
    id: 'waypoint_master',
    title: 'Leyline Walker',
    category: 'Exploration',
    requirement: 'Discover, attune to, and unlock every single fast-travel leyline node scattered across the world.',
    renownReward: 150,
    baseXP: 300,
    baseGold: 50,
    tier: 1,
    hidden: false
  },
  {
    id: 'tropic_survivor',
    title: 'Heart of the Jungle',
    category: 'Exploration',
    requirement: 'Navigate the sweltering, pest-ridden depths of the Deep Tropics without contracting a single disease.',
    renownReward: 150,
    baseXP: 400,
    baseGold: 0,
    tier: 1,
    hidden: false
  },
  {
    id: 'desert_nomad',
    title: 'Sun-Scorched',
    category: 'Exploration',
    requirement: 'Cross the endless, sun-scorched expanse of the Great Wastes entirely on foot without a mount.',
    renownReward: 200,
    baseXP: 500,
    baseGold: 50,
    tier: 2,
    hidden: false
  },
  {
    id: 'frozen_wanderer',
    title: 'Frost-Touched',
    category: 'Exploration',
    requirement: 'Brave the blizzards and discover the hidden, frozen valleys buried deep in the Frigid North.',
    renownReward: 150,
    baseXP: 400,
    baseGold: 0,
    tier: 1,
    hidden: false
  },
  {
    id: 'ocean_voyager',
    title: 'Sea Dog',
    category: 'Exploration',
    requirement: 'Set sail and successfully cross the treacherous, storm-wracked Shimmering Sea to reach the Eastern Isles.',
    renownReward: 200,
    baseXP: 450,
    baseGold: 100,
    tier: 2,
    hidden: false
  },
  {
    id: 'volcano_walker',
    title: 'Ash-Treader',
    category: 'Exploration',
    requirement: 'Stand at the scorching, smoke-choked lip of an active volcanic caldera and live to tell the tale.',
    renownReward: 250,
    baseXP: 500,
    baseGold: 0,
    tier: 2,
    hidden: false
  },
  {
    id: 'fey_lost',
    title: 'Wanderer of the Wilds',
    category: 'Exploration',
    requirement: 'Spend a full week inside the Feywild and return intact.',
    renownReward: 300,
    baseXP: 600,
    baseGold: 0,
    tier: 2,
    hidden: false
  },
  {
    id: 'shadow_step',
    title: 'Shadow-Walker',
    category: 'Exploration',
    requirement: 'Navigate the treacherous dread-fog of the Shadowfell without alerting a single Dread Wraith.',
    renownReward: 350,
    baseXP: 700,
    baseGold: 0,
    tier: 2,
    hidden: false
  },
  {
    id: 'stellar_observer',
    title: 'Star-Gazer',
    category: 'Exploration',
    requirement: 'Locate the hidden and long-forgotten astral observatories once belonging to the Ancients.',
    renownReward: 250,
    baseXP: 500,
    baseGold: 100,
    tier: 2,
    hidden: false
  },
  {
    id: 'deep_delver',
    title: 'Deep Delver',
    category: 'Exploration',
    requirement: 'Descend through every floor and reach the deepest chamber of a 10-tier dungeon.',
    renownReward: 300,
    baseXP: 600,
    baseGold: 300,
    tier: 2,
    hidden: false
  },
  {
    id: 'secret_doors',
    title: 'Keen Eye',
    category: 'Exploration',
    requirement: 'Discover and successfully navigate through 50 hidden passages or concealed secret doors.',
    renownReward: 150,
    baseXP: 400,
    baseGold: 150,
    tier: 1,
    hidden: false
  },
  {
    id: 'trap_evader',
    title: 'Nimble Toes',
    category: 'Exploration',
    requirement: 'Trigger a lethal, properly armed trap mechanism and miraculously escape without taking any damage.',
    renownReward: 50,
    baseXP: 150,
    baseGold: 0,
    tier: 1,
    hidden: false
  },
  {
    id: 'forgotten_city',
    title: 'Echoes of the Past',
    category: 'Exploration',
    requirement: 'Find a lost city buried under sand, sea, or soil.',
    renownReward: 400,
    baseXP: 800,
    baseGold: 500,
    tier: 3,
    hidden: false
  },
  {
    id: 'planar_traveler',
    title: 'Rift-Hopper',
    category: 'Exploration',
    requirement: 'Step into a plane of existence other than the material realm.',
    renownReward: 200,
    baseXP: 500,
    baseGold: 0,
    tier: 2,
    hidden: false
  },
  {
    id: 'island_hopper',
    title: 'Archipelago Navigator',
    category: 'Exploration',
    requirement: 'Set foot on every single island within a major archipelago and chart them all.',
    renownReward: 150,
    baseXP: 400,
    baseGold: 100,
    tier: 1,
    hidden: false
  },
  {
    id: 'cavern_crawler',
    title: 'Stalactite Navigator',
    category: 'Exploration',
    requirement: 'Spend an uninterrupted, harrowing month navigating vast and disorienting subterranean cave networks.',
    renownReward: 250,
    baseXP: 600,
    baseGold: 0,
    tier: 2,
    hidden: false
  },
  {
    id: 'bridge_builder',
    title: 'Chasm-Spanner',
    category: 'Exploration',
    requirement: 'Discover and successfully traverse the ancient, perilous, and seemingly impossible bridge of the Titans.',
    renownReward: 200,
    baseXP: 500,
    baseGold: 0,
    tier: 2,
    hidden: false
  },
  {
    id: 'phantom_isle',
    title: 'Myth Chaser',
    category: 'Exploration',
    requirement: 'Find an island that only appears during specific weather conditions.',
    renownReward: 350,
    baseXP: 700,
    baseGold: 200,
    tier: 2,
    hidden: false
  },
  {
    id: 'crystal_caves',
    title: 'Prism-Walker',
    category: 'Exploration',
    requirement: 'Locate the ever-shifting, labyrinthine crystal caverns and navigate them without losing your way.',
    renownReward: 250,
    baseXP: 600,
    baseGold: 150,
    tier: 2,
    hidden: false
  },
  {
    id: 'edge_of_world',
    title: 'The Final Frontier',
    category: 'Exploration',
    requirement: 'Journey to the absolute geographic edge of the known map where the land simply ends.',
    renownReward: 500,
    baseXP: 1000,
    baseGold: 0,
    tier: 3,
    hidden: false
  },

  // ==========================================
  // CRAFTING
  // ==========================================
  {
    id: 'first_craft',
    title: 'Apprentice Smith',
    category: 'Crafting',
    requirement: 'Gather the raw materials and successfully craft your very first usable item.',
    renownReward: 10,
    baseXP: 50,
    baseGold: 0,
    tier: 1,
    hidden: false
  },
  {
    id: 'legendary_forger',
    title: 'Master of the Forge',
    category: 'Crafting',
    requirement: 'Smith and complete the forging of a legendary-tier weapon or suit of armor.',
    renownReward: 300,
    baseXP: 800,
    baseGold: 500,
    tier: 2,
    hidden: false
  },
  {
    id: 'alchemist_supreme',
    title: 'Elixir of Life',
    category: 'Crafting',
    requirement: 'Successfully brew an exceedingly rare and volatile potion that grants a permanent stat increase.',
    renownReward: 400,
    baseXP: 1000,
    baseGold: 200,
    tier: 3,
    hidden: false
  },
  {
    id: 'mass_production',
    title: 'Tireless Hands',
    category: 'Crafting',
    requirement: 'Toil at the workbench and craft a grand total of one thousand common items.',
    renownReward: 100,
    baseXP: 300,
    baseGold: 500,
    tier: 1,
    hidden: false
  },
  {
    id: 'enchantment_pro',
    title: 'Weaver of Magic',
    category: 'Crafting',
    requirement: 'Successfully apply fifty complete and stable magical enchantments to weapons or armor.',
    renownReward: 200,
    baseXP: 500,
    baseGold: 300,
    tier: 2,
    hidden: false
  },
  {
    id: 'gem_cutter',
    title: 'Flawless Facets',
    category: 'Crafting',
    requirement: 'Take an uncut, rough gemstone and facet it into a flawless, perfectly brilliant jewel.',
    renownReward: 100,
    baseXP: 250,
    baseGold: 400,
    tier: 1,
    hidden: false
  },
  {
    id: 'leatherworker',
    title: 'Dragon-Hide Tanner',
    category: 'Crafting',
    requirement: 'Skin a dragon and craft a complete, wearable suit of armor from its hardened scales.',
    renownReward: 250,
    baseXP: 600,
    baseGold: 300,
    tier: 2,
    hidden: false
  },
  {
    id: 'tinker_gnome',
    title: 'Golem-Wright',
    category: 'Crafting',
    requirement: 'Design, construct, and animate a fully functional war-golem from raw stone and arcane cores.',
    renownReward: 350,
    baseXP: 750,
    baseGold: 200,
    tier: 2,
    hidden: false
  },
  {
    id: 'culinary_master',
    title: 'Culinary Masterpiece',
    category: 'Crafting',
    requirement: 'Prepare and cook an exquisite feast that grants a powerful, day-long legendary buff to all who eat it.',
    renownReward: 200,
    baseXP: 500,
    baseGold: 50,
    tier: 2,
    hidden: false
  },
  {
    id: 'poison_brewer',
    title: 'Widow-Maker',
    category: 'Crafting',
    requirement: 'Brew a full batch of perfectly undetectable, tasteless, and lethally effective poison for covert operations.',
    renownReward: 250,
    baseXP: 600,
    baseGold: 150,
    tier: 2,
    hidden: false
  },
  {
    id: 'fletcher_pro',
    title: 'Feathered Fury',
    category: 'Crafting',
    requirement: 'Sit at the workbench and painstakingly fletch a grand total of ten thousand arrows or bolts.',
    renownReward: 100,
    baseXP: 300,
    baseGold: 100,
    tier: 1,
    hidden: false
  },
  {
    id: 'scribe_scrolls',
    title: 'Arcane Scribe',
    category: 'Crafting',
    requirement: 'Carefully inscribe a volatile master-level spell onto enchanted parchment without it igniting or failing.',
    renownReward: 200,
    baseXP: 500,
    baseGold: 200,
    tier: 2,
    hidden: false
  },
  {
    id: 'wand_maker',
    title: 'Core-Bender',
    category: 'Crafting',
    requirement: 'Craft a magic wand from an exotic core and rare wood.',
    renownReward: 150,
    baseXP: 450,
    baseGold: 150,
    tier: 1,
    hidden: false
  },
  {
    id: 'golem_sculptor',
    title: 'Clay to Life',
    category: 'Crafting',
    requirement: 'Sculpt, bind, and successfully animate a massive siege-grade war-golem from raw materials and dark rune-work.',
    renownReward: 400,
    baseXP: 800,
    baseGold: 0,
    tier: 3,
    hidden: false
  },
  {
    id: 'glassblower',
    title: 'Crystal-Smith',
    category: 'Crafting',
    requirement: 'Blow and assemble a complete set of intricate, perfectly calibrated alchemical laboratory glassware.',
    renownReward: 100,
    baseXP: 250,
    baseGold: 100,
    tier: 1,
    hidden: false
  },
  {
    id: 'cobbler_stealth',
    title: 'Silent Soles',
    category: 'Crafting',
    requirement: 'Carefully sew and enchant a pair of masterwork boots that grant the wearer permanent, absolute silence.',
    renownReward: 200,
    baseXP: 500,
    baseGold: 150,
    tier: 2,
    hidden: false
  },
  {
    id: 'tailor_royalty',
    title: 'Thread of Kings',
    category: 'Crafting',
    requirement: 'Stitch a garment worthy of high nobility that grants massive charisma.',
    renownReward: 250,
    baseXP: 500,
    baseGold: 500,
    tier: 2,
    hidden: false
  },
  {
    id: 'architect',
    title: 'Stone-Mason',
    category: 'Crafting',
    requirement: 'Design the blueprints for and personally oversee the full construction of a reinforced military keep.',
    renownReward: 500,
    baseXP: 1000,
    baseGold: 0,
    tier: 3,
    hidden: false
  },
  {
    id: 'shipwright',
    title: 'Hull-Binder',
    category: 'Crafting',
    requirement: 'Construct a fully seaworthy deep-sea galley from raw timber, iron, and sailcloth without outside help.',
    renownReward: 400,
    baseXP: 800,
    baseGold: 200,
    tier: 3,
    hidden: false
  },
  {
    id: 'bone_carver',
    title: 'Macabre Artisan',
    category: 'Crafting',
    requirement: 'Carve a fully functional and magically enchanted weapon from the massive femur bone of a slain demon.',
    renownReward: 300,
    baseXP: 600,
    baseGold: 100,
    tier: 2,
    hidden: false
  },
  {
    id: 'rune_smith',
    title: 'Carver of Runes',
    category: 'Crafting',
    requirement: 'Painstakingly inlay ancient dwarven runes of devastating power onto the head of a bludgeoning weapon.',
    renownReward: 250,
    baseXP: 550,
    baseGold: 200,
    tier: 2,
    hidden: false
  },
  {
    id: 'brewmaster',
    title: 'Iron-Keg Brewer',
    category: 'Crafting',
    requirement: 'Ferment a batch of iron-brewed dwarven stout so potent it can reliably pacify a raging troll.',
    renownReward: 150,
    baseXP: 350,
    baseGold: 100,
    tier: 1,
    hidden: false
  },
  {
    id: 'trap_maker',
    title: 'Deadly Engineering',
    category: 'Crafting',
    requirement: 'Construct a complex mechanical trap that deals over 500 damage.',
    renownReward: 200,
    baseXP: 450,
    baseGold: 50,
    tier: 2,
    hidden: false
  },
  {
    id: 'paper_maker',
    title: 'Parchment Weaver',
    category: 'Crafting',
    requirement: 'Press sheets of fire-proof, water-proof, and tear-resistant magical parchment from rare enchanted pulp.',
    renownReward: 100,
    baseXP: 300,
    baseGold: 50,
    tier: 1,
    hidden: false
  },
  {
    id: 'relic_restorer',
    title: 'Echoes of the Forge',
    category: 'Crafting',
    requirement: 'Gather the lost fragments and painstakingly repair a shattered mythical artifact back to its perfect original condition.',
    renownReward: 600,
    baseXP: 1500,
    baseGold: 500,
    tier: 3,
    hidden: false
  },

  // ==========================================
  // SOCIAL
  // ==========================================
  {
    id: 'gilded_tongue',
    title: 'Silver-Tongued',
    category: 'Social',
    requirement: 'Successfully persuade or bribe your way out of a hostile encounter 10 times.',
    renownReward: 150,
    baseXP: 350,
    baseGold: 50,
    tier: 1,
    hidden: false
  },
  {
    id: 'peacemaker',
    title: 'Diplomat',
    category: 'Social',
    requirement: 'Avert a major war between two rival factions without drawing a weapon.',
    renownReward: 500,
    baseXP: 1000,
    baseGold: 500,
    tier: 3,
    hidden: false
  },
  {
    id: 'incite_riot',
    title: 'Rabble-Rouser',
    category: 'Social',
    requirement: 'Successfully incite a full-blown, destructive riot among the populace of a major walled city.',
    renownReward: 300,
    baseXP: 600,
    baseGold: 0,
    tier: 2,
    hidden: false
  },
  {
    id: 'royal_audience',
    title: 'Friend of the Crown',
    category: 'Social',
    requirement: 'Secure a private, positive audience with a monarch or reigning sovereign.',
    renownReward: 250,
    baseXP: 500,
    baseGold: 1000,
    tier: 2,
    hidden: false
  },
  {
    id: 'merchant_prince',
    title: 'Master Negotiator',
    category: 'Social',
    requirement: 'Negotiate a passive trade tariff that earns you daily income.',
    renownReward: 400,
    baseXP: 800,
    baseGold: 2000,
    tier: 3,
    hidden: false
  },
  {
    id: 'heartbreaker',
    title: 'Heart-Snatcher',
    category: 'Social',
    requirement: 'Successfully romance 5 major figures of renown across the world.',
    renownReward: 200,
    baseXP: 400,
    baseGold: 0,
    tier: 2,
    hidden: false
  },
  {
    id: 'local_hero',
    title: 'Champion of the People',
    category: 'Social',
    requirement: 'Earn the absolute trust and maximum reputation standing within a grateful minor village or settlement.',
    renownReward: 150,
    baseXP: 300,
    baseGold: 200,
    tier: 1,
    hidden: false
  },
  {
    id: 'dread_presence',
    title: 'Aura of Menace',
    category: 'Social',
    requirement: 'Force a powerful, elite enemy commander to lay down their arms and surrender solely through intimidation.',
    renownReward: 200,
    baseXP: 500,
    baseGold: 50,
    tier: 2,
    hidden: false
  },
  {
    id: 'gossip_monger',
    title: 'Whisper-Broker',
    category: 'Social',
    requirement: 'Uncover a dangerous, high-level political conspiracy purely by eavesdropping on loose-lipped patrons in taverns.',
    renownReward: 250,
    baseXP: 600,
    baseGold: 300,
    tier: 2,
    hidden: false
  },
  {
    id: 'shadow_strings',
    title: 'Shadow String-Puller',
    category: 'Social',
    requirement: 'Successfully blackmail a powerful, high-ranking government official and escape without getting caught or identified.',
    renownReward: 300,
    baseXP: 700,
    baseGold: 1000,
    tier: 2,
    hidden: false
  },
  {
    id: 'greased_palms',
    title: 'Greasing the Wheels',
    category: 'Social',
    requirement: 'Spread your coin generously and spend over ten thousand gold strictly on bribes and palm-greasing.',
    renownReward: 150,
    baseXP: 300,
    baseGold: 0,
    tier: 1,
    hidden: false
  },
  {
    id: 'cult_leader',
    title: 'False Prophet',
    category: 'Social',
    requirement: 'Convince a group of at least 50 citizens to worship you or your deity.',
    renownReward: 400,
    baseXP: 800,
    baseGold: 500,
    tier: 3,
    hidden: true
  },
  {
    id: 'party_animal',
    title: 'Tavern Legend',
    category: 'Social',
    requirement: 'Win a formal, no-holds-barred drinking contest against a hardened dwarf clan leader and remain standing.',
    renownReward: 100,
    baseXP: 250,
    baseGold: 100,
    tier: 1,
    hidden: false
  },
  {
    id: 'jester',
    title: 'The Fool\'s Errand',
    category: 'Social',
    requirement: 'Tell a genuinely funny joke directly to the face of a hostile, fire-breathing dragon and survive.',
    renownReward: 500,
    baseXP: 1000,
    baseGold: 0,
    tier: 3,
    hidden: false
  },
  {
    id: 'imposter',
    title: 'Face-Stealer',
    category: 'Social',
    requirement: 'Successfully impersonate an official and command an outpost for a day.',
    renownReward: 350,
    baseXP: 750,
    baseGold: 200,
    tier: 2,
    hidden: true
  },
  {
    id: 'truth_extractor',
    title: 'Mind-Breaker',
    category: 'Social',
    requirement: 'Extract a critical secret from a hostile captive without lethal torture.',
    renownReward: 200,
    baseXP: 500,
    baseGold: 0,
    tier: 2,
    hidden: false
  },
  {
    id: 'bardic_legend',
    title: 'Standing Ovation',
    category: 'Social',
    requirement: 'Perform a song that earns over 1,000 gold in tips.',
    renownReward: 150,
    baseXP: 400,
    baseGold: 1000,
    tier: 1,
    hidden: false
  },
  {
    id: 'defamation',
    title: 'Character Assassin',
    category: 'Social',
    requirement: 'Completely ruin the reputation of a noble via rumors and forged documents.',
    renownReward: 300,
    baseXP: 600,
    baseGold: 200,
    tier: 2,
    hidden: true
  },
  {
    id: 'freedom_fighter',
    title: 'Liberator',
    category: 'Social',
    requirement: 'Convince a group of slaves to violently overthrow their masters.',
    renownReward: 250,
    baseXP: 550,
    baseGold: 0,
    tier: 2,
    hidden: false
  },
  {
    id: 'wedding_crasher',
    title: 'Uninvited Guest',
    category: 'Social',
    requirement: 'Interrupt and ruin a high-society wedding with a dramatic revelation.',
    renownReward: 150,
    baseXP: 350,
    baseGold: 0,
    tier: 1,
    hidden: false
  },
  {
    id: 'smuggler_contact',
    title: 'Underground Ties',
    category: 'Social',
    requirement: 'Establish a trusted, two-way line of communication with the notoriously secretive Thieves\' Guild shadow-council.',
    renownReward: 200,
    baseXP: 450,
    baseGold: 100,
    tier: 2,
    hidden: false
  },
  {
    id: 'spy_master',
    title: 'Eyes Everywhere',
    category: 'Social',
    requirement: 'Maintain a network of at least five active, reliable informants stationed in separate major cities.',
    renownReward: 300,
    baseXP: 700,
    baseGold: 0,
    tier: 2,
    hidden: false
  },
  {
    id: 'debate_champ',
    title: 'Master Debater',
    category: 'Social',
    requirement: 'Win a formal, judged rhetorical debate against a tenured scholar at a prestigious Arcane University.',
    renownReward: 150,
    baseXP: 400,
    baseGold: 100,
    tier: 1,
    hidden: false
  },
  {
    id: 'charity_paragon',
    title: 'Saintly Giving',
    category: 'Social',
    requirement: 'Give away a staggering fifty thousand gold to beggars, orphanages, and impoverished communities.',
    renownReward: 400,
    baseXP: 500,
    baseGold: 0,
    tier: 3,
    hidden: false
  },
  {
    id: 'networker',
    title: 'Web of Favors',
    category: 'Social',
    requirement: 'Know someone in every single major city and faction capable of granting a favor.',
    renownReward: 500,
    baseXP: 1000,
    baseGold: 0,
    tier: 3,
    hidden: false
  },

  // ==========================================
  // SURVIVAL
  // ==========================================
  {
    id: 'starvation',
    title: 'On the Brink',
    category: 'Survival',
    requirement: 'Survive for seven consecutive, harrowing days in the wilderness with absolutely zero food rations.',
    renownReward: 100,
    baseXP: 300,
    baseGold: 0,
    tier: 1,
    hidden: false
  },
  {
    id: 'dehydration',
    title: 'Dust-Mouth',
    category: 'Survival',
    requirement: 'Survive for 3 days with zero water in a desert climate.',
    renownReward: 150,
    baseXP: 400,
    baseGold: 0,
    tier: 1,
    hidden: false
  },
  {
    id: 'poison_resistant',
    title: 'Iron Stomach',
    category: 'Survival',
    requirement: 'Survive a confirmed lethal dose of poison coursing through your veins without ever drinking an antidote.',
    renownReward: 200,
    baseXP: 500,
    baseGold: 0,
    tier: 2,
    hidden: false
  },
  {
    id: 'disease_vector',
    title: 'Plague Survivor',
    category: 'Survival',
    requirement: 'Contract and naturally recover through sheer constitution from five distinct, ordinarily lethal diseases.',
    renownReward: 250,
    baseXP: 600,
    baseGold: 50,
    tier: 2,
    hidden: false
  },
  {
    id: 'blizzard_walker',
    title: 'Ice-Veins',
    category: 'Survival',
    requirement: 'Survive an unprotected night outside during a howling arcane blizzard of the highest fury.',
    renownReward: 300,
    baseXP: 700,
    baseGold: 0,
    tier: 2,
    hidden: false
  },
  {
    id: 'lone_wolf',
    title: 'Solitary Confinement',
    category: 'Survival',
    requirement: 'Spend 30 consecutive days in the wilderness without entering a town.',
    renownReward: 150,
    baseXP: 400,
    baseGold: 0,
    tier: 1,
    hidden: false
  },
  {
    id: 'hunter_gatherer',
    title: 'Off the Land',
    category: 'Survival',
    requirement: 'Cook 100 meals entirely from foraged herbs and hunted meat.',
    renownReward: 100,
    baseXP: 300,
    baseGold: 50,
    tier: 1,
    hidden: false
  },
  {
    id: 'bear_wrestler',
    title: 'Apex Predator',
    category: 'Survival',
    requirement: 'Kill a dire bear using only a hunting knife and no armor.',
    renownReward: 200,
    baseXP: 500,
    baseGold: 100,
    tier: 2,
    hidden: false
  },
  {
    id: 'fall_survivor',
    title: 'Miracle Landing',
    category: 'Survival',
    requirement: 'Survive a devastating, bone-shattering fall from the clouds to the ground without any magical means.',
    renownReward: 400,
    baseXP: 800,
    baseGold: 0,
    tier: 3,
    hidden: false
  },
  {
    id: 'drowning_man',
    title: 'Breathless',
    category: 'Survival',
    requirement: 'Survive fully submerged underwater for ten excruciating minutes continuously without any magical assistance.',
    renownReward: 150,
    baseXP: 450,
    baseGold: 0,
    tier: 1,
    hidden: false
  },
  {
    id: 'cave_in',
    title: 'Buried Alive',
    category: 'Survival',
    requirement: 'Dig your way out of a completely collapsed mine shaft.',
    renownReward: 250,
    baseXP: 600,
    baseGold: 0,
    tier: 2,
    hidden: false
  },
  {
    id: 'shipwrecked',
    title: 'Castaway',
    category: 'Survival',
    requirement: 'Survive being shipwrecked on a deserted island and make it back to civilization.',
    renownReward: 300,
    baseXP: 700,
    baseGold: 200,
    tier: 2,
    hidden: false
  },
  {
    id: 'oasis_finder',
    title: 'Mirage Breaker',
    category: 'Survival',
    requirement: 'Locate a hidden, life-saving oasis in the trackless desert while suffering from severe, vision-blurring dehydration.',
    renownReward: 100,
    baseXP: 300,
    baseGold: 0,
    tier: 1,
    hidden: false
  },
  {
    id: 'bushcraft_expert',
    title: 'Camp Master',
    category: 'Survival',
    requirement: 'Construct an impregnable wilderness camp that fends off a night raid automatically.',
    renownReward: 200,
    baseXP: 500,
    baseGold: 50,
    tier: 2,
    hidden: false
  },
  {
    id: 'relentless_tracker',
    title: 'Master Tracker',
    category: 'Survival',
    requirement: 'Track a wounded target for 50 miles without losing the trail.',
    renownReward: 150,
    baseXP: 400,
    baseGold: 100,
    tier: 1,
    hidden: false
  },
  {
    id: 'scavenger',
    title: 'Refuse-Eater',
    category: 'Survival',
    requirement: 'Survive for a week eating only raw, spoiled, or cursed food.',
    renownReward: 100,
    baseXP: 300,
    baseGold: 0,
    tier: 1,
    hidden: false
  },
  {
    id: 'burn_ward',
    title: 'Fire-Walker',
    category: 'Survival',
    requirement: 'Survive being fully submerged in a pool of scorching magma or volcanic lava by any means necessary.',
    renownReward: 350,
    baseXP: 800,
    baseGold: 0,
    tier: 2,
    hidden: false
  },
  {
    id: 'lightning_rod',
    title: 'Storm-Catcher',
    category: 'Survival',
    requirement: 'Be struck by violent, natural bolt lightning on three separate occasions and miraculously survive each time.',
    renownReward: 250,
    baseXP: 500,
    baseGold: 0,
    tier: 2,
    hidden: false
  },
  {
    id: 'acid_bath',
    title: 'Corrosive Baptism',
    category: 'Survival',
    requirement: 'Survive being swallowed by a massive ooze or acidic beast.',
    renownReward: 200,
    baseXP: 450,
    baseGold: 50,
    tier: 2,
    hidden: false
  },
  {
    id: 'parasite_host',
    title: 'Symbiosis',
    category: 'Survival',
    requirement: 'Live with an extreme parasitic infection for a month without dying or curing it.',
    renownReward: 300,
    baseXP: 600,
    baseGold: 0,
    tier: 2,
    hidden: true
  },
  {
    id: 'nocturnal_predator',
    title: 'Creature of the Dark',
    category: 'Survival',
    requirement: 'Operate entirely at night for 30 consecutive days, avoiding daylight completely.',
    renownReward: 150,
    baseXP: 400,
    baseGold: 0,
    tier: 1,
    hidden: false
  },
  {
    id: 'trap_survival',
    title: 'Pin-Cushion',
    category: 'Survival',
    requirement: 'Endure and survive taking over one thousand points of cumulative damage purely from environmental traps.',
    renownReward: 100,
    baseXP: 300,
    baseGold: 0,
    tier: 1,
    hidden: false
  },
  {
    id: 'madness_survivor',
    title: 'Broken but Unbowed',
    category: 'Survival',
    requirement: 'Recover naturally from a Level 3 Insanity without magical intervention.',
    renownReward: 400,
    baseXP: 900,
    baseGold: 0,
    tier: 3,
    hidden: true
  },
  {
    id: 'exhaustion',
    title: 'Walking Corpse',
    category: 'Survival',
    requirement: 'Fight and win a battle while suffering from maximum systemic exhaustion.',
    renownReward: 350,
    baseXP: 700,
    baseGold: 0,
    tier: 2,
    hidden: false
  },
  {
    id: 'wilderness_king',
    title: 'Lord of the Wilds',
    category: 'Survival',
    requirement: 'Tame an apex predator purely through dominance and survival skill.',
    renownReward: 500,
    baseXP: 1000,
    baseGold: 0,
    tier: 3,
    hidden: true
  },

  // ==========================================
  // ARCANE
  // ==========================================
  {
    id: 'first_spell',
    title: 'Spark of Magic',
    category: 'Arcane',
    requirement: 'Channel the arcane for the first time and successfully cast your very first magical spell.',
    renownReward: 10,
    baseXP: 50,
    baseGold: 0,
    tier: 1,
    hidden: false
  },
  {
    id: 'archmage',
    title: 'Archmage',
    category: 'Arcane',
    requirement: 'Unlock the secrets of and successfully cast a devastating Master-level spell from any arcane school.',
    renownReward: 400,
    baseXP: 1000,
    baseGold: 0,
    tier: 3,
    hidden: false
  },
  {
    id: 'arcane_overload',
    title: 'Overload',
    category: 'Arcane',
    requirement: 'Cast a spell that consumes your own health because you lack sufficient mana.',
    renownReward: 100,
    baseXP: 250,
    baseGold: 0,
    tier: 1,
    hidden: false
  },
  {
    id: 'wild_magic',
    title: 'Unpredictable',
    category: 'Arcane',
    requirement: 'Trigger a catastrophic Wild Magic surge and survive the effects.',
    renownReward: 150,
    baseXP: 400,
    baseGold: 0,
    tier: 1,
    hidden: true
  },
  {
    id: 'counter_spell',
    title: 'Denial',
    category: 'Arcane',
    requirement: 'Successfully interrupt and counterspell an enemy spellcaster\'s incantation on fifty separate occasions.',
    renownReward: 200,
    baseXP: 500,
    baseGold: 50,
    tier: 2,
    hidden: false
  },
  {
    id: 'portal_master',
    title: 'Rift-Bender',
    category: 'Arcane',
    requirement: 'Open a stable rift to a completely different plane of existence.',
    renownReward: 350,
    baseXP: 800,
    baseGold: 100,
    tier: 2,
    hidden: false
  },
  {
    id: 'necromancer',
    title: 'Army of the Dead',
    category: 'Arcane',
    requirement: 'Maintain the dark focus required to have twenty undead minions animated and obedient under your command simultaneously.',
    renownReward: 300,
    baseXP: 600,
    baseGold: 0,
    tier: 2,
    hidden: true
  },
  {
    id: 'elementalist',
    title: 'Master of Elements',
    category: 'Arcane',
    requirement: 'Deal Fire, Cold, Lightning, and Acid damage to a single target in one turn.',
    renownReward: 250,
    baseXP: 550,
    baseGold: 0,
    tier: 2,
    hidden: false
  },
  {
    id: 'illusionist',
    title: 'Smoke and Mirrors',
    category: 'Arcane',
    requirement: 'Complete a major quest using only illusion magic without dealing direct damage.',
    renownReward: 300,
    baseXP: 700,
    baseGold: 200,
    tier: 2,
    hidden: false
  },
  {
    id: 'mind_controller',
    title: 'Puppet Master',
    category: 'Arcane',
    requirement: 'Seize complete mental control over a powerful enemy leader and force them to slaughter their own loyal minions.',
    renownReward: 250,
    baseXP: 600,
    baseGold: 0,
    tier: 2,
    hidden: false
  },
  {
    id: 'alchemy_transmutation',
    title: 'Lead to Gold',
    category: 'Arcane',
    requirement: 'Successfully transmute 1,000 lbs of base material into pure gold.',
    renownReward: 400,
    baseXP: 800,
    baseGold: 10000,
    tier: 3,
    hidden: false
  },
  {
    id: 'familiar_bond',
    title: 'Soul-Tether',
    category: 'Arcane',
    requirement: 'Maintain an unbroken bond with a magical familiar for a year of in-game time.',
    renownReward: 150,
    baseXP: 400,
    baseGold: 0,
    tier: 1,
    hidden: false
  },
  {
    id: 'spell_crafter',
    title: 'Arcane Innovator',
    category: 'Arcane',
    requirement: 'Research, invent, and permanently inscribe into your spellbook a completely original and custom spell.',
    renownReward: 500,
    baseXP: 1500,
    baseGold: 0,
    tier: 3,
    hidden: false
  },
  {
    id: 'ward_breaker',
    title: 'Shield-Shatterer',
    category: 'Arcane',
    requirement: 'Dismantle a supremely powerful, multi-layered magical ward using nothing but raw dispel magic and willpower.',
    renownReward: 200,
    baseXP: 450,
    baseGold: 50,
    tier: 2,
    hidden: false
  },
  {
    id: 'leyline_tapper',
    title: 'Vein-Drinker',
    category: 'Arcane',
    requirement: 'Absorb raw magical energy directly from a planetary leyline intersection.',
    renownReward: 350,
    baseXP: 750,
    baseGold: 0,
    tier: 2,
    hidden: false
  },
  {
    id: 'time_weaver',
    title: 'Chronos',
    category: 'Arcane',
    requirement: 'Successfully pause, haste, or rewind time to alter a fatal outcome.',
    renownReward: 450,
    baseXP: 1000,
    baseGold: 0,
    tier: 3,
    hidden: false
  },
  {
    id: 'blood_magic',
    title: 'Crimson Sorcery',
    category: 'Arcane',
    requirement: 'Fuel one hundred consecutive and agonizing spellcasts entirely with the sacrifice of your own blood.',
    renownReward: 250,
    baseXP: 600,
    baseGold: 0,
    tier: 2,
    hidden: true
  },
  {
    id: 'curse_breaker',
    title: 'Purifier',
    category: 'Arcane',
    requirement: 'Lift an ancient and deeply rooted, region-wide curse from a blighted, suffering land and restore it.',
    renownReward: 500,
    baseXP: 1200,
    baseGold: 500,
    tier: 3,
    hidden: false
  },
  {
    id: 'ritualist',
    title: 'Circle Caster',
    category: 'Arcane',
    requirement: 'Complete a grueling twelve-hour high-magic ritual without a single interruption, misstep, or break in concentration.',
    renownReward: 200,
    baseXP: 500,
    baseGold: 100,
    tier: 2,
    hidden: false
  },
  {
    id: 'rune_reader',
    title: 'Truename Speaker',
    category: 'Arcane',
    requirement: 'Discover through forbidden research and speak aloud the Truename of a powerful otherworldly entity.',
    renownReward: 400,
    baseXP: 900,
    baseGold: 0,
    tier: 3,
    hidden: false
  },
  {
    id: 'astral_projection',
    title: 'Silver Cord',
    category: 'Arcane',
    requirement: 'Travel the astral plane and return to your body after a week of projection.',
    renownReward: 300,
    baseXP: 700,
    baseGold: 0,
    tier: 2,
    hidden: false
  },
  {
    id: 'golem_commander',
    title: 'Animate Army',
    category: 'Arcane',
    requirement: 'Maintain simultaneous magical control over five or more large animated constructs without losing command.',
    renownReward: 250,
    baseXP: 600,
    baseGold: 0,
    tier: 2,
    hidden: false
  },
  {
    id: 'pact_maker',
    title: 'Bargainer',
    category: 'Arcane',
    requirement: 'Seal a magical pact with an otherworldly entity and exploit a loophole to escape it.',
    renownReward: 350,
    baseXP: 800,
    baseGold: 0,
    tier: 2,
    hidden: true
  },
  {
    id: 'weather_changer',
    title: 'Storm-Bringer',
    category: 'Arcane',
    requirement: 'Harness enough arcane power to fundamentally change the weather patterns across an entire province using magic.',
    renownReward: 300,
    baseXP: 750,
    baseGold: 0,
    tier: 2,
    hidden: false
  },
  {
    id: 'omnipotence',
    title: 'God-Touched',
    category: 'Arcane',
    requirement: 'Temporarily gain access to a divine spell tier above mortal limits.',
    renownReward: 1000,
    baseXP: 2500,
    baseGold: 0,
    tier: 3,
    hidden: true
  },

  // ==========================================
  // WEALTH
  // ==========================================
  {
    id: 'first_coin',
    title: 'Penny-Pincher',
    category: 'Wealth',
    requirement: 'Scrape together and finally acquire your very first one hundred gold through any means.',
    renownReward: 10,
    baseXP: 50,
    baseGold: 0,
    tier: 1,
    hidden: false
  },
  {
    id: 'hoarder',
    title: 'Dragon\'s Envy',
    category: 'Wealth',
    requirement: 'Hold 100,000 gold in your personal inventory at once.',
    renownReward: 300,
    baseXP: 800,
    baseGold: 0,
    tier: 2,
    hidden: false
  },
  {
    id: 'property_owner',
    title: 'Landlord',
    category: 'Wealth',
    requirement: 'Save enough gold to purchase a private, personal residence within the walls of a major city.',
    renownReward: 150,
    baseXP: 400,
    baseGold: 0,
    tier: 1,
    hidden: false
  },
  {
    id: 'business_mogul',
    title: 'Trade Baron',
    category: 'Wealth',
    requirement: 'Establish and own five separate, highly profitable businesses all running successfully at the same time.',
    renownReward: 400,
    baseXP: 1000,
    baseGold: 5000,
    tier: 3,
    hidden: false
  },
  {
    id: 'gem_collector',
    title: 'Shiny Things',
    category: 'Wealth',
    requirement: 'Collect one pristine, flawless example of every single gemstone type known to the jewelers of Aetheris.',
    renownReward: 200,
    baseXP: 500,
    baseGold: 1000,
    tier: 2,
    hidden: false
  },
  {
    id: 'auction_winner',
    title: 'High Bidder',
    category: 'Wealth',
    requirement: 'Outbid every cutthroat and crime lord to win a legendary item at the secretive Black Market auction.',
    renownReward: 250,
    baseXP: 600,
    baseGold: 0,
    tier: 2,
    hidden: false
  },
  {
    id: 'debt_free',
    title: 'Clean Slate',
    category: 'Wealth',
    requirement: 'Pay off a 50,000 gold debt to a major syndicate or bank.',
    renownReward: 200,
    baseXP: 500,
    baseGold: 0,
    tier: 2,
    hidden: false
  },
  {
    id: 'levy_dodger',
    title: 'Levy Dodger',
    category: 'Wealth',
    requirement: 'Avoid paying tithes and crown levies on over 100,000 gold worth of earnings.',
    renownReward: 300,
    baseXP: 700,
    baseGold: 0,
    tier: 2,
    hidden: true
  },
  {
    id: 'treasure_hunter',
    title: 'X Marks the Spot',
    category: 'Wealth',
    requirement: 'Follow cryptic maps and dig up ten completely hidden, long-buried treasure hoards from the earth.',
    renownReward: 150,
    baseXP: 400,
    baseGold: 2000,
    tier: 1,
    hidden: false
  },
  {
    id: 'high_roller',
    title: 'High Roller',
    category: 'Wealth',
    requirement: 'Win 10,000 gold in a single sitting at a gambling establishment.',
    renownReward: 200,
    baseXP: 500,
    baseGold: 0,
    tier: 2,
    hidden: false
  },
  {
    id: 'philanthropist',
    title: 'Spreading the Wealth',
    category: 'Wealth',
    requirement: 'Donate 25,000 gold to city works, temples, and the poor.',
    renownReward: 350,
    baseXP: 800,
    baseGold: 0,
    tier: 2,
    hidden: false
  },
  {
    id: 'counterfeiter',
    title: 'Fool\'s Gold',
    category: 'Wealth',
    requirement: 'Spend over five thousand gold worth of expertly crafted counterfeit coins without a single merchant noticing.',
    renownReward: 250,
    baseXP: 600,
    baseGold: 0,
    tier: 2,
    hidden: true
  },
  {
    id: 'art_collector',
    title: 'Patron of the Arts',
    category: 'Wealth',
    requirement: 'Assemble a private gallery containing ten masterpiece paintings by the most renowned artists of the age.',
    renownReward: 200,
    baseXP: 450,
    baseGold: 0,
    tier: 2,
    hidden: false
  },
  {
    id: 'ship_owner',
    title: 'Fleet Commander',
    category: 'Wealth',
    requirement: 'Own and operate a fleet of 5 customized trade galleons.',
    renownReward: 300,
    baseXP: 800,
    baseGold: 0,
    tier: 2,
    hidden: false
  },
  {
    id: 'castle_lord',
    title: 'Feudal Lord',
    category: 'Wealth',
    requirement: 'Purchase, fully staff with loyal soldiers, and maintain a completely upgraded military stronghold.',
    renownReward: 500,
    baseXP: 1500,
    baseGold: 0,
    tier: 3,
    hidden: false
  },
  {
    id: 'bribe_the_gods',
    title: 'Divine Indulgence',
    category: 'Wealth',
    requirement: 'Donate an absurd sum of gold to a temple to instantly erase high criminality.',
    renownReward: 400,
    baseXP: 800,
    baseGold: 0,
    tier: 3,
    hidden: false
  },
  {
    id: 'scrooge',
    title: 'Miserly',
    category: 'Wealth',
    requirement: 'Hold 50,000 gold but sleep in the streets and eat only gruel for a month.',
    renownReward: 150,
    baseXP: 300,
    baseGold: 0,
    tier: 1,
    hidden: false
  },
  {
    id: 'trade_flood',
    title: 'Trade Syndicate',
    category: 'Wealth',
    requirement: 'Crash a town\'s trade by flooding its market stalls with cheap goods, then buy the land cheap.',
    renownReward: 450,
    baseXP: 1000,
    baseGold: 0,
    tier: 3,
    hidden: false
  },
  {
    id: 'bounty_hunter_rich',
    title: 'Headhunter',
    category: 'Wealth',
    requirement: 'Earn a fortune of fifty thousand gold strictly from hunting down and turning in wanted bounties.',
    renownReward: 250,
    baseXP: 600,
    baseGold: 0,
    tier: 2,
    hidden: false
  },
  {
    id: 'gilded_armor',
    title: 'Golden Boy',
    category: 'Wealth',
    requirement: 'Wear a complete set of fully functional, solid gold armor in combat.',
    renownReward: 200,
    baseXP: 400,
    baseGold: 0,
    tier: 2,
    hidden: false
  },
  {
    id: 'extortionist',
    title: 'Protection Money',
    category: 'Wealth',
    requirement: 'Extract over ten thousand gold in protection fees by threatening and intimidating local merchants into paying.',
    renownReward: 250,
    baseXP: 550,
    baseGold: 0,
    tier: 2,
    hidden: true
  },
  {
    id: 'vault_robber',
    title: 'The Big Heist',
    category: 'Wealth',
    requirement: 'Successfully rob a merchant guild treasury leaving absolutely no evidence.',
    renownReward: 500,
    baseXP: 1200,
    baseGold: 20000,
    tier: 3,
    hidden: true
  },
  {
    id: 'smuggler_king',
    title: 'Contraband',
    category: 'Wealth',
    requirement: 'Move 100,000 gold worth of illegal goods across heavily guarded borders.',
    renownReward: 350,
    baseXP: 800,
    baseGold: 0,
    tier: 2,
    hidden: true
  },
  {
    id: 'shadow_buyer',
    title: 'Shadow Broker',
    category: 'Wealth',
    requirement: 'Use purchased secrets to buy cheap land right before a royal development project.',
    renownReward: 300,
    baseXP: 700,
    baseGold: 5000,
    tier: 2,
    hidden: false
  },
  {
    id: 'midas_touch',
    title: 'Golden Legacy',
    category: 'Wealth',
    requirement: 'Retire your character as the wealthiest individual in the known world.',
    renownReward: 1000,
    baseXP: 3000,
    baseGold: 0,
    tier: 3,
    hidden: false
  },

  // ==========================================
  // INFAMY
  // ==========================================
  {
    id: 'first_crime',
    title: 'Petty Thief',
    category: 'Infamy',
    requirement: 'Commit your very first officially reported crime and earn a bounty on your head.',
    renownReward: 10,
    baseXP: 50,
    baseGold: 0,
    tier: 1,
    hidden: true
  },
  {
    id: 'public_enemy',
    title: 'Public Enemy No. 1',
    category: 'Infamy',
    requirement: 'Commit such vile deeds that a continent-wide bounty of over one hundred thousand gold is placed on your head.',
    renownReward: 500,
    baseXP: 1000,
    baseGold: 0,
    tier: 3,
    hidden: true
  },
  {
    id: 'jailbreak',
    title: 'Slippery',
    category: 'Infamy',
    requirement: 'Escape from a heavily fortified, maximum-security dungeon prison entirely without any exterior help.',
    renownReward: 250,
    baseXP: 600,
    baseGold: 0,
    tier: 2,
    hidden: true
  },
  {
    id: 'assassin',
    title: 'Blade of the Black Hand',
    category: 'Infamy',
    requirement: 'Accept and ruthlessly complete twenty separate assassination contracts targeting entirely innocent, unarmed civilians.',
    renownReward: 300,
    baseXP: 700,
    baseGold: 1000,
    tier: 2,
    hidden: true
  },
  {
    id: 'arsonist',
    title: 'Some Men Just Want to Watch',
    category: 'Infamy',
    requirement: 'Set fire to and burn five major municipal buildings to the ground, watching them collapse in flames.',
    renownReward: 200,
    baseXP: 500,
    baseGold: 0,
    tier: 2,
    hidden: true
  },
  {
    id: 'grave_robber',
    title: 'Defiler',
    category: 'Infamy',
    requirement: 'Desecrate and systematically loot fifty royal tombs or holy gravesites of their sacred burial treasures.',
    renownReward: 150,
    baseXP: 400,
    baseGold: 500,
    tier: 1,
    hidden: true
  },
  {
    id: 'usurper',
    title: 'Kingslayer',
    category: 'Infamy',
    requirement: 'Infiltrate the royal court and personally assassinate the reigning monarch of a major world faction.',
    renownReward: 600,
    baseXP: 1500,
    baseGold: 0,
    tier: 3,
    hidden: true
  },
  {
    id: 'traitor',
    title: 'Stabbed in the Back',
    category: 'Infamy',
    requirement: 'Betray a faction after reaching max reputation, handing their secrets to rivals.',
    renownReward: 400,
    baseXP: 900,
    baseGold: 1000,
    tier: 3,
    hidden: true
  },
  {
    id: 'poison_well',
    title: 'Blight-Bringer',
    category: 'Infamy',
    requirement: 'Poison the water supply of a major city, causing widespread plague.',
    renownReward: 500,
    baseXP: 1200,
    baseGold: 0,
    tier: 3,
    hidden: true
  },
  {
    id: 'bandit_lord',
    title: 'Highwayman',
    category: 'Infamy',
    requirement: 'Ambush and rob one hundred traveling merchant caravans along the lawless stretches of the open road.',
    renownReward: 300,
    baseXP: 750,
    baseGold: 2000,
    tier: 2,
    hidden: true
  },
  {
    id: 'kidnapper',
    title: 'Blood Ransom',
    category: 'Infamy',
    requirement: 'Kidnap a noble heir and successfully extract a massive ransom payment.',
    renownReward: 250,
    baseXP: 600,
    baseGold: 5000,
    tier: 2,
    hidden: true
  },
  {
    id: 'corrupt_guard',
    title: 'Inside Man',
    category: 'Infamy',
    requirement: 'Bribe city guards to execute an innocent person on forged charges.',
    renownReward: 200,
    baseXP: 500,
    baseGold: 0,
    tier: 2,
    hidden: true
  },
  {
    id: 'blasphemer',
    title: 'Godless',
    category: 'Infamy',
    requirement: 'Desecrate the high altars of five different major deities, earning their wrath and their clergy\'s hatred.',
    renownReward: 350,
    baseXP: 800,
    baseGold: 0,
    tier: 2,
    hidden: true
  },
  {
    id: 'necropolis',
    title: 'City of the Dead',
    category: 'Infamy',
    requirement: 'Slaughter an entire village and reanimate its citizens as your undead servants.',
    renownReward: 600,
    baseXP: 1500,
    baseGold: 0,
    tier: 3,
    hidden: true
  },
  {
    id: 'pirate_scourge',
    title: 'Terror of the Seas',
    category: 'Infamy',
    requirement: 'Sink 50 civilian or naval vessels while flying a black flag.',
    renownReward: 400,
    baseXP: 900,
    baseGold: 3000,
    tier: 3,
    hidden: true
  },
  {
    id: 'racketeer',
    title: 'Mob Boss',
    category: 'Infamy',
    requirement: 'Seize complete, uncontested control of an entire city\'s criminal underworld operations through force and cunning.',
    renownReward: 450,
    baseXP: 1000,
    baseGold: 0,
    tier: 3,
    hidden: true
  },
  {
    id: 'black_market',
    title: 'Flesh Peddler',
    category: 'Infamy',
    requirement: 'Engage in the highly illegal trade of sentient slaves or contraband organs.',
    renownReward: 300,
    baseXP: 700,
    baseGold: 0,
    tier: 2,
    hidden: true
  },
  {
    id: 'torturer',
    title: 'Information Extraction',
    category: 'Infamy',
    requirement: 'Use extreme and horrifying torture implements on ten different captives to extract confessions or break their will.',
    renownReward: 150,
    baseXP: 400,
    baseGold: 0,
    tier: 1,
    hidden: true
  },
  {
    id: 'fraudster',
    title: 'Fool\'s Trust',
    category: 'Infamy',
    requirement: 'Run a massive swindle that drains a noble house\'s coffers to nothing.',
    renownReward: 250,
    baseXP: 650,
    baseGold: 4000,
    tier: 2,
    hidden: true
  },
  {
    id: 'warmonger',
    title: 'Dogs of War',
    category: 'Infamy',
    requirement: 'Manufacture forged evidence that sparks a bloody war between two peaceful nations.',
    renownReward: 700,
    baseXP: 1600,
    baseGold: 0,
    tier: 3,
    hidden: true
  },
  {
    id: 'summoned_doom',
    title: 'The Gatekeeper',
    category: 'Infamy',
    requirement: 'Intentionally summon an uncontrollable abyssal horror into a populated area.',
    renownReward: 500,
    baseXP: 1200,
    baseGold: 0,
    tier: 3,
    hidden: true
  },
  {
    id: 'mind_breaker',
    title: 'Mind-Shatterer',
    category: 'Infamy',
    requirement: 'Drive a prominent figure permanently insane using illusion or enchantment magic.',
    renownReward: 250,
    baseXP: 600,
    baseGold: 0,
    tier: 2,
    hidden: true
  },
  {
    id: 'relentless_pursuit',
    title: 'No Quarter',
    category: 'Infamy',
    requirement: 'Hunt down a fleeing target for an entire month across multiple regions to execute them.',
    renownReward: 300,
    baseXP: 700,
    baseGold: 0,
    tier: 2,
    hidden: true
  },
  {
    id: 'cannibal',
    title: 'Wendigo\'s Hunger',
    category: 'Infamy',
    requirement: 'Commit the ultimate taboo and consume the flesh of twenty sentient humanoids, losing your own humanity.',
    renownReward: 200,
    baseXP: 500,
    baseGold: 0,
    tier: 2,
    hidden: true
  },
  {
    id: 'vilest_evil',
    title: 'Dark Lord',
    category: 'Infamy',
    requirement: 'Reach maximum negative reputation in every corner of the known world.',
    renownReward: 1000,
    baseXP: 2500,
    baseGold: 0,
    tier: 3,
    hidden: true
  },

  // ==========================================
  // FACTION
  // ==========================================
  {
    id: 'guild_initiate',
    title: 'Pledged',
    category: 'Faction',
    requirement: 'Formally pledge allegiance and join your very first guild or major political faction.',
    renownReward: 10,
    baseXP: 50,
    baseGold: 0,
    tier: 1,
    hidden: false
  },
  {
    id: 'guild_master',
    title: 'The Grandmaster',
    category: 'Faction',
    requirement: 'Reach the absolute highest tier of leadership within a major faction.',
    renownReward: 500,
    baseXP: 1500,
    baseGold: 1000,
    tier: 3,
    hidden: false
  },
  {
    id: 'double_agent',
    title: 'Two-Faced',
    category: 'Faction',
    requirement: 'Hold high ranks in two fiercely rival factions simultaneously without them knowing.',
    renownReward: 400,
    baseXP: 1000,
    baseGold: 0,
    tier: 3,
    hidden: true
  },
  {
    id: 'faction_war',
    title: 'Line in the Sand',
    category: 'Faction',
    requirement: 'Lead a faction raid to completely destroy a rival guild hall.',
    renownReward: 350,
    baseXP: 800,
    baseGold: 500,
    tier: 2,
    hidden: false
  },
  {
    id: 'loyal_soldier',
    title: 'To the Death',
    category: 'Faction',
    requirement: 'Demonstrate unwavering loyalty by completing one hundred radiant quests for a single faction without betrayal.',
    renownReward: 250,
    baseXP: 650,
    baseGold: 0,
    tier: 2,
    hidden: false
  }
];

