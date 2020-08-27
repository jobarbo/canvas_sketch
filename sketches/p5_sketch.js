const canvasSketch = require('canvas-sketch');
const p5 = require('p5');
new p5();

const settings = {
	// Pass the p5 instance, and preload function if necessary
	p5: true,
	dimensions: [12 * 300, 18 * 300],
	units: 'px',
	//pixelsPerInch: 72,

	// Turn on a render loop
	animate: false,
};

const preload = () => {
	// You can use p5.loadImage() here, etc...
};

canvasSketch((context) => {
	// Sketch setup
	// Like p5.js 'setup' function
	let yoff, skyMinY, skyMaxY, landMinY, landMaxY, landHue, landSat, landBright, skyHue, skySat, skyBright, landscapeStep, skyStep;

	colorMode(HSB, 360, 100, 100, 100);

	function init() {
		yoff = 0.0; // 2nd dimension of perlin noise
		skyMinY = 0;
		skyMaxY = 0;
		landMinY = height / 4;
		landMaxY = height / 2;
		landHue = 37;
		landSat = 26;
		landBright = 51;
		skyHue = 30;
		skySat = 20;
		skyBright = 60;
		landscapeStep = 100;
		skyStep = 2;
		noiseSeed();
		noStroke();
	}

	function createLandscape() {
		let xoff = 0;

		for (let i = 0; i < 4; i++) {
			beginShape();
			fill(landHue, landSat, landBright);
			for (let x = 0; x <= width + landscapeStep; x += landscapeStep) {
				let y = map(noise(xoff, yoff), 0, 1, landMaxY, landMinY);

				curveVertex(x, y);

				xoff += 0.08;
			}
			landMinY += height / 7;
			landMaxY += height / 6;
			landHue += 5;
			landSat += 5;
			landBright -= 5;
			vertex(width, height);
			vertex(0, height);
			endShape(CLOSE);
		}
		yoff += 0.1;
	}

	function makeSky() {
		background(30, 20, 40);
		let xoff = 0;
		let skyAlpha = 60;
		for (let i = 0; i < 4; i++) {
			beginShape();
			fill(skyHue, skySat, skyBright, skyAlpha);
			for (let x = 0; x <= width + skyStep; x += skyStep) {
				let y = map(noise(xoff, yoff), 0, 1, skyMaxY, skyMinY);
				curveVertex(x, y);
				xoff += 0.0005;
			}
			skyMinY += height / 20;
			skyMaxY += height / 8;
			skyHue -= 2;
			skySat += 5;
			skyBright += 5;
			skyAlpha += 5;
			vertex(width, height);
			vertex(0, height);
			endShape(CLOSE);
		}
		yoff += 0.1;
	}

	function createSun() {
		fill(20, 60, 100);
		ellipse(random(0, width), height / 2.5, width / 3, width / 3);
	}

	init();
	makeSky();
	createSun();
	createLandscape();
	// Return a renderer, which is like p5.js 'draw' function
	return ({ p5, time, width, height }) => {
		// Draw with p5.js things
	};
}, settings);
