import { useRef, type KeyboardEvent } from 'react'

export interface SecondaryTabItem<T extends string> {
  id: T
  label: string
  title?: string
}

interface SecondaryTabsProps<T extends string> {
  ariaLabel: string
  activeId: T
  idPrefix?: string
  items: readonly SecondaryTabItem<T>[]
  onChange: (id: T) => void
  panelIdPrefix?: string
}

export function SecondaryTabs<T extends string>({
  ariaLabel,
  activeId,
  idPrefix,
  items,
  onChange,
  panelIdPrefix,
}: SecondaryTabsProps<T>) {
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])

  const focusTab = (index: number) => {
    const nextItem = items[index]
    if (!nextItem) return

    onChange(nextItem.id)
    tabRefs.current[index]?.focus()
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (items.length === 0) return

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault()
      focusTab((index + 1) % items.length)
      return
    }

    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault()
      focusTab((index - 1 + items.length) % items.length)
      return
    }

    if (event.key === 'Home') {
      event.preventDefault()
      focusTab(0)
      return
    }

    if (event.key === 'End') {
      event.preventDefault()
      focusTab(items.length - 1)
    }
  }

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className="flex flex-wrap justify-start gap-1.5 border-b border-gold-900/20 pb-2"
    >
      {items.map((item, index) => {
        const isActive = activeId === item.id

        return (
          <button
            key={item.id}
            ref={(element) => {
              tabRefs.current[index] = element
            }}
            type="button"
            role="tab"
            id={idPrefix ? `${idPrefix}-${item.id}` : undefined}
            aria-controls={panelIdPrefix ? `${panelIdPrefix}-${item.id}` : undefined}
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(item.id)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            title={item.title ?? item.label}
            className={`
              px-2 py-1 text-[10px] font-serif font-bold uppercase tracking-widest border rounded transition-all
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400
              ${isActive
                ? 'bg-gold-900/20 border-gold-500 text-gold-400 shadow-accent'
                : 'bg-transparent border-transparent text-parchment-300 hover:text-gold-200 hover:bg-gold-900/5'}
            `}
          >
            {item.label}
          </button>
        )
      })}
    </div>
  )
}
