const canvasSketch = require('canvas-sketch');
const p5 = require('p5');
new p5();

const settings = {
	// Pass the p5 instance, and preload function if necessary
	p5: true,
	dimensions: [30 * 300, 20 * 300],
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

	blendMode(BLEND);
	colorMode(HSB, 360, 100, 100, 100);
	background(0, 0, 10);
	ellipseMode(CENTER);

	let margin = 1200;
	let wSpacing = 100;
	let hSpacing = 10;
	let xoff = 0.0006;
	let yoff = 0.001;
	let woff = 0.00003;
	let wContainer = wSpacing / 5;
	let hContainer = hSpacing;
	let minW = wSpacing / 2;
	let maxW = wSpacing / 2;

	strokeWeight(15);
	stroke(60, 5, 95, 100);
	noFill();
	rect(600, 600, width - 1200, height - 1200);

	rectMode(CENTER);
	paint(margin, wSpacing, hSpacing, xoff, yoff, woff, wContainer, hContainer, minW, maxW);

	// Return a renderer, which is like p5.js 'draw' function
	return ({ p5, time, width, height }) => {
		// Draw with p5.js things
	};
}, settings);

function paint(margin, wSpacing, hSpacing, xoff, yoff, woff, wContainer, hContainer, minW, maxW) {
	for (let iy = margin; iy < height - margin; iy = iy + hSpacing) {
		for (let ix = margin; ix <= width - margin; ix = ix + wSpacing) {
			//debugGrid(ix, iy, wSpacing, hSpacing);
			cx = ix;
			cy = iy;

			cx2 = random(cx - maxW / 2, cx + maxW / 2);
			cy2 = random(cy - maxW / 2, cy + maxW / 2);
			elw = random(minW, maxW);

			strokeWeight(random(5, 20));
			noFill();
			stroke(60, 5, 95, 10);
			line(cx, cy, cx2, cy2);

			noStroke();
			fill(60, 5, 95, 10);
			line(cx2, cy2, cx2 + 50, cy2 + 50);

			noFill();
			stroke(0, 0, 10);
			//rect(cx2, cy2, elw, elw);
		}
	}
}
function debugGrid(ix, iy, wSpacing, hSpacing) {
	strokeWeight(5);
	stroke(0, 100, 100);
	noFill();
	rect(ix, iy, wSpacing, hSpacing);
}
