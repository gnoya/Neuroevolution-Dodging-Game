// Gameplay variables.
const blockWidth = 250;
const blockHeight = 50;
const playerSize = 25;
const blockSpeed = 16;
const targetSpeed = 4;
const blockInterval = 30;
let frameCounter = 0;

// Neural Network constants.
const inputNodes = 8;
const hiddenNodes = 5;
const outputNodes = 3;

// Genetic Algorithms variables.
const totalPopultation = 20;
const mutationRate = 0.02;
let generation = 1;

let blocks = new Array();
let alivePlayers = new Array();
let deadPlayers = new Array();

function setup() {
  createCanvas(800, 800);
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

  for (let player of alivePlayers) {
    let tempArray = alivePlayers.slice(0);
    if (player.crashed(blocks)) {
      deadPlayers.push(alivePlayers.splice(alivePlayers.indexOf(player), 1)[0]);
    }
    if (blocks.length >= 2) {
      let closestBlocks = find2Closest(player, blocks);
      player.act(closestBlocks.closest, closestBlocks.secondClosest);
    }
  }

  if (frameCounter % blockInterval == 0) {
    blocks.push(new Block(random(width), 0, blockWidth, blockHeight, 0, blockSpeed));
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