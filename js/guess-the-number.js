let randomNumber;
let attempts = 0;
let minRange, maxRange;
let hintUsed = false;

const minRangeInput = document.getElementById('min-range');
const maxRangeInput = document.getElementById('max-range');
const setRangeButton = document.getElementById('set-range');
const guessSection = document.getElementById('guess-section');
const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const message = document.getElementById('message');
const attemptsDisplay = document.getElementById('attempts');
const resetButton = document.getElementById('reset');
const rangeDisplay = document.getElementById('range-display');
const hintButton = document.getElementById('hint');
const rangeErrorMessage = document.getElementById('range-error-message');

// Swipe detection
let touchStartX = 0;

document.getElementById("game-container").addEventListener("touchstart", function(event) {
    touchStartX = event.touches[0].clientX;
});

document.getElementById("game-container").addEventListener("touchend", function(event) {
    let touchEndX = event.changedTouches[0].clientX;
    if (touchStartX - touchEndX > 100) {
        window.location.href = "index.html"; // Redirect on left swipe
    }
});

setRangeButton.addEventListener('click', function() {
    minRange = parseInt(minRangeInput.value);
    maxRange = parseInt(maxRangeInput.value);

    // Ensure positive range values and max range > min range
    if (isNaN(minRange) || isNaN(maxRange) || minRange < 1 || maxRange < 1 || minRange >= maxRange) {
        rangeErrorMessage.textContent = "Please enter a valid range (positive numbers and max > min).";
        rangeErrorMessage.style.display = "block";
        return;
    } else {
        rangeErrorMessage.style.display = "none";
    }

    randomNumber = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
    rangeDisplay.textContent = `${minRange} and ${maxRange}`;
    guessSection.style.display = 'block';
    setRangeButton.disabled = true;
    message.textContent = "Make a guess!";
});

submitButton.addEventListener('click', function() {
    const userGuess = parseInt(guessInput.value);
    attempts++;

    if (userGuess < minRange || userGuess > maxRange || isNaN(userGuess)) {
        message.textContent = `Please enter a number between ${minRange} and ${maxRange}.`;
        message.style.color = "red";
        return;
    }

    if (userGuess === randomNumber) {
        message.textContent = `Congratulations! You guessed the number in ${attempts} attempts!`;
        message.style.color = "green";
        submitButton.disabled = true;
    } else if (userGuess < randomNumber) {
        message.textContent = "Too low! Try again.";
        message.style.color = "orange";
    } else {
        message.textContent = "Too high! Try again.";
        message.style.color = "orange";
    }

    attemptsDisplay.textContent = `Attempts: ${attempts}`;
});

hintButton.addEventListener('click', function() {
    if (hintUsed) {
        message.textContent = "Hint already used!";
        return;
    }
    
    hintUsed = true;
    if (randomNumber % 2 === 0) {
        message.textContent = "Hint: The number is even!";
    } else {
        message.textContent = "Hint: The number is odd!";
    }
    
    // Check if the number is prime
    if (isPrime(randomNumber)) {
        message.textContent += " It is also a prime number!";
    } else {
        message.textContent += " It is not a prime number.";
    }

    message.style.color = "blue";
});

function isPrime(num) {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

resetButton.addEventListener('click', function() {
    minRangeInput.value = '';
    maxRangeInput.value = '';
    guessInput.value = '';
    message.textContent = '';
    attempts = 0;
    attemptsDisplay.textContent = `Attempts: 0`;
    setRangeButton.disabled = false;
    submitButton.disabled = false;
    guessSection.style.display = 'none';
    hintUsed = false;
});
