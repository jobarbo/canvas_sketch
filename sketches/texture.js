export default class Smudge {
	constructor(rdnX, rdnY, w1) {
		this.xoff = 0;
		this.yoff = 1;
		this.woff1 = 0;
		this.rdnX = rdnX;
		this.rdnY = rdnY;
		this.rdnW1 = w1;
		this.alpha = random(60, 80);
	}

	display() {
		blendMode(BLEND);
		for (let index = 0; index < 1500; index++) {
			this.xoff += 0.0002;
			this.yoff += 0.00021;
			this.woff1 += 0.00055;

			const w1 = map(noise(this.woff1 + this.rdnW1), 0, 1, 20, 150);
			const x = map(noise(this.xoff + this.rdnX), 0, 1, 0, width);
			const y = map(noise(this.yoff + this.rdnY), 0, 1, 0, height);

			fill(0, 0, 10, this.alpha);
			noStroke();
			ellipse(x, y, w1, w1);
		}
	}
}
