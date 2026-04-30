import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

describe('character chronicle route wiring', () => {
  it('keeps character-self sections inside Chronicle instead of top-level tabs', () => {
    const routeSource = readFileSync('src/routes/character.$id.tsx', 'utf8')
    const topTabsSource = readFileSync('src/components/Layout/TopTabs.tsx', 'utf8')
    const lorePanelSource = readFileSync('src/components/LorePanel.tsx', 'utf8')

    expect(topTabsSource).not.toContain("{ id: 'identity'")
    expect(topTabsSource).not.toContain("{ id: 'titles'")
    expect(topTabsSource).not.toContain("{ id: 'mechanics'")
    expect(routeSource).not.toContain("activeTab === 'identity'")
    expect(routeSource).not.toContain("activeTab === 'titles'")
    expect(routeSource).not.toContain("activeTab === 'mechanics'")
    expect(lorePanelSource).toContain("type ChronicleSubTab = 'story' | 'identity' | 'titles' | 'mechanics'")
    expect(lorePanelSource).toContain("id: 'story'")
    expect(lorePanelSource).toContain("id: 'identity'")
    expect(lorePanelSource).toContain("id: 'titles'")
    expect(lorePanelSource).toContain("id: 'mechanics'")
    expect(lorePanelSource).toContain('<IdentityPanel character={character} embedded />')
    expect(lorePanelSource).toContain('<TitlesPanel titles={character.titles} />')
    expect(lorePanelSource).toContain('<MechanicsPanel mechanics={character.mechanics} />')
  })
})
