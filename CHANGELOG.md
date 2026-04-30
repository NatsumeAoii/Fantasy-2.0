# Changelog

All notable changes to Aetheris Character Forge are documented here.

The project follows semantic versioning where practical:

- Major versions cover breaking generation output, data shape, route, or storage changes.
- Minor versions cover new features, generated data, and UI areas.
- Patch versions cover fixes, documentation, performance work, and internal refactors.

## [6.0.0]

### Added

- Added contributor documentation through `README.md` and `CODE_OF_CONDUCT.md`.
- Added UI coverage for identity, world, mechanics, inventory stable, vault, crafting, and companion-oriented bestiary data.
- Added shared secondary tabs, category disclosures, panel search, generated-entry helpers, and persisted sub-tab state.
- Added centralized inventory slot metadata and runtime inventory move validation.

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
