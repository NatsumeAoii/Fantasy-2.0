/**
 * A Feat represents a specialized talent, training, or innate knack that
 * grants a character a permanent passive advantage outside the normal
 * progression of their role. Feats are earned through experience, granted
 * by mentors, or unlocked by meeting specific physical or mental thresholds.
 * Unlike skills that improve gradually, a feat is an all-or-nothing ability
 * that fundamentally changes how a character approaches a particular domain.
 */
export interface Feat {
  /** Unique snake_case identifier. */
  id: string;
  /** Display name shown in the character forge UI. */
  name: string;
  /** Stat or proficiency gate required to take this feat, or null if open to all. */
  prerequisite: string | null;
  /** Narrative description of the mechanical advantage this feat provides. */
  benefit: string;
  /** Broad category used for filtering and section grouping. */
  type: 'Combat' | 'Utility' | 'Social' | 'Magic' | 'Survival' | 'Crafting';
  /** Power tier: 1 = foundational, 2 = advanced, 3 = master. */
  tier: 1 | 2 | 3;
}

/** Master list of all available feats, grouped by type. 25 per category, 150 total. */
export const FEATS: Feat[] = [
  // ==========================================
  // COMBAT
  // ==========================================
  { id: 'great_weapon_master', name: 'Great Weapon Master', prerequisite: 'Strength 13 or higher', benefit: 'Critical hits with melee weapons allow an immediate follow-up attack, and the wielder can trade accuracy for devastating damage.', type: 'Combat', tier: 2 },
  { id: 'dual_wielder', name: 'Dual Wielder', prerequisite: 'Dexterity 13 or higher', benefit: 'The character can wield two one-handed weapons of any size simultaneously and gains a bonus to defense while doing so.', type: 'Combat', tier: 2 },
  { id: 'sharpshooter', name: 'Sharpshooter', prerequisite: null, benefit: 'Ranged attacks ignore partial cover, suffer no penalty at long range, and can trade accuracy for massive damage.', type: 'Combat', tier: 2 },
  { id: 'sentinel', name: 'Sentinel', prerequisite: null, benefit: 'When an enemy within reach attacks an ally, the character can immediately retaliate, and enemies struck cannot disengage.', type: 'Combat', tier: 2 },
  { id: 'mounted_combatant', name: 'Mounted Combatant', prerequisite: 'Proficiency with mounts', benefit: 'While mounted, the character can redirect attacks aimed at their mount to themselves and deals bonus damage on charges.', type: 'Combat', tier: 2 },
  { id: 'tough', name: 'Tough', prerequisite: null, benefit: 'The character\'s maximum health increases significantly, representing an unusually resilient constitution.', type: 'Combat', tier: 1 },
  { id: 'grappler', name: 'Grappler', prerequisite: 'Strength 13 or higher', benefit: 'The character excels at wrestling and pinning opponents, gaining bonus effectiveness when restraining enemies in close combat.', type: 'Combat', tier: 1 },
  { id: 'shield_master', name: 'Shield Master', prerequisite: 'Proficiency with shields', benefit: 'The character can use their shield to shove enemies and gains improved resistance when bracing behind it.', type: 'Combat', tier: 2 },
  { id: 'polearm_expert', name: 'Polearm Expert', prerequisite: null, benefit: 'The character can strike with the butt-end of a polearm as a quick follow-up and can attack enemies as they approach.', type: 'Combat', tier: 2 },
  { id: 'riposte', name: 'Riposte', prerequisite: 'Dexterity 13 or higher', benefit: 'When an enemy misses the character with a melee attack, they can immediately strike back with a swift counter-attack.', type: 'Combat', tier: 2 },
  { id: 'cleave', name: 'Cleaving Strike', prerequisite: 'Strength 15 or higher', benefit: 'When the character kills a creature with a melee attack, excess damage carries over to an adjacent enemy.', type: 'Combat', tier: 3 },
  { id: 'iron_will', name: 'Iron Will', prerequisite: null, benefit: 'The character is exceptionally resistant to fear, charm, and intimidation, standing resolute when others would break.', type: 'Combat', tier: 1 },
  { id: 'mobile_combatant', name: 'Fleet-Footed Striker', prerequisite: 'Dexterity 15 or higher', benefit: 'The character can dash as a minor action and ignores difficult terrain while engaged in melee combat.', type: 'Combat', tier: 3 },
  { id: 'heavy_armor_master', name: 'Ironclad Juggernaut', prerequisite: 'Proficiency with heavy armor', benefit: 'While wearing heavy armor, the character takes reduced damage from non-magical slashing, piercing, and bludgeoning attacks.', type: 'Combat', tier: 2 },
  { id: 'crossbow_expert', name: 'Crossbow Expert', prerequisite: 'Proficiency with crossbows', benefit: 'The character ignores the loading time of crossbows and does not suffer a penalty for shooting in close combat.', type: 'Combat', tier: 2 },
  { id: 'martial_adept', name: 'Tactical Superiority', prerequisite: null, benefit: 'The character learns two advanced combat maneuvers and can periodically execute them to disarm, trip, or reposition enemies.', type: 'Combat', tier: 1 },
  { id: 'savage_attacker', name: 'Savage Executioner', prerequisite: 'Strength 13 or higher', benefit: 'The character\'s weapon strikes are uniquely brutal, allowing them to reroll low damage results on physical attacks.', type: 'Combat', tier: 2 },
  { id: 'charger', name: 'Relentless Charger', prerequisite: null, benefit: 'When sprinting toward an enemy, the character can deliver a devastating shoulder check or follow-up weapon strike pushing the enemy backward.', type: 'Combat', tier: 1 },
  { id: 'defensive_duelist', name: 'Blade Weaver', prerequisite: 'Dexterity 13 or higher', benefit: 'When using a nimble weapon, the character can use their reaction to parry a strike, adding their proficiency to their defense.', type: 'Combat', tier: 2 },
  { id: 'mage_slayer', name: 'Mage-Slayer', prerequisite: null, benefit: 'The character imposes severe penalties on nearby spellcasters and can reactively strike when an enemy attempts to cast close to them.', type: 'Combat', tier: 2 },
  { id: 'throat_seeker', name: 'Throat-Seeker', prerequisite: 'Dexterity 13 or higher', benefit: 'The character aims exclusively for vital arteries, inflicting severe bleeding wounds that drain the enemy\'s vitality over time.', type: 'Combat', tier: 2 },
  { id: 'bone_breaker', name: 'Bone-Shatterer', prerequisite: 'Strength 15 or higher', benefit: 'Blunt weapon strikes have a high chance to shatter enemy limbs, crippling their movement and reducing their offensive capabilities.', type: 'Combat', tier: 3 },
  { id: 'blind_fighter', name: 'Blind-Fighter', prerequisite: 'Wisdom 13 or higher', benefit: 'The character suffers no penalties when fighting in total darkness and can detect invisible enemies within close range.', type: 'Combat', tier: 2 },
  { id: 'iron_jaw', name: 'Iron Jaw', prerequisite: 'Constitution 15 or higher', benefit: 'The character is almost impossible to stun or knock unconscious with blunt force, shrugging off concussive blows effortlessly.', type: 'Combat', tier: 3 },

  // ==========================================
  // MAGIC
  // ==========================================
  { id: 'war_caster', name: 'War Caster', prerequisite: 'Ability to cast at least one spell', benefit: 'The caster can maintain concentration on spells more easily during combat and can cast while wielding weapons.', type: 'Magic', tier: 2 },
  { id: 'metamagic_adept', name: 'Metamagic Adept', prerequisite: 'Ability to cast at least one spell', benefit: 'The caster learns to modify their spells on the fly, extending range, duration, or altering their target type.', type: 'Magic', tier: 2 },
  { id: 'ritual_caster', name: 'Ritual Caster', prerequisite: null, benefit: 'The character can cast certain spells without expending mana by performing them as lengthy rituals instead.', type: 'Magic', tier: 1 },
  { id: 'elemental_affinity', name: 'Elemental Affinity', prerequisite: 'Ability to cast elemental spells', benefit: 'The caster deals bonus damage with spells of their chosen element and gains minor resistance to that element.', type: 'Magic', tier: 2 },
  { id: 'spell_sniper', name: 'Spell Sniper', prerequisite: 'Ability to cast at least one spell', benefit: 'The caster\'s attack spells have doubled range and can ignore partial cover between them and the target.', type: 'Magic', tier: 2 },
  { id: 'arcane_recovery', name: 'Arcane Recovery', prerequisite: 'Ability to cast at least one spell', benefit: 'During a brief reprieve, the caster can recover a portion of their spent mana through focused meditation.', type: 'Magic', tier: 1 },
  { id: 'blood_mage', name: 'Blood Mage', prerequisite: 'Constitution 13 or higher', benefit: 'The caster can use their own health to fuel spells when their mana is depleted, at significant personal risk.', type: 'Magic', tier: 2 },
  { id: 'silent_caster', name: 'Silent Caster', prerequisite: 'Ability to cast at least one spell', benefit: 'The caster can perform spells without verbal incantations, making them extremely difficult to counter or detect.', type: 'Magic', tier: 2 },
  { id: 'wild_magic_control', name: 'Wild Magic Control', prerequisite: 'Experience with wild magic surges', benefit: 'The character has learned to partially direct the chaos of wild magic, rerolling undesirable surge results.', type: 'Magic', tier: 2 },
  { id: 'familiar_mastery', name: 'Familiar Mastery', prerequisite: 'An active familiar bond', benefit: 'The character\'s familiar gains increased capabilities, can deliver touch spells, and can communicate telepathically at extended range.', type: 'Magic', tier: 2 },
  { id: 'elemental_adept', name: 'Master of Elements', prerequisite: 'Ability to cast spells', benefit: 'Spells of a chosen element completely ignore enemy resistances and deal higher average damage.', type: 'Magic', tier: 3 },
  { id: 'resilient_mind', name: 'Resilient Caster', prerequisite: null, benefit: 'The character gains permanent proficiency in mental fortitude checks, resisting enchantments and mind-control with ease.', type: 'Magic', tier: 1 },
  { id: 'shadow_touched', name: 'Touched by Shadow', prerequisite: null, benefit: 'The character learns to turn briefly invisible and cast minor necrotic illusions without formal magical training.', type: 'Magic', tier: 1 },
  { id: 'fey_touched', name: 'Fey-Touched', prerequisite: null, benefit: 'The character can teleport short distances and influence the minds of others using innate fey magic.', type: 'Magic', tier: 1 },
  { id: 'telekinetic', name: 'Latent Telekinesis', prerequisite: 'Intelligence 13 or higher', benefit: 'The character can invisibly move small objects and shove enemies forcefully using only their mind.', type: 'Magic', tier: 2 },
  { id: 'ritual_master', name: 'Supreme Ritualist', prerequisite: 'Ritual casting ability', benefit: 'The character performs magical rituals in half the normal time and requires significantly fewer rare materials.', type: 'Magic', tier: 3 },
  { id: 'wand_adept', name: 'Wand Adept', prerequisite: 'Ability to cast spells', benefit: 'The character can cast spells from wands faster and squeeze more charges out of almost depleted magical focuses.', type: 'Magic', tier: 2 },
  { id: 'spell_duelist', name: 'Spell-Duelist', prerequisite: 'Ability to cast spells', benefit: 'The character has honed their reflexes for magical combat, excelling at counter-spelling and dodging magical projectiles.', type: 'Magic', tier: 2 },
  { id: 'hex_breaker', name: 'Hex-Breaker', prerequisite: null, benefit: 'The character is naturally resistant to curses and can instinctively dismantle magical wards through sheer force of will.', type: 'Magic', tier: 1 },
  { id: 'arcane_architect', name: 'Arcane Architect', prerequisite: null, benefit: 'The character can perceive magical leylines with the naked eye and instantly identify the properties of enchanted architecture.', type: 'Magic', tier: 1 },
  { id: 'soul_drinker', name: 'Soul-Drinker', prerequisite: 'Ability to cast spells', benefit: 'Whenever the caster kills an enemy with a spell, they absorb a fragment of the victim\'s soul to restore a small amount of mana.', type: 'Magic', tier: 3 },
  { id: 'mana_burn', name: 'Mana-Burner', prerequisite: 'Ability to cast spells', benefit: 'The caster can intentionally overcharge a spell, suffering physical damage to drastically increase the spell\'s destructive output.', type: 'Magic', tier: 3 },
  { id: 'rune_scarred', name: 'Rune-Scarred Flesh', prerequisite: null, benefit: 'The character has magical wards physically carved into their skin, granting immunity to low-level elemental magic.', type: 'Magic', tier: 2 },
  { id: 'spell_eater', name: 'Spell-Eater', prerequisite: 'Constitution 15 or higher', benefit: 'When the character successfully resists a hostile spell, they absorb the residual arcane energy to heal moderate wounds.', type: 'Magic', tier: 3 },
  { id: 'blood_hex', name: 'Blood-Hexer', prerequisite: null, benefit: 'To cast a curse, the character can use their own blood in place of material components, making the curse significantly harder to break.', type: 'Magic', tier: 2 },

  // ==========================================
  // UTILITY
  // ==========================================
  { id: 'alertness', name: 'Alertness', prerequisite: null, benefit: 'The character gains a permanent bonus to passive perception and cannot be caught off-guard while conscious.', type: 'Utility', tier: 1 },
  { id: 'dungeon_delver', name: 'Dungeon Delver', prerequisite: null, benefit: 'The character has a heightened sense for detecting hidden doors and mechanisms, and takes reduced damage from traps.', type: 'Utility', tier: 1 },
  { id: 'lucky', name: 'Lucky', prerequisite: null, benefit: 'The character has an uncanny knack for escaping bad situations, able to force a reroll on critical failures a few times per day.', type: 'Utility', tier: 2 },
  { id: 'observant', name: 'Observant', prerequisite: null, benefit: 'The character can read lips from across a room and notices minute details that others overlook entirely.', type: 'Utility', tier: 1 },
  { id: 'linguist', name: 'Linguist', prerequisite: null, benefit: 'The character learns three additional languages and can create simple ciphers that others cannot decode without the key.', type: 'Utility', tier: 1 },
  { id: 'athlete', name: 'Athlete', prerequisite: null, benefit: 'The character can climb at full speed, requires minimal running start for jumps, and recovers from falls with a roll.', type: 'Utility', tier: 1 },
  { id: 'speed_reader', name: 'Speed Reader', prerequisite: 'Intelligence 13 or higher', benefit: 'The character can read and comprehend written material at five times the normal speed, retaining full understanding.', type: 'Utility', tier: 2 },
  { id: 'keen_mind', name: 'Keen Mind', prerequisite: null, benefit: 'The character has perfect recall of anything they have seen or heard within the past month.', type: 'Utility', tier: 2 },
  { id: 'skilled', name: 'Jack of All Trades', prerequisite: null, benefit: 'The character gains basic proficiency in three skills of their choice, reflecting a broad range of life experiences.', type: 'Utility', tier: 1 },
  { id: 'skulker', name: 'Master of Shadows', prerequisite: 'Dexterity 13 or higher', benefit: 'The character can hide in faint shadows, misses with ranged attacks do not reveal their position, and dim light does not obscure their vision.', type: 'Utility', tier: 2 },
  { id: 'acrobat', name: 'Peerless Acrobat', prerequisite: null, benefit: 'The character can traverse incredibly narrow surfaces, balance perfectly on ropes, and break out of physical restraints effortlessly.', type: 'Utility', tier: 1 },
  { id: 'actor_supreme', name: 'The Nameless Face', prerequisite: 'Charisma 15 or higher', benefit: 'The character is physically unrecognizable in disguise and can perfectly forge handwriting and documentation.', type: 'Utility', tier: 3 },
  { id: 'dungeoneer', name: 'Trap-Sense', prerequisite: null, benefit: 'The character instinctively notices pressure plates and tripwires without searching, and can disarm them in a fraction of the time.', type: 'Utility', tier: 1 },
  { id: 'medic', name: 'Field Surgeon', prerequisite: null, benefit: 'The character can stabilize dying allies instantly and maximize the healing drawn from bandages and short rests.', type: 'Utility', tier: 1 },
  { id: 'linguist_master', name: 'Polyglot', prerequisite: 'Intelligence 13 or higher', benefit: 'The character learns five new languages and can decipher fragments of forgotten, dead tongues on sight.', type: 'Utility', tier: 2 },
  { id: 'eater_of_poison', name: 'Venom-Proof', prerequisite: 'Constitution 13 or higher', benefit: 'The character becomes completely immune to ingested poisons and diseases, and gains resistance to venomous bites.', type: 'Utility', tier: 2 },
  { id: 'keen_ears', name: 'Bat-Eared', prerequisite: null, benefit: 'The character can hear whispers through solid stone walls and pinpoint invisible creatures based purely on sound.', type: 'Utility', tier: 2 },
  { id: 'locksmith', name: 'Master Locksmith', prerequisite: 'Dexterity 13 or higher', benefit: 'The character can pick complex locks in seconds, even without tools, and can craft unpickable locks of their own.', type: 'Utility', tier: 2 },
  { id: 'contortionist', name: 'Contortionist', prerequisite: 'Dexterity 13 or higher', benefit: 'The character can dislocate their joints to squeeze through impossibly tight spaces and automatically escape routine physical restraints.', type: 'Utility', tier: 2 },
  { id: 'mimicry', name: 'Perfect Mimic', prerequisite: null, benefit: 'The character can perfectly replicate the sounds of wild beasts, ticking machinery, or environmental hazards to create diversions.', type: 'Utility', tier: 1 },
  { id: 'night_vision', name: 'Cat\'s Eyes', prerequisite: null, benefit: 'The character can see perfectly in dim light and their eyes adjust to pitch-black environments in seconds, retaining color vision.', type: 'Utility', tier: 1 },
  { id: 'fast_hands', name: 'Sleight of Hand', prerequisite: 'Dexterity 15 or higher', benefit: 'The character can pick pockets, plant items, or conceal tiny weapons up their sleeves indistinguishably to the naked eye.', type: 'Utility', tier: 3 },
  { id: 'forger', name: 'Ink-Stainer', prerequisite: 'Dexterity 13 or higher', benefit: 'The character can create flawless wax seals, forge official edicts, and counterfeit mint stamps indistinguishable from the real ones.', type: 'Utility', tier: 2 },
  { id: 'light_step', name: 'Feather-Tread', prerequisite: 'Dexterity 15 or higher', benefit: 'The character leaves no footprints on soft ground, snow, or mud, and never accidentally snaps twigs or dry leaves while walking.', type: 'Utility', tier: 3 },
  { id: 'pain_tolerance', name: 'Numb-Flesh', prerequisite: 'Constitution 15 or higher', benefit: 'The character does not flinch from extreme burns or cuts, allowing them to perform delicate tasks while actively taking damage.', type: 'Utility', tier: 3 },

  // ==========================================
  // SOCIAL
  // ==========================================
  { id: 'silver_tongue', name: 'Silver Tongue', prerequisite: 'Charisma 13 or higher', benefit: 'The character can flawlessly mimic speech patterns and accents of any humanoid they have listened to for at least one minute.', type: 'Social', tier: 2 },
  { id: 'inspiring_leader', name: 'Inspiring Leader', prerequisite: 'Charisma 13 or higher', benefit: 'The character can deliver a rousing speech that bolsters the morale and temporary vitality of all allies who hear it.', type: 'Social', tier: 2 },
  { id: 'actor', name: 'Actor', prerequisite: null, benefit: 'The character is a masterful impersonator, able to convincingly mimic the appearance, voice, and mannerisms of others.', type: 'Social', tier: 1 },
  { id: 'intimidator', name: 'Menacing Presence', prerequisite: null, benefit: 'The character\'s mere presence in a confrontation can cause weaker-willed opponents to flee or surrender.', type: 'Social', tier: 1 },
  { id: 'diplomat', name: 'Diplomat', prerequisite: 'Charisma 13 or higher', benefit: 'The character has formal training in negotiation and can broker deals between hostile parties with greater success.', type: 'Social', tier: 2 },
  { id: 'empathic', name: 'Empathic Reader', prerequisite: 'Wisdom 13 or higher', benefit: 'The character can read micro-expressions and body language to determine if someone is lying, nervous, or hiding something.', type: 'Social', tier: 2 },
  { id: 'street_smart', name: 'Street Smart', prerequisite: null, benefit: 'The character knows how to navigate criminal underworlds, find black markets, and communicate in thieves\' cant.', type: 'Social', tier: 1 },
  { id: 'noble_bearing', name: 'Noble Bearing', prerequisite: null, benefit: 'The character carries themselves with such authority that commoners and soldiers instinctively defer to them.', type: 'Social', tier: 1 },
  { id: 'tavern_regular', name: 'Tavern Regular', prerequisite: null, benefit: 'The character always knows the best tavern in any town and can reliably gather local rumors within an hour of arriving.', type: 'Social', tier: 1 },
  { id: 'inspiring_words', name: 'Voice of Command', prerequisite: 'Charisma 13 or higher', benefit: 'The character can issue a booming command that forces a hesitant or fearful ally to act immediately despite their fear.', type: 'Social', tier: 2 },
  { id: 'frightful_presence', name: 'Dread Aspect', prerequisite: 'Charisma 15 or higher', benefit: 'The character can exude an aura of sheer terror, causing weaker enemies to drop their weapons and flee or cower.', type: 'Social', tier: 3 },
  { id: 'master_manipulator', name: 'Puppet Master', prerequisite: null, benefit: 'The character excels at planting ideas in other people\'s heads in a way that makes the target believe it was their own idea.', type: 'Social', tier: 2 },
  { id: 'iron_negotiator', name: 'Stone-Faced Haggler', prerequisite: null, benefit: 'The character can never be cheated in a deal. They sense when an offer is unfair and can intuitively guess the true value of any item.', type: 'Social', tier: 1 },
  { id: 'noble_etiquette', name: 'Highborn Graces', prerequisite: null, benefit: 'The character fits flawlessly into any royal court, implicitly knows the lineage of noble houses, and never commits a faux pas.', type: 'Social', tier: 1 },
  { id: 'street_rat', name: 'Gutter-Born', prerequisite: null, benefit: 'The character is instantly trusted by beggars, orphans, and criminals, unlocking a massive network of lower-class informants.', type: 'Social', tier: 1 },
  { id: 'interrogator', name: 'Mind-Breaker', prerequisite: null, benefit: 'The character can extract information without leaving physical marks, using terrifying psychological pressure that few can resist.', type: 'Social', tier: 2 },
  { id: 'rumor_monger', name: 'Rumor-Monger', prerequisite: 'Charisma 13 or higher', benefit: 'The character can plant false rumors that spread rapidly through a city, manipulating public opinion without being traced.', type: 'Social', tier: 2 },
  { id: 'court_jester', name: 'Court Jester', prerequisite: 'Charisma 13 or higher', benefit: 'The character can openly insult officials or royalty under the guise of humor without provoking legal or violent repercussions.', type: 'Social', tier: 2 },
  { id: 'blackmailer', name: 'Shadow Broker', prerequisite: 'Intelligence 13 or higher', benefit: 'The character instinctively knows how to extract damaging secrets from casual conversations and leverage them for favors safely.', type: 'Social', tier: 2 },
  { id: 'orator', name: 'Demagogue', prerequisite: 'Charisma 15 or higher', benefit: 'The character is a terrifyingly effective public speaker, able to incite riots or pacify mobs with a single impassioned speech.', type: 'Social', tier: 3 },
  { id: 'seduction_master', name: 'Heart-Thief', prerequisite: 'Charisma 15 or higher', benefit: 'The character is incredibly adept at feigning romantic interest, easily extracting keys, passwords, or favors from smitten targets.', type: 'Social', tier: 3 },
  { id: 'bribe_master', name: 'Coin-Pusher', prerequisite: null, benefit: 'The character intuitively knows exactly how much a guard or official costs to bribe, and how to offer it without giving offense.', type: 'Social', tier: 1 },
  { id: 'charlatan', name: 'Snake-Oil Salesman', prerequisite: 'Charisma 13 or higher', benefit: 'The character can sell literal dirt by spinning a convincing narrative of mystical healing properties, duping crowds out of their coin.', type: 'Social', tier: 2 },
  { id: 'face_in_crowd', name: 'Grey Man', prerequisite: null, benefit: 'The character can make themselves socially invisible by adopting the exact posture and demeanor of the local lower class, blending perfectly.', type: 'Social', tier: 1 },
  { id: 'blood_debt', name: 'Oath-Binder', prerequisite: 'Charisma 13 or higher', benefit: 'The character can enforce a terrifyingly binding blood oath upon a willing subject, making the subject psychologically incapable of betrayal.', type: 'Social', tier: 3 },

  // ==========================================
  // SURVIVAL
  // ==========================================
  { id: 'tracker', name: 'Expert Tracker', prerequisite: null, benefit: 'The character can follow tracks across any terrain, identifying the number, size, and speed of creatures that passed.', type: 'Survival', tier: 1 },
  { id: 'forager', name: 'Natural Forager', prerequisite: null, benefit: 'The character never starves in the wild, always finding enough food and water to sustain themselves and one companion.', type: 'Survival', tier: 1 },
  { id: 'iron_constitution', name: 'Iron Constitution', prerequisite: 'Constitution 13 or higher', benefit: 'The character is highly resistant to diseases, poisons, and environmental hazards, shrugging off effects that fell others.', type: 'Survival', tier: 2 },
  { id: 'weather_sense', name: 'Weather Sense', prerequisite: null, benefit: 'The character can predict weather changes hours in advance and always finds adequate shelter before storms arrive.', type: 'Survival', tier: 1 },
  { id: 'light_sleeper', name: 'Light Sleeper', prerequisite: null, benefit: 'The character sleeps so lightly that they wake at the slightest disturbance and require only four hours of rest.', type: 'Survival', tier: 1 },
  { id: 'beast_friend', name: 'Beast Friend', prerequisite: null, benefit: 'Wild animals do not attack the character unless provoked, and the character can calm hostile beasts with gentle gestures.', type: 'Survival', tier: 1 },
  { id: 'fire_starter', name: 'Fire Starter', prerequisite: null, benefit: 'The character can start a fire in any conditions, even in driving rain or howling wind, using minimal materials.', type: 'Survival', tier: 1 },
  { id: 'sea_legs', name: 'Sea Legs', prerequisite: null, benefit: 'The character is immune to seasickness and can navigate by the stars, always knowing their approximate position.', type: 'Survival', tier: 1 },
  { id: 'desert_born', name: 'Dune-Walker', prerequisite: null, benefit: 'The character requires only half the normal water intake, is immune to heat exhaustion, and never leaves footprints in sand.', type: 'Survival', tier: 2 },
  { id: 'arctic_adapted', name: 'Frost-Blood', prerequisite: null, benefit: 'The character is completely unbothered by freezing temperatures, cannot suffer frostbite, and is never hindered by deep snow.', type: 'Survival', tier: 2 },
  { id: 'swamp_strider', name: 'Muck-Walker', prerequisite: null, benefit: 'The character is immune to natural swamp diseases and can walk across thick mud or bog expanses as if they were solid ground.', type: 'Survival', tier: 2 },
  { id: 'mountain_goat', name: 'Crag-Scaler', prerequisite: null, benefit: 'The character can climb sheer rock faces without equipment and never suffers altitude sickness or vertigo.', type: 'Survival', tier: 2 },
  { id: 'deep_diver', name: 'Pearl Diver', prerequisite: null, benefit: 'The character can hold their breath for up to ten minutes and suffers no penalties while fighting underwater.', type: 'Survival', tier: 2 },
  { id: 'beast_whisperer', name: 'Lord of Beasts', prerequisite: 'Wisdom 13 or higher', benefit: 'The character can temporarily tame and command a single wild apex predator for up to an hour.', type: 'Survival', tier: 3 },
  { id: 'iron_stomach', name: 'Scavenger', prerequisite: null, benefit: 'The character can safely eat rotting meat, poisonous plants, or raw bones without suffering any ill effects, drawing full nutrition.', type: 'Survival', tier: 1 },
  { id: 'cave_dweller', name: 'Subterranean Scavenger', prerequisite: null, benefit: 'The character can navigate deep cave systems without light sources and safely consume glowing mosses and cave insects.', type: 'Survival', tier: 1 },
  { id: 'jungle_strider', name: 'Jungle-Strider', prerequisite: null, benefit: 'The character is completely immune to tropical fevers and can move silently through dense canopy and thorny underbrush without snagging.', type: 'Survival', tier: 2 },
  { id: 'canopy_leaper', name: 'Canopy-Leaper', prerequisite: 'Dexterity 13 or higher', benefit: 'The character can traverse treetops as easily as flat ground and never suffers fall damage when dropping onto foliage or branches.', type: 'Survival', tier: 2 },
  { id: 'wasteland_survivor', name: 'Blight-Walker', prerequisite: 'Constitution 13 or higher', benefit: 'The character is highly resistant to arcane blights and radiation, and can filter pure water from toxic sludge.', type: 'Survival', tier: 2 },
  { id: 'volcanic_adapted', name: 'Ash-Lung', prerequisite: 'Constitution 13 or higher', benefit: 'The character can breathe comfortably in heavy ash or thick smoke and is unbothered by ambient volcanic heat.', type: 'Survival', tier: 2 },
  { id: 'trap_setter', name: 'Snare-Weaver', prerequisite: null, benefit: 'The character can construct highly lethal tripwire snares, dead-falls, and spiked pits using only natural sticks, rocks, and vines.', type: 'Survival', tier: 1 },
  { id: 'night_stalker', name: 'Owl-Wing', prerequisite: 'Dexterity 13 or higher', benefit: 'The character moves faster and entirely silently during the dark of the moon, blending naturally into the deepest nocturnal shadows.', type: 'Survival', tier: 2 },
  { id: 'bloodhound', name: 'Bloodhound', prerequisite: 'Wisdom 15 or higher', benefit: 'The character can track a wounded enemy by tasting the soil, following the faintest microscopic droplets of blood for miles.', type: 'Survival', tier: 3 },
  { id: 'quicksand_walker', name: 'Bog-Skimmer', prerequisite: 'Dexterity 13 or higher', benefit: 'The character distributes their weight perfectly, allowing them to dash across quicksand and fragile ice without breaking the surface.', type: 'Survival', tier: 2 },
  { id: 'hibernator', name: 'Bear-Trance', prerequisite: 'Constitution 15 or higher', benefit: 'The character can voluntarily lower their heart rate to almost zero, feigning death perfectly to deceive predators or save oxygen.', type: 'Survival', tier: 3 },

  // ==========================================
  // CRAFTING
  // ==========================================
  { id: 'master_smith', name: 'Master Smith', prerequisite: 'Proficiency with smith\'s tools', benefit: 'Weapons and armor crafted by this character have increased durability and can incorporate rare materials more effectively.', type: 'Crafting', tier: 2 },
  { id: 'herbalist', name: 'Herbalist', prerequisite: null, benefit: 'The character can identify any plant by sight or smell and brew basic medicinal remedies from wild ingredients.', type: 'Crafting', tier: 1 },
  { id: 'poisoner', name: 'Poisoner', prerequisite: null, benefit: 'The character is skilled in the creation and application of poisons, and can identify poisoned food or drink on sight.', type: 'Crafting', tier: 1 },
  { id: 'scroll_scribe', name: 'Scroll Scribe', prerequisite: 'Ability to cast at least one spell', benefit: 'The character can inscribe spells they know onto scrolls, creating single-use magical items for later use.', type: 'Crafting', tier: 2 },
  { id: 'jeweler', name: 'Master Jeweler', prerequisite: 'Proficiency with jeweler\'s tools', benefit: 'The character can appraise and cut gemstones to maximize their value, and can create exquisite jewelry from raw materials.', type: 'Crafting', tier: 2 },
  { id: 'tinkerer', name: 'Tinkerer', prerequisite: null, benefit: 'The character can repair mechanical devices, pick locks, and construct simple clockwork contraptions from salvaged parts.', type: 'Crafting', tier: 1 },
  { id: 'siege_engineer', name: 'Siege Engineer', prerequisite: null, benefit: 'The character understands the construction and operation of siege weapons and fortifications.', type: 'Crafting', tier: 1 },
  { id: 'master_chef', name: 'Master Chef', prerequisite: null, benefit: 'Food prepared by this character is so nourishing that it grants temporary vitality boosts and faster recovery to those who eat it.', type: 'Crafting', tier: 1 },
  { id: 'master_alchemist', name: 'Elixir Prodigy', prerequisite: 'Proficiency with alchemy supplies', benefit: 'The character can brew standard potions in half the time, and their healing draughts restore significantly more vitality.', type: 'Crafting', tier: 2 },
  { id: 'master_enchanter', name: 'Rune-Binder', prerequisite: 'Ability to cast spells', benefit: 'The character can apply minor permanent magical effects to mundane items, such as a self-repairing cloak or an ever-glowing lantern.', type: 'Crafting', tier: 2 },
  { id: 'master_armorer', name: 'Aegis-Smith', prerequisite: 'Strength 13 or higher', benefit: 'Armor modified by the character is lighter and less restrictive. They can remove stealth penalties from heavy armor.', type: 'Crafting', tier: 2 },
  { id: 'master_bowyer', name: 'Tension-Master', prerequisite: 'Dexterity 13 or higher', benefit: 'Bows crafted or strung by the character have vastly increased range and tension, dealing significantly more damage.', type: 'Crafting', tier: 2 },
  { id: 'master_poisoner', name: 'Venom-Distiller', prerequisite: null, benefit: 'Poisons crafted by the character bypass natural immunities and cannot be detected by smell or taste.', type: 'Crafting', tier: 3 },
  { id: 'master_tinker', name: 'Clockwork Savant', prerequisite: 'Intelligence 13 or higher', benefit: 'The character can build small, autonomous clockwork scouts or explosive mechanized traps.', type: 'Crafting', tier: 2 },
  { id: 'master_leatherworker', name: 'Hide-Tanner', prerequisite: null, benefit: 'The character can harvest the hides of magical beasts without damaging them, creating armor with innate elemental resistances.', type: 'Crafting', tier: 2 },
  { id: 'master_cartographer', name: 'Wayfinder\'s Eye', prerequisite: null, benefit: 'The character can produce flawless maps from memory alone and craft compass-roses that magically orient themselves toward the nearest settlement.', type: 'Crafting', tier: 1 },
  { id: 'master_weaver', name: 'Silk-Spinner', prerequisite: null, benefit: 'The character can harvest giant spider silk to craft lightweight, impossibly strong garments that offer magical protection.', type: 'Crafting', tier: 2 },
  { id: 'master_brewer', name: 'Iron-Keg Brewer', prerequisite: null, benefit: 'The character can ferment potent, fortified ales that temporarily numb pain and bolster combat resolve for their allies.', type: 'Crafting', tier: 1 },
  { id: 'master_glassblower', name: 'Crystal-Smith', prerequisite: 'Dexterity 13 or higher', benefit: 'The character can blow shatterproof glass vials and craft precision optometry lenses that reveal hidden magical auras.', type: 'Crafting', tier: 2 },
  { id: 'master_mason', name: 'Stone-Caller', prerequisite: 'Strength 13 or higher', benefit: 'The character can construct flawless stone fortifications overnight and instantly identify structural weaknesses in enemy holds.', type: 'Crafting', tier: 2 },
  { id: 'master_fletcher', name: 'Feather-Binder', prerequisite: 'Dexterity 13 or higher', benefit: 'Arrows fletched by the character fly exceptionally true, doubling their lethal range and resisting heavy crosswinds entirely.', type: 'Crafting', tier: 2 },
  { id: 'master_cobbler', name: 'Step-Cushioner', prerequisite: null, benefit: 'The character crafts customized boots that muffle footsteps completely, granting a massive stealth advantage on hard stone surfaces.', type: 'Crafting', tier: 1 },
  { id: 'master_trapper', name: 'Steel-Jaw Smith', prerequisite: 'Proficiency with smithing', benefit: 'The character crafts custom heavy bear-traps with serrated teeth, dealing massive bleed damage and cleanly severing limbs.', type: 'Crafting', tier: 3 },
  { id: 'master_distiller', name: 'Moonshiner', prerequisite: null, benefit: 'The character distills alcohols so potent they can reliably sterilize infected wounds or serve as high-yield firebomb fuel.', type: 'Crafting', tier: 1 },
  { id: 'master_luthier', name: 'String-Twister', prerequisite: 'Dexterity 13 or higher', benefit: 'The character constructs lutes and harps possessing bizarre acoustic properties that substantially amplify bardic magic.', type: 'Crafting', tier: 3 },
];
