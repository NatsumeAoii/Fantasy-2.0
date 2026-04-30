/**
 * A debilitating condition such as a disease, curse, parasite,
 * poison, madness, or corruption that impairs the character.
 * Each affliction has a transmission vector, ongoing effect, and cure.
 */
export interface Affliction {
  id: string;
  name: string;
  type: 'Disease' | 'Curse' | 'Parasite' | 'Poison' | 'Madness' | 'Corruption';
  transmission: string;
  effect: string;
  cure: string;
  /** Lethality / impact tier: 1 = nuisance, 2 = debilitating, 3 = dangerous, 4 = severe, 5 = lethal, 6 = catastrophic. */
  severity: 1 | 2 | 3 | 4 | 5 | 6;
}

/** Master list of all afflictions, organized by type. */
export const AFFLICTIONS: Affliction[] = [
  // ==========================================
  // DISEASES
  // ==========================================
  {
    id: 'sewer_plague',
    name: 'Sewer Plague',
    type: 'Disease',
    transmission: 'Bite from a rat or contact with stagnant filth',
    effect: 'Induces severe fatigue, muscle cramps, and halved movement speed as the body attempts to purge the infection.',
    cure: 'Three consecutive days of bed rest combined with potent herbal remedies.',
    severity: 2
  },
  {
    id: 'crimson_pox',
    name: 'Crimson Pox',
    type: 'Disease',
    transmission: 'Airborne in overcrowded slums and refugee camps',
    effect: 'Bright red pustules cover the body, causing intense itching, fever, and eventual scarring. Highly contagious during the pustule phase.',
    cure: 'Quarantine and a poultice of silver-leaf and goat\'s milk applied twice daily for a week.',
    severity: 3
  },
  {
    id: 'bone_rot',
    name: 'Bone Rot',
    type: 'Disease',
    transmission: 'Consuming contaminated marrow or bone-meal bread',
    effect: 'The victim\'s bones gradually soften, making fractures increasingly common and movement agonizing.',
    cure: 'A diet rich in calcium-fortified alchemical supplements and complete bed rest for one month.',
    severity: 4
  },
  {
    id: 'swamp_lung',
    name: 'Swamp Lung',
    type: 'Disease',
    transmission: 'Inhaling spores from rotting vegetation in marshlands',
    effect: 'Progressive respiratory failure. The victim coughs constantly, struggles to breathe, and eventually drowns in their own fluid.',
    cure: 'A fumigation treatment using dried pine-resin smoke inhaled through a copper pipe.',
    severity: 5
  },
  {
    id: 'blinding_sickness',
    name: 'Blinding Sickness',
    type: 'Disease',
    transmission: 'Drinking from a contaminated water source',
    effect: 'Gradual loss of vision over several days until the victim is completely blind. Eyes become milky white.',
    cure: 'Elven eye-drops distilled from starlight moss, applied every four hours for three days.',
    severity: 4
  },
  {
    id: 'cackle_fever',
    name: 'Cackle Fever',
    type: 'Disease',
    transmission: 'Airborne, spread through the laughter of an infected person',
    effect: 'Uncontrollable bouts of maniacal laughter that leave the victim exhausted, unable to speak coherently, and socially ostracized.',
    cure: 'Complete silence and isolation for one week, combined with sedative herbal teas.',
    severity: 2
  },
  {
    id: 'flesh_warp',
    name: 'Flesh Warp',
    type: 'Disease',
    transmission: 'Contact with aberrant creature ichor',
    effect: 'The victim\'s flesh begins to shift and rearrange itself unpredictably, growing extra fingers, moving facial features, or sealing orifices.',
    cure: 'Extremely rare stabilizing elixir brewed from aboleth mucus and crystal-moth wings.',
    severity: 5
  },
  {
    id: 'iron_blood',
    name: 'Iron Blood',
    type: 'Disease',
    transmission: 'A wound inflicted by a heavily corroded iron weapon',
    effect: 'The victim\'s blood slowly hardens, causing extreme joint stiffness and eventual total paralysis as the circulatory system solidifies.',
    cure: 'A full blood transfusion performed by a skilled healer using purified donor blood.',
    severity: 5
  },
  {
    id: 'weeping_ague',
    name: 'Weeping Ague',
    type: 'Disease',
    transmission: 'Bite from infected insects',
    effect: 'Causes sudden fever spikes and spontaneous bleeding from the eyes, leaving the victim exhausted.',
    cure: 'A poultice of star-thistle applied to the temples.',
    severity: 3
  },
  {
    id: 'stone_scale',
    name: 'Stone Scale',
    type: 'Disease',
    transmission: 'Airborne in deep mines',
    effect: 'Skin gradually hardens into a dense, rock-like crust, drastically reducing mobility and sensation.',
    cure: 'Bathing in a highly acidic alchemical solvent for three days.',
    severity: 4
  },
  {
    id: 'frost_fever',
    name: 'Frost Fever',
    type: 'Disease',
    transmission: 'Exposure to magical cold',
    effect: 'The victim feels an unshakeable inner freezing. Breath constantly fogs, and extremities slowly turn black.',
    cure: 'Consuming broth made from an adult fire salamander.',
    severity: 4
  },
  {
    id: 'whispering_cough',
    name: 'Whispering Cough',
    type: 'Disease',
    transmission: 'Inhaling tomb-dust',
    effect: 'Every cough produces a faint, ghostly whisper. Progresses to severe chest pain and silence.',
    cure: 'Inhaling vaporized holy water mixed with crushed pearls.',
    severity: 3
  },
  {
    id: 'blood_rust',
    name: 'Blood Rust',
    type: 'Disease',
    transmission: 'Contact with oxidized cursed iron',
    effect: 'Blood physically rusts inside the veins, causing severe joint pain and metallic tasting coughs.',
    cure: 'Transfusion of pure water element-infused fluids.',
    severity: 4
  },
  {
    id: 'ash_lung',
    name: 'Ash Lung',
    type: 'Disease',
    transmission: 'Volcanic ash inhalation',
    effect: 'Lungs fill with heavy ash, causing choking fits and grey-tinged skin. Stamina is drastically reduced.',
    cure: 'A tincture of wind-flower and extensive bedrest in sea air.',
    severity: 3
  },
  {
    id: 'fever_dreams',
    name: 'Dreamer\'s Fever',
    type: 'Disease',
    transmission: 'Ingesting tainted lotus pollen',
    effect: 'The victim slips into a waking dream state, hallucinating wildly and unable to distinguish reality.',
    cure: 'An awakening draught brewed with crushed coffee beans and belladonna.',
    severity: 3
  },
  {
    id: 'glass_bone',
    name: 'Glass Bone',
    type: 'Disease',
    transmission: 'Rare arcane radiation',
    effect: 'The victim\'s bones become crystalline and brittle, shattering under mild impacts.',
    cure: 'A high-mineral diet supplemented with crushed gorgon horn.',
    severity: 5
  },
  {
    id: 'shadow_blight',
    name: 'Shadow Blight',
    type: 'Disease',
    transmission: 'Extended exposure in the Shadowfell',
    effect: 'Skin loses all color, becoming semi-translucent; the victim becomes intensely sensitive to bright light.',
    cure: 'Basking in true sunlight filtered through an unblemished diamond.',
    severity: 3
  },
  {
    id: 'ghoul_gut',
    name: 'Ghoul Gut',
    type: 'Disease',
    transmission: 'Eating spoiled grave-meat',
    effect: 'Violent stomach cramps and an unnatural craving for raw flesh. Normal food rots instantly upon swallowing.',
    cure: 'Fasting for a week combined with daily ingestions of blessed salts.',
    severity: 4
  },

  // ==========================================
  // CURSES
  // ==========================================
  {
    id: 'lycanthropy',
    name: 'Lycanthropy',
    type: 'Curse',
    transmission: 'Bite from an infected lycan during transformation',
    effect: 'The victim forcibly transforms into a bloodlust-driven hybrid beast during a full moon, losing control of their actions.',
    cure: 'A powerful curse-removal ritual performed by a high-ranking cleric before the first full moon.',
    severity: 5
  },
  {
    id: 'mummy_rot',
    name: 'Mummy Rot',
    type: 'Curse',
    transmission: 'Direct physical blow from a mummy',
    effect: 'The victim cannot heal naturally, and their body slowly desiccates, turning to dust over the course of several days.',
    cure: 'Simultaneous application of curse-removal and restorative magic by two experienced healers.',
    severity: 6
  },
  {
    id: 'vampiric_thirst',
    name: 'Vampiric Thirst',
    type: 'Curse',
    transmission: 'Being drained to near-death by a vampire lord',
    effect: 'An insatiable craving for blood that grows more powerful each night. The victim becomes photosensitive and increasingly predatory.',
    cure: 'Consuming the heart-blood of the vampire who inflicted the curse, or a divine intervention ritual.',
    severity: 6
  },
  {
    id: 'petrification',
    name: 'Slow Petrification',
    type: 'Curse',
    transmission: 'Eye contact with a basilisk or medusa',
    effect: 'The victim slowly turns to stone over the course of hours, starting from the extremities and creeping inward toward the heart.',
    cure: 'Application of basilisk blood to the affected areas before petrification reaches the torso.',
    severity: 6
  },
  {
    id: 'haunted_shadow',
    name: 'Haunted Shadow',
    type: 'Curse',
    transmission: 'Desecrating a grave or stealing from the dead',
    effect: 'The victim\'s shadow becomes a hostile entity that whispers dark truths, reveals their presence, and attacks them during sleep.',
    cure: 'Returning the stolen items and performing a sunrise atonement ritual at the violated gravesite.',
    severity: 3
  },
  {
    id: 'withering_touch',
    name: 'Withering Touch',
    type: 'Curse',
    transmission: 'Touching a cursed artifact without authorization',
    effect: 'Everything the victim touches with their bare hands wilts, rots, or corrodes over minutes. Food, plants, and fabric are destroyed on contact.',
    cure: 'The artifact must be returned to its resting place with a formal apology spoken in the original language.',
    severity: 4
  },
  {
    id: 'mirror_curse',
    name: 'Mirror Curse',
    type: 'Curse',
    transmission: 'Breaking a witch\'s enchanted mirror',
    effect: 'The victim\'s reflection becomes an independent, malicious entity that stalks them through every reflective surface, attempting to replace them.',
    cure: 'Trapping the reflection in a silver mirror and shattering it under moonlight.',
    severity: 4
  },
  {
    id: 'name_erasure',
    name: 'Name Erasure',
    type: 'Curse',
    transmission: 'Angering a powerful fey noble',
    effect: 'The victim\'s name is forgotten by everyone who knew them. Documents change, memories fade, and they become a stranger to their own family.',
    cure: 'Completing a task demanded by the fey noble who cast the curse, or stealing back your name from their collection.',
    severity: 5
  },
  {
    id: 'curse_of_clumsiness',
    name: 'Curse of Two Left Feet',
    type: 'Curse',
    transmission: 'Angering a minor fey',
    effect: 'The victim constantly trips, drops items, and fumbles their words in critical moments.',
    cure: 'Performing an embarrassing apologetic dance at a fairy ring.',
    severity: 1
  },
  {
    id: 'rust_touch',
    name: 'Rust Touch',
    type: 'Curse',
    transmission: 'Defiling a weapon-master\'s grave',
    effect: 'Any non-magical metal the victim touches instantly oxidizes and turns to brittle rust within seconds.',
    cure: 'Forging a perfect steel blade and leaving it at the defiled grave.',
    severity: 3
  },
  {
    id: 'curse_of_silence',
    name: 'Voice Thief\'s Mark',
    type: 'Curse',
    transmission: 'Stealing from a hag',
    effect: 'The victim opens their mouth to speak, but no sound emerges. Spells requiring verbal components fail.',
    cure: 'Recovering the stolen item and paying a debt of a whispered secret.',
    severity: 4
  },
  {
    id: 'endless_hunger',
    name: 'Curse of the Bottomless Maw',
    type: 'Curse',
    transmission: 'Gluttony at a cursed feast',
    effect: 'The victim feels starving no matter how much they eat, gradually wasting away despite constant consumption.',
    cure: 'Fasting for three days while chained inside a temple of temperance.',
    severity: 4
  },
  {
    id: 'coin_rot',
    name: 'Midas Rot',
    type: 'Curse',
    transmission: 'Stealing from a dragon\'s hoard',
    effect: 'Gold and silver coins physically wither into useless lead and ash when touched by the victim.',
    cure: 'Returning thrice the stolen amount to the dragon\'s hoard.',
    severity: 3
  },
  {
    id: 'curse_of_mirrors',
    name: 'Shattered Reflection',
    type: 'Curse',
    transmission: 'Breaking a seer\'s scrying glass',
    effect: 'Reflections show horrifying, distorted futures, afflicting the victim with deep paranoia when near glass or still water.',
    cure: 'Repairing the glass with tears of genuine remorse.',
    severity: 2
  },
  {
    id: 'blood_scent',
    name: 'Predator\'s Mark',
    type: 'Curse',
    transmission: 'Surviving a Huntmaster\'s challenge by cowardice',
    effect: 'The victim emits an odor undetectable to humanoids but maddeningly attractive to all nearby predators.',
    cure: 'Facing the Huntmaster in a fair fight, or slaying a mythical beast.',
    severity: 4
  },
  {
    id: 'night_terror',
    name: 'Curse of the Waking Nightmare',
    type: 'Curse',
    transmission: 'Reading a forbidden grimoire',
    effect: 'Sleep brings no rest, only exhaustion, as the victim is hunted through their dreams by shadowy figures.',
    cure: 'Burning the grimoire under a new moon with sage and bone dust.',
    severity: 4
  },
  {
    id: 'heavy_heart',
    name: 'Curse of Lead',
    type: 'Curse',
    transmission: 'Breaking a sacred vow of protection',
    effect: 'A magical, crushing weight rests on the victim\'s chest, halving their movement and preventing all jumping or swimming.',
    cure: 'Taking up a new, highly dangerous vow of protection and keeping it for a month.',
    severity: 3
  },
  {
    id: 'truth_binder',
    name: 'The Absolute Truth',
    type: 'Curse',
    transmission: 'Lying to a sphinx',
    effect: 'The victim is physically incapable of telling a lie, omitting facts, or utilizing sarcasm.',
    cure: 'Answering the sphinx\'s riddle truthfully without speaking.',
    severity: 2
  },

  // ==========================================
  // PARASITES
  // ==========================================
  {
    id: 'mind_flayer_tadpole',
    name: 'Mind Flayer Tadpole',
    type: 'Parasite',
    transmission: 'Inserted through the eye or ear by an illithid',
    effect: 'Slowly digests the host\'s brain over seven days, culminating in a horrific transformation into a new mind flayer.',
    cure: 'Extreme magical surgery or an extraordinarily powerful wish-level intervention.',
    severity: 6
  },
  {
    id: 'rot_grub',
    name: 'Rot Grub Infestation',
    type: 'Parasite',
    transmission: 'Contact with decaying organic matter containing grub eggs',
    effect: 'Tiny worms burrow into the flesh and begin eating the victim alive from the inside, causing excruciating pain and tissue necrosis.',
    cure: 'Applying intense heat to the entry wound to kill the grubs before they reach the heart.',
    severity: 5
  },
  {
    id: 'brain_worm',
    name: 'Thought-Eater Larva',
    type: 'Parasite',
    transmission: 'Consuming food contaminated by aberrant spores',
    effect: 'A psychic parasite that feeds on the victim\'s memories, slowly erasing their personality and knowledge over weeks.',
    cure: 'A psychic surgery performed by a highly trained mentalist or psionic healer.',
    severity: 5
  },
  {
    id: 'blood_tick',
    name: 'Abyssal Blood-Tick',
    type: 'Parasite',
    transmission: 'Wading through stagnant water in fiend-touched swamps',
    effect: 'A large, demonic tick attaches to the victim and drains blood continuously, causing progressive anemia and demonic nightmares.',
    cure: 'The tick must be carefully removed with blessed silver tweezers, then burned in holy fire.',
    severity: 4
  },
  {
    id: 'eye_worm',
    name: 'Beholder Eye-Worm',
    type: 'Parasite',
    transmission: 'Exposure to the dust of a dead beholder\'s eye-stalks',
    effect: 'A parasitic worm takes root behind the victim\'s eye, granting occasional flashes of magical sight but slowly destroying the optic nerve.',
    cure: 'Delicate extraction by a surgeon with magnifying lenses and steady hands, followed by restorative salves.',
    severity: 4
  },
  {
    id: 'spore_colonist',
    name: 'Fungal Colonization',
    type: 'Parasite',
    transmission: 'Inhaling spores in a myconid colony or underdark mushroom forest',
    effect: 'Fungal growths sprout from the victim\'s skin, feeding on their body and slowly converting their flesh into fungal matter.',
    cure: 'A powerful antifungal tonic brewed from volcanic sulfur and troll blood, taken daily for two weeks.',
    severity: 5
  },
  {
    id: 'blood_leech',
    name: 'Vampire Leech',
    type: 'Parasite',
    transmission: 'Wading in cursed rivers',
    effect: 'A fist-sized leech attaches to the spine, continuously draining vitality and causing severe lethargy.',
    cure: 'Application of fire directly to the leech, though it scars the host.',
    severity: 3
  },
  {
    id: 'bone_borer',
    name: 'Bone-Borer Beetle',
    type: 'Parasite',
    transmission: 'Sleeping on infested cavern floors',
    effect: 'A beetle burrows into the marrow, causing agonizing shooting pains that interrupt concentration.',
    cure: 'A skilled surgeon must drill into the bone and extract it, followed by healing magic.',
    severity: 4
  },
  {
    id: 'dream_weaver',
    name: 'Dream-Weaver Spider',
    type: 'Parasite',
    transmission: 'Inhaling egg-laden cobwebs',
    effect: 'A tiny spider lives in the nasal cavity, generating strange, highly vivid dreams while feeding on mucous membranes.',
    cure: 'Inhaling toxic smoke from burned nightshade leaves.',
    severity: 1
  },
  {
    id: 'flesh_wasp',
    name: 'Corpse Wasp Larvae',
    type: 'Parasite',
    transmission: 'Sting from an adult corpse wasp',
    effect: 'Larvae gestate beneath the skin, creating painful, writhing boils that eventually burst.',
    cure: 'Lancing the boils and applying a strong acidic paste before gestation completes.',
    severity: 3
  },
  {
    id: 'mind_mite',
    name: 'Cerebral Mite',
    type: 'Parasite',
    transmission: 'Direct contact with mind-flayer thralls',
    effect: 'Dulls the victim\'s intelligence and creates a mild susceptibility to psychic suggestions.',
    cure: 'A specialized psionic purge.',
    severity: 2
  },
  {
    id: 'shadow_worm',
    name: 'Shadow Worm',
    type: 'Parasite',
    transmission: 'Eating food in the Shadowfell',
    effect: 'A shadowy parasite wraps around the heart, dimming the victim\'s emotions and drawing them toward darkness.',
    cure: 'A massive influx of radiant energy applied directly to the chest.',
    severity: 4
  },
  {
    id: 'rust_mite',
    name: 'Rust Mite',
    type: 'Parasite',
    transmission: 'Wearing infested armor',
    effect: 'Microscopic mites that live in pores and secrete acid that rapidly rusts any metal armor the victim wears.',
    cure: 'Scrubbing the body with a mixture of lye and coarse sand.',
    severity: 2
  },
  {
    id: 'water_lung',
    name: 'Aboleth Slime-Parasite',
    type: 'Parasite',
    transmission: 'Swallowing aboleth-tainted water',
    effect: 'Transforms the victim\'s lungs, rendering them unable to breathe air and forcing them to remain submerged in water.',
    cure: 'High-level restorative magic before the transformation is complete.',
    severity: 6
  },
  {
    id: 'gold_bug',
    name: 'Coin-Eater Scarab',
    type: 'Parasite',
    transmission: 'Handling cursed treasure',
    effect: 'A magical scarab burrows into the hand. When the victim touches gold, the scarab consumes it and multiplies.',
    cure: 'Immersing the hand in molten lead, healed rapidly with magic.',
    severity: 2
  },
  {
    id: 'throat_tick',
    name: 'Mimic Tick',
    type: 'Parasite',
    transmission: 'Sleeping near shapechangers',
    effect: 'Attaches to the vocal cords, causing the victim\'s voice to randomly change into the voices of people they have heard.',
    cure: 'Gargling with a highly concentrated solution of vinegar and crushed garlic.',
    severity: 1
  },

  // ==========================================
  // POISONS
  // ==========================================
  {
    id: 'wyvern_venom',
    name: 'Wyvern Venom',
    type: 'Poison',
    transmission: 'Stinger puncture from a wyvern tail',
    effect: 'Instant and massive necrosis at the wound site, causing immense pain and rapid blood coagulation spreading from the puncture.',
    cure: 'Immediate administration of universal antitoxin or powerful restorative magic.',
    severity: 5
  },
  {
    id: 'purple_worm_venom',
    name: 'Purple Worm Venom',
    type: 'Poison',
    transmission: 'Stinger wound or ingestion of contaminated meat',
    effect: 'Catastrophic muscle failure and internal hemorrhaging within minutes of exposure.',
    cure: 'A massive dose of antivenin derived from the venom glands of the same species.',
    severity: 6
  },
  {
    id: 'drow_sleep_poison',
    name: 'Drow Sleep Poison',
    type: 'Poison',
    transmission: 'Crossbow bolt or blade coated in the substance',
    effect: 'Near-instant unconsciousness lasting several hours, leaving the victim completely helpless and unable to be roused.',
    cure: 'The poison metabolizes naturally. A stimulant tonic can reduce unconsciousness time.',
    severity: 3
  },
  {
    id: 'midnight_oil',
    name: 'Midnight Oil',
    type: 'Poison',
    transmission: 'Applied to food or drink by an assassin',
    effect: 'Causes no immediate symptoms but triggers a fatal cardiac arrest exactly at midnight, making murder appear natural.',
    cure: 'If detected in time, inducing vomiting followed by a charcoal-and-honey purgative.',
    severity: 6
  },
  {
    id: 'widow_tears',
    name: 'Widow\'s Tears',
    type: 'Poison',
    transmission: 'Distilled from rare cave spiders and added to wine',
    effect: 'Causes progressive organ failure over three days, mimicking a wasting disease to evade detection.',
    cure: 'A blood-cleaning ritual using purified water blessed at a Shrine of Healing.',
    severity: 5
  },
  {
    id: 'basilisk_bile',
    name: 'Basilisk Bile',
    type: 'Poison',
    transmission: 'Ingestion or contact with open wounds',
    effect: 'Partial petrification of the digestive system, causing extreme abdominal pain and inability to eat or drink.',
    cure: 'A counter-agent brewed from the liver of the same basilisk, combined with strong spirits.',
    severity: 4
  },
  {
    id: 'serpent_kiss',
    name: 'Serpent\'s Kiss',
    type: 'Poison',
    transmission: 'Applied to lips or utensils for contact poisoning',
    effect: 'Causes uncontrollable truth-telling and emotional vulnerability for the duration, used for interrogation by dark inquisitors.',
    cure: 'Strong alcohol consumption overwhelms the chemical compound within an hour.',
    severity: 2
  },
  {
    id: 'ghoul_ichor',
    name: 'Ghoul Ichor',
    type: 'Poison',
    transmission: 'Scratch or bite from a ghoul',
    effect: 'Total muscle paralysis spreading from the wound site. The victim remains fully conscious but cannot move or speak.',
    cure: 'Warmth and massage to restore circulation, combined with a stimulant herbal tea.',
    severity: 4
  },
  {
    id: 'crawling_death',
    name: 'Crawling Death',
    type: 'Poison',
    transmission: 'Assassin\'s blade',
    effect: 'A slow-acting venom that paralyzes the victim from the toes upward over the course of hours, ending in asphyxiation.',
    cure: 'A rare antivenom made from manticore venom glands.',
    severity: 5
  },
  {
    id: 'blind_man_bane',
    name: 'Blind Man\'s Bane',
    type: 'Poison',
    transmission: 'Powder blown into the eyes',
    effect: 'Causes immediate, excruciating blindness. The eyes turn completely black.',
    cure: 'Rinsing the eyes with the tears of a unicorn or a highly pure healing potion.',
    severity: 4
  },
  {
    id: 'fool_s_courage',
    name: 'Fool\'s Courage',
    type: 'Poison',
    transmission: 'Spiked ale or wine',
    effect: 'Induces severe euphoria and removes all sense of fear or self-preservation, leading the victim to take suicidal risks.',
    cure: 'Inducing vomiting and applying extreme physical pain to shock the system.',
    severity: 3
  },
  {
    id: 'bone_chiller',
    name: 'Bone-Chiller Extract',
    type: 'Poison',
    transmission: 'Contact with the skin',
    effect: 'The victim feels as though they are freezing to death regardless of ambient temperature, shivering uncontrollably.',
    cure: 'Drinking a potion infused with liquid fire or magma rock.',
    severity: 3
  },
  {
    id: 'black_lotus',
    name: 'Black Lotus Extract',
    type: 'Poison',
    transmission: 'Inhaling fumes',
    effect: 'Immediate deep coma from which the victim cannot be awakened by normal means, leading to slow dehydration and death.',
    cure: 'A strong stimulant brewed from dragon-pepper and smelling salts.',
    severity: 6
  },
  {
    id: 'truth_serum',
    name: 'Veritas Tincture',
    type: 'Poison',
    transmission: 'Ingestion via tea or water',
    effect: 'Strips away the victim\'s ability to form lies, causing them to vocally narrate their innermost thoughts.',
    cure: 'The effects wear off after 12 hours of total silence.',
    severity: 2
  },
  {
    id: 'witch_bane',
    name: 'Magebane Poison',
    type: 'Poison',
    transmission: 'Weapon coating',
    effect: 'Severely damages the victim\'s magical pathways. Any attempt to cast a spell causes intense physical pain and risks failure.',
    cure: 'A cleansing ritual using pure, uncorrupted ley-line energy.',
    severity: 4
  },
  {
    id: 'stone_blood',
    name: 'Gorgon\'s Spit',
    type: 'Poison',
    transmission: 'Arrow coating',
    effect: 'Injured limbs rapidly stiffen and calcify, rendering them completely useless until treated.',
    cure: 'A salve of crushed cockatrice feathers applied to the wound.',
    severity: 4
  },
  {
    id: 'dream_reaper',
    name: 'Dream Reaper Venom',
    type: 'Poison',
    transmission: 'Injection via needle',
    effect: 'The victim falls asleep and suffers uniquely tailored nightmares so terrifying they can cause a heart attack.',
    cure: 'Entering the dream via magic and slaying the nightmare entity.',
    severity: 5
  },

  // ==========================================
  // MADNESS
  // ==========================================
  {
    id: 'abyss_gaze',
    name: 'Abyssal Gaze',
    type: 'Madness',
    transmission: 'Staring into the Abyss or direct contact with raw demonic energy',
    effect: 'The victim sees horrifying visions of the abyss overlaid on reality, unable to distinguish between the real world and the void.',
    cure: 'Prolonged therapy with a mind-healer in a consecrated sanctuary, lasting at least one month.',
    severity: 5
  },
  {
    id: 'eldritch_whispers',
    name: 'Eldritch Whispers',
    type: 'Madness',
    transmission: 'Reading forbidden texts or deciphering alien glyphs',
    effect: 'Constant auditory hallucinations of whispered alien languages that grow louder when the victim tries to sleep or concentrate.',
    cure: 'The knowledge must be formally renounced and the victim must destroy the source material.',
    severity: 4
  },
  {
    id: 'paranoid_delusion',
    name: 'Paranoid Delusion',
    type: 'Madness',
    transmission: 'Betrayal by a trusted companion or prolonged isolation',
    effect: 'The victim becomes convinced that everyone, including close allies, is secretly plotting against them.',
    cure: 'Rebuilding trust through consistent, verifiable acts of loyalty over several weeks.',
    severity: 3
  },
  {
    id: 'berserker_rage',
    name: 'Berserker Rage',
    type: 'Madness',
    transmission: 'Extreme trauma in combat or witnessing mass death',
    effect: 'Uncontrollable violent outbursts triggered by stress, loud noises, or the sight of blood. The victim cannot distinguish friend from foe.',
    cure: 'Intensive meditation training under a martial arts master, lasting several months.',
    severity: 4
  },
  {
    id: 'memory_fracture',
    name: 'Memory Fracture',
    type: 'Madness',
    transmission: 'Psychic attack or exposure to powerful temporal magic',
    effect: 'The victim\'s memories become scrambled: they confuse past and present, forget names, and occasionally relive traumatic moments as if they are happening now.',
    cure: 'A skilled mind-healer must painstakingly reconstruct the shattered memories over many sessions.',
    severity: 4
  },
  {
    id: 'compulsive_hoarding',
    name: 'Dragon-Sickness',
    type: 'Madness',
    transmission: 'Prolonged exposure to a dragon\'s hoard or extreme greed',
    effect: 'An obsessive compulsion to acquire and hoard wealth, becoming increasingly violent when anyone threatens their possessions.',
    cure: 'Voluntarily giving away a significant portion of one\'s wealth in a public act of generosity.',
    severity: 3
  },
  {
    id: 'void_stare',
    name: 'Astral Catatonia',
    type: 'Madness',
    transmission: 'Looking into a rift in reality',
    effect: 'The victim enters a fugue state, staring blankly and speaking only to describe the vast emptiness of the void.',
    cure: 'A violent physical shock returning them to their body.',
    severity: 4
  },
  {
    id: 'echo_madness',
    name: 'The Echo Crazes',
    type: 'Madness',
    transmission: 'Trapped in magically silenced areas',
    effect: 'The victim compulsively repeats the last word spoken by themselves or others, unable to formulate original sentences.',
    cure: 'Immersion in a wildly noisy, chaotic environment like a battlefield or bustling market for a day.',
    severity: 2
  },
  {
    id: 'pyromania_curse',
    name: 'Flame\'s Seduction',
    type: 'Madness',
    transmission: 'Prolonged exposure to elemental fire planes',
    effect: 'An obsessive fascination with fire. The victim feels cold unless they are near a blaze and compulsively sets things alight.',
    cure: 'Prolonged immersion in freezing water while under the care of a healer.',
    severity: 3
  },
  {
    id: 'imposter_syndrome',
    name: 'Changeling Delusion',
    type: 'Madness',
    transmission: 'Surviving an encounter with doppelgangers',
    effect: 'The victim believes they have been replaced by a shapechanger, constantly testing themselves and trying to cut out the fake parts.',
    cure: 'Extensive psychological therapy and magical reassurance of identity.',
    severity: 4
  },
  {
    id: 'phantom_itch',
    name: 'The Crawling Skitter',
    type: 'Madness',
    transmission: 'Surviving a rot grub or swarm attack',
    effect: 'The victim feels thousands of non-existent bugs crawling under their skin, scratching themselves raw.',
    cure: 'A modified calm emotions spell sustained over several days of rest.',
    severity: 3
  },
  {
    id: 'kleptomania_curse',
    name: 'Magpie\'s Greed',
    type: 'Madness',
    transmission: 'Handling cursed thieve\'s tools',
    effect: 'An uncontrollable urge to steal shiny or valuable objects, regardless of risk or consequence.',
    cure: 'Returning all stolen items and publicly confessing the crimes.',
    severity: 2
  },
  {
    id: 'blood_phobia',
    name: 'Hematophobia',
    type: 'Madness',
    transmission: 'Witnessing a gruesome, magical massacre',
    effect: 'The sight of blood causes the victim to panic, scream, and attempt to flee at all costs.',
    cure: 'Desensitization therapy or a memory-modifying spell.',
    severity: 3
  },
  {
    id: 'light_fear',
    name: 'Photophobia',
    type: 'Madness',
    transmission: 'Extended imprisonment in magical darkness',
    effect: 'Bright light causes physical pain and intense terror. The victim seeks out dark corners and covers their eyes constantly.',
    cure: 'Gradual reintroduction to light over several weeks in a controlled environment.',
    severity: 3
  },
  {
    id: 'hero_delusion',
    name: 'The Martyr\'s Complex',
    type: 'Madness',
    transmission: 'Reading cursed tales of valor',
    effect: 'The victim believes they are destined for a glorious, heroic death and intentionally seeks out unwinnable battles.',
    cure: 'Experiencing a truly humbling, overwhelming defeat without dying.',
    severity: 4
  },
  {
    id: 'number_obsession',
    name: 'Arithmomania',
    type: 'Madness',
    transmission: 'Deciphering a mad archmage\'s notes',
    effect: 'The victim must count everything they see—stairs, words, coins—and cannot act until they have finished counting the area.',
    cure: 'Destroying the notes and undergoing a powerful mind-cleansing ritual.',
    severity: 2
  },

  // ==========================================
  // CORRUPTIONS
  // ==========================================
  {
    id: 'shadow_taint',
    name: 'Shadow Taint',
    type: 'Corruption',
    transmission: 'Extended exposure to the Shadowfell or shadow magic',
    effect: 'The victim becomes emotionally numb, seeing the world in muted, grey tones. Joy and empathy gradually fade entirely.',
    cure: 'Prolonged exposure to intense natural sunlight and genuine emotional connections over several weeks.',
    severity: 3
  },
  {
    id: 'demonic_mark',
    name: 'Demonic Mark',
    type: 'Corruption',
    transmission: 'Making a bargain with a fiend, even unknowingly',
    effect: 'A blackened brand appears on the victim\'s skin that marks them as property of a specific demon lord. Fiends recognize and approach them.',
    cure: 'Fulfilling or formally breaking the contract, which requires finding the original demon and negotiating.',
    severity: 4
  },
  {
    id: 'void_hunger',
    name: 'Void Hunger',
    type: 'Corruption',
    transmission: 'Contact with raw void-energy or eldritch artifacts',
    effect: 'An insatiable, gnawing emptiness that no amount of food, drink, or experience can fill. The victim becomes obsessed with consuming more.',
    cure: 'The artifact must be destroyed, and the victim must fast for seven days while reciting banishing mantras.',
    severity: 5
  },
  {
    id: 'blood_frenzy',
    name: 'Blood Frenzy',
    type: 'Corruption',
    transmission: 'Drinking the blood of a powerful undead creature',
    effect: 'The victim gains temporary power but develops a worsening addiction to consuming blood, requiring increasingly larger quantities.',
    cure: 'Complete abstinence from blood for one full lunar cycle, during which withdrawal symptoms are severe.',
    severity: 4
  },
  {
    id: 'fey_enthrall',
    name: 'Fey Enthrallment',
    type: 'Corruption',
    transmission: 'Accepting food or drink from a powerful fey creature',
    effect: 'The victim becomes emotionally bonded to the Feywild, finding the mortal world unbearably dull and constantly yearning to return.',
    cure: 'A counter-enchantment performed during the exact conditions under which the original food was consumed.',
    severity: 3
  },
  {
    id: 'necromantic_decay',
    name: 'Necromantic Decay',
    type: 'Corruption',
    transmission: 'Prolonged use of necromantic magic without proper protection',
    effect: 'The caster\'s own body begins to decay while still alive: skin greys, flesh thins, and they emit a faint smell of death.',
    cure: 'Ceasing all necromantic practice and undergoing a lengthy purification ritual involving holy oils and sacred chanting.',
    severity: 4
  },
  {
    id: 'flesh_rot',
    name: 'Decaying Touch',
    type: 'Corruption',
    transmission: 'Wielding an evil artifact',
    effect: 'The victim\'s fingertips permanently blacken and rot, smelling faintly of a corpse. Plants die when touched.',
    cure: 'Destroying the artifact and undergoing a divine purification.',
    severity: 3
  },
  {
    id: 'shadow_eyes',
    name: 'Onyx Iris',
    type: 'Corruption',
    transmission: 'Making ocular pacts with dark entities',
    effect: 'The victim\'s eyes turn completely black. They gain nightsight but are blinded by standard daylight.',
    cure: 'Breaking the pact and flushing the eyes with holy water.',
    severity: 3
  },
  {
    id: 'horn_growth',
    name: 'Fiend\'s Spikes',
    type: 'Corruption',
    transmission: 'Prolonged exposure to demonic realms',
    effect: 'Small, jagged horns begin growing from the victim\'s forehead, marking them visibly as tainted.',
    cure: 'Filing the horns down and remaining in consecrated ground for a year.',
    severity: 2
  },
  {
    id: 'venom_blood',
    name: 'Acidic Veins',
    type: 'Corruption',
    transmission: 'Drinking green dragon blood',
    effect: 'The victim\'s blood becomes highly acidic. Bleeding damages armor and weapons, but causes intense internal burning.',
    cure: 'A dangerous complete blood-filtering process using alchemical leeches.',
    severity: 4
  },
  {
    id: 'whispering_shadow',
    name: 'Living Silhouette',
    type: 'Corruption',
    transmission: 'Dark magic rituals',
    effect: 'The victim\'s shadow occasionally moves independently and whispers dark, intrusive thoughts to those nearby.',
    cure: 'A ritual of binding using mirrors and intense radiant light.',
    severity: 2
  },
  {
    id: 'bone_spur',
    name: 'Osteo-Mutation',
    type: 'Corruption',
    transmission: 'Consuming mutagenic troll flesh',
    effect: 'Painful bone spurs constantly grow through the skin, healing and regrowing in a cycle of agony.',
    cure: 'A potion of profound stabilization brewed from ancient tree sap.',
    severity: 4
  },
  {
    id: 'cold_heart',
    name: 'Frost-Touched Core',
    type: 'Corruption',
    transmission: 'Kiss of an ice elemental',
    effect: 'The victim\'s body temperature drops drastically. Their skin feels like ice, and they cannot feel warmth or affection.',
    cure: 'Bathing in the waters of a hot spring blessed by a sun deity.',
    severity: 3
  },
  {
    id: 'silver_allergy',
    name: 'Tainted Bloodline',
    type: 'Corruption',
    transmission: 'Surviving a lycanthrope bite but resisting the curse',
    effect: 'The victim does not transform, but touching silver burns their skin severely like acid.',
    cure: 'There is no known cure, only management and avoidance of the metal.',
    severity: 2
  },
  {
    id: 'soul_leak',
    name: 'Ethereal Bleed',
    type: 'Corruption',
    transmission: 'A botched resurrection spell',
    effect: 'The victim\'s soul is not fully attached to their body, causing them to occasionally flicker out of existence for a few seconds.',
    cure: 'A highly complex anchor-ritual performed by a master abjurer.',
    severity: 5
  },
];
