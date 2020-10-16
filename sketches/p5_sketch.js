// Import sketch objects
//import Branch from './branch.js';

const canvasSketch = require('canvas-sketch');
const p5 = require('p5');
new p5();
const horizontal = 30 * 300;
const vertical = 20 * 300;

const settings = {
	// Pass the p5 instance, and preload function if necessary
	// dimension 14 x 20 avec bleed
	// pixelsPerInch: 72,
	p5: true,
	dimensions: [horizontal, vertical],
	units: 'px',
	bleed: 1 * 300,
	//context: 'webgl',

	// Turn on a render loop
	animate: true,
};

const preload = () => {
	// You can use p5.loadImage() here, etc...
};

canvasSketch((context, bleed, trimWidth, trimHeight) => {
	// Sketch setup
	// Like p5.js 'setup' function

	let x = 0.01;
	let y = 0;
	let z = 0;

	let a = 10;
	let b = 25;
	let c = 10.0 / 5.0;

	let points = new Array();

	blendMode(ADD);
	colorMode(HSB, 360, 100, 100, 100);
	background(0, 0, 10);
	// Return a renderer, which is like p5.js 'draw' function
	return ({ time, width, height, context, exporting, bleed, trimWidth, trimHeight }) => {
		// Draw with p5.js things

		// -- Frame -- //
		strokeWeight(15);
		stroke(60, 5, 95, 100);
		noFill();
		rect(600, 600, width - 1200, height - 1200);
		// --      -- //

		let dt = 0.01;
		let dx = a * (y - x) * dt;
		let dy = (x * (b - z) - y) * dt;
		let dz = (x * y - c * z) * dt;
		x = x + dx;
		y = y + dy;
		z = z + dz;

		points.push(new p5.Vector(x, y, z));
		translate(0, 0, -80);
		//let camX = map(mouseX, 0, width, -5000, 5000);
		//let camY = map(mouseY, 0, height, -5000, 5000);
		//camera(camX, camY, height / 2.0 / tan((PI * 30.0) / 90.0), 0, 0, 0, 0, 1, 0);
		translate(width / 2, height / 2);
		strokeWeight(0.1);
		scale(85);
		//strokeCap(SQUARE);
		//point(x, y);

		//ellipse(x, y, 0.1, 0.1);
		//line(prevX, prevY, x, y);
		beginShape();

		for (let v of points) {
			stroke(60, 5, 95, 10);
			noFill();
			curveVertex(v.x, v.y, v.z);
			//var offset = p5.Vector.random3D();
			//offset.mult(0.1);
			//v.add(offset);
		}
		endShape();
		exporting = true;
		if (!exporting && bleed > 0) {
			stroke(0);
			noFill();
			strokeWeight(10);
			rect(bleed, bleed, trimWidth, trimHeight);
		}
	};
}, settings);
