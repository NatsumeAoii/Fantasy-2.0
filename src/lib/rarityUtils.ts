import type { ItemRarity } from '../types';

const RARITY_SLOT_CLASSES: Record<string, string> = {
    COMMON: 'border-rank-neutral-border bg-rank-neutral-bg text-rank-neutral-text',
    UNCOMMON: 'border-rank-emerald-border bg-rank-emerald-bg text-rank-emerald-text',
    RARE: 'border-rank-cyan-border bg-rank-cyan-bg text-rank-cyan-text shadow-[0_0_10px_var(--rank-cyan-border)]',
    EPIC: 'border-rarity-epic-border bg-rarity-epic-bg text-rarity-epic-text shadow-[0_0_15px_var(--rarity-epic-glow)]',
    LEGENDARY: 'border-rank-legendary-border bg-rank-legendary-bg text-rank-legendary-text shadow-[0_0_20px_var(--rank-legendary-glow)] animate-pulse-slow',
    MYTHIC: 'border-rarity-mythic-border bg-rarity-mythic-bg text-rarity-mythic-text shadow-[0_0_20px_var(--rarity-mythic-glow)] animate-pulse-slow',
    DIVINE: 'border-rarity-divine-border bg-rarity-divine-bg text-rarity-divine-text shadow-[0_0_25px_var(--rarity-divine-glow)] animate-pulse-slow',
    ARTIFACT: 'border-rarity-artifact-border bg-rarity-artifact-bg text-rarity-artifact-text shadow-[0_0_30px_var(--rarity-artifact-glow)] animate-pulse-slow',
};

const RARITY_TEXT_CLASSES: Record<string, string> = {
    COMMON: '',
    UNCOMMON: 'text-rank-emerald-text',
    RARE: 'text-rank-cyan-text',
    EPIC: 'text-rarity-epic-text',
    LEGENDARY: 'text-rank-legendary-text',
    MYTHIC: 'text-rarity-mythic-text',
    DIVINE: 'text-rarity-divine-text',
    ARTIFACT: 'text-rarity-artifact-text',
};

const GRADE_CLASSES: Record<string, string> = {
    'F': 'text-stone-500',
    'E': 'text-stone-400',
    'D': 'text-gray-400',
    'C': 'text-emerald-400',
    'B': 'text-cyan-400',
    'A': 'text-purple-400',
    'S': 'text-amber-300',
    'SS': 'text-orange-400',
    'SSS': 'text-red-400',
    'My': 'text-violet-400',
    'MY': 'text-violet-400',
    'EX': 'text-amber-200',
    '???': 'text-fuchsia-400',
};

export const getRaritySlotClass = (rarity: ItemRarity | string): string =>
    RARITY_SLOT_CLASSES[rarity] ?? RARITY_SLOT_CLASSES.COMMON;

export const getRarityTextClass = (rarity: ItemRarity | string): string =>
    RARITY_TEXT_CLASSES[rarity] ?? '';

export const getGradeClass = (grade: string): string =>
    GRADE_CLASSES[grade] ?? 'text-text-muted';
