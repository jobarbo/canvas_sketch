export default class Bubble {
	constructor(xoff, yoff, xStep, yStep) {
		this.xoff = xoff;
		this.yoff = yoff;
		this.xStep = xStep;
		this.yStep = yStep;
		this.x = map(noise(this.xoff), 0, 1, 200, width - 200);
		this.y = map(noise(this.yoff), 0, 1, 200, height - 200);
		this.diameter = random(10, 20);
		this.speed = this.diameter / 10;
		this.choords = [];
	}
	move() {
		this.x = map(noise(this.xoff), 0, 1, 200, width - 200);
		this.y = map(noise(this.yoff), 0, 1, 200, height - 200);
		this.xoff += this.xStep;
		this.yoff += this.yStep;
	}

	display() {
		strokeWeight(2);
		stroke(60, 5, 10);
		fill(0, 0, 0, 100);
		ellipse(this.x, this.y, this.diameter, this.diameter);
	}
}
