class Creature {
    constructor (shape) {
        this.brain = new NeuralNetwork(shape);
    }

    update (inputs) {
        //TEMP
        let output = this.brain.predict(inputs);
        print(output);
    }

    show () {

    }

    clone () {
        let newCreature = new Creature();
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
        //Mutate the child
        child.mutate();
        //Reutrn the child
        return(child);
    }

    rotate (angle) {
        //Update the heading
        this.heading += angle/10;
        this.perceptron.rotate(this.heading);
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
}