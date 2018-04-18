// Gameplay variables.
const blockWidth = 100;
const blockHeight = 50;
const playerSize = 25;
const blockSpeed = 10;
const targetSpeed = 4;
const blockInterval = 30;
let frameCounter = 0;

// Neural Network constants.
const inputNodes = 8;
const hiddenNodes = 5;
const outputNodes = 3;

// Genetic Algorithms variables.
const totalPopultation = 5;
const mutationRate = 0.02;
let generation = 1;

let blocks = new Array();
let alivePlayers = new Array();
let deadPlayers = new Array();

function setup() {
  createCanvas(800, 600);
  rectMode(CENTER);
  for (let i = 0; i < totalPopultation; i++) {
    alivePlayers.push(new Player());
  }
}

function draw() {
  background(220);
  for (let block of blocks) {
    block.update();
    if (block.offScreen()) {
      blocks.splice(blocks.indexOf(block), 1);
    }
  }

  for (let i = alivePlayers.length - 1; i >= 0; i--) {
    if (alivePlayers[i].crashed(blocks)) {
      deadPlayers.push(alivePlayers.splice(i, 1)[0]);
    }
    else if (blocks.length >= 2) {
      let closestBlocks = find2Closest(alivePlayers[i], blocks);
      alivePlayers[i].act(closestBlocks.closest, closestBlocks.secondClosest);
    }
  }

  if (frameCounter % blockInterval == 0) {
    // The range of the random allows to create more blocks at the edges of the canvas.
    blocks.push(new Block(random(-1/3 * blockWidth, width + 1/3 * blockWidth), 0, blockWidth, blockHeight, 0, blockSpeed));
  }

  if (alivePlayers.length == 0) {
    nextGeneration();
  }
  frameCounter++;

  for (let player of alivePlayers) {
    player.show();
  }

  for (let block of blocks) {
    block.show();
  }
}