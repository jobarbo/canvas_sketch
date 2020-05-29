// Import sketch objects
import Bubble from './bubble.js';

const canvasSketch = require('canvas-sketch');
const p5 = require('p5');
new p5();

const horizontal = 12 * 72;
const vertical = 12 * 72;
// AMIGA-STYLE "COPPER PLASMA"

///////////////////
// GLOBAL CONSTANTS

const PLASMA_SCALE = 5;

// size of each pixel block
const BLOCK_SIZE = 8;

///////////////
// GLOBAL STATE

// render buffer
var graphics;
const settings = {
	// Pass the p5 instance, and preload function if necessary
	p5: true,
	dimensions: [horizontal, vertical],
	units: 'px',
	bleed: horizontal / 8,
	//pixelsPerInch: 72,

	// Turn on a render loop
	animate: true,
};

const preload = () => {
	// You can use p5.loadImage() here, etc...
};

canvasSketch((context) => {
	// Sketch setup
	// Like p5.js 'setup' function
	noSmooth();
	noStroke();

	colorMode(HSB, 360, 100, 100, 100);

	// create an off-screen graphics buffer
	graphics = createGraphics(int(width / BLOCK_SIZE), int(height / BLOCK_SIZE));

	// Return a renderer, which is like p5.js 'draw' function
	return ({ p5, time, width, height }) => {
		// Draw with p5.js things

		// get the phase
		var phase = millis() * 0.001;

		// for each pixel in the graphics buffer...
		graphics.loadPixels();
		var i = 0;
		for (var y = 0; y < graphics.height; ++y) {
			for (var x = 0; x < graphics.width; ++x) {
				// compute plasma color
				var hue = phase * 15.0 + y / (PLASMA_SCALE * 0.5) + 8.0 * sin(phase + y / (PLASMA_SCALE * 4.0) + 4.0 * sin(phase + x / (PLASMA_SCALE * 8.0) + 0.5 * sin(phase + y / (PLASMA_SCALE * 4.0))));

				// write pixel
				var c = color(hue % 360, 70, 100);
				graphics.pixels[i++] = red(c);
				graphics.pixels[i++] = green(c);
				graphics.pixels[i++] = blue(c);
				graphics.pixels[i++] = 360;
			}
		}
		graphics.updatePixels();

		// draw the render buffer with scaling
		image(graphics, 0, 0, BLOCK_SIZE * graphics.width, BLOCK_SIZE * graphics.height);
	};
}, settings);
