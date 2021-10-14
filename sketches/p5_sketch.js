// Import sketch objects
import Ball_mc from "./ball_mc.js";
import * as dat from "dat.gui";
const palettes = require("nice-color-palettes/1000.json");
const canvasSketch = require("canvas-sketch");
const p5 = require("p5");
new p5();
const horizontal = 1888;
const vertical = 1888;

const gui = new dat.GUI({ closed: true });

const settings = {
	// Pass the p5 instance, and preload function if necessary
	p5: true,
	dimensions: [horizontal, vertical],
	units: "px",
	//duration: 30,
	//fps: 60,
	animate: false,
	attributes: {
		antialias: true,
	},
};
let rImg;
const preload = () => {
	// You can use p5.loadImage() here, etc...
};
canvasSketch((context, bleed, trimWidth, trimHeight) => {
	// Sketch setup => Like p5.js 'setup' function
	rImg = loadImage("../media/images/cap.png");

	let bgHue = 0;
	let bgSat = 5;
	let bgBright = 10;

	colorMode(HSB, 360, 100, 100, 100);
	background(bgHue, bgSat, bgBright, 5);

	image(rImg, 0, 0);

	// createTexture(bgHue, bgSat, bgBright);

	// Return a renderer, which is like p5.js 'draw' function
	return ({ p5, time, width, height, context, exporting, bleed, trimWidth, trimHeight }) => {
		ellipse(width / 2, height / 2, 100);
		exporting = true;
		if (!exporting && bleed > 0) {
			stroke(0, 100, 100);
			noFill();
			strokeWeight(10);
			rect(bleed, bleed, trimWidth, trimHeight);
		}
	};
}, settings);

function createTexture(bgHue, bgSat, bgBright) {
	let texture = [];

	for (let index = 0; index < 1000; index++) {
		const rdnX = random(0, width);
		const rdnY = random(0, height);
		const rdnW1 = random(5, 150);
		texture[index] = new Smudge(rdnX, rdnY, rdnW1);
	}
	for (let index = 0; index < texture.length; index++) {
		for (let j = 0; j < 1000; j++) {
			texture[index].display(bgBright);
		}
	}
}

export default class Smudge {
	constructor(rdnX, rdnY, w1) {
		this.xoff = 0;
		this.yoff = 1;
		this.woff1 = 0;
		this.rdnX = rdnX;
		this.rdnY = rdnY;
		this.rdnW1 = w1;
		this.mapXLow = -width / 3;
		this.mapXHigh = width * 1.5;
		this.mapYLow = -height / 3;
		this.mapYHigh = height * 1.5;
		this.alpha = int(random(50, 100));
	}

	display(bgBright) {
		this.xoff += 0.03;
		this.yoff += 0.0008;
		this.woff1 += 0.55;

		const w1 = map(noise(this.woff1 + this.rdnW1), 0, 1, 0.2, 1.5);
		const x = map(noise(this.xoff + this.rdnX), 0, 1, this.mapXLow, this.mapXHigh);
		const y = map(noise(this.yoff + this.rdnY), 0, 1, this.mapYLow, this.mapYHigh);

		if (bgBright < 65) {
			fill(0, 0, 100, this.alpha);
		} else {
			fill(0, 0, 0, this.alpha);
		}
		noStroke();
		ellipse(x, y, w1, w1);
	}
}
