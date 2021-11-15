// Import sketch objects
import Car from './ball_mc.js';
import * as dat from 'dat.gui';
const palettes = require('nice-color-palettes/1000.json');
const canvasSketch = require('canvas-sketch');
const p5 = require('p5');
new p5();
const horizontal = 10 * 300;
const vertical = 10 * 300;

const gui = new dat.GUI({closed: true});

const settings = {
	// Pass the p5 instance, and preload function if necessary
	p5: true,
	dimensions: [horizontal, vertical],
	units: 'px',
	//duration: 30,
	//fps: 60,
	animate: false,
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
	let myCar = [];
	let xsize, ysize;
	let relDir = int(width / 100);
	let relSpeed = int(width / 250);
	let relLimit = int(width * (92 / 100));
	let relSizeChange = int(width / 500);
	let relWandering = int(width * (400 / 100));
	//let carNum = int(width / 3.333);
	let carNum = 150;
	for (let i = 0; i < carNum; i++) {
		xsize = random(width / 100, width / 10);
		ysize = random(width / 100, width / 10);
		myCar[i] = new Car(xsize, ysize, relDir, relSpeed, relSizeChange);
	}
	for (let i = 0; i < 10000; i++) {
		for (let j = 0; j < myCar.length; j++) {
			myCar[j].move();
			myCar[j].display();
			if (i > relLimit) {
				myCar[j].shrink();
			}
		}
	}
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
