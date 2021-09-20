// Import sketch objects
import Bubble from './bubble.js';

const canvasSketch = require('canvas-sketch');
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
	initSketch();
	context.canvas.addEventListener('click', () => {
		initSketch();
	});

	// Return a renderer, which is like p5.js 'draw' function
	return ({ p5, time, width, height }) => {
		// Draw with p5.js things
	};
}, settings);

function initSketch() {
	let bgHue = int(random(0, 360));
	let bgSat = int(random(10, 30));
	let bgBright = int(random(10, 90));
	console.table(bgHue, bgSat, bgBright);
	colorMode(HSB, 360, 100, 100, 100);

	// old-color = hue , 10 ,95
	background(bgHue, bgSat, bgBright);

	let bubble = [];
	const bubbleNum = int(random(5, 70));

	for (let i = 0; i <= bubbleNum; i++) {
		bubble[i] = new Bubble(bgHue, bgSat, bgBright);
	}

	for (let index = 0; index < 500; index++) {
		for (let i = 0; i <= bubbleNum; i++) {
			bubble[i].move();
			bubble[i].display();
		}
	}
	createTexture(bgHue, bgSat, bgBright);
}
function createTexture(bgHue, bgSat, bgBright) {
	let texture = [];

	for (let index = 0; index < 1000; index++) {
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

			if (bgBright < 50) {
				fill(0, 0, 100, this.alpha);
			} else {
				fill(0, 0, 0, this.alpha);
			}
			noStroke();
			ellipse(x, y, w1, w1);
		}
	}
}
