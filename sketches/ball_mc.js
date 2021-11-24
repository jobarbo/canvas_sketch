export default class Car {
	constructor(xsize, ysize, relDir, relSpeed, relSizeChange) {
		this.satArr = [10, 10, 10, 40, 10, 0, 0, 10, 60];
		this.hueArr = [40, 40, 40, 40, 40, 0, 40, 120, 10, 10, 10, 80, 250, 40, 10, 20];
		this.brightArr = [70, 70, 80, 80, 90];
		this.color = color(random(this.hueArr), random(this.satArr), random(this.brightArr));
		this.xpos = random(xsize, width - xsize);
		this.ypos = random(ysize, width - ysize);
		this.prevxpos = this.xpos;
		this.prevypos = this.ypos;
		this.xdirection = random(-relDir, relDir);
		this.ydirection = random(-relDir, relDir);
		this.xsize = xsize;
		this.ysize = ysize;
		this.alpha = 0.1;
		this.relSpeed = relSpeed;
		this.relSizeChange = relSizeChange;
	}

	display() {
		strokeWeight(width / 500);
		stroke(20, 5, 20, this.alpha);
		ellipseMode(CENTER);
		fill(this.color);
		ellipse(this.xpos, this.ypos, this.xsize, this.ysize);
		//stroke(20, 5, 20, this.alpha);
		//line(this.prevxpos, this.prevypos, this.xpos, this.ypos);
	}

	move() {
		let xspeed = random(-1, 1);
		let yspeed = random(-1, 1);
		let nAlpha = random(-0.2, 0.2);
		this.alpha = this.alpha + nAlpha;
		this.prevxpos = this.xpos;
		this.prevypos = this.ypos;
		this.xpos = this.xpos + this.xdirection * xspeed;
		this.ypos = this.ypos + this.ydirection * yspeed;
		if (this.alpha > 100) {
			this.alpha = 100;
		} else if (this.alpha < 0) {
			this.alpha = 0;
		}
		if (this.xpos > width) {
			this.xpos = 0;
			this.prevxpos = 0;
		}
		if (this.xpos < 0) {
			this.xpos = width;
			this.prevxpos = width;
		}
	}

	shrink() {
		this.xsize -= this.relSizeChange;
		this.ysize -= this.relSizeChange;
		if (this.xsize <= this.relSizeChange) {
			this.xsize = this.relSizeChange;
		}
		if (this.ysize <= this.relSizeChange) {
			this.ysize = this.relSizeChange;
		}
	}
}
