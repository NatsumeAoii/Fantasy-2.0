export const MAX_CHARACTER_NAME_LENGTH = 100
export const MAX_CHARACTER_SEED_LENGTH = 512
export const FALLBACK_SEED_LENGTH = 128

const HTML_TAG_RE = /<[^>]*>/g
const WHITESPACE_RE = /\s+/g

function replaceControlChars(value: string, replacement: string): string {
  let normalized = ''

  for (const character of value) {
    const code = character.charCodeAt(0)
    normalized += code < 32 || code === 127 ? replacement : character
  }

  return normalized
}

export function normalizeCharacterName(value: unknown): string {
  if (typeof value !== 'string') return ''

  return replaceControlChars(value.replace(HTML_TAG_RE, ' '), ' ')
    .replace(WHITESPACE_RE, ' ')
    .trim()
    .slice(0, MAX_CHARACTER_NAME_LENGTH)
}

export function normalizeCharacterSeed(value: unknown): string {
  if (typeof value !== 'string') return ''

  return replaceControlChars(value, '')
    .trim()
    .slice(0, MAX_CHARACTER_SEED_LENGTH)
}

export function safeDecodeUriComponent(value: string): string {
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}
