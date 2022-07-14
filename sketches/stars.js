export default class Stars {
	constructor(x, y, w, mic) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.a = 10;
		this.mic = mic;
		// Module ready to be built
	}

	display() {
		stroke(10, 10, 90, 100);
		fill(0, 100, 100, this.a);
		ellipse(this.x, this.y, this.w);
	}

	move() {
		this.x += random(-10, 10);
		this.y += random(-10, 10);
		if (this.x >= width) {
			this.x = width;
		} else if (this.x <= 0) {
			this.x = 0;
		}
	}
	// get the level of the mic input
	getLevel() {
		return this.mic.getLevel();
	}
	oscilateWeight() {
		console.log(this.mic.getLevel());
		this.w += random(-5, 5);
		// do not let the weight go below 0
		if (this.w <= 0) {
			this.w = 0;
		} else if (this.w >= 100) {
			this.w = 100;
		}
	}
}
