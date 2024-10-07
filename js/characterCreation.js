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

// Random level generation with specified chances and optional powerful flag
function getRandomLevel(powerful = false) {
    if (powerful) {
        // If the character is marked as powerful, 10% chance for level 50-80, otherwise 80-100
        return Math.random() < 0.1 ? getRandomNumber(50, 80) : getRandomNumber(80, 100);
    } else {
        // Standard level generation logic
        const random = Math.random();
        if (random < 0.85) return getRandomNumber(1, 50);  // 70% chance for level 1-50
        else if (random < 0.95) return getRandomNumber(50, 80);  // 20% chance for level 50-80
        else if (random < 0.98) return getRandomNumber(80, 95);  // 8% chance for level 80-95
        else return getRandomNumber(95, 100);  // 2% chance for level 95-100
    }
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
    const characterSkills = new Set();  // To store unique base skills
    const finalSkills = [];  // To store the final skills with ranks
    const characterTitles = new Set();  // To store unique base titles
    const finalTitles = [];  // To store the final titles with ranks
    const availableSkills = roleSkills[role] || [];
    const availableTitles = titles[role] || [];

    let minRank, maxRank, numberOfSkills, numberOfTitles;

    // Determine the number of skills and titles based on level
    if (level <= 25) {
        numberOfSkills = getRandomNumber(2, 5);
        numberOfTitles = getRandomNumber(1, 2);
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

    // Generate unique skills
    while (characterSkills.size < numberOfSkills) {
        const skill = getRandomElement(availableSkills);
        characterSkills.add(skill);  // Ensure the base skill is unique
    }

    // Assign ranks to unique skills and add to finalSkills array
    characterSkills.forEach(skill => {
        const rank = getRandomElement(ranks.slice(ranks.indexOf(minRank), ranks.indexOf(maxRank) + 1));
        finalSkills.push(`${skill} (Rank ${rank})`);
    });

    // Generate unique titles
    while (characterTitles.size < numberOfTitles) {
        const title = getRandomElement(availableTitles);
        characterTitles.add(title);  // Ensure the base title is unique
    }

    // Assign ranks to unique titles and add to finalTitles array
    characterTitles.forEach(title => {
        const rank = getRandomElement(ranks.slice(ranks.indexOf(minRank), ranks.indexOf(maxRank) + 1));
        finalTitles.push(`${title} (Rank ${rank})`);
    });

    return { characterSkills: finalSkills, characterTitles: finalTitles };
}


// Random guild assignment based on region and level
function getRandomGuild(region, level) {
    const guildOptions = raceGuild[region] || ["None"];
    if (level >= 50) {
        return getRandomElement(guildOptions);  // Must have a guild
    }
    return Math.random() < 0.5 ? "None" : getRandomElement(guildOptions);  // 50% chance for lower levels
}

// Random faction assignment based on region and level
function getRandomFaction(region, level) {
    const factionOptions = Object.entries(factions)
        .filter(([faction, regions]) => regions.includes(region))
        .map(([faction]) => faction);

    if (level >= 50) {
        return getRandomElement(factionOptions);  // Must have a faction
    }
    return Math.random() < 0.5 ? "None" : getRandomElement(factionOptions);  // 50% chance for lower levels
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
    charRegion.textContent = region;  // Ensure valid region is always displayed
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

// Main character creation function adapted to use powerful flag
export function submitName(powerful = false) {
    const name = document.getElementById("nameInput").value;
    if (name) {
        const { race, role } = assignRoleAndRace();
        const level = getRandomLevel(powerful);  // Pass the powerful flag
        const age = getRandomAge(level);
        const attributes = calculateAttributes(race);
        const region = getRandomElement(raceRegion[race]);
        const guild = getRandomGuild(region, level);
        const faction = getRandomFaction(region, level);
        const { characterSkills, characterTitles } = generateSkillsAndTitles(role, level);
        updateUI(name, role, race, level, age, attributes, guild, region, faction, characterSkills, characterTitles);
        displaySpecialPowers(role, race);

        // Hide input form and display character info
        document.getElementById("inputForm").style.display = "none";
        document.getElementById("characterDisplay").style.display = "block";
        
        // Show the Restart button
        const restartBtn = document.getElementById("restartBtn");
        restartBtn.style.display = "block";
        restartBtn.addEventListener("click", () => {
            window.location.reload();  // Reload the page on Restart
        });
    } else {
        alert("Please enter a name.");
    }
}

function displaySpecialPowers(role, race, level) {
    let minPower = level < 50 ? 10 : 50;
    let maxPower = 100;

    if (["Healer", "Paladin", "Saint", "Priest", "Holy Knight", "Templar", "Crusader"].includes(role) ||
        ["Aasimar", "Seraph", "Valkyrie", "Nephilim", "Deva"].includes(race)) {
        const divinePower = getRandomNumber(minPower, maxPower);
        document.getElementById("charDivinePower").textContent = divinePower;
        document.getElementById("divinePower").style.display = "block";
    }

    if (["Necromancer", "Unknown", "Death Knight", "Demon King", "Vampire Lord", "Dark Knight", "Warlock"].includes(role) ||
        ["Demon", "Vampire", "Tiefling", "Cambion", "Rakshasa", "Oni", "Incubus"].includes(race)) {
        const darkEnergy = getRandomNumber(minPower, maxPower);
        document.getElementById("charDarkEnergy").textContent = darkEnergy;
        document.getElementById("darkEnergy").style.display = "block";
    }

    if (["Druid", "Elementalist", "Shaman", "Ranger", "Beastmaster"].includes(role) ||
        ["Fae", "Dryad", "Sylph", "Fairy", "Spirit", "Nymph", "Pixie", "Centaur"].includes(race)) {
        const elementalPower = getRandomNumber(minPower, maxPower);
        document.getElementById("charElementalPower").textContent = elementalPower;
        document.getElementById("elementalPower").style.display = "block";
    }

    if (["Dragon Rider", "Rune Priest", "Magic Swordsman", "Battlemage"].includes(role) ||
        ["Draconic", "Lamia", "Naga", "Lizardfolk", "Wyvernfolk", "Half-Dragon"].includes(race)) {
        const draconicPower = getRandomNumber(minPower, maxPower);
        document.getElementById("charDraconicPower").textContent = draconicPower;
        document.getElementById("draconicPower").style.display = "block";
    }

    if (["Rogue", "Assassin", "Scout", "Thief", "Shadow Dancer"].includes(role) ||
        ["Doppelganger", "Shapeshifter", "Changeling", "Werewolf", "Lupine", "Feline"].includes(race)) {
        const stealthPower = getRandomNumber(minPower, maxPower);
        document.getElementById("charStealthPower").textContent = stealthPower;
        document.getElementById("stealthPower").style.display = "block";
    }
}
