let population = [];
let boidCount = 50;
let boidSize = 1;
//Video Management
let video;
let vScale = 5;
let speed = 20;
let transparency = 10;

let walls = [];

let FOV = 90;
let Range = 100;
let leaderChance = 5;
let useLeaders = false;
let maxAcc = 10;
let maxVel = 5;

let sepStrength = 1;
let aliStrength = 1;
let cohStrength = 0.02;

let rangeSlider, FOVSlider, sepSlider, aliSlider, cohSlider, sizeSlider, speedSlider, transparencySlider;

let rangeT, fovT, sepT, aliT, cohT, sizeT, speedT, transparencyT;

let pauseButton;
let isPaused = false;

function setup() {
  createCanvas(600, 500);
  background(21);
  //Create the boids
  for(let i = 0; i < boidCount; i ++) {
    population[i] = new Boid(random(width), random(height));
  }
  //Create the video
  video = createCapture(VIDEO);
  video.size(width/vScale, height/vScale);
  video.position(23, 518)
  //UI
    //Sliders
  rangeSlider = createSlider(20, 200, 100);
  rangeSlider.position(650, 100);
  FOVSlider = createSlider(15, 180, 90);
  FOVSlider.position(650, 200);
  sepSlider = createSlider(0.1, 20, 5, 0.1);
  sepSlider.position(650, 300);
  aliSlider = createSlider(0.1, 20, 5, 0.1);
  aliSlider.position(650, 400);
  cohSlider = createSlider(0.1, 20, 5, 0.1);
  cohSlider.position(650, 500);
  sizeSlider = createSlider(0.1, 4, 1.5, 0.1);
  sizeSlider.position(800, 100);
  speedSlider = createSlider(1, 20, 1, 1);
  speedSlider.position(800, 200);
  transparencySlider = createSlider(10, 255, 50, 5);
  transparencySlider.position(800, 300);
    //Text
  rangeT = createP("Range: ");
  rangeT.position(650, 50);
  rangeT.style('font-size', '20px');
  fovT = createP("FOV: ");
  fovT.position(650, 150);
  fovT.style('font-size', '20px');
  sepT = createP("Seperation: ");
  sepT.position(650, 250);
  sepT.style('font-size', '20px');
  aliT = createP("Alignment: ");
  aliT.position(650, 350);
  aliT.style('font-size', '20px');
  cohT = createP("Cohesion: ");
  cohT.position(650, 450);
  cohT.style('font-size', '20px');
  sizeT = createP("Boid Size: ");
  sizeT.position(800, 50);
  sizeT.style('font-size', '20px');
  speedT = createP("Sim-Speed: ");
  speedT.position(800, 150);
  speedT.style('font-size', '20px');
  transparencyT = createP("Transparency: ");
  transparencyT.position(800, 250);
  transparencyT.style('font-size', '20px');
  //Button
  pauseButton = createButton("Pause");
  pauseButton.mousePressed (function pause() {
    isPaused = !isPaused;
    if (isPaused) {pauseButton.html("Play");}
    else {pauseButton.html("Pause");}
  });
  pauseButton.position(845, 350);
}

function draw() {
  if (isPaused) {return;}
  //background(21);
  //Update vars
  Range = rangeSlider.value();
  FOV = FOVSlider.value();
  sepStrength = sepSlider.value();
  aliStrength = aliSlider.value();
  cohStrength = cohSlider.value();
  boidSize = sizeSlider.value();
  speed = speedSlider.value();
  transparency = transparencySlider.value();
  //Update the video
  video.loadPixels();
  //Update the boids
  for(let i = 0; i < population.length; i ++) {
    for(let j = 0; j < speed; j ++) {
      population[i].update();
    }
  }
  //UI
  rangeT.html("Range: " + Range);
  fovT.html("FOV: " + FOV*2);
  sepT.html("Seperation: " + sepStrength);
  aliT.html("Alignment: " + aliStrength);
  cohT.html("Cohesion: " + cohStrength);
  sizeT.html("Boid Size: " + boidSize);
  speedT.html("Sim-Speed: " + speed);
  transparencyT.html("Transparency: " + transparency);
}