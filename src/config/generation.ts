import { CHARACTER_CONFIG, MAX_LEVEL } from './characterConfig'
import { INVENTORY_CONFIG } from './inventoryConfig'
import { STATS_CONFIG } from './statsConfig'

export { MAX_LEVEL }

export const GENERATION_CONSTANTS = {
  ...CHARACTER_CONFIG,
  INVENTORY: INVENTORY_CONFIG,
  STATS: STATS_CONFIG,
} as const
