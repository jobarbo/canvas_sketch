export default class Bubble {
	constructor(sHue, sSat, sBright) {
		this.x = randomGaussian(width / 2, width / 20);
		this.y = randomGaussian(height, 200);
		this.diameter = random(width / 25, width / 15);
		this.speed = 40;
		this.strokeHue = sHue;
		this.strokeSaturation = sSat;
		this.strokeBright = sBright;
		this.fillHue = 0;
		this.fillSat = 0;
		if (this.strokeBright > 50) {
			this.fillBright = 10;
		} else {
			this.fillBright = 90;
		}
	}
	move() {
		if (this.diameter <= 0) {
			this.diameter = 0;
		} else {
			this.diameter += random(-3, 1);
			this.x += random(-this.speed, this.speed);
			this.y += random(-this.speed - 20, this.speed);
		}
	}

	display() {
		if (this.diameter <= 0) {
			noStroke();
		} else {
			stroke(this.strokeHue, this.strokeSaturation, this.strokeBright);
			strokeWeight(15);
			// blendMode(DIFFERENCE);
			fill(this.fillHue, this.fillSat, this.fillBright, 100);
			ellipse(this.x, this.y, this.diameter, this.diameter);
			// blendMode(BLEND);
		}
	}
}
