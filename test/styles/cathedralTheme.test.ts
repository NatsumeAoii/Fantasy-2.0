import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

describe('cathedral theme CSS', () => {
  const css = readFileSync(resolve(process.cwd(), 'src/styles/cathedral.css'), 'utf8')

  it('routes cathedral surfaces through theme-aware variables with light overrides', () => {
    expect(css).toContain("[data-theme='light']")
    expect(css).toContain('--cathedral-atmosphere-bg')
    expect(css).toContain('--cathedral-panel-bg')
    expect(css).toContain('--cathedral-field-bg')
    expect(css).toContain('--cathedral-toast-bg')
    expect(css).toContain('background: var(--cathedral-panel-bg)')
    expect(css).toContain('background: var(--cathedral-field-bg)')
  })

  it('removes native input chrome inside custom cathedral fields', () => {
    expect(css).toContain('.cathedral-field input')
    expect(css).toContain('background: transparent')
    expect(css).toContain('border: 0')
    expect(css).toContain('box-shadow: none')
  })
})
