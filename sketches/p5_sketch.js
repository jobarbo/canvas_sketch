// Import sketch objects

const canvasSketch = require('canvas-sketch');
const p5 = require('p5');
new p5();
const horizontal = 18 * 300;
const vertical = 18 * 300;

const settings = {
	// Pass the p5 instance, and preload function if necessary
	p5: true,
	dimensions: [horizontal, vertical],
	units: 'px',
	duration: 30,
	animate: true,
	fps: 60,
	attributes: {
		antialias: true,
	},
};

let backgroundImg;
window.preload = () => {
	// Preload sounds/images/etc...
	backgroundImg = loadImage('media/images/liminal4.png');
};

canvasSketch((context, bleed, trimWidth, trimHeight) => {
	// Sketch setup => Like p5.js 'setup' function
	let waves = [];
	let clouds = [];
	let tentacles = [];
	let xoff = 0.0;
	let yoff = 0.01;

	colorMode(HSB, 360, 100, 100, 100);
	background(0, 0, 10);

	// Create objects
	for (let i = 0; i < 150; i++) {
		const rdnX = random(0, width / 2);
		waves.push(new Waves(xoff, yoff, rdnX));
	}

	// Create objects
	for (let i = 0; i < 20; i++) {
		const rdnX = random(0, width / 2);
		clouds.push(new Clouds(xoff, yoff, rdnX));
	}

	background(199, 47, 89);

	image(backgroundImg, 0, 0);

	let sunW = random(width / 14, width / 8);
	let sunX = random(sunW, width - sunW);
	let sunY = random(sunW, height / 2 - sunW);
	displaySun(sunW, sunX, sunY);

	for (let i = 0; i < 1500; i++) {
		for (let i = 0; i < waves.length; i++) {
			waves[i].move();
			waves[i].display();
		}
	}

	// Create Beings
	let beingX = width / 4;
	for (let num = 0; num < 3; num++) {
		let beingHue = int(random(0, 360));

		let beingY = random(300, height / 2 - 1500);
		for (let tentaclesNum = 0; tentaclesNum < 200; tentaclesNum++) {
			tentacles.push(new Beings(beingX, beingY, beingHue));
		}
		while (tentacles.length > 0) {
			for (j = 0; j < tentacles.length; j++) {
				tentacles[j].move();
				tentacles[j].display();
				tentacles[j].shrink();
			}
			isBeingDead(tentacles);
		}
		beingX += width / 4;
	}
	blendMode(SOFT_LIGHT);
	for (let i = 0; i < 2000; i++) {
		for (let i = 0; i < clouds.length; i++) {
			clouds[i].move();
			clouds[i].display();
		}
	}
	blendMode(BLEND);
	displaySunReflection(sunW, sunX, sunY);
	createTexture();

	// Return a renderer, which is like p5.js 'draw' function
	return ({ p5, time, width, height, context, exporting, bleed, trimWidth, trimHeight }) => {
		exporting = true;

		if (!exporting && bleed > 0) {
			stroke(0, 100, 100);
			noFill();
			strokeWeight(10);
			rect(bleed, bleed, trimWidth, trimHeight);
		}
	};
}, settings);

function isBeingDead(tentacles) {
	for (let i = 0; i < tentacles.length; i++) {
		tentacle = tentacles[i];
		if (tentacle.diameter < 1) {
			tentacles.splice(i, 1);
		}
	}
}

function createTexture() {
	let texture = [];
	for (let index = 0; index < 5000; index++) {
		const rdnX = random(600, width + 600);
		const rdnY = random(600, height + 600);
		const rdnW1 = random(5, 150);
		texture[index] = new Smudge(rdnX, rdnY, rdnW1);
		texture[index].display();
	}
}

function displaySun(sunW, sunX, sunY) {
	blendMode(HARD_LIGHT);
	noStroke();
	fill(20, 1, 100, 10);
	//arc(sunX, sunY, sunW, sunW, PI, 0, OPEN);
	ellipse(sunX, sunY, sunW);
	blendMode(BLEND);
}

function displaySunReflection(sunW, sunX, sunY) {
	blendMode(HARD_LIGHT);
	let restriction = 5;
	let alpha = 2;
	let refX = sunX;
	let refY = height / 2 - 20;
	let refW = sunW;
	let refH = 20;
	let x = refX;
	let xoff = 0.5;
	let yoff = 0.01;
	for (let index = 0; index < 8000; index++) {
		x = map(noise(xoff + refX), 0, 1, refX - sunW / restriction, refX + sunW / restriction);
		noStroke();
		fill(20, 1, 100, alpha);
		ellipse(x, refY, refW, refH);
		alpha += random(-0.05, 0.049);
		restriction -= 0.03;
		xoff += 5.6;
		yoff += 0.001;
		refY += 0.6;
		refW += random(-1.75, 1.23);
		refH += random(-0.065, 0.063);
		if (alpha <= 1) {
			alpha = 1;
		}
		if (refH <= 1) {
			refH = 1;
		}
		if (refW <= 1) {
			refW = 1;
		}
		if (restriction <= 1) {
			restriction = 1;
		}
	}

	//arc(sunX, height / 2 - 20, sunW, sunW * 4, 0, PI, OPEN);
	blendMode(BLEND);
}
// Jitter class
class Waves {
	constructor(xoff, yoff, rdnx) {
		this.rdnx = rdnx;
		this.rdny = height / 2;
		this.xoff = xoff;
		this.yoff = yoff;
		this.x = rdnx;
		this.height = random(5, 60);
		this.width = this.height;
		this.speed = 5;
		this.yIncrement = 0.1;
		this.strokeHue = 360;
		this.fillSat = 0;
		this.fillHue = 160;
		this.fillBright = 15;
	}

	move() {
		this.x = map(noise(this.xoff + this.rdnx), 0, 1, -width, width * 2);
		this.rdny = this.rdny + this.yIncrement;
		this.xoff += 0.02;
		this.yoff += 0.001;
		this.yIncrement *= 1.01;
		this.height *= 1.001;
		this.width *= 1.005;
		this.strokeHue += 0.025;
		this.fillHue += 0.75;
		this.fillSat += 0.005;
		this.fillBright -= 0.005;
		if (this.fillBright <= random(2, 4)) {
			this.fillBright = 10;
		}
		if (this.fillSat >= random(60, 70)) {
			this.fillSat = 40;
		}
		if (this.fillHue >= random(210, 220)) {
			this.fillHue = 160;
		}
	}

	display() {
		strokeWeight(1);
		stroke(this.strokeHue, 30, 95, 3);
		fill(this.fillHue, this.fillSat, this.fillBright, 3);
		ellipse(this.x, this.rdny, this.width, this.height);
	}
}

class Clouds {
	constructor(xoff, yoff, rdnx) {
		this.rdnx = rdnx;
		this.rdny = height / 2;
		this.xoff = xoff;
		this.yoff = yoff;
		this.x = rdnx;
		this.height = random(5, 60);
		this.width = this.height;
		this.speed = 5;
		this.yIncrement = 0.1;
		this.strokeHue = 210;
		this.fillSat = 0;
		this.fillHue = 10;
	}

	move() {
		this.x = map(noise(this.xoff + this.rdnx), 0, 1, -width, width * 2);
		this.rdny = this.rdny - this.yIncrement;
		this.xoff += 0.02;
		this.yoff += 0.001;
		this.yIncrement *= 1.009;
		this.height *= random(1, 1.001);
		this.width *= random(1.005, 1.01);
		this.strokeHue += 0.025;
		this.fillHue += 0.2;
		this.fillSat -= 0.003;
		if (this.fillSat >= random(30, 40)) {
			this.fillSat = random(15, 20);
		}
		if (this.fillHue >= random(15, 25)) {
			this.fillHue = 10;
		}
	}

	display() {
		strokeWeight(2);
		stroke(this.fillHue, this.fillSat, 50, 30);
		fill(this.fillHue, this.fillSat, 40, 15);
		ellipse(this.x, this.rdny, this.width, this.height);
	}
}

class Smudge {
	constructor(rdnX, rdnY, w1) {
		this.xoff = 0;
		this.yoff = 1;
		this.woff1 = 0;
		this.rdnX = rdnX;
		this.rdnY = rdnY;
		this.rdnW1 = w1;
		this.alpha = random(15, 60);
	}

	display() {
		for (let index = 0; index < 500; index++) {
			this.xoff += 0.03;
			this.yoff += 0.02;
			this.woff1 += 0.0055;

			const w1 = map(noise(this.woff1 + this.rdnW1), 0, 1, 1, 3);
			const x = map(noise(this.xoff + this.rdnX), 0, 1, -width / 3, width * 1.5);
			const y = map(noise(this.yoff + this.rdnY), 0, 1, -height / 3, height * 1.5);

			fill(0, 0, 100, this.alpha);
			noStroke();
			ellipse(x, y, w1, w1);
		}
	}
}
class Beings {
	constructor(particleX, particleY, hue) {
		this.x = particleX;
		this.y = particleY;
		this.diameter = random(10, 30);
		this.alpha = 1;
		this.chaosXMinus = random(0, 1);
		this.chaosXPlus = random(0, 1);
		this.chaosYMinus = random(0, 1);
		this.chaosYPlus = random(0, 6);
		this.h = hue;
		this.s = 0;
		this.b = random(5, 25);
	}

	move() {
		this.x += random(-this.chaosXMinus, this.chaosXPlus);
		this.y += random(-this.chaosYMinus, this.chaosYPlus);
	}

	shrink() {
		this.diameter -= 0.05;
	}

	display() {
		blendMode(MULTIPLY);
		strokeWeight(2);
		stroke(360, 0, 100, 2);
		//noStroke();
		fill(this.h, this.s, this.b, this.alpha);
		ellipse(this.x, this.y, this.diameter, this.diameter);
		blendMode(BLEND);
	}
}
