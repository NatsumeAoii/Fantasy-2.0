import type { VariantDef } from '../inventory/types';

/**
 * A pet variant with an optional passive stat bonus.
 * Extends the shared VariantDef with companion-specific mechanical data.
 */
export interface PetVariantDef extends VariantDef {
    passiveBonus?: { stat: string; value: number };
}

export type PetClass = 'BEAST' | 'MAGICAL' | 'CONSTRUCT' | 'UNDEAD' | 'FEY' | 'DRACONIC' | 'MYTHIC' | 'DEMONIC' | 'ABERRATION';
export type PetAvailability = 'ALL_ROLES' | 'ALL_RACES' | 'SPECIFIC_ROLE' | 'SPECIFIC_RACE';
export type PetTier = 1 | 2 | 3 | 4 | 5 | 6;

/**
 * A companion animal that follows the character and provides passive stat bonuses.
 * Pets are earned through quests, purchased, or tamed in the wild.
 * Each pet has ten named variants representing visual or breed differences.
 */
export interface PetDef {
    id: string;
    name: string;
    variants: PetVariantDef[];
    petClass: PetClass;
    availability: PetAvailability;
    tier: PetTier;
    icon: string;
    groupBonus: { stat: string; value: number; type: 'flat' | 'percent' };
    loyalty: 'Fickle' | 'Loyal' | 'Devoted' | 'Magically Bound' | 'Soul-Tethered';
    diet: 'Carnivore' | 'Herbivore' | 'Omnivore' | 'Arcane' | 'None';
    baseMorale: number;
    rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic';
    validRaces?: string[]; 
    validRoles?: string[]; 
}

/** Master list of all available pets, organized by tier and availability. */
export const PETS: PetDef[] = [
    // ==========================================
    // CATEGORY 1: ALL ROLES (Universal Companions)
    // ==========================================
    {
        id: 'hound_companions',
        name: 'Hound Companions',
        variants: [
            { name: 'Bloodhound', desc: 'A relentless tracking dog with incredibly droopy ears.', passiveBonus: { stat: 'tracking', value: 1 }, price: 50 },
            { name: 'Mastiff', desc: 'A massive, heavily muscled hound used as a guard dog.', passiveBonus: { stat: 'tracking', value: 1 }, price: 80 },
            { name: 'Greyhound', desc: 'A sleek, blazingly fast dog bred for coursing prey.', passiveBonus: { stat: 'tracking', value: 2 }, price: 60 },
            { name: 'Timber Wolfdog', desc: 'Part wolf, retaining a wild, fierce streak.', passiveBonus: { stat: 'tracking', value: 1 }, price: 90 },
            { name: 'Shepherd Dog', desc: 'Highly intelligent, used universally to guard camps.', passiveBonus: { stat: 'tracking', value: 1 }, price: 40 },
            { name: 'War-Hound', desc: 'Fitted natively with spiked leather collars.', passiveBonus: { stat: 'tracking', value: 2 }, price: 120 },
            { name: 'Hearth Pug', desc: 'A snorting, useless, but deeply lovable noble companion.', passiveBonus: { stat: 'tracking', value: 1 }, price: 200 },
            { name: 'Mountain Rescue Dog', desc: 'Thick fur outlasts blizzards; carries warming spirits.', passiveBonus: { stat: 'tracking', value: 1 }, price: 110 },
            { name: 'Pit-Bull Terrier', desc: 'Incredibly stubborn and refuses to let go once it bites.', passiveBonus: { stat: 'tracking', value: 2 }, price: 70 },
            { name: 'Fox-Hound', desc: 'A highly energetic pack dog used to flush out small game.', passiveBonus: { stat: 'tracking', value: 1 }, price: 55 }
        ],
        petClass: 'BEAST',
        availability: 'ALL_ROLES',
        tier: 1,
        icon: 'GiWolfHead',
        groupBonus: { stat: 'tracking', value: 1, type: 'flat' },
        loyalty: 'Devoted',
        diet: 'Carnivore',
        baseMorale: 50,
        rarity: 'Common'
    },
    {
        id: 'feline_hunters',
        name: 'Feline Hunters',
        variants: [
            { name: 'Hunting Cheetah', desc: 'Tamed explicitly to hunt fast game in open plains.', passiveBonus: { stat: 'stealth', value: 1 }, price: 500 },
            { name: 'Taiga Bobcat', desc: 'Solitary and incredibly fierce when cornered.', passiveBonus: { stat: 'stealth', value: 1 }, price: 80 },
            { name: 'Savannah Lion Cub', desc: 'Playful but rapidly growing into a lethal predator.', passiveBonus: { stat: 'stealth', value: 2 }, price: 600 },
            { name: 'Highland Lynx', desc: 'Features huge tufted ears and an expert ambush instinct.', passiveBonus: { stat: 'stealth', value: 1 }, price: 120 },
            { name: 'Jungle Ocelot', desc: 'A beautiful, dappled wildcat that climbs trees effortlessly.', passiveBonus: { stat: 'stealth', value: 1 }, price: 150 },
            { name: 'Snow Leopard (Juvenile)', desc: 'Ghostly pale and practically invisible in snowscapes.', passiveBonus: { stat: 'stealth', value: 2 }, price: 700 },
            { name: 'Black Jaguar', desc: 'A heavy-muscled stalker capable of dragging armored prey up trees.', passiveBonus: { stat: 'stealth', value: 1 }, price: 900 },
            { name: 'Desert Caracal', desc: 'Uses its extremely powerful hind legs to snatch birds out of the air.', passiveBonus: { stat: 'stealth', value: 1 }, price: 300 },
            { name: 'Clouded Leopard Cub', desc: 'Highly acrobatic, frequently resting directly on its master\'s shoulders.', passiveBonus: { stat: 'stealth', value: 2 }, price: 400 },
            { name: 'Cougar', desc: 'A solitary mountain lion that aggressively defends its owner\'s campsite.', passiveBonus: { stat: 'stealth', value: 1 }, price: 250 }
        ],
        petClass: 'BEAST',
        availability: 'ALL_ROLES',
        tier: 2,
        icon: 'GiCat',
        groupBonus: { stat: 'stealth', value: 1, type: 'flat' },
        loyalty: 'Loyal',
        diet: 'Carnivore',
        baseMorale: 55,
        rarity: 'Uncommon'
    },
    {
        id: 'avian_scouts',
        name: 'Avian Scouts',
        variants: [
            { name: 'Peregrine Falcon', desc: 'The undisputed master of the high-speed diving stoop.', passiveBonus: { stat: 'awareness', value: 1 }, price: 150 },
            { name: 'Golden Eagle', desc: 'Massive wingspan, capable of pulling wolves right off slopes.', passiveBonus: { stat: 'awareness', value: 2 }, price: 300 },
            { name: 'Snowy Owl', desc: 'A silent, white-feathered hunter of the arctic tundra.', passiveBonus: { stat: 'awareness', value: 3 }, price: 200 },
            { name: 'Corpse Raven', desc: 'Highly intelligent corvid capable of mimicking human speech.', passiveBonus: { stat: 'awareness', value: 2 }, price: 50 },
            { name: 'Carrion Crow', desc: 'Used often to locate fresh battlefields or hidden corpses.', passiveBonus: { stat: 'awareness', value: 1 }, price: 20 },
            { name: 'Goshawk', desc: 'Adapted to hunting in dense, tangled forests without crashing.', passiveBonus: { stat: 'awareness', value: 3 }, price: 120 },
            { name: 'Storm-Crested Eagle', desc: 'Nests only during thunderstorms, unfazed by terrible weather.', passiveBonus: { stat: 'awareness', value: 2 }, price: 400 },
            { name: 'Night-Stalker Owl', desc: 'Completely blind, hunting purely by incredibly acute hearing.', passiveBonus: { stat: 'awareness', value: 1 }, price: 250 },
            { name: 'Desert Vulture', desc: 'A grim but highly effective tracker of weakened or dying prey.', passiveBonus: { stat: 'awareness', value: 3 }, price: 60 },
            { name: 'Vampire Bat Swarm (Tamed)', desc: 'A small flock of bats that swarm enemies to cause confusion.', passiveBonus: { stat: 'awareness', value: 2 }, price: 180 }
        ],
        petClass: 'BEAST',
        availability: 'ALL_ROLES',
        tier: 3,
        icon: 'GiEagleHead',
        groupBonus: { stat: 'awareness', value: 2, type: 'flat' },
        loyalty: 'Fickle',
        diet: 'Carnivore',
        baseMorale: 60,
        rarity: 'Rare'
    },
    {
        id: 'magical_constructs',
        name: 'Magical Constructs',
        variants: [
            { name: 'Floating Optic-Nerve', desc: 'A disembodied eye that relays visual information telepathically.', passiveBonus: { stat: 'cunning', value: 1 }, price: 1400 },
            { name: 'Alchemic Homunculus', desc: 'A tiny clay construct molded in its master\'s image.', passiveBonus: { stat: 'cunning', value: 1 }, price: 1500 },
            { name: 'Crawling Claw', desc: 'An animated, severed hand of a murderer, excellent for scouting.', passiveBonus: { stat: 'cunning', value: 2 }, price: 600 },
            { name: 'Fey-Weaver Spider (Brass)', desc: 'A mechanical spider whose webs mimic the tensile strength of steel.', passiveBonus: { stat: 'cunning', value: 1 }, price: 1100 },
            { name: 'Shadow-Mote', desc: 'A piece of sentient darkness that can smother out torches.', passiveBonus: { stat: 'cunning', value: 1 }, price: 1800 },
            { name: 'Clockwork Canary', desc: 'A golden bird that sings to warn of nearby poisonous gases.', passiveBonus: { stat: 'cunning', value: 2 }, price: 2000 },
            { name: 'Iron-Scarab', desc: 'A fist-sized beetle that can pick simple locks with its mandibles.', passiveBonus: { stat: 'cunning', value: 1 }, price: 1200 },
            { name: 'Obsidian Snake', desc: 'A sculpted serpent that comes alive to bite with magical venom.', passiveBonus: { stat: 'cunning', value: 1 }, price: 2500 },
            { name: 'Crystal-Prism Construct', desc: 'A floating gem that refracts light to create minor illusions.', passiveBonus: { stat: 'cunning', value: 2 }, price: 3000 },
            { name: 'Scroll-Guardian Golem', desc: 'A tiny paper golem that carries and protects important documents.', passiveBonus: { stat: 'cunning', value: 1 }, price: 800 }
        ],
        petClass: 'CONSTRUCT',
        availability: 'ALL_ROLES',
        tier: 4,
        icon: 'GiRobotAntennas',
        groupBonus: { stat: 'cunning', value: 1, type: 'flat' },
        loyalty: 'Magically Bound',
        diet: 'None',
        baseMorale: 70,
        rarity: 'Epic'
    },
    {
        id: 'spirit_guides',
        name: 'Spirit Guides',
        variants: [
            { name: 'Ancestral Wolf-Spirit', desc: 'A ghostly canine that guides the owner through treacherous blizzards.', passiveBonus: { stat: 'resistance', value: 5 }, price: 15000 },
            { name: 'Will-o\'-Wisp (Purified)', desc: 'A sentient ball of light that detects hidden traps automatically.', passiveBonus: { stat: 'resistance', value: 6 }, price: 12000 },
            { name: 'Phantom Stag-Fawn', desc: 'A tiny spectral deer that leaves trails of glowing hooftracks.', passiveBonus: { stat: 'resistance', value: 5 }, price: 10000 },
            { name: 'Echo-Raven', desc: 'A spiritual bird that can replay any conversation it heard in the past.', passiveBonus: { stat: 'resistance', value: 5 }, price: 18000 },
            { name: 'Hearth-Fire Salamander', desc: 'A living elemental spirit that rests in the campfire, keeping it burning perpetually.', passiveBonus: { stat: 'resistance', value: 5 }, price: 20000 },
            { name: 'Ghost-Lynx', desc: 'Can phase through solid walls to retrieve small objects for its master.', passiveBonus: { stat: 'resistance', value: 5 }, price: 25000 },
            { name: 'Wind-Sylph Mote', desc: 'A tiny elemental breeze that constantly deflects incoming arrows slightly.', passiveBonus: { stat: 'resistance', value: 5 }, price: 22000 },
            { name: 'Earth-Rumble Toad', desc: 'A spirit that senses seismic vibrations, impossible to ambush.', passiveBonus: { stat: 'resistance', value: 5 }, price: 16000 },
            { name: 'Tide-Whisper Eel', desc: 'A floating water-spirit that purifies all liquids the owner drinks.', passiveBonus: { stat: 'resistance', value: 5 }, price: 14000 },
            { name: 'Star-Crossed Owl', desc: 'A celestial projection that grants the owner perfect nightsight.', passiveBonus: { stat: 'resistance', value: 5 }, price: 30000 }
        ],
        petClass: 'MAGICAL',
        availability: 'ALL_ROLES',
        tier: 5,
        icon: 'GiFairyWand',
        groupBonus: { stat: 'resistance', value: 5, type: 'flat' },
        loyalty: 'Soul-Tethered',
        diet: 'Arcane',
        baseMorale: 80,
        rarity: 'Legendary'
    },
    {
        id: 'primordial_companions',
        name: 'Primordial Companions',
        variants: [
            { name: 'World-Wyrm Hatchling', desc: 'A coiled serpent whose breath corrodes the boundary between planes.', passiveBonus: { stat: 'resistance', value: 20 } },
            { name: 'Astral Stalker-Pup', desc: 'Phases between dimensions mid-stride; impossible to cage or restrain.', passiveBonus: { stat: 'resistance', value: 20 } },
            { name: 'Time-Locked Owl', desc: 'Perceives three seconds into the future, dodging strikes before they land.', passiveBonus: { stat: 'resistance', value: 20 } },
            { name: 'Void-Scarab', desc: 'A chitinous beetle that devours incoming spells and excretes raw mana.', passiveBonus: { stat: 'resistance', value: 20 } },
            { name: 'Primordial Flame-Hound', desc: 'Burns with fire older than the sun; its howl ignites the air itself.', passiveBonus: { stat: 'resistance', value: 20 } },
            { name: 'Genesis-Toad', desc: 'Wherever it sits, new plant life erupts violently from barren stone.', passiveBonus: { stat: 'resistance', value: 20 } },
            { name: 'Null-Cat', desc: 'Exists in a state of partial unreality; physical attacks pass through it.', passiveBonus: { stat: 'resistance', value: 20 } },
            { name: 'Entropy Moth', desc: 'Its wing-dust accelerates decay in nonliving material it touches.', passiveBonus: { stat: 'resistance', value: 20 } },
            { name: 'Rift-Weaver Spider', desc: 'Spins webs that tear small holes in the fabric of local space.', passiveBonus: { stat: 'resistance', value: 20 } },
            { name: 'Echo of the First Beast', desc: 'A shapeless predator from before names existed; terrifies all who see it.', passiveBonus: { stat: 'resistance', value: 20 } }
        ],
        petClass: 'MYTHIC',
        availability: 'ALL_ROLES',
        tier: 6,
        icon: 'GiEternalFire',
        groupBonus: { stat: 'resistance', value: 20, type: 'flat' },
        loyalty: 'Soul-Tethered',
        diet: 'Arcane',
        baseMorale: 100,
        rarity: 'Mythic'
    },

    // ==========================================
    // CATEGORY 2: ALL RACES (Universal Biology/Origin)
    // ==========================================
    {
        id: 'vermin_catchers',
        name: 'Vermin Catchers',
        variants: [
            { name: 'Terrier', desc: 'Small and scrappy, fearless when confronting badgers or vermin.', passiveBonus: { stat: 'tracking', value: 1 }, price: 15 },
            { name: 'Barn Cat', desc: 'A totally self-sufficient mouser looking for a dry place to sleep.', passiveBonus: { stat: 'tracking', value: 1 }, price: 2 },
            { name: 'Alley Tom', desc: 'Scarred, missing half an ear, incredibly street-smart.', passiveBonus: { stat: 'tracking', value: 2 }, price: 5 },
            { name: 'Rat-Catcher Terrier', desc: 'A rugged mutt surviving entirely on the rats it hunts.', passiveBonus: { stat: 'tracking', value: 1 }, price: 10 },
            { name: 'Ship\'s Cat', desc: 'Impervious to sea-sickness, keeps vermin off naval galleons.', passiveBonus: { stat: 'tracking', value: 1 }, price: 25 },
            { name: 'Hearth Ferret', desc: 'Slips easily into rat-holes to flush out infestations.', passiveBonus: { stat: 'tracking', value: 1 }, price: 12 },
            { name: 'Mongoose', desc: 'Incredibly fast and actively hunts highly venomous snakes.', passiveBonus: { stat: 'tracking', value: 2 }, price: 30 },
            { name: 'Barn Owl (Tame)', desc: 'Nests in the rafters and keeps the grain silos completely clear.', passiveBonus: { stat: 'tracking', value: 1 }, price: 40 },
            { name: 'Hedgehog', desc: 'A prickly little companion that eats slugs and minor garden pests.', passiveBonus: { stat: 'tracking', value: 1 }, price: 8 },
            { name: 'Corn-Snake', desc: 'A non-venomous but highly aggressive constrictor of mice.', passiveBonus: { stat: 'tracking', value: 2 }, price: 15 }
        ],
        petClass: 'BEAST',
        availability: 'ALL_RACES',
        tier: 1,
        icon: 'GiMouse',
        groupBonus: { stat: 'streetwise', value: 1, type: 'flat' },
        loyalty: 'Fickle',
        diet: 'Carnivore',
        baseMorale: 50,
        rarity: 'Common'
    },
    {
        id: 'desert_survivors',
        name: 'Arid Survivors',
        variants: [
            { name: 'Desert Sand-Cat', desc: 'Small, effectively camouflaged, survives entirely without drinking water.', passiveBonus: { stat: 'tracking', value: 1 }, price: 40 },
            { name: 'Horned Lizard', desc: 'Shoots foul-tasting blood from its eyes when heavily threatened.', passiveBonus: { stat: 'tracking', value: 1 }, price: 60 },
            { name: 'Fennec Fox', desc: 'Huge ears dissipate heat effectively. Excellent hearing in the dunes.', passiveBonus: { stat: 'tracking', value: 2 }, price: 80 },
            { name: 'Dune-Scorpion (Tamed)', desc: 'A large arachnid trained not to sting its owner.', passiveBonus: { stat: 'tracking', value: 1 }, price: 100 },
            { name: 'Sidewinder Snake', desc: 'Moves rapidly across loose sand; highly venomous.', passiveBonus: { stat: 'tracking', value: 1 }, price: 120 },
            { name: 'Desert Scarab', desc: 'A fist-sized beetle that burrows into the sand instantly.', passiveBonus: { stat: 'tracking', value: 2 }, price: 30 },
            { name: 'Oasis-Turtle', desc: 'Hard-shelled and incredibly slow, capable of storing water for months.', passiveBonus: { stat: 'tracking', value: 1 }, price: 50 },
            { name: 'Sun-Basking Iguana', desc: 'Grows highly lethargic at night, incredibly fast during the day.', passiveBonus: { stat: 'tracking', value: 1 }, price: 70 },
            { name: 'Tarantula Hawk Wasp', desc: 'A massive, terrifying wasp with a sting that paralyzes instantly.', passiveBonus: { stat: 'tracking', value: 2 }, price: 150 },
            { name: 'Vulture-Hatchling', desc: 'Disgusting to look at, but highly loyal to whoever feeds it.', passiveBonus: { stat: 'tracking', value: 1 }, price: 45 }
        ],
        petClass: 'BEAST',
        availability: 'ALL_RACES',
        tier: 2,
        icon: 'GiSnakeTongue',
        groupBonus: { stat: 'endurance', value: 1, type: 'flat' },
        loyalty: 'Loyal',
        diet: 'Carnivore',
        baseMorale: 55,
        rarity: 'Uncommon'
    },
    {
        id: 'cavern_dwellers',
        name: 'Cavern Dwellers',
        variants: [
            { name: 'Cave Spider (Juvenile)', desc: 'A dog-sized arachnid that spins sticky traps across dark hallways.', passiveBonus: { stat: 'tracking', value: 1 }, price: 200 },
            { name: 'Blind-Cave Bat', desc: 'Rests upside down on its owner\'s pack, shrieking if enemies approach.', passiveBonus: { stat: 'tracking', value: 2 }, price: 180 },
            { name: 'Glow-Worm', desc: 'A fat, wriggling grub that produces a cold, blue bioluminescence.', passiveBonus: { stat: 'tracking', value: 3 }, price: 150 },
            { name: 'Underdark Centipede', desc: 'Highly aggressive, segmented horror that bites with paralytic venom.', passiveBonus: { stat: 'tracking', value: 2 }, price: 300 },
            { name: 'Rock-Crab', desc: 'Completely ignores heavy blunt trauma, hiding instantly in its shell.', passiveBonus: { stat: 'tracking', value: 1 }, price: 250 },
            { name: 'Subterranean Toad', desc: 'Covered in warts that secrete a powerful hallucinogenic toxin.', passiveBonus: { stat: 'tracking', value: 3 }, price: 220 },
            { name: 'Blind-Cave Salamander', desc: 'A pale, eyeless amphibian that detects subtle vibrations in the stone.', passiveBonus: { stat: 'tracking', value: 2 }, price: 170 },
            { name: 'Fungal-Spore Beetle', desc: 'Cultivates glowing mushrooms on its own back for a food source.', passiveBonus: { stat: 'tracking', value: 1 }, price: 190 },
            { name: 'Stalactite-Moth', desc: 'Hangs perfectly still, mimicking rock formations until disturbed.', passiveBonus: { stat: 'tracking', value: 3 }, price: 160 },
            { name: 'Echo-Lizard', desc: 'A reptile that clicks loudly, using sonar to map the cave ahead.', passiveBonus: { stat: 'tracking', value: 2 }, price: 280 }
        ],
        petClass: 'BEAST',
        availability: 'ALL_RACES',
        tier: 3,
        icon: 'GiBat',
        groupBonus: { stat: 'spelunking', value: 2, type: 'flat' },
        loyalty: 'Fickle',
        diet: 'Carnivore',
        baseMorale: 60,
        rarity: 'Rare'
    },
    {
        id: 'elemental_motes',
        name: 'Elemental Motes',
        variants: [
            { name: 'Rock-Biter Mote', desc: 'A floating chunk of granite that actively chews on thrown pebbles.', passiveBonus: { stat: 'resistance', value: 4 }, price: 1000 },
            { name: 'Spark-Sprite', desc: 'A chaotic bundle of crackling arcane energy that shocks anyone who touches it.', passiveBonus: { stat: 'resistance', value: 5 }, price: 1200 },
            { name: 'Ash-Toad', desc: 'A warm, soot-colored amphibian that belches true cinders when stressed.', passiveBonus: { stat: 'resistance', value: 6 }, price: 800 },
            { name: 'Breeze-Dancer', desc: 'A tiny, invisible air elemental that constantly flutters the owner\'s cloak.', passiveBonus: { stat: 'resistance', value: 5 }, price: 1500 },
            { name: 'Puddle-Mephit', desc: 'A watery nuisance that actively tries to clean muddy boots.', passiveBonus: { stat: 'resistance', value: 4 }, price: 900 },
            { name: 'Frost-Nip Elemental', desc: 'A shard of ice that hovers nearby, keeping drinks perpetually cold.', passiveBonus: { stat: 'resistance', value: 6 }, price: 1100 },
            { name: 'Ember-Weaver', desc: 'A tiny fire elemental that happily consumes unwanted paperwork.', passiveBonus: { stat: 'resistance', value: 5 }, price: 1400 },
            { name: 'Silt-Shuffler', desc: 'A mud-spirit that quickly buries small objects out of sight.', passiveBonus: { stat: 'resistance', value: 4 }, price: 1300 },
            { name: 'Magma-Slag Crawler', desc: 'A molten insect that leaves tiny burn marks wherever it walks.', passiveBonus: { stat: 'resistance', value: 6 }, price: 1600 },
            { name: 'Storm-Cloud Puff', desc: 'A tiny, furious grey cloud that rains intensely over a 1foot radius.', passiveBonus: { stat: 'resistance', value: 5 }, price: 1800 }
        ],
        petClass: 'MAGICAL',
        availability: 'ALL_RACES',
        tier: 4,
        icon: 'GiWhirlwind',
        groupBonus: { stat: 'elemental_resistance', value: 10, type: 'percent' },
        loyalty: 'Magically Bound',
        diet: 'Arcane',
        baseMorale: 70,
        rarity: 'Epic'
    },
    {
        id: 'celestial_servants',
        name: 'Celestial Motes & Servants',
        variants: [
            { name: 'Sun-Mote', desc: 'A literal droplet of daylight that banishes magical darkness permanently.', passiveBonus: { stat: 'resistance', value: 9 }, price: 20000 },
            { name: 'Halo-Bearer Dove', desc: 'A bird with a golden ring floating above its head; pacifies aggressive beasts.', passiveBonus: { stat: 'resistance', value: 10 }, price: 18000 },
            { name: 'Star-Glass Cherub', desc: 'A tiny floating statue that weeps healing tears over the mortally wounded.', passiveBonus: { stat: 'resistance', value: 11 }, price: 25000 },
            { name: 'Lantern-Archon (Lesser)', desc: 'A floating sphere of geometric light that fires completely accurate beams of divine light.', passiveBonus: { stat: 'resistance', value: 10 }, price: 30000 },
            { name: 'Silver-Bell Sprite', desc: 'A holy fae that rings loudly to instantly awaken allies from magical sleep.', passiveBonus: { stat: 'resistance', value: 9 }, price: 15000 },
            { name: 'Dawn-Chaser Hound', desc: 'A celestial dog whose barks cause physical pain to undead entities.', passiveBonus: { stat: 'resistance', value: 11 }, price: 35000 },
            { name: 'Mercy-Weaver Spider', desc: 'Spins golden silk that acts as instant, high-strength medical bandages.', passiveBonus: { stat: 'resistance', value: 10 }, price: 22000 },
            { name: 'Scroll-Keeper Owl', desc: 'Infallibly memorizes any text it sees and recalls it telepathically.', passiveBonus: { stat: 'resistance', value: 9 }, price: 28000 },
            { name: 'Sanctified Shield-Beetle', desc: 'A heavy metallic insect that projects a holy forcefield over its master.', passiveBonus: { stat: 'resistance', value: 11 }, price: 40000 },
            { name: 'Choir-Bird', desc: 'An invisible avian whose song actively repels demonic incursions.', passiveBonus: { stat: 'resistance', value: 10 }, price: 50000 }
        ],
        petClass: 'MYTHIC',
        availability: 'ALL_RACES',
        tier: 5,
        icon: 'GiAngelOutfit',
        groupBonus: { stat: 'curse_resistance', value: 100, type: 'percent' },
        loyalty: 'Soul-Tethered',
        diet: 'Arcane',
        baseMorale: 80,
        rarity: 'Legendary'
    },
    {
        id: 'void_touched_specimens',
        name: 'Void-Touched Specimens',
        variants: [
            { name: 'Abyssal Maw-Worm', desc: 'A lamprey from the space between worlds; feeds on ambient magic.', passiveBonus: { stat: 'resistance', value: 9 }, price: 80000 },
            { name: 'Unraveling Hound', desc: 'A canine whose body perpetually dissolves and reforms from shadow.', passiveBonus: { stat: 'resistance', value: 10 }, price: 95000 },
            { name: 'Paradox Beetle', desc: 'Exists simultaneously in two locations; striking one wounds the other.', passiveBonus: { stat: 'resistance', value: 11 }, price: 110000 },
            { name: 'Null-Space Jellyfish', desc: 'Floats through solid matter as though the world were ocean.', passiveBonus: { stat: 'resistance', value: 10 }, price: 75000 },
            { name: 'Gravity-Warped Newt', desc: 'All objects within arm\'s reach slowly orbit the creature.', passiveBonus: { stat: 'resistance', value: 9 }, price: 100000 },
            { name: 'Entropy-Feathered Raven', desc: 'Its feathers dissolve reality at the edges where light meets dark.', passiveBonus: { stat: 'resistance', value: 11 }, price: 130000 },
            { name: 'Thought-Eater Larva', desc: 'Consumes stray telepathic signals, granting psychic silence.', passiveBonus: { stat: 'resistance', value: 10 }, price: 85000 },
            { name: 'Fracture-Glass Cat', desc: 'A crystalline feline that shatters and reassembles when struck.', passiveBonus: { stat: 'resistance', value: 9 }, price: 90000 },
            { name: 'Dimensional Anchor Toad', desc: 'Its croak stabilizes local planar rifts within a hundred paces.', passiveBonus: { stat: 'resistance', value: 11 }, price: 70000 },
            { name: 'Hollow Star Mote', desc: 'A collapsed point of light that absorbs all energy directed at it.', passiveBonus: { stat: 'resistance', value: 10 }, price: 150000 }
        ],
        petClass: 'ABERRATION',
        availability: 'ALL_RACES',
        tier: 6,
        icon: 'GiVortex',
        groupBonus: { stat: 'planar_anchor', value: 100, type: 'percent' },
        loyalty: 'Soul-Tethered',
        diet: 'Omnivore',
        baseMorale: 100,
        rarity: 'Mythic'
    },

    // ==========================================
    // CATEGORY 3: SPECIFIC ROLE (Role Restricted)
    // ==========================================
    {
        id: 'holy_familiars',
        name: 'Holy Familiars',
        variants: [
            { name: 'Temple Cat', desc: 'Revered in holy sands; completely immune to minor unholy blights.', passiveBonus: { stat: 'lore', value: 1 }, price: 200 },
            { name: 'Monastery Mastiff', desc: 'Trained explicitly to drag wounded knights off the battlefield.', passiveBonus: { stat: 'lore', value: 1 }, price: 350 },
            { name: 'Chantry Dove', desc: 'Carries holy decrees across kingdoms without ever resting.', passiveBonus: { stat: 'lore', value: 2 }, price: 150 },
            { name: 'Reliquary Toad', desc: 'Swallows small cursed artifacts to safely contain their necrotic magic.', passiveBonus: { stat: 'lore', value: 1 }, price: 400 },
            { name: 'Sanctified Serpent', desc: 'A snake devoid of venom, used to symbolize eternal rebirth.', passiveBonus: { stat: 'lore', value: 1 }, price: 250 },
            { name: 'Incense-Monkey', desc: 'A trained macaque that swings censers during High Mass rituals.', passiveBonus: { stat: 'lore', value: 2 }, price: 300 },
            { name: 'Altar-Mouse', desc: 'A tiny rodent permitted to eat the crumbs of holy wafers.', passiveBonus: { stat: 'lore', value: 1 }, price: 50 },
            { name: 'Chapel-Guard Owl', desc: 'Nests precisely above the altar, attacking grave-robbers violently.', passiveBonus: { stat: 'lore', value: 1 }, price: 280 },
            { name: 'Sun-Basking Tortoise', desc: 'Has holy scriptures literally carved into its massive shell over decades.', passiveBonus: { stat: 'lore', value: 2 }, price: 500 },
            { name: 'Blessed Hound-Pup', desc: 'A young dog anointed with holy oils, bringing joy to grim crusaders.', passiveBonus: { stat: 'lore', value: 1 }, price: 220 }
        ],
        petClass: 'BEAST',
        availability: 'SPECIFIC_ROLE',
        tier: 1,
        icon: 'GiHeraldicSun',
        groupBonus: { stat: 'lore', value: 1, type: 'flat' },
        loyalty: 'Devoted',
        diet: 'Carnivore',
        baseMorale: 50,
        rarity: 'Common',
        validRoles: ["High Paladin", "Crusader", "Lightbringer", "Hierophant", "Celestial Knight", "High Inquisitor"]
    },
    {
        id: 'stealth_stalkers',
        name: 'Shadow Stalkers',
        variants: [
            { name: 'Shadow-Macaque', desc: 'A tiny black monkey heavily trained to steal keys from sleeping guards.', passiveBonus: { stat: 'stealth', value: 2 }, price: 800 },
            { name: 'Gloom-Rat', desc: 'Bred in absolute darkness; scurries silently across castle floors.', passiveBonus: { stat: 'stealth', value: 3 }, price: 400 },
            { name: 'Venom-Spine Viper', desc: 'Incredibly lethal; its bite causes victims to die completely silently.', passiveBonus: { stat: 'stealth', value: 4 }, price: 1200 },
            { name: 'Pitch-Black Raven', desc: 'Blends flawlessly into the night sky, acting as an unseeable scout.', passiveBonus: { stat: 'stealth', value: 3 }, price: 900 },
            { name: 'Smoke-Weaver Spider', desc: 'Drops from ceilings to silently garrote isolated sentries with its webs.', passiveBonus: { stat: 'stealth', value: 2 }, price: 1500 },
            { name: 'Assassin\'s Centipede', desc: 'Slips under locked doors to bite the targets toe with paralytic poison.', passiveBonus: { stat: 'stealth', value: 4 }, price: 1100 },
            { name: 'Blind-Cave Ferret', desc: 'A flexible hunter that navigates air-ducts perfectly.', passiveBonus: { stat: 'stealth', value: 4 }, price: 600 },
            { name: 'Night-Terror Bat', desc: 'Swoops over torches precisely to snuff them out with its wings.', passiveBonus: { stat: 'stealth', value: 3 }, price: 750 },
            { name: 'Camouflage-Frog', desc: 'Matches the texture of stone walls; secretes a potent contact-hallucinogen.', passiveBonus: { stat: 'stealth', value: 2 }, price: 1000 },
            { name: 'Dagger-Tooth Trap-Door Spider', desc: 'Buries itself near patrol routes to ambush dogs and guards.', passiveBonus: { stat: 'stealth', value: 4 }, price: 1400 }
        ],
        petClass: 'BEAST',
        availability: 'SPECIFIC_ROLE',
        tier: 2,
        icon: 'GiMask',
        groupBonus: { stat: 'stealth', value: 3, type: 'flat' },
        loyalty: 'Magically Bound',
        diet: 'Carnivore',
        baseMorale: 55,
        rarity: 'Uncommon',
        validRoles: ["Master Assassin", "Shadowblade", "Grandmaster Spy", "Faceless King", "Darkblade"]
    },
    {
        id: 'war_beasts',
        name: 'Tamed War Beasts',
        variants: [
            { name: 'War-Lion (Armored)', desc: 'A massive feline fitted with bladed iron barding.', passiveBonus: { stat: 'menace', value: 9 }, price: 2000 },
            { name: 'Trench-Boar', desc: 'Trained to aggressively root out hidden archers in thorny brush.', passiveBonus: { stat: 'menace', value: 10 }, price: 1500 },
            { name: 'Blood-Muzzle Hyena', desc: 'Laughs hysterically during combat, causing fear in enemy ranks.', passiveBonus: { stat: 'menace', value: 11 }, price: 1800 },
            { name: 'Siege-Badger', desc: 'A dire badger that burrows under wooden palisades to collapse them.', passiveBonus: { stat: 'menace', value: 10 }, price: 2500 },
            { name: 'Iron-Jaw Croc', desc: 'Guards the moats of war-camps, dragging infiltrators to their doom.', passiveBonus: { stat: 'menace', value: 9 }, price: 3000 },
            { name: 'Spike-Collar Bear', desc: 'A massive grizzly trained to stand up and absorb frontal arrow volleys.', passiveBonus: { stat: 'menace', value: 11 }, price: 4000 },
            { name: 'War-Hawk (Bladed)', desc: 'Equipped with razor-sharp steel talons to slash enemy cavalry horses.', passiveBonus: { stat: 'menace', value: 10 }, price: 2200 },
            { name: 'Rhino-Calf (Trained)', desc: 'Already large enough to overturn standard supply wagons.', passiveBonus: { stat: 'menace', value: 9 }, price: 5000 },
            { name: 'Battle-Ram', desc: 'A mountain goat trained to shatter the knees of heavy infantry.', passiveBonus: { stat: 'menace', value: 11 }, price: 1600 },
            { name: 'Gore-Hound Mastiff', desc: 'A dog the size of a pony, heavily scarred from front-line combat.', passiveBonus: { stat: 'menace', value: 10 }, price: 2800 }
        ],
        petClass: 'BEAST',
        availability: 'SPECIFIC_ROLE',
        tier: 3,
        icon: 'GiBeastEye',
        groupBonus: { stat: 'menace', value: 10, type: 'percent' },
        loyalty: 'Devoted',
        diet: 'Carnivore',
        baseMorale: 60,
        rarity: 'Rare',
        validRoles: ["Warlord", "Titan Lord", "Dreadnought", "Ironbound Champion", "Skullcrusher", "Titan Slayer"]
    },
    {
        id: 'draconic_wyrmlings',
        name: 'Pureblood Wyrmlings',
        variants: [
            { name: 'Ember-Tail Wyrmling', desc: 'A real draconic offspring, currently the size of a mountain lion.', passiveBonus: { stat: 'resistance', value: 9 }, price: 15000 },
            { name: 'Frost-Bite Wyrmling', desc: 'Exhales lethally pure liquid nitrogen; touching it causes severe frostbite.', passiveBonus: { stat: 'resistance', value: 10 }, price: 20000 },
            { name: 'Emerald-Scale Wyrmling', desc: 'Uses toxic breath to disintegrate obstacles blocking its master.', passiveBonus: { stat: 'resistance', value: 11 }, price: 18000 },
            { name: 'Shadow-Wing Wyrmling', desc: 'Its dark scales project an aura of magical darkness constantly.', passiveBonus: { stat: 'resistance', value: 10 }, price: 25000 },
            { name: 'Sand-Skimmer Wyrmling', desc: 'Swims through solid stone by superheating rock into magma.', passiveBonus: { stat: 'resistance', value: 9 }, price: 17000 },
            { name: 'Sapphire Wyrmling', desc: 'Possesses an ear-shattering breath weapon of pure physical sonic force.', passiveBonus: { stat: 'resistance', value: 11 }, price: 30000 },
            { name: 'Venom-Spit Wyrmling', desc: 'Drips a potent narcotic from its fangs capable of dropping giants.', passiveBonus: { stat: 'resistance', value: 10 }, price: 22000 },
            { name: 'Iron-Scale Wyrmling', desc: 'Its scales are literal adamantine ore; functionally invulnerable to arrows.', passiveBonus: { stat: 'resistance', value: 9 }, price: 24000 },
            { name: 'Sun-Basking Wyrmling', desc: 'Radiates the restorative power of daylight, banishing ambient undead.', passiveBonus: { stat: 'resistance', value: 11 }, price: 19000 },
            { name: 'Storm-Crest Wyrmling', desc: 'Crackles with static electricity, shooting literal chain lightning when agitated.', passiveBonus: { stat: 'resistance', value: 10 }, price: 28000 }
        ],
        petClass: 'DRACONIC',
        availability: 'SPECIFIC_ROLE',
        tier: 4,
        icon: 'GiDragonHead',
        groupBonus: { stat: 'mental_ward', value: 100, type: 'percent' },
        loyalty: 'Soul-Tethered',
        diet: 'Carnivore',
        baseMorale: 70,
        rarity: 'Epic',
        validRoles: ["Dragon Sage", "Stormbringer", "Storm Herald", "Elementalist", "Archmage", "Phoenixmancer"]
    },
    {
        id: 'abyssal_parasites',
        name: 'Abyssal Horrors & Parasites',
        variants: [
            { name: 'Elder-Mind Tadpole', desc: 'An ancient ilithid parasite kept in a jar. Grants psychic power if touched.', passiveBonus: { stat: 'power', value: 10 }, price: 40000 },
            { name: 'Tethered Demon-Soul', desc: 'A furious infernal spirit contained in an arcane sphere.', passiveBonus: { stat: 'power', value: 10 }, price: 50000 },
            { name: 'Plague-Bringer Urn', desc: 'A sentient cloud of necrotic miasma kept perfectly sealed in a phylactery.', passiveBonus: { stat: 'power', value: 10 }, price: 60000 },
            { name: 'Severed Lich-Hand', desc: 'An independently moving, spellcasting skeletal hand of a dead master.', passiveBonus: { stat: 'power', value: 10 }, price: 35000 },
            { name: 'Gore-Feeder Tick', desc: 'A massive parasite that drains enemy blood to heal the summoner.', passiveBonus: { stat: 'power', value: 10 }, price: 25000 },
            { name: 'Eye of the Deep Terror', desc: 'A floating beholder-stalk that fires paralyzing rays randomly.', passiveBonus: { stat: 'power', value: 10 }, price: 70000 },
            { name: 'Shadow-Fiend Cub', desc: 'A tiny demon made of pure shadow that whispers maddening secrets.', passiveBonus: { stat: 'power', value: 10 }, price: 45000 },
            { name: 'Brimstone Imp', desc: 'A sadistic scout that turns naturally invisible and mocks dying foes.', passiveBonus: { stat: 'power', value: 10 }, price: 30000 },
            { name: 'Bone-Weaver Spider', desc: 'An undead arachnid that constructs armor for its master using victim ribs.', passiveBonus: { stat: 'power', value: 10 }, price: 55000 },
            { name: 'The First Shadow', desc: 'The literal concept of darkness given form, acting as an absolute shield.', passiveBonus: { stat: 'power', value: 10 }, price: 90000 }
        ],
        petClass: 'ABERRATION', // Covers demonic/undead/aberrant horrors broadly
        availability: 'SPECIFIC_ROLE',
        tier: 5,
        icon: 'GiSquid',
        groupBonus: { stat: 'power', value: 10000, type: 'flat' },
        loyalty: 'Magically Bound',
        diet: 'Omnivore',
        baseMorale: 80,
        rarity: 'Legendary',
        validRoles: ["Necromancer", "Voidseer", "Abyssal Sage", "Abyssal Tyrant", "Chaos Knight", "Void Lord"]
    },
    {
        id: 'temporal_familiars',
        name: 'Temporal Familiars',
        variants: [
            { name: 'Chrono-Lynx', desc: 'Moves in stuttered time-skips, appearing to teleport short distances.', passiveBonus: { stat: 'evasion', value: 4 }, price: 120000 },
            { name: 'Past-Echo Serpent', desc: 'Manifests ghostly images of events that occurred nearby hours ago.', passiveBonus: { stat: 'evasion', value: 5 }, price: 150000 },
            { name: 'Stasis-Locked Beetle', desc: 'Can freeze a single small target in suspended time for ten heartbeats.', passiveBonus: { stat: 'evasion', value: 6 }, price: 180000 },
            { name: 'Rewind-Moth', desc: 'Reverses minor injuries on its master by pulling flesh backwards through time.', passiveBonus: { stat: 'evasion', value: 5 }, price: 200000 },
            { name: 'Dilation Hawk', desc: 'Slows projectiles in its vicinity to a crawl, catching arrows mid-flight.', passiveBonus: { stat: 'evasion', value: 4 }, price: 160000 },
            { name: 'Moment-Thief Spider', desc: 'Steals seconds from enemies, leaving them briefly frozen.', passiveBonus: { stat: 'evasion', value: 6 }, price: 250000 },
            { name: 'Future-Shade Fox', desc: 'A translucent fox from a timeline yet to occur; vanishes if observed.', passiveBonus: { stat: 'evasion', value: 5 }, price: 140000 },
            { name: 'Decay-Reversal Toad', desc: 'Restores rusted metal and rotted wood by reversing local entropy.', passiveBonus: { stat: 'evasion', value: 4 }, price: 170000 },
            { name: 'Temporal-Rift Hound', desc: 'Bites targets into brief temporal loops, reliving the wound repeatedly.', passiveBonus: { stat: 'evasion', value: 6 }, price: 220000 },
            { name: 'Eternity Scarab', desc: 'Indestructible. Has existed unchanged since before recorded history began.', passiveBonus: { stat: 'evasion', value: 5 }, price: 300000 }
        ],
        petClass: 'MYTHIC',
        availability: 'SPECIFIC_ROLE',
        tier: 6,
        icon: 'GiSandsOfTime',
        groupBonus: { stat: 'evasion', value: 5, type: 'percent' },
        loyalty: 'Soul-Tethered',
        diet: 'Arcane',
        baseMorale: 100,
        rarity: 'Mythic',
        validRoles: ["Chronomancer", "Voidseer", "Archmage", "Phoenix Sage", "Abyssal Sage", "Phoenixmancer"]
    },

    // ==========================================
    // CATEGORY 4: SPECIFIC RACE (Race Restricted)
    // ==========================================
    {
        id: 'forest_kin',
        name: 'Sylvan Forest Kin',
        variants: [
            { name: 'Thicket-Hedgehog', desc: 'Decorates its spines with berries and beautiful fallen leaves.', passiveBonus: { stat: 'tracking', value: 1 }, price: 20 },
            { name: 'Bark-Toad', desc: 'Perfectly camouflaged against oak trees; eats poisonous insects.', passiveBonus: { stat: 'tracking', value: 1 }, price: 15 },
            { name: 'Acorn-Gatherer Squirrel', desc: 'A hyper-intelligent squirrel that trades shiny rocks for nuts.', passiveBonus: { stat: 'tracking', value: 2 }, price: 30 },
            { name: 'Moss-Turtle', desc: 'Incredibly slow, growing a small garden of rare herbs on its shell.', passiveBonus: { stat: 'tracking', value: 1 }, price: 40 },
            { name: 'Song-Bird of the Canopy', desc: 'Mimics any elvish song perfectly, providing beautiful campsite music.', passiveBonus: { stat: 'tracking', value: 1 }, price: 50 },
            { name: 'Bramble-Fox', desc: 'A reddish fox that runs effortlessly through lethal thorn bushes.', passiveBonus: { stat: 'tracking', value: 2 }, price: 80 },
            { name: 'Dew-Drop Spider', desc: 'Constructs intricate, beautiful webs that harvest pure morning water.', passiveBonus: { stat: 'tracking', value: 1 }, price: 25 },
            { name: 'Glade-Rabbit', desc: 'Incredibly fast and possesses preternatural luck in avoiding snares.', passiveBonus: { stat: 'tracking', value: 1 }, price: 35 },
            { name: 'Pine-Marten', desc: 'A fierce, agile hunter of the high canopy.', passiveBonus: { stat: 'tracking', value: 2 }, price: 60 },
            { name: 'Sylvan-Butterfly Swarm', desc: 'A cloud of massive butterflies that conceals the owner in a kaleidoscope of color.', passiveBonus: { stat: 'tracking', value: 1 }, price: 100 }
        ],
        petClass: 'BEAST',
        availability: 'SPECIFIC_RACE',
        tier: 1,
        icon: 'GiPineTree',
        groupBonus: { stat: 'woodcraft', value: 1, type: 'flat' },
        loyalty: 'Fickle',
        diet: 'Carnivore',
        baseMorale: 50,
        rarity: 'Common',
        validRaces: ["Elf", "Wood Elf", "Half-Elf", "Fairy", "Sylph", "Dryad"]
    },
    {
        id: 'crude_scavengers',
        name: 'Crag & Waste Scavengers',
        variants: [
            { name: 'Bone-Crusher Hyena', desc: 'A laughing scavenger perfectly happy eating rotted meat.', passiveBonus: { stat: 'menace', value: 1 }, price: 150 },
            { name: 'Grit-Vulture', desc: 'Bald, ugly, and highly efficient at stripping corpses clean.', passiveBonus: { stat: 'menace', value: 2 }, price: 90 },
            { name: 'Crag-Spider', desc: 'A hairy arachnid usually kept on an iron chain as a crude guard-dog.', passiveBonus: { stat: 'menace', value: 3 }, price: 200 },
            { name: 'Sewer-Rat Swarm', desc: 'Dozens of vicious rats trained to swarm enemies on command.', passiveBonus: { stat: 'menace', value: 2 }, price: 120 },
            { name: 'Rock-Worm (Juvenile)', desc: 'A fleshy, blind tube that burrows aggressively through loose dirt.', passiveBonus: { stat: 'menace', value: 1 }, price: 250 },
            { name: 'Blood-Bat', desc: 'A rabid-looking bat that actively aims for the enemy\'s eyes.', passiveBonus: { stat: 'menace', value: 3 }, price: 100 },
            { name: 'Muck-Toad', desc: 'Covered in toxic slime; frequently licked by goblins for hallucinogenic effects.', passiveBonus: { stat: 'menace', value: 2 }, price: 80 },
            { name: 'Ash-Beetle', desc: 'A heavily armored insect that survives easily in volcanic wastelands.', passiveBonus: { stat: 'menace', value: 1 }, price: 180 },
            { name: 'Scrap-Hound', desc: 'A heavily scarred mutt missing chunks of fur; viciously loyal.', passiveBonus: { stat: 'menace', value: 3 }, price: 50 },
            { name: 'Dire-Centipede', desc: 'A terrifying multi-legged predator used to terrify prisoners.', passiveBonus: { stat: 'menace', value: 2 }, price: 350 }
        ],
        petClass: 'BEAST',
        availability: 'SPECIFIC_RACE',
        tier: 2,
        icon: 'GiGoblinHead',
        groupBonus: { stat: 'menace', value: 2, type: 'flat' },
        loyalty: 'Devoted',
        diet: 'Carnivore',
        baseMorale: 55,
        rarity: 'Uncommon',
        validRaces: ["Orc", "Goblin", "Hobgoblin", "Bugbear", "Kobold", "Troll", "Half-Orc", "Half-Troll"]
    },
    {
        id: 'swamp_lurkers',
        name: 'Swamp Lurkers',
        variants: [
            { name: 'Venom-Spit Cobra', desc: 'A hooded serpent capable of blinding targets from twenty feet away.', passiveBonus: { stat: 'resistance', value: 4 }, price: 400 },
            { name: 'Bog-Crocodile (Juvenile)', desc: 'Acts as a surprisingly affectionate, scaly hound when raised from the egg.', passiveBonus: { stat: 'resistance', value: 5 }, price: 500 },
            { name: 'Leech-Mass', desc: 'A disgusting sphere of leeches kept in a clay pot for medical bloodletting.', passiveBonus: { stat: 'resistance', value: 6 }, price: 300 },
            { name: 'Swamp-Gas Will-o-Wisp', desc: 'A natural, non-sentient glowing gas-bubble that illuminates the fog.', passiveBonus: { stat: 'resistance', value: 5 }, price: 600 },
            { name: 'Giant Bullfrog', desc: 'Its croak is loud enough to deafen enemies in tight quarters.', passiveBonus: { stat: 'resistance', value: 4 }, price: 350 },
            { name: 'Mud-Eel', desc: 'Slithers across wet mud just as easily as it swims through water.', passiveBonus: { stat: 'resistance', value: 6 }, price: 250 },
            { name: 'Rot-Weaver Spider', desc: 'Spins webs completely immune to the constant moisture of the bog.', passiveBonus: { stat: 'resistance', value: 5 }, price: 450 },
            { name: 'Carrion-Fly Swarm', desc: 'A buzzing horror that obscures the owner and distracts archers.', passiveBonus: { stat: 'resistance', value: 4 }, price: 550 },
            { name: 'Snapping-Turtle', desc: 'Its jaws can severe an armored knight\'s finger with trivial ease.', passiveBonus: { stat: 'resistance', value: 6 }, price: 700 },
            { name: 'Stagnant-Water Elemental', desc: 'A tiny, filthy elemental that drowns small rodents for fun.', passiveBonus: { stat: 'resistance', value: 5 }, price: 800 }
        ],
        petClass: 'BEAST',
        availability: 'SPECIFIC_RACE',
        tier: 3,
        icon: 'GiCobra',
        groupBonus: { stat: 'poison_resistance', value: 50, type: 'percent' },
        loyalty: 'Fickle',
        diet: 'Carnivore',
        baseMorale: 60,
        rarity: 'Rare',
        validRaces: ["Lizardfolk", "Lamia", "Naga", "Half-Troll", "Ogre"]
    },
    {
        id: 'underdark_watchers',
        name: 'Underdark Watchers',
        variants: [
            { name: 'Gloom-Panther', desc: 'A fey-touched cat that generates an aura of magical silence.', passiveBonus: { stat: 'perception', value: 4 }, price: 2500 },
            { name: 'Drider-Broodling', desc: 'A horrifying half-elf/half-spider hybrid considered a sacred, terrifying pet.', passiveBonus: { stat: 'perception', value: 5 }, price: 4000 },
            { name: 'Cave-Fisher Spider', desc: 'Fires sticky silk up to 60 feet to drag enemies into the darkness.', passiveBonus: { stat: 'perception', value: 6 }, price: 3000 },
            { name: 'Subterranean Basilisk', desc: 'A heavily plated reptile whose gaze slowly turns flesh to stone.', passiveBonus: { stat: 'perception', value: 5 }, price: 5000 },
            { name: 'Deep-Gnome Automaton', desc: 'A brilliantly crafted clockwork guardian heavily armed with trap-blades.', passiveBonus: { stat: 'perception', value: 4 }, price: 4500 },
            { name: 'Shadow-Mantle', desc: 'A flying, manta-like creature that drops onto enemies heads to suffocate them.', passiveBonus: { stat: 'perception', value: 6 }, price: 3500 },
            { name: 'Myconid Spore-Servant', desc: 'An animated humanoid corpse completely piloted by aggressive fungal spores.', passiveBonus: { stat: 'perception', value: 5 }, price: 2800 },
            { name: 'Lava-Tube Salamander', desc: 'A giant reptile that thrives in magma, used to scout active volcanic vents.', passiveBonus: { stat: 'perception', value: 4 }, price: 3200 },
            { name: 'Blind-Roarer Bat', desc: 'A bat the size of a human; its echolocation shatters glass and eardrums.', passiveBonus: { stat: 'perception', value: 6 }, price: 4800 },
            { name: 'Demon-Blooded Hound', desc: 'A terrifying dog with glowing red eyes, utterly immune to fire and fear.', passiveBonus: { stat: 'perception', value: 5 }, price: 6000 }
        ],
        petClass: 'ABERRATION',
        availability: 'SPECIFIC_RACE',
        tier: 4,
        icon: 'GiSpiderweb',
        groupBonus: { stat: 'nightsight', value: 50, type: 'flat' },
        loyalty: 'Devoted',
        diet: 'Omnivore',
        baseMorale: 70,
        rarity: 'Epic',
        validRaces: ["Dark Elf", "Shadow Elf", "Duergar", "Tiefling"]
    },
    {
        id: 'celestial_guardians',
        name: 'Celestial Guardians',
        variants: [
            { name: 'Archangel\'s Halo (Sentient)', desc: 'A stolen halo that gained sapience. Blinds evil beings instantaneously.', passiveBonus: { stat: 'resistance', value: 10 }, price: 75000 },
            { name: 'Couatl (Feathered Serpent)', desc: 'A holy snake possessing immense magical intellect and healing magic.', passiveBonus: { stat: 'resistance', value: 9 }, price: 80000 },
            { name: 'Pegasus Foal', desc: 'A juvenile winged horse radiating pure innocence and divine light.', passiveBonus: { stat: 'resistance', value: 10 }, price: 50000 },
            { name: 'Kirin', desc: 'A legendary dragon-horse whose extremely rare appearances foretell golden ages.', passiveBonus: { stat: 'resistance', value: 11 }, price: 100000 },
            { name: 'Holy-Fire Phoenix', desc: 'A bird woven of pure positive energy; its tears can cure any mortal plague.', passiveBonus: { stat: 'resistance', value: 10 }, price: 120000 },
            { name: 'Valkyrie\'s Shield-Maid (Spirit)', desc: 'A spectral warrior that acts as an unyielding bodyguard.', passiveBonus: { stat: 'resistance', value: 11 }, price: 85000 },
            { name: 'Seraphim-Mote', desc: 'A six-winged ball of holy fire that constantly sings praises to the heavens.', passiveBonus: { stat: 'resistance', value: 9 }, price: 90000 },
            { name: 'Lion of Judah', desc: 'A massive, majestic feline completely immune to all unholy damage types.', passiveBonus: { stat: 'resistance', value: 11 }, price: 110000 },
            { name: 'Divine Sentinel-Owl', desc: 'A massive bird whose gaze violently burns anyone harboring evil intent.', passiveBonus: { stat: 'resistance', value: 10 }, price: 70000 },
            { name: 'Tear of the Earth-Mother', desc: 'A crystalline pet that instantly regrows destroyed natural terrain.', passiveBonus: { stat: 'resistance', value: 9 }, price: 95000 }
        ],
        petClass: 'MYTHIC',
        availability: 'SPECIFIC_RACE',
        tier: 5,
        icon: 'GiAngelWings',
        groupBonus: { stat: 'death_ward', value: 100, type: 'percent' },
        loyalty: 'Soul-Tethered',
        diet: 'Arcane',
        baseMorale: 80,
        rarity: 'Legendary',
        validRaces: ["Aasimar", "Valkyrie", "Seraph", "Nephilim"]
    },
    {
        id: 'world_serpent_spawn',
        name: 'World-Serpent Spawn',
        variants: [
            { name: 'World-Coil Hatchling', desc: 'A serpent whose body wraps through folded dimensions; only the head is visible.', passiveBonus: { stat: 'resistance', value: 9 } },
            { name: 'Fang of the First Drake', desc: 'A tooth given sentience; it bites through wards as easily as flesh.', passiveBonus: { stat: 'resistance', value: 10 } },
            { name: 'Scale-Shard Familiar', desc: 'A fragment of a true dragon god, vibrating with cataclysmic potential.', passiveBonus: { stat: 'resistance', value: 11 } },
            { name: 'Wyrm-Blood Parasite', desc: 'A leech that grants draconic resilience by feeding primal blood to its host.', passiveBonus: { stat: 'resistance', value: 10 } },
            { name: 'Primordial Egg', desc: 'An unhatched creation-relic that radiates raw elemental authority.', passiveBonus: { stat: 'resistance', value: 9 } },
            { name: 'Cosmic Salamander', desc: 'Its body burns with starfire; it nests comfortably inside active volcanoes.', passiveBonus: { stat: 'resistance', value: 11 } },
            { name: 'Jaws of Ouroboros', desc: 'A serpent devouring its own tail; wounds it inflicts never fully close.', passiveBonus: { stat: 'resistance', value: 10 } },
            { name: 'Ancestor-Wyvern Shade', desc: 'The ghost of a species-progenitor; all dragons instinctively defer to it.', passiveBonus: { stat: 'resistance', value: 9 } },
            { name: 'Living Fossil-Drake', desc: 'A pre-extinction apex predator resurrected through forbidden blood-magic.', passiveBonus: { stat: 'resistance', value: 11 } },
            { name: 'Breath of the World-Tree', desc: 'A sentient exhalation of the great tree; passively purifies corruption.', passiveBonus: { stat: 'resistance', value: 10 } }
        ],
        petClass: 'DRACONIC',
        availability: 'SPECIFIC_RACE',
        tier: 6,
        icon: 'GiSerpents',
        groupBonus: { stat: 'draconic_aura', value: 10, type: 'percent' },
        loyalty: 'Soul-Tethered',
        diet: 'Carnivore',
        baseMorale: 100,
        rarity: 'Mythic',
        validRaces: ["Dragonborn", "Half-Dragon", "Kobold", "Draconian", "Wyverian"]
    }
];
