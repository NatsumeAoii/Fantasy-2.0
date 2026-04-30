import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { CommandMenu } from '../../src/components/CommandMenu'
import { useCharacterStore } from '../../src/store/characterStore'
import { makeTestCharacter } from '../makeTestCharacter'

const navigateMock = vi.hoisted(() => vi.fn())
const originalScrollIntoView = Element.prototype.scrollIntoView

vi.mock('@tanstack/react-router', () => ({
  useNavigate: () => navigateMock,
}))

describe('CommandMenu', () => {
  class ResizeObserverStub {
    observe() {}
    unobserve() {}
    disconnect() {}
  }

  afterEach(() => {
    navigateMock.mockReset()
    useCharacterStore.getState().reset()
    Reflect.deleteProperty(globalThis, 'ResizeObserver')
    if (originalScrollIntoView) {
      Element.prototype.scrollIntoView = originalScrollIntoView
    } else {
      Reflect.deleteProperty(Element.prototype, 'scrollIntoView')
    }
  })

  it('uses one New Character command that clears the active character', async () => {
    const user = userEvent.setup()
    Object.defineProperty(globalThis, 'ResizeObserver', {
      configurable: true,
      value: ResizeObserverStub,
    })
    Element.prototype.scrollIntoView = vi.fn()

    useCharacterStore.setState({
      character: makeTestCharacter(),
      activeTab: 'inventory',
      isLoading: false,
      currentSeed: 'menu-test',
      generationError: null,
    })

    render(React.createElement(CommandMenu))

    await user.keyboard('{Control>}k{/Control}')

    expect(screen.getByText('New Character')).toBeInTheDocument()
    expect(screen.queryByText('Reroll Character')).not.toBeInTheDocument()

    await user.click(screen.getByText('New Character'))

    expect(navigateMock).toHaveBeenCalledWith({ to: '/' })
    expect(useCharacterStore.getState().character).toBeNull()
  })
})
