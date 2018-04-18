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

  offScreen(){
    if(this.position.x + this.width / 2 < 0 || this.position.x - this.width / 2 > width || this.position.y + this.height / 2 > height || this.position.y + this.height / 2 < 0){
      return true;
    }
    return false;
  }

  show() {
    fill(0);
    rect(this.position.x, this.position.y, this.width, this.height);
  }
}