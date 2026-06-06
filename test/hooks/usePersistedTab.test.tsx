import { renderHook, act } from '@testing-library/react'
import { describe, expect, it, beforeEach } from 'vitest'
import { usePersistedTab } from '../../src/hooks/usePersistedTab'

const TABS = [
  { id: 'overview' as const },
  { id: 'lore' as const },
  { id: 'stats' as const },
]

type TabId = 'overview' | 'lore' | 'stats'

describe('usePersistedTab', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('returns the initial value when nothing is stored', () => {
    const { result } = renderHook(() =>
      usePersistedTab<TabId>('test-tab-key', 'overview', TABS),
    )
    expect(result.current[0]).toBe('overview')
  })

  it('persists the selected tab to localStorage', () => {
    const { result } = renderHook(() =>
      usePersistedTab<TabId>('test-tab-key', 'overview', TABS),
    )

    act(() => {
      result.current[1]('lore')
    })

    expect(result.current[0]).toBe('lore')
    const stored = localStorage.getItem('test-tab-key')
    expect(stored).not.toBeNull()
    expect(stored).toContain('lore')
  })

  it('restores a valid stored tab on mount', () => {
    // Pre-populate localStorage with a valid tab
    localStorage.setItem('test-tab-key', JSON.stringify({ version: 1, value: 'stats' }))

    const { result } = renderHook(() =>
      usePersistedTab<TabId>('test-tab-key', 'overview', TABS),
    )

    expect(result.current[0]).toBe('stats')
  })

  it('falls back to initialValue when stored tab is not in the items list', () => {
    // Store a tab ID that no longer exists (e.g. removed in a later version)
    localStorage.setItem('test-tab-key', JSON.stringify({ version: 1, value: 'deleted-tab' }))

    const { result } = renderHook(() =>
      usePersistedTab<TabId>('test-tab-key', 'overview', TABS),
    )

    expect(result.current[0]).toBe('overview')
  })

  it('falls back to initialValue when stored version does not match', () => {
    // Store a value with a different version number
    localStorage.setItem('test-tab-key', JSON.stringify({ version: 99, value: 'lore' }))

    const { result } = renderHook(() =>
      usePersistedTab<TabId>('test-tab-key', 'overview', TABS),
    )

    expect(result.current[0]).toBe('overview')
  })

  it('falls back to initialValue when localStorage contains corrupted JSON', () => {
    localStorage.setItem('test-tab-key', 'not-valid-json{{{')

    const { result } = renderHook(() =>
      usePersistedTab<TabId>('test-tab-key', 'overview', TABS),
    )

    expect(result.current[0]).toBe('overview')
  })

  it('accepts a functional updater', () => {
    const { result } = renderHook(() =>
      usePersistedTab<TabId>('test-tab-key', 'overview', TABS),
    )

    act(() => {
      result.current[1]((prev) => (prev === 'overview' ? 'lore' : 'overview'))
    })

    expect(result.current[0]).toBe('lore')
  })
})
