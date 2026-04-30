import { RACES } from './races';
import { ROLES } from './roles';

const raceKeys = Object.keys(RACES);
const roleKeys = Object.keys(ROLES);

export type PowerTier = 'passive' | 'active' | 'ultimate';

/**
 * A unique innate ability granted by specific race/role combinations.
 * Powers are categorized into three tiers representing escalating potency.
 */
export interface SpecialPowerDef {
    id: string;
    name: string;
    description: string;
    tier: PowerTier;
    effect: string;
    cooldown: number;
    roleNames: string[];
    raceNames: string[];
}

const POWER_DEFINITIONS: Record<string, Omit<SpecialPowerDef, 'id'>> = {
    // ==========================================
    // DIVINE POWER
    // ==========================================
    divinePower_passive: {
        name: 'Sacred Resilience',
        description: 'The blood of the divine courses through the bearer, warding off corruption.',
        tier: 'passive',
        effect: 'Reduces incoming necrotic damage by 15%. Grants immunity to minor curses.',
        cooldown: 0,
        roleNames: ["Healer", "Paladin", "Saint", "Priest", "Holy Knight", "Templar", "Crusader", "High Paladin", "Lightbringer", "High Inquisitor", "Divine Champion", "Sun Priest", "Battle Cleric", "Battle Priest", "Sword Saint", "Celestial Knight", "Hierophant"],
        raceNames: ["Aasimar", "Seraph", "Valkyrie", "Nephilim", "Deva", "Celestial"],
    },
    divinePower_active: {
        name: 'Radiant Smite',
        description: 'Channels raw divine fury into a single devastating strike of searing light.',
        tier: 'active',
        effect: 'Next melee attack deals an additional 25 radiant damage. Undead targets take double.',
        cooldown: 45,
        roleNames: ["Healer", "Paladin", "Saint", "Priest", "Holy Knight", "Templar", "Crusader", "High Paladin", "Lightbringer", "High Inquisitor", "Divine Champion", "Sun Priest", "Battle Cleric", "Battle Priest", "Sword Saint", "Celestial Knight", "Hierophant"],
        raceNames: ["Aasimar", "Seraph", "Valkyrie", "Nephilim", "Deva", "Celestial"],
    },
    divinePower_ultimate: {
        name: 'Martyrdom',
        description: 'Sacrifices a portion of the bearer\u2019s life force to shield all nearby allies from death.',
        tier: 'ultimate',
        effect: 'All allies within 30 feet become immune to lethal damage for 8 seconds. Caster loses 50% current HP.',
        cooldown: 300,
        roleNames: ["Healer", "Paladin", "Saint", "Priest", "Holy Knight", "Templar", "Crusader", "High Paladin", "Lightbringer", "High Inquisitor", "Divine Champion", "Sun Priest", "Battle Cleric", "Battle Priest", "Sword Saint", "Celestial Knight", "Hierophant"],
        raceNames: ["Aasimar", "Seraph", "Valkyrie", "Nephilim", "Deva", "Celestial"],
    },

    // ==========================================
    // DARK ENERGY
    // ==========================================
    darkEnergy_passive: {
        name: 'Soul Leech',
        description: 'Every kill feeds the bearer\u2019s essence, drawing strength from the dying.',
        tier: 'passive',
        effect: 'Killing a target restores 5% of maximum HP. Healing from non-dark sources is reduced by 20%.',
        cooldown: 0,
        roleNames: ["Necromancer", "Unknown", "Death Knight", "Demon King", "Vampire Lord", "Dark Knight", "Warlock", "Faceless King", "Shadowmancer", "Soulbinder", "Voidseer", "Abyssal Sage", "Blood Knight", "Hexblade", "Demonologist", "Void Lord", "Abyssal Tyrant", "God-Slayer"],
        raceNames: ["Demon", "Vampire", "Tiefling", "Cambion", "Rakshasa", "Oni", "Incubus", "Undead", "Skeleton", "Zombie"],
    },
    darkEnergy_active: {
        name: 'Abyssal Grasp',
        description: 'Tendrils of shadow erupt from the ground, binding and draining a single target.',
        tier: 'active',
        effect: 'Roots one target for 4 seconds and drains 30 HP, transferring it to the caster.',
        cooldown: 30,
        roleNames: ["Necromancer", "Unknown", "Death Knight", "Demon King", "Vampire Lord", "Dark Knight", "Warlock", "Faceless King", "Shadowmancer", "Soulbinder", "Voidseer", "Abyssal Sage", "Blood Knight", "Hexblade", "Demonologist", "Void Lord", "Abyssal Tyrant", "God-Slayer"],
        raceNames: ["Demon", "Vampire", "Tiefling", "Cambion", "Rakshasa", "Oni", "Incubus", "Undead", "Skeleton", "Zombie"],
    },
    darkEnergy_ultimate: {
        name: 'Death\u2019s Dominion',
        description: 'Tears open a rift to the abyss, flooding the area with necrotic miasma.',
        tier: 'ultimate',
        effect: 'All enemies within 40 feet take 15 necrotic damage per second for 10 seconds. Dead enemies rise as temporary thralls for 30 seconds.',
        cooldown: 300,
        roleNames: ["Necromancer", "Unknown", "Death Knight", "Demon King", "Vampire Lord", "Dark Knight", "Warlock", "Faceless King", "Shadowmancer", "Soulbinder", "Voidseer", "Abyssal Sage", "Blood Knight", "Hexblade", "Demonologist", "Void Lord", "Abyssal Tyrant", "God-Slayer"],
        raceNames: ["Demon", "Vampire", "Tiefling", "Cambion", "Rakshasa", "Oni", "Incubus", "Undead", "Skeleton", "Zombie"],
    },

    // ==========================================
    // ELEMENTAL POWER
    // ==========================================
    elementalPower_passive: {
        name: 'Primal Attunement',
        description: 'The natural world bends subtly around the bearer, responding to their presence.',
        tier: 'passive',
        effect: 'Movement speed increased by 10% in natural terrain. Animals will not attack unless provoked.',
        cooldown: 0,
        roleNames: ["Druid", "Elementalist", "Shaman", "Ranger", "Beastmaster", "Archdruid", "Totem Warden", "Elemental Warden", "Stormcaller", "Earthshaker", "Pyromancer", "Frost Mage", "Windrider", "Rockwarden", "Genesis Sage"],
        raceNames: ["Fae", "Dryad", "Sylph", "Fairy", "Spirit", "Nymph", "Pixie", "Centaur", "Djinn", "Efreet"],
    },
    elementalPower_active: {
        name: 'Elemental Surge',
        description: 'Unleashes a burst of raw elemental force matching the bearer\u2019s deepest affinity.',
        tier: 'active',
        effect: 'Deals 35 elemental damage (fire, frost, or lightning based on attunement) in a 15-foot cone. Applies a 3-second elemental debuff.',
        cooldown: 20,
        roleNames: ["Druid", "Elementalist", "Shaman", "Ranger", "Beastmaster", "Archdruid", "Totem Warden", "Elemental Warden", "Stormcaller", "Earthshaker", "Pyromancer", "Frost Mage", "Windrider", "Rockwarden", "Genesis Sage"],
        raceNames: ["Fae", "Dryad", "Sylph", "Fairy", "Spirit", "Nymph", "Pixie", "Centaur", "Djinn", "Efreet"],
    },
    elementalPower_ultimate: {
        name: 'Cataclysm',
        description: 'Calls down the wrath of the elemental planes, shattering the battlefield itself.',
        tier: 'ultimate',
        effect: 'The terrain within 50 feet transforms for 15 seconds: fire pools, ice patches, or lightning storms. Deals 20 damage per second to all enemies in the area.',
        cooldown: 300,
        roleNames: ["Druid", "Elementalist", "Shaman", "Ranger", "Beastmaster", "Archdruid", "Totem Warden", "Elemental Warden", "Stormcaller", "Earthshaker", "Pyromancer", "Frost Mage", "Windrider", "Rockwarden", "Genesis Sage"],
        raceNames: ["Fae", "Dryad", "Sylph", "Fairy", "Spirit", "Nymph", "Pixie", "Centaur", "Djinn", "Efreet"],
    },

    // ==========================================
    // DRACONIC POWER
    // ==========================================
    draconicPower_passive: {
        name: 'Dragon Blood',
        description: 'Ancient draconic ichor flows through the bearer\u2019s veins, hardening flesh into scale.',
        tier: 'passive',
        effect: 'Increases base defense by 5. Grants 25% resistance to fire damage.',
        cooldown: 0,
        roleNames: ["Dragon Rider", "Rune Priest", "Magic Swordsman", "Battlemage", "Dragon Knight", "Dragon Sage"],
        raceNames: ["Draconic", "Lamia", "Naga", "Lizardfolk", "Wyvernfolk", "Half-Dragon"],
    },
    draconicPower_active: {
        name: 'Wyrm\u2019s Breath',
        description: 'Exhales a torrent of destructive elemental force from deep within the lungs.',
        tier: 'active',
        effect: 'Breathes fire, frost, or lightning in a 25-foot cone dealing 50 damage. Targets are staggered for 2 seconds.',
        cooldown: 40,
        roleNames: ["Dragon Rider", "Rune Priest", "Magic Swordsman", "Battlemage", "Dragon Knight", "Dragon Sage"],
        raceNames: ["Draconic", "Lamia", "Naga", "Lizardfolk", "Wyvernfolk", "Half-Dragon"],
    },
    draconicPower_ultimate: {
        name: 'Aspect of the Wyrm',
        description: 'Manifests a spectral draconic form around the bearer, gaining terrifying power.',
        tier: 'ultimate',
        effect: 'For 20 seconds: all attacks deal an additional 20 fire damage, defense increased by 15, and all enemies within 20 feet suffer a fear debuff reducing their attack speed by 30%.',
        cooldown: 300,
        roleNames: ["Dragon Rider", "Rune Priest", "Magic Swordsman", "Battlemage", "Dragon Knight", "Dragon Sage"],
        raceNames: ["Draconic", "Lamia", "Naga", "Lizardfolk", "Wyvernfolk", "Half-Dragon"],
    },

    // ==========================================
    // STEALTH POWER
    // ==========================================
    stealthPower_passive: {
        name: 'Phantom Step',
        description: 'The bearer moves with unnatural silence, barely disturbing the dust beneath their feet.',
        tier: 'passive',
        effect: 'Footstep noise reduced by 80%. Detection radius of hostile creatures reduced by 30%.',
        cooldown: 0,
        roleNames: ["Rogue", "Assassin", "Scout", "Thief", "Shadow Dancer", "Shadowblade", "Shadow Infiltrator", "Infernal Assassin", "Shadow Hunter", "Master Assassin", "Grandmaster Spy"],
        raceNames: ["Doppelganger", "Shapeshifter", "Changeling", "Werewolf", "Lupine", "Feline"],
    },
    stealthPower_active: {
        name: 'Shadow Veil',
        description: 'Wraps the bearer in a cloak of living shadow, rendering them nearly invisible.',
        tier: 'active',
        effect: 'Become invisible for 6 seconds. First attack from stealth deals 40% bonus damage. Breaks on taking damage.',
        cooldown: 25,
        roleNames: ["Rogue", "Assassin", "Scout", "Thief", "Shadow Dancer", "Shadowblade", "Shadow Infiltrator", "Infernal Assassin", "Shadow Hunter", "Master Assassin", "Grandmaster Spy"],
        raceNames: ["Doppelganger", "Shapeshifter", "Changeling", "Werewolf", "Lupine", "Feline"],
    },
    stealthPower_ultimate: {
        name: 'Death Mark',
        description: 'Designates a single target for annihilation, turning all attacks against them lethal.',
        tier: 'ultimate',
        effect: 'Mark one target for 12 seconds. All attacks against the marked target are guaranteed critical hits. If the target dies during the mark, cooldown is reduced by 50%.',
        cooldown: 180,
        roleNames: ["Rogue", "Assassin", "Scout", "Thief", "Shadow Dancer", "Shadowblade", "Shadow Infiltrator", "Infernal Assassin", "Shadow Hunter", "Master Assassin", "Grandmaster Spy"],
        raceNames: ["Doppelganger", "Shapeshifter", "Changeling", "Werewolf", "Lupine", "Feline"],
    },
};

/** Configuration for unique racial or role-specific innate abilities. */
export const specialPowersConfig = Object.entries(POWER_DEFINITIONS).map(([powerId, definition]) => {
    return {
        id: powerId,
        name: definition.name,
        description: definition.description,
        tier: definition.tier,
        effect: definition.effect,
        cooldown: definition.cooldown,
        roles: roleKeys.filter(role => definition.roleNames.includes(role)),
        races: raceKeys.filter(race => definition.raceNames.includes(race)),
    };
});
