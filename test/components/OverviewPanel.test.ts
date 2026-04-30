import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { OverviewPanel } from '../../src/components/OverviewPanel'
import { makeTestCharacter } from '../makeTestCharacter'

describe('OverviewPanel', () => {
  it('cleans raw special power ids from the stored story excerpt', () => {
    const character = makeTestCharacter({
      backstory: {
        paragraphs: ['Sareth carries draconicPower_ultimate into the last war.'],
        summary: 'Marked by draconicPower_ultimate.',
        attribution: 'Chronicles of Aetheris',
        traits: [],
        personality: [],
      },
    })

    render(React.createElement(OverviewPanel, {
      character,
      onShare: vi.fn(),
      onExport: vi.fn(),
      onNewCharacter: vi.fn(),
      onNavigateToLore: vi.fn(),
    }))

    expect(screen.getByText(/Aspect of the Wyrm/)).toBeInTheDocument()
    expect(screen.queryByText(/draconicPower_ultimate/)).not.toBeInTheDocument()
  })

  it('labels the forge return action consistently instead of calling it reroll', () => {
    const character = makeTestCharacter()

    render(React.createElement(OverviewPanel, {
      character,
      onShare: vi.fn(),
      onExport: vi.fn(),
      onNewCharacter: vi.fn(),
      onNavigateToLore: vi.fn(),
    }))

    expect(screen.getByRole('button', { name: 'New Character' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Reroll' })).not.toBeInTheDocument()
  })
})
