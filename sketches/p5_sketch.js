// Import sketch objects
//import Line from './line.js';

const canvasSketch = require('canvas-sketch');
const p5 = require('p5');
new p5();
const horizontal = 16 * 300;
const vertical = 16 * 300;

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
	background(207, 33, 94);
	let xoff = 0;
	let yoff = 1;
	let woff = 0;
	let x = map(noise(xoff), 0, 1, 500, width - 500);
	let y = map(noise(yoff), 0, 1, 500, height - 500);
	let w = map(noise(woff), 0, 1, 200, 350);
	for (let index = 0; index < 60000; index++) {
		x = map(noise(xoff), 0, 1, 500, width - 500);
		y = map(noise(yoff), 0, 1, 500, height - 500);
		xoff += 0.002;
		yoff += 0.0021;
		if (index >= 55000) {
			if (w > 0) {
				w = w - 1;
				strokeWeight(5);
				fill(357, 26, 96);
				stroke(358, 46, 67);
				ellipse(x, y, w, w);
			} else {
				blendMode(OVERLAY);
				strokeWeight(10);
				fill(357, 0, 96);
				stroke(355, 0, 65);
				ellipse(x, y, w, w);
			}
		} else {
			w = map(noise(woff), 0, 1, 200, 350);
			woff += 0.05;
			strokeWeight(5);
			fill(357, 26, 96);
			stroke(358, 46, 67);
			ellipse(x, y, w, w);
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
