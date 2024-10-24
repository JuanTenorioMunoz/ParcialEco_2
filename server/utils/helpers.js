const assignRoles = (players) => {
  let shuffled = players.sort(() => 0.5 - Math.random())
  shuffled[0].role = "marco"
  shuffled[1].role = "polo-especial"
  for (let i = 2; i < shuffled.length; i++) {
    shuffled[i].role = "polo"
  }
  return shuffled
}

//call the score functions depending on the player role, using the winner to determine the score. 
const assignScore = (players) => {
  players.forEach(element => {
    
  });
}

//if the player is polo, use poloScore
const poloScore = (winner) => {
  const poloWin = 10
  const poloLose = -10

  if(winner == "polo"){
    return poloWin;
  } else{}
    return poloLose;
}

//if the player is marco, use marcoScore
const marcoScore = (winner) => {
  const marcoWin = 50
  const marcoLose = -10

  if(winner == "marco"){
    return marcoWin;
  } else{}
    return marcoLose;
}


//use this function everytime a round ends, to see if a player score is >=100
const scoreEvaluator3000 = () => {
}

//sort players by alphabetical order
const ultraComplexSortingAlgorithm = () => {
}

module.exports = { assignRoles, assignScore }
