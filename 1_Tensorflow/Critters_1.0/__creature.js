class Creature {
    constructor (shape, energy) {
        this.brain = new NeuralNetwork(shape);
        this.energy = energy;
        this.hasEaten = false;
        this.isDead = false;
        this.wantsToMate = false;

        this.heading = random(360);
        this.pos = createVector(random(width), random(height));
        //Individual values--------------------------------------------------------
            //View
        this.viewDist = random(75, 100);
        this.viewAngle = random(45, 90);
            //Physical
        this.speed = random(2, 5);
        this.size = random(3, 5);
        this.R = random(255);
        this.G = random(255);
        this.B = random(255);
            //Affects young
        this.mutationRate = 0.05;
        this.eggStr = 3;
            //Other
        this.mateThreshold = 0;
        this.eatThreshold = 0;
        this.grabThreshold = 0;
        this.const = 0;
        this.timer = 0;
        this.memory = [0, 0, 0, 0, 0];
        this.memoryThreshold = 0;
    }

    update () {
        //Get inputs from perseptron
        const inputs = getInputs(this);
        const outputs = this.brain.predict(inputs.inputs);
        if (outputs[0] != float(outputs[0])) { console.log(inputs.inputs); noLoop(); return;}
        //Format outputs
        outputs[0] = map(outputs[0], -1, 1, 0, 1);
        this.move(outputs[0]);
        this.rotate(outputs[1]);
        this.wantsToMate = outputs[2] > this.mateThreshold;
        //Loose Energy by doing things
        let energyLost = 0.01;
        this.energy -= energyLost;
        TotalEnergy += energyLost;
        //See if the critter can eat the closest food
        if (inputs.inputs[3] < this.size + 10) {
            //console.log("A critter Ate");
            //You can!
            food.splice(inputs.closestFood, 1);
            this.energy += foodEnergy;
            this.hasEaten = true;
        }
        //See if the closest critter is a willing mate
        if (this.wantsToMate && inputs.mate != null  && 
                this.energy > this.eggStr && inputs.mate.energy > inputs.mate.eggStr) {
            let mate = inputs.mate;
            //Mate
                //These critters no longer want to mate
            this.wantsToMate = false;
            mate.wantsToMate = false;
                //Remove energy from both parents
            this.energy -= this.eggStr/2;
            mate.energy -= mate.eggStr/2;
            //Create an egg and add it to the egg array (If the critter has eaten)
            if (this.hasEaten && mate.hasEaten) {
                console.log("Mated"); 
                let egg = new Egg(this, mate, this.eggStr + mate.eggStr, this.pos.x, this.pos.y);
                eggs.push(egg);
            }
        }
        //If the critter dies
        if (this.energy <= 0) {
            //console.log("A critter Died")
            //Remove any ecses energy
            TotalEnergy += this.energy;
            //Kill the critter
            this.isDead = true;
        }
    }

    show () {
        push();
            translate(this.pos.x, this.pos.y);
            rotate(this.heading - HALF_PI);
            imageMode(CENTER);
            //image(cImg, 0, 0, this.size*5, this.size*5);
            fill(this.R, this.B, this.G);
            triangle(-this.size, -this.size/2, 0, this.size*2, this.size, -this.size/2);
        pop();
    }

    rotate (angle) {
        //Update the heading
        this.heading += angle/10;
    }

    move(amt) {
        //Get the direction
        const vel = p5.Vector.fromAngle(this.heading);
        //Set it's magnitude to the magnitude
        vel.mult(amt);
        vel.mult(this.speed);
        //Add to the position
        this.pos.add(vel);
        //this.pos.x += random(-10, 10);
    }

    crossover (partner) {
        //Get the dna of both parents
        let parent_A_DNA = [];
        for(let i = 0; i < this.brain.weights.length; i ++) {
            parent_A_DNA[i] = this.brain.weights[i].dataSync();
        }
        let parent_B_DNA = [];
        for(let i = 0; i < partner.brain.weights.length; i ++) {
            parent_B_DNA[i] = partner.brain.weights[i].dataSync();
        }
        //Create the child dna
        let child_DNA = [];
        //Set the child's dna to be partially from both parents
        for(let i = 0; i < parent_A_DNA.length; i ++) {
            let mid = Math.floor(Math.random() * parent_A_DNA[i].length);
            child_DNA[i] = [...parent_A_DNA[i].slice(0, mid), 
                            ...parent_B_DNA[i].slice(mid, parent_B_DNA[i].length)];
        }
        //Set the child to be a creature
        let energy = this.eggStr + partner.eggStr;
        let child = this.clone(energy);
        let shape = [];
        for(let i = 0; i < this.brain.weights.length; i ++) {
            shape[i] = this.brain.weights[i].shape;
        }
        //Destroy and reset the child's brain
        child.brain.dispose();
        for(let i = 0; i < child_DNA.length; i ++) {
            child.brain.weights[i] = tf.tensor(child_DNA[i], shape[i]);
        }
        let mr = this.mutationRate;
        //Give the child the parents Individual Values (Allways those of the father)
        child.viewDist = this.viewDist + this.r();
        child.viewAngle = this.viewAngle + this.r();
        //child.speed = this.speed + this.r();
        //child.size = this.size + this.r();
        child.R = this.R + this.r();
        child.G = this.G + this.r();
        child.B = this.B + this.r();
        child.mutationRate = this.mutationRate + this.r();
        child.eggStr = this.eggStr + this.r();
        child.mateThreshold = this.mateThreshold + this.r();
        child.eatThreshold = this.eatThreshold + this.r();
        child.grabThreshold = this.grabThreshold + this.r();
        child.memoryThreshold = this.memoryThreshold + this.r();
        child.const = this.const + this.r();
        child.timer = this.timer + this.r();

        //Mutate the child
        child.mutate(child.mutationRate);
        //Reutrn the child
        return(child);
    }

    r() {
        if (random(1) < this.mutationRate) { 
            return(randomGaussian() * 0.2); 
        }
    }

    clone (energy) {
        let newCreature = new Creature([0], energy);
        newCreature.brain.dispose();
        newCreature.brain = this.brain.clone();
        return(newCreature);
    }

    mutate (mr) {
        //Randomly mutate
        function nv (x) {
            if (random(1) < mr) {
                let offset = randomGaussian() * 0.2;
                let newX = x + offset;
                return(newX);
            }
            return(x);
        }
        //Loop over each layer
        for(let i = 0; i < this.brain.weights.length; i ++) {
            //Get a (mutated) copy of the layer's weights
            let l = this.brain.weights[i].dataSync().map(nv);
            //Get a copy of the layer's size
            let l_shape = this.brain.weights[i].shape;
            //Dispose of the layer
            this.brain.weights[i].dispose();
            //Create a new layer with the mutated weights
            this.brain.weights[i] = tf.tensor(l, l_shape);
        }
    }
}