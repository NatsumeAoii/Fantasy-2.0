import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

describe('project customization CSS', () => {
  const customizationPath = resolve(process.cwd(), 'src/styles/customization.css')

  it('provides one predictable file for manual project-wide visual tuning', () => {
    expect(existsSync(customizationPath)).toBe(true)

    const css = readFileSync(customizationPath, 'utf8')
    expect(css).toContain('--custom-radius-panel')
    expect(css).toContain('--custom-panel-height-min')
    expect(css).toContain('--custom-motion-scale')
    expect(css).toContain('--custom-font-serif')
  })

  it('loads customization after base theme tokens and before component styles', () => {
    const entry = readFileSync(resolve(process.cwd(), 'src/main.tsx'), 'utf8')

    expect(entry.indexOf('./styles/theme.css')).toBeLessThan(entry.indexOf('./styles/customization.css'))
    expect(entry.indexOf('./styles/customization.css')).toBeLessThan(entry.indexOf('./styles/cathedral.css'))
  })
})
