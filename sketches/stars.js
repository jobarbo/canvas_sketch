export default class Stars {
	constructor(x, y, w, mic) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.a = 10;
		this.h = 0;

		// Module ready to be built
	}

	display(micLevel) {
		this.h = map(micLevel, 0.03, 0.15, 0, 360);
		this.h = constrain(this.h, 0, 360);
		stroke(10, 10, 90, 100);
		fill(this.h, 100, 100, this.a);
		ellipse(this.x, this.y, this.w);
	}

	move(micLevel) {
		this.x += random(-1, 1);
		this.y += random(-this.w / 3, this.w / 3);
		if (this.x >= width) {
			this.x = 0;
		} else if (this.x <= 0) {
			this.x = width;
		}
	}

	oscilateWeight(micLevel) {
		// map micLevel from 0 to 1 to 0 to 100
		this.w = map(micLevel, 0.03, 0.15, 0, 500);
		this.w = constrain(this.w, 0, 500);
		//this.w += random(-5, 5);
		// do not let the weight go below 0
		if (this.w <= 0) {
			this.w = 0;
		} else if (this.w >= 300) {
			this.w = 300;
		}
	}
}
