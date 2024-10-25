const { assignRoles, assignScore, scoreEvaluator3000 } = require("../utils/helpers")

// Assuming db and io are required or passed in some way to be accessible
const joinGameHandler = (socket, db, io) => {
  return (user) => {
    db.players.push({ id: socket.id, ...user, score: 0 }) // Added score initialization
    console.log(db.players)
    io.emit("userJoined", db) // Broadcasts the message to all connected clients including the sender
    io.emit("scoreData",  db)
  }
}

const startGameHandler = (socket, db, io) => {
  return () => {
    db.players = assignRoles(db.players)

    db.players.forEach((element) => {
      io.to(element.id).emit("startGame", element.role)
    })
  }
}

const notifyMarcoHandler = (socket, db, io) => {
  return () => {
    const rolesToNotify = db.players.filter(
      (user) => user.role === "polo" || user.role === "polo-especial"
    )

    rolesToNotify.forEach((element) => {
      io.to(element.id).emit("notification", {
        message: "Marco!!!",
        userId: socket.id,
      })
    })
  }
}

const notifyPoloHandler = (socket, db, io) => {
  return () => {
    const rolesToNotify = db.players.filter((user) => user.role === "marco")

    rolesToNotify.forEach((element) => {
      io.to(element.id).emit("notification", {
        message: "Polo!!",
        userId: socket.id,
      })
    })
  }
}

const onSelectPoloHandler = (socket, db, io) => {
  return (userID) => {
    const myUser = db.players.find((user) => user.id === socket.id)
    const poloSelected = db.players.find((user) => user.id === userID)
    
    let winner;
    if (poloSelected.role === "polo-especial") {
      // Marco wins the round
      winner = "marco";

      // Notify all players that Marco won
      db.players.forEach((element) => {
        io.to(element.id).emit("notifyGameOver", {
          message: `El marco ${myUser.nickname} ha ganado, ${poloSelected.nickname} ha sido capturado`,
        })
      })
    } else {
      // Polo wins the round
      winner = "polo";

      // Notify all players that Polo won
      db.players.forEach((element) => {
        io.to(element.id).emit("notifyGameOver", {
          message: `El marco ${myUser.nickname} ha perdido`,
        })
      })
    }

    // Update scores for players
    db.players = assignScore(db.players, winner, io);

    // Evaluate if any player has won the game (score >= 100)
    scoreEvaluator3000(db, io);
  }
}

const requestPlayersInfoHandler = (socket, db, io) => {
  console.log("FUCKYUO")
  return () => {
    const winner = db.winner
    const players = db.players
    io.emit("getPlayersInfo", winner, players)
  }
}


module.exports = {
  joinGameHandler,
  startGameHandler,
  notifyMarcoHandler,
  notifyPoloHandler,
  onSelectPoloHandler,
  requestPlayersInfoHandler,
}