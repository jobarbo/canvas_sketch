export default class Smudge {
	constructor(x, y, w1, w2) {
		this.xoff = 0;
		this.yoff = 1;
		this.woff1 = 0;
		this.woff2 = 0;
		this.x = x;
		this.y = y;
		this.w1 = w1;
		this.w2 = w2;
	}

	display() {
		for (let index = 0; index < 5000; index++) {
			this.x = this.x + map(noise(this.xoff), 0, 1, -1000, width + 1000);
			this.y = this.y + map(noise(this.yoff), 0, 1, -1000, height + 1000);
			this.xoff += 0.001;
			this.yoff += 0.0015;
			this.w1 = map(noise(this.woff1), 0, 1, 1, 20);
			this.w2 = map(noise(this.woff2), 0, 1, 1, 20);
			this.woff1 += 0.005;
			this.woff2 += 0.001;
			strokeWeight(6);
			fill(0, 0, 0);
			stroke(0, 0, 0);
			ellipse(this.x, this.y, this.w1, this.w2);
		}
	}
}
