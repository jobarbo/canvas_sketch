// Import sketch objects
import Entity from './entity.js';
import * as dat from 'dat.gui';
import HexToHsb from './utils/hexToHsb.js';
const canvasSketch = require('canvas-sketch');
const p5 = require('p5');
new p5();
const horizontal = 12 * 300;
const vertical = 12 * 300;
const ColorScheme = require('color-scheme');

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

	colorMode(HSB, 360, 100, 100, 100);
	rectMode(CENTER);
	const s = new ColorScheme();
	s.from_hue(random(0, 360)).scheme('triade').variation('hard');
	const colors = s.colors();

	const convertedColor = new HexToHsb(colors);
	const palette = convertedColor.hsb;

	for (let i = 0; i < 1000; i++) {
		let chosenColor = palette[Math.floor(Math.random() * palette.length)];
		let chosenStrokeColor = palette[Math.floor(Math.random() * palette.length)];
		strokeWeight(15);
		fill(chosenColor[0], chosenColor[1], chosenColor[2]);
		stroke(chosenStrokeColor[0], chosenStrokeColor[1], chosenStrokeColor[2]);
		rect(random(100, width - 100), random((100, height - 100)), random(100, 1000), random(100, 500));
	}

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
