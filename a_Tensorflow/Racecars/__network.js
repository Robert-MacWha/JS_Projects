class NeuralNetwork {
    constructor (shape) {
        //Get the sizes of the layers
        this.nodes = shape;
        //Initialise the random weights
        this.weights = [];
        for(let i = 0; i < shape.length-1; i ++) {
            this.weights[i] = tf.randomNormal([this.nodes[i], this.nodes[i+1]]);
        }
    }

    predict (user_input) {
        let output;
        tf.tidy(() => {
            /* Tutorial Method
            //Create the input layer
            let input_layer = tf.tensor(user_input, [1, this.nodes[0]]); 
            let output_Layer = input_layer;
            //Loop over each hidden layer
            for(let i = 0; i < this.nodes.length-1; i ++) {
                output_Layer = output_Layer.matMul(this.weights[i]).sigmoid();
            }
            //Get the output
            output = output_Layer.dataSync();
            */
            //My Method
            let output_Layer = user_input;
            //Loop over each layer
            for(let i = 0; i < this.nodes.length-1; i ++) {
                let index = 0;
                let layer = [];
                //And each input
                for(let j = 0; j < this.nodes[i+1]; j ++) {
                    let out = 0;
                    //And each of the next layer's inputs
                    for(let k = 0; k < output_Layer.length; k ++) {
                        out += this.weights[i].dataSync()[index] * output_Layer[k];
                        //print(this.weights[i].dataSync()[index] + ", " + output_Layer[j]);
                        index++;
                    }
                    out = Math.tanh(out);
                    layer.push(out);
                }
                //print(layer);
                output_Layer = layer;
            }
            output = output_Layer;
        });
        //print(output);
        //print("______________");
        return (output);
    }

    clone () {
        let clonie = new NeuralNetwork(this.nodes);
        clonie.dispose();
        //Get all of the weights
        for(let i = 0; i < this.weights.length; i ++) {
            clonie.weights[i] = tf.clone(this.weights[i]);
        }
        //Return the clone
        return (clonie);
    }

    dispose () {
        for(let i = 0; i < this.weights.length; i ++) {
            this.weights[i].dispose();
        }
    }

    mutate () {
        //Get a random number
        function fn(x) {
			if (random(1) < 0.05) {
				let offset = randomGaussian() * 0.5;
				let newx = x + offset;
				return newx;
			}
			return x;
		}
    }
}