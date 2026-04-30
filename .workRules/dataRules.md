# Data Rules

Rules for editing or creating anything under `src/data/`.

---

## Theme

- High-fantasy medieval, fantasy only. No modern, sci-fi, or real-world terms.
- Banned words: `laser`, `plasma`, `nuclear`, `motorized`, `digital`, `computer`, `universe`, `galaxy`, `nebula`, `supernova`, `asteroid`, `space`, `quantum`, `cyber`, `circuit`, `reactor`, `internet`, `virus`, and other futuristic, modern, sci-fi terms.
- No real-world names. Invent fantasy equivalents.
- Tone: gritty, visceral, darkly humorous.
- **No other-game terminology.** Aetheris is NOT D&D, Pathfinder, or any other system. See Terminology Standard below.

---

## All Data

- Must have a typed `interface` and a typed `const` export.
- IDs: `snake_case`. Names: `Title Case`.
- No duplicate IDs or names within a file.
- Descriptions: minimum 10 words, present tense, self-contained.
- Single quotes for strings. Escape apostrophes with `\'`.
- No properties that don't exist on the interface.

---

## Description Quality

Guardrails to prevent LLM text degeneration in data descriptions.

- **Maximum 150 characters** per variant `desc` field.
- **No adverb stacking**: maximum 2 adverbs per sentence. Chains of 3+ consecutive adverbs (e.g. "utterly completely totally") are forbidden.
- **No self-referential comments**: no debug notes, generation session commentary, or meta-text in production data.
- **No filler padding**: descriptions must convey unique, specific information. Generic padding like "very very very" is forbidden.
- **Each description must be unique** within its parent group. No copy-paste with trivial word swaps.
- **Tone check**: every description should evoke the gritty, visceral world. Adjectives should be concrete (corroded, flaking, blood-crusted) not abstract chains.

---

## Tier System — Data Files (6-Tier Standard)

All tiered data (materials, consumables, enchantments, mounts, etc.) uses a **6-tier** progression:

| Tier | Numeric | Rarity Label | Potion Label | Spell Level |
|------|---------|-------------|--------------|-------------|
| 1    | 1       | Common      | crude        | Petty       |
| 2    | 2       | Uncommon    | common       | Novice      |
| 3    | 3       | Rare        | standard     | Adept       |
| 4    | 4       | Epic        | potent       | —           |
| 5    | 5       | Legendary   | masterwork   | Master      |
| 6    | 6       | Mythic      | sovereign    | —           |

- Prices and stats **must increase monotonically** from tier 1 → 6.
- Price curves should follow an approximate geometric progression (~1.7x–2.5x per tier). Exact 2x is not required, but the ratio between adjacent tiers must not exceed 3x or drop below 1.5x.
- The ratio pattern should be **consistent across items of the same type** (e.g. all potions follow the same curve shape).
- Tier-6 (Mythic) items may be **obtainable-only** (no `price` field) where appropriate. This signals the item cannot be purchased and must be earned through quests, events, or other non-monetary means.

---

## Pricing Standard

All item prices are denominated in **Gold** (the second-highest coin in the Aetheris currency hierarchy).

### Where prices live

| Field | Location | Type | Purpose |
|-------|----------|------|--------|
| `price` | `VariantDef.price` | `number?` | Per-variant price override in Gold. |
| `basePrice` | Parent interface (e.g. `Instrument.basePrice`, `Merchandise.basePrice`) | `number` | Fallback price when no variant override exists. |

- Items without `price` or `basePrice` derive their value at runtime (weapons, armors, accessories, cuisine, recipes, quickslots, artifacts).
- When both `basePrice` and variant `price` exist, variant `price` takes precedence.

### Banned currency shorthands

- **`gp`**, **`sp`**, **`cp`** — These are D&D shorthand. Use full Aetheris denomination names: Gold, Silver, Copper, Crown, Shard.
- **`gold pieces`** — Use simply "gold" when referring to the currency in prose.

### Currency Denominations (do not modify)

| Denomination | Relative to Gold | Shards per Unit |
|-------------|-----------------|----------------|
| Shard | 1/100,000 Gold | 1 |
| Copper | 1/10,000 Gold | 10 |
| Silver | 1/100 Gold | 1,000 |
| Gold | 1 Gold | 100,000 |
| Crown | 1,000 Gold | 100,000,000 |

Source of truth: `src/data/inventory/currency.ts`. Denominations and exchange rates are frozen.

---

## Tier System — Runtime Config (8-Tier Rarity)

`inventoryConfig.ts` defines an **8-tier** rarity system for procedural item generation:

| Tier | Label    | Level Pool | Notes |
|------|----------|-----------|-------|
| 1    | COMMON   | 1–25      | Standard equipment |
| 2    | UNCOMMON | 26–69     | Standard equipment |
| 3    | RARE     | 70–100    | Standard equipment |
| 4    | EPIC     | 70–100    | Standard equipment |
| 5    | LEGENDARY| 101–499   | High-tier equipment |
| 6    | MYTHIC   | 101–499   | High-tier equipment |
| 7    | DIVINE   | 3000+     | End-game procedural only |
| 8    | ARTIFACT | 3000+     | End-game procedural only |

- Tiers 7–8 (DIVINE/ARTIFACT) are **not represented in static data files**. They are generated procedurally at runtime for characters at extreme levels.
- Static data files cap at tier 6 (Mythic).
- The `RARITY.TIER_MAP` in `inventoryConfig.ts` is the authoritative source of truth for tier-to-label mapping during generation.

---

## Stat-Bearing Item Interfaces

Items with quantitative gameplay effects must use **dedicated stat interfaces** rather than cramming stats into the base `VariantDef`.

### Consumable Stats (Discriminated Union)

`ConsumableDef` has an optional `potionStats: PotionStats` field using a discriminated union:

```
PotionStats = { type: 'restore',    stats: RestoreStats }    — HP/MP/Stamina
            | { type: 'antidote',   stats: AntidoteStats }   — Poison cures
            | { type: 'oil',        stats: OilStats }        — Weapon coatings
            | { type: 'resistance', stats: ResistanceStats } — Elemental resist
            | { type: 'buff',       stats: BuffStats }       — Stat buffs
```

### Mount Stats (Interface Extension)

```
MountVariantDef extends VariantDef {
    baseStats: MountBaseStats;  // hp, ac, str, dex, con, speed
}
```

### Pet Stats (Interface Extension)

```
PetVariantDef extends VariantDef {
    passiveBonus?: { stat: string; value: number };
}
```

### Summon Stats (Interface Extension)

```
SummonVariantDef extends VariantDef {
    baseDamage: number;
    baseHP: number;
    element?: 'fire' | 'frost' | 'lightning' | 'necrotic' | 'radiant' | 'poison' | 'arcane' | 'shadow' | 'physical' | 'psychic';
}
```

- Keep `VariantDef` lean — it is the universal base for items without numeric stats (weapons, armors, accessories, merchandise, instruments, quickslots).
- All stat interfaces are defined in `src/data/inventory/types.ts`.
- Files using extensions must import and annotate the correct type.

---

## Living Beings (mounts, pets, summons, etc.)

Must have: `id`, `name`, `variants` (exactly 10), `tier` (1–6), `rarity`, `availability`, class type, `icon`, and relevant stats.

- Mounts: `baseStats` (hp, ac, str, dex, con, speed) at group and variant level.
- Pets: `groupBonus` (structured `{ stat, value, type }`) at group level, `passiveBonus` at variant level. Also `diet` and `baseMorale`.
- Summons: `baseDamage`, `baseHP`, optional `element` at variant level. Also `duration` and `manaCost` at group level.

- 24 entries per file: 4 availability axes × 6 tiers.
- Tier-to-rarity mapping follows the 6-tier standard above.
- Prices scale with tier.
- `SPECIFIC_ROLE` requires `validRoles`. `SPECIFIC_RACE` requires `validRaces`.
- All role/race references must exist in source-of-truth files (`roles.ts`, `races.ts`).

---

## Lore (deities, customs, landmarks, history, languages)

Must have: `name`, `description`, and a type/category classifier.

- Must be internally consistent with existing world entries.
- Deities: add `domains`, `alignment`, `symbol`.
- Customs: add `associatedRaceOrFaction`, `type`.
- No contradictions with established lore.

---

## Character Identity (bonds, quirks, secrets, phobias/manias)

Must have: `name`, `description`, and a type/severity/target classifier.

- Bonds: first-person narrative, 10 target pillars, 2 entries per pillar, 10 variants each. No prices.
- Phobias/manias: requires `trigger`. This is the sole home for all fears and compulsions.
- No overlap between quirks, phobias, and personality traits.

---

## Game Mechanics (afflictions, feats, crimes, martial arts, achievements)

Must have: `name`, a category type, and a mechanical effect/description.

- Afflictions: add `transmission`, `effect`, `cure`.
- Feats: add `prerequisite` (or `null`), `benefit`.
- Crimes: add `severity`, `typicalPunishment`, `bountyRange`.
- Each entry must be mechanically distinct.

---

## Magic (spells, hazards)

Must have: `name`, `type`/`school`, a power level or damage type, `description`.

- Spells: one of 8 schools (see Terminology Standard), one of 4 levels (Petty/Novice/Adept/Master).
- Hazards: Environmental, Magical, or Mechanical Trap.
- Spells map to the 6-tier rarity as: Petty=T1, Novice=T2, Adept=T3, Master=T5. Tiers 4 and 6 are not used for spell levels.

---

## Items (armors, weapons, consumables, materials, etc.)

Must have: `name`, `desc`.

- Base variants follow `VariantDef` shape (`name`, `desc`, `price?`, `duration?`, `cooldown?`).
- Stat-bearing variants use their dedicated extension interface (see Stat-Bearing Item Interfaces above).
- No extra properties on variants beyond what the interface defines.

### Weapon Stats

`WeaponDef` includes combat stats:

| Field | Type | Purpose |
|-------|------|---------|
| `baseDamage` | `number` | Raw damage before modifiers |
| `damageType` | `DamageType` | `slashing` / `piercing` / `bludgeoning` / `arcane` |
| `attackSpeed` | `AttackSpeed` | `very_slow` / `slow` / `normal` / `fast` / `very_fast` |
| `reach` | `WeaponReach` | `melee` / `extended` / `ranged` |
| `durability` | `number` | Maximum durability points before breaking |

Weapon types: `sword`, `dagger`, `mace`, `wand`, `axe` (1H); `greatsword`, `greataxe`, `spear`, `staff` (2H melee); `bow`, `crossbow` (2H ranged).

### Armor Stats

`ArmorDef` includes defensive stats:

| Field | Type | Purpose |
|-------|------|---------|
| `baseDefense` | `number` | Flat damage reduction |
| `movementPenalty` | `number` | Movement speed reduction (%) |
| `stealthPenalty` | `number` | Stealth check penalty (%) |
| `noiseLevel` | `NoiseLevel` | `silent` / `quiet` / `normal` / `loud` / `very_loud` |
| `durability` | `number` | Maximum durability points before breaking |

Penalty scaling: LIGHT = 0 penalties, MEDIUM = minor, HEAVY = significant.

### Accessory Stats

`AccessoryDef` includes:

| Field | Type | Purpose |
|-------|------|---------|
| `effect` | `AccessoryEffect` | `{ stat, value, type: 'flat'\|'percent' }` |
| `durability` | `number` | Maximum durability points |
| `slot` | `string` | `NECK` / `RING` / `WAIST` / `EAR` |

### Container Stats

`ContainerDef` includes:

| Field | Type | Purpose |
|-------|------|---------|
| `capacity` | `number` | Weight capacity bonus in kg |
| `extraSlots` | `number` | Bonus inventory slots |
| `durability` | `number` | Maximum durability points |

Container slots: `BACK` (backpacks, quivers), `BELT` (pouches, scroll cases), `MOUNT` (saddlebags).

### Enchantment Stats

`Enchantment` includes:

| Field | Type | Purpose |
|-------|------|---------|
| `baseCost` | `number` | Gold cost to apply the enchantment |
| `statBonus` | `{ stat, value }` | Specific stat granted by the enchantment |

Cost scales with rarity: Common ~50-100, Uncommon ~150-250, Rare ~800-1200, Epic ~3000-4000, Legendary ~5000-20000, Mythic ~15000-25000.

### Consumable Types

`ConsumableType` union includes: `POTION`, `TOOL`, `FOOD`, `INGREDIENT`, `TROPHY`, `SCROLL`, `VALUABLE`, `AMMO`, `INSTRUMENT`, `LITERATURE`, `ARCANA`, `MISC`, `TRAP`, `BOMB`, `SALVE`, `POISON`.

### Recipe Crafting Tie-In

`Recipe` includes:

| Field | Type | Purpose |
|-------|------|---------|
| `craftingStation` | `CraftingStation` | Required station type |
| `craftingTime` | `number` | Time in seconds to craft |
| `outputQuantity` | `number` | Number of items produced |

Stations: `anvil`, `forge`, `alchemy_bench`, `enchanting_altar`, `campfire`, `workbench`, `tanning_rack`, `fletching_table`.

### Variant Count Standards

| File Type | Variants per Entry | Notes |
|-----------|--------------------|-------|
| Weapons, Armors, Accessories, Enchantments | 15 | Per item/type |
| Consumables (potions) | 3 | Per potion type per tier |
| Consumables (food) | 15 | Per food type |
| Materials | 15 | Per group per tier |
| Mounts | 10 | Per mount group |
| Cuisine | 10 | Per dish |
| Instruments | 15 | Per instrument |
| Merchandise | 6–8 | Per trade category (intentional exception) |
| Quickslots | 15 | Per slot type |
| Containers | 15 | Per container type |

### Intentional Exceptions (No Tier System)

- **Weapons/Armors**: No `price` or `tier` on variants. Rarity and condition are derived at runtime via `inventoryConfig.ts` TIER_RANGES, RARITY.TIER_MAP, and GRADE_BY_LEVEL.
- **Cuisine**: Flat list organized by type (Ration/Tavern Fare/Beverage/etc.). Serves flavor/roleplay, not power scaling.
- **Merchandise**: Organized by trade category. Variant counts are 6–8, not 15.
- **Instruments**: No tier system. Organized by category (String/Wind/Percussion/Keyboard/Tool).
- **Quickslots**: No tier system. Organized by slot type (Throwable/Torch/Potion/Food).
- **Artifacts**: Grammar fragments for procedural name generation. No tier or stat structure.
- **Recipes**: Flat crafting blueprints. No tier system. Materials referenced by name string.

---

## Terminology Standard

Aetheris uses its own terminology. Do NOT use terms from D&D, Pathfinder, or other tabletop/video game systems.

### Banned Terms → Aetheris Equivalents

| Banned (D&D / Other) | Aetheris Term | Context |
|---------------------|---------------|----------|
| Evocation | **Destruction** | Spell school |
| Abjuration | **Warding** | Spell school |
| Conjuration | **Summoning** | Spell school |
| Necromancy | **Death Magic** | Spell school |
| Transmutation | **Alchemy** | Spell school |
| Divination | **Scrying** | Spell school |
| Enchantment | Enchantment | Kept — standard English |
| Illusion | Illusion | Kept — standard English |
| Cantrip | **Petty** | Spell level |
| Darkvision | **Nightsight** | Racial/magical ability |
| Saving Throw | **Resistance Check** | Mechanic |
| Armor Class | **Defense Rating** | Stat description |
| `gp` / `sp` / `cp` | Gold / Silver / Copper | Currency |
| `gold pieces` | **gold** | Currency prose |
| Lawful Good | **Order / Benevolent** | Deity alignment |
| Neutral Good | **Balance / Benevolent** | Deity alignment |
| Chaotic Good | **Chaos / Benevolent** | Deity alignment |
| Lawful Neutral | **Order / Impartial** | Deity alignment |
| Neutral | **Balance / Impartial** | Deity alignment |
| Chaotic Neutral | **Chaos / Impartial** | Deity alignment |
| Lawful Evil | **Order / Malevolent** | Deity alignment |
| Neutral Evil | **Balance / Malevolent** | Deity alignment |
| Chaotic Evil | **Chaos / Malevolent** | Deity alignment |

### Spell Schools (8 total)

`Destruction` · `Warding` · `Summoning` · `Death Magic` · `Alchemy` · `Scrying` · `Enchantment` · `Illusion`

Source of truth: `SpellSchool` type in `src/data/magic/spells.ts`.

**Target Balance**: minimum 8 spells per school, distributed across all four levels (Petty, Novice, Adept, Master).

### Spell Components

Every spell must declare a `components: SpellComponent[]` array. Valid component types:

| Type | Meaning | Example |
|------|---------|---------|
| `verbal` | Spoken word, incantation, or command | A guttural bark of ignition |
| `somatic` | Physical gesture or body motion | Arms swept in a wide protective circle |
| `material` | Consumed or displayed reagent | A pinch of sulfur dust |
| `focus` | Reusable channeling object (not consumed) | A brass summoning circle |
| `blood` | HP-cost component, drawn from the caster | An open wound on the palm |

- Every spell must have at least 1 component.
- Material components provide crafting/economy tie-ins.
- Blood components are exclusive to `Death Magic` school and blood-magic cross-school spells.

### Resist Checks

Every spell must declare a `resistCheck: ResistType` field. Valid values:

| ResistType | Governs | Typical Schools |
|------------|---------|-----------------|
| `willpower` | Mental fortitude, ego, resolve | Enchantment, Illusion, Scrying |
| `fortitude` | Physical toughness, constitution | Death Magic, Destruction (thunder/cold) |
| `reflex` | Agility, dodge, spatial awareness | Destruction (fire/lightning), Summoning (terrain) |
| `none` | Self-buffs, non-hostile utility | Warding, Alchemy (self-targets) |

### Counter Schools

Every spell must declare a `counterSchool: SpellSchool | null`. This determines which school can neutralize the spell via counter-casting. General counter relationships:

| School | Countered By | Rationale |
|--------|-------------|-----------|
| Destruction | **Warding** | Protective wards absorb destructive force |
| Warding | **Destruction** | Raw force overwhelms defensive barriers |
| Summoning | **Warding** | Wards seal gates and banish conjurations |
| Death Magic | **Scrying** | Divination reveals and purifies necrotic ties |
| Scrying | **Illusion** | False images and misdirection foil divination |
| Enchantment | **Scrying** | Awareness of mental intrusion breaks the hold |
| Illusion | **Scrying** | True sight pierces all deceptions |
| Alchemy | **Warding** | Wards stabilize transmuted matter |

Master-level spells may have `counterSchool: null` (too powerful for standard countering).

### Deity Alignment Axes

Two axes: **Ethos** (`Order` / `Balance` / `Chaos`) × **Morality** (`Benevolent` / `Impartial` / `Malevolent`).

Format: `"Ethos / Morality"` (e.g., `"Order / Benevolent"`).

Source of truth: `Deity.alignment` in `src/data/world/deities.ts`.

### Stat Modifier Format

Do NOT use D&D-style `"+2 Perception (Sight/Hearing)"` strings. Use structured objects:

```
groupBonus: { stat: 'awareness', value: 2, type: 'flat' }
passiveBonus: { stat: 'stealth', value: 3 }
```

All stat names must be lowercase, snake_case Aetheris originals. Valid stat names include:
`tracking`, `stealth`, `awareness`, `cunning`, `lore`, `menace`, `endurance`, `streetwise`, `spelunking`, `woodcraft`, `nightsight`, `resistance`, `evasion`, `power`, `elemental_resistance`, `curse_resistance`, `poison_resistance`, `mental_ward`, `death_ward`, `planar_anchor`, `draconic_aura`.

### Generic English OK

Words like "transmutation", "conjuration", "divination", "necromancy" may appear in skill names, title names, and prose descriptions as standard English vocabulary. They are only banned as **spell school labels** (use the Aetheris equivalents above).

---

## Source of Truth

- **`roles.ts`** (229 roles) — only valid role names.
- **`races.ts`** (65 races) — only valid race names.
- **`inventoryConfig.ts`** — authoritative tier-to-rarity mapping and level-to-tier ranges.
- Add to the source file first, then reference.

---

## No Duplication

- Phobias go in `phobiasManias.ts`, not `traits.ts` or `quirks.ts`.
- Deity definitions go in `deities.ts`, not `bonds.ts`.
- Faction definitions go in `factions.ts`, not `bonds.ts`.
- The more specialized module owns the data.

---

## Before You Commit

- [ ] No banned terms or real-world references
- [ ] All role/race references exist in source-of-truth files
- [ ] No duplicate IDs, names, or cross-file data
- [ ] Apostrophes escaped, interface followed, file compiles
- [ ] All descriptions under 150 characters, no adverb stacking
- [ ] Tiered data has exactly 6 tiers with monotonically increasing prices/stats
- [ ] Stat-bearing items use the correct dedicated interface extension
- [ ] Price ratios between adjacent tiers are within 1.5x–3x range
- [ ] No `gp`/`sp`/`cp` shorthand or `gold pieces` — use Aetheris denomination names
- [ ] `basePrice` is `number` type (Gold), not a string with unit suffix
- [ ] No D&D terminology — spell schools, stat formats, and alignments use Aetheris equivalents (see Terminology Standard)
- [ ] Stat modifiers use structured objects, not `"+N Stat"` strings
