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
	let num = 5;

	for (let i = 0; i < num; i++) {
		xoff = randomGaussian(0.02, 0.000000005);
		yoff = randomGaussian(0.005, 0.000000005);
		xStep = randomGaussian(0.05, 0.0000003);
		yStep = randomGaussian(0.5, 0.000000000003);
		bubbles[i] = new Bubble(xoff, yoff, xStep, yStep);
	}

	for (let index = 0; index < 100000; index++) {
		for (let i = 0; i < num; i++) {
			bubbles[i].display();
			bubbles[i].move();
		}
	}
	return ({ p5, time, width, height }) => {
		// Draw with p5.js things
	};
}, settings);
