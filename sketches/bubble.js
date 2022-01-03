export default class Bubble {
	constructor(sHue, sSat, sBright, fHue, fSat) {
		this.startX = random(width / 2 - 2000, width / 2 + 2000);
		this.rdnX = random(0, 5);
		this.xoff = 0.01;
		this.x = this.startX;
		this.startY = height + 400;
		this.rdnY = this.startY;
		this.yoff = 0;
		this.y = height + 400;
		this.noiseR = 5;
		this.diameter = random(width / 25, width / 15);
		this.speedY = random(-60, -25);
		this.strokeWeight = this.speedY * -0.75;
		this.strokeHue = sHue;
		this.strokeSaturation = sSat;
		this.strokeBright = sBright;
		this.strokeAlpha = 100;
		this.fillHue = fHue;
		this.fillSat = fSat;
		if (this.strokeBright > 65) {
			this.fillBright = 10;
		} else {
			this.fillBright = 90;
		}
	}
	move() {
		if (this.diameter <= 0) {
			this.diameter = 0;
		} else {
			this.diameter += random(-10, 0);
			this.x += this.rdnX;
			this.rdnX = map(noise(this.xoff + this.noiseR), 0, 1, -60, 60);
			this.y += this.speedY;
			//this.rdnY = map(noise(this.yoff + this.startY), 0, 1, this.y - 60, this.y + 5);
		}
		this.xoff += 0.065;
		this.yoff += 0.1;
	}

	display() {
		if (this.diameter <= 0) {
			noStroke();
		} else {
			stroke(this.strokeHue, this.strokeSaturation, this.strokeBright, this.strokeAlpha);
			strokeWeight(this.strokeWeight);
			fill(this.fillHue, this.fillSat, this.fillBright, 100);
			ellipse(this.x, this.y, this.diameter, this.diameter);
		}
	}
}
