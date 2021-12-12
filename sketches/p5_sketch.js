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

	let pigments = [];
	let palettesIndex = int(random(palettes.length));
	let xsize, ysize;
	let relDir = int(width / 100);
	let relSpeed = int(width / 250);
	let relLimit = int(width * (92 / 100));
	let sizeChangeArr = [int(width / 250), int(width / 900), int(width / 300), int(width / 350), int(width / 700), int(width / 800), int(width / 900), int(width / 900), int(width / 800), int(width / 500), int(width / 500), int(width / 500), int(width / 800), int(width / 800), int(width / 600), int(width / 700), int(width / 700), int(width / 600), int(width / 700), int(width / 700), int(width / 700), int(width / 700), int(width / 700), int(width / 700), int(width / 700), int(width / 700), int(width / 700), int(width / 700), int(width / 700), int(width / 700), int(width / 700), int(width / 700), int(width / 600), int(width / 900)];
	let pigmentsNum = int((width * height) / 10000);

	colorMode(HSB, 360, 100, 100, 100);
	rectMode(CENTER);
	background(random(palettes[palettesIndex]));

	for (let i = 0; i < pigmentsNum; i++) {
		let relSizeChange = random(sizeChangeArr);
		xsize = random(width / 20, width / 2);
		ysize = random(height / 20, height / 2);
		pigments[i] = new Brush(xsize, ysize, relDir, relSpeed, relSizeChange, palettesIndex);
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
