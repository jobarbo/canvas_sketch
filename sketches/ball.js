// Ball Object
export default class Ball {
	constructor(x, y, radiusIndex, strokeColor, ballColor) {
		this.x = x;
		this.y = y;
		if (radiusIndex === 0) {
			this.radius = width / 10;
		} else {
			this.radius = random(10, 120);
		}
		this.speed = random(-2, 2);
		this.direction = random(-TWO_PI, TWO_PI);
		this.angle = 0.0;
		this.scalar = 1;
		this.strokeColor = strokeColor;
		this.strokeColor.setAlpha(10);
		this.ballColor = ballColor;
		this.ballColor.setAlpha(100);
	}

	update() {
		let ang1 = radians(this.angle);
		this.x += this.speed * sin(ang1);
		this.y += this.speed * cos(ang1);
		//this.y += this.speed + this.scalar * sin(ang1);
		this.angle += random(-10, 10);
		this.scalar += random(-0.2, 0.2);
	}

	display() {
		strokeWeight(3);
		stroke(this.strokeColor);
		ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
	}
}
