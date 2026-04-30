import type { VariantDef } from './types';

export type WeaponGroup = 'METAL' | 'WOOD';
export type DamageType = 'slashing' | 'piercing' | 'bludgeoning' | 'arcane';
export type AttackSpeed = 'very_slow' | 'slow' | 'normal' | 'fast' | 'very_fast';
export type WeaponReach = 'melee' | 'extended' | 'ranged';

/**
 * A melee or ranged weapon available for purchase or looting.
 * Weapons are categorized by type (sword, axe, bow, etc.) and
 * have base damage, weight, and optional special properties.
 */
export interface WeaponDef {
    id: string;
    name: string;
    variants: VariantDef[];
    handedness: '1H' | '2H';
    group: WeaponGroup;
    icon: string;
    validRoles: string[];
    weight: number;
    baseDamage: number;
    damageType: DamageType;
    attackSpeed: AttackSpeed;
    reach: WeaponReach;
    durability: number;
}

/** Master list of all purchasable weapons. */
export const WEAPONS: WeaponDef[] = [
    // ONE-HANDED MELEE
    {
        id: 'axe',
        name: 'Axe',
        variants: [
            { name: 'Hatchet', desc: 'A woodsman\'s tool repurposed for splitting skulls instead of kindling.' },
            { name: 'Bearded Axe', desc: 'The extended lower blade hooks behind shields, ripping them from terrified grips.' },
            { name: 'Tomahawk', desc: 'A compact throwing axe balanced for both melee butchery and lethal airborne strikes.' },
            { name: 'Broad Axe', desc: 'A wide crescent blade that removes limbs with horrifying surgical efficiency.' },
            { name: 'Cleaving Pick', desc: 'Half axe, half war-pick, designed to punch through plate and bury into bone.' },
            { name: 'Headsman\'s Hatchet', desc: 'The execution blade, nicked from a thousand severed spines.' },
            { name: 'Raider\'s Chopper', desc: 'Crude iron lashed to a haft with strips of bloodstained hide.' },
            { name: 'Butcher\'s Companion', desc: 'A market butcher\'s tool that saw more human meat than animal after the famine.' },
            { name: 'Grave-Iron Hatchet', desc: 'Forged from melted cemetery fencing, permanently stained with a greenish patina.' },
            { name: 'Bone-Splitter', desc: 'The wedge-shaped blade is specifically angled to crack femurs and expose marrow.' },
            { name: 'Pit-Fighter\'s Axe', desc: 'Lightweight and heavily chipped from countless arena bouts against condemned men.' },
            { name: 'Cultist\'s Cleaver', desc: 'Ritual symbols are acid-etched into the blade, still crusted with sacrificial residue.' },
            { name: 'Plague-Forged Hatchet', desc: 'The metal was quenched in corpse-water; the edge weeps a foul, thin liquid.' },
            { name: 'Defiled War-Axe', desc: 'Once a knight\'s ceremonial weapon, the heraldry has been violently hammered flat.' },
            { name: 'Rust-Eaten Felling Axe', desc: 'More tetanus risk than cutting edge, but the weight alone is devastating.' }
        ],
        handedness: '1H',
        group: 'METAL',
        icon: 'GiBattleAxe',
        validRoles: ['Warrior', 'Berserker', 'Barbarian', 'Mercenary', 'Lumberjack', 'Woodsman'],
        weight: 4,
        baseDamage: 14,
        damageType: 'slashing',
        attackSpeed: 'normal',
        reach: 'melee',
        durability: 90
    },
    {
        id: 'sword',
        name: 'Sword',
        variants: [
            { name: 'Arming Sword', desc: 'A knightly sidearm, the blade permanently notched by a hundred desperate parries.' },
            { name: 'Broadsword', desc: 'A wide, brutal blade smelling of oxidized iron and congealed gore.' },
            { name: 'Falchion', desc: 'A heavy, cleaver-like blade meant specifically for severing limbs in a single strike.' },
            { name: 'Messer', desc: 'A peasant\'s desperation weapon, crudely forced into the shape of a lethal sword.' },
            { name: 'Scimitar', desc: 'A sweeping, razor-sharp curve captured from a ruthless desert marauder.' },
            { name: 'Backsword', desc: 'The spine is incredibly thick, designed to batter through heavy plate armor.' },
            { name: 'Shortsword', desc: 'A brutal, close-quarters stabbing implement favored in trench warfare.' },
            { name: 'Saber', desc: 'A cavalryman\'s blade, the hilt still stained by the blood of running infantry.' },
            { name: 'Flayed-Iron Blade', desc: 'Forged from a dark, porous metal that constantly weeps a thin, oily rust.' },
            { name: 'Grave-Steel Sword', desc: 'Dug from a chieftain\'s barrow; completely blackened by centuries of damp earth.' },
            { name: 'Executioner\'s Short-Blade', desc: 'A heavy, squared-off sword intended for severing hands rather than heads.' },
            { name: 'Mercenary\'s Trust', desc: 'Pragmatic and totally unadorned, sporting a grip wrapped tightly in scavenged gut-string.' },
            { name: 'Cultist\'s Poniard', desc: 'Though sword-length, it is viciously serrated to maximize sacrificial bleeding.' },
            { name: 'Defiled Crusader Blade', desc: 'The holy etchings along the fuller have been violently hammered completely flat.' },
            { name: 'Plague-Forged Sword', desc: 'The steel was quenched in diseased blood; the edges perpetually exude a faint, sickly heat.' }
        ],
        handedness: '1H',
        group: 'METAL',
        icon: 'GiBroadsword',
        validRoles: ['Warrior', 'Paladin', 'Guard', 'Rogue', 'Mercenary', 'Knight'],
        weight: 3,
        baseDamage: 12,
        damageType: 'slashing',
        attackSpeed: 'normal',
        reach: 'melee',
        durability: 100
    },
    {
        id: 'dagger',
        name: 'Dagger',
        variants: [
            { name: 'Knife', desc: 'A simple utility blade, entirely ruined by being repeatedly used to pry gold teeth.' },
            { name: 'Shiv', desc: 'A rusted iron spike tightly wrapped in a filthy, blood-stained rag.' },
            { name: 'Dirk', desc: 'A vicious thrusting dagger that slides unnervingly smoothly through heavy leather.' },
            { name: 'Stiletto', desc: 'A needle-like blade designed exclusively for piercing armor gaps and lung tissue.' },
            { name: 'Rondel', desc: 'An incredibly stiff stabbing weapon meant to violently burst the rings of chainmail.' },
            { name: 'Main-gauche', desc: 'A heavy-hilted parrying dagger deeply scored by countless intercepted death-blows.' },
            { name: 'Seax', desc: 'A brutal, heavy-backed carving knife that shatters bones rather than cutting them.' },
            { name: 'Kukri', desc: 'A severely angled chopper designed to decapitate cleanly with a sheer flick of the wrist.' },
            { name: 'Assassin\'s Blood-Groove', desc: 'Specifically channeled to prevent suction, allowing rapid, repeated, lethal withdrawals.' },
            { name: 'Graverobber\'s Pry', desc: 'Thick and totally blunt on one edge, used equally for throat-slitting and coffin-opening.' },
            { name: 'Strangler\'s Trust', desc: 'Hides a secondary, retractable razor meant for slicing while locked in a suffocating grapple.' },
            { name: 'Defaced Stiletto', desc: 'An aristocratic weapon completely tarnished, wielded now by a gutter-born cutthroat.' },
            { name: 'Witch-Iron Dagger', desc: 'Smells perpetually of ozone; any wound it inflicts burns as if seared by hot coals.' },
            { name: 'Poisoner\'s Hollow-Blade', desc: 'Contains a highly toxic, fragile glass vial hidden within the hollow pommel.' },
            { name: 'Gutter-Bite', desc: 'Jagged and hastily sharpened on a cobblestone street, guaranteeing a severely infected fatal wound.' }
        ],
        handedness: '1H',
        group: 'METAL',
        icon: 'GiDaggers',
        validRoles: ['Rogue', 'Assassin', 'Wanderer', 'Scholar', 'Mage', 'Thief'],
        weight: 1,
        baseDamage: 6,
        damageType: 'piercing',
        attackSpeed: 'very_fast',
        reach: 'melee',
        durability: 70
    },
    {
        id: 'mace',
        name: 'Mace',
        variants: [
            { name: 'Morningstar', desc: 'A heavy, spiked sphere specifically designed to cave in helms and the skulls beneath them.' },
            { name: 'Club', desc: 'A dense chunk of petrified bog-wood featuring terrifying, natural crushing weight.' },
            { name: 'Warhammer', desc: 'Alternates between shattering ribs and driving a massive iron spike directly into the heart.' },
            { name: 'Flail', desc: 'A rusted, heavy iron block on a chain that frequently maims its own careless wielder.' },
            { name: 'Cudgel', desc: 'A reinforced truncheon smeared with dried matter from breaking up violent tavern riots.' },
            { name: 'Bludgeon', desc: 'An utterly unrefined chunk of lead shaped vaguely like a weapon of war.' },
            { name: 'Grave-Maul', desc: 'A slab of heavy tombstone lashed desperately to a thick, rotting wooden haft.' },
            { name: 'Inquisitor\'s Flange', desc: 'A multi-flanged mace engineered not to kill quickly, but to break bones cleanly.' },
            { name: 'Ogre\'s Knock', desc: 'A horribly unbalanced iron lump that requires two hands to efficiently swing.' },
            { name: 'Blood-Iron Crusher', desc: 'Forged from abyssal metal that physically drinks the gore of crushed enemies.' },
            { name: 'Defiled Scepter', desc: 'Once a holy rod of office, now a heavily dented, blood-stained tool for murder.' },
            { name: 'Executioner\'s Mallet', desc: 'A flat-headed hammer uniquely designed to shatter kneecaps before the final, decapitating strike.' },
            { name: 'Pit-Fighter\'s Chain', desc: 'A heavy length of spiked anchor-chain used to bludgeon opponents into a fine paste.' },
            { name: 'Spiked Bone-Breaker', desc: 'A cruel, studded rod meant for devastating blows that shatter thick armor plating.' },
            { name: 'Plague-Bell Mace', desc: 'A heavy cast-iron bell welded to a handle; it rings a harsh, sickly note upon impact.' }
        ],
        handedness: '1H',
        group: 'METAL',
        icon: 'GiFlangedMace',
        validRoles: ['Cleric', 'Paladin', 'Warrior', 'Priest'],
        weight: 6,
        baseDamage: 14,
        damageType: 'bludgeoning',
        attackSpeed: 'slow',
        reach: 'melee',
        durability: 120
    },
    {
        id: 'wand',
        name: 'Wand',
        variants: [
            { name: 'Rod', desc: 'A heavy iron rod that conducts violent arcane energy, often burning the user\'s palms.' },
            { name: 'Focus', desc: 'Tipped with a violently fractured crystal that bleeds raw, highly unstable magical power.' },
            { name: 'Scepter', desc: 'An opulent symbol of authority, slowly corroding from the dark magics channeled through it.' },
            { name: 'Baton', desc: 'A severely charred wooden stick smelling intensely of brimstone and burnt hair.' },
            { name: 'Bone-Splinter Focus', desc: 'Carved from the deeply porous femur of a long-dead, subterranean monstrosity.' },
            { name: 'Witch-Wood Branch', desc: 'A twisted, gnarled stick pulled from a deeply cursed, stagnant marshland.' },
            { name: 'Necromancer\'s Talon', desc: 'A literal, mummified raven\'s claw securely fastened to a pale, petrified stick.' },
            { name: 'Blood-Amber Wand', desc: 'Contains a trapped, eternally writhing parasitic insect within the glowing red gemstone.' },
            { name: 'Cultist\'s Spine', desc: 'A deeply disturbing wand visibly constructed from the fused vertebrae of a sacrificial victim.' },
            { name: 'Void-Glass Rod', desc: 'Absorbs the surrounding light; feels freezing to the touch and hums with a depressing frequency.' },
            { name: 'Madman\'s Scepter', desc: 'Covered in frantic, completely illegible carvings that seem to softly whisper in the dark.' },
            { name: 'Grave-Dirt Focus', desc: 'A hollowed reed packed tightly with graveyard soil and sealed with human tallow.' },
            { name: 'Corrupted Priest\'s Rod', desc: 'A holy symbol melted down and reformed into a devastatingly jagged channeling tool.' },
            { name: 'Seer\'s Blind-Stick', desc: 'A highly polished piece of ivory that heavily induces minor visual hallucinations.' },
            { name: 'Plague-Doctor\'s Pointer', desc: 'Smells strongly of harsh antiseptic and miasma; used to tightly channel necrotic rot.' }
        ],
        handedness: '1H',
        group: 'WOOD',
        icon: 'GiFairyWand',
        validRoles: ['Mage', 'Warlock', 'Scholar'],
        weight: 1,
        baseDamage: 4,
        damageType: 'arcane',
        attackSpeed: 'fast',
        reach: 'ranged',
        durability: 40
    },

    // TWO-HANDED MELEE
    {
        id: 'greataxe',
        name: 'Greataxe',
        variants: [
            { name: 'Dane Axe', desc: 'A long-hafted raider\'s weapon designed for sweeping, devastating cleaves through shield-walls.' },
            { name: 'Bardiche', desc: 'A pole-mounted crescent blade that splits men from collarbone to pelvis in a single cut.' },
            { name: 'Executioner\'s Greataxe', desc: 'The massive blade has a permanently concave edge from thousands of clean decapitations.' },
            { name: 'Berserker\'s Maul-Axe', desc: 'An absurdly heavy double-bitted axe that only the truly deranged can swing effectively.' },
            { name: 'Logger\'s War-Axe', desc: 'A felling axe converted for warfare by welding a spike to the poll.' },
            { name: 'Blood-Oak Splitter', desc: 'The haft is carved from a tree that grew over a mass grave, stained crimson to the core.' },
            { name: 'Ogre-Forged Cleaver', desc: 'Comically oversized for a human, requiring brute desperation to lift and swing.' },
            { name: 'Plague-Doctor\'s Chopper', desc: 'Used to hack infected limbs off screaming patients in the quarantine camps.' },
            { name: 'Warden\'s Crescent', desc: 'A ceremonial guard weapon that has seen far too much actual combat for comfort.' },
            { name: 'Defiled Heirloom Axe', desc: 'Ancestral runes have been chiseled off and replaced with crude obscenities.' },
            { name: 'Corpse-Carver', desc: 'A butcher\'s greataxe designed to dismember the dead for mass-grave efficiency.' },
            { name: 'Cultist\'s Reaping Blade', desc: 'A crescent blade mounted on a ceremonial pole, used for harvest-festival sacrifices.' },
            { name: 'Iron-Spine Halberd-Axe', desc: 'A hybrid weapon featuring a top-spike for thrusting and a massive axe-blade for cleaving.' },
            { name: 'Raider\'s Trophy-Axe', desc: 'The haft is decorated with the dried scalps of conquered village chieftains.' },
            { name: 'Grave-Warden\'s Verdict', desc: 'A judicial weapon used to permanently settle disputes between rival corpse-guilds.' }
        ],
        handedness: '2H',
        group: 'METAL',
        icon: 'GiBattleAxe',
        validRoles: ['Warrior', 'Berserker', 'Barbarian', 'Executioner'],
        weight: 10,
        baseDamage: 24,
        damageType: 'slashing',
        attackSpeed: 'very_slow',
        reach: 'melee',
        durability: 100
    },
    {
        id: 'spear',
        name: 'Spear',
        variants: [
            { name: 'Longspear', desc: 'A simple sharpened pole that keeps the horrors at arm\'s length, barely.' },
            { name: 'Pike', desc: 'An absurdly long infantry weapon designed to impale cavalry at terrifying distances.' },
            { name: 'Javelin', desc: 'A lightweight throwing spear that punches through leather armor and ribcages alike.' },
            { name: 'Halberd', desc: 'A devastating hybrid of axe, spear, and hook designed to dismount and dismember.' },
            { name: 'Trident', desc: 'A three-pronged fishing implement repurposed for pinning men to the mud.' },
            { name: 'Glaive', desc: 'A sweeping blade on a long pole that severs legs at the knee from a safe distance.' },
            { name: 'Boar Spear', desc: 'Features a crossbar to prevent the impaled beast from sliding up the shaft to maul you.' },
            { name: 'Sarissa', desc: 'An enormously long pike requiring a formation to wield, useless alone in a corridor.' },
            { name: 'Grave-Keeper\'s Fork', desc: 'A rusted bident used to pin thrashing undead back into their shallow graves.' },
            { name: 'Cultist\'s Impaler', desc: 'A ceremonial spear designed to display the bodies of sacrificial victims vertically.' },
            { name: 'Plague-Prodder', desc: 'A long pole used by quarantine wardens to forcibly guide the infected into pits.' },
            { name: 'Defiled Lance', desc: 'A cavalryman\'s lance shattered in defeat, now crudely lashed back together.' },
            { name: 'Bone-Tipped Pike', desc: 'The iron point was replaced with a sharpened monster fang after the smithy was burned.' },
            { name: 'Barbed War-Spear', desc: 'The tip features vicious backward-facing hooks that guarantee an unsurvivable wound-channel.' },
            { name: 'Hangman\'s Reach', desc: 'A long pole with a hooked noose at the end, used to drag fleeing convicts back.' }
        ],
        handedness: '2H',
        group: 'METAL',
        icon: 'GiSpear',
        validRoles: ['Warrior', 'Guard', 'Sentinel', 'Knight', 'Mercenary', 'Hunter'],
        weight: 5,
        baseDamage: 14,
        damageType: 'piercing',
        attackSpeed: 'normal',
        reach: 'extended',
        durability: 80
    },
    {
        id: 'greatsword',
        name: 'Greatsword',
        variants: [
            { name: 'Claymore', desc: 'A massive, heavy blade entirely chipped and notched from cleaving through endless ranks of infantry.' },
            { name: 'Zweihander', desc: 'An absurdly heavy weapon that functions less like a sword and more like a razor-sharp crowbar.' },
            { name: 'Bastard Sword', desc: 'The long leather grip is completely soaked with the sweat and blood of brutal, drawn-out duels.' },
            { name: 'Flamberge', desc: 'A vicious, undulating blade designed exclusively to rip flesh into un-stitchable, fatal ribbons.' },
            { name: 'Executioner Sword', desc: 'A completely flat-tipped, incredibly heavy blade that smells permanently of the chopping block.' },
            { name: 'Headsman\'s Trust', desc: 'A terrifying slab of pure iron meant to sever multiple heads in a single, sweeping rotational strike.' },
            { name: 'Defiled Greatblade', desc: 'Previously a knight\'s symbol of honor, now jagged, heavily rusted, and utterly forsaken.' },
            { name: 'Black-Iron Cleaver', desc: 'Forged from impossibly dense metal; each swing creates a deeply unnatural sounding metallic wail.' },
            { name: 'Ostracized Vanguard', desc: 'A regimental sword belonging to a disgraced legion that was purposefully left to die.' },
            { name: 'Spiked Buster', desc: 'The flat of the blade is studded with heavy iron spikes, allowing devastating blunt-force strikes.' },
            { name: 'Grave-Warden\'s Slab', desc: 'A ceremonial weapon heavily encrusted in centuries of damp crypt dirt and dried grime.' },
            { name: 'Mercenary\'s Ruin', desc: 'Pragmatic to a fault, featuring absolutely no guard and a violently serrated lower edge.' },
            { name: 'Cult-Leader\'s Executioner', desc: 'Engraved with disturbing geometric patterns that somehow induce acute nausea when viewed.' },
            { name: 'Blood-Drinker Zweihander', desc: 'Features a massive fuller that seems to aggressively soak up spilled blood rather than letting it drip.' },
            { name: 'Forsaken Colossus', desc: 'So incredibly large it drags loudly against the cobblestones, throwing sparks with every weary step.' }
        ],
        handedness: '2H',
        group: 'METAL',
        icon: 'GiBroadsword',
        validRoles: ['Warrior', 'Paladin', 'Mercenary', 'Knight'],
        weight: 8,
        baseDamage: 22,
        damageType: 'slashing',
        attackSpeed: 'slow',
        reach: 'melee',
        durability: 110
    },
    {
        id: 'staff',
        name: 'Staff',
        variants: [
            { name: 'Quarterstaff', desc: 'A heavily splintered pole deeply stained with the blood of countless tavern brawls.' },
            { name: 'Walking Stick', desc: 'A deeply scarred traveler\'s stick hiding an incredibly sharp iron spike near the base.' },
            { name: 'Pole', desc: 'An iron-shod reach weapon used primarily to forcefully keep ravenous feral dogs at bay.' },
            { name: 'Cane', desc: 'A polished, elegant aristocratic cane that proudly conceals a needle-thin, venom-coated blade.' },
            { name: 'Bo Staff', desc: 'A perfectly balanced martial staff carved from a deeply unsettling, violently blood-red wood.' },
            { name: 'Iron-Shod Staff', desc: 'Capped with rusted iron entirely dented from effortlessly shattering the kneecaps of beasts.' },
            { name: 'Shaman\'s Totem', desc: 'Adorned with the horrific, mummified remains of multiple small swamp-predators.' },
            { name: 'Grave-Digger\'s Rod', desc: 'A completely blunt, utterly massive wooden beam used to forcefully test the depth of unmarked graves.' },
            { name: 'Necromancer\'s Crook', desc: 'A heavy shepherd\'s crook made of pale, porous bone rather than natural wood.' },
            { name: 'Plague-Censer Staff', desc: 'A long pole featuring a heavy iron cage at the end that constantly releases choking, sickening incense.' },
            { name: 'Corrupt-Monk\'s Pillar', desc: 'A solid stone pillar forcibly ripped from a desecrated temple and wielded through raw, mad faith.' },
            { name: 'Blind-Seer\'s Guide', desc: 'A tapping stick that seems to ominously guide the wielder specifically toward impending bloodshed.' },
            { name: 'Hangman\'s Pole', desc: 'The sturdy wooden beam from a shattered gallows, still featuring a terrifying length of frayed rope.' },
            { name: 'Cultist\'s Banner-Staff', desc: 'A violently heavy pole topped with a flayed-skin flag meant to proudly honor an ancient, horrific deity.' },
            { name: 'Mad-Sorcerer\'s Branch', desc: 'Vibrates constantly with highly unstable arcane energy, frequently shocking the user without warning.' }
        ],
        handedness: '2H',
        group: 'WOOD',
        icon: 'GiWizardStaff',
        validRoles: ['Mage', 'Druid', 'Scholar', 'Warlock', 'Priest', 'Cleric'],
        weight: 4,
        baseDamage: 8,
        damageType: 'bludgeoning',
        attackSpeed: 'normal',
        reach: 'extended',
        durability: 60
    },

    // TWO-HANDED RANGED
    {
        id: 'crossbow',
        name: 'Crossbow',
        variants: [
            { name: 'Light Crossbow', desc: 'A compact mechanical killer that any untrained peasant can use to murder at distance.' },
            { name: 'Heavy Crossbow', desc: 'Requires a crank to reload, but the bolt punches clean through plate armor and exits the back.' },
            { name: 'Repeating Crossbow', desc: 'A magazine-fed mechanism that trades accuracy for a terrifying rate of fire.' },
            { name: 'Hand Crossbow', desc: 'A concealable assassination tool, easily hidden beneath a cloak for close-range murder.' },
            { name: 'Siege Crossbow', desc: 'A massive tripod-mounted weapon designed to kill men through castle walls.' },
            { name: 'Gut-String Arbalest', desc: 'Strung with dried intestines that snap at the worst possible moment in combat.' },
            { name: 'Grave-Watcher\'s Bolt-Thrower', desc: 'Modified to fire silver-tipped bolts at the undead from cemetery watchtowers.' },
            { name: 'Plague-Doctor\'s Needle', desc: 'Fires surgical bolts loaded with concentrated curative serum or lethal poison.' },
            { name: 'Defiled Marksman\'s Pride', desc: 'A guild-crafted weapon stolen from a dead sharpshooter and crudely repaired.' },
            { name: 'Cultist\'s Pain-Bow', desc: 'The trigger mechanism is intentionally uncomfortable, causing the user to flinch and suffer.' },
            { name: 'Iron-Jaw Crossbow', desc: 'The prod is made of solid iron, requiring immense strength just to cock the mechanism.' },
            { name: 'Bone-Stock Arbalest', desc: 'The tiller is carved from a single massive femur of an unidentified giant creature.' },
            { name: 'Assassin\'s Whisper', desc: 'The mechanism is wrapped in oiled leather, reducing the firing sound to a soft click.' },
            { name: 'Executioner\'s Bolt-Rifle', desc: 'A long-range weapon used to silently execute fleeing prisoners from prison towers.' },
            { name: 'Raider\'s Scatterbow', desc: 'Modified to fire three short bolts simultaneously in a fan pattern of carnage.' }
        ],
        handedness: '2H',
        group: 'METAL',
        icon: 'GiCrossbow',
        validRoles: ['Ranger', 'Hunter', 'Guard', 'Assassin', 'Mercenary', 'Scout'],
        weight: 6,
        baseDamage: 18,
        damageType: 'piercing',
        attackSpeed: 'slow',
        reach: 'ranged',
        durability: 85
    },
    {
        id: 'bow',
        name: 'Bow',
        variants: [
            { name: 'Shortbow', desc: 'A compact, vicious bow strung with the incredibly tough sinew of a wasteland horror.' },
            { name: 'Longbow', desc: 'A massive, heavy-draw weapon that violently tears the shoulder muscles of untrained archers.' },
            { name: 'Recurve Bow', desc: 'The sharply curved limbs are carved from unnervingly dark, violently rigid bog-wood.' },
            { name: 'Composite Bow', desc: 'A brutal medieval assembly of cracked horn, dense wood, and intensely strong animal glue.' },
            { name: 'Yew Bow', desc: 'A terrifyingly heavy war bow capable of punching massive steel arrows entirely through plate mail.' },
            { name: 'Hunting Bow', desc: 'Smells perpetually of rotting venison and the damp, oppressive, terrifying silence of the deep woods.' },
            { name: 'Assassin\'s String', desc: 'So incredibly taut and small it can be fully concealed beneath a heavy winter cloak.' },
            { name: 'Bone-Limbed Bow', desc: 'The upper and lower limbs are fashioned specifically from the ribs of a gargantuan beast.' },
            { name: 'Grave-Watcher\'s Bow', desc: 'Fancifully carved with gargoyles, completely ruined by years of heavy, muddy graveyard rain.' },
            { name: 'Cultist\'s Spine-Bow', desc: 'Strung tightly with a deeply unsettling, strangely elastic silver cord that groans when pulled.' },
            { name: 'Plague-Wood Bow', desc: 'Carved from a violently diseased tree; the arrows it fires tend to heavily splinter on impact.' },
            { name: 'Defiled Ranger-Bow', desc: 'Covered in desperate notch-marks; one for every traveler the starving archer was forced to eat.' },
            { name: 'Black-Iron Recurve', desc: 'An impossibly stiff iron bow requiring physical mechanical assistance simply to fully draw the string.' },
            { name: 'Shadow-Stalker\'s Arch', desc: 'Painted completely matte black to forcefully eliminate even the faintest glimmer of moonlight.' },
            { name: 'Executioner\'s Cross', desc: 'An incredibly heavy, slow-firing bow used strictly for executing fleeing, cowardly deserters.' }
        ],
        handedness: '2H',
        group: 'WOOD',
        icon: 'GiPocketBow',
        validRoles: ['Ranger', 'Hunter', 'Rogue', 'Archer'],
        weight: 2,
        baseDamage: 16,
        damageType: 'piercing',
        attackSpeed: 'normal',
        reach: 'ranged',
        durability: 50
    }
];
