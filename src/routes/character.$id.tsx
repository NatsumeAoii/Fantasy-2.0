import { createFileRoute } from '@tanstack/react-router'
import { lazy, Suspense } from 'react'
import { ErrorBoundary } from '../components/ErrorBoundary'
import { CharacterShell } from '../components/Layout/CharacterShell'
import { TopTabs } from '../components/Layout/TopTabs'
import { OverviewPanel } from '../components/OverviewPanel'
import { useCharacterPage } from '../store/useCharacterPage'
import { normalizeCharacterName, normalizeCharacterSeed } from './buildCharacterDestination'

const StatsPanel = lazy(() => import('../components/StatsPanel').then((m) => ({ default: m.StatsPanel })))
const SkillsPanel = lazy(() => import('../components/SkillsPanel').then((m) => ({ default: m.SkillsPanel })))
const InventoryPanel = lazy(() => import('../components/Inventory/InventoryPanel').then((m) => ({ default: m.InventoryPanel })))
const LorePanel = lazy(() => import('../components/LorePanel').then((m) => ({ default: m.LorePanel })))
const WorldPanel = lazy(() => import('../components/WorldPanel').then((m) => ({ default: m.WorldPanel })))

type CharacterSearch = {
  name?: string
}

export const Route = createFileRoute('/character/$id')({
  component: CharacterSheet,
  validateSearch: (search: Record<string, unknown>): CharacterSearch => {
    const name = normalizeCharacterName(search.name)
    return { name: name || undefined }
  },
})

const TabSkeleton = () => (
  <div className="space-y-5 p-6 animate-pulse" aria-label="Loading tab content">
    <div className="h-7 w-48 rounded-md bg-gold-500/10" />
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="cathedral-panel h-28 rounded-md bg-white/3" />
      ))}
    </div>
    <div className="cathedral-panel h-64 rounded-md bg-white/2" />
  </div>
)

const CharacterSkeleton = () => (
  <div className="w-full animate-pulse" aria-label="Loading character sheet">
    <div className="fixed left-0 right-0 top-6 z-40">
      <div className="mx-auto max-w-7xl px-4">
        <div className="cathedral-panel h-16 rounded-md" />
      </div>
    </div>

    <div className="grid w-full min-w-0 grid-cols-1 gap-4 pb-4 pt-10 lg:grid-cols-[minmax(260px,300px)_minmax(0,1fr)] lg:items-start lg:pb-0">
      <div className="cathedral-panel rounded-md p-4 lg:hidden">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-md border border-gold-500/20 bg-black/30" />
          <div className="min-w-0 flex-1 space-y-2">
            <div className="h-6 w-40 rounded-md bg-gold-500/10" />
            <div className="h-3 w-52 rounded-md bg-gold-500/10" />
          </div>
        </div>
      </div>

      <div className="hidden space-y-5 lg:block">
        <div className="cathedral-panel aspect-square rounded-md" />
        <div className="cathedral-panel h-72 rounded-md" />
      </div>

      <div className="cathedral-panel h-[clamp(55rem,calc(100dvh-14rem),35rem)] rounded-md lg:h-[clamp(55rem,calc(100dvh-16rem),40rem)]" />
    </div>
  </div>
)

function CharacterSheet() {
  const { id } = Route.useParams()
  const { name } = Route.useSearch()
  const seed = normalizeCharacterSeed(id)

  const {
    character,
    activeTab,
    isLoading,
    generationError,
    setTab,
    updateBestiary,
    handleBack,
    handleExport,
    handleShare,
    handleNavigateToLore,
    handleInventoryMove,
  } = useCharacterPage(seed, name)

  if (generationError) {
    return (
      <div className="flex min-h-[60vh] w-full items-center justify-center py-10 animate-fade-in">
        <div className="cathedral-panel max-w-md rounded-md p-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-md border border-red-500/20 bg-red-500/10 text-red-300">
            !
          </div>
          <h2 className="mt-5 text-3xl font-serif text-parchment-100">The Forge Has Faltered</h2>
          <p className="mt-3 text-sm leading-7 text-parchment-200/75">{generationError}</p>
          <button
            onClick={handleBack}
            title="Return to the forge"
            className="cathedral-button-secondary mt-6 rounded-md px-5 py-3 text-xs uppercase tracking-[0.24em]"
          >
            Return to the Forge
          </button>
        </div>
      </div>
    )
  }

  if (isLoading || !character) {
    return <CharacterSkeleton />
  }

  return (
    <CharacterShell character={character} tabs={<TopTabs activeTab={activeTab} onChange={setTab} onBack={handleBack} />}>
      <main
        id={`panel-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeTab}`}
        className="tab-panel-enter"
      >
        <ErrorBoundary key={activeTab}>
          {activeTab === 'overview' && (
            <OverviewPanel
              character={character}
              onShare={handleShare}
              onExport={handleExport}
              onNewCharacter={handleBack}
              onNavigateToLore={handleNavigateToLore}
            />
          )}

          <Suspense fallback={<TabSkeleton />}>
            {activeTab === 'lore' && <LorePanel character={character} />}
            {activeTab === 'world' && <WorldPanel character={character} />}
            {activeTab === 'stats' && (
              <div className="w-full p-4 md:p-5">
                <StatsPanel character={character} />
              </div>
            )}
            {activeTab === 'skills' && (
              <div className="w-full p-4 md:p-5">
                <SkillsPanel
                  skills={character.skills}
                  summon={character.bestiary.summon}
                  summons={character.bestiary.summons}
                />
              </div>
            )}
            {activeTab === 'inventory' && (
              <div className="w-full p-4 md:p-5">
                <InventoryPanel
                  inventory={character.inventory}
                  recipes={character.inventoryContext.recipes}
                  bestiary={character.bestiary}
                  characterProfile={{
                    level: character.level,
                    race: character.race,
                    role: character.role,
                  }}
                  onBestiaryChange={updateBestiary}
                  onMoveItem={handleInventoryMove}
                />
              </div>
            )}
          </Suspense>
        </ErrorBoundary>
      </main>
    </CharacterShell>
  )
}
