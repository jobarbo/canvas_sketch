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
	let bgHue = random(365);
	background(bgHue, 23, 0);
	let landMinY = height / 4;
	let landMaxY = height / 2;
	let landYoff = 0.0;
	let landSaturation = 2;
	let landBrightness = 95;
	let landStrokeSaturation = 30;
	let landStrokeBrightness = 100;
	let landStrokeAlpha = 40;
	let landStrokeWeight = 65;
	let landDone = false;

	let waterMinY = height / 3.5;
	let waterMaxY = height / 3.5;
	let waterYoff = 0.0;
	let waterSaturation = 30;
	let waterBrightness = 97;
	let waterStrokeSaturation = 60;
	let waterStrokeAlpha = 60;
	let waterFillAlpha = 10;

	let skyMinY = height / 3;
	let skyMaxY = height / 2;
	let skyYoff = 0.0;
	let skyDone = false;
	/*
	while (skyDone != true) {
		createSky();
	}

 	if (skyDone) {
		console.log("Sky Done");
		while (landDone != true) {
			createLand();
			createOcean();
		}
	} */

	function createLand() {
		// LAND

		// We are going to draw a polygon out of the wave points
		beginShape();
		noFill();

		let landXoff = 0; // Option #1: 2D Noise
		//let landXoff = landYoff; // Option #2: 1D Noise
		if (skyDone) {
			// Iterate over horizontal pixels
			for (let x = -300; x <= width + 300; x += 100) {
				// Calculate a y value according to noise, map to

				// Option #1: 2D Noise
				let y = map(noise(landXoff, landYoff), 0, 1, landMinY, landMaxY);
				let h = map(noise(landXoff, landYoff), 0, 1, 25, 105);
				let s = map(noise(landXoff, landYoff), 0, 1, 85, 100);
				let b = map(noise(landXoff, landYoff), 0, 1, 85, 100);

				// Option #2: 1D Noise
				// let y = map(noise(landXoff), 0, 1, 200,300);
				strokeWeight(landStrokeWeight);
				stroke(bgHue, landStrokeSaturation, landStrokeBrightness, landStrokeAlpha);
				fill(h, landSaturation, landBrightness);
				// Set the vertex
				if (landMinY < height) {
					curveVertex(x, y);
					landXoff += 0.08;
					landMinY += 0.02;
					landMaxY += 0.02;
					if (landSaturation < 80) {
						landSaturation *= 1.0003;
					}
					if (landBrightness > 70) {
						landBrightness -= 0.001;
					}
					if (landStrokeAlpha > 10) {
						landStrokeAlpha -= 0.0005;
					}
					if (landStrokeWeight > 3) {
						landStrokeWeight -= 0.0005;
					}
					if (landStrokeSaturation > 0) {
						landStrokeSaturation -= 0.00015;
					}
					if (landStrokeBrightness > 95) {
						landStrokeBrightness -= 0.0001;
					}
				} else {
					landDone = true;
				}

				// Increment x dimension for noise
			}
			// increment y dimension for noise
			landYoff += 0.01;
			vertex(width + 100, height + 100);
			vertex(-100, height + 100);
			endShape(CLOSE);
		}
	}

	function createSky() {
		// SKY
		strokeWeight(20);
		// We are going to draw a polygon out of the wave points
		beginShape();
		noFill();

		//let skyXoff = 0; // Option #1: 2D Noise
		let skyXoff = skyYoff; // Option #2: 1D Noise

		// Iterate over horizontal pixels
		for (let x = -100; x <= width + 100; x += 100) {
			// Calculate a y value according to noise, map to

			// Option #1: 2D Noise
			let y = map(noise(skyXoff, skyYoff), 0, 1, skyMinY, skyMaxY);
			let h = map(noise(skyXoff, skyYoff), 0, 1, bgHue - 10, bgHue + 10);
			let s = map(noise(skyXoff, skyYoff), 0, 1, 0, 60);
			let b = map(noise(skyXoff, skyYoff), 0, 1, 95, 100);

			// Option #2: 1D Noise
			// let y = map(noise(skyXoff), 0, 1, 200,300);
			stroke(h, s, b, 5);
			strokeWeight(20);
			fill(h, s, b);

			// Set the vertex
			if (skyMaxY > 100) {
				curveVertex(x, y);
				skyXoff += 0.025;
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
	}
	function createOcean() {
		// Water
		strokeWeight(3);
		// We are going to draw a polygon out of the wave points
		beginShape();
		noFill();

		let waterXoff = 0; // Option #1: 2D Noise
		//let landXoff = landYoff; // Option #2: 1D Noise
		if (skyDone) {
			// Iterate over horizontal pixels
			for (let x = -300; x <= width + 300; x += 100) {
				// Calculate a y value according to noise, map to

				// Option #1: 2D Noise
				let y = map(noise(waterXoff, waterYoff), 0, 1, waterMinY, waterMaxY);
				let h = map(noise(waterXoff, waterYoff), 0, 1, 175, 200);
				let s = map(noise(waterXoff, waterYoff), 0, 1, 15, 60);
				let b = map(noise(waterXoff, waterYoff), 0, 1, 85, 100);

				// Option #2: 1D Noise
				// let y = map(noise(landXoff), 0, 1, 200,300);
				stroke(bgHue, waterStrokeSaturation, waterBrightness, waterStrokeAlpha);
				fill(h, waterSaturation, waterBrightness, waterFillAlpha);
				// Set the vertex
				if (waterMinY < height) {
					curveVertex(x, y);
					waterXoff += 0.003;
					waterMinY += 0.025;
					waterMaxY += 0.025;
					if (waterSaturation < 70) {
						waterSaturation += 0.005;
					}
					if (waterFillAlpha < 30) {
						waterFillAlpha *= 1.005;
					}

					if (waterBrightness > 60) {
						waterBrightness -= 0.002;
					}

					if (waterStrokeAlpha > 0) {
						waterStrokeAlpha -= 0.0001;
					}
					waterStrokeSaturation -= 0.001;
				}
				// Increment x dimension for noise
			}
			// increment y dimension for noise
			waterYoff += 0.0005;
			vertex(width + 100, height + 100);
			vertex(-100, height + 100);
			endShape(CLOSE);
		}
	}
	/**
	 * GUI Helper
	 */

	// gui.add(module_name, 'x', 0, width, 0.00001);
	// gui.add(module_name, 'y', 0, width, 0.00001);

	// Return a renderer, which is like p5.js 'draw' function
	return ({p5, time, width, height, context, exporting, bleed, trimWidth, trimHeight}) => {
		createSky();

		if (skyDone) {
			console.log('Sky Done');

			createLand();
			createOcean();
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
