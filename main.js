const blockWidth = 100;
const blockHeight = 50;
const playerSize = 25;
const blockSpeed = 8;
const targetSpeed = 4;
const blockInterval = 20;

const totalPopultation = 2;
const mutationRate = 0.05;

let blocks = new Array();
let alivePlayers = new Array();
let deadPlayers = new Array();
let frameCounter = 0;

function setup() {
  createCanvas(800, 800);
  rectMode(CENTER);
  for (let i = 0; i < totalPopultation; i++) {
    alivePlayers.push(new Player(playerSize, playerSize, 0));
  }
}

function draw() {
  background(220);
  for (let block of blocks) {
    block.update();
    block.show();
    if (block.offScreen()) {
      blocks.splice(blocks.indexOf(block), 1);
    }
  }

  for (let player of alivePlayers) {
    let tempArray = alivePlayers.slice(0);
    if (player.crashed(blocks)) {
      deadPlayers.push(alivePlayers.splice(alivePlayers.indexOf(player), 1)[0]);
    }
    if (blocks.length) {
      player.act(blocks[0]);
    }

    player.show();
  }

  if (frameCounter % blockInterval == 0) {
    blocks.push(new Block(random(width), 0, blockWidth, blockHeight, 0, blockSpeed));
  }

  if (alivePlayers.length == 0) {
    nextGeneration();
  }
  frameCounter++;
}

// function keyPressed() {
//   if (keyCode == LEFT_ARROW) {
//     players[0].left();
//   }
//   else if (keyCode == RIGHT_ARROW) {
//     players[0].right();
//   }
// }
