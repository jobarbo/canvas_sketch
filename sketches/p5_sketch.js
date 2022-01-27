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
	// Sketch setup
	// Like p5.js 'setup' function
	noSmooth();
	blendMode(BLEND);
	colorMode(HSB, 360, 100, 100, 100);

	let chosenPalettes = random(palettes);
	let margin = 0;
	let wSpacing = width * 2;
	let hSpacing = height * 2;
	let xoff = 0.6;
	let yoff = 0.1;
	let woff = 0.3;
	let wContainer = wSpacing * 2;
	let hContainer = hSpacing * 2;

	background(chosenPalettes[0]);
	//displayStars();
	window.mousePressed = () => {};
	for (let i = 0; i < 1000; i++) {
		xoff = random(0, 1);
		yoff = random(0, 1);
		woff = random(0, 1);
		paint(margin, wSpacing, hSpacing, xoff, yoff, woff, wContainer, hContainer, chosenPalettes);
	}

	// Return a renderer, which is like p5.js 'draw' function
	return ({p5, time, width, height, context, exporting, bleed, trimWidth, trimHeight}) => {
		// Draw with p5.js things
		/*if (mouseIsPressed) {

			paint(margin, wSpacing, hSpacing, xoff, yoff, woff, wContainer, hContainer, chosenPalettes);
		}*/
	};
}, settings);

function paint(margin, wSpacing, hSpacing, xoff, yoff, woff, wContainer, hContainer, chosenPalettes) {
	let cx, cy;
	let maxW = 10;
	let paletteIndex = floor(random(1, 5));
	let seamColor = color(chosenPalettes[paletteIndex]);

	for (let s = 0; s < wSpacing * 2; s++) {
		let x = map(noise(xoff), 0, 1, width / 2 - wContainer, width / 2 + wContainer);
		let y = map(noise(yoff), 0, 1, height / 2 - hContainer, height / 2 + hContainer);
		let elW = map(noise(woff), 0, 1, 0, maxW);

		let elAlpha = map(elW, maxW / 3, maxW, 0, 50, true);

		noStroke();
		// stroke(190, 53, 89, 0);
		seamColor.setAlpha(elAlpha);
		fill(seamColor);
		ellipse(x, y, elW, elW);

		xoff += random(0.00005, 0.0005);
		yoff += random(0.00005, 0.0005);
		woff += 0.1;
	}
}
