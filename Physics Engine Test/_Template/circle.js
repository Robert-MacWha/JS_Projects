class Circle {
    constructor (x, y, r, fixed) {
        this.body = Bodies.circle(x, y, r, {friction: 1, restitution: 0.8, isStatic: fixed});
        this.d = r*2;
        World.add(world, this.body);
    }

    show () {
        let pos = this.body.position;
        push();
            translate(pos.x, pos.y);
            strokeWeight(2);
            stroke(255);
            fill(200, 100);
            ellipseMode(CENTER);
            ellipse(0, 0, this.d);
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