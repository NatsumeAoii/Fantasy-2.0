import { beforeEach, describe, expect, it } from 'vitest'
import { usePreferencesStore } from '../../src/store/preferencesStore'

describe('PreferencesStore', () => {
  beforeEach(() => {
    usePreferencesStore.setState({
      theme: 'dark',
      density: 'comfortable',
      motion: 'standard',
      panelScale: 'tall',
      generation: {
        preferredRace: null,
        preferredRole: null,
        autoSaveHistory: true,
        showGenerationMetrics: false,
      },
    })
  })

  describe('theme', () => {
    it('defaults to dark', () => {
      expect(usePreferencesStore.getState().theme).toBe('dark')
    })

    it('setTheme changes theme', () => {
      usePreferencesStore.getState().setTheme('light')
      expect(usePreferencesStore.getState().theme).toBe('light')
    })

    it('toggleTheme switches between dark and light', () => {
      usePreferencesStore.getState().toggleTheme()
      expect(usePreferencesStore.getState().theme).toBe('light')

      usePreferencesStore.getState().toggleTheme()
      expect(usePreferencesStore.getState().theme).toBe('dark')
    })
  })

  describe('density', () => {
    it('defaults to comfortable', () => {
      expect(usePreferencesStore.getState().density).toBe('comfortable')
    })

    it('setDensity changes density and sets data attribute', () => {
      usePreferencesStore.getState().setDensity('compact')
      expect(usePreferencesStore.getState().density).toBe('compact')
      expect(document.documentElement.getAttribute('data-ui-density')).toBe('compact')
    })
  })

  describe('motion', () => {
    it('defaults to standard', () => {
      expect(usePreferencesStore.getState().motion).toBe('standard')
    })

    it('setMotion changes motion and sets data attribute', () => {
      usePreferencesStore.getState().setMotion('reduced')
      expect(usePreferencesStore.getState().motion).toBe('reduced')
      expect(document.documentElement.getAttribute('data-motion')).toBe('reduced')
    })
  })

  describe('panelScale', () => {
    it('defaults to tall', () => {
      expect(usePreferencesStore.getState().panelScale).toBe('tall')
    })

    it('setPanelScale changes scale and sets data attribute', () => {
      usePreferencesStore.getState().setPanelScale('short')
      expect(usePreferencesStore.getState().panelScale).toBe('short')
      expect(document.documentElement.getAttribute('data-panel-scale')).toBe('short')
    })
  })

  describe('generation preferences', () => {
    it('defaults to null race/role and autoSave true', () => {
      const { generation } = usePreferencesStore.getState()
      expect(generation.preferredRace).toBeNull()
      expect(generation.preferredRole).toBeNull()
      expect(generation.autoSaveHistory).toBe(true)
      expect(generation.showGenerationMetrics).toBe(false)
    })

    it('setGenerationPreference updates individual keys', () => {
      usePreferencesStore.getState().setGenerationPreference('preferredRace', 'Elf')
      expect(usePreferencesStore.getState().generation.preferredRace).toBe('Elf')
      // Other keys unchanged
      expect(usePreferencesStore.getState().generation.preferredRole).toBeNull()
    })
  })

  describe('resetVisual', () => {
    it('resets density, motion, and panelScale to defaults', () => {
      usePreferencesStore.getState().setDensity('compact')
      usePreferencesStore.getState().setMotion('reduced')
      usePreferencesStore.getState().setPanelScale('short')

      usePreferencesStore.getState().resetVisual()

      const state = usePreferencesStore.getState()
      expect(state.density).toBe('comfortable')
      expect(state.motion).toBe('standard')
      expect(state.panelScale).toBe('tall')
    })
  })

  describe('resetAll', () => {
    it('resets everything including theme and generation', () => {
      usePreferencesStore.getState().setTheme('light')
      usePreferencesStore.getState().setDensity('compact')
      usePreferencesStore.getState().setGenerationPreference('preferredRace', 'Dwarf')

      usePreferencesStore.getState().resetAll()

      const state = usePreferencesStore.getState()
      expect(state.theme).toBe('dark')
      expect(state.density).toBe('comfortable')
      expect(state.generation.preferredRace).toBeNull()
    })
  })
})
