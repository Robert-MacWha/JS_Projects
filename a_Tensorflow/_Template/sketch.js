//Create a model: m = tf.sequential();
//Add layers: m.add(tf.layers.dense({CONFIG}));
//Compile the model: m.compile({LOSS, OPTIMISER});
//Train it: m.fit(xs, ys);
//Get a prediction: m.predict(xs).dataSync();

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(21);
}