# Character Expansion Engine Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate the new bestiary, identity, magic, mechanics, story, inventory, and world datasets into deterministic character generation without hard-coded probabilities in logic.

**Architecture:** Keep raw authored pools in `src/data`, tunable generation rules in focused `src/config/*Config.ts` files, and deterministic selection logic in `src/logic/*Engine.ts`. Engines return normalized lightweight expansion objects instead of raw dataset records so the frontend can render them consistently later.

**Tech Stack:** TypeScript, Vite, Vitest, existing seeded RNG in `src/lib/randomUtils.ts`, existing character generation entrypoint in `src/lib/generator.ts`.

---

### Task 1: Generic Pool Selection Core

**Files:**
- Create: `src/logic/PoolEngine.ts`
- Test: `src/logic/PoolEngine.test.ts`

- [ ] **Step 1: Write the failing tests**

```ts
import { describe, expect, it } from 'vitest'
import { setSeed } from '../lib'
import { PoolEngine } from './PoolEngine'

describe('PoolEngine', () => {
  it('picks weighted entries without replacement and preserves deterministic seeded output', () => {
    const pool = [
      { id: 'low', name: 'Low', weight: 1 },
      { id: 'mid', name: 'Mid', weight: 5 },
      { id: 'high', name: 'High', weight: 10 },
    ]

    setSeed('pool-seed')
    const first = PoolEngine.pickManyWeighted(pool, 2, (item) => item.weight)
    setSeed('pool-seed')
    const second = PoolEngine.pickManyWeighted(pool, 2, (item) => item.weight)
    setSeed(null)

    expect(first.map((item) => item.id)).toEqual(second.map((item) => item.id))
    expect(new Set(first.map((item) => item.id)).size).toBe(first.length)
  })

  it('uses fallback pools when filters remove every candidate', () => {
    const selected = PoolEngine.pickManyWeighted(
      [{ id: 'fallback', name: 'Fallback', weight: 1 }],
      1,
      (item) => item.weight,
      { fallbackPool: [{ id: 'backup', name: 'Backup', weight: 1 }] },
    )

    expect(selected).toHaveLength(1)
  })
})
```

- [ ] **Step 2: Run test to verify RED**

Run: `npm test -- --run src/logic/PoolEngine.test.ts`

Expected: fails because `PoolEngine` does not exist.

- [ ] **Step 3: Implement `PoolEngine`**

```ts
export const PoolEngine = {
  rollChance(chance: number): boolean,
  pickWeighted<T>(pool: readonly T[], getWeight?: (item: T) => number | undefined): T | undefined,
  pickManyWeighted<T>(pool: readonly T[], count: number, getWeight?: (item: T) => number | undefined, options?: { fallbackPool?: readonly T[]; allowDuplicates?: boolean }): T[],
  clampCount(count: number, poolLength: number, allowDuplicates?: boolean): number,
}
```

- [ ] **Step 4: Run test to verify GREEN**

Run: `npm test -- --run src/logic/PoolEngine.test.ts`

Expected: pass.

---

### Task 2: Expansion Types and Config Split

**Files:**
- Modify: `src/types/index.ts`
- Create: `src/config/poolConfig.ts`
- Create: `src/config/identityConfig.ts`
- Create: `src/config/worldConfig.ts`
- Create: `src/config/magicConfig.ts`
- Create: `src/config/mechanicsConfig.ts`
- Create: `src/config/bestiaryConfig.ts`
- Modify: `src/config/index.ts`
- Test: `src/config/expansionConfig.test.ts`

- [ ] **Step 1: Write failing config/type tests**

```ts
import { describe, expect, it } from 'vitest'
import { BESTIARY_CONFIG, IDENTITY_CONFIG, MAGIC_CONFIG, MECHANICS_CONFIG, POOL_CONFIG, WORLD_CONFIG } from './index'

describe('expansion config', () => {
  it('keeps expansion counts finite and chance values normalized', () => {
    expect(POOL_CONFIG.DEFAULT_WEIGHT).toBeGreaterThan(0)
    expect(IDENTITY_CONFIG.BONDS.COUNT_BY_LEVEL[0].count.min).toBeGreaterThanOrEqual(0)
    expect(WORLD_CONFIG.LANGUAGES.COUNT_BY_LEVEL[0].count.min).toBeGreaterThanOrEqual(1)
    expect(MAGIC_CONFIG.SPELLS.CASTER_ROLE_KEYWORDS.length).toBeGreaterThan(0)
    expect(MECHANICS_CONFIG.FEATS.COUNT_BY_LEVEL[0].count.max).toBeGreaterThan(0)
    expect(BESTIARY_CONFIG.MOUNTS.CHANCE_BY_LEVEL[0].chance).toBeGreaterThanOrEqual(0)
    expect(BESTIARY_CONFIG.MOUNTS.CHANCE_BY_LEVEL[0].chance).toBeLessThanOrEqual(1)
  })
})
```

- [ ] **Step 2: Run config test to verify RED**

Run: `npm test -- --run src/config/expansionConfig.test.ts`

Expected: fails because config files do not exist.

- [ ] **Step 3: Add normalized expansion types**

Add `GeneratedPoolEntry`, `GeneratedIdentity`, `GeneratedWorldContext`, `GeneratedMagic`, `GeneratedMechanics`, `GeneratedBestiary`, and `CharacterExpansions` to `src/types/index.ts`. Add the same expansion properties to `Character`.

- [ ] **Step 4: Add domain configs**

Each config file exports only declarative settings: count brackets, chance brackets, role keywords, tier limits, and fallback defaults. Do not import data pools in config.

- [ ] **Step 5: Run config test to verify GREEN**

Run: `npm test -- --run src/config/expansionConfig.test.ts`

Expected: pass.

---

### Task 3: Domain Engines

**Files:**
- Create: `src/logic/IdentityEngine.ts`
- Create: `src/logic/WorldEngine.ts`
- Create: `src/logic/MagicEngine.ts`
- Create: `src/logic/MechanicsEngine.ts`
- Create: `src/logic/BestiaryEngine.ts`
- Create: `src/logic/CharacterExpansionEngine.ts`
- Test: `src/logic/CharacterExpansionEngine.test.ts`

- [ ] **Step 1: Write failing integration test**

```ts
import { describe, expect, it } from 'vitest'
import { generateCharacter } from '../lib'

describe('CharacterExpansionEngine', () => {
  it('adds deterministic normalized expansions to generated characters', () => {
    const first = generateCharacter({ seed: 'expansion-seed', name: 'Astra' })
    const second = generateCharacter({ seed: 'expansion-seed', name: 'Astra' })

    expect(first.identity.bonds.length).toBeGreaterThan(0)
    expect(first.identity.quirks.length).toBeGreaterThan(0)
    expect(first.world.languages.length).toBeGreaterThan(0)
    expect(first.mechanics.feats.length).toBeGreaterThan(0)
    expect(first.magic.spells.length).toBeGreaterThanOrEqual(0)
    expect(first.bestiary).toHaveProperty('mount')
    expect(first.identity).toEqual(second.identity)
    expect(first.world).toEqual(second.world)
    expect(first.magic).toEqual(second.magic)
    expect(first.mechanics).toEqual(second.mechanics)
    expect(first.bestiary).toEqual(second.bestiary)
  })
})
```

- [ ] **Step 2: Run integration test to verify RED**

Run: `npm test -- --run src/logic/CharacterExpansionEngine.test.ts`

Expected: fails because expansion fields and engines do not exist.

- [ ] **Step 3: Implement domain engines**

Each engine imports its relevant `src/data` pools, applies config-driven eligibility/count rules, normalizes results to `GeneratedPoolEntry`, and uses `PoolEngine` for all random selection.

- [ ] **Step 4: Add orchestration**

`CharacterExpansionEngine.generate(character)` returns `{ identity, world, magic, mechanics, bestiary }` and `CharacterGenerator.generate()` merges those fields onto the frozen `Character`.

- [ ] **Step 5: Run integration test to verify GREEN**

Run: `npm test -- --run src/logic/CharacterExpansionEngine.test.ts`

Expected: pass.

---

### Task 4: Full Verification and Commit

**Files:**
- All files touched above.

- [ ] **Step 1: Run full test suite**

Run: `npm test`

Expected: all tests pass.

- [ ] **Step 2: Run lint**

Run: `npm run lint`

Expected: exit code 0.

- [ ] **Step 3: Run production build**

Run: `npm run build`

Expected: exit code 0. Existing Vite large-chunk warning is acceptable.

- [ ] **Step 4: Stage only relevant files**

Stage docs, config, logic, type, and test files. Leave unrelated dirty files such as `package-lock.json` and `src/routeTree.gen.ts` unstaged unless the implementation legitimately changes them.

- [ ] **Step 5: Commit**

Run: `git commit -m "feat: add character expansion engines"`

Expected: focused commit containing only the expansion-engine work.

---

## Self-Review

- Spec coverage: Covers config split, fair pooled selection, deterministic logic engines, character integration, and verification.
- Placeholder scan: No implementation task depends on unspecified files or undefined public APIs.
- Type consistency: Domain engines all return normalized `GeneratedPoolEntry` collections through `CharacterExpansions`.
