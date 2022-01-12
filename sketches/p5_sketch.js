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

let img = '';
let roboto;
window.preload = () => {
	// You can use p5.loadImage() here, etc...
	img = loadImage('media/images/position-sticky.png');
	roboto = loadFont('media/fonts/RobotoSlab-Medium.ttf');
};

canvasSketch((context, bleed, trimWidth, trimHeight) => {
	// Sketch setup => Like p5.js 'setup' function
	noSmooth();
	colorMode(HSB, 360, 100, 100, 100);
	background(10, 5, 10);

	let margin = width / 4;

	image(img, margin / 2, margin / 3, width - margin, height - margin);
	noFill();
	strokeWeight(50);
	stroke(46, 5, 98);
	//rect(margin / 2, margin / 3, width - margin, height - margin);
	textFont(roboto);
	let s = 'Label: Fidenza, Tyler Hobbs ';
	textSize(100);
	fill(46, 5, 98);
	strokeWeight(1);
	text(s, margin / 2, height - margin + 400, 2000, 400); //
	let s2 = 'Confidence: 99% ';
	textSize(80);
	fill(46, 5, 98);
	strokeWeight(1);
	text(s2, margin / 2, height - margin + 550, 2000, 550); //
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
