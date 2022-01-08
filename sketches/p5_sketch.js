// Import sketch objects
import Entity from './entity.js';
import * as dat from 'dat.gui';
const palettes = require('nice-color-palettes');
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
	// Sketch setup
	// Like p5.js 'setup' function
	let yoff, skyMinY, skyMaxY, landMinY, landMaxY, landHue, landSat, landBright, skyHue, skySat, skyBright, landscapeStep, skyStep;
	let colorsArr = [];
	let landColor, skyColor;
	colorMode(HSB, 360, 100, 100, 100);

	function init() {
		colorsArr = random(palettes);
		yoff = 0.0; // 2nd dimension of perlin noise
		skyMinY = 0;
		skyMaxY = 0;
		landMinY = height / 3;
		landMaxY = height / 1.2;
		landHue = 211;
		landSat = 100;
		landBright = 30;
		skyHue = 187;
		skySat = 86;
		skyBright = 60;
		landscapeStep = 200;
		skyStep = 2;
		landColor = colorsArr[0];
		skyColor = colorsArr[4];
		noiseSeed();
		noStroke();
	}

	function createLandscape() {
		let xoff = 0;

		for (let i = 0; i < 1; i++) {
			beginShape();
			fill(landColor);
			for (let x = 0; x <= width + landscapeStep; x += landscapeStep) {
				let y = map(noise(xoff, yoff), 0, 1, landMaxY, landMinY);

				curveVertex(x, y);
				xoff += 0.12;
			}
			//landMinY += height / 7;
			//landMaxY += height / 6;
			landHue += 5;
			landSat += 5;
			landBright -= 5;
			vertex(width, height);
			vertex(0, height);
			endShape(CLOSE);
		}
		yoff += 0.1;
	}

	function makeSky() {
		//background(30, 20, 40);
		let xoff = 0;
		let skyAlpha = 100;
		for (let i = 0; i < 1; i++) {
			beginShape();
			if (skyColor == landColor) {
				skyColor = random(colorsArr);
			}
			fill(skyColor);
			for (let x = 0; x <= width + skyStep; x += skyStep) {
				let y = map(noise(xoff, yoff), 0, 1, skyMaxY, skyMinY);
				curveVertex(x, y);
				xoff += 0.0005;
			}
			skyMinY += height / 20;
			skyMaxY += height / 8;
			skyHue -= 2;
			skySat += 5;
			skyBright += 5;
			skyAlpha += 5;
			vertex(width, height);
			vertex(0, height);
			endShape(CLOSE);
		}
		yoff += 0.1;
	}

	init();
	makeSky();
	createLandscape();
	//blendMode(HARD_LIGHT);
	createTexture(0);

	// Return a renderer, which is like p5.js 'draw' function
	return ({p5, time, width, height}) => {
		// Draw with p5.js things
	};
}, settings);

function createTexture(bgBright) {
	let texture = [];

	for (let index = 0; index < 1000; index++) {
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
