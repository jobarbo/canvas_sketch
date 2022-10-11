// Import sketch objects
import Entity from './entity.js';
import * as dat from 'dat.gui';
import HexToHsb from './utils/hexToHsb.js';
const canvasSketch = require('canvas-sketch');
const p5 = require('p5');
new p5();
const horizontal = 12 * 300;
const vertical = 18 * 300;
const gui = new dat.GUI({closed: true});

const settings = {
	// Pass the p5 instance, and preload function if necessary
	p5: true,
	dimensions: [horizontal, vertical],
	units: 'px',
	bleed: 20,
	duration: 3,
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

	/**
	 * GUI Helper
	 */

	// gui.add(module_name, 'x', 0, width, 0.00001);
	// gui.add(module_name, 'y', 0, width, 0.00001);

	let elW = random(600, 2000);
	let elWInit = elW;
	let elX;
	let elY;
	let speed = elW / 70;
	console.log(elW);
	angleMode(DEGREES);
	colorMode(HSB, 360, 100, 100, 100);
	elX = -elW / 2;
	elY = 0;

	// loop until the circle is completely off the screen on the bottom
	let i = 0;

	while (elY < height + elW / 2) {
		push();
		translate(0, 0);
		if (i % 2 == 0) {
			fill(0, 1, 0);
		} else {
			fill(0, 0, 99);
		}
		noStroke();
		// rotate the shape slowly every frame
		translate();
		rotate(0.001);
		ellipse(elX, elY, elW, elW);
		elW = int(map(elY, -elW, height + elW, elWInit, 20));
		elX += speed;
		if (elX >= width + elWInit * 10 || elX <= -elWInit * 10) {
			speed *= -1;
			elY += elW / 2;
		}
		i++;
		pop();
	}

	i = 0;
	elY = 0;
	let angle = 0;
	while (elY < height + elW / 2) {
		push();
		translate(0, -300);
		if (i % 2 == 0) {
			fill(0, 0, 0);
		} else {
			fill(0, 0, 100);
		}
		noStroke();
		// rotate the shape slowly every frame
		translate();
		rotate(angle);
		ellipse(elX, elY, elW, elW);
		elW = int(map(elY, -elW, height + elW, elWInit, 20));
		elX += speed;
		if (elX >= width + elWInit * 10 || elX <= -elWInit * 10) {
			speed *= -1;
			elY += elW / 2;
		}
		i++;
		angle += 0.0004;
		pop();
	}

	// draw a equilateral triangle on the center of the screen with a random rotation

	for (let i = 0; i < 1000; i++) {
		let triW = random(600, 2000);
		let triHue = random(0, 360);
		// make the stroke hue a complementary color of the triangle
		let strokeHue = (triHue + 180) % 360;
		push();
		blendMode(SOFT_LIGHT);
		fill(random(360), 100, 100);
		strokeWeight(50);
		stroke(strokeHue, 100, 100);
		translate(random(width), random(height));
		rotate(random(0, 360));
		triangle(0, -triW, triW, triW, -triW, triW);
		pop();
	}

	// Return a renderer, which is like p5.js 'draw' function
	return ({p5, time, width, height, context, exporting, bleed, trimWidth, trimHeight}) => {
		// p5.js draw loop

		exporting = true;
		if (!exporting && bleed > 0) {
			rectMode(CORNER);
			stroke(0, 100, 100);
			noFill();
			strokeWeight(2);
			rect(bleed, bleed, trimWidth, trimHeight);
		}
	};
}, settings);
