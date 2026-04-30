import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { ThemeProvider } from '../../../src/components/Layout/ThemeProvider'
import { TopTabs } from '../../../src/components/Layout/TopTabs'

function renderTopTabs() {
  render(React.createElement(
    ThemeProvider,
    null,
    React.createElement(TopTabs, {
      activeTab: 'overview',
      onChange: vi.fn(),
      onBack: vi.fn(),
    }),
  ))
}

describe('TopTabs', () => {
  it('adds native tooltips to top-level menu tabs and application menu items', async () => {
    renderTopTabs()

    expect(screen.getByRole('tab', { name: 'Overview' })).toHaveAttribute('title', 'Character summary')
    expect(screen.getByRole('tab', { name: 'Atlas' })).toHaveAttribute('title', 'World lore & affiliations')

    await userEvent.click(screen.getByRole('button', { name: 'Open application menu' }))

    expect(screen.getByRole('menuitem', { name: 'Visual Settings' })).toHaveAttribute('title', 'Visual Settings')
    expect(screen.getByRole('menuitem', { name: 'GitHub Repository' })).toHaveAttribute('title', 'GitHub Repository')
  })
})
