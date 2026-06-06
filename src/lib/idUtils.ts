import { getRandom, isSeededGenerationActive } from './randomUtils';

/**
 * Generates a unique ID string.
 *
 * During SEEDED generation (when a deterministic seed is active), uses the
 * seeded PRNG to produce repeatable IDs. This is critical for the seed contract:
 * same seed must produce the exact same character, including item IDs.
 *
 * Outside seeded generation, uses a 3-tier fallback strategy:
 *   1. crypto.randomUUID (modern browsers)
 *   2. crypto.getRandomValues UUIDv4 polyfill (older browsers)
 *   3. Timestamp + PRNG fallback (SSR / test environments)
 */
export const makeId = (): string => {
    // When a seed is active, ALL randomness must come from the seeded PRNG
    // to maintain determinism. crypto.randomUUID would break the seed contract.
    if (isSeededGenerationActive()) {
        return seededId();
    }

    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
        return crypto.randomUUID();
    }
    if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
        const bytes = new Uint8Array(16);
        crypto.getRandomValues(bytes);
        bytes[6] = (bytes[6] & 0x0f) | 0x40; // version 4
        bytes[8] = (bytes[8] & 0x3f) | 0x80; // variant 1
        const hex = Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
        return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
    }
    // Last-resort fallback (SSR, test runners without crypto)
    return `${Date.now().toString(36)}-${getRandom().toString(36).substring(2, 10)}`;
};

/**
 * Generates a deterministic UUID-like ID from the seeded PRNG.
 * Format: 8-4-4-4-12 hex characters (same shape as UUIDv4).
 */
function seededId(): string {
    const hex = (count: number): string => {
        let result = '';
        for (let i = 0; i < count; i++) {
            result += Math.floor(getRandom() * 16).toString(16);
        }
        return result;
    };

    return `${hex(8)}-${hex(4)}-4${hex(3)}-${(8 + Math.floor(getRandom() * 4)).toString(16)}${hex(3)}-${hex(12)}`;
}
