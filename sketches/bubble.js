export default class Bubble {
	constructor() {
		this.x = random(width);
		this.y = random(0, 0 - 5);
		this.diameter = random(60, 420);
		this.speed = 0;
	}
	move() {
		if (this.diameter <= 50) {
			this.diameter = 0;
		} else {
			this.diameter += random(-2.5, 1);
			this.x += random(this.speed - 2, this.speed + 2);
			this.y += random(this.speed + 15, this.speed);
		}
	}

	display() {
		if (this.diameter <= 0) {
			noStroke();
		} else {
			noStroke();
			fill(45, 20, 90, 100);
			ellipse(this.x, this.y, this.diameter, this.diameter);
		}
	}
}
