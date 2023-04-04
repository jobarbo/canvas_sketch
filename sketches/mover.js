export default class Mover {
	constructor(x, y, scl1, scl2, seed) {
		this.x = x;
		this.y = y;
		this.hue = 0;
		//this.s = random(random(random(random(min(width, height) * 0.01)))) + 1;
		this.s = 4;
		this.scl1 = scl1;
		this.scl2 = scl2;
		this.seed = seed;
	}

	show() {
		//
		//blendMode(MULTIPLY);
		fill(210, 49, 10, 10);
		//stroke(34, 40, 90,80);
		noStroke();
		rect(this.x, this.y, this.s);
	}

	move() {
		let p = superCurve(this.x, this.y, this.scl1, this.scl2, this.seed);
		this.x += p.x / random(0.001, 2.9) + random(-0.1, 0.1);
		this.y += p.y / random(0.001, 2.9) + random(-0.1, 0.1);
		this.s += map(p.x, -4, 4, -0.1, 0.1);
		if (this.s < 1) {
			this.s = 1;
		}
		if (this.s > 10) {
			this.s = 10;
		}
	}
}

function superCurve(x, y, scl1, scl2, seed) {
	let u = map(noise(x * scl1, y * scl1, seed), 0, 1, -4, 4);
	let v = map(noise(x * scl2, y * scl2, seed), 0, 1, -4, 4);
	let p = createVector(u, v);
	return p;
}
