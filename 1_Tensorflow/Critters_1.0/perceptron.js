function getInputs (me) {
    const output = {
        inputs: [],
        closestFood: createVector(0, 0),
        mate: population.pop[0]
    }
    //Get inputs
        //Dist to closest Food/Rock/Critter, Dir to closest Food/Rock/Critter
        //Number of visible Food/Critters, Closest Critter R+G+B vals
        //Pheramones A+B+C, Memory 1-5, Personal-Counter, Energy, Age, Const
    //Dist + Dir to closest Food/Rock/Critter
        //Critters
    let outDist = 1000000000000;
    let outDir = 180;
    let otherWantMate = 0;
        //Loop over each critter
    for(let c of population.pop) {
        if (c != me) {
            //If the critter is visible
            let dis = clacDist(me.pos, c.pos);
            if (dis < me.viewDist) {
                let dir = clacDir(me, c.pos);
                if (dir < me.viewAngle) {
                    //The critter is visable, if it's closest remember it
                    if (dis < outDist) {
                        outDist = dis;
                        outDir = dir;
                        if (c.wantsToMate) { otherWantMate = 1; output.mate = c; }
                        //Debugging
                        stroke(255, 100, 100);
                        strokeWeight(2);
                        line(me.pos.x, me.pos.y, c.pos.x, c.pos.y);
                    }
                }
            }
        }
    }
    output.inputs.push(outDist);
    output.inputs.push(outDir);
    output.inputs.push(otherWantMate);
        //Food
    outDist = 1000000000000;
    outDir = 180;
    output.closestFood = food[0];
        //Loop over each food
    for(let i = 0; i < food.length; i ++) {
        let f = food[i];
        //If the Food is the current closest
        let dis = clacDist(me.pos, f);
        if (dis < outDist) {
            output.closestFood = i;
            if (dis < me.viewDist) {
                //Ses if it's close enough seen
                let dir = clacDir(me, f);
                if (dir < me.viewAngle) {
                    //The Food is visable and the closest, remember it
                    outDist = dis;
                    outDir = dir;
                    //Debugging
                    stroke(100, 255, 100);
                    strokeWeight(2);
                    line(me.pos.x, me.pos.y, f.x, f.y);
                }
            }
        }
    }
    output.inputs.push(outDist);
    output.inputs.push(outDir);

    //Hunger
    output.inputs.push(me.energy);
    //Return inputs
    return(output);
}

function clacDist (me, other) {
    let d = sqrt(pow(me.x - other.x, 2) + pow(me.y - other.y, 2));
    return(d);
}

function clacDir (me, other) {
    let meP = me.pos;
    let meD = p5.Vector.fromAngle(me.heading);
    //Calculate direction
        //Get bas numbers
    let a = clacDist(p5.Vector.add(meP, meD), other);
    let b = clacDist(createVector(0, 0), meD);
    let c = clacDist(meP, other);
        //Calculate value
    let num = b*b + c*c - a*a;
    let den = 2 * b * c;
    let dir = acos(num/den);
    dir = degrees(dir);
    return(dir);
} 