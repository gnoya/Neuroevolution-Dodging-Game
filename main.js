const blockSize = 50;
const playerSize = 25;
const blockSpeed = 4;
const targetSpeed = 4;

let blocks = new Array();
let players = new Array();

function setup() {
  createCanvas(800, 800);
  rectMode(CENTER);
  blocks.push(new Block(400, 100, blockSize, blockSize, 0, 5));
  players.push(new Player(400, 700, playerSize, playerSize));
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

  for(let player of players){
    if (player.crashed(blocks)) {
      players.splice(players.indexOf(player), 1);
    }
    player.show();
  }
}

function keyPressed() {
  if (keyCode  == LEFT_ARROW) {
    players[0].left();
  }
  else if (keyCode  == RIGHT_ARROW){
    players[0].right();
  }
}