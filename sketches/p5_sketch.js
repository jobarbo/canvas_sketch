// Import sketch objects
import Bubble from './bubble.js';
const canvasSketch = require('canvas-sketch');
const palettes = require('nice-color-palettes');
const p5 = require('p5');
new p5();
const horizontal = 20 * 300;
const vertical = 20 * 300;

const settings = {
	// Pass the p5 instance, and preload function if necessary
	p5: true,
	dimensions: [horizontal, vertical],
	units: 'px',
	bleed: horizontal / 8,
	//pixelsPerInch: 72,

	// Turn on a render loop
	animate: true,
};

const preload = () => {
	// You can use p5.loadImage() here, etc...
};

canvasSketch((context) => {
	// Sketch setup
	// Like p5.js 'setup' function
	//const Bubble = require('./Bubble');

	//blendMode(ADD);

	console.time();
	initSketch();
	console.timeEnd();

	context.canvas.addEventListener('click', () => {
		console.time();
		initSketch();
		console.timeEnd();
	});
	// Return a renderer, which is like p5.js 'draw' function
	return ({ p5, time, width, height }) => {
		// Draw with p5.js things
	};
}, settings);

function initSketch() {
	colorMode(HSB, 360, 100, 100, 100);

	let bgHue = int(random(265, 265));
	let bgSat = int(random(50, 90));
	let bgBright = int(random(15, 35));
	let bubble = [];
	const bubbleNum = 7;
	const hueList = [350, 351, 352, 353, 354, 355, 356, 357, 358, 359, 360, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
	let fSat = random(25, 35);
	const fHue = random(hueList);

	// old-color = hue , 10 ,95
	background(bgHue, bgSat, bgBright);

	for (let i = 0; i < bubbleNum; i++) {
		fSat += 0.5;
		bubble[i] = new Bubble(bgHue, bgSat, bgBright, fHue, fSat);
	}

	for (let index = 0; index < 500; index++) {
		for (let i = 0; i < bubbleNum; i++) {
			bubble[i].move();
			bubble[i].display();
		}
	}
	blendMode(BLEND);
	createTexture(bgHue, bgSat, bgBright);
}
function createTexture(bgHue, bgSat, bgBright) {
	let texture = [];

	for (let index = 0; index < 4000; index++) {
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
		this.alpha = int(random(5, 25));
	}

	display(bgBright) {
		this.xoff += 0.003;
		this.yoff += 0.00008;
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
