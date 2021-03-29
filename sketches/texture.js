export default class Smudge {
	constructor(rdnX, rdnY, w1) {
		this.xoff = 0;
		this.yoff = 1;
		this.woff1 = 0;
		this.rdnX = rdnX;
		this.rdnY = rdnY;
		this.rdnW1 = w1;
		this.t = 0;
		this.alpha = random(0, 25);
	}

	display() {
		//blendMode(BLEND);
		push();
		translate(-width / 2, -height / 2);
		for (let index = 0; index < 300; index++) {
			//blendMode(OVERLAY);
			this.xoff += 0.00005;
			this.yoff += 0.000035;
			this.woff1 += 5;

			const w1 = 50 * noise(this.woff1 + this.rdnW1);
			const x = width * 2 * noise(this.xoff + this.rdnX);
			const y = (height / 1.5) * 2 * noise(this.yoff + this.rdnY);

			fill(180, 0, 100, this.alpha);
			noStroke();
			ellipse(x, y, w1, w1);
			this.t += 0.001;
		}
		pop();
	}
}
