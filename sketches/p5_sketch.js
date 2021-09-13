// Import sketch objects
//import Pen from './pen.js';

const canvasSketch = require('canvas-sketch');
const p5 = require('p5');
new p5();
const horizontal = 30 * 300;
const vertical = 20 * 300;

const settings = {
	// Pass the p5 instance, and preload function if necessary
	p5: true,
	dimensions: [horizontal, vertical],
	units: 'px',
	bleed: 1 * 300,
	// dimension 14 x 20 avec bleed
	// pixelsPerInch: 72,

	// Turn on a render loop
	animate: false,
};

const preload = () => {
	// You can use p5.loadImage() here, etc...
};

canvasSketch((context, bleed, trimWidth, trimHeight) => {
	// Sketch setup
	// Like p5.js 'setup' function
	//const Bubble = require('./Bubble');

	//blendMode(ADD);
	colorMode(HSB, 360, 100, 100, 100);

	let wCenter = width / 2;
	let hCenter = height / 2;
	let baseHeight = height / 1.4;
	let alpha = 0.1;
	let angle = PI / 4;

	let radius = random(800, 1000);
	let sunPositionY = random(600 + radius, height / 3);
	let sunPositionX = random(600 + radius, width - (600 + radius));

	background(0, 0, 10);

	function branch(len, sw, alpha) {
		let lenDiff = random(0.7, 0.8);
		let alphaDiff = random(0.2, 2.5);
		angle = PI / random(2, 2);
		stroke(60, 5, 95, alpha);
		strokeCap(SQUARE);
		strokeWeight(sw);
		//line(0, 0, 0, -len);
		point(0, -len);
		translate(0, -len);

		if (len > 20) {
			push();
			rotate(angle);
			branch(len * lenDiff, sw * 0.7, alpha * alphaDiff);
			pop();
			push();
			rotate(-angle);
			branch(len * lenDiff, sw * 0.7, alpha * alphaDiff);
			pop();
		}
	}

	// Attach events to window to receive them
	window.mouseClicked = () => {
		background(0, 0, 10);

		let len = random(1700, 1800);

		push();
		translate(width / 2, height / 1.3);
		branch(len, 6000, 0.25);
		pop();

		//createTexture();
	};

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
	// Return a renderer, which is like p5.js 'draw' function
	return ({ p5, time, width, height, context, exporting, bleed, trimWidth, trimHeight }) => {
		// Draw with p5.js things

		//fill(60, 5, 95, 100);
		//ellipse(sunPositionX, sunPositionY, radius, radius);

		exporting = true;
		if (!exporting && bleed > 0) {
			stroke(0);
			noFill();
			strokeWeight(10);
			rect(bleed, bleed, trimWidth, trimHeight);
		}
	};
}, settings);

export default class Smudge {
	constructor(rdnX, rdnY, w1) {
		this.xoff = 0;
		this.yoff = 1;
		this.woff1 = 0;
		this.rdnX = rdnX;
		this.rdnY = rdnY;
		this.rdnW1 = w1;
		this.alpha = random(5, 40);
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
