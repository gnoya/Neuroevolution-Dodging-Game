class Player {
  constructor(x, y, width, height) {
    this.position = createVector(x, y);
    this.width = width;
    this.height = height;
  }

  crashed(array) {
    for (let element of array) {
      if (abs(this.position.x - element.position.x) <= this.width / 2 + element.width / 2 && abs(this.position.y - element.position.y) <= this.height / 2 + element.height / 2) {
        return true;
      }
    }
    return false;
  }

  right() {
    this.position.x = constrain(this.position.x + targetSpeed, this.width / 2, width - this.width / 2);
  }

  left() {
    this.position.x = constrain(this.position.x - targetSpeed, this.width / 2, width - this.width / 2);
  }

  show() {
    fill(255);
    rect(this.position.x, this.position.y, this.width, this.height);
  }
}