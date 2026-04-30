import type { VariantDef } from './types';

export type EnchantmentTarget = 'Weapon' | 'Armor' | 'Accessory' | 'Shield';
export type EnchantmentRarity = 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic';

/**
 * A magical modification that can be applied to weapons or armor,
 * granting additional elemental damage, defensive auras, or passive
 * effects. Enchantments have a rarity tier and a gold cost.
 */
export interface Enchantment {
  id: string;
  name: string;
  target: EnchantmentTarget;
  rarity: EnchantmentRarity;
  effect: string;
  baseCost: number;
  statBonus: { stat: string; value: number };
  variants: VariantDef[];
}

/** Master list of all available enchantments, organized by slot type. */
export const ENCHANTMENTS: Enchantment[] = [
  // ==========================================
  // WEAPON ENCHANTMENTS
  // ==========================================
  {
    id: 'flaming',
    name: 'Flaming',
    target: 'Weapon',
    rarity: 'Uncommon',
    baseCost: 200,
    statBonus: { stat: 'fire_damage', value: 6 },
    effect: 'Ignites on command, dealing additional fire damage on a successful hit and providing bright light.',
    variants: [
      { name: 'Ember Edge', desc: 'The blade glows dull orange and radiates heat. Nearby parchment curls and candles flicker when it is drawn.' },
      { name: 'Inferno Burst', desc: 'Erupts into a sheath of roaring flame on impact. The fire dissipates between swings, reigniting on each strike.' },
      { name: 'Smoldering Brand', desc: 'Leaves a faint trail of embers in the air when swung. Wounds cauterize instantly, preventing bleeding.' },
      { name: 'Hellfire Kiss', desc: 'Burns with an eerie blue-black flame that is unnervingly cold to the touch but scorches flesh on contact.' },
      { name: 'Pyre-Forged', desc: 'The weapon was tempered in a massive execution pyre. It never fully extinguishes, even submerged in water.' },
      { name: 'Plague-Fire Ring', desc: 'The flames burn a sickly green and leave the heavy, choking scent of burning corpses in the air.' },
      { name: 'Cursed Immolation', desc: 'Cannot be extinguished manually; stopping the flame requires drawing fresh, living blood.' },
      { name: 'Ash-Bringer\'s Mark', desc: 'Leaves a thick, choking cloud of soot in its wake instead of clean, breathable smoke.' },
      { name: 'Inquisitor\'s Pyre', desc: 'Burns bright only against those declared heretics by the wielder. The innocent feel nothing.' },
      { name: 'Grave-Brazier', desc: 'A solemn, flickering flame that offers no heat, only necrotic blistering on contact.' },
      { name: 'Fiend\'s Tongue', desc: 'The flames lick up the wielder\'s arm without harming them. Others are not so lucky.' },
      { name: 'Blood-Boil Rune', desc: 'Produces no outer flame. Instead, the target\'s blood boils inside their veins.' },
      { name: 'Smuggler\'s Coal', desc: 'Glows dimly to avoid detection, but flares on striking flesh. A dockside assassin\'s tool.' },
      { name: 'Martyr\'s Flame', desc: 'Feeds off the wielder\'s own pain. Burns hotter the more wounded they become.' },
      { name: 'Crematorium Spark', desc: 'A white-hot flash that chars anything it grazes. The smell lingers for days.' }
    ]
  },
  {
    id: 'frost_bite',
    name: 'Frost Bite',
    target: 'Weapon',
    rarity: 'Uncommon',
    baseCost: 200,
    statBonus: { stat: 'frost_damage', value: 6 },
    effect: 'Coats the blade in supernatural frost, dealing cold damage and reducing the target\'s movement speed for one round.',
    variants: [
      { name: 'Winter\'s Edge', desc: 'A thin layer of rime forms along the cutting edge. The wielder\'s breath mists even in summer.' },
      { name: 'Glacier Shard', desc: 'The blade crackles with deep blue frost. Struck surfaces develop spreading patterns of ice crystals.' },
      { name: 'Howling Chill', desc: 'Produces a keening wind-sound when swung. Targets feel the cold of a blizzard seep into their bones.' },
      { name: 'Black Ice', desc: 'Coated in transparent, glass-like ice that never melts. The edge is supernaturally sharp.' },
      { name: 'Permafrost Seal', desc: 'Wounds freeze shut on contact, trapping the cold inside the victim\'s body. Fatal within minutes.' },
      { name: 'Corpse-Chill', desc: 'Inflicts rigor-mortis-like stiffness instead of surface ice. Joints lock, muscles seize.' },
      { name: 'Void-Rime', desc: 'A dark frost that seems to swallow nearby shadows. Torchlight dims in its presence.' },
      { name: 'Grave-Digger\'s Bite', desc: 'The air grows heavy and damp, like standing in an open autumn grave. Breath crystallizes.' },
      { name: 'Banshee\'s Breath', desc: 'Screams when swung, freezing the moisture in the victim\'s lungs. Death comes silently after.' },
      { name: 'Shackled Frost', desc: 'Ice binds the victim\'s joints, fracturing when they attempt to flee. Movement means agony.' },
      { name: 'Wendigo\'s Touch', desc: 'Instills a freezing, ravenous hunger in whoever suffers the strike. They gnaw their own fists.' },
      { name: 'Blood-Ice Rune', desc: 'The frost it creates is stained permanent crimson. The ice looks like frozen blood.' },
      { name: 'Executioner\'s Chill', desc: 'Numbs the victim\'s neck before the final blow. A headsman\'s mercy, in its way.' },
      { name: 'Glacial Tomb', desc: 'Ice spreads over open wounds, preserving the dying victim in crystal. A cruel memorial.' },
      { name: 'Sinner\'s Shiver', desc: 'The cold cannot be offset by fire or warm cloaks. It lives inside the bones.' }
    ]
  },
  {
    id: 'vampiric_drain',
    name: 'Vampiric Drain',
    target: 'Weapon',
    rarity: 'Legendary',
    baseCost: 5000,
    statBonus: { stat: 'lifesteal', value: 5 },
    effect: 'On a critical hit, the wielder recovers vitality equal to half the necrotic damage dealt.',
    variants: [
      { name: 'Soul-Drinker', desc: 'The blade pulses with a sickly red glow after feeding. The wielder feels a euphoric rush of stolen vitality.' },
      { name: 'Marrow Leech', desc: 'Drains life force through the wound channel. Victims feel hollow and exhausted for days.' },
      { name: 'Blood-Tide', desc: 'Crimson lines trace up the blade toward the hilt after striking. The metal seems to drink.' },
      { name: 'Essence Siphon', desc: 'Drains raw life essence rather than blood. The victim\'s skin turns ashen grey within seconds.' },
      { name: 'Thirst Eternal', desc: 'The weapon hums near the wounded. If not fed, the wielder begins to feel its hunger as their own.' },
      { name: 'Corpse-Feeder', desc: 'Rips chunks of vitality that leave a metallic, rusty taste in the wielder\'s mouth.' },
      { name: 'Flayed-Man\'s Thirst', desc: 'The weapon warps on impact, growing tiny hooks to capture blood. It reshapes between kills.' },
      { name: 'Grave-Rot Siphon', desc: 'Pulls years from an enemy\'s lifespan, leaving them wrinkled and frail in seconds.' },
      { name: 'Blood-Bargain', desc: 'Requires a drop of the owner\'s blood to awaken before it begins stealing from others.' },
      { name: 'Ghoul\'s Banquet', desc: 'Causes the wielder\'s teeth to ache with a sympathetic hunger. The craving never fully fades.' },
      { name: 'Widow\'s Weep', desc: 'Drains the enemy while causing them to collapse in sudden, crushing despair.' },
      { name: 'Red-Rune Glutton', desc: 'The etched runes stain a darker shade of black with every kill. Eventually, they stop glowing.' },
      { name: 'Leech-Bite', desc: 'Leaves circular, bruised bite patterns around the laceration. No natural wound looks like this.' },
      { name: 'Bone-Marrow Thief', desc: 'Victims feel a paralyzing ache deep within their skeleton. The pain precedes the weakness.' },
      { name: 'Butcher\'s Tithe', desc: 'Only drains vitality if the strike is intended to be fatal. Mercy blows yield nothing.' }
    ]
  },
  {
    id: 'thunderstrike',
    name: 'Thunderstrike',
    target: 'Weapon',
    rarity: 'Rare',
    baseCost: 800,
    statBonus: { stat: 'lightning_damage', value: 10 },
    effect: 'On a hit, produces a thunderclap dealing thunder damage. Targets must pass a fortitude check or be deafened for one round.',
    variants: [
      { name: 'Storm-Crack', desc: 'Every hit sounds like a bolt of lightning striking stone. Windows rattle and eardrums ring for hours.' },
      { name: 'Rolling Thunder', desc: 'The thunder builds over consecutive strikes, growing louder with each hit until the sound is deafening.' },
      { name: 'Sky-Splitter', desc: 'A vertical arc of pale lightning connects the weapon to the clouds during outdoor combat.' },
      { name: 'Concussive Blow', desc: 'The thunder is felt rather than heard. A chest-compressing shockwave that scrambles coordination.' },
      { name: 'Tempest Rune', desc: 'A glowing rune on the pommel channels storm-energy. The wielder\'s hair stands on end.' },
      { name: 'Executioner\'s Gavel', desc: 'The thundering crack sounds like a neck snapping. Crowds flinch at the execution ground.' },
      { name: 'Grave-Quake', desc: 'The vibrations are tuned to shatter brittle undead bones. Skeletons collapse on impact.' },
      { name: 'Inquisitor\'s Roar', desc: 'A deafening boom intended to shatter the spirit and eardrums of the tortured.' },
      { name: 'Crushing Dissonance', desc: 'Instead of thunder, it emits a multi-layered scream of human agony. Source unknown.' },
      { name: 'Siege-Breaker', desc: 'Bypasses flesh, causing the victim\'s armor to vibrate and buckle. Plate-wearers dread it.' },
      { name: 'Blood-Drums', desc: 'A rhythmic pounding that matches the wielder\'s racing heartbeat. Faster heart, louder thunder.' },
      { name: 'Sunder-Stone', desc: 'Produces a shockwave severe enough to shatter nearby glass and cheap crockery.' },
      { name: 'Madman\'s Cacophony', desc: 'Leaves the victim hearing incoherent, maddening whispers instead of ringing. Lasts for hours.' },
      { name: 'Doom-Bell', desc: 'Chimes with the heavy, somber toll of a cathedral mourning bell. Morale crumbles.' },
      { name: 'Bone-Shatter Echo', desc: 'The initial crack is followed by the sickening sound of internal fractures. Healers wince.' }
    ]
  },
  {
    id: 'keen_edge',
    name: 'Keen Edge',
    target: 'Weapon',
    rarity: 'Common',
    baseCost: 100,
    statBonus: { stat: 'critical_chance', value: 3 },
    effect: 'The weapon\'s critical hit range is expanded by 1. The edge never dulls.',
    variants: [
      { name: 'Razor-Honed', desc: 'The edge is magically maintained at a razor\'s width. It parts hide and bone without resistance.' },
      { name: 'Whisper-Cut', desc: 'Strikes are so clean they make no sound on impact. Victims often do not realize they were cut.' },
      { name: 'Ever-Sharp', desc: 'Prevents the blade from losing its edge, even when hacking stone. A simple but valued enchantment.' },
      { name: 'Silk-Splitter', desc: 'Named for slicing a silk scarf mid-air. An assassin\'s showpiece enchantment.' },
      { name: 'Thumbing', desc: 'The blade hums near hostile creatures and aligns to exploit their weaknesses. Subtle and lethal.' },
      { name: 'Flayer\'s Edge', desc: 'Parts skin so smoothly the victim might not notice until they try to walk. Then they collapse.' },
      { name: 'Plague-Scalpel', desc: 'The edge is maintained by a thin layer of corrosive, flesh-eating acid. Invisible to the eye.' },
      { name: 'Executioner\'s Mercy', desc: 'Guaranteed never to catch on vertebrae during a decapitating swing. A headsman\'s premium tool.' },
      { name: 'Blood-Honed', desc: 'The blade sharpens itself when exposed to arterial spray. Grows keener mid-battle.' },
      { name: 'Grave-Steel Edge', desc: 'So thin it sometimes passes through cheap wood like a ghost. Unsettling to witness.' },
      { name: 'Spine-Splitter', desc: 'Engineered to wedge between interlocking bones. Armor joints are its preferred entry point.' },
      { name: 'Witch-Cut', desc: 'Leaves wounds that refuse to be sewn shut by mundane thread. Magical healing is required.' },
      { name: 'Butcher\'s Pride', desc: 'Can cleave a cow femur without notching the steel. Butchers and warriors both covet it.' },
      { name: 'Silenced Death', desc: 'Slices the air with no sound. Victims bleed out in total silence. Guards hear nothing.' },
      { name: 'Tormentor\'s Needle', desc: 'An edge designed for maximum pain with minimal damage. The inquisitor\'s favorite tool.' }
    ]
  },

  // ==========================================
  // ARMOR ENCHANTMENTS
  // ==========================================
  {
    id: 'mithral_weave',
    name: 'Mithral Weave',
    target: 'Armor',
    rarity: 'Rare',
    baseCost: 1000,
    statBonus: { stat: 'weight_reduction', value: 30 },
    effect: 'Reduces the weight of the armor by half and removes any penalties to Stealth checks.',
    variants: [
      { name: 'Feather-Light', desc: 'The armor weighs almost nothing. Wearers forget they have it on, allowing unnatural mobility.' },
      { name: 'Shadow-Woven', desc: 'The mithral threads absorb ambient light, making the armor appear as a void rather than metal.' },
      { name: 'Silent Mail', desc: 'Chain links coated in mithral dust that dampens all metallic sound. Perfect for skulking.' },
      { name: 'Breath-Easy', desc: 'The weave allows airflow as if wearing linen. Heat exhaustion becomes impossible.' },
      { name: 'Fold-Flat', desc: 'The armor can be collapsed and folded into a small package for smuggling. Unfolds in seconds.' },
      { name: 'Ghost-Chain', desc: 'The links are slightly translucent, giving the wearer a spectral appearance in moonlight.' },
      { name: 'Assassin\'s Silence', desc: 'Every ring is padded with woven spider-silk to enforce absolute quiet. Standard for killers.' },
      { name: 'Grave-Robber\'s Mesh', desc: 'Easily mistaken for a filthy burial shroud, hiding the lethal armor beneath rags.' },
      { name: 'Hangman\'s Silver', desc: 'Forged from melted silver coins taken from the pockets of the executed. Cold comfort.' },
      { name: 'Blood-Mithral', desc: 'The silver metal is stained dark from years of close-quarters combat. Never cleaned.' },
      { name: 'Void-Weave', desc: 'Absorbs all ambient light, appearing as a lack-of-space rather than armor. Unsettling.' },
      { name: 'Corpse-Light Mail', desc: 'Weightless, though it feels clammy and unpleasant against living skin. The dead wore it first.' },
      { name: 'Smuggler\'s Under-Mail', desc: 'Thin enough to be invisible beneath a wool coat. Only discovered by pat-down or blade.' },
      { name: 'Shadow-Forged', desc: 'Black smoke cascades off the shoulders when the wearer stands still in darkness.' },
      { name: 'Dead-Man\'s Burden', desc: 'Weighs nothing, but fills the wearer\'s mind with a heavy, lingering sense of melancholy.' }
    ]
  },
  {
    id: 'fortified',
    name: 'Fortified',
    target: 'Armor',
    rarity: 'Uncommon',
    baseCost: 150,
    statBonus: { stat: 'defense', value: 3 },
    effect: 'Grants a minor bonus to defense rating and bolsters resistance against being knocked prone.',
    variants: [
      { name: 'Ironbark Lining', desc: 'Reinforced with layers of ironwood bark beneath the plating. Absorbs crushing impact like stone.' },
      { name: 'Rune-Braced', desc: 'Dwarven stabilization runes etched into the joints. The armor resists being crushed or deformed.' },
      { name: 'Stone-Hearted', desc: 'Infused with granite essence. The wearer feels rooted and immovable, like a living battlement.' },
      { name: 'Siege-Proof', desc: 'Designed to withstand siege weaponry. The cuirass has been tested against a ballista bolt and held.' },
      { name: 'Bear\'s Embrace', desc: 'The armor tightens around the wearer during impacts, distributing force across the entire frame.' },
      { name: 'Petrified-Bog Padding', desc: 'Infused with hardened swamp mud that turns sharp strikes aside. Smells of peat.' },
      { name: 'Ogre-Bone Braced', desc: 'The ribs of a cavern-dwelling ogre are woven into the inner lining. Dense and resilient.' },
      { name: 'Executioner\'s Stance', desc: 'Makes the wearer immovable, as if rooted to the chopping block. Ideal for holding ground.' },
      { name: 'Iron-Maiden Shell', desc: 'The outer plating is angled to trap incoming blades rather than deflect them. Disarms attackers.' },
      { name: 'Grave-Warden\'s Block', desc: 'The armor feels heavier at the exact moment a staggering blow connects. Prevents knockdown.' },
      { name: 'Blood-Plated', desc: 'Dried gore has created a dense secondary layer of armor. Gruesome but functional.' },
      { name: 'Golem-Touched', desc: 'The wearer\'s skin hardens to stone at the point of impact. The transformation is brief and localized.' },
      { name: 'Martyr\'s Resolve', desc: 'The armor tightens during a heavy strike, forcing the bleeding wearer to stay upright.' },
      { name: 'Shield-Wall Bark', desc: 'Inscribed with the overlapping oaths of an annihilated infantry line. Their will persists.' },
      { name: 'Juggernaut\'s Stride', desc: 'Bending the knee requires immense will. Falling down or surrendering becomes near impossible.' }
    ]
  },
  {
    id: 'warding',
    name: 'Warding',
    target: 'Armor',
    rarity: 'Legendary',
    baseCost: 5000,
    statBonus: { stat: 'magic_resistance', value: 15 },
    effect: 'Grants resistance to one damage type chosen during attunement. The type can be changed during a long rest.',
    variants: [
      { name: 'Elemental Shell', desc: 'Runes glow in the color of the chosen element. Fire tints them red; cold turns them corpse-pale blue.' },
      { name: 'Absorbing Plate', desc: 'The chosen damage type is absorbed by the armor itself, which heats, frosts, or crackles accordingly.' },
      { name: 'Prismatic Guard', desc: 'A faint iridescent shimmer coats the surface, shifting color as the attuned resistance type changes.' },
      { name: 'Soul-Ward', desc: 'The resistance is tied to willpower. It weakens when afraid and strengthens when resolute.' },
      { name: 'Ancient Glyph', desc: 'A single massive glyph covers the chestpiece. It was carved by a long-dead archmage of legendary power.' },
      { name: 'Blood-Rune Ward', desc: 'Requires the wearer to slice their palm to activate, but provides formidable magical defense.' },
      { name: 'Plague-Eater\'s Shell', desc: 'Absorbs poisons and diseases, turning the metal a sickly yellow. Plague doctors covet it.' },
      { name: 'Ash-Woven Guard', desc: 'Fire resistance manifests as a layer of fire-retardant corpse-ash coating the plates.' },
      { name: 'Corpse-Chill Deflection', desc: 'Ice magic is absorbed, causing the wearer\'s breath to frost even indoors. Permanent side effect.' },
      { name: 'Sinner\'s Shielding', desc: 'The ward absorbs radiant strikes without heating up. Useful for those who anger the divine.' },
      { name: 'Cultist\'s Rebuttal', desc: 'Acid washes off the armor like rain, though it destroys the fabric tabard in the process.' },
      { name: 'Bone-Ward', desc: 'Necrotic energy is absorbed into the joints, creating a glowing white outline. Visible at night.' },
      { name: 'Hangman\'s Vigor', desc: 'A magical barrier focused on protecting the wearer\'s neck and throat. Popular with kings.' },
      { name: 'Ghost-Armor', desc: 'Incoming magical bolts pass through the wearer as if they were a phantom. Disconcerting to witness.' },
      { name: 'Witch-Hunter\'s Bastion', desc: 'Emits a low hum when absorbing magic, smelling of burning pyre-wood. Mages feel its presence.' }
    ]
  },

  // ==========================================
  // SHIELD ENCHANTMENTS
  // ==========================================
  {
    id: 'reflecting',
    name: 'Reflecting',
    target: 'Shield',
    rarity: 'Rare',
    baseCost: 1200,
    statBonus: { stat: 'spell_reflect', value: 10 },
    effect: 'Once per day, the shield can reflect a single-target spell back at its caster.',
    variants: [
      { name: 'Mirror-Polished', desc: 'The shield surface is a flawless mirror. Spells bounce off with a blinding flash of light.' },
      { name: 'Rune-Ricochet', desc: 'Carved runes redirect incoming arcane energy along a calculated trajectory back toward its origin.' },
      { name: 'Spell-Eater', desc: 'The shield absorbs the spell before ejecting it. The delay is barely a heartbeat.' },
      { name: 'Ward-Bounce', desc: 'A translucent barrier flares in front of the shield, catching the spell and reversing its vector.' },
      { name: 'Arcanist\'s Bane', desc: 'The reflected spell gains force from the shield\'s enchantment, arriving at the caster more potent.' },
      { name: 'Blood-Mirror', desc: 'The reflection only functions if the shield has been bathed in fresh blood today.' },
      { name: 'Banshee\'s Echo', desc: 'A reflected spell is accompanied by a shrieking wail that unnerves the original caster.' },
      { name: 'Executioner\'s Reversal', desc: 'Designed to return killing spells at the caster\'s exposed neck. Precise and vindictive.' },
      { name: 'Vengeful Grave-Slab', desc: 'A stone shield that punishes grave-robbers by reflecting their own destructive magic.' },
      { name: 'Cultist\'s Deflection', desc: 'The rebuked spell is stained black, twisting its nature upon return. Corruption follows.' },
      { name: 'Plague-Catcher', desc: 'If a disease-spell is reflected, it returns mutated and more contagious than the original.' },
      { name: 'Martyr\'s Reprisal', desc: 'The shield shatters upon reflecting the spell, sacrificing itself to save the wearer. One use.' },
      { name: 'Gorgon\'s Stare', desc: 'Alchemy magic sent at the shield is reflected as a petrification beam.' },
      { name: 'Mage-Killer\'s Aegis', desc: 'Angled to split incoming fireballs into two separate return projectiles. Devastating.' },
      { name: 'Spiteful Iron', desc: 'The shield groans in protest, despising raw magic so much it spits it back in disgust.' }
    ]
  },

  // ==========================================
  // ACCESSORY ENCHANTMENTS
  // ==========================================
  {
    id: 'water_walking',
    name: 'Water Walking',
    target: 'Accessory',
    rarity: 'Uncommon',
    baseCost: 250,
    statBonus: { stat: 'water_speed', value: 100 },
    effect: 'Allows the wearer to stand and move across liquid surfaces as if they were solid ground.',
    variants: [
      { name: 'Pond-Strider Ring', desc: 'A tarnished silver band. The wearer\'s feet leave small ripples but never break the surface.' },
      { name: 'River-Runner Boots', desc: 'Enchanted leather boots that harden surface tension. Walking on rapids is noisy but functional.' },
      { name: 'Mariner\'s Anklet', desc: 'A coral-studded anklet that works only on salt water. Freshwater needs the companion piece.' },
      { name: 'Frost-Step Sandals', desc: 'Each step freezes a tiny disc of ice on the water. The discs melt seconds after stepping off.' },
      { name: 'Lily Pad Charm', desc: 'A jade frog pendant. Grants water-walking but causes the wearer to croak when surprised.' },
      { name: 'Bog-Treader\'s Wraps', desc: 'Designed to prevent sinking into swamps. Corpse-filled bogs are the intended use case.' },
      { name: 'Blood-Strider', desc: 'Originally only worked on pooled blood, but adapted to water over centuries of use.' },
      { name: 'Grave-Cold Soles', desc: 'The water freezes just enough to hold weight, cracking with each step. Nerve-wracking.' },
      { name: 'Hangman\'s Float', desc: 'The wearer bobs across water like an upright drowned corpse. Functional but disturbing.' },
      { name: 'Skeletal Water-Bugs', desc: 'Tiny necro-arachnids bound to the boots distribute surface tension. They are alive.' },
      { name: 'Deserter\'s Folly', desc: 'Allows crossing water but increases the wearer\'s weight on dry land. Trade-off.' },
      { name: 'Miasma-Shoes', desc: 'A thick layer of swamp-gas beneath the soles repels water. The smell is considerable.' },
      { name: 'Corpse-Ferry Belt', desc: 'Designed by a ferryman who preferred dragging bodies across the river himself.' },
      { name: 'Plague-Wader', desc: 'Water turns brackish and undrinkable for twenty feet where the wearer steps.' },
      { name: 'Ghost-Step', desc: 'The wearer leaves no ripples, appearing disconnected from the physical world.' }
    ]
  },
  {
    id: 'nightsight',
    name: 'Nightsight',
    target: 'Accessory',
    rarity: 'Common',
    baseCost: 50,
    statBonus: { stat: 'nightsight', value: 60 },
    effect: 'Grants 60 feet of nightsight to creatures that do not naturally possess it.',
    variants: [
      { name: 'Cat\'s Eye Amulet', desc: 'A polished gemstone on a fine chain. The wearer\'s pupils dilate to vertical slits in dim light.' },
      { name: 'Owl-Sight Circlet', desc: 'A thin iron circlet with small feathers. Night vision activates with a faint golden glow.' },
      { name: 'Shadow Lenses', desc: 'Round lenses of smoked crystal in a brass frame. Darkness appears in shades of ghostly green.' },
      { name: 'Mole-Digger\'s Ring', desc: 'Carved from a giant mole\'s claw. Effective, but the wearer becomes sensitive to bright light.' },
      { name: 'Drow-Forged Brooch', desc: 'A spider-shaped brooch of dark metal. Grants perfect nightsight but whispers in undercommon.' },
      { name: 'Grave-Digger\'s Sight', desc: 'Highlights recently buried earth and exposed bones in pitch black. A sexton\'s essential tool.' },
      { name: 'Ghoul-Eye Pendant', desc: 'A preserved eyeball that grants predatory, blood-seeking vision in total darkness.' },
      { name: 'Assassin\'s Gaze', desc: 'Colors are washed out, replaced by a hyper-focused, sharp grayscale. Movement stands out.' },
      { name: 'Blood-Tracker\'s Lenses', desc: 'In darkness, spilled blood glows with a bright red luminescence. Invaluable for hunters.' },
      { name: 'Cultist\'s Veil', desc: 'Grants nightsight but causes the wearer to see darting shadows in their periphery. Paranoia.' },
      { name: 'Dead-Man\'s Stare', desc: 'The wearer\'s eyes roll back into their head while the nightsight is active. Unnerving.' },
      { name: 'Witch-Sight Circlet', desc: 'Plunges the world into darkness but illuminates the souls of nearby living creatures.' },
      { name: 'Rat-Catcher\'s Goggles', desc: 'Tinted green glass that reeks of sewage. Perfect for lightless tunnels and drains.' },
      { name: 'Inquisitor\'s Flare', desc: 'Darkness is pushed back by an illusion of roaring, invisible holy fire. Only the wearer sees it.' },
      { name: 'Void-Gazer\'s Ring', desc: 'Allows perfect night vision but makes staring at the sun painless. The damage is still real.' }
    ]
  },
  {
    id: 'feather_fall',
    name: 'Feather Fall',
    target: 'Accessory',
    rarity: 'Uncommon',
    baseCost: 200,
    statBonus: { stat: 'fall_reduction', value: 80 },
    effect: 'Automatically activates when the wearer falls more than 10 feet, reducing falling speed to 60 feet per round and negating fall damage.',
    variants: [
      { name: 'Dandelion Pendant', desc: 'A preserved seed in crystal. The wearer drifts downward like a seed on the wind.' },
      { name: 'Cloudstep Boots', desc: 'White leather boots that summon a small cushion of cloud beneath the feet during a fall.' },
      { name: 'Raven-Feather Cloak', desc: 'A cloak trimmed with raven feathers that spreads wide during descent, creating a crude glide.' },
      { name: 'Stone-Deny Ring', desc: 'A granite ring that refuses to let its wearer hit the ground at lethal speed. Simple magic.' },
      { name: 'Breeze-Catcher Scarf', desc: 'A silk scarf that fills with air during a fall, ballooning outward to slow descent.' },
      { name: 'Hangman\'s Noose', desc: 'You fall slowly but choke on an invisible rope until your feet touch the ground.' },
      { name: 'Corpse-Kite Cloak', desc: 'A cloak made of stretched, tanned skin that catches the wind. Gruesome but effective.' },
      { name: 'Grave-Dust Descent', desc: 'The wearer dissolves into ash mid-fall, slowly reforming upon touching the ground.' },
      { name: 'Shadow-Cushion', desc: 'A pool of inky blackness catches the wearer at the last possible second. Terrifying.' },
      { name: 'Martyr\'s Plunge', desc: 'Fall damage is negated, but the wearer screams in vivid agony the entire way down.' },
      { name: 'Blood-Feather Charm', desc: 'A flock of ghostly ravens erupts from the wearer\'s back to slow descent. They screech.' },
      { name: 'Cultist\'s Levitation', desc: 'The wearer is slowly lowered by dozens of invisible hands. The grip is uncomfortably firm.' },
      { name: 'Bog-Bubble', desc: 'A swamp-gas bubble forms around the wearer, bouncing on impact. Smells terrible.' },
      { name: 'Plague-Swarm Descent', desc: 'Millions of harmless flies erupt to carry the wearer safely downward. Horrifying to witness.' },
      { name: 'Iron-Maiden\'s Grace', desc: 'The wearer turns rigid mid-fall, descending like a rusted iron statue lowered on invisible chains.' }
    ]
  },

  // ==========================================
  // EPIC-TIER ENCHANTMENTS
  // ==========================================
  {
    id: 'soul_cleave',
    name: 'Soul Cleave',
    target: 'Weapon',
    rarity: 'Epic',
    baseCost: 3000,
    statBonus: { stat: 'armor_piercing', value: 20 },
    effect: 'Strikes damage both the physical body and the soul. Targets killed cannot be resurrected by anything short of a wish spell.',
    variants: [
      { name: 'Reaper\'s Divide', desc: 'The blade splits light into two shadows. One follows the body, the other trails the severed soul.' },
      { name: 'Wraith-Splitter', desc: 'Severs the tether between flesh and spirit. Ghosts of the slain linger at the wound site for hours.' },
      { name: 'Orphan-Maker', desc: 'Named for the permanence of its kills. Temples refuse to handle the corpses it creates.' },
      { name: 'Void-Schism', desc: 'The cut exists on two planes at once. Healing the flesh does nothing for the torn soul beneath.' },
      { name: 'Grave-Final', desc: 'Corpses killed by this weapon cannot rise as undead. Necromancers consider it an abomination.' },
      { name: 'Sin-Render', desc: 'The blade weighs the target\'s sins during the strike. The guiltier the victim, the deeper the wound.' },
      { name: 'Final-Silence', desc: 'Severs the victim\'s connection to all divine entities. No god hears their final prayer.' },
      { name: 'Marrow-of-Despair', desc: 'The spiritual wound manifests as crushing hopelessness. Survivors describe feeling hollow for years.' },
      { name: 'Executioner\'s Absolution', desc: 'The soul is cleanly separated without pain. Considered merciful by headsmen, horrifying by clerics.' },
      { name: 'Twilight Schism', desc: 'The wound bleeds shadow instead of blood. The darkness pools and evaporates by dawn.' },
      { name: 'Oath-Breaker\'s Edge', desc: 'Targets souls bound by broken vows. Paladins who fell from grace fear it above all.' },
      { name: 'Harvest Moon', desc: 'The enchantment strengthens during the harvest moon, capable of severing a soul with a scratch.' },
      { name: 'Widow\'s Terminus', desc: 'The slain cannot visit dreams or send messages from beyond. Their loved ones are left with silence.' },
      { name: 'Corpse-Lock', desc: 'The body is sealed against reanimation. Even the flesh resists decomposition, frozen in death.' },
      { name: 'Pyre-of-Finality', desc: 'The wound smolders with ghostly flame until the soul departs. It can take days.' }
    ]
  },
  {
    id: 'chronosteel',
    name: 'Chronosteel',
    target: 'Armor',
    rarity: 'Epic',
    baseCost: 3500,
    statBonus: { stat: 'haste', value: 10 },
    effect: 'Once per day, the wearer can rewind 6 seconds of personal time, undoing damage taken or a failed save.',
    variants: [
      { name: 'Temporal Plate', desc: 'Faint clock-tick sounds emanate from the joints. The armor remembers its intact state and reverts.' },
      { name: 'Second-Chance Mail', desc: 'The metal ripples like disturbed water when the rewind triggers. Onlookers see a brief double-image.' },
      { name: 'Deja-Vu Shell', desc: 'Allies nearby experience a disorienting flash of repeated memory when the rewind activates.' },
      { name: 'Grave-Denied', desc: 'The armor refuses to let its wearer die on schedule. Death arrives six seconds late.' },
      { name: 'Paradox Cuirass', desc: 'Using the rewind leaves a ghostly afterimage where the wearer would have fallen. It fades by morning.' },
      { name: 'Hourglass Breastplate', desc: 'Sand trickles upward through channels in the metal. When it runs out, the rewind is spent.' },
      { name: 'Fate-Cheater\'s Harness', desc: 'Clerics despise this armor. It disrupts the natural order of death every time it activates.' },
      { name: 'Echo-Forged Plate', desc: 'Stores an echo of the wearer\'s state. The echo degrades if not used within a day.' },
      { name: 'Executioner\'s Regret', desc: 'Originally worn by a headsman who wished to undo his work. He used it once and went mad.' },
      { name: 'Bone-Clock Lining', desc: 'The inner padding contains tiny bone gears that tick. They stop when the rewind is exhausted.' },
      { name: 'Wound-Rewind', desc: 'Blood flows backward into the body. Severed flesh reattaches. Witnesses report nausea.' },
      { name: 'Sinner\'s Reprieve', desc: 'The wearer relives the six seconds in detail but emerges unscathed. Psychologically costly.' },
      { name: 'Last-Breath Reversal', desc: 'Activates at the moment of death. The wearer gasps back to life mid-collapse.' },
      { name: 'Time-Scarred Steel', desc: 'Each use leaves a visible crack no smith can repair. The armor ages with use.' },
      { name: 'Widow\'s Loop', desc: 'Named for a knight who rewound her husband\'s death a hundred times. The armor refused.' }
    ]
  },
  {
    id: 'spell_devourer',
    name: 'Spell Devourer',
    target: 'Shield',
    rarity: 'Epic',
    baseCost: 4000,
    statBonus: { stat: 'mana_drain', value: 15 },
    effect: 'The shield absorbs spell energy on a successful block. Stored energy can be released as a 30-foot cone of force on the next attack.',
    variants: [
      { name: 'Arcane Maw', desc: 'The shield face is carved into a screaming mouth that snaps shut when absorbing a spell.' },
      { name: 'Hungry Aegis', desc: 'The metal surface ripples like a throat swallowing. The shield grows warm with stored energy.' },
      { name: 'Rune-Glutton', desc: 'Carved runes glow brighter as more magic is absorbed. Overloading it causes a dangerous backfire.' },
      { name: 'Mage-Bane Bulwark', desc: 'Designed for anti-mage shock troops. The release cone shreds magical barriers.' },
      { name: 'Witch-Eater', desc: 'Absorbs enchantments from the caster, not just the spells. Prolonged use strips their buffs.' },
      { name: 'Grave-Swallow', desc: 'Necromantic spells are absorbed with a wet, gurgling sound. The release smells of open graves.' },
      { name: 'Inquisitor\'s Consumption', desc: 'Stored magic is purified before release, converting corrupted spells into raw, searing light.' },
      { name: 'Blood-Price Buckler', desc: 'Absorbs magic without limit, but each stored spell drains a drop of the wielder\'s blood.' },
      { name: 'Void-Mouth', desc: 'The absorption point is a black hole in the shield center. Light bends visibly around it.' },
      { name: 'Plague-Swallow', desc: 'Magical diseases are absorbed but not purified. The release cone spreads the infection.' },
      { name: 'Executioner\'s Feast', desc: 'The shield gorges on death magic. Last rites and resurrection spells are its delicacy.' },
      { name: 'Bone-Cage Front', desc: 'Woven rib bones form the shield face. Spells lodge between them like trapped insects.' },
      { name: 'Cultist\'s Chalice', desc: 'Absorbed energy pools in a basin depression on the front. It can be drunk in desperation.' },
      { name: 'Thunder-Gorge', desc: 'Absorbs sound-based magic. The release is a devastating, directional sonic burst.' },
      { name: 'Martyr\'s Gullet', desc: 'Absorbs damage meant for allies within five feet. The wielder feels all of it.' }
    ]
  },
  {
    id: 'phase_shift',
    name: 'Phase Shift',
    target: 'Accessory',
    rarity: 'Epic',
    baseCost: 3000,
    statBonus: { stat: 'evasion', value: 12 },
    effect: 'Once per brief reprieve, the wearer can become ethereal for one round, passing through solid matter and becoming immune to physical damage.',
    variants: [
      { name: 'Wraith-Band', desc: 'A pale band of ghost-iron. The wearer flickers translucent, visible only as a heat-shimmer.' },
      { name: 'Phantom Cloak-Pin', desc: 'A skull-shaped clasp. Activating it turns the wearer into a walking shadow for six seconds.' },
      { name: 'Void-Step Ring', desc: 'The wearer drops into a gap between planes. They see both but exist in neither.' },
      { name: 'Grave-Walker\'s Charm', desc: 'Originally designed for tomb-robbers to phase through sealed sarcophagus lids and vault doors.' },
      { name: 'Border-Thin Amulet', desc: 'Thins the barrier between planes around the wearer. Prolonged use attracts planar predators.' },
      { name: 'Ghost-Light Anklet', desc: 'The lower body phases first, making the wearer appear to sink into the floor before vanishing.' },
      { name: 'Assassin\'s Slip', desc: 'Designed for passing through locked doors. The re-materialization is silent and precise.' },
      { name: 'Executioner\'s Bypass', desc: 'Allows reaching through a person\'s chest to grip their heart. Rarely used as intended.' },
      { name: 'Corpse-Fade Brooch', desc: 'The wearer looks like a translucent corpse during the shift. Undead ignore them.' },
      { name: 'Plague-Phase Pendant', desc: 'Phases the body but not carried diseases. Infections pass through walls with the wearer.' },
      { name: 'Shadow-Merge Earring', desc: 'Instead of going ethereal, the wearer merges with nearby shadows. Requires darkness.' },
      { name: 'Bone-Thin Ring', desc: 'The wearer feels their skeleton phase out of alignment. The sensation is deeply unpleasant.' },
      { name: 'Smuggler\'s Passage', desc: 'Allows phasing through walls up to three feet thick. Originally marketed to treasury thieves.' },
      { name: 'Dead-Man\'s Walk', desc: 'The ethereal state looks like a transparent corpse walking. Guards have fled on sight.' },
      { name: 'Inquisitor\'s Ward', desc: 'Phases the wearer to escape magical bindings. Counter-designed for witch trials.' }
    ]
  },

  // ==========================================
  // MYTHIC-TIER ENCHANTMENTS
  // ==========================================
  {
    id: 'divine_smite',
    name: 'Divine Smite',
    target: 'Weapon',
    rarity: 'Mythic',
    baseCost: 15000,
    statBonus: { stat: 'radiant_damage', value: 25 },
    effect: 'Every strike channels raw divine energy, dealing 2d8 radiant damage. Against fiends and undead, this becomes 4d8. The weapon cannot be wielded by the unholy.',
    variants: [
      { name: 'God-Hammer', desc: 'The weapon strikes with the weight of divine judgment. The ground cracks in a halo beneath each blow.' },
      { name: 'Seraphim\'s Brand', desc: 'Burns a permanent mark of divine condemnation onto the target\'s soul. Visible to all celestials.' },
      { name: 'World-Cleanser', desc: 'The radiant energy sterilizes everything in a ten-foot radius. Disease, corruption, and decay retreat.' },
      { name: 'Heretic\'s Bane', desc: 'The damage triples against oath-breakers and fallen clerics. Their screams carry across planes.' },
      { name: 'Pyre of the Righteous', desc: 'The wielder is wreathed in painless golden flame. The weapon becomes a column of solid light.' },
      { name: 'Last Rites', desc: 'Undead struck by this weapon are granted the peace of true death. The release is absolute.' },
      { name: 'Absolution\'s Edge', desc: 'Offers the target a final moment of clarity before the strike lands. Few choose to dodge.' },
      { name: 'Martyr\'s Vengeance', desc: 'Grows stronger with each wound the wielder has suffered. At death\'s door, it burns like a star.' },
      { name: 'Choir of Blades', desc: 'Each swing produces a single note of a celestial hymn. A full combat sounds like a requiem.' },
      { name: 'Throne-Breaker', desc: 'Designed to kill usurper-kings. Crowns shatter when struck by its radiant edge.' },
      { name: 'Heaven\'s Gate', desc: 'A killing blow opens a brief rift to the upper planes. Light pours through for one heartbeat.' },
      { name: 'Confessor\'s Hammer', desc: 'The target speaks their worst sin aloud in the moment before the strike connects.' },
      { name: 'Grave-Sanctifier', desc: 'Burial sites within fifty feet are permanently consecrated after a single kill.' },
      { name: 'Dawn-Forged', desc: 'The enchantment was laid at the exact moment of sunrise. It carries perpetual first-light.' },
      { name: 'Apocalypse Verdict', desc: 'The final enchantment. Strikes with the authority of the end times. Nothing unholy survives.' }
    ]
  },
  {
    id: 'living_fortress',
    name: 'Living Fortress',
    target: 'Armor',
    rarity: 'Mythic',
    baseCost: 20000,
    statBonus: { stat: 'defense', value: 30 },
    effect: 'The armor is semi-sentient. It repositions plates to intercept attacks, grants exceptional defense, and can sprout temporary shield projections.',
    variants: [
      { name: 'Awakened Plate', desc: 'The armor breathes. Plates expand on inhale and contract on exhale. It sleeps when doffed.' },
      { name: 'Colossus Shell', desc: 'Forged from a dead war-golem\'s chassis. It remembers combat and anticipates attack patterns.' },
      { name: 'Iron Symbiont', desc: 'Bonds to the wearer\'s nervous system. Removing it requires surgery. It resists separation.' },
      { name: 'Titan\'s Cradle', desc: 'Grows additional plates over wounds. After enough battles, the armor is twice its original size.' },
      { name: 'War-Mind', desc: 'Contains the fragmented consciousness of a dead general. It barks tactical advice during combat.' },
      { name: 'Bone-Knit Shell', desc: 'The inner lining grafts to the wearer\'s skeleton. Fractures are stabilized by internal metal splints.' },
      { name: 'Cathedral Plate', desc: 'Resembles gothic architecture. Flying buttress supports sprout from the pauldrons during impacts.' },
      { name: 'Siege-Skin', desc: 'Designed for one-person fortification. The wearer becomes an immovable object in a doorway.' },
      { name: 'Executioner\'s Carapace', desc: 'Sprouts blade-edges when grappled. Designed for headsmen who expect resistance from the condemned.' },
      { name: 'Blood-Bonded Mail', desc: 'Feeds on the wearer\'s blood to fuel its sentience. Well-fed armor is more protective.' },
      { name: 'Grave-Guardian Tomb', desc: 'Encases the wearer in a walking sarcophagus. The dead cannot distinguish them from a monument.' },
      { name: 'Hydra-Plate', desc: 'Damaged sections regrow as different armor. After decades, no two plates match.' },
      { name: 'God-Forged Aegis', desc: 'Forged by a dead deity\'s last breath. The armor mourns its creator in quiet, metallic groans.' },
      { name: 'World-Shell', desc: 'Contains a pocket ecosystem in its joints. Moss, lichen, and tiny insects live in the crevices.' },
      { name: 'Annihilation Ward', desc: 'The armor has one purpose: its wearer must not die. It will sacrifice anything to achieve this.' }
    ]
  },
  {
    id: 'reality_anchor',
    name: 'Reality Anchor',
    target: 'Shield',
    rarity: 'Mythic',
    baseCost: 18000,
    statBonus: { stat: 'displacement_immunity', value: 100 },
    effect: 'Locks local reality in place. Within 30 feet, teleportation fails, illusions shatter, and shapechangers are forced into their true form.',
    variants: [
      { name: 'Truth-Wall', desc: 'Reality within the aura becomes absolute. Lies spoken near the shield cause physical pain.' },
      { name: 'Plane-Lock Aegis', desc: 'Seals dimensional rifts on contact. Extraplanar beings within range are tethered to the material.' },
      { name: 'Anti-Magic Bastion', desc: 'Raw magic frays visibly near the shield. Spell effects flicker and dim within its influence.' },
      { name: 'Inquisitor\'s Revelation', desc: 'Forces all concealed creatures to become visible. No secret survives its radius.' },
      { name: 'Void-Denial', desc: 'The spaces between planes are forcibly closed. Nothing enters or exits through supernatural means.' },
      { name: 'Gorgon\'s Truth', desc: 'Shapechanged creatures revert to their birth-form. Polymorphed allies are also affected.' },
      { name: 'Grave-Seal', desc: 'Undead within range are pinned to their current location. Ghosts cannot phase through objects.' },
      { name: 'World-Nail', desc: 'Hammering the shield into the ground creates a permanent anchor. Reality is reinforced for miles.' },
      { name: 'Mage-Prison', desc: 'Casters within range cannot access the weave. Their connection to magic is temporarily severed.' },
      { name: 'Fate-Breaker\'s Guard', desc: 'Scrying magic returns static. Fortune-telling becomes impossible within the field.' },
      { name: 'Cultist\'s Nightmare', desc: 'Summoning circles within range collapse. Bound entities are freed and their masters exposed.' },
      { name: 'Paradox Bulwark', desc: 'Time magic reverses within the field. Haste becomes slow, and slow becomes haste.' },
      { name: 'Echo-Killer', desc: 'Illusions within range pop like soap bubbles. The sound is audible and satisfying.' },
      { name: 'Blood-Iron Lock', desc: 'The anchor field is powered by the wielder\'s heartbeat. Stronger hearts project farther.' },
      { name: 'Omega Shield', desc: 'The final word in anti-magic warfare. Nothing unreal persists in its presence.' }
    ]
  },
  {
    id: 'wish_weave',
    name: 'Wish Weave',
    target: 'Accessory',
    rarity: 'Mythic',
    baseCost: 25000,
    statBonus: { stat: 'all_stats', value: 5 },
    effect: 'Once per month, the wearer can speak a single wish. The wish is granted in the most literal and often cruel interpretation possible.',
    variants: [
      { name: 'Monkey\'s Paw Ring', desc: 'Carved from a mummified simian finger. Every wish is granted with a devastating twist.' },
      { name: 'Djinn-Chain Bracelet', desc: 'Contains a trapped djinn fragment. The wishes are powerful but the djinn despises servitude.' },
      { name: 'Fate-Spinner\'s Loom', desc: 'A brooch shaped like a spinning wheel. It weaves the wish into reality over hours.' },
      { name: 'Oracle\'s Glass Eye', desc: 'A prosthetic eye that grants wishes when the wearer weeps. The tears are real.' },
      { name: 'Serpent\'s Promise', desc: 'A snake-shaped armband. The wish is whispered and the serpent\'s eyes glow. Nothing is free.' },
      { name: 'Executioner\'s Last Word', desc: 'A pendant made from a last meal\'s bread. Grants wishes of the condemned. Always grim.' },
      { name: 'Blood-Pact Seal', desc: 'Requires a pint of blood to activate. The wish-granter does not identify itself.' },
      { name: 'Void-Whisper Earring', desc: 'The wish is spoken into the earring and vanishes into the void. Fulfillment comes from nowhere.' },
      { name: 'Grave-Debt Coin', desc: 'A coin placed on a dead man\'s eye. Flipping it while wishing invokes the debt of the dead.' },
      { name: 'Plague-Doctor\'s Vial', desc: 'A vial pendant. Wishes for healing succeed. Wishes for harm succeed twice as well.' },
      { name: 'Titan\'s Tear Drop', desc: 'A crystallized tear from a dead titan. The wish carries centuries of grief.' },
      { name: 'Oblivion Locket', desc: 'The wish erases a memory of equal value. Powerful wishes cost identities.' },
      { name: 'Genesis Seed Amulet', desc: 'Contains a seed of creation. Wishes for life flourish. Wishes for death wilt the seed.' },
      { name: 'Shadow-Debt Ring', desc: 'The shadow of the wearer detaches and fulfills the wish. It returns changed each time.' },
      { name: 'Annihilation\'s Grace', desc: 'The most dangerous wish item catalogued. Three previous owners wished themselves out of existence.' }
    ]
  }
];
