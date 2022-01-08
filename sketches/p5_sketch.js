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
	background(0, 0, 100);
	rectMode(CENTER);
	let colorArr = random(palettes);
	let spacing = 500;
	let rectColor = [];
	let rectW = width;
	let rectB = 0;
	let counter = 0;
	let curveColor = random(colorArr);
	let middleX = random(width / 2 - spacing / 2, width / 2 + spacing / 2);
	let middleY = random(height / 2 - spacing / 2, height / 2 + spacing / 2);
	while (rectW >= spacing) {
		if (counter % 2 == 0) {
			rectColor = colorArr[0];
		} else {
			rectColor = colorArr[4];
		}

		noStroke();
		fill(rectColor);
		rect(width / 2, height / 2, rectW, rectW);
		rectW = rectW - spacing;

		counter++;
	}
	curveColor = colorArr[4];
	blendMode(BLEND);
	beginShape();
	noFill();
	stroke(curveColor);
	strokeWeight(spacing / 4);
	curveVertex(width / 2 - (spacing + 25) / 2, height / 2 - (spacing + 25) / 2);
	curveVertex(width / 2 - (spacing + 25) / 2, height / 2 - (spacing + 25) / 2);

	curveVertex(middleX, middleY);

	curveVertex(width / 2 + (spacing + 25) / 2, height / 2 + (spacing + 25) / 2);
	curveVertex(width / 2 + (spacing + 25) / 2, height / 2 + (spacing + 25) / 2);
	endShape();
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
