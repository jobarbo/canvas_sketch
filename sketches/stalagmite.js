const palettes = require('nice-color-palettes/1000.json');
export default class Stalagmite {
	constructor(x, y, w) {
		this.palettes = ['#d8d8d8', '#e2d9d8', '#ecdad8', '#f5dbd8', '#ffdcd8'];
		console.log(this.palettes);
		this.x = x;
		this.y = y;
		this.w = w;
		this.angle = 45;
		// this.rotationModList = [-0.25, -0.2, -0.15, -0.1, -0.05];
		this.baseColor = color(0, 0, 10);
		this.initialRotationSpeed = 0.15;
		this.moddedRotationSpeed = -0.15;
		this.rotationSpeed = this.initialRotationSpeed;
	}
	display() {
		if (second() % 2 === 0) {
			stroke(24, 24, 87);
			fill(21, 38, 80);
			this.rotationSpeed = this.moddedRotationSpeed;
		} else {
			stroke(21, 38, 80);
			fill(24, 24, 87);
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
			this.y += random(-4, 5);
			this.w += random(-10, 3);
		}
	}
}
