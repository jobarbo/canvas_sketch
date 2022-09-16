export default class Sun {
	constructor() {
		this.w = random(width / 3, width / 1.2);
		this.x = width / 2;
		this.y = height / 2;
	}
	display() {
		strokeWeight(20);
		fill(257, 30, 20);
		stroke(27, 55, 75);
		ellipse(this.x, this.y, this.w, this.w);
	}
}
