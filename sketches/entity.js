export default class Entity {
	constructor(x, y, w) {
		this.x = x;
		this.y = y;
		this.w = w;
		// Module ready to be built
	}

	display() {
		stroke(10, 10, 90);
		strokeWeight(10);
		fill(244, 70, 90);
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
