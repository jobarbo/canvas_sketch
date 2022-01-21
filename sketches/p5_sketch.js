// Import sketch objects

const canvasSketch = require('canvas-sketch');
const p5 = require('p5');
new p5();
const horizontal = 12 * 300;
const vertical = 12 * 300;

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
	backgroundImg = loadImage('media/images/forest3.png');
};

canvasSketch((context, bleed, trimWidth, trimHeight) => {
	// Sketch setup => Like p5.js 'setup' function
	let trees = [];
	let clouds = [];
	let xoff = 0.0;
	let yoff = 0.01;

	colorMode(HSB, 360, 100, 100, 100);
	background(0, 0, 10);

	// Create objects
	for (let i = 0; i < 1080; i++) {
		const rdnX = random(0, width / 2);
		trees.push(new Tree(xoff, yoff, rdnX));
	}

	// Create objects
	for (let i = 0; i < 25; i++) {
		const rdnX = random(0, width / 2);
		clouds.push(new Clouds(xoff, yoff, rdnX));
	}

	background(199, 47, 89);

	image(backgroundImg, 0, 0);

	let sunW = random(width / 10, width / 6);
	let sunX = random(sunW, width - sunW);
	let sunY = random(sunW, height / 2 - sunW);
	displaySun(sunW, sunX, sunY);

	blendMode(SOFT_LIGHT);
	for (let i = 0; i < 1500; i++) {
		for (let i = 0; i < clouds.length; i++) {
			clouds[i].move();
			clouds[i].display();
		}
	}
	blendMode(BLEND);
	//displaySunReflection(sunW, sunX, sunY);
	for (let i = 0; i < 1500; i++) {
		for (let i = 0; i < trees.length; i++) {
			trees[i].move();
			trees[i].display();
		}
	}
	blendMode(OVERLAY);
	createTexture();

	// Return a renderer, which is like p5.js 'draw' function
	return ({p5, time, width, height, context, exporting, bleed, trimWidth, trimHeight}) => {
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

	for (let index = 0; index < 5000; index++) {
		const rdnX = random(-width, width * 2);
		const rdnY = random(-width, height * 2);
		const rdnW1 = random(5, 150);
		texture[index] = new Smudge(rdnX, rdnY, rdnW1);
		texture[index].display();
	}
}

function displaySun(sunW, sunX, sunY) {
	blendMode(HARD_LIGHT);
	noStroke();
	fill(340, 50, 100, 100);
	//arc(sunX, sunX, sunW, sunW, PI, 0, OPEN);
	//arc(sunX, sunY, sunW, sunW, 0, PI, OPEN);
	ellipse(sunX, sunY, sunW);
	blendMode(BLEND);
}

class Tree {
	constructor(xoff, yoff, rdnx) {
		this.rdnx = rdnx;
		this.rdny = height / 2;
		this.xoff = xoff;
		this.yoff = yoff;
		this.yy = 0;
		this.wobl = 1;
		this.x = rdnx;
		this.width = random(20, 40);
		this.height = this.width * 3.5;
		this.yIncrement = 0.1;
		this.strokeHue = 360;
		this.fillHue = random(60, 75);
		this.fillSat = 100;
		this.fillBright = random(20, 40);
		this.fillAlpha = 0.001;
	}

	move() {
		// I add 777 into the noise to get different part of the noise than you use
		this.x = map(noise(this.xoff + this.rdnx), 0, 1, -width, width * 2);
		this.rdny = this.rdny + this.yIncrement;
		let nof = noise(this.rdny * 0.0002 + 777); // this is the noise offset based on the y coord
		// here we take smooth noise based on this.x, and it changes a little based on nof
		// the strength of the noise wobble is determined by wobl
		this.yy = noise(this.x * 0.0002 + 555 + nof * 10) * this.wobl; // 10 is how quickly the landscape changes
		this.xoff += 0.02;
		this.yIncrement *= 1.01;
		this.wobl *= 0.999; // wobl starts at 1, then decreases exponentially. it's how strong the hills are
		this.height *= 1.001;
		this.width *= 1.0009;
		this.strokeHue += 0.025;
		this.fillHue -= 20.5;
		//this.fillSat += 0.5;
		this.fillBright += 0.5;
		this.fillAlpha *= 1.03;
		if (this.fillBright >= random(95, 100)) {
			this.fillBright = random(20, 50);
		}
		if (this.fillSat >= random(95, 100)) {
			// this.fillSat = random(35, 55);
			//this.fillSat = random(85, 90);
		}
		if (this.fillHue <= random(0, 20)) {
			// this.fillHue = random(75, 105);
			this.fillHue = random(50, 60);
		}
		if (this.fillAlpha >= 100) {
			this.fillAlpha = random(80, 100);
		}
	}

	display() {
		strokeWeight(1);
		stroke(this.strokeHue, 30, 95, 0);
		fill(this.fillHue, this.fillSat, this.fillBright, this.fillAlpha);
		// here we simply subtract this.yy, multiplied by a number that is the strength of the effect
		ellipse(this.x, this.rdny - 2000 * this.yy, this.width, this.height);
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
		this.width *= random(1.005, 1.01);
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
