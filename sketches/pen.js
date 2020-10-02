export default class Pen {
	constructor() {
		this.x = width / 2;
		this.y = height / 2;
		this.diameter = random(1, 15);
		this.speed = 8;
		this.direction = [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];
		this.dx = Math.floor(random(this.direction));
		this.dy = Math.floor(random(this.direction));
	}
	move() {
		this.x += random(-this.speed + this.dx, this.speed + this.dx);
		this.y += random(-this.speed + this.dy, this.speed + this.dy);
	}

	display() {
		let xc = constrain(this.x, 600, width - 600);
		let yc = constrain(this.y, 600, height - 600);

		stroke(60, 5, 95, 10);
		fill(0, 0, 0, 10);
		ellipse(xc, yc, this.diameter, this.diameter);
	}
}
