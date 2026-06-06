import React, { useRef, useState, useCallback, useEffect, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { getIcon, resolveIconName } from '../../data/inventory/icons';
import { isItemSlot } from '../../data/inventory/slots';
import { getRaritySlotClass, getRarityTextClass } from '../../lib/rarityUtils';
import type { InventoryMoveRequest, InventoryMoveSource, InventoryMoveTarget } from '../../logic/inventory/InventoryMoveEngine';
import type { Item } from '../../types';
import { getItemMechanicalRows, type TooltipRowTone } from './itemTooltipRows';
import { calculateTooltipPosition, type TooltipPosition } from './tooltipPosition';

const TOOLTIP_MARGIN = 8;
const TOOLTIP_WIDTH = 224; // w-56 = 14rem = 224px
const INVENTORY_DRAG_MIME = 'application/x-inventory-source';

interface InventorySlotProps {
    slotName?: string;
    item?: Item | null;
    quantity?: number;
    ghostIcon?: string;
    dragSource?: InventoryMoveSource;
    dropTarget?: InventoryMoveTarget;
    isSelected?: boolean;
    ariaLabel?: string;
    onClick?: (event: React.SyntheticEvent<HTMLDivElement>) => void;
    onMoveItem?: (request: InventoryMoveRequest) => void;
    className?: string;
    isEquipable?: boolean;
    equipHintTitle?: string;
    tooltipRows?: { label: string; value: string; tone?: TooltipRowTone }[];
    isSuggestedTarget?: boolean;
}

const GRADE_COLORS: Record<string, string> = {
    'F': 'text-stone-500',
    'E': 'text-stone-400',
    'D': 'text-gray-400',
    'C': 'text-emerald-400',
    'B': 'text-cyan-400',
    'A': 'text-amber-400',
    'S': 'text-orange-400',
    'SS': 'text-red-400',
    'SSS': 'text-rose-300',
    'My': 'text-violet-400',
    'EX': 'text-amber-200',
    '???': 'text-fuchsia-400',
};

const formatPrice = (shards: number): React.ReactNode => {
    const parts: React.ReactNode[] = [];

    if (shards >= 100_000_000) {
        const crowns = Math.floor(shards / 100_000_000);
        shards = shards % 100_000_000;
        parts.push(<span key="cr" className="text-purple-400">{crowns}cr</span>);
    }
    if (shards >= 100_000) {
        const gold = Math.floor(shards / 100_000);
        shards = shards % 100_000;
        parts.push(<span key="g" className="text-yellow-400">{gold}g</span>);
    }
    if (shards >= 1_000) {
        const silver = Math.floor(shards / 1_000);
        shards = shards % 1_000;
        parts.push(<span key="s" className="text-gray-300">{silver}s</span>);
    }
    if (shards >= 10) {
        const copper = Math.floor(shards / 10);
        shards = shards % 10;
        parts.push(<span key="c" className="text-amber-600">{copper}c</span>);
    }
    if (shards > 0 || parts.length === 0) {
        parts.push(<span key="sh" className="text-orange-800">{shards}sh</span>);
    }

    return parts.length === 1 ? parts[0] : parts.flatMap((part, i) =>
        i === 0 ? [part] : [' ', part]);
};

const formatDuration = (seconds: number): string => {
    if (seconds >= 60) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`;
    }
    return `${seconds}s`;
};

const TIER_THRESHOLD = ['EPIC', 'LEGENDARY', 'MYTHIC', 'DIVINE', 'ARTIFACT'];

const TOOLTIP_ROW_TONE_CLASS: Record<TooltipRowTone, string> = {
    neutral: 'text-stone-400',
    positive: 'text-emerald-400',
    negative: 'text-red-400',
    accent: 'text-sky-400',
    warning: 'text-amber-400',
};

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null;
}

function isInventoryMoveSource(value: unknown): value is InventoryMoveSource {
    if (!isRecord(value)) return false;

    if (value.type === 'backpack') {
        return typeof value.itemId === 'string' && value.itemId.length > 0;
    }

    if (value.type === 'equipment') {
        return isItemSlot(value.slot);
    }

    return false;
}

const ItemTooltipContent: React.FC<{
    item: Item;
    tooltipRows?: { label: string; value: string; tone?: TooltipRowTone }[];
}> = ({ item, tooltipRows = [] }) => {
    const mechanicalRows = getItemMechanicalRows(item);
    const detailRows = [...tooltipRows, ...mechanicalRows];

    return (
        <>
        <div className={`text-xs font-bold mb-1 ${getRarityTextClass(item.rarity) || 'text-parchment-100'}`}>
            {item.name}
        </div>
        <div className="flex justify-between text-[10px] text-text-muted uppercase tracking-widest mb-2 border-b border-gold-900/20 pb-1">
            <span>{item.type}</span>
            <span>
                <span className={getRarityTextClass(item.rarity) || ''}>{item.rarity}</span>
                {item.grade && <span className={`ml-1 ${GRADE_COLORS[item.grade] || 'text-gray-400'}`}>[{item.grade}]</span>}
            </span>
        </div>
        {item.description && (
            <div className="text-[11px] text-text-secondary italic">{item.description}</div>
        )}
        {(item.value || item.duration || item.cooldown || item.weight) && (
            <div className="mt-2 pt-2 border-t border-gold-900/20 text-[10px] space-y-1">
                {item.weight > 0 && (
                    <div className="flex items-center justify-between">
                        <span className="text-text-muted">Weight</span>
                        <span className="text-stone-400">{item.weight} kg</span>
                    </div>
                )}
                {item.value !== undefined && item.value > 0 && (
                    <div className="flex items-center justify-between">
                        <span className="text-text-muted">Value</span>
                        <span>{formatPrice(item.value)}</span>
                    </div>
                )}
                {item.duration !== undefined && item.duration > 0 && (
                    <div className="flex items-center justify-between">
                        <span className="text-text-muted">Duration</span>
                        <span className="text-sky-400">{formatDuration(item.duration)}</span>
                    </div>
                )}
                {item.cooldown !== undefined && item.cooldown > 0 && (
                    <div className="flex items-center justify-between">
                        <span className="text-text-muted">Cooldown</span>
                        <span className="text-rose-400">{formatDuration(item.cooldown)}</span>
                    </div>
                )}
            </div>
        )}

        {detailRows.length > 0 && (
            <div className="mt-2 pt-2 border-t border-gold-900/20 text-[10px] space-y-1">
                {detailRows.map(row => (
                    <div key={`${row.label}-${row.value}`} className="flex items-start justify-between gap-3">
                        <span className="shrink-0 text-text-muted">{row.label}</span>
                        <span className={`min-w-0 text-right break-words ${TOOLTIP_ROW_TONE_CLASS[row.tone || 'neutral']}`}>
                            {row.value}
                        </span>
                    </div>
                ))}
            </div>
        )}

        {(item.capacity !== undefined || item.extraSlots !== undefined) && (
            <div className="mt-2 pt-2 border-t border-gold-900/20 text-[10px] space-y-1">
                {item.capacity !== undefined && item.capacity !== 0 && (
                    <div className="flex items-center justify-between">
                        <span className="text-text-muted">Weight Limit</span>
                        <span className={item.capacity > 0 ? 'text-emerald-400' : 'text-red-400'}>
                            {item.capacity > 0 ? '+' : ''}{item.capacity} kg
                        </span>
                    </div>
                )}
                {item.extraSlots !== undefined && item.extraSlots > 0 && (
                    <div className="flex items-center justify-between">
                        <span className="text-text-muted">Inventory Slots</span>
                        <span className="text-sky-400">+{item.extraSlots}</span>
                    </div>
                )}
            </div>
        )}
        {item.tags && item.tags.length > 0 && (
            <div className="mt-2 flex gap-1 flex-wrap">
                {item.tags.map(t => (
                    <span key={t} className="px-1.5 py-0.5 bg-white/5 rounded text-[9px] text-white/50">{t}</span>
                ))}
            </div>
        )}
        </>
    );
};

export const InventorySlot: React.FC<InventorySlotProps> = ({
    slotName,
    item,
    quantity = 1,
    ghostIcon,
    dragSource,
    dropTarget,
    isSelected = false,
    ariaLabel,
    onClick,
    onMoveItem,
    className = '',
    isEquipable = false,
    equipHintTitle,
    tooltipRows,
    isSuggestedTarget = false,
}) => {
    const slotRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);
    const [tooltipPos, setTooltipPos] = useState<TooltipPosition | null>(null);

    const updateTooltipPosition = useCallback(() => {
        if (!slotRef.current || !tooltipRef.current) return;

        const anchorRect = slotRef.current.getBoundingClientRect();
        const tooltipRect = tooltipRef.current.getBoundingClientRect();

        setTooltipPos(calculateTooltipPosition({
            anchorRect,
            tooltipSize: {
                width: tooltipRect.width || TOOLTIP_WIDTH,
                height: tooltipRect.height,
            },
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight,
            },
            offset: TOOLTIP_MARGIN,
        }));
    }, []);

    const handleShowTooltip = useCallback(() => {
        if (!item) return;
        setIsTooltipVisible(true);
    }, [item]);

    const handleHideTooltip = useCallback(() => {
        setIsTooltipVisible(false);
        setTooltipPos(null);
    }, []);

    useLayoutEffect(() => {
        if (!isTooltipVisible || !item) return;
        updateTooltipPosition();
    }, [isTooltipVisible, item, updateTooltipPosition]);

    useEffect(() => {
        if (!isTooltipVisible || !item) return;

        const handleViewportChange = () => updateTooltipPosition();

        window.addEventListener('resize', handleViewportChange);
        window.addEventListener('scroll', handleViewportChange, true);

        return () => {
            window.removeEventListener('resize', handleViewportChange);
            window.removeEventListener('scroll', handleViewportChange, true);
        };
    }, [isTooltipVisible, item, updateTooltipPosition]);

    const handleDragStart = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        if (!dragSource) return;

        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData(INVENTORY_DRAG_MIME, JSON.stringify(dragSource));
        setIsTooltipVisible(false);
        setTooltipPos(null);
    }, [dragSource]);

    const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        if (!dropTarget || !onMoveItem) return;

        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, [dropTarget, onMoveItem]);

    const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        if (!dropTarget || !onMoveItem) return;

        const rawSource = event.dataTransfer.getData(INVENTORY_DRAG_MIME);
        if (!rawSource) return;

        event.preventDefault();
        event.stopPropagation();

        try {
            const source = JSON.parse(rawSource) as unknown;
            if (!isInventoryMoveSource(source)) return;

            onMoveItem({
                source,
                target: dropTarget,
            });
        } catch {
            return;
        }
    }, [dropTarget, onMoveItem]);

    const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
        if (!onClick || (event.key !== 'Enter' && event.key !== ' ')) return;

        event.preventDefault();
        onClick(event);
    }, [onClick]);

    const renderIcon = (iconName: string, iconClass: string) => {
        const resolvedIconName = resolveIconName({ explicitIcon: iconName });
        const IconComponent = getIcon(resolvedIconName);
        return <IconComponent aria-hidden="true" className={iconClass} data-icon-name={resolvedIconName} />;
    };

    if (!item) {
        const isInteractive = !!onClick || (!!dropTarget && !!onMoveItem);
        const emptySlotLabel = ariaLabel ?? `${slotName ?? 'Empty inventory'} slot`;

        return (
            <div
                onClick={onClick}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onKeyDown={handleKeyDown}
                role={isInteractive ? 'button' : undefined}
                tabIndex={isInteractive ? 0 : undefined}
                aria-label={isInteractive ? emptySlotLabel : undefined}
                className={`relative w-14 h-14 border border-dashed rounded flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 ${isSelected ? 'ring-2 ring-gold-400' : ''} ${isSuggestedTarget ? 'border-emerald-400/80 bg-emerald-500/10 shadow-[0_0_0_1px_rgba(52,211,153,0.35)]' : ''} ${className}`}
                style={{ borderColor: 'var(--inv-slot-border)', backgroundColor: 'var(--inv-slot-bg)' }}
                title={emptySlotLabel}
            >
                {ghostIcon && (
                    <span style={{ color: 'var(--inv-icon-color)', opacity: 0.4 }}>
                        {renderIcon(ghostIcon, 'text-2xl')}
                    </span>
                )}
                {slotName && (
                    <span
                        className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[11px] uppercase tracking-wider whitespace-nowrap font-medium text-ink-muted"
                    >
                        {slotName}
                    </span>
                )}
            </div>
        );
    }

    const rarityClass = getRaritySlotClass(item.rarity);
    const isInteractive = !!onClick || !!dragSource || (!!dropTarget && !!onMoveItem);

    return (
        <>
            <div
                ref={slotRef}
                onMouseEnter={handleShowTooltip}
                onMouseLeave={handleHideTooltip}
                onFocus={handleShowTooltip}
                onBlur={handleHideTooltip}
                onClick={onClick}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onKeyDown={handleKeyDown}
                draggable={!!dragSource}
                role="button"
                tabIndex={isInteractive ? 0 : undefined}
                aria-label={item.name}
                aria-pressed={isSelected || undefined}
                data-equipable={isEquipable ? 'true' : undefined}
                title={item.name}
                className={`relative w-14 h-14 border rounded flex items-center justify-center transition-all duration-300 hover:scale-105 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 ${isSelected ? 'ring-2 ring-gold-400' : ''} ${isSuggestedTarget ? 'border-emerald-400/80 shadow-[0_0_0_1px_rgba(52,211,153,0.4)]' : ''} ${rarityClass} ${className}`}
            >
                {TIER_THRESHOLD.includes(item.rarity) && (
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
                {isEquipable && (
                    <span
                        aria-hidden="true"
                        title={equipHintTitle}
                        className="absolute left-0 top-0 flex h-4 w-4 items-center justify-center rounded-br border border-gold-400/40 bg-gold-500/15 text-[10px] font-black text-gold-200"
                    >
                        +
                    </span>
                )}
                {renderIcon(item.icon, 'text-4xl drop-shadow-md')}
                {quantity > 1 && (
                    <span
                        className="absolute bottom-0 right-0 px-1 min-w-[18px] text-center text-[10px] font-bold rounded-tl rounded-br bg-obsidian-900 text-parchment-100 border-gold-900/20 border"
                    >
                        x{quantity}
                    </span>
                )}
            </div>
            {isTooltipVisible && createPortal(
                <div
                    ref={tooltipRef}
                    className="fixed w-56 bg-obsidian-900 border border-gold-900/50 p-3 rounded-md pointer-events-none shadow-xl"
                    style={{
                        zIndex: 9999,
                        left: tooltipPos?.left ?? -9999,
                        top: tooltipPos?.top ?? -9999,
                        visibility: tooltipPos ? 'visible' : 'hidden',
                    }}
                >
                    <ItemTooltipContent item={item} tooltipRows={tooltipRows} />
                </div>,
                document.body
            )}
        </>
    );
};
