import { describe, expect, it, vi } from 'vitest'
import { getRandomNumber } from '../../src/lib/randomUtils'

describe('randomUtils', () => {
  it('uses a documented fallback for invalid number ranges without logging noise', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => undefined)

    expect(getRandomNumber(Number.NaN, 4)).toBe(0)
    expect(error).not.toHaveBeenCalled()

    error.mockRestore()
  })

  it('keeps reversed integer ranges deterministic by returning the lower bound', () => {
    expect(getRandomNumber(5, 3)).toBe(5)
  })
})
