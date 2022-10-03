// Ball Object
export default class Ball {
	constructor(x, y, radiusIndex, strokeColor, ballColor) {
		this.x = x;
		this.y = y;
		if (radiusIndex === 0) {
			this.radius = 150;
		} else {
			this.radius = random(10, 120);
		}
		this.speed = random(-4, 4);
		this.direction = random(-TWO_PI, TWO_PI);
		this.angle = 0.0;
		this.scalar = 0;
		this.strokeColor = ballColor;
		this.strokeColor.setAlpha(100);
		this.ballColor = strokeColor;
		this.ballColor.setAlpha(100);
	}

	update() {
		let ang1 = radians(this.angle);

		//this.y += this.speed + this.scalar * sin(ang1);

		if (this.radius <= 0) {
			this.radius = 0;
		} else {
			this.radius += random(-1.02, 1);
			this.x += this.speed * cos(ang1);
			this.y += this.speed * sin(ang1);
		}
		this.angle += random(-10, 10);
		this.scalar += random(-0.2, 0.2);
	}

	display() {
		strokeWeight(1);
		stroke(this.strokeColor);
		fill(this.ballColor);
		ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
	}
}
