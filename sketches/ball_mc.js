export default class Ball_mc {
	constructor(x, y, rdnX, rdnY) {
		this.x = x;
		this.y = y;
		this.rdnX = rdnX;
		this.rdnY = rdnY;
		this.t = 0;
		this.brightness = 100;
	}

	display() {
		const x = this.x;
		const y = this.y;
		strokeWeight(5);
		fill(50, 0, 100, 100);
		ellipse(x, y, 500, 500);
	}
}
