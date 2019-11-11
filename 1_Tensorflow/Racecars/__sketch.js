p5.disableFriendlyErrors = true;
//Max population is 200-300 (gets to ~20 fps at a population of 300)
let population = new Array(400);
let walls = [];
let checkpoints = [];
//Static options
let startPoint;
let genLength = 500;
let counter = 0;
let generation = 1;
//Changable options
let RunSpeed = 1;
let useVisuals = true;

function setup () {
    createCanvas(500, 500);
    startPoint = createVector(50, 300);
    for(let i = 0; i < population.length; i ++) {
        population[i] = new Creature([8, 2]);
    }
    createWalls();
}

function draw () {
    background(21);
    //Update the vehicles
    for(let i = 0; i < population.length; i ++) {
        population[i].update();
    }
    counter ++;
    //Test for new generation
    if (counter >= genLength) {
        newGeneration();
    }
    //Show the vehicles
    for(let i = 0; i < population.length; i ++) {
        stroke(255);
        population[i].show();
    }
    if (!useVisuals) { return; }
    //Loop over each wall & checkpoint and show them
    stroke(255);
    strokeWeight(3);
    for(let i = 0; i < walls.length; i ++) {
        walls[i].show();
    }
    stroke(0, 255, 0);
    strokeWeight(2);
    for(let i = 0; i < checkpoints.length; i ++) {
        checkpoints[i].show();
    }
}

function newGeneration () {
    counter = 0;
    genLength += 2;
    genLength = constrain(genLength, 0, 1000);
    generation ++;
    print("Starting generation " + generation);
    let samplePop = [];
    let bestScore = -1;
    //Loop over each old vehicle
    for(let i = 0; i < population.length; i ++) {
        //Add each vehicle to the samplePop depending on it's score
        let vehicle = population[i];
        for(let j = 0; j < Math.pow(vehicle.score, 2); j ++) {
            samplePop.push(vehicle);
        }
        //Update best score
        if (vehicle.score > bestScore) { bestScore = vehicle.score; }
    }
    print("Best Score: " + bestScore);

    let newPop = [];
    //Loop over each new child
    for(let i = 0; i < population.length; i ++) {
        let parent1 = this.pickOne(samplePop);
        let parent2 = this.pickOne(samplePop);
        let child = parent1.crossover(parent2);
        child.mutate();
        newPop[i] = child;
    }
    population = newPop;
}

function pickOne (array) {
    //print(array);
    let n = floor(random(array.length));
    return(array[n].clone());
}

function createWalls () {
    //Create the walls
      //Outer Walls
    walls.push(new Wall(25, 75, 75, 25));
    walls.push(new Wall(75, 25, 425, 25));
    walls.push(new Wall(425, 25, 475, 75));
    walls.push(new Wall(475, 75, 475, 150));
    walls.push(new Wall(475, 150, 425, 200));
    walls.push(new Wall(425, 200, 250, 200));
    walls.push(new Wall(250, 200, 200, 250));
    walls.push(new Wall(200, 250, 200, 300));
    walls.push(new Wall(200, 300, 250, 350));
    walls.push(new Wall(250, 350, 425, 350));
    walls.push(new Wall(425, 350, 475, 400));
    walls.push(new Wall(475, 400, 425, 450));
    walls.push(new Wall(425, 450, 75, 450));
    walls.push(new Wall(75, 450, 25, 400));
    walls.push(new Wall(25, 400, 25, 75));
      //Inner Walls
    walls.push(new Wall(75, 100, 100, 75));
    walls.push(new Wall(100, 75, 400, 75));
    walls.push(new Wall(400, 75, 425, 100));
    walls.push(new Wall(425, 100, 425, 125));
    walls.push(new Wall(425, 125, 400, 150));
    walls.push(new Wall(400, 150, 225, 150));
    walls.push(new Wall(225, 150, 150, 225));
    walls.push(new Wall(150, 225, 150, 325));
    walls.push(new Wall(150, 325, 225, 400));
    walls.push(new Wall(400, 400, 100, 400));
    walls.push(new Wall(100, 400, 75, 375));
    walls.push(new Wall(75, 375, 75, 100));
      //Checkpoints
    checkpoints.push(new Wall(25, 250, 75, 250));
    checkpoints.push(new Wall(25, 175, 75, 175));
    checkpoints.push(new Wall(25, 100, 75, 100));
    checkpoints.push(new Wall(100, 75, 100, 25));
    checkpoints.push(new Wall(250, 75, 250, 25));
    checkpoints.push(new Wall(400, 75, 400, 25));
    checkpoints.push(new Wall(425, 112.5, 475, 112.5));
    checkpoints.push(new Wall(400, 150, 400, 200));
    checkpoints.push(new Wall(250, 150, 250, 200));
    checkpoints.push(new Wall(150, 275, 200, 275));
    checkpoints.push(new Wall(250, 350, 250, 400));
    checkpoints.push(new Wall(400, 400, 475, 400));
    checkpoints.push(new Wall(250, 400, 250, 450));
    checkpoints.push(new Wall(50, 425, 85, 385));
  }