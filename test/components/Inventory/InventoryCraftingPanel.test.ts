import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { InventoryCraftingPanel } from '../../../src/components/Inventory/InventoryCraftingPanel'
import { RECIPES } from '../../../src/data/inventory/recipes'
import { makeTestCharacter } from '../../makeTestCharacter'

describe('InventoryCraftingPanel', () => {
  it('adds native tooltips to static crafting controls', () => {
    const recipe = RECIPES[0]
    const character = makeTestCharacter()

    render(React.createElement(InventoryCraftingPanel, {
      inventory: character.inventory,
      recipes: [{ id: recipe.id, name: recipe.outputItem }],
    }))

    expect(screen.getByRole('button', { name: 'All' })).toHaveAttribute('title', 'Show all crafting recipes')
    expect(screen.getByRole('button', { name: recipe.category })).toHaveAttribute('title', `Show ${recipe.category} recipes`)
    expect(screen.getByRole('button', { name: `Details ${recipe.outputItem}` })).toHaveAttribute('title', `Show details for ${recipe.outputItem}`)
    expect(screen.getByRole('button', { name: `Craft ${recipe.outputItem}` })).toHaveAttribute('title', `Craft ${recipe.outputItem}`)
  })
})
