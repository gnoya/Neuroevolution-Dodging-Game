const blockWidth = 100;
const blockHeight = 50;
const playerSize = 25;
const blockSpeed = 4;
const targetSpeed = 4;
const frameInterval = 50;

const totalPopultation = 300;

let blocks = new Array();
let players = new Array();
let backupPlayers = new Array();

function setup() {
  createCanvas(800, 800);
  rectMode(CENTER);
  for(let i = 0; i < totalPopultation; i++) {
    players.push(new Player(400, 750, playerSize, playerSize));
  }
  backupPlayers = players.slice(0);
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

  for (let player of players) {
    if (player.crashed(blocks)) {
      players.splice(players.indexOf(player), 1);
    }
    if(blocks.length){
      player.act(blocks[0]);
    }
    
    player.show();
  }

  if (frameCount % frameInterval == 0) {
    blocks.push(new Block(width*random(1), 0, blockWidth, blockHeight, 0, 5));
  }

  if(players.length == 0){
    nextGeneration();
  }

}

function keyPressed() {
  if (keyCode == LEFT_ARROW) {
    players[0].left();
  }
  else if (keyCode == RIGHT_ARROW) {
    players[0].right();
  }
}