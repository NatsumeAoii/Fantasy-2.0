import {
  FALLBACK_SEED_LENGTH,
  normalizeCharacterName,
  normalizeCharacterSeed,
} from '../lib/characterInput'

export interface CharacterFormData {
  name?: string
  seed?: string
}

export { normalizeCharacterName, normalizeCharacterSeed }

type RandomSource = () => number
type ClockSource = () => number

export function createFallbackSeed(random: RandomSource = Math.random, now: ClockSource = Date.now) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789'
  const rawTimestamp = now()
  const safeTimestamp = Number.isFinite(rawTimestamp) ? Math.max(0, Math.floor(rawTimestamp)) : 0
  const timestamp = safeTimestamp.toString(36).slice(-FALLBACK_SEED_LENGTH)
  let randomPart = ''
  const randomLength = Math.max(0, FALLBACK_SEED_LENGTH - timestamp.length)

  for (let index = 0; index < randomLength; index += 1) {
    const randomValue = random()
    const safeRandom = Number.isFinite(randomValue) ? Math.max(0, Math.min(0.999999999999, randomValue)) : 0
    randomPart += chars.charAt(Math.floor(safeRandom * chars.length))
  }

  return `${randomPart}${timestamp}`
}

export function buildCharacterDestination(
  data: CharacterFormData,
  random: RandomSource = Math.random,
  now: ClockSource = Date.now,
) {
  const trimmedName = normalizeCharacterName(data.name)
  const trimmedSeed = normalizeCharacterSeed(data.seed)
  const finalSeed = trimmedSeed || createFallbackSeed(random, now)

  return {
    to: '/character/$id' as const,
    params: { id: finalSeed },
    search: trimmedName ? { name: trimmedName } : {},
  }
}
