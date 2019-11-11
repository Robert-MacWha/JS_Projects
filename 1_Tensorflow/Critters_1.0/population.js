class Population {
    constructor (population, shape, startEnergy) {
        //Setup the population
        this.brainShape = shape;
        this.pop = new Array(population);
        for(let i = 0; i < population; i ++) {
            this.pop[i] = new Creature(this.brainShape, startEnergy);
            TotalEnergy -= startEnergy;
        }
    }

    addCritter (c) {
        this.pop.push(c);
    }

    update () {
        for(let i = this.pop.length-1; i >= 0; i --) {
            this.pop[i].update();
            if (this.pop[i].isDead) {
                this.pop.splice(i, 1);
            }
        }
        //Balance the number of critters and food
        if (this.pop.length < startPop && TotalEnergy > startEnergy) {
            //console.log("A critter was Created")
            this.pop.push(new Creature(this.brainShape, startEnergy));
            TotalEnergy -= startEnergy;
        }
        //Then add more food
        if (TotalEnergy > 10 && random(1) < 0.05) {
            //console.log("Some food was created");
            //console.log(TotalEnergy);
            food.push(createVector(random(width), random(height)));
            TotalEnergy -= foodEnergy;
        }
    }

    show () {
        stroke(0);
        strokeWeight(1);
        fill(255);
        for(let critter of this.pop) {
            critter.show();
        }
    }
}