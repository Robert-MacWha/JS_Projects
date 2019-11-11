let player;
let colliders = [];
let raysPerSide = 10;

let Piterations = 10;
let gForce = 0.03;

function setup() {
  createCanvas(500, 500);
  player = new Body(25, 410, 20, 40, 20);
  //Create the colliders
  let floor = [
    createVector(0, 450),
    createVector(200, 450),
    createVector(200, 400),
    createVector(450, 400),
    createVector(450, 50),
    createVector(500, 50),
  ];
  let platform = [
    createVector(50, 350),
    createVector(400, 350),
    createVector(400, 300),
    createVector(300, 300),
    createVector(300, 250),
    createVector(50, 250),
    createVector(50, 350),
  ]
  
  colliders[0] = new Collider(floor);  
  colliders[1] = new Collider(platform);
}

function draw() {
  background(255);

  colliders[0].show();
  colliders[1].show();

  player.update(colliders);
  player.show();
}