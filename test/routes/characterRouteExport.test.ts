import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

describe('character route export contract', () => {
  it('keeps the character route export compatible with automatic route splitting', () => {
    const routeFile = readFileSync(resolve(process.cwd(), 'src/routes/character.$id.tsx'), 'utf8')
    const viteConfig = readFileSync(resolve(process.cwd(), 'vite.config.ts'), 'utf8')

    expect(routeFile).toContain('export const Route')
    expect(viteConfig).toContain('autoCodeSplitting: true')
  })
})
