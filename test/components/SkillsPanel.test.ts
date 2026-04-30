import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { SkillsPanel } from '../../src/components/SkillsPanel'
import type { GeneratedPoolEntry } from '../../src/types'

const summon: GeneratedPoolEntry = {
  id: 'lesser_servants',
  name: 'Unseen Porter',
  category: 'CONSTRUCT',
  tier: 1,
  rarity: 'Common',
  description: 'An invisible force that carries packs and opens doors.',
  metadata: { duration: '1 Hour', manaCost: 10 },
}

const secondSummon: GeneratedPoolEntry = {
  id: 'forest_wards_thorn_guardian',
  name: 'Thorn Guardian',
  category: 'FEY',
  tier: 2,
  rarity: 'Uncommon',
  description: 'A bramble-bound protector called from old groves.',
  metadata: { duration: '10 Minutes', manaCost: 24 },
}

describe('SkillsPanel', () => {
  it('separates standard skills and magic spells into Arcana sub-menus', async () => {
    render(React.createElement(SkillsPanel, {
      skills: [
        { name: 'Sword Dance', rank: 'A', description: 'A precise martial technique.', source: 'skill' },
        { name: 'Fire Bolt', rank: 'F', description: 'A mote of fire.', source: 'spell', category: 'Destruction' },
      ],
    }))

    expect(screen.getByRole('tab', { name: 'Skills' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('tab', { name: 'Magic' })).toHaveAttribute('aria-selected', 'false')
    expect(screen.getByText('Sword Dance')).toBeInTheDocument()
    expect(screen.queryByText('Fire Bolt')).not.toBeInTheDocument()

    await userEvent.click(screen.getByRole('tab', { name: 'Magic' }))

    expect(screen.getByRole('tab', { name: 'Skills' })).toHaveAttribute('aria-selected', 'false')
    expect(screen.getByRole('tab', { name: 'Magic' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText('Fire Bolt')).toBeInTheDocument()
    expect(screen.queryByText('Sword Dance')).not.toBeInTheDocument()
  })

  it('puts generated summons under Arcana instead of the Vault stable', async () => {
    render(React.createElement(SkillsPanel, {
      skills: [
        { name: 'Sword Dance', rank: 'A', description: 'A precise martial technique.', source: 'skill' },
      ],
      summon,
      summons: [summon, secondSummon],
    }))

    expect(screen.getByRole('tab', { name: 'Summons' })).toBeInTheDocument()
    expect(screen.queryByText('Unseen Porter')).not.toBeInTheDocument()

    await userEvent.click(screen.getByRole('tab', { name: 'Summons' }))

    expect(screen.getByRole('heading', { name: 'Character Summons' })).toBeInTheDocument()
    expect(screen.getByText('Unseen Porter')).toBeInTheDocument()
    expect(screen.getByText('Thorn Guardian')).toBeInTheDocument()
    expect(screen.getAllByText('Mana Cost')).toHaveLength(2)
    expect(screen.getByText('10')).toBeInTheDocument()
  })
})
