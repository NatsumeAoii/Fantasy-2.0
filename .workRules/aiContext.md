# AI Context Rules

Rules for any AI assistant working on this codebase. Read these before making changes.

---

## Project Overview

This is **Aetheris**, a grim high-fantasy RPG character/inventory generation engine built with TypeScript + Vite + React. The codebase consists of:

- **`src/data/`** — Static data files (items, creatures, lore, identity traits). These are hand-curated datasets, not generated at runtime. They feed into procedural generation engines.
- **`src/config/`** — Runtime configuration (tier ranges, rarity maps, generation probabilities). The **authoritative** source for how data is consumed.
- **`src/logic/`** — Procedural generation logic that combines data + config to produce characters, inventories, and encounters.
- **`src/components/`** — React UI components for displaying generated outputs.

---

## Architecture: Tier Systems

There are **two** tier systems. Understanding the distinction is critical.

### 1. Data-File Tier System (6 tiers)

All tiered data files (materials, consumables, enchantments, mounts) use exactly **6 tiers**:

| Tier | Rarity Label | Potion Prefix | Notes |
|------|-------------|---------------|-------|
| 1 | Common | minor | Baseline items |
| 2 | Uncommon | lesser | Modest upgrade |
| 3 | Rare | standard | Reliable mid-tier |
| 4 | Epic | greater | Strong, noticeable |
| 5 | Legendary | superior | Expert-grade |
| 6 | Mythic | ultimate | Pinnacle of static data |

### 2. Runtime Rarity System (8 tiers)

`src/config/inventoryConfig.ts` defines 8 rarity tiers for procedural generation:

| Tier | Label | Level Range |
|------|----------|------------|
| 1–6 | Same as data-file system | 1–2999 |
| 7 | DIVINE | 3000+ |
| 8 | ARTIFACT | 3000+ |

Tiers 7–8 are **procedural-only** and have no static data entries. They are generated at runtime for extreme-level characters.

---

## Type Architecture: `VariantDef` and Extensions

The base interface for all item variants is `VariantDef` in `src/data/inventory/types.ts`:

```typescript
interface VariantDef {
    name: string;
    desc: string;
    price?: number;
    duration?: number;
    cooldown?: number;
}
```

Items with **mechanical stats** use dedicated extension interfaces, also defined in `types.ts`:

| Interface | Discriminant | Used By |
|-----------|-------------|---------|
| `RestoreStats` | `type: 'restore'` | HP/MP/Stamina potions |
| `AntidoteStats` | `type: 'antidote'` | Antidote potions |
| `OilStats` | `type: 'oil'` | Weapon oils/coatings |
| `ResistanceStats` | `type: 'resistance'` | Fire/Frost resistance |
| `BuffStats` | `type: 'buff'` | Strength/Invisibility |

These are wrapped in a `PotionStats` discriminated union and attached to `ConsumableDef` via its `potionStats` field.

Mounts extend differently: `MountVariantDef extends VariantDef` with a `baseStats: MountBaseStats` field.

**Rule**: Do not add stat fields to `VariantDef` itself. Create a new extension interface.

---

## Stat Progression Rules

All tiered data must follow these constraints:

1. **Monotonically increasing** from tier 1 to tier 6 (prices, stats, effects).
2. **Price ratio** between adjacent tiers: minimum 1.5x, maximum 3x (approximate geometric progression ~1.7x–2.5x).
3. **No stat runaway**: highest-tier values should feel powerful but not absurd relative to the game's scale.
4. **Potion stats** use a 2x geometric base (e.g., 25→50→100→200→400→800 for health potions) with optional `percentRestore` added at tier 4+.

---

## Description Quality Guardrails

LLM-generated descriptions are prone to **text degeneration** — adverb stacking, filler padding, and loss of meaning. All variant descriptions must follow:

- **Max 150 characters** per `desc` field.
- **Max 2 adverbs per sentence**. Chains like "utterly completely totally" are banned.
- **No abstract filler**. Use concrete, sensory adjectives: "corroded", "blood-crusted", "flaking" — not "very very powerful".
- **Each description must be unique** within its parent group.
- **Tone**: grim, visceral, darkly humorous. No whimsy, no modern slang, no sci-fi.

### Banned Words

`laser`, `plasma`, `nuclear`, `motorized`, `digital`, `computer`, `universe`, `galaxy`, `nebula`, `supernova`, `asteroid`, `space`, `quantum`, `cyber`, `circuit`, `reactor`, `internet`, `virus`

---

## Variant Count Standards

| Data Type | Variants per Entry |
|-----------|-------------------|
| Weapons, Armors, Accessories, Enchantments | 15 |
| Consumable potions | 3 per tier |
| Consumable food, tools, trophies, etc. | 15 |
| Materials | 15 per group per tier |
| Mounts, Pets, Summons | 10 |
| Cuisine | 10 |
| Instruments | 15 |
| Merchandise | 6–8 |

---

## File Organization

- **No cross-domain data duplication**. Phobias live in `phobiasManias.ts`, not `quirks.ts`.
- **Source of truth files**: `roles.ts` (229 roles), `races.ts` (65 races), `inventoryConfig.ts`.
- **All references** to roles/races must exist in the source files.
- **IDs**: `snake_case`. **Names**: `Title Case`.
- **Strings**: single quotes. Escape apostrophes with `\'`.

---

## Mount Data Structure

Each mount entry has this shape:

```typescript
interface MountDef {
    id: string;
    name: string;
    variants: MountVariantDef[];  // Exactly 10 variants
    baseStats: MountBaseStats;    // Group baseline: hp, ac, str, dex, con
    mountClass: MountClass;       // BEAST | MAGICAL | UNDEAD | AQUATIC | AERIAL | MYTHIC | CONSTRUCT | DRACONIC
    availability: MountAvailability;  // ALL_ROLES | ALL_RACES | SPECIFIC_ROLE | SPECIFIC_RACE
    tier: MountTier;              // 1–6
    icon: string;
    rarity: string;               // Common | Uncommon | Rare | Epic | Legendary | Mythic
    validRoles?: string[];        // Required if SPECIFIC_ROLE
    validRaces?: string[];        // Required if SPECIFIC_RACE
}
```

There are **4 availability categories** × **6 tiers** = **24 mount groups**, each with **10 variants** = **240 total mount variants**.

---

## Consumable (Potion) Data Structure

Potions are organized as 9 potion families × 6 tiers = 54 entries. Each entry has:

- `id`, `name`, `variants` (3 per tier), `type: 'POTION'`, `icon`, `description`, `weight`
- `baseDuration?` (for timed effects like oils, resistance, buffs)
- `baseCooldown` (shared cooldown in seconds)
- `potionStats` — discriminated union with mechanical values

Potion families: Health, Mana, Stamina, Antidote, Weapon Oil, Fire Resistance, Frost Resistance, Invisibility, Strength.

---

## Before Making Changes

1. Run `npx tsc --noEmit` to verify the build passes.
2. Check variant counts match the standards above.
3. Verify all descriptions are under 150 chars with no adverb stacking.
4. Ensure tiered data has monotonically increasing prices and stats.
5. Cross-reference role/race names against source-of-truth files.
6. Do not add tiers 7–8 to static data files. Those are runtime-only.
7. Do not modify `VariantDef` base interface without updating all consumers.
