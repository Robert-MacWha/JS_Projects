let population;
let eggs = [];
let food = [];
//Used to regulate amount of food, essentially makes the program a closed system
let TotalEnergy = 200;

let startPop = 20;
let startEnergy = 5;
let startFood = 50;
let foodEnergy = 2;

let cIMg;
let eImg;
let fImg;

function preload() {
  cImg = loadImage('_Sprites/Critter.png');
  eImg = loadImage('_Sprites/Egg.png');
  fImg = loadImage('_Sprites/Food.png');
}

function setup () {
    createCanvas (800, 600);
    population = new Population(startPop, [6, 10, 3], startEnergy);

    for(let i = 0; i < startFood; i ++) {
        food[i] = createVector(random(width), random(height));
        TotalEnergy -= foodEnergy;
    }
}
function draw () {
    background(21);
    //Update + show critters
    population.update();
    population.show();
    //Show the eggs
    for(let i = eggs.length-1; i >= 0; i --) {
        eggs[i].update();
        if (eggs[i].hatched) {
            eggs.splice(i, 1);
        }
    }
    //Show food
    for(let f of food) {
        imageMode(CENTER);
        image(fImg, f.x, f.y, 30, 30);
    }
}