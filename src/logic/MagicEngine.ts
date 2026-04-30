import { MAGIC_CONFIG } from '../config'
import { HAZARDS, SPELLS } from '../data/magic'
import type { CharacterCore, GeneratedMagic, GeneratedPoolEntry, RankedItem } from '../types'
import { entry, resolveChoice, resolveCount, roleMatches } from './ExpansionUtils'
import { PoolEngine } from './PoolEngine'

const SPELL_SKILL_RANKS = MAGIC_CONFIG.SPELLS.SKILL_RANK_BY_LEVEL_AND_RARITY
const DEFAULT_SPELL_SKILL_RANK = 'F'

function maxSpellLevelForCharacter(level: number): string {
  return resolveChoice(
    MAGIC_CONFIG.SPELLS.MAX_SPELL_LEVEL_BY_CHARACTER_LEVEL,
    level,
    'spellLevels',
    'Petty',
  )
}

function spellLevelIndex(level: string): number {
  return MAGIC_CONFIG.SPELLS.LEVEL_ORDER.findIndex((candidate) => candidate === level)
}

function canUseSpell(spell: (typeof SPELLS)[number], character: CharacterCore): boolean {
  const maxLevel = maxSpellLevelForCharacter(character.level)
  const maxIndex = spellLevelIndex(maxLevel)
  const spellIndex = spellLevelIndex(spell.level)
  return spellIndex >= 0 && maxIndex >= 0 && spellIndex <= maxIndex
}

function spellWeight(spell: (typeof SPELLS)[number], character: CharacterCore): number {
  const role = character.role.toLowerCase()
  const school = spell.school.toLowerCase()
  const rarityWeight = spell.rarity === 'Common' ? 4 : spell.rarity === 'Uncommon' ? 2 : spell.rarity === 'Rare' ? 1 : 0.45

  if (role.includes('necromancer') && school.includes('death')) return rarityWeight * 5
  if (role.includes('alchemist') && school.includes('alchemy')) return rarityWeight * 5
  if (role.includes('summoner') && school.includes('summoning')) return rarityWeight * 5
  if ((role.includes('cleric') || role.includes('priest')) && (school.includes('warding') || school.includes('enchantment'))) {
    return rarityWeight * 3
  }

  return rarityWeight
}

function normalizeSpell(spell: (typeof SPELLS)[number]): GeneratedPoolEntry {
  return entry({
    id: spell.id,
    name: spell.name,
    category: spell.school,
    tier: spell.level,
    rarity: spell.rarity,
    description: spell.description,
    effect: spell.effect?.description,
    metadata: {
      manaCost: spell.manaCost,
      hpCost: spell.hpCost,
      damage: spell.damage,
      damageType: spell.damageType,
      castingTime: spell.castingTime,
      cooldown: spell.baseCooldown,
      range: spell.range,
      resistCheck: spell.resistCheck,
    },
  })
}

function normalizeHazard(hazard: (typeof HAZARDS)[number]): GeneratedPoolEntry {
  return entry({
    id: hazard.id,
    name: hazard.name,
    category: hazard.type,
    tier: hazard.severity,
    description: hazard.description,
    effect: hazard.negativeEffect.description,
    metadata: {
      trigger: hazard.trigger,
      damageType: hazard.damageType,
      baseDamage: hazard.baseDamage,
      baseDuration: hazard.baseDuration,
    },
  })
}

function numericMetadataValue(entry: GeneratedPoolEntry, key: string): number {
  const value = entry.metadata?.[key]
  return typeof value === 'number' && Number.isFinite(value) ? value : 0
}

function formatSpellCost(spell: GeneratedPoolEntry): string {
  const manaCost = numericMetadataValue(spell, 'manaCost')
  const hpCost = numericMetadataValue(spell, 'hpCost')
  const costs = [
    manaCost > 0 ? `${manaCost} Mana` : '',
    hpCost > 0 ? `${hpCost} HP` : '',
  ].filter(Boolean)

  return costs.length > 0 ? costs.join(' + ') : 'No Cost'
}

function formatSpellCooldown(spell: GeneratedPoolEntry): string {
  const cooldown = numericMetadataValue(spell, 'cooldown')
  return cooldown > 0 ? `${cooldown}s` : 'Instant'
}

function rankForSpell(spell: GeneratedPoolEntry): string {
  const level = typeof spell.tier === 'string' ? spell.tier : ''
  const rarity = typeof spell.rarity === 'string' ? spell.rarity : ''
  const levelRanks = SPELL_SKILL_RANKS[level as keyof typeof SPELL_SKILL_RANKS]

  return levelRanks?.[rarity as keyof typeof levelRanks] ?? DEFAULT_SPELL_SKILL_RANK
}

/** Converts a generated spell entry into the same ranked shape used by Arcana skills. */
export function magicSpellToRankedSkill(spell: GeneratedPoolEntry): RankedItem {
  return {
    name: spell.name,
    rank: rankForSpell(spell),
    icon: spell.icon,
    cooldown: formatSpellCooldown(spell),
    cost: formatSpellCost(spell),
    description: spell.description,
    source: 'spell',
    category: spell.category,
    tier: spell.tier,
    rarity: spell.rarity,
    effect: spell.effect,
    metadata: spell.metadata,
  }
}

/** Appends generated spells to skills without duplicating an existing skill name. */
export function mergeMagicSpellsIntoSkills(skills: readonly RankedItem[], spells: readonly GeneratedPoolEntry[]): RankedItem[] {
  const existingNames = new Set(skills.map((skill) => skill.name.toLowerCase()))
  const spellSkills = spells
    .filter((spell) => !existingNames.has(spell.name.toLowerCase()))
    .map(magicSpellToRankedSkill)

  return [...skills, ...spellSkills]
}

export const MagicEngine = {
  generate(character: CharacterCore): GeneratedMagic {
    const isCaster = roleMatches(character.role, MAGIC_CONFIG.SPELLS.CASTER_ROLE_KEYWORDS)
    const baseSpellCount = resolveCount(MAGIC_CONFIG.SPELLS.COUNT_BY_LEVEL, character.level)
    const spellCount = isCaster ? baseSpellCount : Math.min(baseSpellCount, MAGIC_CONFIG.SPELLS.NON_CASTER_MAX_COUNT)
    const spellCandidates = SPELLS.filter((spell) => canUseSpell(spell, character))
    const spells = PoolEngine
      .pickManyWeighted(spellCandidates, spellCount, (spell) => spellWeight(spell, character), { fallbackPool: SPELLS })
      .map(normalizeSpell)

    const hazards = PoolEngine
      .pickManyWeighted(HAZARDS, resolveCount(MAGIC_CONFIG.HAZARDS.COUNT_BY_LEVEL, character.level))
      .map(normalizeHazard)

    return { spells, hazards }
  },
}
