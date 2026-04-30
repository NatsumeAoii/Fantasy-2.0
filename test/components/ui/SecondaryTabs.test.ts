import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { SecondaryTabs } from '../../../src/components/ui/SecondaryTabs'

describe('SecondaryTabs', () => {
  it('adds a native tooltip to every sub-menu tab', () => {
    render(React.createElement(SecondaryTabs, {
      ariaLabel: 'Example sections',
      activeId: 'first',
      items: [
        { id: 'first', label: 'First' },
        { id: 'second', label: 'Second', title: 'Second detail' },
      ],
      onChange: vi.fn(),
    }))

    expect(screen.getByRole('tab', { name: 'First' })).toHaveAttribute('title', 'First')
    expect(screen.getByRole('tab', { name: 'Second' })).toHaveAttribute('title', 'Second detail')
  })

  it('moves selection and focus with roving keyboard controls', async () => {
    const user = userEvent.setup()

    function ExampleTabs() {
      const [activeId, setActiveId] = React.useState('first')

      return React.createElement(SecondaryTabs, {
        ariaLabel: 'Example sections',
        activeId,
        items: [
          { id: 'first', label: 'First' },
          { id: 'second', label: 'Second' },
          { id: 'third', label: 'Third' },
        ],
        onChange: setActiveId,
      })
    }

    render(React.createElement(ExampleTabs))

    const first = screen.getByRole('tab', { name: 'First' })
    const second = screen.getByRole('tab', { name: 'Second' })
    const third = screen.getByRole('tab', { name: 'Third' })

    first.focus()
    await user.keyboard('{ArrowRight}')

    expect(second).toHaveFocus()
    expect(second).toHaveAttribute('aria-selected', 'true')
    expect(first).toHaveAttribute('tabIndex', '-1')

    await user.keyboard('{End}')

    expect(third).toHaveFocus()
    expect(third).toHaveAttribute('aria-selected', 'true')

    await user.keyboard('{Home}')

    expect(first).toHaveFocus()
    expect(first).toHaveAttribute('aria-selected', 'true')
  })
})
