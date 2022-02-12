const palettes = require('nice-color-palettes/1000.json');
export default class Stalagmite {
	constructor(x, y, w) {
		this.palettes = random(palettes);
		this.x = x;
		this.y = y;
		this.w = w;
		this.angle = 0.0;
		this.rotationModList = [-25, -10, -3, -2, 0, 3, 4, 10, 22];
		this.baseColor = this.palettes[0];
		this.initialRotationSpeed = random(0, 1);
		this.moddedRotationSpeed = random(this.rotationModList);
		this.rotationSpeed = this.initialRotationSpeed;
	}
	display() {
		if (second() % 2 === 0) {
			let ranColor = this.palettes[int(random(1, 5))];
			stroke(0, 0, 0);
			fill(ranColor);
			this.rotationSpeed = this.moddedRotationSpeed;
		} else {
			stroke(10, 10, 100);
			fill(this.baseColor);
			this.rotationSpeed = this.initialRotationSpeed;
		}
		push();
		this.angle = this.angle + this.rotationSpeed;
		translate(this.x, this.y);
		let c = cos(this.angle);
		rotate(this.angle);
		rect(0, 0, this.w);
		pop();
	}
	move() {
		if (this.w <= 15) {
			this.w = 10;
			this.y = this.y;
		} else {
			this.y += random(-5, 0);
			this.w += random(-10, 9);
		}
	}
}
