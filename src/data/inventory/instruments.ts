import type { VariantDef } from './types';

export type InstrumentCategory = 'String' | 'Wind' | 'Percussion' | 'Keyboard' | 'Tool';

/**
 * A musical instrument used by bard-type roles to channel performance
 * magic. Each instrument has a distinct tonal quality that affects the
 * type and potency of bardic abilities.
 */
export interface Instrument {
  id: string;
  name: string;
  category: InstrumentCategory;
  proficiencyRequired: boolean;
  basePrice: number;
  description: string;
  variants: VariantDef[];
}

/** Master list of all purchasable musical instruments. */
export const INSTRUMENTS: Instrument[] = [
  // ==========================================
  // STRING INSTRUMENTS
  // ==========================================
  {
    id: 'lute',
    name: 'Lute',
    category: 'String',
    proficiencyRequired: true,
    basePrice: 35,
    description: 'A pear-shaped body with a fretted neck. The bard\'s instrument of choice across every tavern in the realm.',
    variants: [
      { name: 'Tavern Lute', desc: 'A battered but reliable instrument held together by string and stubbornness.', price: 15 },
      { name: 'Bone-Inlaid Lute', desc: 'Decorated with small chips of human bone, typically played at funeral wakes.', price: 50 },
      { name: 'Dwarven Stone-Lute', desc: 'Carved from a single piece of slate. Sounds like a mountain rumbling its approval.', price: 80 },
      { name: 'Rosewood Lute', desc: 'A warm, rich-toned instrument favored by court musicians and travelling minstrels.', price: 50 },
      { name: 'War-Lute', desc: 'Reinforced with iron bands. Can be used as a blunt weapon in a bar fight without losing tune.', price: 45 },
      { name: 'Master Luthier\'s Craft', desc: 'A flawless instrument made by a legendary craftsman. Each note rings with crystalline perfection.', price: 350 },
      { name: 'Gallows-Wood Lute', desc: 'Carved from the beams of a demolished execution stand. Resonates with a deeply mournful hum.', price: 75 },
      { name: 'Catgut Strung Lute', desc: 'The strings are thick and unpleasantly fibrous, requiring painfully calloused fingers to play.', price: 25 },
      { name: 'Plague-Minstrel\'s Lute', desc: 'Stained with dark herbs to ward off miasma. The wood permanently smells of bitter cloves.', price: 40 },
      { name: 'Widow\'s Lute', desc: 'Stained a uniform matte black. Used exclusively for playing laments in the town square.', price: 30 },
      { name: 'Beggar\'s Box', desc: 'Barely recognizable as a lute; predominantly a hollow grooved log with tightening pegs.', price: 5 },
      { name: 'Blood-Stained Lute', desc: 'The fretboard is stained brown from a musician who refused to stop playing while bleeding.', price: 20 },
      { name: 'Ironwood Lute', desc: 'Dense as a mace, requiring raw strength to hold it up through a full performance.', price: 90 },
      { name: 'Cultist\'s Drone', desc: 'Purposely built with no frets, producing only a terrifying, continuous, sliding atonal drone.', price: 60 },
      { name: 'Defaced Court Lute', desc: 'Once beautifully painted, now violently scratched and clawed by a madman with a knife.', price: 18 }
    ]
  },
  {
    id: 'harp',
    name: 'Harp',
    category: 'String',
    proficiencyRequired: true,
    basePrice: 75,
    description: 'A tall, angular frame strung with wire or gut. Associated with noble courts and divine worship.',
    variants: [
      { name: 'Lap Harp', desc: 'A small, portable harp that can be played while seated on a log or tavern stool.', price: 40 },
      { name: 'Pedal Harp', desc: 'A full-sized concert instrument requiring a cart to transport. Magnificent sound.', price: 500 },
      { name: 'Gilded Harp', desc: 'A gilded instrument reserved for royal performances, now heavily tarnished with neglect.', price: 800 },
      { name: 'War Harp', desc: 'A compact, iron-framed harp meant to inspire troops on the march. Surprisingly loud.', price: 60 },
      { name: 'Spine-Harp', desc: 'A terrifying instrument quite literally constructed from a massive, curved spinal column.', price: 150 },
      { name: 'Shepherd\'s Lyre', desc: 'A simple, portable lyre with four gut strings. Played to calm herds and pass the hours.', price: 20 },
      { name: 'Blood-Iron Harp', desc: 'Strung with razor-thin abyssal steel that frequently cuts the harpist\'s playing fingers.', price: 120 },
      { name: 'Grave-Watcher\'s Lyre', desc: 'Used in graveyards to soothe restless spirits; the wood is always freezing cold.', price: 95 },
      { name: 'Cult-Choir Harp', desc: 'Designed to accompany terrifying, atonal chanting. It produces unnerving, dissonant chords.', price: 110 },
      { name: 'Hangman\'s Harp', desc: 'The thickest bass strings are actually fashioned from discarded, expertly treated noose rope.', price: 85 },
      { name: 'Mourner\'s Harp', desc: 'Painted matte black and played without any joyous resonance, relying on sharp, dead plucks.', price: 65 },
      { name: 'Smuggler\'s Hollow', desc: 'The thick wooden frame has a hidden compartment large enough to stash dried poisons or gems.', price: 130 },
      { name: 'Cursed Bard\'s Harp', desc: 'Produces a beautiful tone but inflicts a terrible, splitting headache on the person playing it.', price: 45 },
      { name: 'Deserter\'s Lyre', desc: 'Hacked together from scavenged shield-wood and unraveled bowstrings. Works in a pinch.', price: 15 },
      { name: 'Bone-Plated Harp', desc: 'The soundbox is tiled with thousands of tiny, unidentifiable bone fragments.', price: 200 }
    ]
  },
  {
    id: 'fiddle',
    name: 'Fiddle',
    category: 'String',
    proficiencyRequired: true,
    basePrice: 30,
    description: 'A bowed string instrument capable of furious jigs and mournful laments in equal measure.',
    variants: [
      { name: 'Farmer\'s Fiddle', desc: 'Rough-hewn pine body with catgut strings. Sounds awful but nobody at the barn dance cares.', price: 12 },
      { name: 'Devil\'s Fiddle', desc: 'A black-lacquered instrument rumored to have been won in a crossroads wager. Plays impossibly fast.', price: 200 },
      { name: 'Court Violin', desc: 'A polished, professionally crafted instrument with a rich, singing tone. Reserved for serious performers.', price: 150 },
      { name: 'Bog-Wood Fiddle', desc: 'Carved from petrified swamp tree. Sounds raspy, wet, and deeply melancholic.', price: 25 },
      { name: 'Assassin\'s Bowstring', desc: 'A fiddle strung with garrote wire. The bow itself conceals a needle-thin thrusting blade.', price: 85 },
      { name: 'Dwarven Bass Fiddle', desc: 'Carved from ironwood, it produces tones so deep they can be felt through the tavern floor.', price: 90 },
      { name: 'Plague-Dance Fiddle', desc: 'Played exclusively in quarantined zones to keep up the morale of the actively dying.', price: 40 },
      { name: 'Grave-Dancer\'s Instrument', desc: 'A pale, ash-wood fiddle that allegedly forces corpses to twitch when certain high notes are hit.', price: 110 },
      { name: 'Blood-Soaked Fiddle', desc: 'The wood has absorbed so much spilled wine and blood it permanently smells of a slaughterhouse.', price: 30 },
      { name: 'Bone-Bow Fiddle', desc: 'The instrument is normal, but the bow used to play it is a long, highly polished human femur.', price: 65 },
      { name: 'Madman\'s Scrape', desc: 'Completely lacks a proper bridge; playing it gracefully is impossible, it only shrieks.', price: 10 },
      { name: 'Witch-Trial Fiddle', desc: 'Confiscated from an executed hedge-witch. Usually shunned and considered deeply cursed.', price: 50 },
      { name: 'Executioner\'s Jig', desc: 'A heavy, iron-bound fiddle used to drown out the screams of those currently on the rack.', price: 75 },
      { name: 'Thief\'s Pocket-Fiddle', desc: 'Palm-sized but piercing. Used for chaotic street-side distractions while pockets are picked.', price: 35 },
      { name: 'Ashen Screech', desc: 'Baked in the ashes of a burned city. The tone it produces is inherently panicked and distressed.', price: 45 }
    ]
  },
  {
    id: 'mandolin',
    name: 'Mandolin',
    category: 'String',
    proficiencyRequired: true,
    basePrice: 25,
    description: 'A smaller, brighter-toned relative of the lute. Popular for upbeat dance music.',
    variants: [
      { name: 'Traveler\'s Mandolin', desc: 'Compact and sturdy enough to survive weeks on the road.', price: 20 },
      { name: 'Silver-Stringed Mandolin', desc: 'Strung with thin silver wire for a bright, cutting tone.', price: 80 },
      { name: 'Blood-Iron Mandolin', desc: 'Strung with heavy wire; plucking it vigorously often slices the musician\'s fingertips.', price: 45 },
      { name: 'Gnomish Automated Mandolin', desc: 'A clockwork mechanism strums while you turn a crank. No skill required.', price: 150 },
      { name: 'Tavern-Brawler\'s Mandolin', desc: 'The back is caved in from being smashed over a patron\'s skull. Still plays.', price: 10 },
      { name: 'Bandit\'s Strum', desc: 'Painted matte black to remain unseen while playing ambush signals in the forest.', price: 15 },
      { name: 'Grave-Robber\'s Mandolin', desc: 'Stolen directly from a crypt. Smells powerfully of embalming fluids and decay.', price: 35 },
      { name: 'Plague-Doctor\'s Lullaby', desc: 'Padded with oiled rags to muffle the sound to a faint, pathetic whisper.', price: 30 },
      { name: 'Cursed Strummer', desc: 'One specific string on the instrument physically cannot be tuned to the correct pitch without snapping.', price: 12 },
      { name: 'Inquisitor\'s Mandolin', desc: 'Used to provide a bizarre, cheerful, and terrifying religious soundtrack to lengthy interrogations.', price: 65 },
      { name: 'Bone-Pick Mandolin', desc: 'The strings must be plucked exclusively with an included heavy, sharpened bone talisman.', price: 40 },
      { name: 'Sinner\'s Tremolo', desc: 'Anyone who listens to it for long is struck by a crushing, unexplainable guilt.', price: 90 },
      { name: 'Hollow-Log Mandolin', desc: 'Literally just a rotting log covered with tightly stretched tanned hide and crude strings.', price: 8 },
      { name: 'Execution-Day Player', desc: 'Produces a jarringly cheerful tone that clashes with the grim reality of the scaffold.', price: 25 },
      { name: 'Ash-Wood Strummer', desc: 'The body is made from a tree that survived a massive forest fire. It smells permanently of smoke.', price: 50 }
    ]
  },
  {
    id: 'dulcimer',
    name: 'Dulcimer',
    category: 'String',
    proficiencyRequired: true,
    basePrice: 45,
    description: 'A flat, trapezoidal instrument struck with small hammers, producing shimmering cascades of notes.',
    variants: [
      { name: 'Mountain Dulcimer', desc: 'A simple, fretted version played across the lap. Common in highland villages.', price: 30 },
      { name: 'Hammered Dulcimer', desc: 'A large, resonant instrument played with felt mallets. Fills a hall with sound.', price: 100 },
      { name: 'Iron-Strike Dulcimer', desc: 'Forged from cast iron and played with brass hammers. Arms ache after one song.', price: 150 },
      { name: 'Apprentice Dulcimer', desc: 'A small, forgiving instrument designed for students learning the art.', price: 20 },
      { name: 'Grave-Stone Dulcimer', desc: 'The resonant soundboard is bizarrely carved from a wide, flat cemetery marker.', price: 80 },
      { name: 'Cultist\'s Chime', desc: 'The strings are stretched terrifyingly tight across a metal frame, producing headache-inducing high notes.', price: 65 },
      { name: 'Plague-Ward Dulcimer', desc: 'The hammers are soaked in rubbing alcohol and burning herbs before every single use.', price: 55 },
      { name: 'Shattered-Wood Dulcimer', desc: 'The frame was violently broken and hastily nailed back together. The resonance is terribly hollow.', price: 15 },
      { name: 'Blood-Spattered Dulcimer', desc: 'Covered in an unremovable pattern of frantic, horrific arterial spray from a past tragedy.', price: 40 },
      { name: 'Executioner\'s Table', desc: 'Doubles as a portable torturer\'s rack if the musical strings are forcefully and rapidly removed.', price: 110 },
      { name: 'Bone-Hammer Dulcimer', desc: 'The mallets are unmodified human thigh bones. Nobody asks where they came from.', price: 75 },
      { name: 'Madman\'s Zither', desc: 'The strings are strung in random order, making it impossible to play any known melody.', price: 25 },
      { name: 'Cursed Resonator', desc: 'One specific chord snuffs every candle within thirty feet. Nobody knows which.', price: 180 },
      { name: 'Deserter\'s Wire-Board', desc: 'Strung with stolen military crossbow strings. Violently snaps back if hit with a hammer too hard.', price: 35 },
      { name: 'Smuggler\'s False-Bottom', desc: 'The thick wooden base is hollowed out. Fits enough contraband spice to hang for.', price: 90 }
    ]
  },

  // ==========================================
  // WIND INSTRUMENTS
  // ==========================================
  {
    id: 'bone_flute',
    name: 'Bone Flute',
    category: 'Wind',
    proficiencyRequired: true,
    basePrice: 2,
    description: 'A simple wind instrument carved from animal or monster bone. Produces a haunting, hollow tone.',
    variants: [
      { name: 'Shepherd\'s Whistle', desc: 'Carved from a sheep\'s shin bone. Two notes: come back, and dinner time.', price: 1 },
      { name: 'Beast-Bone Flute', desc: 'Carved from a massive predator\'s rib. The notes carry for miles and chill the spine.', price: 80 },
      { name: 'Skeleton\'s Pipe', desc: 'A human femur hollowed and drilled. Necromancers use it to command undead thralls.', price: 40 },
      { name: 'Giant\'s Finger Flute', desc: 'A massive bone requiring two hands to play. Produces bass notes that shake the earth.', price: 50 },
      { name: 'Wyvern-Bone Fife', desc: 'A slender, high-pitched instrument carved from a wyvern wing-bone. Military use.', price: 30 },
      { name: 'Ancestor\'s Flute', desc: 'A human ancestor\'s bone, carved with reverence by tribal shamans. Sacred instrument.', price: 25 },
      { name: 'Grave-Robber\'s Whistle', desc: 'A jagged, unpolished bone used to quietly signal accomplices in the dead of the night.', price: 5 },
      { name: 'Plague-Victim\'s Tibia', desc: 'Covered in sickly, pock-marked decay. Supposedly boiled clean, but nobody wants to risk it.', price: 15 },
      { name: 'Cultist\'s Spine-Flute', desc: 'A segmented flute made from fused vertebrae. Each joint clicks while playing.', price: 110 },
      { name: 'Blood-Drinker\'s Pipe', desc: 'Stained crimson to the core. The mouthpiece tastes of raw iron and salt.', price: 60 },
      { name: 'Madman\'s Trill', desc: 'Covered in frantic scratch marks detailing incoherent prophecies in no known script.', price: 20 },
      { name: 'Execution-Yard Bone', desc: 'Recovered from the muddy, forgotten mass grave located directly behind the city\'s primary gallows.', price: 35 },
      { name: 'Hollowed Jawbone', desc: 'A bizarre, highly experimental instrument where the wind is blown directly through the tooth-sockets.', price: 45 },
      { name: 'Mourner\'s Wail Flute', desc: 'Requires such effort to blow that the musician gasps and sobs while playing.', price: 55 },
      { name: 'Deserter\'s Final Signal', desc: 'A cracked whistle pulled off a soldier executed for fleeing. Unreliable tone.', price: 8 }
    ]
  },
  {
    id: 'pan_pipes',
    name: 'Pan Pipes',
    category: 'Wind',
    proficiencyRequired: true,
    basePrice: 8,
    description: 'A set of graduated tubes bound together. The signature instrument of satyrs and rural folk.',
    variants: [
      { name: 'Reed Pipes', desc: 'Cut from riverside reeds and bound with twine. Disposable but surprisingly musical.', price: 3 },
      { name: 'Cursed Sylvan Pipes', desc: 'Playing them near a forest attracts unwanted fey attention. Often hostile fey.', price: 50 },
      { name: 'Bronze Pan Pipes', desc: 'Metal tubes producing a sharper, louder tone suitable for outdoor ceremonies.', price: 25 },
      { name: 'Silver Pan Pipes', desc: 'A precious set that produces tones said to calm wild animals and charm serpents.', price: 120 },
      { name: 'Bamboo Pipes', desc: 'Light, fragile, and producing a warm, woody tone favored by eastern monks.', price: 10 },
      { name: 'Bone-Tube Pipes', desc: 'A terrifying, bound set of hollowed-out finger bones taken from multiple unfortunate individuals.', price: 75 },
      { name: 'Grave-Root Pipes', desc: 'Carved from the roots of a tree that grew through a mass grave. Tastes of loam.', price: 35 },
      { name: 'Iron-Bound Pipes', desc: 'Heavy and rusted. Doubles as a bludgeon when the music fails to soothe.', price: 40 },
      { name: 'Plague-Wind Pipes', desc: 'Playing these produces a smell so impossibly foul it actively nauseates anyone in the same room.', price: 85 },
      { name: 'Cultist\'s Multi-Flute', desc: 'Requires an impossible amount of hot breath, often causing the aggressive player to quickly pass out.', price: 55 },
      { name: 'Executioner\'s Whistle', desc: 'Used for signaling archers during a riot. The tone cuts through the sound of crowds violently.', price: 60 },
      { name: 'Blood-Soaked Reeds', desc: 'Cut from a river choked with corpses after a siege. The tone is strangely warm.', price: 20 },
      { name: 'Madman\'s Breath', desc: 'The tubes are arranged in the wrong harmonic order. No coherent melody possible.', price: 15 },
      { name: 'Sinner\'s Confession', desc: 'It is said that listening to this played in absolute darkness causes one to quietly weep uncontrollably.', price: 95 },
      { name: 'Defiled Church Pipes', desc: 'Hacked off a cathedral\'s pipe organ by drunken raiders. Still gilded in places.', price: 110 }
    ]
  },
  {
    id: 'horn',
    name: 'Horn',
    category: 'Wind',
    proficiencyRequired: false,
    basePrice: 12,
    description: 'A curved instrument sounded by buzzing the lips into a mouthpiece. Used for signals and war calls.',
    variants: [
      { name: 'Hunting Horn', desc: 'A brass horn carried on a shoulder strap. Three notes: rally, charge, and retreat.', price: 15 },
      { name: 'War Horn', desc: 'A massive ox-horn banded with iron. Its blast can be heard across an entire battlefield.', price: 25 },
      { name: 'Ram\'s Horn', desc: 'A spiraling horn used in religious ceremonies and the announcement of festivals.', price: 10 },
      { name: 'Defiled Battle-Horn', desc: 'Plated in tarnished, dented gold. Its blast terrifies lesser creatures and unnerves allies.', price: 150 },
      { name: 'Signal Bugle', desc: 'A small, precise brass instrument used by military scouts for coded messages.', price: 20 },
      { name: 'Dwarven Thunder-Horn', desc: 'So loud it causes rockslides in enclosed caverns. Used with extreme caution underground.', price: 80 },
      { name: 'Grave-Warden\'s Horn', desc: 'A bleached, cracked horn used specifically to signal the massive gravedigger shift changes.', price: 18 },
      { name: 'Executioner\'s Blast', desc: 'Blew immediately before the heavy axe falls. Instills complete, paralyzing dread in all who hear it.', price: 65 },
      { name: 'Plague-Caller\'s Horn', desc: 'Historically used to alert entire towns that the corpse-carts were slowly, heavily rolling through.', price: 40 },
      { name: 'Cultist\'s Conch', desc: 'A spiraled shell harvested from a toxic abyssal trench. Hums when held to the ear.', price: 110 },
      { name: 'Blood-Stained Bugle', desc: 'Recovered from frozen, dead lips after a disastrous winter campaign. Still frosty.', price: 25 },
      { name: 'Mud-Choked Horn', desc: 'Produces a wet, gargling bellow from hardened swamp mud caked deep inside.', price: 12 },
      { name: 'Bone-Carved Horn', desc: 'A massive hollowed tusk. The mouthpiece tastes of old marrow and regret.', price: 90 },
      { name: 'Sinner\'s Trumpet', desc: 'An overcomplicated brass nightmare requiring immense lung power to produce a single note.', price: 130 },
      { name: 'Madman\'s Tusk', desc: 'Covered in frantic warning signs carved with a nail and filled with dried blood.', price: 55 }
    ]
  },
  {
    id: 'recorder',
    name: 'Recorder',
    category: 'Wind',
    proficiencyRequired: true,
    basePrice: 5,
    description: 'A simple wooden tube with finger holes. Easy to learn, surprisingly difficult to master.',
    variants: [
      { name: 'Student Recorder', desc: 'A pine instrument given to every child in the bardic academy. Most end up in fireplaces.', price: 2 },
      { name: 'Rosewood Recorder', desc: 'A rich-toned instrument with silver keys, used by professional performers.', price: 40 },
      { name: 'Bass Recorder', desc: 'A tall, deep-voiced instrument requiring long arms and strong lungs.', price: 30 },
      { name: 'Cursed Recorder', desc: 'Physically plays itself when placed on a flat surface and heavily exposed to fresh blood.', price: 150 },
      { name: 'Bone-Carved Recorder', desc: 'A human femur drilled with uneven finger holes. The pitch wanders unpredictably.', price: 60 },
      { name: 'Grave-Robber\'s Fife', desc: 'Used to signal accomplices while pretending to be an idle midnight stroller.', price: 15 },
      { name: 'Executioner\'s Trill', desc: 'A thick oaken tube played to entertain crowds before a public beheading.', price: 25 },
      { name: 'Plague-Ward\'s Flute', desc: 'Stained with antiseptics. Stings the lips and numbs the tongue after minutes.', price: 18 },
      { name: 'Cult-Leader\'s Pitch', desc: 'Unvarnished purple wood that induces nausea in anyone within earshot.', price: 85 },
      { name: 'Blood-Soaked Recorder', desc: 'The porous wood soaked up gore and never dried. Stains the breath red.', price: 8 },
      { name: 'Iron-Cast Recorder', desc: 'Forged from cast iron. Freezing on the lips and nearly indestructible.', price: 50 },
      { name: 'Madman\'s Whistle', desc: 'Produces two clashing notes at once. Designed to ruin any melody played near it.', price: 12 },
      { name: 'Sinner\'s Breath', desc: 'Blowing into it fills the air with the hallucinatory reek of brimstone.', price: 90 },
      { name: 'Ashen Wood-Pipe', desc: 'Carved from a charred branch found in the ruins of a burned orphanage.', price: 35 },
      { name: 'Deserter\'s Comfort', desc: 'The mouthpiece is chewed ragged from the previous owner\'s crippling anxiety.', price: 5 }
    ]
  },
  {
    id: 'bagpipes',
    name: 'Bagpipes',
    category: 'Wind',
    proficiencyRequired: true,
    basePrice: 30,
    description: 'An air-reservoir bag with multiple drone and chanter pipes. Unmistakable, deafening, and divisive.',
    variants: [
      { name: 'Highland Pipes', desc: 'The full military instrument. Played marching into battle or marching out of a pub.', price: 50 },
      { name: 'Smallpipes', desc: 'A quieter, indoor version bellows-blown rather than mouth-blown. Still quite loud.', price: 35 },
      { name: 'Goat-Bladder Pipes', desc: 'A rustic version using an actual goat stomach as the air bag. Sounds and smells authentic.', price: 15 },
      { name: 'Dwarven Forge-Pipes', desc: 'Metal pipes that produce a deep, industrial drone. Played during stone-cutting ceremonies.', price: 80 },
      { name: 'Ghoul-Gut Pipes', desc: 'The air bag is sewn from undead organs. Inflating it smells of the grave.', price: 120 },
      { name: 'Bone-Chanter Pipes', desc: 'The chanter tubes are hollowed arm bones decorated with tribal runework.', price: 95 },
      { name: 'Execution-March Pipes', desc: 'Played to drown out the weeping of those walking their last steps to the block.', price: 65 },
      { name: 'Grave-Soil Pipes', desc: 'The tartan covering is stained with crypt clay that no amount of washing removes.', price: 40 },
      { name: 'Blood-Stained Highland Bag', desc: 'Carried by a piper who was speared mid-charge. The bloodstain is a badge of honor.', price: 60 },
      { name: 'Plague-Doctor\'s Bellows', desc: 'Pumps miasma-clearing incense from the drone pipes. Sounds awful, smells medicinal.', price: 110 },
      { name: 'Cultist\'s Screech-Bag', desc: 'The drone sounds like three people screaming in unison. Banned in most cities.', price: 150 },
      { name: 'Madman\'s Squeeze', desc: 'The bag leaks and shrieks without warning. Startles the player more than the audience.', price: 25 },
      { name: 'Sinner\'s Moan', desc: 'A cursed instrument that sounds like a chorus of the damned. Unbearable past midnight.', price: 180 },
      { name: 'Deserter\'s Deflated Bag', desc: 'Slashed open by a furious general after a missed cue. Wheezes more than it plays.', price: 10 },
      { name: 'Bog-Beast Pipes', desc: 'Built from swamp-horror parts. Playing it makes the surrounding air feel damp and cold.', price: 130 }
    ]
  },

  // ==========================================
  // PERCUSSION INSTRUMENTS
  // ==========================================
  {
    id: 'war_drum',
    name: 'War Drum',
    category: 'Percussion',
    proficiencyRequired: false,
    basePrice: 15,
    description: 'A large, booming drum designed to set the pace of marching armies and strike fear into opponents.',
    variants: [
      { name: 'Field Drum', desc: 'Standard military issue, strapped to the waist. Keeps soldiers in step.', price: 15 },
      { name: 'Tribal War Drum', desc: 'A massive, hide-covered log requiring two hands. The heartbeat of the warband.', price: 30 },
      { name: 'Thunder Drum', desc: 'Enchanted hide that produces a concussive boom capable of stunning nearby enemies.', price: 200 },
      { name: 'Troll-Skull Drum', desc: 'Stretched over a gargantuan skull. Produces a hollow, alien resonance.', price: 40 },
      { name: 'Siege Drum', desc: 'A cart-mounted behemoth beaten with tree-trunk mallets. Announces the doom of cities.', price: 100 },
      { name: 'Sailor\'s Drum', desc: 'A compact, waterproof drum used to coordinate rowing crews on galley ships.', price: 20 },
      { name: 'Flayed-Man\'s Drum', desc: 'The taut playing surface still shows a faded human tattoo beneath the varnish.', price: 120 },
      { name: 'Grave-Warden\'s Thumper', desc: 'An iron-banded drum used to signal lockdowns when a crypt seal breaks.', price: 60 },
      { name: 'Blood-Caked Drumhead', desc: 'Dried blood on the surface muffles each strike into a sick, wet thud.', price: 25 },
      { name: 'Execution-Block Drum', desc: 'Struck once at the exact moment the axe falls. One beat per condemned soul.', price: 75 },
      { name: 'Plague-Cart Drum', desc: 'A slow, monotonous instrument that heralds the daily corpse collection rounds.', price: 45 },
      { name: 'Cultist\'s Flesh-Tom', desc: 'Beaten during midnight sacrifices to drown out the screaming.', price: 85 },
      { name: 'Madman\'s Tapper', desc: 'Covered in erratic knife holes that ruin the resonance. Looks terrifying.', price: 15 },
      { name: 'Sinner\'s Heart-Beat', desc: 'Enchanted to synchronize its rhythm with the panicked heartbeats of nearby foes.', price: 150 },
      { name: 'Iron-Bound Barrel-Drum', desc: 'A rusted iron barrel struck with a sledgehammer. Crude but deafening.', price: 55 }
    ]
  },
  {
    id: 'tambourine',
    name: 'Tambourine',
    category: 'Percussion',
    proficiencyRequired: false,
    basePrice: 5,
    description: 'A small frame drum with metal jingles. Shaken, struck, or rattled to add rhythm to any performance.',
    variants: [
      { name: 'Street Performer\'s Tambourine', desc: 'Dented, bent, and missing half its jingles. Still gets the crowd clapping.', price: 2 },
      { name: 'Temple Tambourine', desc: 'Brass jingles and a painted frame depicting a sun deity. Used in worship dances.', price: 15 },
      { name: 'Silver-Belled Tambourine', desc: 'Tiny silver bells replace the standard metal discs. Produces a shimmering tone.', price: 60 },
      { name: 'Festival Tambourine', desc: 'Wrapped in ribbons and painted with flowers. Standard issue at harvest festivals.', price: 8 },
      { name: 'Bone-Rattle Tambourine', desc: 'Metal jingles replaced with cleaned finger bones. Produces a dry, clicking rattle.', price: 45 },
      { name: 'Grave-Robber\'s Shaker', desc: 'Used as a silent collection plate while slinking through sleeping taverns at night.', price: 10 },
      { name: 'Executioner\'s Coin-Tray', desc: 'A bloodied tambourine passed through the crowd to collect tips after a beheading.', price: 35 },
      { name: 'Cult-Dancer\'s Hoop', desc: 'Laced with tiny razor blades that cut the dancer\'s palms during frenzied rituals.', price: 80 },
      { name: 'Plague-Doctor\'s Rattle', desc: 'Shaken to scatter rats in quarantine zones. Reeks of vinegar and camphor.', price: 25 },
      { name: 'Blood-Soaked Frame', desc: 'The hide is warped and softened from prolonged exposure to spilled gore.', price: 5 },
      { name: 'Deserter\'s Tin-Pan', desc: 'A flattened army mess-tin punched with holes and strung with washers.', price: 3 },
      { name: 'Madman\'s Jingle', desc: 'Every bell has been crushed shut with pliers. Shaking it produces dead silence.', price: 12 },
      { name: 'Sinner\'s Tinkle', desc: 'Said to cause holy water to steam and curdle when shaken near a font.', price: 120 },
      { name: 'Iron-Spiked Hoop', desc: 'Ringed with rusty spikes. Doubles as a weapon when slammed into a face.', price: 50 },
      { name: 'Ashen Tambourine', desc: 'Coated in cremation ash that refuses to wash off. Leaves gray prints on skin.', price: 65 }
    ]
  },
  {
    id: 'hand_drum',
    name: 'Hand Drum',
    category: 'Percussion',
    proficiencyRequired: false,
    basePrice: 8,
    description: 'A portable, single-headed drum played with bare hands. Common across countless cultures.',
    variants: [
      { name: 'Djembe', desc: 'A goblet-shaped drum producing a wide range of tones from bass thuds to sharp slaps.', price: 12 },
      { name: 'Bodhran', desc: 'A flat, wide drum played with a short stick. The heartbeat of highland music.', price: 10 },
      { name: 'Tabla Set', desc: 'A pair of tuned drums played with fingertips for complex, intricate rhythms.', price: 25 },
      { name: 'Shamanistic Drum', desc: 'Painted with spirit symbols. Tribal shamans use it to induce trance states.', price: 40 },
      { name: 'Tavern Bongo', desc: 'Tiny paired drums that produce bright rhythms. Perfect for dancing.', price: 8 },
      { name: 'Flayed-Face Drum', desc: 'Highly illegal. The stretched hide bears unmistakable human facial features.', price: 180 },
      { name: 'Bone-Rimmed Hand-Drum', desc: 'The wooden rim is reinforced with sharpened predator teeth from the deep swamps.', price: 65 },
      { name: 'Grave-Soil Beater', desc: 'Permanently stained dark brown from years of use by unwashed gravediggers.', price: 20 },
      { name: 'Executioner\'s Pulse', desc: 'Played behind the scaffold. The slow beat mimics a condemned man\'s heartbeat.', price: 55 },
      { name: 'Cultist\'s Blood-Drum', desc: 'Must be smeared with fresh blood before each use to achieve the correct tension.', price: 110 },
      { name: 'Plague-Ward Drum', desc: 'A flat, toneless hide used solely to bang on quarantine doors during sweeps.', price: 15 },
      { name: 'Madman\'s Tapper', desc: 'The player beats it with their own forehead. A permanent dent confirms regular use.', price: 30 },
      { name: 'Iron-Cast Hand-Drum', desc: 'Forged from cast iron. Playing it bare-handed breaks knuckles within minutes.', price: 85 },
      { name: 'Sinner\'s Confession-Drum', desc: 'Each slap reportedly echoes with the crack of a penitent\'s lash on bare flesh.', price: 140 },
      { name: 'Deserter\'s Helmet-Drum', desc: 'A dented army helmet wrapped in stolen mule hide. Desperate improvisation.', price: 12 }
    ]
  },
  {
    id: 'gong',
    name: 'Gong',
    category: 'Percussion',
    proficiencyRequired: false,
    basePrice: 40,
    description: 'A large, suspended metal disc struck with a heavy mallet. Used for ceremonies, signals, and intimidation.',
    variants: [
      { name: 'Temple Gong', desc: 'A massive bronze disc that announces prayer times. Its tone lingers for minutes.', price: 50 },
      { name: 'Alarm Gong', desc: 'A sharp, piercing gong mounted near castle gates to signal attacks.', price: 30 },
      { name: 'Singing Bowl', desc: 'A small, hand-held bowl that hums with a sustained, meditative tone when rubbed.', price: 20 },
      { name: 'Abyssal-Scale Gong', desc: 'Forged from a leviathan\'s scale. Its vibration causes nausea in the weak-willed.', price: 800 },
      { name: 'Execution-Yard Gong', desc: 'A rusted iron plate struck once per hanging. The tone is flat and final.', price: 90 },
      { name: 'Grave-Warden\'s Bell-Plate', desc: 'Produces a somber, dead thud that fails to echo through damp tomb corridors.', price: 65 },
      { name: 'Blood-Soaked Gong', desc: 'Coated in dried viscera that muffles the sound into a sickening wet smack.', price: 45 },
      { name: 'Plague-Quarter Signal', desc: 'Hammered to warn citizens that the corpse-burning pyres have been lit again.', price: 110 },
      { name: 'Cultist\'s Fear-Plate', desc: 'The warped metal screams when struck, triggering panic in nearby listeners.', price: 150 },
      { name: 'Sinner\'s Wailing-Gong', desc: 'Forged from the melted-down iron maidens of a condemned inquisition chamber.', price: 250 },
      { name: 'Madman\'s Resonance', desc: 'The mallet is chained to the ringer\'s wrist. Removal requires a surgeon.', price: 75 },
      { name: 'Shield-Gong', desc: 'A battle-scarred tower shield hung from a beam by butcher\'s chains.', price: 40 },
      { name: 'Bone-Strike Gong', desc: 'Struck only with an unidentifiable femur wrapped in stained burial cloth.', price: 130 },
      { name: 'Cursed Copper-Gong', desc: 'Rumored to shorten the ringer\'s lifespan by a day with each strike.', price: 300 },
      { name: 'Deserter\'s Warning', desc: 'A cracked slab of warped scrap metal used to signal chaotic retreats.', price: 25 }
    ]
  },

  // ==========================================
  // KEYBOARD INSTRUMENTS
  // ==========================================
  {
    id: 'harpsichord',
    name: 'Harpsichord',
    category: 'Keyboard',
    proficiencyRequired: true,
    basePrice: 500,
    description: 'A plucked-string keyboard instrument found exclusively in noble courts and grand chapels.',
    variants: [
      { name: 'Virginal', desc: 'A small, tabletop harpsichord suitable for private chambers. Delicate and intimate.', price: 200 },
      { name: 'Double-Manual Harpsichord', desc: 'Two keyboards offering a wide dynamic range. A centerpiece of any great hall.', price: 1500 },
      { name: 'Portable Spinet', desc: 'A triangular, single-keyboard instrument light enough for two servants to carry.', price: 300 },
      { name: 'Defiled Court Harpsichord', desc: 'Once gilded with gold leaf, now smashed and vandalized by starving peasant mobs.', price: 450 },
      { name: 'Bone-Keyed Harpsichord', desc: 'Every white key is carved from polished human bone. The touch is unnervingly warm.', price: 2500 },
      { name: 'Blood-Wood Spinet', desc: 'The mahogany casing weeps a sticky red sap that stains anything it touches.', price: 1800 },
      { name: 'Executioner\'s Organ', desc: 'A massive contraption operated via chains and levers. Requires brute strength to play.', price: 3500 },
      { name: 'Cult-Choir Harpsichord', desc: 'Tuned to unsettling microtones that induce nosebleeds in prolonged listeners.', price: 2800 },
      { name: 'Grave-Robber\'s Box', desc: 'Hollowed out entirely. The keyboard is a false lid concealing a corpse-sized cavity.', price: 900 },
      { name: 'Madman\'s Piano', desc: 'Every string inside is snapped. The player pounds dead keys in absolute silence.', price: 150 },
      { name: 'Plague-Doctor\'s Hymn-Box', desc: 'Fumigant incense billows from beneath the keys with every note pressed.', price: 3000 },
      { name: 'Sinner\'s Confession-Board', desc: 'Iron keys that strip skin from the fingertips after a few minutes of playing.', price: 2100 },
      { name: 'Ashen Court Cembalo', desc: 'Survived a castle fire. Charred black and permanently smells of smoke and death.', price: 1200 },
      { name: 'Deserter\'s Barricade', desc: 'Tipped over and studded with iron nails. Used to block a door, not make music.', price: 100 },
      { name: 'Vampire\'s Harpsichord', desc: 'Impossibly ancient, untouched by dust, and ice-cold to the touch even in summer.', price: 5000 }
    ]
  },

  // ==========================================
  // TOOL PROFICIENCIES
  // ==========================================
  {
    id: 'thieves_tools',
    name: 'Thieves\' Tools',
    category: 'Tool',
    proficiencyRequired: true,
    basePrice: 25,
    description: 'A set of picks, wrenches, and tension bars for bypassing locks and disarming mechanical traps.',
    variants: [
      { name: 'Apprentice Lockpicks', desc: 'Crude brass picks that bend easily. Good enough for simple padlocks.', price: 10 },
      { name: 'Guild-Issue Set', desc: 'Professional-grade steel tools in a silent leather roll. Standard for licensed rogues.', price: 25 },
      { name: 'Masterwork Picks', desc: 'Diamond-tipped picks and custom-ground tension bars. For the finest vaults.', price: 100 },
      { name: 'Improvised Kit', desc: 'A bent hairpin, a rusted nail, and raw talent. Surprisingly effective.', price: 2 },
      { name: 'Grave-Robber\'s Set', desc: 'Heavy iron crowbars for snapping rusted crypt padlocks. Subtlety not included.', price: 40 },
      { name: 'Bone-Pick Set', desc: 'Carved from monster bone to avoid metal-detection wards. Disturbingly organic.', price: 85 },
      { name: 'Assassin\'s Entry Kit', desc: 'The thickest tension wrench doubles as a stiletto. Multi-purpose lethality.', price: 150 },
      { name: 'Blood-Stained Picks', desc: 'Slippery and ruined. Pulled from the crushed hands of a failed trap-breaker.', price: 15 },
      { name: 'Cultist\'s Infiltration Kit', desc: 'Each tool doubles as a small, barbed sacrificial implement. Jagged and cursed.', price: 75 },
      { name: 'Madman\'s Lock-Buster', desc: 'A small iron sledgehammer and a vial of volatile acid. No finesse required.', price: 55 },
      { name: 'Sinner\'s Cell-Keys', desc: 'A ring of copied dungeon keys. Possession alone warrants immediate execution.', price: 120 },
      { name: 'Execution-Block Picks', desc: 'Tucked in a condemned man\'s boot. Useless once the blade falls.', price: 5 },
      { name: 'Sewer-Rat\'s Tools', desc: 'Filthy and corroded. Any scratch from these guarantees a festering infection.', price: 20 },
      { name: 'Plague-Ward Bypasser', desc: 'Includes thick leather gauntlets to avoid touching contaminated doorknobs.', price: 65 },
      { name: 'Silent Entry Kit', desc: 'Padded handles and dampened mechanisms for absolute stealth operations.', price: 75 }
    ]
  },
  {
    id: 'tinkers_tools',
    name: 'Tinker\'s Tools',
    category: 'Tool',
    proficiencyRequired: true,
    basePrice: 50,
    description: 'An assortment of small pliers, files, hammers, and magnifying lenses for intricate mechanical work.',
    variants: [
      { name: 'Basic Repair Kit', desc: 'Enough to fix a broken buckle or straighten a bent hinge. Nothing more.', price: 20 },
      { name: 'Gnomish Precision Set', desc: 'Tiny tools for clockwork and automata repair. Comes with a magnifying monocle.', price: 120 },
      { name: 'Field Repair Kit', desc: 'A compact, belt-worn toolkit for emergency gear repairs on the road.', price: 35 },
      { name: 'Siege Engineer\'s Tools', desc: 'Heavy wrenches and hammers for assembling and maintaining siege weaponry.', price: 80 },
      { name: 'Inquisitor\'s Toolkit', desc: 'Delicate files and precise clamps repurposed for extracting confessions.', price: 150 },
      { name: 'Grave-Digger\'s Maintenance', desc: 'Massive files designed for sharpening iron shovels and heavy picks.', price: 40 },
      { name: 'Executioner\'s Grindstone', desc: 'A portable sharpening stone permanently caked in dried, blackened blood.', price: 65 },
      { name: 'Bone-Crafter\'s Set', desc: 'Specialized for carving, bleaching, and setting small human bones into jewelry.', price: 90 },
      { name: 'Plague-Doctor\'s Scalpels', desc: 'Standard screwdrivers replaced with rusted surgical tools meant for lancing buboes.', price: 110 },
      { name: 'Cultist\'s Alteration Kit', desc: 'Includes small branding irons and barbed wire for modifying weapons to cause pain.', price: 130 },
      { name: 'Blood-Stained Pliers', desc: 'The grip is permanently ruined by a thick layer of congealed, blackened gore.', price: 25 },
      { name: 'Madman\'s Workbench', desc: 'Contains bent spoons, snapped twigs, and rusted nails. Useless to the sane.', price: 5 },
      { name: 'Sinner\'s Repair-Box', desc: 'Filled with salvaged torture-chamber debris recycled into crude hand-tools.', price: 70 },
      { name: 'Deserter\'s Quick-Patch', desc: 'A roll of stolen, frayed twine and a dull, rusted knife. Bare minimum.', price: 8 },
      { name: 'Ashen Mechanism Kit', desc: 'Everything is coated in thick soot, rescued from a burned-down workshop.', price: 55 }
    ]
  },
  {
    id: 'calligraphers_supplies',
    name: 'Calligrapher\'s Supplies',
    category: 'Tool',
    proficiencyRequired: true,
    basePrice: 10,
    description: 'Inks, quills, parchment, and sealing wax for producing formal documents and arcane scrolls.',
    variants: [
      { name: 'Scribe\'s Kit', desc: 'Basic ink, a bundle of quills, and rough parchment. Functional but unimpressive.', price: 5 },
      { name: 'Illuminator\'s Set', desc: 'Gold leaf, fine brushes, and pigments for decorating manuscripts with borders.', price: 40 },
      { name: 'Scroll-Scribe\'s Tools', desc: 'Enchanter\'s ink and treated vellum designed for spell-scroll production.', price: 80 },
      { name: 'Forger\'s Kit', desc: 'Multiple ink colors, seal molds, and reference documents for producing fakes.', price: 60 },
      { name: 'Blood-Ink Set', desc: 'The inkwell requires fresh, warm arterial blood to write. Necromancer standard.', price: 150 },
      { name: 'Cultist\'s Grimoire Supplies', desc: 'Features cured human-skin parchment and quills carved from finger bones.', price: 200 },
      { name: 'Inquisitor\'s Confession Kit', desc: 'Includes blood-red sealing wax and pre-formatted death warrants.', price: 120 },
      { name: 'Execution-Order Pen', desc: 'A massive raven feather permanently stained black with congealed ink and gore.', price: 75 },
      { name: 'Plague-Doctor\'s Quarantine Seals', desc: 'Red wax stamps used to mark condemned, infected plague houses.', price: 45 },
      { name: 'Grave-Robber\'s Map-Kit', desc: 'Features waterproof ink for mapping flooded underground crypts and tunnels.', price: 65 },
      { name: 'Deserter\'s Forgery', desc: 'Sloppy scribbles on cheap paper meant to fake military orders under duress.', price: 30 },
      { name: 'Madman\'s Charcoal', desc: 'No quills. Just burned sticks used to scrawl frantic prophecies on walls.', price: 8 },
      { name: 'Sinner\'s Penitence Kit', desc: 'The user must write with caustic, acid-laced ink that blisters the fingers.', price: 95 },
      { name: 'Bone-Dust Vellum', desc: 'The paper feels like coarse sandpaper. Ink sinks deep and never fully dries.', price: 110 },
      { name: 'Ashen Scroll-Case', desc: 'Contains charred, partially destroyed documents salvaged from a great fire.', price: 20 }
    ]
  },
  {
    id: 'cartographers_tools',
    name: 'Cartographer\'s Tools',
    category: 'Tool',
    proficiencyRequired: true,
    basePrice: 15,
    description: 'Compasses, rulers, inks, and vellum for surveying terrain and producing accurate maps.',
    variants: [
      { name: 'Field Survey Kit', desc: 'A compact leather case with a compass, protractor, and blank map sheets.', price: 15 },
      { name: 'Master Cartographer\'s Set', desc: 'Precision instruments for producing navigation-grade charts and city plans.', price: 80 },
      { name: 'Dungeon Mapper\'s Kit', desc: 'Waterproof ink, glow-chalk, and gridded parchment for charting underground.', price: 30 },
      { name: 'Naval Chart Set', desc: 'Tide tables, astrolabe, and maritime vellum for open-ocean navigation.', price: 60 },
      { name: 'Grave-Robber\'s Depths-Chart', desc: 'Features depth-plumb lines woven from braided human hair. Disturbingly precise.', price: 95 },
      { name: 'Blood-Tracker\'s Compass', desc: 'An enchanted needle that swings toward the nearest source of fresh blood.', price: 150 },
      { name: 'Cultist\'s Ley-Line Rule', desc: 'Carved with unholy geometries for locating dark-magic nexus points.', price: 120 },
      { name: 'Inquisitor\'s District Map', desc: 'Details the exact locations of every torture chamber and holding cell in the city.', price: 85 },
      { name: 'Plague-Mapper\'s Kit', desc: 'Used to draw red crosses over infected districts. Includes quarantine stamps.', price: 65 },
      { name: 'Execution-Path Protractor', desc: 'Measures the exact marching distance from the cell to the scaffold. Grim work.', price: 45 },
      { name: 'Madman\'s Labyrinth Chart', desc: 'Endless spirals drawn in blood on crumpled vellum. Possibly a real map.', price: 25 },
      { name: 'Deserter\'s Evasion Guide', desc: 'Features erased patrol routes and hidden paths through the countryside.', price: 50 },
      { name: 'Bone-Carved Calipers', desc: 'The metal measuring arms are replaced with sharpened rib bones. Functional.', price: 110 },
      { name: 'Sinner\'s Descent Map', desc: 'Claims to chart the literal path to the underworld. Unverified but popular.', price: 200 },
      { name: 'Ashen Topography Kit', desc: 'Instruments used to survey the charred ruins of destroyed, burned cities.', price: 75 }
    ]
  }
];
