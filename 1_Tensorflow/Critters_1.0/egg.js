class Egg {
    constructor (parentA, parentB, energy, x, y) {
        this.parentA = parentA;
        this.parentB = parentB;
        this.pos = createVector(x, y);
        this.timer = 500;

        this.hatched = false;
    }

    update () {
        //Subtract from the timer and show the egg
        this.timer --;
        if (this.timer <= 0) {
            this.hatch();
            console.log("Hatch");

            let baby = this.parentA.crossover(this.parentB);
            baby.pos = this.pos;
            population.pop.push(baby);
        } else {
            push();
                translate(this.pos.x, this.pos.y);
                image(eImg, 0, 0, 30, 30);
            pop();
        }
    }

    hatch () {
        this.hatched = true;
    }
}