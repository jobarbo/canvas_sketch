const palettes = require('nice-color-palettes/1000.json');
export default class Brush {
	constructor(xsize, ysize, relDir, relSpeed, relSizeChange, palettesIndex) {
		console.log(palettesIndex);
		this.fillAlpha = random(1, 45);
		this.strokeAlpha = random(1, 45);
		this.fillColor = color(random(palettes[palettesIndex]));
		this.fillColor.setAlpha(this.fillAlpha);
		this.strokeColor = color(random(palettes[palettesIndex]));
		this.strokeColor.setAlpha(this.strokeAlpha);
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
		//strokeWeight(width / 500);
		strokeWeight(this.xsize);
		stroke(this.strokeColor, this.strokeAlpha);
		ellipseMode(CENTER);
		fill(this.fillColor, this.fillAlpha);
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
