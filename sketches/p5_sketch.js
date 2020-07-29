// Import sketch objects
import Bubble from './bubble.js';

const canvasSketch = require('canvas-sketch');
const p5 = require('p5');
new p5();
const horizontal = 12 * 300;
const vertical = 18 * 300;

const settings = {
	// Pass the p5 instance, and preload function if necessary
	p5: true,
	dimensions: [horizontal, vertical],
	units: 'px',
	//bleed: 1 * 300,
	// dimension 14 x 20 avec bleed
	// pixelsPerInch: 72,

	// Turn on a render loop
	animate: true,
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
	background(0, 0, 15);
	let bubble = [];
	let totalNum = 100;

	for (let i = 0; i <= totalNum; i++) {
		bubble[i] = new Bubble();
	}

	// Visualize the trim area with a yellow guide (ignored on export)

	// Return a renderer, which is like p5.js 'draw' function
	return ({ p5, time, width, height, context, exporting, bleed, trimWidth, trimHeight }) => {
		// Draw with p5.js things

		for (let i = 0; i <= totalNum; i++) {
			bubble[i].move();
			bubble[i].display();
		}

		if (!exporting && bleed > 0) {
			stroke(0);
			noFill();
			strokeWeight(10);
			//rect(bleed, bleed, trimWidth, trimHeight);
		}
	};
}, settings);
