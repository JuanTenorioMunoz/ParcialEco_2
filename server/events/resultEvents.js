const db = require("../db")
const { requestPlayersInfoHandler } = require("../event-handlers/resultHandlers")


const resultEvents = (socket, io) => {
  socket.on("requestPlayerInfo", requestPlayersInfoHandler(socket, db, io))
}

module.exports = { resultEvents }
