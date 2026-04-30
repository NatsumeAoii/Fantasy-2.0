import type { VariantDef } from './types';

export type MerchandiseCategory = 'Trade Good' | 'Gemstone' | 'Art Object' | 'Contraband' | 'Curiosity';

/**
 * A general trade good or miscellaneous item sold by merchants.
 * Merchandise includes tools, adventuring gear, trade goods, and
 * mundane household items with no combat application.
 */
export interface Merchandise {
  id: string;
  name: string;
  category: MerchandiseCategory;
  basePrice: number;
  weight: string;
  description: string;
  variants: VariantDef[];
}

/** Master list of all general merchandise items. */
export const MERCHANDISE: Merchandise[] = [
  // ==========================================
  // TRADE GOODS
  // ==========================================
  {
    id: 'bulk_textiles',
    name: 'Bolt of Fabric',
    category: 'Trade Good',
    basePrice: 10,
    weight: '5 lbs',
    description: 'A standard trade-unit of raw fabric, tightly rolled and wrapped in oilcloth for transport.',
    variants: [
      { name: 'Southern Silk', desc: 'Lustrous white silk from the southern provinces.', price: 10 },
      { name: 'Dyed Crimson Silk', desc: 'Pre-dyed with expensive cochineal pigment.', price: 18 },
      { name: 'Spider-Silk Skein', desc: 'Incredibly strong silk harvested from giant webs.', price: 50 },
      { name: 'Elven Gossamer', desc: 'Near-translucent fabric woven by elvish artisans.', price: 35 },
      { name: 'Hemp Canvas Roll', desc: 'A heavy roll of unbleached hemp canvas.', price: 3 },
      { name: 'Velvet Bolt', desc: 'Rich, soft fabric meant for noble doublets.', price: 15 },
      { name: 'Dwarven Asbestos Cloth', desc: 'Fire-retardant grey weavers cloth.', price: 25 },
      { name: 'Highland Tweed', desc: 'Thick, weather-resistant wool.', price: 8 }
    ]
  },
  {
    id: 'metal_ingots',
    name: 'Crate of Metal Ingots',
    category: 'Trade Good',
    basePrice: 25,
    weight: '100 lbs',
    description: 'A heavy wooden crate containing standardized metal bars ready for smithing or resale.',
    variants: [
      { name: 'Iron Ingots', desc: 'Twenty standard iron bars stamped with the smelter\'s mark.', price: 25 },
      { name: 'Copper Bars', desc: 'Bright, orange-red bars popular with coin-minters.', price: 15 },
      { name: 'Silver Bullion', desc: 'Five gleaming silver bars, heavily guarded.', price: 250 },
      { name: 'Steel Blanks', desc: 'Pre-cut steel blanks ready for shaping.', price: 40 },
      { name: 'Cold Iron Rods', desc: 'Slender rods smelted without magical heat.', price: 60 },
      { name: 'Gold Bars', desc: 'A king\'s ransom in heavy, soft yellow metal.', price: 1000 },
      { name: 'Mithril Ingots', desc: 'Feather-light and shimmering silvery bars.', price: 1200 },
      { name: 'Tin Blocks', desc: 'Required for bronze-making, dull and heavy.', price: 10 }
    ]
  },
  {
    id: 'spice_crate',
    name: 'Crate of Spices',
    category: 'Trade Good',
    basePrice: 15,
    weight: '20 lbs',
    description: 'An aromatic wooden box packed with dried spices from distant lands.',
    variants: [
      { name: 'Saffron Pouch', desc: 'A tiny silk pouch of saffron threads.', price: 30 },
      { name: 'Peppercorn Barrel', desc: 'A small barrel of black eastern peppercorns.', price: 15 },
      { name: 'Cinnamon Sticks', desc: 'Fragrant quills of rolled tree bark.', price: 12 },
      { name: 'Cave-Pepper Jar', desc: 'Volcanic dwarven peppers. Supernaturally hot.', price: 20 },
      { name: 'Dried Herb Bundle', desc: 'Mixed rosemary, thyme, and sage.', price: 5 },
      { name: 'Clove Sack', desc: 'Intensely aromatic dried flower buds.', price: 18 },
      { name: 'Nutmeg Grates', desc: 'Hard seeds requiring scraping before use.', price: 14 },
      { name: 'Gilded Cardamom', desc: 'A favorite pastry spice of the royal court.', price: 22 }
    ]
  },
  {
    id: 'exotic_woods',
    name: 'Exotic Timber',
    category: 'Trade Good',
    basePrice: 40,
    weight: '200 lbs',
    description: 'A bundle of rare or magically treated wood, harvested for specialized crafts.',
    variants: [
      { name: 'Ironwood Logs', desc: 'Timber as hard as steel that requires magical shaping.', price: 60 },
      { name: 'Darkwood Planks', desc: 'Weighs half as much as normal wood.', price: 50 },
      { name: 'Ebony Staves', desc: 'Deep black hardwood that sinks in water.', price: 80 },
      { name: 'Bloodwood Heart', desc: 'Weeps crimson sap even years after cutting.', price: 70 },
      { name: 'Weirwood Roots', desc: 'Bone-white wood naturally resistant to rot.', price: 45 },
      { name: 'Rosewood Bundles', desc: 'Fragrant and beautifully grained.', price: 35 }
    ]
  },
  {
    id: 'raw_furs',
    name: 'Bundle of Raw Furs',
    category: 'Trade Good',
    basePrice: 20,
    weight: '30 lbs',
    description: 'A compressed stack of animal pelts traded by trappers and hunters.',
    variants: [
      { name: 'Beaver Pelts', desc: 'Dense and waterproof, perfect for winter hats.', price: 30 },
      { name: 'Ermine Furs', desc: 'White winter coats used for royal cloaks.', price: 150 },
      { name: 'Direwolf Hide', desc: 'Massive, thick-furred gray pelt.', price: 60 },
      { name: 'Fox Skins', desc: 'Bright russet furs used for collars and cuffs.', price: 20 },
      { name: 'Owlbear Feathers', desc: 'Heavy, quill-like plumage providing supreme insulation.', price: 45 },
      { name: 'Manticore Mane', desc: 'Coarse, spiky hair that naturally repels insects.', price: 80 }
    ]
  },
  {
    id: 'bulk_grains',
    name: 'Sack of Grain',
    category: 'Trade Good',
    basePrice: 2,
    weight: '50 lbs',
    description: 'The agricultural backbone of the kingdom. Essential for feeding armies and cities.',
    variants: [
      { name: 'Winter Wheat', desc: 'High-yield grain for white bread.', price: 3 },
      { name: 'Hearty Barley', desc: 'The base for common stews and ales.', price: 2 },
      { name: 'Rye Berries', desc: 'Durable grain that thrives in poor soil.', price: 2 },
      { name: 'Dwarven Stone-Oats', desc: 'Cave-grown fungus-grain mix.', price: 5 },
      { name: 'Elven Sun-Seed', desc: 'Highly nutritious, vaguely glowing grain.', price: 12 },
      { name: 'Millet Sack', desc: 'Cheap, coarse fodder for beasts of burden.', price: 1 }
    ]
  },

  // ==========================================
  // GEMSTONES
  // ==========================================
  {
    id: 'precious_gem',
    name: 'Precious Gemstone',
    category: 'Gemstone',
    basePrice: 500,
    weight: '0.1 lbs',
    description: 'A cut and polished gemstone of significant value, suitable for jewelry or magical foci.',
    variants: [
      { name: 'Flawless Ruby', desc: 'A deep pigeon-blood red with no visible inclusions.', price: 5000 },
      { name: 'Star Sapphire', desc: 'A misty blue stone with a six-pointed star of light.', price: 3000 },
      { name: 'Emerald Cabochon', desc: 'A polished dome of vivid green emerald.', price: 1500 },
      { name: 'Black Pearl', desc: 'An iridescent sphere pulled from deep-sea trenches.', price: 2000 },
      { name: 'Fire Opal', desc: 'Blazing orange stone containing a flickering flame.', price: 1000 },
      { name: 'Tear of the Sea', desc: 'A perfectly teardrop-shaped aquamarine.', price: 800 },
      { name: 'Celestial Diamond', desc: 'A brilliant cut diamond that glows in starlight.', price: 4000 },
      { name: 'Void Topaz', desc: 'A dark, brooding gem that seems to absorb ambient light.', price: 1200 }
    ]
  },
  {
    id: 'semi_precious',
    name: 'Semi-Precious Stone',
    category: 'Gemstone',
    basePrice: 25,
    weight: '0.1 lbs',
    description: 'A common but attractive stone, cut for lesser jewelry or minor enchantment work.',
    variants: [
      { name: 'Polished Amethyst', desc: 'A rich purple crystal favored by clergy.', price: 25 },
      { name: 'Tiger\'s Eye', desc: 'A chatoyant brown-gold stone that winks when tilted.', price: 15 },
      { name: 'Lapis Lazuli', desc: 'A deep blue stone flecked with gold-like pyrite.', price: 30 },
      { name: 'Rose Quartz', desc: 'A translucent pink stone associated with romance.', price: 10 },
      { name: 'Carnelian', desc: 'A warm reddish-orange stone carved into seal rings.', price: 20 },
      { name: 'Bloodstone', desc: 'Dark green jasper splashed with crimson spots.', price: 18 },
      { name: 'Moonstone', desc: 'Milky white stone showing a blue shimmer.', price: 22 },
      { name: 'Jade Piece', desc: 'Ornate carved green stone from the east.', price: 35 }
    ]
  },
  {
    id: 'uncut_gemstones',
    name: 'Uncut Gemstone',
    category: 'Gemstone',
    basePrice: 50,
    weight: '0.2 lbs',
    description: 'A raw crystal directly from the mine, requiring a master jeweler\'s touch to unlock its value.',
    variants: [
      { name: 'Raw Diamond Nodule', desc: 'Looks like cloudy glass to the untrained eye.', price: 400 },
      { name: 'Geode Half', desc: 'A rock split to reveal stunning amethyst crystals.', price: 15 },
      { name: 'Unpolished Amber', desc: 'Fossilized sap, occasionally containing ancient insects.', price: 40 },
      { name: 'Corundum Crystal', desc: 'The rough, hexagonal base form of rubies and sapphires.', price: 80 },
      { name: 'Beryl Prism', desc: 'A thick, greenish crystal tube yet to be faceted.', price: 60 },
      { name: 'Opal Matrix', desc: 'A chunk of host rock showing flashes of brilliant color.', price: 90 }
    ]
  },

  // ==========================================
  // ART OBJECTS
  // ==========================================
  {
    id: 'decorative_art',
    name: 'Decorative Art',
    category: 'Art Object',
    basePrice: 250,
    weight: '2 lbs',
    description: 'A crafted piece of art valued for its beauty and detail.',
    variants: [
      { name: 'Carved Ivory Statuette', desc: 'A dancing maiden carved from mammoth tusk.', price: 250 },
      { name: 'Gold-Plated Chalice', desc: 'A drinking cup engraved with a noble crest.', price: 300 },
      { name: 'Illuminated Page', desc: 'A devotional text bordered with gold leaf.', price: 150 },
      { name: 'Jeweled Music Box', desc: 'A dwarven-engineered box playing elvish melodies.', price: 400 },
      { name: 'Porcelain Doll', desc: 'Life-like glass eyes and real silk clothing.', price: 200 },
      { name: 'Silver Flute', desc: 'An exquisitely tuned instrument inlaid with lapis.', price: 350 },
      { name: 'Crystal Decanter', desc: 'Faceted glass that makes cheap wine taste royal.', price: 180 },
      { name: 'Bone Dice', desc: 'Carved from wyvern teeth with gold-filled pips.', price: 80 }
    ]
  },
  {
    id: 'painting',
    name: 'Framed Painting',
    category: 'Art Object',
    basePrice: 100,
    weight: '8 lbs',
    description: 'An oil or tempera painting framed in carved wood or gilded molding.',
    variants: [
      { name: 'Noble Portrait', desc: 'A formal portrait of a lord or lady.', price: 150 },
      { name: 'Battle Scene', desc: 'A dramatic depiction of a famous cavalry charge.', price: 200 },
      { name: 'Landscape Vista', desc: 'A sweeping view of rolling hills at sunset.', price: 100 },
      { name: 'Religious Icon', desc: 'Devotional painting on a gold-leaf background.', price: 120 },
      { name: 'Anatomical Study', desc: 'A disturbingly detailed monster illustration.', price: 80 },
      { name: 'Still Life with Skull', desc: 'A grim reminder of mortality rendered in oils.', price: 110 },
      { name: 'Abstract Planar Map', desc: 'A dizzying representation of the multiverse.', price: 175 }
    ]
  },
  {
    id: 'sculpture',
    name: 'Sculpture',
    category: 'Art Object',
    basePrice: 300,
    weight: '40 lbs',
    description: 'A heavy, masterfully carved piece designed for manors and public squares.',
    variants: [
      { name: 'Marble Bust', desc: 'The stern visage of a long-dead emperor.', price: 250 },
      { name: 'Bronze Griffin', desc: 'A rearing beast cast in heavy bronze.', price: 400 },
      { name: 'Alabaster Maiden', desc: 'A tragic figure carved with impossibly thin veils.', price: 500 },
      { name: 'Jade Dragon', desc: 'A serpentine drake coiled around a pearl.', price: 350 },
      { name: 'Obsidian Gargoyle', desc: 'A menacing guardian figure that reflects no light.', price: 200 },
      { name: 'Kinetic Wood Carving', desc: 'A puzzle of gears and wood that endlessly shifts.', price: 300 }
    ]
  },
  {
    id: 'fine_tapestry',
    name: 'Fine Tapestry',
    category: 'Art Object',
    basePrice: 180,
    weight: '15 lbs',
    description: 'A massive woven wall-hanging depicting grand historical or mythical events.',
    variants: [
      { name: 'The Dragon\'s Fall', desc: 'Ten feet of woven silk showing a slain wyrm.', price: 300 },
      { name: 'The Royal Lineage', desc: 'A sprawling family tree of the ruling house.', price: 150 },
      { name: 'Sylvan Glade', desc: 'A pastoral scene woven with actual feyweed fibers.', price: 200 },
      { name: 'The Siege of Ironhelm', desc: 'A dwarven masterpiece interwoven with silver wire.', price: 350 },
      { name: 'Astral Map Tapestry', desc: 'Constellations mapped out in glowing thread.', price: 250 },
      { name: 'Unicorn Hunt', desc: 'A classic noble motif spanning five distinct panels.', price: 400 }
    ]
  },

  // ==========================================
  // CONTRABAND
  // ==========================================
  {
    id: 'illicit_substances',
    name: 'Illicit Substance',
    category: 'Contraband',
    basePrice: 50,
    weight: '0.5 lbs',
    description: 'Illegal goods carrying severe penalties for possession but commanding high prices.',
    variants: [
      { name: 'Dreamlily Extract', desc: 'Induces euphoria and vivid dreamscapes for hours.', price: 50 },
      { name: 'Midnight Oil', desc: 'Grants nightvision but causes severe light sensitivity.', price: 75 },
      { name: 'Beholder-Tongue Powder', desc: 'Grants brief anti-magic but is hideously illegal.', price: 200 },
      { name: 'Fey-Dust', desc: 'Glittering powder causing time dilation and mania.', price: 100 },
      { name: 'Blood-Lotus Paste', desc: 'Enhances reflexes but causes crippling addiction.', price: 150 },
      { name: 'Grave-Dirt Snuff', desc: 'Used by necromancers to speak safely with the dead.', price: 80 },
      { name: 'Liquid Glass', desc: 'A terrifying poison that crystallizes the lungs.', price: 300 },
      { name: 'Assassin\'s Tears', desc: 'Tasteless, odorless, and utterly untraceable.', price: 500 }
    ]
  },
  {
    id: 'stolen_goods',
    name: 'Stolen Goods',
    category: 'Contraband',
    basePrice: 100,
    weight: '3 lbs',
    description: 'High-value items that are notoriously "hot" and must be fenced carefully.',
    variants: [
      { name: 'Royal Signet Ring', desc: 'Grants the authority of the King, if you aren\'t caught.', price: 500 },
      { name: 'Defaced Holy Symbol', desc: 'A solid gold relic pried from a temple altar.', price: 150 },
      { name: 'Stolen Guild Ledger', desc: 'Contains highly sensitive blackmail material.', price: 200 },
      { name: 'Tax Collector\'s Lockbox', desc: 'Heavily warded and filled with crown silver.', price: 300 },
      { name: 'Noblewoman\'s Tiara', desc: 'Easily recognizable; needs to be melted down.', price: 100 },
      { name: 'Stolen Destruction Wand', desc: 'A dangerous weapon registered to the Mage\'s Guild.', price: 250 }
    ]
  },
  {
    id: 'forbidden_texts',
    name: 'Forbidden Text',
    category: 'Contraband',
    basePrice: 250,
    weight: '5 lbs',
    description: 'Tomes banned by the church or crown due to their dangerous contents.',
    variants: [
      { name: 'Demonology Compendium', desc: 'Bound in unnervingly soft leather.', price: 350 },
      { name: 'The Anarchist\'s Formula', desc: 'Detailed blueprints for alchemical explosives.', price: 200 },
      { name: 'Necromancer\'s Primer', desc: 'Illegally circulated manual on raising thralls.', price: 400 },
      { name: 'Songs of the Archfey', desc: 'Melodies that drive mortal listeners to madness.', price: 150 },
      { name: 'The True Lineage', desc: 'A treasonous book challenging the King\'s birthright.', price: 100 },
      { name: 'Tome of the Leviathan', desc: 'A waterlogged book related to sunken eldritch gods.', price: 500 }
    ]
  },
  {
    id: 'poached_parts',
    name: 'Poached Animal Part',
    category: 'Contraband',
    basePrice: 150,
    weight: '8 lbs',
    description: 'Harvested from protected species or royal hunting grounds.',
    variants: [
      { name: 'Unicorn Horn', desc: 'A pure white alicorn severed from a sacred beast.', price: 1000 },
      { name: 'King\'s Deer Antlers', desc: 'Poached from the restricted royal forest.', price: 80 },
      { name: 'Pegasus Feathers', desc: 'Plucked from a winged mount. Highly illegal.', price: 120 },
      { name: 'Griffon Eggs', desc: 'Stolen from high nests to be sold to underground beast-tamers.', price: 300 },
      { name: 'Mermaid Scales', desc: 'Shimmering scales carrying a heavy curse of the sea.', price: 250 },
      { name: 'Sphinx Paw', desc: 'A massive feline paw, preserved in arcane salts.', price: 400 }
    ]
  },

  // ==========================================
  // CURIOSITIES
  // ==========================================
  {
    id: 'oddities',
    name: 'Curiosity',
    category: 'Curiosity',
    basePrice: 10,
    weight: '1 lbs',
    description: 'Strange, unusual, or unexplained objects that collectors find fascinating.',
    variants: [
      { name: 'Compass That Points Nowhere', desc: 'Needle spins freely except on the solstice.', price: 25 },
      { name: 'Perpetual Hourglass', desc: 'The top bulb never empties despite falling sand.', price: 40 },
      { name: 'Singing Stone', desc: 'Hums a faint, melancholic tune when held against the ear.', price: 15 },
      { name: 'Bottled Lightning', desc: 'A sealed glass flask containing a tiny bolt of lightning.', price: 60 },
      { name: 'Shadow in a Jar', desc: 'Releases a small patch of absolute darkness.', price: 35 },
      { name: 'Eye in Amber', desc: 'A piece of amber containing a perfectly preserved, pupil-shifting reptilian eye.', price: 50 }
    ]
  },
  {
    id: 'ancient_relics',
    name: 'Ancient Relic',
    category: 'Curiosity',
    basePrice: 80,
    weight: '3 lbs',
    description: 'Artifacts dug up from lost civilizations. Their purpose is often entirely unknown.',
    variants: [
      { name: 'Stone Disk with Symbols', desc: 'An astrolabe belonging to a forgotten empire.', price: 100 },
      { name: 'Petrified Egg', desc: 'The size of a melon. Occasionally vibrates on its own.', price: 150 },
      { name: 'Bronze Mechanism', desc: 'A corroded mass of gears that shouldn\'t exist yet.', price: 75 },
      { name: 'Faceless Idol', desc: 'A disturbing idol carved from unidentified black stone.', price: 50 },
      { name: 'Tarnished Silver Mask', desc: 'Too small for a human, too large for a halfling.', price: 120 },
      { name: 'Crystal Data-Spire', desc: 'A humming shard that projects dizzying light patterns.', price: 200 }
    ]
  },
  {
    id: 'clockwork_toys',
    name: 'Clockwork Toy',
    category: 'Curiosity',
    basePrice: 30,
    weight: '2 lbs',
    description: 'Intricate gnomish or dwarven contraptions designed for amusement.',
    variants: [
      { name: 'Marching Tin Soldier', desc: 'Fires a tiny wooden musket that produces actual sparks.', price: 25 },
      { name: 'Mechanical Nightingale', desc: 'Sings a perfect morning melody when wound up.', price: 80 },
      { name: 'Brass Arachnid', desc: 'Skitters across tables completely autonomously.', price: 45 },
      { name: 'Self-Shuffling Deck', desc: 'A metal box that violently mixes cards when shaken.', price: 30 },
      { name: 'Miniature Orrery', desc: 'A moving model of the planar system, accurate to the minute.', price: 150 },
      { name: 'Dancing Marionettes', desc: 'Two figures that waltz without any strings attached.', price: 60 }
    ]
  },
  {
    id: 'fossilized_remains',
    name: 'Fossilized Remains',
    category: 'Curiosity',
    basePrice: 45,
    weight: '12 lbs',
    description: 'Bones and outlines of creatures turned to stone over millions of years.',
    variants: [
      { name: 'Trilobite Imprint', desc: 'A perfect impression of a bizarre, armored sea bug.', price: 15 },
      { name: 'Giant Fern Frond', desc: 'A massive leaf captured eternally in slate.', price: 20 },
      { name: 'Ammonite Shell', desc: 'A spiraling stone shell polished to a jewel-like sheen.', price: 35 },
      { name: 'T-Rex Tooth', desc: 'A serrated, dagger-sized tooth from a prehistoric thunder-lizard.', price: 100 },
      { name: 'Fossilized Leviathan Scale', desc: 'Larger than a dinner plate. Radiates faint ancient magic.', price: 80 },
      { name: 'Amber Coiled Viper', desc: 'An entire juvenile snake trapped in massive amber.', price: 250 }
    ]
  }
];
