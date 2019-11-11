let block1;
let block2;
//let clack;

let count = 0;
let digits = 8;
let countDiv;
let timeSteps = 1000000;

function setup() {
  createCanvas(800, 200);
  frameRate(30);
  //Setup the blocks
  block1 = new Block(100, 20, 0, 1, 0);
  const m2 = pow(100, digits-1);
  block2 = new Block(200, 100, -5/timeSteps, m2, 20);
  //clack = loadSound("Clack.wav");
  countDiv = createDiv(count);
  countDiv.style("font-size", "72px");
}

function draw() {
  background(21);

  let hasCollided = false;

  for(let i =0; i < timeSteps; i ++) {
    if (block1.collide(block2)) {
      const v1 = block1.bounce(block2);
      const v2 = block2.bounce(block1);
      block1.v = v1;
      block2.v = v2;
      count++;
      hasCollided = true;
    }
    if (block1.hitWall()) {
      block1.reverse();
      count++;
      hasCollided = true;
    }
    block1.update();
    block2.update();
  }
  block1.show();
  block2.show();

  countDiv.html(nf(count, digits));

  if (hasCollided) {
    clack.play();
  }
}