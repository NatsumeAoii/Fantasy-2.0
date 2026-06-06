import { RECIPES, type Recipe } from '../../data/inventory';
import type { GeneratedPoolEntry, Inventory, Item } from '../../types';

export interface InventoryCraftingMaterialState {
    name: string;
    required: number;
    available: number;
    missing: number;
}

export interface InventoryCraftingRecipeState {
    recipe: Recipe;
    materials: InventoryCraftingMaterialState[];
    isCraftable: boolean;
    missingMaterials: number;
}

const RECIPE_BY_ID = new Map(RECIPES.map((recipe) => [recipe.id, recipe]));

function normalizeName(value: string): string {
    return value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

function countInventoryItems(items: Item[]): Map<string, number> {
    const counts = new Map<string, number>();

    for (const item of items) {
        const key = normalizeName(item.name);
        counts.set(key, (counts.get(key) ?? 0) + 1);
    }

    return counts;
}

function countRecipeMaterials(materialsRequired: string[]): { name: string; required: number }[] {
    const counts = new Map<string, { name: string; required: number }>();

    for (const materialName of materialsRequired) {
        const key = normalizeName(materialName);
        const existing = counts.get(key);

        if (existing) {
            existing.required += 1;
            continue;
        }

        counts.set(key, { name: materialName, required: 1 });
    }

    return Array.from(counts.values());
}

export function resolveInventoryRecipes(entries: GeneratedPoolEntry[]): Recipe[] {
    const recipes: Recipe[] = [];
    const seen = new Set<string>();

    for (const entry of entries) {
        const recipe = RECIPE_BY_ID.get(entry.id);
        if (!recipe || seen.has(recipe.id)) continue;

        seen.add(recipe.id);
        recipes.push(recipe);
    }

    return recipes;
}

export function buildInventoryCraftingState(
    inventory: Inventory,
    entries: GeneratedPoolEntry[],
): InventoryCraftingRecipeState[] {
    const inventoryCounts = countInventoryItems(inventory.backpack);

    return resolveInventoryRecipes(entries).map((recipe) => {
        const materials = countRecipeMaterials(recipe.materialsRequired).map((material) => {
            const available = inventoryCounts.get(normalizeName(material.name)) ?? 0;
            const missing = Math.max(0, material.required - available);

            return {
                name: material.name,
                required: material.required,
                available,
                missing,
            };
        });

        return {
            recipe,
            materials,
            isCraftable: materials.every((material) => material.missing === 0),
            missingMaterials: materials.filter((material) => material.missing > 0).length,
        };
    });
}
