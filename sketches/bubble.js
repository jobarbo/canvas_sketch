export default class Bubble {
	constructor() {
		this.x = randomGaussian(width / 2, 50);
		this.y = randomGaussian(height, 200);
		this.diameter = random(150, 500);
		this.speed = 40;
	}
	move() {
		if (this.diameter <= 0) {
			this.diameter = 0;
		} else {
			this.diameter += random(-3, 1);
			this.x += random(-this.speed, this.speed);
			this.y += random(-this.speed - 20, this.speed);
		}
	}

	display() {
		if (this.diameter <= 0) {
			noStroke();
		} else {
			stroke(60, 5, 95);
			strokeWeight(15);
			fill(0, 0, 10, 100);
			ellipse(this.x, this.y, this.diameter, this.diameter);
		}
	}
}
