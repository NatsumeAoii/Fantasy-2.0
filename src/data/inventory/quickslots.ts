import type { ItemSlot } from '../../types';
import type { PotionStats, VariantDef } from './types';

/**
 * An item that occupies a quick-access belt slot for instant use
 * during combat without opening the full inventory screen.
 */
export interface QuickSlotDef {
    id: string;
    name: string;
    slot: ItemSlot;
    icon: string;
    weight: number;
    variants?: VariantDef[];
    description?: string;
    effect?: string | null;
    baseDuration?: number;
    baseCooldown?: number;
    potionStats?: PotionStats;
}

/** Throwable quick-slot items like bombs and flasks. */
export const THROWABLES: QuickSlotDef[] = [
    {
        id: 'throwing_knife',
        name: 'Throwing Knife',
        slot: 'THROWABLE',
        icon: 'GiDaggers',
        weight: 0.3,
        variants: [
            { name: 'Balanced Knife', desc: 'Weighted for accurate throws, but permanently stained.' },
            { name: 'Iron Dart', desc: 'Heavy point that easily shatters brittle sternums.' },
            { name: 'Steel Spike', desc: 'Rusted and jagged, ensuring the wound never closes.' },
            { name: 'Fan Blade', desc: 'Curved for spinning flight; hums with a menacing frequency.' },
            { name: 'Bone Needle', desc: 'Carved from a humerus; splinters horrifically on impact.' },
            { name: 'Assassin\'s Dirk', desc: 'Coated in a tar-like paralytic venom.' },
            { name: 'Flaying Knife', desc: 'The edge is chipped from scraping meat off bones.' },
            { name: 'Coffin-Nail', desc: 'A massive, crude iron spike ripped from a cursed crypt.' },
            { name: 'Blood-Grooved Thrower', desc: 'Specifically designed to maximize bleeding.' },
            { name: 'Glass Shiv', desc: 'Shatters lethally inside the target\'s veins.' },
            { name: 'Inquisitor\'s Scalpel', desc: 'Exceptionally sharp, meant for agonizing precision.' },
            { name: 'Widow-Maker', desc: 'A blackened blade favored by jealous lovers.' },
            { name: 'Surgeon\'s Spike', desc: 'Smells faintly of formaldehyde and dried rot.' },
            { name: 'Grave-Robber\'s Shard', desc: 'Fashioned from the shattered edge of a tombstone.' },
            { name: 'Manticore Spine', desc: 'A natural, highly toxic quill repurposed as a dart.' }
        ]
    },
    {
        id: 'throwing_axe',
        name: 'Throwing Axe',
        slot: 'THROWABLE',
        icon: 'GiBattleAxe',
        weight: 1.5,
        variants: [
            { name: 'Hand Axe', desc: 'A compact chopping weapon slick with old gore.' },
            { name: 'Francisca', desc: 'The curved blade is etched with disturbing, unidentifiable runes.' },
            { name: 'Hatchet', desc: 'A utility axe completely ruined by being used on bone.' },
            { name: 'Executioner\'s Hatchet', desc: 'A miniature block-axe, absurdly heavy for its size.' },
            { name: 'Bearded Axe', desc: 'The elongated lower blade is designed to hook onto ribcages.' },
            { name: 'Cleaver', desc: 'A butcher\'s tool thrown with desperate, murderous intent.' },
            { name: 'Spiked Tomahawk', desc: 'Features a nasty iron spike on the reverse side to pierce helms.' },
            { name: 'Grave-Digger\'s Hack', desc: 'Originally meant for roots, now used for skulls.' },
            { name: 'Serrated Throwing-Axe', desc: 'Rips flesh horribly upon retrieval.' },
            { name: 'Black-Iron Hacker', desc: 'Forged in abyssal fires; feels unnaturally cold.' },
            { name: 'Bone-Handled Axe', desc: 'The grip is fashioned from an unfortunate previous owner.' },
            { name: 'Marauder\'s Toss', desc: 'Chips of bone are permanently wedged into the steel.' },
            { name: 'Cultist\'s Sickle-Axe', desc: 'Curved like a harvest moon, thirsting for sacrifice.' },
            { name: 'Rusted Headsman', desc: 'So corroded it causes tetanus on a mere graze.' },
            { name: 'Ogre-Cleaver', desc: 'A massive chunk of iron requiring absurd strength to pitch.' }
        ]
    },
    {
        id: 'bomb',
        name: 'Bomb',
        slot: 'THROWABLE',
        icon: 'GiPowderBag',
        weight: 1,
        variants: [
            { name: 'Fire Bomb', desc: 'Explodes in highly adhesive, unquenchable flames.' },
            { name: 'Smoke Bomb', desc: 'Creates a concealing cloud of choking, ash-scented smoke.' },
            { name: 'Flash Bomb', desc: 'A blinding burst of light accompanied by a scream-like crack.' },
            { name: 'Thunder Bomb', desc: 'A deafening concussion that shatters eardrums instantly.' },
            { name: 'Stink Bomb', desc: 'Emits nauseating fumes that smell distinctly of mass graves.' },
            { name: 'Plague-Pot', desc: 'Shrapnel coated in a hyper-virulent pestilence.' },
            { name: 'Alchemist\'s Fire', desc: 'Burns underwater and aggressively consumes flesh.' },
            { name: 'Shrapnel Flask', desc: 'Packed tightly with rusted nails and jagged glass.' },
            { name: 'Necrotic Orb', desc: 'Explodes in a wave of withering, life-draining cold.' },
            { name: 'Ghost-Dust Bomb', desc: 'Blinds enemies with the powdered remains of the restless dead.' },
            { name: 'Blood-Boil Flask', desc: 'Emits a gas that causes exposed blood vessels to burst.' },
            { name: 'Tar-Pot', desc: 'Showers the area in boiling, agonizingly sticky pitch.' },
            { name: 'Cursed Urn', desc: 'Releases wailing ethereal faces alongside the concussive blast.' },
            { name: 'Madman\'s Concoction', desc: 'Highly unstable; smells faintly of ozone and burning hair.' },
            { name: 'Caltrop Grenade', desc: 'Explodes, scattering dozens of poisoned iron spikes.' }
        ]
    },
];

/** Light-source quick-slot items. */
export const TORCHES: QuickSlotDef[] = [
    {
        id: 'torch',
        name: 'Torch',
        slot: 'TORCH',
        icon: 'GiTorch',
        weight: 1,
        description: 'Lights the way in darkness.',
        baseDuration: 3600,
        variants: [
            { name: 'Pine Torch', desc: 'Burns angrily with a thick, suffocating black smoke.' },
            { name: 'Oiled Brand', desc: 'Dripping with highly flammable, foul-smelling grease.' },
            { name: 'Pitch Torch', desc: 'Coated in thick tar; impossible to extinguish with ordinary water.' },
            { name: 'Corpse-Fat Rush', desc: 'A simple reed soaked in rendered human tallow.' },
            { name: 'Bone-Handled Torch', desc: 'A hollowed femur packed with burning resin.' },
            { name: 'Cultist\'s Sear', desc: 'Burns with a sickly, pale-green flame.' },
            { name: 'Grave-Robber\'s Brand', desc: 'Short and stubby, designed for tight, claustrophobic tunnels.' },
            { name: 'Ever-Burning Ember', desc: 'A weirdly warm chunk of slag that casts eerie, dancing shadows.' },
            { name: 'Smuggler\'s Glow', desc: 'Gives off no smoke, but stinks intensely of sulfur.' },
            { name: 'Executioner\'s Brand', desc: 'Heavily iron-banded, doubles effectively as a bludgeon.' },
            { name: 'Witch-Fire Branch', desc: 'A twisted piece of bog-wood that burns blue and cold.' },
            { name: 'Blood-Soaked Torch', desc: 'The wood was stained heavily before the pitch was applied.' },
            { name: 'Scavenged Cinder', desc: 'Barely a stick; casts a desperate, flickering light.' },
            { name: 'Sinner\'s Flare', desc: 'Said to burn brighter when in the presence of overwhelming guilt.' },
            { name: 'Ash-Wood Torch', desc: 'Fashioned from the splintered remains of a cremation pyre.' }
        ]
    },
    {
        id: 'lantern',
        name: 'Lantern',
        slot: 'TORCH',
        icon: 'GiLanternFlame',
        weight: 2,
        description: 'A reliable light source.',
        baseDuration: 7200,
        variants: [
            { name: 'Hooded Lantern', desc: 'Casts a directional beam that constantly flickers as if breathing.' },
            { name: 'Bullseye Lantern', desc: 'Focuses a harsh, blinding light that reveals unseen horrors.' },
            { name: 'Storm Lantern', desc: 'The glass is permanently stained black with soot and rust.' },
            { name: 'Miner Lamp', desc: 'Battered and deeply dented from terrifying cavern cave-ins.' },
            { name: 'Skull-Lantern', desc: 'A hollowed cranium housing a flickering, trapped flame.' },
            { name: 'Ghoul-Oil Lamp', desc: 'Burns fuel extracted from the bloated bellies of corpse-eaters.' },
            { name: 'Jailer\'s Light', desc: 'Heavy iron grating casts prison-bar shadows on the walls.' },
            { name: 'Seer\'s Censer', desc: 'Emits a dim, violet light alongside mind-altering fumes.' },
            { name: 'Brass Sun', desc: 'A needlessly ornate lantern tarnished by years of neglect.' },
            { name: 'Grave-Watcher\'s Beacon', desc: 'Designed to spot the rising undead from a distance.' },
            { name: 'Rusted Iron Cage', desc: 'A lantern housing glowing, luminescent swamp slugs.' },
            { name: 'Cultist\'s Guide', desc: 'The glass panels are painted with maddening geometric shapes.' },
            { name: 'Ghost-Light Lantern', desc: 'The flame inside casts absolutely no heat whatsoever.' },
            { name: 'Deep-Delver\'s Lamp', desc: 'Incredibly sturdy, sealed against volatile cavern gases.' },
            { name: 'Blind-Man\'s Lantern', desc: 'Carried by fools; the flame died out long ago, yet it hums.' }
        ]
    },
];

/** Potion quick-slot items for rapid mid-combat consumption. */
export const QUICK_POTIONS: QuickSlotDef[] = [
    {
        id: 'quick_hp',
        name: 'Health Flask',
        slot: 'POTION',
        icon: 'GiRoundBottomFlask',
        weight: 0.5,
        description: 'Quick access healing.',
        baseCooldown: 30,
        potionStats: { type: 'restore', stats: { resource: 'health', baseRestore: 100 } },
        variants: [
            { name: 'Healing Vial', desc: 'Fast-acting remedy with a brutally bitter, metallic aftertaste.' },
            { name: 'Vitality Flask', desc: 'Restores vigor but makes the veins bulge unnervingly.' },
            { name: 'Coagulating Draught', desc: 'Instantly scabs over wounds with painful, rapid force.' },
            { name: 'Stitch-Weed Extract', desc: 'Literally causes flesh to knit together like writhing worms.' },
            { name: 'Blood-Transfusion Syringe', desc: 'Unsanitary and highly risky, but immediately effective.' },
            { name: 'Bone-Mender Syrup', desc: 'Causes agonizing cramps as shattered bones snap back into place.' },
            { name: 'Troll-Blood Elixir', desc: 'Thick, green, and smells intensely of wet dog; speeds regeneration.' },
            { name: 'Grave-Moss Tincture', desc: 'Numbs the pain completely while leaving the area dead to the touch.' },
            { name: 'Paladin\'s Tears', desc: 'Allegedly holy water; it burns fiercely as it purges infection.' },
            { name: 'Alchemist\'s Miracle', desc: 'Violently bubbling red liquid that stains the teeth semi-permanently.' },
            { name: 'Leech-Juice Vial', desc: 'A distilled concoction of engorged leeches; horrific but functional.' },
            { name: 'Crimson Phial', desc: 'Distilled adrenaline that temporarily ignores lethal trauma.' },
            { name: 'Corpse-Weed Brew', desc: 'Staves off death, though it temporarily dulls the user\'s heartbeat.' },
            { name: 'Martyr\'s Blood', desc: 'A highly controversial healing method frowned upon by the church.' },
            { name: 'Putrid Poultice Drink', desc: 'A sludgy mix meant for external use, swallowed in sheer desperation.' }
        ]
    },
    {
        id: 'quick_mp',
        name: 'Mana Flask',
        slot: 'POTION',
        icon: 'GiRoundBottomFlask',
        weight: 0.5,
        description: 'Restores magical energy.',
        baseCooldown: 30,
        potionStats: { type: 'restore', stats: { resource: 'mana', baseRestore: 80 } },
        variants: [
            { name: 'Arcane Vial', desc: 'Concentrated magic that burns the throat like pure alcohol.' },
            { name: 'Spirit Flask', desc: 'Replenishes the soul while causing haunting auditory hallucinations.' },
            { name: 'Aether Draught', desc: 'Pure magical essence; drinking it causes temporary color-blindness.' },
            { name: 'Void-Water', desc: 'A potion so dark it seems to absorb the surrounding light.' },
            { name: 'Liquid Sanity', desc: 'A chalky, blue mixture that aggressively numbs existential terror.' },
            { name: 'Willpower Extract', desc: 'Tastes strictly of ozone and searing static electricity.' },
            { name: 'Star-Blight Nectar', desc: 'Harvested from fallen meteors; induces mild vertigo.' },
            { name: 'Crushed-Gem Solution', desc: 'Drinking liquefied lapis lazuli to aggressively fuel spells.' },
            { name: 'Mind-Flayer\'s Ink', desc: 'A thick, viscous sludge that violently jumpstarts sluggish synapses.' },
            { name: 'Whisper-Vial', desc: 'When uncorked, faint, desperate voices can be heard escaping.' },
            { name: 'Philosopher\'s Slag', desc: 'A failed alchemical experiment that violently restores mana.' },
            { name: 'Dream-Eater\'s Bile', desc: 'Restores arcane energy by consuming the user\'s pleasant memories.' },
            { name: 'Astral Dew', desc: 'Harvested from the ethereal plane; feels freezing cold going down.' },
            { name: 'Mana-Burn Elixir', desc: 'Restores massive magic but permanently scorches the tongue.' },
            { name: 'Seer\'s Tears', desc: 'A disturbingly salty liquid that forcefully rips open the mind\'s eye.' }
        ]
    },
    {
        id: 'quick_stamina',
        name: 'Stamina Flask',
        slot: 'POTION',
        icon: 'GiRoundBottomFlask',
        weight: 0.5,
        description: 'Invigorates the body.',
        baseCooldown: 30,
        potionStats: { type: 'restore', stats: { resource: 'stamina', baseRestore: 60 } },
        variants: [
            { name: 'Energy Tonic', desc: 'A caustic brew that forces a second wind through sheer pain.' },
            { name: 'Vigor Elixir', desc: 'Fights exhaustion by accelerating the heart to dangerous speeds.' },
            { name: 'Endurance Brew', desc: 'A sludgy, coffee-like substance heavily laced with amphetamines.' },
            { name: 'Berserker\'s Drop', desc: 'Induces a state of hyper-focus while causing violent nosebleeds.' },
            { name: 'Adrenaline Shot', desc: 'A brutal, oversized iron needle plunged directly into the thigh.' },
            { name: 'Beast-Bile Flask', desc: 'Causes the muscles to momentarily spasm and gorge with blood.' },
            { name: 'Wake-Weed Tea', desc: 'So aggressively bitter it instantly snaps a coma patient awake.' },
            { name: 'Iron-Lung Tonic', desc: 'Forces the lungs to expand painfully, maximizing oxygen intake.' },
            { name: 'Blood-Pumping Draught', desc: 'Makes the user vividly hear their own heartbeat in their skull.' },
            { name: 'Grave-Runner\'s Flask', desc: 'Used to run for three days without sleep; often fatal afterward.' },
            { name: 'Stimulant Powder', desc: 'Inhaled sharply; smells overwhelmingly of ammonia and dried blood.' },
            { name: 'Raging Bull Extract', desc: 'A murky fluid that temporarily deadens all physical exhaustion.' },
            { name: 'Marching-Powder Solution', desc: 'Keeps soldiers upright even after catastrophic blood loss.' },
            { name: 'Alchemist\'s Ampoule', desc: 'Crush it in your teeth for a burst of terrifying, jittery energy.' },
            { name: 'Shadow-Strider\'s Drink', desc: 'Chemically suppresses the body\'s need to breathe for a short time.' }
        ]
    },
];

/** Food quick-slot items for rapid mid-combat consumption. */
export const QUICK_FOODS: QuickSlotDef[] = [
    {
        id: 'quick_bread',
        name: 'Bread',
        slot: 'FOOD',
        icon: 'GiSlicedBread',
        weight: 0.5,
        description: 'Simple nourishment.',
        effect: 'Reduces hunger and provides light stamina recovery.',
        variants: [
            { name: 'Hard Biscuit', desc: 'So dry and dense it frequently cracks the teeth of unwary travelers.' },
            { name: 'Ash-Baked Roll', desc: 'Cooked directly in the embers; tastes overwhelmingly of soot.' },
            { name: 'Waybread', desc: 'Stays fresh for weeks because no insect or bacteria wants to eat it.' },
            { name: 'Grave-Loaf', desc: 'A dark, heavy bread baked with bone-meal to stretch the flour.' },
            { name: 'Weevil-Infested Hardtack', desc: 'Extra protein for those desperate enough to not look closely.' },
            { name: 'Moldy Crust', desc: 'The green fuzz is scraped off before eating, though the taste remains.' },
            { name: 'Prison Ration', desc: 'A grayish block of indeterminate grain and extreme despair.' },
            { name: 'Peasant\'s Black Bread', desc: 'Dense like a brick, capable of doubling as a blunt weapon.' },
            { name: 'Alchemical Rations', desc: 'A compressed nutrition square wrapped in wax; tastes like sawdust.' },
            { name: 'Blood-Pudding Loaf', desc: 'Baked with pig\'s blood instead of water; distinctly metallic flavor.' },
            { name: 'Stale Scone', desc: 'Hardened over time into a literal stone without generous soaking.' },
            { name: 'Famine-Bread', desc: 'Made mostly of ground tree bark, dirt, and a whisper of actual wheat.' },
            { name: 'Soldier\'s Biscuit', desc: 'Often soaked in cheap ale just to soften it enough to chew.' },
            { name: 'Dwarven Hard-Bread', desc: 'Requires a specialized hammer just to break it into bite-sized pieces.' },
            { name: 'Rot-Blighted Bun', desc: 'The yeast was clearly tainted, leaving a sour, gag-inducing aftertaste.' }
        ]
    },
    {
        id: 'quick_meat',
        name: 'Meat',
        slot: 'FOOD',
        icon: 'GiMeat',
        weight: 1,
        description: 'Hearty meal.',
        effect: 'Reduces hunger and restores a small amount of vitality.',
        variants: [
            { name: 'Jerky Strip', desc: 'Dried and preserved to the texture of an old leather boot.' },
            { name: 'Smoked Sausage', desc: 'Savory and portable, heavily spiced to mask the taste of rot.' },
            { name: 'Salted Ham', desc: 'Cured so intensely the salt violently burns the roof of the mouth.' },
            { name: 'Mystery-Meat Skewer', desc: 'Best not to ask which local animal this was harvested from.' },
            { name: 'Charred Rat', desc: 'A massive, city-sized rodent roasted whole on a splintered stick.' },
            { name: 'Maggot-Ridden Steak', desc: 'The bad parts have been carved out, mostly.' },
            { name: 'Wolf-Flank', desc: 'Tough, stringy, and carries the distinct flavor of a predator.' },
            { name: 'Pickled Tripe', desc: 'Floating in a jar of brine; rubbery and deeply offensive to the nose.' },
            { name: 'Grave-Hound Jerky', desc: 'Chewy meat from a dog that exclusively ate corpses.' },
            { name: 'Sun-Dried Flesh', desc: 'Extremely tough strips dried on hot rocks in the badlands.' },
            { name: 'Blood-Sausage', desc: 'A dark red casing stuffed with congealed gore and leftover oats.' },
            { name: 'Brine-Soaked Pork', desc: 'Preserved for over a decade, but tastes exclusively of sea-salt.' },
            { name: 'Crawler-Meat', desc: 'A pale, slightly translucent chunk cut from a subterranean insectoid.' },
            { name: 'Scavenged Rib', desc: 'Ripped from a carcass abandoned by a larger, scarier predator.' },
            { name: 'Spiced Offal', desc: 'The organs no one else wanted, heavily peppered to disguise the reality.' }
        ]
    },
    {
        id: 'quick_apple',
        name: 'Apple',
        slot: 'FOOD',
        icon: 'GiShinyApple',
        weight: 0.2,
        description: 'Fresh and crisp.',
        effect: 'Reduces hunger and thirst with quick stamina recovery.',
        variants: [
            { name: 'Red Apple', desc: 'Sweet and juicy, though slightly bruised from rough handling.' },
            { name: 'Green Apple', desc: 'Violently tart, causing a painful tightening of the jaw.' },
            { name: 'Worm-Ridden Apple', desc: 'Half of it is still good, if you eat around the wriggling rot.' },
            { name: 'Withered Fruit', desc: 'Shriveled down to the core; dry and incredibly chewy.' },
            { name: 'Grave-Orchard Apple', desc: 'Grown from a tree rooted deep in a mass grave; oddly pale.' },
            { name: 'Rotten Cider-Apple', desc: 'Taking a bite causes a wave of nausea and mild intoxication.' },
            { name: 'Black-Heart Apple', desc: 'The exterior looks fine, but the center is a core of black mush.' },
            { name: 'Alchemist\'s Fruit', desc: 'Altered to never spoil, but tastes remarkably like cheap wax.' },
            { name: 'Blood-Apple', desc: 'A strange regional variant that bleeds red juice when bitten.' },
            { name: 'Ash-Covered Apple', desc: 'Found near an active volcano; the skin is permanently soot-stained.' },
            { name: 'Blight-Touched Apple', desc: 'Covered in a thin, sickly gray film that must be peeled first.' },
            { name: 'Frozen Core', desc: 'Harvested in the deep winter; acts essentially as flavored ice.' },
            { name: 'Swarm-Bitten Fruit', desc: 'Pockmarked entirely by parasitic wasps, but still perfectly edible.' },
            { name: 'Golden Apple', desc: 'Beautiful and shiny to look at, but absolutely flavorless.' },
            { name: 'Poison-Tester\'s Apple', desc: 'Stained slightly purple on one side from an applied, failed toxin.' }
        ]
    },
    {
        id: 'quick_cheese',
        name: 'Cheese',
        slot: 'FOOD',
        icon: 'GiCheeseWedge',
        weight: 0.5,
        description: 'Aged and flavorful.',
        effect: 'Reduces hunger and provides slow-burning energy.',
        variants: [
            { name: 'Cheese Wedge', desc: 'Sharp and crumbly; smells violently of unwashed feet.' },
            { name: 'Wax Wheel', desc: 'Preserved in a thick red coating, heavily sweating yellow grease.' },
            { name: 'Mold-Veined Cheese', desc: 'The blue streaks might be gourmet, or they might be highly toxic.' },
            { name: 'Hard-Rind Cheese', desc: 'Requires a combat dagger to penetrate the outer layer.' },
            { name: 'Goat\'s Milk Curds', desc: 'Sour, squishy lumps wrapped loosely in a dirty cloth.' },
            { name: 'Cave-Aged Wheel', desc: 'Left to ferment in a damp, goblin-infested subterranean tunnel.' },
            { name: 'Grave-Cheese', desc: 'Buried underground for a year in an ash-lined wooden box.' },
            { name: 'Maggot-Cheese', desc: 'A delicacy in some regions; the maggots give it a distinct crunch.' },
            { name: 'Smoked Cheddar', desc: 'Hung directly over a burning pyre; tastes heavily of woodsmoke.' },
            { name: 'Blood-Cheese', desc: 'An unholy mixture involving curdled milk and fresh blood.' },
            { name: 'Stale Rations-Cheese', desc: 'Parched completely dry, crumbling into dust upon biting.' },
            { name: 'Alchemically Treated Cheese', desc: 'Glows faintly in the dark and never, ever spoils.' },
            { name: 'Peasant\'s Turophobia', desc: 'A horrifying amalgamation of leftover milk chunks pressed together.' },
            { name: 'Weeping Cheese', desc: 'So moist it constantly leaks a pungent, milky fluid into your bag.' },
            { name: 'Ashen Brie', desc: 'Rolled in wood-ash to preserve it, giving it a gritty, depressing texture.' }
        ]
    },
];
