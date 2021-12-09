export default class Brush {
	constructor(xsize, ysize, relDir, relSpeed, relSizeChange) {
		this.fillAlpha = 45;
		this.fillPalettes = [
			[27, 84, 35, this.fillAlpha],
			[28, 72, 50, this.fillAlpha],
			[30, 61, 58, this.fillAlpha],
			[35, 40, 65, this.fillAlpha],
			[46, 21, 71, this.fillAlpha],
			[67, 14, 77, this.fillAlpha],
			[73, 22, 67, this.fillAlpha],
			[74, 32, 43, this.fillAlpha],
			[80, 29, 28, this.fillAlpha],
			[90, 33, 24, this.fillAlpha],
		];
		this.strokeAlpha = 5;
		this.strokePalettes = [
			[27, 0, 35, this.strokeAlpha],
			[28, 0, 50, this.strokeAlpha],
			[30, 0, 58, this.strokeAlpha],
			[35, 0, 65, this.strokeAlpha],
			[46, 0, 71, this.strokeAlpha],
			[67, 0, 77, this.strokeAlpha],
			[73, 0, 67, this.strokeAlpha],
			[74, 0, 43, this.strokeAlpha],
			[80, 0, 28, this.strokeAlpha],
			[90, 0, 24, this.strokeAlpha],
		];

		this.fillColor = color(random(this.fillPalettes));
		this.strokeColor = color(random(this.strokePalettes));
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
		this.xspeed;
		this.yspeed;
		this.nAlpha;
	}

	display() {
		strokeWeight(width / 500);
		stroke(this.strokeColor);
		ellipseMode(CENTER);
		fill(this.fillColor);
		ellipse(this.xpos, this.ypos, this.xsize, this.ysize);
		//line(this.prevxpos, this.prevypos, this.xpos, this.ypos);
	}

	move() {
		this.nAlpha = random(-1, 1);
		this.xspeed = random(-0.5, 0.5);
		this.yspeed = random(-0.5, 0.5);
		this.fillAlpha = this.fillAlpha + this.nAlpha;
		this.strokeAlpha = this.strokeAlpha + this.nAlpha;
		this.prevxpos = this.xpos;
		this.prevypos = this.ypos;
		this.xpos = this.xpos + this.xdirection * this.xspeed;
		this.ypos = this.ypos + this.ydirection * this.yspeed;
		if (this.fillAlpha > 100) {
			this.fillAlpha = 100;
		} else if (this.fillAlpha < 0) {
			this.fillAlpha = 0;
		}
		if (this.strokeAlpha > 100) {
			this.strokeAlpha = 100;
		} else if (this.strokeAlpha < 0) {
			this.strokeAlpha = 0;
		}
		if (this.xpos > width) {
			this.xpos = 1;
			this.prevxpos = 1;
			//this.ypos = random(1, height - 1);
		}
		if (this.xpos < 0) {
			this.xpos = width - 1;
			this.prevxpos = width - 1;
			//this.ypos = random(1, height - 1);
		}
		if (this.ypos > height) {
			this.ypos = 1;
			this.prevypos = 1;
			//this.xpos = random(1, width - 1);
		}
		if (this.ypos < 0) {
			this.ypos = height - 1;
			this.prevypos = height - 1;
			//this.xpos = random(1, width - 1);
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
