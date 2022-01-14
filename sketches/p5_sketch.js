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
	background(0, 0, 15);
	rectMode(CENTER);

	const colorArr = random(palettes);
	const margin = 160;
	const hRes = 80;
	const vRes = 800;
	const dWidth = width - margin * 2;
	const dHeight = height - margin * 2;
	const hSteps = dWidth / hRes;
	const vSteps = dHeight / vRes;
	//blendMode(SCREEN);
	for (let x = margin; x <= width - margin; x += hSteps) {
		for (let y = margin; y <= height - margin; y += vSteps) {
			let colour = random(colorArr);
			let sColour = random(colorArr);
			stroke(sColour);
			strokeWeight(2);
			fill(0, 0, 100);
			//noStroke();
			//line(x, y, x + hSteps, y + vSteps);
			ellipse(x, y, hSteps, vSteps);
		}
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
