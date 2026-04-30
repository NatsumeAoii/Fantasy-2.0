import { ORDERED_RANK_NAMES } from '../data/character'

export type RankTier = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'mythic'

export function getRankTier(rank: string): RankTier {
    const r = rank.toUpperCase()

    if (r === 'MYTHIC') return 'mythic'
    if (r === 'LEGENDARY') return 'legendary'
    if (r === 'EX' || r === 'SSSS') return 'epic'
    if (r === 'SSS' || r === 'SS') return 'rare'
    if (r === 'S' || r === 'A') return 'uncommon'
    return 'common'
}

export function getRankColor(rank: string): string {
    const r = rank.toUpperCase()

    if (r === 'MYTHIC') return 'text-rank-mythic-text font-black'
    if (r === 'LEGENDARY') return 'text-rank-legendary-text font-black'
    if (r === 'EX') return 'text-rank-ex-text font-bold'
    if (r === 'SSSS') return 'text-rank-ssss-text font-bold'
    if (r === 'SSS') return 'text-rank-sss-text font-bold'
    if (r === 'SS') return 'text-rank-ss-text font-bold'
    if (r === 'S') return 'text-rank-amber-text font-semibold'
    if (r === 'A') return 'text-rank-emerald-text'
    if (r === 'B') return 'text-rank-cyan-text'
    if (r === 'C') return 'text-rank-indigo-text'
    return 'text-rank-neutral-text'
}

export function getRankBadgeClasses(rank: string): string {
    const r = rank.toUpperCase()

    if (r === 'MYTHIC') return 'bg-rank-mythic-bg border-rank-mythic-border text-rank-mythic-text shadow-[0_0_12px_var(--rank-mythic-glow)]'
    if (r === 'LEGENDARY') return 'bg-rank-legendary-bg border-rank-legendary-border text-rank-legendary-text shadow-[0_0_10px_var(--rank-legendary-glow)]'
    if (r === 'EX') return 'bg-rank-ex-bg border-rank-ex-border text-rank-ex-text shadow-[0_0_8px_var(--rank-ex-glow)]'
    if (r === 'SSSS') return 'bg-rank-ssss-bg border-rank-ssss-border text-rank-ssss-text shadow-[0_0_8px_var(--rank-ssss-glow)]'
    if (r === 'SSS') return 'bg-rank-sss-bg border-rank-sss-border text-rank-sss-text'
    if (r === 'SS') return 'bg-rank-ss-bg border-rank-ss-border text-rank-ss-text'
    if (r === 'S') return 'text-rank-amber-text border-rank-amber-border bg-rank-amber-bg'
    if (r === 'A') return 'text-rank-emerald-text border-rank-emerald-border bg-rank-emerald-bg'
    if (r === 'B') return 'text-rank-cyan-text border-rank-cyan-border bg-rank-cyan-bg'
    if (r === 'C') return 'text-rank-indigo-text border-rank-indigo-border bg-rank-indigo-bg'
    return 'text-rank-neutral-text border-rank-neutral-border bg-rank-neutral-bg'
}

export function getRankSortOrder(rank: string): number {
    const idx = ORDERED_RANK_NAMES.indexOf(rank)
    return idx === -1 ? 99 : (ORDERED_RANK_NAMES.length - 1 - idx)
}

export function isEliteRank(rank: string): boolean {
    const tier = getRankTier(rank)
    return tier === 'rare' || tier === 'epic' || tier === 'legendary' || tier === 'mythic'
}
