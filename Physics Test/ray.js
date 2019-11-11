class Ray {
    constructor (offset, dir, length) {
        this.off = offset;
        this.dir = dir;
        this.len = length;
    }

    testCollision (colliders) {
        //Loop over each collider
        for(let i = 0; i < colliders.length; i ++) {
            //And over each point
            for(let i = 0; i < colliders[i].points.length; i ++) {
                //Get the line's equation
                
            }
        }
    }
}