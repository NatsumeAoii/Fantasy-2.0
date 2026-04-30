import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

describe('root route fallback', () => {
  it('keeps a visible app-level suspense fallback', () => {
    const routeFile = readFileSync(resolve(process.cwd(), 'src/routes/__root.tsx'), 'utf8')

    expect(routeFile).not.toContain('fallback={null}')
    expect(routeFile).toContain('AppFallback')
  })
})
