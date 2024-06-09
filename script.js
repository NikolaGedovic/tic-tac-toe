// Function for player names and to proceed to game page
function getPlayerNames(event) {
  event.preventDefault(); // Prevent form from submitting

  const player1 = document.getElementById('player-1').value.trim();
  const player2 = document.getElementById('player-2').value.trim();

  if (player1 === "" || player2 === "") {
    alert("Please enter names for both players.");
    return false;
  }

  // Display player names on the page
  document.querySelector('.player-1-name').textContent = player1;
  document.querySelector('.player-2-name').textContent = player2;

  // Store player names in localStorage to access on game.html
  localStorage.setItem('player1', player1);
  localStorage.setItem('player2', player2);

  // Redirect to game.html
  window.location.href = "/game.html";
  return false;
}

// Score Function
function score() {
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

// Call the score function on page load
document.addEventListener("DOMContentLoaded", score);
