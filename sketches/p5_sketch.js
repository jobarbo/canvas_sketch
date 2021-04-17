// Import sketch objects
//import Firefly from './firefly.js';

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
	let xoff = 0.0;
	let yoff = 0.01;

	colorMode(HSB, 360, 100, 100);
	background(0, 0, 10);
	// Create objects
	for (let i = 0; i < 50; i++) {
		const rdnX = random(0, width / 2);
		waves.push(new Waves(xoff, yoff, rdnX));
	}

	background(199, 47, 89);
	image(backgroundImg, 0, -height / 3);

	displaySun();
	for (let i = 0; i < 1000; i++) {
		for (let i = 0; i < waves.length; i++) {
			waves[i].move();
			waves[i].display();
		}
	}

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

function createTexture() {
	let texture = [];
	for (let index = 0; index < 500; index++) {
		const rdnX = random(600, width + 600);
		const rdnY = random(600, height + 600);
		const rdnW1 = random(5, 150);
		texture[index] = new Smudge(rdnX, rdnY, rdnW1);
		texture[index].display();
	}
	//blendMode(BURN);
	//fill(199, 47, 89, 100);
	//rect(0, 0, width, height);
	blendMode(BLEND);
}

function displaySun() {
	noStroke();
	fill(360, 30, 95);
	let sunW = random(width / 6, width / 3);
	let sunX = random(0 + sunW, width - sunW);
	ellipse(sunX, height / 2, sunW);
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
		this.yincrement = 0.01;
		this.startHue = 18;
	}

	move() {
		this.x = map(noise(this.xoff + this.rdnx), 0, 1, -width, width * 2);
		this.rdny = this.rdny + this.yincrement;
		this.xoff += 0.02;
		this.yoff += 0.001;
		this.yincrement *= 1.01;
		this.height *= 1.001;
		this.width *= 1.005;
		this.startHue += 2.25;
		if (this.startHue >= 360) {
			this.startHue = 0;
		}
	}

	display() {
		stroke(this.startHue, 30, 95, 100);
		fill(200, 75, 50, 1);
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
		this.alpha = random(0, 1);
	}

	display() {
		blendMode(BLEND);
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
