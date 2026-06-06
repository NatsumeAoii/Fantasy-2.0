/**
 * Bracket Types — Shared type definitions for level-bracketed configuration.
 *
 * These types describe the shape of "bracket" configuration tables that map
 * character levels to values (counts, chances, tiers, etc.). Used by both
 * config files (which define the tables) and logic engines (which read them).
 *
 * Canonical location: src/config/bracketTypes.ts
 */

export type LevelBracket = { maxLevel: number }

export type CountBracket = { maxLevel: number; count: { min: number; max: number } }

export type CountRollBracket = CountBracket & { chance: number; fallbackCount: { min: number; max: number } }

export type ChanceBracket = { maxLevel: number; chance: number }

export type TierBracket = { maxLevel: number; tiers: readonly number[] }
