import { describe, expect, it } from 'vitest'
import { getInventoryMoveFeedbackMessage } from '../../src/logic/inventoryMoveFeedback'

describe('inventoryMoveFeedback', () => {
  it('explains when removing storage would shrink satchel capacity below needed space', () => {
    const message = getInventoryMoveFeedbackMessage('satchel-full', {
      kind: 'satchel-capacity',
      capacity: 12,
      requiredSlots: 15,
      overflowSlots: 3,
      removedStorage: [
        {
          name: 'Scroll Case',
          slot: 'BELT',
          extraSlots: 6,
        },
      ],
    })

    expect(message.title).toBe('That move would overfill the satchel.')
    expect(message.description).toContain('Removing Scroll Case')
    expect(message.description).toContain('12 slots')
    expect(message.description).toContain('15 items')
  })
})
