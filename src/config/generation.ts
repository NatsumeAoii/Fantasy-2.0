import { CHARACTER_CONFIG, MAX_LEVEL } from './characterConfig'
import { INVENTORY_CONFIG } from './inventoryConfig'
import { STATS_CONFIG } from './statsConfig'

export { MAX_LEVEL }

/**
 * Composite generation constants used by CharacterGenerator.
 *
 * CHARACTER_CONFIG properties are spread at the top level (LEVEL, AGE, PROBABILITY, etc.)
 * while INVENTORY and STATS are nested under their own keys. This is intentional:
 * engines that only need inventory or stats config should import those directly
 * from '../config/inventoryConfig' or '../config/statsConfig' rather than
 * going through this composite object.
 */
export const GENERATION_CONSTANTS = {
  ...CHARACTER_CONFIG,
  INVENTORY: INVENTORY_CONFIG,
  STATS: STATS_CONFIG,
} as const
