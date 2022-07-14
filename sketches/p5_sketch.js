// Import sketch objects
import Stars from "./stars.js";
import * as dat from "dat.gui";
const palettes = require("nice-color-palettes/1000.json");
const canvasSketch = require("canvas-sketch");
const p5 = require("p5");
new p5();
const horizontal = 12 * 300;
const vertical = 12 * 300;
const mic = "";
const gui = new dat.GUI({closed: true});

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

const preload = () => {
	mic = new p5.AudioIn();
	console.log(mic);
	// You can use p5.loadImage() here, etc...
};

canvasSketch((context, bleed, trimWidth, trimHeight) => {
	// Sketch setup => Like p5.js 'setup' function
	colorMode(HSB, 360, 100, 100, 100);
	background(10, 10, 90);

	mic.start();

	// let entity = new Entity(width / 2, height / 2, 150);
	let stars = [];
	for (let i = 0; i < 50; i++) {
		stars[i] = new Stars(randomGaussian(width / 2, 500), randomGaussian(height / 2, 500), 50, mic);
	}
	for (let frame = 0; frame < 5000; frame++) {
		for (let i = 0; i < 50; i++) {}
	}

	/**
	 * GUI Helper
	 */

	// gui.add(module_name, 'x', 0, width, 0.00001);
	// gui.add(module_name, 'y', 0, width, 0.00001);

	// Return a renderer, which is like p5.js 'draw' function
	return ({p5, time, width, height, context, exporting, bleed, trimWidth, trimHeight}) => {
		//entity.display();
		//entity.move();
		for (let i = 0; i < 50; i++) {
			stars[i].oscilateWeight();
			stars[i].move();
			stars[i].display();
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
