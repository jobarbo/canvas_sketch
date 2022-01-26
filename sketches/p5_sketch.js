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
	background(54, 0, 0);

	let m = 256;
	let a = 11;
	let c = 4;
	let x = floor(random(0, 200000));
	let pScale = 30;

	function lcg(mapStart, mapEnd) {
		let rand = (a * x + c) % m;
		x = rand;
		rand = floor(map(x, 0, m, mapStart, mapEnd));
		return rand;
	}

	for (var elx = pScale * 1; elx <= width - pScale * 1; elx += pScale) {
		for (var ely = pScale * 1; ely <= height - pScale * 1; ely += pScale) {
			fill(lcg(0, 60), lcg(20, 100), lcg(0, 100));
			noStroke();
			rectMode(CENTER);
			rect(elx, ely, lcg(pScale, pScale));
		}
	}
	/**
	 * GUI Helper
	 */
	// gui.add(module_name, 'x', 0, width, 0.00001);
	// gui.add(module_name, 'y', 0, width, 0.00001);

	createTexture();

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

function createTexture(bgHue, bgSat, bgBright) {
	let texture = [];

	for (let index = 0; index < 5000; index++) {
		const rdnX = random(0, width);
		const rdnY = random(0, height);
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
		this.alpha = int(random(5, 15));
	}

	display(bgBright) {
		for (let index = 0; index < 1000; index++) {
			this.xoff += 0.003;
			this.yoff += 0.003;
			this.woff1 += 0.55;

			const w1 = map(noise(this.woff1 + this.rdnW1), 0, 1, 1, 3);
			const x = map(noise(this.xoff + this.rdnX), 0, 1, -1000, width + 1500);
			const y = map(noise(this.yoff + this.rdnY), 0, 1, -1000, height + 1500);

			fill(0, 0, 100, this.alpha);
			noStroke();
			ellipse(x, y, w1, w1);
		}
	}
}
