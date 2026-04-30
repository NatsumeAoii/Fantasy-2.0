import { specialPowersConfig } from '../data/character/specialPowers'

const SPECIAL_POWER_NAME_BY_ID = new Map(specialPowersConfig.map(power => [power.id, power.name]))

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function formatFallbackPowerName(powerId: string): string {
  return powerId
    .replace(/_/g, ' ')
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/\b\w/g, letter => letter.toUpperCase())
}

export function getSpecialPowerDisplayName(powerId: string): string {
  return SPECIAL_POWER_NAME_BY_ID.get(powerId) ?? formatFallbackPowerName(powerId)
}

export function getSpecialPowerDisplayNames(specialPowers: Record<string, unknown>): string[] {
  return Object.keys(specialPowers).map(getSpecialPowerDisplayName)
}

export function replaceSpecialPowerIds(text: string): string {
  return specialPowersConfig.reduce(
    (value, power) => value.replace(new RegExp(`\\b${escapeRegex(power.id)}\\b`, 'g'), power.name),
    text,
  )
}
