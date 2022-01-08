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
	// Sketch setup
	// Like p5.js 'setup' function
	let yoff, skyMinY, skyMaxY, landMinY, landMaxY, landHue, landSat, landBright, skyHue, skySat, skyBright, landscapeStep, skyStep;
	let colorsArr = [];
	colorMode(HSB, 360, 100, 100, 100);

	function init() {
		colorsArr = random(palettes);
		yoff = 0.0; // 2nd dimension of perlin noise
		skyMinY = 0;
		skyMaxY = 0;
		landMinY = height / 4;
		landMaxY = height / 2;
		landHue = 211;
		landSat = 100;
		landBright = 30;
		skyHue = 187;
		skySat = 86;
		skyBright = 60;
		landscapeStep = 200;
		skyStep = 2;
		noiseSeed();
		noStroke();
	}

	function createLandscape() {
		let xoff = 0;

		for (let i = 0; i < 1; i++) {
			beginShape();
			fill(random(colorsArr));
			for (let x = 0; x <= width + landscapeStep; x += landscapeStep) {
				let y = map(noise(xoff, yoff), 0, 1, landMaxY, landMinY);

				curveVertex(x, y);
				xoff += 0.08;
			}
			landMinY += height / 7;
			landMaxY += height / 6;
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
			fill(random(colorsArr));
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

	// Return a renderer, which is like p5.js 'draw' function
	return ({p5, time, width, height}) => {
		// Draw with p5.js things
	};
}, settings);
