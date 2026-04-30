import type { GeneratedPoolEntry } from '../types'

export type SearchValue = string | number | boolean | null | undefined | Array<string | number | boolean>

function normalizeSearchText(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function flattenSearch(values: SearchValue[]): string[] {
  return values
    .flatMap((value) => (Array.isArray(value) ? value : [value]))
    .filter((value): value is string | number | boolean => value !== null && value !== undefined)
    .map((value) => normalizeSearchText(String(value)))
}

export function matchesSearch(query: string, ...values: SearchValue[]): boolean {
  const term = normalizeSearchText(query)
  if (!term) return true

  return flattenSearch(values).some((value) => value.includes(term))
}

export function matchesGeneratedEntry(query: string, entry: GeneratedPoolEntry): boolean {
  const metadataValues = entry.metadata
    ? Object.values(entry.metadata).filter((value): value is string | number | boolean => value !== null && value !== undefined)
    : []

  return matchesSearch(
    query,
    entry.name,
    entry.category,
    entry.type,
    entry.tier,
    entry.rarity,
    entry.description,
    entry.benefit,
    entry.effect,
    entry.mechanicalEffect,
    entry.variant?.name,
    entry.variant?.description,
    metadataValues,
  )
}

export function metadataText(entry: GeneratedPoolEntry | null | undefined, key: string): string | null {
  const value = entry?.metadata?.[key]
  return value === null || value === undefined ? null : String(value)
}

export function metadataString(entry: GeneratedPoolEntry | null | undefined, key: string): string | null {
  const value = entry?.metadata?.[key]
  return typeof value === 'string' && value.length > 0 ? value : null
}

export function metadataValue(entry: GeneratedPoolEntry | null | undefined, key: string): string | null {
  const value = entry?.metadata?.[key]
  if (value === null || value === undefined) return null
  return formatMetadataValue(value)
}

export function formatMetadataLabel(key: string): string {
  return key
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}

export function formatMetadataValue(value: string | number | boolean | null | undefined): string {
  if (value === null || value === undefined) return 'Unknown'
  if (typeof value === 'boolean') return value ? 'Yes' : 'No'
  return String(value)
}

export function uniqueGeneratedEntries(entries: (GeneratedPoolEntry | null | undefined)[]): GeneratedPoolEntry[] {
  const seen = new Set<string>()
  const options: GeneratedPoolEntry[] = []

  for (const entry of entries) {
    if (!entry || seen.has(entry.id)) continue
    seen.add(entry.id)
    options.push(entry)
  }

  return options
}
