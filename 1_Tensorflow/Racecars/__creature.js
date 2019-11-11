class Creature {
    constructor (shape) {
        this.brain = new NeuralNetwork(shape);
        this.perceptron = new Perceptron(startPoint, shape[0]);

        this.pos = createVector(startPoint.x, startPoint.y);
        this.heading = -90;

        this.hitWall = false;
        this.score = 0;
        //Check point index
        this.cpIndex = 0;
    }

    update () {
        if (this.hitWall) { return; }
        //Get the inputs
        const inputs = this.perceptron.look(walls, this.pos);
        //Get the outputs from the NN
        let outputs = this.brain.predict(inputs);
        //noLoop();
        //Check to see if any of the distances are less than the size of the vehicle
        for(let i = 0; i < inputs.length; i ++) {
            let d = inputs[i];
            if (d > 0.9) {
                this.hitWall = true;
                this.score = floor(this.score/2);
            }
        }
        this.lookCPs();
        //Update the outputs to be dynamic (-1 to 1)
            //CHANGED FROM outputs[1] = map(outputs[1], 0, 1, -1, 1);
        outputs[0] = map(outputs[0], -1, 1, 0, 1);
        //Apply the outputs
        this.move(outputs[0]);
        this.rotate(outputs[1]);
        
    }

    lookCPs () {
        let loop = true;
        //Check to see if the vehicle corsses the next checkpoint
        let d = this.perceptron.look([checkpoints[this.cpIndex]], this.pos);
        for(let i = 0; i < d.length; i ++) {
            if (d[i] > 0.9 && loop) {
                this.cpIndex ++;
                //Limit the index
                if (this.cpIndex >= checkpoints.length) { this.cpIndex = 0; }
                this.score += 1*(genLength/counter);
                loop = false;
            }
        }
    }

    show () {
        push();
            fill(255);
            if (this.hitWall) {fill(255, 0, 0);}
            stroke(0);
            strokeWeight(2);
            translate(this.pos.x, this.pos.y);
            rotate(this.heading + 67.5);
            triangle(-4, -5, 0, 5, 4, -5);
        pop();
        //Show the rays
        //this.perceptron.show(this.pos);
    }

    clone () {
        let newCreature = new Creature(this.brain.nodes);
        newCreature.brain.dispose();
        newCreature.brain = this.brain.clone();
        return(newCreature);
    }

    mutate () {
        //Randomly mutate
        function nv (x) {
            if (random(1) < 0.05) {
                let offset = randomGaussian() * 0.5;
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
        let child = this.clone();
        let shape = [];
        for(let i = 0; i < this.brain.weights.length; i ++) {
            shape[i] = this.brain.weights[i].shape;
        }
        //Destroy and reset the child's brain
        child.brain.dispose();
        for(let i = 0; i < child_DNA.length; i ++) {
            child.brain.weights[i] = tf.tensor(child_DNA[i], shape[i]);
        }
        //Reutrn the child
        return(child);
    }

    move(amt) {
        //Get the direction
        const vel = p5.Vector.fromAngle(this.heading);
        //Set it's magnitude to the magnitude
        vel.mult(amt);
        vel.mult(5);
        //Add to the position
        this.pos.add(vel);
        //this.pos.x += random(-10, 10);
    }

    rotate(angle) {
        //Update the heading
        this.heading += angle/10;
        this.perceptron.rotate(this.heading);
      }
}