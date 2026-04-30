import { describe, expect, it, vi } from 'vitest'
import { resetCharacterRouteOnReload, shouldResetCharacterRouteOnReload } from '../../src/routes/-resetCharacterRouteOnReload'

function makeWindow(type: PerformanceNavigationTiming['type'], hash: string) {
  const replaceState = vi.fn()
  const win = {
    document: { title: 'Character Fantasy Generator' },
    history: { replaceState, state: { preserved: true } },
    location: {
      hash,
      pathname: '/f5.4.1_beta_cdx/',
      search: '?theme=dark',
    },
    performance: {
      getEntriesByType: () => [{ type }],
    },
  } as unknown as Window

  return { replaceState, win }
}

describe('resetCharacterRouteOnReload', () => {
  it('detects only browser reloads on character routes', () => {
    expect(shouldResetCharacterRouteOnReload('reload', '#/character/alpha-seed')).toBe(true)
    expect(shouldResetCharacterRouteOnReload('navigate', '#/character/alpha-seed')).toBe(false)
    expect(shouldResetCharacterRouteOnReload('reload', '#/')).toBe(false)
  })

  it('returns to the landing route when a generated character page is refreshed', () => {
    const { replaceState, win } = makeWindow('reload', '#/character/alpha-seed?name=Lyra')

    resetCharacterRouteOnReload(win)

    expect(replaceState).toHaveBeenCalledWith(
      { preserved: true },
      'Character Fantasy Generator',
      '/f5.4.1_beta_cdx/?theme=dark#/',
    )
  })

  it('keeps direct UID navigation intact so the same seed can regenerate the same character', () => {
    const { replaceState, win } = makeWindow('navigate', '#/character/alpha-seed?name=Lyra')

    resetCharacterRouteOnReload(win)

    expect(replaceState).not.toHaveBeenCalled()
  })
})
