import type { VariantDef } from './types';

export type CuisineType = 'Ration' | 'Tavern Fare' | 'Beverage' | 'Delicacy' | 'Street Food' | 'Preserve' | 'Confectionery' | 'Campfire' | 'Monster Fare' | 'Alchemical';

/**
 * A prepared food or drink item that provides temporary stat bonuses
 * or recovery effects when consumed. Cuisine quality ranges from
 * tavern slop to royal feasts.
 */
export interface Cuisine {
  id: string;
  name: string;
  origin: string;
  type: CuisineType;
  effect: string | null;
  price: number;
  variants: VariantDef[];
}

/** Master list of all cuisine items, organized by origin and quality. */
export const CUISINE: Cuisine[] = [
  {
    id: 'iron_rations',
    name: 'Iron Rations',
    origin: 'Universal',
    type: 'Ration',
    effect: null,
    price: 1,
    variants: [
      { name: 'Hardtack and Jerky', desc: 'A fist-sized brick of tooth-cracking biscuit and a strip of salted mystery meat. Keeps forever.', price: 1 },
      { name: 'Militia Pack', desc: 'Standard military rations: dried oats, cured bacon, and a single withered apple.', price: 1 },
      { name: 'Traveler\'s Bundle', desc: 'Smoked cheese, dried fruit, and dense nutbread wrapped in waxed cloth.', price: 2 },
      { name: 'Ranger\'s Pouch', desc: 'Pemmican, dried berries, and pine-bark flour. Compact enough to fit in a belt pouch.', price: 2 },
      { name: 'Siege Loaf', desc: 'A brick of compressed grain, lard, and salt baked three times until it could stop an arrow.', price: 1 },
      { name: 'Marching Biscuits', desc: 'Dry, crumbly squares of oat and honey that stick to the roof of your mouth.', price: 1 },
      { name: 'Winter-Salted Beef', desc: 'Beef strip so heavily salted it causes immediate thirst unless soaked.', price: 2 },
      { name: 'Forager\'s Brick', desc: 'A strange mixture of acorns, seeds, and rendered fat pressed into a square.', price: 1 },
      { name: 'Dyer\'s Crumb', desc: 'Leftover bakery crusts re-baked until rock hard and dusted with survival herbs.', price: 1 },
      { name: 'Pathfinder\'s Roll', desc: 'A dense roll of ground nuts and dried venison mixed with honey.', price: 3 }
    ]
  },
  {
    id: 'elven_waybread',
    name: 'Elven Waybread',
    origin: 'The Sylvan Concord',
    type: 'Ration',
    effect: 'A single bite sustains a human for a full day of light travel.',
    price: 25,
    variants: [
      { name: 'Crambread', desc: 'Thin, golden leaves of bread wrapped in mallorn-leaf. A single piece fills the stomach.', price: 25 },
      { name: 'Star-Cakes', desc: 'Tiny, crescent-shaped biscuits infused with moonlight honey.', price: 30 },
      { name: 'Root-Wafer', desc: 'Paper-thin wafers pressed from elderroot paste. Tasteless but nourishing.', price: 20 },
      { name: 'Dew-Bread', desc: 'A loaf baked with morning dew collected from ancient groves. Melts on the tongue.', price: 35 },
      { name: 'Pilgrim\'s Leaf', desc: 'A single dried leaf from a sacred tree, carrying the distilled nutrition of a harvest.', price: 50 },
      { name: 'Sun-Touched Seed', desc: 'A massive enchanted sunflower seed that bursts with caloric energy.', price: 22 },
      { name: 'Silver-Petal Crisp', desc: 'Brittle, sugary leaves from the silver-wood tree. Very delicate.', price: 40 },
      { name: 'Wild-Marrow Roll', desc: 'A pastry wrapped around magically preserved marrow from giant beasts.', price: 30 },
      { name: 'Spring-Tide Loaf', desc: 'Baked only during the spring equinox. Smells like fresh rain.', price: 45 },
      { name: 'Deep-Wood Bark', desc: 'Actual enchanted tree bark that becomes soft and sweet when chewed.', price: 25 }
    ]
  },
  {
    id: 'dwarven_stonebread',
    name: 'Dwarven Stonebread',
    origin: 'Ironhelm Keep',
    type: 'Ration',
    effect: 'Incredibly dense; grants 1 temporary hit point from sheer mass.',
    price: 5,
    variants: [
      { name: 'Iron-Flour Roll', desc: 'Ground with iron filings. Gives you a strong back and chipped teeth.', price: 5 },
      { name: 'Cave-Spore Biscuit', desc: 'Slightly luminescent. Tastes intensely of dirt and mushroom.', price: 6 },
      { name: 'Stout-Dipped Cracker', desc: 'Hardened bread designed to only be edible after soaking in warm beer.', price: 4 },
      { name: 'Miner\'s Slab', desc: 'Contains enough salt to cause extreme thirst. Keeps a dwarf working.', price: 7 },
      { name: 'Fossilized Loaf', desc: 'Can genuinely be used as a club in combat. Requires a hammer to portion.', price: 5 },
      { name: 'Magma-Baked Crust', desc: 'Baked on active lava flows. Has a faintly sulfuric and deeply roasted flavor.', price: 8 },
      { name: 'Granite-Dust Cake', desc: 'Very filling, completely tasteless. High mineral content.', price: 4 },
      { name: 'Deep-Worm Jerky', desc: 'Tough, rubbery strips of giant segmented worm meat.', price: 9 },
      { name: 'Soot-Loaf', desc: 'Dusted with fine ash to preserve it for decades underground.', price: 5 },
      { name: 'Brass-Rivet Biscuit', desc: 'Contains actual small brass studs containing vital trace minerals.', price: 10 }
    ]
  },
  {
    id: 'naval_hardtack',
    name: 'Naval Hardtack',
    origin: 'Coastal Trade Fleets',
    type: 'Ration',
    effect: 'Resists all rot and spoiling.',
    price: 1,
    variants: [
      { name: 'Ship\'s Biscuit', desc: 'Standard navy fare. You tap it on the table first to knock the weevils out.', price: 1 },
      { name: 'Salted Cod Jerky', desc: 'Incredibly tough fish strip wrapped in coarse salt. Induces instant thirst.', price: 2 },
      { name: 'Tar-Sealed Barrel Ration', desc: 'Smells vaguely of pitch. The inner core is soft, sour, and mildly fermented.', price: 3 },
      { name: 'Captain\'s Bread', desc: 'Slightly higher quality flour with a singular dried raisin embedded in the center.', price: 4 },
      { name: 'Galley Scraps', desc: 'A compressed puck of left-over fish bones, tail meat, and stale crumb.', price: 1 },
      { name: 'Pickled Sea-Grapes', desc: 'Salty, popping spheres of seaweed. Decent for holding off scurvy.', price: 3 },
      { name: 'Whaler\'s Blubber-Strip', desc: 'Dense, fatty, and smells awful, but keeps you warm in freezing seas.', price: 4 },
      { name: 'Lime-Soaked Cracker', desc: 'Bitter and acidic. Eaten purely for the medicinal value.', price: 2 },
      { name: 'Dried Squid Tentacle', desc: 'Chewy enough to last three continuous hours of gnawing.', price: 2 },
      { name: 'Brine-Boiled Oats', desc: 'A heavy, cold gelatinous mass of oats boiled in seawater.', price: 1 }
    ]
  },
  {
    id: 'orcish_pemmican',
    name: 'Orcish Pemmican',
    origin: 'The Broken Peaks',
    type: 'Ration',
    effect: 'Restores a small amount of health but causes immediate, intense thirst.',
    price: 3,
    variants: [
      { name: 'Blood-Mixed Meat', desc: 'Raw meat cured with blood and harsh spices. Extremely potent.', price: 4 },
      { name: 'Bone-Marrow Mash', desc: 'A fatty paste made from crushed bones and root vegetables.', price: 3 },
      { name: 'Wolf-Heart Jerky', desc: 'Tough meat believed by the tribes to grant the courage of the wolf.', price: 5 },
      { name: 'Ash-Cured Venison', desc: 'Dried in the smoke of a massive bonfire. Tastes like burning.', price: 2 },
      { name: 'Warg-Rider\'s Snack', desc: 'A bloody chunk of mystery meat meant for mounts, but eaten by riders.', price: 2 },
      { name: 'Fire-Pepper Tallow', desc: 'A chunk of rendered fat studded with excruciatingly hot peppers.', price: 3 },
      { name: 'Crushed Beet and Meat', desc: 'A red, staining paste that is surprisingly nutritious.', price: 3 },
      { name: 'Gristle-Brick', desc: 'Almost entirely connective tissue. Takes hours to digest.', price: 2 },
      { name: 'Chieftain\'s Reserve', desc: 'Made from the best cuts of the hunt, spiced with rare mountain herbs.', price: 8 },
      { name: 'Scavenger\'s Sausage', desc: 'Cased in intestine and filled with whatever they found on the battlefield.', price: 1 }
    ]
  },
  {
    id: 'boar_ribs',
    name: 'Boar Ribs in Honey Glaze',
    origin: 'Eldorath Kingdom',
    type: 'Tavern Fare',
    effect: 'Cures minor fatigue and restores a small amount of vitality during a brief reprieve.',
    price: 5,
    variants: [
      { name: 'Classic Honey Glaze', desc: 'Slow-roasted over oak coals with a thick clover-honey glaze.', price: 5 },
      { name: 'Peppered and Charred', desc: 'Crusted with cracked peppercorns and seared over an open flame.', price: 6 },
      { name: 'Dwarven Mustard Rub', desc: 'Slathered in a pungent stone-ground mustard. Clears the sinuses.', price: 7 },
      { name: 'Garlic and Rosemary', desc: 'Studded with whole garlic cloves and fresh rosemary sprigs.', price: 5 },
      { name: 'Spiced Ale Braise', desc: 'Braised in dark ale with root vegetables until the meat slides off the bone.', price: 8 },
      { name: 'Applewood Smoked', desc: 'Smoked for ten hours over applewood chips. Sweet and savory.', price: 6 },
      { name: 'Dragon-Pepper Fire-Ribs', desc: 'Coated in a red paste that leaves the eater sweating profusely.', price: 7 },
      { name: 'Berry-Wine Reduction', desc: 'Glazed with a sticky, dark berry wine. Very sticky fingers.', price: 6 },
      { name: 'Salt-Crusted Ribs', desc: 'Baked inside a shell of salt to retain all the moisture.', price: 5 },
      { name: 'King\'s Cut', desc: 'The thickest, most succulent ribs off the rack, reserved for big spenders.', price: 12 }
    ]
  },
  {
    id: 'shepherds_stew',
    name: 'Shepherd\'s Stew',
    origin: 'The Northern Marches',
    type: 'Tavern Fare',
    effect: 'Grants resistance to cold weather effects for 4 hours.',
    price: 3,
    variants: [
      { name: 'Thick Mutton Stew', desc: 'Chunks of mutton, turnip, and barley in a rich brown broth.', price: 3 },
      { name: 'Hunter\'s Pot', desc: 'Leftover game thrown into a cauldron with potatoes. Different every night.', price: 2 },
      { name: 'Root Cellar Chowder', desc: 'A peasant classic of parsnips, carrots, and leeks slow-cooked with bacon fat.', price: 2 },
      { name: 'Trapper\'s Broth', desc: 'Wild rabbit and foraged mushrooms simmered in herb-scented stock.', price: 4 },
      { name: 'Ironhelm Goulash', desc: 'A fiery dwarven stew of ox-tail and cave-peppers.', price: 5 },
      { name: 'Winter-Heart Stew', desc: 'A ceremonial end-of-winter stew made with marrow bones and black lentils.', price: 6 },
      { name: 'Peasant\'s Barley Soup', desc: 'Almost no meat, mostly grain and broth. Very cheap.', price: 1 },
      { name: 'River-Fisher\'s Stew', desc: 'Catfish and river-weed stew with heavy cream.', price: 4 },
      { name: 'Forest-Floor Medley', desc: 'Six types of wild mushrooms cooked down in heavy butter.', price: 5 },
      { name: 'Highlander\'s Boil', desc: 'Cabbage, potato, and salted pork boiled violently. Fills the stomach immediately.', price: 3 }
    ]
  },
  {
    id: 'roast_fowl',
    name: 'Spit-Roasted Fowl',
    origin: 'Universal',
    type: 'Tavern Fare',
    effect: null,
    price: 4,
    variants: [
      { name: 'Whole Roast Chicken', desc: 'A golden-skinned bird rotating on a spit, basted in butter and sage.', price: 4 },
      { name: 'Stuffed Pheasant', desc: 'A plump pheasant packed with herb-bread stuffing.', price: 8 },
      { name: 'Peppered Quail', desc: 'Tiny roasted quails on a wooden skewer, crusted with black pepper.', price: 6 },
      { name: 'Smoked Duck', desc: 'Half a duck cured over applewood chips for an entire day.', price: 7 },
      { name: 'Mud-Baked Grouse', desc: 'Wrapped in clay and buried in hot coals, trapping all moisture.', price: 5 },
      { name: 'Turducken-Style Feast', desc: 'A small bird inside a medium bird inside a large bird. Requires pre-ordering.', price: 15 },
      { name: 'Honey-Glazed Capon', desc: 'A large castrated rooster, incredibly tender, glazed with honey.', price: 9 },
      { name: 'Garlic Butter Turkey-Leg', desc: 'A massive roasted leg wrapped in parchment for easy holding.', price: 5 },
      { name: 'Brine-Soaked Partridge', desc: 'Slightly salty, extremely juicy woodland bird.', price: 6 },
      { name: 'Charcoal-Pigeon', desc: 'Cheap, ubiquitous, and completely overcooked to hide the taste.', price: 2 }
    ]
  },
  {
    id: 'fish_and_chips',
    name: 'Fried Catch',
    origin: 'The Coastal Cities',
    type: 'Tavern Fare',
    effect: null,
    price: 3,
    variants: [
      { name: 'Battered Cod', desc: 'A massive fillet of white fish encased in heavy, grease-dripping beer batter.', price: 3 },
      { name: 'Pan-Fried Trout', desc: 'Fresh river trout cooked simply in butter, lemon, and almonds.', price: 4 },
      { name: 'Sailor\'s Eel', desc: 'Jellied eel served with heavy black bread. Hard to look at.', price: 2 },
      { name: 'Fried Calamari', desc: 'Rings of giant squid dredged in seasoned flour and flash-fried.', price: 5 },
      { name: 'Spicy Crawfish Boil', desc: 'A pile of crustaceans boiled with corn, potatoes, and eye-watering spice.', price: 6 },
      { name: 'Crab Cakes', desc: 'Flaky crab meat, breadcrumbs, and herbs pan-fried until golden.', price: 7 },
      { name: 'Garlic Butter Prawns', desc: 'Massive river-prawns swimming in hot melted garlic butter.', price: 8 },
      { name: 'Oyster Platter', desc: 'A dozen raw oysters on ice. Pray the tavern is close to the sea.', price: 5 },
      { name: 'Deep-Fried Smelt', desc: 'Tiny silvery fish eaten whole like crispy fries.', price: 3 },
      { name: 'Fisherman\'s Pie', desc: 'White fish in cream sauce baked underneath a massive mound of mashed potato.', price: 5 }
    ]
  },
  {
    id: 'ploughmans_lunch',
    name: 'Ploughman\'s Lunch',
    origin: 'The Pastoral Heartlands',
    type: 'Tavern Fare',
    effect: null,
    price: 2,
    variants: [
      { name: 'Classic Platter', desc: 'A thick slab of cheddar, half an apple, pickled onions, and crusty bread.', price: 2 },
      { name: 'Hunter\'s Board', desc: 'Thick-cut venison sausage and sharp mustard replacing standard cheese.', price: 4 },
      { name: 'Noble\'s Grazing Board', desc: 'Three exotic cheeses, imported olives, cured prosciutto, and spun honey.', price: 15 },
      { name: 'Monastery Plate', desc: 'Soft goat cheese, fresh honeycomb, and dark rye bread baked by monks.', price: 5 },
      { name: 'Tavern-keeper\'s Remnants', desc: 'Whatever hard cheese and stale bread didn\'t sell yesterday.', price: 1 },
      { name: 'Cured Boar Plate', desc: 'Slices of salty boar ham, sharp blue cheese, and a handful of walnuts.', price: 6 },
      { name: 'Smoked Fish Board', desc: 'Slices of smoked salmon, dill cream, and black pepper crackers.', price: 7 },
      { name: 'Harvest Block', desc: 'Pumpkin wedges, roasted squash seeds, and sharp sheep cheese.', price: 4 },
      { name: 'Dwarven Miner\'s Plate', desc: 'Rock-cheese, pickled cave mushrooms, and a slice of mystery meat.', price: 5 },
      { name: 'Spicy Sausage Board', desc: 'Overwhelmingly hot peppered sausage designed to make you buy more ale.', price: 4 }
    ]
  },
  {
    id: 'dwarven_stout',
    name: 'Dwarven Stout',
    origin: 'Ironhelm Keep',
    type: 'Beverage',
    effect: 'Bolsters willpower against fear for 1 hour, but dulls analytical reasoning.',
    price: 3,
    variants: [
      { name: 'Ironhelm Black', desc: 'So dark and thick it absorbs light. Puts most humans under the table.', price: 3 },
      { name: 'Deep-Shaft Bitter', desc: 'Brewed with water from underground rivers. Bypasses the throat entirely.', price: 4 },
      { name: 'Anvil Ale', desc: 'A copper-colored brew. Tastes of toasted grain and poor life decisions.', price: 2 },
      { name: 'Iron-Gut Porter', desc: 'Thick enough to chew. Brewed with roasted barley and blackstrap molasses.', price: 5 },
      { name: 'Forge-Fire Lager', desc: 'Spiked with cinnamon and a dash of coal-dust. Helps in freezing mine shafts.', price: 3 },
      { name: 'Dragon-Breath Stout', desc: 'Infused with actual cave peppers during fermentation. Burns incredibly.', price: 6 },
      { name: 'Granite-Crush Ale', desc: 'Filtered through crushed granite. Has a sharp mineral edge.', price: 4 },
      { name: 'Miner\'s Reward', desc: 'A highly alcoholic, syrupy dark beer reserved for massive celebrations.', price: 8 },
      { name: 'Soot-Barrel Stout', desc: 'Aged in barrels blackened by smithy fire. Tastes like pure smoke.', price: 5 },
      { name: 'Gold-Flake Pilsner', desc: 'An ostentatious, lighter dwarven beer with literal gold flakes floating in it.', price: 15 }
    ]
  },
  {
    id: 'common_wine',
    name: 'Table Wine',
    origin: 'Universal',
    type: 'Beverage',
    effect: null,
    price: 2,
    variants: [
      { name: 'Red Plonk', desc: 'Cheap, sour, available in every tavern. Nobody orders it; everyone drinks it.', price: 1 },
      { name: 'Harvest Gold', desc: 'A sweet white wine. Popular with merchants who pretend it is expensive.', price: 3 },
      { name: 'Blackberry Mead', desc: 'Thick with crushed blackberries and wild honey. Stains teeth permanently.', price: 4 },
      { name: 'Spiced Mulled Wine', desc: 'Red wine heated with cloves, cinnamon sticks, and orange peel.', price: 3 },
      { name: 'Vintner\'s Reserve', desc: 'An actually decent bottle. Barkeeps keep it on a high shelf and charge triple.', price: 10 },
      { name: 'Elven Ice-Wine', desc: 'Harvested from grapes frozen on the vine. Intensely sweet and shockingly expensive.', price: 25 },
      { name: 'Blush Rosé', desc: 'A light, floral pink wine favored during spring festivals.', price: 6 },
      { name: 'Blood-Red Shiraz', desc: 'An incredibly dry, tannin-heavy wine preferred by northern nobles.', price: 8 },
      { name: 'Sparkling White', desc: 'Bubbling and crisp, highly carbonated through magic or intense fermentation.', price: 15 },
      { name: 'Plum Wine', desc: 'Very thick, sweet, and syrupy, often served as a dessert beverage.', price: 5 }
    ]
  },
  {
    id: 'exotic_spirits',
    name: 'Exotic Spirits',
    origin: 'Various',
    type: 'Beverage',
    effect: 'Grants a small buffer of temporary vitality and removes the frightened condition.',
    price: 8,
    variants: [
      { name: 'Orcish Rotgut', desc: 'Fermented from cactus and rage. Burns on the way down. Immune to freezing.', price: 5 },
      { name: 'Gnomish Brandy', desc: 'Triple-distilled through copper coils. Smooth and capable of stripping varnish.', price: 12 },
      { name: 'Halfling Applecider', desc: 'Deceptively light. By the time you realize it\'s alcoholic, you are singing.', price: 6 },
      { name: 'Desert Firewater', desc: 'Distilled from dates and anise. Swallowing actual liquid fire.', price: 8 },
      { name: 'Frost Giant\'s Tears', desc: 'A pale blue liquor. Served in thimble-sized portions. One is enough.', price: 15 },
      { name: 'Kraken Ink Rum', desc: 'Pitch black, spiced rum that leaves your tongue stained for days.', price: 18 },
      { name: 'Fey-Touched Absinthe', desc: 'A glowing green liquor that frequently causes mild auditory hallucinations.', price: 20 },
      { name: 'Drow Mushroom-Vodka', desc: 'Earthy, clear, and makes your vision blur slightly for ten minutes.', price: 14 },
      { name: 'Dragonborn Cinnamon-Whiskey', desc: 'Contains enough raw cinnamon to choke a horse. Highly popular.', price: 10 },
      { name: 'Pirate\'s Blind-Rum', desc: 'Over-proof rum traded on the black market. Flammable.', price: 7 }
    ]
  },
  {
    id: 'herbal_teas',
    name: 'Herbal Infusions',
    origin: 'The Monastic Orders',
    type: 'Beverage',
    effect: 'Reduces stress and can nullify mild poisons if ingested immediately.',
    price: 2,
    variants: [
      { name: 'Chamomile Soother', desc: 'A bright yellow tea that smells of summer meadows. Instantly calms the nerves.', price: 2 },
      { name: 'Ginseng Root Brew', desc: 'A bitter, dark amber liquid that aggressively banishes sleepiness.', price: 4 },
      { name: 'Pine-Needle Tea', desc: 'A ranger\'s staple. High in vitamin C and tastes distinctly like a tree.', price: 1 },
      { name: 'Dragon-Tongue Infusion', desc: 'A spicy, red tea that causes the drinker to exhale faint wisps of smoke.', price: 6 },
      { name: 'Silverleaf Tea', desc: 'Brewed from rare elven silverleaf. Has a cooling sensation and cures hiccups.', price: 10 },
      { name: 'Mint-Frost Tea', desc: 'Intensely minty tea that leaves the mouth feeling cold for half an hour.', price: 3 },
      { name: 'Monk\'s Fasting Brew', desc: 'Smells awful, tastes worse, but completely eliminates the feeling of hunger.', price: 5 },
      { name: 'Lavender Night-Tea', desc: 'A gentle purple tea guaranteed to cause profound, dreamless sleep.', price: 4 },
      { name: 'Black-Root Chai', desc: 'Heavily spiced with pepper and cardamom. Gives an immediate jolt of energy.', price: 3 },
      { name: 'Rosehip Elixir', desc: 'A sweet, tart red tea that clears the sinuses and soothes the throat.', price: 3 }
    ]
  },
  {
    id: 'coffee_and_chicory',
    name: 'Caffeinated Brews',
    origin: 'The Southern Ports',
    type: 'Beverage',
    effect: 'Removes the fatigue penalty for 3 hours, after which an unavoidable crash occurs.',
    price: 3,
    variants: [
      { name: 'Black Bean Coffee', desc: 'A bitter, tar-like sludge drunk by scholars pulling all-nighters.', price: 3 },
      { name: 'Dwarven Chicory', desc: 'Cut with roasted root and surprisingly earthy.', price: 2 },
      { name: 'Spiced Desert Brew', desc: 'Brewed in a tiny pot over hot sand, infused with cardamom.', price: 5 },
      { name: 'Noble\'s Morning Milk', desc: 'Coffee cut with heavy cream and three spoonfuls of cane sugar.', price: 6 },
      { name: 'Cold-Steeped Tar', desc: 'Brewed in cold water for a full day. Incredibly smooth and dangerously caffeinated.', price: 4 },
      { name: 'Gnomish Espresso', desc: 'Pressed under extreme steam pressure into a tiny, heart-stopping shot.', price: 5 },
      { name: 'Caramel Macchiato', desc: 'A fancy city-dweller\'s drink covered in whipped froth and burnt sugar syrup.', price: 7 },
      { name: 'Salted Butter Coffee', desc: 'Mixed with yak butter. Greasy, salty, and provides immense morning energy.', price: 4 },
      { name: 'Mushroom-Coffee Blend', desc: 'Earthy and less jittery, favored by underdark merchants.', price: 3 },
      { name: 'Sailor\'s Wake-Up', desc: 'Standard cheap coffee spiked heavily with rum.', price: 4 }
    ]
  },
  {
    id: 'market_bites',
    name: 'Market Bites',
    origin: 'Universal',
    type: 'Street Food',
    effect: null,
    price: 1,
    variants: [
      { name: 'Meat Pies', desc: 'Flaky pastry stuffed with minced mutton and gravy. Vendors swear it is mutton.', price: 1 },
      { name: 'Roasted Chestnuts', desc: 'Paper cones of charred, split chestnuts sold from a brazier cart.', price: 1 },
      { name: 'Fried Dough Twists', desc: 'Spirals of fried dough dusted with cinnamon sugar.', price: 1 },
      { name: 'Skewered Sausages', desc: 'Fat pork sausages charred on oak skewers over a barrel-fire.', price: 2 },
      { name: 'Pickled Eggs', desc: 'Hard-boiled eggs floating in murky brine. An acquired taste.', price: 1 },
      { name: 'Toasted Apple Wedges', desc: 'Apples roasted on a grill plate and drenched in a cheap syrup.', price: 1 },
      { name: 'Fried Cheese Curds', desc: 'Squeaky chunks of cheese dropped in hot oil for ten seconds.', price: 2 },
      { name: 'Garlic Knots', desc: 'Twisted dough dripping with cheap oil and raw garlic.', price: 1 },
      { name: 'Bacon-Wrapped Figs', desc: 'Sweet, salty, and scalding hot on the inside.', price: 3 },
      { name: 'Salt-Beef Sandwich', desc: 'Thick slabs of salt-cured beef jammed between two pieces of crust.', price: 2 }
    ]
  },
  {
    id: 'hand_pies',
    name: 'Savory Hand Pies',
    origin: 'The Capital City',
    type: 'Street Food',
    effect: null,
    price: 2,
    variants: [
      { name: 'Steak and Ale Pie', desc: 'Rich beef gravy and tender steak enclosed in shortcrust pastry.', price: 3 },
      { name: 'Leek and Potato Pasty', desc: 'A vegetarian option favored by miners. Heavy on the pepper and butter.', price: 2 },
      { name: 'Spicy Chicken Turnover', desc: 'Shredded chicken in a fiery red sauce, sealed in a crescent dough pocket.', price: 3 },
      { name: 'Mystery Meat Pasty', desc: 'Cost half a copper. Tastes suspiciously like pigeon and stray cat.', price: 1 },
      { name: 'Cheese and Onion Bake', desc: 'Molten cheddar and caramelized onions. Will severely burn your mouth.', price: 2 },
      { name: 'Mushroom and Stout Pie', desc: 'Thick ale gravy with massive chunks of cave-mushroom.', price: 3 },
      { name: 'Curried Lamb Pocket', desc: 'Imported spices give this hand pie a brilliant yellow color and intense heat.', price: 4 },
      { name: 'Venison and Berry Tart', desc: 'A mix of savory game meat and tart forest berries.', price: 5 },
      { name: 'Sailor\'s Fish Pie', desc: 'Smoked haddock and cream wrapped in a tough, water-resistant crust.', price: 3 },
      { name: 'Breakfast Pasty', desc: 'Stuffed entirely with scrambled egg, bacon, and beans.', price: 2 }
    ]
  },
  {
    id: 'roasted_nuts',
    name: 'Roasted Nuts & Seeds',
    origin: 'Universal',
    type: 'Street Food',
    effect: null,
    price: 1,
    variants: [
      { name: 'Honey-Glazed Walnuts', desc: 'Sticky, sweet, and crunchy. Sold in small paper cones.', price: 3 },
      { name: 'Spiced Almonds', desc: 'Tossed in salt, smoked paprika, and a touch of cave-pepper.', price: 2 },
      { name: 'Salted Pumpkin Seeds', desc: 'Roasted until the shell is brittle. A cheap snack for gamblers.', price: 1 },
      { name: 'Candied Pecans', desc: 'A southern specialty covered in a thick praline crust.', price: 4 },
      { name: 'Boiled Peanuts', desc: 'Soggy, salty, and utterly addictive if you\'re from the right region.', price: 2 },
      { name: 'Dragon-Breath Cashews', desc: 'Violently spicy. Eat too many and you\'ll cry.', price: 3 },
      { name: 'Garlic-Roasted Pistachios', desc: 'Hard to crack open, but coated in addictive garlic dust.', price: 3 },
      { name: 'Sugar-Coated Peanuts', desc: 'Encased in a thick, crunchy red sugar shell.', price: 1 },
      { name: 'Smoked Macadamias', desc: 'An exotic nut imported from afar, heavily smoked over peat.', price: 6 },
      { name: 'Sunflower Seed Sack', desc: 'A massive bag of salty seeds. You spit the shells on the street.', price: 1 }
    ]
  },
  {
    id: 'dumplings',
    name: 'Street Dumplings',
    origin: 'The Eastern Provinces',
    type: 'Street Food',
    effect: null,
    price: 3,
    variants: [
      { name: 'Pork Steamed Buns', desc: 'Fluffy white dough pillows filled with sweet barbecue pork.', price: 3 },
      { name: 'Pan-Fried Potstickers', desc: 'Crispy on the bottom, steamed on top, filled with cabbage and meat.', price: 2 },
      { name: 'Soup Dumplings', desc: 'Filled with boiling hot broth that bursts when bitten. A hazardous experience.', price: 4 },
      { name: 'Shrimp Har Gao', desc: 'Translucent, delicate wrappers showing the pink shrimp inside.', price: 5 },
      { name: 'Fried Wontons', desc: 'Deep-fried triangles of crisp dough with a minuscule smear of pork inside.', price: 2 },
      { name: 'Mushroom Jiaozi', desc: 'Vegetarian dumplings packed with earthy, minced fungi.', price: 2 },
      { name: 'Spicy Beef Dumplings', desc: 'Swimming in red chili oil and sprinkled with green onions.', price: 4 },
      { name: 'Crystal Vegetable Buns', desc: 'Clear, chewy skin wrapping a bright mix of carrots and peas.', price: 3 },
      { name: 'Giant Meatball Bao', desc: 'A steamed bun the size of a fist containing a massive sausage meatball.', price: 4 },
      { name: 'Sweet Bean Buns', desc: 'Steamed buns filled with a sweet, dark red bean paste for dessert.', price: 2 }
    ]
  },
  {
    id: 'sweet_fritters',
    name: 'Carnival Fritters',
    origin: 'Universal',
    type: 'Street Food',
    effect: null,
    price: 2,
    variants: [
      { name: 'Apple Fritter Rings', desc: 'Slices of apple battered and deep-fried until golden.', price: 2 },
      { name: 'Funnel Cake', desc: 'A messy nest of fried dough utterly buried in powdered icing sugar.', price: 3 },
      { name: 'Deep-Fried Butter', desc: 'A county fair abomination. Shortens your lifespan with every bite.', price: 5 },
      { name: 'Candied Curds', desc: 'Cheese curds dropped in hot oil and given a sweet drizzle.', price: 4 },
      { name: 'Honey-Drenched Zeppole', desc: 'Little balls of fried dough soaking in orange-blossom honey.', price: 3 },
      { name: 'Chocolate-Stuffed Beignet', desc: 'A square doughnut that explodes with molten chocolate when bitten.', price: 4 },
      { name: 'Fried Banana Skewer', desc: 'A battered plantain caramelized in hot oil.', price: 2 },
      { name: 'Cinnamon Churro Loop', desc: 'A ridged loop of crunchy dough coated entirely in cinnamon-sugar.', price: 2 },
      { name: 'Fried Ice-Cream Ball', desc: 'A magical novelty. Hot and crunchy outside, freezing cold inside.', price: 6 },
      { name: 'Powdered Sugar Knives', desc: 'Long, flat strips of fried dough meant for scooping up jam.', price: 2 }
    ]
  },
  {
    id: 'feywild_truffle',
    name: 'Feywild Truffle',
    origin: 'The Twilight Glade',
    type: 'Delicacy',
    effect: 'Causes minor, harmless visual hallucinations that last 10 minutes.',
    price: 50,
    variants: [
      { name: 'Moonshade Truffle', desc: 'Tastes of starlight and regret. Hallucinations are beautifully personal.', price: 50 },
      { name: 'Giggle-Cap', desc: 'Induces uncontrollable laughter followed by profound philosophical clarity.', price: 40 },
      { name: 'Dreamer\'s Knot', desc: 'Makes the consumer perceive sounds as colors for a brief, fascinating period.', price: 60 },
      { name: 'Iron-Belly Morel', desc: 'Tastes divine. The consumer\'s eyes glow faintly green for an hour.', price: 35 },
      { name: 'Archfey\'s Kiss', desc: 'A thumbnail-sized truffle worth a horse. The flavor is literally indescribable.', price: 100 },
      { name: 'Whispering Spore', desc: 'Eating it makes you hear faint, polite compliments from the surrounding plants.', price: 45 },
      { name: 'Time-Slip Truffle', desc: 'Makes the next hour feel like ten minutes. Used for boring royal speeches.', price: 80 },
      { name: 'Pixie-Dust Cap', desc: 'Covers the eater in a faint, glittering aura for six hours.', price: 55 },
      { name: 'Shadow-Veil Morel', desc: 'Tastes like frozen blueberries. Turns your shadow temporarily independent.', price: 70 },
      { name: 'Memory-Bloom Truffle', desc: 'Evokes a perfect recall of the happiest day of your childhood.', price: 150 }
    ]
  },
  {
    id: 'royal_banquet',
    name: 'Royal Banquet Dish',
    origin: 'Eldorath Kingdom',
    type: 'Delicacy',
    effect: 'Enhances social persuasiveness for 4 hours due to elevated mood.',
    price: 25,
    variants: [
      { name: 'Saffron-Glazed Swan', desc: 'Roasted swan presented with gilded feathers reattached. Obscenely decadent.', price: 30 },
      { name: 'Truffle-Stuffed Venison', desc: 'Loin of king\'s deer stuffed with black truffles and wrapped in bacon.', price: 25 },
      { name: 'Honeyed Peacock', desc: 'Peacock roasted with tail-feathers fanned behind it. More art than food.', price: 35 },
      { name: 'Gilded Lamprey Pie', desc: 'Eels baked in pastry with real gold leaf pressed into the lid.', price: 40 },
      { name: 'Dragonfire Soufflé', desc: 'A delicate egg soufflé finished with a controlled burst of dragonborn breath.', price: 20 },
      { name: 'Kraken Ink Risotto', desc: 'Rice stained pitch black. Tastes entirely of the ocean deep.', price: 45 },
      { name: 'Crystal-Sugar Gazebo', desc: 'A dessert architecture masterpiece that takes three pastry chefs a week to build.', price: 80 },
      { name: 'Phoenix-Spiced Quail', desc: 'So hot it supposedly brings the dead back to life. Actually just extremely spicy.', price: 35 },
      { name: 'Unicorn-Milk Blancmange', desc: 'A pure white, wobbly dessert of immense purity and cost.', price: 100 },
      { name: 'Crown-Jewel Pomegranate', desc: 'An enchanted fruit where each seed is actually a burst of different flavored wine.', price: 60 }
    ]
  },
  {
    id: 'deep_sea_caviar',
    name: 'Leviathan Caviar',
    origin: 'The Merfolk Kingdoms',
    type: 'Delicacy',
    effect: 'Allows the user to hold their breath for twice as long for several days.',
    price: 300,
    variants: [
      { name: 'Black Pearl Caviar', desc: 'Eggs the size of grapes that taste like pure seawater and luxury.', price: 300 },
      { name: 'Silver Sturgeon Roe', desc: 'Glistening metallic eggs harvested from the coldest northern seas.', price: 200 },
      { name: 'Ghost-Shark Eggs', desc: 'Translucent, gelatinous eggs that seem to vanish when placed in the mouth.', price: 450 },
      { name: 'Kraken-Spawn Roe', desc: 'Pitch black and slightly wriggling. Eaten only by the bravest gourmands.', price: 500 },
      { name: 'Coral-Crab Caviar', desc: 'Bright pink, crunchy eggs that taste like sweet shrimp.', price: 150 },
      { name: 'Sunken-Gold Roe', desc: 'Naturally golden eggs that shimmer under candlelight.', price: 400 },
      { name: 'Abyssal Angler Roe', desc: 'Glowing blue eggs that illuminate the eater\'s throat on the way down.', price: 600 },
      { name: 'Mer-King\'s Reserve', desc: 'A tiny jar of eggs so rich it is frequently traded instead of gold bars.', price: 1000 },
      { name: 'Sea-serpent Caviar', desc: 'Fiery, spicy eggs that pop violently in the mouth.', price: 350 },
      { name: 'Ice-Leviathan Roe', desc: 'Must be eaten frozen. Provides a brain freeze that lasts for an hour.', price: 250 }
    ]
  },
  {
    id: 'noble_cheeses',
    name: 'Artisan Cheeses',
    origin: 'The Pastoral Heartlands',
    type: 'Delicacy',
    effect: null,
    price: 15,
    variants: [
      { name: 'Cave-Aged Blue', desc: 'Extremely pungent, capable of clearing a room if uncovered.', price: 20 },
      { name: 'Elven Ash-Rind', desc: 'Soft goat cheese coated in the ash of burned sage. Delicate and creamy.', price: 25 },
      { name: 'Dwarven Rock-Wheel', desc: 'Aged for ten years. Requires a chisel to break shards off. Intensely sharp.', price: 30 },
      { name: 'Minotaur\'s Brie', desc: 'Made from the milk of massive war-cows. Hearty, rich, and ridiculously thick.', price: 15 },
      { name: 'Gold-Veined Cheddar', desc: 'Sharp cheddar literally threaded with edible gold filament.', price: 50 },
      { name: 'Truffle-Infused Gouda', desc: 'A smooth cheese completely dominated by the earthy taste of black truffle.', price: 35 },
      { name: 'Red-Wine Washed Rind', desc: 'Bathed for months in an expensive vintage. Stains the fingers red.', price: 28 },
      { name: 'Griffon-Milk Feta', desc: 'Crumbly, intensely salty, and faintly reminiscent of predatory birds.', price: 40 },
      { name: 'Smoked Giant-Sheep Cheese', desc: 'A wheel the size of a wagon tire, smoked over a bonfire.', price: 22 },
      { name: 'Monastic Silence-Cheese', desc: 'Made by vows of silence. The texture is so smooth it silences the eater for a moment.', price: 45 }
    ]
  },
  {
    id: 'exotic_fruits',
    name: 'Exotic Imported Fruit',
    origin: 'The Far Continents',
    type: 'Delicacy',
    effect: 'Heals 1 hit point and cures a hangover completely.',
    price: 10,
    variants: [
      { name: 'Star-Apple', desc: 'When cut crosswise, reveals a perfect five-pointed star. Tastes like vanilla.', price: 10 },
      { name: 'Dragon-Fruit', desc: 'Covered in bright pink scales. The inside is white with tiny black seeds.', price: 12 },
      { name: 'Sky-Mango', desc: 'Grown on floating islands. Lighter than air. Must be tied down.', price: 30 },
      { name: 'Frost-Melon', desc: 'A blue melon that is ice-cold on the inside even in the middle of a desert.', price: 25 },
      { name: 'Blood-Orange', desc: 'Literally drips a fluid that resembles and tastes faintly of iron-rich blood.', price: 8 },
      { name: 'Fey-Plum', desc: 'A purple fruit that makes you float an inch off the ground for thirty seconds.', price: 40 },
      { name: 'Fire-Peach', desc: 'Hot to the touch. Tastes like cinnamon and roasted sugar.', price: 15 },
      { name: 'Glass-Grapes', desc: 'Perfectly transparent grapes that shatter like sugar when bitten.', price: 20 },
      { name: 'Underdark Pomegranate', desc: 'A pitch-black fruit. The seeds glow faintly and taste like licorice.', price: 35 },
      { name: 'Sun-Citrus', desc: 'A lemon so sour and bright it can temporarily blind someone if squeezed in their eye.', price: 12 }
    ]
  },
  {
    id: 'pickled_goods',
    name: 'Pickled Goods',
    origin: 'Universal',
    type: 'Preserve',
    effect: null,
    price: 2,
    variants: [
      { name: 'Garlic Pickles', desc: 'Small cucumbers swimming in heavily garlicked brine. A tavern staple.', price: 2 },
      { name: 'Pickled Onions', desc: 'Tiny pearl onions soaked in malt vinegar. Sharp enough to make you wince.', price: 3 },
      { name: 'Spiced Beets', desc: 'Blood-red wedges of beetroot swimming in cloves and vinegar.', price: 2 },
      { name: 'Dwarven Pickled Cave-Slime', desc: 'Slippery, sour, and beloved by miners.', price: 5 },
      { name: 'Fermented Cabbage', desc: 'A pungent crock of salted cabbage that sustains northern armies through winter.', price: 1 },
      { name: 'Brined Gherkins', desc: 'Baby cucumbers in a sweet and sour mustard brine.', price: 2 },
      { name: 'Pickled Root-Stalks', desc: 'Lotus roots steeped in a fiery red chili brine.', price: 4 },
      { name: 'Vinegar-Soaked Carrots', desc: 'Crunchy, bright orange, and overwhelmingly acidic.', price: 1 },
      { name: 'Salt-Cured Lemons', desc: 'Used mostly in cooking, but sailors eat them like apples.', price: 3 },
      { name: 'Dragon-Pepper Pickles', desc: 'A pale pickle that will literally dissolve a wooden spoon if left too long.', price: 6 }
    ]
  },
  {
    id: 'smoked_meats',
    name: 'Smoked Meats',
    origin: 'The Forest Communities',
    type: 'Preserve',
    effect: null,
    price: 5,
    variants: [
      { name: 'Hickory Smoked Bacon', desc: 'Thick slabs of pork belly cured and smoked for weeks.', price: 5 },
      { name: 'Smoked Venison Sausage', desc: 'A dark, dense link of ground venison and juniper berries.', price: 6 },
      { name: 'Peat-Smoked Mutton', desc: 'Has an intense flavor from burning bog-peat. An acquired taste.', price: 4 },
      { name: 'Applewood Ham', desc: 'A sweet, delicate ham generally saved for minor holidays.', price: 8 },
      { name: 'Dragon-Rested Beef', desc: 'Beef jerky ostensibly dried in the ambient heat of a dragon\'s lair.', price: 12 },
      { name: 'Smoked Boar Jowls', desc: 'Highly fatty, meltingly tender cut favored in dwarven stews.', price: 7 },
      { name: 'Pine-Cured Bear Meat', desc: 'Incredibly tough, tastes strongly of pine resin and pure musk.', price: 5 },
      { name: 'Smoked Giant-Turkey Leg', desc: 'A gigantic piece of poultry that takes hours to gnaw through.', price: 8 },
      { name: 'Cherrywood Smoked Duck', desc: 'Rich, red, and greasy with a sweet wood finish.', price: 9 },
      { name: 'Campfire-Charred Jerky', desc: 'Cheap cuts of meat smoked over a dirty fire until rock hard.', price: 2 }
    ]
  },
  {
    id: 'jellies_and_jams',
    name: 'Jellies and Jams',
    origin: 'Universal',
    type: 'Preserve',
    effect: null,
    price: 3,
    variants: [
      { name: 'Strawberry Preserves', desc: 'A classic, thick, intensely sweet jam packed in a wax-sealed jar.', price: 3 },
      { name: 'Bitter Orange Marmalade', desc: 'A grown-up preserve with chunks of rind and a sharp, tangy bite.', price: 4 },
      { name: 'Spiced Fig Jam', desc: 'A dark, seedy paste perfect for spreading onto sharp cheeses.', price: 5 },
      { name: 'Fey-Berry Jelly', desc: 'A luminescent blue jelly that tastes different to every person who tries it.', price: 15 },
      { name: 'Quince Cheese', desc: 'A dense, sliceable fruit paste often served alongside roast meats.', price: 6 },
      { name: 'Rose Petal Jam', desc: 'A delicate, perfumed jelly highly sought after by the aristocracy.', price: 10 },
      { name: 'Spicy Pepper Jelly', desc: 'Sweet heat that pairs incredibly well with goat cheese.', price: 4 },
      { name: 'Blackberry Preserve', desc: 'Filled with tiny seeds and a tart, dark flavor.', price: 3 },
      { name: 'Golden-Apple Butter', desc: 'Slow-cooked apple mush infused with cinnamon and magic.', price: 5 },
      { name: 'Grave-Berry Jam', desc: 'Made from berries that grow in cemeteries. Tastes like dust and sugar.', price: 8 }
    ]
  },
  {
    id: 'salted_fish',
    name: 'Salted Fish',
    origin: 'The Coastal Cities',
    type: 'Preserve',
    effect: 'Causes severe thirst requiring double water rations.',
    price: 2,
    variants: [
      { name: 'Salted Herring', desc: 'A silver fish entombed in coarse salt. Requires soaking before eating.', price: 1 },
      { name: 'Dried Kelp and Anchovies', desc: 'Tiny, pungent fish mixed with dried seaweed.', price: 2 },
      { name: 'Smoked Salmon Side', desc: 'A luxurious slab of pink flesh, cold-smoked to perfection. Expensive.', price: 10 },
      { name: 'Pickled Rollmops', desc: 'Herring fillets rolled around an onion slice and staked in vinegar.', price: 3 },
      { name: 'Fermented Shark Meat', desc: 'Smells of pure ammonia. Buried in sand for months to remove toxins. Horrific.', price: 8 },
      { name: 'Dried Squid Strips', desc: 'Tough as leather and requires ten minutes of chewing per bite.', price: 4 },
      { name: 'Salt-Cod Brick', desc: 'So hard it can be used as building material until boiled.', price: 3 },
      { name: 'Eel Jerky', desc: 'Slender, oily strips of dried river eel.', price: 4 },
      { name: 'Sun-Dried Blowfish', desc: 'If not dried correctly, highly poisonous. A gamble.', price: 6 },
      { name: 'Barnacle Paste', desc: 'A salty, gritty paste made from scraped ship hulls. Extremely cheap.', price: 1 }
    ]
  },
  {
    id: 'honey_pots',
    name: 'Apiary Harvest',
    origin: 'The Pastoral Heartlands',
    type: 'Preserve',
    effect: 'Heals 1 HP if applied directly to a wound before bandaging.',
    price: 5,
    variants: [
      { name: 'Clover Honey Jar', desc: 'Light, clear, and perfectly sweet.', price: 5 },
      { name: 'Dark Wildflower Honey', desc: 'Thick, amber, and complex.', price: 6 },
      { name: 'Spun Comb-Honey', desc: 'Sold still on the wax comb. A wonderful chew.', price: 8 },
      { name: 'Fey-Touched Nectar', desc: 'Glows faintly. Makes everything taste like a happy childhood memory.', price: 50 },
      { name: 'Pine-Resin Honey', desc: 'Harvested from bees living in ancient forests. Tastes like sap.', price: 7 },
      { name: 'Midnight Honey', desc: 'Produced by rare obsidian bees that fly only on moonless nights.', price: 30 },
      { name: 'Spiced Mead-Honey', desc: 'Honey left over from mead production, retaining a high alcohol content.', price: 10 },
      { name: 'Giant-Bee Honey', desc: 'Comes in a bucket. One spoonful is enough to feed a man for a day.', price: 15 },
      { name: 'Cave-Worm Honey', desc: 'Not actually made by bees. Pale, slightly slimey, but sickeningly sweet.', price: 12 },
      { name: 'Healing-Herb Honey', desc: 'Bees kept exclusively near medicinal gardens. Tastes medicinal and bitter.', price: 20 }
    ]
  },
  {
    id: 'baked_pastries',
    name: 'Baked Pastries',
    origin: 'The Capital City',
    type: 'Confectionery',
    effect: null,
    price: 3,
    variants: [
      { name: 'Fruit Tart', desc: 'A delicate shortcrust shell filled with custard and topped with glazed fruit.', price: 5 },
      { name: 'Cinnamon Roll', desc: 'A spiral of sweet dough dripping with icing. Messy and magnificent.', price: 3 },
      { name: 'Bear Claw', desc: 'An almond-filled pastry shaped roughly like a monster footprint.', price: 4 },
      { name: 'Cream Horn', desc: 'A flaky pastry cone piped full of sweetened whipped cream.', price: 3 },
      { name: 'Elven Leaf-Cake', desc: 'A miraculously airy, bright green sponge cake tasting of mint and vanilla.', price: 8 },
      { name: 'Chocolate Eclair', desc: 'Choux pastry filled with cream and topped in dark chocolate.', price: 6 },
      { name: 'Dwarven Rockbuns', desc: 'Filled with currants and genuinely hard enough to break a window.', price: 2 },
      { name: 'Jam-Filled Doughnut', desc: 'A sphere of fried dough bursting with dangerously hot strawberry jam.', price: 3 },
      { name: 'Braided Sweet-Bread', desc: 'A massive loaf of soft bread studded with pearl sugar.', price: 4 },
      { name: 'Treachery Tart', desc: 'Looks like apple, tastes like sour lemon. A baker\'s cruel joke.', price: 5 }
    ]
  },
  {
    id: 'chocolates_and_candies',
    name: 'Sugared Confections',
    origin: 'The Merchant Guilds',
    type: 'Confectionery',
    effect: null,
    price: 4,
    variants: [
      { name: 'Dark Chocolate Truffle', desc: 'A bitter, rich sphere dusted in cocoa powder. A noble gift.', price: 8 },
      { name: 'Honeycomb Candy', desc: 'Light, crunchy sugar structured like a bee\'s honeycomb.', price: 4 },
      { name: 'Salted Caramels', desc: 'Chewy squares of cooked sugar sprinkled with sea salt.', price: 5 },
      { name: 'Boiled Sweets', desc: 'Hard fruit candies sold in glass jars. A favorite of children.', price: 1 },
      { name: 'Rock Sugar Crystals', desc: 'Crystallized sugar grown on a string. Looks like a gemstone.', price: 2 },
      { name: 'Crystallized Ginger', desc: 'Spicy root encased in sweet sugar. Cures nausea immediately.', price: 6 },
      { name: 'Marzipan Pig', desc: 'Almond paste shaped and painted to look like livestock.', price: 7 },
      { name: 'Peppermint Bark', desc: 'Sheets of white chocolate covered in crushed peppermints.', price: 5 },
      { name: 'Dragon-Blood Drops', desc: 'Spicy cinnamon hard candies that turn your tongue red.', price: 2 },
      { name: 'Licorice Whips', desc: 'Black, bitter, and elastic. Used to punish bad children.', price: 1 }
    ]
  },
  {
    id: 'spiced_cakes',
    name: 'Spiced Cakes',
    origin: 'Universal',
    type: 'Confectionery',
    effect: null,
    price: 4,
    variants: [
      { name: 'Gingerbread Man', desc: 'A classic, slightly snappy cookie shaped like a startled human.', price: 2 },
      { name: 'Honey Cake', desc: 'A dense, sticky cake traditionally served at weddings.', price: 5 },
      { name: 'Plum Pudding', desc: 'A massive, dark pudding that sits like a cannonball in the stomach.', price: 6 },
      { name: 'Dwarven Rock-Cake', desc: 'Actually intended to be eaten, but you wouldn\'t know by knocking on it.', price: 3 },
      { name: 'Lemon Drizzle Sponge', desc: 'A zesty, light cake favored by aristocratic ladies at afternoon tea.', price: 7 },
      { name: 'Carrot and Nut Loaf', desc: 'Moist, healthy, and completely slathered in cream cheese frosting.', price: 5 },
      { name: 'Black Forest Gateau', desc: 'Chocolate layered with imported cherries and whipped cream.', price: 12 },
      { name: 'Cardamom Pound Cake', desc: 'Extremely dense, buttery cake spiced heavily with cardamom.', price: 6 },
      { name: 'Toasted Coconut Macaroon', desc: 'A chewy, sticky pyramid of shredded coconut and egg white.', price: 3 },
      { name: 'Fairy-Sponge', desc: 'So light it has to be tied down to the plate with spun sugar.', price: 10 }
    ]
  },
  {
    id: 'candied_fruits',
    name: 'Candied Fruits',
    origin: 'The Southern Orchards',
    type: 'Confectionery',
    effect: null,
    price: 3,
    variants: [
      { name: 'Candied Orange Peel', desc: 'Bitter-sweet strips of citrus submerged in syrup, dried, and coated in sugar.', price: 3 },
      { name: 'Sugar-Plum', desc: 'A whole plum boiled in sugar syrup until completely preserved.', price: 4 },
      { name: 'Glace Cherries', desc: 'Sticky, bright red, and cloyingly sweet.', price: 5 },
      { name: 'Candied Apple', desc: 'A tart apple on a stick encased in a hard shell of red caramel.', price: 2 },
      { name: 'Caramel-Dipped Pear', desc: 'A whole fruit submerged in thick, chewy toffee.', price: 3 },
      { name: 'Frost-Berries', desc: 'Tiny wild berries dusted in fine white sugar to look like snow.', price: 4 },
      { name: 'Candied Pineapple Ring', desc: 'Imported from across the sea, extremely exotic and expensive.', price: 12 },
      { name: 'Syrup-Soaked Figs', desc: 'Overripe figs bursting with a sugary, boozy syrup.', price: 6 },
      { name: 'Sugar-Crusted Kumquat', desc: 'Eaten whole. A massive explosion of sour citrus inside a sweet shell.', price: 5 },
      { name: 'Chocolate-Dipped Strawberries', desc: 'A romantic, highly perishible gift.', price: 8 }
    ]
  },
  {
    id: 'frozen_sweets',
    name: 'Frozen Sweets',
    origin: 'The Northern Capitals',
    type: 'Confectionery',
    effect: 'Reduces heat exhaustion completely for 1 hour.',
    price: 6,
    variants: [
      { name: 'Vanilla Ice-Cream', desc: 'A bowl of sweet frozen cream flavored with a rare jungle bean.', price: 6 },
      { name: 'Strawberry Sorbet', desc: 'Crushed fruit and ice. Very refreshing in high summer.', price: 5 },
      { name: 'Shaved Ice with Syrup', desc: 'A cheap festival treat. Literal ice scraped off a block and flavored.', price: 2 },
      { name: 'Chocolate Gelato', desc: 'Dense, rich, and incredibly decadent frozen chocolate.', price: 8 },
      { name: 'Mint-Chip Frost', desc: 'Aggressively minty green ice cream with shards of dark chocolate.', price: 6 },
      { name: 'Frozen Honeycomb', desc: 'Chunks of actual honeycomb suspended in a vanilla base.', price: 7 },
      { name: 'Lemon Ice', desc: 'Pure tartness capable of freezing the brain if eaten too fast.', price: 4 },
      { name: 'Alchemical Dippin-Dots', desc: 'Tiny spheres of ice cream created by dropping cream into liquid nitrogen.', price: 15 },
      { name: 'Neapolitan Block', desc: 'Strawberry, vanilla, and chocolate arranged in a strict grid.', price: 8 },
      { name: 'Tavern-Ale Ice Cream', desc: 'Tastes like frozen beer. Popular only with very specific dwarves.', price: 5 }
    ]
  },
  {
    id: 'foraged_fungi',
    name: 'Foraged Camp-Meal',
    origin: 'The Wilderness',
    type: 'Campfire',
    effect: 'Outdoorsmen only: Restores morale when far from civilization.',
    price: 0,
    variants: [
      { name: 'Toasted Puffballs', desc: 'Large white mushrooms stabbed on a stick and toasted over open flames.', price: 1 },
      { name: 'Wild Onion Char', desc: 'An unseasoned bundle of wild allium roasted until black.', price: 1 },
      { name: 'Pine-Nut Mush', desc: 'Smashed nuts boiled in a tin cup into a thick, fatty porridge.', price: 2 },
      { name: 'Roasted Grubs', desc: 'Protein is protein. They pop when they get hot enough. Don\'t think about it.', price: 0 },
      { name: 'Dandelion Salad', desc: 'Bitter weeds dressed with nothing but desperation and a pinch of salt.', price: 0 },
      { name: 'Baked Acorns', desc: 'Boiled to remove the tannins, then baked in embers until edible.', price: 1 },
      { name: 'Fried Moss', desc: 'Crispy, swampy, and utterly devoid of nutritional value.', price: 0 },
      { name: 'Cattail Root', desc: 'Dug from mud and roasted. Tastes a bit like a soggy potato.', price: 1 },
      { name: 'Stinging Nettle Soup', desc: 'Boiled until the sting goes away. Tastes like green water.', price: 1 },
      { name: 'Roasted Pinecones', desc: 'You gnaw on the scales to get the tiny seeds hidden inside.', price: 0 }
    ]
  },
  {
    id: 'trail_catch',
    name: 'Fresh Trail Catch',
    origin: 'The Wilderness',
    type: 'Campfire',
    effect: null,
    price: 0,
    variants: [
      { name: 'Charcoal-Baked Fish', desc: 'A trout wrapped in leaves and buried in hot coals until steamed.', price: 2 },
      { name: 'Spit-Roast Squirrel', desc: 'Stringy, tough, and mostly bone, but hot meat beats hardtack.', price: 1 },
      { name: 'Mud-Sealed Bird', desc: 'A wild pigeon encased in mud and fired. Feathers come off with the clay.', price: 3 },
      { name: 'Hunter\'s Venison Steak', desc: 'A rough-cut flank of deer, cooked incredibly rare on a flat hot stone.', price: 5 },
      { name: 'Snake on a Stick', desc: 'Tastes like very angry chicken. Watch out for the fangs.', price: 2 },
      { name: 'Boiled Turtle Soup', desc: 'Cooked directly inside the upturned shell over a low fire.', price: 4 },
      { name: 'Frog Legs', desc: 'Pan-fried in whatever lard the party has left. Tastes like swamp-chicken.', price: 2 },
      { name: 'Roasted Possum', desc: 'Greasy and unappealing, but highly caloric.', price: 2 },
      { name: 'Eel on a Skewer', desc: 'Caught in a stream and charred until the skin blisters.', price: 3 },
      { name: 'Wild Turkey Breast', desc: 'A magnificent wild catch, usually shared with the entire party.', price: 6 }
    ]
  },
  {
    id: 'camp_stews',
    name: 'Cast-Iron Stews',
    origin: 'The Wilderness',
    type: 'Campfire',
    effect: 'Removes the fatigue of travel when eaten hot.',
    price: 1,
    variants: [
      { name: 'Everything Stew', desc: 'Whatever everyone was willing to throw into the common pot.', price: 2 },
      { name: 'Bean and Bacon Boildown', desc: 'A thick sludge of dried beans and the last of the salted pork.', price: 3 },
      { name: 'Bone-Broth Soup', desc: 'Bones boiled for 12 hours until the marrow dissolves. Extremely nourishing.', price: 2 },
      { name: 'Foraged Root Medley', desc: 'Turnips, potatoes, and wild carrots cooked until entirely mush.', price: 1 },
      { name: 'Spicy Lentil Pot', desc: 'A staple of traveling merchants. Cheap, filling, and highly seasoned.', price: 2 },
      { name: 'Rabbit and Dumpling', desc: 'A masterpiece of camp cooking if you have flour on hand.', price: 5 },
      { name: 'Camp-Coffee Chili', desc: 'Beans, minced jerky, and leftover coffee boiled into a thick chili.', price: 4 },
      { name: 'Stone Soup', desc: 'Literally water boiled with a clean stone for minerals, plus whatever scraps you have.', price: 0 },
      { name: 'River-Mud Chowder', desc: 'A murky stew involving crawdads, river-grass, and extreme hunger.', price: 1 },
      { name: 'Hardtack Gruel', desc: 'The terrible result of boiling rations until they become a liquid.', price: 1 }
    ]
  },
  {
    id: 'trail_breads',
    name: 'Campfire Breads',
    origin: 'The Wilderness',
    type: 'Campfire',
    effect: null,
    price: 1,
    variants: [
      { name: 'Ash-Cake', desc: 'Cornmeal dough thrown directly into the white ashes of the fire until cooked.', price: 1 },
      { name: 'Stick-Twist Bread', desc: 'Dough coiled around a clean stick and held over the flames like a marshmallow.', price: 1 },
      { name: 'Flat-Stone Bannock', desc: 'Unleavened bread cooked on a flat, superheated river rock.', price: 2 },
      { name: 'Fried Dough Bait', desc: 'A ball of dough dropped into a pan of leftover bacon grease.', price: 2 },
      { name: 'Traveler\'s Pancake', desc: 'A thick, dense cake made from oat and water, usually burned.', price: 1 },
      { name: 'Acorn-Flour Biscuit', desc: 'Dark, mealy, and slightly bitter. Tastes intensely of the forest.', price: 2 },
      { name: 'Honey-Glazed Damper', desc: 'Australian-style bush bread slathered with wild honey.', price: 3 },
      { name: 'Frying-Pan Scone', desc: 'A fluffy miracle achieved only by rangers with maxed out cooking skills.', price: 4 },
      { name: 'Cheese-Stuffed Char', desc: 'Bread dough wrapped around a cheese rind and burnt deliberately.', price: 3 },
      { name: 'Soot-Loaf', desc: 'You dropped it in the fire. You\'re eating it anyway.', price: 0 }
    ]
  },
  {
    id: 'wild_teas',
    name: 'Wild Foraged Teas',
    origin: 'The Wilderness',
    type: 'Campfire',
    effect: 'Warm and comforting, prevents the onset of fever.',
    price: 0,
    variants: [
      { name: 'Pine-Needle Brew', desc: 'High in vitamin C, tastes like drinking a Christmas tree.', price: 1 },
      { name: 'Birch Bark Tea', desc: 'A subtle, sweet, and pale tea made from shaved bark.', price: 1 },
      { name: 'Dandelion Root Coffee', desc: 'Roasted roots mashed to simulate the dark bitterness of coffee.', price: 2 },
      { name: 'Mint and Nettle', desc: 'A sharp, refreshing tea that clears the sinuses heavily.', price: 1 },
      { name: 'Mud-Water', desc: 'Just hot water. Drunk mostly for the heat when there are no herbs.', price: 0 },
      { name: 'Rosehip Elixir', desc: 'Red, tart, and highly medicinal. Brewed from wild thorny bushes.', price: 2 },
      { name: 'Chaga Mushroom Brew', desc: 'Pitch black, earthy, and incredibly good for the immune system.', price: 3 },
      { name: 'Fennel-Seed Soother', desc: 'Made from wild fennel. Tastes of licorice and settles the stomach.', price: 1 },
      { name: 'Elderberry Tea', desc: 'A dark purple, fruity tea guaranteed to stain your wooden cup.', price: 2 },
      { name: 'Bog-Water Brew', desc: 'Made with questionable swamp water and desperately boiled for hours.', price: 0 }
    ]
  },
  {
    id: 'dragon_steaks',
    name: 'Dragon-Type Meats',
    origin: 'The High Peaks',
    type: 'Monster Fare',
    effect: 'Grants temporary resistance to the element associated with the monster for 24 hours.',
    price: 250,
    variants: [
      { name: 'Red Dragon Flank', desc: 'Sizzles on the plate without a fire. Extremely spicy and tough as leather.', price: 300 },
      { name: 'White Dragon Jerky', desc: 'So cold it gives the eater frostbite on the lips. Intensely minty.', price: 250 },
      { name: 'Black Dragon Acid-Tender', desc: 'Has a sour, burning tang like extreme citrus. Must be eaten immediately.', price: 280 },
      { name: 'Blue Dragon Brisket', desc: 'Slightly electrified. Shocks the tongue with every bite.', price: 300 },
      { name: 'Green Dragon Poison-Cut', desc: 'Requires a master alchemist to render edible. Tastes of dark woods and anise.', price: 320 },
      { name: 'Wyvern Wing-Meat', desc: 'Very stringy, tastes a bit like bat and a bit like chicken.', price: 80 },
      { name: 'Drake-Tail Steak', desc: 'Chewy and heavily ribbed with cartilage, but highly nutritious.', price: 100 },
      { name: 'Pseudodragon Snack', desc: 'It is highly illegal in most cities to eat these tiny dragons.', price: 50 },
      { name: 'Turtle-Dragon Soup', desc: 'A legendary dish that requires fifty men to kill the main ingredient.', price: 500 },
      { name: 'Dragonborn Tail', desc: 'Technically cannibalism in some jurisdictions.', price: 100 }
    ]
  },
  {
    id: 'abyssal_seafood',
    name: 'Deep Trench Cuts',
    origin: 'The Abyssal Depths',
    type: 'Monster Fare',
    effect: 'Grants nightsight for 12 hours, but eyes turn pitch black.',
    price: 150,
    variants: [
      { name: 'Kraken Tentacle Medallion', desc: 'Chewy, briny, and requires a serrated steak knife to cut.', price: 200 },
      { name: 'Aboleth Slime-Jelly', desc: 'Violently psychic. You remember the creature\'s childhood as you eat it.', price: 400 },
      { name: 'Benthic Angler Fillet', desc: 'The meat glows in the dark and tastes of pure ozone.', price: 150 },
      { name: 'Sahuagin Fin-Soup', desc: 'A controversial dish made from aggressive fish-men.', price: 80 },
      { name: 'Giant Squid Rings', desc: 'Fried calamari where each ring is the size of a wagon wheel.', price: 120 },
      { name: 'Leviathan Blubber Chunk', desc: 'So fatty and dense a single pound can feed a family for a month.', price: 100 },
      { name: 'Kuo-Toa Eye', desc: 'Eaten raw. Pops in the mouth and tastes incredibly salty.', price: 50 },
      { name: 'Deep-Worm Steak', desc: 'Tubular, pink meat from hydrothermal vents. Tastes sulfuric.', price: 90 },
      { name: 'Coral-Golem Dust', desc: 'Not actually meat, but used as a violently spicy marine seasoning.', price: 70 },
      { name: 'Abyssal Crab Claw', desc: 'Requires a blacksmith\'s hammer to open the shell.', price: 250 }
    ]
  },
  {
    id: 'feywild_game',
    name: 'Feywild Game',
    origin: 'The Sylvan Concord',
    type: 'Monster Fare',
    effect: 'Cures all non-magical diseases and makes the eater immune to aging for a week.',
    price: 80,
    variants: [
      { name: 'Moon-Stag Venison', desc: 'The meat is silver and tastes of dew and sorrow.', price: 100 },
      { name: 'Blink-Dog Stew', desc: 'Very hard to cook, as the meat occasionally teleport out of the pot.', price: 60 },
      { name: 'Displacer Beast Flank', desc: 'The steak appears to be three inches to the left of where it actually is.', price: 120 },
      { name: 'Owlbear Breast', desc: 'Tastes like intensely dark meat turkey, smells like bear.', price: 80 },
      { name: 'Unicorn Haunch', desc: 'A vile, cursed meal. Eating it dooms the soul, but it is delicious.', price: 1000 },
      { name: 'Fairy-Wing Crisp', desc: 'A terrifying dark-market snack. Sugared and fried pixie wings.', price: 300 },
      { name: 'Satyr Leg-Shank', desc: 'Technically humanoid meat. Tastes intensely of wine and grapes.', price: 50 },
      { name: 'Centaur Sirloin', desc: 'Highly taboo. Tastes exactly like horse, but feels morally wrong.', price: 40 },
      { name: 'Treant-Bark Salad', desc: 'Living wood that bleeds sap when you chew it.', price: 60 },
      { name: 'Sprite-Infused Wine', desc: 'A bottle of wine with an actual drowned sprite at the bottom.', price: 200 }
    ]
  },
  {
    id: 'cavernous_crawlers',
    name: 'Underdark Bugs & Slimes',
    origin: 'The Deep Caverns',
    type: 'Monster Fare',
    effect: 'Grants poison resistance for 8 hours but causes mild nausea.',
    price: 40,
    variants: [
      { name: 'Gelatinous Cube Jiggly', desc: 'Tastes faintly of acid and the dissolved armor of previous adventurers.', price: 40 },
      { name: 'Purple Worm Steak', desc: 'Tough, rubbery, and smells like ozone and crushed rock.', price: 80 },
      { name: 'Carrion Crawler Tentacle', desc: 'Paralyzes the tongue entirely for an hour after eating.', price: 50 },
      { name: 'Rust Monster Carapace', desc: 'Eaten like crab shell, but tastes of oxidized iron.', price: 30 },
      { name: 'Umber Hulk Claw-Meat', desc: 'Earthy, extremely dense meat that causes minor confusion when eaten.', price: 100 },
      { name: 'Hook Horror Leg', desc: 'Extremely tough, requires boiling for two days before serving.', price: 60 },
      { name: 'Fungal-Zombie Spore', desc: 'A highly dangerous delicacy that requires careful cooking to neutralize.', price: 25 },
      { name: 'Roper Tentacle Jerky', desc: 'Looks and tastes exactly like a stalactite. Will break teeth.', price: 45 },
      { name: 'Ochre Jelly Jam', desc: 'Acidic, sweet, and dissolves the spoon while you eat it.', price: 35 },
      { name: 'Cave-Fisher Webbing', desc: 'Spun into a sticky, sugary candy that is incredibly flammable.', price: 20 }
    ]
  },
  {
    id: 'elemental_essences',
    name: 'Elemental Consumables',
    origin: 'The Inner Planes',
    type: 'Monster Fare',
    effect: 'Changes the eater\'s eye color to match the element for a day.',
    price: 120,
    variants: [
      { name: 'Fire Elemental Cinders', desc: 'Must be swallowed instantly. Burns going down, but keeps you warm in blizzards.', price: 100 },
      { name: 'Water Elemental Ice-Chip', desc: 'Never melts. Dissolves on the tongue and cures all thirst instantly.', price: 80 },
      { name: 'Earth Elemental Core', desc: 'Looks like a geode. Tastes like rock-candy mixed with literal dirt.', price: 120 },
      { name: 'Air Elemental Whisper', desc: 'An empty-looking jar. You inhale it, and feel incredibly light-headed.', price: 90 },
      { name: 'Mephit-Wing Skewer', desc: 'Tiny, crunchy elemental bat wings dusted in sulfur.', price: 40 },
      { name: 'Magmin Coal', desc: 'Eaten like a hot ember. Requires immense fortitude to avoid vomiting lava.', price: 60 },
      { name: 'Salamander Tail-Steak', desc: 'Constantly emits smoke. Extremely spicy and tastes of ash.', price: 150 },
      { name: 'Ice-Toad Froze-Legs', desc: 'Cold enough to stick to your tongue if you aren\'t careful.', price: 50 },
      { name: 'Gargoyle Stone-Dust', desc: 'Mixed into water to create a heavy, mineral-rich protein shake.', price: 30 },
      { name: 'Elemental Chaos Soup', desc: 'Changes flavor, temperature, and state of matter while you eat it.', price: 200 }
    ]
  },
  {
    id: 'potion_candies',
    name: 'Alchemical Lozenges',
    origin: 'The College of Magi',
    type: 'Alchemical',
    effect: 'Provides minor magical boons equivalent to a petty spell.',
    price: 35,
    variants: [
      { name: 'Healing Drop', desc: 'A red, cherry-flavored hard candy that heals 1 hit point.', price: 20 },
      { name: 'Feather-Step Mints', desc: 'Makes your footsteps completely silent for five minutes.', price: 35 },
      { name: 'Dragon-Breath Cinnamon', desc: 'Allows you to breath a tiny, 5-foot cone of fire once.', price: 50 },
      { name: 'Water-Breathing Gummy', desc: 'A blue fish-shaped candy. Grants water-breathing for one minute.', price: 40 },
      { name: 'Night-Vision Licorice', desc: 'Turns the tongue black and grants nightsight for ten minutes.', price: 30 },
      { name: 'Voice-Box Caramel', desc: 'Temporarily deepens the voice to a booming baritone.', price: 15 },
      { name: 'Truth-Serum Sour', desc: 'So sour it forces the eater to admit one embarrassing secret instantly.', price: 25 },
      { name: 'Love-Potion Peppermint', desc: 'Makes you infatuated with the first person you see for exactly one minute.', price: 50 },
      { name: 'Luck-Drop', desc: 'A golden candy that grants a +1 to your next ability check.', price: 60 },
      { name: 'Haste-Sugar Crystal', desc: 'Pure arcane caffeine. Doubles movement speed for one round, then crash.', price: 45 }
    ]
  },
  {
    id: 'transmuted_fare',
    name: 'Transmuted Meals',
    origin: 'The Mage Quarters',
    type: 'Alchemical',
    effect: 'Provides sustenance, but looks completely bizarre.',
    price: 20,
    variants: [
      { name: 'Lead-to-Gold Brisket', desc: 'Technically beef, but it is extremely metallic and heavy.', price: 25 },
      { name: 'Wood-to-Bread Loaf', desc: 'Tastes of pine needles and splinters, but digests like flour.', price: 10 },
      { name: 'Water-to-Wine Cask', desc: 'Cheap, magical trick. The wine tastes watered down.', price: 15 },
      { name: 'Stone-to-Cheese Wedge', desc: 'A masonry brick turned into sharp cheddar. Heavy.', price: 20 },
      { name: 'Glass-to-Sugar Pane', desc: 'A church window transmuted into stained-glass candy.', price: 30 },
      { name: 'Air-to-Meringue', desc: 'Clouds solidified into a sweet, airy dessert.', price: 40 },
      { name: 'Iron-to-Apple', desc: 'An apple that rusts if you leave it out too long.', price: 12 },
      { name: 'Dirt-to-Chocolate', desc: 'Wizard prank candy. Sometimes it turns back in your stomach.', price: 5 },
      { name: 'Bone-to-Toffee', desc: 'Necromancers make the best candy. It\'s very crunchy.', price: 25 },
      { name: 'Blood-to-Berry Sorbet', desc: 'Vampire dessert. You don\'t want to know where it came from.', price: 50 }
    ]
  },
  {
    id: 'clockwork_edibles',
    name: 'Gnomish Automata Cuisine',
    origin: 'The Mechanus Syndicate',
    type: 'Alchemical',
    effect: 'Occasionally causes internal clicking sounds for hours.',
    price: 40,
    variants: [
      { name: 'Gear-Shaped Pastry', desc: 'A dense tart shaped like a cog. Contains high-calorie engine grease.', price: 20 },
      { name: 'Copper-Wire Spaghetti', desc: 'Edible copper strands boiled in a synthetic tomato sauce.', price: 25 },
      { name: 'Steam-Powered Soup', desc: 'Boils itself using a miniature thermal core at the bottom of the bowl.', price: 50 },
      { name: 'Clockwork Apple', desc: 'Winds up and walks into your mouth. Tastes like brass and cider.', price: 60 },
      { name: 'Oil-Can Stout', desc: 'A thick, black liquid that lubricates joints and removes arthritis for a day.', price: 35 },
      { name: 'Spring-Loaded Sausage', desc: 'Violently uncoils when bitten. Very dangerous to eat quickly.', price: 15 },
      { name: 'Nut-and-Bolt Trail Mix', desc: 'Actual iron hardware transmuted to be chewable.', price: 10 },
      { name: 'Whistling-Kettle Tea', desc: 'The cup itself screams when it reaches the perfect temperature.', price: 20 },
      { name: 'Spark-Plug Pepper', desc: 'Delivers a mild electric shock to the tongue.', price: 30 },
      { name: 'Automaton Rations', desc: 'Fuel bricks meant for golems, highly toxic to humans unless boiled.', price: 40 }
    ]
  },
  {
    id: 'liquid_meals',
    name: 'Nutrient Solutions',
    origin: 'The Alchemist Guilds',
    type: 'Alchemical',
    effect: 'Provides exactly the daily required nutrients, nullifying hunger instantly.',
    price: 50,
    variants: [
      { name: 'Gourmet-Flask: Roast Beef', desc: 'A brown, viscous liquid that tastes exactly like a full Sunday roast.', price: 50 },
      { name: 'Gourmet-Flask: Apple Pie', desc: 'A yellow syrup that evokes memories of grandmother\'s baking.', price: 50 },
      { name: 'Vial of Pure Calories', desc: 'A clear liquid. One drop is 2000 calories. Do not drink the whole vial.', price: 100 },
      { name: 'Sludge of Sustenance', desc: 'Grey, tasteless, and perfectly balanced macros. Deeply depressing.', price: 20 },
      { name: 'Hydration-Plus Ampoule', desc: 'A shot of liquid that completely quenches thirst for 48 hours.', price: 40 },
      { name: 'Adrenaline-Broth', desc: 'Removes the need for sleep for one day, but causes severe shaking.', price: 60 },
      { name: 'Liquid-Bread', desc: 'Literally dough in liquid form. Fills the stomach and expands.', price: 15 },
      { name: 'Iron-Blood Tonic', desc: 'Tastes like sucking on a coin. Rapidly replaces lost blood.', price: 35 },
      { name: 'Vitamin-Shock Syrup', desc: 'Neon yellow liquid that makes your hair grow an inch in a day.', price: 45 },
      { name: 'Stomach-Plugging Elixir', desc: 'Coats the inside of the stomach, removing the sensation of hunger for a week.', price: 80 }
    ]
  },
  {
    id: 'cursed_consumables',
    name: 'Warlock\'s Wares',
    origin: 'The Shadow Markets',
    type: 'Alchemical',
    effect: 'Provides a powerful boon, but comes with a bizarre drawback.',
    price: 100,
    variants: [
      { name: 'Soul-Crust Bread', desc: 'Tastes like triumph. The eater cannot cast a shadow for a week.', price: 100 },
      { name: 'Devil-Fruit', desc: 'Grants fire resistance, but horns grow from your forehead for 24 hours.', price: 150 },
      { name: 'Void-Black Apple', desc: 'Restores all spent mana, but you become completely blind for an hour.', price: 500 },
      { name: 'Banshee-Tears Wine', desc: 'Heals all wounds, but you weep uncontrollably for the rest of the day.', price: 200 },
      { name: 'Zombie-Flesh Jerky', desc: 'Grants temporary vitality, but you smell like a corpse to dogs.', price: 50 },
      { name: 'Kraken\'s-Bargain Calamari', desc: 'You can breath underwater today, but you cannot breath air.', price: 250 },
      { name: 'Ghost-Pepper of the Damned', desc: 'You exhale a cloud of souls. You must save or become possessed.', price: 300 },
      { name: 'Vampire\'s-Kiss Strawberry', desc: 'Tastes incredible. You suffer mild radiant burns in sunlight tomorrow.', price: 80 },
      { name: 'Mind-Flayer Brain-Cereal', desc: 'Increases Intelligence by 2 for a day. You hear voices the whole time.', price: 400 },
      { name: 'Demon-Blood Sausage', desc: 'Grants immense strength, but your alignment shifts to Evil for one hour.', price: 600 }
    ]
  }
];
