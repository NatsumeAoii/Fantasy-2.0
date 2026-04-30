interface PanelSearchProps {
  id: string
  label: string
  title: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  shownCount: number
  totalCount: number
  clearLabel: string
}

export function PanelSearch({
  id,
  label,
  title,
  placeholder,
  value,
  onChange,
  shownCount,
  totalCount,
  clearLabel,
}: PanelSearchProps) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <label htmlFor={id} className="sr-only">{label}</label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        title={title}
        placeholder={placeholder}
        className="min-h-10 w-full rounded-md border border-gold-900/22 bg-black/22 px-3 py-2.5 text-sm text-parchment-100 placeholder:text-text-muted focus:border-gold-500/45 focus:outline-none"
      />
      <div className="flex min-h-10 shrink-0 items-center justify-between gap-2 sm:justify-end">
        <span className="whitespace-nowrap text-[11px] text-text-muted">
          {shownCount} shown of {totalCount}
        </span>
        {value.trim() ? (
          <button
            type="button"
            aria-label={clearLabel}
            title={clearLabel}
            onClick={() => onChange('')}
            className="min-h-10 rounded-md border border-gold-900/20 bg-black/18 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-gold-300 transition-colors hover:border-gold-500/35 hover:text-gold-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  )
}
