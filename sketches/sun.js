export default class Sun {
	constructor() {
		this.w = random(width / 4, width / 1.5);
		this.x = width / 2;
		this.y = height / 2.5;
	}
	display() {
		//noStroke();
		noFill();
		stroke(12, 0, 91);
		strokeWeight(40);
		//fill(12, 65, 91);
		ellipse(this.x, this.y, this.w, this.w);
	}
}
