let population = [];
let boidCount = 20;
let boidSize = 0.75;

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

let rangeSlider;
let FOVSlider;
let sepSlider;
let aliSlider;
let cohSlider;

let rangeT, fovT, sepT, aliT, cohT;

let leaderButton;




function setup() {
  createCanvas(500, 500);
  //Create the boids
  for(let i = 0; i < boidCount; i ++) {
    population[i] = new Boid(random(width), random(height));
  }
  //UI
    //Sliders
  rangeSlider = createSlider(20, 200, 100);
  rangeSlider.position(550, 100);
  FOVSlider = createSlider(15, 180, 90);
  FOVSlider.position(550, 200);
  sepSlider = createSlider(0.1, 20, 5, 0.1);
  sepSlider.position(550, 300);
  aliSlider = createSlider(0.1, 20, 5, 0.1);
  aliSlider.position(550, 400);
  cohSlider = createSlider(0.1, 20, 5, 0.1);
  cohSlider.position(550, 500);
    //Text
  rangeT = createP("Range: ");
  rangeT.position(550, 50);
  rangeT.style('font-size', '20px');
  fovT = createP("FOV: ");
  fovT.position(550, 150);
  fovT.style('font-size', '20px');
  sepT = createP("Seperation: ");
  sepT.position(550, 250);
  sepT.style('font-size', '20px');
  aliT = createP("Alignment: ");
  aliT.position(550, 350);
  aliT.style('font-size', '20px');
  cohT = createP("Cohesion: ");
  cohT.position(550, 450);
  cohT.style('font-size', '20px');
    //Buttons
  leaderButton = createButton("Activate Leaders");
  leaderButton.position(565, 550);
  leaderButton.mousePressed(function a() {
    useLeaders = !useLeaders;
    if (useLeaders) { leaderButton.html("Deactivate Leaders"); }
    else { leaderButton.html("Activate Leaders"); }
  });
}

function draw() {
  background(21);
  //Update vars
  Range = rangeSlider.value();
  FOV = FOVSlider.value();
  sepStrength = sepSlider.value();
  aliStrength = aliSlider.value();
  cohStrength = cohSlider.value();

  //Update the boids
  for(let i = 0; i < population.length; i ++) {
    population[i].update();
  }
  //UI
  rangeT.html("Range: " + Range);
  fovT.html("FOV: " + FOV*2);
  sepT.html("Seperation: " + sepStrength);
  aliT.html("Alignment: " + aliStrength);
  cohT.html("Cohesion: " + cohStrength);
}