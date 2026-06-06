/**
 * Typed Event Bus — Cross-store communication without coupling.
 *
 * Stores emit events when significant state changes occur.
 * Other stores or UI components subscribe to react without
 * creating circular dependencies.
 */

export type CharacterEvent =
  | { type: 'character:generated'; seed: string; name: string; race: string; role: string; level: number }
  | { type: 'character:reset' }
  | { type: 'character:nameChanged'; oldName: string; newName: string }
  | { type: 'inventory:itemMoved'; itemName: string; from: string; to: string }
  | { type: 'inventory:moveFailed'; reason: string; itemName?: string }
  | { type: 'crafting:attempted'; recipe: string; success: boolean }
  | { type: 'history:favorited'; seed: string; name: string }
  | { type: 'history:unfavorited'; seed: string }
  | { type: 'export:completed'; format: 'image' | 'json' | 'clipboard' }
  | { type: 'tab:changed'; from: string; to: string }
  | { type: 'preferences:changed'; key: string; value: unknown }

type EventHandler<T extends CharacterEvent['type']> = (
  event: Extract<CharacterEvent, { type: T }>
) => void

// Internal storage uses (event: unknown) => void to avoid unsound casts
// between specific handler types. The public API remains fully typed.
type AnyHandler = (event: unknown) => void

type Unsubscribe = () => void

class EventBusImpl {
  private listeners = new Map<string, Set<AnyHandler>>()
  private wildcardListeners = new Set<AnyHandler>()
  private history: CharacterEvent[] = []
  private historyWriteIndex = 0
  private historySize = 0
  private maxHistory = 100

  /** Subscribe to a specific event type. Returns an unsubscribe function. */
  on<T extends CharacterEvent['type']>(type: T, handler: EventHandler<T>): Unsubscribe {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set())
    }
    const handlers = this.listeners.get(type)!
    const anyHandler = handler as AnyHandler
    handlers.add(anyHandler)

    return () => {
      handlers.delete(anyHandler)
      if (handlers.size === 0) this.listeners.delete(type)
    }
  }

  /** Subscribe to ALL events (useful for logging/debugging). */
  onAny(handler: (event: CharacterEvent) => void): Unsubscribe {
    const anyHandler = handler as AnyHandler
    this.wildcardListeners.add(anyHandler)

    return () => {
      this.wildcardListeners.delete(anyHandler)
    }
  }

  /** Emit an event to all subscribers of that type. */
  emit<T extends CharacterEvent['type']>(event: Extract<CharacterEvent, { type: T }>): void {
    // Ring buffer: O(1) insertion instead of O(n) Array.shift()
    if (this.history.length < this.maxHistory) {
      this.history.push(event)
    } else {
      this.history[this.historyWriteIndex] = event
    }
    this.historyWriteIndex = (this.historyWriteIndex + 1) % this.maxHistory
    this.historySize = Math.min(this.historySize + 1, this.maxHistory)

    const handlers = this.listeners.get(event.type)
    if (handlers) {
      for (const handler of handlers) {
        try {
          handler(event)
        } catch (error) {
          if (import.meta.env?.DEV) {
            console.error(`[EventBus] Handler error for "${event.type}":`, error)
          }
        }
      }
    }

    // Notify wildcard listeners
    for (const handler of this.wildcardListeners) {
      try {
        handler(event)
      } catch (error) {
        if (import.meta.env?.DEV) {
          console.error(`[EventBus] Wildcard handler error for "${event.type}":`, error)
        }
      }
    }
  }

  /** Get the last N events for debugging. */
  getHistory(count?: number): readonly CharacterEvent[] {
    // Reconstruct chronological order from ring buffer
    if (this.history.length < this.maxHistory) {
      return count ? this.history.slice(-count) : [...this.history]
    }
    const ordered = [
      ...this.history.slice(this.historyWriteIndex),
      ...this.history.slice(0, this.historyWriteIndex),
    ]
    return count ? ordered.slice(-count) : ordered
  }

  /** Clear all listeners and history. Useful for testing. */
  reset(): void {
    this.listeners.clear()
    this.wildcardListeners.clear()
    this.history = []
    this.historyWriteIndex = 0
    this.historySize = 0
  }
}

/** Singleton event bus instance shared across all stores. */
export const eventBus = new EventBusImpl()
