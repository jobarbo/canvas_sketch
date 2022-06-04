export default class Mover {
	constructor(x, y, scl1, scl2, seed) {
		this.x = x;
		this.y = y;
		this.hue = 0;
		//this.s = random(random(random(random(min(width, height) * 0.02)))) + 1;
		this.s = 3;
		this.scl1 = scl1;
		this.scl2 = scl2;
		this.seed = seed;
	}

	show() {
		//
		//blendMode(MULTIPLY);
		fill(43, 99, 100, 1);
		//stroke(34, 40, 90,80);
		noStroke();
		circle(this.x, this.y, this.s);
	}

	move() {
		let p = superCurve(this.x, this.y, this.scl1, this.scl2, this.seed);
		this.x += p.x / 5;
		this.y += p.y / 5;
		this.s = map(p.x, -4, 4, -10, 10);
		if (this.s > -5 && this.s < 5) {
			this.s = 5;
		}
	}
}

function superCurve(x, y, scl1, scl2, seed) {
	let u = sin(y * scl1 + seed) + cos(y * scl2 + seed) + sin(y * scl2 * 0.2 + seed);
	let v = sin(x * scl1 + seed) + cos(x * scl2 + seed) - sin(x * scl2 * 0.2 + seed);
	let p = createVector(u, v);
	return p;
}
