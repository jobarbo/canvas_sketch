export default class Car {
	constructor(xsize, ysize, relDir, relSpeed, relSizeChange) {
		this.satArr = [10, 10, 60, 10, 10, 10, 10, 40, 10, 10, 10, 30, 60, 10, 10, 50, 40, 70];
		this.hueArr = [40, 40, 40, 40, 40, 0, 40, 120, 10, 10, 10, 80, 250, 40, 10, 20];
		this.brightArr = [10, 70, 100, 70, 70, 70, 70, 40, 70, 70, 35, 30, 90, 70, 70, 80, 40, 70];
		this.color = color(random(this.hueArr), random(this.satArr), random(this.brightArr));
		this.xpos = random(xsize, width - xsize);
		this.ypos = random(ysize, width - ysize);
		this.prevxpos = this.xpos;
		this.prevypos = this.ypos;
		this.xdirection = random(-relDir, relDir);
		this.ydirection = random(-relDir, relDir);
		this.xsize = xsize;
		this.ysize = ysize;
		this.alpha = 1;
		this.relSpeed = relSpeed;
		this.relSizeChange = relSizeChange;
	}

	display() {
		strokeWeight(width / 500);
		stroke(20, 5, 20, this.alpha);
		ellipseMode(CENTER);
		fill(this.color);
		//ellipse(this.xpos, this.ypos, this.xsize, this.ysize);
		stroke(20, 5, 20, this.alpha);
		line(this.prevxpos, this.prevypos, this.xpos, this.ypos);
	}

	move() {
		let xspeed = random(-0.8, 0.8);
		let yspeed = random(-0.8, 0.8);
		let nAlpha = random(-1, 1);
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
