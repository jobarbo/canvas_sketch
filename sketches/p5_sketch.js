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

let render;
window.preload = () => {
	// You can use p5.loadImage() here, etc...
	render = loadImage('/media/dither/output3_10.jpg');
};

function imageIndex(img, x, y) {
	return 4 * (x + y * img.width);
}

function getColorAtindex(img, x, y) {
	let idx = imageIndex(img, x, y);
	let pix = img.pixels;
	let red = pix[idx];
	let green = pix[idx + 1];
	let blue = pix[idx + 2];
	let alpha = pix[idx + 3];
	return color(red, green, blue, alpha);
}

function setColorAtIndex(img, x, y, colour) {
	let idx = imageIndex(img, x, y);
	let pix = img.pixels;
	pix[idx] = red(colour);
	pix[idx + 1] = green(colour);
	pix[idx + 2] = blue(colour);
	pix[idx + 3] = alpha(colour);
}

function closestStep(max, steps, value) {
	return round((steps * value) / max) * floor(max / steps);
}
function makeDithered(img, steps) {
	img.loadPixels();

	for (let y = 0; y < img.height; y++) {
		for (let x = 0; x < img.width; x++) {
			let colour = getColorAtindex(img, x, y);
			let oldR = red(colour);
			let oldG = green(colour);
			let oldB = blue(colour);
			let newR = closestStep(255, steps, oldR);
			let newG = closestStep(255, steps, oldG);
			let newB = closestStep(255, steps, oldB);

			let newColour = color(newR, newG, newB);
			setColorAtIndex(img, x, y, newColour);

			let errR = oldR - newR;
			let errG = oldG - newG;
			let errB = oldB - newB;

			distributeError(img, x, y, errR, errG, errB);
		}
	}
	img.updatePixels();
}

function distributeError(img, x, y, errR, errG, errB) {
	addError(img, 7 / 16.0, x + 1, y, errR, errG, errB);
	addError(img, 3 / 16.0, x - 1, y + 1, errR, errG, errB);
	addError(img, 5 / 16.0, x, y + 1, errR, errG, errB);
	addError(img, 1 / 16.0, x + 1, y + 1, errR, errG, errB);
}

function addError(img, factor, x, y, errR, errG, errB) {
	if (x < 0 || x >= img.width || y < 0 || y >= img.height) {
		return;
	}
	let colour = getColorAtindex(img, x, y);
	let r = red(colour);
	let g = green(colour);
	let b = blue(colour);
	colour.setRed(r + errR * factor);
	colour.setGreen(g + errG * factor);
	colour.setBlue(b + errB * factor);

	setColorAtIndex(img, x, y, colour);
}

canvasSketch((context, bleed, trimWidth, trimHeight) => {
	// Sketch setup => Like p5.js 'setup' function
	noSmooth();
	makeDithered(render, 2);
	image(render, 0, 0, width, height);
	filter(GRAY);
	//filter(THRESHOLD);
	//filter(OPAQUE);
	//filter(POSTERIZE, 3);
	//filter(DILATE);
	//filter(BLUR, 3);
	//filter(ERODE);
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
