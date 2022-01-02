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
	noSmooth();
	colorMode(HSB, 360, 100, 100, 100);
	background(10);

	let numPoints = 100000;
	let margin = width / 75;

	// HeadLight d'auto asphalte mouillé
	for (let i = 0; i < numPoints; i++) {
		blendMode(OVERLAY);
		let angle = random(0, TWO_PI);
		let scalar = random(margin, width);
		let x = width / 2.7 + cos(angle) * scalar;
		let y = height / 3 + sin(angle) * scalar;
		let dirX = x + 64 + cos(angle) * 64;
		let dirY = y + 64 + sin(angle) * 64;
		let alpha = random(10, 90);
		let sw = random(3, 7);
		strokeWeight(sw);
		stroke(random(0, 360), random(10, 25), 90, alpha);
		line(x, y, dirX, dirY);
		noStroke();
		//push();
		//translate(width/2,height/2.7);
		//rotate(1.45);
		//fill(0,0,10);
		//ellipse(0,0,margin*2.8,margin*1.6);
		//pop();
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
