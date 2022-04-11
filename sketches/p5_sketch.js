// Import sketch objects
import Entity from './entity.js';
import * as dat from 'dat.gui';
const palettes = require('nice-color-palettes/1000.json');
const canvasSketch = require('canvas-sketch');
const p5 = require('p5');
new p5();
const horizontal = 12 * 300;
const vertical = 12 * 300;

const gui = new dat.GUI({closed: true});

const settings = {
	// Pass the p5 instance, and preload function if necessary
	p5: true,
	dimensions: [horizontal, vertical],
	units: 'px',
	//duration: 30,
	//fps: 60,
	animate: true,
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
	background(210, 23, 92);
	let landMinY = height / 4;
	let landMaxY = height / 2;
	let landHue = 175;
	let yoff = 0.0;
	/**
	 * GUI Helper
	 */

	// gui.add(module_name, 'x', 0, width, 0.00001);
	// gui.add(module_name, 'y', 0, width, 0.00001);

	// Return a renderer, which is like p5.js 'draw' function
	return ({p5, time, width, height, context, exporting, bleed, trimWidth, trimHeight}) => {
		strokeWeight(10);
		// We are going to draw a polygon out of the wave points
		beginShape();
		noFill();

		let xoff = 0; // Option #1: 2D Noise
		// let xoff = yoff; // Option #2: 1D Noise

		// Iterate over horizontal pixels
		for (let x = -100; x <= width + 100; x += 100) {
			// Calculate a y value according to noise, map to

			// Option #1: 2D Noise
			let y = map(noise(xoff, yoff), 0, 1, landMinY, landMaxY);
			let h = map(noise(xoff, yoff), 0, 1, 60, 180);

			// Option #2: 1D Noise
			// let y = map(noise(xoff), 0, 1, 200,300);
			stroke(h, 55, 55, 20);
			fill(h, 55, 65);
			// Set the vertex
			if (landMinY < height) {
				curveVertex(x, y);
				xoff += 0.05;
				landMinY += 0.025;
				landMaxY += 0.025;
				//console.log(landMinY);
			}

			// Increment x dimension for noise
		}
		// increment y dimension for noise
		yoff += 0.01;
		vertex(width + 100, height + 100);
		vertex(100, height + 100);
		endShape(CLOSE);

		exporting = true;
		if (!exporting && bleed > 0) {
			stroke(0, 100, 100);
			noFill();
			strokeWeight(10);
			rect(bleed, bleed, trimWidth, trimHeight);
		}
	};
}, settings);
