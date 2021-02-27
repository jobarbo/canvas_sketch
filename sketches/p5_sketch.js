// Import sketch objects
import Firefly from './firefly.js';

const canvasSketch = require('canvas-sketch');
const p5 = require('p5');
new p5();
const horizontal = 1080;
const vertical = 1920;

const settings = {
	// Pass the p5 instance, and preload function if necessary
	p5: true,
	dimensions: [horizontal, vertical],
	units: 'px',
	bleed: 300,
	// dimension 14 x 20 avec bleed
	// pixelsPerInch: 72,

	// Turn on a render loop
	animate: true,
};

const preload = () => {
	// You can use p5.loadImage() here, etc...
};

canvasSketch((context, bleed, trimWidth, trimHeight) => {
	// Sketch setup => Like p5.js 'setup' function
	let t = 0;

	let moonX = random(width / 500, width / 1.3);
	let moonY = random(height / 15, height / 8);
	let firefly = [];
	colorMode(HSB, 360, 100, 100, 100);
	background(0, 0, 5, 100);
	//blendMode(SCREEN);
	ellipseMode(CENTER);

	for (let i = 0; i <= 50; i++) {
		const rdnX = random(0, 400);
		const rdnY = random(0, 400);
		const x = width * noise(t + rdnX);
		const y = width * noise(t + rdnY);
		firefly[i] = new Firefly(x, y, rdnX, rdnY);
	}

	// Return a renderer, which is like p5.js 'draw' function
	return ({ p5, time, width, height, context, exporting, bleed, trimWidth, trimHeight }) => {
		fill(0, 0, 5, 35);
		noStroke();
		rect(0, 0, width, height);

		fill(26, 13, 90);
		noStroke();
		ellipse(moonX, moonY, width / 7);

		// Draw with p5.js things
		for (let i = 0; i <= 50; i++) {
			firefly[i].display();
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
