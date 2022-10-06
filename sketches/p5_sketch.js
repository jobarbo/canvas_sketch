const canvasSketch = require('canvas-sketch');
const p5 = require('p5');
new p5();

const settings = {
	// Pass the p5 instance, and preload function if necessary
	p5: true,
	dimensions: [12 * 300, 12 * 300],
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
	background(45, 5, 98);
	let xoffIteratorArr = [0.00001, 0.0001, 0.0002, 0.0003, 0.0004, 0.0005, 0.0006, 0.0007, 0.0008, 0.0009, 0.001, 0.002, 0.003, 0.004, 0.005, 0.006, 0.007, 0.008, 0.009, 0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07, 0.08, 0.09, 0.1];
	let yoffIteratorArr = [0.00001, 0.0001, 0.0002, 0.0003, 0.0004, 0.0005, 0.0006, 0.0007, 0.0008, 0.0009, 0.001, 0.002, 0.003, 0.004, 0.005, 0.006, 0.007, 0.008, 0.009, 0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07, 0.08, 0.09, 0.1];

	let margin = 0;
	let wSpacing = width;
	let hSpacing = height;
	let xoff = 0.6;
	let yoff = 0.1;

	let woff = 0.3;
	let xoffIterator = random(xoffIteratorArr);
	let yoffIterator = random(yoffIteratorArr);
	console.log(`xoffIterator: ${xoffIterator}`);
	console.log(`yoffIterator: ${yoffIterator}`);
	let wContainer = wSpacing / 1.5;
	let hContainer = hSpacing / 1.5;

	//displayStars();

	let initX = width / 2;
	let initY = height / 2;
	for (let i = 0; i < 50; i++) {
		xoff = random(1);
		yoff = random(1);
		woff = random(1);

		paint(margin, wSpacing, hSpacing, xoff, yoff, woff, xoffIterator, yoffIterator, wContainer, hContainer, initX, initY);
	}
	//paint(margin,wSpacing,hSpacing,xoff,yoff,woff,wContainer,hContainer);

	// Return a renderer, which is like p5.js 'draw' function
	return ({p5, time, width, height}) => {
		// Draw with p5.js things
	};
}, settings);

function paint(margin, wSpacing, hSpacing, xoff, yoff, woff, xoffIterator, yoffIterator, wContainer, hContainer, initX, initY) {
	for (let s = 0; s < wSpacing; s += 1) {
		let xn = map(noise(xoff), 0, 1, -width / 2, width / 2, true);
		let yn = map(noise(yoff), 0, 1, -height / 2, height / 2, true);
		let x = width / 2 + xn;
		let y = height / 2 + yn;

		let elW = map(noise(woff), 0, 1, 0, 10);

		let elHue = map(elW, 2, 8, 45, 0, true);
		let elSat = map(elW, 2, 8, 5, 75, true);
		let elBright = map(elW, 2, 8, 98, 10, true);
		let elAlpha = map(elW, 0, 10, 0, 100, true);

		noStroke();
		//stroke(190, 53, 89,0);
		fill(0, 75, 10, elAlpha);
		ellipse(x, y, elW, elW);

		xoff += xoffIterator;
		yoff += yoffIterator;

		woff += 0.1;
	}
}

function displayStars() {
	for (let i = 0; i < 2000; i++) {
		let starAlpha = random(1, 30);
		stroke(48, 56, 83, starAlpha);
		strokeWeight(random(5, 10));
		point(random(width), random(height));
	}
}

function debugGrid(ix, iy, wSpacing, hSpacing) {
	strokeWeight(5);
	stroke(0, 100, 100);
	noFill();
	rect(ix, iy, wSpacing, hSpacing);
}
