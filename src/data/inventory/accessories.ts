import type { VariantDef } from './types';

/**
 * A wearable non-armor item such as rings, amulets, or cloaks.
 * Accessories occupy specific equipment slots and may provide
 * passive stat bonuses or cosmetic effects.
 */

export type AccessoryEffect = {
    stat: string;
    value: number;
    type: 'flat' | 'percent';
};

export interface AccessoryDef {
    id: string;
    name: string;
    slot: 'NECK' | 'RING' | 'WAIST' | 'EAR';
    icon: string;
    weight: number;
    effect: AccessoryEffect;
    durability: number;
    variants: VariantDef[];
}

/** Standard accessories available from merchants. */
export const ACCESSORIES: AccessoryDef[] = [
    {
        id: 'ring',
        name: 'Ring',
        slot: 'RING',
        icon: 'GiRing',
        weight: 0.1,
        effect: { stat: 'luck', value: 2, type: 'flat' },
        durability: 80,
        variants: [
            { name: 'Iron Loop', desc: 'A crude, heavy band forged from cold iron, smelling faintly of old blood.' },
            { name: 'Bone Coil', desc: 'Carved from a human finger bone, worn smooth by anxious rubbing.' },
            { name: 'Widow\'s Knot', desc: 'Braided widow\'s hair encased in brittle, yellowed resin.' },
            { name: 'Verdigris Ring', desc: 'Copper turned a sickly green, leaving a pale poison-burn on the skin.' },
            { name: 'Obsidian Band', desc: 'A lightless black stone that feels unnaturally cold against the flesh.' },
            { name: 'Bramble Twine', desc: 'Hardened briar thorns twisted into a ring; it bites the wearer when lied to.' },
            { name: 'Gilded Knuckle', desc: 'A hollow gold ring designed to hold a single drop of potent wyvern venom.' },
            { name: 'Oath-Breaker\'s Iron', desc: 'Melted and scarred iron, forcefully branded onto the finger of a traitor.' },
            { name: 'Spider-Silk Thread', desc: 'Woven threads of a tomb-spider, incredibly strong and sticky to the touch.' },
            { name: 'Lover\'s Lament', desc: 'Two intertwining bands of silver and iron, one of which is deeply rusted.' },
            { name: 'Shattered Glass Hoop', desc: 'Re-fused arcane glass that faintly hums with unpredictable, unstable mana.' },
            { name: 'Grave-Robber\'s Prize', desc: 'A gaudy, gem-encrusted loop still attached to a shriveled mummified finger.' },
            { name: 'Ashen Circlet', desc: 'Forged from compressed volcanic ash that leaves black soot on everything it touches.' },
            { name: 'Serpent\'s Bite', desc: 'A bronze snake eating its own tail; its jewel eyes seem to track movement.' },
            { name: 'Rust-Eaten Band', desc: 'Corroded steel that constantly flakes away, yet the ring itself never diminishes in size.' }
        ]
    },
    {
        id: 'amulet',
        name: 'Amulet',
        slot: 'NECK',
        icon: 'GiGemPendant',
        weight: 0.5,
        effect: { stat: 'resistance', value: 5, type: 'percent' },
        durability: 60,
        variants: [
            { name: 'Tarnished Locket', desc: 'Contains a miniature portrait whose face has been violently scratched out.' },
            { name: 'Bleeding Heart', desc: 'A raw ruby encased in spiked iron; it pulses slightly in absolute silence.' },
            { name: 'Choker of the Hanged', desc: 'A rough hempen cord salvaged from a gallows rope, smelling of desperation.' },
            { name: 'Moonstone Teardrop', desc: 'A pale, milky stone that weeps actual condensation during a full moon.' },
            { name: 'Blackened Prism', desc: 'A shattered crystal that fractures light into unsettling, geometry-defying colors.' },
            { name: 'Cursed Coin', desc: 'A defaced gold piece from a dead empire, notorious for bringing financial ruin.' },
            { name: 'Glass Eye Pendant', desc: 'A preserved eye suspended in amber that always settles to look directly at the wearer.' },
            { name: 'Beggar\'s Medallion', desc: 'A wooden disc etched with the vagabond signs for safe harbor and plague.' },
            { name: 'Vampire\'s Vial', desc: 'A sealed crystal teardrop containing a single suspended drop of impossibly red blood.' },
            { name: 'Hollow Silver Egg', desc: 'Rattles faintly when shaken, but no seam exists to open it.' },
            { name: 'Onyx Scarab', desc: 'A stone beetle that feels unnervingly warm and occasionally twitches on its chain.' },
            { name: 'Woven Sinew Choker', desc: 'Surgically braided muscle cord from an unknown beast; uncomfortably warm.' },
            { name: 'Drowned Sailor\'s Pearl', desc: 'A mottled black pearl smelling strongly of brine and deep-ocean rot.' },
            { name: 'Clockwork Heart', desc: 'A ticking brass contraption that beats out of rhythm with the wearer\'s own pulse.' },
            { name: 'Petrified Magnolia', desc: 'A flawless bloom turned instantly to stone; reeks of powerful transmutative magic.' }
        ]
    },
    {
        id: 'signet',
        name: 'Signet',
        slot: 'RING',
        icon: 'GiRing',
        weight: 0.2,
        effect: { stat: 'persuasion', value: 3, type: 'flat' },
        durability: 100,
        variants: [
            { name: 'Usurper\'s Seal', desc: 'A fractured ruby signet belonging to the deposed king, carrying a deadly bounty.' },
            { name: 'Inquisitor\'s Brand', desc: 'A heavy iron ring engineered to heat up and brand heretics during interrogations.' },
            { name: 'Thief-Master\'s Mark', desc: 'A subtle, polished obsidian ring worn by the unspoken leaders of the shadow guilds.' },
            { name: 'Exiled Noble\'s Crest', desc: 'A gold signet of a disgraced house, deliberately defaced by a royal hammer.' },
            { name: 'Cultist\'s Cipher', desc: 'An intricate bronze ring that acts as a physical key to decipher forbidden grimoires.' },
            { name: 'Executioner\'s Right', desc: 'A brutal steel ring proving the bearer has lawful sanction to end human lives.' },
            { name: 'Corrupt Magistrate\'s Seal', desc: 'Smells of sealing wax and bribes; used to validate countless fraudulent deeds.' },
            { name: 'Necromancer\'s Mark', desc: 'A signet of carved bone that leaves an impression of frost rather than wax.' },
            { name: 'Smuggler\'s Coin-Ring', desc: 'Looks like a flattened foreign copper coin, used as a recognition signal.' },
            { name: 'Fallen Paladin\'s Crest', desc: 'A holy seal now inverted and marred by corrupted, weeping metallic veins.' },
            { name: 'Plague-Doctor\'s Pass', desc: 'A brass signet granting the bearer unhindered access to quarantined districts.' },
            { name: 'Merchant Prince\'s Ruby', desc: 'An ostentatious, massive gem symbolising enough wealth to buy a small town.' },
            { name: 'Assassin\'s Promise', desc: 'A razor-edged ring used to sever the throat while maintaining an illusion of a caress.' },
            { name: 'Vampire Sire\'s Seal', desc: 'A blood-iron crest used to mark thralls; holding it induces a craving for copper.' },
            { name: 'Forgotten God\'s Emblem', desc: 'A rusted signet bearing a blasphemous holy symbol; looking at it causes migraines.' }
        ]
    },
    {
        id: 'relic',
        name: 'Relic',
        slot: 'NECK',
        icon: 'GiGemPendant',
        weight: 1.0,
        effect: { stat: 'lore', value: 5, type: 'flat' },
        durability: 40,
        variants: [
            { name: 'Saint\'s Severed Finger', desc: 'A gilded digit strung on catgut, purportedly belonging to a martyred, flayed saint.' },
            { name: 'Martyr\'s Jawbone', desc: 'A fragment of bone etched with prayers, clattering softly against armor.' },
            { name: 'Tear of the Weeping Virgin', desc: 'A crystal vial said to contain a divine tear; it slowly turns to blood in darkness.' },
            { name: 'Blood-Stained Shroud', desc: 'A tightly rolled scrap of burial linen taken from a resurrected prophet\'s tomb.' },
            { name: 'Nail of the Penitent', desc: 'A massive, rusted iron spike pulled from the hands of a crucified savior.' },
            { name: 'Heretic\'s Tongue', desc: 'A preserved, blackened tongue nailed to a wooden placard worn around the neck.' },
            { name: 'Ashes of the First Flame', desc: 'A small glass urn containing soot that is permanently, searingly hot to the touch.' },
            { name: 'Prophet\'s Blindfold', desc: 'A filth-crusted strip of cloth that grants terrible, unwanted visions when worn.' },
            { name: 'Bone Flute', desc: 'A hollowed human tibia worn on a cord; playing it supposedly summons local spirits.' },
            { name: 'Petrified Dragon Scale', desc: 'A jagged, obsidian-like scale that pulses with localized volcanic heat.' },
            { name: 'Tress of the Drowned Queen', desc: 'A braid of damp, impossibly cold hair that never dries out.' },
            { name: 'Scroll of Excommunication', desc: 'A miniature scroll case bearing a curse that condemns the wearer\'s soul to the void.' },
            { name: 'Angel\'s Pinion', desc: 'A single, razor-sharp metallic feather dropped during a celestial war.' },
            { name: 'Demon\'s Horn', desc: 'A chipped, obsidian horn fragment that whispers atrocious suggestions to the wearer.' },
            { name: 'Fragment of the Tablets', desc: 'A chunk of stone bearing unrecognizable, glowing script that hurts the eyes to read.' }
        ]
    },
    {
        id: 'fetish',
        name: 'Fetish',
        slot: 'NECK',
        icon: 'GiGemPendant',
        weight: 0.3,
        effect: { stat: 'menace', value: 3, type: 'flat' },
        durability: 50,
        variants: [
            { name: 'Gargoyle Talisman', desc: 'A heavy granite carving that feels heavier when shadows grow long.' },
            { name: 'Moth-Eaten Scapular', desc: 'Woven religious emblems that smell heavily of damp earth and rot.' },
            { name: 'Crow Skull Choker', desc: 'A blackened avian skull threaded on raven feathers and dried sinew.' },
            { name: 'Witch\'s Twig Bundle', desc: 'Twigs, teeth, and hair bound in blood-stained leather, smelling of swamp water.' },
            { name: 'Toadstone Amulet', desc: 'A calcified mass supposedly taken from a toad\'s head, believed to weep near poison.' },
            { name: 'Shrunken Head', desc: 'A rat\'s head, magically shrunken and preserved, its tiny mouth sewn perfectly shut.' },
            { name: 'Grave-Dirt Pouch', desc: 'A small leather sack of cemetery soil; it moans faintly when the dead are near.' },
            { name: 'Hangman\'s Knot', desc: 'A complex knot tied from gallows rope, said to protect the wearer from suffocation.' },
            { name: 'Beast\'s Heart', desc: 'The dried, hardened heart of a dire wolf impaled on a silver chain.' },
            { name: 'Totem of Rot', desc: 'A wooden carving of a fat fly, constantly buzzing with an imperceptible vibration.' },
            { name: 'Snake-Skin Sash', desc: 'Molted scales of a massive basilisk, granting an illusion of unblinking confidence.' },
            { name: 'Voodoo Effigy', desc: 'A crude burlap doll with a rusted needle driven explicitly through its left eye.' },
            { name: 'Boar-Tusk Pendant', desc: 'Slightly chipped tusks inscribed with crude, bloody runes of vitality.' },
            { name: 'River-Hag\'s Eye', desc: 'A perfectly spherical river stone painted to resemble a malicious, slit-pupil eye.' },
            { name: 'Chitinous Charm', desc: 'The armored claw of an unidentifiable insectoid aberration, bound in copper wire.' }
        ]
    },

    {
        id: 'belt_charm',
        name: 'Belt Charm',
        slot: 'WAIST',
        icon: 'GiBeltArmor',
        weight: 0.3,
        effect: { stat: 'endurance', value: 2, type: 'flat' },
        durability: 70,
        variants: [
            { name: 'Traveler\'s Buckle', desc: 'A dented brass buckle scored with crude road-maps of forgotten highways.' },
            { name: 'Warden\'s Lock', desc: 'A heavy iron locking device that clicks ominously when tightened.' },
            { name: 'Bone-Hook Clasp', desc: 'Carved from the jawbone of some unidentifiable predator.' },
            { name: 'Smuggler\'s Coin-Belt', desc: 'Hollow brass rings containing tiny rolled parchment messages.' },
            { name: 'Executioner\'s Chain', desc: 'Links of heavy iron humming with the residual dread of the condemned.' },
            { name: 'Plague-Ward Sash', desc: 'Herb-stuffed fabric tied at the waist to repel disease miasma.' },
            { name: 'Grave-Digger\'s Cord', desc: 'A rope belt knotted once for every body interred by the wearer.' },
            { name: 'Famine-Strap', desc: 'Pulled painfully tight to suppress the gnawing ache of starvation.' },
            { name: 'Cultist\'s Cincture', desc: 'Woven from human hair, allegedly from willing sacrificial offerings.' },
            { name: 'Mercenary\'s Tally', desc: 'Decorated with small metal tags, each stamped with a completed contract.' },
            { name: 'Serpent-Scale Band', desc: 'Scales from a swamp basilisk stitched to a leather strip.' },
            { name: 'Rat-Catcher\'s Cord', desc: 'Dangling rat tails serve as a grim advertisement of services rendered.' },
            { name: 'Inquisitor\'s Girdle', desc: 'Studded with tiny holy symbols, each representing a convicted heretic.' },
            { name: 'Beggar\'s Rope', desc: 'A frayed hempen cord that has served as belt, leash, and noose.' },
            { name: 'Iron-Vow Chain', desc: 'A self-imposed binding; removing it before the oath is fulfilled brings ruin.' }
        ]
    },
    {
        id: 'earring',
        name: 'Earring',
        slot: 'EAR',
        icon: 'GiEarring',
        weight: 0.05,
        effect: { stat: 'awareness', value: 2, type: 'flat' },
        durability: 60,
        variants: [
            { name: 'Iron Stud', desc: 'A crude metal spike jammed through the lobe, perpetually sore.' },
            { name: 'Pirate\'s Hoop', desc: 'A tarnished gold ring supposedly preventing seasickness and bad luck.' },
            { name: 'Bone Needle', desc: 'Sharpened fish-bone through the cartilage, a tribal warrior\'s mark.' },
            { name: 'Obsidian Drop', desc: 'A tear-shaped black stone that absorbs all light and feels unnaturally cold.' },
            { name: 'Raven\'s Claw', desc: 'A miniature silver talon dangling from a thin chain through the ear.' },
            { name: 'Blood-Crystal Stud', desc: 'A deep crimson gem that pulses faintly in time with the wearer\'s heartbeat.' },
            { name: 'Thief\'s Tell', desc: 'A small lock-pick cleverly disguised as an ornamental earring.' },
            { name: 'Witch\'s Hook', desc: 'A bent iron nail said to be pulled from a witch\'s coffin.' },
            { name: 'Slave\'s Tag', desc: 'A numbered brass disc, the mark of chattel, worn defiantly as a trophy.' },
            { name: 'Serpent Fang', desc: 'A preserved viper fang on a silver wire, still faintly venomous.' },
            { name: 'Moon-Silver Ring', desc: 'A pale metal hoop that glows softly during a full moon.' },
            { name: 'Tomb-Raider\'s Pearl', desc: 'A clouded pearl pried from a drowned queen\'s crown.' },
            { name: 'Executioner\'s Notch', desc: 'A small iron bar with file-marks for every life ended.' },
            { name: 'Plague-Glass Bead', desc: 'A hollow glass sphere containing a pinch of quarantine ashes.' },
            { name: 'Madman\'s Bell', desc: 'A minuscule silver bell that rings at frequencies only the wearer can hear.' }
        ]
    }
];
/** Rare and unusual trinkets with unique narrative properties. */
export const CURIOS: VariantDef[] = [
    { name: 'A shrunken, mummified hand', desc: 'The fingers are rigidly curled into a desperate, grasping claw.' },
    { name: 'A weeping stone', desc: 'A chunk of porous gray rock that constantly seeps salty, cold water.' },
    { name: 'A letter composed in blood', desc: 'The frantic handwriting begs for a forgiveness that clearly never came.' },
    { name: 'A soot-stained doll', desc: 'Salvaged from a burned orphanage; its glass eyes reflect no light.' },
    { name: 'An intricate brass clockwork eye', desc: 'Its gears spin frantically whenever a lie is spoken aloud.' },
    { name: 'A vial of graveyard dirt', desc: 'Taken from the freshly turned earth of an unmarked mass grave.' },
    { name: 'A key carved from human bone', desc: 'Its teeth perfectly match the locks of the city\'s oldest asylum.' },
    { name: 'A tarnished silver mirror', desc: 'Only reflects the viewer\'s face as it will appear on the day they die.' },
    { name: 'A rusted inquisitor\'s nail', desc: 'Still flaked with dried blood; hums softly when near arcane magic.' },
    { name: 'A child\'s wooden sword', desc: 'Deeply stained with genuine, old gore; a testament to a stolen innocence.' },
    { name: 'A leather-bound diary', desc: 'Every single page is filled with the exact same frantic sentence.' },
    { name: 'A cracked porcelain mask', desc: 'Smells of embalming fluid and refuses to stay wherever you put it down.' },
    { name: 'A jar of pickled slugs', desc: 'They twitch and writhe when thunder rolls in the distance.' },
    { name: 'A blackened coin', desc: 'Whenever flipped, it always lands perfectly balanced on its edge.' },
    { name: 'A hollowed raven\'s skull', desc: 'Whistles an eerily beautiful, melancholic tune when the wind blows through it.' }
];
