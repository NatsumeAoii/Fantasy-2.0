import { generateCharacter } from "./characterCreation.js";
import { getRandomNumber } from "./randomUtils.js";
import { tooltipContent } from "./data/ttstring.js";
import { GENERATION_CONSTANTS } from "./generation.config.js";

const APP_CONFIG = Object.freeze({
    LOADING_SIMULATION_DELAY_MS: { min: 100, max: 600 },
    EXPORT_IMAGE_QUALITY: 0.98,
    EXPORT_FILENAME_MAX_LENGTH: 100,
    PROGRESS_TEXT_COLOR_THRESHOLD_PERCENT: 50,
    STAT_BAR_MAX_VALUES: { NUMBER: 1000, PERCENTAGE: 100 },
    STAT_TYPES: {
        strength: 'NUMBER', agility: 'NUMBER', dexterity: 'NUMBER', endurance: 'NUMBER', intelligence: 'NUMBER', wisdom: 'NUMBER', luck: 'NUMBER', charisma: 'NUMBER', willpower: 'NUMBER', resolve: 'NUMBER',
        hpRegen: 'NUMBER', mpRegen: 'NUMBER', lifesteal: 'PERCENTAGE', manaLeech: 'PERCENTAGE', resourceCostReduction: 'PERCENTAGE', healingPower: 'PERCENTAGE',
        attackPower: 'NUMBER', magicPower: 'NUMBER', attackSpeed: 'NUMBER', accuracy: 'NUMBER', critChance: 'PERCENTAGE', critDamageBonus: 'PERCENTAGE', cooldownReduction: 'PERCENTAGE', armorPenetration: 'PERCENTAGE', magicPenetration: 'PERCENTAGE', dotBonus: 'PERCENTAGE',
        defense: 'NUMBER', magicResist: 'NUMBER', evasion: 'NUMBER', blockChance: 'PERCENTAGE', parryChance: 'PERCENTAGE', elementalResistances: 'NUMBER', damageReflection: 'PERCENTAGE', tenacity: 'PERCENTAGE', damageAbsorption: 'NUMBER', resilience: 'PERCENTAGE', critResistance: 'PERCENTAGE', aegis: 'NUMBER',
        perception: 'NUMBER', stealth: 'NUMBER', crafting: 'NUMBER', persuasion: 'NUMBER', scavenging: 'NUMBER', bartering: 'NUMBER', knowledge: 'NUMBER', survival: 'NUMBER', taming: 'NUMBER',
        divinePower: 'NUMBER', darkEnergy: 'NUMBER', elementalPower: 'NUMBER', draconicPower: 'NUMBER', stealthPower: 'NUMBER',
    },
    STAT_LABELS: {
        strength: 'Strength', agility: 'Agility', dexterity: 'Dexterity', endurance: 'Endurance', intelligence: 'Intelligence', wisdom: 'Wisdom', luck: 'Luck', charisma: 'Charisma', willpower: 'Willpower', resolve: 'Resolve',
        hpRegen: 'Health Regen / 5s', mpRegen: 'Mana Regen / 5s', lifesteal: 'Lifesteal (%)', manaLeech: 'Mana Leech (%)', resourceCostReduction: 'Resource Cost Reduction (%)', healingPower: 'Healing & Shielding Power (%)',
        attackPower: 'Attack Power', magicPower: 'Magic Power', attackSpeed: 'Attack Speed', accuracy: 'Accuracy', critChance: 'Crit Chance (%)', critDamageBonus: 'Crit Damage Bonus (%)', cooldownReduction: 'Cooldown Reduction (%)', armorPenetration: 'Armor Penetration (%)', magicPenetration: 'Magic Penetration (%)', dotBonus: 'Damage Over Time Bonus (%)',
        defense: 'Defense', magicResist: 'Magic Resist', evasion: 'Evasion', blockChance: 'Block Chance (%)', parryChance: 'Parry Chance (%)', elementalResistances: 'Elemental Resistances', damageReflection: 'Damage Reflection (%)', tenacity: 'Tenacity (CC Resist %)', damageAbsorption: 'Damage Absorption', resilience: 'Resilience (Debuff Resist %)', critResistance: 'Crit Resist (%)', aegis: 'Aegis Shield',
        perception: 'Perception', stealth: 'Stealth', crafting: 'Crafting', persuasion: 'Persuasion', scavenging: 'Scavenging', bartering: 'Bartering', knowledge: 'Knowledge', survival: 'Survival', taming: 'Taming',
    }
});

const CSS_CLASSES = Object.freeze({
    DISPLAY_NONE: 'd-none',
    LEVEL_MAX: 'level-max',
    TEXT_ON_DARK: 'text-on-dark',
    ACTION_BUTTONS: 'action-buttons',
    PROGRESS_BAR: 'progress-bar',
});

function queryRequiredElement(selector, parent = document) {
    const element = parent.getElementById(selector);
    if (!element) {
        throw new Error(`Critical UI element not found: #${selector}`);
    }
    return element;
}

const UI_ELEMENTS = {
    inputForm: queryRequiredElement("input-form"),
    nameInput: queryRequiredElement("name-input"),
    submitButton: queryRequiredElement("submit-button"),
    restartButton: queryRequiredElement("restart-button"),
    exportButton: queryRequiredElement("export-button"),
    characterDisplay: {
        container: queryRequiredElement("character-display"),
        name: queryRequiredElement("char-name-heading"),
        age: queryRequiredElement("char-age"),
        level: queryRequiredElement("char-level"),
        race: queryRequiredElement("char-race"),
        role: queryRequiredElement("char-role"),
        region: queryRequiredElement("char-region"),
        guild: queryRequiredElement("char-guild"),
        faction: queryRequiredElement("char-faction"),
        skillsList: queryRequiredElement("char-skills-list"),
        titlesList: queryRequiredElement("char-titles-list"),
    },
    statElements: {},
    specialPowerElements: {
        tabContainer: queryRequiredElement('special-powers-tab-container'),
        divinePower: { container: queryRequiredElement('divinePower-container'), bar: queryRequiredElement('char-divinePower-bar'), value: queryRequiredElement('char-divinePower-value') },
        darkEnergy: { container: queryRequiredElement('darkEnergy-container'), bar: queryRequiredElement('char-darkEnergy-bar'), value: queryRequiredElement('char-darkEnergy-value') },
        elementalPower: { container: queryRequiredElement('elementalPower-container'), bar: queryRequiredElement('char-elementalPower-bar'), value: queryRequiredElement('char-elementalPower-value') },
        draconicPower: { container: queryRequiredElement('draconicPower-container'), bar: queryRequiredElement('char-draconicPower-bar'), value: queryRequiredElement('char-draconicPower-value') },
        stealthPower: { container: queryRequiredElement('stealthPower-container'), bar: queryRequiredElement('char-stealthPower-bar'), value: queryRequiredElement('char-stealthPower-value') },
    },
    currentYear: queryRequiredElement("current-year"),
};

function createStatProgressBarHTML(statKey, statLabel) {
    return `
        <div class="stat-container mb-3">
            <strong data-tooltip-key="${statKey}" id="label-${statKey}">${statLabel}</strong>
            <div class="progress" role="progressbar" aria-labelledby="label-${statKey}" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                <div class="progress-bar" id="char-${statKey}-bar"></div>
                <span class="progress-bar-text" id="char-${statKey}-value">0</span>
            </div>
        </div>
    `;
}

function initializeStatPanels() {
    const { STAT_CATEGORIES } = GENERATION_CONSTANTS.STATS;
    const statPanels = document.querySelectorAll('[data-stat-panel]');

    statPanels.forEach(panel => {
        const category = panel.dataset.statPanel;
        const statKeys = STAT_CATEGORIES[category];
        if (!statKeys) return;

        // Exclude primary resources from dynamic generation in the 'resource' tab
        const filteredKeys = statKeys.filter(key => !['health', 'mana', 'stamina', 'dps'].includes(key));

        const needsTwoColumns = ['base', 'combat', 'defensive', 'utility'].includes(category);
        if (needsTwoColumns) {
            const halfway = Math.ceil(filteredKeys.length / 2);
            const col1Keys = filteredKeys.slice(0, halfway);
            const col2Keys = filteredKeys.slice(halfway);

            const col1HTML = col1Keys.map(key => createStatProgressBarHTML(key, APP_CONFIG.STAT_LABELS[key] || key)).join('');
            const col2HTML = col2Keys.map(key => createStatProgressBarHTML(key, APP_CONFIG.STAT_LABELS[key] || key)).join('');

            panel.innerHTML = `
                <div class="row g-3">
                    <div class="col-12 col-md-6">${col1HTML}</div>
                    <div class="col-12 col-md-6">${col2HTML}</div>
                </div>
            `;
        } else {
            panel.innerHTML = filteredKeys.map(key => createStatProgressBarHTML(key, APP_CONFIG.STAT_LABELS[key] || key)).join('');
        }
    });
}

function populateStatElements() {
    UI_ELEMENTS.statElements.health = { bar: queryRequiredElement("char-health-bar"), value: queryRequiredElement("char-health-value") };
    UI_ELEMENTS.statElements.mana = { bar: queryRequiredElement("char-mana-bar"), value: queryRequiredElement("char-mana-value") };
    UI_ELEMENTS.statElements.stamina = { bar: queryRequiredElement("char-stamina-bar"), value: queryRequiredElement("char-stamina-value") };
    UI_ELEMENTS.statElements.dps = queryRequiredElement("char-dps-value");

    for (const statKey of Object.keys(APP_CONFIG.STAT_TYPES)) {
        if (!UI_ELEMENTS.statElements[statKey]) {
            const bar = document.getElementById(`char-${statKey}-bar`);
            const value = document.getElementById(`char-${statKey}-value`);
            if (bar && value) {
                UI_ELEMENTS.statElements[statKey] = { bar, value };
            }
        }
    }
}

function setTextContent(element, text) {
    element.textContent = text?.toString() ?? "N/A";
}

function updateProgressBar(elements, value, maxValue, isPrimaryResource = false) {
    if (!elements?.bar || !elements.value) return;

    const sanitizedValue = Math.max(0, Math.floor(value));
    const percentage = maxValue > 0 ? (sanitizedValue / maxValue) * 100 : 0;
    const clampedPercentage = Math.min(100, percentage);

    elements.bar.style.width = `${clampedPercentage}%`;
    const parentProgress = elements.bar.parentElement;
    parentProgress.setAttribute('aria-valuenow', sanitizedValue.toString());
    parentProgress.setAttribute('aria-valuemax', maxValue.toString());

    const text = isPrimaryResource ? `${sanitizedValue} / ${maxValue}` : sanitizedValue.toString();
    setTextContent(elements.value, text);

    const shouldInvertTextColor = clampedPercentage < APP_CONFIG.PROGRESS_TEXT_COLOR_THRESHOLD_PERCENT;
    elements.value.classList.toggle(CSS_CLASSES.TEXT_ON_DARK, shouldInvertTextColor);
}

function populateList(listElement, items) {
    if (!items || items.length === 0) {
        const li = document.createElement('li');
        li.className = 'item-tag rank-none';
        li.textContent = 'None';
        listElement.replaceChildren(li);
        return;
    }

    const fragment = document.createDocumentFragment();
    for (const { name, rank } of items) {
        const li = document.createElement('li');
        li.className = `item-tag rank-${rank.toLowerCase()}`;

        const nameSpan = document.createElement('span');
        nameSpan.className = 'item-name';
        setTextContent(nameSpan, name);

        const rankSpan = document.createElement('span');
        rankSpan.className = 'item-rank';
        setTextContent(rankSpan, rank);

        li.append(nameSpan, rankSpan);
        fragment.appendChild(li);
    }
    listElement.replaceChildren(fragment);
}

function renderAllStats(stats, specialPowers) {
    // Render primary resource bars
    updateProgressBar(UI_ELEMENTS.statElements.health, stats.resource.health, stats.resource.health, true);
    updateProgressBar(UI_ELEMENTS.statElements.mana, stats.resource.mana, stats.resource.mana, true);
    updateProgressBar(UI_ELEMENTS.statElements.stamina, stats.resource.stamina, stats.resource.stamina, true);
    setTextContent(UI_ELEMENTS.statElements.dps, `${stats.combat.dps.min} - ${stats.combat.dps.max}`);

    // Flatten all other stats for easier iteration
    const allStats = { ...stats.base, ...stats.resource, ...stats.combat, ...stats.defensive, ...stats.utility };
    delete allStats.health;
    delete allStats.mana;
    delete allStats.stamina;
    delete allStats.dps;

    // Render secondary stat bars
    for (const [key, value] of Object.entries(allStats)) {
        const ui = UI_ELEMENTS.statElements[key];
        if (ui && typeof value === 'number') {
            const statType = APP_CONFIG.STAT_TYPES[key] || 'NUMBER';
            const maxValue = APP_CONFIG.STAT_BAR_MAX_VALUES[statType];
            updateProgressBar(ui, value, maxValue);
        }
    }

    // Render special powers
    const hasSpecialPowers = specialPowers && Object.keys(specialPowers).length > 0;
    UI_ELEMENTS.specialPowerElements.tabContainer.classList.toggle(CSS_CLASSES.DISPLAY_NONE, !hasSpecialPowers);
    Object.values(UI_ELEMENTS.specialPowerElements).forEach(power => power.container?.classList.add(CSS_CLASSES.DISPLAY_NONE));

    if (hasSpecialPowers) {
        for (const [powerName, value] of Object.entries(specialPowers)) {
            const powerElements = UI_ELEMENTS.specialPowerElements[powerName];
            if (powerElements?.container) {
                const statType = APP_CONFIG.STAT_TYPES[powerName] || 'NUMBER';
                const maxValue = APP_CONFIG.STAT_BAR_MAX_VALUES[statType];
                updateProgressBar(powerElements, value, maxValue);
                powerElements.container.classList.remove(CSS_CLASSES.DISPLAY_NONE);
            }
        }
    }
}

function renderCharacterSheet(characterData) {
    const { name, age, level, race, role, region, guild, faction, stats, specialPowers, skills, titles } = characterData;
    const display = UI_ELEMENTS.characterDisplay;

    setTextContent(display.name, name);
    setTextContent(display.age, age);
    setTextContent(display.race, race);
    setTextContent(display.role, role);
    setTextContent(display.region, region);
    setTextContent(display.guild, guild);
    setTextContent(display.faction, faction);

    const isMaxLevel = level === GENERATION_CONSTANTS.LEVEL.MAX;
    display.level.classList.toggle(CSS_CLASSES.LEVEL_MAX, isMaxLevel);
    setTextContent(display.level, isMaxLevel ? 'MAX' : level);

    renderAllStats(stats, specialPowers);
    populateList(display.skillsList, skills);
    populateList(display.titlesList, titles);
}

function resetUI() {
    UI_ELEMENTS.characterDisplay.container.classList.add(CSS_CLASSES.DISPLAY_NONE);
    UI_ELEMENTS.inputForm.classList.remove(CSS_CLASSES.DISPLAY_NONE);

    UI_ELEMENTS.nameInput.value = "";
    UI_ELEMENTS.nameInput.focus();

    UI_ELEMENTS.submitButton.textContent = "Generate Character";
    UI_ELEMENTS.submitButton.disabled = false;

    // Reset progress bars without transition for an instant effect
    document.querySelectorAll(`.${CSS_CLASSES.PROGRESS_BAR}`).forEach(bar => {
        bar.style.transition = 'none';
        bar.style.width = '0%';
    });

    // Reset to the first tab
    if (window.bootstrap) {
        const firstTabButton = document.querySelector('#stat-tabs button[data-bs-toggle="tab"]');
        if (firstTabButton) {
            const tab = window.bootstrap.Tab.getOrCreateInstance(firstTabButton);
            tab.show();
        }
    }
}

function handleCharacterCreation(event) {
    event.preventDefault();
    const name = UI_ELEMENTS.nameInput.value.trim();
    if (!name) {
        UI_ELEMENTS.nameInput.focus();
        return;
    }

    UI_ELEMENTS.submitButton.textContent = "Generating...";
    UI_ELEMENTS.submitButton.disabled = true;

    const delay = getRandomNumber(APP_CONFIG.LOADING_SIMULATION_DELAY_MS.min, APP_CONFIG.LOADING_SIMULATION_DELAY_MS.max);

    setTimeout(() => {
        try {
            const character = generateCharacter(name);
            UI_ELEMENTS.inputForm.classList.add(CSS_CLASSES.DISPLAY_NONE);
            UI_ELEMENTS.characterDisplay.container.classList.remove(CSS_CLASSES.DISPLAY_NONE);

            // This double requestAnimationFrame ensures the browser has painted the initial (0%) state
            // of the progress bars before applying the transition and the final state.
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    document.querySelectorAll(`.${CSS_CLASSES.PROGRESS_BAR}`).forEach(bar => {
                        bar.style.transition = ''; // Re-enable transitions
                    });
                    renderCharacterSheet(character);
                });
            });
        } catch (error) {
            console.error("An unexpected error occurred during character creation:", error);
            alert("A critical error occurred. The application will now reset.");
            resetUI();
        }
    }, delay);
}

function sanitizeFilename(name) {
    const invalidChars = /[<>:"/\\|?*]/g;
    const whitespace = /[\s_]+/g;
    const leadingTrailingHyphens = /^-+|-+$/g;

    const sanitized = name
        .replace(invalidChars, '')
        .replace(whitespace, '-')
        .replace(leadingTrailingHyphens, '');

    return sanitized.slice(0, APP_CONFIG.EXPORT_FILENAME_MAX_LENGTH) || "character-profile";
}

async function handleExport() {
    const displayNode = UI_ELEMENTS.characterDisplay.container;
    if (typeof window.domtoimage === "undefined") {
        console.error("Export prerequisite not met: domtoimage library is missing.");
        alert("Export functionality is currently unavailable.");
        return;
    }

    UI_ELEMENTS.exportButton.disabled = true;
    const characterName = UI_ELEMENTS.characterDisplay.name.textContent || "character";
    const fileName = `${sanitizeFilename(characterName)}-Aetheris-Profile.png`;

    // Temporarily adjust styles to capture the full content without scrollbars
    const originalStyles = {
        overflowY: displayNode.style.overflowY,
        maxHeight: displayNode.style.maxHeight,
        paddingBottom: displayNode.style.paddingBottom,
    };
    displayNode.style.maxHeight = 'none';
    displayNode.style.overflowY = 'visible';
    displayNode.style.paddingBottom = '50px';

    try {
        const dataUrl = await window.domtoimage.toPng(displayNode, {
            quality: APP_CONFIG.EXPORT_IMAGE_QUALITY,
            bgcolor: '#141932', // Ensures background color for transparency
            filter: (element) => !element.classList?.contains(CSS_CLASSES.ACTION_BUTTONS),
        });

        const link = document.createElement("a");
        link.download = fileName;
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        alert("Character sheet exported successfully!");
    } catch (error) {
        console.error("Export to PNG failed:", error);
        alert("Sorry, the character sheet could not be exported.");
    } finally {
        // Restore original styles and re-enable the button
        displayNode.style.overflowY = originalStyles.overflowY;
        displayNode.style.maxHeight = originalStyles.maxHeight;
        displayNode.style.paddingBottom = originalStyles.paddingBottom;
        UI_ELEMENTS.exportButton.disabled = false;
    }
}

function initializeTooltips() {
    if (!window.bootstrap?.Tooltip) return;

    // Initialize existing tooltips and new ones on dynamically generated content
    const tooltipTriggerElements = document.querySelectorAll('[data-tooltip-key]');
    tooltipTriggerElements.forEach(element => {
        const key = element.dataset.tooltipKey;
        if (tooltipContent && tooltipContent[key]) {
            new window.bootstrap.Tooltip(element, { title: tooltipContent[key] });
        }
    });
}

function bindEventListeners() {
    UI_ELEMENTS.inputForm.addEventListener("submit", handleCharacterCreation);
    UI_ELEMENTS.restartButton.addEventListener("click", resetUI);
    UI_ELEMENTS.exportButton.addEventListener("click", handleExport);
}

function initializeApp() {
    try {
        initializeStatPanels();
        populateStatElements();
        bindEventListeners();
        setTextContent(UI_ELEMENTS.currentYear, new Date().getFullYear());
        resetUI();
        initializeTooltips();
    } catch (error) {
        console.error("Failed to initialize application:", error);
        document.body.innerHTML = `<p style='color: white; text-align: center; padding: 2rem;'>Error: Application failed to load critical components. Please check the console for details.</p>`;
    }
}

document.addEventListener("DOMContentLoaded", initializeApp);
