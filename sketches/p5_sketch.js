// Import sketch objects
import Pen from './pen.js';

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
	background(0, 0, 10);
	ellipseMode(CENTER);

	let pen = [];
	let xOff1 = 0;
	let xOff2 = 0;
	let startX1 = 0;
	let startX2 = 0;

	for (let i = 0; i < 30; i++) {
		pen[i] = new Pen(startX1, startX2);
		console.log(pen[i]);
		startX1 += 200;
		startX2 += 0;
	}

	for (let i = 0; i < 6600; i++) {
		for (let i = 0; i < 30; i++) {
			pen[i].move(xOff1, xOff2);
			pen[i].display();
		}
		xOff1 += 0.003;
		xOff2 += 0.003;
	}

	strokeWeight(15);
	stroke(60, 5, 95, 100);
	noFill();
	rect(600, 600, width - 1200, height - 1200);
	// Visualize the trim area with a yellow guide (ignored on export)

	// Return a renderer, which is like p5.js 'draw' function
	return ({ p5, time, width, height, context, exporting, bleed, trimWidth, trimHeight }) => {
		// Draw with p5.js things

		exporting = true;
		if (!exporting && bleed > 0) {
			stroke(0);
			noFill();
			strokeWeight(10);
			rect(bleed, bleed, trimWidth, trimHeight);
		}
	};
}, settings);
