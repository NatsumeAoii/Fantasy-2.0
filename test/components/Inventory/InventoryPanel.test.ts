import React from 'react'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { InventoryPanel } from '../../../src/components/Inventory/InventoryPanel'
import { makeTestCharacter } from '../../makeTestCharacter'
import type { GeneratedBestiary, GeneratedPoolEntry } from '../../../src/types'

function entry(overrides: Partial<GeneratedPoolEntry>): GeneratedPoolEntry {
  return {
    id: overrides.id ?? 'entry-id',
    name: overrides.name ?? 'Entry',
    ...overrides,
  }
}

const bestiary: GeneratedBestiary = {
  mounts: [
    entry({
      id: 'draft_beasts_riding_horse',
      name: 'Riding Horse',
      category: 'BEAST',
      tier: 1,
      rarity: 'Common',
      description: 'A reliable road mount.',
      metadata: { group: 'Common Draft Beasts', mountId: 'draft_beasts', speed: 33, hp: 19, defenseRating: 10 },
    }),
    entry({
      id: 'scourge_runners_bridled_courser',
      name: 'Bridled Courser',
      category: 'BEAST',
      tier: 2,
      rarity: 'Uncommon',
      metadata: { group: 'Scourge Runners', mountId: 'scourge_runners', speed: 52, hp: 30, defenseRating: 13 },
    }),
  ],
  mountBags: [
    entry({
      id: 'mount_bag_draft_beasts_canvas_saddlebag',
      name: 'Canvas Saddlebag',
      category: 'Mount Gear',
      rarity: 'Common',
      description: 'A rough-sewn cloth bag draped over the saddle horn.',
      metadata: { mountId: 'draft_beasts', extraSlots: 2, weight: 1 },
    }),
    entry({
      id: 'mount_bag_scourge_runners_courier_saddlebag',
      name: 'Courier Saddlebag',
      category: 'Mount Gear',
      rarity: 'Uncommon',
      metadata: { mountId: 'scourge_runners', extraSlots: 3, weight: 1 },
    }),
  ],
  pets: [
    entry({
      id: 'hound_companions_bloodhound',
      name: 'Bloodhound',
      category: 'BEAST',
      tier: 1,
      rarity: 'Common',
      description: 'A relentless tracking companion.',
      metadata: { group: 'Hound Companions', petId: 'hound_companions', loyalty: 'Devoted', diet: 'Carnivore', bonusStat: 'tracking', bonusValue: 1 },
    }),
    entry({
      id: 'feline_hunters_hunting_cheetah',
      name: 'Hunting Cheetah',
      category: 'BEAST',
      tier: 2,
      rarity: 'Uncommon',
      metadata: { group: 'Feline Hunters', petId: 'feline_hunters', loyalty: 'Loyal', diet: 'Carnivore', bonusStat: 'stealth', bonusValue: 1 },
    }),
  ],
  summons: [
    entry({
      id: 'lesser_servants',
      name: 'Unseen Porter',
      category: 'CONSTRUCT',
      tier: 1,
      rarity: 'Common',
      description: 'An invisible force that carries packs and opens doors.',
      metadata: { duration: '1 Hour', manaCost: 10 },
    }),
  ],
  favoriteMount: entry({
    id: 'scourge_runners_bridled_courser',
    name: 'Bridled Courser',
    category: 'BEAST',
    tier: 2,
    rarity: 'Uncommon',
  }),
  favoritePet: entry({
    id: 'feline_hunters_hunting_cheetah',
    name: 'Hunting Cheetah',
    category: 'BEAST',
    tier: 2,
    rarity: 'Uncommon',
  }),
  mount: entry({
    id: 'draft_beasts_riding_horse',
    name: 'Riding Horse',
    category: 'BEAST',
    tier: 1,
    rarity: 'Common',
    description: 'A reliable road mount.',
    metadata: { group: 'Common Draft Beasts', mountId: 'draft_beasts', speed: 33, hp: 19, defenseRating: 10 },
  }),
  mountBag: entry({
    id: 'mount_bag_draft_beasts_canvas_saddlebag',
    name: 'Canvas Saddlebag',
    category: 'Mount Gear',
    rarity: 'Common',
    description: 'A rough-sewn cloth bag draped over the saddle horn.',
    metadata: { mountId: 'draft_beasts', extraSlots: 2, weight: 1 },
  }),
  pet: entry({
    id: 'hound_companions_bloodhound',
    name: 'Bloodhound',
    category: 'BEAST',
    tier: 1,
    rarity: 'Common',
    description: 'A relentless tracking companion.',
    metadata: { group: 'Hound Companions', petId: 'hound_companions', loyalty: 'Devoted', diet: 'Carnivore', bonusStat: 'tracking', bonusValue: 1 },
  }),
  summon: entry({
    id: 'lesser_servants',
    name: 'Unseen Porter',
    category: 'CONSTRUCT',
    tier: 1,
    rarity: 'Common',
    description: 'An invisible force that carries packs and opens doors.',
    metadata: { duration: '1 Hour', manaCost: 10 },
  }),
}

describe('InventoryPanel', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('adds a Stable vault section for persistent bestiary companions and mount gear', async () => {
    const user = userEvent.setup()
    const character = makeTestCharacter({ level: 100, race: 'Human', role: 'Warrior', bestiary })
    const onBestiaryChange = vi.fn()

    render(React.createElement(InventoryPanel, {
      inventory: character.inventory,
      recipes: [],
      bestiary: character.bestiary,
      characterProfile: {
        level: character.level,
        race: character.race,
        role: character.role,
      },
      onBestiaryChange,
    }))

    await user.click(screen.getByRole('tab', { name: 'Stable' }))

    expect(await screen.findByRole('heading', { name: 'Character Stable' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Riding Horse' })).toBeInTheDocument()
    expect(screen.getAllByText('Canvas Saddlebag').length).toBeGreaterThan(0)
    expect(screen.getByRole('heading', { name: 'Bloodhound' })).toBeInTheDocument()
    expect(screen.getByLabelText('Favorite mount')).toHaveTextContent('F')
    expect(screen.getAllByText('Bridled Courser').length).toBeGreaterThan(0)
    expect(screen.getByLabelText('Favorite pet')).toHaveTextContent('F')
    expect(screen.getAllByText('Hunting Cheetah').length).toBeGreaterThan(0)
    expect(screen.queryByText('Unseen Porter')).not.toBeInTheDocument()

    const mountSelect = screen.getByLabelText('Mount') as HTMLSelectElement
    expect(mountSelect.selectedOptions[0]?.textContent).toBe('Riding Horse')
    expect(within(mountSelect).getAllByRole('option')).toHaveLength(3)
    expect(within(mountSelect).getByRole('option', { name: 'Riding Horse' })).toBeInTheDocument()
    expect(within(mountSelect).getByRole('option', { name: 'Bridled Courser' })).toBeInTheDocument()
    expect(within(mountSelect).queryByRole('option', { name: 'War Elephant' })).not.toBeInTheDocument()
    expect(within(mountSelect).queryByRole('option', { name: 'Heavy War Behemoths' })).not.toBeInTheDocument()

    const gearSelect = screen.getByLabelText('Mount gear') as HTMLSelectElement
    expect(gearSelect.selectedOptions[0]?.textContent).toBe('Canvas Saddlebag')
    expect(within(gearSelect).getAllByRole('option')).toHaveLength(2)

    const petSelect = screen.getByLabelText('Pet') as HTMLSelectElement
    expect(petSelect.selectedOptions[0]?.textContent).toBe('Bloodhound')
    expect(within(petSelect).getAllByRole('option')).toHaveLength(3)
    expect(within(petSelect).getByRole('option', { name: 'Bloodhound' })).toBeInTheDocument()
    expect(within(petSelect).getByRole('option', { name: 'Hunting Cheetah' })).toBeInTheDocument()
    expect(within(petSelect).queryByRole('option', { name: 'Feline Hunters' })).not.toBeInTheDocument()

    await user.selectOptions(mountSelect, 'scourge_runners_bridled_courser')

    expect(onBestiaryChange).toHaveBeenCalledWith(expect.objectContaining({
      mount: expect.objectContaining({ name: 'Bridled Courser' }),
      mountBag: expect.objectContaining({ name: 'Courier Saddlebag' }),
    }))
  })

  it('can select favorite stable companions directly', async () => {
    const user = userEvent.setup()
    const character = makeTestCharacter({ level: 100, race: 'Human', role: 'Warrior', bestiary })
    const onBestiaryChange = vi.fn()

    render(React.createElement(InventoryPanel, {
      inventory: character.inventory,
      recipes: [],
      bestiary: character.bestiary,
      characterProfile: {
        level: character.level,
        race: character.race,
        role: character.role,
      },
      onBestiaryChange,
    }))

    await user.click(screen.getByRole('tab', { name: 'Stable' }))
    await user.click(await screen.findByRole('button', { name: 'Select favorite mount: Bridled Courser' }))

    expect(onBestiaryChange).toHaveBeenCalledWith(expect.objectContaining({
      mount: expect.objectContaining({ name: 'Bridled Courser' }),
      mountBag: expect.objectContaining({ name: 'Courier Saddlebag' }),
    }))

    await user.click(screen.getByRole('button', { name: 'Select favorite pet: Hunting Cheetah' }))

    expect(onBestiaryChange).toHaveBeenCalledWith(expect.objectContaining({
      pet: expect.objectContaining({ name: 'Hunting Cheetah' }),
    }))
  })

  it('keeps the last inventory sub-menu after remounting the panel', async () => {
    const user = userEvent.setup()
    const character = makeTestCharacter({ level: 100, race: 'Human', role: 'Warrior', bestiary })

    const props = {
      inventory: character.inventory,
      recipes: [],
      bestiary: character.bestiary,
      characterProfile: {
        level: character.level,
        race: character.race,
        role: character.role,
      },
    }

    const { unmount } = render(React.createElement(InventoryPanel, props))
    await user.click(screen.getByRole('tab', { name: 'Stable' }))
    expect(screen.getByRole('tab', { name: 'Stable' })).toHaveAttribute('aria-selected', 'true')

    unmount()
    render(React.createElement(InventoryPanel, props))

    expect(screen.getByRole('tab', { name: 'Stable' })).toHaveAttribute('aria-selected', 'true')
    expect(await screen.findByRole('heading', { name: 'Character Stable' })).toBeInTheDocument()
  })
})
