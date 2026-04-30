import { describe, expect, it, vi } from 'vitest'
import { ORDERED_RANK_NAMES, SKILL_DESC_TEMPLATES, TITLE_DESC_TEMPLATES } from '../../src/data/character'
import { LoreEngine } from '../../src/logic/LoreEngine'

describe('LoreEngine guardrails', () => {
  it('keeps missing role skill data quiet outside development diagnostics', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined)

    const result = LoreEngine.generateSkillsAndTitles('__missing_role__', 1, false)

    expect(result).toEqual({ skills: [], titles: [] })
    expect(warn).not.toHaveBeenCalled()

    warn.mockRestore()
  })

  it('keeps lore description templates aligned to every rank', () => {
    for (const rank of ORDERED_RANK_NAMES) {
      const skillTemplates = SKILL_DESC_TEMPLATES[rank as keyof typeof SKILL_DESC_TEMPLATES]
      const titleTemplates = TITLE_DESC_TEMPLATES[rank as keyof typeof TITLE_DESC_TEMPLATES]

      expect(skillTemplates, `${rank} skill`).toBeDefined()
      expect(skillTemplates.length, `${rank} skill`).toBeGreaterThan(0)
      expect(titleTemplates, `${rank} title`).toBeDefined()
      expect(titleTemplates.length, `${rank} title`).toBeGreaterThan(0)
    }
  })
})
