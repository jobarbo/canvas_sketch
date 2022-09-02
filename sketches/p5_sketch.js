// Import sketch objects
import Stars from './stars.js';
const palettes = require('nice-color-palettes/100.json');
const canvasSketch = require('canvas-sketch');
const p5 = require('p5');
window.p5 = p5;
require('p5/lib/addons/p5.sound');
new p5();

// Setup the sketch resolution
const horizontal = 9 * 300;
const vertical = 16 * 300;

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

// make a function that will convert an hex color value to HSL values
const hexToHSL = (hex) => {
	// Convert hex to RGB first
	let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	let r1 = parseInt(result[1], 16);
	let g1 = parseInt(result[2], 16);
	let b1 = parseInt(result[3], 16);
	let r = r1 / 255;
	let g = g1 / 255;
	let b = b1 / 255;
	let max = Math.max(r, g, b);
	let min = Math.min(r, g, b);
	let h = (max + min) / 2;
	let l = (max + min) / 2;
	let s = (max + min) / 2;
	// If max and min are the same, the hue is undefined
	if (max === min) {
		h = 0;
	} else {
		// Calculate hue
		if (max === r) {
			h = (g - b) / (max - min);
		} else if (max === g) {
			h = 2 + (b - r) / (max - min);
		} else if (max === b) {
			h = 4 + (r - g) / (max - min);
		}
		h = h * 60;
		if (h < 0) {
			h += 360;
		}
	}
	// Calculate lightness
	l = ((max + min) / 2) * 100;
	// Calculate saturation
	s = 0;
	if (l > 0 && l < 50) {
		s = ((max - min) / (max + min)) * 100;
	} else if (l >= 50 && l < 100) {
		s = ((max - min) / (2 - max - min)) * 100;
	}
	h = int(h);
	s = int(s);
	l = int(l);
	return [h, s, l];
};

canvasSketch((context, bleed, trimWidth, trimHeight) => {
	// Sketch setup => Like p5.js 'setup' function

	colorMode(HSL, 360, 100, 100, 100);
	let palette = ['#000035', '#000026', '#001d3d', '#ffeb99', '#ffe270'];

	// chose a random palette for the background color
	let bgColor = palette[Math.floor(Math.random() * palette.length)];
	bgColor = hexToHSL(bgColor);
	console.log(bgColor);

	let mic = new p5.AudioIn();

	let micLevel = '';
	window.mouseClicked = () => {
		mic.start();
		getAudioContext().resume();
	};

	// let entity = new Entity(width / 2, height / 2, 150);
	let stars = [];
	let starsNum = 500;
	for (let i = 0; i < starsNum; i++) {
		// chose a random palette for the stars color that is not the background color
		let starsColor = palette[Math.floor(Math.random() * palette.length)];
		starsColor = hexToHSL(starsColor);
		if (starsColor[0] === bgColor[0] && starsColor[1] === bgColor[1] && starsColor[2] === bgColor[2]) {
			while (starsColor[0] === bgColor[0] && starsColor[1] === bgColor[1] && starsColor[2] === bgColor[2]) {
				starsColor = palette[Math.floor(Math.random() * palette.length)];
				starsColor = hexToHSL(starsColor);
			}
		}
		stars[i] = new Stars(randomGaussian(width / 2, 300), randomGaussian(height / 2, 500), random(1, 100), starsColor, bgColor);
	}

	/**
	 * GUI Helper
	 */

	// gui.add(module_name, 'x', 0, width, 0.00001);
	// gui.add(module_name, 'y', 0, width, 0.00001);

	// Return a renderer, which is like p5.js 'draw' function
	return ({p5, time, width, height, context, exporting, bleed, trimWidth, trimHeight}) => {
		// p5.js stuff => Like p5.js 'draw' function
		// map micLevel to hue from 0 to 1 to 0 to 360
		background(bgColor[0], bgColor[1], bgColor[2], 100);

		micLevel = mic.getLevel();
		for (let i = 0; i < starsNum; i++) {
			stars[i].display(micLevel);
			stars[i].move(micLevel);
			stars[i].oscilateWeight(micLevel);
		}
		fill(bgColor[0], bgColor[1], bgColor[2], 11);
		rect(0, 0, width, height);
		exporting = true;
		if (!exporting && bleed > 0) {
			stroke(0, 100, 100);
			noFill();
			strokeWeight(10);
			rect(bleed, bleed, trimWidth, trimHeight);
		}
	};
}, settings);
