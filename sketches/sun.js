export default class Sun {
	constructor() {
		this.w = random(width / 4, width / 1.5);
		this.x = width / 2;
		this.y = height / 2.5;
	}
	display() {
		stroke(27, 55, 75);
		strokeWeight(40);
		fill(257, 30, 20);
		ellipse(this.x, this.y, this.w, this.w);
	}
}
