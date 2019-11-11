let pg;

let r1 = 20;
let r2 = 40;
let r3 = 60;
let m1 = 10;
let m2 = 10;
let m3 = 10;
let a1 = 1.6;
let a2 = 1.6;
let a3 = 0;
let a1_v = 0;
let a2_v = 0;
let a3_v = 0;

let xO;
let yO;

let g = 0.5;

function setup() {
  createCanvas(600, 600);
  pg = createGraphics(600, 600);
  xO = width/2;
  yO = height/2;
}

function draw() {
  background(21);
  stroke(255);
  strokeWeight(2);
  fill(255);
  pg.noStroke();
  push()
    translate(xO, yO);
    let x1, y1, x2, y2, x3, y3;
    for(let i = 0; i < 1; i ++) {
      //Calculate the first pendulum's pos
      x1 = r1 * sin(a1);
      y1 = r2 * cos(a1);
      //Calculate the second's position
      x2 = x1 + r2 * sin(a2);
      y2 = y1 + r2 * cos(a2);
      //And the thirds
      x3 = x2 + r3 * sin(a3);
      y3 = y2 + r3 * cos(a3);
      //Calculate acceleration
        //V1
      let num1 = -g * (2 * m1 + m2) * sin(a1);
      let num2 = -m2 * g * sin(a1 - 2  *a2);
      let num3 = -2 * sin(a1 - a2) * m2;
      let num4 = a2_v*a2_v * r2 + a1_v*a1_v * r1 * cos(a1-a2);
      let den = r1 * (2*m1+m2-m2*cos(2*a1-2*a2));
      a1_v += (num1 + num2 + num3*num4)/den;
        //V2
      num1 = 2 * sin(a1 - a2);
      num2 = a1_v*a1_v * r1 * (m1 + m2);
      num3 = g * (m1 + m2) * cos(a1);
      num4 = a2_v*a2_v * r2 * m2 * cos(a1 - a2);
      den = r2 * (2*m1+m2-m2*cos(2*a1-2*a2));
      a2_v += (num1 * (num2 + num3 + num4))/den;
        //V3
      num1 = 2 * sin(a2 - a3);
      num2 = a2_v*a2_v * r2 * (m2 + m3);
      num3 = g * (m2 + m3) * cos(a2);
      num4 = a3_v*a3_v * r3 * m3 * cos(a2 - a3);
      den = r3 * (2*m2+m3-m3*cos(2*a2-2*a3));
      a3_v += (num1 * (num2 + num3 + num4))/den;
      //Update angles
      a1 += a1_v; 
      a2 += a2_v;
      a3 += a3_v;
      //Add to the points object
      //pg.fill(255, 100, 100); pg.ellipse(x1+xO, y1+yO, 2, 2);
      pg.fill(100, 255, 100); pg.ellipse(x2+xO, y2+yO, 3, 3);
      //pg.fill(100, 100, 255); pg.ellipse(x3+xO, y3+yO, 3, 3);
    }
    //Draw the lines + ellipses
    line(0, 0, x1, y1); ellipse(x1, y1, m1*2);
    line(x1, y1, x2, y2); ellipse(x2, y2, m2*2);
    line(x2, y2, x3, y3); ellipse(x3, y3, m3*2);
  pop();
  //Draw the points
  image(pg, 0, 0);
}