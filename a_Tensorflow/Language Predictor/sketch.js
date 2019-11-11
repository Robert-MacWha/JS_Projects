//Create a model: m = tf.sequential();
//Add layers: m.add(tf.layers.dense({CONFIG}));
//Compile the model: m.compile({LOSS, OPTIMISER});
//Train it: m.fit(xs, ys);
//Get a prediction: m.predict(xs).dataSync();
const model = tf.sequential();
//Data used for training
const Data = [];
let training_xs = [];
let training_ys = [];
//Config for the model + training
const layerCount = 3;
const layerSize = 50;
const activationFunction = "tanh";
const maxWordLength = 10;
const wordCount = 100;
//English, French, Spanish, Swiss, German, Russian
  //When adding a language make sure it dosn't have any accent
const languages = [0, 2];

//To stop overlapping sessions
let isTraining = false;
//To let the user pause it
let canTrain = false;

//UI
let trainingButton;
let lossText;
let averageLoss = 0;
let epochSlider;
let epochText;
let LRSlider;
let LRText;
let graph = {
  values: [],
  listSize: 50,
  sizex: 400,
  sizey: 150,
  posx: 0,
  posy: 250
};

let userWord = "Press backspace to choose a word!";
let predictButton;
let predictionT;
let predictions = "undefined";

//UI affected vars
let epochSize = 20;
let learningRate = 0.2;

function preload () {
  Data[0] = loadStrings("_English_Training_Data.txt");
  Data[1] = loadStrings("_French_Training_Data.txt");
  Data[2] = loadStrings("_Irish_Training_Data.txt");
}

function setup () {
  createCanvas(400, 400);

  setupData();
  createModel();
  //Setup the ui
  trainingButton = createButton("Activate/Deactivate Training")
  trainingButton.position(23, 35 + height);
  trainingButton.mousePressed(function a() { canTrain = !canTrain; });

  lossText = createP();
  lossText.position(23, 50 + height);

  epochText = createP();
  epochText.position(23, 75 + height);
  epochSlider = createSlider(1, 30, 10);
  epochSlider.position(23, 115 + height);

  LRText = createP();
  LRText.position(23, 135 + height);
  LRSlider = createSlider(5, 50, 10);
  LRSlider.position(23, 175 + height);

  predictionT = createP();
  predictionT.position(80, 130);
  predictionT.style("color", "#ffffff");

  predictButton = createButton("Predict the language!");
  predictButton.position(140, 115);
  predictButton.mousePressed(function b() {
    let pred = predict(userWord);
    //The word was too long
    if (pred == undefined) {
      predictions = "undefined";
    }
    else {
      predictions = pred;
    }
  });
}

function draw () {
  background(40);
  //Only start a training session if one is not in progress
  if (!isTraining && canTrain) {
    isTraining = true;
    trainModel().then(result => {
      calcLoss(result.history.loss);
      isTraining = false;
    });
  }
  //Update the UI
  UI();
}

function keyPressed () {
  //If the backspace key is pressed, reset the word
  if (keyCode == BACKSPACE) {
    userWord = "";
  }
  if (key == "a" 
  || key == "b"
  || key == "c"
  || key == "d"
  || key == "e"
  || key == "f"
  || key == "g"
  || key == "h"
  || key == "i"
  || key == "j"
  || key == "k"
  || key == "l"
  || key == "m"
  || key == "n"
  || key == "o"
  || key == "p"
  || key == "q"
  || key == "r"
  || key == "s"
  || key == "t"
  || key == "u"
  || key == "v"
  || key == "w"
  || key == "x"
  || key == "y"
  || key == "z"
  || key == " ") {
    userWord += key;
  }
}

function UI () {
  //Text + Sliders
  lossText.html("Average Loss: " + averageLoss);
  epochSize = epochSlider.value();
  epochText.html("Epoch per session: " + epochSize);
  learningRate = LRSlider.value()/100;
  LRText.html("Learning Rate: " + learningRate);
  if (canTrain) {
    trainingButton.html("Deactivate Training");
  }
  else {
    trainingButton.html("Activate Training");
  }
  //Graph
  push();
  fill(255);
  stroke(75);
  strokeWeight(5);
  rect(graph.posx, graph.posy, graph.sizex, graph.sizey);
  pop();
  //Create the points and lines
  push();
    stroke(255, 0, 0);
    strokeWeight(2);
    for(let i = 1; i < graph.values.length; i ++) {
      line((i-1)*graph.sizex/graph.listSize, map(graph.values[i-1], 0, 0.05, 250, 400), 
      (i)*graph.sizex/graph.listSize, map(graph.values[i], 0, 0.05, 250, 400));
    }
  pop();
  //User input word
  push();
  fill(255);
  rect(10, 50, 380, 25);
  fill(20);
  textSize(22);
  text(userWord, 15, 70);
  pop();
  predictionT.html(predictionsToLanguage());
  //Title
  push();
  fill(255);
  textSize(35);
  text("Language Detector 2000", 8, 32);
  pop();
}

function trainModel () {
  return model.fit(training_xs, training_ys, {
    shuffle: true,
    epochs: epochSize
  });
} 

function setupData () {
  let index = 0;
  let xs = [];
  let ys = [];
  //Loop over each word
  for(let j = 0; j < wordCount; j ++) {
    //And each language
      //Make sure the word is short enough in all languages
    let isShort = true;
    for(let i = 0; i < languages.length; i ++) {
      if (Data[languages[i]][j].length > maxWordLength) {
        isShort = false;
      }
    }
    //Add it to the data IF the word is short enough inall languages
    if (isShort) {
      for(let i = 0; i < languages.length; i ++) {
        //Set the x to the correct word (array form)
        xs[index] = convertWordToIndex(Data[languages[i]][j]);
        //Set the y to the correct array values (TODO)
        ys[index] = convertLanguageToIndex(i, j);
        //Add to the index (go to the next word)
        index  ++;
      }
    }
  }
  //Convert the xs and ys to tensors
  print(xs);
  training_xs = tf.tensor2d(xs);
  training_ys = tf.tensor2d(ys);
}

function createModel () {
  //Create the network
  model.add(tf.layers.dense({
    inputShape: [(maxWordLength * 27)],
    units: layerSize,
    activation: "tanh"
  }));
  for(let i = 0; i < layerCount; i ++) {
    model.add(tf.layers.dense({
      units: layerSize,
      activation: "tanh"
    }));
  }
  //The output layer
  model.add(tf.layers.dense({
    units: Data.length,
    activation: "tanh"
  }))

  model.compile({
    //Use adagrad or sgd for the optimizer
    optimizer: tf.train.adagrad(learningRate),
    loss: tf.losses.meanSquaredError
  });
}

function convertWordToIndex (input) {
  //Get the word
  let word = input;
  //Set the array to the word's length
  let l = word.length;
  let array = new Array(l);
  //Loop through each letter in the word
  for(let i = 0; i < maxWordLength; i ++) {
    array[i] = new Array(27);
    //Set all other values to 0 (for inputs sake)
    for(let j = 0; j < 27; j ++) {
      array[i][j] = 0;
    }
    //Set all of the array's values to the correct ones
    if (word[i] == "a") { array[i][0] = 1; }
    else if (word[i] == "b") { array[i][1] = 1; }
    else if (word[i] == "c") { array[i][2] = 1; }
    else if (word[i] == "d") { array[i][3] = 1; }
    else if (word[i] == "e") { array[i][4] = 1; }
    else if (word[i] == "f") { array[i][5] = 1; }
    else if (word[i] == "g") { array[i][6] = 1; }
    else if (word[i] == "h") { array[i][7] = 1; }
    else if (word[i] == "i") { array[i][8] = 1; }
    else if (word[i] == "j") { array[i][9] = 1; }
    else if (word[i] == "k") { array[i][10] = 1; }
    else if (word[i] == "l") { array[i][11] = 1; }
    else if (word[i] == "m") { array[i][12] = 1; }
    else if (word[i] == "n") { array[i][13] = 1; }
    else if (word[i] == "o") { array[i][14] = 1; }
    else if (word[i] == "p") { array[i][15] = 1; }
    else if (word[i] == "q") { array[i][16] = 1; }
    else if (word[i] == "r") { array[i][17] = 1; }
    else if (word[i] == "s") { array[i][18] = 1; }
    else if (word[i] == "t") { array[i][19] = 1; }
    else if (word[i] == "u") { array[i][20] = 1; }
    else if (word[i] == "v") { array[i][21] = 1; }
    else if (word[i] == "w") { array[i][22] = 1; }
    else if (word[i] == "x") { array[i][23] = 1; }
    else if (word[i] == "y") { array[i][24] = 1; }
    else if (word[i] == "z") { array[i][25] = 1; }
    else if (word[i] == " ") { array[i][26] = 1; }
  }
  //Now convert it into a 1d array
  let output = [];
  //Loop over each letter
  for(let i = 0; i < array.length; i ++) {
    //And each id
    for(let j = 0; j < array[i].length; j ++) {
      //And push the value to the output
      output.push(array[i][j]);
    }
  }
  //Return the completed array
  return(output);
}

function convertLanguageToIndex (i, j) {
  //The language is I so just create an array of zeros and set element i to 1
  let output = [];
    //Set all items to 0
  for(let i = 0; i < Data.length; i ++) {
    output[i] = 0;
  }
  output[languages[i]] = 1;

  return(output);
}

function calcLoss (lossArray) {
  let loss = 0;
  for(let i = 0; i < lossArray.length; i ++) {
    loss += lossArray[i];
  }
  loss /= lossArray.length;

  averageLoss = loss;
  //Update the graph's data
  graph.values.push(loss);
  if (graph.values.length > graph.listSize) {
    graph.values.splice(0, 1);
  }
}

function predict (word) {
  if (word.length < maxWordLength) {
    let xs = convertWordToIndex(word);
    let inputXS = tf.tensor2d([xs]);
    let outputs;
    tf.tidy(() => {
      outputs = model.predict(inputXS).dataSync();
    });
    return(outputs);
  }
}

function predictionsToLanguage () {
  if (predictions == "undefined") {
    return("The word is a little too long to predict with");
  }
  let max = 0;
  for(let i = 0; i < predictions.length; i ++) {
    if (predictions[i] > max) {
      max = predictions[i];
    }
  }
  if (max == predictions[0]) 
  { return("The word is an English word with a " + round(predictions[0]*100)/100 + " certainty");}
  else if (max == predictions[1]) 
  { return("The word is an French word with a " + round(predictions[1]*100)/100 + " certainty");}
  else if (max == predictions[2]) 
  { return("The word is an Irish word with a " + round(predictions[2]*100)/100 + " certainty");}
}