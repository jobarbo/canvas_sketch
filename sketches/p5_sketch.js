// Import sketch objects
//import Points from './points.js';

const canvasSketch = require('canvas-sketch');
const p5 = require('p5');
new p5();
const horizontal = 18 * 300;
const vertical = 18 * 300;
//const horizontal = 1080;
//const vertical = 1080;

const settings = {
	// Pass the p5 instance, and preload function if necessary
	p5: true,
	dimensions: [horizontal, vertical],
	units: 'px',
	//bleed: 1 * 300,
	// dimension 14 x 20 avec bleed
	// pixelsPerInch: 72,

	// Turn on a render loop
	animate: true,
};

const preload = () => {
	// You can use p5.loadImage() here, etc...
};

canvasSketch((context, bleed, trimWidth, trimHeight) => {
	// Sketch setup => Like p5.js 'setup' function
	let t = 0;
	let strokeW = 2;
	let alpha = 100;
	let radius = random(width / 3, width / 3);
	let resolution = 500;

	let posX = width / 2;
	let posY = height / 2;

	let noiseIntensity = 50;
	let noiseAmplitude = 1.05;

	colorMode(HSB, 360, 100, 100, 100);
	background(0, 50, 12, 100);

	// Return a renderer, which is like p5.js 'draw' function
	return ({ p5, time, width, height, context, exporting, bleed, trimWidth, trimHeight }) => {
		if (radius <= width / 8) {
			radius += -5;
			resolution = resolution / 1.04;

			if (radius <= width / 10) {
				radius = 0;
				strokeW = 0;
			}
			if (radius <= 0) {
			}
		} else {
			radius += -5;
		}
		push();
		translate(posX, posY);
		strokeWeight(strokeW);
		beginShape();
		for (let a = 0; a < TWO_PI; a += TWO_PI / resolution) {
			const noiseVal = map(noise(cos(a) * noiseIntensity + 1, sin(a) * noiseIntensity + 1, time), 0, 1, noiseAmplitude, 1.0);
			const r = radius + noiseVal;
			const x = cos(a) * r * noiseVal;
			const y = sin(a) * r * noiseVal;
			if (radius <= width / 10) {
				alpha = alpha / 1;
				fill(285, 24, 25, alpha);
				stroke(29, 39, 81, alpha);
				ellipse(x, y, 1, 1);
			} else {
				fill(285, 24, 25, alpha);
				stroke(29, 39, 81, alpha);
				curveVertex(x, y);
			}
		}
		console.log(resolution);

		endShape(CLOSE);
		pop();
		//posY = posY + 10;
	};
}, settings);
