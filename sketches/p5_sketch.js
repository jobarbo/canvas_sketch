// Import sketch objects
import Stalagmite from './stalagmite.js';
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
	rectMode(CENTER);
	angleMode(DEGREES);

	const bgColor = color(190, 20, 15);
	background(bgColor);

	// Stalagmites
	const stalagNum = 10;
	let stalagList = [];
	let xSteps = width / (stalagNum + 1);
	let xPos = xSteps;
	let yPos;
	let yDir = -1;
	let stalagHue = 10;
	let stalagSat = 10;
	let stalagBright = 0;
	let stalagWidth = (width / stalagNum) * 1.2;

	for (let i = 0; i < stalagNum; i++) {
		if (i % 2 == 0) {
			yPos = -250;
			yDir = 1;
		} else {
			yPos = height + 250;
			yDir = -1;
		}
		stalagList[i] = new Stalagmite(xPos, yPos, stalagWidth, yDir, stalagHue, stalagSat, stalagBright);
		xPos += xSteps;
	}

	//Cave
	let caveBrightness = 1;
	let cavePosX = 0;
	let cavePosY = 0;
	let caveSpeed = 300;
	let caveWidth = width * 1.5;
	let caveHeight = height * 1.5;
	let caveCurve = 5000;
	translate(width / 2, height / 2);

	for (let caveScale = 1; caveScale > 0; caveScale += -0.001) {
		caveCurve += random(-300, 250);
		if (caveCurve <= 0) {
			caveCurve = 0;
		}

		stroke(0, 0, caveBrightness);
		fill(0, 0, caveBrightness);
		rect(cavePosX, cavePosY, caveWidth, caveHeight, caveCurve);
		scale(caveScale);
		caveBrightness = caveBrightness * 1.05;
		cavePosX += random(-caveSpeed, caveSpeed);
		cavePosY += random(-caveSpeed, caveSpeed);
		caveWidth += random(-100, 100);
		caveHeight += random(-100, 100);
		caveSpeed = caveSpeed * 0.985;
	}

	return ({p5, time, width, height, context, exporting, bleed, trimWidth, trimHeight}) => {
		exporting = true;
		for (let i = 0; i < stalagNum; i++) {
			stalagList[i].display();
			stalagList[i].move();
		}
		if (!exporting && bleed > 0) {
			stroke(0, 100, 100);
			noFill();
			strokeWeight(10);
			rect(bleed, bleed, trimWidth, trimHeight);
		}
	};
}, settings);
