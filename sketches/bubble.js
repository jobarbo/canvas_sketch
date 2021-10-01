export default class Bubble {
	constructor(sHue, sSat, sBright, fHue, fSat) {
		this.startX = randomGaussian(width / 2, 100);
		this.rdnX = random(0, 5);
		this.xoff = 0.02;
		// this.xoff = 0.01;
		this.x = this.startX;
		// this.startY = height + 100;
		// this.rdnY = this.startY;
		this.yoff = 0;
		this.y = height + 100;
		this.noiseR = random(0, 50);
		this.diameter = width / 30;
		this.speedY = random(-60, -20);
		this.strokeWeight = this.speedY * -0.75;
		this.strokeHue = sHue;
		this.strokeSaturation = sSat;
		this.strokeBright = sBright;
		this.strokeAlpha = 100;
		this.fillAlpha = 100;
		this.fillHue = fHue;
		this.fillSat = fSat;
		this.dMultiply = 0.1;
		if (this.strokeBright > 65) {
			this.fillBright = 10;
		} else {
			this.fillBright = 90;
		}
	}
	move() {
		if (this.diameter <= 0) {
			this.diameter = 0;
		} else if (this.diameter > 700 && this.diameter <= 1500) {
			this.diameter += 30;
			this.fillAlpha += -12;
			this.fillHue += 10;
		} else if (this.diameter > 1500) {
			this.diameter = 1500;
		} else {
			this.diameter += random(-2, this.dMultiply);
			this.x += this.rdnX;
			this.rdnX = map(noise(this.xoff + this.noiseR), 0, 1, -80, 80);
			this.y += this.speedY;
			//this.rdnY = map(noise(this.yoff + this.startY), 0, 1, this.y - 60, this.y + 5);
			this.dMultiply = this.dMultiply * 1.07;
		}

		this.xoff += 0.0155;
		this.yoff += 0.1;
	}

	display() {
		if (this.diameter <= 0 || this.diameter >= 700) {
			blendMode(OVERLAY);
			noStroke();
		} else {
			blendMode(BLEND);
			stroke(this.strokeHue, this.strokeSaturation, this.strokeBright, this.strokeAlpha);
			strokeWeight(this.strokeWeight);
		}
		fill(this.fillHue, this.fillSat, this.fillBright, this.fillAlpha);
		ellipse(this.x, this.y, this.diameter, this.diameter);
	}
}
