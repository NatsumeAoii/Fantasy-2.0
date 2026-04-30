import { describe, expect, it } from 'vitest'
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'
import * as bestiaryData from '../../../src/data/bestiary'
import * as characterData from '../../../src/data/character'
import * as identityData from '../../../src/data/identity'
import * as inventoryData from '../../../src/data/inventory'
import * as magicData from '../../../src/data/magic'
import * as mechanicsData from '../../../src/data/mechanics'
import * as storyData from '../../../src/data/story'
import * as worldData from '../../../src/data/world'
import {
  ICON_REGISTRY,
  type IconResolveInput,
  getDataIconFallbackGroups,
  getDataIconFallbackIds,
  getSemanticIconRuleNames,
  resolveIconName,
} from '../../../src/data/inventory/icons'

type DataAuditInput = IconResolveInput & { path: string }
type DataContext = Pick<IconResolveInput, 'explicitIcon' | 'id' | 'name' | 'category' | 'type'>

const DATA_MODULES = [
  { label: 'bestiary', module: bestiaryData },
  { label: 'character', module: characterData },
  { label: 'identity', module: identityData },
  { label: 'inventory', module: inventoryData },
  { label: 'magic', module: magicData },
  { label: 'mechanics', module: mechanicsData },
  { label: 'story', module: storyData },
  { label: 'world', module: worldData },
] as const

const NON_DISPLAY_EXPORTS = new Set(['ARTIFACT_GRAMMAR'])

function readDataFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry)
    if (statSync(path).isDirectory()) return readDataFiles(path)
    if (!path.endsWith('.ts') || path.endsWith('.test.ts') || path.endsWith('icons.ts')) return []
    return [readFileSync(path, 'utf8')]
  })
}

function readDataIconRefs(dir: string): { id: string; icon: string }[] {
  return readDataFiles(dir).flatMap((text) =>
    [...text.matchAll(/id: '([^']+)'[\s\S]*?icon: '([^']+)'/g)].map((match) => ({
      id: match[1],
      icon: match[2],
    })),
  )
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Object.prototype.toString.call(value) === '[object Object]'
}

function stringValue(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() ? value : undefined
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string')
}

function metadataValue(value: unknown): unknown {
  if (value === null || value === undefined) return undefined
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') return value
  if (isStringArray(value)) return value
  return undefined
}

function iconMetadata(value: Record<string, unknown>): Record<string, unknown> | undefined {
  const entries = Object.entries(value)
    .map(([key, item]) => [key, metadataValue(item)] as const)
    .filter((entry): entry is readonly [string, unknown] => entry[1] !== undefined)

  return entries.length > 0 ? Object.fromEntries(entries) : undefined
}

function slug(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '') || 'entry'
}

function inferGroupedType(exportName: string): string {
  if (exportName.includes('SKILL')) return 'SKILL'
  if (exportName.includes('TITLE')) return 'TITLE'
  if (exportName.includes('TRAIT')) return 'TRAIT'
  if (exportName.includes('PERSONALITY')) return 'PERSONALITY'
  if (exportName.includes('FACTION') || exportName.includes('GUILD')) return 'FACTION'
  if (exportName.includes('REGION')) return 'LOCATION'
  return exportName.replace(/_/g, ' ')
}

function exportLabel(exportName: string): string {
  return exportName
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}

function collectGroupedStringEntries(
  value: Record<string, unknown>,
  path: string[],
  entries: DataAuditInput[],
): void {
  if (path.length !== 2) return

  const groupedEntries = Object.entries(value).filter(
    (entry): entry is [string, string[]] => isStringArray(entry[1]),
  )
  if (groupedEntries.length === 0 || groupedEntries.length !== Object.keys(value).length) return

  const exportName = path[path.length - 1] ?? 'DATA'
  for (const [groupName, groupValue] of groupedEntries) {
    const type = inferGroupedType(exportName)
    const category = groupName
    entries.push({
      path: [...path, groupName].join('.'),
      id: slug(`${exportName}_${groupName}`),
      name: groupName,
      category,
      type,
    })

    for (const item of groupValue) {
      entries.push({
        path: [...path, groupName, item].join('.'),
        id: slug(`${exportName}_${groupName}_${item}`),
        name: item,
        category,
        type,
      })
    }
  }
}

function collectVariantEntries(
  value: unknown,
  path: string[],
  entries: DataAuditInput[],
  context: DataContext,
): void {
  if (!Array.isArray(value)) return

  value.forEach((variant, index) => {
    if (!isPlainObject(variant)) return
    const name = stringValue(variant.name) ?? context.name
    const description = stringValue(variant.description) ?? stringValue(variant.desc)
    if (!name && !description) return

    entries.push({
      path: [...path, String(index)].join('.'),
      explicitIcon: context.explicitIcon,
      id: context.id,
      name,
      category: context.category,
      type: context.type,
      description,
      variant: {
        name,
        description,
        desc: stringValue(variant.desc),
      },
      metadata: iconMetadata(variant),
    })
  })
}

function collectDataAuditInputs(value: unknown, path: string[], entries: DataAuditInput[], context: DataContext): void {
  if (Array.isArray(value)) {
    if (value.every((item) => typeof item === 'string')) return
    value.forEach((item, index) => collectDataAuditInputs(item, [...path, String(index)], entries, context))
    return
  }

  if (!isPlainObject(value)) return

  collectGroupedStringEntries(value, path, entries)

  const exportName = path[1] ?? ''
  const isKeyedRaceOrRoleRecord = path.length === 3 && (exportName === 'RACES' || exportName === 'ROLES')
  if (isKeyedRaceOrRoleRecord) {
    entries.push({
      path: path.join('.'),
      id: slug(path[path.length - 1]),
      name: path[path.length - 1],
      category: exportName === 'RACES' ? 'RACE' : 'ROLE',
      metadata: iconMetadata(value),
    })
  }

  const id = stringValue(value.id)
  const name = stringValue(value.name) ?? stringValue(value.title)
  const category =
    stringValue(value.category) ??
    stringValue(value.school) ??
    stringValue(value.target) ??
    stringValue(value.type) ??
    context.category
  const type = stringValue(value.type) ?? stringValue(value.school) ?? context.type
  const description = stringValue(value.description) ?? stringValue(value.desc)
  const effect = stringValue(value.effect)
  const benefit = stringValue(value.benefit)
  const mechanicalEffect = stringValue(value.mechanicalEffect)
  const explicitIcon = stringValue(value.icon)

  if (id || explicitIcon || (name && (category || type || description))) {
    entries.push({
      path: path.join('.'),
      explicitIcon,
      id,
      name,
      category,
      type,
      description,
      effect,
      benefit,
      mechanicalEffect,
      metadata: iconMetadata(value),
    })
  }

  const nextContext = {
    explicitIcon: explicitIcon ?? context.explicitIcon,
    id: id ?? context.id,
    name: name ?? context.name,
    category,
    type,
  }
  for (const [key, child] of Object.entries(value)) {
    if (key === 'metadata') continue
    if (key === 'variants' || key === 'variations') {
      collectVariantEntries(child, [...path, key], entries, nextContext)
      continue
    }
    collectDataAuditInputs(child, [...path, key], entries, {
      ...nextContext,
      category: Array.isArray(child) ? key : nextContext.category,
    })
  }
}

function readExportedDataAuditInputs(): DataAuditInput[] {
  const entries: DataAuditInput[] = []
  for (const { label, module } of DATA_MODULES) {
    for (const [exportName, value] of Object.entries(module)) {
      if (NON_DISPLAY_EXPORTS.has(exportName)) continue

      collectDataAuditInputs(value, [label, exportName], entries, {
        category: exportLabel(exportName),
        type: inferGroupedType(exportName),
      })
    }
  }
  return entries
}

describe('semantic icon resolution', () => {
  it('keeps explicit registered icons ahead of semantic matches', () => {
    expect(resolveIconName({ explicitIcon: 'GiRing', name: 'Chain Lightning Ring' })).toBe('GiRing')
  })

  it('matches specific fantasy terms before generic category fallbacks', () => {
    expect(resolveIconName({ name: 'Chain Lightning', description: 'Arcs between nearby enemies.' })).toBe(
      'GiLightningStorm',
    )
    expect(resolveIconName({ name: "Plague-Doctor's Satchel", type: 'MISC' })).toBe('GiPlagueDoctorProfile')
    expect(resolveIconName({ name: 'Rune of Annihilation', description: 'A forbidden carved spell.' })).toBe(
      'GiRuneStone',
    )
  })

  it('resolves icons from ids, categories, effects, benefits, and metadata text', () => {
    expect(resolveIconName({
      id: 'shield_master',
      name: 'Unmarked Talent',
      category: 'Combat',
      benefit: 'The character can use their shield to shove enemies and brace behind it.',
    })).toBe('GiShield')

    expect(resolveIconName({
      id: 'nyx',
      name: 'Veiled Patron',
      category: 'Chaos / Impartial',
      metadata: {
        symbol: 'A silver spiderweb snaring a crescent moon',
        domains: 'Trickery, Twilight, Knowledge',
      },
    })).toBe('GiMoon')

    expect(resolveIconName({
      id: 'scarred_hands',
      name: 'Unmarked Habit',
      variant: {
        name: 'Burn-Mapped',
        description: 'Erratic burn scars from an alchemy accident.',
      },
    })).toBe('GiFire')
  })

  it('uses stable category fallbacks when no semantic rule matches', () => {
    expect(resolveIconName({ name: 'Unmarked blade', type: 'WEAPON' })).toBe('GiBroadsword')
    expect(resolveIconName({ name: 'Unmarked vial', type: 'CONSUMABLE' })).toBe('GiMagicPotion')
    expect(resolveIconName({ name: 'Unmarked cargo', type: 'MISC' })).toBe('GiBackpack')
    expect(resolveIconName({ name: 'Unmarked path', category: 'Exploration' })).toBe('GiCompass')
    expect(resolveIconName({ name: 'Unmarked scandal', category: 'Infamy' })).toBe('GiHoodedAssassin')
    expect(resolveIconName({ name: 'Unmarked feast', category: 'Cooking' })).toBe('GiHotMeal')
    expect(resolveIconName({ name: 'Unmarked tic', type: 'Vocal' })).toBe('GiMusicalNotes')
    expect(resolveIconName({ name: 'Unmarked infestation', type: 'Parasite' })).toBe('GiTentaclesSkull')
    expect(resolveIconName({ name: 'Unmarked companion', category: 'Beast' })).toBe('GiWolfHead')
    expect(resolveIconName({ name: 'Unmarked thing' })).toBe('GiCube')
  })

  it('covers high-volume expansion categories discovered in the data audit', () => {
    expect(resolveIconName({ id: 'pickpocketing', name: 'Pickpocketing and Cut-Purse Activity', category: 'Misdemeanor' })).toBe('GiHoodedAssassin')
    expect(resolveIconName({ id: 'tragic_romance', name: 'The Tragic Romance', category: 'Lover' })).toBe('FaHeart')
    expect(resolveIconName({ id: 'order_loyalty', name: 'Order Loyalty', category: 'Organization' })).toBe('GiKnightBanner')
    expect(resolveIconName({ id: 'curio_graveyard_dirt', name: 'A vial of graveyard dirt', category: 'Curio' })).toBe('GiGhost')
    expect(resolveIconName({ id: 'market_bites', name: 'Bacon-Wrapped Figs', category: 'Street Food' })).toBe('GiMeat')
    expect(resolveIconName({ id: 'fiddle', name: 'Dwarven Bass Fiddle', category: 'String', type: 'Instrument' })).toBe('GiLyre')
    expect(resolveIconName({ id: 'sweeping_willow', name: 'Sweeping Willow', category: 'Glaives' })).toBe('GiHalberd')
    expect(resolveIconName({ id: 'chakram_dance', name: 'Halo Dancer', category: 'Chakrams (Bladed Rings)' })).toBe('GiRing')
    expect(resolveIconName({ id: 'quicksand_pit', name: 'Quicksand Pit', category: 'Environmental' })).toBe('GiSwamp')
    expect(resolveIconName({ id: 'potion_candies', name: 'Love-Potion Peppermint', category: 'Alchemical' })).toBe('FaHeart')
    expect(resolveIconName({
      id: 'order_loyalty',
      name: 'Order Loyalty',
      category: 'Organization',
      description: 'A factional bond kept even when shadow politics surround the order.',
    })).toBe('GiKnightBanner')
  })

  it('keeps generic words from overpowering more specific icon matches', () => {
    expect(resolveIconName({
      id: 'crossbow_expert',
      name: 'Crossbow Expert',
      category: 'Combat',
      benefit: 'Ignores the loading time of crossbows.',
    })).toBe('GiCrossbow')

    expect(resolveIconName({
      id: 'waypoint_master',
      name: 'Leyline Walker',
      category: 'Exploration',
      description: 'A master of route-finding.',
    })).toBe('GiCompass')

    expect(resolveIconName({
      id: 'frost_blood',
      name: 'Frost-Blood',
      category: 'Survival',
      description: 'Adapted to cold environments.',
    })).toBe('GiIceSpellCast')

    expect(resolveIconName({
      id: 'high_draconic',
      name: 'High Draconic',
      type: 'Dead',
      description: 'The ceremonial dialect of ancient Wyrm Lords during the Era of Dragons.',
    })).toBe('GiDragonHead')

    expect(resolveIconName({
      id: 'landmark_the_victory_column_of_thornwall',
      name: 'The Victory Column of Thornwall',
      category: 'Monument',
      description: 'A towering stone column stained by offerings of wine and blood.',
    })).toBe('GiTowerFlag')

    expect(resolveIconName({
      id: 'merchandise_exotic_woods_ebony_staves',
      name: 'Ebony Staves',
      category: 'Trade Good',
      type: 'Merchandise',
      description: 'Deep black hardwood that sinks in water.',
    })).toBe('GiWizardStaff')

    expect(resolveIconName({
      id: 'animal_affinity',
      name: 'Animal Affinity',
      type: 'Behavioral',
      description: 'A noticeable relationship with animals.',
      variant: {
        name: 'Ration-Splitter',
        desc: 'Leaves breakfast for wandering spirits.',
      },
    })).toBe('GiPawPrint')
  })

  it('prefers primary object names over descriptive ambient words', () => {
    expect(resolveIconName({
      id: 'history_the_cataclysm_and_darkness_the_cleansing_crusades',
      name: 'The Cleansing Crusades',
      category: 'The Cataclysm and Darkness',
      description: 'As the sun finally pierced the gloom, mobile crusading columns carried holy fire.',
    })).toBe('GiSun')

    expect(resolveIconName({
      id: 'cuisine_baked_pastries_jam_filled_doughnut',
      name: 'Jam-Filled Doughnut',
      category: 'Confectionery',
      type: 'The Capital City',
      description: 'A sphere of fried dough bursting with dangerously hot strawberry jam.',
    })).toBe('GiSlicedBread')

    expect(resolveIconName({
      id: 'cuisine_naval_hardtack_dried_squid_tentacle',
      name: 'Dried Squid Tentacle',
      category: 'Ration',
      type: 'Coastal Trade Fleets',
      description: 'Chewy enough to last three continuous hours of gnawing.',
    })).toBe('GiGiantSquid')

    expect(resolveIconName({
      id: 'pack_lizards',
      name: 'River Basilisk (Tame)',
      category: 'BEAST',
      description: 'Runs across the surface of fast-moving water.',
    })).toBe('GiGecko')

    expect(resolveIconName({
      id: 'cave_in_zone',
      name: 'Unstable Cavern Ceiling',
      category: 'Environmental',
      description: 'A cavern roof can bring rubble down when disturbed.',
    })).toBe('GiRock')

    expect(resolveIconName({
      id: 'curio_a_jar_of_pickled_slugs',
      name: 'A jar of pickled slugs',
      category: 'Curio',
      description: 'They twitch when thunder rolls.',
    })).toBe('GiSlime')

    expect(resolveIconName({
      id: 'merchandise_illicit_substances_beholder_tongue_powder',
      name: 'Beholder-Tongue Powder',
      category: 'Contraband',
      type: 'Merchandise',
      description: 'A dangerous powder traded under the counter.',
    })).toBe('GiPowder')

    expect(resolveIconName({
      id: 'mithril_rapier',
      name: 'Mithril Rapier',
      category: 'Weapon',
      type: 'Recipe',
      description: 'A narrow blade polished with alchemical powder.',
    })).toBe('GiPointySword')

    expect(resolveIconName({
      id: 'history_the_dawn_of_the_world_the_giant_kingdoms',
      name: 'The Giant Kingdoms',
      category: 'The Dawn of the World',
      description: 'History preserved in tablets powdered by age.',
    })).toBe('GiSun')

    expect(resolveIconName({
      id: 'accent_shifter',
      name: 'Accent Shifter',
      type: 'Vocal',
      description: 'Their accent adopts regional dialect patterns.',
    })).toBe('GiMusicalNotes')

    expect(resolveIconName({
      id: 'cuisine_cavernous_crawlers_ochre_jelly_jam',
      name: 'Ochre Jelly Jam',
      category: 'Monster Fare',
      type: 'The Deep Caverns',
      description: 'Acidic, sweet, and dissolves the spoon while you eat it.',
    })).toBe('GiSlime')

    expect(resolveIconName({
      id: 'mithril_chain_belt',
      name: 'Mithril Chain Belt',
      category: 'Armor',
      description: 'A finely wrought belt made with silk scrap and leather.',
    })).toBe('GiBeltArmor')

    expect(resolveIconName({
      id: 'battle_dance',
      name: 'Blade Dance of the Veil',
      category: 'Scimitars / Silk Veils',
      description: 'A martial form built around curved blades and silk veils.',
    })).toBe('GiPointySword')

    expect(resolveIconName({
      id: 'merchandise_spice_crate_saffron_pouch',
      name: 'Saffron Pouch',
      category: 'Trade Good',
      type: 'Merchandise',
      description: 'A tiny silk pouch of saffron threads.',
    })).toBe('GiHerbsBundle')
  })

  it('uses inventory data ids to keep variant icons tied to their base item', () => {
    expect(resolveIconName({
      id: 'torch',
      name: 'Bound Faggot',
      description: 'Bundle of sticks.',
      type: 'CONSUMABLE',
    })).toBe('GiTorch')

    expect(resolveIconName({
      id: 'rope',
      name: 'Chain Link',
      description: 'Metal security.',
      type: 'CONSUMABLE',
    })).toBe('GiRopeway')

    expect(resolveIconName({
      id: 'fire_starter',
      name: "Scout's Kit",
      description: 'Compact and light.',
      type: 'CONSUMABLE',
    })).toBe('GiRock')

    expect(resolveIconName({
      id: 'quick_hp',
      name: 'Putrid Poultice Drink',
      description: 'A sludgy mix meant for external use, swallowed in sheer desperation.',
      type: 'CONSUMABLE',
    })).toBe('GiRoundBottomFlask')
  })

  it('lets non-inventory duplicate ids resolve from their own context', () => {
    expect(resolveIconName({
      id: 'invisibility',
      name: 'Invisibility',
      category: 'Illusion',
      type: 'Illusion',
      description: 'The target becomes completely invisible.',
    })).toBe('GiPsychicWaves')

    expect(resolveIconName({
      id: 'fire_starter',
      name: 'Fire Starter',
      type: 'Survival',
      benefit: 'The character can start a fire in any conditions.',
    })).toBe('GiFire')
  })

  it('keeps explicit data id fallbacks grouped by icon with no duplicate ids', () => {
    const fallbackGroups = getDataIconFallbackGroups()
    const fallbackIds = Object.values(fallbackGroups).flat()

    expect(fallbackIds.length).toBeGreaterThan(170)
    expect(new Set(fallbackIds).size).toBe(fallbackIds.length)
    expect(fallbackGroups.GiTorch).toContain('torch')
    expect(fallbackGroups.GiRing).toEqual(expect.arrayContaining(['ring', 'signet']))
    expect(getDataIconFallbackIds().sort()).toEqual([...fallbackIds].sort())

    for (const iconName of Object.keys(fallbackGroups)) {
      expect(ICON_REGISTRY[iconName as keyof typeof ICON_REGISTRY], iconName).toBeTypeOf('function')
    }
  })

  it('only references icons that exist in the registry', () => {
    for (const iconName of getSemanticIconRuleNames()) {
      expect(ICON_REGISTRY[iconName], iconName).toBeTypeOf('function')
    }
  })

  it('registers or aliases every icon referenced by data files', () => {
    const dataText = readDataFiles(resolve(process.cwd(), 'src/data')).join('\n')
    const iconNames = [...dataText.matchAll(/icon: '([^']+)'/g)].map((match) => match[1])

    expect(iconNames.length).toBeGreaterThan(100)
    for (const iconName of new Set(iconNames)) {
      expect(ICON_REGISTRY[iconName as keyof typeof ICON_REGISTRY], iconName).toBeTypeOf('function')
    }
  })

  it('resolves inventory data ids to the icons declared by their source records', () => {
    const iconRefs = readDataIconRefs(resolve(process.cwd(), 'src/data/inventory'))

    expect(iconRefs.length).toBeGreaterThan(170)
    for (const { id, icon } of iconRefs) {
      expect(resolveIconName({ id }), id).toBe(icon)
    }
  })

  it('resolves exported src/data identities and grouped identities to representative icons', () => {
    const dataEntries = readExportedDataAuditInputs()
    const unregisteredIcons: string[] = []
    const fallbackIcons: string[] = []

    expect(dataEntries.length).toBeGreaterThan(2000)
    for (const entry of dataEntries) {
      const iconName = resolveIconName(entry)

      if (typeof ICON_REGISTRY[iconName] !== 'function') {
        unregisteredIcons.push(`${entry.path}: ${iconName}`)
      }
      if (iconName === 'GiCube') {
        fallbackIcons.push(entry.path)
      }
    }

    expect(unregisteredIcons).toEqual([])
    expect(fallbackIcons).toEqual([])
  })
})
