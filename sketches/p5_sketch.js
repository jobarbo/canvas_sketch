// Import sketch objects
//import Points from './points.js';

const canvasSketch = require('canvas-sketch');
const p5 = require('p5');
new p5();
const horizontal = 20 * 300;
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
	// Sketch setup => Like p5.js 'setup' function
	let t = 0;

	colorMode(HSB, 360, 100, 100, 100);
	background(0, 50, 12, 100);
	//blendMode(SCREEN);
	ellipseMode(CENTER);
	noStroke();
	fill(26, 13, 90);
	ellipse(random(700, width / 2 - 1400), random(700, height / 2 - 1400), 1400);

	stroke(160, 93, 35, 20);
	strokeWeight(12);
	// Return a renderer, which is like p5.js 'draw' function
	return ({ p5, time, width, height, context, exporting, bleed, trimWidth, trimHeight }) => {
		// Draw with p5.js things
		var x1 = width * 2 * noise(t + 96);
		var x2 = width * 2 * noise(t + 151);
		var x3 = width * 2 * noise(t + 47);
		var x4 = width * 2 * noise(t + 357);
		var x5 = width * 2 * noise(t + 24);
		var y1 = height * 2 * noise(t + 123);
		var y2 = height * 2 * noise(t + 83);
		var y3 = height * 2 * noise(t + 27);
		var y4 = height * 2 * noise(t + 37);
		var y5 = height * 2 * noise(t + 48);

		fill(160, 93, 35, 100);
		stroke(29, 39, 81, 100);
		strokeWeight(12);
		beginShape();

		curveVertex(x1, y1);
		curveVertex(x1, y1);
		curveVertex(x2, y2);
		curveVertex(x3, y3);
		curveVertex(x4, y4);
		curveVertex(x5, y5);
		curveVertex(x1, y1);
		curveVertex(x1, y1);

		endShape();
		stroke(70, 39, 81, 100);
		strokeWeight(80);
		//point(x1, y1);
		//point(x2, y2);
		//point(x3, y3);
		//point(x4, y4);
		t += 0.01;
		exporting = true;
		if (!exporting && bleed > 0) {
			stroke(0, 100, 100);
			noFill();
			strokeWeight(10);
			rect(bleed, bleed, trimWidth, trimHeight);
		}
	};
}, settings);
