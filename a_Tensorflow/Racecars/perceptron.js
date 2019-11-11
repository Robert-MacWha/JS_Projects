class Perceptron {
    constructor (pos, rayCount) {
        //A list of rays
        this.rays = [];
        this.rayCount = rayCount;
        this.fov = 360;
        //For each ray, create it and give it an angle
        for (let a = -this.fov / 2; a < this.fov / 2; a += this.fov/this.rayCount) {
            this.rays.push(new Ray(pos, radians(a + ((this.fov/this.rayCount)/2))));
        }
    }

    show (pos) {
        for(let i = 0; i < this.rays.length; i ++) {
            this.rays[i].show(pos);
        }
    }

    rotate (angle) {
        //Rotate all of the rays
        let index = 0;
        for (let a = -this.fov / 2; a < this.fov / 2; a += this.fov/this.rayCount) {
            this.rays[index].setAngle(radians(a + ((this.fov/this.rayCount)/2)) + angle);
            index++;
        }
    }

    look (others, pos) {
        //Return the distances for each ray as a range from 0(far) to 1(close)
        let distances = [];
        //Loop over each ray
        for (let i = 0; i < this.rays.length; i++) {
            //Get the ray
            const ray = this.rays[i];
            let closest = null;
            let record = ray.size + 10;
            //And each wall
            for (let j = 0; j < others.length; j ++) {
                let wall = others[j];
                //Check to see if the ray hits the wall
                const pt = ray.cast(wall, pos);
                if (pt) {
                    //If so, update the record and closest vars
                    const d = p5.Vector.dist(pos, pt);
                    //If it's close enough
                    if (d < record && d < ray.size) {
                        //Update the record
                        record = d;
                        closest = pt;
                    }
                }
            }
            //Draw a line from the pos to the point
            if (!useVisuals) {
                if (closest != null) { line(pos.x, pos.y, closest.x, closest.y); }
            }
            //Update the distance array
            distances[i] = map(record, 0, ray.size + 10, 1, 0);
            //print(distances[i]);
        }
        return(distances);
    }
}