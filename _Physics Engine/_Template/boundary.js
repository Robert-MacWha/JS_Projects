class Bound {
    constructor (x, y, w, h, options) {
        if (options == null) {options = {}; }
        this.body = Bodies.rectangle(x, y, w, h, options);
        this.size = createVector(w, h);
        World.add(world, this.body);
    }

    show () {
        let pos = this.body.position;
        let angle = this.body.angle;
        push();
            translate(pos.x, pos.y);
            rotate(angle);
            rectMode(CENTER);
            fill(150, 200)
            stroke(255);
            strokeWeight(2);
            rect(0, 0, this.size.x, this.size.y);
        pop();
    }
}