import type { ItemSlot } from '../../types'
import type { IconName } from './icons'

export const INVENTORY_EQUIPMENT_SLOTS = [
  'HEAD',
  'BODY',
  'BACK',
  'SHOULDER',
  'HANDS',
  'HANDS_2',
  'LEGS',
  'FEET',
  'NECK',
  'RING',
  'RING_2',
  'MAIN_HAND',
  'OFF_HAND',
  'BELT',
  'THROWABLE',
  'TORCH',
  'POTION',
  'FOOD',
  'MOUNT',
  'EAR',
  'WAIST',
] as const satisfies readonly ItemSlot[]

export const INVENTORY_EQUIPMENT_SLOT_SET = new Set<string>(INVENTORY_EQUIPMENT_SLOTS)

export const EQUIPMENT_SLOT_LABELS: Record<ItemSlot, string> = {
  HEAD: 'Head',
  BODY: 'Body',
  BACK: 'Back',
  SHOULDER: 'Shoulder',
  HANDS: 'Hands',
  HANDS_2: 'Hands',
  LEGS: 'Legs',
  FEET: 'Feet',
  NECK: 'Neck',
  RING: 'Ring',
  RING_2: 'Ring',
  MAIN_HAND: 'Main Hand',
  OFF_HAND: 'Off Hand',
  BELT: 'Belt',
  THROWABLE: 'Throwable',
  TORCH: 'Torch',
  POTION: 'Potion',
  FOOD: 'Food',
  MOUNT: 'Mount',
  EAR: 'Ear',
  WAIST: 'Waist',
}

export const SLOT_GHOST_ICONS: Partial<Record<ItemSlot, IconName>> = {
  HEAD: 'GiBarbute',
  BODY: 'GiChestArmor',
  HANDS: 'GiGauntlet',
  HANDS_2: 'GiGauntlet',
  LEGS: 'GiLegArmor',
  FEET: 'GiBoots',
  NECK: 'GiGemPendant',
  RING: 'GiRing',
  RING_2: 'GiRing',
  BELT: 'GiBeltArmor',
  MAIN_HAND: 'GiBroadsword',
  OFF_HAND: 'GiShield',
  THROWABLE: 'GiDaggers',
  TORCH: 'GiTorch',
  POTION: 'GiRoundBottomFlask',
  FOOD: 'GiMeat',
  BACK: 'GiBackpack',
  SHOULDER: 'GiCape',
  EAR: 'GiEarring',
  WAIST: 'GiBeltArmor',
}

export function isItemSlot(value: unknown): value is ItemSlot {
  return typeof value === 'string' && INVENTORY_EQUIPMENT_SLOT_SET.has(value)
}
