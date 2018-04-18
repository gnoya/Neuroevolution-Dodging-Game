class Player {
  constructor(brain) {
    this.position = createVector(width / 2, height - playerSize);
    this.width = playerSize;
    this.height = playerSize;
    this.score = 0;
    this.fitness = 0;

    if (brain instanceof NeuralNetwork) {
      this.brain = brain.copy();
    } else {
      this.brain = new NeuralNetwork(inputNodes, hiddenNodes, outputNodes);
    }
  }

  crashed(array) {
    for (let element of array) {
      if ((abs(this.position.x - element.position.x) <= this.width / 2 + element.width / 2)
        && (abs(this.position.y - element.position.y) <= this.height / 2 + element.height / 2)) {
        return true;
      }
    }
    return false;
  }

  copy() {
    return new Player(this.brain);
  }

  right() {
    this.position.x = constrain(this.position.x + targetSpeed, this.width / 2, width - this.width / 2);
  }

  left() {
    this.position.x = constrain(this.position.x - targetSpeed, this.width / 2, width - this.width / 2);
  }

  act(block) {
    this.score++;
    let inputs = new Array();
    inputs[0] = this.position.x / width;
    inputs[1] = block.position.x / width;
    inputs[2] = block.position.y / height;
    inputs[3] = block.width / width;
    let outputs = this.brain.predict(inputs);
    // Sort to see which output is the highest.
    outputs = sortOutputs(outputs);

    switch (outputs[0]) {
      case 0:
        this.left();
        break;
      case 1:
        this.right();
        break;
      default:
        break;
    }
  }

  show() {
    fill(255, 0, 0, 75);
    rect(this.position.x, this.position.y, this.width, this.height);
  }
}

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