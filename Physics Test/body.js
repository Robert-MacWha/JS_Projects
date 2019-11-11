class Body {
    constructor (x, y, w, h, rayLength) {
        this.pos = createVector(x, y);
        this.vel = createVector();
        this.acc = createVector();

        this.size = createVector(w, h)

        this.rays = [];
        //Create the rays
        for(let i = 0; i < raysPerSide; i ++) {
            //Rays on the top
        }
        for(let i = 0; i < raysPerSide; i ++) {
            //Rays on the right
        }
        for(let i = 0; i < raysPerSide; i ++) {
            //Rays on the bottom
        }
        for(let i = 0; i < raysPerSide; i ++) {
            //Rays on the left
        }
    }

    update (colliders) {
        //Physics update
        this.applyForce(createVector(0, gForce));
        for(let i = 0; i < Piterations; i ++) {
            this.vel.add(this.acc);
            this.pos.add(this.vel);
            this.acc.mult(0);
            this.testCollision(colliders);
        }
    }

    show () {
        push();
            fill(255);
            stroke(0);
            strokeWeight(3);
            translate(this.pos.x, this.pos.y);
            rect(0, 0, this.size.x, this.size.y);
        pop();
    }

    applyForce (force) {
        this.acc.add(force);
    }

    testCollision (colliders) {
        //Loop over each ray
        for(let i = 0; i < this.rays.length; i ++) {
            //Check each one for collision
            let collided = this.rays[i].testCollision(colliders);
            //If the object collides with somthing, move it in the oposite direction
            if (collided) {
                this.addForce(this.rays[i].dir.mult(-1/Piterations));
            }
        }
    }
}