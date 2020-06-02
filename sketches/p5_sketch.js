// Import sketch objects
import Bubble from './bubble.js';

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
	bleed: horizontal / 8,
	//pixelsPerInch: 72,

	// Turn on a render loop
	animate: true,
};

const preload = () => {
	// You can use p5.loadImage() here, etc...
};

canvasSketch((context) => {
	// Sketch setup
	// Like p5.js 'setup' function
	//const Bubble = require('./Bubble');

	//blendMode(SCREEN);
	colorMode(HSB, 360, 100, 100, 100);
	background(60, 5, 95);
	let bubbles = [];
	let xoff;
	let yoff;
	let xStep;
	let yStep;

	for (let i = 0; i < 25; i++) {
		xoff = randomGaussian(0.05, 0.5);
		yoff = randomGaussian(0.05, 0.5);
		xStep = randomGaussian(0.0000005, 0.0000003);
		yStep = randomGaussian(0.5, 0.003);
		bubbles[i] = new Bubble(xoff, yoff, xStep, yStep);
	}
	console.log(bubbles);
	// Return a renderer, which is like p5.js 'draw' function
	return ({ p5, time, width, height }) => {
		// Draw with p5.js things
		for (let i = 0; i < 25; i++) {
			bubbles[i].display();
			bubbles[i].move();
		}
	};
}, settings);
