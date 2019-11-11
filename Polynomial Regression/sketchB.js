function setup () {
    let a = tf.tensor1d([1, 2, 3, 4]);
    let b = tf.tensor1d([4, 3, 2, 1]);
    let d = tf.tensor1d([2, 2, 2, 2]);
    let c = a.add(b).mul(d);
    c = tf.add(a, c);
    c.print();
}