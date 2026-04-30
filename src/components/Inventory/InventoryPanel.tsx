import React, { lazy, Suspense } from 'react';
import type { GeneratedBestiary, GeneratedPoolEntry, Inventory } from '../../types';
import type { InventoryMoveRequest } from '../../logic/InventoryMoveEngine';
import type { BestiaryProfile } from '../../logic/bestiaryCatalog';
import { usePersistedTab } from '../../hooks/usePersistedTab';
import { SecondaryTabs, type SecondaryTabItem } from '../ui/SecondaryTabs';

type InventorySubtab = 'vault' | 'crafting' | 'stable';

interface InventoryPanelProps {
    inventory: Inventory;
    recipes: GeneratedPoolEntry[];
    bestiary?: GeneratedBestiary;
    characterProfile?: BestiaryProfile;
    onBestiaryChange?: (updates: Partial<GeneratedBestiary>) => void;
    onMoveItem?: (request: InventoryMoveRequest) => void;
}

const INVENTORY_SUBTABS: readonly SecondaryTabItem<InventorySubtab>[] = [
    { id: 'vault', label: 'Vault', title: 'Equipment and satchel' },
    { id: 'crafting', label: 'Crafting', title: 'Known recipes and materials' },
    { id: 'stable', label: 'Stable', title: 'Mounts, mount gear, and pets' },
];

const InventoryVaultPanel = lazy(() => import('./InventoryVaultPanel').then((module) => ({ default: module.InventoryVaultPanel })));
const InventoryCraftingPanel = lazy(() => import('./InventoryCraftingPanel').then((module) => ({ default: module.InventoryCraftingPanel })));
const InventoryStablePanel = lazy(() => import('./InventoryStablePanel').then((module) => ({ default: module.InventoryStablePanel })));

const EMPTY_BESTIARY: GeneratedBestiary = {
    mounts: [],
    mountBags: [],
    pets: [],
    summons: [],
    mount: null,
    mountBag: null,
    pet: null,
    summon: null,
    favoriteMount: null,
    favoritePet: null,
};

const DEFAULT_PROFILE: BestiaryProfile = {
    level: 1,
    race: '',
    role: '',
};

function InventorySubpanelSkeleton() {
    return (
        <div className="min-h-[20rem] animate-pulse rounded-md border border-gold-900/15 bg-black/12 p-4" aria-label="Loading inventory section">
            <div className="h-5 w-40 rounded bg-gold-500/10" />
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {Array.from({ length: 8 }).map((_, index) => (
                    <div key={index} className="h-14 rounded-md bg-white/5" />
                ))}
            </div>
        </div>
    );
}

export const InventoryPanel: React.FC<InventoryPanelProps> = ({
    inventory,
    recipes,
    bestiary = EMPTY_BESTIARY,
    characterProfile = DEFAULT_PROFILE,
    onBestiaryChange,
    onMoveItem,
}) => {
    const [activeTab, setActiveTab] = usePersistedTab<InventorySubtab>('cathedral.inventory.activeTab', 'vault', INVENTORY_SUBTABS);

    return (
        <div className="mx-auto flex gap-4 max-w-5xl flex-col w-full">
            <SecondaryTabs<InventorySubtab>
                ariaLabel="Vault sections"
                activeId={activeTab}
                idPrefix="inventory-subtab"
                items={INVENTORY_SUBTABS}
                onChange={setActiveTab}
                panelIdPrefix="inventory-subpanel"
            />

            <div
                id={`inventory-subpanel-${activeTab}`}
                role="tabpanel"
                aria-labelledby={`inventory-subtab-${activeTab}`}
            >
                <Suspense fallback={<InventorySubpanelSkeleton />}>
                    {activeTab === 'vault' ? (
                        <InventoryVaultPanel inventory={inventory} onMoveItem={onMoveItem} />
                    ) : null}
                    {activeTab === 'crafting' ? (
                        <InventoryCraftingPanel inventory={inventory} recipes={recipes} />
                    ) : null}
                    {activeTab === 'stable' ? (
                        <InventoryStablePanel
                            bestiary={bestiary}
                            characterProfile={characterProfile}
                            onBestiaryChange={onBestiaryChange}
                        />
                    ) : null}
                </Suspense>
            </div>
        </div>
    );
};
