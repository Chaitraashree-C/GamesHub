document.addEventListener('DOMContentLoaded', () => {
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let opponent = 'human';
    let gameOver = false;

    const boardElement = document.getElementById('board');
    const resultElement = document.getElementById('result');
    const gameResultElement = document.getElementById('game-result');
    const restartButton = document.getElementById('restart-button');
    const opponentSelect = document.getElementById('opponent');
    const symbolSelect = document.getElementById('symbol');

    // Initialize board
    function initBoard() {
        boardElement.innerHTML = '';
        gameBoard.forEach((cell, index) => {
            const cellElement = document.createElement('div');
            cellElement.textContent = cell;
            cellElement.addEventListener('click', () => makeMove(index));
            boardElement.appendChild(cellElement);
        });
    }

    // Handle player's move
    function makeMove(index) {
        if (gameBoard[index] || gameOver) return; // Prevent move if game is over or cell is filled

        gameBoard[index] = currentPlayer; // Make move
        updateBoard();

        if (checkWinner(currentPlayer)) {
            gameResultElement.textContent = `${currentPlayer} Wins!`;
            resultElement.classList.remove('hidden');
            gameOver = true;
        } else if (gameBoard.every(cell => cell)) {
            gameResultElement.textContent = "It's a draw!";
            resultElement.classList.remove('hidden');
            gameOver = true;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            if (opponent === 'machine' && currentPlayer === 'O' && !gameOver) {
                setTimeout(machineMove, 500); // Delays the machine move for a better UX
            }
        }
    }

    // AI (Machine) move
    function machineMove() {
        if (gameOver) return; // Don't make move if game is over

        const availableMoves = gameBoard.map((cell, index) => !cell ? index : null).filter(index => index !== null);
        const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
        gameBoard[randomMove] = 'O';
        currentPlayer = 'X';

        updateBoard();

        if (checkWinner('O')) {
            gameResultElement.textContent = "O Wins!";
            resultElement.classList.remove('hidden');
            gameOver = true;
        }
    }

    // Update board display
    function updateBoard() {
        const cells = boardElement.children;
        gameBoard.forEach((cell, index) => {
            cells[index].textContent = cell;
        });
    }

    // Check winner
    function checkWinner(player) {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];
        return winPatterns.some(pattern =>
            pattern.every(index => gameBoard[index] === player)
        );
    }

    // Restart game
    restartButton.addEventListener('click', () => {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = symbolSelect.value;
        gameOver = false;
        resultElement.classList.add('hidden');
        initBoard();
    });

    // Update game settings
    opponentSelect.addEventListener('change', (e) => {
        opponent = e.target.value;
    });

    symbolSelect.addEventListener('change', (e) => {
        currentPlayer = e.target.value;
    });

    initBoard();
});
