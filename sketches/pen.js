export default class Pen {
	constructor(y) {
		this.x = 600;
		this.y = y;
		this.diameter = random(3, 20);
		this.speedX = 5;
		this.speedY = 5;
	}
	move(dx, dy) {
		//this.x += dx + random(-this.speedX, this.speedX);
		this.x += dx + this.speedX;
		this.y += dy;
	}

	display() {
		let xc = constrain(this.x, 600, width - 600);
		let yc = constrain(this.y, 600, height - 600);

		strokeWeight(1);
		stroke(0, 0, 10, 50);
		fill(60, 5, 95, 100);
		ellipse(xc, yc, this.diameter, this.diameter);
	}
}
