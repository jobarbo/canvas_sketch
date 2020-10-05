export default class Pen {
	constructor() {
		this.x = random(0, width);
		this.y = height - 600;
		this.diameter = random(1, 15);
		this.speed = 10;
		this.dxArray = [-1, 1];
		this.dyArray = [-1, 1];
		this.dx = Math.floor(random(this.dxArray));
		this.dy = Math.floor(random(this.dyArray));
	}
	move() {
		this.x += random(-this.speed + this.dx, this.speed + this.dx);
		this.y += random(-this.speed + this.dy, this.speed + this.dy);
	}

	display() {
		let xc = constrain(this.x, 600, width - 600);
		let yc = constrain(this.y, 600, height - 600);

		stroke(0, 0, 10, 10);
		fill(60, 5, 95, 10);
		ellipse(xc, yc, this.diameter, this.diameter);
	}
}
