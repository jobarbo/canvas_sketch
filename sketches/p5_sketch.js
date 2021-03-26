// Import sketch objects
//import Line from './line.js';

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
	duration: 30,
	animate: true,
	fps: 30,
	attributes: {
		antialias: true,
	},
};

const preload = () => {
	// You can use p5.loadImage() here, etc...
};

canvasSketch((context, bleed, trimWidth, trimHeight) => {
	// Sketch setup => Like p5.js 'setup' function

	colorMode(HSB, 360, 100, 100, 100);
	background(207, 0, 8);
	let xoff = 0;
	let yoff = 1;
	let woff1 = 0;
	let woff2 = 0;
	let x = map(noise(xoff), 0, 1, 500, width - 500);
	let y = map(noise(yoff), 0, 1, 500, height - 500);
	let w1 = map(noise(woff1), 0, 1, 20, 350);
	let w2 = map(noise(woff2), 0, 1, 20, 350);
	for (let index = 0; index < 2000; index++) {
		x = map(noise(xoff), 0, 1, 500, width - 500);
		y = map(noise(yoff), 0, 1, 500, height - 500);
		xoff += 0.0011;
		yoff += 0.001;
		if (index >= 1600) {
			if (w1 > 5) {
				w1 = w1 - 1.1;
				w2 = w2 - 1.1;
				strokeWeight(2);
				fill(357, 0, 85);
				stroke(358, 0, 8);
				ellipse(x, y, w1, w2);
			} else {
				//w1 = w2;
				w1 = 5;
				w2 = 5;
				strokeWeight(2);
				fill(358, 0, 85, 100);
				stroke(358, 0, 8, 20);
				ellipse(x, y, w1, w2);
			}
		} else {
			w1 = map(noise(woff1), 0, 1, 20, 350);
			w2 = map(noise(woff2), 0, 1, 20, 350);
			woff1 += 0.005;
			woff2 += 0.001;
			strokeWeight(2);
			fill(357, 0, 85);
			stroke(358, 0, 8);
			ellipse(x, y, w1, w2);
		}
	}

	// Return a renderer, which is like p5.js 'draw' function
	return ({ p5, time, width, height, context, exporting, bleed, trimWidth, trimHeight }) => {
		exporting = true;
		if (!exporting && bleed > 0) {
			stroke(0, 100, 100);
			noFill();
			strokeWeight(10);
			rect(bleed, bleed, trimWidth, trimHeight);
		}
	};
}, settings);
