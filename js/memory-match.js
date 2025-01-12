let gameBoard = document.getElementById('game-board');
let gridSizeButtons = document.querySelectorAll('.grid-size');
let hintButton = document.querySelector('.hint-button');
let firstCard = null;
let secondCard = null;
let isFlipping = false;
let matchedPairs = 0;
let hintUsed = false;
let currentGridSize = 4;

const images = [
    '🍎', '🍌', '🍒', '🍓', '🍉', '🍇', '🍍', '🍊', 
    '🍓', '🍒', '🍊', '🍉', '🍇', '🍎', '🍍', '🍌',
    '🐶', '🐱', '🐭', '🐰', '🦊', '🐻', '🐼', '🐨',
    '🦁', '🐯', '🐸', '🐵', '🐧', '🐔', '🦄', '🐷'
];

function startGame(gridSize) {
    gameBoard.innerHTML = '';
    matchedPairs = 0;
    hintUsed = false;
    hintButton.disabled = false;
    currentGridSize = gridSize;

    let shuffledImages = shuffleArray(images.slice(0, gridSize * gridSize / 2));
    shuffledImages = [...shuffledImages, ...shuffledImages];
    shuffledImages = shuffleArray(shuffledImages);

    gameBoard.style.gridTemplateColumns = `repeat(${gridSize}, 100px)`;

    shuffledImages.forEach((image) => {
        let card = document.createElement('div');
        card.classList.add('card');
        card.dataset.image = image;
        card.innerHTML = '';
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });

    // Trigger animation after the game grid is generated
    setTimeout(() => {
        gameBoard.classList.add('animate-in');
        document.querySelector('.game-container').classList.add('animate-in');
    }, 50);  // Slight delay for the animation
}

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

function flipCard() {
    if (isFlipping || this.classList.contains('flipped') || matchedPairs === images.length / 2) return;

    this.classList.add('flipped');
    this.innerHTML = this.dataset.image;

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;

    if (firstCard.dataset.image === secondCard.dataset.image) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchedPairs++;
        resetCards();
    } else {
        isFlipping = true;
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            firstCard.innerHTML = '';
            secondCard.classList.remove('flipped');
            secondCard.innerHTML = '';
            resetCards();
        }, 1000);
    }
}

function resetCards() {
    firstCard = null;
    secondCard = null;
    isFlipping = false;
}

function showHint() {
    if (hintUsed) return;

    hintUsed = true;
    hintButton.disabled = true;

    let allCards = document.querySelectorAll('.card');
    allCards.forEach(card => {
        card.classList.add('flipped');
        card.innerHTML = card.dataset.image;
    });

    setTimeout(() => {
        allCards.forEach(card => {
            card.classList.remove('flipped');
            card.innerHTML = '';
        });
    }, 1000);
}

gridSizeButtons.forEach(button => {
    button.addEventListener('click', () => {
        let gridSize = parseInt(button.textContent);
        startGame(gridSize);
    });
});

startGame(4); // Default to 4x4 grid at first
