/**
 * Character Store - Zustand State Management
 * 
 * Wraps the existing generateCharacter function from lib/generator.ts
 * to provide centralized state management with URL-based seeding.
 * Character is regenerated fresh each session - no persistence.
 */
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { normalizeCharacterName, normalizeCharacterSeed, safeDecodeUriComponent } from '../lib/characterInput'
import {
    moveInventoryItem,
    type InventoryMoveRejectDetails,
    type InventoryMoveRejectReason,
    type InventoryMoveRequest,
    type InventoryMoveResult,
} from '../logic/InventoryMoveEngine'
import type { Character, GeneratedBestiary } from '../types'
import type { TabId } from '../components/Layout/TopTabs'

type StoreInventoryMoveResult =
    | InventoryMoveResult
    | {
        status: 'rejected'
        character: null
        reason: InventoryMoveRejectReason | 'missing-character'
        details?: InventoryMoveRejectDetails
      }

interface CharacterState {
    // State
    character: Character | null
    activeTab: TabId
    isLoading: boolean
    currentSeed: string | null
    generationError: string | null

    // Actions
    generate: (seed: string, name?: string) => Promise<void>
    moveInventoryItem: (request: InventoryMoveRequest) => StoreInventoryMoveResult
    setTab: (tab: TabId) => void
    updateBestiary: (updates: Partial<GeneratedBestiary>) => void
    updateName: (name: string) => void
    reset: () => void
}

/**
 * Random mysterious fallback names for anonymous characters
 */
const MYSTERIOUS_NAMES = [
    "Nameless Wanderer", "The Unknown", "Nobody Knows", "Forgotten Soul",
    "The Veiled One", "Wandering Shade", "The Faceless", "Lost Traveler",
    "The Silent One", "Fate's Orphan", "Whisper in the Wind", "Shadow Walker",
    "The Hollow", "Drifting Spirit", "Voiceless One", "The Unseen",
    "Phantom Drifter", "Dust and Echoes", "The Forgotten", "Twilight Stranger",
    "Unmarked Grave", "The Wandering Star", "Child of Ash", "The Lost Chord",
    "One Without Name", "The Shrouded", "Cipher of the Void", "The Blank Page",
    "Unwritten Fate", "The Masked", "Bearer of No Sigil", "The Unclaimed",
]

const USER_SAFE_GENERATION_ERROR = 'Character generation failed. Try another seed or reload the forge.'
let generationRequestId = 0

function reportGenerationError(error: unknown): void {
    if (import.meta.env?.DEV && import.meta.env.MODE !== 'test') {
        console.error('[CharacterStore] Failed to generate character:', error)
    }
}

/**
 * Extract a display name from the seed if no explicit name provided.
 */
function extractNameFromSeed(seed: string): string {
    if (!seed || seed.trim().length === 0) {
        return MYSTERIOUS_NAMES[0]
    }

    const decoded = safeDecodeUriComponent(seed)

    if (decoded.includes('-')) {
        const firstPart = decoded.split('-')[0]
        if (firstPart.length >= 2 && isNaN(Number(firstPart))) {
            return firstPart
        }
    }

    // Deterministic selection based on seed hash
    const hash = decoded.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
    return MYSTERIOUS_NAMES[hash % MYSTERIOUS_NAMES.length]
}

export const useCharacterStore = create<CharacterState>()(devtools((set, get) => ({
    character: null,
    activeTab: 'overview',
    isLoading: false,
    currentSeed: null,
    generationError: null,

    generate: async (seed, name) => {
        const requestId = ++generationRequestId
        const normalizedSeed = normalizeCharacterSeed(seed)
        const finalName = normalizeCharacterName(name) || extractNameFromSeed(normalizedSeed)

        set({ isLoading: true, generationError: null })

        try {
            const decodedSeed = safeDecodeUriComponent(normalizedSeed)
            const { generateCharacter } = await import('../lib/generator')

            if (requestId !== generationRequestId) {
                return
            }

            const newCharacter = generateCharacter({
                seed: decodedSeed,
                name: finalName,
            })

            set({
                character: newCharacter,
                currentSeed: normalizedSeed,
                isLoading: false,
                activeTab: 'overview',
                generationError: null,
            })
        } catch (error) {
            if (requestId !== generationRequestId) {
                return
            }

            reportGenerationError(error)
            set({
                character: null,
                currentSeed: null,
                isLoading: false,
                activeTab: 'overview',
                generationError: USER_SAFE_GENERATION_ERROR,
            })
        }
    },

    moveInventoryItem: (request) => {
        const character = get().character
        if (!character) {
            return {
                status: 'rejected',
                character: null,
                reason: 'missing-character',
                details: undefined,
            }
        }

        const result = moveInventoryItem(character, request)
        if (result.status === 'moved') {
            set({ character: result.character })
        }
        return result
    },

    setTab: (tab) => set({ activeTab: tab }),

    updateBestiary: (updates) =>
        set((state) => ({
            character: state.character
                ? Object.freeze({
                    ...state.character,
                    bestiary: {
                        ...state.character.bestiary,
                        ...updates,
                    },
                })
                : null,
        })),

    // Shallow-copies the frozen Character. Nested arrays/objects (stats, inventory, etc.)
    // are shared references — do NOT mutate them on the new object.
    updateName: (name) =>
        set((state) => {
            const nextName = normalizeCharacterName(name)
            return {
                character: state.character ? Object.freeze({ ...state.character, name: nextName || state.character.name }) : null,
            }
        }),

    reset: () => {
        generationRequestId += 1
        set({
            character: null,
            activeTab: 'overview',
            isLoading: false,
            currentSeed: null,
            generationError: null,
        })
    },
}), { name: 'CharacterStore' }))
