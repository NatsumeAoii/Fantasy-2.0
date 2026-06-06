# Changelog

All notable changes to Aetheris Character Forge are documented here.

The project follows semantic versioning where practical:

- Major versions cover breaking generation output, data shape, route, or storage changes.
- Minor versions cover new features, generated data, and UI areas.
- Patch versions cover fixes, documentation, performance work, and internal refactors.

## [6.0.1] - 2026-06-07

### Added

- Added `CONTRIBUTING.md` with structured guidelines for code style, data contributions, testing expectations, PR workflow, and architecture decisions.
- Added `SECURITY.md` with security policy covering supported versions, private vulnerability reporting process, expected response timeline, scope, and deployer considerations.
- Added Q&A section to `README.md` covering 8 grounded developer questions: no backend rationale, deterministic generation, tier systems, adding data, hash routing, localStorage keys, legacy folder, and manual chunks.
- Added live deployment URL prominently at the top of `README.md`.
- Added collapsible `<details>` blocks to README troubleshooting section for improved readability.
- Added architecture flow diagram showing the full generation pipeline from route to frozen Character object.
- Added explicit localStorage key documentation (`aetheris-preferences`, `aetheris-history`) in README configuration section.
- Added centralized inventory slot metadata and runtime inventory move validation.
- Added `src/store/` infrastructure: `historyStore`, `preferencesStore`, `actionLog`, `eventBus`, `selectors`, `characterAnalyzer`, `equipmentOptimizer`, `buildPlanner`, and a barrel `index.ts`.
- Added `useCharacterPage` hook (moved from `src/hooks/` to `src/store/`) encapsulating generation trigger, export, share, inventory move, and navigation side-effects.
- Added `AppMenu` component extracted from `TopTabs`, isolating application menu logic (visual settings, about, license, credits) into its own file.
- Added `ErrorBoundary` component wrapping the character sheet tab panel area — render errors in any panel now show a recovery UI instead of blanking the app.
- Added `src/vite-env.d.ts` declaring `VITE_APP_VERSION` for typed build-time version injection.
- Added `public/favicon.svg` (project-specific forge/anvil icon) replacing the Vite default placeholder.
- Added `public/og-image.svg` as a placeholder Open Graph image for social sharing.
- Added Open Graph, Twitter Card, `<meta name="description">`, and `<link rel="canonical">` to `index.html`.
- Added `description`, `engines` (`>=22.0.0`), and `test:coverage` script to `package.json`.
- Added `DEFENSE_MITIGATION` config block to `statsConfig.ts` with `K_BASE`, `K_PER_LEVEL`, `EVASION_MISS_CHANCE_CAP`, `SUSTAIN_REDUCTION_CAP`, and `LIFESTEAL_DPS_FRACTION` — defense, evasion, and sustain now mechanically reduce effective DPS.
- Added `attackSpeed` soft cap (`cap: 500, severity: 0.8`) to `STAT_SOFT_CAPS` — previously uncapped and reached 30,000+ at max level.
- Added dev-only startup validation in `statsConfig.ts` that checks every stat in `STAT_CATEGORIES` exists in `BASE_STAT_GROWTH_FACTORS` or `DERIVATION_FORMULAS`.
- Added `CONSUMABLE_TYPE_BY_ID` pre-built Map in `InventoryMoveEngine` replacing an O(n) `.find()` call on every drag interaction.
- Added `RARITY_PRICE_MULTIPLIERS` as a module-level constant in `InventoryEngine` (was re-created per call).
- Added `src/logic/inventory/` subdirectory grouping all 10 inventory logic files with a barrel `index.ts`.
- Added `src/types/potionStats.ts` as the canonical home for `PotionStats` and related stat interfaces, fixing a dependency inversion where `src/types/index.ts` imported from `src/data/`.
- Added `as const satisfies InventoryExpansionConfigShape` to `inventoryExpansionConfig.ts` for compile-time structural validation.
- Added generation timeout (15 seconds) to `characterStore.generate()` — a hung dynamic import no longer leaves the loading spinner spinning forever.
- Added `shell: bash` to all `run:` steps in the CI workflow.
- Added `retention-days: 1` to the Pages artifact upload step.
- Added explicit `permissions: contents: read` to the CI `build` job.
- Added 33 new tests across `StatEngine`, `historyStore`, and `usePersistedTab` (58 test files / 176 tests total, up from 55 / 143).
- Added `src/store/useCharacterPage.ts` test coverage via updated `characterInventoryRoute.test.ts`.

### Changed

- Rewrote `README.md` with clearer project layout, expanded architecture overview, explicit test directory structure, and contributing reference to the new `CONTRIBUTING.md`.
- Updated `CODE_OF_CONDUCT.md` security reports section to link to the new `SECURITY.md` instead of vague guidance.
- `critChance` soft cap severity raised from `0.5` to `0.9` (near-hard cap at 50) — raw values above 50 were contributing meaningless noise since the DPS formula already clamps effective crit chance to 100%.
- `critDamageBonus` soft cap severity raised from `0.1` to `0.75` — previous severity was effectively a 10% tax, allowing 1244% crit damage (12× multiplier) at max level.
- `StatEngine.calculateDps()` now accepts `level` and applies defense mitigation (`defense / (defense + K)`), evasion miss chance (capped at 40%), and sustain reduction (`hpRegen` + `lifesteal`, capped at 65% of effective DPS). TTK now scales correctly across all levels instead of collapsing to 5–7 seconds at high levels.
- `PoolEngine.pickManyWeighted()` changed from O(n×k) to O(n+k) by maintaining a running `totalWeight` instead of recalculating via `.reduce()` on every pick iteration.
- `InventoryEngine.getMaterial()` no longer calls `Object.values(MATERIAL_GROUPS).flat()` unconditionally — the fallback array is only built when the requested group is missing.
- `AppMenu.tsx` reads `APP_VERSION` from `import.meta.env.VITE_APP_VERSION` (injected at build time from `package.json`) instead of a hardcoded string literal.
- `vite.config.ts` injects `VITE_APP_VERSION` via `define` and clears hardcoded personal tunnel hostnames from `server.allowedHosts`.
- `OverviewPanel` "Known Techniques" subtitle now derives a label from actual skill composition (`'Arcane Focus'`, `'Warrior-Mage'`, `'Battle Ready'`) instead of always showing `'Battle Ready'`.
- Mana and stamina resource bars in `OverviewPanel` now have `animate-pulse-slow` matching the health bar.
- `TitlesPanel` sort buttons now have `aria-pressed` state for screen reader compatibility.
- `SkillsPanel` and `TitlesPanel` close buttons replaced from raw `✕` Unicode character to proper SVG icons with visible focus rings.
- `LorePanel` backstory paragraph keys changed from `key={index}` to a stable composite key.
- `IdentityRail` mobile compact header now has `role="region"` and `aria-label="Character identity"`.
- `CommandMenu` shortcut hint is now platform-aware (`⌘ K` on Mac, `Ctrl K` elsewhere) and includes an "Export Character Sheet" command.
- `exportAsImage` now reads the active theme from `data-theme` on the document root so light-mode exports use the correct background color. Anchor element is appended to the DOM before clicking and removed after (Safari compatibility). Removed no-op `quality` option (PNG ignores it).
- CI workflow top-level `permissions: contents: read` replaced with `permissions: {}` (deny all) with explicit per-job grants.
- CI workflow runner pinned from `ubuntu-latest` to `ubuntu-24.04` on both jobs.
- CI workflow `actions/checkout@v6` and `actions/setup-node@v6` corrected to `@v4` (v6 does not exist — would have caused every CI run to fail).
- `.workRules/aiContext.md` updated to reference `src/logic/` instead of the non-existent `src/engine/`.

### Fixed
- Fixed `inventoryContextItems.addInventoryContextItemsToSatchel()` silently discarding existing backpack items when context items were added — existing items are now retained in remaining capacity slots.
- Fixed `normalizeRarity()` in `inventoryContextItems.ts` silently defaulting numeric tier values (e.g. `3`) to `'COMMON'` — numeric tiers are now correctly mapped to their rarity labels via `NUMERIC_TIER_TO_RARITY`.
- Fixed `SkillsPanel` and `TitlesPanel` registering a redundant `keydown` listener for Escape alongside `useFocusTrap` (which already handles it) — duplicate listener removed.
- Fixed `LoreEngine.assignRaceAndRole()` silently degrading to `'Human'/'Warrior'` when data failed to load — now logs a dev warning.
- Fixed `setSeed()` in `randomUtils.ts` iterating over arbitrarily long seed strings — capped at 512 characters as defense-in-depth.
- Fixed `inventoryConfig.ts` `CONTAINER_MODIFIERS` cast and `POTION_TIER_RANGES` cast to use proper typed assertions.
- Fixed `PoolEngine.pickManyWeighted()` recalculating `totalWeight` on every iteration via `.reduce()` — now maintains a running total.

### Removed

- Removed `public/vite.svg` (Vite default placeholder favicon, no longer referenced).
- Removed `src/assets/react.svg` (React default asset, never referenced in this project).
- Removed hardcoded personal tunnel hostnames from `vite.config.ts` `server.allowedHosts`.

## [5.5.1] - 2026-05-27

### Added

- Added contributor documentation through `README.md` and `CODE_OF_CONDUCT.md`.
- Added UI coverage for identity, world, mechanics, inventory stable, vault, crafting, and companion-oriented bestiary data.
- Added shared secondary tabs, category disclosures, panel search, generated-entry helpers, and persisted sub-tab state.

### Changed

- Dynamically import the generation entrypoint from the character store so generation-heavy code stays out of the initial UI path.
- Enable TanStack Router automatic code splitting and lazy-load heavier inventory subpanels.
- Reduce direct `react-icons/gi` usage in UI components by routing item icon lookup through inventory icon metadata.
- Refresh onboarding documentation around the current React, Vite, TanStack Router, Zustand, and Vitest workflow.

### Fixed

- Prevent stale asynchronous generation requests from overwriting newer character state.
- Normalize visible frontend wording around generated character categories and companion ownership.
- Improve keyboard behavior and discoverability for repeated menu and sub-menu controls.

## [5.4.1] - 2026-04-07

### Added

- Added MIT license metadata.
- Added initial project changelog.
- Added expanded README documentation for setup, architecture, browser compatibility, contribution notes, and known limitations.

### Changed

- Set package version to `5.4.1`.
- Added the `license` field to `package.json`.
- Updated GitHub Pages deployment workflow to run linting before build.
- Reused shared rarity utilities in inventory slot rendering.

### Fixed

- Fixed character generation loading state handling.
- Hardened seed/name extraction and generated ID fallbacks.
- Guarded several UI paths against missing character, stats, backstory, or DOM export targets.
- Added clipboard fallback behavior for unsupported or insecure browser contexts.

### Removed

- Removed unused scaffold CSS.

## [5.4.0] - 2026-04-06

### Added

- Added inventory generation with equipment, containers, consumables, currency, item rarity, item grade, and capacity rules.
- Added vault UI for equipment, satchel items, quickslots, tooltips, and currency display.
- Added inventory-related types, rarity helpers, and capacity utilities.

### Changed

- Added inventory configuration to generation constants.
- Added inventory output to generated characters.
- Split inventory data into its own Vite chunk.

## [5.3.0] - 2026-04-05

### Added

- Added generated backstories, traits, personality details, and lore panel rendering.
- Added story data and `BackstoryEngine` for narrative construction.

### Changed

- Integrated backstory generation into the character generator pipeline.

## [5.2.0] - 2026-04-04

### Added

- Added dark and light theme support using CSS custom properties and `data-theme`.
- Added FOUC prevention for the saved theme.
- Added reusable local storage support for UI preferences.

### Changed

- Integrated theme management into the root layout.
- Added app typography and theme token mapping.

## [5.1.0] - 2026-04-03

### Added

- Added tabbed character sheet UI with overview, chronicle, codex, arcana, inscriptions, and vault sections.
- Added accessible top tabs, command menu, stats radar, focused panels, and image export.
- Added focus trapping for modal-style UI.

### Changed

- Replaced the single-page character render with the profile layout architecture.

## [5.0.0] - 2026-04-02

### Added

- Rebuilt the application with React, TypeScript, Vite, TanStack Router, Zustand, Valibot, React Hook Form, and Sonner.
- Added deterministic seeded generation with shareable hash routes.
- Added generation engines for stats, lore, affiliations, skills, titles, and special powers.
- Added GitHub Pages CI deployment.

### Changed

- Renamed the project to Aetheris Character Forge.
- Replaced the legacy CDN-based frontend with a modern static SPA build.

### Removed

- Removed Bootstrap, Font Awesome, `dom-to-image`, CDN script loading, and direct DOM-manipulation rendering from the active app.

## [1.0.0] - 2025

### Added

- Added the original World Of Aetheris character generator as a vanilla HTML, JavaScript, and CSS application.

### Changed

- Preserved the original application under `_legacy/` for reference only. It is not part of the active build or test suite.
