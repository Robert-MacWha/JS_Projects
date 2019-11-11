let particles = [];
let attactionPoints = [];

const constForce = 0.1;

function setup() {
  createCanvas(600, 600);

  for(let i = 0; i < 500; i ++) {
    particles[i] = new Particle(random(0, width), random(0, 20));
  }
  attactionPoints[0] = createVector(width/2, height/2);
  attactionPoints[1] = createVector(100, 500);
}

function draw() {
  background(21);

  for(let i = 0; i < particles.length; i ++) {
    particles[i].update();
    particles[i].show();
  }
}