import React, { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import type { RankedItem } from '../types';
import { getRankBadgeClasses, getRankColor, getRankSortOrder, isEliteRank } from '../lib/rankUtils';
import { useFocusTrap } from '../hooks';
import { getIcon, resolveIconName } from '../data/inventory/icons';

interface TitlesPanelProps {
    titles: RankedItem[];
}

const toIconTestId = (name: string) =>
    `title-icon-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;

export const TitlesPanel: React.FC<TitlesPanelProps> = ({ titles }) => {
    const [selectedTitle, setSelectedTitle] = useState<RankedItem | null>(null);
    const [sort, setSort] = useState<'rank' | 'alpha'>('rank');
    const focusTrapRef = useFocusTrap(!!selectedTitle);

    const sortedTitles = useMemo(
        () => [...titles].sort((a, b) => {
            if (sort === 'alpha') return a.name.localeCompare(b.name);
            return getRankSortOrder(a.rank) - getRankSortOrder(b.rank);
        }),
        [titles, sort]
    );

    return (
        <div className="relative min-h-[440px]">
            <div className="flex justify-between items-center mb-5 border-b border-gold-900/20 pb-3">
                <h3 className="font-serif text-lg text-gold-500">Known Epithets</h3>
                <div className="flex gap-2">
                    <span className="text-xs uppercase text-text-secondary self-center mr-2">Sort By</span>
                    <button onClick={() => setSort('rank')} title="Sort epithets by rank" aria-pressed={sort === 'rank'} className={`px-3 py-1 text-xs uppercase border rounded ${sort === 'rank' ? 'border-gold-500 text-gold-200' : 'border-transparent text-text-muted'}`}>Rank</button>
                    <button onClick={() => setSort('alpha')} title="Sort epithets by name" aria-pressed={sort === 'alpha'} className={`px-3 py-1 text-xs uppercase border rounded ${sort === 'alpha' ? 'border-gold-500 text-gold-200' : 'border-transparent text-text-muted'}`}>Name</button>
                </div>
            </div>

            <div className="space-y-2.5">
                {sortedTitles.map((title) => {
                    const iconName = resolveIconName({
                        explicitIcon: title.icon,
                        name: title.name,
                        description: title.description,
                        type: 'TITLE',
                        tags: [title.rank],
                    });
                    const TitleIcon = getIcon(iconName);

                    return (
                        <button
                            key={`${title.name}-${title.rank}`}
                            onClick={() => setSelectedTitle(title)}
                            title={`Inspect ${title.name}`}
                            className={`
                                w-full flex items-center justify-between p-3 border rounded-lg hover:brightness-110 transition-all group relative
                                ${getRankBadgeClasses(title.rank)} bg-opacity-40 border-opacity-40
                                ${isEliteRank(title.rank) ? 'ring-1 ring-current ring-opacity-30' : ''}
                            `}
                        >
                            {isEliteRank(title.rank) && (
                                <div className="absolute inset-0 bg-current opacity-5 rounded-lg" />
                            )}

                            <div className="flex items-center gap-4 relative z-10">
                                <div
                                    data-testid={toIconTestId(title.name)}
                                    data-icon-name={iconName}
                                    className={`w-8 h-8 rounded-full border border-current flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105 ${getRankColor(title.rank)}`}
                                >
                                    <TitleIcon aria-hidden="true" className="text-lg drop-shadow-sm" />
                                </div>
                                <span className="font-serif text-lg text-parchment-100 group-hover:text-white transition-colors">{title.name}</span>
                            </div>
                            <div className={`text-xs font-mono uppercase tracking-widest relative z-10 ${getRankColor(title.rank)}`}>
                                {title.rank} {isEliteRank(title.rank) ? '★' : ''}
                            </div>
                        </button>
                    );
                })}
            </div>

            {selectedTitle && createPortal(
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setSelectedTitle(null)}>
                    <div
                        ref={focusTrapRef}
                        className="cathedral-panel rounded-xl p-8 max-w-md w-full relative"
                        onClick={e => e.stopPropagation()}
                    >
                        <h2 className="text-3xl font-serif font-bold text-gold-100 mb-2">{selectedTitle.name}</h2>
                        <div className={`inline-block px-3 py-1 rounded border text-xs font-bold mb-6 ${getRankColor(selectedTitle.rank)}`}>
                            Rank {selectedTitle.rank}
                        </div>

                        <p className="text-parchment-200 leading-relaxed font-serif text-lg italic opacity-90 mb-6">
                            "{selectedTitle.description || `This title is bestowed upon those who have demonstrated the qualities of a true ${selectedTitle.rank} rank entity.`}"
                        </p>

                        <div className="rounded-md border border-gold-900/20 bg-obsidian-900/30 p-4">
                            <div className="text-xs font-bold uppercase text-gold-600">Rarity Classification</div>
                            <div className="text-2xl font-bold text-gold-600">{selectedTitle.rank}</div>
                        </div>

                        <button
                            className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-md text-gold-900 hover:bg-white/5 hover:text-gold-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
                            onClick={() => setSelectedTitle(null)}
                            aria-label="Close epithet detail"
                            title="Close epithet detail"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
};
