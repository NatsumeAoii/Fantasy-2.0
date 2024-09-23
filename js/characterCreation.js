// Import required utilities and data
import { getRandomElement, getRandomNumber } from './randomUtils.js'; 
import { races } from './data/race.js';
import { raceRegion } from './data/raceRegion.js';
import { raceGuild } from './data/raceGuild.js';
import { factions } from './data/factions.js';
import { ranks } from './data/ranks.js';
import { roles } from './data/roles.js';
import { roleSkills } from './data/roleSkills.js';
import { titles } from './data/roleTitles.js';

// Random level generation with specified chances
function getRandomLevel() {
    const random = Math.random();
    if (random < 0.7) return getRandomNumber(1, 50);  // 70% chance
    else if (random < 0.9) return getRandomNumber(50, 80);  // 20% chance
    else if (random < 0.98) return getRandomNumber(80, 95);  // 8% chance
    else return getRandomNumber(95, 100);  // 2% chance
}

// Random age assignment based on level
function getRandomAge(level) {
    if (level <= 25) return getRandomNumber(5, 30);
    else if (level <= 75) return getRandomNumber(20, 50);
    else return getRandomNumber(35, 100);
}

// Role and Race Assignment Module with 50% chance for logical or rare combinations
function assignRoleAndRace() {
    const race = getRandomElement(races);
    let role;
    const useLogicalCombination = Math.random() < 0.5;  // 50% chance to follow logic

    if (useLogicalCombination) {
        // Ensure logical combinations
        do {
            role = getRandomElement(roles);
        } while (
            ["Orc", "Goblin", "Troll", "Ogre", "Bugbear", "Kobold"].includes(race) &&
            ["Mage", "Healer", "Priest", "Archmage", "Sorcerer", "Illusionist", "Oracle", "Sage", "Enchanter"].includes(role) ||
            
            ["Elf", "Dark Elf", "High Elf", "Frost Elf", "Wood Elf", "Fairy", "Fae", "Sylph", "Dryad", "Nymph"].includes(race) &&
            ["Farmer", "Blacksmith", "Chef"].includes(role) ||
            
            ["Giant", "Half-Giant", "Cyclops", "Minotaur"].includes(race) &&
            ["Rogue", "Assassin", "Archer", "Scout", "Thief", "Jester", "Shadow Dancer", "Blade Dancer"].includes(role) ||
            
            ["Draconic", "Lamia", "Naga", "Half-Dragon"].includes(race) &&
            ["Farmer", "Blacksmith", "Chef", "Trader"].includes(role) ||
            
            ["Undead", "Vampire", "Skeleton", "Zombie", "Demon", "Doppelganger", "Shapeshifter", "Necromancer"].includes(race) &&
            ["Healer", "Paladin", "Priest", "Saint", "Holy Knight"].includes(role) ||
            
            ["Aasimar", "Nephilim", "Valkyrie", "Seraph", "Deva"].includes(race) &&
            ["Necromancer", "Dark Knight", "Warlock", "Demon King", "Vampire Lord"].includes(role) ||
            
            ["Werewolf", "Lupine", "Feline", "Satyr", "Centaur", "Sphinx"].includes(race) &&
            ["Mage", "Archmage", "Sorcerer", "Illusionist", "Oracle", "Sage"].includes(role)
        );
    } else {
        // Allow for a unique or potentially illogical combination
        role = getRandomElement(roles);  // No restrictions in this case
    }

    return { race, role };
}

// Attribute Calculation Module - Ensure randomization for all stats
function calculateAttributes(race) {
    const baseStrength = race === "Orc" ? 50 : race === "Elf" ? 20 : getRandomNumber(1, 50);
    const baseAgi = race === "Elf" ? 50 : race === "Orc" ? 20 : getRandomNumber(1, 50);
    const baseMana = race === "Elf" ? 60 : race === "Human" ? 40 : getRandomNumber(1, 50);

    const attributes = {
        strength: Math.min(baseStrength + getRandomNumber(0, 50), 100),
        health: Math.min(getRandomNumber(25, 100), 100),
        mana: Math.min(baseMana + getRandomNumber(0, 50), 100),
        agility: Math.min(baseAgi + getRandomNumber(0, 50), 100),
        dexterity: Math.min(getRandomNumber(10, 80), 100),
        luck: Math.min(getRandomNumber(1, 100), 100),
        endurance: Math.min(getRandomNumber(20, 100), 100)
    };

    return attributes;
}

// Skill and Title Generation based on level - Prevent duplicates
function generateSkillsAndTitles(role, level) {
    const characterSkills = new Set();
    const characterTitles = new Set();
    const availableSkills = roleSkills[role] || [];
    const availableTitles = titles[role] || [];

    let minRank, maxRank, numberOfSkills, numberOfTitles;

    // Skill and title generation based on level
    if (level <= 25) {
        numberOfSkills = getRandomNumber(2, 5);
        numberOfTitles = getRandomNumber(1, 2);  // Titles should be based on lower levels
        minRank = "F";
        maxRank = "SSS";
    } else if (level <= 50) {
        numberOfSkills = getRandomNumber(5, 10);
        numberOfTitles = getRandomNumber(2, 3);
        minRank = "E";
        maxRank = "SSSS";
    } else if (level <= 80) {
        numberOfSkills = getRandomNumber(7, 12);
        numberOfTitles = getRandomNumber(3, 5);
        minRank = "C";
        maxRank = "EX";
    } else {
        numberOfSkills = getRandomNumber(10, 15);
        numberOfTitles = getRandomNumber(4, 7);
        minRank = "A";
        maxRank = "Mythic";
    }

    // Randomly generate skills, ensuring no duplicates
    while (characterSkills.size < numberOfSkills) {
        const skill = getRandomElement(availableSkills);
        if (!characterSkills.has(skill)) {  // Prevent duplication
            const rank = getRandomElement(ranks.slice(ranks.indexOf(minRank), ranks.indexOf(maxRank) + 1));
            characterSkills.add(`${skill} (Rank ${rank})`);
        }
    }

    // Randomly generate titles, ensuring no duplicates
    while (characterTitles.size < numberOfTitles) {
        const title = getRandomElement(availableTitles);
        if (!characterTitles.has(title)) {  // Prevent duplication
            const rank = getRandomElement(ranks.slice(ranks.indexOf(minRank), ranks.indexOf(maxRank) + 1));
            characterTitles.add(`${title} (Rank ${rank})`);
        }
    }

    return { characterSkills: Array.from(characterSkills), characterTitles: Array.from(characterTitles) };
}

// Random guild assignment based on region
function getRandomGuild(region) {
    const guildOptions = raceGuild[region] || ["None"];
    return Math.random() < 0.5 ? "None" : getRandomElement(guildOptions);
}

// Random faction assignment based on region
function getRandomFaction(region) {
    const factionOptions = Object.entries(factions)
        .filter(([faction, regions]) => regions.includes(region))
        .map(([faction]) => faction);

    return Math.random() < 0.4 ? "None" : getRandomElement(factionOptions);
}

// UI Update Module - Ensure all stats are properly displayed
function updateUI(name, role, race, level, age, attributes, guild, region, faction, skills, titles) {
    const charName = document.getElementById("charName");
    const charRace = document.getElementById("charRace");
    const charRole = document.getElementById("charRole");
    const charLev = document.getElementById("charLev");
    const charGuild = document.getElementById("charGuild");
    const charRegion = document.getElementById("charRegion");
    const charFaction = document.getElementById("charFaction");
    const charAge = document.getElementById("charAge");
    const skillList = document.getElementById("charSkill");
    const titleList = document.getElementById("charTitle");

    if (!charName || !charRace || !charRole || !charLev || !charGuild || !charRegion || !charFaction || !charAge || !skillList || !titleList) {
        console.error("One or more elements are missing in the DOM!");
        return;
    }

    // Update character info
    charName.textContent = name;
    charRace.textContent = race;
    charRole.textContent = role;
    charLev.textContent = level;
    charGuild.textContent = guild || "None"; // Ensure "None" if no guild
    charRegion.textContent = region || "None"; // Ensure "None" if no region
    charFaction.textContent = faction || "None"; // Ensure "None" if no faction
    charAge.textContent = age;

    // Update attributes
    document.getElementById("charStrength").textContent = attributes.strength;
    document.getElementById("charHealth").textContent = attributes.health;
    document.getElementById("charMana").textContent = attributes.mana;
    document.getElementById("charAgi").textContent = attributes.agility;
    document.getElementById("charDexterity").textContent = attributes.dexterity;
    document.getElementById("charLuck").textContent = attributes.luck;
    document.getElementById("charEndurance").textContent = attributes.endurance;

    // Update skills and titles in the UI
    skillList.innerHTML = "";
    skills.forEach(skill => {
        const listItem = document.createElement("li");
        listItem.textContent = skill;
        skillList.appendChild(listItem);
    });

    titleList.innerHTML = "";
    titles.forEach(title => {
        const listItem = document.createElement("li");
        listItem.textContent = title;
        titleList.appendChild(listItem);
    });
}

// Main character creation function
export function submitName() {
    const name = document.getElementById("nameInput").value;
    if (name) {
        const { race, role } = assignRoleAndRace();  // Now uses updated logic
        const level = getRandomLevel();
        const age = getRandomAge(level);
        const attributes = calculateAttributes(race);
        
        // Ensure a valid region is assigned
        const region = getRandomElement(raceRegion[race]);
        if (!region) {
            alert("No valid region found for this race.");
            return;
        }

        const guild = getRandomGuild(region);  // 50% chance for guild to be "None"
        const faction = getRandomFaction(region) || "None";  // 40% chance for faction to be "None"
        const { characterSkills, characterTitles } = generateSkillsAndTitles(role, level);

        updateUI(name, role, race, level, age, attributes, guild, region, faction, characterSkills, characterTitles);
        displaySpecialPowers(role, race);
        document.getElementById("inputForm").style.display = "none";
        document.getElementById("characterDisplay").style.display = "block";
    } else {
        alert("Please enter a name.");
    }
}

// Divine and Dark Energy Display Module with added powers for other roles and races
function displaySpecialPowers(role, race) {
    if (["Healer", "Paladin", "Saint", "Priest", "Holy Knight", "Templar", "Crusader"].includes(role) ||
        ["Aasimar", "Seraph", "Valkyrie", "Nephilim", "Deva"].includes(race)) {
        const divinePower = getRandomNumber(50, 100);
        document.getElementById("charDivinePower").textContent = divinePower;
        document.getElementById("divinePower").style.display = "block";
    }

    if (["Necromancer", "Unknown", "Death Knight", "Demon King", "Vampire Lord", "Dark Knight", "Warlock"].includes(role) ||
        ["Demon", "Vampire", "Tiefling", "Cambion", "Rakshasa", "Oni", "Incubus"].includes(race)) {
        const darkEnergy = getRandomNumber(50, 100);
        document.getElementById("charDarkEnergy").textContent = darkEnergy;
        document.getElementById("darkEnergy").style.display = "block";
    }

    if (["Druid", "Elementalist", "Shaman", "Ranger", "Beastmaster"].includes(role) ||
        ["Fae", "Dryad", "Sylph", "Fairy", "Spirit", "Nymph", "Pixie", "Centaur"].includes(race)) {
        const elementalPower = getRandomNumber(50, 100);
        document.getElementById("charElementalPower").textContent = elementalPower;
        document.getElementById("elementalPower").style.display = "block";
    }

    if (["Dragon Rider", "Rune Priest", "Magic Swordsman", "Battlemage"].includes(role) ||
        ["Draconic", "Lamia", "Naga", "Lizardfolk", "Wyvernfolk", "Half-Dragon"].includes(race)) {
        const draconicPower = getRandomNumber(50, 100);
        document.getElementById("charDraconicPower").textContent = draconicPower;
        document.getElementById("draconicPower").style.display = "block";
    }

    if (["Rogue", "Assassin", "Scout", "Thief", "Shadow Dancer"].includes(role) ||
        ["Doppelganger", "Shapeshifter", "Changeling", "Werewolf", "Lupine", "Feline"].includes(race)) {
        const stealthPower = getRandomNumber(50, 100);
        document.getElementById("charStealthPower").textContent = stealthPower;
        document.getElementById("stealthPower").style.display = "block";
    }
}
