import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { IdentityPanel } from '../../src/components/IdentityPanel'
import { BONDS, PSYCHOLOGICAL_TRAITS, QUIRKS, SECRETS } from '../../src/data/identity'
import { makeTestCharacter } from '../makeTestCharacter'

describe('IdentityPanel', () => {
  it('frames identity sections as character hooks instead of pools', async () => {
    const character = makeTestCharacter({
      identity: {
        bonds: [{ id: BONDS[0].id, name: BONDS[0].name }],
        quirks: [{ id: QUIRKS[0].id, name: QUIRKS[0].name }],
        secrets: [{ id: SECRETS[0].id, name: SECRETS[0].name }],
        psychologicalTraits: [{ id: PSYCHOLOGICAL_TRAITS[0].id, name: PSYCHOLOGICAL_TRAITS[0].name }],
      },
    })

    render(React.createElement(IdentityPanel, { character }))

    expect(screen.getByRole('textbox', { name: 'Search identity' })).toHaveAttribute('title', 'Search identity hooks')
    expect(screen.queryByRole('combobox', { name: 'Identity category' })).not.toBeInTheDocument()
    expect(screen.getByText('Character Bonds')).toBeInTheDocument()
    expect(screen.getByText('Character Bonds').closest('summary')).toHaveAttribute('title', 'Toggle Character Bonds')
    expect(screen.getByText('Known Bonds').closest('summary')).toHaveAttribute('title', 'Toggle Known Bonds')
    await userEvent.click(screen.getByText('Known Bonds'))
    expect(screen.getByText('Known Bonds')).toBeInTheDocument()
    expect(screen.getAllByText('Known').length).toBeGreaterThan(0)
    expect(screen.queryByText('Bond Pool')).not.toBeInTheDocument()
    expect(screen.queryByText('Rolled')).not.toBeInTheDocument()

    await userEvent.click(screen.getByRole('tab', { name: 'Quirks' }))

    expect(screen.getByText('Character Quirks')).toBeInTheDocument()
    expect(screen.getByText('Character Quirks').closest('summary')).toHaveAttribute('title', 'Toggle Character Quirks')
    expect(screen.getByText('Known Quirks').closest('summary')).toHaveAttribute('title', 'Toggle Known Quirks')
    await userEvent.click(screen.getByText('Known Quirks'))
    expect(screen.getByText('Known Quirks')).toBeInTheDocument()
    expect(screen.getAllByText('Known').length).toBeGreaterThan(0)
    expect(screen.queryByText('Quirk Pool')).not.toBeInTheDocument()
    expect(screen.queryByText('Rolled')).not.toBeInTheDocument()

    await userEvent.click(screen.getByRole('tab', { name: 'Secrets' }))

    expect(screen.getByText('Character Secrets')).toBeInTheDocument()
    expect(screen.getByText('Character Secrets').closest('summary')).toHaveAttribute('title', 'Toggle Character Secrets')
    expect(screen.getByText('Known Secrets').closest('summary')).toHaveAttribute('title', 'Toggle Known Secrets')
    await userEvent.click(screen.getByText('Known Secrets'))
    expect(screen.getByText('Known Secrets')).toBeInTheDocument()
    expect(screen.getAllByText('Known').length).toBeGreaterThan(0)
    expect(screen.queryByText('Secret Pool')).not.toBeInTheDocument()
    expect(screen.queryByText('Rolled')).not.toBeInTheDocument()

    await userEvent.click(screen.getByRole('tab', { name: 'Psychology' }))

    expect(screen.getByText('Character Psychology')).toBeInTheDocument()
    expect(screen.getByText('Character Psychology').closest('summary')).toHaveAttribute('title', 'Toggle Character Psychology')
    expect(screen.getByText('Psychological Hooks').closest('summary')).toHaveAttribute('title', 'Toggle Psychological Hooks')
    await userEvent.click(screen.getByText('Psychological Hooks'))
    expect(screen.getByText('Psychological Hooks')).toBeInTheDocument()
    expect(screen.getAllByText('Known').length).toBeGreaterThan(0)
    expect(screen.queryByText('Psychology Pool')).not.toBeInTheDocument()
    expect(screen.queryByText('Rolled')).not.toBeInTheDocument()
  })
})
