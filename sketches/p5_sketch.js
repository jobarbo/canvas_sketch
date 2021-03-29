// Import sketch objects
import Smudge from './texture.js';

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
let sunset;
window.preload = () => {
	// Preload sounds/images/etc...
	sunset = loadImage('media/images/background.png');
};

canvasSketch((context, bleed, trimWidth, trimHeight) => {
	// Sketch setup => Like p5.js 'setup' function

	let time = 0;
	let strokeW = 5;
	let alpha = 100;
	let radius = random(width / 2.5, width / 2.5);
	let resolution = 500;

	let posX = width / 2;
	let posY = height;

	let noiseIntensity = 50;
	let noiseAmplitude = 1.1;

	colorMode(HSB, 360, 100, 100, 100);
	//background(199, 85, 80);
	//image(sunset, 0, 0);
	//createSun();
	//createFlower(time);
	createTexture();
	// Return a renderer, which is like p5.js 'draw' function
	return ({ p5, time, width, height, context, exporting, bleed, trimWidth, trimHeight }) => {};

	function createTexture() {
		blendMode(BURN);
		fill(20, 10, 85, 100);
		rect(0, 0, width, height);
		let texture = [];
		for (let index = 0; index < 5; index++) {
			const rdnX = random(0, 50);
			const rdnY = random(600, height + 600);
			const rdnW1 = random(5, 150);
			texture[index] = new Smudge(rdnX, rdnY, rdnW1);
			texture[index].display();
		}
		blendMode(BLEND);
	}

	function createSun() {
		// SUN
		ellipseMode(CENTER);
		noStroke();
		fill(359, 31, 95);
		ellipse(random(width / 500, width / 1.3), random(height / 8, height / 6), width / 7);
	}

	function createFlower(time) {
		for (let index = 0; index < 2000; index++) {
			if (radius <= width / 6) {
				radius += -12;
				strokeW = 7;
				noiseAmplitude = noiseAmplitude * 1.006;
				if (radius <= width / 10) {
					alpha = 60;
					resolution = resolution / 1.2;
					strokeW = strokeW * 1.55;
					radius += -15;
				}
				if (radius <= 0) {
					radius = 0;
					strokeW = 0;
				}
			} else {
				radius += -8;
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

				if (radius <= width / 6) {
					fill(54, 44, 22, alpha);
					stroke(32, 58, 95, alpha);
					ellipse(x, y, 1, 1);
				} else {
					if (radius <= width / 6 + 10 && radius >= width / 6) {
						fill(54, 44, 22, alpha);
						noStroke();
						curveVertex(x, y);
					} else {
						fill(26, 48, 80, alpha);
						stroke(32, 58, 95, alpha);
						curveVertex(x, y);
					}
				}
			}

			endShape(CLOSE);

			pop();
		}
	}
}, settings);
