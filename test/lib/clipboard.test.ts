import { beforeEach, describe, expect, it, vi } from 'vitest'
import { toast } from 'sonner'
import { copyToClipboard } from '../../src/lib/clipboard'

vi.mock('sonner', () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}))

describe('copyToClipboard', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('uses the Clipboard API when available', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    vi.stubGlobal('navigator', { clipboard: { writeText } })

    await expect(copyToClipboard('share-url', 'Copied!', 'Ready')).resolves.toBe(true)

    expect(writeText).toHaveBeenCalledWith('share-url')
    expect(toast.success).toHaveBeenCalledWith('Copied!', { description: 'Ready' })
  })

  it('fails safely when no browser copy mechanism is available', async () => {
    vi.stubGlobal('navigator', {})
    const execCommand = document.execCommand
    document.execCommand = undefined as unknown as typeof document.execCommand

    await expect(copyToClipboard('share-url')).resolves.toBe(false)

    expect(toast.error).toHaveBeenCalledWith('Failed to copy.')
    document.execCommand = execCommand
  })
})
