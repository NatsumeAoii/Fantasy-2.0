import type { PotionStats } from '../data/inventory/types'
import { INVENTORY_CONFIG } from '../config/inventoryConfig'
import type { ItemMechanicTier, ItemMetadata } from '../types'

export type InventoryItemDefinitionMetadata = Omit<ItemMetadata, 'effect'> & {
    baseCooldown?: number;
    baseDuration?: number;
    effect?: ItemMetadata['effect'] | null;
    group?: string;
    handedness?: string;
    slot?: string;
    type?: string;
    validRoles?: readonly string[];
}

interface ItemMechanicModifier {
    benefitMultiplier: number;
    penaltyMultiplier: number;
    durabilityMultiplier: number;
}

type ItemMechanicPool = Record<number, readonly { tier: ItemMechanicTier; weight: number }[]>

const ITEM_MECHANIC_MODIFIERS = INVENTORY_CONFIG.MECHANIC_QUALITY.MODIFIERS as Record<ItemMechanicTier, ItemMechanicModifier>
const ITEM_MECHANIC_TIER_POOLS = INVENTORY_CONFIG.MECHANIC_QUALITY.TIER_POOLS as ItemMechanicPool

const hasValue = <T>(value: T | null | undefined): value is T => value !== undefined && value !== null

const scaleInteger = (value: number, multiplier: number): number => {
    if (value === 0) return 0

    const scaled = Math.round(value * multiplier)
    if (value > 0) {
        if (multiplier < 1 && value > 1 && scaled >= value) return value - 1
        if (multiplier > 1 && scaled <= value) return value + 1
        return Math.max(1, scaled)
    }

    if (multiplier < 1 && scaled <= value) return value + 1
    if (multiplier > 1 && scaled >= value) return value - 1
    return Math.min(-1, scaled)
}

const scaleFraction = (value: number, multiplier: number): number => {
    if (value === 0) return 0
    return Math.max(0.01, Math.min(1, Number((value * multiplier).toFixed(2))))
}

const scalePotionStats = (potionStats: PotionStats, modifier: ItemMechanicModifier): PotionStats => {
    switch (potionStats.type) {
        case 'restore':
            return {
                type: 'restore',
                stats: {
                    ...potionStats.stats,
                    baseRestore: scaleInteger(potionStats.stats.baseRestore, modifier.benefitMultiplier),
                    percentRestore: potionStats.stats.percentRestore === undefined
                        ? undefined
                        : scaleFraction(potionStats.stats.percentRestore, modifier.benefitMultiplier),
                },
            }
        case 'antidote':
            return {
                type: 'antidote',
                stats: {
                    ...potionStats.stats,
                    maxPoisonTier: Math.max(1, Math.min(6, scaleInteger(potionStats.stats.maxPoisonTier, modifier.benefitMultiplier))),
                    cureChance: scaleFraction(potionStats.stats.cureChance, modifier.benefitMultiplier),
                },
            }
        case 'oil':
            return {
                type: 'oil',
                stats: {
                    ...potionStats.stats,
                    bonusDamage: scaleInteger(potionStats.stats.bonusDamage, modifier.benefitMultiplier),
                    chargesPerUse: potionStats.stats.chargesPerUse === undefined
                        ? undefined
                        : scaleInteger(potionStats.stats.chargesPerUse, modifier.benefitMultiplier),
                },
            }
        case 'resistance':
            return {
                type: 'resistance',
                stats: {
                    ...potionStats.stats,
                    resistPercent: scaleFraction(potionStats.stats.resistPercent, modifier.benefitMultiplier),
                },
            }
        case 'buff':
            return {
                type: 'buff',
                stats: {
                    ...potionStats.stats,
                    flatBonus: scaleInteger(potionStats.stats.flatBonus, modifier.benefitMultiplier),
                    percentBonus: potionStats.stats.percentBonus === undefined
                        ? undefined
                        : scaleFraction(potionStats.stats.percentBonus, modifier.benefitMultiplier),
                },
            }
    }
}

export const getItemDefinitionMetadata = (definition: InventoryItemDefinitionMetadata): ItemMetadata => {
    const metadata: ItemMetadata = {}

    if (hasValue(definition.type)) metadata.definitionType = definition.type
    if (hasValue(definition.slot)) metadata.equipmentSlot = definition.slot
    if (hasValue(definition.materialGroup)) metadata.materialGroup = definition.materialGroup
    if (!hasValue(metadata.materialGroup) && hasValue(definition.group)) metadata.materialGroup = definition.group
    if (hasValue(definition.handedness)) metadata.handedness = definition.handedness
    if (hasValue(definition.validRoles)) metadata.validRoles = [...definition.validRoles]
    if (hasValue(definition.baseDamage)) metadata.baseDamage = definition.baseDamage
    if (hasValue(definition.damageType)) metadata.damageType = definition.damageType
    if (hasValue(definition.attackSpeed)) metadata.attackSpeed = definition.attackSpeed
    if (hasValue(definition.reach)) metadata.reach = definition.reach
    if (hasValue(definition.baseDefense)) metadata.baseDefense = definition.baseDefense
    if (hasValue(definition.movementPenalty)) metadata.movementPenalty = definition.movementPenalty
    if (hasValue(definition.stealthPenalty)) metadata.stealthPenalty = definition.stealthPenalty
    if (hasValue(definition.noiseLevel)) metadata.noiseLevel = definition.noiseLevel
    if (hasValue(definition.effect)) metadata.effect = definition.effect
    if (hasValue(definition.durability)) metadata.durability = definition.durability
    if (hasValue(definition.capacity)) metadata.capacity = definition.capacity
    if (hasValue(definition.extraSlots)) metadata.extraSlots = definition.extraSlots
    if (hasValue(definition.duration)) metadata.duration = definition.duration
    if (hasValue(definition.baseDuration)) metadata.duration = definition.baseDuration
    if (hasValue(definition.cooldown)) metadata.cooldown = definition.cooldown
    if (hasValue(definition.baseCooldown)) metadata.cooldown = definition.baseCooldown
    if (hasValue(definition.potionStats)) metadata.potionStats = definition.potionStats

    return metadata
}

export const selectItemMechanicModifierTier = (itemTier: number, roll: number): ItemMechanicTier => {
    const clampedTier = Math.max(1, Math.min(8, Math.round(itemTier)))
    const pool = ITEM_MECHANIC_TIER_POOLS[clampedTier]
    const totalWeight = pool.reduce((sum, entry) => sum + entry.weight, 0)
    let threshold = Math.max(0, Math.min(0.999_999, roll)) * totalWeight

    for (const entry of pool) {
        threshold -= entry.weight
        if (threshold < 0) return entry.tier
    }

    return pool[pool.length - 1].tier
}

export const applyItemMechanicModifier = (
    metadata: ItemMetadata,
    mechanicTier: ItemMechanicTier,
): ItemMetadata => {
    const modifier = ITEM_MECHANIC_MODIFIERS[mechanicTier]
    const adjusted: ItemMetadata = {
        ...metadata,
        mechanicTier,
    }

    if (hasValue(metadata.baseDamage)) adjusted.baseDamage = scaleInteger(metadata.baseDamage, modifier.benefitMultiplier)
    if (hasValue(metadata.baseDefense)) adjusted.baseDefense = scaleInteger(metadata.baseDefense, modifier.benefitMultiplier)
    if (hasValue(metadata.movementPenalty)) adjusted.movementPenalty = scaleInteger(metadata.movementPenalty, modifier.penaltyMultiplier)
    if (hasValue(metadata.stealthPenalty)) adjusted.stealthPenalty = scaleInteger(metadata.stealthPenalty, modifier.penaltyMultiplier)
    if (hasValue(metadata.durability)) adjusted.durability = scaleInteger(metadata.durability, modifier.durabilityMultiplier)
    if (hasValue(metadata.capacity)) adjusted.capacity = scaleInteger(metadata.capacity, modifier.benefitMultiplier)
    if (hasValue(metadata.extraSlots)) adjusted.extraSlots = scaleInteger(metadata.extraSlots, modifier.benefitMultiplier)
    if (hasValue(metadata.duration)) adjusted.duration = scaleInteger(metadata.duration, modifier.benefitMultiplier)
    if (hasValue(metadata.cooldown)) adjusted.cooldown = scaleInteger(metadata.cooldown, modifier.penaltyMultiplier)
    if (hasValue(metadata.effect) && typeof metadata.effect !== 'string') {
        adjusted.effect = {
            ...metadata.effect,
            value: scaleInteger(
                metadata.effect.value,
                metadata.effect.value >= 0 ? modifier.benefitMultiplier : modifier.penaltyMultiplier,
            ),
        }
    }
    if (hasValue(metadata.potionStats)) adjusted.potionStats = scalePotionStats(metadata.potionStats, modifier)

    return adjusted
}
