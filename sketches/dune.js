const palettes = require('nice-color-palettes/1000.json');
export default class Dune {
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
		this.saturation1 = 8;
		this.brightness1 = 5;
		this.saturation2 = 4;
		this.brightness2 = 91;
		this.rotated = false;
		this.rotationSpeed = this.initialRotationSpeed;
	}
	display(j) {
		//this.brightness2 += -0.01;
		//this.brightness1 += -0.01;
		//this.saturation2 += +0.01;
		//this.saturation1 += +0.01;
		strokeWeight(1);
		//count each seconds since the start of the sketch
		let seconds = int(j / 1000 + 1);
		if (seconds % 3 === 0) {
			stroke(24, this.saturation2, this.brightness2);
			fill(24, this.saturation2, this.brightness2);
			this.rotationSpeed = this.moddedRotationSpeed;
			this.rotated = true;
		} else if (seconds % 2 === 0) {
			stroke(21, this.saturation1, this.brightness1);
			fill(21, this.saturation1, this.brightness1);
			this.rotationSpeed = this.initialRotationSpeed;
			this.rotated = true;
		} else {
			if (!this.rotated) {
				stroke(24, this.saturation2, this.brightness2);
				fill(24, this.saturation2, this.brightness2);
				this.rotationSpeed = this.moddedRotationSpeed;
			}
		}
		push();
		this.angle = this.angle + this.rotationSpeed;
		translate(this.x, this.y);
		let c = cos(this.angle);
		rotate(this.angle);

		rect(0, 0, this.w, this.w, 50, 50, 50, 50);
		pop();
	}
	move() {
		if (this.w <= 15) {
			this.w = 10;
			this.y = this.y;
		} else {
			// /this.x += random(-20, 20);
			this.y += random(-3, 17);
			this.w += random(-1, 1);
		}
	}
}
