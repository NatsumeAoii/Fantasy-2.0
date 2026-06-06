import { describe, expect, it } from 'vitest'
import { setSeed } from '../../src/lib/randomUtils'
import { StatEngine } from '../../src/logic/StatEngine'

describe('StatEngine.calculateLevelBasedBonus', () => {
  it('returns 0 at level 1', () => {
    expect(StatEngine.calculateLevelBasedBonus(1, 0.4, 0.8)).toBe(0)
  })

  it('grows monotonically with level', () => {
    const levels = [10, 50, 100, 500, 1000]
    let prev = 0
    for (const level of levels) {
      const bonus = StatEngine.calculateLevelBasedBonus(level, 0.4, 0.8)
      expect(bonus).toBeGreaterThan(prev)
      prev = bonus
    }
  })

  it('linear factor dominates at high levels over diminishing factor', () => {
    // At level 9999: linear = 9999*0.4 = 3999.6, diminishing = sqrt(9999)*0.8 ≈ 79.9
    // Linear should be the dominant term
    const bonus = StatEngine.calculateLevelBasedBonus(9999, 0.4, 0.8)
    const linearOnly = Math.floor(9999 * 0.4)
    expect(bonus).toBeGreaterThan(linearOnly)
    expect(bonus).toBeLessThan(linearOnly + 200) // diminishing term is bounded
  })
})

describe('StatEngine.calculateBaseStats', () => {
  it('produces all 10 base stats', () => {
    setSeed('stat-engine-test')
    const stats = StatEngine.calculateBaseStats('Human', 'Warrior', 50)
    const expectedKeys = ['strength', 'agility', 'dexterity', 'endurance', 'intelligence', 'wisdom', 'luck', 'charisma', 'willpower', 'resolve']
    for (const key of expectedKeys) {
      expect(stats[key]).toBeDefined()
      expect(stats[key]).toBeGreaterThan(0)
    }
  })

  it('stats are higher at level 100 than level 1', () => {
    setSeed('stat-engine-level-test')
    const low = StatEngine.calculateBaseStats('Human', 'Warrior', 1)
    setSeed('stat-engine-level-test')
    const high = StatEngine.calculateBaseStats('Human', 'Warrior', 100)

    // At least half the stats should be higher at level 100
    const keys = Object.keys(low)
    const higherCount = keys.filter((k) => (high[k] ?? 0) > (low[k] ?? 0)).length
    expect(higherCount).toBeGreaterThan(keys.length / 2)
  })

  it('respects MAX_BASE_STAT hard cap at extreme levels', () => {
    setSeed('stat-engine-cap-test')
    const stats = StatEngine.calculateBaseStats('Human', 'Warrior', 9999)
    for (const value of Object.values(stats)) {
      expect(value).toBeLessThanOrEqual(9999)
    }
  })

  it('is deterministic with the same seed', () => {
    setSeed('determinism-test')
    const first = StatEngine.calculateBaseStats('Elf', 'Mage', 200)
    setSeed('determinism-test')
    const second = StatEngine.calculateBaseStats('Elf', 'Mage', 200)
    expect(first).toEqual(second)
  })
})

describe('StatEngine.calculateDps', () => {
  it('returns min >= 1 and max >= min', () => {
    const dps = StatEngine.calculateDps({ attackPower: 100, attackSpeed: 50 }, 50)
    expect(dps.min).toBeGreaterThanOrEqual(1)
    expect(dps.max).toBeGreaterThanOrEqual(dps.min)
  })

  it('higher attackPower produces higher DPS', () => {
    const low = StatEngine.calculateDps({ attackPower: 100, attackSpeed: 50 }, 50)
    const high = StatEngine.calculateDps({ attackPower: 500, attackSpeed: 50 }, 50)
    expect(high.min).toBeGreaterThan(low.min)
  })

  it('defense reduces effective DPS compared to no defense', () => {
    const noDef = StatEngine.calculateDps({ attackPower: 500, attackSpeed: 100 }, 100)
    const withDef = StatEngine.calculateDps({ attackPower: 500, attackSpeed: 100, defense: 1000 }, 100)
    expect(withDef.max).toBeLessThan(noDef.max)
  })

  it('evasion reduces effective DPS and is capped at EVASION_MISS_CHANCE_CAP', () => {
    const noEvasion = StatEngine.calculateDps({ attackPower: 500, attackSpeed: 100 }, 100)
    const highEvasion = StatEngine.calculateDps({ attackPower: 500, attackSpeed: 100, evasion: 999999 }, 100)
    // Even with absurd evasion, DPS should not reach zero (cap is 40%)
    expect(highEvasion.max).toBeGreaterThan(0)
    expect(highEvasion.max).toBeLessThan(noEvasion.max)
  })

  it('sustain (hpRegen + lifesteal) reduces net DPS but cannot exceed SUSTAIN_REDUCTION_CAP', () => {
    const noSustain = StatEngine.calculateDps({ attackPower: 500, attackSpeed: 100 }, 100)
    const highSustain = StatEngine.calculateDps({ attackPower: 500, attackSpeed: 100, hpRegen: 999999, lifesteal: 999 }, 100)
    // Sustain is capped at 65% of effective DPS — character still takes 35%
    expect(highSustain.min).toBeGreaterThanOrEqual(1)
    expect(highSustain.max).toBeLessThan(noSustain.max)
    // At 65% cap, effective DPS should be at least 35% of no-sustain DPS
    expect(highSustain.max).toBeGreaterThan(noSustain.max * 0.3)
  })

  it('critChance and critDamageBonus increase DPS', () => {
    const noCrit = StatEngine.calculateDps({ attackPower: 500, attackSpeed: 100, critChance: 0, critDamageBonus: 150 }, 100)
    const withCrit = StatEngine.calculateDps({ attackPower: 500, attackSpeed: 100, critChance: 50, critDamageBonus: 300 }, 100)
    expect(withCrit.max).toBeGreaterThan(noCrit.max)
  })
})

describe('StatEngine.generateCharacterStats', () => {
  it('produces all five stat categories', () => {
    setSeed('full-stats-test')
    const stats = StatEngine.generateCharacterStats('Human', 'Warrior', 100)
    expect(Object.keys(stats.base).length).toBeGreaterThan(0)
    expect(Object.keys(stats.resource).length).toBeGreaterThan(0)
    expect(Object.keys(stats.combat).length).toBeGreaterThan(0)
    expect(Object.keys(stats.defensive).length).toBeGreaterThan(0)
    expect(Object.keys(stats.utility).length).toBeGreaterThan(0)
  })

  it('includes a dps range in combat stats', () => {
    setSeed('dps-range-test')
    const stats = StatEngine.generateCharacterStats('Human', 'Warrior', 100)
    expect(stats.combat.dps).toBeDefined()
    expect(stats.combat.dps?.min).toBeGreaterThanOrEqual(1)
    expect(stats.combat.dps?.max).toBeGreaterThanOrEqual(stats.combat.dps?.min ?? 0)
  })

  it('health scales with level', () => {
    setSeed('health-scale-test')
    const low = StatEngine.generateCharacterStats('Human', 'Warrior', 10)
    setSeed('health-scale-test')
    const high = StatEngine.generateCharacterStats('Human', 'Warrior', 1000)
    expect((high.resource.health ?? 0)).toBeGreaterThan((low.resource.health ?? 0))
  })

  it('falls back gracefully for unknown race and role', () => {
    setSeed('unknown-race-role-test')
    expect(() => StatEngine.generateCharacterStats('UnknownRace', 'UnknownRole', 50)).not.toThrow()
  })
})
