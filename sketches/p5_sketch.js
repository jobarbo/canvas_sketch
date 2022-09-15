// Import sketch objects
import Dune from './dune.js';
import Sun from './sun.js';
import * as dat from 'dat.gui';
const palettes = require('nice-color-palettes/1000.json');
const canvasSketch = require('canvas-sketch');
const p5 = require('p5');
new p5();
const horizontal = 20 * 300;
const vertical = 25 * 300;

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
	rectMode(CENTER);
	angleMode(DEGREES);
	background(181, 93, 0);
	const duneNum = 1;
	let duneList = [];
	let xSteps = width / (duneNum + 1);
	let xPos = xSteps;
	let duneWidth = height;

	let sun = new Sun();
	sun.display();
	for (let i = 0; i < duneNum; i++) {
		duneList[i] = new Dune(xPos, height + 1000, duneWidth);
		xPos += xSteps;
	}

	/**
	 * GUI Helper
	 */
	// gui.add(module_name, 'x', 0, width, 0.00001);
	// gui.add(module_name, 'y', 0, width, 0.00001);

	// Return a renderer, which is like p5.js 'draw' function
	return ({p5, time, width, height, context, exporting, bleed, trimWidth, trimHeight}) => {
		exporting = true;
		for (let i = 0; i < duneNum; i++) {
			duneList[i].display();
			duneList[i].move();
		}
		if (!exporting && bleed > 0) {
			stroke(0, 100, 100);
			noFill();
			strokeWeight(10);
			rect(bleed, bleed, trimWidth, trimHeight);
		}
	};
}, settings);
