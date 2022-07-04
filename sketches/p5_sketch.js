const canvasSketch = require("canvas-sketch");
const p5 = require("p5");
new p5();

const settings = {
	// Pass the p5 instance, and preload function if necessary
	p5: true,
	dimensions: [12 * 300, 12 * 300],
	units: "px",
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

	background(0, 75, 10, 100);

	let margin = 0;
	let wSpacing = width;
	let hSpacing = height;
	let xoff = 0.0;
	let yoff = 0.1;
	let woff = 0.3;
	let wContainer = wSpacing;
	let hContainer = hSpacing;

	//displayStars();
	//paint(margin,wSpacing,hSpacing,xoff,yoff,woff,wContainer,hContainer);

	// Return a renderer, which is like p5.js 'draw' function
	return ({p5, time, width, height}) => {
		// Draw with p5.js things

		xoff = random(0, 0.4);
		yoff = random(0, 0.1);
		woff = random(0, 1);
		paint(margin, wSpacing, hSpacing, xoff, yoff, woff, wContainer, hContainer);
	};
}, settings);

function paint(margin, wSpacing, hSpacing, xoff, yoff, woff, wContainer, hContainer) {
	//debugGrid(ix, iy, wSpacing, hSpacing);

	for (let s = 0; s < wSpacing; s += 1) {
		let x = map(noise(xoff + s / 20), 0, 1, -2000, wContainer + 2000);
		let y = map(noise(yoff + s / 200), 0, 1, 0, hContainer + 1500);
		let elW = map(noise(woff + s / 2000), 0, 1, 0, 10);

		//let elHue = map(elW, 2, 8, 45, 0, true);
		//let elSat = map(elW, 2, 8, 5, 75, true);
		//let elBright = map(elW, 2, 8, 98, 10, true);
		let elAlpha = map(elW, 2, 15, 0, 100, true);

		noStroke();
		//stroke(190, 53, 89,0);
		fill(45, 5, 98, elAlpha);
		ellipse(x, y, elW, elW);

		xoff += 0.000005;
		yoff += 0.0000001;
		woff += 0.1;
	}
}

function debugGrid(ix, iy, wSpacing, hSpacing) {
	strokeWeight(5);
	stroke(0, 100, 100);
	noFill();
	rect(ix, iy, wSpacing, hSpacing);
}
