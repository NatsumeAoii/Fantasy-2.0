// main.js
import { submitName } from './characterCreation.js';

function handleStart() {
    const nameInput = document.getElementById('nameInput').value.trim();
    if (!nameInput) {
        console.error('No name entered'); // Log to console for debugging
        alert('Please enter a name before starting.'); // Alert user
        return; // Stop execution
    }

    const submitButton = document.getElementById('submitBtn');
    submitButton.textContent = 'Loading...';
    submitButton.disabled = true;

    setTimeout(() => {
        submitName(); // This will now only execute if name is provided
        document.getElementById('characterDisplay').style.display = 'block';
        document.getElementById('restartBtn').style.display = 'block';
        submitButton.textContent = 'Start';
        submitButton.disabled = false;
    }, Math.random() * (2000 - 10) + 10); // Use the randomized delay
}

document.getElementById('submitBtn').addEventListener('click', handleStart);

function logConsoleMessages() {
    const oldConsoleLog = console.log;
    console.log = function (message) {
        oldConsoleLog(message);
        // Implement logging to server or storage here
    };
}

logConsoleMessages();

document.getElementById('submitBtn').addEventListener('click', handleStart);

// Function to handle the restart action
function handleRestart() {
    document.getElementById('characterDisplay').style.display = 'none';
    document.getElementById('restartBtn').style.display = 'none';
    document.getElementById('nameInput').value = ''; // Clear the input field
    document.getElementById('submitBtn').textContent = 'Start'; // Reset button text
    document.getElementById('submitBtn').disabled = false; // Enable button
}

document.getElementById('exportBtn').addEventListener('click', function() {
    var node = document.getElementById('characterDisplay');

    // Get the inputted name from the "nameInput" field and replace spaces with hyphens
    var characterName = document.getElementById('nameInput').value.trim().replace(/\s+/g, '-');
    var fileName = characterName ? `${characterName}-stats.png` : 'character-stats.png'; // Use inputted name for file

    // Temporarily add the background image and adjust styles for capture
    node.style.backgroundImage = 'url("img/bg.png")'; // Use the correct path for your background image
    node.style.backgroundSize = 'cover'; // Ensure the background covers the entire element
    node.style.backgroundPosition = 'center'; // Center the background image
    node.style.backgroundRepeat = 'no-repeat'; // Prevent repeating

    // Temporarily adjust the overflow and maxHeight for capturing
    node.style.overflow = 'visible';
    node.style.maxHeight = 'none';

    // Capture the div and download it as PNG
    domtoimage.toPng(node)
        .then(function(dataUrl) {
            var link = document.createElement('a');
            link.download = fileName; // Use the dynamically generated file name with hyphens
            link.href = dataUrl;
            link.click();

            // Revert styles after capture
            node.style.backgroundImage = ''; // Remove background image
            node.style.backgroundSize = '';
            node.style.backgroundPosition = '';
            node.style.backgroundRepeat = '';
            node.style.overflow = 'auto';  // Restore original overflow
            node.style.maxHeight = '70vh';  // Restore original max-height
        })
        .catch(function(error) {
            console.error('oops, something went wrong!', error);
        });
});

document.getElementById('restartBtn').addEventListener('click', handleRestart);

// Detect 'Enter' key press on name input field
document.getElementById('nameInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent the default action to stop from submitting the form
        handleStart(); // Call the start function
    }
});