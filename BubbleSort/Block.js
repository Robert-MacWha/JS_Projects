class Block {
    constructor(c, h, w) {
        this.c = c;
        this.h = h;
        this.w = w;
    }

    show (i) {
        rect(i*(width/this.c), height-this.h-10, this.w, this.h+10);
    }
}