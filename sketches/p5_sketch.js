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

canvasSketch((context) => {
	// Sketch setup
	// Like p5.js 'setup' function
	//const Bubble = require('./Bubble');

	//blendMode(ADD);

	initSketch();

	context.canvas.addEventListener('click', () => {
		initSketch();
	});
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

function initSketch() {
	colorMode(HSB, 360, 100, 100, 100);

	let bgHue = int(random(165, 180));
	let bgSat = int(random(10, 30));
	let bgBright = int(random(90, 100));
	let bubble = [];
	const bubbleNum = 1500;

	// old-color = hue , 10 ,95
	background(bgHue, bgSat, bgBright);

	fill(55, 40, 100);
	noStroke();
	ellipse(random(100, width - 100), random(100, height / 3), random(width / 3, width / 2));

	for (let i = 0; i < bubbleNum; i++) {
		let fSat = random(60, 90);
		let fBright = random(20, 40);
		const fHue = random(100, 160);
		fSat += 0.5;
		bubble[i] = new Bubble(bgHue, bgSat, bgBright, fHue, fSat, fBright);
	}

	for (let index = 0; index < 500; index++) {
		for (let i = 0; i < bubbleNum; i++) {
			bubble[i].move();
			bubble[i].display();
		}
	}

	createTexture(bgHue, bgSat, bgBright);
}
function createTexture(bgHue, bgSat, bgBright) {
	let texture = [];

	for (let index = 0; index < 4000; index++) {
		const rdnX = random(0, width + 0);
		const rdnY = random(0, height + 0);
		const rdnW1 = random(5, 150);
		texture[index] = new Smudge(rdnX, rdnY, rdnW1);
		texture[index].display(bgBright);
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
		this.alpha = int(random(5, 25));
	}

	display(bgBright) {
		for (let index = 0; index < 1000; index++) {
			this.xoff += 0.003;
			this.yoff += 0.00008;
			this.woff1 += 0.55;

			const w1 = map(noise(this.woff1 + this.rdnW1), 0, 1, 1, 3);
			const x = map(noise(this.xoff + this.rdnX), 0, 1, -width / 3, width * 1.5);
			const y = map(noise(this.yoff + this.rdnY), 0, 1, -height / 3, height * 1.5);

			if (bgBright < 65) {
				fill(0, 0, 100, this.alpha);
			} else {
				fill(0, 0, 100, this.alpha);
			}
			noStroke();
			ellipse(x, y, w1, w1);
		}
	}
}
