/**
 * A codified fighting style focused on a specific weapon discipline.
 * Martial arts define a stance, a signature technique, and a general
 * combat philosophy that grants distinct tactical advantages.
 */
export interface MartialArt {
  id: string;
  name: string;
  weaponFocus: string;
  stance: string;
  technique: string;
  description: string;
}

/** Master list of all martial arts styles, organized by weapon focus. */
export const MARTIAL_ARTS: MartialArt[] = [
  // ==========================================
  // BLADE ARTS
  // ==========================================
  {
    id: 'water_dancer',
    name: 'Way of the Water Dancer',
    weaponFocus: 'Rapiers / Light Blades',
    stance: 'Sideways profile, weight on the back foot',
    technique: 'Deflect & Counter',
    description: 'Prioritizes swift, fluid evasion over blocking. The dancer moves like water around the opponent\'s strikes to deliver precise thrusts.'
  },
  {
    id: 'wind_cutter',
    name: 'Wind Cutter Style',
    weaponFocus: 'Katanas / Curved Blades',
    stance: 'Blade held at shoulder height, body turned sideways',
    technique: 'Iaijutsu Draw-Cut',
    description: 'A discipline of extreme patience and explosive speed. The practitioner draws and strikes in a single blindingly fast motion.'
  },
  {
    id: 'shadow_fencer',
    name: 'Shadow Fencing',
    weaponFocus: 'Short Swords / Daggers',
    stance: 'Low crouch with blade reversed along the forearm',
    technique: 'Feint & Throat-Slash',
    description: 'An assassin\'s art that emphasizes deception. Every motion is a feint designed to create openings for lethal precision strikes.'
  },
  {
    id: 'iron_lotus',
    name: 'Iron Lotus',
    weaponFocus: 'Longswords / Bastard Swords',
    stance: 'Blade extended forward, both hands on the grip, weight centered',
    technique: 'Flowing Combinations',
    description: 'An elegant, flowing style that chains together sequences of cuts and thrusts in an unbroken rhythm, never giving the opponent time to recover.'
  },
  {
    id: 'executioner',
    name: 'Executioner\'s Verdict',
    weaponFocus: 'Greatswords / Claymores',
    stance: 'Blade resting on the shoulder, legs wide apart',
    technique: 'Overhead Cleave',
    description: 'A brutal, committed art with no subtlety. Every swing is a maximum-force overhead blow designed to split armor and bone in a single strike.'
  },
  {
    id: 'battle_dance',
    name: 'Blade Dance of the Veil',
    weaponFocus: 'Scimitars / Silk Veils',
    stance: 'Constant spinning motion, arms extended with weapon and veil',
    technique: 'Whirlwind Cut',
    description: 'A mesmerizing combat dance that uses flowing fabric to obscure blade movements. The dancer spins and cuts in a hypnotic pattern that is nearly impossible to predict.'
  },
  {
    id: 'crimson_crescent',
    name: 'Crimson Crescent',
    weaponFocus: 'Scimitars',
    stance: 'Blade held inverted, body in constant circular motion',
    technique: 'Whirling Dervish',
    description: 'A dance-like style where the practitioner revolves continuously, building massive momentum to sever limbs.'
  },
  {
    id: 'wolf_fang_blade',
    name: 'Wolf Fang',
    weaponFocus: 'Shortswords / Daggers',
    stance: 'Deep crouch, off-hand hovering near the chest',
    technique: 'Throat-Seeker',
    description: 'A predatory style that relies on feints to the legs, followed by explosive leaps aimed entirely at the opponent\'s neck.'
  },
  {
    id: 'royal_guard_stance',
    name: 'Royal Guard Stance',
    weaponFocus: 'Longswords',
    stance: 'Blade held vertically in front of the face',
    technique: 'Perfect Parry',
    description: 'An aristocratic defensive art that focuses entirely on expending the enemy\'s energy through flawless, minimal-movement parries before responding.'
  },
  {
    id: 'twin_serpent',
    name: 'Twin Serpent',
    weaponFocus: 'Dual Shortblades',
    stance: 'Blades crossed in an X at chest height',
    technique: 'Scissoring Strike',
    description: 'Uses two blades in constant, weaving tandem. One blade traps the enemy\'s weapon while the other delivers the lethal cut.'
  },
  {
    id: 'avalanche_blade',
    name: 'Avalanche Form',
    weaponFocus: 'Greatswords',
    stance: 'Blade resting on the ground behind the wielder',
    technique: 'Rising Cleave',
    description: 'Drags the heavy sword along the ground to build shocking upward momentum, lifting lighter opponents cleanly off their feet.'
  },
  {
    id: 'phantom_edge',
    name: 'Phantom Edge',
    weaponFocus: 'Rapiers',
    stance: 'Side profile, weapon arm fully extended',
    technique: 'The Invisible Thrust',
    description: 'A dueling art that uses minute wrist adjustments to make the blade\'s point impossible to track. The thrust seems to materialize inside the target.'
  },
  {
    id: 'blood_drinker',
    name: 'Blood-Drinker Stance',
    weaponFocus: 'Serrated Blades',
    stance: 'Weapon held low and loosely',
    technique: 'Sawing Pull',
    description: 'A cruel art designed to maim rather than kill quickly. Practitioners drag hooked blades across exposed flesh, causing maximum blood loss.'
  },
  {
    id: 'mirror_lake',
    name: 'Mirror Lake',
    weaponFocus: 'Katanas',
    stance: 'Perfectly still, weapon completely sheathed',
    technique: 'Counter-Flash',
    description: 'The ultimate reactive art. The practitioner waits until the enemy\'s weapon is millimeters away before drawing and striking in the same impossibly fast motion.'
  },
  {
    id: 'meteor_strike',
    name: 'Meteor Strike',
    weaponFocus: 'Bastard Swords',
    stance: 'High guard, blade angled forward over the head',
    technique: 'Falling Star',
    description: 'Sacrifices all defense for a single, gravity-assisted downward blow designed to shatter shields and the arms holding them.'
  },
  {
    id: 'spider_fang',
    name: 'Spider Fang',
    weaponFocus: 'Daggers / Kunai',
    stance: 'Hanging upside down or clinging to walls',
    technique: 'Drop-Assassination',
    description: 'An urban assassin\'s art entirely dedicated to strikes from above, plunging blades into the collarbone or spine.'
  },
  {
    id: 'sun_flare',
    name: 'Sun Flare',
    weaponFocus: 'Broadswords',
    stance: 'Blade held sideways to catch the light',
    technique: 'Blinding Reflection',
    description: 'A tactical martial art that uses the highly polished flat of the blade to reflect sunlight into the enemy\'s eyes right before a strike.'
  },
  {
    id: 'two_headed_snake',
    name: 'Two-Headed Snake',
    weaponFocus: 'Double-Bladed Spears',
    stance: 'Center grip, crouching',
    technique: 'Spinning Vortex',
    description: 'A chaotic melee style where both blades are used in a dizzying figure-eight pattern, practically blending offense and defense.'
  },
  {
    id: 'whip_sword',
    name: 'Threaded Cane Arts',
    weaponFocus: 'Whip-Swords / Uriumi',
    stance: 'Weapon held straight, ready to flick',
    technique: 'Extending Slash',
    description: 'Uses a sword that can break apart into a bladed whip. The practitioner switches between rigid parries and terrifying, unpredictable extended sweeps.'
  },
  {
    id: 'chakram_dance',
    name: 'Halo Dancer',
    weaponFocus: 'Chakrams (Bladed Rings)',
    stance: 'Rings spinning around the wrists',
    technique: 'Returning Decapitation',
    description: 'The practitioner hurls aerodynamic bladed rings that curve through the air, striking multiple targets before returning perfectly to their hands.'
  },
  {
    id: 'cloak_dagger',
    name: 'Cloak and Dagger',
    weaponFocus: 'Heavy Cloak & Dagger',
    stance: 'Cloak wrapped around the off-arm',
    technique: 'Blinding Flourish',
    description: 'Uses a heavy wool or weighted cloak to entangle enemy blades or throw it over their head before stepping in to deliver a fatal knife strike.'
  },

  // ==========================================
  // BLUNT / HEAVY ARTS
  // ==========================================
  {
    id: 'stone_vanguard',
    name: 'Stone Vanguard',
    weaponFocus: 'Heavy Shields & Warhammers',
    stance: 'Wide base, shield anchored to the shoulder',
    technique: 'Shield Bash & Crater Strike',
    description: 'An immovable defensive art that waits for the enemy to exhaust themselves on the shield before crushing their guard with overwhelming blunt force.'
  },
  {
    id: 'mountain_breaker',
    name: 'Mountain Breaker',
    weaponFocus: 'Mauls / Great-Hammers',
    stance: 'Hammer held at full extension, body squared to the enemy',
    technique: 'Ground-Shatter',
    description: 'The practitioner swings their weapon in wide arcs at the ground near the enemy\'s feet, using the shockwave and debris to destabilize before following up with a direct blow.'
  },
  {
    id: 'drunken_ox',
    name: 'Drunken Ox Form',
    weaponFocus: 'Clubs / Maces / Improvised Weapons',
    stance: 'Swaying, unpredictable posture mimicking intoxication',
    technique: 'Stumbling Counterblow',
    description: 'An absurd-looking but devastatingly effective tavern brawling style that disguises powerful swings as clumsy staggers.'
  },
  {
    id: 'chain_dancer',
    name: 'Chain Dance',
    weaponFocus: 'Flails / Morningstars',
    stance: 'Weapon in constant circular motion at the side',
    technique: 'Wrap & Crush',
    description: 'Uses the unpredictable trajectory of chained weapons to wrap around shields and guards, pulling enemies off-balance before delivering crushing impacts.'
  },
  {
    id: 'anchor_chain',
    name: 'Anchor and Chain',
    weaponFocus: 'Ship\'s Anchor / Heavy Chains',
    stance: 'Chain wound around the forearm, anchor dragging behind',
    technique: 'Sweeping Devastation',
    description: 'A nautical fighting style born on pirate ships, using absurdly heavy maritime equipment as weapons of mass destruction in close quarters.'
  },
  {
    id: 'thunder_anvil',
    name: 'Thunder Anvil',
    weaponFocus: 'Warhammers',
    stance: 'Hammer head resting on the shoulder',
    technique: 'Ringing Blow',
    description: 'Emphasizes striking the enemy\'s armor with such harmonic force that the vibrations liquefy organs even if the plate doesn\'t pierce.'
  },
  {
    id: 'wrecking_ball',
    name: 'Wrecking Ball',
    weaponFocus: 'Flails',
    stance: 'Chain spinning continuously over the head',
    technique: 'Centrifugal Crush',
    description: 'Never stopping the weapon\'s momentum, the practitioner walks forward like a machine, using the spinning iron ball to batter down any defense.'
  },
  {
    id: 'grizzly_maul',
    name: 'Grizzly Maul',
    weaponFocus: 'Greatclubs',
    stance: 'Weapon held like a baseball bat',
    technique: 'Rib-Shatterer',
    description: 'A wild, horizontal sweeping style that aims for the midsection, intended to break ribs and collapse lungs with sheer kinetic energy.'
  },
  {
    id: 'iron_tortoise',
    name: 'Iron Tortoise',
    weaponFocus: 'Tower Shields',
    stance: 'Kneeling behind the shield',
    technique: 'Shield-Crush',
    description: 'Uses the massive shield as the primary weapon, pinning opponents against walls or the ground and crushing the breath out of them.'
  },
  {
    id: 'bell_ringer',
    name: 'Bell Ringer',
    weaponFocus: 'Maces',
    stance: 'Mace held high, off-hand open',
    technique: 'Helmet-Cracker',
    description: 'Specifically targets the head. A successful strike doesn\'t necessarily kill, but guarantees a severe concussion and immediate incapacitation.'
  },
  {
    id: 'earth_shaker',
    name: 'Earth Shaker',
    weaponFocus: 'Mauls',
    stance: 'Wide stance, heavy breathing',
    technique: 'Quake-Strike',
    description: 'Practitioners strike the ground near their enemies, creating localized tremors that knock entire formations to their knees.'
  },
  {
    id: 'blind_fury',
    name: 'Blind Fury',
    weaponFocus: 'Morningstars',
    stance: 'Wild, erratic swinging',
    technique: 'The Spiked Helix',
    description: 'A chaotic, spinning attack pattern that is impossible to safely parry. The spiked head wraps around blocking blades to hit the wrists.'
  },
  {
    id: 'bone_grinder',
    name: 'Bone Grinder',
    weaponFocus: 'Clubs',
    stance: 'Low crouch, aiming for the legs',
    technique: 'Knee-Capper',
    description: 'Focuses entirely on joints and shins. Once the enemy falls, the practitioner moves in for a crushing blow to the skull.'
  },
  {
    id: 'meteor_chain',
    name: 'Meteor Chain',
    weaponFocus: 'Meteor Hammers',
    stance: 'Feet planted, arms moving in figure-eights',
    technique: 'Whip-Crush',
    description: 'Uses a heavy iron ball on a rope to strike from fifteen feet away with the force of a falling anvil.'
  },
  {
    id: 'wall_breaker',
    name: 'Wall Breaker',
    weaponFocus: 'Two-Handed Hammers',
    stance: 'Weapon braced against the hip, leaning forward',
    technique: 'Siege-Swing',
    description: 'A bracing technique designed to punch holes through solid wood doors and brick walls; equally terrifying against armored knights.'
  },
  {
    id: 'iron_halo',
    name: 'Iron Halo',
    weaponFocus: 'Dual Maces',
    stance: 'Arms extended, standing upright',
    technique: 'Alternating Drumbeat',
    description: 'An endless rhythm of alternating blows. The practitioner locks the enemy into a purely defensive state until their arms give out under the heavy impacts.'
  },
  {
    id: 'phalanx_lock',
    name: 'Phalanx Lock',
    weaponFocus: 'Spear and Shield',
    stance: 'Interlocked with adjacent fighters',
    technique: 'Turtle Shell Thrust',
    description: 'A highly disciplined military art useless in a duel but invincible in a group. Focuses entirely on synchronized thrusting from behind absolute cover.'
  },
  {
    id: 'shield_surfing',
    name: 'Bulwark Rider',
    weaponFocus: 'Large Shields',
    stance: 'Standing atop the shield, sliding down an incline',
    technique: 'Avalanche Crush',
    description: 'A highly situational art where the combatant rides their shield down a slope or stairs, acting as a living battering ram covered in heavy armor.'
  },

  // ==========================================
  // POLEARM ARTS
  // ==========================================
  {
    id: 'dragon_pike',
    name: 'Dragon Pike Formation',
    weaponFocus: 'Pikes / Lances',
    stance: 'Pike braced against the ground and shoulder, body behind the point',
    technique: 'Wall of Points',
    description: 'A military discipline designed for formation fighting. The practitioner holds ground with an impenetrable wall of thrusting points.'
  },
  {
    id: 'reaper_sweep',
    name: 'Reaper\'s Sweep',
    weaponFocus: 'Halberds / Glaives',
    stance: 'Weapon held at three-quarter length, blade trailing behind',
    technique: 'Scything Arc',
    description: 'Leverages the immense reach of polearms to sweep wide arcs at multiple enemies simultaneously, controlling large areas of the battlefield.'
  },
  {
    id: 'staff_sage',
    name: 'Staff of the Sage',
    weaponFocus: 'Quarterstaves / Bo-Staffs',
    stance: 'Staff held horizontally at waist height, hands at quarter-points',
    technique: 'Double-End Strike',
    description: 'A deceptively sophisticated art that uses both ends of the staff in rapid alternation, creating a defensive and offensive barrier.'
  },
  {
    id: 'trident_net',
    name: 'Gladiator\'s Reach',
    weaponFocus: 'Tridents / Nets',
    stance: 'Net in the off-hand, trident held overhead',
    technique: 'Entrap & Pierce',
    description: 'A showman\'s art born in the fighting pits. The net restricts the enemy\'s movement while the trident exploits every tangled opening.'
  },
  {
    id: 'javelin_throw',
    name: 'Thunder-Throw',
    weaponFocus: 'Javelins / Throwing Spears',
    stance: 'Running start, body coiled for explosive release',
    technique: 'Momentum Cast',
    description: 'Converts a full sprint into a devastating javelin throw that can pierce heavy armor at shocking distance. Requires a clear run-up to execute.'
  },
  {
    id: 'sling_snipe',
    name: 'Shepherd\'s Revenge',
    weaponFocus: 'Slings / Staff-Slings',
    stance: 'Relaxed, sling spinning lazily at the side',
    technique: 'Stone-Snare Whip',
    description: 'An ancient, underestimated art that launches stones with terrifying velocity. Experienced slingers can shatter skulls through iron helmets.'
  },
  {
    id: 'serpent_tongue',
    name: 'Serpent\'s Tongue',
    weaponFocus: 'Spears',
    stance: 'One-handed grip, profile stance',
    technique: 'Rapid Thrust-Retract',
    description: 'Flicks the spear tip out and back with blinding speed, darting around shields to leave dozen of shallow, bleeding wounds.'
  },
  {
    id: 'falling_timber',
    name: 'Falling Timber',
    weaponFocus: 'Halberds',
    stance: 'Hands widely spaced, blade held high',
    technique: 'Chopping Block',
    description: 'Uses the heavy axe-head of the halberd like a guillotine, pulling the enemy down before delivering a fatal downward chop.'
  },
  {
    id: 'dragon_tooth',
    name: 'Dragon Tooth',
    weaponFocus: 'Pikes',
    stance: 'Braced against the ground',
    technique: 'Impaling Charge',
    description: 'Waits for a cavalry charge, using the momentum of the charging beast to drive the twenty-foot pike entirely through horse and rider.'
  },
  {
    id: 'sweeping_willow',
    name: 'Sweeping Willow',
    weaponFocus: 'Glaives',
    stance: 'Blade held parallel to the ground',
    technique: 'Ankle-Reaper',
    description: 'Focuses on wide sweeping arcs aimed exclusively at the knees and ankles, designed to cripple multiple enemies in a single motion.'
  },
  {
    id: 'iron_brush',
    name: 'The Iron Brush',
    weaponFocus: 'Naginatas',
    stance: 'High grip, blade pointing toward the sky',
    technique: 'Painting the Arc',
    description: 'A fluid, elegant style that treats the blade like a calligraphy brush, drawing long, bloody slashes across the enemy\'s chest.'
  },
  {
    id: 'scorpion_tail',
    name: 'Scorpion Tail',
    weaponFocus: 'Billhooks',
    stance: 'Weapon held loosely, hook pointing inward',
    technique: 'Yank and Stab',
    description: 'Uses the hook to painfully catch the inside of a knee or elbow, yanking the enemy off-balance before driving the spike through the throat.'
  },
  {
    id: 'vaulting_strike',
    name: 'Vaulting Strike',
    weaponFocus: 'Poleaxes',
    stance: 'Both hands near the base',
    technique: 'Death from Above',
    description: 'The practitioner uses the sturdy shaft to vault completely over the enemy\'s shield wall, driving the axe-head down into their backs.'
  },
  {
    id: 'boatman_swing',
    name: 'Boatman\'s Swing',
    weaponFocus: 'Oars / Heavy Staves',
    stance: 'Wide grip, standing firm',
    technique: 'Broadside Sweep',
    description: 'Originating from river-folk defending their barges, this style uses massive horizontal swings designed to knock heavily armored foes into deep water.'
  },
  {
    id: 'net_weaver',
    name: 'Web Weaver',
    weaponFocus: 'Nets / Bolas',
    stance: 'Weapon coiled loosely in hand',
    technique: 'Hobbling Throw',
    description: 'Focuses entirely on crowd-control. A perfectly aimed bola wraps around the enemy\'s ankles mid-stride, sending them crashing face-first into the dirt.'
  },

  // ==========================================
  // RANGED ARTS
  // ==========================================
  {
    id: 'tempest_archery',
    name: 'Tempest Archery',
    weaponFocus: 'Longbows',
    stance: 'Upright, rapid drawing form',
    technique: 'Volley Fire',
    description: 'A technique that trades raw kinetic power for blistering speed, allowing the archer to put three arrows into the air before the first hits the target.'
  },
  {
    id: 'silent_hunter',
    name: 'Silent Hunter\'s Mark',
    weaponFocus: 'Shortbows / Recurve Bows',
    stance: 'Crouched, bow pre-drawn with arrow nocked',
    technique: 'Ambush Shot',
    description: 'An ambush discipline focused on a single devastating opening shot from concealment, targeting vital areas for an instant kill.'
  },
  {
    id: 'crossbow_sniper',
    name: 'Ironbolt Discipline',
    weaponFocus: 'Heavy Crossbows',
    stance: 'Prone or braced against cover, weapon stabilized',
    technique: 'Precision Bolt',
    description: 'A patient, methodical art centered on a single, devastating shot at extreme range. Practitioners spend minutes adjusting their aim for a perfect hit.'
  },
  {
    id: 'knife_storm',
    name: 'Knife Storm',
    weaponFocus: 'Throwing Knives / Darts / Shuriken',
    stance: 'Upright, hands hidden inside cloak or vest',
    technique: 'Rapid Scatter-Throw',
    description: 'The practitioner draws and throws multiple blades in rapid succession, saturating an area with steel from concealed sheaths across their body.'
  },
  {
    id: 'rope_dart',
    name: 'Rope Dart Mastery',
    weaponFocus: 'Rope Darts / Weighted Chains',
    stance: 'Weapon spinning in a vertical circle before the body',
    technique: 'Whipping Impale',
    description: 'An incredibly difficult art that uses a spiked weight on a long rope to strike targets at unpredictable angles and distances.'
  },
  {
    id: 'shadow_fletching',
    name: 'Shadow Fletching',
    weaponFocus: 'Shortbows',
    stance: 'Deep crouch, entirely still',
    technique: 'The Unseen Arrow',
    description: 'Fires from deep shadows. The archer paints their arrows black and removes the fletching whistling, ensuring the victim never hears the shot coming.'
  },
  {
    id: 'piercing_gale',
    name: 'Piercing Gale',
    weaponFocus: 'Longbows',
    stance: 'Standing tall, bow drawn to the ear',
    technique: 'Armor-Piercing Loosening',
    description: 'Uses incredibly stiff bows that only the strongest can draw. The heavy bodkin arrows are fired with enough force to punch cleanly through solid plate mail.'
  },
  {
    id: 'iron_rain',
    name: 'Iron Rain',
    weaponFocus: 'Light Crossbows',
    stance: 'Kneeling, pre-loaded',
    technique: 'Rapid-Fire Mechanism',
    description: 'Employs heavily modified repeating crossbows holding magazines of bolts, able to saturate a small area with deadly fire in seconds.'
  },
  {
    id: 'eagle_eye',
    name: 'Eagle\'s Eye',
    weaponFocus: 'Heavy Crossbows',
    stance: 'Prone, using a bipod',
    technique: 'Heart-Seeker',
    description: 'A sniper\'s art. The practitioner adjusts for wind, humidity, and distance over several minutes, guaranteeing a lethal strike from miles away.'
  },
  {
    id: 'thunder_javelin',
    name: 'Thunder Javelin',
    weaponFocus: 'Javelins',
    stance: 'Running start',
    technique: 'Shockwave Cast',
    description: 'The thrower converts all their sprinting momentum into a single hurl. The javelin travels at terrifying speeds, exploding shields on impact.'
  },
  {
    id: 'ricochet_master',
    name: 'Ricochet Master',
    weaponFocus: 'Throwing Knives',
    stance: 'Casual, hands full of blades',
    technique: 'Corner-Cutting Throw',
    description: 'An impossible-looking trick art that bounces heavy throwting knives off stone walls and armor to hit targets hiding completely behind cover.'
  },
  {
    id: 'sling_crusher',
    name: 'Sling Crusher',
    weaponFocus: 'Slings',
    stance: 'Arm wide, constant rotation',
    technique: 'Goliath-Bane',
    description: 'Hurls dense lead bullets rather than stones. The impact is equivalent to a direct hit from a warhammer, easily crushing helmets and skulls.'
  },
  {
    id: 'arcane_archer',
    name: 'Spell-Bow Stance',
    weaponFocus: 'Any Bow',
    stance: 'Bow drawn, chanting softly',
    technique: 'Infused Shaft',
    description: 'A hybrid art where the archer breathes a minor spell into the arrow before firing, causing it to detonate or burst into flames upon impact.'
  },
  {
    id: 'blind_archer',
    name: 'Zen Archery',
    weaponFocus: 'Longbows',
    stance: 'Eyes closed, breathing deeply',
    technique: 'The Mind\'s Eye Shot',
    description: 'The archer relies entirely on sound, air currents, and intuition, closing their eyes to fire with perfect accuracy in total darkness or heavy fog.'
  },
  {
    id: 'point_blank',
    name: 'Point-Blank Deflection',
    weaponFocus: 'Hand Crossbows',
    stance: 'One-handed grip, side-stepping',
    technique: 'Gut-Shot Reaction',
    description: 'Treats the ranged weapon like a melee tool. The practitioner ducks under a sword swing and fires a bolt directly upward under the enemy\'s chin.'
  },

  // ==========================================
  // UNARMED ARTS
  // ==========================================
  {
    id: 'empty_fist',
    name: 'Empty Fist Disciplines',
    weaponFocus: 'Unarmed',
    stance: 'Hands open, relaxed shoulders',
    technique: 'Pressure Point Strike',
    description: 'Leverages deep anatomical knowledge to target nerve clusters, paralyzing limbs and disrupting the flow of the opponent\'s internal energy.'
  },
  {
    id: 'iron_fist',
    name: 'Iron Fist',
    weaponFocus: 'Unarmed / Fist-Wraps',
    stance: 'Fists raised, chin tucked, low center of gravity',
    technique: 'Bone-Cracker',
    description: 'A direct, devastating striking art focused on delivering maximum force through hardened fists. Practitioners condition their hands by striking stone.'
  },
  {
    id: 'grappling_python',
    name: 'Coiling Python',
    weaponFocus: 'Unarmed / Grappling',
    stance: 'Arms extended, fingers spread, weight on the front foot',
    technique: 'Joint Lock & Choke',
    description: 'A ground-fighting discipline that aims to take opponents down and immobilize them through joint manipulation and choking techniques.'
  },
  {
    id: 'tiger_claw',
    name: 'Tiger Claw Form',
    weaponFocus: 'Unarmed / Clawed Gauntlets',
    stance: 'Fingers curled like claws, body low and coiled',
    technique: 'Raking Strike',
    description: 'Mimics the aggressive slashing attacks of a great cat, using curved fingers or clawed gloves to tear at the enemy\'s face, throat, and eyes.'
  },
  {
    id: 'crane_dance',
    name: 'Crane Dance',
    weaponFocus: 'Unarmed',
    stance: 'One leg raised, arms spread wide for balance',
    technique: 'Sweeping Kick & Redirect',
    description: 'A graceful, defensive art that uses sweeping leg movements and open-palm redirections to turn the enemy\'s own momentum against them.'
  },
  {
    id: 'drunken_master',
    name: 'Drunken Master',
    weaponFocus: 'Unarmed / Wine Jug',
    stance: 'Swaying, loose, and seemingly off-balance',
    technique: 'Stumble-Strike',
    description: 'An art of controlled chaos that uses stumbling, falling, and rolling to generate unexpected power from bizarre angles. Often practiced while actually intoxicated.'
  },
  {
    id: 'siege_fist',
    name: 'Siege Fist',
    weaponFocus: 'Gauntlets / Cestus / Brass Knuckles',
    stance: 'Arms crossed at the chest, weight on the heels',
    technique: 'Armor-Breaker Punch',
    description: 'A brutal style designed specifically for fighting armored opponents. Every blow is aimed at joints, visors, and weak points in plate armor.'
  },
  {
    id: 'beastform',
    name: 'Beastform Mimicry',
    weaponFocus: 'Unarmed / Natural Weapons',
    stance: 'Varies: mimics the posture of the beast being channeled',
    technique: 'Animal Spirit Strike',
    description: 'The practitioner studies and mimics the fighting techniques of wild animals, adopting their stances, movements, and attack patterns in combat.'
  },
  {
    id: 'dragon_fist',
    name: 'Dragon Fist',
    weaponFocus: 'Unarmed',
    stance: 'High guard, fingers curved',
    technique: 'Flaming Punch',
    description: 'A mystic striking art that generates immense friction. A rapid series of punches can actually ignite standard clothing and hair.'
  },
  {
    id: 'mantis_strike',
    name: 'Praying Mantis',
    weaponFocus: 'Unarmed',
    stance: 'Hands hooked, wrists bent inward',
    technique: 'Nerve-Pinch',
    description: 'Targets the carotid arteries, throat, and eyes with lightning-fast finger strikes that bypass armor completely.'
  },
  {
    id: 'mountain_stance',
    name: 'Mountain Stance',
    weaponFocus: 'Unarmed',
    stance: 'Feet rooted, knees deeply bent',
    technique: 'Immovable Object',
    description: 'A heavily grounded defensive martial art. The practitioner is physically impossible to knock down or push back, absorbing blows like stone.'
  },
  {
    id: 'wind_step',
    name: 'Wind Step Style',
    weaponFocus: 'Unarmed',
    stance: 'On the balls of the feet, bouncing',
    technique: 'Vanishing Evasion',
    description: 'Relying purely on speed and footwork, the practitioner simply isn\'t there when the blow lands, confusing the enemy before striking their blind spot.'
  },
  {
    id: 'iron_shirt',
    name: 'Iron Shirt Discipline',
    weaponFocus: 'Unarmed',
    stance: 'Chest puffed, breathing controlled',
    technique: 'Blade-Breaking Flex',
    description: 'Through years of grueling conditioning, the practitioner hardens their muscles to the point where mundane blades chip or snap against their bare skin.'
  },
  {
    id: 'leopard_pounce',
    name: 'Leopard Pounce',
    weaponFocus: 'Unarmed',
    stance: 'Crouched on all fours',
    technique: 'Throat-Tearing Bite',
    description: 'A savage, feral martial art that throws away all civilization. Practitioners leap onto the target\'s back and use teeth and nails to rip them apart.'
  },
  {
    id: 'breaking_wave',
    name: 'Breaking Wave',
    weaponFocus: 'Unarmed',
    stance: 'Loose, flowing movements',
    technique: 'Joint-Shattering Lock',
    description: 'Uses the enemy\'s own mass against them. A rushing opponent is caught, redirected, and their extended arm is snapped cleanly in half.'
  },
  {
    id: 'shadow_strangler',
    name: 'Shadow Strangler',
    weaponFocus: 'Unarmed',
    stance: 'Behind the opponent',
    technique: 'The Silent Sleeper',
    description: 'An assassination art focused on cutting off blood to the brain using a forearm choke. The victim passes out in seconds without making a sound.'
  },
  {
    id: 'meteor_kick',
    name: 'Meteor Kick',
    weaponFocus: 'Unarmed',
    stance: 'One leg raised',
    technique: 'Axe-Kick Drop',
    description: 'The martial artist leaps incredibly high into the air and brings their heel crashing down on the opponent\'s collarbone, shattering the shoulder cage.'
  },
  {
    id: 'ghost_touch',
    name: 'Ghost Touch',
    weaponFocus: 'Unarmed',
    stance: 'Hands open, completely relaxed',
    technique: 'Internal Hemorrhage Palm',
    description: 'A terrifying art that causes no external damage. A soft palm strike sends a shockwave through the water in the body, rupturing internal organs.'
  },
  {
    id: 'bear_hug',
    name: 'Bear\'s Embrace',
    weaponFocus: 'Unarmed',
    stance: 'Arms wide, chest exposed',
    technique: 'Spine-Cracker',
    description: 'A brutal grappling art. The practitioner wraps their arms around the enemy\'s midsection and squeezes until the ribs and spine audibly crack.'
  },

  // ==========================================
  // EXOTIC / UNCONVENTIONAL ARTS
  // ==========================================
  {
    id: 'viper_coil',
    name: 'Viper\'s Coil',
    weaponFocus: 'Whips / Kusarigama',
    stance: 'Low crouch, weapon in constant motion',
    technique: 'Entangle & Sever',
    description: 'Focuses on disarming and tripping opponents from mid-range, snapping the weapon at exposed joints before reeling the enemy in.'
  },
  {
    id: 'war_chant',
    name: 'War Chant of the Berserker',
    weaponFocus: 'Any Two-Handed Weapon',
    stance: 'No formal stance; weapon held overhead, screaming',
    technique: 'Frenzied Assault',
    description: 'Not a technique so much as a state of being. The practitioner enters a screaming battle frenzy, ignoring pain and fatigue to deliver a sustained barrage of wild blows.'
  },
  {
    id: 'twin_fan',
    name: 'Steel Fan Technique',
    weaponFocus: 'War Fans / Tessen',
    stance: 'Fans partially open, arms at the sides',
    technique: 'Deflect & Slice',
    description: 'Uses razor-edged iron fans to deflect incoming blows and delivered concealed cutting strikes. Favored by courtiers who must fight in formal settings.'
  },
  {
    id: 'pit_fighter',
    name: 'Pit Fighter\'s Instinct',
    weaponFocus: 'Any / Improvised',
    stance: 'No formal stance; constant movement and assessment',
    technique: 'Dirty Fighting',
    description: 'A survival art born in gladiatorial pits and back alleys. Eye gouges, groin strikes, biting, and using the environment as a weapon are all encouraged.'
  },
  {
    id: 'mounted_lance',
    name: 'Cavalier\'s Charge',
    weaponFocus: 'Lances / Mounted Weapons',
    stance: 'Lance couched under the arm, body locked to the saddle',
    technique: 'Full-Speed Impact',
    description: 'The devastating art of the mounted charge, converting the full momentum of horse and rider into a single, armor-shattering lance strike.'
  },
  {
    id: 'windmill_guard',
    name: 'Windmill Guard',
    weaponFocus: 'Quarterstaves',
    stance: 'Staff spinning rapidly in front of the body',
    technique: 'Deflecting Arc',
    description: 'A purely defensive maneuver that creates a literal wall of blurring wood, deflecting nearly all incoming arrows and magical bolts.'
  },
  {
    id: 'blowgun_sniper',
    name: 'Silent Breath',
    weaponFocus: 'Blowguns',
    stance: 'Hidden in foliage or rafters',
    technique: 'Poisoned Dart',
    description: 'A completely silent assassination art. The practitioner exhales a tiny dart coated in neurotoxin, leaving only a pinprick before the victim collapses.'
  },
  {
    id: 'scythe_reaper',
    name: 'Reaper\'s Harvest',
    weaponFocus: 'War Scythes',
    stance: 'Blade held low, parallel to the ground',
    technique: 'Soul-Catching Hook',
    description: 'Adapts agricultural tools for war. The curved blade is used to hook behind shields or grab necks, pulling enemies violently into close range.'
  },
  {
    id: 'lantern_flail',
    name: 'Inquisitor\'s Light',
    weaponFocus: 'Heavy Iron Lanterns on Chains',
    stance: 'Lantern swinging slowly',
    technique: 'Burning Oil Smash',
    description: 'A terrifying psychological art. The inquisitor swings a red-hot iron lantern, crushing skulls and splashing boiling, burning oil across the battlefield.'
  },
  {
    id: 'boomerang_throw',
    name: 'Returning Wind',
    weaponFocus: 'War Boomerangs',
    stance: 'Side stance, arm cocked back',
    technique: 'Behind-Cover Strike',
    description: 'Throws a heavy wooden blade in a wide arc, designed to fly around corners or trees and strike an enemy hiding in cover from the side or behind.'
  },
  {
    id: 'pickaxe_miner',
    name: 'Miner\'s Revolt',
    weaponFocus: 'Heavy Pickaxes',
    stance: 'Overhead grip, hunched stance',
    technique: 'Plate-Puncher',
    description: 'A brutal, untrained rebellion style that treats knightly plate mail exactly like a rock face. The heavy spike concentrates all force into a single piercing point.'
  },
  {
    id: 'puppet_master',
    name: 'Wire-Weaver',
    weaponFocus: 'Garrote Wires / Monofilament',
    stance: 'Hands hidden, fingers moving slightly',
    technique: 'Invisible Decapitation',
    description: 'The combatant strings near-invisible razor wire across doorways or between trees, maneuvering the enemy into slicing themselves to pieces.'
  },
];
