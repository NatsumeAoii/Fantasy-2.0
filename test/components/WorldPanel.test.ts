import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { WorldPanel } from '../../src/components/WorldPanel'
import { makeTestCharacter } from '../makeTestCharacter'

describe('WorldPanel', () => {
  it('frames world sections as journey context instead of pools', async () => {
    render(React.createElement(WorldPanel, { character: makeTestCharacter() }))

    expect(screen.getByRole('textbox', { name: 'Search world atlas' })).toHaveAttribute('title', 'Search world atlas')
    expect(screen.getByText(/shown of/i)).toBeInTheDocument()
    expect(screen.queryByRole('combobox', { name: 'World category' })).not.toBeInTheDocument()
    expect(screen.getByText('Homeland Ties')).toBeInTheDocument()
    expect(screen.getByText('Homeland Ties').closest('summary')).toHaveAttribute('title', 'Toggle Homeland Ties')
    expect(screen.getByText('Regional Guilds').closest('summary')).toHaveAttribute('title', 'Toggle Regional Guilds')
    expect(screen.getByText('Related Factions').closest('summary')).toHaveAttribute('title', 'Toggle Related Factions')
    expect(screen.getByText('Related Factions')).toBeInTheDocument()
    expect(screen.queryByText('Homeland Pool')).not.toBeInTheDocument()
    expect(screen.queryByText('Regional Guild Pool')).not.toBeInTheDocument()
    expect(screen.queryByText('Faction Pool')).not.toBeInTheDocument()

    await userEvent.click(screen.getByRole('tab', { name: 'Culture' }))

    expect(screen.queryByRole('combobox', { name: 'World category' })).not.toBeInTheDocument()
    expect(screen.getByText('Character Languages')).toBeInTheDocument()
    expect(screen.getByText('Character Languages').closest('summary')).toHaveAttribute('title', 'Toggle Character Languages')
    expect(screen.getByText('Character Customs').closest('summary')).toHaveAttribute('title', 'Toggle Character Customs')
    expect(screen.getByText('Known Languages').closest('summary')).toHaveAttribute('title', 'Toggle Known Languages')
    expect(screen.getByText('Cultural Customs').closest('summary')).toHaveAttribute('title', 'Toggle Cultural Customs')
    expect(screen.getByText('Known Languages')).toBeInTheDocument()
    expect(screen.queryByText('Rolled Languages')).not.toBeInTheDocument()
    expect(screen.queryByText('Rolled Customs')).not.toBeInTheDocument()
    expect(screen.queryByText('Language Pool')).not.toBeInTheDocument()
    expect(screen.queryByText('Custom Pool')).not.toBeInTheDocument()

    await userEvent.click(screen.getByRole('tab', { name: 'Pantheon' }))

    expect(screen.getByText('Divine Ties')).toBeInTheDocument()
    expect(screen.queryByText('Pantheon Pool')).not.toBeInTheDocument()

    await userEvent.click(screen.getByRole('tab', { name: 'History' }))

    expect(screen.getByText('Historical Context')).toBeInTheDocument()
    expect(screen.getAllByText(/^Sources/)[0]).toHaveAttribute('title', 'Show historical sources')
    expect(screen.queryByText('History Pool')).not.toBeInTheDocument()

    const landmarksTab = screen.getByRole('tab', { name: 'Landmarks' })
    expect(landmarksTab).toHaveAttribute('title', 'Known places and sites')

    await userEvent.click(landmarksTab)

    expect(screen.getByText('Known Landmarks').closest('summary')).toHaveAttribute('title', 'Toggle Known Landmarks')
    await userEvent.click(screen.getByText('Known Landmarks'))

    expect(screen.getByText('Known Landmarks')).toBeInTheDocument()
    expect(screen.getAllByText('Journey site').length).toBeGreaterThan(0)
    expect(screen.queryByText('Landmark Pool')).not.toBeInTheDocument()
  })

  it('shows world search counts and offers a clear action', async () => {
    const user = userEvent.setup()

    render(React.createElement(WorldPanel, { character: makeTestCharacter() }))

    const search = screen.getByRole('textbox', { name: 'Search world atlas' })
    await user.type(search, 'zzzz-no-world-match')

    expect(screen.getByText(/0 shown of/i)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Clear world atlas search' }))

    expect(search).toHaveValue('')
    expect(screen.queryByRole('button', { name: 'Clear world atlas search' })).not.toBeInTheDocument()
  })

  it('shows generated magic hazards in a Hazard atlas sub-menu', async () => {
    const character = makeTestCharacter({
      magic: {
        spells: [],
        hazards: [
          {
            id: 'glyph_of_warding',
            name: 'Glyph of Warding',
            category: 'Magical',
            tier: 'Moderate',
            description: 'An invisible magical sigil painted on a floor or object.',
            effect: 'The elemental blast disrupts the victim.',
            metadata: {
              trigger: 'An unauthorized creature moving near the inscribed surface.',
              damageType: 'Elemental',
            },
          },
        ],
      },
    })

    render(React.createElement(WorldPanel, { character }))

    const hazardTab = screen.getByRole('tab', { name: 'Hazard' })
    expect(hazardTab).toHaveAttribute('title', 'Known hazard')

    await userEvent.click(hazardTab)

    expect(hazardTab).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText('Glyph of Warding')).toBeInTheDocument()
    expect(screen.getByText('Known hazard')).toBeInTheDocument()
    expect(screen.getByText('An unauthorized creature moving near the inscribed surface.')).toBeInTheDocument()
    expect(screen.getByText('Elemental')).toBeInTheDocument()
  })
})
