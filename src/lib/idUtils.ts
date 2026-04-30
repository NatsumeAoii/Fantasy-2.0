import { getRandom } from './randomUtils';

/**
 * Generates a unique ID string.
 * Uses a 3-tier fallback strategy:
 *   1. crypto.randomUUID (modern browsers)
 *   2. crypto.getRandomValues UUIDv4 polyfill (older browsers)
 *   3. Seeded PRNG timestamp fallback (SSR / test environments)
 *
 * Tier 3 uses the seeded getRandom() so IDs remain deterministic
 * when a seed is active — matching the behavior callers expect.
 */
export const makeId = (): string => {
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
