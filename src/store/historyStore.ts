/**
 * History Store — Character session tracking, favorites, and comparison.
 *
 * Persists to localStorage. Tracks the last N generated characters
 * as lightweight snapshots (not full Character objects) for the
 * "Recent Characters" list and comparison features.
 */
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { eventBus } from './eventBus'

export interface CharacterSnapshot {
  seed: string
  name: string
  race: string
  role: string
  level: number
  region: string
  timestamp: number
  /** Top base stat name for quick display */
  topStat: string
  /** DPS range string for quick display */
  dpsRange: string
  /** Whether this snapshot is user-favorited */
  isFavorite: boolean
}

export interface ComparisonPair {
  left: CharacterSnapshot
  right: CharacterSnapshot
}

const MAX_HISTORY = 50
const MAX_FAVORITES = 20

interface HistoryState {
  /** Most recent characters generated this session and across sessions */
  entries: CharacterSnapshot[]
  /** Currently selected comparison pair (null if not comparing) */
  comparison: ComparisonPair | null

  // Actions
  addEntry: (snapshot: Omit<CharacterSnapshot, 'timestamp' | 'isFavorite'>) => void
  removeEntry: (seed: string) => void
  toggleFavorite: (seed: string) => void
  setComparison: (left: CharacterSnapshot, right: CharacterSnapshot) => void
  clearComparison: () => void
  clearHistory: () => void
  getFavorites: () => CharacterSnapshot[]
  getRecent: (count?: number) => CharacterSnapshot[]
}

export const useHistoryStore = create<HistoryState>()(
  devtools(
    persist(
      (set, get) => ({
        entries: [],
        comparison: null,

        addEntry: (snapshot) => {
          set((state) => {
            // Deduplicate by seed — update existing entry instead of adding duplicate
            const existing = state.entries.findIndex((e) => e.seed === snapshot.seed)
            const entry: CharacterSnapshot = {
              ...snapshot,
              timestamp: Date.now(),
              isFavorite: existing >= 0 ? state.entries[existing].isFavorite : false,
            }

            let entries: CharacterSnapshot[]
            if (existing >= 0) {
              entries = [...state.entries]
              entries[existing] = entry
              // Move to front
              entries.unshift(entries.splice(existing, 1)[0])
            } else {
              entries = [entry, ...state.entries]
            }

            // Trim non-favorites beyond max
            if (entries.length > MAX_HISTORY) {
              entries = entries.filter((e, i) => e.isFavorite || i < MAX_HISTORY)
            }

            return { entries }
          })
        },

        removeEntry: (seed) => {
          set((state) => ({
            entries: state.entries.filter((e) => e.seed !== seed),
            comparison: state.comparison &&
              (state.comparison.left.seed === seed || state.comparison.right.seed === seed)
              ? null
              : state.comparison,
          }))
        },

        toggleFavorite: (seed) => {
          set((state) => {
            const entries = state.entries.map((e) =>
              e.seed === seed ? { ...e, isFavorite: !e.isFavorite } : e,
            )

            // Enforce favorites cap
            const favoriteCount = entries.filter((e) => e.isFavorite).length
            if (favoriteCount > MAX_FAVORITES) {
              // Un-favorite the oldest favorite — scan from the end, skip the just-toggled seed
              let oldestFavoriteIdx = -1
              for (let i = entries.length - 1; i >= 0; i--) {
                if (entries[i].isFavorite && entries[i].seed !== seed) {
                  oldestFavoriteIdx = i
                  break
                }
              }
              if (oldestFavoriteIdx >= 0) {
                entries[oldestFavoriteIdx] = { ...entries[oldestFavoriteIdx], isFavorite: false }
              }
            }

            const entry = entries.find((e) => e.seed === seed)
            if (entry?.isFavorite) {
              eventBus.emit({ type: 'history:favorited', seed, name: entry.name })
            } else {
              eventBus.emit({ type: 'history:unfavorited', seed })
            }

            return { entries }
          })
        },

        setComparison: (left, right) => set({ comparison: { left, right } }),
        clearComparison: () => set({ comparison: null }),

        clearHistory: () => {
          set((state) => ({
            entries: state.entries.filter((e) => e.isFavorite),
            comparison: null,
          }))
        },

        getFavorites: () => get().entries.filter((e) => e.isFavorite),
        getRecent: (count = 10) => get().entries.slice(0, count),
      }),
      {
        name: 'aetheris-history',
        version: 1,
        partialize: (state) => ({
          entries: state.entries,
        }),
      },
    ),
    { name: 'HistoryStore' },
  ),
)
