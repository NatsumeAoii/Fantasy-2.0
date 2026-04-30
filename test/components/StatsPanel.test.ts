import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { StatsPanel } from '../../src/components/StatsPanel'
import { makeTestCharacter } from '../makeTestCharacter'

vi.mock('../../src/components/StatsRadar', () => ({
  StatsRadar: () => null,
}))

describe('StatsPanel', () => {
  it('frames the Codex as a character record instead of stat parameters', async () => {
    const character = makeTestCharacter({
      specialPowers: {
        stealthPower_passive: 42,
        stealthPower_active: 37,
      },
    })

    render(React.createElement(StatsPanel, { character }))

    expect(screen.getByText('Character Codex')).toBeInTheDocument()
    expect(screen.getByText('Core Attributes')).toBeInTheDocument()
    expect(screen.getByText('Innate Gifts')).toBeInTheDocument()
    expect(screen.getByText('Phantom Step')).toBeInTheDocument()
    expect(screen.getByText('Shadow Veil')).toBeInTheDocument()
    expect(screen.getByText('Potency 42')).toBeInTheDocument()
    expect(screen.queryByText('stealthPower_passive')).not.toBeInTheDocument()
    expect(screen.queryByText('Innate Powers & Blessings')).not.toBeInTheDocument()
    expect(screen.queryByText(/Parameters/)).not.toBeInTheDocument()

    const battleTab = screen.getByRole('tab', { name: 'Battle' })
    expect(battleTab).toHaveAttribute('title', 'Battle profile')

    await userEvent.click(battleTab)

    expect(screen.getByText('Battle Profile')).toBeInTheDocument()
    expect(screen.getByText('Damage Window')).toBeInTheDocument()
    expect(screen.queryByText('Combat DPS Rating')).not.toBeInTheDocument()
    expect(screen.queryByText('Estimated damage output per second.')).not.toBeInTheDocument()
  })
})
