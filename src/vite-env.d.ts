/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Injected at build time from package.json version. */
  readonly VITE_APP_VERSION: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module 'virtual:changelog' {
  export interface ChangelogEntry {
    version: string
    date: string
    sections: Record<string, string[]>
  }
  export const versions: ChangelogEntry[]
  export const currentVersion: string
}
