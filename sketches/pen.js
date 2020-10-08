import { LinearEncoding } from 'three';

export default class Pen {
	constructor(startY) {
		this.x = -300;
		this.startY = startY;
		this.y = startY;
		this.dArr = [30, 120, 240];
		this.diameter = random(this.dArr);
		this.speedX = 5;
		this.prevY = this.y;
		this.prevX = this.x;
	}
	move(yoff) {
		this.prevY = this.y;
		this.prevX = this.x;
		this.x += this.speedX;

		this.y = map(noise(yoff), 0, 1, 0, height) + this.startY;
	}

	display() {
		let xc = constrain(this.x - 100, 0, width + 100);
		let yc = constrain(this.y - 100, 0, height + 100);
		let pxc = constrain(this.prevX - 100, 0, width + 100);
		let pyc = constrain(this.prevY - 100, 0, height + 100);

		if (this.x <= 100) {
			stroke(60, 5, 95, 0);
		} else {
			stroke(60, 5, 95, 100);
		}
		strokeWeight(this.diameter);
		line(pxc, pyc, xc, yc);

		strokeWeight(1);
		stroke(0, 0, 10, 0);
		fill(60, 5, 95, 100);
		ellipse(xc, yc, this.diameter, this.diameter);
	}
}
