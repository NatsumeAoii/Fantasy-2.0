export function ForgeHero() {
  return (
    <div className="relative mx-auto max-w-2xl text-center">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-10 h-44 w-44 -translate-x-1/2 rounded-full bg-gold-500/10 blur-3xl animate-pulse-slow"
      />

      <div className="relative space-y-5">
        <div className="space-y-3">
          <h1 className="drop-shadow-accent text-5xl font-serif font-bold tracking-[0.1em] text-gold-gradient md:text-6xl">
            AETHERIS
          </h1>
          <p className="mx-auto max-w-lg text-xs uppercase tracking-[0.34em] text-parchment-200/80 md:text-sm">
            Character Forge
          </p>
        </div>

      </div>
    </div>
  )
}
