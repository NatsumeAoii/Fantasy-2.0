import {
    WEAPONS, ARMORS, ACCESSORIES, CONSUMABLES,
    MATERIAL_GROUPS, CONDITIONS, ARTIFACT_GRAMMAR,
    CURRENCY, getWealthTier,
    CONTAINERS,
    THROWABLES, TORCHES, QUICK_POTIONS, QUICK_FOODS,
    type MaterialDef
} from '../data/inventory';
import type { Inventory, Item, ItemSlot, ItemType, ItemRarity } from '../types';
import { makeId } from '../lib/idUtils';
import { getRandomNumber, getRandomElement, getRandom } from '../lib/randomUtils';
import { calculateMaxWeight } from './CapacityUtils';
import { GENERATION_CONSTANTS } from '../config';
import { resolveIconName } from '../data/inventory/icons';
import {
    applyItemMechanicModifier,
    getItemDefinitionMetadata,
    selectItemMechanicModifierTier,
    type InventoryItemDefinitionMetadata
} from './inventoryItemMetadata';
import { getInventoryCapacity } from './inventorySatchelState';

type ArtifactNameGrammar = Partial<{
    PREFIXES: readonly string[];
    SUFFIXES: readonly string[];
    QUOTES: readonly string[];
    prefixes: readonly string[];
    suffixes: readonly string[];
    quotes: readonly string[];
}>;

const FALLBACK_MATERIAL: MaterialDef = {
    name: 'Iron',
    tier: 2,
    desc: 'Reliable fallback metal for incomplete material data.',
    gatherDifficulty: 20,
    gatherSource: 'mining',
};

const FALLBACK_CONDITION = 'Standard';
const FALLBACK_ARTIFACT_PREFIX = 'Ancient';
const FALLBACK_ARTIFACT_SUFFIX = 'Relic';
const FALLBACK_ARTIFACT_QUOTE = 'Its origin has been lost to time.';

/** Quickslot item builder — pure function at module scope to avoid closure re-creation per generateLoadout call */
const buildQuickslotItem = (
    def: {
        id: string;
        name: string;
        icon: string;
        weight: number;
        description?: string;
        variants?: { name: string; desc: string }[];
    } & InventoryItemDefinitionMetadata,
    type: 'CONSUMABLE' | 'MISC',
    valueFactor: number,
    itemTier: number
): Item => {
    const variant = def.variants ? getRandomElement(def.variants) : null;
    const name = variant?.name || def.name;
    const description = variant?.desc || def.description || '';
    const mechanicTier = selectItemMechanicModifierTier(itemTier, getRandom());
    const mechanicMetadata = applyItemMechanicModifier(getItemDefinitionMetadata(def), mechanicTier);

    return {
        id: makeId(),
        defId: def.id,
        name,
        type,
        rarity: 'COMMON',
        icon: resolveIconName({ explicitIcon: variant ? undefined : def.icon, id: def.id, name, description, type }),
        description,
        tags: [],
        weight: def.weight,
        value: Math.max(1, Math.round(def.weight * valueFactor)),
        ...mechanicMetadata
    };
};

export const InventoryEngine = {

    getTierRange(level: number): { min: number, max: number } {
        const ranges = GENERATION_CONSTANTS.INVENTORY.TIER_RANGES;
        const config = ranges.find(r => level <= r.maxLevel) || ranges[ranges.length - 1];
        return { min: config.range.min, max: config.range.max };
    },

    getPotionTiersForLevel(level: number): string[] {
        const ranges = GENERATION_CONSTANTS.INVENTORY.POTION_TIER_RANGES;
        const config = ranges.find(r => level <= r.maxLevel) || ranges[ranges.length - 1];
        return config.tiers;
    },

    getMaterial(group: keyof typeof MATERIAL_GROUPS, tier: number): MaterialDef {
        const clampedTier = Math.max(1, Math.min(6, tier));
        const effectiveTier = Math.max(1, clampedTier - (getRandom() > 0.8 ? 1 : 0));
        const fallbackMaterials = Object.values(MATERIAL_GROUPS).flat();
        const materials = (MATERIAL_GROUPS as Record<string, MaterialDef[] | undefined>)[group] ?? fallbackMaterials;
        if (materials.length === 0) return FALLBACK_MATERIAL;

        const valid = materials.filter(m => m.tier === effectiveTier);
        return getRandomElement(valid) || materials[0] || FALLBACK_MATERIAL;
    },

    getCondition(tier: number): string {
        const clampedTier = Math.max(1, Math.min(6, tier));
        const valid = CONDITIONS.filter(c => c.tier === clampedTier || c.tier === clampedTier - 1);
        if (valid.length === 0) return CONDITIONS[0]?.name || FALLBACK_CONDITION;
        return getRandomElement(valid)?.name || FALLBACK_CONDITION;
    },

    generateArtifactName(baseName: string, grammar: ArtifactNameGrammar = ARTIFACT_GRAMMAR): { name: string, description: string } {
        const prefixes = grammar.PREFIXES ?? grammar.prefixes ?? [];
        const suffixes = grammar.SUFFIXES ?? grammar.suffixes ?? [];
        const quotes = grammar.QUOTES ?? grammar.quotes ?? [];
        const prefix = getRandomElement(prefixes) ?? FALLBACK_ARTIFACT_PREFIX;
        const suffix = getRandomElement(suffixes) ?? FALLBACK_ARTIFACT_SUFFIX;
        const quote = getRandomElement(quotes) ?? FALLBACK_ARTIFACT_QUOTE;
        return {
            name: `${prefix} ${baseName} ${suffix}`,
            description: `"${quote}"`
        };
    },

    /**
     * Generate a container with rarity-based modifiers.
     * Capacity can be positive or negative; slots are always positive.
     */
    generateContainer(containerDef: {
        id: string;
        name: string;
        icon: string;
        capacity: number;
        extraSlots: number;
        weight: number;
        durability: number;
        slot?: string;
        variants?: { name: string; desc: string }[]
    }, level: number): Item {
        const { min, max } = this.getTierRange(level);
        const tier = getRandomNumber(min, max);
        const { RARITY, CONTAINER_MODIFIERS, GRADE_BY_LEVEL } = GENERATION_CONSTANTS.INVENTORY;

        const rarity = (RARITY.TIER_MAP[tier] || 'COMMON') as ItemRarity;
        const modConfig = CONTAINER_MODIFIERS[rarity];

        const variantDef = containerDef.variants ? getRandomElement(containerDef.variants) : null;
        const baseName = variantDef ? variantDef.name : containerDef.name;
        const description = variantDef?.desc || '';

        const isPositiveCapacity = getRandom() < modConfig.capacity.bonusChance;
        const capacityMod = isPositiveCapacity
            ? getRandomNumber(modConfig.capacity.positive.min, modConfig.capacity.positive.max)
            : getRandomNumber(modConfig.capacity.negative.min, modConfig.capacity.negative.max);

        const slotsMod = getRandomNumber(modConfig.slots.min, modConfig.slots.max);

        const gradeConfig = GRADE_BY_LEVEL.find(g => level <= g.maxLevel) || GRADE_BY_LEVEL[GRADE_BY_LEVEL.length - 1];
        const grade = getRandomElement([...gradeConfig.grades]) || 'D';
        const capacity = Math.max(0, containerDef.capacity + capacityMod);
        const mechanicTier = selectItemMechanicModifierTier(tier, getRandom());
        const mechanicMetadata = applyItemMechanicModifier(getItemDefinitionMetadata({
            ...containerDef,
            capacity,
            extraSlots: slotsMod,
        }), mechanicTier);

        return {
            id: makeId(),
            defId: containerDef.id,
            name: baseName,
            type: 'MISC',
            rarity,
            icon: resolveIconName({
                explicitIcon: variantDef ? undefined : containerDef.icon,
                id: containerDef.id,
                name: baseName,
                description,
                type: 'MISC'
            }),
            description,
            grade,
            tags: [],
            value: tier * 15,
            weight: containerDef.weight,
            capacity,
            extraSlots: slotsMod,
            ...mechanicMetadata
        };
    },

    calculateItemPrice(basePrice: number, rarity: ItemRarity): number {
        const RARITY_MULTIPLIERS: Record<string, number> = {
            COMMON: 1.0,
            UNCOMMON: 1.5,
            RARE: 2.5,
            EPIC: 4.0,
            LEGENDARY: 8.0,
            MYTHIC: 15.0,
            DIVINE: 30.0,
            ARTIFACT: 60.0,
        };

        const multiplier = RARITY_MULTIPLIERS[rarity] || 1.0;
        const useBasePrice = getRandom() < 0.3;
        const variance = useBasePrice ? 1.0 : 1.0 + getRandom() * 0.4;

        return Math.max(1, Math.floor(basePrice * multiplier * variance));
    },

    generateItem(itemDef: {
        id: string,
        name: string,
        group?: string,
        icon: string,
        variants?: { name: string; desc: string; price?: number }[],
        capacity?: number,
        extraSlots?: number,
        weight?: number
    } & InventoryItemDefinitionMetadata, level: number, type: ItemType, equipmentSlot?: ItemSlot): Item {
        const { min, max } = this.getTierRange(level);
        const tier = getRandomNumber(min, max);
        const { RARITY, GRADE_BY_LEVEL } = GENERATION_CONSTANTS.INVENTORY;

        let finalName = itemDef.name;
        const rarity = (RARITY.TIER_MAP[tier] || 'COMMON') as ItemRarity;

        const variantDef = itemDef.variants ? getRandomElement(itemDef.variants) : null;
        const baseName = variantDef ? variantDef.name : itemDef.name;
        const basePrice = variantDef?.price ?? tier * 10;
        let description = variantDef?.desc || "";

        // Tiers 6+ (MYTHIC/DIVINE/ARTIFACT) use artifact name generator
        if (tier >= 6 && itemDef.group) {
            const art = this.generateArtifactName(baseName);
            finalName = art.name;
            description = art.description;
        } else if (itemDef.group) {
            const material = this.getMaterial(itemDef.group as keyof typeof MATERIAL_GROUPS, tier);
            const condition = this.getCondition(tier);
            finalName = `${condition} ${material.name} ${baseName}`;
        } else {
            finalName = baseName;
        }

        // Grade
        const gradeConfig = GRADE_BY_LEVEL.find(g => level <= g.maxLevel) || GRADE_BY_LEVEL[GRADE_BY_LEVEL.length - 1];
        const grade = getRandomElement([...gradeConfig.grades]) || 'D';
        const mechanicTier = selectItemMechanicModifierTier(tier, getRandom());
        const definitionMetadata = getItemDefinitionMetadata(itemDef);
        if (equipmentSlot) definitionMetadata.equipmentSlot = equipmentSlot;
        const mechanicMetadata = applyItemMechanicModifier(definitionMetadata, mechanicTier);

        return {
            id: makeId(),
            defId: itemDef.id,
            name: finalName,
            type,
            rarity,
            icon: resolveIconName({
                explicitIcon: variantDef ? undefined : itemDef.icon,
                id: itemDef.id,
                name: finalName,
                description: description || variantDef?.desc || '',
                type,
                tags: itemDef.group ? [itemDef.group] : []
            }),
            description,
            grade,
            tags: [],
            value: this.calculateItemPrice(basePrice, rarity),
            weight: itemDef.weight ?? 1,
            capacity: itemDef.capacity,
            extraSlots: itemDef.extraSlots,
            ...mechanicMetadata
        };
    },

    generateWealth(level: number, role: string) {
        const tier = getWealthTier(level, role);
        const multiplier = CURRENCY.TIER_MULTIPLIERS[tier];
        let shardTotal = Math.floor(multiplier * (0.5 + getRandom()));

        const crown = Math.floor(shardTotal / CURRENCY.SHARD_PER_CROWN);
        shardTotal %= CURRENCY.SHARD_PER_CROWN;
        const gold = Math.floor(shardTotal / CURRENCY.SHARD_PER_GOLD);
        shardTotal %= CURRENCY.SHARD_PER_GOLD;
        const silver = Math.floor(shardTotal / CURRENCY.SHARD_PER_SILVER);
        shardTotal %= CURRENCY.SHARD_PER_SILVER;
        const copper = Math.floor(shardTotal / CURRENCY.SHARD_PER_COPPER);
        const shard = shardTotal % CURRENCY.SHARD_PER_COPPER;

        return { crown, gold, silver, copper, shard };
    },

    generateLoadout(role: string, level: number): Inventory {
        const inv: Inventory = {
            equipment: {},
            backpack: [],
            currency: this.generateWealth(level, role),
            weight: { current: 0, max: 100 }
        };

        const r = role.toLowerCase();
        const { INVENTORY } = GENERATION_CONSTANTS;
        const CHANCE = INVENTORY.SLOT_GENERATION_CHANCE;

        // --- Resolve equipment guarantee bracket for this level ---
        const guarantee = INVENTORY.EQUIPMENT_GUARANTEE.find(g => level <= g.maxLevel)
            || INVENTORY.EQUIPMENT_GUARANTEE[INVENTORY.EQUIPMENT_GUARANTEE.length - 1];

        /** Returns true if a slot should spawn: guaranteed slots always pass, others use RNG chance */
        const shouldSpawn = (chance: number, guaranteed: boolean): boolean =>
            guaranteed || getRandom() < chance;

        // --- Determine armor class from config ---
        let preferredArmor: 'LIGHT' | 'MEDIUM' | 'HEAVY' = 'MEDIUM';
        for (const entry of INVENTORY.ROLE_ARMOR_TYPE) {
            if (entry.keywords.some(kw => r.includes(kw))) {
                preferredArmor = entry.armor;
                break;
            }
        }

        // --- Core Armor: BODY (always), HEAD, HANDS, LEGS, FEET ---
        const bodyArmor = ARMORS.find(a => a.slot === 'BODY' && a.type === preferredArmor);
        if (bodyArmor) inv.equipment['BODY'] = this.generateItem(bodyArmor, level, 'ARMOR', 'BODY');

        const coreSlots: ('HEAD' | 'HANDS' | 'LEGS' | 'FEET')[] = ['HEAD', 'HANDS', 'LEGS', 'FEET'];
        for (const slot of coreSlots) {
            const candidates = ARMORS.filter(a => a.slot === slot && a.type === preferredArmor);
            if (candidates.length > 0 && shouldSpawn(CHANCE.ARMOR_OPTIONAL, guarantee.coreArmor)) {
                const armor = getRandomElement(candidates);
                if (armor) inv.equipment[slot] = this.generateItem(armor, level, 'ARMOR', slot);
            }
        }

        // --- Accessories & containers (guaranteed at lv 50+) ---

        // HANDS_2 (gauntlets pair)
        if (inv.equipment['HANDS'] && shouldSpawn(CHANCE.HANDS_2, guarantee.accessories)) {
            const handArmor = ARMORS.filter(a => a.slot === 'HANDS' && a.type === preferredArmor);
            if (handArmor.length > 0) {
                const armor = getRandomElement(handArmor);
                if (armor) inv.equipment['HANDS_2'] = this.generateItem(armor, level, 'ARMOR', 'HANDS_2');
            }
        }

        // BACK (backpack / container)
        if (shouldSpawn(CHANCE.BACK_SLOT, guarantee.accessories)) {
            const backpacks = CONTAINERS.filter(c => c.slot === 'BACK');
            if (backpacks.length > 0) {
                const backpack = level > INVENTORY.LARGE_BACKPACK_LEVEL
                    ? backpacks.find(b => b.id === 'large_backpack') || backpacks[0]
                    : backpacks[0];
                inv.equipment['BACK'] = this.generateContainer(backpack, level);
            }
        }

        // SHOULDER (cloak / cape)
        if (shouldSpawn(CHANCE.SHOULDER, guarantee.accessories)) {
            const cloaks = ARMORS.filter(a => a.slot === 'SHOULDER');
            if (cloaks.length > 0) {
                const cloak = getRandomElement(cloaks);
                if (cloak) inv.equipment['SHOULDER'] = this.generateItem(cloak, level, 'ARMOR', 'SHOULDER');
            }
        }

        // --- Weapons: MAIN_HAND + conditional OFF_HAND ---
        const validWeapons = WEAPONS.filter(w => w.validRoles.some(vr => role.toLowerCase().includes(vr.toLowerCase())) || w.validRoles.includes('Mercenary'));
        const mainObj = validWeapons.length > 0 ? getRandomElement(validWeapons) : WEAPONS[0];

        if (mainObj) {
            const weaponItem = this.generateItem(mainObj, level, 'WEAPON', 'MAIN_HAND');
            weaponItem.tags = [mainObj.handedness];
            inv.equipment['MAIN_HAND'] = weaponItem;

            if (mainObj.handedness === '1H' && shouldSpawn(CHANCE.OFF_HAND, guarantee.quickslots)) {
                const isDefensiveRole = preferredArmor === 'HEAVY' || r.includes('paladin') || r.includes('knight') || r.includes('cleric');
                const isDualWielder = r.includes('rogue') || r.includes('assassin') || r.includes('ranger') || r.includes('berserker');
                const isCaster = r.includes('mage') || r.includes('wizard') || r.includes('warlock');

                if (isDualWielder) {
                    const offhandOptions = WEAPONS.filter(w =>
                        w.handedness === '1H' &&
                        (w.id === 'dagger' || w.id === 'short_sword' || w.id === 'handaxe')
                    );
                    if (offhandOptions.length > 0) {
                        const offhand = getRandomElement(offhandOptions);
                        if (offhand) {
                            const offhandItem = this.generateItem(offhand, level, 'WEAPON', 'OFF_HAND');
                            offhandItem.tags = [offhand.handedness];
                            inv.equipment['OFF_HAND'] = offhandItem;
                        }
                    }
                } else if (isCaster) {
                    if (guarantee.quickslots || getRandom() < CHANCE.CASTER_OFFHAND) {
                        const dagger = WEAPONS.find(w => w.id === 'dagger');
                        if (dagger) {
                            const daggerItem = this.generateItem(dagger, level, 'WEAPON', 'OFF_HAND');
                            daggerItem.tags = [dagger.handedness];
                            inv.equipment['OFF_HAND'] = daggerItem;
                        }
                    }
                } else if (!isDefensiveRole || guarantee.quickslots) {
                    if (guarantee.quickslots || getRandom() < CHANCE.GENERIC_OFFHAND) {
                        const offhandOptions = WEAPONS.filter(w => w.handedness === '1H' && w.id !== mainObj.id);
                        if (offhandOptions.length > 0) {
                            const offhand = getRandomElement(offhandOptions);
                            if (offhand) {
                                const offhandItem = this.generateItem(offhand, level, 'WEAPON', 'OFF_HAND');
                                offhandItem.tags = [offhand.handedness];
                                inv.equipment['OFF_HAND'] = offhandItem;
                            }
                        }
                    }
                }
            }
        }

        // --- Jewelry & Belt ---
        const rings = ACCESSORIES.filter(a => a.slot === 'RING');
        if (shouldSpawn(CHANCE.RING, guarantee.accessories) && rings.length > 0) {
            const ring = getRandomElement(rings);
            if (ring) inv.equipment['RING'] = this.generateItem(ring, level, 'ACCESSORY', 'RING');
        }
        if (shouldSpawn(CHANCE.RING_2, guarantee.accessories) && rings.length > 0) {
            const ring = getRandomElement(rings);
            if (ring) inv.equipment['RING_2'] = this.generateItem(ring, level, 'ACCESSORY', 'RING_2');
        }
        const neckAccessories = ACCESSORIES.filter(a => a.slot === 'NECK');
        if (shouldSpawn(CHANCE.NECK, guarantee.accessories) && neckAccessories.length > 0) {
            const neck = getRandomElement(neckAccessories);
            if (neck) inv.equipment['NECK'] = this.generateItem(neck, level, 'ACCESSORY', 'NECK');
        }
        const earAccessories = ACCESSORIES.filter(a => a.slot === 'EAR');
        if (shouldSpawn(CHANCE.EAR, guarantee.accessories) && earAccessories.length > 0) {
            const ear = getRandomElement(earAccessories);
            if (ear) inv.equipment['EAR'] = this.generateItem(ear, level, 'ACCESSORY', 'EAR');
        }
        const waistAccessories = ACCESSORIES.filter(a => a.slot === 'WAIST');
        if (shouldSpawn(CHANCE.WAIST, guarantee.accessories) && waistAccessories.length > 0) {
            const waist = getRandomElement(waistAccessories);
            if (waist) inv.equipment['WAIST'] = this.generateItem(waist, level, 'ACCESSORY', 'WAIST');
        }

        if (shouldSpawn(CHANCE.BELT, guarantee.accessories)) {
            const pouches = CONTAINERS.filter(c => c.slot === 'BELT');
            if (pouches.length > 0) {
                const pouch = getRandomElement(pouches);
                if (pouch) inv.equipment['BELT'] = this.generateContainer(pouch, level);
            }
        }

        const quickslots: { chance: number; pool: typeof THROWABLES; slot: ItemSlot; type: 'CONSUMABLE' | 'MISC'; valueFactor: number }[] = [
            { chance: CHANCE.THROWABLE, pool: THROWABLES, slot: 'THROWABLE', type: 'CONSUMABLE', valueFactor: 5 },
            { chance: CHANCE.TORCH, pool: TORCHES, slot: 'TORCH', type: 'MISC', valueFactor: 3 },
            { chance: CHANCE.POTION, pool: QUICK_POTIONS, slot: 'POTION', type: 'CONSUMABLE', valueFactor: 8 },
            { chance: CHANCE.FOOD, pool: QUICK_FOODS, slot: 'FOOD', type: 'CONSUMABLE', valueFactor: 5 },
        ];

        const quickslotTierRange = this.getTierRange(level);
        for (const qs of quickslots) {
            if (shouldSpawn(qs.chance, guarantee.quickslots) && qs.pool.length > 0) {
                const def = getRandomElement(qs.pool);
                const quickslotTier = getRandomNumber(quickslotTierRange.min, quickslotTierRange.max);
                if (def) inv.equipment[qs.slot] = buildQuickslotItem(def, qs.type, qs.valueFactor, quickslotTier);
            }
        }

        const qtyConfig = GENERATION_CONSTANTS.INVENTORY.BACKPACK_QUANTITY.find(q => level <= q.maxLevel) || GENERATION_CONSTANTS.INVENTORY.BACKPACK_QUANTITY[GENERATION_CONSTANTS.INVENTORY.BACKPACK_QUANTITY.length - 1];
        const numItems = getRandomNumber(qtyConfig.range.min, qtyConfig.range.max);
        const maxBackpackItems = getInventoryCapacity(inv.equipment);
        const backpackTierRange = this.getTierRange(level);

        // Filter potions by tier based on level — Set provides O(1) prefix lookups
        const availableTierSet = new Set(this.getPotionTiersForLevel(level));
        const filteredConsumables = CONSUMABLES.filter(c => {
            if (c.type !== 'POTION') return true;
            const prefix = c.id.split('_')[0];
            return availableTierSet.has(prefix) || availableTierSet.has(c.id);
        });

        for (let i = 0; i < numItems; i++) {
            const cons = getRandomElement(filteredConsumables);
            if (cons) {
                // Pick a variant and apply 1x-5x variance to price/duration
                const variant = cons.variants.length > 0 ? getRandomElement(cons.variants) : null;
                const priceVariance = 1 + getRandom() * 4; // 1x to 5x
                const durationVariance = 1 + getRandom() * 4;

                const basePrice = variant?.price || 10;
                const baseDuration = variant?.duration ?? cons.baseDuration;
                const baseCooldown = variant?.cooldown ?? cons.baseCooldown;
                const name = variant?.name || cons.name;
                const description = variant?.desc || cons.description;
                const duration = baseDuration ? Math.round(baseDuration * durationVariance) : undefined;
                const cooldown = baseCooldown;
                const consumableTier = getRandomNumber(backpackTierRange.min, backpackTierRange.max);
                const mechanicTier = selectItemMechanicModifierTier(consumableTier, getRandom());
                const mechanicMetadata = applyItemMechanicModifier({
                    ...getItemDefinitionMetadata(cons),
                    duration,
                    cooldown,
                }, mechanicTier);

                const backpackItem: Item = {
                    id: makeId(),
                    defId: cons.id,
                    name,
                    type: 'CONSUMABLE',
                    rarity: 'COMMON',
                    icon: resolveIconName({
                        explicitIcon: variant ? undefined : cons.icon,
                        id: cons.id,
                        name,
                        description,
                        type: 'CONSUMABLE',
                        tags: [cons.type]
                    }),
                    description,
                    tags: [],
                    weight: cons.weight,
                    value: Math.round(basePrice * priceVariance),
                    duration,
                    cooldown,
                    ...mechanicMetadata
                };

                if (inv.backpack.length < maxBackpackItems) {
                    inv.backpack.push(backpackItem);
                }
            }
        }

        let totalWeight = 0;

        Object.values(inv.equipment).forEach(item => {
            if (item) totalWeight += item.weight;
        });

        inv.backpack.forEach(item => {
            totalWeight += item.weight;
        });

        inv.weight.current = Math.round(totalWeight * 10) / 10;

        return inv;
    },

    calculateMaxWeight
};
