import { router, socket } from "../routes.js";

export default function renderScreen1() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <div id="scoreboard">
      <h1>Puntuación</h1>
      <div id="players-container"></div>
    </div>
  `;

  const playersContainer = document.getElementById("players-container");
  
  // Listen for scoreData event from the server and update the player scores
  socket.on("scoreData", (data) => {
    // Clear the players container
    playersContainer.innerHTML = "";

    // Iterate over the players' data and create divs for each player with their score
    data.players.forEach((player) => {
      const playerDiv = document.createElement("div");
      playerDiv.classList.add("player");
      playerDiv.innerHTML = `
        <p>${player.nickname} Puntos: ${player.score}</p>
      `;
      playersContainer.appendChild(playerDiv);
    });
  });

  // Listen for the gameWon event and navigate to the results screen
  socket.on("gameWon", (data) => {
    router.navigateTo('/screen2'); // Navigate to screen 2 when the game is won
  });
}