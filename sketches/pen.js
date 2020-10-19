import { LinearEncoding } from 'three';

export default class Pen {
	constructor(startX) {
		this.y = 600;
		this.startX = startX;
		this.x = startX;
		this.speedY = 3;
		this.prevY = this.y;
		this.prevX = this.x;
	}
	move(xoff) {
		this.prevY = this.y;
		this.prevX = this.x;
		if (this.y < height - 600) {
			this.y += this.speedY;
		}

		this.x = map(noise(xoff), 0, 1, 600, width / 2) + this.startX;
	}

	display() {
		let xc = constrain(this.x - 100, 0, width + 100);
		let yc = constrain(this.y - 100, 0, height + 100);
		let pxc = constrain(this.prevX - 100, 0, width + 100);
		let pyc = constrain(this.prevY - 100, 0, height + 100);

		if (this.x <= 100) {
			stroke(60, 5, 95, 100);
		} else {
			stroke(60, 5, 95, 100);
		}
		strokeCap(SQUARE);
		strokeWeight(5);
		line(600, this.y, this.x, this.y);
	}
}
