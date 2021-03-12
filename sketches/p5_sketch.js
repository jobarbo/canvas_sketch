// Import sketch objects
//import Line from './line.js';

const canvasSketch = require('canvas-sketch');
const p5 = require('p5');
new p5();
const horizontal = 16 * 300;
const vertical = 16 * 300;

const settings = {
	// Pass the p5 instance, and preload function if necessary
	p5: true,
	dimensions: [horizontal, vertical],
	units: 'px',
	duration: 30,
	animate: true,
	fps: 30,
	attributes: {
		antialias: true,
	},
};

const preload = () => {
	// You can use p5.loadImage() here, etc...
};

canvasSketch((context, bleed, trimWidth, trimHeight) => {
	// Sketch setup => Like p5.js 'setup' function

	colorMode(HSB, 360, 100, 100, 100);

	let xoff = 0;
	let yoff = 1;

	let woff = 0;

	background(0, 0, 15);
	// Return a renderer, which is like p5.js 'draw' function
	return ({ p5, time, width, height, context, exporting, bleed, trimWidth, trimHeight }) => {
		let x = map(noise(xoff), 0, 1, 300, width - 300);
		let y = map(noise(yoff), 0, 1, 300, height - 300);
		let w = map(noise(woff), 0, 1, 200, 350);

		xoff += 0.01;
		yoff += 0.011;
		woff += 0.05;
		strokeWeight(4);
		fill(0, 0, 15);
		stroke(51, 31, 74);
		ellipse(x, y, w, w);

		exporting = true;
		if (!exporting && bleed > 0) {
			stroke(0, 100, 100);
			noFill();
			strokeWeight(10);
			rect(bleed, bleed, trimWidth, trimHeight);
		}
	};
}, settings);
