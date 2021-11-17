export default class Car {
	constructor(xsize, ysize, relDir, relSpeed, relSizeChange) {
		this.color = color(40, 10, 90);
		this.xpos = random(xsize, width - xsize);
		this.ypos = random(ysize, width - ysize);
		this.xdirection = random(-relDir, relDir);
		this.ydirection = random(-relDir, relDir);
		this.xsize = xsize;
		this.ysize = ysize;
		this.alpha = 5;
		this.relSpeed = relSpeed;
		this.relSizeChange = relSizeChange;
		console.log(this.relSizeChange);
	}

	display() {
		strokeWeight(width / 500);
		stroke(20, 5, 20, this.alpha);
		ellipseMode(CENTER);
		fill(this.color);
		ellipse(this.xpos, this.ypos, this.xsize, this.ysize);
	}

	move() {
		let xspeed = random(-1, 1);
		let yspeed = random(-1, 1);
		let nAlpha = random(-1.01, 1.01);
		this.alpha = this.alpha + nAlpha;
		this.xpos = this.xpos + this.xdirection * xspeed;
		this.ypos = this.ypos + this.ydirection * yspeed;
		if (this.alpha > 100) {
			this.alpha = 100;
		} else if (this.alpha < 0) {
			this.alpha = 0;
		}
		if (this.xpos > width) {
			this.xpos = 0;
		}
		if (this.xpos < 0) {
			this.xpos = width;
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
