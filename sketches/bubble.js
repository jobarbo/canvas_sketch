export default class Bubble {
	constructor() {
		this.x = random(width, width + 100);
		this.y = random(height);
		this.diameter = random(20, 420);
		this.speed = 20;
	}
	move() {
		if (this.diameter <= 0) {
			this.diameter = 0;
		} else {
			this.diameter += random(-1.3, 1);
			this.x += random(-this.speed - 5, this.speed);
			this.y += random(-this.speed - 8, this.speed);
		}
	}

	display() {
		if (this.diameter <= 0) {
			noStroke();
		} else {
			strokeWeight(10);
			stroke(0, 0, 15);
			fill(0, 0, 90, 100);
			ellipse(this.x, this.y, this.diameter, this.diameter);
		}
	}
}
