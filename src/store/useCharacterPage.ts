import { useCallback, useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { copyToClipboard } from '../lib/clipboard'
import { exportAsImage } from '../lib/exportImage'
import type { InventoryMoveRequest } from '../logic/inventory/InventoryMoveEngine'
import { getInventoryMoveFeedbackMessage } from '../logic/inventory/inventoryMoveFeedback'
import { useCharacterStore } from './characterStore'

/**
 * Encapsulates all side-effect logic for the character page:
 * generation trigger, export, share, inventory moves, and navigation.
 *
 * The stale-request pattern in characterStore.generate() ensures that
 * rapid re-mounts (e.g. React strict mode) don't produce race conditions.
 */
export function useCharacterPage(seed: string, name: string | undefined) {
  const navigate = useNavigate()

  const character = useCharacterStore((state) => state.character)
  const activeTab = useCharacterStore((state) => state.activeTab)
  const isLoading = useCharacterStore((state) => state.isLoading)
  const generate = useCharacterStore((state) => state.generate)
  const moveInventoryItem = useCharacterStore((state) => state.moveInventoryItem)
  const setTab = useCharacterStore((state) => state.setTab)
  const updateBestiary = useCharacterStore((state) => state.updateBestiary)
  const reset = useCharacterStore((state) => state.reset)
  const generationError = useCharacterStore((state) => state.generationError)

  useEffect(() => {
    void generate(seed, name)
  }, [seed, name, generate])

  const handleBack = useCallback(() => {
    reset()
    navigate({ to: '/' })
  }, [reset, navigate])

  const handleExport = useCallback(async () => {
    const element = document.querySelector('[data-character-shell="true"]') as HTMLElement | null
    if (!element) {
      toast.error('Export failed: no element to capture.')
      return
    }

    toast.promise(exportAsImage(element, character?.name.replace(/ /g, '-').toLowerCase() || 'character'), {
      loading: 'Inscribing character sheet...',
      success: 'Character sheet saved!',
      error: 'Export failed. Try again.',
    })
  }, [character?.name])

  const handleShare = useCallback(() => {
    const url = window.location.href
    void copyToClipboard(url, 'Link copied to clipboard!', 'Share this destiny with others.')
  }, [])

  const handleNavigateToLore = useCallback(() => setTab('lore'), [setTab])

  const handleInventoryMove = useCallback((request: InventoryMoveRequest) => {
    const result = moveInventoryItem(request)

    if (result.status !== 'rejected' || result.reason === 'same-location') {
      return
    }

    const message = getInventoryMoveFeedbackMessage(result.reason, result.details)
    toast.error(message.title, { description: message.description })
  }, [moveInventoryItem])

  return {
    character,
    activeTab,
    isLoading,
    generationError,
    setTab,
    updateBestiary,
    handleBack,
    handleExport,
    handleShare,
    handleNavigateToLore,
    handleInventoryMove,
  }
}
