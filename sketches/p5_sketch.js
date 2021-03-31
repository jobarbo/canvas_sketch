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

const preload = () => {
	// You can use p5.loadImage() here, etc...
};

canvasSketch((context, bleed, trimWidth, trimHeight) => {
	// Sketch setup => Like p5.js 'setup' function
	let waves = [];
	let xoff = 0.0;
	let yoff = 0.01;

	colorMode(HSB, 360, 100, 100);
	background(0, 0, 10);
	// Create objects
	for (let i = 0; i < 1000; i++) {
		const rdnX = random(0, width / 2);
		waves.push(new Waves(xoff, yoff, rdnX));
	}

	background(50, 0, 100);

	// Return a renderer, which is like p5.js 'draw' function
	return ({ p5, time, width, height, context, exporting, bleed, trimWidth, trimHeight }) => {
		for (let i = 0; i < waves.length; i++) {
			waves[i].move();
			waves[i].display();
		}
		exporting = true;
		if (!exporting && bleed > 0) {
			stroke(0, 100, 100);
			noFill();
			strokeWeight(10);
			rect(bleed, bleed, trimWidth, trimHeight);
		}
	};
}, settings);

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
		console.log(this.x);
	}

	move() {
		this.x = map(noise(this.xoff + this.rdnx), 0, 1, -width, width * 2);
		this.rdny = this.rdny + this.yincrement;
		this.xoff += 0.02;
		this.yoff += 0.001;
		this.yincrement *= 1.01;
		this.width *= 1.001;
	}

	display() {
		stroke(200, 30, 95, 1);
		fill(200, 75, 50);
		ellipse(this.x, this.rdny, this.width, this.height);
	}
}
