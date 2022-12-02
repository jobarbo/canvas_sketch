export default class Cell {
	constructor(x, y, w, h, margin, xoff, yoff, iterationX, iterationY) {
		// Module ready to be built
		this.x = x + w / 2;
		this.y = y + h / 2;
		this.w = int(w - margin);
		this.h = int(h - margin);
		this.xoff = xoff;
		this.yoff = yoff;
		this.bArr = [0, 25, 50, 75, 100];
		this.bi = 0;

		console.log(this.w);
	}
	display(iterationX, iterationY) {
		// Module ready to be built
		let n = noise(this.xoff, this.yoff) * 100;
		this.bi = int(map(n, 30, 70, 0, this.bArr.length - 1));
		fill(200, 100, this.bArr[this.bi]);
		noStroke();
		rect(this.x, this.y, this.w, this.h);

		this.xoff += iterationX;
		this.yoff += iterationY;
	}
}
