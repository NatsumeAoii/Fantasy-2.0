import type { VariantDef } from '../inventory/types';

export type MountClass = 'BEAST' | 'MAGICAL' | 'UNDEAD' | 'AQUATIC' | 'AERIAL' | 'MYTHIC' | 'CONSTRUCT' | 'DRACONIC';
export type MountAvailability = 'ALL_ROLES' | 'ALL_RACES' | 'SPECIFIC_ROLE' | 'SPECIFIC_RACE';
export type MountTier = 1 | 2 | 3 | 4 | 5 | 6;

/**
 * Core combat statistics for a mount creature.
 * Used at both the group level (default baseline) and the variant level (specific overrides).
 */
export interface MountBaseStats {
    hp: number;
    defenseRating: number;
    str: number;
    dex: number;
    con: number;
    speed: number;
}

/**
 * A mount variant with its own individual base stats.
 * Extends the shared VariantDef with mount-specific combat statistics.
 */
export interface MountVariantDef extends VariantDef {
    baseStats: MountBaseStats;
}

/**
 * A rideable creature available for purchase or taming in the world.
 * Mounts provide overland movement bonuses and may have combat capabilities.
 * Each mount has ten named variants representing visual or breed differences.
 */
export interface MountDef {
    id: string;
    name: string;
    variants: MountVariantDef[];
    baseStats: MountBaseStats;
    mountClass: MountClass;
    availability: MountAvailability;
    tier: MountTier;
    icon: string;
    rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic';
    validRaces?: string[];
    validRoles?: string[];
}

/** Master list of all available mounts, organized by tier and availability. */
export const MOUNTS: MountDef[] = [
    // ==========================================
    // CATEGORY 1: ALL ROLES (Universal mounts based on profession-agnostic riding)
    // ==========================================
    {
        id: 'draft_beasts',
        name: 'Common Draft Beasts',
        baseStats: { hp: 19, defenseRating: 10, str: 16, dex: 10, con: 12, speed: 30 },
        variants: [
            { name: 'Riding Horse', desc: 'Standard reliable mount for travelers and couriers.', price: 75, baseStats: { hp: 19, defenseRating: 10, str: 16, dex: 12, con: 12, speed: 33 } },
            { name: 'Draft Horse', desc: 'A heavy, muscular horse built for pulling carts.', price: 50, baseStats: { hp: 22, defenseRating: 10, str: 18, dex: 8, con: 14, speed: 27 } },
            { name: 'Pony', desc: 'Smaller equine suitable for traversing narrow trails.', price: 30, baseStats: { hp: 13, defenseRating: 10, str: 12, dex: 14, con: 10, speed: 36 } },
            { name: 'Sumpter Mule', desc: 'A sturdy horse dedicated purely to carrying heavy pack-frames.', price: 40, baseStats: { hp: 20, defenseRating: 10, str: 17, dex: 8, con: 14, speed: 27 } },
            { name: 'Steppe Pony', desc: 'Hardy and rugged, thrives in freezing temperatures.', price: 45, baseStats: { hp: 18, defenseRating: 11, str: 14, dex: 12, con: 14, speed: 33 } },
            { name: 'Desert Camel', desc: 'Requires little water, excellent for crossing arid dunes.', price: 60, baseStats: { hp: 22, defenseRating: 10, str: 16, dex: 10, con: 16, speed: 30 } },
            { name: 'Bactrian Camel', desc: 'Double-humped camel suited for cold deserts and heavy loads.', price: 65, baseStats: { hp: 24, defenseRating: 10, str: 18, dex: 8, con: 16, speed: 27 } },
            { name: 'Mountain Donkey', desc: 'Sure-footed, completely fearless of sheer drops.', price: 25, baseStats: { hp: 14, defenseRating: 11, str: 14, dex: 14, con: 12, speed: 36 } },
            { name: 'Wild Mustang', desc: 'A wild, fiercely independent plains horse broken for riding.', price: 55, baseStats: { hp: 18, defenseRating: 11, str: 16, dex: 14, con: 12, speed: 36 } },
            { name: 'Coach Horse', desc: 'Trained explicitly to pull noble carriages smoothly without spooking.', price: 90, baseStats: { hp: 20, defenseRating: 10, str: 16, dex: 10, con: 14, speed: 30 } }
        ],
        mountClass: 'BEAST',
        availability: 'ALL_ROLES',
        tier: 1,
        icon: 'GiHorseHead',

        rarity: 'Common'
    },
    {
        id: 'scourge_runners',
        name: 'Scourge Runners',
        baseStats: { hp: 34, defenseRating: 13, str: 18, dex: 14, con: 14, speed: 46 },
        variants: [
            { name: 'Bridled Courser', desc: 'A swift, agile horse utilized by messengers.', price: 150, baseStats: { hp: 30, defenseRating: 13, str: 16, dex: 18, con: 12, speed: 52 } },
            { name: 'Huntsman Steed', desc: 'Bred specifically for jumping over wilderness obstacles.', price: 200, baseStats: { hp: 32, defenseRating: 13, str: 18, dex: 16, con: 14, speed: 49 } },
            { name: 'Armored Destrier', desc: 'A warhorse outfitted in heavy chainmail.', price: 400, baseStats: { hp: 42, defenseRating: 16, str: 20, dex: 10, con: 16, speed: 40 } },
            { name: 'Barded Rouncey', desc: 'A heavily armored but common riding horse.', price: 300, baseStats: { hp: 38, defenseRating: 15, str: 18, dex: 10, con: 16, speed: 40 } },
            { name: 'Cavalry Charger', desc: 'Trained to aggressively trample infantry lines.', price: 500, baseStats: { hp: 40, defenseRating: 14, str: 20, dex: 12, con: 16, speed: 43 } },
            { name: 'Jousting Champion', desc: 'Disciplined to charge in absolutely straight lines.', price: 600, baseStats: { hp: 36, defenseRating: 14, str: 20, dex: 14, con: 14, speed: 46 } },
            { name: 'Royal Palfrey', desc: 'Smooth-gaited, heavily decorated steed for lords.', price: 350, baseStats: { hp: 30, defenseRating: 13, str: 16, dex: 16, con: 12, speed: 49 } },
            { name: 'Swift-Strider Ostrich', desc: 'A massive flightless bird bred for dizzying sprint speeds.', price: 250, baseStats: { hp: 26, defenseRating: 12, str: 14, dex: 20, con: 10, speed: 55 } },
            { name: 'Sand-Runner Lizard', desc: 'A bipedal reptile that leaps across hot desert sands.', price: 300, baseStats: { hp: 32, defenseRating: 14, str: 16, dex: 18, con: 14, speed: 52 } },
            { name: 'Plains-Runner Boar', desc: 'A surprisingly rapid feral hog explicitly broken for riding.', price: 280, baseStats: { hp: 36, defenseRating: 13, str: 18, dex: 14, con: 16, speed: 46 } }
        ],
        mountClass: 'BEAST',
        availability: 'ALL_ROLES',
        tier: 2,
        icon: 'GiHorseHead',

        rarity: 'Uncommon'
    },
    {
        id: 'heavy_behemoths',
        name: 'Heavy War Behemoths',
        baseStats: { hp: 76, defenseRating: 15, str: 22, dex: 8, con: 18, speed: 47 },
        variants: [
            { name: 'War Elephant', desc: 'A massive pachyderm armored in iron plating.', price: 1500, baseStats: { hp: 85, defenseRating: 16, str: 24, dex: 6, con: 20, speed: 44 } },
            { name: 'Tamed Rhinoceros', desc: 'A heavily horned beast capable of shattering stone walls.', price: 1200, baseStats: { hp: 72, defenseRating: 15, str: 22, dex: 8, con: 18, speed: 47 } },
            { name: 'Plated Siege-Bear', desc: 'A hulking dire-bear forced into iron barding.', price: 1300, baseStats: { hp: 80, defenseRating: 16, str: 22, dex: 10, con: 18, speed: 50 } },
            { name: 'Iron-Tusk Mammoth', desc: 'A wooly behemoth used primarily in arctic sieges.', price: 1800, baseStats: { hp: 95, defenseRating: 15, str: 26, dex: 6, con: 22, speed: 44 } },
            { name: 'Gore-Horn Triceratops', desc: 'A primeval reptilian brute draped in heavy chainmail.', price: 2000, baseStats: { hp: 90, defenseRating: 17, str: 24, dex: 6, con: 20, speed: 44 } },
            { name: 'Battering-Ram Tortoise', desc: 'Incredibly slow but functionally impervious to arrow fire.', price: 1600, baseStats: { hp: 100, defenseRating: 20, str: 18, dex: 2, con: 24, speed: 38 } },
            { name: 'Spike-Tail Ankylosaurus', desc: 'Swings a literal boulder-sized club to ruin cavalry charges.', price: 1900, baseStats: { hp: 88, defenseRating: 18, str: 22, dex: 4, con: 20, speed: 41 } },
            { name: 'Jungle Ape Juggernaut', desc: 'A silverback of unnatural size that carries a howdah on its back.', price: 1700, baseStats: { hp: 78, defenseRating: 14, str: 24, dex: 12, con: 18, speed: 53 } },
            { name: 'Armored Hippo', desc: 'Vicious, heavily plated, and capable of capsizing river barges.', price: 1400, baseStats: { hp: 82, defenseRating: 15, str: 22, dex: 6, con: 20, speed: 44 } },
            { name: 'Trench-Digger Mole', desc: 'A massive subterranean creature capable of burrowing under city walls.', price: 2500, baseStats: { hp: 70, defenseRating: 14, str: 20, dex: 10, con: 18, speed: 50 } }
        ],
        mountClass: 'BEAST',
        availability: 'ALL_ROLES',
        tier: 3,
        icon: 'GiRhinocerosHorn',

        rarity: 'Rare'
    },
    {
        id: 'wind_chasers',
        name: 'Wind Chasers',
        baseStats: { hp: 120, defenseRating: 16, str: 22, dex: 18, con: 18, speed: 92 },
        variants: [
            { name: 'Highland Gryphon', desc: 'Half-lion, half-eagle; king of the alpine winds.', price: 4000, baseStats: { hp: 120, defenseRating: 16, str: 24, dex: 18, con: 18, speed: 92 } },
            { name: 'Giant Crested Eagle', desc: 'Massive wingspan capable of lifting heavily armored knights.', price: 3500, baseStats: { hp: 110, defenseRating: 15, str: 22, dex: 20, con: 16, speed: 95 } },
            { name: 'Cloud-Ray', desc: 'A peaceful, floating manta ray that swims through the atmosphere.', price: 5000, baseStats: { hp: 100, defenseRating: 14, str: 18, dex: 20, con: 16, speed: 95 } },
            { name: 'Storm-Owl', desc: 'A colossal night-bird perfectly adapted to flying through hurricanes.', price: 4500, baseStats: { hp: 115, defenseRating: 16, str: 20, dex: 22, con: 18, speed: 98 } },
            { name: 'Feathered Serpent', desc: 'A magical airborne snake that radiates warmth and gentle breezes.', price: 6000, baseStats: { hp: 130, defenseRating: 17, str: 22, dex: 20, con: 20, speed: 95 } },
            { name: 'Sky-Bison', desc: 'A massive floating bovine that carries entire merchant parties.', price: 7000, baseStats: { hp: 150, defenseRating: 15, str: 26, dex: 12, con: 22, speed: 83 } },
            { name: 'Iron-Beak Roc', desc: 'A juvenile storm-bird; its talons can crush light carriages.', price: 8000, baseStats: { hp: 160, defenseRating: 17, str: 28, dex: 16, con: 22, speed: 89 } },
            { name: 'Sun-Diving Falcon', desc: 'Blindingly fast; plummets from the sun to strike before being seen.', price: 5500, baseStats: { hp: 95, defenseRating: 18, str: 18, dex: 26, con: 14, speed: 104 } },
            { name: 'Gale-Weaver Moth', desc: 'An enormous insect that scatters tracking-spores as it flies.', price: 4200, baseStats: { hp: 105, defenseRating: 14, str: 18, dex: 20, con: 16, speed: 95 } },
            { name: 'Lunar Bat', desc: 'A silent, massive bat explicitly bred for stealthy night insertions.', price: 4800, baseStats: { hp: 100, defenseRating: 15, str: 20, dex: 22, con: 16, speed: 98 } }
        ],
        mountClass: 'AERIAL',
        availability: 'ALL_ROLES',
        tier: 4,
        icon: 'GiEagleEmblem',

        rarity: 'Epic'
    },
    {
        id: 'world_striders',
        name: 'World Striders',
        baseStats: { hp: 300, defenseRating: 20, str: 28, dex: 10, con: 26, speed: 95 },
        variants: [
            { name: 'Behemoth Tortoise', desc: 'A turtle so large it acts as a walking fortress for warbands.', price: 25000, baseStats: { hp: 350, defenseRating: 24, str: 26, dex: 4, con: 30, speed: 86 } },
            { name: 'Land-Leviathan', desc: 'A monstrous terrestrial whale that slides across earth like water.', price: 35000, baseStats: { hp: 320, defenseRating: 20, str: 30, dex: 8, con: 28, speed: 92 } },
            { name: 'Cloud-Walker Colossus', desc: 'A tamed elemental giant whose shoulders serve as a viewing deck.', price: 40000, baseStats: { hp: 280, defenseRating: 19, str: 30, dex: 14, con: 26, speed: 101 } },
            { name: 'Elder Treant', desc: 'An ancient, walking tree that shelters riders within its hollow trunk.', price: 30000, baseStats: { hp: 260, defenseRating: 18, str: 26, dex: 6, con: 24, speed: 89 } },
            { name: 'Earth-Mover Beetle', desc: 'A scarab of impossible size; its passage leaves a permanently paved road.', price: 28000, baseStats: { hp: 300, defenseRating: 22, str: 28, dex: 8, con: 28, speed: 92 } },
            { name: 'Volcanic Snail', desc: 'Slow, unstoppable, and leaves a trail of cooling magma in its wake.', price: 38000, baseStats: { hp: 400, defenseRating: 24, str: 24, dex: 2, con: 30, speed: 83 } },
            { name: 'God-Horned Rhino', desc: 'A mythic brute; its horn constantly emits an aura of pure physical force.', price: 50000, baseStats: { hp: 340, defenseRating: 21, str: 30, dex: 10, con: 28, speed: 95 } },
            { name: 'Storm-Treader Elk', desc: 'An elk so large its antlers brush the rainclouds, bringing perpetual rain.', price: 45000, baseStats: { hp: 290, defenseRating: 19, str: 28, dex: 16, con: 24, speed: 104 } },
            { name: 'Sand-Sea Serpent', desc: 'A monolithic snake that ferries entire armies beneath the desert sands.', price: 60000, baseStats: { hp: 380, defenseRating: 20, str: 30, dex: 12, con: 28, speed: 98 } },
            { name: 'Ocean-Tide Crab', desc: 'A crustacean the size of a galleon, completely impervious to cannon fire.', price: 55000, baseStats: { hp: 420, defenseRating: 26, str: 28, dex: 4, con: 30, speed: 86 } }
        ],
        mountClass: 'MYTHIC',
        availability: 'ALL_ROLES',
        tier: 5,
        icon: 'GiSpikedShell',

        rarity: 'Legendary'
    },
    {
        id: 'primordial_titans',
        name: 'Primordial Titans',
        baseStats: { hp: 600, defenseRating: 24, str: 30, dex: 14, con: 30, speed: 126 },
        variants: [
            { name: 'World-Turtle', desc: 'An island-sized tortoise with a fortress carved into its shell. Entire warbands ride it.', price: 200000, baseStats: { hp: 800, defenseRating: 28, str: 28, dex: 2, con: 30, speed: 108 } },
            { name: 'Storm-Born Leviathan', desc: 'A serpent of living thunderclouds. Lightning arcs between its coils.', price: 300000, baseStats: { hp: 550, defenseRating: 22, str: 30, dex: 20, con: 28, speed: 135 } },
            { name: 'Astral Whale', desc: 'Swims through the space between planes. Its song opens rifts.', price: 350000, baseStats: { hp: 700, defenseRating: 24, str: 28, dex: 12, con: 30, speed: 123 } },
            { name: 'Colossus of Iron', desc: 'A god-forged automaton that walks on legs taller than cathedral spires.', price: 400000, baseStats: { hp: 900, defenseRating: 26, str: 30, dex: 4, con: 30, speed: 111 } },
            { name: 'Living Mountain', desc: 'A sentient peak that uproots itself. Rivers cascade down its flanks.', price: 500000, baseStats: { hp: 1000, defenseRating: 30, str: 30, dex: 1, con: 30, speed: 107 } },
            { name: 'Tide-Caller Kraken', desc: 'Commands the oceans. Its tentacles can drag warships beneath the surface.', price: 280000, baseStats: { hp: 650, defenseRating: 22, str: 30, dex: 16, con: 28, speed: 129 } },
            { name: 'Ember-Heart Phoenix', desc: 'Reborn from its ashes upon death. The rider is immolated and resurrected with it.', price: 250000, baseStats: { hp: 450, defenseRating: 22, str: 24, dex: 24, con: 24, speed: 141 } },
            { name: 'Void Serpent', desc: 'A snake of absolute nothingness. Where it passes, reality ceases briefly.', price: 450000, baseStats: { hp: 500, defenseRating: 24, str: 28, dex: 22, con: 26, speed: 138 } },
            { name: 'Primal Behemoth', desc: 'The original beast from which all predators descend. Extinction walks with it.', price: 380000, baseStats: { hp: 750, defenseRating: 24, str: 30, dex: 10, con: 30, speed: 120 } },
            { name: 'Dream-Eater Moth', desc: 'Feeds on thoughts. Its wings scatter sleep spores across battlefields.', price: 220000, baseStats: { hp: 400, defenseRating: 20, str: 22, dex: 26, con: 22, speed: 144 } }
        ],
        mountClass: 'MYTHIC',
        availability: 'ALL_ROLES',
        tier: 6,
        icon: 'GiMountainRoad',

        rarity: 'Mythic'
    },

    // ==========================================
    // CATEGORY 2: ALL RACES (Mounts that ignore biological constraints like rider size)
    // ==========================================
    {
        id: 'pack_lizards',
        name: 'Creeping Pack-Reptiles',
        baseStats: { hp: 18, defenseRating: 12, str: 14, dex: 14, con: 12, speed: 36 },
        variants: [
            { name: 'Giant Pack-Gecko', desc: 'Can walk perfectly up vertical walls along with its rider.', price: 80, baseStats: { hp: 16, defenseRating: 13, str: 12, dex: 18, con: 10, speed: 42 } },
            { name: 'Swamp Sumpter-Iguana', desc: 'Naturally buoyant, frequently used to navigate treacherous bogs.', price: 70, baseStats: { hp: 20, defenseRating: 12, str: 14, dex: 12, con: 14, speed: 33 } },
            { name: 'Desert Skink', desc: 'Buries itself in the sand to avoid midday heat.', price: 60, baseStats: { hp: 14, defenseRating: 13, str: 12, dex: 16, con: 12, speed: 39 } },
            { name: 'Crag-Climber Lizard', desc: 'Its claws shatter stone, preventing any chance of slipping.', price: 90, baseStats: { hp: 20, defenseRating: 14, str: 16, dex: 14, con: 14, speed: 36 } },
            { name: 'River Basilisk (Tame)', desc: 'Actually functionally runs across the surface of fast-moving water.', price: 120, baseStats: { hp: 18, defenseRating: 12, str: 14, dex: 18, con: 10, speed: 42 } },
            { name: 'Jungle Chameleon', desc: 'Changes color to perfectly mask both itself and its mounted rider.', price: 150, baseStats: { hp: 15, defenseRating: 12, str: 10, dex: 20, con: 10, speed: 45 } },
            { name: 'Venom-Spit Monitor', desc: 'Extremely aggressive to strangers, heavily loyal to its owner.', price: 180, baseStats: { hp: 22, defenseRating: 13, str: 16, dex: 14, con: 14, speed: 36 } },
            { name: 'Heavy-Tail Skink', desc: 'Uses its massive, fleshy tail to counter-balance heavy cargo drops.', price: 100, baseStats: { hp: 24, defenseRating: 12, str: 18, dex: 10, con: 16, speed: 30 } },
            { name: 'Underground Blind-Worm', desc: 'Relies entirely on heat-signatures. Excellent for pitch black mining runs.', price: 130, baseStats: { hp: 20, defenseRating: 11, str: 14, dex: 12, con: 14, speed: 33 } },
            { name: 'Toad-Morph Sumpter', desc: 'An incredibly fat amphibian capable of massive, arching jumps over walls.', price: 110, baseStats: { hp: 18, defenseRating: 11, str: 14, dex: 16, con: 12, speed: 39 } }
        ],
        mountClass: 'BEAST',
        availability: 'ALL_RACES',
        tier: 1,
        icon: 'GiGecko',

        rarity: 'Common'
    },
    {
        id: 'cavern_crawlers',
        name: 'Cavern Crawlers',
        baseStats: { hp: 38, defenseRating: 14, str: 16, dex: 16, con: 14, speed: 49 },
        variants: [
            { name: 'Goliath Cave Spider', desc: 'A terrifying arachnid broken for riding; spins its own safety tethers.', price: 300, baseStats: { hp: 36, defenseRating: 14, str: 14, dex: 18, con: 14, speed: 52 } },
            { name: 'Boring-Beetle', desc: 'A giant insect with a drill-like horn, constantly carving new tunnels.', price: 400, baseStats: { hp: 44, defenseRating: 16, str: 20, dex: 10, con: 18, speed: 40 } },
            { name: 'Armored Centipede', desc: 'A segmented mount capable of twisting cleanly through labyrinthine caves.', price: 350, baseStats: { hp: 38, defenseRating: 15, str: 16, dex: 18, con: 14, speed: 52 } },
            { name: 'Glow-Worm Sumpter', desc: 'Its abdomen glows intensely, providing a permanent natural lantern.', price: 280, baseStats: { hp: 30, defenseRating: 12, str: 14, dex: 12, con: 12, speed: 43 } },
            { name: 'Death-Head Moth', desc: 'A localized subterranean flier that navigates perfectly via echolocation.', price: 450, baseStats: { hp: 28, defenseRating: 13, str: 12, dex: 20, con: 10, speed: 55 } },
            { name: 'Scavenger Ant', desc: 'Capable of lifting ten times its own weight; incredibly disciplined.', price: 500, baseStats: { hp: 40, defenseRating: 15, str: 22, dex: 14, con: 16, speed: 46 } },
            { name: 'Spitting Bombardier', desc: 'An insect that launches scalding alchemical acid at pursuers when fleeing.', price: 600, baseStats: { hp: 34, defenseRating: 13, str: 14, dex: 18, con: 14, speed: 52 } },
            { name: 'Razor-Claw Mantis', desc: 'A terrifying mount that explicitly attacks anything that approaches its rider.', price: 700, baseStats: { hp: 42, defenseRating: 14, str: 18, dex: 20, con: 14, speed: 55 } },
            { name: 'Glass-Wing Cicada', desc: 'Completely deafening when flying, frequently used to disorient enemies.', price: 350, baseStats: { hp: 26, defenseRating: 12, str: 12, dex: 18, con: 10, speed: 52 } },
            { name: 'Web-Weaver Tarantula', desc: 'Capable of spinning temporary bridges over subterranean chasms.', price: 480, baseStats: { hp: 38, defenseRating: 14, str: 16, dex: 16, con: 14, speed: 49 } }
        ],
        mountClass: 'BEAST',
        availability: 'ALL_RACES',
        tier: 2,
        icon: 'GiSpiderBot',

        rarity: 'Uncommon'
    },
    {
        id: 'bound_elementals',
        name: 'Tethered Elemental Mounts',
        baseStats: { hp: 68, defenseRating: 15, str: 18, dex: 16, con: 16, speed: 64 },
        variants: [
            { name: 'Earth-Skiff', desc: 'A disc of hardened stone that surfs across dirt as if it were water.', price: 1200, baseStats: { hp: 60, defenseRating: 16, str: 18, dex: 14, con: 16, speed: 61 } },
            { name: 'Flame-Chariot', desc: 'A floating chassis drawn by constantly thrashing, screaming fire elementals.', price: 1500, baseStats: { hp: 70, defenseRating: 14, str: 20, dex: 16, con: 16, speed: 64 } },
            { name: 'Water-Weaver Strider', desc: 'A localized whirlpool that suspends the rider perfectly dry inside its eye.', price: 1300, baseStats: { hp: 65, defenseRating: 14, str: 16, dex: 18, con: 14, speed: 67 } },
            { name: 'Draft-Wind', desc: 'An invisible current of air that physically carries the rider off the ground.', price: 1800, baseStats: { hp: 50, defenseRating: 16, str: 14, dex: 22, con: 12, speed: 73 } },
            { name: 'Magma-Surfer', desc: 'A heat-resistant slab that flawlessly glides down active lava flows.', price: 2000, baseStats: { hp: 80, defenseRating: 17, str: 20, dex: 12, con: 20, speed: 58 } },
            { name: 'Frost-Runner', desc: 'A sentient iceberg that permanently freezes the earth beneath it to slide along.', price: 1600, baseStats: { hp: 75, defenseRating: 16, str: 18, dex: 14, con: 18, speed: 61 } },
            { name: 'Lightning-Harness', desc: 'Transports the rider in incredibly fast, intensely disorienting thunderbolt leaps.', price: 2500, baseStats: { hp: 55, defenseRating: 15, str: 14, dex: 24, con: 12, speed: 76 } },
            { name: 'Mud-Trawler', desc: 'A massive golem of sludge that carries riders inside its hollowed-out chest.', price: 1100, baseStats: { hp: 85, defenseRating: 14, str: 22, dex: 6, con: 22, speed: 49 } },
            { name: 'Ash-Cloud', desc: 'A choking swarm of embers that the rider stands upon; blinds all who follow.', price: 1400, baseStats: { hp: 58, defenseRating: 13, str: 14, dex: 18, con: 14, speed: 67 } },
            { name: 'Crystal-Glider', desc: 'A razor-sharp elemental construct that flies exclusively in perfectly straight lines.', price: 1900, baseStats: { hp: 62, defenseRating: 18, str: 16, dex: 20, con: 14, speed: 70 } }
        ],
        mountClass: 'MAGICAL',
        availability: 'ALL_RACES',
        tier: 3,
        icon: 'GiWhirlwind',

        rarity: 'Rare'
    },
    {
        id: 'arcane_construct_mounts',
        name: 'Arcane Constructs',
        baseStats: { hp: 130, defenseRating: 18, str: 22, dex: 16, con: 20, speed: 69 },
        variants: [
            { name: 'Bronze Steed', desc: 'A perfect clockwork replica of a horse that requires oil instead of water.', price: 5000, baseStats: { hp: 120, defenseRating: 17, str: 20, dex: 16, con: 18, speed: 69 } },
            { name: 'Iron Falcon', desc: 'A mechanical raptor heavily utilized by rich archmages for rapid transport.', price: 6500, baseStats: { hp: 100, defenseRating: 18, str: 18, dex: 22, con: 16, speed: 78 } },
            { name: 'Obsidian Panther', desc: 'A silent, perfectly machined predator powered entirely by trapped souls.', price: 7000, baseStats: { hp: 130, defenseRating: 19, str: 22, dex: 20, con: 20, speed: 75 } },
            { name: 'Steel-Plated Rhino', desc: 'A siege-engine with an internal furnace; belches heavy black smoke.', price: 8000, baseStats: { hp: 160, defenseRating: 20, str: 26, dex: 8, con: 24, speed: 57 } },
            { name: 'Mithral-Hound', desc: 'Incredibly lightweight and fast, literally outrunning falling arrows.', price: 9000, baseStats: { hp: 110, defenseRating: 19, str: 18, dex: 26, con: 16, speed: 84 } },
            { name: 'Crystal-Gargoyle', desc: 'A beautiful but heavy flyer that acts as a magical battery when resting.', price: 6000, baseStats: { hp: 125, defenseRating: 17, str: 20, dex: 14, con: 20, speed: 66 } },
            { name: 'Adamantine Tortoise', desc: 'Functionally indestructible, moving agonizingly slow but guaranteeing safety.', price: 10000, baseStats: { hp: 200, defenseRating: 24, str: 22, dex: 2, con: 28, speed: 48 } },
            { name: 'Cog-Driven Chariot', desc: 'A rune-driven battle-platform requiring no draft beasts to operate.', price: 8500, baseStats: { hp: 140, defenseRating: 18, str: 24, dex: 12, con: 22, speed: 63 } },
            { name: 'Glass-Weaver Spider', desc: 'A beautiful, terrifying fragile mount that turns completely invisible on command.', price: 12000, baseStats: { hp: 90, defenseRating: 16, str: 16, dex: 24, con: 14, speed: 81 } },
            { name: 'Runed Golem-Carrier', desc: 'A bipedal monolithic titan that carries its owner gently in its palms.', price: 15000, baseStats: { hp: 180, defenseRating: 20, str: 28, dex: 6, con: 26, speed: 54 } }
        ],
        mountClass: 'CONSTRUCT',
        availability: 'ALL_RACES',
        tier: 4,
        icon: 'GiRobotGolem',

        rarity: 'Epic'
    },
    {
        id: 'celestial_chariots',
        name: 'Divine Barges',
        baseStats: { hp: 320, defenseRating: 22, str: 26, dex: 18, con: 26, speed: 107 },
        variants: [
            { name: 'Sun-Chariot', desc: 'A blinding conveyance pulled by four horses made of pure divine flame.', price: 50000, baseStats: { hp: 300, defenseRating: 22, str: 26, dex: 20, con: 24, speed: 110 } },
            { name: 'Moon-Barge', desc: 'A crescent-shaped vessel that silently drifts through the sky at midnight.', price: 45000, baseStats: { hp: 280, defenseRating: 20, str: 22, dex: 22, con: 24, speed: 113 } },
            { name: 'River-Styx Gondola', desc: 'Ferries riders flawlessly through both the physical world and the afterlife.', price: 60000, baseStats: { hp: 260, defenseRating: 20, str: 20, dex: 18, con: 22, speed: 107 } },
            { name: 'Chariot of the Storm-Lord', desc: 'Rides along the crests of thunderclouds, pulled by tethered lightning bolts.', price: 55000, baseStats: { hp: 310, defenseRating: 21, str: 26, dex: 24, con: 24, speed: 116 } },
            { name: 'Barge of the Earth-Mother', desc: 'A floating island of pure idyllic nature, blooming flowers as it flies.', price: 80000, baseStats: { hp: 400, defenseRating: 22, str: 28, dex: 10, con: 30, speed: 95 } },
            { name: 'Throne of the Arch-Demon', desc: 'A levitating obsidian throne carried by weeping, cursed spirits.', price: 75000, baseStats: { hp: 340, defenseRating: 24, str: 28, dex: 16, con: 28, speed: 104 } },
            { name: 'Star-Glass Palanquin', desc: 'A beautiful, shimmering construct that travels via intense beams of starlight.', price: 90000, baseStats: { hp: 280, defenseRating: 24, str: 22, dex: 22, con: 24, speed: 113 } },
            { name: 'The Valkyrie\'s Sled', desc: 'A heavily armored airborne sled pulled by armored snow-wolves.', price: 65000, baseStats: { hp: 320, defenseRating: 22, str: 26, dex: 20, con: 26, speed: 110 } },
            { name: 'Forge-God\'s Anvil', desc: 'A flying metallic fortress that perpetually strikes an internal anvil to stay airborne.', price: 100000, baseStats: { hp: 450, defenseRating: 26, str: 30, dex: 6, con: 30, speed: 89 } },
            { name: 'The Reaper\'s Carriage', desc: 'A completely silent, translucent carriage pulled by headless skeletal steeds.', price: 120000, baseStats: { hp: 360, defenseRating: 22, str: 24, dex: 22, con: 26, speed: 113 } }
        ],
        mountClass: 'MYTHIC',
        availability: 'ALL_RACES',
        tier: 5,
        icon: 'GiSunPriest',

        rarity: 'Legendary'
    },
    {
        id: 'convergence_vessels',
        name: 'Convergence Vessels',
        baseStats: { hp: 580, defenseRating: 24, str: 28, dex: 16, con: 28, speed: 129 },
        variants: [
            { name: 'Rift-Crawler', desc: 'A centipede that burrows between dimensions. Each segment exists in a different plane.', price: 180000, baseStats: { hp: 500, defenseRating: 22, str: 26, dex: 20, con: 26, speed: 135 } },
            { name: 'Mirror-Walker', desc: 'A silver steed that exists only in reflections. The rider enters through polished surfaces.', price: 250000, baseStats: { hp: 420, defenseRating: 24, str: 24, dex: 24, con: 24, speed: 141 } },
            { name: 'Gravity-Defier', desc: 'A sphere of compressed force. It falls upward, dragging everything around it askew.', price: 300000, baseStats: { hp: 600, defenseRating: 26, str: 28, dex: 14, con: 28, speed: 126 } },
            { name: 'Entropy Wyrm', desc: 'Ages everything it touches. Castles crumble to dust beneath its belly.', price: 350000, baseStats: { hp: 550, defenseRating: 22, str: 30, dex: 12, con: 30, speed: 123 } },
            { name: 'Soul-Forge Titan', desc: 'A walking furnace of raw creation. New matter crystallizes in its wake.', price: 400000, baseStats: { hp: 700, defenseRating: 24, str: 30, dex: 8, con: 30, speed: 117 } },
            { name: 'Thought-Eater Squid', desc: 'A psionic abomination that floats on telekinetic force. Erases memory of its passage.', price: 220000, baseStats: { hp: 380, defenseRating: 20, str: 22, dex: 26, con: 22, speed: 144 } },
            { name: 'Wyrd-Spinner', desc: 'A fate-spider that weaves probability. Arrows bend around its rider.', price: 280000, baseStats: { hp: 440, defenseRating: 28, str: 24, dex: 22, con: 26, speed: 138 } },
            { name: 'Echo-Beast', desc: 'Exists one second in the future. Attacks pass through where it was, never where it is.', price: 320000, baseStats: { hp: 460, defenseRating: 26, str: 26, dex: 26, con: 26, speed: 144 } },
            { name: 'Prismatic Hydra', desc: 'Each head breathes a different element. Seven heads, seven annihilations.', price: 450000, baseStats: { hp: 750, defenseRating: 24, str: 30, dex: 14, con: 30, speed: 126 } },
            { name: 'The Unnamed', desc: 'Cannot be described, named, or remembered. Riders forget they own it between dismounts.', price: 500000, baseStats: { hp: 900, defenseRating: 30, str: 30, dex: 18, con: 30, speed: 132 } }
        ],
        mountClass: 'MYTHIC',
        availability: 'ALL_RACES',
        tier: 6,
        icon: 'GiVortex',

        rarity: 'Mythic'
    },
    // CATEGORY 3: SPECIFIC ROLE (Locked behind class training and combat philosophy)
    // ==========================================
    {
        id: 'holy_steeds',
        name: 'Sanctified Mounts',
        baseStats: { hp: 22, defenseRating: 13, str: 16, dex: 12, con: 14, speed: 33 },
        variants: [
            { name: 'Acolyte\'s Palfrey', desc: 'A gentle, heavily blessed horse immune to lesser curses.', price: 250, baseStats: { hp: 20, defenseRating: 12, str: 14, dex: 14, con: 14, speed: 36 } },
            { name: 'Inquisitor\'s Charger', desc: 'A fiercely loyal steed trained to trample heretics on command.', price: 500, baseStats: { hp: 26, defenseRating: 14, str: 18, dex: 12, con: 16, speed: 33 } },
            { name: 'Sun-Touched Stallion', desc: 'Its coat literally gleams, shedding a passive aura of bright light 30 feet.', price: 800, baseStats: { hp: 24, defenseRating: 13, str: 16, dex: 14, con: 14, speed: 36 } },
            { name: 'Temple Lion', desc: 'A highly disciplined feline that acts as both a guard and a mount.', price: 1200, baseStats: { hp: 28, defenseRating: 14, str: 18, dex: 16, con: 14, speed: 39 } },
            { name: 'Dawn-Bringer Elk', desc: 'A massive stag whose antlers catch the morning light beautifully.', price: 1500, baseStats: { hp: 26, defenseRating: 13, str: 18, dex: 14, con: 16, speed: 36 } },
            { name: 'Silver-Hoof Rouncey', desc: 'Its hooves have been shod in pure silver to trample evil spirits into dust.', price: 900, baseStats: { hp: 22, defenseRating: 13, str: 16, dex: 14, con: 14, speed: 36 } },
            { name: 'Hierophant\'s Elephant', desc: 'Draped in massive religious tabards; a terrifying symbol of holy war.', price: 3000, baseStats: { hp: 40, defenseRating: 15, str: 22, dex: 6, con: 20, speed: 24 } },
            { name: 'Radiant Gryphon', desc: 'A flying beast heavily favored by high-ranking knights for aerial crusades.', price: 5000, baseStats: { hp: 30, defenseRating: 15, str: 20, dex: 16, con: 16, speed: 39 } },
            { name: 'Shield-Bearer Bear', desc: 'A massive armored bear trained to protect the casting cleric at all costs.', price: 2000, baseStats: { hp: 35, defenseRating: 16, str: 20, dex: 8, con: 18, speed: 27 } },
            { name: 'Martyr\'s Steed', desc: 'Automatically intercepts fatal blows meant for its rider, dying in their place.', price: 10000, baseStats: { hp: 18, defenseRating: 12, str: 14, dex: 12, con: 18, speed: 33 } }
        ],
        mountClass: 'BEAST',
        availability: 'SPECIFIC_ROLE',
        tier: 1,
        icon: 'GiAngelWings',

        rarity: 'Common',
        validRoles: ["High Paladin", "Lightbringer", "Hierophant", "High Inquisitor", "Celestial Knight"]
    },
    {
        id: 'stealth_prowlers',
        name: 'Shadow Prowlers',
        baseStats: { hp: 32, defenseRating: 14, str: 14, dex: 20, con: 12, speed: 60 },
        variants: [
            { name: 'Shadow-Panther', desc: 'A pitch-black feline whose footfalls make absolutely zero noise.', price: 1500, baseStats: { hp: 34, defenseRating: 15, str: 16, dex: 22, con: 12, speed: 63 } },
            { name: 'Night-Stalker Lynx', desc: 'Favored by spies; perfectly camouflaged in almost any low-light condition.', price: 1200, baseStats: { hp: 28, defenseRating: 14, str: 14, dex: 20, con: 12, speed: 60 } },
            { name: 'Gloom-Hound', desc: 'A terrifying dog broken for running silently through the deep dark.', price: 800, baseStats: { hp: 32, defenseRating: 13, str: 16, dex: 18, con: 14, speed: 57 } },
            { name: 'Veil-Weaver Spider', desc: 'Drops quietly from ceilings to snatch entirely unwary guards.', price: 2000, baseStats: { hp: 26, defenseRating: 14, str: 12, dex: 22, con: 10, speed: 63 } },
            { name: 'Smoke-Serpent', desc: 'Practically made of ash; slips its rider effortlessly through grated portcullises.', price: 2500, baseStats: { hp: 24, defenseRating: 13, str: 10, dex: 24, con: 10, speed: 66 } },
            { name: 'Whispering Owl', desc: 'Capable of carrying light assassins into fortresses without triggering wards.', price: 3000, baseStats: { hp: 22, defenseRating: 14, str: 12, dex: 22, con: 10, speed: 63 } },
            { name: 'Ash-Fox', desc: 'Incredibly nimble; leaves no tracks whatsoever in dirt or snow.', price: 900, baseStats: { hp: 20, defenseRating: 14, str: 10, dex: 22, con: 10, speed: 63 } },
            { name: 'Void-Bat', desc: 'Blinds enemies temporarily simply by passing over their immediate vicinity.', price: 1800, baseStats: { hp: 28, defenseRating: 13, str: 14, dex: 20, con: 12, speed: 60 } },
            { name: 'Glass-Scaled Viper', desc: 'Functionally invisible in tall grass; lethal venom if disturbed.', price: 2200, baseStats: { hp: 22, defenseRating: 15, str: 12, dex: 22, con: 10, speed: 63 } },
            { name: 'Eclipse-Stallion', desc: 'A magical horse that absorbs all ambient light, casting a wide aura of magical darkness.', price: 4000, baseStats: { hp: 38, defenseRating: 15, str: 18, dex: 20, con: 14, speed: 60 } }
        ],
        mountClass: 'MAGICAL',
        availability: 'SPECIFIC_ROLE',
        tier: 2,
        icon: 'GiCat',

        rarity: 'Uncommon',
        validRoles: ["Master Assassin", "Shadowblade", "Grandmaster Spy", "Faceless King", "Darkblade"]
    },
    {
        id: 'war_behemoths',
        name: 'Front-Line Juggernauts',
        baseStats: { hp: 72, defenseRating: 15, str: 22, dex: 10, con: 18, speed: 50 },
        variants: [
            { name: 'Gore-Tusk Boar', desc: 'A horribly disfigured, massive feral pig heavily trained to break pike blocks.', price: 2000, baseStats: { hp: 68, defenseRating: 14, str: 20, dex: 12, con: 18, speed: 53 } },
            { name: 'Armored Warg', desc: 'A chaotic, hateful wolf bound entirely in spiked iron plates.', price: 2500, baseStats: { hp: 74, defenseRating: 16, str: 22, dex: 14, con: 18, speed: 56 } },
            { name: 'Siege-Breaker Rhino', desc: 'Literally used as a living battering ram against castle gates.', price: 3500, baseStats: { hp: 90, defenseRating: 17, str: 26, dex: 6, con: 22, speed: 44 } },
            { name: 'Blood-Mane Lion', desc: 'Bred entirely for pit fighting and shock cavalry warfare.', price: 3000, baseStats: { hp: 72, defenseRating: 14, str: 22, dex: 16, con: 16, speed: 59 } },
            { name: 'Titan-Toad', desc: 'A terrifying, bloated amphibian that crushes enemies beneath its massive weight.', price: 2800, baseStats: { hp: 80, defenseRating: 13, str: 24, dex: 8, con: 20, speed: 47 } },
            { name: 'Iron-Tooth Croc', desc: 'Used extensively to ambush and drag heavy cavalry into deep rivers.', price: 2200, baseStats: { hp: 70, defenseRating: 15, str: 20, dex: 10, con: 18, speed: 50 } },
            { name: 'War-Grizzly', desc: 'A towering bear trained to decapitate enemy horses with a single swipe.', price: 4000, baseStats: { hp: 85, defenseRating: 15, str: 24, dex: 10, con: 20, speed: 50 } },
            { name: 'Crag-Maw Basilisk', desc: 'Its gaze heavily intimidates enemies, causing massive morale routs.', price: 5000, baseStats: { hp: 78, defenseRating: 16, str: 22, dex: 8, con: 20, speed: 47 } },
            { name: 'Shatter-Horn Ram', desc: 'A mountain goat so large its headbutts can cave in iron shields instantly.', price: 1800, baseStats: { hp: 60, defenseRating: 14, str: 20, dex: 14, con: 16, speed: 56 } },
            { name: 'Juggernaut Mastiff', desc: 'A hunting dog bred to the size of a warhorse, completely immune to fear.', price: 3200, baseStats: { hp: 75, defenseRating: 15, str: 22, dex: 14, con: 18, speed: 56 } }
        ],
        mountClass: 'BEAST',
        availability: 'SPECIFIC_ROLE',
        tier: 3,
        icon: 'GiBoar',

        rarity: 'Rare',
        validRoles: ["Warlord", "Titan Lord", "Dreadnought", "Skullcrusher", "Ironbound Champion", "Titan Slayer"]
    },
    {
        id: 'draconic_drakes',
        name: 'Elemental Drakes',
        baseStats: { hp: 142, defenseRating: 17, str: 24, dex: 16, con: 20, speed: 84 },
        variants: [
            { name: 'Fire-Drake', desc: 'Constantly spills embers; immune completely to all forms of thermal damage.', price: 10000, baseStats: { hp: 140, defenseRating: 17, str: 24, dex: 16, con: 20, speed: 84 } },
            { name: 'Storm-Wyvern', desc: 'Flies significantly faster in the middle of cataclysmic thunderstorms.', price: 12000, baseStats: { hp: 135, defenseRating: 16, str: 22, dex: 20, con: 18, speed: 90 } },
            { name: 'Ice-Wyrm', desc: 'A wingless draconic serpent that freezes the ground to easily slide across chasms.', price: 9000, baseStats: { hp: 130, defenseRating: 18, str: 22, dex: 14, con: 20, speed: 81 } },
            { name: 'Acid-Spit Drake', desc: 'Its saliva rapidly deteriorates armor; frequently used by destructive elementalists.', price: 11000, baseStats: { hp: 125, defenseRating: 16, str: 20, dex: 18, con: 18, speed: 87 } },
            { name: 'Earth-Shaker Drake', desc: 'A massive, heavily plated dragon that cannot fly but causes localized earthquakes.', price: 15000, baseStats: { hp: 180, defenseRating: 20, str: 28, dex: 6, con: 26, speed: 69 } },
            { name: 'Lightning-Crest Drake', desc: 'Absorbs all incoming electrical attacks, converting them directly into flight speeds.', price: 14000, baseStats: { hp: 130, defenseRating: 17, str: 22, dex: 22, con: 18, speed: 93 } },
            { name: 'Obsidian-Scale Wyvern', desc: 'Its scales act as functional adamantine, turning aside all non-magical ballista bolts.', price: 18000, baseStats: { hp: 165, defenseRating: 20, str: 26, dex: 14, con: 24, speed: 81 } },
            { name: 'Venom-Gland Drake', desc: 'Radiates a highly toxic miasma; the rider must be magically warded to survive.', price: 13000, baseStats: { hp: 135, defenseRating: 16, str: 22, dex: 16, con: 20, speed: 84 } },
            { name: 'Solar-Flare Drake', desc: 'Its breath attack acts as a highly concentrated beam of pure sunlight.', price: 20000, baseStats: { hp: 150, defenseRating: 18, str: 24, dex: 18, con: 22, speed: 87 } },
            { name: 'Aether-Wyrm', desc: 'An entity made of raw magical force; requires immense mana to sustain.', price: 25000, baseStats: { hp: 160, defenseRating: 19, str: 26, dex: 18, con: 22, speed: 87 } }
        ],
        mountClass: 'DRACONIC',
        availability: 'SPECIFIC_ROLE',
        tier: 4,
        icon: 'GiDragonHead',

        rarity: 'Epic',
        validRoles: ["Dragon Sage", "Stormbringer", "Storm Herald", "Elementalist", "Archmage", "Phoenixmancer"]
    },
    {
        id: 'abyssal_terrors',
        name: 'Abyssal Terrors',
        baseStats: { hp: 280, defenseRating: 20, str: 26, dex: 18, con: 24, speed: 92 },
        variants: [
            { name: 'Void-Ray', desc: 'An airborne manta perfectly adapted that glides through the fabric of nightmare.', price: 50000, baseStats: { hp: 240, defenseRating: 19, str: 22, dex: 24, con: 20, speed: 101 } },
            { name: 'Demon-Steed', desc: 'A horrific skeletal horse constantly wreathed in screaming dark matter.', price: 60000, baseStats: { hp: 260, defenseRating: 20, str: 24, dex: 22, con: 22, speed: 98 } },
            { name: 'Shadow-Behemoth', desc: 'A monstrous ape-like entity that physically tears portals into the abyss.', price: 70000, baseStats: { hp: 320, defenseRating: 20, str: 30, dex: 14, con: 28, speed: 86 } },
            { name: 'Bone-Dragon', desc: 'An undead draconic titan fueled exclusively by necrotic sacrifice.', price: 85000, baseStats: { hp: 360, defenseRating: 22, str: 28, dex: 16, con: 28, speed: 89 } },
            { name: 'Carrion-Crawler King', desc: 'A massive, disgusting centipede that secretes a highly corrosive rot.', price: 40000, baseStats: { hp: 220, defenseRating: 18, str: 22, dex: 18, con: 22, speed: 92 } },
            { name: 'Gloom-Weaver Matriarch', desc: 'A spider the size of a castle wall, capable of plunging entire battlefields into darkness.', price: 90000, baseStats: { hp: 340, defenseRating: 21, str: 28, dex: 16, con: 26, speed: 89 } },
            { name: 'Chaos-Hound', desc: 'A multi-headed monstrosity whose bites cause spontaneous magical corruption.', price: 55000, baseStats: { hp: 250, defenseRating: 19, str: 24, dex: 22, con: 22, speed: 98 } },
            { name: 'Soul-Furnace Golem', desc: 'A walking iron maiden fueled by the tormented souls of enemies.', price: 75000, baseStats: { hp: 380, defenseRating: 24, str: 28, dex: 6, con: 30, speed: 74 } },
            { name: 'Blight-Bat', desc: 'A gargantuan avian that spreads incurable plagues wherever its shadow falls.', price: 80000, baseStats: { hp: 280, defenseRating: 20, str: 24, dex: 20, con: 24, speed: 95 } },
            { name: 'The Unending Maw', desc: 'A floating, sentient wormhole that digests reality itself as it travels.', price: 150000, baseStats: { hp: 400, defenseRating: 22, str: 30, dex: 18, con: 28, speed: 92 } }
        ],
        mountClass: 'UNDEAD',
        availability: 'SPECIFIC_ROLE',
        tier: 5,
        icon: 'GiScaryFaces',

        rarity: 'Legendary',
        validRoles: ["Necromancer", "Voidseer", "Abyssal Sage", "Abyssal Tyrant", "Chaos Knight", "Void Lord"]
    },
    {
        id: 'apocalypse_harbingers',
        name: 'Apocalypse Harbingers',
        baseStats: { hp: 550, defenseRating: 22, str: 30, dex: 18, con: 28, speed: 132 },
        variants: [
            { name: 'Pale Horse', desc: 'Death rides it. Where its hooves fall, crops wither and livestock collapse.', price: 200000, baseStats: { hp: 480, defenseRating: 22, str: 28, dex: 22, con: 26, speed: 138 } },
            { name: 'World-Eater Worm', desc: 'A continental serpent that consumes geography. Maps redraw in its wake.', price: 400000, baseStats: { hp: 800, defenseRating: 24, str: 30, dex: 6, con: 30, speed: 114 } },
            { name: 'War-Crown Chimera', desc: 'Three heads crown a body of molten brass. Each head speaks a different war-oath.', price: 280000, baseStats: { hp: 560, defenseRating: 22, str: 30, dex: 16, con: 28, speed: 129 } },
            { name: 'Famine-Locust Swarm', desc: 'The rider stands atop a living carpet of billion-strong locusts. Fields die for leagues.', price: 320000, baseStats: { hp: 350, defenseRating: 18, str: 24, dex: 24, con: 24, speed: 141 } },
            { name: 'Plague-Carrier Mammoth', desc: 'A rotting titan trailing epidemics. Entire kingdoms quarantine at its approach.', price: 360000, baseStats: { hp: 700, defenseRating: 20, str: 30, dex: 4, con: 30, speed: 111 } },
            { name: 'The Iron Throne', desc: 'A sentient war-throne that walks on bladed legs. It crowns conquerors unbidden.', price: 250000, baseStats: { hp: 500, defenseRating: 26, str: 28, dex: 12, con: 28, speed: 123 } },
            { name: 'Cataclysm Drake', desc: 'Its breath does not burn — it erases. Stone, flesh, memory, all unmade.', price: 500000, baseStats: { hp: 650, defenseRating: 24, str: 30, dex: 18, con: 30, speed: 132 } },
            { name: 'Sin-Eater Basilisk', desc: 'Feeds on guilt. The more blood on the rider\'s hands, the stronger it grows.', price: 300000, baseStats: { hp: 520, defenseRating: 22, str: 28, dex: 16, con: 28, speed: 129 } },
            { name: 'Dread Juggernaut', desc: 'A sphere of compressed souls rolling across the battlefield. Unstoppable.', price: 380000, baseStats: { hp: 600, defenseRating: 28, str: 30, dex: 2, con: 30, speed: 108 } },
            { name: 'Eclipse Sovereign', desc: 'A winged entity of pure darkness. The sun dims when it takes flight.', price: 450000, baseStats: { hp: 550, defenseRating: 24, str: 28, dex: 24, con: 28, speed: 141 } }
        ],
        mountClass: 'MYTHIC',
        availability: 'SPECIFIC_ROLE',
        tier: 6,
        icon: 'GiDeathSkull',

        rarity: 'Mythic',
        validRoles: ["Warlord", "Necromancer", "Abyssal Tyrant", "Chaos Knight", "Void Lord", "Titan Lord"]
    },

    // ==========================================
    // CATEGORY 4: SPECIFIC RACE (Locked behind biological compatibility or intense local lore)
    // ==========================================
    {
        id: 'forest_stags',
        name: 'Sylvan Forest Mounts',
        baseStats: { hp: 20, defenseRating: 12, str: 14, dex: 16, con: 12, speed: 39 },
        variants: [
            { name: 'Great Forest Stag', desc: 'A massive deer that weaves effortlessly through dense forest undergrowth.', price: 300, baseStats: { hp: 22, defenseRating: 12, str: 16, dex: 16, con: 12, speed: 39 } },
            { name: 'Moon-Antlered Elk', desc: 'An elk with silver-tipped antlers that faintly glow in the dark.', price: 600, baseStats: { hp: 24, defenseRating: 12, str: 16, dex: 14, con: 14, speed: 36 } },
            { name: 'Thicket Weaver Stag', desc: 'Extremely nimble, its pelt camouflages perfectly in dense briar patches.', price: 350, baseStats: { hp: 18, defenseRating: 13, str: 14, dex: 18, con: 10, speed: 42 } },
            { name: 'Giant Forest Lynx', desc: 'A territorial feline that allows only those in tune with nature to ride it.', price: 800, baseStats: { hp: 20, defenseRating: 14, str: 16, dex: 18, con: 12, speed: 42 } },
            { name: 'Moss-Backed Bear', desc: 'A slumbering giant heavily overgrown with symbiotic, defensive foliage.', price: 900, baseStats: { hp: 30, defenseRating: 14, str: 20, dex: 8, con: 16, speed: 27 } },
            { name: 'Spring-Tide Doe', desc: 'Leaves a faint trail of blooming wildflowers wherever it steps.', price: 400, baseStats: { hp: 16, defenseRating: 12, str: 12, dex: 18, con: 10, speed: 42 } },
            { name: 'River-Fording Elk', desc: 'Extremely buoyant; easily swims across incredibly fast-moving rivers.', price: 500, baseStats: { hp: 22, defenseRating: 12, str: 16, dex: 14, con: 14, speed: 36 } },
            { name: 'Canopy-Jumper Panther', desc: 'A feline specifically trained to leap across the highest branches of giant trees.', price: 1000, baseStats: { hp: 20, defenseRating: 14, str: 16, dex: 20, con: 12, speed: 45 } },
            { name: 'Sylph-Moth', desc: 'A giant, beautifully colored moth capable of carrying extremely light riders safely.', price: 700, baseStats: { hp: 14, defenseRating: 11, str: 10, dex: 20, con: 8, speed: 45 } },
            { name: 'Faerie-Dragon', desc: 'A highly intelligent, temperamental miniature dragon that demands respect from its rider.', price: 1500, baseStats: { hp: 18, defenseRating: 15, str: 12, dex: 20, con: 12, speed: 45 } }
        ],
        mountClass: 'BEAST',
        availability: 'SPECIFIC_RACE',
        tier: 1,
        icon: 'GiDeer',

        rarity: 'Common',
        validRaces: ["Elf", "Wood Elf", "Half-Elf", "Fairy", "Sylph", "Dryad"]
    },
    {
        id: 'crag_beasts',
        name: 'Ironcrag Beasts',
        baseStats: { hp: 38, defenseRating: 14, str: 18, dex: 10, con: 16, speed: 40 },
        variants: [
            { name: 'Iron-Horn Ram', desc: 'A massive mountain goat heavily favored by subterranean mountain dwellers.', price: 400, baseStats: { hp: 35, defenseRating: 14, str: 18, dex: 12, con: 16, speed: 43 } },
            { name: 'War-Boar', desc: 'Incredibly stubborn, short, and thick; perfect for tunnel combat.', price: 600, baseStats: { hp: 40, defenseRating: 14, str: 20, dex: 10, con: 18, speed: 40 } },
            { name: 'Armored Tunnel-Badger', desc: 'A digging brute that absolutely refuses to retreat in a fight.', price: 750, baseStats: { hp: 42, defenseRating: 15, str: 18, dex: 10, con: 18, speed: 40 } },
            { name: 'Goliath Cave-Bear', desc: 'A towering, aggressive predator perfectly acclimated to complete darkness.', price: 1200, baseStats: { hp: 52, defenseRating: 14, str: 22, dex: 10, con: 18, speed: 40 } },
            { name: 'Stone-Scale Lizard', desc: 'Its scales mimic granite perfectly; immune to a massive amount of bludgeoning damage.', price: 900, baseStats: { hp: 44, defenseRating: 17, str: 18, dex: 8, con: 18, speed: 37 } },
            { name: 'Deep-Mite Swarm', desc: 'The rider is carried by a localized swarm of hundreds of thousands of burrowing insects.', price: 1500, baseStats: { hp: 30, defenseRating: 12, str: 16, dex: 14, con: 14, speed: 46 } },
            { name: 'Magma-Toad', desc: 'A horrific amphibian that swims freely through subterranean lava rivers.', price: 2000, baseStats: { hp: 48, defenseRating: 15, str: 20, dex: 8, con: 20, speed: 37 } },
            { name: 'Iron-Claw Mole', desc: 'A massive mole that acts as an underground excavator and transport.', price: 1800, baseStats: { hp: 40, defenseRating: 13, str: 20, dex: 8, con: 18, speed: 37 } },
            { name: 'Blind-Watcher Bat', desc: 'Used heavily to fly across the utterly massive chasms of the Underdark.', price: 1400, baseStats: { hp: 28, defenseRating: 13, str: 14, dex: 18, con: 12, speed: 52 } },
            { name: 'Dwarven War-Engine', desc: 'A completely mechanical steam-powered tractor treated like a beast of burden.', price: 3000, baseStats: { hp: 55, defenseRating: 18, str: 22, dex: 6, con: 20, speed: 34 } }
        ],
        mountClass: 'BEAST',
        availability: 'SPECIFIC_RACE',
        tier: 2,
        icon: 'GiDwarfFace',

        rarity: 'Uncommon',
        validRaces: ["Dwarf", "Half-Giant", "Duergar", "Gnome", "Giant", "Ogre"]
    },
    {
        id: 'swamp_predators',
        name: 'Swamp Predators',
        baseStats: { hp: 68, defenseRating: 14, str: 20, dex: 12, con: 18, speed: 43 },
        variants: [
            { name: 'Giant Swamp Crocodile', desc: 'An ambush predator capable of carrying heavily armored riders completely underwater.', price: 1500, baseStats: { hp: 72, defenseRating: 15, str: 22, dex: 10, con: 20, speed: 40 } },
            { name: 'Venom-Spit Hydra (Juvenile)', desc: 'A terrifying multi-headed serpent; its heads frequently snap at each other.', price: 4000, baseStats: { hp: 90, defenseRating: 15, str: 22, dex: 12, con: 20, speed: 43 } },
            { name: 'Mud-Slider Serpent', desc: 'An incredibly long snake that slithers effortlessly through deep, dragging mud.', price: 2000, baseStats: { hp: 60, defenseRating: 14, str: 18, dex: 16, con: 16, speed: 49 } },
            { name: 'Bog-Turtles', desc: 'Immensely fat and buoyant, used as functional rafts by swamp-dwelling warbands.', price: 1200, baseStats: { hp: 80, defenseRating: 18, str: 18, dex: 4, con: 22, speed: 31 } },
            { name: 'Blood-Leech Mount', desc: 'A gigantic leech that heals entirely by draining the enemies it runs over.', price: 3500, baseStats: { hp: 65, defenseRating: 12, str: 18, dex: 14, con: 18, speed: 46 } },
            { name: 'Acid-Maw Toad', desc: 'A gargantuan frog that leaps over defensive walls, spitting highly corrosive stomach acid.', price: 2500, baseStats: { hp: 70, defenseRating: 13, str: 20, dex: 14, con: 18, speed: 46 } },
            { name: 'Rot-Weaver Spider', desc: 'A spider perfectly adapted to spinning webs across fetid, stagnant bog water.', price: 1800, baseStats: { hp: 55, defenseRating: 14, str: 16, dex: 18, con: 14, speed: 52 } },
            { name: 'Tangle-Vine Horror', desc: 'A sentient massive plant that is magically coerced into carrying the summoner.', price: 3000, baseStats: { hp: 75, defenseRating: 14, str: 22, dex: 6, con: 20, speed: 34 } },
            { name: 'Plague-Swarm Flies', desc: 'A cloud of disease-ridden flies condensed into a disgusting, humming riding platform.', price: 2200, baseStats: { hp: 45, defenseRating: 11, str: 14, dex: 18, con: 14, speed: 52 } },
            { name: 'Carrion-Bird', desc: 'A massive vulture that feeds exclusively on the rotting corpses in the mire.', price: 2800, baseStats: { hp: 58, defenseRating: 13, str: 18, dex: 16, con: 16, speed: 49 } }
        ],
        mountClass: 'AQUATIC',
        availability: 'SPECIFIC_RACE',
        tier: 3,
        icon: 'GiReptileTail',

        rarity: 'Rare',
        validRaces: ["Lizardfolk", "Lamia", "Naga", "Half-Troll", "Troll", "Goblin"]
    },
    {
        id: 'nightmare_terrors',
        name: 'Nightmare Terrors',
        baseStats: { hp: 135, defenseRating: 17, str: 22, dex: 18, con: 20, speed: 82 },
        variants: [
            { name: 'Nightmare Spider', desc: 'A massive terrifying arachnid revered by the deep-dwelling dark races.', price: 5000, baseStats: { hp: 130, defenseRating: 17, str: 20, dex: 18, con: 20, speed: 82 } },
            { name: 'Shadow-Warg', desc: 'A corrupted, unnaturally large dire-wolf bred exclusively for raiding.', price: 4500, baseStats: { hp: 120, defenseRating: 16, str: 22, dex: 20, con: 18, speed: 85 } },
            { name: 'Cave-Wyvern', desc: 'A blind, incredibly aggressive flying predator completely ruled by its sense of smell.', price: 8000, baseStats: { hp: 150, defenseRating: 17, str: 24, dex: 16, con: 22, speed: 79 } },
            { name: 'Scorpion-Hulk', desc: 'A gigantic scorpion whose venom melts iron armor down to slag in seconds.', price: 7000, baseStats: { hp: 140, defenseRating: 19, str: 22, dex: 14, con: 22, speed: 76 } },
            { name: 'Blood-Fang Bat', desc: 'A horrific bat the size of a wagon, perfectly happy to drain enemy warhorses dry.', price: 6000, baseStats: { hp: 110, defenseRating: 15, str: 18, dex: 22, con: 16, speed: 88 } },
            { name: 'Obsidian Basilik', desc: 'A petrified abomination whose gaze heavily paralyzes charging cavalries.', price: 9500, baseStats: { hp: 155, defenseRating: 20, str: 24, dex: 10, con: 24, speed: 70 } },
            { name: 'Rust-Monster Alpha', desc: 'A heavily armored beast that feeds exclusively on legendary magical weapons and armors.', price: 12000, baseStats: { hp: 145, defenseRating: 18, str: 22, dex: 16, con: 22, speed: 79 } },
            { name: 'Phase-Spider', desc: 'Blinks in and out of the ethereal plane, completely bypassing physical fortification walls.', price: 15000, baseStats: { hp: 120, defenseRating: 17, str: 18, dex: 24, con: 18, speed: 91 } },
            { name: 'Gloom-Centipede', desc: 'A terrifying multi-legged monstrosity that crawls effortlessly across cave ceilings.', price: 8500, baseStats: { hp: 135, defenseRating: 16, str: 22, dex: 18, con: 20, speed: 82 } },
            { name: 'Abyssal-Mite', desc: 'A horrifying insect whose chittering causes violent, uncontrollable auditory hallucinations.', price: 10000, baseStats: { hp: 125, defenseRating: 16, str: 20, dex: 20, con: 18, speed: 85 } }
        ],
        mountClass: 'MAGICAL',
        availability: 'SPECIFIC_RACE',
        tier: 4,
        icon: 'GiScorpionTail',

        rarity: 'Epic',
        validRaces: ["Dark Elf", "Shadow Elf", "Orc", "Hobgoblin", "Bugbear", "Kobold"]
    },
    {
        id: 'ancient_wyrms',
        name: 'Emperor Wyrms',
        baseStats: { hp: 350, defenseRating: 22, str: 30, dex: 16, con: 28, speed: 104 },
        variants: [
            { name: 'Elder Red-Dragon', desc: 'An impossibly arrogant engine of destruction; demands absolute fealty from its rider.', price: 80000, baseStats: { hp: 350, defenseRating: 22, str: 30, dex: 14, con: 28, speed: 101 } },
            { name: 'Gold-Dragon Patriarch', desc: 'A benevolent, unimaginably powerful entity acting more as a mentor than a mount.', price: 100000, baseStats: { hp: 380, defenseRating: 24, str: 30, dex: 16, con: 30, speed: 104 } },
            { name: 'Black-Swamp Wyrm', desc: 'Nests in the most fetid ruins; breathes an inescapable cone of horrific acid.', price: 75000, baseStats: { hp: 320, defenseRating: 20, str: 28, dex: 16, con: 26, speed: 104 } },
            { name: 'Silver-Peak Matriarch', desc: 'A beautiful ice-dragon capable of freezing entire oceans to create bridges.', price: 90000, baseStats: { hp: 360, defenseRating: 22, str: 28, dex: 18, con: 28, speed: 107 } },
            { name: 'Bronze-Coast Marauder', desc: 'A lightning-wreathed dragon notorious for hunting colossal krackens.', price: 85000, baseStats: { hp: 340, defenseRating: 22, str: 28, dex: 18, con: 26, speed: 107 } },
            { name: 'Prismatic Chaos-Dragon', desc: 'An utterly unpredictable beast shifting elements every second; horribly dangerous to ride.', price: 150000, baseStats: { hp: 400, defenseRating: 24, str: 30, dex: 20, con: 30, speed: 110 } },
            { name: 'Colossal Wyvern-Tyrant', desc: 'A massive, highly aggressive alpha-wyvern dripping with lethal neurotoxins.', price: 60000, baseStats: { hp: 300, defenseRating: 20, str: 28, dex: 18, con: 26, speed: 107 } },
            { name: 'Iron-Scale Drake', desc: 'A completely subterranean offshoot entirely immune to lava and physical crushing.', price: 65000, baseStats: { hp: 330, defenseRating: 24, str: 26, dex: 10, con: 28, speed: 95 } },
            { name: 'Storm-Caller Dragon', desc: 'A massive, serpentine dragon lacking wings entirely; flies by swimming through clouds.', price: 95000, baseStats: { hp: 370, defenseRating: 22, str: 28, dex: 20, con: 28, speed: 110 } },
            { name: 'Meteor-Crash Behemoth', desc: 'A wingless draconic titan completely wrapped in an unbroken shell of hyper-dense stone.', price: 120000, baseStats: { hp: 450, defenseRating: 26, str: 30, dex: 4, con: 30, speed: 86 } }
        ],
        mountClass: 'DRACONIC',
        availability: 'SPECIFIC_RACE',
        tier: 5,
        icon: 'GiSpikedDragonHead',

        rarity: 'Legendary',
        validRaces: ["Draconic", "Half-Dragon", "Wyvernfolk"]
    },
    {
        id: 'genesis_beasts',
        name: 'Genesis Beasts',
        baseStats: { hp: 620, defenseRating: 24, str: 30, dex: 16, con: 30, speed: 129 },
        variants: [
            { name: 'First Stag', desc: 'The ancestor of all forest creatures. Every beast kneels at its passage.', price: 200000, baseStats: { hp: 500, defenseRating: 22, str: 26, dex: 22, con: 26, speed: 138 } },
            { name: 'Iron-Root Treant', desc: 'The oldest tree. Its roots span continents, anchoring ley lines to the earth.', price: 300000, baseStats: { hp: 700, defenseRating: 26, str: 30, dex: 4, con: 30, speed: 111 } },
            { name: 'Blood-Origin Spider', desc: 'The first predator to spin silk. Its web can suspend mountains.', price: 350000, baseStats: { hp: 480, defenseRating: 24, str: 28, dex: 24, con: 26, speed: 141 } },
            { name: 'Deep-Father Kraken', desc: 'The progenitor of all sea-monsters. Oceans part at its command.', price: 400000, baseStats: { hp: 650, defenseRating: 22, str: 30, dex: 14, con: 30, speed: 126 } },
            { name: 'Stone-Heart Golem', desc: 'Forged before the first dwarf drew breath. It remembers the shape of the world.', price: 380000, baseStats: { hp: 800, defenseRating: 28, str: 30, dex: 2, con: 30, speed: 108 } },
            { name: 'Ash-Mother Wyvern', desc: 'The volcanic matriarch. Her brood blackens the sky during eruptions.', price: 320000, baseStats: { hp: 550, defenseRating: 22, str: 28, dex: 18, con: 28, speed: 132 } },
            { name: 'Ur-Wolf', desc: 'The original alpha. Every canine in existence carries a fragment of its bloodline.', price: 280000, baseStats: { hp: 520, defenseRating: 22, str: 28, dex: 22, con: 26, speed: 138 } },
            { name: 'Fey-Sovereign Moth', desc: 'Its wings hold the border between the mortal world and the fey. Crossing is involuntary.', price: 250000, baseStats: { hp: 400, defenseRating: 20, str: 22, dex: 26, con: 24, speed: 144 } },
            { name: 'Bone-Ancestor', desc: 'The first creature to die. Its skeleton walks still, remembering life.', price: 450000, baseStats: { hp: 600, defenseRating: 24, str: 28, dex: 14, con: 30, speed: 126 } },
            { name: 'The Primal Egg', desc: 'An unhatched god-beast. The rider sits atop a shell that pulses with creation itself.', price: 500000, baseStats: { hp: 900, defenseRating: 30, str: 30, dex: 10, con: 30, speed: 120 } }
        ],
        mountClass: 'MYTHIC',
        availability: 'SPECIFIC_RACE',
        tier: 6,
        icon: 'GiSpikedDragonHead',

        rarity: 'Mythic',
        validRaces: ["Draconic", "Half-Dragon", "Wyvernfolk", "Dark Elf", "Lizardfolk", "Dwarf"]
    }
];
