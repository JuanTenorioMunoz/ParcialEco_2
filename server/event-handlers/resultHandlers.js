
const requestPlayersInfoHandler = (socket, db, io) => {
  return () => {
    console.log("OK")
    const winner = db.winner
    const players = db.players
    io.emit("getPlayersInfo", winner, players)
  }
}

module.exports = {
  requestPlayersInfoHandler
}