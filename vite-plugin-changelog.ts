/**
 * Vite Plugin: Changelog Parser
 *
 * Reads CHANGELOG.md at build time and exposes parsed version data
 * as a virtual module `virtual:changelog`. The app version is derived
 * from the first entry in the changelog — no manual package.json sync needed.
 *
 * Behavior:
 * - `npm run build` / CI: reads CHANGELOG.md once, injects into bundle.
 * - `npm run dev`: watches CHANGELOG.md for changes, triggers HMR reload.
 *
 * Usage in app code:
 *   import { versions, currentVersion } from 'virtual:changelog'
 */
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import type { Plugin } from 'vite'

export interface ChangelogEntry {
  version: string
  date: string
  sections: Record<string, string[]>
}

function parseChangelog(content: string): ChangelogEntry[] {
  const entries: ChangelogEntry[] = []
  const versionRegex = /^## \[([^\]]+)\] - (\d{4}-\d{2}-\d{2})/
  const sectionRegex = /^### (.+)/

  const lines = content.split('\n')
  let currentEntry: ChangelogEntry | null = null
  let currentSection: string | null = null

  for (const line of lines) {
    const versionMatch = line.match(versionRegex)
    if (versionMatch) {
      if (currentEntry) entries.push(currentEntry)
      currentEntry = { version: versionMatch[1], date: versionMatch[2], sections: {} }
      currentSection = null
      continue
    }

    if (!currentEntry) continue

    const sectionMatch = line.match(sectionRegex)
    if (sectionMatch) {
      currentSection = sectionMatch[1]
      if (!currentEntry.sections[currentSection]) {
        currentEntry.sections[currentSection] = []
      }
      continue
    }

    if (currentSection && line.startsWith('- ')) {
      currentEntry.sections[currentSection].push(line.slice(2).trim())
    }
  }

  if (currentEntry) entries.push(currentEntry)
  return entries
}

const VIRTUAL_MODULE_ID = 'virtual:changelog'
const RESOLVED_VIRTUAL_MODULE_ID = '\0' + VIRTUAL_MODULE_ID

export function changelogPlugin(): Plugin {
  let changelogPath: string

  return {
    name: 'vite-plugin-changelog',

    configResolved() {
      changelogPath = resolve(process.cwd(), 'CHANGELOG.md')
    },

    resolveId(id) {
      if (id === VIRTUAL_MODULE_ID) return RESOLVED_VIRTUAL_MODULE_ID
    },

    load(id) {
      if (id !== RESOLVED_VIRTUAL_MODULE_ID) return

      const content = readFileSync(changelogPath, 'utf-8')
      const entries = parseChangelog(content)
      const currentVersion = entries[0]?.version ?? '0.0.0'

      return `export const versions = ${JSON.stringify(entries)};
export const currentVersion = ${JSON.stringify(currentVersion)};`
    },

    // Dev server: watch CHANGELOG.md and trigger full reload when it changes.
    // This ensures editing the changelog during development updates the UI.
    configureServer(server) {
      server.watcher.add(changelogPath)
      server.watcher.on('change', (file) => {
        if (resolve(file) === changelogPath) {
          const mod = server.moduleGraph.getModuleById(RESOLVED_VIRTUAL_MODULE_ID)
          if (mod) {
            server.moduleGraph.invalidateModule(mod)
            server.ws.send({ type: 'full-reload' })
          }
        }
      })
    },
  }
}
