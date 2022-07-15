// Import sketch objects
import Stars from "./stars.js";
const palettes = require("nice-color-palettes/1000.json");
const canvasSketch = require("canvas-sketch");
const p5 = require("p5");
window.p5 = p5;
require("p5/lib/addons/p5.sound");
new p5();

// Setup the sketch resolution
const horizontal = 12 * 300;
const vertical = 12 * 300;

const settings = {
	// Pass the p5 instance, and preload function if necessary
	p5: true,
	dimensions: [horizontal, vertical],
	units: "px",
	//duration: 30,
	//fps: 60,
	animate: true,
	attributes: {
		antialias: true,
	},
};
// Optionally preload before you load the sketch
window.preload = () => {
	// Preload sounds/images/etc...
};

canvasSketch((context, bleed, trimWidth, trimHeight) => {
	// Sketch setup => Like p5.js 'setup' function
	let mic = new p5.AudioIn();

	let micLevel = "";
	window.mouseClicked = () => {
		mic.start();
	};
	colorMode(HSB, 360, 100, 100, 100);
	let bgHue = 10;

	background(bgHue, 10, 0);

	// let entity = new Entity(width / 2, height / 2, 150);
	let stars = [];
	let starsNum = 500;
	for (let i = 0; i < starsNum; i++) {
		stars[i] = new Stars(randomGaussian(width / 2, 500), randomGaussian(height / 2, 500), 50);
	}

	/**
	 * GUI Helper
	 */

	// gui.add(module_name, 'x', 0, width, 0.00001);
	// gui.add(module_name, 'y', 0, width, 0.00001);

	// Return a renderer, which is like p5.js 'draw' function
	return ({p5, time, width, height, context, exporting, bleed, trimWidth, trimHeight}) => {
		// p5.js stuff => Like p5.js 'draw' function
		console.log(bgHue);
		// map micLevel to hue from 0 to 1 to 0 to 360
		bgHue = map(micLevel, 0.03, 0.15, 0, 360);
		bgHue = constrain(bgHue, 0, 360);

		background(bgHue, 10, 0, 5);
		micLevel = mic.getLevel();
		for (let i = 0; i < starsNum; i++) {
			stars[i].display(micLevel);
			stars[i].move(micLevel);
			stars[i].oscilateWeight(micLevel);
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
