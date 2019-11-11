let balls = [];

const Gravity = 0.75;
let Drag = 1;
const stepCount = 100;

function setup() {
  createCanvas(600, 300);
}

function draw() {
  background(21);
  //Loop through and update + draw each ball
  for(let ball of balls) {
    ball.update ();
    ball.show ();
  }
}

function mousePressed () {
  balls.push(new Ball(mouseX, mouseY, 16));
}