import { useState } from 'react';

type LocalStorageOptions<T> = {
    validate?: (value: unknown) => value is T;
    version?: number;
};

function isVersionedValue(value: unknown): value is { version: number; value: unknown } {
    return typeof value === 'object' && value !== null && 'version' in value && 'value' in value;
}

function resolveStoredValue<T>(rawValue: unknown, initialValue: T, options?: LocalStorageOptions<T>): T {
    const candidate = isVersionedValue(rawValue)
        ? rawValue.version === options?.version ? rawValue.value : initialValue
        : rawValue;

    if (options?.validate && !options.validate(candidate)) {
        return initialValue;
    }

    return candidate as T;
}

function serializeStoredValue<T>(value: T, options?: LocalStorageOptions<T>): string {
    return JSON.stringify(options?.version === undefined ? value : { version: options.version, value });
}

/**
 * Persists state to localStorage under the given key.
 * IMPORTANT: `key` is assumed to be a static string for the lifetime of the
 * component. Changing `key` between renders will NOT re-read from storage
 * and `setValue` will write to the original key.
 */
export function useLocalStorage<T>(
    key: string,
    initialValue: T,
    options?: LocalStorageOptions<T>,
): [T, (value: T | ((val: T) => T)) => void] {
    const [storedValue, setStoredValue] = useState<T>(() => {
        if (typeof window === 'undefined') {
            return initialValue;
        }
        try {
            const item = window.localStorage.getItem(key);
            if (item === null) return initialValue;
            try {
                return resolveStoredValue(JSON.parse(item), initialValue, options);
            } catch {
                // Value exists but isn't valid JSON (e.g. raw string "dark" or "original").
                // Return it directly if T is expected to be a string, else fall back.
                return resolveStoredValue(typeof initialValue === 'string' ? item : initialValue, initialValue, options);
            }
        } catch {
            return initialValue;
        }
    });

    const setValue = (value: T | ((val: T) => T)) => {
        setStoredValue(prev => {
            const valueToStore = value instanceof Function ? value(prev) : value;

            if (typeof window !== 'undefined') {
                try {
                    window.localStorage.setItem(key, serializeStoredValue(valueToStore, options));
                } catch (error) {
                    if (import.meta.env?.DEV && import.meta.env.MODE !== 'test') {
                        console.error(error);
                    }
                }
            }

            return valueToStore;
        });
    };

    return [storedValue, setValue];
}
