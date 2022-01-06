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
	background(195, 17, 90);
	rectMode(CENTER);

	let arrX = [];
	let arrY = [];
	let formResolution = 120;
	let rectW = width / 6;
	let spacing = rectW / formResolution;
	console.log(spacing);
	let stepSize = 2;
	let centerX = width / 2;
	let centerY = height / 2;
	let rightX = centerX + rectW / 2;
	let leftX = centerX - rectW / 2;
	let topY = centerY - rectW / 2;
	let bottomY = centerY + rectW / 2;
	let angle = radians(360 / formResolution);

	fill(30, 61, 58);
	rect(centerX, centerY, rectW, rectW);
	point(centerX, centerY);

	for (let x = leftX; x < rightX; x += spacing) {
		//point(x, topY);
		arrX.push(x);
		arrY.push(topY);
	}
	for (let x = leftX; x < rightX; x += spacing) {
		//point(x, bottomY);
		arrX.push(x);
		arrY.push(bottomY);
	}
	for (let y = topY; y < bottomY; y += spacing) {
		//point(leftX, y);
		arrX.push(leftX);
		arrY.push(y);
	}
	for (let y = topY; y <= bottomY; y += spacing) {
		//point(rightX, y);
		arrX.push(rightX);
		arrY.push(y);
	}
	console.log(arrY);
	/**
	 * GUI Helper
	 */
	// gui.add(module_name, 'x', 0, width, 0.00001);
	// gui.add(module_name, 'y', 0, width, 0.00001);

	// Return a renderer, which is like p5.js 'draw' function
	return ({p5, time, width, height, context, exporting, bleed, trimWidth, trimHeight}) => {
		let hue = 85;
		for (let i = 0; i <= formResolution * 4; i++) {
			arrX[i] += random(-stepSize, stepSize);
			arrY[i] += random(-stepSize, stepSize);
			strokeWeight(1);
			stroke(hue, 33, 28);
			fill(hue, 29, 74);
			ellipse(arrX[i], arrY[i], 4, 4);
			hue += random(-1, 1);
		}
		exporting = true;
		if (!exporting && bleed > 0) {
			stroke(0, 100, 100);
			noFill();
			strokeWeight(10);
			rect(bleed, bleed, trimWidth, trimHeight);
		}
	};
}, settings);
