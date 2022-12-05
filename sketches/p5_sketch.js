// Import sketch objects
import Cell from './cell.js';
import * as dat from 'dat.gui';
import HexToHsb from './utils/hexToHsb.js';
const canvasSketch = require('canvas-sketch');
const p5 = require('p5');
new p5();
const horizontal = 11012 / 2;
const vertical = 1080;

//const horizontal = 12 * 100;
//const vertical = 12 * 100;

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

	colorMode(HSB, 360, 100, 100, 100);
	rectMode(CENTER);
	background(200, 20, 10);

	// create a grid of cells that fill the sreen and is relative to the width and height of the screen
	let gbleed = width / 100;

	// number of columns and rows
	let cellCountX = 150;
	let cellCountY = int(cellCountX * (height / width));
	let cellCount = cellCountX * cellCountY;

	// calculate the width and height of the cells to always be 1:1 ratio
	let cellWidth = (width - gbleed * 2) / cellCountX;
	let cellHeight = (height - gbleed * 2) / cellCountY;

	// make canvas-sketch render sub-pixels (for crisp lines)

	let margin = int(cellWidth * 0);

	// create a grid of cells that fill the sreen and is relative to the width and height of the screen
	let cells = [];
	let inc = 0.05;
	let yoff = 0;
	for (let gridY = 0; gridY < cellCountY; gridY++) {
		let xoff = 110;

		for (let gridX = 0; gridX < cellCountX; gridX++) {
			let posX = gbleed + cellWidth * gridX;
			let posY = gbleed + cellHeight * gridY;
			let cell = new Cell(posX, posY, cellWidth, cellHeight, margin, xoff, yoff, inc);
			cells.push(cell);
			xoff += inc;
		}
		yoff += inc;
	}

	// Return a renderer, which is like p5.js 'draw' function
	return ({p5, time, width, height, context, exporting, bleed, trimWidth, trimHeight}) => {
		// display the cells
		//iterationX = map(mouseX, 0, width, -0.01, 0.01);
		//iterationY = map(mouseY, 0, height, -0.01, 0.01);

		inc = 0.0002;

		for (let i = 0; i < cells.length; i++) {
			cells[i].display(inc);
		}

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
