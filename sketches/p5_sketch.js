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
	backgroundImg = loadImage('media/images/background.png');
};

canvasSketch((context, bleed, trimWidth, trimHeight) => {
	// Sketch setup => Like p5.js 'setup' function
	let waves = [];
	let clouds = [];
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
	for (let i = 0; i < 10; i++) {
		const rdnX = random(0, width / 2);
		clouds.push(new Clouds(xoff, yoff, rdnX));
	}

	background(199, 47, 89);
	imageMode(CENTER);

	image(backgroundImg, width / 2, 0);
	displaySun();
	push();
	rotate(PI);
	image(backgroundImg, -width / 2, -height);
	pop();

	blendMode(SOFT_LIGHT);
	for (let i = 0; i < 1500; i++) {
		for (let i = 0; i < clouds.length; i++) {
			clouds[i].move();
			clouds[i].display();
		}
	}
	blendMode(BLEND);
	for (let i = 0; i < 1500; i++) {
		for (let i = 0; i < waves.length; i++) {
			waves[i].move();
			waves[i].display();
		}
	}
	//createTexture();

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

function createTexture() {
	let texture = [];
	for (let index = 0; index < 500; index++) {
		const rdnX = random(600, width + 600);
		const rdnY = random(600, height + 600);
		const rdnW1 = random(5, 150);
		texture[index] = new Smudge(rdnX, rdnY, rdnW1);
		texture[index].display();
	}
}

function displaySun() {
	noStroke();
	fill(20, 50, 100);
	let sunW = random(width / 5, width / 2);
	let sunX = random(sunW,width-sunW);
	let sunY = height / 2;
	blendMode(HARD_LIGHT);
	ellipse(sunX, height / 2, sunW);
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
		this.fillSat = 40;
		this.fillHue = 160;
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
		this.fillSat += 0.5;
		if (this.fillSat >= random(60, 70)) {
			this.fillSat = 40;
		}
		if (this.fillHue >= random(210, 220)) {
			this.fillHue = 160;
		}
	}

	display() {
		strokeWeight(1);
		stroke(this.strokeHue, 30, 95, 0);
		fill(this.fillHue, this.fillSat, 70, 3);
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
		this.fillSat = 60;
		this.fillHue = 10;
	}

	move() {
		this.x = map(noise(this.xoff + this.rdnx), 0, 1, -width, width * 2);
		this.rdny = this.rdny - this.yIncrement;
		this.xoff += 0.02;
		this.yoff += 0.001;
		this.yIncrement *= 1.009;
		this.height *= random(1, 1.001);
		this.width *= random(1.005, 1.010);
		this.strokeHue += 0.025;
		this.fillHue += 0.2;
		this.fillSat -= 0.003;
		if (this.fillSat >= random(30, 40)) {
			//this.fillSat = random(15, 20);
		}
		if (this.fillHue >= random(15, 25)) {
			this.fillHue = 10;
		}
	}

	display() {
		strokeWeight(2);
		stroke(this.fillHue, this.fillSat, 90, 30);
		fill(this.fillHue, this.fillSat, 100, 15);
		ellipse(this.x, this.rdny, this.width, this.height);
	}
}

export default class Smudge {
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
