document.addEventListener('keydown', (e) => {
    const forbiddenKeys = ['F12', 'u', 'U', 'I', 'J'];
    if (e.key === 'F12' || (e.ctrlKey && forbiddenKeys.includes(e.key))) {
        e.preventDefault();
        alert('Developer tools are disabled.');
        window.location.reload();
    }
});

// Anti-inspection warnings
console.warn('%cWARNING!', 'color: red; font-size: 50px;', 'Inspecting this is prohibited.');
console.log('Actions are being monitored.');

(function preventDevTools() {
    const devtools = () => {};
    devtools.toString = () => 'You are not allowed to inspect this!';
    Object.defineProperty(window, 'devtools', {
        get: () => {
            console.warn('%cSTOP!', 'color: red; font-size: 50px;');
            return devtools;
        },
    });
})();

// Importing the character creation logic
import { submitName } from './characterCreation.js';

// Cache frequently used DOM elements for performance
const nameInput = document.getElementById('nameInput');
const submitButton = document.getElementById('submitBtn');
const restartButton = document.getElementById('restartBtn');
const exportButton = document.getElementById('exportBtn');
const characterDisplay = document.getElementById('characterDisplay');

// Helper function to reset the form
const resetForm = () => {
    nameInput.value = '';
    characterDisplay.style.display = 'none';
    restartButton.style.display = 'none';
    submitButton.textContent = 'Start';
    submitButton.disabled = false;
};

// Handle the start action
const handleStart = () => {
    const name = nameInput.value.trim();

    if (!name) {
        alert('Please enter a name before starting.');
        nameInput.focus();
        return;
    }

    submitButton.textContent = 'Loading...';
    submitButton.disabled = true;

    // Simulate loading with a random delay
    const randomDelay = Math.random() * 2000 + 10; // Between 10ms and 2000ms
    setTimeout(() => {
        try {
            submitName(); // Ensure the region is always generated
            characterDisplay.style.display = 'block';
            restartButton.style.display = 'block';
        } catch (error) {
            console.error('Error during character creation:', error);
            alert('An error occurred while generating the character. Please try again.');
        } finally {
            submitButton.textContent = 'Start';
            submitButton.disabled = false;
        }
    }, randomDelay);
};

// Handle the export action
const handleExport = () => {
    const node = characterDisplay;
    const characterName = nameInput.value.trim().replace(/\s+/g, '-');
    const fileName = characterName ? `${characterName}-stats.png` : 'character-stats.png';

    // Temporarily adjust styles for screenshot
    const originalStyles = {
        backgroundImage: node.style.backgroundImage,
        backgroundSize: node.style.backgroundSize,
        backgroundPosition: node.style.backgroundPosition,
        backgroundRepeat: node.style.backgroundRepeat,
        overflow: node.style.overflow,
        maxHeight: node.style.maxHeight,
    };

    node.style.backgroundImage = 'url("img/bg.png")';
    node.style.backgroundSize = 'cover';
    node.style.backgroundPosition = 'center';
    node.style.backgroundRepeat = 'no-repeat';
    node.style.overflow = 'visible';
    node.style.maxHeight = 'none';

    // Use dom-to-image to capture and export the character display as an image
    domtoimage
        .toPng(node)
        .then((dataUrl) => {
            const link = document.createElement('a');
            link.download = fileName;
            link.href = dataUrl;
            link.click();

            // Revert styles after capture
            Object.keys(originalStyles).forEach((key) => {
                node.style[key] = originalStyles[key];
            });
        })
        .catch((error) => {
            console.error('Export failed:', error);
        });
};

// Log all console messages for monitoring
const logConsoleMessages = () => {
    const oldConsoleLog = console.log;
    console.log = (message) => {
        oldConsoleLog(message);
        // Add additional logging to a server or storage here if needed
    };
};
logConsoleMessages();

// Event listeners for interactions
submitButton.addEventListener('click', handleStart);
restartButton.addEventListener('click', resetForm);
exportButton.addEventListener('click', handleExport);
nameInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent default form submission
        handleStart();
    }
});