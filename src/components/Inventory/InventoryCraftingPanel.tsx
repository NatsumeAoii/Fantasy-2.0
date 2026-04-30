import React, { useMemo, useState } from 'react';
import type { GeneratedPoolEntry, Inventory } from '../../types';
import {
    buildInventoryCraftingState,
    type InventoryCraftingRecipeState,
} from '../../logic/inventoryCrafting';
import type { CraftingStation } from '../../data/inventory/recipes';

interface InventoryCraftingPanelProps {
    inventory: Inventory;
    recipes: GeneratedPoolEntry[];
}

const STATION_LABELS: Record<CraftingStation, string> = {
    anvil: 'Anvil',
    forge: 'Forge',
    alchemy_bench: 'Alchemy Bench',
    enchanting_altar: 'Enchanting Altar',
    campfire: 'Campfire',
    workbench: 'Workbench',
    tanning_rack: 'Tanning Rack',
    fletching_table: 'Fletching Table',
};

function formatCraftTime(seconds: number): string {
    if (seconds >= 60) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return remainingSeconds > 0 ? `${minutes}m ${remainingSeconds}s` : `${minutes}m`;
    }

    return `${seconds}s`;
}

function sortRecipeStates(left: InventoryCraftingRecipeState, right: InventoryCraftingRecipeState): number {
    if (left.isCraftable !== right.isCraftable) return Number(right.isCraftable) - Number(left.isCraftable);
    if (left.recipe.category !== right.recipe.category) return left.recipe.category.localeCompare(right.recipe.category);
    return left.recipe.outputItem.localeCompare(right.recipe.outputItem);
}

export const InventoryCraftingPanel: React.FC<InventoryCraftingPanelProps> = ({ inventory, recipes }) => {
    const recipeStates = useMemo(() => buildInventoryCraftingState(inventory, recipes), [inventory, recipes]);
    const categories = useMemo(() => ['All', ...Array.from(new Set(recipeStates.map((state) => state.recipe.category)))], [recipeStates]);
    const [activeCategory, setActiveCategory] = useState('All');
    const [expandedRecipeId, setExpandedRecipeId] = useState<string | null>(null);
    const visibleRecipes = useMemo(() => recipeStates
        .filter((state) => activeCategory === 'All' || state.recipe.category === activeCategory)
        .sort(sortRecipeStates), [activeCategory, recipeStates]);
    const craftableCount = useMemo(() => recipeStates.filter((state) => state.isCraftable).length, [recipeStates]);
    const handleCategoryChange = (category: string) => {
        setActiveCategory(category);
        setExpandedRecipeId(null);
    };

    if (recipeStates.length === 0) {
        return (
            <div className="rounded-lg border bg-surface-2 border-border p-6 text-center">
                <h3 className="text-lg font-serif text-ink">Crafting</h3>
                <p className="mt-2 text-sm text-ink-muted">
                    No known recipes were generated for this character.
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-3">
            <div className="grid gap-2 md:grid-cols-3">
                <div className="rounded-md border bg-surface-2 border-border p-2.5">
                    <div className="text-[9px] uppercase tracking-[0.2em] text-ink-muted">Known Recipes</div>
                    <div className="mt-1 text-lg font-serif text-ink">{recipeStates.length}</div>
                </div>
                <div className="rounded-md border bg-surface-2 border-border p-2.5">
                    <div className="text-[9px] uppercase tracking-[0.2em] text-ink-muted">Ready Now</div>
                    <div className="mt-1 text-lg font-serif text-emerald-300">{craftableCount}</div>
                </div>
                <div className="rounded-md border bg-surface-2 border-border p-2.5">
                    <div className="text-[9px] uppercase tracking-[0.2em] text-ink-muted">Blocked</div>
                    <div className="mt-1 text-lg font-serif text-amber-200">{recipeStates.length - craftableCount}</div>
                </div>
            </div>

            <div className="flex flex-wrap gap-1.5 border-b border-gold-900/20 pb-2">
                {categories.map((category) => {
                    const isActive = category === activeCategory;

                    return (
                        <button
                            key={category}
                            type="button"
                            onClick={() => handleCategoryChange(category)}
                            title={category === 'All' ? 'Show all crafting recipes' : `Show ${category} recipes`}
                            className={`rounded border px-2 py-1 text-[10px] font-serif font-bold uppercase tracking-[0.16em] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 ${
                                isActive
                                    ? 'bg-gold-900/20 border-gold-500 text-gold-400 shadow-accent'
                                    : 'bg-transparent border-transparent text-parchment-300 hover:text-gold-200 hover:bg-gold-900/5'
                            }`}
                        >
                            {category}
                        </button>
                    );
                })}
            </div>

            <div className="grid items-start gap-2 xl:grid-cols-2">
                {visibleRecipes.map((state) => {
                    const isExpanded = expandedRecipeId === state.recipe.id;
                    const detailsId = `crafting-recipe-details-${state.recipe.id}`;
                    const titleId = `crafting-recipe-title-${state.recipe.id}`;

                    return (
                        <article
                            key={state.recipe.id}
                            aria-labelledby={titleId}
                            className={`overflow-hidden rounded-md border ${
                                state.isCraftable
                                    ? 'bg-emerald-500/5 border-emerald-500/25'
                                    : 'bg-surface-2 border-border'
                            }`}
                        >
                            <div className="flex items-start justify-between gap-2 p-2.5">
                                <div className="min-w-0">
                                    <span className="block text-[9px] uppercase tracking-[0.2em] text-ink-muted">
                                        {state.recipe.category}
                                    </span>
                                    <span id={titleId} className="mt-0.5 block text-sm font-serif font-bold text-ink">
                                        {state.recipe.outputItem}
                                    </span>
                                    <span className="mt-1 flex flex-wrap gap-x-2 gap-y-0.5 text-[11px] text-ink-muted">
                                        <span>{STATION_LABELS[state.recipe.craftingStation]}</span>
                                        <span>{formatCraftTime(state.recipe.craftingTime)}</span>
                                        <span>x{state.recipe.outputQuantity}</span>
                                        <span>{state.recipe.failureChance}% fail</span>
                                    </span>
                                </div>
                                <div className="flex shrink-0 flex-col items-end gap-1.5">
                                    <div className="flex items-center gap-1.5">
                                        <span
                                            className={`rounded px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.14em] ${
                                                state.isCraftable
                                                    ? 'bg-emerald-500/15 text-emerald-200'
                                                    : 'bg-amber-500/15 text-amber-200'
                                            }`}
                                        >
                                            {state.isCraftable ? 'Ready' : `Missing ${state.missingMaterials}`}
                                        </span>
                                        <button
                                            type="button"
                                            aria-label={`Details ${state.recipe.outputItem}`}
                                            aria-expanded={isExpanded}
                                            aria-controls={detailsId}
                                            onClick={() => setExpandedRecipeId(isExpanded ? null : state.recipe.id)}
                                            title={`${isExpanded ? 'Hide details for' : 'Show details for'} ${state.recipe.outputItem}`}
                                            className="rounded border border-border px-1.5 py-0.5 text-[9px] uppercase tracking-[0.14em] text-ink-muted transition-colors hover:bg-white/5 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
                                        >
                                            {isExpanded ? 'Hide' : 'Details'}
                                        </button>
                                    </div>
                                    <button
                                        type="button"
                                        aria-label={`Craft ${state.recipe.outputItem}`}
                                        disabled={!state.isCraftable}
                                        title={`Craft ${state.recipe.outputItem}`}
                                        className={`rounded border px-2 py-0.5 text-[9px] font-serif font-bold uppercase tracking-[0.16em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 ${
                                            state.isCraftable
                                                ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-200 hover:bg-emerald-500/25'
                                                : 'cursor-not-allowed border-border bg-stone-700/40 text-ink-muted opacity-60'
                                        }`}
                                    >
                                        Craft
                                    </button>
                                </div>
                            </div>

                            {isExpanded ? (
                                <div id={detailsId} className="border-t border-border px-3 pb-3 pt-2">
                                    <p className="text-xs leading-5 text-ink-muted">{state.recipe.description}</p>

                                    <div className="mt-2">
                                        <div className="text-[9px] uppercase tracking-[0.2em] text-ink-muted">Materials</div>
                                        <ul className="mt-1 grid gap-1 sm:grid-cols-2">
                                            {state.materials.map((material) => (
                                                <li key={material.name} className="flex items-center justify-between gap-2 text-xs">
                                                    <span className="truncate text-ink">{material.name}</span>
                                                    <span className={material.missing === 0 ? 'text-emerald-300' : 'text-amber-200'}>
                                                        {material.available}/{material.required}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                </div>
                            ) : null}
                        </article>
                    );
                })}
            </div>
        </div>
    );
};
