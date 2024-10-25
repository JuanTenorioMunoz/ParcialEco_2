const { gameEvents } = require("./gameEvents")
const { resultEvents } = require("./resultEvents")

const handleEvents = (socket, io) => {
  gameEvents(socket, io)
  //resultEvents(socket, io)
}

module.exports = { handleEvents }
