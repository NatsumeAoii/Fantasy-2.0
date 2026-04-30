import { describe, expect, it } from 'vitest'
import { WORLD_CONFIG } from '../../src/config'
import { makeTestCharacter } from '../makeTestCharacter'
import { buildWorldPanelPools } from '../../src/components/worldPanelPools'

describe('buildWorldPanelPools', () => {
  it('limits revealed world pools to character-specific slices', () => {
    const character = makeTestCharacter({
      race: 'Human',
      role: 'High Paladin',
      region: 'Goldhaven',
      guild: 'The Golden Blades',
      faction: 'The Goldhaven Mercantile',
    })

    const pools = buildWorldPanelPools(character)

    expect(pools.homeRegions.length).toBeLessThanOrEqual(5)
    expect(pools.regionGuilds.length).toBeLessThanOrEqual(5)
    expect(pools.landmarks.map((landmark) => landmark.name)).not.toContain('The Bone Cathedral')
    expect(pools.languages.length).toBeLessThan(10)
  })

  it('uses character identity as part of deterministic pool selection', () => {
    const first = buildWorldPanelPools(makeTestCharacter({ id: 'world-seed-a', name: 'Atlas One', race: 'Human' }))
    const second = buildWorldPanelPools(makeTestCharacter({ id: 'world-seed-b', name: 'Atlas Two', race: 'Human' }))

    expect(first.homeRegions.map((region) => region.name)).not.toEqual(second.homeRegions.map((region) => region.name))
  })

  it('keeps culture pools compact from config limits', () => {
    const character = makeTestCharacter({
      race: 'Human',
      role: 'High Paladin',
      region: 'Goldhaven',
      guild: 'The Golden Blades',
      faction: 'The Goldhaven Mercantile',
    })

    const pools = buildWorldPanelPools(character)

    expect(pools.languages.length).toBeLessThanOrEqual(WORLD_CONFIG.ATLAS.POOL_LIMITS.languages)
    expect(pools.customs.length).toBeLessThanOrEqual(WORLD_CONFIG.ATLAS.POOL_LIMITS.customs)
    expect(pools.customs.every((custom) => custom.variations.length <= WORLD_CONFIG.ATLAS.POOL_LIMITS.customVariations)).toBe(true)
  })

  it('reveals only a configured handful of historical sources per era', () => {
    const character = makeTestCharacter({
      level: 700,
      race: 'Human',
      role: 'High Paladin',
      region: 'Goldhaven',
      guild: 'The Golden Blades',
      faction: 'The Goldhaven Mercantile',
    })

    const pools = buildWorldPanelPools(character)
    const sourceConfig = WORLD_CONFIG.HISTORY.SOURCE_REVEAL_BY_LEVEL.find((entry) => character.level <= entry.maxLevel)
      ?? WORLD_CONFIG.HISTORY.SOURCE_REVEAL_BY_LEVEL.at(-1)

    expect(sourceConfig).toBeDefined()
    expect(pools.history.length).toBeGreaterThan(0)
    expect(pools.history.every((era) => era.sources.length >= sourceConfig!.count.min)).toBe(true)
    expect(pools.history.every((era) => era.sources.length <= sourceConfig!.fallbackCount.max)).toBe(true)
  })
})
