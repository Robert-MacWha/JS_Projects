class Ray {
    constructor(angle) {
        this.dir = p5.Vector.fromAngle(angle);
        this.size = 50;
    }

    setAngle(angle) {
        //Change the angle the ray is pointing in
        this.dir = p5.Vector.fromAngle(angle);
    }

    show(pos) {
        //Draw a debugging line displaying the ray's dir
        stroke(255, 100);
        push();
            translate(pos.x, pos.y);
            line(0, 0, this.dir.x * 10, this.dir.y * 10);
        pop();
    }

    cast(wall, pos) {
        //Get the positions of the wall
        const x1 = wall.a.x;
        const y1 = wall.a.y;
        const x2 = wall.b.x;
        const y2 = wall.b.y;
        //And the positions of the ray
        const x3 = pos.x;
        const y3 = pos.y;
        const x4 = pos.x + this.dir.x;
        const y4 = pos.y + this.dir.y;
        //Check to see if the ray collides with the wall
        const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
            //Div by 0 protection
        if (den == 0) {
            return;
        }
            //More of the equation
        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
        const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;
        if (t > 0 && t < 1 && u > 0) {
            //Get the point that the lines intersect at and return it
            const pt = createVector();
            pt.x = x1 + t * (x2 - x1);
            pt.y = y1 + t * (y2 - y1);
            return pt;
        } else {
            return;
        }
    }
}