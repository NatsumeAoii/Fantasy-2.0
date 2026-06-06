import type React from 'react';

interface CurrencyDisplayProps {
    currency: {
        crown?: number;
        gold: number;
        silver: number;
        copper: number;
        shard: number;
    };
}

export const CurrencyDisplay: React.FC<CurrencyDisplayProps> = ({ currency }) => {
    return (
        <div className="flex items-center gap-3 bg-black/40 px-3 py-1.5 rounded-full border border-gold-900/12">
            <span
                aria-hidden="true"
                className="h-4 w-4 rounded-full border border-gold-500/55 bg-gold-500/15 shadow-[inset_0_0_0_2px_rgba(214,169,77,0.18)]"
            />
            <div className="flex items-baseline gap-2 text-sm font-mono">
                {(currency.crown ?? 0) > 0 && (
                    <span className="text-rarity-artifact-text font-bold">{currency.crown}<span className="text-[10px] opacity-70 ml-0.5">cr</span></span>
                )}
                {currency.gold > 0 && (
                    <span className="text-gold-400 font-bold">{currency.gold}<span className="text-[10px] opacity-70 ml-0.5">g</span></span>
                )}
                {(currency.silver > 0 || currency.gold > 0 || (currency.crown ?? 0) > 0) && (
                    <span className="text-parchment-200 font-bold">{currency.silver}<span className="text-[10px] opacity-70 ml-0.5">s</span></span>
                )}
                <span className="text-gold-600 font-bold">{currency.copper}<span className="text-[10px] opacity-70 ml-0.5">c</span></span>
                <span className="text-gold-900 font-bold">{currency.shard}<span className="text-[10px] opacity-70 ml-0.5">sh</span></span>
            </div>
        </div>
    );
};
