// Import sketch objects
import Branch from './branch.js';

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

	// Turn on a render loop
	animate: true,
};

const preload = () => {
	// You can use p5.loadImage() here, etc...
};

canvasSketch((context, bleed, trimWidth, trimHeight) => {
	// Sketch setup
	// Like p5.js 'setup' function
	//const Bubble = require('./Bubble');

	//blendMode(ADD);
	colorMode(HSB, 360, 100, 100, 100);

	let tree = [];
	let wCenter = width / 2;
	let baseHeight = height / 1.2;

	let a = createVector(wCenter, baseHeight);
	let b = createVector(wCenter, baseHeight - 2000);
	let root = new Branch(a, b, 200);
	background(0, 0, 10);
	tree[0] = root;

	function mousePressed() {
		for (var i = tree.length - 1; i >= 0; i--) {
			if (!tree[i].finished) {
				tree.push(tree[i].branchA());
				tree.push(tree[i].branchB());
			}
			tree[i].finished = true;
		}
	}

	// Return a renderer, which is like p5.js 'draw' function
	return ({ p5, time, width, height, context, exporting, bleed, trimWidth, trimHeight }) => {
		// Draw with p5.js things

		//background(0, 0, 10);
		// -- Frame -- //
		strokeWeight(15);
		stroke(60, 5, 95, 100);
		noFill();
		rect(600, 600, width - 1200, height - 1200);
		// --      -- //

		for (let i = 0; i < tree.length; i++) {
			tree[i].show();
			tree[i].jitter();
		}

		root.show();
		translate(wCenter, baseHeight);

		if (mouseIsPressed) {
			mousePressed();
		}

		exporting = true;
		if (!exporting && bleed > 0) {
			stroke(0);
			noFill();
			strokeWeight(10);
			rect(bleed, bleed, trimWidth, trimHeight);
		}
	};
}, settings);
