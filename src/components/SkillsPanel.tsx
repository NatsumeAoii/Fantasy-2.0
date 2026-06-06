import React, { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import type { GeneratedPoolEntry, RankedItem } from '../types';
import { getRankBadgeClasses, getRankColor, getRankSortOrder, isEliteRank } from '../lib/rankUtils';
import { metadataValue, uniqueGeneratedEntries } from '../lib/generatedEntryUtils';
import { useFocusTrap } from '../hooks';
import { usePersistedTab } from '../hooks/usePersistedTab';
import { getIcon, resolveIconName } from '../data/inventory/icons';
import { SecondaryTabs, type SecondaryTabItem } from './ui/SecondaryTabs';
import { PanelSearch } from './ui/PanelSearch';

type ArcanaSubTab = 'skills' | 'magic' | 'summons';

interface SkillsPanelProps {
    skills: RankedItem[];
    summon?: GeneratedPoolEntry | null;
    summons?: GeneratedPoolEntry[];
}

const ARCANA_TABS: readonly SecondaryTabItem<ArcanaSubTab>[] = [
    { id: 'skills', label: 'Skills', title: 'Show trained techniques' },
    { id: 'magic', label: 'Magic', title: 'Show known spells' },
    { id: 'summons', label: 'Summons', title: 'Show character summons' },
];

const toIconTestId = (name: string) =>
    `skill-icon-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;

function summonMetrics(summon: GeneratedPoolEntry): { label: string; value: string }[] {
    return [
        summon.category ? { label: 'Class', value: summon.category } : null,
        summon.tier ? { label: 'Tier', value: `Tier ${summon.tier}` } : null,
        summon.rarity ? { label: 'Rarity', value: summon.rarity } : null,
        metadataValue(summon, 'duration') ? { label: 'Duration', value: metadataValue(summon, 'duration') ?? '' } : null,
        metadataValue(summon, 'manaCost') ? { label: 'Mana Cost', value: metadataValue(summon, 'manaCost') ?? '' } : null,
    ].filter((metric): metric is { label: string; value: string } => Boolean(metric));
}

function SummonCard({ summon }: { summon: GeneratedPoolEntry }) {
    const metrics = summonMetrics(summon);
    const iconName = resolveIconName({
        explicitIcon: summon.icon,
        name: summon.name,
        category: summon.category,
        type: 'SUMMONING',
        description: summon.description,
        metadata: summon.metadata,
    });
    const summonIcon = React.createElement(getIcon(iconName), { 'aria-hidden': true });

    return (
        <article className="rounded-md border border-gold-900/15 bg-obsidian-900/28 p-4">
            <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-gold-500/20 bg-black/20 text-3xl text-gold-300/82">
                    {summonIcon}
                </div>
                <div className="min-w-0 flex-1">
                    <h4 className="font-serif text-lg font-bold text-parchment-100">{summon.name}</h4>
                    {summon.description ? <p className="mt-1 text-[13px] leading-6 text-parchment-200/72">{summon.description}</p> : null}
                </div>
            </div>

            {metrics.length > 0 ? (
                <dl className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-3">
                    {metrics.map((metric) => (
                        <div key={`${summon.id}-${metric.label}`} className="rounded border border-gold-900/12 bg-black/16 px-2.5 py-2">
                            <dt className="text-[9px] font-bold uppercase tracking-[0.14em] text-gold-500/65">{metric.label}</dt>
                            <dd className="mt-1 text-[12px] leading-5 text-parchment-200/72">{metric.value}</dd>
                        </div>
                    ))}
                </dl>
            ) : null}
        </article>
    );
}

function SummonPanel({ summon, summons = [] }: { summon?: GeneratedPoolEntry | null; summons?: GeneratedPoolEntry[] }) {
    const summonOptions = uniqueGeneratedEntries([...summons, summon]);

    if (summonOptions.length === 0) {
        return (
            <div className="rounded-md border border-gold-900/20 bg-black/20 p-8 text-center font-serif text-sm italic text-text-muted">
                No summon was generated for this character.
            </div>
        );
    }

    return (
        <section className="space-y-3">
            <header className="border-b border-gold-900/10 pb-4">
                <h3 className="font-serif text-2xl font-bold text-parchment-100">Character Summons</h3>
                <p className="mt-1 text-sm text-text-muted">
                    Conjured allies tied to this character's arcane kit.
                </p>
            </header>

            {summonOptions.map((option) => (
                <SummonCard key={option.id} summon={option} />
            ))}
        </section>
    );
}

export const SkillsPanel: React.FC<SkillsPanelProps> = ({ skills, summon, summons }) => {
    const [activeTab, setActiveTab] = usePersistedTab<ArcanaSubTab>('cathedral.arcana.activeTab', 'skills', ARCANA_TABS);
    const [selectedSkill, setSelectedSkill] = useState<RankedItem | null>(null);
    const [search, setSearch] = useState('');
    const focusTrapRef = useFocusTrap(!!selectedSkill);

    // Sort skills by rank (highest first); memoized to avoid re-sorting on modal open/close.
    const sortedSkills = useMemo(
        () => [...skills].sort((a, b) => getRankSortOrder(a.rank) - getRankSortOrder(b.rank)),
        [skills]
    );

    const visibleSkills = useMemo(
        () => sortedSkills.filter(skill => {
            if (activeTab === 'summons') return false;
            return activeTab === 'magic' ? skill.source === 'spell' : skill.source !== 'spell';
        }),
        [activeTab, sortedSkills]
    );

    const filteredSkills = useMemo(
        () => {
            if (!search) return visibleSkills;
            const term = search.toLowerCase();
            return visibleSkills.filter(skill => skill.name.toLowerCase().includes(term));
        },
        [visibleSkills, search]
    );
    const activeSkillTotal = visibleSkills.length;

    return (
        <div className="relative min-h-[440px]">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <SecondaryTabs
                    ariaLabel="Arcana sections"
                    activeId={activeTab}
                    idPrefix="arcana-tab"
                    panelIdPrefix="arcana-panel"
                    items={ARCANA_TABS}
                    onChange={setActiveTab}
                />
                {activeTab !== 'summons' ? (
                    <PanelSearch
                        id="arcana-search"
                        label="Search arcana"
                        title="Filter known arcana by name"
                        placeholder={`Search ${activeTab === 'magic' ? 'Magic' : 'Skills'}...`}
                        value={search}
                        onChange={setSearch}
                        shownCount={filteredSkills.length}
                        totalCount={activeSkillTotal}
                        clearLabel="Clear arcana search"
                    />
                ) : null}
            </div>

            {activeTab === 'summons' ? (
                <div
                    id="arcana-panel-summons"
                    role="tabpanel"
                    aria-labelledby="arcana-tab-summons"
                >
                    <SummonPanel summon={summon} summons={summons} />
                </div>
            ) : (
            <div
                id={`arcana-panel-${activeTab}`}
                role="tabpanel"
                aria-labelledby={`arcana-tab-${activeTab}`}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
            >
                {filteredSkills.map((skill) => {
                    const iconName = resolveIconName({
                        explicitIcon: skill.icon,
                        name: skill.name,
                        description: skill.description,
                        type: 'SKILL',
                        tags: [skill.rank],
                    });
                    const SkillIcon = getIcon(iconName);

                    return (
                        <button
                            key={`${skill.name}-${skill.rank}`}
                            onClick={() => setSelectedSkill(skill)}
                            title={`Inspect ${skill.name}`}
                            className={`
                                relative group p-3 min-h-[108px] flex flex-col justify-between items-start text-left
                                border rounded-lg backdrop-blur-sm transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg
                                ${getRankBadgeClasses(skill.rank)}
                                ${isEliteRank(skill.rank) ? 'ring-1 ring-current ring-opacity-30' : ''}
                            `}
                        >
                            {isEliteRank(skill.rank) && (
                                <div className="absolute inset-0 bg-current opacity-5 rounded-lg" />
                            )}

                            <div
                                data-testid={toIconTestId(skill.name)}
                                data-icon-name={iconName}
                                className="absolute right-2 top-2 text-4xl opacity-25 transition-all duration-300 group-hover:scale-110 group-hover:opacity-45"
                            >
                                <SkillIcon aria-hidden="true" className="drop-shadow-md" />
                            </div>

                            <div className={`font-mono text-xs font-bold mb-2 ${getRankColor(skill.rank)}`}>
                                {skill.rank} {isEliteRank(skill.rank) ? '★' : ''}
                            </div>
                            <div className="font-serif font-bold text-lg leading-tight group-hover:text-white transition-colors">{skill.name}</div>

                            <div className="absolute inset-0 border border-current opacity-20 rounded-lg group-hover:opacity-50 transition-opacity"></div>
                        </button>
                    );
                })}
            </div>
            )}

            {activeTab !== 'summons' && filteredSkills.length === 0 && (
                <div className="rounded-md border border-gold-900/20 bg-black/20 p-8 text-center font-serif text-sm italic text-text-muted">
                    No {activeTab === 'magic' ? 'magic' : 'skills'} found.
                </div>
            )}

            {selectedSkill && createPortal(
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setSelectedSkill(null)}>
                    <div
                        ref={focusTrapRef}
                        className="cathedral-panel rounded-xl p-8 max-w-lg w-full relative"
                        onClick={e => e.stopPropagation()}
                    >
                        <h2 className="text-3xl font-serif font-bold text-gold-100 mb-2">{selectedSkill.name}</h2>
                        <div className={`inline-block px-3 py-1 rounded border text-xs font-bold mb-6 ${getRankColor(selectedSkill.rank)}`}>
                            Rank {selectedSkill.rank}
                        </div>

                        <p className="text-parchment-200 leading-relaxed font-serif text-lg italic opacity-90 mb-6">
                            "{selectedSkill.description || "A technique of great power, etched into the very soul of the wielder."}"
                        </p>

                        <div className="grid grid-cols-2 gap-4 border-t border-gold-900/20 pt-4">
                            <div>
                                <div className="text-text-secondary text-xs uppercase tracking-widest">Cost</div>
                                <div className="text-parchment-100 font-mono text-lg">{selectedSkill.cost || "Unknown"}</div>
                            </div>
                            <div>
                                <div className="text-text-secondary text-xs uppercase tracking-widest">Cooldown</div>
                                <div className="text-parchment-100 font-mono text-lg">{selectedSkill.cooldown || "Unknown"}</div>
                            </div>
                        </div>

                        <button
                            className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-md text-gold-900 hover:bg-white/5 hover:text-gold-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
                            onClick={() => setSelectedSkill(null)}
                            aria-label="Close arcana detail"
                            title="Close arcana detail"
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
