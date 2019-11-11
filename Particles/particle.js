class Particle {
    constructor (x, y) {
        this.pos = createVector(x, y);
        this.vel = createVector(random(-10, 10), random(-10, 10));
        this.acc = createVector();
    }

    update () {
        for(let i = 0; i < attactionPoints.length; i ++) {
            let dist = this.distSQ(this.pos, attactionPoints[i]);
            let force = dist.mult(constForce/1000);
            this.acc.add(force);
        }

        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    show () {
        stroke(255, 255, 255, 50)
        point(this.pos.x, this.pos.y);
    }

    distSQ (a, b) {
        let xs = -(a.x-b.x);
        let ys = -(a.y-b.y);

        let out = createVector(xs, ys);
        return(out);
    }
}