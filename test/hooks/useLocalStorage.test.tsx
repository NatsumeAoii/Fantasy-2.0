import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { useLocalStorage } from '../../src/hooks/useLocalStorage'

afterEach(() => {
  vi.restoreAllMocks()
})

function StorageButton() {
  const [value, setValue] = useLocalStorage('storage-button', 'off')

  return (
    <button type="button" onClick={() => setValue('on')}>
      {value}
    </button>
  )
}

describe('useLocalStorage', () => {
  it('keeps state updates usable when localStorage writes fail', async () => {
    const setItem = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('storage unavailable')
    })

    render(<StorageButton />)

    await userEvent.click(screen.getByRole('button', { name: 'off' }))

    expect(screen.getByRole('button', { name: 'on' })).toBeInTheDocument()
    expect(setItem).toHaveBeenCalledWith('storage-button', '"on"')
  })
})
