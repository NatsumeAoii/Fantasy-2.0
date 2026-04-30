import type { Inventory, Stats } from '../types';

/**
 * Calculates the maximum carrying capacity (weight limit) for a character.
 * Formula: Base (100) + (STR * 0.1) + (AGI * 0.2) + (END * 0.1) + Equipment Capacity
 */
export const calculateMaxWeight = (stats: Stats, equipment: Inventory['equipment']): number => {
    const BASE_WEIGHT = 100;

    const str = stats['strength'] || 0;
    const agi = stats['agility'] || 0;
    const end = stats['endurance'] || 0;

    const strBonus = str * 0.1;
    const agiBonus = agi * 0.2;
    const endBonus = end * 0.1;

    let equipBonus = 0;
    Object.values(equipment).forEach(item => {
        if (item && item.capacity != null && Number.isFinite(item.capacity)) {
            equipBonus += item.capacity;
        }
    });

    const total = BASE_WEIGHT + strBonus + agiBonus + endBonus + equipBonus;
    return Math.round(Math.max(0, total) * 10) / 10;
};
