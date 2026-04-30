import React, { useCallback, useMemo, useState } from 'react';
import { EQUIPMENT_SLOT_LABELS, SLOT_GHOST_ICONS } from '../../data/inventory/slots';
import {
    canEquipItemToSlot,
    getValidEquipmentSlots,
    type InventoryMoveRequest,
    type InventoryMoveSource,
    type InventoryMoveTarget,
} from '../../logic/InventoryMoveEngine';
import {
    getEquipmentWithoutSlot,
    getSatchelCapacityState,
} from '../../logic/inventorySatchelState';
import type { Inventory, Item, ItemSlot } from '../../types';
import { CurrencyDisplay } from './CurrencyDisplay';
import { InventorySlot } from './InventorySlot';
import { stackInventoryItems } from './stackInventoryItems';

interface InventoryVaultPanelProps {
    inventory: Inventory;
    onMoveItem?: (request: InventoryMoveRequest) => void;
}

function isSameSource(left: InventoryMoveSource | null, right: InventoryMoveSource | undefined): boolean {
    if (!left || !right || left.type !== right.type) return false;
    if (left.type === 'backpack' && right.type === 'backpack') return left.itemId === right.itemId;
    if (left.type === 'equipment' && right.type === 'equipment') return left.slot === right.slot;
    return false;
}

function getSourceItem(inventory: Inventory, source: InventoryMoveSource | null): Item | null {
    if (!source) return null;
    if (source.type === 'equipment') return inventory.equipment[source.slot] ?? null;
    return inventory.backpack.find((item) => item.id === source.itemId) ?? null;
}

function getEquipHintLabels(item: Item): string[] {
    return getValidEquipmentSlots(item).map((slot) => EQUIPMENT_SLOT_LABELS[slot]);
}

function CharacterSilhouette() {
    return (
        <div
            aria-hidden="true"
            className="relative h-[220px] w-[120px]"
            style={{ color: 'var(--inv-silhouette-color)', opacity: 'var(--inv-silhouette-opacity)' }}
        >
            <div className="absolute left-1/2 top-2 h-14 w-14 -translate-x-1/2 rounded-full border-[10px] border-current" />
            <div className="absolute left-1/2 top-20 h-20 w-20 -translate-x-1/2 rounded-t-[2.5rem] border-[10px] border-b-0 border-current" />
            <div className="absolute left-1/2 top-[9.25rem] h-16 w-10 -translate-x-1/2 border-x-[10px] border-current" />
        </div>
    );
}

export const InventoryVaultPanel: React.FC<InventoryVaultPanelProps> = ({ inventory, onMoveItem }) => {
    const [selectedSource, setSelectedSource] = useState<InventoryMoveSource | null>(null);
    const getEquip = (slot: ItemSlot) => inventory.equipment[slot] || null;
    const selectedItem = useMemo(() => getSourceItem(inventory, selectedSource), [inventory, selectedSource]);
    const previewEquipment = useMemo(() => {
        if (!selectedSource || selectedSource.type !== 'equipment') {
            return inventory.equipment;
        }

        return getEquipmentWithoutSlot(inventory.equipment, selectedSource.slot);
    }, [inventory.equipment, selectedSource]);
    const satchelState = useMemo(
        () => getSatchelCapacityState(inventory.backpack.length, previewEquipment),
        [inventory.backpack.length, previewEquipment],
    );
    const totalSlots = satchelState.capacity;
    const stackedBackpack = useMemo(() => stackInventoryItems(inventory.backpack), [inventory.backpack]);
    const highlightedSlots = useMemo(() => {
        if (!selectedSource || !selectedItem) {
            return new Set<ItemSlot>();
        }

        const equipmentForChecks = selectedSource.type === 'equipment' ? previewEquipment : inventory.equipment;
        const validSlots = getValidEquipmentSlots(selectedItem).filter((slot) =>
            !(selectedSource.type === 'equipment' && selectedSource.slot === slot)
            && canEquipItemToSlot(selectedItem, slot, equipmentForChecks),
        );

        return new Set(validSlots);
    }, [inventory.equipment, previewEquipment, selectedItem, selectedSource]);

    const handleMoveItem = useCallback((request: InventoryMoveRequest) => {
        onMoveItem?.(request);
        setSelectedSource(null);
    }, [onMoveItem]);

    const handleActivate = useCallback((source: InventoryMoveSource | undefined, target: InventoryMoveTarget) => (
        event: React.SyntheticEvent<HTMLDivElement>,
    ) => {
        event.stopPropagation();

        if (isSameSource(selectedSource, source)) {
            setSelectedSource(null);
            return;
        }

        if (selectedSource) {
            handleMoveItem({ source: selectedSource, target });
            return;
        }

        if (source) {
            setSelectedSource(source);
        }
    }, [handleMoveItem, selectedSource]);

    const renderEquipmentSlot = (slot: ItemSlot, slotName?: string) => {
        const item = getEquip(slot);
        const source = item ? ({ type: 'equipment', slot } as const) : undefined;
        const target = { type: 'equipment', slot } as const;
        const ariaLabel = `${EQUIPMENT_SLOT_LABELS[slot]} equipment slot`;

        return (
            <InventorySlot
                slotName={slotName}
                item={item}
                ghostIcon={SLOT_GHOST_ICONS[slot]}
                dragSource={source}
                dropTarget={target}
                isSelected={isSameSource(selectedSource, source)}
                isSuggestedTarget={highlightedSlots.has(slot)}
                ariaLabel={ariaLabel}
                onClick={handleActivate(source, target)}
                onMoveItem={handleMoveItem}
            />
        );
    };

    return (
        <div className="flex flex-col lg:flex-row gap-4 w-full">
            <div className="flex-1 flex flex-col gap-3">
                <div
                    className="flex justify-between items-center p-2.5 rounded-lg border bg-surface-1 border-border"
                >
                    <CurrencyDisplay currency={inventory.currency} />
                    <div className="flex items-center gap-2 text-sm font-mono text-ink-muted">
                        <span aria-hidden="true" className="rounded border border-border px-1.5 py-0.5 text-[10px] font-bold text-ink-muted">WT</span>
                        <span>
                            Weight: <span className="text-ink font-bold">{inventory.weight.current}</span> / {inventory.weight.max}
                        </span>
                    </div>
                </div>

                <div
                    className="relative flex flex-col items-center p-4 rounded-lg border bg-surface-2 border-border"
                >
                    <div className="relative w-full max-w-sm mx-auto">
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ top: '1rem' }}>
                            <CharacterSilhouette />
                        </div>

                        <div
                            className="relative grid"
                            style={{
                                gridTemplateColumns: 'repeat(3, 1fr)',
                                gap: 'var(--inv-armor-gap)',
                                justifyItems: 'center',
                                alignItems: 'center',
                                padding: '0.25rem 0'
                            }}
                        >
                            <div style={{ gridColumn: '2', gridRow: '1' }}>
                                {renderEquipmentSlot('HEAD', 'Head')}
                            </div>
                            <div style={{ gridColumn: '1', gridRow: '2' }}>
                                {renderEquipmentSlot('BACK', 'Back')}
                            </div>
                            <div style={{ gridColumn: '2', gridRow: '2' }}>
                                {renderEquipmentSlot('NECK', 'Neck')}
                            </div>
                            <div style={{ gridColumn: '3', gridRow: '2' }}>
                                {renderEquipmentSlot('SHOULDER', 'Shoulder')}
                            </div>
                            <div style={{ gridColumn: '1', gridRow: '3' }}>
                                {renderEquipmentSlot('HANDS', 'Hand')}
                            </div>
                            <div style={{ gridColumn: '2', gridRow: '3' }}>
                                {renderEquipmentSlot('BODY', 'Body')}
                            </div>
                            <div style={{ gridColumn: '3', gridRow: '3' }}>
                                {renderEquipmentSlot('HANDS_2', 'Hand')}
                            </div>
                            <div style={{ gridColumn: '1', gridRow: '4' }}>
                                {renderEquipmentSlot('RING', 'Ring')}
                            </div>
                            <div style={{ gridColumn: '3', gridRow: '4' }}>
                                {renderEquipmentSlot('RING_2', 'Ring')}
                            </div>
                            <div style={{ gridColumn: '2', gridRow: '5' }}>
                                {renderEquipmentSlot('BELT', 'Belt')}
                            </div>
                            <div style={{ gridColumn: '2', gridRow: '6' }}>
                                {renderEquipmentSlot('LEGS', 'Legs')}
                            </div>
                            <div style={{ gridColumn: '2', gridRow: '7' }}>
                                {renderEquipmentSlot('FEET', 'Feet')}
                            </div>
                        </div>
                    </div>

                    <div
                        className="flex mt-3 pt-3 w-full justify-center border-t flex-wrap border-border gap-[var(--inv-quickslot-gap)]"
                    >
                        <div className={`flex flex-col items-center gap-1${getEquip('EAR') ? '' : ' opacity-40'}`}>
                            {renderEquipmentSlot('EAR')}
                            <span className="text-[10px] uppercase tracking-wider text-ink-muted">Ear</span>
                        </div>
                        <div className={`flex flex-col items-center gap-1${getEquip('WAIST') ? '' : ' opacity-40'}`}>
                            {renderEquipmentSlot('WAIST')}
                            <span className="text-[10px] uppercase tracking-wider text-ink-muted">Waist</span>
                        </div>
                    </div>

                    <div
                        className="flex mt-3 pt-3 w-full justify-center border-t flex-wrap border-border gap-[var(--inv-quickslot-gap)]"
                    >
                        <div className="flex flex-col items-center gap-1">
                            {renderEquipmentSlot('MAIN_HAND')}
                            <span className="text-[10px] uppercase tracking-wider text-ink-muted">Weapon 1</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            {renderEquipmentSlot('OFF_HAND')}
                            <span className="text-[10px] uppercase tracking-wider text-ink-muted">Weapon 2</span>
                        </div>
                        <div className={`flex flex-col items-center gap-1${getEquip('THROWABLE') ? '' : ' opacity-40'}`}>
                            {renderEquipmentSlot('THROWABLE')}
                            <span className="text-[10px] uppercase tracking-wider text-ink-muted">Throwable</span>
                        </div>
                        <div className={`flex flex-col items-center gap-1${getEquip('TORCH') ? '' : ' opacity-40'}`}>
                            {renderEquipmentSlot('TORCH')}
                            <span className="text-[10px] uppercase tracking-wider text-ink-muted">Torch</span>
                        </div>
                        <div className={`flex flex-col items-center gap-1${getEquip('POTION') ? '' : ' opacity-40'}`}>
                            {renderEquipmentSlot('POTION')}
                            <span className="text-[10px] uppercase tracking-wider text-ink-muted">Potion</span>
                        </div>
                        <div className={`flex flex-col items-center gap-1${getEquip('FOOD') ? '' : ' opacity-40'}`}>
                            {renderEquipmentSlot('FOOD')}
                            <span className="text-[10px] uppercase tracking-wider text-ink-muted">Food</span>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="lg:w-[18rem] p-4 rounded-lg border overflow-visible bg-surface-2 border-border"
            >
                <h3
                    className="text-lg font-serif mb-3 border-b pb-2 text-center flex items-center justify-center gap-2 text-ink border-border"
                >
                    Satchel
                    <span className="text-sm font-mono text-ink-muted">
                        ({inventory.backpack.length}/{totalSlots})
                    </span>
                </h3>
                <div className="grid grid-cols-4 overflow-visible gap-[var(--inv-satchel-gap)]">
                    {(() => {
                        const stackedSlots = stackedBackpack.map(({ item, count, signature }) => {
                            const source = { type: 'backpack', itemId: item.id } as const;
                            const target = { type: 'backpack' } as const;
                            const equipHintLabels = getEquipHintLabels(item);

                            return (
                                <InventorySlot
                                    key={signature}
                                    item={item}
                                    quantity={count}
                                    dragSource={source}
                                    dropTarget={target}
                                    isSelected={isSameSource(selectedSource, source)}
                                    isEquipable={equipHintLabels.length > 0}
                                    equipHintTitle={equipHintLabels.length > 0 ? `Can equip to ${equipHintLabels.join(', ')}` : undefined}
                                    tooltipRows={equipHintLabels.length > 0 ? [{
                                        label: 'Equip Slots',
                                        value: equipHintLabels.join(', '),
                                        tone: 'warning',
                                    }] : undefined}
                                    onClick={handleActivate(source, target)}
                                    onMoveItem={handleMoveItem}
                                />
                            );
                        });
                        const emptyCount = satchelState.freeSlots;
                        const emptySlots = Array.from({ length: emptyCount }).map((_, i) => (
                            <InventorySlot
                                key={`empty-${i}`}
                                dropTarget={{ type: 'backpack' }}
                                ariaLabel="Satchel slot"
                                onClick={handleActivate(undefined, { type: 'backpack' })}
                                onMoveItem={handleMoveItem}
                                className="opacity-40"
                            />
                        ));
                        return [...stackedSlots, ...emptySlots];
                    })()}
                </div>
            </div>
        </div>
    );
};
