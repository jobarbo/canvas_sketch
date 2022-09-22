// Import sketch objects
import Ball from './ball.js';
import * as dat from 'dat.gui';
const palettes = require('nice-color-palettes/1000.json');
const canvasSketch = require('canvas-sketch');
const p5 = require('p5');
window.p5 = p5;
require('p5/lib/addons/p5.sound');
new p5();

// Setup the canvas
const horizontal = 9 * 300;
const vertical = 16 * 300;

const gui = new dat.GUI({closed: false});

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

// Optionally preload before you load the sketch
window.preload = () => {
	// Preload sounds/images/etc...
};

canvasSketch((context, bleed, trimWidth, trimHeight) => {
	// Sketch setup => Like p5.js 'setup' function
	colorMode(HSB, 360, 100, 100, 100);
	let chosenPalette = palettes[Math.floor(Math.random() * palettes.length)];
	let backgroundColor = color(chosenPalette[Math.floor(Math.random() * chosenPalette.length)]);

	/* 	let mic = new p5.AudioIn();

	let micLevel = '';
	window.mouseClicked = () => {
		mic.start();
	}; */

	// choose the color of the balls from the same palette as backgroundColor but not the same color as backgroundColor
	let ballColor = color(chosenPalette[Math.floor(Math.random() * chosenPalette.length)]);
	while (ballColor === backgroundColor) {
		ballColor = color(chosenPalette[Math.floor(Math.random() * chosenPalette.length)]);
	}

	background(backgroundColor);

	/**
	 * GUI Helper
	 */

	// gui.add(module_name, 'x', 0, width, 0.00001);
	// gui.add(module_name, 'y', 0, width, 0.00001);

	// create a new object with the properties you want to control
	let balls = [];
	for (let i = 0; i < 60; i++) {
		balls[i] = new Ball(width / 2, height / 2, random(10, 75), backgroundColor, ballColor);
	}

	for (let i = 0; i < balls.length; i++) {
		for (let j = 0; j < 5000; j++) {
			balls[i].update();
			balls[i].display();
		}
	}

	// Return a renderer, which is like p5.js 'draw' function
	return ({p5, time, width, height, context, exporting, bleed, trimWidth, trimHeight}) => {
		exporting = true;
		/* 		micLevel = mic.getLevel();
		console.log(micLevel); */
		// p5.js 'draw' function

		if (!exporting && bleed > 0) {
			stroke(0, 100, 100);
			noFill();
			strokeWeight(10);
			rect(bleed, bleed, trimWidth, trimHeight);
		}
	};
}, settings);
