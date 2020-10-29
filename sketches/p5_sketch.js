// Import sketch objects
//import Pen from './pen.js';

const canvasSketch = require('canvas-sketch');
const p5 = require('p5');
new p5();
const horizontal = 900;
const vertical = 600;

const settings = {
	// Pass the p5 instance, and preload function if necessary
	p5: true,
	dimensions: [horizontal, vertical],
	units: 'px',
	bleed: 1 * 72,
	// dimension 14 x 20 avec bleed
	// pixelsPerInch: 72,

	// Turn on a render loop
	animate: true,
};

const preload = () => {
	// You can use p5.loadImage() here, etc...
};

canvasSketch((context, bleed, trimWidth, trimHeight) => {
	// Sketch setup
	// Like p5.js 'setup' function
	colorMode(HSB, 360, 100, 100, 100);

	let dA = 1.1;
	let dB = 0.5;
	let feed = 0.055;
	let k = 0.062;

	let marginW = floor(width / 10);
	let marginH = floor(height / 10);
	let marginEndW = floor(width - (width / 10) * 2);
	let marginEndH = floor(height - (height / 10) * 2);
	let grid = [];
	let next = [];
	pixelDensity(1);
	background(0, 0, 10);
	// -- Frame -- //
	strokeWeight(5);
	stroke(60, 5, 95, 100);
	noFill();
	rect(marginW, marginH, marginEndW, marginEndH);
	// --      -- //

	for (let x = marginW; x < width - marginW; x++) {
		grid[x] = [];
		next[x] = [];
		for (let y = marginH; y < height - marginH; y++) {
			grid[x][y] = {
				a: 1,
				b: 0,
			};
			next[x][y] = {
				a: 1,
				b: 0,
			};
		}
	}

	for (var i = width / 2 - 50; i < width / 2 + 50; i++) {
		for (var j = height / 2 - 1; j < height / 2 + 1; j++) {
			grid[i][j].b = 1;
		}
	}

	function swap() {
		let temp = grid;
		grid = next;
		next = temp;
	}

	function laplaceA(x, y) {
		let sumA = 0;
		sumA += grid[x][y].a * -1;
		sumA += grid[x - 1][y].a * 0.2;
		sumA += grid[x + 1][y].a * 0.2;
		sumA += grid[x][y + 1].a * 0.2;
		sumA += grid[x][y - 1].a * 0.2;
		sumA += grid[x - 1][y - 1].a * 0.05;
		sumA += grid[x + 1][y - 1].a * 0.05;
		sumA += grid[x + 1][y + 1].a * 0.05;
		sumA += grid[x - 1][y + 1].a * 0.05;
		return sumA;
	}

	function laplaceB(x, y) {
		let sumB = 0;
		sumB += grid[x][y].b * -1;
		sumB += grid[x - 1][y].b * 0.2;
		sumB += grid[x + 1][y].b * 0.2;
		sumB += grid[x][y + 1].b * 0.2;
		sumB += grid[x][y - 1].b * 0.2;
		sumB += grid[x - 1][y - 1].b * 0.05;
		sumB += grid[x + 1][y - 1].b * 0.05;
		sumB += grid[x + 1][y + 1].b * 0.05;
		sumB += grid[x - 1][y + 1].b * 0.05;
		return sumB;
	}

	// Return a renderer, which is like p5.js 'draw' function
	return ({ p5, time, width, height, context, exporting, bleed, trimWidth, trimHeight }) => {
		// Draw with p5.js things

		//background(0, 0, 10);
		for (let x = marginW + 1; x < width - 1 - marginW; x++) {
			for (let y = marginH + 1; y < height - 1 - marginH; y++) {
				let a = grid[x][y].a;
				let b = grid[x][y].b;
				next[x][y].a = a + dA * laplaceA(x, y) - a * b * b + feed * (1 - a);
				next[x][y].b = b + dB * laplaceB(x, y) + a * b * b - (k + feed) * b;

				next[x][y].a = constrain(next[x][y].a, 0, 1);
				next[x][y].b = constrain(next[x][y].b, 0, 1);
			}
		}

		loadPixels();
		for (let x = marginW; x < width - marginW; x++) {
			for (let y = marginH; y < height - marginH; y++) {
				let pix = (x + y * width) * 4;
				let a = next[x][y].a;
				let b = next[x][y].b;
				let c1 = floor((a - b) * 255);
				let c2 = floor((a - b) * 255);
				let c3 = floor((a - b) * 255);
				c1 = constrain(c1, 0, 255);
				c2 = constrain(c2, 0, 255);
				c3 = constrain(c3, 0, 255);
				pixels[pix + 0] = c1;
				pixels[pix + 1] = c2;
				pixels[pix + 2] = c3;
				pixels[pix + 3] = 255;
			}
		}
		updatePixels();

		swap();
		exporting = true;
		if (!exporting && bleed > 0) {
			stroke(0);
			noFill();
			strokeWeight(10);
			rect(bleed, bleed, trimWidth, trimHeight);
		}
	};
}, settings);
