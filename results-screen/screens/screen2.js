import { router, socket } from "../routes.js";

export default function renderScreen2() {
  const app = document.getElementById("app");
  app.innerHTML = `
        <h1>El ganador es:</h1>
        <div id="winner-container"></div>
        <h1>Puntuación Final</h1>
        <div id="players-container"></div>
    `;

  const winnerContainer = document.getElementById("winner-container");
  const playersContainer = document.getElementById("players-container");


  socket.on("gameWon", (winner, players) => {
    // Display the winner in the winner container
    winnerContainer.innerHTML = `<p>${winner.nickname} - Puntos: ${winner.score}</p>`;

    // Clear the players container
    playersContainer.innerHTML = "";

    // Iterate over the players' data and create divs for each player with their final score
    players.forEach((player) => {
      const playerDiv = document.createElement("div");
      playerDiv.classList.add("player");
      playerDiv.innerHTML = `
        <p>${player.nickname} - Puntos: ${player.score}</p>
      `;
      playersContainer.appendChild(playerDiv);
    });
  });
}

