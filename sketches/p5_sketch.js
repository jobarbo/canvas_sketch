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
	let landYoff = 0.0;
	let landSaturation = 5;
	let landBrightness = 65;
	let landStrokeAlpha = 1;

	let skyMinY = height / 3;
	let skyMaxY = height / 2;
	let skyYoff = 0.0;
	let skyDone = false;
	/**
	 * GUI Helper
	 */

	// gui.add(module_name, 'x', 0, width, 0.00001);
	// gui.add(module_name, 'y', 0, width, 0.00001);

	// Return a renderer, which is like p5.js 'draw' function
	return ({p5, time, width, height, context, exporting, bleed, trimWidth, trimHeight}) => {
		// SKY
		strokeWeight(20);
		// We are going to draw a polygon out of the wave points
		beginShape();
		noFill();

		let skyXoff = 0; // Option #1: 2D Noise
		// let skyXoff = landYoff; // Option #2: 1D Noise

		// Iterate over horizontal pixels
		for (let x = -100; x <= width + 100; x += 100) {
			// Calculate a y value according to noise, map to

			// Option #1: 2D Noise
			let y = map(noise(skyXoff, skyYoff), 0, 1, skyMinY, skyMaxY);
			let h = map(noise(skyXoff, skyYoff), 0, 1, 190, 190);
			let s = map(noise(skyXoff, skyYoff), 0, 1, 0, 20);
			let b = map(noise(skyXoff, skyYoff), 0, 1, 30, 100);

			// Option #2: 1D Noise
			// let y = map(noise(skyXoff), 0, 1, 200,300);
			stroke(h, s, b - 5, 10);
			fill(h, s, b);
			// Set the vertex
			console.log(skyMinY);
			if (skyMaxY > 100) {
				curveVertex(x, y);
				skyXoff += 0.05;
				skyMinY -= 0.075;
				skyMaxY -= 0.075;
			} else {
				skyDone = true;
			}

			// Increment x dimension for noise
		}
		// increment y dimension for noise
		skyYoff += 0.01;
		vertex(width + 100, -100);
		vertex(-100, -100);
		endShape(CLOSE);

		// LAND
		strokeWeight(10);
		// We are going to draw a polygon out of the wave points
		beginShape();
		noFill();

		let landXoff = 0; // Option #1: 2D Noise
		// let landXoff = landYoff; // Option #2: 1D Noise
		if (skyDone) {
			// Iterate over horizontal pixels
			for (let x = -100; x <= width + 100; x += 100) {
				// Calculate a y value according to noise, map to

				// Option #1: 2D Noise
				let y = map(noise(landXoff, landYoff), 0, 1, landMinY, landMaxY);
				let h = map(noise(landXoff, landYoff), 0, 1, 25, 65);

				// Option #2: 1D Noise
				// let y = map(noise(landXoff), 0, 1, 200,300);
				stroke(h, landSaturation, landBrightness - 20, landStrokeAlpha);
				fill(h, landSaturation, landBrightness);
				// Set the vertex
				if (landMinY < height) {
					curveVertex(x, y);
					landXoff += 0.05;
					landMinY += 0.025;
					landMaxY += 0.025;
					landSaturation += 0.001;
					landBrightness -= 0.0003;
					landStrokeAlpha += 0.0001;
				}

				// Increment x dimension for noise
			}
			// increment y dimension for noise
			landYoff += 0.01;
			vertex(width + 100, height + 100);
			vertex(-100, height + 100);
			endShape(CLOSE);
		}
		exporting = true;
		if (!exporting && bleed > 0) {
			stroke(0, 100, 100);
			noFill();
			strokeWeight(10);
			rect(bleed, bleed, trimWidth, trimHeight);
		}
	};
}, settings);
