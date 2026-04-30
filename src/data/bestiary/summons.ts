import type { VariantDef } from '../inventory/types';

/**
 * A summon variant with combat stats and elemental affinity.
 * Extends the shared VariantDef with summoned-entity mechanical data.
 */
export interface SummonVariantDef extends VariantDef {
    baseDamage: number;
    baseHP: number;
    element?: 'fire' | 'frost' | 'lightning' | 'necrotic' | 'radiant' | 'poison' | 'arcane' | 'shadow' | 'physical' | 'psychic';
}

export type SummonClass = 'ELEMENTAL' | 'UNDEAD' | 'CELESTIAL' | 'FIEND' | 'FEY' | 'ABERRATION' | 'BEAST' | 'CONSTRUCT' | 'DRACONIC' | 'MYTHIC' | 'HUMANOID' | 'DRAGON' | 'DEMON' | 'ANGEL' | 'MAGICAL';
export type SummonAvailability = 'ALL_ROLES' | 'ALL_RACES' | 'SPECIFIC_ROLE' | 'SPECIFIC_RACE';
export type SummonTier = 1 | 2 | 3 | 4 | 5 | 6;

/**
 * A conjured entity brought into existence through magical means.
 * Summons are temporary battlefield allies with a fixed duration and mana cost.
 * Each summon has ten named variants representing different manifestations.
 */
export interface SummonDef {
    id: string;
    name: string;
    variants: SummonVariantDef[];
    summonClass: SummonClass;
    availability: SummonAvailability;
    tier: SummonTier;
    icon: string;
    duration: string;
    manaCost: number;
    rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic';
    validRaces?: string[]; 
    validRoles?: string[]; 
}

/** Master list of all available summons, organized by tier and availability. */
export const SUMMONS: SummonDef[] = [
    // ==========================================
    // CATEGORY 1: ALL ROLES (Universal Utilities)
    // ==========================================
    {
        id: 'lesser_servants',
        name: 'Lesser Unseen Servants',
        variants: [
            { name: 'Unseen Porter', desc: 'An invisible mindless force that carries packs and opens doors.', baseDamage: 4, baseHP: 17, price: 20 },
            { name: 'Floating Disk', desc: 'A flat plane of magical force that follows the summoner.', baseDamage: 5, baseHP: 14, price: 15 },
            { name: 'Mending Sprite', desc: 'A tiny mote that automatically stitches torn clothing.', baseDamage: 5, baseHP: 15, price: 30 },
            { name: 'Campfire-Spark', desc: 'Instantly ignites dry wood and keeps it at an optimum temperature.', baseDamage: 5, baseHP: 16, price: 10 },
            { name: 'Grooming-Hand', desc: 'An animated comb/brush combo that keeps the party looking pristine.', baseDamage: 5, baseHP: 14, price: 5 },
            { name: 'Echo-Caller', desc: 'Throws the summoner\'s voice up to fifty feet away instantly.', baseDamage: 6, baseHP: 17, price: 25 },
            { name: 'Phantom Torch', desc: 'A detached flame that hovers just over the summoner\'s shoulder.', baseDamage: 6, baseHP: 13, price: 15 },
            { name: 'Lock-Tickler', desc: 'A tiny ethereal wire that attempts to blindly pick simple locks.', baseDamage: 6, baseHP: 15, price: 40 },
            { name: 'Scribe-Mote', desc: 'Automatically physically transcribes spoken words onto parchment.', baseDamage: 5, baseHP: 17, price: 35 },
            { name: 'Breeze-Fan', desc: 'An invisible servant dedicated purely to keeping the summoner cool.', baseDamage: 5, baseHP: 14, price: 10 }
        ],
        summonClass: 'CONSTRUCT',
        availability: 'ALL_ROLES',
        tier: 1,
        icon: 'GiFairyWand',
        duration: '1 Hour',
        manaCost: 10,
        rarity: 'Common'
    },
    {
        id: 'minor_wards',
        name: 'Minor Warding Spirits',
        variants: [
            { name: 'Alarm Eye', desc: 'An invisible eye that loudly pings when an enemy crosses its threshold.', baseDamage: 10, baseHP: 33, element: 'arcane', price: 50 },
            { name: 'Trip-Wire Spirit', desc: 'A spectral string that knocks the first person who crosses it prone.', baseDamage: 11, baseHP: 27, element: 'arcane', price: 40 },
            { name: 'Snare-Trap Phantom', desc: 'Hoists an unwary goblin into the air by their ankles.', baseDamage: 11, baseHP: 30, element: 'arcane', price: 60 },
            { name: 'Shield-Aura', desc: 'A floating ethereal buckler that attempts to block a single incoming arrow.', baseDamage: 12, baseHP: 32, element: 'arcane', price: 80 },
            { name: 'Barking-Hound Illusion', desc: 'Mimics the sound of a vicious guard dog perfectly to deter thieves.', baseDamage: 13, baseHP: 29, element: 'arcane', price: 35 },
            { name: 'Frost-Patch Spirit', desc: 'Freezes a tiny 5-foot square of stone to cause catastrophic slipping.', baseDamage: 13, baseHP: 35, element: 'arcane', price: 45 },
            { name: 'Caltrop-Storm', desc: 'Summons a temporary shower of illusory spikes that deal real psychic pain.', baseDamage: 14, baseHP: 26, element: 'arcane', price: 70 },
            { name: 'Smoke-Bomb Imp', desc: 'A minor fiend that screams and explodes into a 20-foot radius of thick smoke.', baseDamage: 14, baseHP: 30, element: 'arcane', price: 90 },
            { name: 'Grease-Slime', desc: 'Coats a doorway in impossibly slick, flammable magical grease.', baseDamage: 11, baseHP: 33, element: 'arcane', price: 65 },
            { name: 'Web-Spinner Mote', desc: 'Fills a small 10-foot corridor with sticky, annoying enchanted webs.', baseDamage: 13, baseHP: 27, element: 'arcane', price: 55 }
        ],
        summonClass: 'MAGICAL', // Mapped functionally, default to CONSTRUCT or ABERRATION if strict, but 'MAGICAL' isn't in SummonClass. Wait, 'ELEMENTAL' fits. Let's use ELEMENTAL
        availability: 'ALL_ROLES',
        tier: 2,
        icon: 'GiShield',
        duration: '8 Hours',
        manaCost: 30,
        rarity: 'Uncommon'
    },
    {
        id: 'guardian_spirits',
        name: 'Phantom Steeds & Guardians',
        variants: [
            { name: 'Phantom Steed', desc: 'A semi-real horse that gallops across mud and water effortlessly.', baseDamage: 21, baseHP: 66, price: 200 },
            { name: 'Guardian Shield-Mote', desc: 'A swirling mass of light that grants a passive +2 to Defense Rating.', baseDamage: 23, baseHP: 54, price: 250 },
            { name: 'Weapon-Catcher', desc: 'A floating pair of gauntlets that attempts to disarm attacking monks.', baseDamage: 24, baseHP: 60, price: 220 },
            { name: 'Healing-Spring Nymph', desc: 'A water spirit that conjures a pool of restorative, purifying water.', baseDamage: 25, baseHP: 63, price: 350 },
            { name: 'Spectral Hound', desc: 'Hunts down a specific target via scent, passing through solid walls.', baseDamage: 26, baseHP: 57, price: 180 },
            { name: 'Vanguard Spirit', desc: 'Takes the form of a heavily armored knight that absorbs the first hit of combat.', baseDamage: 28, baseHP: 69, price: 300 },
            { name: 'Wind-Wall Weaver', desc: 'An air elemental that deflects all non-magical projectiles in a 10-foot line.', baseDamage: 29, baseHP: 51, price: 280 },
            { name: 'Battering-Ram Force', desc: 'An invisible sledgehammer that shatters wooden doors instantly.', baseDamage: 30, baseHP: 60, price: 150 },
            { name: 'Levitation-Bubble', desc: 'Encases the summoner in a floating sphere of force to bypass acid pits.', baseDamage: 24, baseHP: 66, price: 260 },
            { name: 'Bridge-Builder Spider', desc: 'A giant spectral arachnid that spins a 50-foot temporary silk bridge.', baseDamage: 26, baseHP: 54, price: 240 }
        ],
        summonClass: 'CONSTRUCT',
        availability: 'ALL_ROLES',
        tier: 3,
        icon: 'GiGhost',
        duration: '1 Hour',
        manaCost: 80,
        rarity: 'Rare'
    },
    {
        id: 'elemental_mercenaries',
        name: 'Elemental Mercenaries',
        variants: [
            { name: 'Stone Golem Mercenary', desc: 'A blunt, humorless construct of earth that hits with shattering force.', baseDamage: 43, baseHP: 132, element: 'fire', price: 800 },
            { name: 'Fire-Myrmidon', desc: 'An armored fire elemental wielding a scimitar of pure living flame.', baseDamage: 45, baseHP: 108, element: 'frost', price: 900 },
            { name: 'Water-Weird', desc: 'A serpentine water entity that grapples and drowns enemies in its own body.', baseDamage: 48, baseHP: 120, element: 'lightning', price: 750 },
            { name: 'Air-Stalker', desc: 'An invisible assassin of the wind that suffocates sleeping targets.', baseDamage: 50, baseHP: 126, element: 'arcane', price: 1000 },
            { name: 'Magma-Brute', desc: 'A slow-moving siege breaker that melts portcullises upon physical contact.', baseDamage: 53, baseHP: 114, element: 'fire', price: 1200 },
            { name: 'Lightning-Lancer', desc: 'A humanoid spark that throws javelins of electrical energy from afar.', baseDamage: 55, baseHP: 138, element: 'frost', price: 950 },
            { name: 'Ice-Maiden', desc: 'A beautiful spirit of winter whose touch causes lethal frostbite.', baseDamage: 57, baseHP: 102, element: 'lightning', price: 850 },
            { name: 'Ash-Cloud Titan', desc: 'A massive swirling entity that blinds all enemies and chokes spellcasters.', baseDamage: 60, baseHP: 120, element: 'arcane', price: 1100 },
            { name: 'Crystal-Gargoyle', desc: 'Flies rapidly and drops massive, razor-sharp shards of crystal from the sky.', baseDamage: 48, baseHP: 132, element: 'fire', price: 1300 },
            { name: 'Mud-Slaugh', desc: 'A horrific blob that swallows enemies whole, encasing them in suffocating earth.', baseDamage: 53, baseHP: 108, element: 'frost', price: 800 }
        ],
        summonClass: 'ELEMENTAL',
        availability: 'ALL_ROLES',
        tier: 4,
        icon: 'GiGolemHead',
        duration: '10 Minutes',
        manaCost: 250,
        rarity: 'Epic'
    },
    {
        id: 'planar_allies',
        name: 'Planar Allies',
        variants: [
            { name: 'Astral Deva', desc: 'A breathtaking angel that wields a mace of disruption, banishing fiends.', baseDamage: 85, baseHP: 275, element: 'arcane', price: 5000 },
            { name: 'Efreeti Warlord', desc: 'A massive fire genie capable of granting limited wishes or immense destruction.', baseDamage: 90, baseHP: 225, element: 'radiant', price: 6000 },
            { name: 'Djinni Noble', desc: 'An air genie that summons twisters to throw entire platoons into the sky.', baseDamage: 95, baseHP: 250, element: 'arcane', price: 5500 },
            { name: 'Marut Inevitable', desc: 'A celestial machine that enforces cosmic contracts with perfect, unavoidable punches.', baseDamage: 100, baseHP: 263, element: 'shadow', price: 8000 },
            { name: 'Planetar', desc: 'A bald, green-skinned angel of vengeance that commands the weather itself.', baseDamage: 105, baseHP: 238, element: 'arcane', price: 9000 },
            { name: 'Elder Brain Projection', desc: 'A horrifying psychic manifestation that lobotomizes nearby enemies purely by existing.', baseDamage: 110, baseHP: 288, element: 'radiant', price: 7500 },
            { name: 'Leviathan Aspect', desc: 'A summoned tidal wave containing the physical manifestation of an ocean god.', baseDamage: 115, baseHP: 213, element: 'arcane', price: 10000 },
            { name: 'Pit Fiend Ambassador', desc: 'A terrifying negotiator of hell that immolates enemies casually while speaking.', baseDamage: 120, baseHP: 250, element: 'shadow', price: 8500 },
            { name: 'Solar Avatar', desc: 'A literal fragment of a sun god. Its presence incinerates vampires instantly.', baseDamage: 95, baseHP: 275, element: 'arcane', price: 15000 },
            { name: 'Primordial Titan', desc: 'A piece of the world\'s original crust, possessing absolute dominion over earthquakes.', baseDamage: 105, baseHP: 225, element: 'radiant', price: 12000 }
        ],
        summonClass: 'MYTHIC',
        availability: 'ALL_ROLES',
        tier: 5,
        icon: 'GiAngelWings',
        duration: '1 Minute',
        manaCost: 1000,
        rarity: 'Legendary'
    },
    {
        id: 'reality_breakers',
        name: 'Reality Breakers',
        variants: [
            { name: 'Concept of Annihilation', desc: 'The abstract idea of destruction given form; proximity erases matter.', baseDamage: 170, baseHP: 550, element: 'psychic' },
            { name: 'Living Paradox', desc: 'Simultaneously exists and does not exist; logic itself recoils from it.', baseDamage: 180, baseHP: 450, element: 'shadow' },
            { name: 'Entropy-Engine', desc: 'A grinding mass of collapsed dimensions that accelerates local heat-death.', baseDamage: 190, baseHP: 500, element: 'psychic' },
            { name: 'Memory-Devourer', desc: 'Erases the past of anything it touches; victims forget they ever existed.', baseDamage: 200, baseHP: 525, element: 'shadow' },
            { name: 'The Unnamed Geometry', desc: 'An impossible shape that fractures the minds of anyone who perceives it.', baseDamage: 210, baseHP: 475, element: 'psychic' },
            { name: 'Silence Made Flesh', desc: 'A humanoid void where sound cannot travel; screams die at its threshold.', baseDamage: 220, baseHP: 575, element: 'shadow' },
            { name: 'Gravity-Inversion Sphere', desc: 'Reverses local gravitational pull, hurling armies skyward helplessly.', baseDamage: 230, baseHP: 425, element: 'psychic' },
            { name: 'The Final Argument', desc: 'A philosophical construct that ends all conflict by erasing combatants.', baseDamage: 240, baseHP: 500, element: 'shadow' },
            { name: 'Fracture-Point Sentinel', desc: 'Stands at the weakest point in reality, preventing or causing planar collapse.', baseDamage: 190, baseHP: 550, element: 'psychic' },
            { name: 'The Absolute Zero', desc: 'Cessation of all molecular motion in a colossal radius; nothing survives.', baseDamage: 210, baseHP: 450, element: 'shadow' }
        ],
        summonClass: 'ABERRATION',
        availability: 'ALL_ROLES',
        tier: 6,
        icon: 'GiBlackHoleBola',
        duration: '30 Seconds',
        manaCost: 5000,
        rarity: 'Mythic'
    },

    // ==========================================
    // CATEGORY 2: ALL RACES (Universal Biology/Origin)
    // ==========================================
    {
        id: 'weapon_manifestations',
        name: 'Spiritual Armaments',
        variants: [
            { name: 'Floating Longsword', desc: 'A translucent sword that hacks at enemies of its own free will.', baseDamage: 4, baseHP: 17, price: 30 },
            { name: 'Dancing Daggers', desc: 'A pair of spinning knives that intercept incoming projectiles.', baseDamage: 5, baseHP: 14, price: 40 },
            { name: 'Spectral Warhammer', desc: 'A heavy mallet that smashes enemy kneecaps reliably.', baseDamage: 5, baseHP: 15, price: 50 },
            { name: 'Aegis Guardian', desc: 'A massive tower shield that hovers defensively in front of the caster.', baseDamage: 5, baseHP: 16, price: 60 },
            { name: 'Seeker Arrow', desc: 'An arrow that flies independently around corners to strike hiding targets.', baseDamage: 5, baseHP: 14, price: 45 },
            { name: 'Phantom Pike', desc: 'A 15-foot spear that keeps charging enemies at bay.', baseDamage: 6, baseHP: 17, price: 35 },
            { name: 'Whip of Force', desc: 'A cracking line of energy that trips fleeing cowards.', baseDamage: 6, baseHP: 13, price: 55 },
            { name: 'Chakram of Light', desc: 'A spinning disk that illuminates the dark while slicing through flesh.', baseDamage: 6, baseHP: 15, price: 70 },
            { name: 'Grasping Net', desc: 'A magical net that expands to trap up to three medium-sized targets.', baseDamage: 5, baseHP: 17, price: 65 },
            { name: 'Iron-Jaws Trap', desc: 'A bear-trap of magical force that clamps onto the leg of whoever steps on it.', baseDamage: 5, baseHP: 14, price: 25 }
        ],
        summonClass: 'CONSTRUCT',
        availability: 'ALL_RACES',
        tier: 1,
        icon: 'GiSparkyBomb',
        duration: '1 Minute',
        manaCost: 20,
        rarity: 'Common'
    },
    {
        id: 'arcane_familiars',
        name: 'Bound Familiars',
        variants: [
            { name: 'Arcane Raven', desc: 'Can mimic human speech to deliver messages safely across cities.', baseDamage: 10, baseHP: 33, element: 'psychic', price: 100 },
            { name: 'Tressym (Winged Cat)', desc: 'A highly intelligent feline capable of detecting invisible poisons.', baseDamage: 11, baseHP: 27, element: 'shadow', price: 150 },
            { name: 'Pseudo-Dragon', desc: 'A tiny dragon that acts as a magical battery and communicates telepathically.', baseDamage: 11, baseHP: 30, element: 'psychic', price: 300 },
            { name: 'Imp', desc: 'A fiendish scout that turns invisible and assumes the forms of rats or spiders.', baseDamage: 12, baseHP: 32, element: 'shadow', price: 250 },
            { name: 'Quasit', desc: 'A demonic familiar that causes terrifying nightmares in sleeping enemies.', baseDamage: 13, baseHP: 29, element: 'psychic', price: 200 },
            { name: 'Sprite', desc: 'A tiny warrior of the fey that detects the emotional state of creatures it touches.', baseDamage: 13, baseHP: 35, element: 'shadow', price: 180 },
            { name: 'Clockwork Spider', desc: 'A tiny machine that picks locks and records conversations on copper wire.', baseDamage: 14, baseHP: 26, element: 'psychic', price: 280 },
            { name: 'Homunculus', desc: 'A flying, bat-like construct woven from the caster\'s own blood.', baseDamage: 14, baseHP: 30, element: 'shadow', price: 220 },
            { name: 'Ice-Toad', desc: 'Cools the ambient temperature and can freeze water instantly to make bridges.', baseDamage: 11, baseHP: 33, element: 'psychic', price: 160 },
            { name: 'Gazer', desc: 'A miniature beholder with four eyestalks that shoot weak magical beams.', baseDamage: 13, baseHP: 27, element: 'shadow', price: 350 }
        ],
        summonClass: 'ABERRATION', // Using as a catch-all for weird familiars
        availability: 'ALL_RACES',
        tier: 2,
        icon: 'GiBat',
        duration: 'Until Dispelled',
        manaCost: 50,
        rarity: 'Uncommon'
    },
    {
        id: 'force_constructs',
        name: 'Force-Manifests',
        variants: [
            { name: 'Crushing Hand', desc: 'A massive hand of force that grapples and utterly crushes plate armor.', baseDamage: 21, baseHP: 66, price: 500 },
            { name: 'Interposing Shield', desc: 'A monumental wall of energy that provides total cover to an entire party.', baseDamage: 23, baseHP: 54, price: 400 },
            { name: 'Arcane Gatekeeper', desc: 'A bipedal force-golem that absolutely refuses to let anyone pass a doorway.', baseDamage: 24, baseHP: 60, price: 600 },
            { name: 'Force-Ram', desc: 'A horizontal cylinder of energy that perpetually batters against fortifications.', baseDamage: 25, baseHP: 63, price: 450 },
            { name: 'Grasping Tentacles', desc: 'Black, rubbery tentacles of energy that erupt from the floor to restrain enemies.', baseDamage: 26, baseHP: 57, price: 350 },
            { name: 'Telekinetic Catapult', desc: 'An animated siege weapon that violently throws boulders found on the battlefield.', baseDamage: 28, baseHP: 69, price: 550 },
            { name: 'Repelling Prism', desc: 'A floating crystal that forcefully pushes all enemies 30 feet away every six seconds.', baseDamage: 29, baseHP: 51, price: 500 },
            { name: 'Kinetic-Barrier Dome', desc: 'A hemispherical dome of force that cannot be teleported into or physically breached.', baseDamage: 30, baseHP: 60, price: 800 },
            { name: 'Mage-Sword Commando', desc: 'A fully autonomous spectral knight wielding a gigantic force-blade.', baseDamage: 24, baseHP: 66, price: 650 },
            { name: 'Gravity-Well Orb', desc: 'A singularity that violently pulls all enemies toward its center, crushing them.', baseDamage: 26, baseHP: 54, price: 900 }
        ],
        summonClass: 'CONSTRUCT',
        availability: 'ALL_RACES',
        tier: 3,
        icon: 'GiMagicPortal',
        duration: '10 Minutes',
        manaCost: 150,
        rarity: 'Rare'
    },
    {
        id: 'living_spells',
        name: 'Living Spells',
        variants: [
            { name: 'Living Fireball', desc: 'A sentient, rolling ball of explosive hellfire that chases fleeing enemies.', baseDamage: 43, baseHP: 132, element: 'arcane', price: 1500 },
            { name: 'Sentient Cloudkill', desc: 'A creeping, intelligent cloud of mustard gas that actively roots out hidden targets.', baseDamage: 45, baseHP: 108, element: 'arcane', price: 2000 },
            { name: 'Living Lightning-Bolt', desc: 'A crackling entity of static that ricochets endlessly between armored knights.', baseDamage: 48, baseHP: 120, element: 'arcane', price: 1800 },
            { name: 'Awakened Acid-Splash', desc: 'A massive, bubbling ooze that dissolves organic matter on contact.', baseDamage: 50, baseHP: 126, element: 'arcane', price: 1200 },
            { name: 'Blade-Barrier Form', desc: 'A spinning tornado of razor-sharp magical blades that marches slowly forward.', baseDamage: 53, baseHP: 114, element: 'arcane', price: 2200 },
            { name: 'Living Freezing-Sphere', desc: 'A bouncing orb of extreme cold that shatters targets caught in its blast.', baseDamage: 55, baseHP: 138, element: 'arcane', price: 1900 },
            { name: 'Sentient Disintegrate', desc: 'A terrifying green ray of logic-defying light that stalks a single target until one of them vanishes.', baseDamage: 57, baseHP: 102, element: 'arcane', price: 3000 },
            { name: 'Awakened Prismatic-Wall', desc: 'A blinding, shifting wall of apocalyptic light that bends itself into a sphere to trap foes.', baseDamage: 60, baseHP: 120, element: 'arcane', price: 4000 },
            { name: 'Living Meteor-Swarm', desc: 'A floating storm of molten hellstones that rains localized destruction endlessly.', baseDamage: 48, baseHP: 132, element: 'arcane', price: 5000 },
            { name: 'Sentient Time-Stop', desc: 'A localized bubble of frozen time that the summoner can push enemies into.', baseDamage: 53, baseHP: 108, element: 'arcane', price: 6000 }
        ],
        summonClass: 'MAGICAL', // Defaulted to ABERRATION because living spells are weird
        availability: 'ALL_RACES',
        tier: 4,
        icon: 'GiSpellBook',
        duration: '1 Minute',
        manaCost: 400,
        rarity: 'Epic'
    },
    {
        id: 'eldritch_horrors',
        name: 'Eldritch Horrors',
        variants: [
            { name: 'Solar-Flare Manifest', desc: 'A literal piece of the sun pulled to earth, blinding and burning an entire battlefield.', baseDamage: 85, baseHP: 275, element: 'psychic', price: 25000 },
            { name: 'Void-Weaver Anomaly', desc: 'A tear in reality that whispers maddening eldritch truths, shattering enemy minds.', baseDamage: 90, baseHP: 225, element: 'shadow', price: 30000 },
            { name: 'Astral-Dreadnought (Juvenile)', desc: 'An armored horror from the astral sea that bites clean through magical forcefields.', baseDamage: 95, baseHP: 250, element: 'psychic', price: 28000 },
            { name: 'Temporal Watcher', desc: 'A trans-planar entity that allows the summoner to perfectly foresee and counter the next 5 attacks.', baseDamage: 100, baseHP: 263, element: 'shadow', price: 40000 },
            { name: 'Void-Mist Entity', desc: 'A roiling ethereal fog of raw, unformed creation; its mere presence causes the laws of nature to unravel.', baseDamage: 105, baseHP: 238, element: 'psychic', price: 35000 },
            { name: 'Void-Spawn Larva', desc: 'A horrifying, glowing worm that inflicts primordial terror on all who lay eyes upon it.', baseDamage: 110, baseHP: 288, element: 'shadow', price: 32000 },
            { name: 'The Weaver of Fate', desc: 'A spectral spider that physically cuts the karmic threads of the summoners enemies, causing lethal accidents.', baseDamage: 115, baseHP: 213, element: 'psychic', price: 50000 },
            { name: 'Cataclysm-Mote', desc: 'A contained explosion in stasis; releasing it deals cataclysmic damage to a 10-mile radius.', baseDamage: 120, baseHP: 250, element: 'shadow', price: 80000 },
            { name: 'Comet-Rider Spirit', desc: 'Brings down a localized meteor strike precisely where the summoner dictates.', baseDamage: 95, baseHP: 275, element: 'psychic', price: 60000 },
            { name: 'The Silence of the Void', desc: 'An entity that permanently erases all sound and air from a 500-foot spherical radius.', baseDamage: 105, baseHP: 225, element: 'shadow', price: 75000 }
        ],
        summonClass: 'ABERRATION',
        availability: 'ALL_RACES',
        tier: 5,
        icon: 'GiBlackHoleBola',
        duration: '1 Minute',
        manaCost: 1500,
        rarity: 'Legendary'
    },
    {
        id: 'primordial_titans',
        name: 'Primordial Titans',
        variants: [
            { name: 'Flesh-Shaper Titan', desc: 'Reshapes organic matter at will, turning enemy soldiers into screaming walls.', baseDamage: 170, baseHP: 550, element: 'arcane', price: 200000 },
            { name: 'World-Anvil', desc: 'A living forge-god that hammers raw creation-stuff into weapons mid-combat.', baseDamage: 180, baseHP: 450, element: 'radiant', price: 250000 },
            { name: 'Sky-Render', desc: 'Tears holes in the firmament, pulling down burning celestial debris.', baseDamage: 190, baseHP: 500, element: 'arcane', price: 180000 },
            { name: 'Deep-Root Colossus', desc: 'A walking mountain of petrified wood whose footsteps cause localized earthquakes.', baseDamage: 200, baseHP: 525, element: 'shadow', price: 220000 },
            { name: 'Ocean-Heart Leviathan', desc: 'Controls tides within leagues; can drown coastal cities with a gesture.', baseDamage: 210, baseHP: 475, element: 'arcane', price: 300000 },
            { name: 'Iron-Blood Sentinel', desc: 'A metal giant whose veins run with molten ore; immune to all edged weapons.', baseDamage: 220, baseHP: 575, element: 'radiant', price: 190000 },
            { name: 'Storm-Crown Behemoth', desc: 'Wears a permanent hurricane as a crown; lightning strikes on every footfall.', baseDamage: 230, baseHP: 425, element: 'arcane', price: 270000 },
            { name: 'Bone-Cage Atrocity', desc: 'Built from the fused skeletons of a thousand sacrificed war-prisoners.', baseDamage: 240, baseHP: 500, element: 'shadow', price: 240000 },
            { name: 'Void-Walker Colossus', desc: 'Steps between dimensions with each stride, appearing behind enemy lines.', baseDamage: 190, baseHP: 550, element: 'arcane', price: 280000 },
            { name: 'Genesis Titan', desc: 'A fragment of the original world-builder; its touch creates raw land.', baseDamage: 210, baseHP: 450, element: 'radiant', price: 350000 }
        ],
        summonClass: 'MYTHIC',
        availability: 'ALL_RACES',
        tier: 6,
        icon: 'GiGiantSquid',
        duration: '30 Seconds',
        manaCost: 5000,
        rarity: 'Mythic'
    },

    // ==========================================
    // CATEGORY 3: SPECIFIC ROLE (Class Restricted)
    // ==========================================
    {
        id: 'holy_light_motes',
        name: 'Divine Sparks',
        variants: [
            { name: 'Lesser Healing-Wisp', desc: 'Flitters between injured allies, closing minor cuts automatically.', baseDamage: 4, baseHP: 17, element: 'radiant', price: 80 },
            { name: 'Shield of the Martyr', desc: 'A floating kite shield bearing the crest of a dead saint; blocks attacks.', baseDamage: 5, baseHP: 14, element: 'radiant', price: 100 },
            { name: 'Sun-Priest\'s Echo', desc: 'A ghostly initiate that loudly recites warding prayers, granting resistance to fear.', baseDamage: 5, baseHP: 15, element: 'radiant', price: 90 },
            { name: 'Cleansing-Flame Sprite', desc: 'Burns away poisons and diseases with a painless, golden fire.', baseDamage: 5, baseHP: 16, element: 'radiant', price: 120 },
            { name: 'Aura of Justice', desc: 'A floating ring of swords that strikes anyone who lies within its radius.', baseDamage: 5, baseHP: 14, element: 'radiant', price: 150 },
            { name: 'Chalice-Bearer', desc: 'A tiny cherub holding an endlessly refilling cup of holy water.', baseDamage: 6, baseHP: 17, element: 'radiant', price: 130 },
            { name: 'Vanguard of Purity', desc: 'An armored spirit that physically shoves undead away from the summoner.', baseDamage: 6, baseHP: 13, element: 'radiant', price: 140 },
            { name: 'Confessor\'s Shadow', desc: 'Forces nearby enemies to yell their tactical plans aloud in guilt.', baseDamage: 6, baseHP: 15, element: 'radiant', price: 200 },
            { name: 'Divine Sentinel-Owl', desc: 'A spectral bird that hoots loudly if a fiend attempts to lie.', baseDamage: 5, baseHP: 17, element: 'radiant', price: 110 },
            { name: 'Candle of the Catacombs', desc: 'A floating, un-extinguishable candle that prevents the dead from rising near it.', baseDamage: 5, baseHP: 14, element: 'radiant', price: 160 }
        ],
        summonClass: 'CELESTIAL',
        availability: 'SPECIFIC_ROLE',
        tier: 1,
        icon: 'GiAngelOutfit',
        duration: '1 Hour',
        manaCost: 40,
        rarity: 'Common',
        validRoles: ["Crusader", "High Paladin", "Lightbringer", "Hierophant", "Celestial Knight", "High Inquisitor"]
    },
    {
        id: 'ancestral_warriors',
        name: 'Ancestral Banners & Warriors',
        variants: [
            { name: 'Standard-Bearer of the Legion', desc: 'A spectral soldier holding a war-banner that bolsters the attacks of all allies.', baseDamage: 10, baseHP: 33, element: 'necrotic', price: 300 },
            { name: 'Phantom Pikeman', desc: 'An immobile spectral guard that stops cavalry charges instantly with a 20-foot pike.', baseDamage: 11, baseHP: 27, element: 'shadow', price: 250 },
            { name: 'Ghost-Archer Volley', desc: 'Summons three ghostly archers who fire synchronized spirit-arrows every six seconds.', baseDamage: 11, baseHP: 30, element: 'necrotic', price: 400 },
            { name: 'Shield-Wall Phalanx', desc: 'Five translucent heavy infantrymen linked side-by-side to block narrow passes.', baseDamage: 12, baseHP: 32, element: 'shadow', price: 450 },
            { name: 'Ancestral Blademaster', desc: 'A legendary ghostly duelist that intercepts enemy champions in single combat.', baseDamage: 13, baseHP: 29, element: 'necrotic', price: 600 },
            { name: 'War-Horn Blower', desc: 'A spirit that blows an impossibly loud horn, striking terror into enemy conscripts.', baseDamage: 13, baseHP: 35, element: 'shadow', price: 350 },
            { name: 'Ghost-Cavalry Charger', desc: 'A mounted knight that performs a single, devastating charge before vanishing.', baseDamage: 14, baseHP: 26, element: 'necrotic', price: 500 },
            { name: 'Siege-Engineer Spirit', desc: 'Rapidly repairs broken wooden gates or ballistas through spectral mending.', baseDamage: 14, baseHP: 30, element: 'shadow', price: 280 },
            { name: 'Fallen King\'s Command', desc: 'Projects an aura of absolute authority; lesser enemies must make a save or kneel.', baseDamage: 11, baseHP: 33, element: 'necrotic', price: 800 },
            { name: 'Berserker\'s Echo', desc: 'A screaming barbarian phantom that deals massive reckless damage.', baseDamage: 13, baseHP: 27, element: 'shadow', price: 550 }
        ],
        summonClass: 'UNDEAD', // Handled as spiritual warriors
        availability: 'SPECIFIC_ROLE',
        tier: 2,
        icon: 'GiRomanFresco',
        duration: '10 Minutes',
        manaCost: 100,
        rarity: 'Uncommon',
        validRoles: ["Warlord", "Titan Lord", "Dreadnought", "Ironbound Champion", "Skullcrusher", "Titan Slayer"]
    },
    {
        id: 'shadow_fiends',
        name: 'Shadow Fiends',
        variants: [
            { name: 'Gloom-Stalker', desc: 'An entity of pure shade that leaps from shadow to shadow to assassinate guards.', baseDamage: 21, baseHP: 66, element: 'fire', price: 800 },
            { name: 'Nightmare-Weaver', desc: 'Projects horrific illusions directly into the minds of sleeping enemy commanders.', baseDamage: 23, baseHP: 54, element: 'shadow', price: 900 },
            { name: 'Blade-Devil', desc: 'A fast, four-armed fiend wielding razor-sharp scimitars coated in paralytic venom.', baseDamage: 24, baseHP: 60, element: 'necrotic', price: 1000 },
            { name: 'Whispering-Seducer', desc: 'A succubus/incubus variant focusing entirely on charm magic and sabotage.', baseDamage: 25, baseHP: 63, element: 'fire', price: 1200 },
            { name: 'Chain-Demon Vanguard', desc: 'Wraps enemies in animated spiked chains, bleeding them out slowly.', baseDamage: 26, baseHP: 57, element: 'fire', price: 1100 },
            { name: 'Void-Hound', desc: 'A teleporting dog that hunts specifically for enemy spellcasters to disrupt concentration.', baseDamage: 28, baseHP: 69, element: 'shadow', price: 950 },
            { name: 'Mirror-Fiend', desc: 'Hides inside reflective surfaces and drags unwary targets into the glass.', baseDamage: 29, baseHP: 51, element: 'necrotic', price: 1500 },
            { name: 'Ash-Wraith', desc: 'A choking cloud of super-heated cinders forming a vague skeletal face.', baseDamage: 30, baseHP: 60, element: 'fire', price: 1300 },
            { name: 'Blood-Thief Imp', desc: 'Specifically targets healers, stealing their magical components or holy symbols.', baseDamage: 24, baseHP: 66, element: 'fire', price: 850 },
            { name: 'Silence-Bringer', desc: 'A demon whose mouth is sewn shut; its presence creates a 60-foot radius of absolute magical silence.', baseDamage: 26, baseHP: 54, element: 'shadow', price: 1800 }
        ],
        summonClass: 'FIEND',
        availability: 'SPECIFIC_ROLE',
        tier: 3,
        icon: 'GiDevilMask',
        duration: '1 Hour',
        manaCost: 200,
        rarity: 'Rare',
        validRoles: ["Warlock", "Master Assassin", "Shadowblade", "Darkblade", "Voidseer", "Grandmaster Spy"]
    },
    {
        id: 'elemental_lords',
        name: 'Elemental Lords',
        variants: [
            { name: 'Lord of the Inferno', desc: 'A towering humanoid pillar of magma; its mere presence ignites trees and melts swords.', baseDamage: 43, baseHP: 132, element: 'fire', price: 4000 },
            { name: 'Tsunami-Tyrant', desc: 'A massive water elemental capable of overturning naval galleons easily.', baseDamage: 45, baseHP: 108, element: 'frost', price: 3500 },
            { name: 'Hurricane-Duke', desc: 'A tempest made flesh, firing chain lightning and deflecting all arrows instantly.', baseDamage: 48, baseHP: 120, element: 'lightning', price: 4500 },
            { name: 'Monarch of the Deep Earth', desc: 'A diamond-scaled titan that causes localized earthquakes with its footsteps.', baseDamage: 50, baseHP: 126, element: 'arcane', price: 5000 },
            { name: 'Storm-Baron', desc: 'Constantly surrounded by a deafening thundercloud that deafens and stuns foes.', baseDamage: 53, baseHP: 114, element: 'fire', price: 4200 },
            { name: 'Glacier-Queen', desc: 'An armored ice-entity that permanently freezes the battlefield into difficult terrain.', baseDamage: 55, baseHP: 138, element: 'frost', price: 4800 },
            { name: 'Volcano-Prince', desc: 'Erupts periodically, launching massive boulders of molten rock at enemy archers.', baseDamage: 57, baseHP: 102, element: 'lightning', price: 5500 },
            { name: 'Void-Elemental', desc: 'A horrific sphere of nothingness that disintegrates everything it touches.', baseDamage: 60, baseHP: 120, element: 'arcane', price: 6000 },
            { name: 'Aether-Lord', desc: 'An entity of pure magical force that counterspells all enemy magic cast near it passively.', baseDamage: 48, baseHP: 132, element: 'fire', price: 7000 },
            { name: 'Ozone-Sovereign', desc: 'An elemental of pure crackling lightning that moves at the speed of light.', baseDamage: 53, baseHP: 108, element: 'frost', price: 6500 }
        ],
        summonClass: 'ELEMENTAL',
        availability: 'SPECIFIC_ROLE',
        tier: 4,
        icon: 'GiTornado',
        duration: '10 Minutes',
        manaCost: 600,
        rarity: 'Epic',
        validRoles: ["Elementalist", "Stormbringer", "Storm Herald", "Archmage", "Phoenixmancer"]
    },
    {
        id: 'abyssal_titans',
        name: 'Abyssal Titans',
        variants: [
            { name: 'Lich-King Avatar', desc: 'A massive skeletal king wielding a frozen greatsword; raises the dead passively as it walks.', baseDamage: 85, baseHP: 275, element: 'necrotic', price: 30000 },
            { name: 'Golgotha-Colossus', desc: 'A giant made entirely of millions of rotting corpses; virtually unkillable by conventional means.', baseDamage: 90, baseHP: 225, element: 'shadow', price: 40000 },
            { name: 'The Pale Rider', desc: 'A spectral horseman representing famine; immediately rots all rations and crops within ten miles.', baseDamage: 95, baseHP: 250, element: 'necrotic', price: 35000 },
            { name: 'Night-Terror Behemoth', desc: 'A spider the size of a cathedral that plunges the battlefield into permanent magical night.', baseDamage: 100, baseHP: 263, element: 'shadow', price: 45000 },
            { name: 'Blood-Ocean Leviathan', desc: 'A necrotic horror that swims through the earth, drowning enemies in an ocean of stolen blood.', baseDamage: 105, baseHP: 238, element: 'necrotic', price: 50000 },
            { name: 'Bone-Dragon Emperor', desc: 'The reanimated corpse of a primordial wyrm; breathes a cone of absolute entropy.', baseDamage: 110, baseHP: 288, element: 'shadow', price: 60000 },
            { name: 'Oblivion-Sphere', desc: 'A floating black hole tethered to the necromancer\'s will, erasing existence linearly.', baseDamage: 115, baseHP: 213, element: 'necrotic', price: 80000 },
            { name: 'Demon-Prince of Decay', desc: 'A decaying, horned giant whose touch instantly turns plate armor to rust and flesh to ash.', baseDamage: 120, baseHP: 250, element: 'shadow', price: 75000 },
            { name: 'Soul-Furnace Dreadnought', desc: 'A massive walking iron maiden that tortures enemy souls to power its catastrophic hellfire rays.', baseDamage: 95, baseHP: 275, element: 'necrotic', price: 70000 },
            { name: 'The Reaper\'s Shadow', desc: 'A completely invulnerable spectral scythe that swings autonomously, instantly killing anyone it touches.', baseDamage: 105, baseHP: 225, element: 'shadow', price: 100000 }
        ],
        summonClass: 'UNDEAD', 
        availability: 'SPECIFIC_ROLE',
        tier: 5,
        icon: 'GiDeathSkull',
        duration: '1 Minute',
        manaCost: 1500,
        rarity: 'Legendary',
        validRoles: ["Necromancer", "Voidseer", "Abyssal Sage", "Abyssal Tyrant", "Chaos Knight", "Void Lord"]
    },
    {
        id: 'divine_avatars',
        name: 'Divine Avatars',
        variants: [
            { name: 'Avatar of the Sun-God', desc: 'A blinding colossus of pure radiance; undead disintegrate within a league.', baseDamage: 170, baseHP: 550, element: 'radiant', price: 150000 },
            { name: 'Wrath of the War-Father', desc: 'A screaming berserker deity-fragment that cleaves through siege walls.', baseDamage: 180, baseHP: 450, element: 'radiant', price: 180000 },
            { name: 'The Weeping Mother', desc: 'Heals all allies within sight while drowning enemies in consecrated tears.', baseDamage: 190, baseHP: 500, element: 'radiant', price: 200000 },
            { name: 'Judge of the Dead', desc: 'Weighs the souls of combatants; the guilty collapse instantly.', baseDamage: 200, baseHP: 525, element: 'radiant', price: 250000 },
            { name: 'Herald of the Storm-King', desc: 'Summons divine thunder that strikes only oath-breakers and liars.', baseDamage: 210, baseHP: 475, element: 'radiant', price: 170000 },
            { name: 'The Raven Queen\'s Hand', desc: 'A skeletal figure that severs the soul from the body with a single touch.', baseDamage: 220, baseHP: 575, element: 'radiant', price: 220000 },
            { name: 'Aspect of the Forge-God', desc: 'Repairs all allied equipment and weapons to perfect condition instantly.', baseDamage: 230, baseHP: 425, element: 'radiant', price: 160000 },
            { name: 'Voice of the Void', desc: 'Speaks a word that unmakes the molecular bonds of targeted structures.', baseDamage: 240, baseHP: 500, element: 'radiant', price: 280000 },
            { name: 'The Harvest Lord', desc: 'Drains the life-force of all enemies in a vast radius to fuel allied vigor.', baseDamage: 190, baseHP: 550, element: 'radiant', price: 240000 },
            { name: 'Mantle of the First Light', desc: 'Grants absolute invulnerability to the summoner for the avatar\'s duration.', baseDamage: 210, baseHP: 450, element: 'radiant', price: 300000 }
        ],
        summonClass: 'CELESTIAL',
        availability: 'SPECIFIC_ROLE',
        tier: 6,
        icon: 'GiAngelWings',
        duration: '30 Seconds',
        manaCost: 5000,
        rarity: 'Mythic',
        validRoles: ["High Paladin", "Hierophant", "Celestial Knight", "Lightbringer", "High Inquisitor", "Crusader"]
    },

    // ==========================================
    // CATEGORY 4: SPECIFIC RACE (Race/Lore Restricted)
    // ==========================================
    {
        id: 'fey_sprites',
        name: 'Sylvan Court Initiates',
        variants: [
            { name: 'Bramble-Pixie', desc: 'Fires tiny, painful thorn arrows at enemies\' eyes.', baseDamage: 4, baseHP: 17, element: 'arcane', price: 50 },
            { name: 'Moss-Brownie', desc: 'Helps track fugitives through dense forests flawlessly.', baseDamage: 5, baseHP: 14, element: 'psychic', price: 40 },
            { name: 'Dew-Drop Boggart', desc: 'Spits a blinding mist that conceals the summoner.', baseDamage: 5, baseHP: 15, element: 'arcane', price: 60 },
            { name: 'River-Nixie', desc: 'Purifies stagnant water and fetches lost items from the riverbed.', baseDamage: 5, baseHP: 16, element: 'psychic', price: 80 },
            { name: 'Acorn-Sprite', desc: 'Grows explosive magical acorns and hurls them.', baseDamage: 5, baseHP: 14, element: 'arcane', price: 90 },
            { name: 'Thistle-Weaver', desc: 'Spins razor-sharp magical webs to snare hounds.', baseDamage: 6, baseHP: 17, element: 'psychic', price: 70 },
            { name: 'Mushroom-Cap Fae', desc: 'Releases a cloud of sleeping spores when crushed.', baseDamage: 6, baseHP: 13, element: 'arcane', price: 85 },
            { name: 'Bark-Skinned Puca', desc: 'Transforms into a hardened wooden block or a tiny pony.', baseDamage: 6, baseHP: 15, element: 'psychic', price: 55 },
            { name: 'Willow-Wisp', desc: 'Mimics voices to lure enemies into deep bogs.', baseDamage: 5, baseHP: 17, element: 'arcane', price: 100 },
            { name: 'Heather-Bell Sylph', desc: 'Rings softly to detect invisible enemies nearby.', baseDamage: 5, baseHP: 14, element: 'psychic', price: 120 }
        ],
        summonClass: 'FEY',
        availability: 'SPECIFIC_RACE',
        tier: 1,
        icon: 'GiFairyWings',
        duration: '1 Hour',
        manaCost: 30,
        rarity: 'Common',
        validRaces: ["Elf", "Wood Elf", "Half-Elf", "Fairy", "Sylph", "Dryad", "Nymph", "Pixie"]
    },
    {
        id: 'ancestral_dwarven_spirits',
        name: 'Mountain-King Ancestors',
        variants: [
            { name: 'Forge-Ghost', desc: 'A spectral smith that rapidly repairs damaged armor mid-battle.', baseDamage: 10, baseHP: 33, element: 'necrotic', price: 200 },
            { name: 'Stone-Warden Phalanx', desc: 'A ghostly dwarf wielding a massive tower shield to block corridors.', baseDamage: 11, baseHP: 27, element: 'shadow', price: 250 },
            { name: 'Earth-Rune Sentinel', desc: 'A floating slab of rock that shoots magical stone-darts.', baseDamage: 11, baseHP: 30, element: 'necrotic', price: 180 },
            { name: 'Brew-Master Spirit', desc: 'Conjures hallucinogenic or highly potent healing ales for the party.', baseDamage: 12, baseHP: 32, element: 'shadow', price: 300 },
            { name: 'Miner\'s Echo', desc: 'Detects all structural weaknesses and hidden gold veins perfectly.', baseDamage: 13, baseHP: 29, element: 'necrotic', price: 150 },
            { name: 'Beard-Flamed Berserker', desc: 'A furious phantom whose beard is literally on fire; immune to fear.', baseDamage: 13, baseHP: 35, element: 'shadow', price: 280 },
            { name: 'Anvil-Dropper Poltergeist', desc: 'Telekinetically lifts incredibly heavy objects directly over enemy heads.', baseDamage: 14, baseHP: 26, element: 'necrotic', price: 350 },
            { name: 'Vault-Keeper Geist', desc: 'Unlocks incredibly complex mechanical puzzle doors instinctively.', baseDamage: 14, baseHP: 30, element: 'shadow', price: 220 },
            { name: 'Magma-Forged Hound', desc: 'A mechanical dog designed to hunt down goblins specifically.', baseDamage: 11, baseHP: 33, element: 'necrotic', price: 400 },
            { name: 'Cannon-Loader Sprite', desc: 'A heavily soot-stained elemental that drastically speeds up siege weapon firing rates.', baseDamage: 13, baseHP: 27, element: 'shadow', price: 450 }
        ],
        summonClass: 'UNDEAD', // Representing ancestral ghosts, mechanically Undead or Construct
        availability: 'SPECIFIC_RACE',
        tier: 2,
        icon: 'GiDwarfFace',
        duration: '10 Minutes',
        manaCost: 80,
        rarity: 'Uncommon',
        validRaces: ["Dwarf", "Half-Giant", "Duergar", "Gnome", "Giant", "Ogre"]
    },
    {
        id: 'swamp_spirits',
        name: 'Bog-Witch Spirits',
        variants: [
            { name: 'Mud-Gargantua', desc: 'A large golem of filth that swallows paladins in their heavy armor.', baseDamage: 21, baseHP: 66, element: 'psychic', price: 800 },
            { name: 'Voodoo-Doll Construct', desc: 'A horrifying effigy that transfers damage from the summoner to an enemy.', baseDamage: 23, baseHP: 54, element: 'shadow', price: 1200 },
            { name: 'Blood-Leech Swarm', desc: 'A monstrous swarm that rapidly exsanguinates an entire cavalry unit.', baseDamage: 24, baseHP: 60, element: 'psychic', price: 900 },
            { name: 'Will-o\'-Wisp Brood', desc: 'Five aggressive glowing orbs that constantly shock targets with lightning.', baseDamage: 25, baseHP: 63, element: 'shadow', price: 1000 },
            { name: 'Rot-Weed Strangler', desc: 'A massive sentient kelp-monster that violently pulls enemies into deep swamp water.', baseDamage: 26, baseHP: 57, element: 'psychic', price: 1100 },
            { name: 'Frog-Demon Brawler', desc: 'A colossal demonic toad that crushes enemies with its massive leaping weight.', baseDamage: 28, baseHP: 69, element: 'shadow', price: 1500 },
            { name: 'Plague-Fog Miasma', desc: 'A sentient cloud of green fog that instantly sickens any non-reptilian.', baseDamage: 29, baseHP: 51, element: 'psychic', price: 1300 },
            { name: 'Bog-Hag Projections', desc: 'Three spectral ancient women who constantly hurl catastrophic curses at attackers.', baseDamage: 30, baseHP: 60, element: 'shadow', price: 1600 },
            { name: 'Serpent-God\'s Idol', desc: 'An animated stone statue of a snake that spits highly corrosive venom.', baseDamage: 24, baseHP: 66, element: 'psychic', price: 1400 },
            { name: 'Carrion-Crow Flock', desc: 'Hundreds of undead birds that divebomb and peck enemies to death in a frenzy.', baseDamage: 26, baseHP: 54, element: 'shadow', price: 950 }
        ],
        summonClass: 'ABERRATION',
        availability: 'SPECIFIC_RACE',
        tier: 3,
        icon: 'GiSwamp',
        duration: '1 Hour',
        manaCost: 150,
        rarity: 'Rare',
        validRaces: ["Lizardfolk", "Lamia", "Naga", "Half-Troll", "Troll", "Goblin", "Orc"]
    },
    {
        id: 'underdark_nightmares',
        name: 'Depths-Terrors',
        variants: [
            { name: 'Drider-Matriarch', desc: 'A horrific half-spider abomination casting high-level webs and poison magic.', baseDamage: 43, baseHP: 132, element: 'psychic', price: 4000 },
            { name: 'Shadow-Demon Brute', desc: 'An invisible assassin of the deep that cleaves enemies in half before they scream.', baseDamage: 45, baseHP: 108, element: 'shadow', price: 5000 },
            { name: 'Mind-Flayer Thrall', desc: 'A lobotomized psychic warrior that blasts enemies with staggering telekinetic pulses.', baseDamage: 48, baseHP: 120, element: 'psychic', price: 6000 },
            { name: 'Phase-Spider Queen', desc: 'Teleports behind enemy lines to lay highly toxic eggs directly inside war-beasts.', baseDamage: 50, baseHP: 126, element: 'shadow', price: 7000 },
            { name: 'Hook-Horror Alpha', desc: 'A massive bipedal beetle with scythe-arms that carves through plate armor.', baseDamage: 53, baseHP: 114, element: 'psychic', price: 4500 },
            { name: 'Roper-Ambusher', desc: 'Looks exactly like a stalagmite until it launches 50-foot grasping tentacles.', baseDamage: 55, baseHP: 138, element: 'shadow', price: 5500 },
            { name: 'Umber-Hulk Devastator', desc: 'A titanic ape-beetle whose gaze induces violent, unpredictable confusion.', baseDamage: 57, baseHP: 102, element: 'psychic', price: 8000 },
            { name: 'Grell-Patriarch', desc: 'A floating brain with paralyzing tentacles that stalks the ceilings of caves.', baseDamage: 60, baseHP: 120, element: 'shadow', price: 6500 },
            { name: 'Cloaker-Assassin', desc: 'Wraps itself around victims\' heads, suffocating them while using them as a meat-shield.', baseDamage: 48, baseHP: 132, element: 'psychic', price: 7500 },
            { name: 'Gargantuan Cave-Worm', desc: 'Burrows directly upwards to swallow multiple combatants simultaneously.', baseDamage: 53, baseHP: 108, element: 'shadow', price: 10000 }
        ],
        summonClass: 'ABERRATION',
        availability: 'SPECIFIC_RACE',
        tier: 4,
        icon: 'GiSpiderFace',
        duration: '10 Minutes',
        manaCost: 400,
        rarity: 'Epic',
        validRaces: ["Dark Elf", "Shadow Elf", "Orc", "Hobgoblin", "Bugbear", "Kobold"]
    },
    {
        id: 'draconic_ancestors',
        name: 'Primordial Emperor-Wyrms',
        variants: [
            { name: 'Aspect of the Red Tyrant', desc: 'Summons the furious, roaring avatar of volcanic destruction. Melts entire castles.', baseDamage: 85, baseHP: 275, element: 'fire', price: 50000 },
            { name: 'Aspect of the Golden King', desc: 'A manifestation of absolute good; its breath weapon disintegrates fiends and heals allies.', baseDamage: 90, baseHP: 225, element: 'frost', price: 60000 },
            { name: 'Aspect of the Silver Matriarch', desc: 'Creates a domain of absolute zero, freezing enemies solid in a hundred-yard radius.', baseDamage: 95, baseHP: 250, element: 'lightning', price: 55000 },
            { name: 'Aspect of the Black Swamp-Lord', desc: 'Exhales an ocean of highly corrosive acid that reduces enemy armies to literal sludge.', baseDamage: 100, baseHP: 263, element: 'fire', price: 45000 },
            { name: 'Aspect of the Blue Storm-Caller', desc: 'Manifests a catastrophic hurricane composed entirely of blinding lightning bolts.', baseDamage: 105, baseHP: 238, element: 'fire', price: 48000 },
            { name: 'Aspect of the Green Manipulator', desc: 'Emits a toxic miasma so potent it instantly chokes out giant beasts and magical wards.', baseDamage: 110, baseHP: 288, element: 'frost', price: 52000 },
            { name: 'Aspect of the Brass Desert-Lord', desc: 'Unleashes a hyper-heated sandstorm that strips flesh directly off the bone.', baseDamage: 115, baseHP: 213, element: 'lightning', price: 47000 },
            { name: 'Aspect of the Bronze Coastal-King', desc: 'Summons a repelling force so strong it throws heavy siege engines miles away.', baseDamage: 120, baseHP: 250, element: 'fire', price: 49000 },
            { name: 'Aspect of the Copper Trickster', desc: 'Breathes a massive cloud of slowing gas, rendering the enemy army completely immobile.', baseDamage: 95, baseHP: 275, element: 'fire', price: 46000 },
            { name: 'Aspect of the Platinum God', desc: 'The ultimate draconic manifestation; restores fallen allies and eradicates evil instantly.', baseDamage: 105, baseHP: 225, element: 'frost', price: 100000 }
        ],
        summonClass: 'DRACONIC',
        availability: 'SPECIFIC_RACE',
        tier: 5,
        icon: 'GiDragonSpiral',
        duration: '1 Minute',
        manaCost: 1500,
        rarity: 'Legendary',
        validRaces: ["Draconic", "Half-Dragon", "Wyvernfolk"]
    },
    {
        id: 'ancestral_gods',
        name: 'Ancestral Gods',
        variants: [
            { name: 'First Father of the Dwarves', desc: 'A stone colossus that forges mythic weapons from raw mountain peaks.', baseDamage: 170, baseHP: 550, element: 'arcane' },
            { name: 'Eldest of the Elven Groves', desc: 'The living memory of every forest; roots erupt to imprison armies.', baseDamage: 180, baseHP: 450, element: 'radiant' },
            { name: 'Primal Orc-Ancestor', desc: 'A rage-spirit so ancient it predates language; its war-cry shatters bone.', baseDamage: 190, baseHP: 500, element: 'arcane' },
            { name: 'The Halfling Hearthmother', desc: 'A warm, invisible presence that renders an area completely inviolable.', baseDamage: 200, baseHP: 525, element: 'shadow' },
            { name: 'Gnomish Progenitor-Clock', desc: 'A deity-machine that rewinds local time by sixty seconds on command.', baseDamage: 210, baseHP: 475, element: 'arcane' },
            { name: 'Dragonborn World-Sire', desc: 'A primordial dragon whose breath contains the raw stuff of creation.', baseDamage: 220, baseHP: 575, element: 'radiant' },
            { name: 'Tiefling\'s Unbound Patron', desc: 'A chained archdevil fragment that unleashes hellfire indiscriminately.', baseDamage: 230, baseHP: 425, element: 'arcane' },
            { name: 'Aasimar\'s Choir Eternal', desc: 'A host of singing angels whose harmony dissolves hostile enchantments.', baseDamage: 240, baseHP: 500, element: 'shadow' },
            { name: 'Goliath\'s Peak-Shaker', desc: 'A mountain given legs; each step registers on seismographs a continent away.', baseDamage: 190, baseHP: 550, element: 'arcane' },
            { name: 'Lizardfolk\'s Scaled Ur-God', desc: 'An ancient reptilian deity that commands all cold-blooded creatures.', baseDamage: 210, baseHP: 450, element: 'radiant' }
        ],
        summonClass: 'MYTHIC',
        availability: 'SPECIFIC_RACE',
        tier: 6,
        icon: 'GiCrown',
        duration: '30 Seconds',
        manaCost: 5000,
        rarity: 'Mythic',
        validRaces: ["Dwarf", "Elf", "Orc", "Halfling", "Gnome", "Dragonborn", "Tiefling", "Aasimar", "Goliath", "Lizardfolk"]
    }
];
