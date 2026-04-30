import { describe, expect, it } from 'vitest'
import { IDENTITY_CONFIG } from '../../src/config'
import { BONDS, PSYCHOLOGICAL_TRAITS, QUIRKS, SECRETS } from '../../src/data/identity'
import { makeTestCharacter } from '../makeTestCharacter'
import { buildIdentityPanelPools } from '../../src/components/identityPanelPools'

describe('buildIdentityPanelPools', () => {
  it('keeps known identity entries pinned in the revealed pools', () => {
    const character = makeTestCharacter({
      identity: {
        bonds: [{ id: BONDS[0].id, name: BONDS[0].name }],
        quirks: [{ id: QUIRKS[0].id, name: QUIRKS[0].name }],
        secrets: [{ id: SECRETS[0].id, name: SECRETS[0].name }],
        psychologicalTraits: [{ id: PSYCHOLOGICAL_TRAITS[0].id, name: PSYCHOLOGICAL_TRAITS[0].name }],
      },
    })

    const pools = buildIdentityPanelPools(character)

    expect(pools.bonds.some((bond) => bond.id === BONDS[0].id && bond.isKnown)).toBe(true)
    expect(pools.quirks.some((quirk) => quirk.id === QUIRKS[0].id && quirk.isKnown)).toBe(true)
    expect(pools.secrets.some((secret) => secret.id === SECRETS[0].id && secret.isKnown)).toBe(true)
    expect(pools.psychologicalTraits.some((trait) => trait.id === PSYCHOLOGICAL_TRAITS[0].id && trait.isKnown)).toBe(true)
  })

  it('limits revealed identity pools from config', () => {
    const pools = buildIdentityPanelPools(makeTestCharacter({ id: 'identity-panel-limit', name: 'Identity Limit' }))
    const limits = IDENTITY_CONFIG.ATLAS.POOL_LIMITS

    expect(pools.bonds.length).toBeLessThanOrEqual(limits.bonds)
    expect(pools.quirks.length).toBeLessThanOrEqual(limits.quirks)
    expect(pools.secrets.length).toBeLessThanOrEqual(limits.secrets)
    expect(pools.psychologicalTraits.length).toBeLessThanOrEqual(limits.psychologicalTraits)
  })
})
