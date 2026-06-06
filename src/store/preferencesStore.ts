/**
 * Preferences Store — Persistent user settings.
 *
 * Centralizes all user preferences that were previously scattered
 * across individual useLocalStorage hooks. Single source of truth
 * for theme, density, motion, panel scale, and generation preferences.
 */
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { eventBus } from './eventBus'

export type Theme = 'dark' | 'light'
export type VisualDensity = 'comfortable' | 'compact'
export type VisualMotion = 'standard' | 'reduced'
export type PanelScale = 'tall' | 'short'

export interface GenerationPreferences {
  /** If set, force this race on generation instead of random */
  preferredRace: string | null
  /** If set, force this role on generation instead of random */
  preferredRole: string | null
  /** Auto-save generated characters to history */
  autoSaveHistory: boolean
  /** Show generation time in dev mode */
  showGenerationMetrics: boolean
}

interface PreferencesState {
  // Visual
  theme: Theme
  density: VisualDensity
  motion: VisualMotion
  panelScale: PanelScale

  // Generation
  generation: GenerationPreferences

  // Actions
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
  setDensity: (density: VisualDensity) => void
  setMotion: (motion: VisualMotion) => void
  setPanelScale: (scale: PanelScale) => void
  setGenerationPreference: <K extends keyof GenerationPreferences>(key: K, value: GenerationPreferences[K]) => void
  resetVisual: () => void
  resetAll: () => void
}

const DEFAULT_GENERATION: GenerationPreferences = {
  preferredRace: null,
  preferredRole: null,
  autoSaveHistory: true,
  showGenerationMetrics: false,
}

export const usePreferencesStore = create<PreferencesState>()(
  devtools(
    persist(
      (set, get) => ({
        theme: 'dark',
        density: 'comfortable',
        motion: 'standard',
        panelScale: 'tall',
        generation: { ...DEFAULT_GENERATION },

        setTheme: (theme) => {
          set({ theme })
          eventBus.emit({ type: 'preferences:changed', key: 'theme', value: theme })
        },

        toggleTheme: () => {
          const next = get().theme === 'dark' ? 'light' : 'dark'
          set({ theme: next })
          eventBus.emit({ type: 'preferences:changed', key: 'theme', value: next })
        },

        setDensity: (density) => {
          set({ density })
          document.documentElement.setAttribute('data-ui-density', density)
          eventBus.emit({ type: 'preferences:changed', key: 'density', value: density })
        },

        setMotion: (motion) => {
          set({ motion })
          document.documentElement.setAttribute('data-motion', motion)
          eventBus.emit({ type: 'preferences:changed', key: 'motion', value: motion })
        },

        setPanelScale: (scale) => {
          set({ panelScale: scale })
          document.documentElement.setAttribute('data-panel-scale', scale)
          eventBus.emit({ type: 'preferences:changed', key: 'panelScale', value: scale })
        },

        setGenerationPreference: (key, value) => {
          set((state) => ({
            generation: { ...state.generation, [key]: value },
          }))
          eventBus.emit({ type: 'preferences:changed', key: `generation.${key}`, value })
        },

        resetVisual: () => {
          set({ density: 'comfortable', motion: 'standard', panelScale: 'tall' })
          document.documentElement.setAttribute('data-ui-density', 'comfortable')
          document.documentElement.setAttribute('data-motion', 'standard')
          document.documentElement.setAttribute('data-panel-scale', 'tall')
        },

        resetAll: () => {
          set({
            theme: 'dark',
            density: 'comfortable',
            motion: 'standard',
            panelScale: 'tall',
            generation: { ...DEFAULT_GENERATION },
          })
        },
      }),
      {
        name: 'aetheris-preferences',
        version: 1,
      },
    ),
    { name: 'PreferencesStore' },
  ),
)
