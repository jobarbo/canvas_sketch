// Import sketch objects
import Brush from './brush.js';
import * as dat from 'dat.gui';
const palettes = require('nice-color-palettes/1000.json');
const canvasSketch = require('canvas-sketch');
const p5 = require('p5');
new p5();
const horizontal = 12 * 300;
const vertical = 12 * 300;
//const vertical = 1080;
//const horizontal = 1920;

const gui = new dat.GUI({closed: true});

const settings = {
	// Pass the p5 instance, and preload function if necessary
	p5: true,
	dimensions: [horizontal, vertical],
	units: 'px',
	duration: 30,
	fps: 120,
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
	background(40, 10, 90);
	let pigments = [];
	let xsize, ysize;
	let relDir = int(width / 100);
	let relSpeed = int(width / 250);
	let relLimit = int(width * (92 / 100));
	let relSizeChange = int(width / 800);
	let pigmentsNum = int((width * height) / 4000);

	for (let i = 0; i < pigmentsNum; i++) {
		xsize = random(width / 100, width / 10);
		ysize = random(height / 100, height / 10);
		pigments[i] = new Brush(xsize, ysize, relDir, relSpeed, relSizeChange);
	}
	/* 	for (let i = 0; i < 10000; i++) {
		for (let j = 0; j < pigments.length; j++) {
			pigments[j].move();
			pigments[j].display();
			if (i > relLimit) {
				pigments[j].shrink();
			}
		}
	} */
	// Return a renderer, which is like p5.js 'draw' function
	return ({p5, time, width, height, context, exporting, bleed, trimWidth, trimHeight}) => {
		for (let j = 0; j < pigments.length; j++) {
			pigments[j].move();
			pigments[j].display();
			if (time > relLimit / 1000) {
				pigments[j].shrink();
			}
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
