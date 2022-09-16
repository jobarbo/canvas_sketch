// Import sketch objects
import Dune from './dune.js';
import Sun from './sun.js';
import * as dat from 'dat.gui';
const palettes = require('nice-color-palettes/1000.json');
const canvasSketch = require('canvas-sketch');
const p5 = require('p5');
new p5();
const horizontal = 12 * 300;
const vertical = 18 * 300;

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
	background(257, 30, 20);

	// create Sun
	angleMode(RADIANS);
	let sun = new Sun();
	sun.display();

	// Create dunes properties
	const duneNum = 1;
	let duneList = [];
	let xSteps = width / (duneNum + 1);
	let xPos = xSteps;
	let duneWidth = height;
	// create dunes
	angleMode(DEGREES);
	for (let i = 0; i < duneNum; i++) {
		duneList[i] = new Dune(xPos, height + 1000, duneWidth);
		xPos += xSteps;
	}

	// move dunes
	for (let i = 0; i < duneNum; i++) {
		for (let j = 0; j < 1000000; j += 46) {
			duneList[i].display(j);
			duneList[i].move();
		}
	}

	createTexture();

	/**
	 * GUI Helper
	 */
	// gui.add(module_name, 'x', 0, width, 0.00001);
	// gui.add(module_name, 'y', 0, width, 0.00001);

	// Return a renderer, which is like p5.js 'draw' function
	return ({p5, time, width, height, context, exporting, bleed, trimWidth, trimHeight}) => {
		exporting = true;
		/* 		for (let i = 0; i < duneNum; i++) {
			duneList[i].display();
			duneList[i].move();
		} */
		if (!exporting && bleed > 0) {
			stroke(0, 100, 100);
			noFill();
			strokeWeight(10);
			rect(bleed, bleed, trimWidth, trimHeight);
		}
	};
}, settings);

function createTexture() {
	let texture = [];

	for (let index = 0; index < 2000; index++) {
		const rdnX = random(0, width);
		const rdnY = random(0, height);
		const rdnW1 = random(5, 450);
		texture[index] = new Smudge(rdnX, rdnY, rdnW1);
	}
	for (let index = 0; index < texture.length; index++) {
		for (let j = 0; j < 1000; j++) {
			texture[index].display();
		}
	}
}

export default class Smudge {
	constructor(rdnX, rdnY, w1) {
		this.type = int(random(0, 2));
		this.xoff = 0;
		this.yoff = 1;
		this.woff1 = 0;
		this.rdnX = rdnX;
		this.rdnY = rdnY;
		this.rdnW1 = w1;
		this.mapXLow = -width / 3;
		this.mapXHigh = width * 1.5;
		this.mapYLow = -height / 3;
		this.mapYHigh = height * 1.5;
		this.alpha = int(random(5, 25));
	}

	display() {
		this.xoff += 0.03;
		this.yoff += 0.0002;
		this.woff1 += 0.55;

		const w1 = map(noise(this.woff1 + this.rdnW1), 0, 1, 1, 3);
		const x = map(noise(this.xoff + this.rdnX), 0, 1, this.mapXLow, this.mapXHigh);
		const y = map(noise(this.yoff + this.rdnY), 0, 1, this.mapYLow, this.mapYHigh);

		if (this.type == 0) {
			fill(27, 55, 75, this.alpha);
		} else {
			fill(257, 30, 20, this.alpha);
		}
		noStroke();
		ellipse(x, y, w1, w1);
	}
}
