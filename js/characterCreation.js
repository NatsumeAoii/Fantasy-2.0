import { getRandomElement, getRandomNumber } from './randomUtils.js'; 
import { races } from './data/race.js';
import { raceRegion } from './data/raceRegion.js';
import { raceGuild } from './data/raceGuild.js';
import { factions } from './data/factions.js';
import { ranks } from './data/ranks.js';
import { roles } from './data/roles.js';
import { roleSkills } from './data/roleSkills.js';
import { titles } from './data/roleTitles.js';

function getRandomLevel(powerful = false) {
    if (powerful) {
        return Math.random() < 0.1 ? getRandomNumber(50, 80) : getRandomNumber(80, 100);
    } else {
        const random = Math.random();
        if (random < 0.85) return getRandomNumber(1, 50);
        else if (random < 0.95) return getRandomNumber(50, 80); 
        else if (random < 0.98) return getRandomNumber(80, 95); 
        else return getRandomNumber(95, 100);
    }
}

function getRandomAge(level) {
    if (level <= 25) return getRandomNumber(5, 30);
    else if (level <= 75) return getRandomNumber(20, 50);
    else return getRandomNumber(30, 100);
}

function assignRoleAndRace() {
    const race = getRandomElement(races);
    let role;
    const useLogicalCombination = Math.random() < 0.5; 

    if (useLogicalCombination) {
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
        role = getRandomElement(roles); 
    }

    return { race, role };
}

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

function generateSkillsAndTitles(role, level) {
    const characterSkills = new Set();
    const finalSkills = []; 
    const characterTitles = new Set(); 
    const finalTitles = []; 
    const availableSkills = roleSkills[role] || [];
    const availableTitles = titles[role] || [];

    let minRank, maxRank, numberOfSkills, numberOfTitles;
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

    while (characterSkills.size < numberOfSkills) {
        const skill = getRandomElement(availableSkills);
        characterSkills.add(skill);  
    }

    characterSkills.forEach(skill => {
        const rank = getRandomElement(ranks.slice(ranks.indexOf(minRank), ranks.indexOf(maxRank) + 1));
        finalSkills.push(`${skill} (Rank ${rank})`);
    });

    while (characterTitles.size < numberOfTitles) {
        const title = getRandomElement(availableTitles);
        characterTitles.add(title);
    }

    characterTitles.forEach(title => {
        const rank = getRandomElement(ranks.slice(ranks.indexOf(minRank), ranks.indexOf(maxRank) + 1));
        finalTitles.push(`${title} (Rank ${rank})`);
    });

    return { characterSkills: finalSkills, characterTitles: finalTitles };
}

function getRandomGuild(region, level) {
    const guildOptions = raceGuild[region] || ["None"];
    if (Math.random() < 0.8) { 
        return getRandomElement(guildOptions);
    }
    return "None";
}

function getRandomFaction(guild, level) {
    if (guild !== 'None' && Math.random() < 0.5) {
        const factionOptions = Object.entries(factions)
            .filter(([faction, regions]) => regions.includes(guild))
            .map(([faction]) => faction);
        return factionOptions.length > 0 ? getRandomElement(factionOptions) : 'None';
    }
    return 'None';
}

// Update the UI with character details
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

    charName.textContent = name;
    charRace.textContent = race;
    charRole.textContent = role;
    charLev.textContent = level;
    charGuild.textContent = guild || "None"; 
    charRegion.textContent = region;
    charFaction.textContent = faction || "None";
    charAge.textContent = age;

    document.getElementById("charStrength").textContent = attributes.strength;
    document.getElementById("charHealth").textContent = attributes.health;
    document.getElementById("charMana").textContent = attributes.mana;
    document.getElementById("charAgi").textContent = attributes.agility;
    document.getElementById("charDexterity").textContent = attributes.dexterity;
    document.getElementById("charLuck").textContent = attributes.luck;
    document.getElementById("charEndurance").textContent = attributes.endurance;

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

export function submitName(powerful = false) {
    const name = document.getElementById("nameInput").value;
    if (name) {
        const { race, role } = assignRoleAndRace();
        const level = getRandomLevel(powerful);  
        const age = getRandomAge(level);
        const attributes = calculateAttributes(race);
        const region = getRandomElement(raceRegion[race]);
        const guild = getRandomGuild(region, level);
        const faction = getRandomFaction(guild, level);
        const { characterSkills, characterTitles } = generateSkillsAndTitles(role, level);
        updateUI(name, role, race, level, age, attributes, guild, region, faction, characterSkills, characterTitles);
        displaySpecialPowers(role, race);

        document.getElementById("inputForm").style.display = "none";
        document.getElementById("characterDisplay").style.display = "block";
        
        const restartBtn = document.getElementById("restartBtn");
        restartBtn.style.display = "block";
        restartBtn.addEventListener("click", () => {
            window.location.reload(); 
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