import type React from 'react'
import { replaceSpecialPowerIds } from '../lib/specialPowerText'
import { usePersistedTab } from '../hooks/usePersistedTab'
import type { Character } from '../types'
import { IdentityPanel } from './IdentityPanel'
import { MechanicsPanel } from './MechanicsPanel'
import { TitlesPanel } from './TitlesPanel'
import { SecondaryTabs, type SecondaryTabItem } from './ui/SecondaryTabs'

type ChronicleSubTab = 'story' | 'identity' | 'titles' | 'mechanics'

interface LorePanelProps {
  character: Character
}

const CHRONICLE_TABS: readonly SecondaryTabItem<ChronicleSubTab>[] = [
  { id: 'story', label: 'Story', title: 'Backstory and traits' },
  { id: 'identity', label: 'Identity', title: 'Bonds, quirks, and secrets' },
  { id: 'titles', label: 'Titles', title: 'Earned epithets and ranks' },
  { id: 'mechanics', label: 'Mechanics', title: 'Feats, achievements, and consequences' },
]

function StorySection({ backstory }: { backstory: Character['backstory'] | null | undefined }) {
  if (!backstory) {
    return <p className="py-8 text-center text-sm italic text-text-muted">No lore has been inscribed for this character.</p>
  }

  return (
    <div className="space-y-5">
      <div className="relative overflow-hidden rounded-md border border-gold-900/15 bg-obsidian-900/30 p-4">
        <div aria-hidden="true" className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
        <h3 className="mb-3 font-serif text-xs uppercase tracking-[0.18em] text-gold-500/70">The Story</h3>
        <div className="space-y-2.5">
          {backstory.paragraphs.map((paragraph, index) => (
            <p key={`para-${index}-${paragraph.slice(0, 16)}`} className="font-serif text-[13px] italic leading-relaxed text-parchment-200/80">
              {index === 0 ? `"${replaceSpecialPowerIds(paragraph)}` : replaceSpecialPowerIds(paragraph)}
              {index === backstory.paragraphs.length - 1 ? '"' : ''}
            </p>
          ))}
        </div>
        <div className="mt-3 border-t border-gold-900/10 pt-3 font-serif text-[11px] tracking-wide text-text-muted">
          {replaceSpecialPowerIds(backstory.attribution)}
        </div>
      </div>

      {backstory.traits.length > 0 ? (
        <div className="rounded-md border border-gold-900/15 bg-obsidian-900/30 p-4">
          <h3 className="mb-3 font-serif text-xs uppercase tracking-[0.18em] text-gold-500/70">Traits</h3>
          <div className="flex flex-wrap gap-1.5">
            {backstory.traits.map((trait) => (
              <span
                key={trait}
                className="rounded border border-gold-500/20 bg-gold-900/20 px-2.5 py-1 font-serif text-xs tracking-wide text-gold-300"
              >
                {trait}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {backstory.personality.length > 0 ? (
        <div className="rounded-md border border-gold-900/15 bg-obsidian-900/30 p-4">
          <h3 className="mb-3 font-serif text-xs uppercase tracking-[0.18em] text-gold-500/70">Personality</h3>
          <ul className="space-y-2">
            {backstory.personality.map((quirk, index) => (
              <li key={index} className="flex items-start gap-3 font-serif text-[13px] text-parchment-200/70">
                <span className="mt-0.5 shrink-0 text-gold-500/50">-</span>
                {quirk}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  )
}

export const LorePanel: React.FC<LorePanelProps> = ({ character }) => {
  const [activeTab, setActiveTab] = usePersistedTab<ChronicleSubTab>('cathedral.chronicle.activeTab', 'story', CHRONICLE_TABS)
  const { backstory } = character
  const summary = backstory?.summary
    ? replaceSpecialPowerIds(backstory.summary)
    : `${character.name}'s story, identity, and earned epithets.`

  return (
    <div className="mx-auto w-full max-w-6xl space-y-5 p-4 animate-fade-in md:p-5">
      <header className="border-b border-gold-900/10 pb-4">
        <h2 className="font-serif text-3xl font-bold text-parchment-100">Chronicle</h2>
        <p className="mt-1 text-sm text-text-muted">
          {summary}
        </p>
      </header>

      <SecondaryTabs
        ariaLabel="Chronicle sections"
        activeId={activeTab}
        idPrefix="chronicle-tab"
        panelIdPrefix="chronicle-panel"
        items={CHRONICLE_TABS}
        onChange={setActiveTab}
      />

      <div id={`chronicle-panel-${activeTab}`} role="tabpanel" aria-labelledby={`chronicle-tab-${activeTab}`} className="min-h-[28rem]">
        {activeTab === 'story' ? <StorySection backstory={backstory} /> : null}
        {activeTab === 'identity' ? <IdentityPanel character={character} embedded /> : null}
        {activeTab === 'titles' ? <TitlesPanel titles={character.titles} /> : null}
        {activeTab === 'mechanics' ? <MechanicsPanel mechanics={character.mechanics} /> : null}
      </div>
    </div>
  )
}
