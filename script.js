// Utility function to capitalize the first letter of a name
function capitalizeFirstLetter(name) {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

// Function for player names and to proceed to game page
function getPlayerNames(event) {
  event.preventDefault(); // Prevent form from submitting

  let player1 = document.getElementById('player-1').value.trim();
  let player2 = document.getElementById('player-2').value.trim();

  if (player1 === "" || player2 === "") {
    alert("Please enter names for both players.");
    return false;
  }

  // Capitalize the first letter of each name
  player1 = capitalizeFirstLetter(player1);
  player2 = capitalizeFirstLetter(player2);

  // Store player names in localStorage to access on game.html
  localStorage.setItem('player1', player1);
  localStorage.setItem('player2', player2);

  // Redirect to game.html
  window.location.href = "/game.html";
  return false;
}

// GameBoard object to handle game state and logic
const gameBoard = {
  board: ["", "", "", "", "", "", "", "", ""],
  currentPlayer: "X",
  initializeGamePage: function () {
    const player1 = localStorage.getItem('player1');
    const player2 = localStorage.getItem('player2');

    if (player1 && player2) {
      document.querySelector('.player-1-name').textContent = player1;
      document.querySelector('.player-2-name').textContent = player2;
    }

    // Initialize scores
    this.score();

    // Initialize game board
    this.initializeGameBoard();
  },
  initializeGameBoard: function () {
    const squares = document.querySelectorAll('.square');

    squares.forEach((square, index) => {
      square.addEventListener('click', () => this.makeMove(index, square));
    });
  },
  makeMove: function (index, square) {
    if (this.board[index] === "") {
      this.board[index] = this.currentPlayer;
      square.textContent = this.currentPlayer;
      if (this.checkWinner()) {
        if (this.currentPlayer === "X") {
          const player1ScoreElement = document.querySelector("#player-1-score");
          player1ScoreElement.innerHTML = parseInt(player1ScoreElement.innerHTML) + 1;
        } else {
          const player2ScoreElement = document.querySelector("#player-2-score");
          player2ScoreElement.innerHTML = parseInt(player2ScoreElement.innerHTML) + 1;
        }
        const squares = document.querySelectorAll('.square');
        squares.forEach(square => {
          square.style.pointerEvents = "none"; // Disable clicks on squares when someone wins
        });
        setTimeout(() => {
          this.resetBoard();
          this.currentPlayer = "X"; // Reset to starting player
          squares.forEach(square => {
            square.style.pointerEvents = "auto"; // Enable clicks on squares after 3 seconds
          });
        }, 3000); // 3 seconds delay
      } else {
        this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
      }
    }
  },
  resetBoard: function () {
    this.board = ["", "", "", "", "", "", "", "", ""];
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {
      square.textContent = "";
    });
  },
  checkWinner: function () {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    return winningCombinations.some(combination => {
      const [a, b, c] = combination;
      return this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c];
    });
  },
  score: function () {
    const player1ScoreElement = document.querySelector("#player-1-score");
    const player2ScoreElement = document.querySelector("#player-2-score");
    const resetButton = document.querySelector(".reset-score-btn");

    // Check if the elements exist before setting their values
    if (player1ScoreElement && player2ScoreElement && resetButton) {
      player1ScoreElement.innerHTML = 0;
      player2ScoreElement.innerHTML = 0;

      resetButton.onclick = () => {
        player1ScoreElement.innerHTML = 0;
        player2ScoreElement.innerHTML = 0;
      };
    }
  }
};

// Initialize the game page if on game.html
document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.endsWith('/game.html')) {
    gameBoard.initializeGamePage();
  }
});
