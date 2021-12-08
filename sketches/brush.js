export default class Brush {
	constructor(xsize, ysize, relDir, relSpeed, relSizeChange) {
		this.fillAlpha = 50;
		this.fillPalettes = [
			[19, 27, 82, this.fillAlpha],
			[63, 11, 75, this.fillAlpha],
			[117, 22, 70, this.fillAlpha],
			[148, 36, 53, this.fillAlpha],
			[160, 96, 45, this.fillAlpha],
		];
		this.strokeAlpha = 5;
		this.strokePalettes = [
			[19, 27, 82, this.strokeAlpha],
			[63, 11, 75, this.strokeAlpha],
			[117, 22, 70, this.strokeAlpha],
			[148, 36, 53, this.strokeAlpha],
			[160, 96, 45, this.strokeAlpha],
		];

		this.fillColor = color(random(this.fillPalettes));
		this.strokeColor = color(random(this.strokePalettes));
		//this.xpos = random(xsize, width - xsize);
		//this.ypos = random(ysize, height - ysize);
		this.xpos = random(width / 1.8, width / 2.2);
		this.ypos = random(height / 1.8, height / 2.2);
		//this.xpos = random(0, width);
		//this.ypos = random(0, height);
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
		this.xoff = 0.01;
		this.yoff = 0.023;
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
		let nAlpha = random(-1, 1);
		this.xspeed = random(-0.5, 0.5);
		this.yspeed = random(-0.5, 0.5);
		this.fillAlpha = this.fillAlpha + nAlpha;
		this.prevxpos = this.xpos;
		this.prevypos = this.ypos;
		this.xpos = this.xpos + this.xdirection * this.xspeed;
		this.ypos = this.ypos + this.ydirection * this.yspeed;
		if (this.fillAlpha > 100) {
			this.strokeAlpha = 100;
		} else if (this.fillAlpha < 0) {
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
