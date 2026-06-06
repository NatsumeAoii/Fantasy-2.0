import type { InventoryMoveRejectDetails, InventoryMoveRejectReason } from './InventoryMoveEngine'

export type InventoryMoveFeedbackReason = InventoryMoveRejectReason | 'missing-character'

interface InventoryMoveFeedbackMessage {
  title: string
  description: string
}

const INVENTORY_MOVE_FEEDBACK: Record<InventoryMoveFeedbackReason, InventoryMoveFeedbackMessage> = {
  'missing-item': {
    title: 'Item no longer available.',
    description: 'Refresh the inventory state and try the move again.',
  },
  'incompatible-slot': {
    title: 'That item cannot go there.',
    description: 'Move it to a compatible equipment slot or back into the satchel.',
  },
  'satchel-full': {
    title: 'Satchel is full.',
    description: 'Free a slot or equip a container with more storage first.',
  },
  'same-location': {
    title: 'Item already in place.',
    description: 'Choose a different target slot to move it.',
  },
  'missing-character': {
    title: 'Inventory unavailable.',
    description: 'Reload the character and try again.',
  },
}

function formatRemovedStorageNames(details: InventoryMoveRejectDetails): string {
  const names = details.removedStorage.map((entry) => entry.name)

  if (names.length === 1) return names[0]
  if (names.length === 2) return `${names[0]} and ${names[1]}`

  return `${names.slice(0, -1).join(', ')}, and ${names[names.length - 1]}`
}

function getSatchelFullMessage(details?: InventoryMoveRejectDetails): InventoryMoveFeedbackMessage {
  if (details?.kind !== 'satchel-capacity') {
    return INVENTORY_MOVE_FEEDBACK['satchel-full']
  }

  if (details.removedStorage.length > 0) {
    return {
      title: 'That move would overfill the satchel.',
      description: `Removing ${formatRemovedStorageNames(details)} drops capacity to ${details.capacity} slots, but ${details.requiredSlots} items would still need space.`,
    }
  }

  return {
    title: 'Satchel is full.',
    description: `${details.requiredSlots} items would need ${details.capacity} slots. Free a slot or equip a container with more storage first.`,
  }
}

export function getInventoryMoveFeedbackMessage(
  reason: InventoryMoveFeedbackReason,
  details?: InventoryMoveRejectDetails,
): InventoryMoveFeedbackMessage {
  if (reason === 'satchel-full') {
    return getSatchelFullMessage(details)
  }

  return INVENTORY_MOVE_FEEDBACK[reason]
}
