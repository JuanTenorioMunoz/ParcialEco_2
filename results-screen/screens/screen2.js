import { router, socket } from "../routes.js";

export default function renderScreen2() {
  const app = document.getElementById("app");
  app.innerHTML = `
        <h1>El ganador es:</h1>
        <div id="winner-container"></div>
        <h1>Puntuación Final</h1>
        <button id="sort">Orden alfabético</button>
        <div id="players-container"></div>
    `;

  console.log("renderizo")
  const winnerContainer = document.getElementById("winner-container");
  const playersContainer = document.getElementById("players-container");
  const sortButton = document.getElementById("sort");

  let playersData = []; // Store players data for sorting

  // Function to render players in the players-container
  const renderPlayers = (players) => {
    playersContainer.innerHTML = "";

    players.forEach((player) => {
      const playerDiv = document.createElement("div");
      playerDiv.classList.add("player");
      playerDiv.innerHTML = `<p>${player.nickname} - Puntos: ${player.score}</p>`;
      playersContainer.appendChild(playerDiv);
    });
  };

  socket.emit("requestPlayerInfo");

  // Listen for the getPlayersInfo event to add the winner and players data
  socket.on("getPlayersInfo", (winner, players) => {
    console.log("GINT")
    winnerContainer.innerHTML = `<p>${winner.nickname} - Puntos: ${winner.score}</p>`;
    playersData = players;
    renderPlayers(playersData);
    console.log("WINNER" + winner)
    console.log("player" + players)
  });

  const ultraComplexSortingAlgorithm = (players) => {
    return players.sort((a, b) => a.nickname.localeCompare(b.nickname));
  }

  sortButton.addEventListener("click", () => {
    const sortedPlayers = ultraComplexSortingAlgorithm(playersData);
    renderPlayers(sortedPlayers);
  });

  
}
