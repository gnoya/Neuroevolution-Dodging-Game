class Block {
  constructor(x, y, width, height, xVelocity, yVelocity) {
    this.position = createVector(x, y);
    this.velocity = createVector(xVelocity, yVelocity);
    this.width = width;
    this.height = height;
  }

  update() {
    this.position.add(this.velocity);
  }

  offScreen() {
    if (this.position.x + this.width / 2 < 0 || this.position.x - this.width / 2 > width || this.position.y + this.height / 2 > height || this.position.y + this.height / 2 < 0) {
      return true;
    }
    return false;
  }

  show() {
    fill(255);
    rect(this.position.x, this.position.y, this.width, this.height);
  }
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