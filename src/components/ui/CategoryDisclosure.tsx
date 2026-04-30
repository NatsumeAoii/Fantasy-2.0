import type React from 'react'

interface CategoryDisclosureProps {
  children: React.ReactNode
  defaultOpen?: boolean
  detail?: string
  title: string
}

export function CategoryDisclosure({ children, defaultOpen = false, detail, title }: CategoryDisclosureProps) {
  return (
    <details open={defaultOpen} className="rounded-md border border-gold-900/18 bg-black/10">
      <summary
        title={`Toggle ${title}`}
        className="cursor-pointer px-3 py-2.5 font-serif text-xs font-bold uppercase tracking-[0.16em] text-gold-500/82 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
      >
        <span>{title}</span>
        {detail ? <span className="float-right ml-3 font-sans text-[11px] font-normal normal-case tracking-normal text-text-muted">{detail}</span> : null}
      </summary>
      <div className="border-t border-gold-900/12 p-3">{children}</div>
    </details>
  )
}
