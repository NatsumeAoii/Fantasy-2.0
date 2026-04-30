import type { PotionStats } from '../../data/inventory/types'
import type { Item, ItemEffect } from '../../types'

export type TooltipRowTone = 'neutral' | 'positive' | 'negative' | 'accent' | 'warning'

export interface ItemTooltipRow {
    label: string;
    value: string;
    tone?: TooltipRowTone;
}

const formatWords = (value: string): string =>
    value
        .split(/[_\s-]+/)
        .filter(Boolean)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')

const formatPercent = (value: number): string => `${Math.round(value * 100)}%`

const formatSignedNumber = (value: number): string => `${value > 0 ? '+' : ''}${value}`

const formatEffect = (effect: ItemEffect): string => {
    if (typeof effect === 'string') return effect

    const value = effect.type === 'percent'
        ? `${formatSignedNumber(effect.value)}%`
        : formatSignedNumber(effect.value)

    return `${value} ${formatWords(effect.stat)}`
}

const formatMechanicTier = (tier: string): string => formatWords(tier)

const formatList = (values: string[]): string => values.map(formatWords).join(', ')

const inferRestoreResource = (item: Item, resource?: string): string => {
    if (resource) return formatWords(resource)

    const source = `${item.defId} ${item.name}`.toLowerCase()
    if (source.includes('mana') || source.includes('arcane')) return 'Mana'
    if (source.includes('stamina') || source.includes('vigor') || source.includes('endurance')) return 'Stamina'
    if (source.includes('health') || source.includes('healing') || source.includes('vitality')) return 'Health'
    return 'Resource'
}

const getPotionRows = (potionStats: PotionStats, item: Item): ItemTooltipRow[] => {
    switch (potionStats.type) {
        case 'restore': {
            const parts = [`${potionStats.stats.baseRestore}`]
            if (potionStats.stats.percentRestore) {
                parts.push(`${formatPercent(potionStats.stats.percentRestore)} max`)
            }
            return [{
                label: 'Potion Effect',
                value: `Restores ${parts.join(' + ')} ${inferRestoreResource(item, potionStats.stats.resource)}`,
                tone: 'positive',
            }]
        }
        case 'antidote':
            return [
                { label: 'Potion Effect', value: `Cures poison up to tier ${potionStats.stats.maxPoisonTier}`, tone: 'positive' },
                { label: 'Cure Chance', value: formatPercent(potionStats.stats.cureChance), tone: 'positive' },
                ...(potionStats.stats.curesDisease
                    ? [{ label: 'Disease Cure', value: 'Yes', tone: 'positive' as const }]
                    : []),
            ]
        case 'oil':
            return [
                {
                    label: 'Potion Effect',
                    value: `+${potionStats.stats.bonusDamage} ${formatWords(potionStats.stats.damageType)} weapon damage`,
                    tone: 'warning',
                },
                ...(potionStats.stats.chargesPerUse
                    ? [{ label: 'Charges', value: `${potionStats.stats.chargesPerUse}`, tone: 'accent' as const }]
                    : []),
            ]
        case 'resistance':
            return [
                {
                    label: 'Potion Effect',
                    value: `${formatPercent(potionStats.stats.resistPercent)} ${formatWords(potionStats.stats.element)} resistance`,
                    tone: 'positive',
                },
                ...(potionStats.stats.statusImmunity
                    ? [{ label: 'Status Immunity', value: 'Yes', tone: 'positive' as const }]
                    : []),
            ]
        case 'buff': {
            const parts = [`${formatSignedNumber(potionStats.stats.flatBonus)} ${formatWords(potionStats.stats.buffTarget)}`]
            if (potionStats.stats.percentBonus) {
                parts.push(`${formatPercent(potionStats.stats.percentBonus)} bonus`)
            }
            if (potionStats.stats.breaksOnAction) {
                parts.push('breaks on action')
            }
            return [{ label: 'Potion Effect', value: parts.join(', '), tone: 'positive' }]
        }
    }
}

export const getItemMechanicalRows = (item: Item): ItemTooltipRow[] => {
    const rows: ItemTooltipRow[] = []

    if (item.mechanicTier) {
        rows.push({ label: 'Quality', value: formatMechanicTier(item.mechanicTier), tone: 'accent' })
    }
    if (item.definitionType) {
        rows.push({ label: 'Kind', value: formatWords(item.definitionType), tone: 'neutral' })
    }
    if (item.equipmentSlot) {
        rows.push({ label: 'Slot', value: formatWords(item.equipmentSlot), tone: 'neutral' })
    }
    if (item.materialGroup) {
        rows.push({ label: 'Material', value: formatWords(item.materialGroup), tone: 'neutral' })
    }
    if (item.handedness) {
        rows.push({ label: 'Hands', value: item.handedness, tone: 'neutral' })
    }
    if (item.validRoles && item.validRoles.length > 0) {
        rows.push({ label: 'Roles', value: formatList(item.validRoles), tone: 'neutral' })
    }
    if (item.baseDamage !== undefined) {
        rows.push({
            label: 'Damage',
            value: item.damageType ? `${item.baseDamage} ${formatWords(item.damageType)}` : `${item.baseDamage}`,
            tone: 'warning',
        })
    }
    if (item.attackSpeed) {
        rows.push({ label: 'Attack Speed', value: formatWords(item.attackSpeed), tone: 'accent' })
    }
    if (item.reach) {
        rows.push({ label: 'Reach', value: formatWords(item.reach), tone: 'accent' })
    }
    if (item.baseDefense !== undefined) {
        rows.push({ label: 'Defense', value: `${item.baseDefense}`, tone: 'positive' })
    }
    if (item.movementPenalty !== undefined && item.movementPenalty !== 0) {
        rows.push({ label: 'Move Penalty', value: `-${item.movementPenalty}%`, tone: 'negative' })
    }
    if (item.stealthPenalty !== undefined && item.stealthPenalty !== 0) {
        rows.push({ label: 'Stealth Penalty', value: `-${item.stealthPenalty}%`, tone: 'negative' })
    }
    if (item.noiseLevel) {
        rows.push({ label: 'Noise', value: formatWords(item.noiseLevel), tone: 'neutral' })
    }
    if (item.effect) {
        rows.push({ label: 'Effect', value: formatEffect(item.effect), tone: 'positive' })
    }
    if (item.durability !== undefined) {
        rows.push({ label: 'Durability', value: `${item.durability}`, tone: 'neutral' })
    }
    if (item.potionStats) {
        rows.push(...getPotionRows(item.potionStats, item))
    }

    return rows
}
