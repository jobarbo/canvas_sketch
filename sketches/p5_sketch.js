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

	let slider = createSlider(0, TWO_PI, PI / 4, 0.01);
	background(0, 0, 10);
	// -- Frame -- //
	strokeWeight(15);
	stroke(60, 5, 95, 100);
	noFill();
	rect(600, 600, width - 1200, height - 1200);
	// --      -- //

	function branch(len, sw, alpha) {
		let lenDiff = random(0.7, 0.8);
		angle = PI / random(2, 2);
		stroke(60, 5, 95, alpha);
		strokeCap(SQUARE);
		strokeWeight(sw);
		line(0, 0, 0, -len);
		//point(-len, 0, 0, -len);
		translate(0, -len);

		if (len > 20) {
			push();
			rotate(angle);
			branch(len * lenDiff, sw * 0.7, alpha * 2);
			pop();
			push();
			rotate(-angle);
			branch(len * lenDiff, sw * 0.7, alpha * 2);
			pop();
		}
	}

	// Attach events to window to receive them
	window.mouseClicked = () => {
		let len = random(1700, 1800);

		console.log('Mouse clicked');
		push();
		translate(mouseX, mouseY);
		branch(len, 50, 1);
		pop();
	};
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
