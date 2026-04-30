import { beforeEach, describe, expect, it, vi } from 'vitest'
import { toPng } from 'html-to-image'
import { exportAsImage } from '../../src/lib/exportImage'

vi.mock('html-to-image', () => ({
  toPng: vi.fn().mockResolvedValue('data:image/png;base64,abc'),
}))

describe('exportAsImage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('sanitizes and caps generated filenames before download', async () => {
    const click = vi.fn()
    const element = document.createElement('div')
    const createElement = vi.spyOn(document, 'createElement')

    createElement.mockImplementation((tagName: string) => {
      const created = Document.prototype.createElement.call(document, tagName)
      if (tagName === 'a') {
        Object.defineProperty(created, 'click', { value: click })
      }
      return created
    })

    await exportAsImage(element, `${'A'.repeat(120)} <>`)

    const link = createElement.mock.results.find((result) => result.value instanceof HTMLAnchorElement)?.value as HTMLAnchorElement
    const baseName = link.download.replace(/-\d+\.png$/, '')

    expect(toPng).toHaveBeenCalledWith(element, expect.objectContaining({ pixelRatio: 2 }))
    expect(baseName).toHaveLength(80)
    expect(baseName).toMatch(/^[A-Za-z0-9_-]+$/)
    expect(click).toHaveBeenCalled()
  })
})
