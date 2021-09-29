// Import sketch objects
import Ball_mc from './ball_mc.js';
import * as dat from 'dat.gui';
const palettes = require('nice-color-palettes/1000.json');
const canvasSketch = require('canvas-sketch');
const p5 = require('p5');
new p5();
const horizontal = 12 * 300;
const vertical = 12 * 300;

const gui = new dat.GUI({ closed: true });

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
	let ballList = [];
	let spacing = width / 6;
	let x = spacing;
	let rPalette = int(random(palettes.length));

	for (let index = 0; index < 5; index++) {
		ballList[index] = new Ball_mc(x, height / 2, palettes[rPalette][index], spacing);
		x += spacing;
	}

	// gui.add(ball, 'x', 0, width, 0.00001);
	// gui.add(ball, 'y', 0, width, 0.00001);
	// Return a renderer, which is like p5.js 'draw' function
	return ({ p5, time, width, height, context, exporting, bleed, trimWidth, trimHeight }) => {
		background(30, 5, 100);
		for (let index = 0; index < ballList.length; index++) {
			ballList[index].display();
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
