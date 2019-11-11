class Collider {
    constructor (points) {
        this.points = points;
    }

    show () {
        //Create the shapes
        push();
            beginShape();
            fill(255);
            stroke(0);
            strokeWeight(4);
            for(let i = 0; i < this.points.length; i ++) {
                vertex(this.points[i].x, this.points[i].y);
            }
            endShape();
        pop();
    }
}