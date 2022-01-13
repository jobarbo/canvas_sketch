// Import sketch objects
import Entity from './entity.js';
import * as dat from 'dat.gui';
const palettes = require('nice-color-palettes/1000.json');
const canvasSketch = require('canvas-sketch');
const p5 = require('p5');
new p5();
const horizontal = 12 * 300;
const vertical = 12 * 300;

const gui = new dat.GUI({closed: true});

const settings = {
	// Pass the p5 instance, and preload function if necessary
	p5: true,
	dimensions: [horizontal, vertical],
	units: 'px',
	//duration: 30,
	fps: 60,
	animate: true,
	attributes: {
		antialias: true,
	},
};

window.preload = () => {
	// You can use p5.loadImage() here, etc...
};

canvasSketch((context, bleed, trimWidth, trimHeight) => {
	// Sketch setup => Like p5.js 'setup' function
	noSmooth();
	colorMode(HSB, 360, 100, 100, 100);
	noFill();
	cursor(CROSS);
	ellipseMode(RADIUS);
	rectMode(RADIUS);

	const maxRadius = 600;
	const minRadius = 5;
	const mouseRect = 200;
	const margin = 50;

	let circles = [];
	let colorArr = random(palettes);
	let bgColor = random(colorArr);
	let lineColor = random(colorArr);
	let showCircle = true;
	let showLine = false;
	background(bgColor);
	/**
	 * GUI Helper
	 */
	// gui.add(module_name, 'x', 0, width, 0.00001);
	// gui.add(module_name, 'y', 0, width, 0.00001);

	// Return a renderer, which is like p5.js 'draw' function
	return ({p5, time, width, height, context, exporting, bleed, trimWidth, trimHeight}) => {
		exporting = true;

		// Setting a new position randomly along the canvas
		let newX = random(margin + maxRadius, width - maxRadius - margin);
		let newY = random(margin + maxRadius, height - maxRadius - margin);

		//When pressed set a new position between mouseRext and the mouse
		if (mouseIsPressed && mouseButton == LEFT) {
			newX = random(mouseX - mouseRect, mouseX + mouseRect);
			newY = random(mouseY - mouseRect, mouseY + mouseRect);
		}

		// Set width of circle by checking if current radius intersect with another circle
		let intersection = false;
		for (let newR = maxRadius; newR >= minRadius; newR += -newR / 2) {
			// All existing cercles in the array are compared to the new one
			for (let i = 0; i < circles.length; i++) {
				const d = dist(newX, newY, circles[i].x, circles[i].y);
				intersection = d < circles[i].r + newR;
				if (intersection) {
					break;
				}
			}
			// If the circle don't overlap, a new ellipse is born.
			if (!intersection) {
				const circleColor = random(colorArr);
				if (circleColor != bgColor) {
					circles.push(new Circle(newX, newY, newR, circleColor));
				} else {
					circleColor = random(colorArr);
				}
				break;
			}
		}

		for (let i = 0; i < circles.length; i++) {
			if (showLine) {
				// Try to find an adjacent circle to the current one and draw a connecting line between the two
				var closestCircle;
				for (var j = 0; j < circles.length; j++) {
					var d = dist(circles[i].x, circles[i].y, circles[j].x, circles[j].y);
					if (d <= circles[i].r + circles[j].r + 1) {
						closestCircle = circles[j];
						break;
					}
				}
				if (closestCircle) {
					if (lineColor != bgColor) {
						stroke(lineColor);
						strokeWeight(5);
						line(circles[i].x, circles[i].y, closestCircle.x, closestCircle.y);
					}
				}
			}

			if (showCircle) {
				circles[i].draw();
			}
		}

		if (!exporting && bleed > 0) {
			stroke(0, 100, 100);
			noFill();
			strokeWeight(10);
			rect(bleed, bleed, trimWidth, trimHeight);
		}
	};
}, settings);

class Circle {
	constructor(x, y, r, c) {
		this.x = x;
		this.y = y;
		this.r = r;
		this.c = c;
	}
	draw() {
		stroke(0);
		fill(this.c);
		strokeWeight(5);
		//noStroke();
		ellipse(this.x, this.y, this.r);
	}
}
