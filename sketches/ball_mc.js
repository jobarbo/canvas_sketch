export default class Ball_mc {
	constructor(x, y, rdnX, rdnY, pickedcolor) {
		this.x = x;
		this.y = y;
		this.rdnX = rdnX;
		this.rdnY = rdnY;
		this.t = 0;
		this.brightness = 100;
		this.pickedColor = color(pickedcolor);
		this.hue = this.pickedColor._getHue();
		this.sat = this.pickedColor._getSaturation();
		this.bright = this.pickedColor._getBrightness();
		this.alpha = this.pickedColor._getAlpha();
	}

	display() {
		strokeWeight(20);
		stroke(this.hue, 20, 90, this.alpha);
		fill(this.hue, this.sat, this.bright, this.alpha);
		ellipse(this.x, this.y, 500, 500);
	}
}
