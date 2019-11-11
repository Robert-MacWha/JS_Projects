class Box {
    constructor (x, y, w, h) {
        this.body = Bodies.rectangle(x, y, w, h);
        this.shape = createVector(w, h);
        World.add(world, this.body);
    }

    show () {
        let pos = this.body.position;
        let angle = this.body.angle;
        push();
            translate(pos.x, pos.y);
            rotate(angle);
            strokeWeight(2);
            stroke(255);
            fill(200, 100);
            rectMode(CENTER);
            rect(0, 0, this.shape.x, this.shape.y);
        pop();
    }

    remove () {
        World.remove(world, this.body);
    }

    isOffScreen () {
        let pos = this.body.position;
        return(pos.y > height + 100);
    }
}