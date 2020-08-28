const canvasSketch = require('canvas-sketch');
const p5 = require('p5');
new p5();

const settings = {
	// Pass the p5 instance, and preload function if necessary
	p5: true,
	dimensions: [14 * 300, 20 * 300],
	units: 'px',
	//pixelsPerInch: 72,

	// Turn on a render loop
	animate: true,
};

const preload = () => {
	// You can use p5.loadImage() here, etc...
};

canvasSketch((context) => {
	// Sketch setup
	// Like p5.js 'setup' function

	colorMode(HSB, 360, 100, 100, 100);

	let x = 0;
	let y = 0;

	let h = 43;
	let s = 89;
	let b = 100;

	let spacingX = 50;
	let spacingY = 50;

	let ranArr = [2, 3];

	function bufferIMG() {
		let npoints = 3;
		let angle = PI / npoints;
		let polX = 0;
		let polY = 0;
		let radius = width / 3;
		let buf = createGraphics(width, height);
		buf.angleMode(DEGREES);
		buf.colorMode(HSB, 360, 100, 100, 100);
		buf.rectMode(CENTER);
		buf.background(5, 0, 100);
		buf.fill(5, 0, 0);
		buf.noStroke();
		buf.push();
		buf.translate(width / 2, height / 2);
		buf.rotate(90);
		buf.beginShape();
		for (let a = 0; a < TWO_PI; a += angle) {
			let sx = polX + cos(a) * radius;
			let sy = polY + sin(a) * radius;
			buf.vertex(sx, sy);
		}
		buf.endShape(CLOSE);
		buf.pop();
		image(buf, 0, 0);
	}

	function makeMazeIMG() {
		let maze = createGraphics(width, height);
		maze.colorMode(HSB, 360, 100, 100, 100);
		maze.background(45, 0, 100);
		maze.strokeCap(ROUND);
		maze.strokeWeight(13);
		for (x = 0; x < width; x += spacingX) {
			for (y = 0; y <= height; y += spacingY) {
				let rand = random(ranArr);
				if (rand == 0) {
					maze.stroke(h, s, b);
					maze.line(x, y, x + spacingX, y);
				} else if (rand == 1) {
					maze.stroke(h, s, b);
					maze.line(x, y + spacingY, x, y);
				} else if (rand == 2) {
					maze.stroke(h, s, b);
					maze.line(x, y + spacingY, x + spacingX, y);
				} else if (rand == 3) {
					maze.stroke(h, s, b);
					maze.line(x, y, x + spacingX, y + spacingY);
				}
			}
		}
		image(maze, 0, 0);
	}

	bufferIMG();
	blendMode(LIGHTEST);
	makeMazeIMG();

	// Return a renderer, which is like p5.js 'draw' function
	return ({ p5, time, width, height }) => {
		// Draw with p5.js things
	};
}, settings);
