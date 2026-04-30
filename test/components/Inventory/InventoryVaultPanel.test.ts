import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { InventoryVaultPanel } from '../../../src/components/Inventory/InventoryVaultPanel'
import type { Inventory, Item } from '../../../src/types'

const practiceSword: Item = {
  id: 'item-practice-sword',
  defId: 'sword',
  name: 'Practice Sword',
  type: 'WEAPON',
  rarity: 'COMMON',
  icon: 'GiBroadsword',
  weight: 3,
}

const baseInventory: Inventory = {
  equipment: {},
  backpack: [practiceSword],
  currency: {
    crown: 0,
    gold: 2,
    silver: 4,
    copper: 8,
    shard: 0,
  },
  weight: {
    current: 3,
    max: 40,
  },
}

describe('InventoryVaultPanel', () => {
  it('keeps movement lean while preserving selected item and destination hints', async () => {
    const user = userEvent.setup()
    const onMoveItem = vi.fn()

    render(React.createElement(InventoryVaultPanel, { inventory: baseInventory, onMoveItem }))

    expect(screen.queryByText('Item movement')).not.toBeInTheDocument()
    expect(screen.queryByText('Ready to assign gear')).not.toBeInTheDocument()

    const itemButton = screen.getByRole('button', { name: 'Practice Sword' })
    await user.click(itemButton)

    expect(itemButton).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: 'Main Hand equipment slot' })).toHaveClass('border-emerald-400/80')
    expect(screen.getByRole('button', { name: 'Off Hand equipment slot' })).toHaveClass('border-emerald-400/80')

    await user.click(itemButton)

    expect(itemButton).not.toHaveAttribute('aria-pressed')
    expect(onMoveItem).not.toHaveBeenCalled()
  })
})
