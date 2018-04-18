function nextGeneration() {
  blocks = new Array();
  frameCounter = 0;
  calculateFitness(deadPlayers);
  naturalSelection(deadPlayers);
  deadPlayers = new Array();
  //noLoop();
}


function calculateFitness(players) {
  let totalScore = 0;
  for(let player of players){
    totalScore += player.score;
  }

  for(let player of players){
    player.fitness = player.score / totalScore;
  }
}

function naturalSelection(players) {
  for(let player of players){
    alivePlayers.push(poolSelection(players));
  }
}

function poolSelection(players) {
  // Start at 0
  let index = 0;

  // Pick a random number between 0 and 1
  let r = random(1);

  // Keep subtracting probabilities until you get less than zero
  // Higher probabilities will be more likely to be fixed since they will
  // subtract a larger number towards zero
  while (r > 0) {
    r -= players[index].fitness;
    // And move on to the next
    index += 1;
  }

  // Go back one
  index -= 1;

  // Make sure it's a copy!
  // (this includes mutation)
  // return players[index].copy();
  return players[index].copy();
}

function crossover() {

}