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

const preload = () => {
	// You can use p5.loadImage() here, etc...
};

canvasSketch((context, bleed, trimWidth, trimHeight) => {
	// Sketch setup => Like p5.js 'setup' function
	noSmooth();
	colorMode(HSB, 360, 100, 100, 100);
	background(10);

	let numPoints = 100000;
	let margin = width / 15;
	let bgBright = int(random(15, 35));
	let posX = width / 2.7;
	let posY = height / 3;
	blendMode(OVERLAY);
	// HeadLight d'auto asphalte mouillé
	for (let i = 0; i < numPoints; i++) {
		let angle = random(0, TWO_PI);
		let scalar = random(margin, width);
		let x = posX + cos(angle) * scalar;
		let y = posY + sin(angle) * scalar;
		let dirX = x + 3 + cos(angle) * 75;
		let dirY = y + 3 + sin(angle) * 300;
		let alpha = random(10, 60);
		let sw = random(1, 10);
		strokeWeight(sw);
		stroke(random(0, 360), random(10, 25), 100, alpha);
		line(x, y, dirX, dirY);
	}
	blendMode(BLEND);
	noStroke();
	push();
	translate(posX, posY);
	rotate(0);

	let elW = margin * random(2, 2.4);
	let elH = random(0, 360);
	let elS = 100;
	for (let alpha = 0; alpha < 100; alpha += 1) {
		fill(elH, elS, 100, alpha);
		ellipse(0, 0, elW, elW);
		elH += random(1, 10);
		if (elH <= 0 || elH >= 360) {
			elH = 0;
		}
		elS = elS -= 10;
		elW = elW -= 10;
		if (elW <= margin / 2) {
			elW = margin / 2;
		}
	}
	pop();
	createTexture(bgBright);
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
