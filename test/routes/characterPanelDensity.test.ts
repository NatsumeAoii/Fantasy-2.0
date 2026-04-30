import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

describe('character panel density', () => {
  it('keeps lazy tab wrappers compact inside the scroll panel', () => {
    const routeFile = readFileSync(resolve(process.cwd(), 'src/routes/character.$id.tsx'), 'utf8')

    const compactWrappers = routeFile.match(/className="w-full p-4 md:p-5"/g) ?? []

    expect(compactWrappers).toHaveLength(3)
    expect(routeFile).toContain('top-6 z-40')
    expect(routeFile).not.toContain('top-4 z-40')
    expect(routeFile).not.toContain('top-3 z-40')
    expect(routeFile).toContain('pb-4 pt-10')
    expect(routeFile).not.toContain('pb-4 pt-16')
    expect(routeFile).not.toContain('className="w-full p-6"')
  })

  it('keeps the inventory panel narrower with tighter internal spacing', () => {
    const inventoryPanel = readFileSync(resolve(process.cwd(), 'src/components/Inventory/InventoryPanel.tsx'), 'utf8')
    const inventoryVaultPanel = readFileSync(resolve(process.cwd(), 'src/components/Inventory/InventoryVaultPanel.tsx'), 'utf8')

    expect(inventoryPanel).toContain('gap-4 max-w-5xl')
    expect(inventoryVaultPanel).toContain('lg:w-[18rem] p-4')
    expect(inventoryPanel).not.toContain('gap-6 max-w-6xl')
    expect(inventoryVaultPanel).not.toContain('lg:w-80 p-6')
  })
})
