//Create the basic moddle
const networkModdle = tf.sequential();

//Creating extra hidden layers with the config specified above
const hiddenLayer = tf.layers.dense({
    //Place the config object in here for compactness and readability
  units: 4, //The size of the layer (how many nodes/outputs)
  inputShape: [2], //Inpute shape (only required on the first hidden layer)
  activation: "sigmoid", //The equation used to activate a node's output (sin, tanh, sigmoid, eul, more on tensorflow.org/js)
});
const outputLayer = tf.layers.dense({
    //Config
  units: 1,
  activation: "sigmoid"
});

//Add the created layers to the moddle
networkModdle.add(hiddenLayer);
networkModdle.add(outputLayer);

//The config required for compiling the network
const compilerConfig = {
    //Config
  optimizer: tf.train.sgd(0.5), //The function that will change the weights + biases of the network to improve it
    //Other loss functions: absoluteDifference, cosineDistance, logLoss, more on tensorflow.org/js
  loss: tf.losses.meanSquaredError //The function that calculates how good the network currently is
}
//Compile the moddle to create the connect everything and create the network (requires the config)
networkModdle.compile(compilerConfig);

//Get inputs and store them as a tensor2d
const xs = tf.tensor2d([
  //The inputs need to be elements in an array like this so you can send in multiple inputs at once and get multiple predictions
  [0, 0],
  [0.5, 0.5],
  [1, 1]
]);
//Get outputs that are related to the inputs
const ys = tf.tensor2d([
  [1],
  [0.5],
  [0]
]);

train().then(() => {
  console.log("Finished training");
  let predictions = networkModdle.predict(xs);
  predictions.print();
});

//Create an async function to put the await keyword in
async function train () {
  //Train the moddle over multiple iterations (not required)
  for(let i = 0; i < 100; i ++) {
    //Train the network
    const response = await networkModdle.fit(xs, ys, {
      /*Config for the training*/
      shuffle: true, //Randomise the order of the training data
      epochs: 10 //The amount of times it trains per call of the function
    });
    console.log(response.history.loss[0]);
  }
}