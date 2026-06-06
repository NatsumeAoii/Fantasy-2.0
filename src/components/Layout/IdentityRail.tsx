import type { Character } from '../../types'

interface IdentityRailProps {
  character: Character
}

export function IdentityRail({ character }: IdentityRailProps) {
  const initials =
    character.name
      .split(' ')
      .filter(Boolean)
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || '??'

  return (
    <>
      <div className="cathedral-panel rounded-md p-4 lg:hidden" role="region" aria-label="Character identity">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-md border border-gold-500/20 bg-black/30 text-lg font-serif font-bold text-gold-gradient">
            {initials}
          </div>
          <div className="min-w-0">
            <h2 className="truncate text-xl font-serif text-parchment-100">{character.name}</h2>
            <p className="truncate text-[11px] uppercase tracking-[0.26em] text-gold-500">
              Level {character.level} {character.role} - {character.race}
            </p>
          </div>
        </div>
      </div>

      <aside aria-label="Character identity" className="hidden min-h-0 space-y-4 lg:block lg:overflow-y-auto lg:pr-1">
        <div className="cathedral-panel relative aspect-square overflow-hidden rounded-md p-8">
          <div className="absolute inset-5 rounded-full border border-gold-500/10" />
          <div className="absolute inset-10 rounded-full border border-gold-500/12" />
          <div className="relative flex h-full items-center justify-center text-6xl font-serif font-bold text-gold-gradient">
            {initials}
          </div>
        </div>

        <div className="cathedral-panel rounded-md p-6">
          <h2 className="text-center text-2xl font-serif text-parchment-100">{character.name}</h2>
          <p className="mt-2 text-center text-[11px] uppercase tracking-[0.32em] text-gold-500">
            Level {character.level} {character.role}
          </p>
          <dl className="mt-6 space-y-3 text-sm text-parchment-200/90">
            <div className="flex items-center justify-between border-b border-gold-500/10 pb-2">
              <dt className="text-[11px] uppercase tracking-[0.22em] text-gold-600/80">Race</dt>
              <dd>{character.race}</dd>
            </div>
            <div className="flex items-center justify-between border-b border-gold-500/10 pb-2">
              <dt className="text-[11px] uppercase tracking-[0.22em] text-gold-600/80">Age</dt>
              <dd>{character.age} Cycles</dd>
            </div>
            <div className="flex items-start justify-between border-b border-gold-500/10 pb-2">
              <dt className="text-[11px] uppercase tracking-[0.22em] text-gold-600/80">Origin</dt>
              <dd className="max-w-[11rem] text-right">{character.region}</dd>
            </div>
            <div className="flex items-start justify-between border-b border-gold-500/10 pb-2">
              <dt className="text-[11px] uppercase tracking-[0.22em] text-gold-600/80">Guild</dt>
              <dd className="max-w-[11rem] text-right">{character.guild}</dd>
            </div>
            <div className="flex items-start justify-between">
              <dt className="text-[11px] uppercase tracking-[0.22em] text-gold-600/80">Faction</dt>
              <dd className="max-w-[11rem] text-right">{character.faction}</dd>
            </div>
          </dl>
        </div>
      </aside>
    </>
  )
}
