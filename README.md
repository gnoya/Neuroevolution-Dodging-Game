# Neuroevolution Dodging Game

## About

## Neural Network
### Model
The neural network model used in this project has one input layer, one hidden layer and one output layer. The input layer receives four different inputs, the hidden layer has four fully connected perceptrons and the output layer gives three outputs. This neural network's diagram, without including the bias neural connections, can be found in the following image.

<p align="center">
  <img src="https://github.com/gnoya/Neuroevolution-Dodging-Game/blob/Readme/results/NeuralNetworkModel.png" width="500">
</p>


'Player.x' refers to X-axis position of the current player. 'Block.x' and 'Block.y' refer to X-axis and Y-axis position of the player's nearest block. Also, 'Block.width' represents the width of that block.

Focusing on output layer, three options are given: move player to the left, move player to the right or don't move at all.

### Initialization
The weights between perceptrons are initialized randomly with values between -1 and 1. The bias weights are also initialized this way.

## Genetic Algorithms
These algorithms were implemented using a population of 350 players and a 0.05 mutation probability rate. The fitness represents how many frames the player lasted without dying. The genes used were the weights of each neural network.

### Fitness
Every frame that a player is alive it scores. Then, when every player has died, every score is added up into a constant. The fitness of a player equals to its score divided by that sum.

### Natural Selection
Based on every player's fitness, a mating pool is created, meaning that players with higher fitness will be more likely picked. To create a new generation of players, two parents are picked randomly from this mating pool. Afterwards, their genes are crossed.

### Crossover

Blablabla
<p align="center">
  <img src="https://github.com/gnoya/Neuroevolution-Dodging-Game/blob/Readme/results/simpleModel.png" width="500">
</p>

Blobloblop

<p align="center">
  <img src="https://github.com/gnoya/Neuroevolution-Dodging-Game/blob/Readme/results/Crossover.png" width="500">
</p>

### Mutation

## Results

Bipbipbipbop

<p align="center">
  <img src="https://github.com/gnoya/Neuroevolution-Dodging-Game/blob/Readme/results/training.png" width="500">
</p>

Blñablalbal

<p align="center">
  <img src="https://github.com/gnoya/Neuroevolution-Dodging-Game/blob/Readme/results/showingBest.png" width="500">
</p>

## Built With

[P5.js](https://github.com/processing/p5.js "P5.js library")

[Toy-Neural-Network-JS](https://github.com/CodingTrain/Toy-Neural-Network-JS "Toy Nerual Network library")
