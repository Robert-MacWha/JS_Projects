//Library Engine
let Engine = Matter.Engine,
  //Renderer = Matter.Renderer,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Mouse = Matter.Mouse,
  MouseConstraint = Matter.MouseConstraint,
  Constraint = Matter.Constraint;
let engine;
let world;

let particles = [];
let boundaries = [];
let box;

let mConstraint;


function setup() {
  //Setup, Required
  engine = Engine.create();
  world = engine.world;
  //Engine.run(engine);
  let canvas = createCanvas(600, 600);
  boundaries.push(new Bound(width/2, height, width, 25, {isStatic: true, friction: 0}));

  box = new Box(100, 100, 40, 40);
  World.add(world, box)

  let prev = null;
  let fixed = true;

  for(let x = width/2; x < width*1.25; x += 20) {
    let p = new Circle(x, 0, 9, fixed);
    particles.push(p);
    if (prev != null) {
      let constraint = Constraint.create ({
       bodyA: p.body,
       bodyB: prev.body,
       length: 20,
       stiffness: 0.4
      });
      World.add(world, constraint);
    }
    fixed = false;
    prev = p;
  }
  let canvasMouse = Mouse.create(canvas.elt);
  canvasMouse.pixelRatio = pixelDensity();
  mConstraint = MouseConstraint.create(engine, {
    mouse: canvasMouse
  });
  World.add(world, mConstraint);
}

function draw() {
  background(21);
  Engine.update(engine);

  for(let i = particles.length-1; i>= 0; i --) {
    particles[i].show();
    // if (particles[i].isOffScreen()) {
    //   particles[i].remove();
    //   particles.splice(i, 1);
    // }
  }
  for (let b of boundaries) {
    b.show();
  }

  box.show();

  if (mConstraint.body) {
    let pos = mConstraint.body.position;
    let offset = mConstraint.constraint.pointB;
    let m = mConstraint.mouse.position;
    stroke(100, 255, 100);
    strokeWeight(2);
    line(pos.x + offset.x, pos.y + offset.y, m.x, m.y);
  }
}