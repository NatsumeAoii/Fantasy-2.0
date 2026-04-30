// ============================================================
// generator.ts — Top-Level Character Generation Entry Point
// ============================================================
// This file is the ONLY public API for generating a character.
// It wraps CharacterGenerator.generate() with seed management
// and an optional easter-egg validator.
//
// Flow:
//   1. Caller passes { name?, seed?, generationCount? }
//   2. Seed is sanitised and capped before reaching the PRNG
//   3. The seeded PRNG is activated via setSeed()
//   4. CharacterGenerator.generate() builds the full Character
//   5. Seed is cleared back to Math.random() afterward
// ============================================================

import { CharacterGenerator } from '../logic/CharacterGenerator';
import { setSeed } from './randomUtils';
import { normalizeCharacterSeed } from './characterInput';
import type { Character } from '../types';

// ------------------------------------------------------------
// Section 1 — Options Interface
// ------------------------------------------------------------
// name:            Display name for the character card.
//                  If omitted, CharacterGenerator defaults to "Nameless Wanderer".
// seed:            Optional deterministic seed string.
//                  Same seed → same character every time.
//                  Useful for sharing builds via URL or save codes.
// generationCount: Lifetime roll counter from the caller (characterStore).
//                  Drives the pity system — every 10/100/1000 rolls
//                  guarantees higher-level brackets.
// ------------------------------------------------------------
interface GenerationOptions {
    name?: string;
    seed?: string;
    generationCount?: number;
}

// ------------------------------------------------------------
// Section 2 - Easter Egg Validator (Obfuscated)
// ------------------------------------------------------------
// _0, _1  : Pre-computed FNV-1a and DJB2 hashes of a specific
//           36-character secret seed.
// _L      : Expected length of the secret seed (36 chars).
// _a()    : FNV-1a hash function (fast, non-cryptographic).
// _b()    : DJB2 hash function  (second factor to avoid collisions).
// _v()    : Returns true only when a seed matches BOTH hashes
//           AND has exactly 36 chars.
//
// When _v(seed) is true, the generation count is overridden
// to 1000 — which triggers the highest pity bracket
// (Wanderer-tier, level 1000–9999).
//
// TL;DR — There's a hidden seed that always gives a god-tier roll.
// ------------------------------------------------------------
const _0 = 252607100;
const _1 = 1204164150;
const _L = 36;

const _a = (s: string): number => {
    let h = 0x811C9DC5;
    for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193); }
    return h >>> 0;
};

const _b = (s: string): number => {
    let h = 0x1505;
    for (let i = 0; i < s.length; i++) { h = ((h << 5) + h) + s.charCodeAt(i); h = h & h; }
    return h >>> 0;
};

const _v = (s: string): boolean => s.length === _L && _a(s) === _0 && _b(s) === _1;

// ------------------------------------------------------------
// Section 4 — generateCharacter() (Exported API)
// ------------------------------------------------------------
// This is the function every caller imports.
// It is the single gateway into the generation pipeline.
//
// Steps:
//   1. safeSeed — Normalise and cap the user seed.
//      If no seed was provided, safeSeed is undefined.
//
//   2. setSeed(safeSeed ?? null) — Activate the Mulberry32 PRNG
//      with the truncated seed. If null, randomUtils falls back
//      to Math.random() (non-deterministic).
//
//   3. effectiveCount — If the seed matches the easter-egg
//      validator (_v), override the count to 1000 so the
//      pity system gives the highest tier.
//      Otherwise, pass through the caller's generationCount.
//
//   4. CharacterGenerator.generate() — Delegates to the full
//      pipeline: level → age → race/role → stats → lore →
//      inventory → backstory. Returns a frozen Character.
//
//   5. setSeed(null) — If we were in seeded mode, reset the
//      PRNG back to Math.random() so subsequent non-seeded
//      calls aren't accidentally deterministic.
// ------------------------------------------------------------
export const generateCharacter = (options: GenerationOptions = {}): Character => {
    const safeSeed = options.seed ? normalizeCharacterSeed(options.seed) : undefined;
    setSeed(safeSeed ?? null);

    const count = options.generationCount ?? 0;
    const effectiveCount = safeSeed && _v(safeSeed) ? 1000 : count;

    try {
        return CharacterGenerator.generate(options.name, effectiveCount);
    } finally {
        if (safeSeed) {
            setSeed(null);
        }
    }
};
