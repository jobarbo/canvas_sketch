export default class Pen {
	constructor(startX1, startX2) {
		this.y = 600;
		this.startX1 = startX1;
		this.startX2 = startX2;
		this.x1 = startX1;
		this.x2 = startX2;
		this.speedY = 2;
		this.prevY = this.y;
		this.prevX = this.x;
		this.speedLimit = 600 + this.speedY;
	}
	move(xoff1, xoff2) {
		if (this.y < height - this.speedLimit) {
			this.y += this.speedY;
			this.x1 = map(noise(xoff1), 0, 1, 300, width / 4) + this.startX1;
			this.x2 = map(noise(xoff2), 0, 1, this.x1, this.x1 + 200) + this.startX2;
		}
	}

	display() {
		if (this.x <= 100) {
			stroke(60, 5, 95, 100);
		} else {
			stroke(60, 5, 95, 100);
		}
		strokeCap(SQUARE);
		strokeWeight(5);
		line(this.x1, this.y, this.x2, this.y);
	}
}
