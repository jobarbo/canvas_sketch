// Import sketch objects
import Entity from './entity.js';
import * as dat from 'dat.gui';
import HexToHsb from './utils/hexToHsb.js';
const ColorScheme = require('color-scheme');
const canvasSketch = require('canvas-sketch');
const p5 = require('p5');
new p5();
const horizontal = 12 * 100;
const vertical = 12 * 100;
const gui = new dat.GUI({closed: true});

const settings = {
	// Pass the p5 instance, and preload function if necessary
	p5: true,
	dimensions: [horizontal, vertical],
	units: 'px',
	bleed: 20,
	duration: 10,
	fps: 60,
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

	/* color Scheme help
	Schemes
		mono
		contrast
		triade
		tetrade
		analogic
	Variations
		pastel
		soft
		light
		hard
		pale
	 */

	/**
	 * GUI Helper
	 */

	// gui.add(module_name, 'x', 0, width, 0.00001);
	// gui.add(module_name, 'y', 0, width, 0.00001);

	colorMode(HSB, 360, 100, 100, 100);
	rectMode(CENTER);
	const s = new ColorScheme();
	s.from_hue(random(0, 360)).scheme('triade').variation('hard');
	const colors = s.colors();

	const convertedColor = new HexToHsb(colors);
	const palette = convertedColor.hsb;

	// Return a renderer, which is like p5.js 'draw' function
	return ({p5, time, width, height, context, exporting, bleed, trimWidth, trimHeight, playhead, frame}) => {
		// p5.js draw loop
		background(0, 0, 0, 100);
		console.log(`playhead: ${playhead}`);
		console.log(`time: ${time}`);
		console.log(`frame: ${frame}`);
		let loopy = cos(2 * PI * playhead);

		ellipse(width / 2, height / 2, 100 * loopy, 100 * loopy);

		exporting = false;
		if (!exporting && bleed > 0) {
			rectMode(CORNER);
			stroke(0, 100, 100);
			noFill();
			strokeWeight(2);
			rect(bleed, bleed, trimWidth, trimHeight);
		}
	};
}, settings);
