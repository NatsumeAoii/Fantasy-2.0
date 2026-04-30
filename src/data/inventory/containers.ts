import type { ItemSlot } from '../../types';
import type { VariantDef } from './types';

/**
 * A storage vessel such as a backpack, pouch, or chest that determines
 * how many items the character can carry. Container capacity directly
 * limits inventory size.
 */
export interface ContainerDef {
    id: string;
    name: string;
    slot: ItemSlot;
    icon: string;
    weight: number;
    capacity: number; // Weight capacity bonus in kg
    extraSlots: number; // Bonus inventory slots
    durability: number;
    variants: VariantDef[];
}

export const CONTAINERS: ContainerDef[] = [
    // BACK CONTAINERS
    {
        id: 'small_backpack',
        name: 'Small Backpack',
        slot: 'BACK',
        icon: 'GiBackpack',
        weight: 2,
        capacity: 20,
        extraSlots: 10,
        durability: 60,
        variants: [
            { name: 'Canvas Sack', desc: 'A crude, lice-ridden sack smelling faintly of rotten grain.' },
            { name: 'Leather Pack', desc: 'Stitched together from the erratic, mismatched hides of sickly beasts.' },
            { name: 'Travel Bag', desc: 'Battered canvas permanently stained with mud and dried traveler\'s blood.' },
            { name: 'Rucksack', desc: 'Worn thin at the straps, promising to snap under the next heavy load.' },
            { name: 'Day Pack', desc: 'A tiny, fragile bag barely fit to hold a single day\'s meager, stale rations.' },
            { name: 'Woven Rattan Basket', desc: 'A brittle carrying basket that groans ominously with every step.' },
            { name: 'Alchemist\'s Box-Bag', desc: 'Stiffened sides reeking of sulfur, stained by countless shattered potions.' },
            { name: 'Courier\'s Haversack', desc: 'The previous owner was found with an arrow through this very bag.' },
            { name: 'Silk-Spun Satchel', desc: 'Taken off a dead aristocrat; the fine material clashes with the highway dirt.' },
            { name: 'Oiled-Hide Sack', desc: 'Heavily greased with pungent animal fat to repel the endless, freezing rain.' },
            { name: 'Grave-Robber\'s Pack', desc: 'Contains specialized, blood-stained loops for pry-bars and bone-saws.' },
            { name: 'Plague-Doctor\'s Satchel', desc: 'Coated completely in pitch and tar to violently repel disease miasma.' },
            { name: 'Mourner\'s Sack', desc: 'Woven from coarse, scratchy black wool; traditionally used to carry human ashes.' },
            { name: 'Scavenger\'s Bag', desc: 'A grotesque patchwork of multiple skins stitched together with heavy gut-string.' },
            { name: 'Smuggler\'s Dead-Drop', desc: 'Designed specifically to be submerged in stagnant swamp water for weeks.' }
        ]
    },
    {
        id: 'large_backpack',
        name: 'Heavy Backpack',
        slot: 'BACK',
        icon: 'GiBackpack',
        weight: 5,
        capacity: 50,
        extraSlots: 18,
        durability: 80,
        variants: [
            { name: 'Expedition Pack', desc: 'Built for suicidal journeys into the untamed, monstrous wilderness.' },
            { name: 'Frame Pack', desc: 'The heavy wooden frame constantly splinters and digs painfully into the spine.' },
            { name: 'Trader\'s Rucksack', desc: 'Countless hidden pockets meant to conceal wealth from desperate highwaymen.' },
            { name: 'Adventurer\'s Pack', desc: 'Smells of copper, fear-sweat, and the creeping damp of subterranean tombs.' },
            { name: 'Mountain Pack', desc: 'Lined with coarse fur to survive blizzards that freeze men solid overnight.' },
            { name: 'Military Mulesack', desc: 'Massive and agonizingly uncomfortable, built for grueling forced marches.' },
            { name: 'Dwarven Deep-Pack', desc: 'Riveted leather heavily laden with iron exterior loops, weighing a ton.' },
            { name: 'Prospector\'s Rig', desc: 'Includes heavily reinforced ties for carrying pickaxes and chunks of raw ore.' },
            { name: 'Bear-Hide Rucksack', desc: 'A ferocious fur exterior that attracts entirely too many territorial predators.' },
            { name: 'False-Bottom Pack', desc: 'Includes completely hidden interior sleeves designed to fool the city watch.' },
            { name: 'Mercenary\'s Body-Bag', desc: 'Oversized and remarkably thick leather, large enough to haul a fallen comrade.' },
            { name: 'Gargoyle-Hide Hauler', desc: 'Stiff, stony-gray leather that feels unnaturally cold and heavy.' },
            { name: 'Necromancer\'s Trunk', desc: 'A reinforced wooden-frame pack designed to securely transport fragile skulls.' },
            { name: 'Executioner\'s Carry-All', desc: 'Lined with heavy waxed canvas to prevent grim fluids from seeping through.' },
            { name: 'Doomsayer\'s Pack', desc: 'Covered in unhinged, painted prophecies, adorned with rattling iron chains.' }
        ]
    },

    // BELT CONTAINERS
    {
        id: 'belt_pouch',
        name: 'Belt Pouch',
        slot: 'BELT',
        icon: 'GiBeltArmor',
        weight: 0.5,
        capacity: 5,
        extraSlots: 4,
        durability: 40,
        variants: [
            { name: 'Coin Purse', desc: 'Jingles loudly with copper, painting a massive target on the wearer\'s back.' },
            { name: 'Herb Pouch', desc: 'Holds gathered nightshades and bitter roots, smelling strongly of soil.' },
            { name: 'Tool Belt', desc: 'Greasy loops designed for swift access to lockpicks and rusted shivs.' },
            { name: 'Component Pouch', desc: 'Lined with lead to safely contain highly volatile spell ingredients.' },
            { name: 'Hip Satchel', desc: 'A tiny, desperate carrier for the absolute barest essentials of survival.' },
            { name: 'Gambler\'s Dice Pouch', desc: 'Fine velvet stained deeply with the blood of a sore loser.' },
            { name: 'Healer\'s Kit Bag', desc: 'A stiff leather box-pouch that permanently smells of rotting bandages.' },
            { name: 'Forager\'s Mesh Bag', desc: 'Breathable netting that tragically lets the rain turn hardtack to mush.' },
            { name: 'Iron-Clasped Strongpouch', desc: 'Laced with iron wire so desperate street-urchins cannot slit the bottom.' },
            { name: 'Suede Stone-Pouch', desc: 'Heavy suede explicitly stretched to carry jagged, lethal sling bullets.' },
            { name: 'Severed Ear Pouch', desc: 'A stained, stiffened leather bag used by bounty hunters to keep visceral proof.' },
            { name: 'Ashen Coin Purse', desc: 'Slightly scorched and blackened, salvaged from a village put to the torch.' },
            { name: 'Bone-Clasped Bag', desc: 'A small pouch held closed by an intricately carved human femur fragment.' },
            { name: 'Blood-Vial Pouch', desc: 'Padded interior engineered specifically to secure fragile glass syringes.' },
            { name: 'Thief-Taker\'s Satchel', desc: 'A heavy iron-mesh pouch that clinks ominously with every step.' }
        ]
    },
    {
        id: 'utility_belt',
        name: 'Utility Belt',
        slot: 'BELT',
        icon: 'GiBeltArmor',
        weight: 1.0,
        capacity: 15,
        extraSlots: 6,
        durability: 70,
        variants: [
            { name: 'Adventurer\'s Belt', desc: 'Covered in rusted iron loops and hooks for hanging heavy, dangerous gear.' },
            { name: 'Potion Bandolier', desc: 'Tight leather straps designed to keep unstable vials from shattering against each other.' },
            { name: 'Tactical Waistband', desc: 'Harsh military-grade organization, reeking of old brass and boot polish.' },
            { name: 'Thieves Belt', desc: 'Contains a dozen tiny, razor-lined compartments to maim curious pickpockets.' },
            { name: 'Ranger\'s Belt', desc: 'Built from boiled leather to survive the venomous bites of underbrush vipers.' },
            { name: 'Artillerist\'s Harness', desc: 'Designed entirely to carry heavy arbalest quarrels and volatile black powder.' },
            { name: 'Alchemist\'s Cross-Belt', desc: 'Features massively padded loops specifically for highly explosive concoctions.' },
            { name: 'Engineer\'s Apron-Belt', desc: 'Drops down with massive, grease-stained pockets for heavy iron tools.' },
            { name: 'Duelist\'s Scabbard Belt', desc: 'Highly adjustable, prioritizing the swift, lethal draw of a serrated dagger.' },
            { name: 'Hunter\'s Trophy Belt', desc: 'Covered in heavy brass meat-hooks for hanging bleeding small game.' },
            { name: 'Torturer\'s Apron-Belt', desc: 'Dangles with rusted pliers, heavy iron spikes, and a heavy leather whip-loop.' },
            { name: 'Suicide-Harness', desc: 'Heavily padded chest straps built to carry devastatingly unstable fire-pots.' },
            { name: 'Gravedigger\'s Tackle', desc: 'Massive leather loops explicitly sized for heavy iron spades and lantern stakes.' },
            { name: 'Slayer\'s Silver-Band', desc: 'A reinforced belt studded with garlic bulbs, wooden stakes, and holy water.' },
            { name: 'Inquisitor\'s Cingulum', desc: 'Rigid leather housing heavy iron shackles and a book of condemning prayers.' }
        ]
    },

    // SPECIALIZED CONTAINERS
    {
        id: 'scroll_case',
        name: 'Scroll Case',
        slot: 'BELT',
        icon: 'GiScrollUnfurled',
        weight: 0.3,
        capacity: 3,
        extraSlots: 8,
        durability: 50,
        variants: [
            { name: 'Leather Tube', desc: 'A rigid cylinder stained with old ink and musty parchment dust.' },
            { name: 'Bone Scroll-Case', desc: 'Hollowed from a creature\'s femur, sealed with wax plugs at both ends.' },
            { name: 'Copper Canister', desc: 'A watertight metal tube green with verdigris, salvaged from a sunken library.' },
            { name: 'Oiled Canvas Wrap', desc: 'A simple rolled fabric pouch, adequate for keeping the rain off cheap paper.' },
            { name: 'Scholar\'s Codex Tube', desc: 'Inscribed with categorization runes that glow faintly near magical text.' },
            { name: 'Necromancer\'s Ossuary', desc: 'A hollowed spine segment containing scrolls written in blood.' },
            { name: 'Smuggler\'s False Rod', desc: 'Designed to look like a walking stick while concealing contraband maps.' },
            { name: 'Plague-Sealed Capsule', desc: 'Airtight lead casing meant to contain quarantine orders that must not be opened.' },
            { name: 'Inquisitor\'s Evidence Tube', desc: 'Contains confiscated heretical writings awaiting the bonfire.' },
            { name: 'Cartographer\'s Shell', desc: 'A waterproof tortoise-shell container for precious navigational charts.' },
            { name: 'Alchemist\'s Recipe Roll', desc: 'Fire-resistant ceramic tube for volatile formula documents.' },
            { name: 'Beggar\'s Begging-Tube', desc: 'A worthless tin cylinder containing fake letters of noble lineage.' },
            { name: 'War-Courier\'s Dispatch', desc: 'A locked iron tube chained to the wrist; losing it is punishable by death.' },
            { name: 'Cultist\'s Prayer-Case', desc: 'Carved from a single piece of black obsidian, warm to the touch.' },
            { name: 'Oracle\'s Prophecy Jar', desc: 'A clay vessel sealed with wax, containing predictions too dangerous to read.' }
        ]
    },
    {
        id: 'quiver',
        name: 'Quiver',
        slot: 'BACK',
        icon: 'GiQuiver',
        weight: 1.0,
        capacity: 10,
        extraSlots: 5,
        durability: 55,
        variants: [
            { name: 'Hip Quiver', desc: 'A simple leather tube bouncing against the thigh with every step.' },
            { name: 'Back Quiver', desc: 'Tall and rigid, designed for rapid over-shoulder draws in combat.' },
            { name: 'Belt Quiver', desc: 'A flat, compact design allowing prone shooting without snagging.' },
            { name: 'Hunting Sheath', desc: 'Waxed canvas protecting broadheads from the damp forest air.' },
            { name: 'War-Quiver', desc: 'Reinforced rawhide holding three dozen bodkin points for sustained volleys.' },
            { name: 'Skeleton\'s Rib-Cage', desc: 'A hollowed ribcage repurposed as a grotesque arrow holder.' },
            { name: 'Grave-Watcher\'s Case', desc: 'Pre-loaded with silver-tipped bolts for the inevitable cemetery emergence.' },
            { name: 'Assassin\'s Slim-Case', desc: 'Holds only five arrows but is completely silent and invisible under a cloak.' },
            { name: 'Plague-Arrow Sheath', desc: 'Lead-lined interior to contain arrows dipped in quarantine waste.' },
            { name: 'Mercenary\'s Bundle', desc: 'A crude sack of mixed arrows looted from multiple dead archers.' },
            { name: 'Cultist\'s Offering Tube', desc: 'Each arrow slot is carved with a dedication to a different dark patron.' },
            { name: 'Trophy Quiver', desc: 'Decorated with small scalps and ear-tags from confirmed ranged kills.' },
            { name: 'Siege Quiver', desc: 'Oversized and reinforced for the massive bolts of wall-mounted ballistae.' },
            { name: 'Poisoner\'s Case', desc: 'Wax-sealed compartments keeping different venoms from cross-contaminating.' },
            { name: 'Scout\'s Signal Case', desc: 'Contains a mix of whistling and fire-arrows for battlefield communication.' }
        ]
    },
    {
        id: 'saddlebag',
        name: 'Saddlebag',
        slot: 'MOUNT',
        icon: 'GiSaddlebag',
        weight: 3.0,
        capacity: 40,
        extraSlots: 12,
        durability: 90,
        variants: [
            { name: 'Leather Panniers', desc: 'Twin bags hanging off a crossbar, creaking with every step of the beast.' },
            { name: 'Canvas Mule-Bags', desc: 'Oversized and constantly sagging, threatening to slide off the saddle.' },
            { name: 'War-Horse Harness', desc: 'Reinforced leather with iron studs, designed for armored cavalry supply.' },
            { name: 'Trader\'s Pack-Saddle', desc: 'A massive wooden frame distributing merchant goods across the beast\'s back.' },
            { name: 'Nomad\'s Roll-Pack', desc: 'Everything the rider owns rolled into two tight cylinders of oiled hide.' },
            { name: 'Prospector\'s Ore-Bags', desc: 'Heavily stitched and iron-bottomed to support raw stone and mineral weight.' },
            { name: 'Smuggler\'s False-Bottom', desc: 'The saddlebag has a hidden compartment lined with lead to fool magical scans.' },
            { name: 'Plague-Wagon Kit', desc: 'Sealed leather bags designed for toxic materials, reeking of strong lye.' },
            { name: 'Expedition Chest-Mount', desc: 'A small wooden chest strapped directly to the saddle frame.' },
            { name: 'Butcher\'s Hanging Rack', desc: 'Meat hooks and drainage holes for transporting fresh kills.' },
            { name: 'Herbalist\'s Drying-Rack', desc: 'Slotted frames that air-dry gathered herbs during travel.' },
            { name: 'Courier\'s Dispatch Bags', desc: 'Lockable pouches bearing official postal seals and tamper-evident wires.' },
            { name: 'Mercenary\'s Loot-Bags', desc: 'Oversized and blood-stained, designed for battlefield pillaging.' },
            { name: 'Noble\'s Traveling-Case', desc: 'Fine leather with brass fittings, scandalously impractical for adventure.' },
            { name: 'Gravedigger\'s Cart-Mount', desc: 'A reinforced wooden box designed to transport bodies without leaking.' }
        ]
    }
];
