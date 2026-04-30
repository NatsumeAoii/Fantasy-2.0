# Recipe Catalog Normalization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Normalize recipe outputs and ingredients to existing inventory-data names and bring every recipe category to 30 entries.

**Architecture:** Keep the change local to recipe data and tests. Use one data-validation test to enforce category counts and catalog integrity, then update recipe outputs and new recipes until the validation and affected crafting tests pass.

**Tech Stack:** TypeScript, Vitest, React Testing Library

---

### Task 1: Lock failing expectations first

**Files:**
- Create: `src/data/inventory/recipes.test.ts`
- Modify: `src/logic/inventoryCrafting.test.ts`
- Modify: `src/components/Inventory/InventoryCraftingPanel.test.tsx`
- Modify: `src/components/Inventory/InventoryPanel.test.tsx`

- [ ] Step 1: Add a failing data-validation test for recipe category counts and catalog name resolution.
- [ ] Step 2: Update crafting tests to expect normalized recipe outputs for `crude_health_potion` and `flash_grenade`.
- [ ] Step 3: Run the targeted Vitest command and confirm the suite fails for the expected recipe-data mismatches.

### Task 2: Normalize and expand recipe data

**Files:**
- Modify: `src/data/inventory/recipes.ts`

- [ ] Step 1: Replace non-existent recipe output names with exact existing catalog names.
- [ ] Step 2: Add missing recipes so each category reaches 30 entries.
- [ ] Step 3: Recheck that every added material name already exists in inventory data.

### Task 3: Verify green

**Files:**
- Modify: `src/data/inventory/recipes.ts`
- Modify: `src/data/inventory/recipes.test.ts`
- Modify: `src/logic/inventoryCrafting.test.ts`
- Modify: `src/components/Inventory/InventoryCraftingPanel.test.tsx`
- Modify: `src/components/Inventory/InventoryPanel.test.tsx`

- [ ] Step 1: Run targeted Vitest coverage for recipe data and crafting UI logic until green.
- [ ] Step 2: Run a broader deterministic test pass for the touched files.
- [ ] Step 3: Summarize the final category counts and any remaining modeling gaps.
