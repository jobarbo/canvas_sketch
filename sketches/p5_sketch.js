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

	let wCenter = width / 2;
	let hCenter = height / 2;
	let baseHeight = height / 1.4;
	let alpha = 0.1;
	let angle = PI / 4;

	let radius = random(800, 1000);
	let sunPositionY = random(600 + radius, height / 3);
	let sunPositionX = random(600 + radius, width - (600 + radius));

	let slider = createSlider(0, TWO_PI, PI / 4, 0.01);

	function branch(len, sw, alpha) {
		stroke(60, 5, 95, alpha);
		strokeCap(ROUND);
		strokeWeight(sw);
		line(0, 0, 0, -len);
		//point(-len, 0, 0, -len);
		translate(0, -len);

		if (len > 100) {
			push();
			rotate(angle);
			branch(len * 0.75, sw * 0.7, alpha * 1.5);
			pop();
			push();
			rotate(0);
			branch(len * 0.75, sw * 0.7, alpha * 1.5);
			pop();
			push();
			rotate(-angle);
			branch(len * 0.75, sw * 0.7, alpha * 1.5);
			pop();
		}
	}

	// Return a renderer, which is like p5.js 'draw' function
	return ({ p5, time, width, height, context, exporting, bleed, trimWidth, trimHeight }) => {
		// Draw with p5.js things
		background(0, 0, 10);

		// -- Frame -- //
		strokeWeight(15);
		stroke(60, 5, 95, 100);
		noFill();
		rect(600, 600, width - 1200, height - 1200);
		// --      -- //
		//fill(60, 5, 95, 100);
		//ellipse(sunPositionX, sunPositionY, radius, radius);
		angle = slider.value();
		translate(wCenter, baseHeight);
		branch(1000, 50, 1);

		exporting = true;
		if (!exporting && bleed > 0) {
			stroke(0);
			noFill();
			strokeWeight(10);
			rect(bleed, bleed, trimWidth, trimHeight);
		}
	};
}, settings);
