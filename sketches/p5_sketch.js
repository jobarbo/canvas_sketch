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

	let margin = 1200;
	let wSpacing = 500;
	let hSpacing = 800;
	let xoff = 0.0006;
	let yoff = 0.001;
	let woff = 0.00003;
	let wContainer = wSpacing / 5;
	let hContainer = hSpacing;
	let minW = 20;
	let maxW = 30;

	strokeWeight(15);
	stroke(60, 5, 95, 100);
	noFill();
	rect(600, 560, width - 1200, height - 1100);

	paint(margin, wSpacing, hSpacing, xoff, yoff, woff, wContainer, hContainer, minW, maxW);

	// Return a renderer, which is like p5.js 'draw' function
	return ({ p5, time, width, height }) => {
		// Draw with p5.js things
	};
}, settings);

function paint(margin, wSpacing, hSpacing, xoff, yoff, woff, wContainer, hContainer, minW, maxW) {
	for (let iy = 600; iy < height - 600; iy = iy + hSpacing) {
		for (let ix = margin; ix <= width - margin; ix = ix + wSpacing) {
			//debugGrid(ix,iy,wSpacing,hSpacing);

			cx = ix;
			cy = iy;

			let y = cy;
			let xoffIteration = 0.0009;

			for (let s = 0; s < hSpacing; s++) {
				let x = map(noise(xoff), 0, 1, cx - wContainer, cx + wContainer);
				let elW = map(noise(woff), 0, 1, minW, maxW);

				let elHue = map(elW, minW, maxW, 60, 65, true);
				let elSat = map(elW, minW, maxW, 0, 10, true);
				let elBright = map(elW, minW, maxW, 84, 100, true);
				let elAlpha = map(elW, minW, maxW, 50, 90, true);

				//noStroke();
				strokeWeight(elW);
				stroke(elHue, elSat, elBright, elAlpha);
				fill(elHue, elSat, elBright, elAlpha);
				line(x, y, x + elW, y + elW);

				y++;

				xoff += xoffIteration;
				yoff += 0.1;
				woff += 0.0005;
				//xoffIteration = xoffIteration + 0.000001;
			}
		}
	}
}

function debugGrid(ix, iy, wSpacing, hSpacing) {
	strokeWeight(5);
	stroke(0, 100, 100);
	noFill();
	rect(ix, iy, wSpacing, hSpacing);
}
