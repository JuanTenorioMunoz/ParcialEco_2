const assignRoles = (players) => {
  let shuffled = players.sort(() => 0.5 - Math.random())
  shuffled[0].role = "marco"
  shuffled[1].role = "polo-especial"
  for (let i = 2; i < shuffled.length; i++) {
    shuffled[i].role = "polo"
  }
  return shuffled
}

// Call the score functions depending on the player role, using the winner to determine the score. 
const assignScore = (players, winner, io) => {
  players.forEach((player) => {
    if (player.role === "marco") {
      player.score += marcoScore(winner);
    } else if (player.role === "polo" || player.role === "polo-especial") {
      player.score += poloScore(winner);
    }
  })

  io.emit("scoreData", { players });
  return players;
}

// If the player is polo, use poloScore
const poloScore = (winner) => {
  const poloWin = 10
  const poloLose = -10

  return winner === "polo" ? poloWin : poloLose;
}

// If the player is marco, use marcoScore
const marcoScore = (winner) => {
  const marcoWin = 50
  const marcoLose = -10

  return winner === "marco" ? marcoWin : marcoLose;
}

// Use this function every time a round ends, to see if a player score is >=100
const scoreEvaluator3000 = (db, io) => {
  const winner = db.players.find((player) => player.score >= 100);
  console.log(db.players)
  if (winner) {
    db.winner = winner
    console.log("THIS IS WINNIER HELP GOD" + db.winner)
    io.emit("gameWon", winner, db.players)
  }
}

// Sort players by alphabetical order
const ultraComplexSortingAlgorithm = (players) => {
  return players.sort((a, b) => a.nickname.localeCompare(b.nickname));
}

module.exports = { assignRoles, assignScore, scoreEvaluator3000, ultraComplexSortingAlgorithm }