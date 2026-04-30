type LegacyPerformance = Performance & {
  navigation?: {
    type?: number
  }
}

function getNavigationType(win: Window): PerformanceNavigationTiming['type'] | undefined {
  const navigationEntry = win.performance
    .getEntriesByType('navigation')
    .find((entry): entry is PerformanceNavigationTiming => 'type' in entry)

  if (navigationEntry) return navigationEntry.type

  const legacyType = (win.performance as LegacyPerformance).navigation?.type
  return legacyType === 1 ? 'reload' : undefined
}

export function shouldResetCharacterRouteOnReload(
  navigationType: PerformanceNavigationTiming['type'] | undefined,
  hash: string,
): boolean {
  return navigationType === 'reload' && hash.startsWith('#/character/')
}

export function resetCharacterRouteOnReload(win: Window = window): void {
  if (!shouldResetCharacterRouteOnReload(getNavigationType(win), win.location.hash)) return

  win.history.replaceState(
    win.history.state,
    win.document.title,
    `${win.location.pathname}${win.location.search}#/`,
  )
}
