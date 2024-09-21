import { getRandomElement, getRandomNumber } from './randomUtils.js'; 
import { roles, races, regions, roleSkills, ranks, guilds, titles } from './data.js';

function getRandomLevel() {
    const random = Math.random();
    if (random < 0.8) return getRandomNumber(1, 50);
    else if (random < 0.95) return getRandomNumber(51, 80);
    else return getRandomNumber(81, 100);
}

function getRankBasedOnLevel(level) {
    if (level < 50) return getRandomElement(ranks.slice(0, ranks.indexOf("SSS") + 1));
    else if (level < 75) return getRandomElement(ranks.slice(0, ranks.indexOf("SSSS") + 1));
    else return getRandomElement(ranks);
}

// Role and Race Assignment Module
function assignRoleAndRace() {
    const race = getRandomElement(races);
    let role;
    do {
        role = getRandomElement(roles);
    } while (["Demon", "Sarkaz", "Orc", "Vampire", "Undead", "Skeleton", "Zombie"].includes(race) &&
             ["Healer", "Paladin", "Saint", "Priest"].includes(role) ||
             role === "Blacksmith" && race !== "Dwarf" ||
             role === "Farmer" && ["Demon", "Vampire", "Dragon", "Half Dragon"].includes(race) ||
             role === "Saint" && ["Rogue", "Assassin", "Dark Knight"].includes(role) ||
             ["Divine Being", "Phoenix"].includes(race) && 
             ["Necromancer", "Warlock", "Dark Knight"].includes(role) ||
             ["Dragon", "Giant", "Minotaur"].includes(race) && 
             ["Mage", "Healer", "Priest"].includes(role) ||
             ["Beast", "Orc", "Goblin", "Troll", "Ogre"].includes(race) && 
             ["Archmage", "Sorcerer", "Alchemist", "Illusionist", "Oracle", "Sage"].includes(role) ||
             ["Elf", "Dark Elf", "Fairy", "Phoenix"].includes(race) && 
             ["Farmer", "Blacksmith", "Chef", "Trader"].includes(role) ||
             ["Undead", "Skeleton", "Zombie"].includes(race) && 
             !["Necromancer", "Dark Knight", "Death Knight", "Warlock"].includes(role));

    return { race, role };
}

// Attribute Calculation Module
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

// Skill Generation Module
function generateSkills(role, lev) {
    const characterSkills = new Map();
    const availableSkills = roleSkills[role];

    let numberOfSkills;
    if (lev <= 25) numberOfSkills = getRandomNumber(3, 5);
    else if (lev <= 50) numberOfSkills = getRandomNumber(5, 7);
    else if (lev <= 75) numberOfSkills = getRandomNumber(7, 10);
    else numberOfSkills = getRandomNumber(8, 15);

    while (characterSkills.size < numberOfSkills) {
        const skill = getRandomElement(availableSkills);
        let rank;
        if (lev >= 75 && characterSkills.size >= 8 && Math.random() < 0.05) {
            rank = getRandomElement(["Legendary", "Mythic", "Godly"]);
        } else if (lev >= 75 && characterSkills.size >= 8) {
            rank = getRandomElement(["SSS", "SSSS", "EX"]);
        } else {
            rank = getRandomElement(ranks);
        }
        characterSkills.set(skill, rank);
    }

    return characterSkills;
}

// Title Generation Module
function generateTitles(role, lev) {
    const characterTitles = new Map();
    const availableTitles = titles[role];

    let titlesCount;
    if (lev <= 25 && lev > 5) titlesCount = 1;
    else if (lev <= 50) titlesCount = getRandomNumber(1, 2);
    else if (lev <= 75) titlesCount = getRandomNumber(2, 4);
    else titlesCount = getRandomNumber(3, 5);

    while (characterTitles.size < titlesCount) {
        const title = getRandomElement(availableTitles);
        let titleRank;
        if (lev >= 75 && characterTitles.size >= 3 && Math.random() < 0.05) {
            titleRank = getRandomElement(["Legendary", "Mythic", "Godly"]);
        } else if (lev >= 75 && characterTitles.size >= 3) {
            titleRank = getRandomElement(["SSS", "SSSS", "EX"]);
        } else {
            titleRank = getRandomElement(ranks);
        }
        characterTitles.set(title, titleRank);
    }

    return characterTitles;
}

// Divine and Dark Energy Display Module
function displaySpecialPowers(role, race) {
    if (["Healer", "Paladin", "Saint", "Priest"].includes(role)) {
        const divinePower = getRandomNumber(50, 100);
        document.getElementById("charDivinePower").textContent = divinePower;
        document.getElementById("divinePower").style.display = "block";
    }

    if (["Necromancer", "Unknown", "Death Knight", "Demon King", "Vampire Lord", "Dark Knight"].includes(role) || ["Demon", "Vampire"].includes(race)) {
        const darkEnergy = getRandomNumber(50, 100);
        document.getElementById("charDarkEnergy").textContent = darkEnergy;
        document.getElementById("darkEnergy").style.display = "block";
    }
}

// UI Update Module
function updateUI(name, role, race, lev, attributes, guild, region, skills, titles) {
    document.getElementById("charName").textContent = name;
    document.getElementById("charAgi").textContent = attributes.agility;
    document.getElementById("charLev").textContent = lev;
    document.getElementById("charRole").textContent = role;
    document.getElementById("charRace").textContent = race;
    document.getElementById("charStrength").textContent = attributes.strength;
    document.getElementById("charHealth").textContent = attributes.health;
    document.getElementById("charMana").textContent = attributes.mana;
    document.getElementById("charDexterity").textContent = attributes.dexterity;
    document.getElementById("charLuck").textContent = attributes.luck;
    document.getElementById("charEndurance").textContent = attributes.endurance;
    document.getElementById("charGuild").textContent = guild;
    document.getElementById("charRegion").textContent = region;

    const skillList = document.getElementById("charSkill");
    skillList.innerHTML = "";
    skills.forEach((rank, skill) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${skill} (Rank ${rank})`;
        skillList.appendChild(listItem);
    });

    const titleList = document.getElementById("charTitle");
    titleList.innerHTML = "";
    titles.forEach((rank, title) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${title} (Rank ${rank})`;
        titleList.appendChild(listItem);
    });
}

export function submitName() {
    const name = document.getElementById("nameInput").value;
    if (name) {
        const { race, role } = assignRoleAndRace();
        const lev = getRandomLevel();
        const attributes = calculateAttributes(race);
        const guild = getRandomElement(guilds);
        const region = getRandomElement(regions);
        const skills = generateSkills(role, lev);
        const titles = generateTitles(role, lev);

        updateUI(name, role, race, lev, attributes, guild, region, skills, titles);
        displaySpecialPowers(role, race);
        document.getElementById("inputForm").style.display = "none";
        document.getElementById("characterDisplay").style.display = "block";
    } else {
        alert("Please enter a name.");
    }
}
