const assignRoles = (players) => {
  let shuffled = players.sort(() => 0.5 - Math.random())
  shuffled[0].role = "marco"
  shuffled[1].role = "polo-especial"
  for (let i = 2; i < shuffled.length; i++) {
    shuffled[i].role = "polo"
  }
  return shuffled
}

const assignScore = (players) => {
  players.forEach(element => {
    
  });
}

const poloScore = (winner) => {
  const poloWin = 10
  const poloLose = -10

  if(winner == "polo"){
    return poloWin;
  } else{}
    return poloLose;
}


const marcoScore = (winner) => {
  const marcoWin = 50
  const marcoLose = -10

  if(winner == "polo"){
    return marcoWin;
  } else{}
    return marcoLose;
}

module.exports = { assignRoles, assignScore }
