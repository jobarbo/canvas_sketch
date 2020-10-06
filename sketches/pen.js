import { LinearEncoding } from 'three';

export default class Pen {
	constructor(startY) {
		this.x = 600;
		this.startY = startY;
		this.y = startY;
		this.diameter = random(3, 20);
		this.speedX = 5;
		this.speedY = 5;
		this.prevY = this.y;
		this.prevX = 600;
	}
	move(yoff) {
		this.prevY = this.y;
		this.prevX = this.x;
		if (this.x >= width - 600) {
			this.x = this.x;
			this.y = this.y;
		} else {
			this.x += this.speedX;
		}
		this.y = map(noise(yoff), 0, 1, 600, height - 600) + (this.startY - 600);
	}

	display() {
		let xc = constrain(this.x, 600, width - 600);
		let yc = constrain(this.y, 600, height - 600);
		let pxc = constrain(this.prevX, 600, width - 600);
		let pyc = constrain(this.prevY, 600, height - 600);

		strokeWeight(this.diameter);
		stroke(60, 5, 95, 100);
		line(pxc, pyc, xc, yc);

		strokeWeight(1);
		stroke(0, 0, 10, 0);
		fill(60, 5, 95, 100);
		ellipse(xc, yc, this.diameter, this.diameter);
	}
}
