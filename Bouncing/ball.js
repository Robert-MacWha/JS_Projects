class Ball  {
    constructor (x, y, r) {
        this.pos = createVector(x, y);
        this.vel = createVector(random(0.01, 0.1), 0);
        this.acc = createVector();

        this.rad = r;
    }

    update () {
        //Makes the physics more presise
        for (let i = 0; i < stepCount; i ++) {
            //Check for collisions
            if (this.pos.y >= height) {
                //Bounce
                this.vel.y *= -1;
            }
            if (this.pos.x < 0 || this.pos.x > width) {
                //Bounce
                this.vel.x *= -1;
            }
            //Apply acceleration
            this.vel.add(createVector(0, (Gravity/pow(stepCount, 2))));
            this.pos.add(this.vel);
        }
        this.vel.div(Drag);
    }

    show () {
        fill(255);
        noStroke();
        ellipse(this.pos.x, this.pos.y, this.rad, this.rad);
    }
}