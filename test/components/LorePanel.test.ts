import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { LorePanel } from '../../src/components/LorePanel'
import { makeTestCharacter } from '../makeTestCharacter'

describe('LorePanel mechanics', () => {
  it('cleans raw special power ids from stored Chronicle text', () => {
    const character = makeTestCharacter({
      backstory: {
        paragraphs: ['Sareth carries draconicPower_ultimate into the last war.'],
        summary: 'Marked by draconicPower_ultimate.',
        attribution: 'Chronicles of Aetheris',
        traits: [],
        personality: [],
      },
    })

    render(React.createElement(LorePanel, { character }))

    expect(screen.getAllByText(/Aspect of the Wyrm/)).toHaveLength(2)
    expect(screen.queryByText(/draconicPower_ultimate/)).not.toBeInTheDocument()
  })

  it('renders character mechanics as a Chronicle sub-menu with category disclosures', async () => {
    const character = makeTestCharacter({
      mechanics: {
        feats: [
          {
            id: 'guardian_stance',
            name: 'Guardian Stance',
            category: 'Defensive',
            tier: 2,
            description: 'Keeps allies close when the line starts to break.',
            benefit: 'Interpose once per round.',
            metadata: { prerequisite: 'Endurance 8' },
          },
        ],
        achievements: [
          {
            id: 'bridge_oath',
            name: 'Bridge Oath',
            category: 'Valor',
            tier: 1,
            description: 'Hold a bridge against impossible odds.',
            metadata: { renownReward: 12, baseXP: 300, baseGold: 80 },
          },
        ],
        afflictions: [
          {
            id: 'ash_lung',
            name: 'Ash Lung',
            category: 'Disease',
            tier: 3,
            description: 'Breathing hurts after nights near cursed smoke.',
            effect: 'Reduced stamina recovery.',
            metadata: { transmission: 'Soot inhalation', cure: 'Moonwell tonic' },
          },
        ],
        crimes: [
          {
            id: 'forged_writ',
            name: 'Forged Writ',
            category: 'Moderate',
            description: 'A fake writ still follows this character through border towns.',
            metadata: { bountyMin: 25, bountyMax: 120, detectionDifficulty: 16 },
          },
        ],
        martialArts: [
          {
            id: 'iron_reed',
            name: 'Iron Reed',
            category: 'Polearm',
            description: 'A patient stance built around distance and leverage.',
            benefit: 'Counter after a missed melee attack.',
            metadata: { stance: 'Rooted Guard', technique: 'Reed Hook' },
          },
        ],
      },
    })

    render(React.createElement(LorePanel, { character }))

    const mechanicsTab = screen.getByRole('tab', { name: 'Mechanics' })
    expect(mechanicsTab).toHaveAttribute('title', 'Feats, achievements, and consequences')

    await userEvent.click(mechanicsTab)

    expect(mechanicsTab).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText('Character Mechanics')).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: 'Search mechanics' })).toHaveAttribute('title', 'Search character mechanics')
    expect(screen.getByText('Character Feats').closest('summary')).toHaveAttribute('title', 'Toggle Character Feats')
    expect(screen.getByText('Character Achievements').closest('summary')).toHaveAttribute('title', 'Toggle Character Achievements')
    expect(screen.getByText('Character Afflictions').closest('summary')).toHaveAttribute('title', 'Toggle Character Afflictions')
    expect(screen.getByText('Character Crimes').closest('summary')).toHaveAttribute('title', 'Toggle Character Crimes')
    expect(screen.getByText('Martial Discipline').closest('summary')).toHaveAttribute('title', 'Toggle Martial Discipline')
    expect(screen.getByText('Guardian Stance')).toBeInTheDocument()
    expect(screen.getByText('Bridge Oath')).toBeInTheDocument()
    expect(screen.getByText('Ash Lung')).toBeInTheDocument()
    expect(screen.getByText('Forged Writ')).toBeInTheDocument()
    expect(screen.getByText('Iron Reed')).toBeInTheDocument()
    expect(screen.queryByText('Mechanics Pool')).not.toBeInTheDocument()
    expect(screen.queryByText('Rolled')).not.toBeInTheDocument()
  })
})
