export interface PanelAction {
  label: string
  onClick: () => void
  tone?: 'primary' | 'secondary' | 'ghost'
}

interface PanelActionBarProps {
  title: string
  eyebrow?: string
  actions: readonly PanelAction[]
}

const toneClassMap = {
  primary: 'cathedral-button-primary',
  secondary: 'cathedral-button-secondary',
  ghost: 'cathedral-button-ghost',
} satisfies Record<NonNullable<PanelAction['tone']>, string>

export function PanelActionBar({ title, eyebrow, actions }: PanelActionBarProps) {
  return (
    <div className="flex flex-col gap-4 border-b border-gold-500/10 pb-6 md:flex-row md:items-end md:justify-between">
      <div className="space-y-2">
        {eyebrow ? (
          <p className="text-[11px] uppercase tracking-[0.32em] text-gold-500">{eyebrow}</p>
        ) : null}
        <h2 className="text-3xl font-serif font-bold text-parchment-100">{title}</h2>
      </div>

      <div className="flex flex-wrap gap-3">
        {actions.map((action) => (
          <button
            key={action.label}
            type="button"
            onClick={action.onClick}
            title={action.label}
            className={`${toneClassMap[action.tone ?? 'secondary']} rounded-md px-3 py-1.5 text-[11px] uppercase tracking-[0.18em]`}
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  )
}
