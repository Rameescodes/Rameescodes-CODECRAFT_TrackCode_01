const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const restartBtn = document.getElementById("restart");

let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]
];

function checkWinner() {
    for (let condition of winningConditions) {
        let [a, b, c] = condition;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            alert(`${currentPlayer} Wins!`);
            gameActive = false;
            return;
        }
    }

    if (!gameState.includes("")) {
        alert("It's a Draw!");
        gameActive = false;
    }
}

function handleCellClick(e) {
    const index = e.target.getAttribute("data-index");

    if (!gameState[index] && gameActive) {
        gameState[index] = currentPlayer;
        e.target.textContent = currentPlayer;
        checkWinner();
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        
        if (currentPlayer === "O") {
            setTimeout(robotMove, 500); // AI Move
        }
    }
}

function robotMove() {
    let emptyCells = gameState.map((cell, idx) => cell === "" ? idx : null).filter(idx => idx !== null);

    if (emptyCells.length > 0) {
        let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        gameState[randomIndex] = "O";
        cells[randomIndex].textContent = "O";
        checkWinner();
        currentPlayer = "X";
    }
}

function restartGame() {
    gameState = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    cells.forEach(cell => cell.textContent = "");
}

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
restartBtn.addEventListener("click", restartGame);
