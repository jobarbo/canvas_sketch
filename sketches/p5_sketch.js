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
	let bgSat = int(random(10, 50));
	let bgBright = int(random(20, 80));
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
}
