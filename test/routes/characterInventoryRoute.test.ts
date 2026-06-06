import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

describe('character inventory route wiring', () => {
  it('passes inventory move handling from the route into the inventory panel', () => {
    const routeFile = readFileSync(resolve(process.cwd(), 'src/routes/character.$id.tsx'), 'utf8')
    const hookFile = readFileSync(resolve(process.cwd(), 'src/store/useCharacterPage.ts'), 'utf8')

    expect(hookFile).toContain("useCharacterStore((state) => state.moveInventoryItem)")
    expect(hookFile).toContain("useCharacterStore((state) => state.updateBestiary)")
    expect(hookFile).toContain("const handleInventoryMove = useCallback((request: InventoryMoveRequest) =>")
    expect(routeFile).toContain('recipes={character.inventoryContext.recipes}')
    expect(routeFile).toContain('bestiary={character.bestiary}')
    expect(routeFile).toContain('onBestiaryChange={updateBestiary}')
    expect(routeFile).toContain('onMoveItem={handleInventoryMove}')
  })

  it('keeps rejected inventory moves mapped to user-safe toast feedback', () => {
    const hookFile = readFileSync(resolve(process.cwd(), 'src/store/useCharacterPage.ts'), 'utf8')
    const feedbackFile = readFileSync(resolve(process.cwd(), 'src/logic/inventory/inventoryMoveFeedback.ts'), 'utf8')

    expect(hookFile).toContain("result.status !== 'rejected' || result.reason === 'same-location'")
    expect(hookFile).toContain("toast.error(message.title, { description: message.description })")

    expect(feedbackFile).toContain("'satchel-full'")
    expect(feedbackFile).toContain('Satchel is full.')
    expect(feedbackFile).toContain("'incompatible-slot'")
    expect(feedbackFile).toContain('That item cannot go there.')
  })

  it('uses shared browser utilities for share and export actions', () => {
    const hookFile = readFileSync(resolve(process.cwd(), 'src/store/useCharacterPage.ts'), 'utf8')

    expect(hookFile).toContain("import { copyToClipboard } from '../lib/clipboard'")
    expect(hookFile).toContain("import { exportAsImage } from '../lib/exportImage'")
    expect(hookFile).toContain('copyToClipboard(url,')
    expect(hookFile).not.toContain("document.execCommand('copy')")
  })
})
