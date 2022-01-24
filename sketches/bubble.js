export default class Bubble {
	constructor(sHue, sSat, sBright, fHue, fSat, fBright) {
		this.startX = random(-1500, width + 1500);
		this.rdnX = random(0, 150);
		this.xoff = 0.01;
		this.x = this.startX;
		this.startY = height + 400;
		this.rdnY = this.startY;
		this.yoff = 0;
		this.y = height + 400;
		this.noiseR = 5;
		this.diameter = random(width / 50, width / 25);
		this.speedY = random(-1, -20);
		this.strokeWeight = this.speedY * -0.25;
		this.strokeHue = sHue;
		this.strokeSaturation = sSat - 30;
		this.strokeBright = sBright;
		this.strokeAlpha = 30;
		this.fillHue = fHue;
		this.fillSat = fSat;
		this.fillBright = fBright;
	}
	move() {
		if (this.diameter <= 0) {
			this.diameter = 0;
		} else {
			this.diameter += random(-4, 2);
			this.x += this.rdnX;
			this.rdnX = map(noise(this.xoff + this.noiseR), 0, 1, -5, 5);
			this.y += this.speedY;
			//this.rdnY = map(noise(this.yoff + this.startY), 0, 1, this.y - 60, this.y + 5);
		}
		this.xoff += 0.025;
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
