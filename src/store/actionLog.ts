/**
 * Action Log — Debugging, replay, and analytics.
 *
 * Records every meaningful action taken during a session.
 * Useful for:
 * - Debugging generation issues (what seed + params produced a bug)
 * - Session analytics (how many rerolls, what tabs visited)
 * - Future: action replay for "undo" functionality
 */
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export type ActionCategory = 'generation' | 'navigation' | 'inventory' | 'export' | 'preference' | 'crafting'

export interface ActionLogEntry {
  id: number
  timestamp: number
  category: ActionCategory
  action: string
  details?: Record<string, unknown>
  /** Duration in ms (for async actions like generation) */
  duration?: number
}

interface ActionLogState {
  entries: ActionLogEntry[]
  isRecording: boolean
  sessionStart: number

  // Actions
  log: (category: ActionCategory, action: string, details?: Record<string, unknown>, duration?: number) => void
  startTimed: (category: ActionCategory, action: string) => () => void
  setRecording: (recording: boolean) => void
  clear: () => void
  getByCategory: (category: ActionCategory) => ActionLogEntry[]
  getSessionDuration: () => number
  getActionCount: () => Record<ActionCategory, number>
}

const MAX_LOG_ENTRIES = 500
let nextId = 1

export const useActionLog = create<ActionLogState>()(
  devtools(
    (set, get) => ({
      entries: [],
      isRecording: true,
      sessionStart: Date.now(),

      log: (category, action, details, duration) => {
        if (!get().isRecording) return

        const entry: ActionLogEntry = {
          id: nextId++,
          timestamp: Date.now(),
          category,
          action,
          details,
          duration,
        }

        set((state) => {
          // Push-and-shallow-copy: the spread creates a new reference for Zustand's
          // equality check, but we only do it once (not shift + spread which is O(2n)).
          if (state.entries.length >= MAX_LOG_ENTRIES) {
            // Drop oldest by slicing from index 1, append new at end — one allocation
            return { entries: [...state.entries.slice(1), entry] }
          }
          return { entries: [...state.entries, entry] }
        })
      },

      /** Returns a "stop" function that logs the action with its duration. */
      startTimed: (category, action) => {
        const start = performance.now()
        return (details?: Record<string, unknown>) => {
          const duration = Math.round(performance.now() - start)
          get().log(category, action, details, duration)
        }
      },

      setRecording: (recording) => set({ isRecording: recording }),

      clear: () => set({ entries: [], sessionStart: Date.now() }),

      getByCategory: (category) => get().entries.filter((e) => e.category === category),

      getSessionDuration: () => Date.now() - get().sessionStart,

      getActionCount: () => {
        const counts: Record<ActionCategory, number> = {
          generation: 0,
          navigation: 0,
          inventory: 0,
          export: 0,
          preference: 0,
          crafting: 0,
        }
        for (const entry of get().entries) {
          counts[entry.category]++
        }
        return counts
      },
    }),
    { name: 'ActionLog' },
  ),
)
