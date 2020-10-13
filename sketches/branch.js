const p5 = require('p5');

export default class Branch {
	constructor(begin, end, bWidth) {
		this.begin = begin;
		this.end = end;
		this.bWidth = bWidth;
		this.finished = false;
	}

	jitter() {
		this.end.x += random(-5, 5);
		this.end.y += random(-5, 5);
	}
	show() {
		strokeWeight(this.bWidth);
		stroke(60, 5, 95, 10);
		strokeCap(SQUARE);
		point(this.begin.x, this.begin.y);
		point(this.end.x, this.end.y);
		//line(this.begin.x, this.begin.y, this.end.x, this.end.y);
	}

	branchA() {
		let dir = p5.Vector.sub(this.end, this.begin);
		dir.rotate(1.5);
		dir.mult(0.67);
		this.bWidth = this.bWidth * 0.77;
		let newEnd = p5.Vector.add(this.end, dir);
		let b = new Branch(this.end, newEnd, this.bWidth);
		return b;
	}
	branchB() {
		let dir = p5.Vector.sub(this.end, this.begin);
		dir.rotate(-1.5);
		dir.mult(0.67);
		this.bWidth = this.bWidth * 0.77;
		let newEnd = p5.Vector.add(this.end, dir);
		let b = new Branch(this.end, newEnd, this.bWidth);
		return b;
	}
}
