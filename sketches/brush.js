export default class Brush {
	constructor(xsize, ysize, relDir, relSpeed, relSizeChange) {
		this.fillAlpha = 50;
		this.fillPalettes = [
			[0, 0, 35, this.fillAlpha],
			[0, 0, 50, this.fillAlpha],
			[0, 0, 65, this.fillAlpha],
			[0, 0, 80, this.fillAlpha],
			[0, 0, 95, this.fillAlpha],
		];
		this.strokeAlpha = 1;
		this.strokePalettes = [
			[239, 97, 37, this.strokeAlpha],
			[214, 99, 54, this.strokeAlpha],
			[201, 100, 71, this.strokeAlpha],
			[195, 100, 78, this.strokeAlpha],
			[190, 100, 85, this.strokeAlpha],
			[190, 68, 89, this.strokeAlpha],
			[189, 40, 94, this.strokeAlpha],
			[190, 29, 96, this.strokeAlpha],
			[190, 19, 97, this.strokeAlpha],
		];

		this.fillColor = color(random(this.fillPalettes));
		this.strokeColor = color(random(this.strokePalettes));
		//this.xpos = random(xsize, width - xsize);
		//this.ypos = random(ysize, height - ysize);
		//this.xpos = random(width / 1.5, width / 2.5);
		//this.ypos = random(height / 1.5, height / 2.5);
		this.xpos = random(0, width);
		this.ypos = random(0, height);
		this.prevxpos = this.xpos;
		this.prevypos = this.ypos;
		this.xdirection = random(-relDir, relDir);
		this.ydirection = random(-relDir, relDir);
		this.xsize = xsize;
		this.ysize = ysize;
		this.relSpeed = relSpeed;
		this.relSizeChange = relSizeChange;
	}

	display() {
		strokeWeight(width / 500);
		stroke(this.strokeColor);
		ellipseMode(CENTER);
		fill(this.fillColor);
		ellipse(this.xpos, this.ypos, this.xsize, this.ysize);
		//stroke(this.strokeColor);
		//line(this.prevxpos, this.prevypos, this.xpos, this.ypos);
	}

	move() {
		let xspeed = random(-0.5, 0.5);
		let yspeed = random(-0.5, 0.5);
		let nAlpha = random(-1, 1);
		this.fillAlpha = this.fillAlpha + nAlpha;
		this.prevxpos = this.xpos;
		this.prevypos = this.ypos;
		this.xpos = this.xpos + this.xdirection * xspeed;
		this.ypos = this.ypos + this.ydirection * yspeed;
		if (this.fillAlpha > 100) {
			this.strokeAlpha = 100;
		} else if (this.fillAlpha < 0) {
			this.strokeAlpha = 0;
		}
		if (this.xpos > width) {
			this.xpos = 0;
			this.prevxpos = 0;
		}
		if (this.xpos < 0) {
			this.xpos = width;
			this.prevxpos = width;
		}
		if (this.ypos > height) {
			this.ypos = 0;
			this.prevxpos = 0;
		}
		if (this.ypos < 0) {
			this.ypos = height;
			this.prevxpos = height;
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
