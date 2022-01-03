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
	let margin = width / 15;

	let posX = width / 2.7;
	let posY = height / 3;
	blendMode(OVERLAY);
	// HeadLight d'auto asphalte mouillé
	for (let i = 0; i < numPoints; i++) {
		let angle = random(0, TWO_PI);
		let scalar = random(margin, width);
		let x = posX + cos(angle) * scalar;
		let y = posY + sin(angle) * scalar;
		let dirX = x + 3 + cos(angle) * 75;
		let dirY = y + 3 + sin(angle) * 300;
		let alpha = random(10, 60);
		let sw = random(1, 10);
		strokeWeight(sw);
		stroke(random(0, 360), random(10, 25), 100, alpha);
		line(x, y, dirX, dirY);
	}
	blendMode(BLEND);
	noStroke();
	push();
	translate(posX, posY);
	rotate(0);

	let elW = margin * random(1.8, 2.4);
	let elH = random(0, 360);
	let elS = 100;
	for (let alpha = 0; alpha < 100; alpha += 1) {
		fill(elH, elS, 100, alpha);
		ellipse(0, 0, elW, elW);
		elH += random(1, 10);
		if (elH <= 0 || elH >= 360) {
			elH = 0;
		}
		elS = elS -= 10;
		elW = elW -= 15;
		if (elW <= 300) {
			elW = 300;
		}
	}
	pop();

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
