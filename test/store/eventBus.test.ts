import { beforeEach, describe, expect, it, vi } from 'vitest'
import { eventBus } from '../../src/store/eventBus'

describe('EventBus', () => {
  beforeEach(() => {
    eventBus.reset()
  })

  describe('on / emit', () => {
    it('delivers events to typed subscribers', () => {
      const handler = vi.fn()
      eventBus.on('character:generated', handler)

      const event = { type: 'character:generated' as const, seed: 'abc', name: 'Test', race: 'Human', role: 'Warrior', level: 1 }
      eventBus.emit(event)

      expect(handler).toHaveBeenCalledTimes(1)
      expect(handler).toHaveBeenCalledWith(event)
    })

    it('does not deliver events of a different type', () => {
      const handler = vi.fn()
      eventBus.on('character:reset', handler)

      eventBus.emit({ type: 'character:generated', seed: 'abc', name: 'Test', race: 'Human', role: 'Warrior', level: 1 })

      expect(handler).not.toHaveBeenCalled()
    })

    it('supports multiple handlers for the same event type', () => {
      const handler1 = vi.fn()
      const handler2 = vi.fn()
      eventBus.on('character:reset', handler1)
      eventBus.on('character:reset', handler2)

      eventBus.emit({ type: 'character:reset' })

      expect(handler1).toHaveBeenCalledTimes(1)
      expect(handler2).toHaveBeenCalledTimes(1)
    })
  })

  describe('unsubscribe', () => {
    it('returns an unsubscribe function that removes the handler', () => {
      const handler = vi.fn()
      const unsubscribe = eventBus.on('character:reset', handler)

      unsubscribe()
      eventBus.emit({ type: 'character:reset' })

      expect(handler).not.toHaveBeenCalled()
    })
  })

  describe('onAny', () => {
    it('receives all event types', () => {
      const handler = vi.fn()
      eventBus.onAny(handler)

      eventBus.emit({ type: 'character:reset' })
      eventBus.emit({ type: 'tab:changed', from: 'overview', to: 'stats' })

      expect(handler).toHaveBeenCalledTimes(2)
      expect(handler).toHaveBeenCalledWith(expect.objectContaining({ type: 'character:reset' }))
      expect(handler).toHaveBeenCalledWith(expect.objectContaining({ type: 'tab:changed' }))
    })

    it('unsubscribes correctly', () => {
      const handler = vi.fn()
      const unsubscribe = eventBus.onAny(handler)

      unsubscribe()
      eventBus.emit({ type: 'character:reset' })

      expect(handler).not.toHaveBeenCalled()
    })
  })

  describe('error isolation', () => {
    it('does not propagate handler errors to other handlers', () => {
      const badHandler = vi.fn(() => { throw new Error('boom') })
      const goodHandler = vi.fn()

      eventBus.on('character:reset', badHandler)
      eventBus.on('character:reset', goodHandler)

      eventBus.emit({ type: 'character:reset' })

      expect(badHandler).toHaveBeenCalled()
      expect(goodHandler).toHaveBeenCalled()
    })

    it('does not propagate wildcard errors', () => {
      const badWildcard = vi.fn(() => { throw new Error('wildcard boom') })
      const goodHandler = vi.fn()

      eventBus.onAny(badWildcard)
      eventBus.on('character:reset', goodHandler)

      // Should not throw
      eventBus.emit({ type: 'character:reset' })
      expect(goodHandler).toHaveBeenCalled()
    })
  })

  describe('history', () => {
    it('records emitted events', () => {
      eventBus.emit({ type: 'character:reset' })
      eventBus.emit({ type: 'tab:changed', from: 'overview', to: 'stats' })

      const history = eventBus.getHistory()
      expect(history).toHaveLength(2)
      expect(history[0].type).toBe('character:reset')
      expect(history[1].type).toBe('tab:changed')
    })

    it('getHistory with count returns last N events', () => {
      eventBus.emit({ type: 'character:reset' })
      eventBus.emit({ type: 'tab:changed', from: 'a', to: 'b' })
      eventBus.emit({ type: 'character:reset' })

      const last2 = eventBus.getHistory(2)
      expect(last2).toHaveLength(2)
      expect(last2[0].type).toBe('tab:changed')
      expect(last2[1].type).toBe('character:reset')
    })

    it('caps history at maxHistory', () => {
      for (let i = 0; i < 150; i++) {
        eventBus.emit({ type: 'character:reset' })
      }

      const history = eventBus.getHistory()
      expect(history.length).toBeLessThanOrEqual(100)
    })
  })

  describe('reset', () => {
    it('clears all listeners and history', () => {
      const handler = vi.fn()
      eventBus.on('character:reset', handler)
      eventBus.emit({ type: 'character:reset' })

      eventBus.reset()

      // History was cleared
      expect(eventBus.getHistory()).toHaveLength(0)

      // Listeners were cleared — handler should not fire again
      eventBus.emit({ type: 'character:reset' })
      expect(handler).toHaveBeenCalledTimes(1)
    })
  })
})
