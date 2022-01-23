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

let img = '';
window.preload = () => {
	// You can use p5.loadImage() here, etc...
	img = loadImage('/media/images/autumn2.png');
};

canvasSketch((context, bleed, trimWidth, trimHeight) => {
	// Sketch setup => Like p5.js 'setup' function
	noSmooth();
	colorMode(HSB, 360, 100, 100, 100);

	image(img, 0, 0);

	let colorArr = random(palettes);
	let numPoints = 2000000;
	let margin = 0;
	let posX = random(width / 6, width / 1.5);
	let posY = height / 3;
	let angleArr = [];
	let scalarArr = [];
	let arrX = [];
	let arrY = [];
	let colourArr = [];
	strokeCap(SQUARE);
	// HeadLight d'auto asphalte mouillé
	for (let i = 0; i < numPoints; i++) {
		angleArr[i] = random(0, TWO_PI);
		scalarArr[i] = random(margin, width * 1);
		arrX[i] = posX + sin(angleArr[i]) * scalarArr[i];
		arrY[i] = posY + cos(angleArr[i]) * scalarArr[i];
		colourArr[i] = get(arrX[i], arrY[i]);
	}
	background(50, 10, 100);
	for (let i = 0; i < numPoints; i++) {
		colorMode(RGB);
		let angle = angleArr[i];
		let scalar = scalarArr[i];
		let x = arrX[i];
		let y = arrY[i];
		let dirX = x + 1 + sin(angle) * 3;
		let dirY = y + 1 + cos(angle) * 3;
		let alpha = 100;
		let sw = random(1, 100);
		let colour = colourArr[i];
		strokeWeight(sw);
		stroke(colour);
		line(x, y, dirX, dirY);
		colorMode(HSB, 360, 100, 100, 100);
	}
	//createTexture(bgBright);
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

function createTexture(bgBright) {
	let texture = [];

	for (let index = 0; index < 3000; index++) {
		const rdnX = random(0, width);
		const rdnY = random(0, height);
		const rdnW1 = random(5, 150);
		texture[index] = new Smudge(rdnX, rdnY, rdnW1);
	}
	for (let index = 0; index < texture.length; index++) {
		for (let j = 0; j < 1000; j++) {
			texture[index].display(bgBright);
		}
	}
}

export default class Smudge {
	constructor(rdnX, rdnY, w1) {
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
		this.alpha = int(random(1, 20));
	}

	display(bgBright) {
		this.xoff += 0.0002;
		this.yoff += 0.004;
		this.woff1 += 0.55;

		const w1 = map(noise(this.woff1 + this.rdnW1), 0, 1, 1, 3);
		const x = map(noise(this.xoff + this.rdnX), 0, 1, this.mapXLow, this.mapXHigh);
		const y = map(noise(this.yoff + this.rdnY), 0, 1, this.mapYLow, this.mapYHigh);

		if (bgBright < 65) {
			fill(0, 0, 100, this.alpha);
		} else {
			fill(0, 0, 0, this.alpha);
		}
		noStroke();
		ellipse(x, y, w1, w1);
	}
}
