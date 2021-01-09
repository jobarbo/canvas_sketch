// Import sketch objects
//import Points from './points.js';

const canvasSketch = require('canvas-sketch');
const p5 = require('p5');
new p5();
const horizontal = 18 * 300;
const vertical = 18 * 300;

const settings = {
	// Pass the p5 instance, and preload function if necessary
	p5: true,
	dimensions: [horizontal, vertical],
	units: 'px',
	bleed: 1 * 300,
	// dimension 14 x 20 avec bleed
	// pixelsPerInch: 72,

	// Turn on a render loop
	animate: false,
};

const preload = () => {
	// You can use p5.loadImage() here, etc...
};

canvasSketch((context, bleed, trimWidth, trimHeight) => {
	// Sketch setup => Like p5.js 'setup' function

	const widthStep = width / 10;
	const heightStep = height / 10;
	const squareStep = widthStep / 20;
	const squarePoint = widthStep / 10;
	const sketchMargin = 300;
	const loopMargin = sketchMargin / 2;

	colorMode(HSB, 360, 100, 100, 100);
	background(52, 9, 96, 100);
	ellipseMode(CENTER);

	for (let x = widthStep + sketchMargin; x < width - sketchMargin; x += widthStep) {
		for (let y = heightStep + sketchMargin; y < height - sketchMargin; y += heightStep) {
			strokeWeight(20);
			stroke(234, 33, 36, 100);
			fill(151, 28, 70, 100);
			ellipse(x, y, widthStep - loopMargin);

			for (let k = squareStep; k < squarePoint; k += 2) {
				let elX = random(x - loopMargin, x + loopMargin);
				let elY = random(y - loopMargin, y + loopMargin);
				let newK1 = random(-widthStep / 2, widthStep / 2);
				let newK2 = random(-heightStep / 2, heightStep / 2);
				stroke(234, 33, 36, 100);
				line(elX, elY, elX + newK1, elY + newK1);
				fill(13, 58, 88, 100);
				ellipse(elX, elY, widthStep / 10);
			}
		}
	}

	// Return a renderer, which is like p5.js 'draw' function
	return ({ p5, time, width, height, context, exporting, bleed, trimWidth, trimHeight }) => {
		// Draw with p5.js things

		exporting = false;
		if (!exporting && bleed > 0) {
			stroke(0, 100, 100);
			noFill();
			strokeWeight(10);
			//rect(bleed, bleed, trimWidth, trimHeight);
		}
	};
}, settings);
