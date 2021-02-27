export default class Firefly {
	constructor(x, y, rdnX, rdnY) {
		this.x = x;
		this.y = y;
		this.rdnX = rdnX;
		this.rdnY = rdnY;
		this.t = 0;
		this.treshold = 0;
		this.brightness = 0;
	}

	display() {
		this.t += 0.01;
		this.treshold = this.treshold + random(-5, 5);
		if (this.treshold > 70) {
			this.brightness = this.brightness + 2;
			if (this.treshold > 100) {
				this.treshold = 100;
			}
		} else {
			this.brightness = this.brightness - 2;
			if (this.treshold < 0) {
				this.treshold = 0;
			}
		}

		const x = width * noise(this.t + this.rdnX);
		const y = height * noise(this.t + this.rdnY);
		stroke(50, 60, 100, this.brightness);
		strokeWeight(10);
		point(x, y);
	}
}
