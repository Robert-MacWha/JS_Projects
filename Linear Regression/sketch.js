let x_vals = [];
let y_vals = [];

let m;
let b;

const learningRate = 0.5;
const optimizer = tf.train.sgd(learningRate);

function setup() {
  createCanvas(400, 400);

  m = tf.variable(tf.scalar(random(1)));
  b = tf.variable(tf.scalar(random(1)));
}

function draw () {
  background(20);

  tf.tidy (() => {
    if (x_vals.length > 0) {
      const  ys = tf.tensor1d(y_vals);
      optimizer.minimize(  function() {
        return (loss(predict(x_vals), ys));
      });
    }
  })

  stroke(0, 0, 0, 150);
  fill(255, 255, 255, 150);
  for(let i = 0; i < x_vals.length; i ++) {
    let px = map(x_vals[i], 0, 1, 0, width)
    let py = map(y_vals[i], 0, 1, height, 0);

    ellipse(px, py, 8, 8);
  }

  const linex = [0, 1];
  const ys = tf.tidy(() => predict(linex));
  let liney = ys.dataSync();
  ys.dispose();

  let x1 = map(linex[0], 0, 1, 0, width);
  let x2 = map(linex[1], 0, 1, 0, width);

  let y1 = map(liney[0], 0, 1, height, 0);
  let y2 = map(liney[1], 0, 1, height, 0);

  stroke(255);
  strokeWeight(2);
  line(x1, y1, x2, y2);
}

function mousePressed() {
  let x = map(mouseX, 0, width, 0, 1);
  let y = map(mouseY, 0, height, 1, 0);

  x_vals.push(x);
  y_vals.push(y)
}

function predict (xs) {
  const tfXs = tf.tensor1d(xs);
  //y = mx + b
  const ys = tfXs.mul(m).add(b);
  return(ys);
}

function loss (pred, labels) {
  return (pred.sub(labels).square().mean());
}