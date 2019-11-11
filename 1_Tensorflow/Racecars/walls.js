class Wall {
    constructor (x1, y1, x2, y2) {
        this.a = createVector(x1, y1);
        this.b = createVector(x2, y2);
    }

    show (r, g, b) {
        stroke(r, g, b);
        line(this.a.x, this.a.y, this.b.x, this.b.y);
    }
}