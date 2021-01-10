// Import sketch objects
import CA from './ca.js';

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
	// Sketch setup => Like p5.js 'setup' function

	colorMode(HSB, 360, 100, 100, 100);
	//background(0, 0, 10);
	ellipseMode(CENTER);

	const margin = 300;
	const ruleset = [0, 1, 0, 1, 1, 0, 1, 0];
	let cells = [1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0];

	let widthStep = (width - 600) / 20;

	// Draw first Generation
	for (let i = 0; i < cells.length; i++) {
		if (cells[i] === 0) {
			fill(0, 0, 90);
		} else {
			fill(0, 0, 10);
		}
		strokeWeight(5);
		stroke(0, 0, 10);
		rect(300 + i * widthStep, 300, widthStep, widthStep);
	}

	const newCells = cells;

	for (let i = 1; i < cells.length - 1; i++) {
		let left = cells[i - 1];
		let middle = cells[i];
		let right = cells[i + 1];

		let newstate = rules(left, middle, right);
		console.log(newstate);
		newCells[i] = newstate;
		cells = newCells;
	}

	function rules(left, middle, right) {
		let string = '' + left + middle + right + '';
		let index = parseInt(string, 2);

		return ruleset[index];
	}

	// Return a renderer, which is like p5.js 'draw' function
	return ({ p5, time, width, height, context, exporting, bleed, trimWidth, trimHeight }) => {
		// Draw with p5.js things

		exporting = false;
		if (!exporting && bleed > 0) {
			stroke(0, 100, 100);
			noFill();
			strokeWeight(10);
			rect(bleed, bleed, trimWidth, trimHeight);
		}
	};
}, settings);
