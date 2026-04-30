import { useLocalStorage } from './useLocalStorage'

export function usePersistedTab<T extends string>(
  key: string,
  initialValue: T,
  items: readonly { id: T }[],
): [T, (value: T | ((previous: T) => T)) => void] {
  const isValidTab = (value: unknown): value is T =>
    typeof value === 'string' && items.some((item) => item.id === value)

  return useLocalStorage<T>(key, initialValue, {
    validate: isValidTab,
    version: 1,
  })
}
