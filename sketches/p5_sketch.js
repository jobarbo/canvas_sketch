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
	background(0, 0, 100);
	rectMode(CENTER);
	let colorArr = random(palettes);
	let spacing = 600;
	let rectColor = [];
	let rectW = width;
	let rectB = 0;
	let counter = 0;
	let curveColor = random(colorArr);
	let middleX = random(width / 2 - spacing / 2, width / 2 + spacing / 2);
	let middleY = random(height / 2 - spacing / 2, height / 2 + spacing / 2);
	let iCol = 0;
	let prevCol = 3;
	while (rectW >= spacing * 2) {
		/* 		if (counter % 2 == 0) {
			rectColor = colorArr[iCol1];
		} else {
			rectColor = colorArr[iCol2];
		} */
		rectColor = colorArr[iCol];
		noStroke();
		fill(rectColor);
		rect(width / 2, height / 2, rectW, rectW);
		rectW = rectW - spacing;
		counter++;
		iCol++;
		prevCol++;
		if (iCol > 4) {
			iCol = 0;
		}
		if (prevCol > 4) {
			prevCol = 0;
		}
	}
	curveColor = colorArr[prevCol];
	blendMode(BLEND);
	beginShape();
	noFill();
	stroke(curveColor);
	strokeWeight(spacing / 4);
	curveVertex(width / 2 - (spacing + 600) / 2, height / 2 - (spacing + 600) / 2);
	curveVertex(width / 2 - (spacing + 600) / 2, height / 2 - (spacing + 600) / 2);

	curveVertex(middleX, middleY);

	curveVertex(width / 2 + (spacing + 600) / 2, height / 2 + (spacing + 600) / 2);
	curveVertex(width / 2 + (spacing + 600) / 2, height / 2 + (spacing + 600) / 2);
	endShape();

	createTexture(0);
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

	for (let index = 0; index < 2000; index++) {
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
		this.xoff += 0.002;
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
