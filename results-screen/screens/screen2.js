import { router, socket } from "../routes.js";
import { ultraComplexSortingAlgorithm } from "../../server/utils/helpers.js";

export default function renderScreen2() {
  const app = document.getElementById("app");
  app.innerHTML = `
        <h1>El ganador es:</h1>
        <div id="winner-container"></div>
        <h1>Puntuación Final</h1>
        <button id="sort">Orden alfabético</button>
        <div id="players-container"></div>
    `;

  const winnerContainer = document.getElementById("winner-container");
  const playersContainer = document.getElementById("players-container");
  const sortButton = document.getElementById("sort");

  let playersData = []; // Store players data for sorting

  // Function to render players in the players-container
  const renderPlayers = (players) => {
    // Clear the players container
    playersContainer.innerHTML = "";

    // Iterate over the players' data and create divs for each player with their final score
    players.forEach((player) => {
      const playerDiv = document.createElement("div");
      playerDiv.classList.add("player");
      playerDiv.innerHTML = `<p>${player.nickname} - Puntos: ${player.score}</p>`;
      playersContainer.appendChild(playerDiv);
    });
  };

  // Listen for the gameWon event and populate the winner and players data
  socket.on("gameWon", (winner, players) => {
    winnerContainer.innerHTML = `<p>${winner.nickname} - Puntos: ${winner.score}</p>`;
    playersData = players;
    renderPlayers(playersData);
  });

  sortButton.addEventListener("click", () => {
    const sortedPlayers = ultraComplexSortingAlgorithm(playersData);
    renderPlayers(sortedPlayers);
  });

  
}
