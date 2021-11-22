export default class Stars {
	constructor(x, y, w) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.a = 10;
		// Module ready to be built
	}

	display() {
		stroke(10, 10, 90, 100);
		fill(0, 100, 100, this.a);
		ellipse(this.x, this.y, this.w);
	}

	move() {
		this.x += random(-50, 50);
		this.y += random(-50, 50);
		this.w += random(-1, 1);
		if (this.x >= width) {
			this.x = width;
		} else if (this.x <= 0) {
			this.x = 0;
		}
	}
}
