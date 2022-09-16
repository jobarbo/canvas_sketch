export default class Sun {
	constructor() {
		this.w = random(width / 4, width / 1.5);
		this.x = width / 2;
		this.y = height / 2.2;
	}
	display() {
		stroke(24, 4, 91);
		strokeWeight(40);
		fill(21, 8, 5);
		ellipse(this.x, this.y, this.w, this.w);
	}
}
