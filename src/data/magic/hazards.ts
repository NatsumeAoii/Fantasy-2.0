export type HazardType = 'Environmental' | 'Magical' | 'Mechanical Trap' | 'Cursed Ground' | 'Planar Rift';

export type HazardSeverity = 'Minor' | 'Moderate' | 'Severe' | 'Lethal';

/**
 * The mechanical consequence of triggering a hazard, including
 * damage type, intensity, and area of effect.
 */
export interface HazardEffect {
  name: string;
  description: string;
  duration: string;
}

/**
 * An environmental or magical danger present in the world,
 * such as a poison gas vent, a magical trap ward, or a collapsing
 * structure. Hazards are categorized as Environmental, Magical, or Mechanical Trap.
 */
export interface Hazard {
  id: string;
  name: string;
  type: HazardType;
  severity: HazardSeverity;
  damageType: string;
  baseDamage: number;
  baseDuration: number;
  description: string;
  trigger: string;
  negativeEffect: HazardEffect;
}

/** Master list of all environmental and magical hazards. */
export const HAZARDS: Hazard[] = [
  // ==========================================
  // ENVIRONMENTAL
  // ==========================================
  {
    id: 'poison_ivy_thicket',
    name: 'Poison Ivy Thicket',
    type: 'Environmental',
    severity: 'Minor',
    damageType: 'Poison',
    baseDamage: 40,
    baseDuration: 14400,
    description: 'Dense, thorny overgrowth that releases microscopic toxins when brushed against, causing severe rashes and nausea.',
    trigger: 'Moving through the area without protective clothing.',
    negativeEffect: {
      name: 'Toxic Rash',
      description: 'Itching welts across exposed skin that make fine motor tasks extremely difficult.',
      duration: 'Several hours'
    }
  },
  {
    id: 'quicksand_pit',
    name: 'Quicksand Pit',
    type: 'Environmental',
    severity: 'Moderate',
    damageType: 'Suffocation',
    baseDamage: 120,
    baseDuration: -1,
    description: 'Deceptively solid-looking ground that rapidly swallows anything heavy. Struggling accelerates the sinking process.',
    trigger: 'Stepping onto the concealed surface.',
    negativeEffect: {
      name: 'Sinking Entrapment',
      description: 'The victim sinks steadily deeper, becoming immobilized and eventually unable to breathe.',
      duration: 'Until rescued'
    }
  },
  {
    id: 'cave_in_zone',
    name: 'Unstable Cavern Ceiling',
    type: 'Environmental',
    severity: 'Severe',
    damageType: 'Crushing',
    baseDamage: 280,
    baseDuration: -1,
    description: 'A section of cavern roof riddled with fractures and bearing immense weight. The slightest disturbance can bring it down.',
    trigger: 'Loud noise, vibration, or any explosive force within the cavern.',
    negativeEffect: {
      name: 'Buried Alive',
      description: 'Victims are knocked down and buried under rubble, becoming trapped and unable to breathe.',
      duration: 'Until excavated'
    }
  },
  {
    id: 'flash_flood_channel',
    name: 'Flash Flood Channel',
    type: 'Environmental',
    severity: 'Severe',
    damageType: 'Impact',
    baseDamage: 280,
    baseDuration: 600,
    description: 'A narrow canyon or dried riverbed that channels massive volumes of water with terrifying speed when storms roll in overhead.',
    trigger: 'Heavy rain upstream or a natural dam breaking.',
    negativeEffect: {
      name: 'Swept Away',
      description: 'Victims are carried downstream at high speed, battered against rocks and debris.',
      duration: 'Several minutes until the water subsides'
    }
  },
  {
    id: 'volcanic_vent',
    name: 'Volcanic Vent',
    type: 'Environmental',
    severity: 'Lethal',
    damageType: 'Fire',
    baseDamage: 600,
    baseDuration: 60,
    description: 'A fissure in the earth that periodically belches columns of superheated gas, molten rock, and choking sulfurous fog.',
    trigger: 'Standing near the vent when it periodically erupts.',
    negativeEffect: {
      name: 'Superheated Burns',
      description: 'Victims are set ablaze by superheated gases and suffer severe burns across exposed skin.',
      duration: 'Until the flames are extinguished'
    }
  },
  {
    id: 'bog_gas_pocket',
    name: 'Bog Gas Pocket',
    type: 'Environmental',
    severity: 'Moderate',
    damageType: 'Poison',
    baseDamage: 120,
    baseDuration: 7200,
    description: 'A pocket of toxic gas trapped beneath layers of decomposing peat. Invisible and odorless until disturbed.',
    trigger: 'Disturbing the swamp floor by stepping or digging.',
    negativeEffect: {
      name: 'Marsh Sickness',
      description: 'Victims suffer severe nausea and disorientation, struggling to move or think clearly.',
      duration: 'About an hour'
    }
  },
  {
    id: 'avalanche_slope',
    name: 'Avalanche Slope',
    type: 'Environmental',
    severity: 'Lethal',
    damageType: 'Crushing/Cold',
    baseDamage: 600,
    baseDuration: -1,
    description: 'A steep mountain slope laden with tons of unstable, wind-packed snow ready to collapse at the slightest provocation.',
    trigger: 'Loud noise, heavy footsteps, or vibration on the snowfield.',
    negativeEffect: {
      name: 'Snow Burial',
      description: 'Victims are buried under tons of snow, unable to see or breathe, and rapidly losing body heat.',
      duration: 'Until dug out'
    }
  },

  // ==========================================
  // MECHANICAL TRAPS
  // ==========================================
  {
    id: 'pendulum_scythes',
    name: 'Pendulum Scythes',
    type: 'Mechanical Trap',
    severity: 'Severe',
    damageType: 'Slashing',
    baseDamage: 280,
    baseDuration: -1,
    description: 'Hidden tripwire drops massive, swinging razors from the ceiling in a tight corridor, cutting through anything in the kill zone.',
    trigger: 'A hidden tripwire strung across a corridor at ankle height.',
    negativeEffect: {
      name: 'Severing Wound',
      description: 'Deep lacerations that cause ongoing bleeding and can sever limbs if the victim is unlucky.',
      duration: 'Until the wound is treated'
    }
  },
  {
    id: 'pressure_plate_darts',
    name: 'Pressure Plate Dart Wall',
    type: 'Mechanical Trap',
    severity: 'Moderate',
    damageType: 'Piercing/Poison',
    baseDamage: 120,
    baseDuration: 600,
    description: 'A section of floor that, when stepped on, triggers a volley of tiny poisoned darts from hidden holes in the adjacent wall.',
    trigger: 'Stepping on a concealed stone plate.',
    negativeEffect: {
      name: 'Venom-Tipped',
      description: 'The darts are coated in paralytic venom that causes numbness spreading from the wound site.',
      duration: 'Several minutes of paralysis'
    }
  },
  {
    id: 'collapsing_floor',
    name: 'False Floor Pitfall',
    type: 'Mechanical Trap',
    severity: 'Moderate',
    damageType: 'Piercing/Impact',
    baseDamage: 120,
    baseDuration: -1,
    description: 'A carefully constructed false floor covering a deep spiked pit. The surface is painted and dusted to match surrounding stonework.',
    trigger: 'Placing weight on the section of false flagstone.',
    negativeEffect: {
      name: 'Impaled',
      description: 'Victims fall onto iron spikes at the bottom, becoming pinned in place by the impaling points.',
      duration: 'Until pulled free'
    }
  },
  {
    id: 'flame_jet_corridor',
    name: 'Flame Jet Corridor',
    type: 'Mechanical Trap',
    severity: 'Severe',
    damageType: 'Fire',
    baseDamage: 280,
    baseDuration: 60,
    description: 'Dragon-headed sconces on opposing walls belch synchronized gouts of alchemical fire across the full width of a corridor.',
    trigger: 'Crossing a beam of light projected between two carved sconces.',
    negativeEffect: {
      name: 'Ablaze',
      description: 'Flammable equipment and clothing catches fire, and victims suffer extensive burns.',
      duration: 'Until extinguished'
    }
  },
  {
    id: 'crossbow_turret',
    name: 'Repeating Crossbow Turret',
    type: 'Mechanical Trap',
    severity: 'Moderate',
    damageType: 'Piercing',
    baseDamage: 120,
    baseDuration: -1,
    description: 'A clockwork-driven crossbow mechanism concealed behind a stone facade. It fires multiple bolts at anything that moves.',
    trigger: 'Entering a detection zone monitored by a tension wire grid.',
    negativeEffect: {
      name: 'Pinned Down',
      description: 'The turret fires continuously, forcing victims to take cover or suffer repeated bolt impacts.',
      duration: 'Until disabled or out of ammunition'
    }
  },
  {
    id: 'rolling_boulder',
    name: 'Rolling Boulder Chute',
    type: 'Mechanical Trap',
    severity: 'Lethal',
    damageType: 'Crushing',
    baseDamage: 600,
    baseDuration: 0,
    description: 'A massive granite sphere released from a concealed chute at the top of a long, downward-sloping corridor.',
    trigger: 'Removing an item from a specific pedestal.',
    negativeEffect: {
      name: 'Crushed',
      description: 'Anything caught in the boulder\'s path is flattened beyond recovery.',
      duration: 'Instantaneous'
    }
  },

  // ==========================================
  // MAGICAL
  // ==========================================
  {
    id: 'glyph_of_warding',
    name: 'Glyph of Warding',
    type: 'Magical',
    severity: 'Moderate',
    damageType: 'Elemental (variable)',
    baseDamage: 120,
    baseDuration: 15,
    description: 'An invisible magical sigil painted on a floor or object. Triggers an elemental blast when disturbed by an unauthorized creature.',
    trigger: 'An unauthorized creature moving near the inscribed surface.',
    negativeEffect: {
      name: 'Arcane Backlash',
      description: 'The elemental blast disrupts the victim\'s concentration and leaves them dazed.',
      duration: 'Brief disorientation'
    }
  },
  {
    id: 'anti_magic_zone',
    name: 'Anti-Magic Zone',
    type: 'Magical',
    severity: 'Severe',
    damageType: 'None',
    baseDamage: 280,
    baseDuration: -1,
    description: 'A localized sphere where all magical energy is completely nullified. Spells fail and magical effects are suppressed.',
    trigger: 'Entering the zone.',
    negativeEffect: {
      name: 'Weave Severance',
      description: 'All active magical abilities and enchanted items cease to function. Spellcasters feel a nauseating void.',
      duration: 'While inside the zone'
    }
  },
  {
    id: 'mirror_of_madness',
    name: 'Mirror of Madness',
    type: 'Magical',
    severity: 'Severe',
    damageType: 'Psychic',
    baseDamage: 280,
    baseDuration: 600,
    description: 'An ornate silver mirror that shows a subtly wrong reflection. Anyone who stares too long sees their deepest fears made manifest.',
    trigger: 'Looking at one\'s own reflection in the mirror.',
    negativeEffect: {
      name: 'Fractured Mind',
      description: 'The viewer suffers vivid hallucinations and may become temporarily hostile or catatonic.',
      duration: 'Several minutes'
    }
  },
  {
    id: 'soul_snare_circle',
    name: 'Soul Snare Circle',
    type: 'Magical',
    severity: 'Lethal',
    damageType: 'Necrotic',
    baseDamage: 600,
    baseDuration: -1,
    description: 'A necromantic circle etched into the floor with bone dust and blood. It attempts to rip the life force from any living creature that enters.',
    trigger: 'A living creature stepping inside the inscribed circle.',
    negativeEffect: {
      name: 'Soul Siphon',
      description: 'The victim\'s life force is visibly drained, leaving them weakened and aged until magically restored.',
      duration: 'Permanent until magically cured'
    }
  },
  {
    id: 'rune_of_binding',
    name: 'Rune of Binding',
    type: 'Magical',
    severity: 'Moderate',
    damageType: 'Force',
    baseDamage: 120,
    baseDuration: 600,
    description: 'A series of interlocking arcane symbols that generate invisible restraining fields, locking any trespasser in place.',
    trigger: 'Crossing a doorway inscribed with the rune.',
    negativeEffect: {
      name: 'Arcane Shackles',
      description: 'The victim is held in place by invisible chains of force, unable to move.',
      duration: 'Several minutes or until dispelled'
    }
  },
  {
    id: 'wild_magic_surge_zone',
    name: 'Wild Magic Surge Zone',
    type: 'Magical',
    severity: 'Moderate',
    damageType: 'Variable',
    baseDamage: 120,
    baseDuration: -1,
    description: 'A region where magical energy has become frayed and unstable. Any channeled magic produces wildly unpredictable side effects.',
    trigger: 'Casting any spell within the zone.',
    negativeEffect: {
      name: 'Arcane Instability',
      description: 'The spell produces a random, unpredictable side effect in addition to its intended result.',
      duration: 'Varies wildly'
    }
  },

  // ==========================================
  // CURSED GROUND
  // ==========================================
  {
    id: 'desecrated_ground',
    name: 'Desecrated Ground',
    type: 'Cursed Ground',
    severity: 'Severe',
    damageType: 'Necrotic',
    baseDamage: 280,
    baseDuration: -1,
    description: 'Earth permanently tainted by mass death or dark ritual. Grass withers and animals refuse to approach.',
    trigger: 'Standing on the desecrated earth.',
    negativeEffect: {
      name: 'Unholy Corruption',
      description: 'Healing is far less effective and the living feel a constant, draining chill seeping into their bones.',
      duration: 'While on the ground'
    }
  },
  {
    id: 'hallowed_ward',
    name: 'Hallowed Ward',
    type: 'Cursed Ground',
    severity: 'Moderate',
    damageType: 'Radiant',
    baseDamage: 120,
    baseDuration: -1,
    description: 'Ground blessed by a high priest or sustained prayer. It radiates a faint golden light and burns creatures of dark alignment.',
    trigger: 'An undead or fiendish creature entering the consecrated area.',
    negativeEffect: {
      name: 'Divine Rejection',
      description: 'Dark creatures are wracked with searing pain and feel compelled to flee the area.',
      duration: 'While inside the ward'
    }
  },
  {
    id: 'blood_mire',
    name: 'Blood Mire',
    type: 'Cursed Ground',
    severity: 'Severe',
    damageType: 'Necrotic',
    baseDamage: 280,
    baseDuration: 14400,
    description: 'Soft, wet earth permanently stained red from a great battle or sacrificial ground. The soil literally thirsts for blood.',
    trigger: 'A creature with open wounds standing in the mire.',
    negativeEffect: {
      name: 'Bloodthirst Curse',
      description: 'The mire absorbs blood through open wounds, leaving the victim pale, weak, and increasingly lethargic.',
      duration: 'Weakness persists for hours after leaving'
    }
  },
  {
    id: 'fey_crossing',
    name: 'Fey Crossing',
    type: 'Cursed Ground',
    severity: 'Minor',
    damageType: 'Psychic',
    baseDamage: 40,
    baseDuration: 7200,
    description: 'A thinning between realms. Flowers bloom out of season, colors intensify, and time flows strangely.',
    trigger: 'Lingering in the crossing for more than a few minutes.',
    negativeEffect: {
      name: 'Time Distortion',
      description: 'The victim loses track of time entirely. What feels like minutes may have been hours or days.',
      duration: 'Hours of confusion after leaving'
    }
  },

  // ==========================================
  // PLANAR RIFTS
  // ==========================================
  {
    id: 'abyssal_tear',
    name: 'Abyssal Tear',
    type: 'Planar Rift',
    severity: 'Lethal',
    damageType: 'Necrotic/Fire',
    baseDamage: 600,
    baseDuration: 172800,
    description: 'A visible crack in the fabric of reality leaking corrosive demonic energy. The air smells of sulfur and screams leak from within.',
    trigger: 'Approaching within close proximity of the rift.',
    negativeEffect: {
      name: 'Demonic Corruption',
      description: 'The victim hears whispers of demonic entities and suffers deep exhaustion and creeping paranoia.',
      duration: 'A full day'
    }
  },
  {
    id: 'shadow_rift',
    name: 'Shadow Rift',
    type: 'Planar Rift',
    severity: 'Severe',
    damageType: 'Cold/Necrotic',
    baseDamage: 280,
    baseDuration: -1,
    description: 'A tear into the realm of shadow that leaks absolute darkness and frigid cold. Light sources dim and extinguish nearby.',
    trigger: 'Entering the zone of absolute darkness surrounding the rift.',
    negativeEffect: {
      name: 'Shadow Theft',
      description: 'The victim\'s shadow is ripped away and may act independently. The victim feels incomplete and cannot rest properly until it is recovered.',
      duration: 'Until the shadow is recovered or the curse is broken'
    }
  },
  {
    id: 'elemental_vortex',
    name: 'Elemental Vortex',
    type: 'Planar Rift',
    severity: 'Lethal',
    damageType: 'Variable (elemental)',
    baseDamage: 600,
    baseDuration: 518400,
    description: 'A roaring vortex where the border between realms has completely collapsed, spewing raw primal energy in every direction.',
    trigger: 'Entering the whirlwind of raw elemental energy.',
    negativeEffect: {
      name: 'Elemental Saturation',
      description: 'The victim is infused with raw elemental energy, becoming vulnerable to the opposing element for days.',
      duration: 'Several days'
    }
  }
];
