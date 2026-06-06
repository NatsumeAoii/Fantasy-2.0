import type { PotionStats } from './potionStats'

// Basic Stat Dictionary
export type Stats = Record<string, number>;

// Affinities Dictionary
export type Affinities = {
    [key: string]: number | undefined;
};

export interface EntityData {
    baseStats: Stats;
    affinities: Affinities;
}

export type RaceData = EntityData & { derivedStats?: Stats };
export type RoleData = EntityData & { derivedStats?: Stats };

export interface RankedItem {
    name: string;
    rank: string;
    icon?: string;
    cooldown?: string;
    cost?: string;
    description?: string;
    source?: 'skill' | 'spell';
    category?: string;
    tier?: string | number;
    rarity?: string;
    effect?: string;
    metadata?: Record<string, string | number | boolean | null | undefined>;
}



export interface Dps {
    min: number;
    max: number;
}

export interface CategorizedCharactersStats {
    base: Stats;
    resource: Stats;
    combat: Stats & { dps?: Dps };
    defensive: Stats;
    utility: Stats;
}

export type ItemType = 'WEAPON' | 'ARMOR' | 'ACCESSORY' | 'CONSUMABLE' | 'MISC';
export type ItemRarity = 'COMMON' | 'UNCOMMON' | 'RARE' | 'EPIC' | 'LEGENDARY' | 'MYTHIC' | 'DIVINE' | 'ARTIFACT';
export type ItemSlot = 'HEAD' | 'BODY' | 'BACK' | 'SHOULDER' | 'HANDS' | 'HANDS_2' | 'LEGS' | 'FEET' | 'NECK' | 'RING' | 'RING_2' | 'MAIN_HAND' | 'OFF_HAND' | 'BELT' | 'THROWABLE' | 'TORCH' | 'POTION' | 'FOOD' | 'MOUNT' | 'EAR' | 'WAIST';

export interface ItemStatEffect {
    stat: string;
    value: number;
    type: 'flat' | 'percent';
}

export type ItemEffect = string | ItemStatEffect;

export type ItemMechanicTier = 'DAMAGED' | 'WORN' | 'STANDARD' | 'FINE' | 'SUPERIOR';

export interface ItemMetadata {
    mechanicTier?: ItemMechanicTier;
    definitionType?: string;
    equipmentSlot?: string;
    materialGroup?: string;
    handedness?: string;
    validRoles?: string[];
    baseDamage?: number;
    damageType?: string;
    attackSpeed?: string;
    reach?: string;
    baseDefense?: number;
    movementPenalty?: number;
    stealthPenalty?: number;
    noiseLevel?: string;
    effect?: ItemEffect;
    durability?: number;
    capacity?: number;
    extraSlots?: number;
    duration?: number;
    cooldown?: number;
    potionStats?: PotionStats;
}

export interface Item extends ItemMetadata {
    id: string; // Unique Instance ID
    defId: string; // Definition ID (e.g. 'sword')
    name: string; // Generated Name e.g. "Rusted Iron Sword"
    type: ItemType;
    rarity: ItemRarity;
    icon: string;
    description?: string;
    grade?: string;
    tags?: string[]; // "2H", "Light", "Metal", etc.
    value?: number; // In copper
    weight: number; // In lbs or kg
    capacity?: number; // Weight capacity modifier (can be negative for containers)
    extraSlots?: number; // Bonus inventory slots from containers (always positive)
    duration?: number; // Effect duration in seconds (for consumables)
    cooldown?: number; // Cooldown before next use in seconds
}

export interface Inventory {
    equipment: Partial<Record<ItemSlot, Item | null>>;
    backpack: Item[];
    currency: {
        crown: number;
        gold: number;
        silver: number;
        copper: number;
        shard: number;
    };
    weight: {
        current: number;
        max: number;
    };
}

export interface GeneratedVariant {
    name: string;
    description: string;
    price?: number;
}

export interface GeneratedPoolEntry {
    id: string;
    name: string;
    icon?: string;
    category?: string;
    type?: string;
    tier?: string | number;
    rarity?: string;
    description?: string;
    benefit?: string;
    effect?: string;
    mechanicalEffect?: string;
    variant?: GeneratedVariant;
    metadata?: Record<string, string | number | boolean | null | undefined>;
}

export interface GeneratedIdentity {
    bonds: GeneratedPoolEntry[];
    quirks: GeneratedPoolEntry[];
    secrets: GeneratedPoolEntry[];
    psychologicalTraits: GeneratedPoolEntry[];
}

export interface GeneratedWorldContext {
    languages: GeneratedPoolEntry[];
    deity: GeneratedPoolEntry | null;
    customs: GeneratedPoolEntry[];
    landmarks: GeneratedPoolEntry[];
    history: GeneratedPoolEntry | null;
}

export interface GeneratedMagic {
    spells: GeneratedPoolEntry[];
    hazards: GeneratedPoolEntry[];
}

export interface GeneratedMechanics {
    feats: GeneratedPoolEntry[];
    achievements: GeneratedPoolEntry[];
    afflictions: GeneratedPoolEntry[];
    crimes: GeneratedPoolEntry[];
    martialArts: GeneratedPoolEntry[];
}

export interface GeneratedBestiary {
    mounts: GeneratedPoolEntry[];
    mountBags: GeneratedPoolEntry[];
    pets: GeneratedPoolEntry[];
    summons: GeneratedPoolEntry[];
    mount: GeneratedPoolEntry | null;
    mountBag: GeneratedPoolEntry | null;
    pet: GeneratedPoolEntry | null;
    summon: GeneratedPoolEntry | null;
    favoriteMount: GeneratedPoolEntry | null;
    favoritePet: GeneratedPoolEntry | null;
}

export interface GeneratedInventoryContext {
    curios: GeneratedPoolEntry[];
    cuisine: GeneratedPoolEntry[];
    enchantments: GeneratedPoolEntry[];
    instruments: GeneratedPoolEntry[];
    merchandise: GeneratedPoolEntry[];
    recipes: GeneratedPoolEntry[];
}

export interface CharacterExpansions {
    identity: GeneratedIdentity;
    world: GeneratedWorldContext;
    magic: GeneratedMagic;
    mechanics: GeneratedMechanics;
    bestiary: GeneratedBestiary;
    inventoryContext: GeneratedInventoryContext;
}

export type CharacterCore = {
    id: string; // Add ID for list management
    name: string;
    race: string;
    role: string;
    level: number;
    age: number;

    // Affiliations
    region: string;
    guild: string;
    faction: string;

    stats: CategorizedCharactersStats;

    skills: RankedItem[];
    titles: RankedItem[];
    specialPowers: Record<string, number>;

    // Potential Future Usage
    gender?: 'Male' | 'Female';
    alignment?: string;
    rank?: string; // Overall character rank?

    inventory: Inventory;

    backstory: {
        paragraphs: string[];
        summary: string;
        attribution: string;
        traits: string[];
        personality: string[];
    };
};

export type Character = CharacterCore & CharacterExpansions;
