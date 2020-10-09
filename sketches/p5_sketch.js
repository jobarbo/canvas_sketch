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
	background(0, 0, 10);

	// -- Frame -- //
	strokeWeight(15);
	stroke(60, 5, 95, 100);
	noFill();
	rect(600, 600, width - 1200, height - 1200);

	translate(width / 2, height - 600);
	blendMode(SUBTRACT);
	for (let i = 1; i < 10000; i++) {
		let sequence = [];
		let n = i;
		while (n != 1) {
			n = collatz(n);
			sequence.push(n);
		}
		sequence.push(1);
		sequence.reverse();

		let len = 45;
		let angle = 0.15;
		resetMatrix();
		translate(width / 2, height - 600);
		for (let j = 0; j < sequence.length; j++) {
			let value = sequence[j];
			if (value % 2 == 0) {
				rotate(angle);
			} else {
				rotate(-angle);
			}
			strokeCap(SQUARE);
			strokeJoin(ROUND);
			strokeWeight(5);
			stroke(60, 5, 95, 10);
			line(0, 0, 0, -len);
			translate(0, -len);
		}
		//console.log(steps);
	}

	function collatz(n) {
		// Even
		if (n % 2 == 0) {
			return n / 2;
			// Odd
		} else {
			return (n * 3 + 1) / 2;
		}
	}

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
