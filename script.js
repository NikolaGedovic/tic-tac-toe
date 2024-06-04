function getPlayerNames(event) {
  event.preventDefault(); // Prevent form from submitting

  const player1 = document.getElementById('player-1').value.trim();
  const player2 = document.getElementById('player-2').value.trim();

  if (player1 === "" || player2 === "") {
    alert("Please enter names for both players.");
    return false;
  }

  // Store player names in localStorage to access on game.html
  localStorage.setItem('player1', player1);
  localStorage.setItem('player2', player2);

  // Redirect to game.html
  window.location.href = "/game.html";
  return false;
}
