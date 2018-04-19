function sortOutputs(outputs) {
  let result = new Array();
  for (let i = 0; i < outputs.length; i++) {
    result.push({
      index: i,
      value: outputs[i]
    });
  }
  result.sort(function (a, b) {
    return ((a.value < b.value) ? 1 : ((a.value == b.value) ? 0 : -1));
  });
  return result.map(a => a.index);
}

function findClosest(player, blocks) {
  let closest = Infinity;
  for (let block of blocks) {
    let distance = pow(player.position.x - block.position.x, 2) + pow(player.position.y - block.position.y, 2);
    if (distance < closest) {
      closest = block;
    }
  }
  return closest;
}

function restartGame() {
  blocks = new Array();
  frameCounter = 0;
  deadPlayers = new Array();
}

function saveBest() {
  highestScore = alivePlayers[0].score;
  bestPlayer.brain = alivePlayers[0].brain;
}

function downloadObjectAsJson() {
  let dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(bestPlayer.brain.serialize());
  let downloadNN = document.createElement('a');
  downloadNN.setAttribute('href', dataStr);
  downloadNN.setAttribute('download', 'neuralnetwork.json');
  downloadNN.click();
  downloadNN.remove();
}