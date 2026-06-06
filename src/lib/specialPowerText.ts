import { specialPowersConfig } from '../data/character/specialPowers'

const SPECIAL_POWER_NAME_BY_ID = new Map(specialPowersConfig.map(power => [power.id, power.name]))

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

/**
 * Pre-compiled combined regex for all special power IDs.
 * Instead of N separate regex replacements (one per power), this uses a single
 * alternation pattern to match any power ID in one pass — O(1) regex executions
 * instead of O(N). The replacement function does a Map lookup per match.
 */
const COMBINED_POWER_REGEX: RegExp | null = (() => {
  if (specialPowersConfig.length === 0) return null
  const escaped = specialPowersConfig.map(power =>
    power.id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  )
  return new RegExp(`\\b(?:${escaped.join('|')})\\b`, 'g')
})()

export function replaceSpecialPowerIds(text: string): string {
  if (!COMBINED_POWER_REGEX) return text
  return text.replace(COMBINED_POWER_REGEX, (match) =>
    SPECIAL_POWER_NAME_BY_ID.get(match) ?? match
  )
}
