import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { InventorySlot } from '../../../src/components/Inventory/InventorySlot'
import type { Item } from '../../../src/types'

describe('InventorySlot', () => {
  it('adds native tooltips to empty and occupied inventory slots', () => {
    const item: Item = {
      id: 'item-1',
      defId: 'iron_sword',
      name: 'Iron Sword',
      type: 'WEAPON',
      rarity: 'COMMON',
      icon: 'GiBroadsword',
      weight: 3,
    }

    render(
      React.createElement('div', null,
        React.createElement(InventorySlot, { ariaLabel: 'Satchel slot', dropTarget: { type: 'backpack' }, onMoveItem: () => undefined }),
        React.createElement(InventorySlot, { item }),
      ),
    )

    expect(screen.getByRole('button', { name: 'Satchel slot' })).toHaveAttribute('title', 'Satchel slot')
    expect(screen.getByRole('button', { name: 'Iron Sword' })).toHaveAttribute('title', 'Iron Sword')
  })

  it('ignores malformed drag payloads before forwarding inventory moves', () => {
    const onMoveItem = vi.fn()

    render(
      React.createElement(InventorySlot, {
        ariaLabel: 'Satchel slot',
        dropTarget: { type: 'backpack' },
        onMoveItem,
      }),
    )

    fireEvent.drop(screen.getByRole('button', { name: 'Satchel slot' }), {
      dataTransfer: {
        getData: () => JSON.stringify({ itemId: 'item-1' }),
      },
    })

    expect(onMoveItem).not.toHaveBeenCalled()
  })
})
