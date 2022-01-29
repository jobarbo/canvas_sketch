// Import sketch objects
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

let img = '';
window.preload = () => {
	// You can use p5.loadImage() here, etc...
	img = loadImage('/media/images/cap.png');
};

canvasSketch((context, bleed, trimWidth, trimHeight) => {
	// Sketch setup => Like p5.js 'setup' function
	noSmooth();
	colorMode(HSB, 360, 100, 100, 100);

	image(img, 0, 0, width, height);

	let colorArr = random(palettes);
	let numPoints = 50000;
	let margin = 0;
	let posX = width / 2;
	let posY = height / 3.2;
	let angleArr = [];
	let scalarArr = [];
	let arrX = [];
	let arrY = [];
	let colourArr = [];
	strokeCap(SQUARE);
	// HeadLight d'auto asphalte mouillé
	for (let i = 0; i < numPoints; i++) {
		angleArr[i] = random(0, TWO_PI);
		scalarArr[i] = random(margin, width * 1);
		arrX[i] = posX + sin(angleArr[i]) * scalarArr[i];
		arrY[i] = posY + cos(angleArr[i]) * scalarArr[i];
		colourArr[i] = get(arrX[i], arrY[i]);
	}
	console.log(colourArr);
	background(50, 0, 0);
	for (let i = 0; i < numPoints; i++) {
		colorMode(HSB);
		let angle = angleArr[i];
		let scalar = scalarArr[i];
		let x = arrX[i];
		let y = arrY[i];
		let dirX = x + 1 + sin(angle) * 3;
		let dirY = y + 1 + cos(angle) * 3;
		let alpha = 100;
		let sw = random(1, 25);
		let colour = colourArr[i];
		strokeWeight(sw);
		stroke(colour[0]);
		line(x, y, dirX, dirY);
		colorMode(HSB, 360, 100, 100, 100);
	}
	//createTexture(bgBright);
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
