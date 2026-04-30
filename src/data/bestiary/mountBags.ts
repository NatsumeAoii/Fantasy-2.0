export type MountBagRarity = 'Common' | 'Uncommon' | 'Rare' | 'Legendary' | 'Mythic';

/**
 * A single bag variant available for a specific mount group.
 * Bags without a price are obtainable only through quests, drops, or events.
 */
export interface MountBagVariant {
    name: string;
    desc: string;
    price?: number;
    weight: number;
    extraSlots: number;
}

/** A rarity tier containing its bag variants. */
export interface MountBagTier {
    rarity: MountBagRarity;
    variants: MountBagVariant[];
}

/**
 * Saddlebag definitions for a specific mount group.
 * Each mount group has exactly 5 rarity tiers, each with 5 variants.
 * Legendary and Mythic tiers are obtainable-only (no price).
 */
export interface MountBagDef {
    mountId: string;
    tiers: MountBagTier[];
}

/** Master list of all mount bag definitions, keyed by mount group ID. */
export const MOUNT_BAGS: MountBagDef[] = [
    // ==========================================
    // CATEGORY 1: ALL ROLES
    // ==========================================
    {
        mountId: 'draft_beasts',
        tiers: [
            {
                rarity: 'Common',
                variants: [
                    { name: 'Canvas Saddlebag', desc: 'A rough-sewn cloth bag draped over the saddle horn.', price: 8, weight: 1, extraSlots: 2 },
                    { name: 'Burlap Pack-Sling', desc: 'Coarse grain-sack repurposed to hang from the cantle.', price: 12, weight: 1, extraSlots: 2 },
                    { name: 'Straw-Padded Pannier', desc: 'Wicker basket lined with straw to cushion fragile cargo.', price: 15, weight: 2, extraSlots: 3 },
                    { name: 'Rope-Tied Cargo Net', desc: 'A knotted hemp net cinched across the hindquarters.', price: 10, weight: 1, extraSlots: 2 },
                    { name: 'Patched Leather Saddleroll', desc: 'Cracked hide stitched together from salvaged scraps.', price: 18, weight: 2, extraSlots: 3 }
                ]
            },
            {
                rarity: 'Uncommon',
                variants: [
                    { name: 'Reinforced Leather Pannier', desc: 'Double-layered cowhide with copper rivets at every seam.', price: 45, weight: 2, extraSlots: 4 },
                    { name: 'Waxed Canvas Trail-Pack', desc: 'Waterproofed fabric that sheds rain without soaking cargo.', price: 55, weight: 2, extraSlots: 4 },
                    { name: 'Double-Stitched Cargo Harness', desc: 'A chest-wrap harness distributing weight across the barrel.', price: 60, weight: 3, extraSlots: 5 },
                    { name: 'Oiled Hide Supply Bag', desc: 'Treated leather that resists rot even in monsoon conditions.', price: 50, weight: 2, extraSlots: 4 },
                    { name: 'Iron-Buckle Saddlebag', desc: 'Sturdy buckles prevent the flaps from working open at a gallop.', price: 65, weight: 3, extraSlots: 5 }
                ]
            },
            {
                rarity: 'Rare',
                variants: [
                    { name: 'Masterwork Riding Pack', desc: 'Guild-certified craftsmanship with hidden interior pockets.', price: 220, weight: 3, extraSlots: 6 },
                    { name: 'Steel-Framed Pannier Box', desc: 'Rigid metal skeleton prevents crushing under heavy loads.', price: 280, weight: 4, extraSlots: 7 },
                    { name: 'Heavy-Duty Expedition Harness', desc: 'Load-bearing straps rated for siege supply transport.', price: 300, weight: 4, extraSlots: 7 },
                    { name: 'Brass-Clasped Courier Saddlebag', desc: 'Lockable clasps protect royal dispatches from theft.', price: 250, weight: 3, extraSlots: 6 },
                    { name: 'Tanner\'s Pride Saddlepack', desc: 'An award-winning design from the Merchant\'s Quarter exhibition.', price: 350, weight: 3, extraSlots: 7 }
                ]
            },
            {
                rarity: 'Legendary',
                variants: [
                    { name: 'Wanderer\'s Enduring Pack', desc: 'Leather that never cracks, thread that never frays. Carried across three continents.', weight: 4, extraSlots: 8 },
                    { name: 'Trailmaster\'s Legacy Bag', desc: 'Passed down through seven generations of royal couriers.', weight: 4, extraSlots: 9 },
                    { name: 'Saddlebag of the First Courier', desc: 'The original dispatch bag used to carry the armistice that ended the Century War.', weight: 3, extraSlots: 8 },
                    { name: 'Oxhide of the Iron Caravan', desc: 'Skinned from the legendary pack-ox that survived the Blizzard of Ashenvale.', weight: 5, extraSlots: 10 },
                    { name: 'Dawn-Road Pannier', desc: 'Woven from twilight fibers by a hermit saddler who vanished the day after completion.', weight: 3, extraSlots: 9 }
                ]
            },
            {
                rarity: 'Mythic',
                variants: [
                    { name: 'Pannier of the Eternal March', desc: 'Its interior is larger than its exterior. No one can explain why.', weight: 4, extraSlots: 12 },
                    { name: 'Saddlebag of the World-Wanderer', desc: 'Supposedly carried every known spice, herb, and mineral at least once.', weight: 5, extraSlots: 12 },
                    { name: 'Pack of Boundless Burden', desc: 'Absorbs weight into a pocket dimension stitched between the lining.', weight: 2, extraSlots: 14 },
                    { name: 'Harness of the Titan Drover', desc: 'Forged for a giant\'s mount. Scaled down, it still carries inhuman loads.', weight: 6, extraSlots: 13 },
                    { name: 'Reliquary of the Beast-King', desc: 'A sacred vessel that hums with the gratitude of ten thousand tamed creatures.', weight: 4, extraSlots: 14 }
                ]
            }
        ]
    },
    {
        mountId: 'scourge_runners',
        tiers: [
            {
                rarity: 'Common',
                variants: [
                    { name: 'Scout\'s Hip Sack', desc: 'A small pouch lashed to the saddle\'s rear dee-ring.', price: 15, weight: 1, extraSlots: 2 },
                    { name: 'Messenger\'s Dispatch Roll', desc: 'A cylindrical tube strapped behind the cantle for scrolls.', price: 18, weight: 1, extraSlots: 2 },
                    { name: 'Cavalry Ration Pouch', desc: 'Divided pockets keep hardtack separate from jerky.', price: 12, weight: 1, extraSlots: 2 },
                    { name: 'Light Skirmisher\'s Pack', desc: 'Low-profile bag that sits flat against the horse\'s flank.', price: 20, weight: 1, extraSlots: 3 },
                    { name: 'Outrider\'s Sling-Bag', desc: 'A quick-release sling for dropping cargo at full gallop.', price: 22, weight: 2, extraSlots: 3 }
                ]
            },
            {
                rarity: 'Uncommon',
                variants: [
                    { name: 'Lancer\'s Saddlecase', desc: 'Hardened leather shell that deflects stray arrow impacts.', price: 70, weight: 2, extraSlots: 4 },
                    { name: 'Sprinter\'s Aero-Pack', desc: 'Streamlined profile reduces wind drag at high speeds.', price: 80, weight: 2, extraSlots: 4 },
                    { name: 'Barded Flank-Bag', desc: 'Integrated into light barding for seamless protection.', price: 90, weight: 3, extraSlots: 5 },
                    { name: 'War-Dispatch Satchel', desc: 'Fireproofed interior protects battlefield orders from flame arrows.', price: 85, weight: 2, extraSlots: 5 },
                    { name: 'Charger\'s Divide-Pack', desc: 'Twin compartments balanced on both flanks for stable weight distribution.', price: 75, weight: 3, extraSlots: 5 }
                ]
            },
            {
                rarity: 'Rare',
                variants: [
                    { name: 'Knight-Captain\'s War Pannier', desc: 'Embossed with regimental crests, built for campaign-length endurance.', price: 350, weight: 3, extraSlots: 6 },
                    { name: 'Joust-Master\'s Trophy Bag', desc: 'Reinforced to carry heavy tournament prizes without tearing.', price: 400, weight: 4, extraSlots: 7 },
                    { name: 'Destrier\'s Armored Saddlecase', desc: 'Steel plates sewn into the leather deflect lance strikes.', price: 450, weight: 4, extraSlots: 6 },
                    { name: 'Cavalry Officer\'s Field Kit', desc: 'Contains integrated map-sleeve, compass loop, and spyglass holster.', price: 380, weight: 3, extraSlots: 7 },
                    { name: 'Outrider\'s Endurance Rig', desc: 'Distribution harness rated for three-day forced marches.', price: 420, weight: 4, extraSlots: 7 }
                ]
            },
            {
                rarity: 'Legendary',
                variants: [
                    { name: 'Saddlebag of the Last Outrider', desc: 'Carried the final warning before the siege of Ironfall. The rider did not survive.', weight: 3, extraSlots: 8 },
                    { name: 'Champion\'s Tourney Pack', desc: 'Awarded only to the winner of the Grand Melee. Stitched from the hide of the king\'s own bull.', weight: 4, extraSlots: 9 },
                    { name: 'Dispatch of the Burning Plains', desc: 'The bag survived the firestorm that consumed the Fifth Army. Its contents did not.', weight: 3, extraSlots: 9 },
                    { name: 'Charger\'s Eternal Harness', desc: 'Self-mending straps that knit themselves back together overnight.', weight: 4, extraSlots: 10 },
                    { name: 'Banner-Bearer\'s Reliquary', desc: 'Contains a hidden compartment sized exactly for a folded war-standard.', weight: 5, extraSlots: 8 }
                ]
            },
            {
                rarity: 'Mythic',
                variants: [
                    { name: 'Pack of the Phantom Cavalry', desc: 'Ghostly saddlebag that phases through obstacles when the rider charges.', weight: 2, extraSlots: 12 },
                    { name: 'War-Saddle of the Conqueror', desc: 'Won from the corpse of a tyrant whose empire spanned the known world.', weight: 5, extraSlots: 13 },
                    { name: 'Lightning-Strider\'s Courier Bag', desc: 'Contents arrive at the destination before the rider does.', weight: 3, extraSlots: 12 },
                    { name: 'Saddlebag of Infinite Dispatch', desc: 'Every letter placed inside duplicates itself to all allied commanders.', weight: 4, extraSlots: 14 },
                    { name: 'Ashen Mantle of the War-Herald', desc: 'Forged in the aftermath of the Ruination. Smells permanently of smoke and iron.', weight: 5, extraSlots: 13 }
                ]
            }
        ]
    },
    {
        mountId: 'heavy_behemoths',
        tiers: [
            {
                rarity: 'Common',
                variants: [
                    { name: 'Howdah Supply Crate', desc: 'A rough wooden box strapped to the howdah railing.', price: 25, weight: 3, extraSlots: 3 },
                    { name: 'Hide Drape-Bag', desc: 'An enormous skin draped and tied across the creature\'s back.', price: 20, weight: 2, extraSlots: 3 },
                    { name: 'Rope-Slung Barrel', desc: 'A half-barrel suspended by thick hemp against the flank.', price: 18, weight: 3, extraSlots: 2 },
                    { name: 'Canvas Siege-Sack', desc: 'An oversized sack designed for carrying siege ammunition.', price: 22, weight: 2, extraSlots: 3 },
                    { name: 'Lashed Cargo Platform', desc: 'A flat wooden pallet tied across the spine with anchor ropes.', price: 30, weight: 3, extraSlots: 3 }
                ]
            },
            {
                rarity: 'Uncommon',
                variants: [
                    { name: 'Reinforced Howdah Locker', desc: 'Iron-banded chest bolted directly to the howdah frame.', price: 100, weight: 3, extraSlots: 5 },
                    { name: 'War-Elephant\'s Flank Chest', desc: 'Hardened wooden chest hung from the barding with chain links.', price: 120, weight: 4, extraSlots: 5 },
                    { name: 'Mammoth-Hide Cargo Wrap', desc: 'Cured mammoth-skin that waterproofs everything bundled inside.', price: 110, weight: 3, extraSlots: 5 },
                    { name: 'Siege-Engineer\'s Tool Rack', desc: 'A lattice of hooks and loops organized for heavy maintenance tools.', price: 130, weight: 4, extraSlots: 6 },
                    { name: 'Behemoth Barrel Harness', desc: 'Carries two full water-barrels, one per flank.', price: 95, weight: 4, extraSlots: 5 }
                ]
            },
            {
                rarity: 'Rare',
                variants: [
                    { name: 'Iron-Plated Howdah Vault', desc: 'Lockable armored compartment welded into the howdah floor.', price: 500, weight: 5, extraSlots: 7 },
                    { name: 'Siege-Captain\'s Command Chest', desc: 'Contains integrated map-table, sand-timer, and signal flag storage.', price: 600, weight: 5, extraSlots: 7 },
                    { name: 'Triceratops Flank-Armor Cache', desc: 'Hidden compartments built into the creature\'s own barding plates.', price: 550, weight: 4, extraSlots: 8 },
                    { name: 'Mammoth War-Trunk', desc: 'An enormous reinforced chest large enough to hold a full suit of plate armor.', price: 650, weight: 5, extraSlots: 7 },
                    { name: 'Tortoise-Shell Supply Dome', desc: 'A curved armored shell that sheds projectiles while protecting cargo.', price: 700, weight: 5, extraSlots: 8 }
                ]
            },
            {
                rarity: 'Legendary',
                variants: [
                    { name: 'Vault of the Siege-Breaker', desc: 'Recovered from a war-elephant that single-handedly broke the Gates of Khordun.', weight: 5, extraSlots: 9 },
                    { name: 'Mammoth-King\'s Burden', desc: 'The harness of the last great mammoth. Its straps creak with ancient authority.', weight: 5, extraSlots: 10 },
                    { name: 'Ironclad of the Battering Line', desc: 'Forged from melted-down portcullis gates of seven conquered fortresses.', weight: 6, extraSlots: 9 },
                    { name: 'Howdah of the Warlord\'s Throne', desc: 'More command post than cargo hold. Generals have waged entire campaigns from its seat.', weight: 6, extraSlots: 10 },
                    { name: 'Shell-Fortress Reliquary', desc: 'Taken from a tortoise so ancient its shell had calcified into living stone.', weight: 5, extraSlots: 10 }
                ]
            },
            {
                rarity: 'Mythic',
                variants: [
                    { name: 'Howdah of the Earth-Shaker', desc: 'The platform trembles with seismic resonance. Items stored inside never break.', weight: 6, extraSlots: 13 },
                    { name: 'Vault of the Colossus', desc: 'A pocket dimension disguised as a simple iron chest. Its interior defies geometry.', weight: 4, extraSlots: 14 },
                    { name: 'Primoridal Hide Wrap', desc: 'Skinned from a creature that predates written history. Impervious to all known acids.', weight: 5, extraSlots: 12 },
                    { name: 'Burden-Eater\'s Harness', desc: 'The harness consumes the concept of weight. Cargo inside weighs nothing.', weight: 2, extraSlots: 14 },
                    { name: 'Siege-God\'s Arsenal', desc: 'Contains a full armory in a space that should hold a single blade.', weight: 6, extraSlots: 13 }
                ]
            }
        ]
    },
    {
        mountId: 'wind_chasers',
        tiers: [
            {
                rarity: 'Common',
                variants: [
                    { name: 'Feathered Saddle-Pouch', desc: 'A lightweight pouch clipped beneath the flight saddle.', price: 20, weight: 1, extraSlots: 2 },
                    { name: 'Wind-Strapped Sling', desc: 'A cloth sling that presses flat against the body during dives.', price: 18, weight: 1, extraSlots: 2 },
                    { name: 'Talon-Grip Carrier', desc: 'A small cage carried in the creature\'s talons during flight.', price: 25, weight: 1, extraSlots: 2 },
                    { name: 'Aeronaut\'s Belt-Pack', desc: 'Worn by the rider but designed for aerial access at altitude.', price: 22, weight: 1, extraSlots: 3 },
                    { name: 'Gust-Proof Saddle Roll', desc: 'Buckled down with triple straps to survive turbulence.', price: 28, weight: 2, extraSlots: 3 }
                ]
            },
            {
                rarity: 'Uncommon',
                variants: [
                    { name: 'Sky-Rider\'s Pannier', desc: 'Aerodynamic leather pods that reduce drag at cruising altitude.', price: 90, weight: 2, extraSlots: 4 },
                    { name: 'Gale-Sealed Satchel', desc: 'Wax-sealed openings prevent contents from scattering in crosswinds.', price: 100, weight: 2, extraSlots: 4 },
                    { name: 'Cloud-Silk Carrier', desc: 'Woven from spider-silk harvested at extreme altitudes. Featherweight.', price: 120, weight: 1, extraSlots: 5 },
                    { name: 'Raptor-Claw Cargo Harness', desc: 'Distributes load across the chest and shoulders of the flyer.', price: 110, weight: 2, extraSlots: 5 },
                    { name: 'Storm-Flap Saddle Case', desc: 'Hinged lid locks magnetically shut when airspeed exceeds a threshold.', price: 95, weight: 2, extraSlots: 4 }
                ]
            },
            {
                rarity: 'Rare',
                variants: [
                    { name: 'Gryphon-Rider\'s War Chest', desc: 'Armored flight-case with integrated weapon holsters.', price: 450, weight: 3, extraSlots: 6 },
                    { name: 'Wind-Walker\'s Expedition Pack', desc: 'Multi-day rations, waterskin, and navigation tools in one sealed unit.', price: 500, weight: 3, extraSlots: 7 },
                    { name: 'Roc-Feather Courier Satchel', desc: 'Insulated with roc down to keep contents at stable temperature.', price: 480, weight: 3, extraSlots: 6 },
                    { name: 'Altitude-Rated Supply Harness', desc: 'Pressurized compartments that function at the edge of the atmosphere.', price: 550, weight: 4, extraSlots: 7 },
                    { name: 'Falcon-Master\'s Trophy Case', desc: 'Displays a collection of sky-hunt trophies under a glass-and-iron lid.', price: 520, weight: 3, extraSlots: 7 }
                ]
            },
            {
                rarity: 'Legendary',
                variants: [
                    { name: 'Satchel of the Cloud-Piercer', desc: 'Carried by the first rider to cross the Stormwall. Ice crystals still cling to the interior.', weight: 3, extraSlots: 8 },
                    { name: 'Sky-Marshal\'s Command Case', desc: 'Contains the original signal-flag codex of the Aerie Guard.', weight: 4, extraSlots: 9 },
                    { name: 'Wind-Woven Reliquary', desc: 'The bag itself is partially made of solidified wind. It hums when touched.', weight: 2, extraSlots: 9 },
                    { name: 'Eagle-Lord\'s Legacy Pack', desc: 'Only opens for riders who have proven themselves above the cloud line.', weight: 3, extraSlots: 10 },
                    { name: 'Harness of the Gale Sovereign', desc: 'Straps woven from the mane of a storm-elemental. They never tangle.', weight: 4, extraSlots: 8 }
                ]
            },
            {
                rarity: 'Mythic',
                variants: [
                    { name: 'Void-Sky Carrier', desc: 'Opens into the airless void between the stars. Contents float in perfect stasis.', weight: 2, extraSlots: 12 },
                    { name: 'Bag of the Eternal Updraft', desc: 'Its contents are perpetually weightless, suspended by an interior cyclone.', weight: 1, extraSlots: 14 },
                    { name: 'Storm-Heart Reliquary', desc: 'Contains a sliver of a living thunderstorm. The bag crackles with static.', weight: 3, extraSlots: 12 },
                    { name: 'Feather of the First Roc', desc: 'A single impossible feather, hollowed and sealed. Its quill holds an armory.', weight: 2, extraSlots: 13 },
                    { name: 'Celestial Talon-Vault', desc: 'Carried between worlds by a creature that flew beyond the firmament and returned.', weight: 4, extraSlots: 14 }
                ]
            }
        ]
    },
    {
        mountId: 'world_striders',
        tiers: [
            {
                rarity: 'Common',
                variants: [
                    { name: 'Howdah Cargo Net', desc: 'A wide-mesh net stretched across the creature\'s broad back.', price: 30, weight: 2, extraSlots: 3 },
                    { name: 'Spine-Lashed Crate', desc: 'A wooden crate roped between the dorsal spines.', price: 35, weight: 3, extraSlots: 3 },
                    { name: 'Colossus-Hide Drape', desc: 'A tanned skin from a lesser beast draped over the walking platform.', price: 28, weight: 2, extraSlots: 3 },
                    { name: 'Migration-Route Barrel', desc: 'A sealed barrel that has rolled across every known trade route.', price: 32, weight: 3, extraSlots: 3 },
                    { name: 'Giant\'s Satchel', desc: 'Comically oversized for a human but fits naturally on a world strider.', price: 40, weight: 2, extraSlots: 3 }
                ]
            },
            {
                rarity: 'Uncommon',
                variants: [
                    { name: 'Titan-Howdah Locker', desc: 'An iron-banded chest permanently bolted to the observation deck.', price: 140, weight: 4, extraSlots: 5 },
                    { name: 'Leviathan-Scale Pannier', desc: 'Container fashioned from the shed scale of a land-whale.', price: 160, weight: 3, extraSlots: 5 },
                    { name: 'Treant-Hollow Cache', desc: 'A living wooden cavity that slowly seals itself shut on command.', price: 180, weight: 3, extraSlots: 6 },
                    { name: 'Colossus Flank-Rack', desc: 'A ladder-mounted rack system bolted into the creature\'s barding.', price: 150, weight: 4, extraSlots: 5 },
                    { name: 'Beetle-Shell Cargo Pod', desc: 'A hollowed-out carapace piece repurposed as a watertight container.', price: 170, weight: 4, extraSlots: 6 }
                ]
            },
            {
                rarity: 'Rare',
                variants: [
                    { name: 'Fortress-Deck Supply Vault', desc: 'A walk-in chamber built into the howdah superstructure.', price: 700, weight: 5, extraSlots: 7 },
                    { name: 'Magma-Proofed Strongbox', desc: 'Ceramic-lined iron chest rated for volcanic terrain crossing.', price: 750, weight: 5, extraSlots: 7 },
                    { name: 'Snail-Trail Cargo Sledge', desc: 'A sledge that glides effortlessly in the creature\'s wake of cooled magma.', price: 800, weight: 5, extraSlots: 8 },
                    { name: 'World-Walker\'s Map Vault', desc: 'Climate-controlled interior preserves ancient maps and navigation charts.', price: 680, weight: 4, extraSlots: 7 },
                    { name: 'Titan\'s Yoke-Chest', desc: 'Hangs from the yoke harness; counterweighted for zero apparent load.', price: 720, weight: 5, extraSlots: 8 }
                ]
            },
            {
                rarity: 'Legendary',
                variants: [
                    { name: 'Vault of the Continental Crossing', desc: 'Carried supplies for the army that marched across the Sundering Strait.', weight: 5, extraSlots: 9 },
                    { name: 'Shell of the Ancient One', desc: 'A compartment carved from the fossilized shell of a titan tortoise.', weight: 5, extraSlots: 10 },
                    { name: 'Root-Woven Ark', desc: 'Grown by a dying treant to preserve the seeds of a vanishing forest.', weight: 4, extraSlots: 9 },
                    { name: 'Elk-Antler Crown Rack', desc: 'The shed antler of the Storm-Treader, hollowed and fitted with drawers.', weight: 5, extraSlots: 10 },
                    { name: 'Leviathan\'s Gullet Pouch', desc: 'Stitched from the stomach lining of a land-whale. Acid-proof.', weight: 4, extraSlots: 10 }
                ]
            },
            {
                rarity: 'Mythic',
                variants: [
                    { name: 'Ark of the World-Eater', desc: 'Every item placed inside exists simultaneously in all locations the beast has visited.', weight: 5, extraSlots: 13 },
                    { name: 'God-Horn Reliquary', desc: 'Carved from the horn of a mythic rhino. Its interior bends space.', weight: 6, extraSlots: 14 },
                    { name: 'Volcanic Heart-Chamber', desc: 'A living geode that grows additional storage cavities when fed raw minerals.', weight: 5, extraSlots: 12 },
                    { name: 'Continental Drift Vault', desc: 'Contents shift between tectonic realities. Retrieval requires precise timing.', weight: 4, extraSlots: 13 },
                    { name: 'Shell of the Primordial Tortoise', desc: 'Predates the world itself. Its interior contains a pocket of pre-creation void.', weight: 6, extraSlots: 14 }
                ]
            }
        ]
    },

    // ==========================================
    // CATEGORY 2: ALL RACES
    // ==========================================
    {
        mountId: 'pack_lizards',
        tiers: [
            {
                rarity: 'Common',
                variants: [
                    { name: 'Gecko-Grip Pouch', desc: 'A small bag with adhesive-coated straps that cling to scales.', price: 10, weight: 1, extraSlots: 2 },
                    { name: 'Scale-Stitched Sling', desc: 'Sewn from shed lizard-skin, nearly invisible against the mount.', price: 12, weight: 1, extraSlots: 2 },
                    { name: 'Jungle Vine Pannier', desc: 'Braided tropical vines woven into a flexible carrying basket.', price: 14, weight: 1, extraSlots: 2 },
                    { name: 'Desert Runner\'s Waterskin Rig', desc: 'A harness designed to carry multiple waterskins without rattling.', price: 16, weight: 1, extraSlots: 3 },
                    { name: 'Swamp-Reed Basket', desc: 'Woven from hollow reeds, surprisingly buoyant in water.', price: 11, weight: 1, extraSlots: 2 }
                ]
            },
            {
                rarity: 'Uncommon',
                variants: [
                    { name: 'Chameleon-Weave Satchel', desc: 'The bag shifts color to match the mount\'s current camouflage.', price: 55, weight: 2, extraSlots: 4 },
                    { name: 'Crag-Climber\'s Anchor Pack', desc: 'Magnetized clips lock gear to the lizard\'s bony ridges.', price: 65, weight: 2, extraSlots: 4 },
                    { name: 'Venom-Sealed Pouch', desc: 'Interior coated in dried monitor-saliva; repels insects and rot.', price: 70, weight: 2, extraSlots: 5 },
                    { name: 'Belly-Slung Cargo Net', desc: 'Hung underneath the lizard\'s torso, hidden from casual sight.', price: 60, weight: 2, extraSlots: 4 },
                    { name: 'Tail-Base Harness', desc: 'Strapped around the thick tail-base for low center of gravity.', price: 75, weight: 3, extraSlots: 5 }
                ]
            },
            {
                rarity: 'Rare',
                variants: [
                    { name: 'Basilisk-Hide Courier Case', desc: 'Cured in petrifying venom; the leather is literally stone-hard.', price: 280, weight: 3, extraSlots: 6 },
                    { name: 'Wall-Crawler\'s Vertical Pack', desc: 'Stays sealed even during inverted climbing runs.', price: 300, weight: 3, extraSlots: 7 },
                    { name: 'Sand-Burrow Cache', desc: 'Collapsible compartment that compresses flat when the lizard dives underground.', price: 320, weight: 3, extraSlots: 6 },
                    { name: 'Monitor\'s War-Saddle Pouch', desc: 'Reinforced with monitor-bone splints; survives being crushed underfoot.', price: 350, weight: 4, extraSlots: 7 },
                    { name: 'Thermal-Scaled Strongbag', desc: 'Heat-reactive scales seal the openings when ambient temperature drops.', price: 290, weight: 3, extraSlots: 7 }
                ]
            },
            {
                rarity: 'Legendary',
                variants: [
                    { name: 'Satchel of the Sand-King', desc: 'Carried by the great desert monitor that crossed the Ashwaste without water.', weight: 3, extraSlots: 8 },
                    { name: 'Venom-Lord\'s Trophy Bag', desc: 'Fashioned from the gullet of a venom-spitter that killed a warlord.', weight: 3, extraSlots: 9 },
                    { name: 'Chameleon Cloak-Pack', desc: 'Renders itself and its contents completely invisible at will.', weight: 2, extraSlots: 9 },
                    { name: 'Gecko-God\'s Climbing Harness', desc: 'Grants the mount the ability to walk on ceilings. The bag never falls.', weight: 3, extraSlots: 10 },
                    { name: 'Petrified Basilisk Carrier', desc: 'Carved from a basilisk that petrified itself. Indestructible.', weight: 4, extraSlots: 8 }
                ]
            },
            {
                rarity: 'Mythic',
                variants: [
                    { name: 'Satchel of the World-Serpent', desc: 'The interior coils endlessly inward, like the body of an infinite snake.', weight: 2, extraSlots: 12 },
                    { name: 'Molt of the Primordial Lizard', desc: 'A shed skin that still lives. It grows new compartments when needed.', weight: 3, extraSlots: 13 },
                    { name: 'Venom-Dimension Pouch', desc: 'Contents are dissolved into venom, then reconstituted perfectly upon retrieval.', weight: 2, extraSlots: 14 },
                    { name: 'Scale of the Leviathan', desc: 'A single scale from something that dwarfed continents. Its hollow interior is vast.', weight: 4, extraSlots: 12 },
                    { name: 'Tail-Tip Infinity Cache', desc: 'Attached to the tail. The tail grows longer to accommodate more cargo.', weight: 3, extraSlots: 13 }
                ]
            }
        ]
    },
    {
        mountId: 'cavern_crawlers',
        tiers: [
            {
                rarity: 'Common',
                variants: [
                    { name: 'Chitin Clip-Pouch', desc: 'Hooks directly onto the insect\'s dorsal plates.', price: 12, weight: 1, extraSlots: 2 },
                    { name: 'Silk-Wrapped Bundle', desc: 'Spider-silk bindings compress cargo into a tight cylinder.', price: 15, weight: 1, extraSlots: 2 },
                    { name: 'Tunnel-Runner\'s Sack', desc: 'Narrow profile that won\'t snag on the cave walls.', price: 14, weight: 1, extraSlots: 2 },
                    { name: 'Glow-Worm Lantern Bag', desc: 'Translucent membrane that serves as both bag and light source.', price: 18, weight: 1, extraSlots: 3 },
                    { name: 'Beetle-Horn Sling', desc: 'Straps looped around the horn for dangling a cargo net.', price: 13, weight: 1, extraSlots: 2 }
                ]
            },
            {
                rarity: 'Uncommon',
                variants: [
                    { name: 'Reinforced Chitin Case', desc: 'Hardened exoskeleton fragment hollowed out and fitted with a hinge.', price: 60, weight: 2, extraSlots: 4 },
                    { name: 'Web-Anchor Cargo Cocoon', desc: 'Wrapped in structural webbing that bonds to any surface.', price: 75, weight: 2, extraSlots: 5 },
                    { name: 'Centipede Segment Locker', desc: 'Built into a modified body-segment of an armored centipede.', price: 70, weight: 3, extraSlots: 4 },
                    { name: 'Bombardier\'s Acid-Proof Pack', desc: 'Interior lined with neutralizing compound to survive chemical splashes.', price: 80, weight: 2, extraSlots: 5 },
                    { name: 'Mandible-Grip Carrier', desc: 'The insect holds the cargo in its mandibles when walking.', price: 65, weight: 2, extraSlots: 4 }
                ]
            },
            {
                rarity: 'Rare',
                variants: [
                    { name: 'Mantis-Claw Lockbox', desc: 'Sealed by chitinous clasps that require specific pressure patterns to open.', price: 320, weight: 3, extraSlots: 6 },
                    { name: 'Deep-Hive Storage Cell', desc: 'A wax-sealed hexagonal chamber taken from a giant hive.', price: 350, weight: 3, extraSlots: 7 },
                    { name: 'Silk-Cocoon Preservation Vault', desc: 'Air-tight silk wrapping preserves organic contents indefinitely.', price: 380, weight: 3, extraSlots: 7 },
                    { name: 'Cave-Spider War-Pack', desc: 'Web-reinforced container that absorbs impact from underground rockfalls.', price: 340, weight: 4, extraSlots: 6 },
                    { name: 'Cicada-Shell Echo Chamber', desc: 'Resonates at specific frequencies to alert the rider of tampering.', price: 360, weight: 3, extraSlots: 7 }
                ]
            },
            {
                rarity: 'Legendary',
                variants: [
                    { name: 'Cocoon of the Hive-Queen', desc: 'Spun by the matriarch of the Deep Hive as a gift to the first tamers.', weight: 3, extraSlots: 8 },
                    { name: 'Mantis-Lord\'s Kill Cache', desc: 'Contains the razor-claw\'s lifetime collection of trophy mandibles.', weight: 4, extraSlots: 9 },
                    { name: 'Web-Woven Reliquary', desc: 'A perfect geometric web that holds items in suspended animation.', weight: 2, extraSlots: 9 },
                    { name: 'Shell of the Boring-King', desc: 'Taken from the beetle that carved the Great Chasm. It still vibrates.', weight: 5, extraSlots: 10 },
                    { name: 'Chrysalis of the Death-Moth', desc: 'An abandoned pupal case large enough to hold a grown man inside.', weight: 3, extraSlots: 8 }
                ]
            },
            {
                rarity: 'Mythic',
                variants: [
                    { name: 'Nest of the All-Mother', desc: 'A living hive-structure that repairs itself and grows new chambers.', weight: 3, extraSlots: 12 },
                    { name: 'Web of the Void-Spinner', desc: 'Strands extend into a parallel dimension. Items hang in nothingness.', weight: 2, extraSlots: 14 },
                    { name: 'Chitin of the Eternal Swarm', desc: 'Composed of billions of microscopic insects forming any shape on command.', weight: 4, extraSlots: 13 },
                    { name: 'Silk-Tomb of the Ancient', desc: 'A cocoon that was never opened. Whatever was inside became the bag itself.', weight: 3, extraSlots: 12 },
                    { name: 'Hive-Mind Cargo Matrix', desc: 'Every insect in the cavern instinctively protects and carries for this vessel.', weight: 2, extraSlots: 14 }
                ]
            }
        ]
    },
    {
        mountId: 'bound_elementals',
        tiers: [
            {
                rarity: 'Common',
                variants: [
                    { name: 'Runed Cloth Wrap', desc: 'A simple fabric bundle inscribed with basic elemental ward-marks.', price: 20, weight: 1, extraSlots: 2 },
                    { name: 'Flame-Resistant Satchel', desc: 'Asbestos-lined bag that survives close proximity to fire elementals.', price: 22, weight: 1, extraSlots: 2 },
                    { name: 'Frost-Crystal Pouch', desc: 'A pouch of perpetually cold crystal that keeps contents chilled.', price: 18, weight: 1, extraSlots: 2 },
                    { name: 'Wind-Tethered Sling', desc: 'Floats alongside the elemental mount, connected by a current of air.', price: 25, weight: 1, extraSlots: 3 },
                    { name: 'Earth-Clod Carrier', desc: 'A hardened clay vessel that travels embedded in the elemental\'s body.', price: 19, weight: 2, extraSlots: 2 }
                ]
            },
            {
                rarity: 'Uncommon',
                variants: [
                    { name: 'Warded Containment Satchel', desc: 'Arcane glyphs stabilize the elemental energy surrounding the cargo.', price: 80, weight: 2, extraSlots: 4 },
                    { name: 'Magma-Forged Lockbox', desc: 'Cast in a volcano\'s caldera; immune to melting or warping.', price: 100, weight: 3, extraSlots: 5 },
                    { name: 'Condensation-Glass Pack', desc: 'Water elemental moisture condenses into a self-cleaning vessel.', price: 90, weight: 2, extraSlots: 4 },
                    { name: 'Static-Field Carrier', desc: 'Lightning keeps the bag levitating at the rider\'s hip.', price: 95, weight: 1, extraSlots: 5 },
                    { name: 'Sandstone Partition Box', desc: 'Earth elemental compresses sand into airtight compartments.', price: 85, weight: 3, extraSlots: 4 }
                ]
            },
            {
                rarity: 'Rare',
                variants: [
                    { name: 'Elemental Core Cache', desc: 'Hollowed from the remnants of a dead elemental. Hums with residual energy.', price: 400, weight: 3, extraSlots: 6 },
                    { name: 'Runebound Storm-Case', desc: 'Containment runes cycle through all four elements, adapting to threats.', price: 450, weight: 3, extraSlots: 7 },
                    { name: 'Permafrost Vault', desc: 'Contents are flash-frozen on entry, perfectly preserved until thawed.', price: 420, weight: 4, extraSlots: 6 },
                    { name: 'Ember-Forge Saddlepack', desc: 'A miniature smithy powered by the mount\'s own thermal waste.', price: 480, weight: 4, extraSlots: 7 },
                    { name: 'Crystal Lattice Container', desc: 'Transparent mineral structure that absorbs minor physical shocks.', price: 430, weight: 3, extraSlots: 7 }
                ]
            },
            {
                rarity: 'Legendary',
                variants: [
                    { name: 'Vessel of the Unchained Storm', desc: 'Contains a shard of the first lightning bolt ever to split the sky.', weight: 3, extraSlots: 8 },
                    { name: 'Magmatic Heart-Chest', desc: 'A chest forged inside an erupting volcano. The latch is a cooled lava-flow.', weight: 4, extraSlots: 9 },
                    { name: 'Tidecaller\'s Abyssal Pouch', desc: 'Filled with water from the deepest oceanic trench. Contents float inside.', weight: 3, extraSlots: 9 },
                    { name: 'Cairn of the Earth-Titan', desc: 'A stack of ancient stones that rearrange themselves into a container.', weight: 5, extraSlots: 10 },
                    { name: 'Vial of the Frozen Aeon', desc: 'Time itself moves slower inside. Perishable goods last centuries.', weight: 2, extraSlots: 8 }
                ]
            },
            {
                rarity: 'Mythic',
                variants: [
                    { name: 'Crucible of the Primeval Flame', desc: 'The first fire. Everything placed inside is purified to its essential form.', weight: 3, extraSlots: 12 },
                    { name: 'Eye of the Maelstrom', desc: 'A stillpoint inside an eternal storm. Perfect calm amid infinite violence.', weight: 2, extraSlots: 14 },
                    { name: 'Bedrock of the World\'s Foundation', desc: 'A piece of the stone on which reality was built. Unbreakable.', weight: 6, extraSlots: 13 },
                    { name: 'Breath of the Void-Wind', desc: 'A bag made of solidified nothingness. It weighs what it should not.', weight: 1, extraSlots: 14 },
                    { name: 'Elemental Convergence Reliquary', desc: 'All four elements coexist inside, creating and destroying each other eternally.', weight: 4, extraSlots: 12 }
                ]
            }
        ]
    },
    {
        mountId: 'arcane_construct_mounts',
        tiers: [
            {
                rarity: 'Common',
                variants: [
                    { name: 'Riveted Saddlebin', desc: 'A simple iron bin bolted to the construct\'s chassis.', price: 20, weight: 2, extraSlots: 2 },
                    { name: 'Cog-Slot Cargo Tray', desc: 'A sliding tray that locks into the construct\'s gear-track.', price: 25, weight: 2, extraSlots: 3 },
                    { name: 'Bronze Panel Cache', desc: 'A hinged bronze panel concealing a shallow compartment.', price: 22, weight: 2, extraSlots: 2 },
                    { name: 'Oil-Stained Tool Pouch', desc: 'A grease-proof bag meant for carrying maintenance supplies.', price: 18, weight: 1, extraSlots: 2 },
                    { name: 'Spring-Loaded Cargo Shelf', desc: 'A retractable shelf that folds flat against the construct\'s hull.', price: 28, weight: 2, extraSlots: 3 }
                ]
            },
            {
                rarity: 'Uncommon',
                variants: [
                    { name: 'Rune-Etched Storage Module', desc: 'Arcane inscriptions ward the compartment against electromagnetic surges.', price: 90, weight: 2, extraSlots: 4 },
                    { name: 'Mithral-Plated Saddlecase', desc: 'Lightweight metallic shell that resists corrosion and denting.', price: 110, weight: 2, extraSlots: 5 },
                    { name: 'Gear-Driven Lockbox', desc: 'A mechanical combination lock with ten thousand possible configurations.', price: 100, weight: 3, extraSlots: 4 },
                    { name: 'Furnace-Vented Cargo Hold', desc: 'Channels the construct\'s waste heat to dry and preserve stored goods.', price: 95, weight: 3, extraSlots: 5 },
                    { name: 'Articulated Spine-Rack', desc: 'Segmented metal spine that flexes with the construct\'s movement.', price: 105, weight: 3, extraSlots: 5 }
                ]
            },
            {
                rarity: 'Rare',
                variants: [
                    { name: 'Adamantine Hull Compartment', desc: 'An indestructible chamber buried deep within the construct\'s torso.', price: 500, weight: 4, extraSlots: 7 },
                    { name: 'Arcane Capacitor Vault', desc: 'Stores magical energy alongside cargo; items inside gain a faint enchantment.', price: 550, weight: 3, extraSlots: 6 },
                    { name: 'Pneumatic Ejector Pack', desc: 'Contents can be launched at high velocity as an emergency defense.', price: 520, weight: 4, extraSlots: 7 },
                    { name: 'Soul-Gem Reinforced Cache', desc: 'Trapped soul provides perpetual temperature regulation and anti-theft alarm.', price: 600, weight: 3, extraSlots: 7 },
                    { name: 'Telescoping Storage Cylinder', desc: 'Extends and retracts from the construct\'s back, tripling apparent capacity.', price: 480, weight: 4, extraSlots: 8 }
                ]
            },
            {
                rarity: 'Legendary',
                variants: [
                    { name: 'Core Module of the Bronze Legion', desc: 'Standard issue for the automatons that guarded the Collapsed Empire.', weight: 3, extraSlots: 9 },
                    { name: 'Golem-Heart Safe', desc: 'The dead core of a ruined golem, repurposed into an impregnable lockbox.', weight: 4, extraSlots: 9 },
                    { name: 'Vault of the Artificer-Saint', desc: 'Built by the only artificer ever canonized. Its mechanisms are flawless.', weight: 4, extraSlots: 10 },
                    { name: 'Mithral-Spine Archive', desc: 'The construct\'s entire spinal column has been hollowed into a filing system.', weight: 3, extraSlots: 8 },
                    { name: 'Clockwork Infinity Module', desc: 'Gears inside turn forever without winding. Storage space reconfigures itself.', weight: 4, extraSlots: 10 }
                ]
            },
            {
                rarity: 'Mythic',
                variants: [
                    { name: 'Engine of the God-Forger', desc: 'A divine construct\'s cargo bay. Items stored inside are upgraded upon retrieval.', weight: 5, extraSlots: 13 },
                    { name: 'Self-Replicating Hull', desc: 'The construct grows new cargo compartments overnight from ambient minerals.', weight: 3, extraSlots: 14 },
                    { name: 'Paradox Chamber', desc: 'Contains a temporal loop. Items placed inside yesterday are already there today.', weight: 2, extraSlots: 14 },
                    { name: 'Arcane Singularity Core', desc: 'A collapsed star fragment. Its gravity well holds infinite cargo in zero space.', weight: 4, extraSlots: 12 },
                    { name: 'Construct-Soul Reliquary', desc: 'The construct\'s own consciousness chooses what to store and what to reject.', weight: 4, extraSlots: 13 }
                ]
            }
        ]
    },
    {
        mountId: 'celestial_chariots',
        tiers: [
            {
                rarity: 'Common',
                variants: [
                    { name: 'Pilgrim\'s Offering Box', desc: 'A simple wooden box placed at the chariot\'s rail for carrying votives.', price: 30, weight: 2, extraSlots: 3 },
                    { name: 'Blessed Linen Sack', desc: 'Clean white cloth sanctified by a minor temple attendant.', price: 25, weight: 1, extraSlots: 2 },
                    { name: 'Incense Coffer', desc: 'A fragrant cedar chest designed to hold ceremonial supplies.', price: 28, weight: 2, extraSlots: 2 },
                    { name: 'Chariot-Rail Cargo Hook', desc: 'A brass hook for suspending bags from the chariot\'s side-rail.', price: 22, weight: 1, extraSlots: 3 },
                    { name: 'Acolyte\'s Vestment Trunk', desc: 'A narrow chest sized for folded robes and prayer scrolls.', price: 35, weight: 2, extraSlots: 3 }
                ]
            },
            {
                rarity: 'Uncommon',
                variants: [
                    { name: 'Gold-Inlaid Reliquary Chest', desc: 'Decorated with devotional iconography and sealed with wax.', price: 120, weight: 3, extraSlots: 5 },
                    { name: 'Sanctified Iron Strongbox', desc: 'Holy water has been poured over every rivet during construction.', price: 130, weight: 3, extraSlots: 5 },
                    { name: 'Starlight-Woven Satchel', desc: 'Threads spun under starlight glow faintly in absolute darkness.', price: 140, weight: 2, extraSlots: 5 },
                    { name: 'Heavenly Amber Coffer', desc: 'Fossilized tree resin from the celestial plane, hollowed into a box.', price: 160, weight: 2, extraSlots: 6 },
                    { name: 'Chariot-Deck Supply Chest', desc: 'Bolted to the chariot floor with consecrated silver bolts.', price: 110, weight: 3, extraSlots: 5 }
                ]
            },
            {
                rarity: 'Rare',
                variants: [
                    { name: 'Ark of Sacred Passage', desc: 'A ceremonial chest used to carry holy relics between temples.', price: 600, weight: 4, extraSlots: 7 },
                    { name: 'Sunfire-Forged Vault', desc: 'Smelted in divine flame; radiates warmth and repels undead.', price: 700, weight: 4, extraSlots: 7 },
                    { name: 'Lunar-Silver Casket', desc: 'Cast from pure moonsilver during a total eclipse. Whispers in moonlight.', price: 650, weight: 3, extraSlots: 8 },
                    { name: 'Styx-Sealed Strongbox', desc: 'Locked by the same oath-magic that binds the River Styx. Unbreakable vows.', price: 750, weight: 4, extraSlots: 7 },
                    { name: 'Celestial Rosewood Ark', desc: 'Carved from a tree that grew in paradise. Its grain tells a story of creation.', price: 680, weight: 3, extraSlots: 8 }
                ]
            },
            {
                rarity: 'Legendary',
                variants: [
                    { name: 'Reliquary of the Sun-Chariot', desc: 'The original cargo hold of the chariot that carries the sun across the sky.', weight: 4, extraSlots: 9 },
                    { name: 'Moon-Barge\'s Tide-Chest', desc: 'Opens only during the correct lunar phase. Tides protect its contents.', weight: 3, extraSlots: 10 },
                    { name: 'Ossuary of the First Saint', desc: 'Once held the bones of a saint. Now radiates lingering holiness.', weight: 5, extraSlots: 9 },
                    { name: 'Sled-Vault of the Valkyrie', desc: 'Carried the souls of fallen heroes. Now carries somewhat less precious cargo.', weight: 4, extraSlots: 10 },
                    { name: 'Storm-Lord\'s Thunder Chest', desc: 'Lightning arcs across its surface. Only the worthy can open the latch.', weight: 4, extraSlots: 9 }
                ]
            },
            {
                rarity: 'Mythic',
                variants: [
                    { name: 'Ark of the Covenant Unbroken', desc: 'Contains a fragment of the original pact between gods and mortals.', weight: 5, extraSlots: 13 },
                    { name: 'Forge-God\'s Crucible Chest', desc: 'Items stored inside are reforged nightly by an invisible divine smith.', weight: 6, extraSlots: 14 },
                    { name: 'Reaper\'s Collection Box', desc: 'Items placed inside cease to exist in the mortal plane until recalled.', weight: 3, extraSlots: 14 },
                    { name: 'Paradise Seed-Vault', desc: 'A living container that blossoms, dies, and is reborn each dawn.', weight: 4, extraSlots: 12 },
                    { name: 'Firmament Shard Reliquary', desc: 'A piece of the sky itself, hollowed out. Stars still twinkle inside.', weight: 3, extraSlots: 13 }
                ]
            }
        ]
    },

    // ==========================================
    // CATEGORY 3: SPECIFIC ROLE
    // ==========================================
    {
        mountId: 'holy_steeds',
        tiers: [
            {
                rarity: 'Common',
                variants: [
                    { name: 'Pilgrim\'s Prayer Satchel', desc: 'A simple white canvas bag embroidered with a sun-disc.', price: 15, weight: 1, extraSlots: 2 },
                    { name: 'Acolyte\'s Vestment Roll', desc: 'A cylindrical case for carrying clean ceremonial robes.', price: 18, weight: 1, extraSlots: 2 },
                    { name: 'Temple Offering Pouch', desc: 'Drawstring bag sized for carrying tithes and temple donations.', price: 12, weight: 1, extraSlots: 2 },
                    { name: 'Holy Water Carrier', desc: 'A padded sling designed to transport fragile blessed vials.', price: 20, weight: 1, extraSlots: 3 },
                    { name: 'Scripture-Bearer\'s Pack', desc: 'Stiffened sides protect holy texts from bending during travel.', price: 22, weight: 2, extraSlots: 3 }
                ]
            },
            {
                rarity: 'Uncommon',
                variants: [
                    { name: 'Silver-Blessed Saddlebag', desc: 'Silver thread wards the bag against undead corruption.', price: 75, weight: 2, extraSlots: 4 },
                    { name: 'Inquisitor\'s Evidence Case', desc: 'Sealed compartments preserve evidence of heresy for tribunal.', price: 85, weight: 2, extraSlots: 5 },
                    { name: 'Cleric\'s Field Apothecary', desc: 'Organized pouches for salves, bandages, and blessed unguents.', price: 90, weight: 3, extraSlots: 4 },
                    { name: 'Crusader\'s Supply Harness', desc: 'Distributes rations and spare arms across both flanks evenly.', price: 80, weight: 3, extraSlots: 5 },
                    { name: 'Radiant-Stitched Pannier', desc: 'Glowing thread illuminates the interior for rummaging in darkness.', price: 95, weight: 2, extraSlots: 5 }
                ]
            },
            {
                rarity: 'Rare',
                variants: [
                    { name: 'Paladin\'s Consecrated War-Chest', desc: 'Blessed by a high-priest; evil creatures cannot open the latch.', price: 350, weight: 3, extraSlots: 6 },
                    { name: 'Reliquary Saddlecase', desc: 'Contains a glass-fronted compartment for displaying holy relics while riding.', price: 400, weight: 4, extraSlots: 7 },
                    { name: 'Hierophant\'s Campaign Trunk', desc: 'A portable altar doubles as secure storage during holy war.', price: 450, weight: 4, extraSlots: 7 },
                    { name: 'Dawn-Blessed Courier Bag', desc: 'Contents are bathed in perpetual warm light, preventing spoilage.', price: 380, weight: 3, extraSlots: 6 },
                    { name: 'Celestial Lion\'s Mane-Pack', desc: 'Woven from the shed mane of a temple lion. Repels vermin.', price: 420, weight: 3, extraSlots: 7 }
                ]
            },
            {
                rarity: 'Legendary',
                variants: [
                    { name: 'Saddlebag of the First Lightbringer', desc: 'Carried the original holy texts across the Burning Wastes. Never once dampened.', weight: 3, extraSlots: 8 },
                    { name: 'Ark of the Martyred Knight', desc: 'The knight died. The steed walked home. The bag arrived with the treaty inside.', weight: 4, extraSlots: 9 },
                    { name: 'Reliquary of the Silver Dawn', desc: 'Contains a perpetually burning divine candle that cannot be extinguished.', weight: 3, extraSlots: 9 },
                    { name: 'Vestment-Chest of the High Inquisitor', desc: 'Every garment stored inside emerges pressed, clean, and faintly glowing.', weight: 4, extraSlots: 10 },
                    { name: 'Shield-Bearer\'s Oath-Pack', desc: 'Accepts only items sworn to a holy purpose. Rejects anything profane.', weight: 5, extraSlots: 8 }
                ]
            },
            {
                rarity: 'Mythic',
                variants: [
                    { name: 'Tabernacle of the Living God', desc: 'A portable shrine. Prayers spoken near it are always heard.', weight: 4, extraSlots: 12 },
                    { name: 'Saddlebag of Absolute Absolution', desc: 'Anything cursed placed inside emerges purified. The bag bears the taint instead.', weight: 3, extraSlots: 13 },
                    { name: 'Reliquary of the Unbroken Covenant', desc: 'Sealed by the handshake of a god. Only the worthy may unseal it.', weight: 5, extraSlots: 14 },
                    { name: 'Mantle of the Hierophant Eternal', desc: 'The bag remembers every item it has ever held and can recall them from memory.', weight: 4, extraSlots: 14 },
                    { name: 'Vessel of the Final Crusade', desc: 'Carried into the last holy war. Its interior smells of incense and dried blood.', weight: 5, extraSlots: 12 }
                ]
            }
        ]
    },
    {
        mountId: 'stealth_prowlers',
        tiers: [
            {
                rarity: 'Common',
                variants: [
                    { name: 'Silent-Latch Pouch', desc: 'Magnetic closure eliminates all noise when opening or closing.', price: 18, weight: 1, extraSlots: 2 },
                    { name: 'Nightrunner\'s Hip-Sling', desc: 'Black-dyed fabric that disappears in low light conditions.', price: 15, weight: 1, extraSlots: 2 },
                    { name: 'Lockpick Roll', desc: 'A slim leather roll with individual tool slots sewn along its length.', price: 20, weight: 1, extraSlots: 2 },
                    { name: 'Shadow-Wrap Bundle', desc: 'Charcoal-treated wrappings that absorb ambient light.', price: 16, weight: 1, extraSlots: 2 },
                    { name: 'Assassin\'s Vial Rig', desc: 'A harness of tiny loops for carrying poison vials without clinking.', price: 22, weight: 1, extraSlots: 3 }
                ]
            },
            {
                rarity: 'Uncommon',
                variants: [
                    { name: 'Smoke-Lined Courier Case', desc: 'Releases a blinding smoke screen if tampered with by unauthorized hands.', price: 80, weight: 2, extraSlots: 4 },
                    { name: 'Shadow-Panther Flank-Pouch', desc: 'Stitched from the mount\'s own shed fur for perfect camouflage.', price: 90, weight: 2, extraSlots: 4 },
                    { name: 'Whisper-Silk Satchel', desc: 'Utterly silent. Not a single rustle, rattle, or creak.', price: 100, weight: 1, extraSlots: 5 },
                    { name: 'Garrote-Wire Locking Bag', desc: 'The drawstring doubles as a concealed weapon in emergencies.', price: 85, weight: 2, extraSlots: 4 },
                    { name: 'False-Bottom Saddlebag', desc: 'Appears empty on casual inspection. The real compartment is beneath.', price: 95, weight: 2, extraSlots: 5 }
                ]
            },
            {
                rarity: 'Rare',
                variants: [
                    { name: 'Phantomweave Courier Pack', desc: 'Turns translucent when the mount enters stealth mode.', price: 380, weight: 2, extraSlots: 6 },
                    { name: 'Shadowblade\'s Arsenal Sheath', desc: 'Holds six concealed weapons in individually silenced compartments.', price: 420, weight: 3, extraSlots: 7 },
                    { name: 'Spy-Master\'s Cipher Case', desc: 'Magically encrypted interior; contents appear as gibberish to unauthorized viewers.', price: 450, weight: 3, extraSlots: 6 },
                    { name: 'Void-Lined Satchel', desc: 'Interior is a thin layer of shadow-plane. Items inside cannot be magically detected.', price: 500, weight: 2, extraSlots: 7 },
                    { name: 'Eclipse-Stallion\'s Umbral Pack', desc: 'Absorbs light in a ten-foot radius, cloaking the rider and mount in darkness.', price: 480, weight: 3, extraSlots: 7 }
                ]
            },
            {
                rarity: 'Legendary',
                variants: [
                    { name: 'Satchel of the Faceless King', desc: 'Carried by the spy who toppled three kingdoms without being identified.', weight: 2, extraSlots: 8 },
                    { name: 'Darkblade\'s Trophy Cache', desc: 'Contains the death-masks of every target successfully eliminated.', weight: 3, extraSlots: 9 },
                    { name: 'Whisper-Net of the Ghost-Walker', desc: 'The bag exists partially in the ethereal plane. Physically weightless.', weight: 1, extraSlots: 9 },
                    { name: 'Mantle of the Last Shadow', desc: 'Worn by the assassin who killed a god. The bag still smells of divine ichor.', weight: 3, extraSlots: 10 },
                    { name: 'Silence-Woven Reliquary', desc: 'No sound can escape from inside. Even screaming objects are muted.', weight: 2, extraSlots: 8 }
                ]
            },
            {
                rarity: 'Mythic',
                variants: [
                    { name: 'Bag of the Void Assassin', desc: 'Items placed inside cease to exist until the owner wills them back.', weight: 1, extraSlots: 12 },
                    { name: 'Shadow-Dimension Satchel', desc: 'The interior is an entire pocket of the shadow-plane. Infinite perceived depth.', weight: 2, extraSlots: 14 },
                    { name: 'Mantle of Perfect Erasure', desc: 'Any evidence placed inside is permanently destroyed. No magic can recover it.', weight: 2, extraSlots: 12 },
                    { name: 'Courier of the Unspoken Pact', desc: 'Delivers its contents to the intended recipient without the carrier knowing what is inside.', weight: 3, extraSlots: 13 },
                    { name: 'Veil of the Night Absolute', desc: 'The bag is invisible. The items inside are invisible. The weight is imperceptible.', weight: 1, extraSlots: 14 }
                ]
            }
        ]
    },
    {
        mountId: 'war_behemoths',
        tiers: [
            {
                rarity: 'Common',
                variants: [
                    { name: 'Blood-Stained Cargo Sack', desc: 'A rough hide bag permanently discolored from battlefield use.', price: 20, weight: 2, extraSlots: 2 },
                    { name: 'Bone-Hook Carry Rig', desc: 'Trophy bones fashioned into crude carrying hooks.', price: 18, weight: 2, extraSlots: 2 },
                    { name: 'Raider\'s Loot Sling', desc: 'An oversized net for hauling plunder from sacked settlements.', price: 22, weight: 2, extraSlots: 3 },
                    { name: 'Tusk-Mounted Barrel', desc: 'A barrel lashed between the creature\'s tusks or horns.', price: 25, weight: 3, extraSlots: 3 },
                    { name: 'Pit-Fighter\'s Saddle Pouch', desc: 'Stiffened leather that doubles as a crude shield.', price: 15, weight: 2, extraSlots: 2 }
                ]
            },
            {
                rarity: 'Uncommon',
                variants: [
                    { name: 'Warlord\'s Trophy Rack', desc: 'Iron spikes for displaying severed heads alongside cargo.', price: 80, weight: 3, extraSlots: 4 },
                    { name: 'Gore-Proof Supply Chest', desc: 'Sealed interior prevents blood splatter from contaminating rations.', price: 90, weight: 3, extraSlots: 5 },
                    { name: 'Battering-Ram Harness Pack', desc: 'Strapped behind the creature\'s horned headpiece for protected storage.', price: 100, weight: 3, extraSlots: 5 },
                    { name: 'Berserker\'s Weapon Cradle', desc: 'Holds spare axes, maces, and chains for mid-battle weapon swaps.', price: 95, weight: 4, extraSlots: 4 },
                    { name: 'Iron-Banded Pillage Chest', desc: 'Heavy and ugly but functionally impossible to break open.', price: 85, weight: 4, extraSlots: 5 }
                ]
            },
            {
                rarity: 'Rare',
                variants: [
                    { name: 'Dreadnought\'s Command Vault', desc: 'An armored compartment with integrated war-horn and signal-flag storage.', price: 450, weight: 4, extraSlots: 7 },
                    { name: 'Skull-Crowned Relic Chest', desc: 'Topped with the skull of a defeated champion. Intimidates on sight.', price: 500, weight: 5, extraSlots: 7 },
                    { name: 'Blood-Iron Saddlecase', desc: 'Forged from weapons melted down after a decisive victory.', price: 480, weight: 4, extraSlots: 6 },
                    { name: 'Titan-Lord\'s Provision Harness', desc: 'Carries enough rations for an entire warband during forced marches.', price: 520, weight: 5, extraSlots: 8 },
                    { name: 'Siege-Breaker\'s Demolition Kit', desc: 'Reinforced compartments for carrying volatile siege charges safely.', price: 550, weight: 5, extraSlots: 7 }
                ]
            },
            {
                rarity: 'Legendary',
                variants: [
                    { name: 'Harness of the Skull-Crusher', desc: 'Worn by the boar that trampled through the gates of Vel-Morath.', weight: 4, extraSlots: 9 },
                    { name: 'Gore-Tusk War-Vault', desc: 'Mounted between the tusks of a legendary war-boar. Bloodstained and dented.', weight: 5, extraSlots: 9 },
                    { name: 'Siege-Line Reliquary', desc: 'Recovered from the last standing behemoth at the Battle of Black Ridge.', weight: 5, extraSlots: 10 },
                    { name: 'Warlord\'s Plunder Chest', desc: 'Contains the spoils of fourteen conquered cities. Rattles with gold.', weight: 6, extraSlots: 10 },
                    { name: 'Iron-Jaw Trophy Harness', desc: 'The jaws of the mount are wired open to serve as a terrifying cargo hold.', weight: 4, extraSlots: 8 }
                ]
            },
            {
                rarity: 'Mythic',
                variants: [
                    { name: 'Maw of the Beast-God', desc: 'A living stomach dimension. Items are digested into pure essence and reformed.', weight: 4, extraSlots: 13 },
                    { name: 'Vault of the Undefeated', desc: 'Has never been opened by anyone other than its rightful owner. Numerous have died trying.', weight: 6, extraSlots: 14 },
                    { name: 'War-Hide of the Primordial Boar', desc: 'Skinned from the first boar. Its hide remembers every war ever fought.', weight: 5, extraSlots: 12 },
                    { name: 'Titan-Slayer\'s Arsenal', desc: 'Contains weapons that grow to match whatever enemy is faced.', weight: 5, extraSlots: 14 },
                    { name: 'Blood-Oath Saddlepack', desc: 'Sealed by a blood pact. Betraying the oath dissolves the contents into ash.', weight: 4, extraSlots: 13 }
                ]
            }
        ]
    },
    {
        mountId: 'draconic_drakes',
        tiers: [
            {
                rarity: 'Common',
                variants: [
                    { name: 'Scale-Clip Pouch', desc: 'A small bag clipped between the dorsal scales.', price: 20, weight: 1, extraSlots: 2 },
                    { name: 'Fireproof Saddle Roll', desc: 'Asbestos-lined fabric that survives the drake\'s ambient heat.', price: 25, weight: 1, extraSlots: 2 },
                    { name: 'Wing-Joint Sling', desc: 'Hung from the wing-folding joint during ground travel.', price: 22, weight: 1, extraSlots: 3 },
                    { name: 'Acid-Resistant Pouch', desc: 'Chemically treated lining resists corrosive drake drool.', price: 18, weight: 1, extraSlots: 2 },
                    { name: 'Spine-Ridge Cargo Strap', desc: 'Threaded between the dorsal spines to create a natural cargo cradle.', price: 28, weight: 2, extraSlots: 3 }
                ]
            },
            {
                rarity: 'Uncommon',
                variants: [
                    { name: 'Dragonscale Saddlecase', desc: 'Fashioned from shed drake-scales; matches the mount perfectly.', price: 100, weight: 2, extraSlots: 4 },
                    { name: 'Elemental-Warded Pack', desc: 'Runes protect contents from the drake\'s elemental aura.', price: 110, weight: 2, extraSlots: 5 },
                    { name: 'Wyvern-Claw Carrier', desc: 'The creature grips the container in its hind talons during flight.', price: 120, weight: 2, extraSlots: 4 },
                    { name: 'Flame-Tongue Strongbox', desc: 'Interior stays cool despite external temperatures exceeding forge-heat.', price: 105, weight: 3, extraSlots: 5 },
                    { name: 'Nest-Weave Satchel', desc: 'Woven from materials the drake instinctively treats as part of its nest.', price: 95, weight: 2, extraSlots: 5 }
                ]
            },
            {
                rarity: 'Rare',
                variants: [
                    { name: 'Drake-Rider\'s War Vault', desc: 'Armored flight-chest rated for aerial combat maneuvers.', price: 500, weight: 3, extraSlots: 6 },
                    { name: 'Obsidian-Scale Strongbox', desc: 'Crafted from the adamantine-hard scales of an obsidian wyvern.', price: 600, weight: 4, extraSlots: 7 },
                    { name: 'Storm-Wyvern Dive Pack', desc: 'Pressurized seal survives terminal-velocity power dives.', price: 550, weight: 3, extraSlots: 7 },
                    { name: 'Elemental Core Containment Case', desc: 'Stores raw elemental cores safely alongside mundane cargo.', price: 580, weight: 4, extraSlots: 7 },
                    { name: 'Solar-Flare Insulated Vault', desc: 'Reflective lining protects contents from the drake\'s solar breath.', price: 620, weight: 3, extraSlots: 8 }
                ]
            },
            {
                rarity: 'Legendary',
                variants: [
                    { name: 'Hoard-Chest of the Fire-Drake', desc: 'The drake instinctively guards this container as part of its treasure hoard.', weight: 4, extraSlots: 9 },
                    { name: 'Storm-Wyvern\'s Eye Socket Cache', desc: 'Fitted into the hollowed skull-plate of a fallen alpha-wyvern.', weight: 3, extraSlots: 9 },
                    { name: 'Aether-Wyrm\'s Mana-Vault', desc: 'Magical items stored inside slowly recharge their spent enchantments.', weight: 3, extraSlots: 10 },
                    { name: 'Earth-Shaker\'s Tectonic Case', desc: 'Survives being buried under mountains. Has been, twice.', weight: 5, extraSlots: 10 },
                    { name: 'Venom-Gland Trophy Pouch', desc: 'Fashioned from the venom-gland of a drake that poisoned an entire river valley.', weight: 3, extraSlots: 8 }
                ]
            },
            {
                rarity: 'Mythic',
                variants: [
                    { name: 'Heart-Scale of the Elder Wyrm', desc: 'A single chest-scale from a dragon older than civilization. Burns to the touch.', weight: 3, extraSlots: 13 },
                    { name: 'Hoard-Dimension of the Dragon-God', desc: 'A shard of a divine dragon\'s infinite treasure vault. Bottomless.', weight: 4, extraSlots: 14 },
                    { name: 'Breath-Forged Reliquary', desc: 'Shaped by pure dragon-breath into a form that defies mortal metallurgy.', weight: 4, extraSlots: 12 },
                    { name: 'Egg-Shell of the Primordial Drake', desc: 'The first eggshell. Its interior still radiates the warmth of creation.', weight: 3, extraSlots: 14 },
                    { name: 'Wing-Membrane Infinity Satchel', desc: 'Stretched wing-skin from a drake that flew between dimensions.', weight: 2, extraSlots: 13 }
                ]
            }
        ]
    },
    {
        mountId: 'abyssal_terrors',
        tiers: [
            {
                rarity: 'Common',
                variants: [
                    { name: 'Bone-Stitched Sack', desc: 'A rough bag held together with wire threaded through finger-bones.', price: 18, weight: 1, extraSlots: 2 },
                    { name: 'Flayed-Hide Pouch', desc: 'Cured skin of uncertain origin, unsettlingly supple.', price: 15, weight: 1, extraSlots: 2 },
                    { name: 'Rot-Resistant Bundle', desc: 'Treated with alchemical preservatives to survive necrotic auras.', price: 20, weight: 1, extraSlots: 2 },
                    { name: 'Soul-Lantern Cargo Hook', desc: 'A glowing spirit trapped in a cage doubles as a bag hook.', price: 22, weight: 1, extraSlots: 3 },
                    { name: 'Coffin-Nail Drawstring Bag', desc: 'Sealed with nails pulled from consecrated coffins.', price: 16, weight: 2, extraSlots: 2 }
                ]
            },
            {
                rarity: 'Uncommon',
                variants: [
                    { name: 'Void-Touched Saddlebag', desc: 'Radiates a faint wrongness. Normal animals refuse to approach it.', price: 85, weight: 2, extraSlots: 4 },
                    { name: 'Necromantic Preservation Case', desc: 'Necrotic energy keeps organic contents in a state of perpetual near-decay.', price: 95, weight: 2, extraSlots: 5 },
                    { name: 'Bone-Dragon Rib-Cage Cache', desc: 'A section of rib-cage wired shut to form a natural container.', price: 100, weight: 3, extraSlots: 5 },
                    { name: 'Spectral Chain-Locker', desc: 'Held shut by chains that exist only partially in the material plane.', price: 90, weight: 2, extraSlots: 4 },
                    { name: 'Plague-Sealed Iron Chest', desc: 'Triple-sealed to prevent the contents from leaking contagion.', price: 110, weight: 3, extraSlots: 5 }
                ]
            },
            {
                rarity: 'Rare',
                variants: [
                    { name: 'Abyssal Iron Strongbox', desc: 'Forged in the deepest layer of the abyss. Demons cannot open it without permission.', price: 500, weight: 3, extraSlots: 6 },
                    { name: 'Soul-Furnace Cargo Hold', desc: 'Powered by a trapped soul that keeps the interior at precisely the right temperature.', price: 550, weight: 4, extraSlots: 7 },
                    { name: 'Lich-Bone Reliquary', desc: 'Carved from the femur of a destroyed lich. Hums with residual power.', price: 580, weight: 3, extraSlots: 7 },
                    { name: 'Chaos-Hound\'s Trophy Muzzle', desc: 'One of the heads is muzzled shut, creating a sealed natural cargo hold.', price: 520, weight: 4, extraSlots: 7 },
                    { name: 'Blight-Warded Supply Case', desc: 'Every surface inscribed with containment wards against spreading corruption.', price: 600, weight: 4, extraSlots: 8 }
                ]
            },
            {
                rarity: 'Legendary',
                variants: [
                    { name: 'Coffin of the Bone-Dragon King', desc: 'The last resting place of a draconic lich. Now it carries luggage.', weight: 4, extraSlots: 9 },
                    { name: 'Void-Ray\'s Dimensional Stomach', desc: 'A portal into the creature\'s extradimensional digestive tract. Surprisingly clean.', weight: 2, extraSlots: 9 },
                    { name: 'Soul-Furnace Relic Chest', desc: 'The furnace within has been burning for three centuries. It will not stop.', weight: 5, extraSlots: 10 },
                    { name: 'Mantle of the Abyssal Tyrant', desc: 'Worn by the lord who ruled the Ninth Pit. His screaming face is embossed on the flap.', weight: 4, extraSlots: 10 },
                    { name: 'Plague-Father\'s Spore-Sack', desc: 'A living fungal sac that preserves biological samples in perfect symbiosis.', weight: 3, extraSlots: 8 }
                ]
            },
            {
                rarity: 'Mythic',
                variants: [
                    { name: 'Maw of the Unending', desc: 'The wormhole-mount\'s secondary mouth. Items enter and exist in all places simultaneously.', weight: 2, extraSlots: 14 },
                    { name: 'Soul-Cage of the Damned', desc: 'Every item placed inside is guarded by the tormented spirits of a thousand prisoners.', weight: 4, extraSlots: 13 },
                    { name: 'Bone-Throne Reliquary', desc: 'A throne built from the bones of fallen gods, hollowed to serve as a vault.', weight: 6, extraSlots: 14 },
                    { name: 'Entropy Satchel', desc: 'Items inside decay at a rate visible to the eye, then reform whole upon removal.', weight: 3, extraSlots: 12 },
                    { name: 'Vessel of the Final Death', desc: 'Contains a pocket of absolute oblivion. Nothing stored inside can ever truly be destroyed.', weight: 4, extraSlots: 13 }
                ]
            }
        ]
    },

    // ==========================================
    // CATEGORY 4: SPECIFIC RACE
    // ==========================================
    {
        mountId: 'forest_stags',
        tiers: [
            {
                rarity: 'Common',
                variants: [
                    { name: 'Woven Leaf-Satchel', desc: 'A bag of broad, magically preserved leaves stitched with vine-thread.', price: 10, weight: 1, extraSlots: 2 },
                    { name: 'Bark-Fiber Pannier', desc: 'Strips of flexible inner bark woven into a lightweight basket.', price: 12, weight: 1, extraSlots: 2 },
                    { name: 'Fawn-Hide Pouch', desc: 'Soft doeskin dyed forest-green to blend with the undergrowth.', price: 14, weight: 1, extraSlots: 2 },
                    { name: 'Mushroom-Cap Carrier', desc: 'A hollowed giant toadstool cap, naturally waterproof.', price: 11, weight: 1, extraSlots: 2 },
                    { name: 'Thorn-Clasp Sling', desc: 'Living thorns act as natural clasps, sealing the bag shut.', price: 16, weight: 1, extraSlots: 3 }
                ]
            },
            {
                rarity: 'Uncommon',
                variants: [
                    { name: 'Antler-Rack Cargo Frame', desc: 'A shed antler repurposed as a multi-pronged hanging frame.', price: 55, weight: 2, extraSlots: 4 },
                    { name: 'Living Moss Saddlebag', desc: 'A bag of cultivated moss that photosynthesizes and self-repairs.', price: 65, weight: 2, extraSlots: 4 },
                    { name: 'Elderwood Hollow-Box', desc: 'A sealed cavity carved from a living elderwood branch.', price: 70, weight: 2, extraSlots: 5 },
                    { name: 'Spider-Silk Forest Pack', desc: 'Sylvan spiders voluntarily wove this bag for an elven ranger.', price: 75, weight: 1, extraSlots: 5 },
                    { name: 'Briar-Woven Pannier', desc: 'Defensive thorns grow outward when the bag senses threat.', price: 60, weight: 2, extraSlots: 4 }
                ]
            },
            {
                rarity: 'Rare',
                variants: [
                    { name: 'Treant-Gifted Hollow', desc: 'A living wooden compartment grown personally by a treant elder.', price: 300, weight: 3, extraSlots: 6 },
                    { name: 'Moonlit Silk Courier Case', desc: 'Woven by moths that feed only on midnight moonbeams.', price: 350, weight: 2, extraSlots: 7 },
                    { name: 'Faerie-Dragon Scale-Case', desc: 'A small chest covered in iridescent scales that shift color with mood.', price: 380, weight: 3, extraSlots: 7 },
                    { name: 'Root-Woven Provision Pack', desc: 'Living roots weave shut when closed, forming an airtight seal.', price: 320, weight: 3, extraSlots: 6 },
                    { name: 'Canopy-Walker\'s Harness', desc: 'Designed for leaping between giant trees without losing cargo.', price: 340, weight: 3, extraSlots: 7 }
                ]
            },
            {
                rarity: 'Legendary',
                variants: [
                    { name: 'Saddlebag of the Great Stag', desc: 'Worn by the forest-king stag that guided the First Elves to their homeland.', weight: 2, extraSlots: 8 },
                    { name: 'Heart-Root Reliquary', desc: 'Grown from the taproot of the World-Tree. It pulses with vegetative life.', weight: 3, extraSlots: 9 },
                    { name: 'Moon-Antler Crown-Cache', desc: 'The shed antler of the Moon-Elk, its tines glow with trapped starlight.', weight: 3, extraSlots: 10 },
                    { name: 'Sylph-Moth Chrysalis Vault', desc: 'A chrysalis that never hatched. Its interior exists in a state of perpetual spring.', weight: 2, extraSlots: 9 },
                    { name: 'Mantle of the Forest Eternal', desc: 'Leaves that fell a thousand years ago still cling to its surface, fresh and green.', weight: 3, extraSlots: 8 }
                ]
            },
            {
                rarity: 'Mythic',
                variants: [
                    { name: 'Seed-Vault of the World-Tree', desc: 'Contains a seed that could regrow the entire forest if planted. The bag protects it.', weight: 2, extraSlots: 12 },
                    { name: 'Acorn of Infinite Growth', desc: 'A single acorn that grew inward instead of outward. Its interior is a forest.', weight: 1, extraSlots: 14 },
                    { name: 'Moss-Dream Reliquary', desc: 'Items placed inside are absorbed by the moss and dreamed into a better version.', weight: 3, extraSlots: 13 },
                    { name: 'Faerie-Ring Gateway Pack', desc: 'The bag\'s interior opens into a mushroom ring in the Feywild.', weight: 2, extraSlots: 14 },
                    { name: 'Root-Memory of the Ancient Grove', desc: 'The bag remembers every forest that ever existed and can produce their fruits.', weight: 3, extraSlots: 12 }
                ]
            }
        ]
    },
    {
        mountId: 'crag_beasts',
        tiers: [
            {
                rarity: 'Common',
                variants: [
                    { name: 'Iron-Studded Mine Sack', desc: 'A thick canvas bag reinforced with iron studs to survive cave-ins.', price: 15, weight: 2, extraSlots: 2 },
                    { name: 'Coal-Dust Pack', desc: 'Black-stained but functional; standard issue for deep mine workers.', price: 12, weight: 2, extraSlots: 2 },
                    { name: 'Ram-Horn Cargo Hook', desc: 'A curved horn used to suspend bags from the saddle\'s rear.', price: 18, weight: 2, extraSlots: 3 },
                    { name: 'Tunnel-Rat\'s Sling', desc: 'A flat-profile sack that won\'t snag on narrow tunnel walls.', price: 14, weight: 1, extraSlots: 2 },
                    { name: 'Ore-Bucket Saddle Mount', desc: 'A re-purposed mining bucket lashed to the beast\'s harness.', price: 16, weight: 2, extraSlots: 2 }
                ]
            },
            {
                rarity: 'Uncommon',
                variants: [
                    { name: 'Granite-Clasped Lockbox', desc: 'Stone clasps require deliberate force to open, preventing accidental spills.', price: 70, weight: 3, extraSlots: 4 },
                    { name: 'Forge-Master\'s Tool Harness', desc: 'Designed for carrying a full set of smithing tools across rough terrain.', price: 80, weight: 3, extraSlots: 5 },
                    { name: 'Mole-Hide Cargo Bag', desc: 'Supple mole-leather resists abrasion from constant tunnel-wall contact.', price: 75, weight: 2, extraSlots: 4 },
                    { name: 'Lava-Stone Insulated Case', desc: 'Pumice-lined walls keep contents cool near magma flows.', price: 90, weight: 3, extraSlots: 5 },
                    { name: 'Deep-Mine Anchor Pack', desc: 'Clips directly to anchor-bolts hammered into the cavern walls.', price: 65, weight: 3, extraSlots: 4 }
                ]
            },
            {
                rarity: 'Rare',
                variants: [
                    { name: 'Adamantine-Banded Strongbox', desc: 'Forged with adamantine bands that make it effectively crush-proof.', price: 400, weight: 4, extraSlots: 7 },
                    { name: 'Dwarven Rune-Vault', desc: 'Combination lock uses an ancient dwarven runic cipher.', price: 450, weight: 4, extraSlots: 7 },
                    { name: 'Steam-Engine Supply Pack', desc: 'Integrates into the war-engine\'s own fuel and tool systems.', price: 420, weight: 4, extraSlots: 6 },
                    { name: 'Geode-Lined Treasure Case', desc: 'Interior lined with crystal geodes that cushion delicate ore samples.', price: 380, weight: 3, extraSlots: 7 },
                    { name: 'Magma-Toad Belly-Sling', desc: 'Heat-resistant belly-harness for the lava-swimming amphibian mounts.', price: 480, weight: 4, extraSlots: 8 }
                ]
            },
            {
                rarity: 'Legendary',
                variants: [
                    { name: 'Vault of the Mountain-King', desc: 'The personal strongbox of the dwarf who carved the Ironcrag Citadel.', weight: 4, extraSlots: 9 },
                    { name: 'Anvil-Heart Reliquary', desc: 'Contains a sliver of the First Anvil. Every weapon stored inside sharpens overnight.', weight: 5, extraSlots: 10 },
                    { name: 'Ram-God\'s Horn Cache', desc: 'The horn of a mythical iron-ram. Its hollow interior defies its apparent size.', weight: 4, extraSlots: 9 },
                    { name: 'Deep-Forge Crucible Pack', desc: 'A portable forge-cabinet from the deepest known mineshaft in existence.', weight: 5, extraSlots: 10 },
                    { name: 'Stone-Scale Reliquary', desc: 'Carved from the scales of a stone-lizard that lived a thousand years underground.', weight: 5, extraSlots: 8 }
                ]
            },
            {
                rarity: 'Mythic',
                variants: [
                    { name: 'Heart of the Mountain', desc: 'A literal cavity in the living rock that follows the mount. The mountain consented.', weight: 5, extraSlots: 13 },
                    { name: 'Forge of the God-Smith', desc: 'Items placed inside are reforged into their absolute perfect form.', weight: 6, extraSlots: 14 },
                    { name: 'Ore-Vein Infinity Sack', desc: 'Connected to every ore deposit in the world. Raw materials appear on demand.', weight: 3, extraSlots: 14 },
                    { name: 'Magma-Core Reliquary', desc: 'Contains a pocket of the world\'s molten core. Indestructible by definition.', weight: 4, extraSlots: 12 },
                    { name: 'Rune-Stone of the First Delve', desc: 'The first stone ever carved by dwarven hands. Its interior is a vault of racial memory.', weight: 5, extraSlots: 13 }
                ]
            }
        ]
    },
    {
        mountId: 'swamp_predators',
        tiers: [
            {
                rarity: 'Common',
                variants: [
                    { name: 'Crocodile-Belly Sling', desc: 'A waterproof sac hung beneath the reptile\'s torso.', price: 15, weight: 1, extraSlots: 2 },
                    { name: 'Reed-Woven Saddle Basket', desc: 'Woven from swamp reeds that flex without breaking.', price: 12, weight: 1, extraSlots: 2 },
                    { name: 'Tar-Sealed Pouch', desc: 'Pine tar waterproofing keeps contents bone-dry in the mire.', price: 18, weight: 1, extraSlots: 2 },
                    { name: 'Bone-Frame Cargo Net', desc: 'Bones from swamp kills form a crude but effective cargo frame.', price: 14, weight: 2, extraSlots: 3 },
                    { name: 'Bog-Leather Hip Sack', desc: 'Tanned in peat-water; the leather is nearly black and very supple.', price: 16, weight: 1, extraSlots: 2 }
                ]
            },
            {
                rarity: 'Uncommon',
                variants: [
                    { name: 'Hydra-Scale Case', desc: 'Cut from a juvenile hydra; the scales are naturally acid-proof.', price: 80, weight: 2, extraSlots: 4 },
                    { name: 'Turtle-Shell Cargo Box', desc: 'A small snapping-turtle carapace repurposed as a sealed container.', price: 70, weight: 3, extraSlots: 5 },
                    { name: 'Leech-Proof Sealed Pack', desc: 'Interior coated in salt-crystal to keep blood-leeches at bay.', price: 75, weight: 2, extraSlots: 4 },
                    { name: 'Vine-Tangle Storage Net', desc: 'Living vines that grow shut when loaded, sealing contents inside.', price: 85, weight: 2, extraSlots: 5 },
                    { name: 'Rot-Ward Provisioner\'s Pack', desc: 'Alchemically treated to prevent fungal growth on stored rations.', price: 90, weight: 2, extraSlots: 5 }
                ]
            },
            {
                rarity: 'Rare',
                variants: [
                    { name: 'Hydra-Gullet Trophy Bag', desc: 'Fashioned from a hydra\'s throat. Three separate compartments, one per head.', price: 400, weight: 3, extraSlots: 7 },
                    { name: 'Bog-Turtle Armored Shell-Case', desc: 'A massive turtle-shell reinforced with iron bands and wax seals.', price: 450, weight: 4, extraSlots: 7 },
                    { name: 'Acid-Maw Toad Stomach Pouch', desc: 'The acid has been neutralized, leaving an indestructible organic container.', price: 380, weight: 3, extraSlots: 6 },
                    { name: 'Mangrove-Root Vault', desc: 'Grown inside a living mangrove root system that hides the container.', price: 420, weight: 3, extraSlots: 7 },
                    { name: 'Plague-Warded Medical Chest', desc: 'Hermetically sealed to prevent cross-contamination of biological samples.', price: 480, weight: 4, extraSlots: 8 }
                ]
            },
            {
                rarity: 'Legendary',
                variants: [
                    { name: 'Gullet of the Swamp-King', desc: 'The crocodile that ate three warlords. Its stomach was repurposed.', weight: 3, extraSlots: 9 },
                    { name: 'Hydra-Heart Reliquary', desc: 'Cut from a hydra that regrew its own heart. The bag slowly regenerates damage.', weight: 3, extraSlots: 9 },
                    { name: 'Tangle-Vine Ark', desc: 'A sentient plant-structure that grows new compartments on request.', weight: 3, extraSlots: 10 },
                    { name: 'Rot-Lord\'s Spore-Chest', desc: 'A fungal colony that forms a perfect airtight container around stored goods.', weight: 2, extraSlots: 10 },
                    { name: 'Carrion-Bird\'s Bottomless Crop', desc: 'The crop of a vulture so ancient it had evolved to store cargo for its riders.', weight: 3, extraSlots: 8 }
                ]
            },
            {
                rarity: 'Mythic',
                variants: [
                    { name: 'Maw of the Primordial Swamp', desc: 'Opens into the original swamp that existed before land separated from water.', weight: 3, extraSlots: 14 },
                    { name: 'Rot-Bloom Genesis Sack', desc: 'Everything placed inside decomposes and is reborn as a perfected version.', weight: 2, extraSlots: 13 },
                    { name: 'Hydra-Mind Storage Colony', desc: 'Each head of a mythical hydra guards one compartment. There are infinite heads.', weight: 4, extraSlots: 14 },
                    { name: 'Bog-God\'s Peat-Vault', desc: 'Items are preserved in magical peat for eternity. Thousands of years pass in seconds.', weight: 4, extraSlots: 12 },
                    { name: 'Leviathan Leech Dimension', desc: 'A leech so vast its interior is a pocket dimension of warm, dark, quiet water.', weight: 2, extraSlots: 13 }
                ]
            }
        ]
    },
    {
        mountId: 'nightmare_terrors',
        tiers: [
            {
                rarity: 'Common',
                variants: [
                    { name: 'Chitin-Clip Silk Pouch', desc: 'A small silk bag clipped to the spider\'s dorsal carapace.', price: 15, weight: 1, extraSlots: 2 },
                    { name: 'Warg-Hide Sling', desc: 'Stripped from a fallen warg and repurposed for cargo.', price: 18, weight: 1, extraSlots: 2 },
                    { name: 'Scorpion-Tail Cargo Hook', desc: 'A barbed appendage wired to carry a swinging cargo bag.', price: 20, weight: 1, extraSlots: 3 },
                    { name: 'Cave-Leather Bundle', desc: 'Tanned from underground fauna, nearly invisible in the dark.', price: 14, weight: 1, extraSlots: 2 },
                    { name: 'Bat-Wing Wrapped Sack', desc: 'A membrane-wrapped bundle that clings tightly during flight.', price: 16, weight: 1, extraSlots: 2 }
                ]
            },
            {
                rarity: 'Uncommon',
                variants: [
                    { name: 'Phase-Web Cargo Cocoon', desc: 'Spider-silk with ethereal properties; partially exists between planes.', price: 90, weight: 2, extraSlots: 4 },
                    { name: 'Scorpion-Carapace Lockbox', desc: 'A hollowed scorpion tail-segment; incredibly acid-resistant.', price: 100, weight: 2, extraSlots: 5 },
                    { name: 'Shadow-Warg Flank-Pouch', desc: 'Dark fur blends with the warg\'s pelt, invisible to pursuers.', price: 85, weight: 2, extraSlots: 4 },
                    { name: 'Rust-Monster Plating Case', desc: 'Lined with rust-monster chitin; metallic items inside corrode nothing.', price: 110, weight: 3, extraSlots: 5 },
                    { name: 'Gloom-Centipede Segment Box', desc: 'A body-segment hollowed out and sealed with resin.', price: 95, weight: 3, extraSlots: 5 }
                ]
            },
            {
                rarity: 'Rare',
                variants: [
                    { name: 'Phase-Spider Dimensional Cache', desc: 'Blinks between planes alongside the mount, untouchable by mundane theft.', price: 500, weight: 2, extraSlots: 7 },
                    { name: 'Basilisk-Eye Strongbox', desc: 'A single petrified eye acts as a lock; only the owner\'s gaze opens it.', price: 550, weight: 3, extraSlots: 7 },
                    { name: 'Abyssal-Mite Hive-Box', desc: 'Living mites form an impenetrable layer of defense around stored items.', price: 480, weight: 3, extraSlots: 6 },
                    { name: 'Scorpion-Venom Preservation Case', desc: 'Venom coating preserves organic contents indefinitely.', price: 520, weight: 3, extraSlots: 7 },
                    { name: 'Nightmare Web Vault', desc: 'Web strands vibrate at frequencies that induce fear in anyone who touches them.', price: 580, weight: 3, extraSlots: 8 }
                ]
            },
            {
                rarity: 'Legendary',
                variants: [
                    { name: 'Cocoon of the Nightmare Queen', desc: 'Spun by the matriarch spider that haunts the Underdark. It screams when opened.', weight: 3, extraSlots: 9 },
                    { name: 'Shadow-Warg Alpha\'s Kill-Cache', desc: 'The alpha\'s personal trophy bag. Other wargs instinctively guard it.', weight: 3, extraSlots: 9 },
                    { name: 'Phase-Spider\'s Interplanar Vault', desc: 'Exists simultaneously in three planes. Contents can be accessed from any of them.', weight: 2, extraSlots: 10 },
                    { name: 'Rust-Lord\'s Consumption Chest', desc: 'The chest eats metal to fuel its self-repair. Never decays.', weight: 4, extraSlots: 10 },
                    { name: 'Basilisk King\'s Petrified Strongbox', desc: 'A box turned to stone by its own occupant. Nothing can scratch it.', weight: 5, extraSlots: 8 }
                ]
            },
            {
                rarity: 'Mythic',
                variants: [
                    { name: 'Web of the Dream-Eater', desc: 'Items stored inside exist only in dreams until physically retrieved.', weight: 2, extraSlots: 14 },
                    { name: 'Cocoon of Infinite Feasting', desc: 'A living cocoon that digests reality and excretes storage space.', weight: 3, extraSlots: 13 },
                    { name: 'Shadow-Rift Saddlebag', desc: 'The bag\'s mouth opens into a permanent tear in the shadow-plane.', weight: 2, extraSlots: 14 },
                    { name: 'Scorpion-God\'s Venom Sac', desc: 'A gland from the divine scorpion. Its interior is an ocean of preservative venom.', weight: 4, extraSlots: 12 },
                    { name: 'Abyssal Chitin Infinity-Shell', desc: 'The exoskeleton of a creature that existed before light. Its interior has no boundaries.', weight: 3, extraSlots: 13 }
                ]
            }
        ]
    },
    {
        mountId: 'ancient_wyrms',
        tiers: [
            {
                rarity: 'Common',
                variants: [
                    { name: 'Wyrm-Scale Saddle Pouch', desc: 'A basic pouch stitched from shed dragon-scales.', price: 25, weight: 1, extraSlots: 2 },
                    { name: 'Fire-Warded Canvas Roll', desc: 'Triple-layered canvas treated to survive dragonfire backdraft.', price: 30, weight: 2, extraSlots: 3 },
                    { name: 'Talon-Grip Cargo Crate', desc: 'A reinforced box designed to be gripped in the dragon\'s forelimb.', price: 28, weight: 2, extraSlots: 3 },
                    { name: 'Horn-Mounted Slingbag', desc: 'Looped around the base of the dragon\'s horns for easy access.', price: 22, weight: 1, extraSlots: 2 },
                    { name: 'Neck-Frill Pack', desc: 'Tucked behind the dragon\'s neck frill, shielded from wind.', price: 26, weight: 1, extraSlots: 2 }
                ]
            },
            {
                rarity: 'Uncommon',
                variants: [
                    { name: 'Red-Scale Fireproofed Saddlecase', desc: 'Forged from red-dragon scales; utterly immune to thermal damage.', price: 130, weight: 2, extraSlots: 5 },
                    { name: 'Gold-Scale Blessed Chest', desc: 'Gold-dragon scales radiate a calming aura that preserves contents.', price: 150, weight: 2, extraSlots: 5 },
                    { name: 'Frost-Wyrm Insulated Vault', desc: 'Silver-dragon scales maintain sub-zero temperatures indefinitely.', price: 140, weight: 3, extraSlots: 5 },
                    { name: 'Acid-Wyrm Corrosion-Proof Box', desc: 'Black-dragon scales render the container immune to all known acids.', price: 120, weight: 3, extraSlots: 5 },
                    { name: 'Storm-Wyrm Static Cage', desc: 'Bronze-dragon scales crackle with static that deters thieves.', price: 135, weight: 2, extraSlots: 6 }
                ]
            },
            {
                rarity: 'Rare',
                variants: [
                    { name: 'Elder Dragon\'s Hoard-Chest', desc: 'The dragon considers this container part of its personal treasure hoard.', price: 700, weight: 3, extraSlots: 7 },
                    { name: 'Prismatic Scale Strongbox', desc: 'Chaos-dragon scales shift elements, adapting defenses to any threat.', price: 800, weight: 4, extraSlots: 8 },
                    { name: 'Wyvern-Tyrant\'s Brood-Chest', desc: 'Originally designed to carry dragon eggs safely during migration.', price: 750, weight: 4, extraSlots: 7 },
                    { name: 'Iron-Drake Lava-Proof Vault', desc: 'Survives full submersion in molten rock without any damage.', price: 680, weight: 4, extraSlots: 7 },
                    { name: 'Storm-Caller\'s Cloud Satchel', desc: 'A container woven from storm-clouds, sealed by lightning.', price: 720, weight: 3, extraSlots: 8 }
                ]
            },
            {
                rarity: 'Legendary',
                variants: [
                    { name: 'Hoard-Vault of the Red Patriarch', desc: 'Jealously guarded by the eldest red dragon. He allowed it to be taken. Once.', weight: 4, extraSlots: 9 },
                    { name: 'Gold-Dragon\'s Wisdom-Chest', desc: 'Knowledge stored inside is permanently memorized. The chest teaches.', weight: 4, extraSlots: 10 },
                    { name: 'Silver Matriarch\'s Frost-Ark', desc: 'Contents are kept in suspended animation by absolute-zero cold.', weight: 4, extraSlots: 10 },
                    { name: 'Black-Swamp Wyrm\'s Acid-Vault', desc: 'The vault dissolves intruders. The contents remain pristine.', weight: 3, extraSlots: 9 },
                    { name: 'Prismatic Dragon\'s Chaos-Chest', desc: 'Opens to a different elemental plane each time. Contents survive all of them.', weight: 4, extraSlots: 10 }
                ]
            },
            {
                rarity: 'Mythic',
                variants: [
                    { name: 'Egg of the First Dragon', desc: 'The shell of creation. Its interior contains the memory of every dragon ever born.', weight: 4, extraSlots: 14 },
                    { name: 'Hoard-Dimension of the Dragon Emperor', desc: 'A fragment of the infinite treasure dimension. It generates wealth.', weight: 5, extraSlots: 14 },
                    { name: 'Breath of the Prismatic God', desc: 'All elements exist inside simultaneously. Items are both frozen and burning.', weight: 3, extraSlots: 13 },
                    { name: 'Scale-Crown of the Wyrm-Father', desc: 'The crown of the dragon who fathered all dragons. Its interior is a kingdom.', weight: 5, extraSlots: 12 },
                    { name: 'Meteor-Core Reliquary', desc: 'The heart of the stone that brought dragonkind to this world. Heavier than it should be.', weight: 6, extraSlots: 13 }
                ]
            }
        ]
    },
];
