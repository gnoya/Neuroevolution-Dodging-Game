// Gameplay variables.
const blockWidth = 100;
const blockHeight = 50;
const playerSize = 25;
const blockSpeed = 8;
const targetSpeed = 4;
const blockInterval = 40;
let frameCounter = 0;

// Neural Network constants.
const inputNodes = 4;
const hiddenNodes = 4;
const outputNodes = 3;

// Genetic Algorithms variables.
const totalPopultation = 350;
const mutationRate = 0.05;
let generation = 0;
let averageScore = 0;
let highestScore = 0;
let bestPlayer;

// DOM variables.
let slider;
let generationText;

let blocks = new Array();
let alivePlayers = new Array();
let deadPlayers = new Array();

function setup() {
  frameRate(60);
  let canvas = createCanvas(800, 600);
  canvas.parent('canvasContainer');

  // DOM elements.
  slider = select('#slider');
  speedText = select('#speed');
  generationText = select('#generation');
  currentScoreText = select('#currentScore');
  averageScoreText = select('#averageScore');
  highestScoreText = select('#highestScore');
  checkBox = select('#checkBox');
  showBest = select('#showBest');

  rectMode(CENTER);
  // Initial population.
  for (let i = 0; i < totalPopultation; i++) {
    alivePlayers.push(new Player());
  }
}

function draw() {
  for (let i = 0; i < slider.value(); i++) {
    // Every 'blockInterval' frames generate a new block.
    if (frameCounter % blockInterval == 0) {
      blocks.push(new Block(random(width), 0, blockWidth, blockHeight, 0, blockSpeed));
    }
    frameCounter++;

    // Check for every offscreen block.
    for (let block of blocks) {
      block.update();
      if (block.offScreen()) {
        blocks.splice(blocks.indexOf(block), 1);
      }
    }

    // Show best.
    if (showBest.checked()) {
      if (bestPlayer.crashed(blocks)) {
        bestPlayer = new Player(bestPlayer.brain);
        restartGame();
      }
      else {
        let closest = findClosest(bestPlayer, blocks);
        bestPlayer.act(closest);
      }
    }
    else {
      // Check if a player crashed and act if not.
      for (let i = alivePlayers.length - 1; i >= 0; i--) {
        if (alivePlayers[i].crashed(blocks)) {
          deadPlayers.push(alivePlayers.splice(i, 1)[0]);
        }
        else {
          let closest = findClosest(alivePlayers[i], blocks);
          alivePlayers[i].act(closest);
        }
      }
    }

    currentScoreText.html(frameCounter);
    speedText.html(slider.value());

    // If every player died.
    if (alivePlayers.length == 0) {
      nextGeneration();
      generationText.html(++generation);
      averageScoreText.html(averageScore.toFixed(2));
      highestScoreText.html(highestScore);
    }
  }

  // Draw in screen.
  if (!checkBox.checked()) {
    background(220);

    if (showBest.checked()) {
      bestPlayer.show();
    }
    else {
      for (let player of alivePlayers) {
        player.show();
      }
    }

    for (let block of blocks) {
      block.show();
    }
  }
}