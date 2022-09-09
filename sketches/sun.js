export default class Sun {
	constructor() {
		this.w = random(width / 5, width / 2);
		this.x = width / 2;
		this.y = height / 2.5;
	}
	display() {
		noStroke();
		fill(12, 65, 91);
		ellipse(this.x, this.y, this.w, this.w);
	}
}
