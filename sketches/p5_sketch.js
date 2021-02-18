// Import sketch objects
//import Points from './points.js';

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
	ellipse(random(width / 500, width / 1.3), random(height / 15, height / 8), 700);

	stroke(160, 93, 35, 20);
	strokeWeight(12);
	// Return a renderer, which is like p5.js 'draw' function
	return ({ p5, time, width, height, context, exporting, bleed, trimWidth, trimHeight }) => {
		// Draw with p5.js things
		var x1 = width * noise(t + 0);
		var x2 = width * noise(t + 40);
		var x3 = width * noise(t + 30);
		var x4 = width * noise(t + 400);
		var x5 = width * noise(t + 242);
		var y1 = height * noise(t + 0);
		var y2 = height * noise(t + 96);
		var y3 = height * noise(t + 7);
		var y4 = height * noise(t + 8);
		var y5 = height * noise(t + 75);

		fill(160, 93, 35, 100);
		stroke(29, 39, 81, 100);
		strokeWeight(5);
		beginShape();

		curveVertex(x1, y1);
		curveVertex(x2, y2);
		curveVertex(x3, y3);
		curveVertex(x4, y4);
		curveVertex(x5, y5);

		endShape(CLOSE);
		stroke(70, 39, 81, 100);
		strokeWeight(5);
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
