export default class Stars {
	constructor(x, y, w, starsColor, bgColor) {
		this.x = x;
		this.y = y;
		this.initW = w;
		this.maxW = w * random(2, 4);
		this.minW = w * random(0.5, 0.8);
		this.w = this.minW;
		this.a = 100;
		this.minA = this.a * random(0.5, 1);
		this.h = starsColor[0];
		this.s = starsColor[1];
		this.l = starsColor[2];
		this.sh = bgColor[0];
		this.ss = bgColor[1];
		this.sl = bgColor[2];
		this.offset = random(0.075, 0.3);
		this.minOffset = random(0.0, 0.03);
		this.moveOffset = 1;

		// Module ready to be built
	}

	display(micLevel) {
		strokeWeight(2);
		stroke(this.sh, this.ss, this.sl, this.a);
		fill(this.h, this.s, this.l, this.a);
		ellipse(this.x, this.y, this.w);
	}

	move(micLevel) {
		this.moveOffset = map(micLevel, 0.0, 0.1, this.moveOffset - 1, this.moveOffset + 1);
		this.moveOffset = constrain(this.moveOffset, 0, 10);
		this.y += random(-this.moveOffset, this.moveOffset);
		this.x += random(-this.moveOffset / 20, this.moveOffset / 20);

		if (this.x >= width) {
			this.x = 0;
		} else if (this.x <= 0) {
			this.x = width;
		}
		if (this.y >= height) {
			this.y = 0;
		} else if (this.y <= 0) {
			this.y = height;
		}
	}

	oscilateWeight(micLevel) {
		// map micLevel from 0 to 1 to 0 to 100
		this.w = map(micLevel, this.minOffset, this.offset, this.minW, this.maxW);
		this.w = constrain(this.w, this.minW, this.maxW);
	}
}
