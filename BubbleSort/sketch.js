let blockCount = 100;
let blocks;
let numbers;

let speed = 100;

let i = 0;

function setup() {
  createCanvas(500, 500);
  frameRate(10);
  //Create the numbers array
  numbers = [blockCount];
  for(let i = 0; i < blockCount; i ++) {
    numbers[i] = i;
  }
  //Create and populate the blocks array
  blocks = [blockCount];
  for(let i = 0; i < blockCount; i ++) {
    //Choose a random number from the list and remove it
    let rn = int(random(0, numbers.length));
    //To make it look like a cave, just set the y to rn instead of numbers[rn]
    blocks[i] = new Block(blockCount, rn*(height/blockCount), width/blockCount);
    //Remove the number from the array
    numbers.splice(rn, 1);
  }
}

function draw() {
  background(21);
  //Loop through each block and apply the algorythm
  for(let i = 0; i < speed; i ++) {
    sweep();
  }
  //Loop through each block and show all of them
  for(let i = 0; i < blockCount; i ++) {
    blocks[i].show(i);
  }
}

function sweep () {
    //For loop start
  //Check the heights of both the block and the next one and move the higher one to the left
  b1 = blocks[i];
  b2 = blocks[i+1];
  if (b1.h > b2.h) {
    //The block to the right is smaller, so move it
    blocks[i] = b2;
    blocks[i+1] = b1;
  } 
  i++
  print(i);
  if (i > blockCount-2) {
    i = 0;
  }
    //For loop end
}