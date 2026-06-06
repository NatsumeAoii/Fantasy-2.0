import { useState } from 'react'
import { versions, currentVersion } from 'virtual:changelog'
import type { ChangelogEntry } from 'virtual:changelog'

const INITIALLY_VISIBLE = 2

function SectionIcon({ section }: { section: string }) {
  switch (section) {
    case 'Added':
      return <span className="text-emerald-400" aria-hidden="true">+</span>
    case 'Changed':
      return <span className="text-amber-400" aria-hidden="true">~</span>
    case 'Fixed':
      return <span className="text-sky-400" aria-hidden="true">●</span>
    case 'Removed':
      return <span className="text-red-400" aria-hidden="true">−</span>
    case 'Deprecated':
      return <span className="text-orange-400" aria-hidden="true">⚠</span>
    case 'Security':
      return <span className="text-rose-400" aria-hidden="true">⛊</span>
    default:
      return <span className="text-parchment-300/50" aria-hidden="true">•</span>
  }
}

function VersionEntry({ entry }: { entry: ChangelogEntry }) {
  const sectionOrder = ['Added', 'Changed', 'Fixed', 'Removed', 'Deprecated', 'Security']
  const orderedSections = sectionOrder.filter((s) => entry.sections[s]?.length)
  const extraSections = Object.keys(entry.sections).filter((s) => !sectionOrder.includes(s) && entry.sections[s].length)

  return (
    <article className="space-y-2">
      <header className="flex items-center gap-2">
        <span className="font-mono text-xs font-bold text-gold-100">v{entry.version}</span>
        <span className="text-[10px] text-text-muted">{entry.date}</span>
      </header>
      <div className="space-y-1.5 pl-1">
        {[...orderedSections, ...extraSections].map((section) => (
          <div key={section} className="space-y-0.5">
            <div className="flex items-center gap-1.5">
              <SectionIcon section={section} />
              <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-parchment-200/60">{section}</span>
              <span className="text-[9px] text-text-muted">({entry.sections[section].length})</span>
            </div>
            <ul className="space-y-0.5 pl-4">
              {entry.sections[section].map((item, i) => (
                <li key={i} className="text-[11px] leading-4 text-parchment-200/75">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </article>
  )
}

export function ChangelogDrawer({ onClose }: { onClose: () => void }) {
  const [showAll, setShowAll] = useState(false)
  const hiddenCount = versions.length - INITIALLY_VISIBLE
  const displayedVersions = showAll ? versions : versions.slice(0, INITIALLY_VISIBLE)

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-2 border-b border-gold-900/20 px-1.5 pb-2 pt-1">
        <button
          type="button"
          onClick={onClose}
          aria-label="Back"
          title="Back"
          className="cathedral-button-ghost flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-text-muted hover:text-gold-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>
        <span className="font-serif text-sm text-parchment-100">Changelog</span>
        <span className="ml-auto font-mono text-[9px] text-text-muted">v{currentVersion}</span>
      </div>

      <section
        role="region"
        aria-label="Version history"
        className="no-scrollbar max-h-64 space-y-4 overflow-y-auto px-1.5 py-2"
      >
        {displayedVersions.map((entry) => (
          <VersionEntry key={entry.version} entry={entry} />
        ))}

        {!showAll && hiddenCount > 0 ? (
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="w-full rounded-md border border-gold-900/25 px-2.5 py-2 text-center text-[10px] uppercase tracking-[0.16em] text-text-muted transition-colors hover:border-gold-500/25 hover:text-gold-100"
          >
            {hiddenCount} older {hiddenCount === 1 ? 'version' : 'versions'} — show all
          </button>
        ) : null}
      </section>
    </div>
  )
}
