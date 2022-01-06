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

window.preload = () => {
	// You can use p5.loadImage() here, etc...
};

canvasSketch((context, bleed, trimWidth, trimHeight) => {
	// Sketch setup => Like p5.js 'setup' function
	noSmooth();
	colorMode(HSB, 360, 100, 100, 100);
	blendMode(MULTIPLY);
	let pointSize = 10;
	let pointSpacing = 15;
	let pointAlpha = 100;
	let margin = width / 4;
	let xColNum = 0;
	let yColNum = 0;
	let elHue = 0;
	let elW = width / 10;
	for (let x = 0; x <= width; x += pointSpacing) {
		for (let y = 0; y <= height; y += pointSpacing) {
			if (xColNum % 2 == 0) {
				pointAlpha = 0;
			} else {
				pointAlpha = random(50, 100);
			}
			if (yColNum % 2 == 0) {
				pointAlpha = random(50, 100);
			} else {
				pointAlpha = 0;
			}
			noStroke();
			fill(0, 100, 0, pointAlpha);
			ellipse(x, y, pointSize);
			yColNum++;
		}
		xColNum++;
	}
	xColNum = 0;
	let blueXOffset = 0;
	let redXOffset = 0;
	for (let x = margin; x <= width - margin; x += elW) {
		for (let y = margin; y <= height - margin; y += elW) {
			noStroke();
			if (xColNum % 2 == 0) {
				elHue = 230;
				fill(elHue, 100, 100, 100);
				ellipse(x + blueXOffset, y, elW);
				blueXOffset += elW / 6;
			} else {
				elHue = 0;
				fill(elHue, 100, 100, 100);
				ellipse(x + redXOffset, y, elW);
				redXOffset -= elW / 6;
			}
		}
		redXOffset = 0;
		blueXOffset = 0;
		xColNum++;
	}

	/**
	 * GUI Helper
	 */
	// gui.add(module_name, 'x', 0, width, 0.00001);
	// gui.add(module_name, 'y', 0, width, 0.00001);

	// Return a renderer, which is like p5.js 'draw' function
	return ({p5, time, width, height, context, exporting, bleed, trimWidth, trimHeight}) => {
		exporting = true;
		if (!exporting && bleed > 0) {
			stroke(0, 100, 100);
			noFill();
			strokeWeight(10);
			rect(bleed, bleed, trimWidth, trimHeight);
		}
	};
}, settings);
