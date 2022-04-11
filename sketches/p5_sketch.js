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
		landMinY = height / 6;
		landMaxY = height / 2;
		landHue = 155;
		landSat = 65;
		landBright = 25;
		skyHue = 210;
		skySat = 45;
		skyBright = 10;
		landscapeStep = 100;
		skyStep = 2;
		noiseSeed();
		noStroke();
	}

	function createLandscape() {
		let xoff = 0;

		for (let i = 0; i < 6; i++) {
			beginShape();
			noStroke();
			fill(landHue, landSat, landBright);
			for (let x = 0; x <= width + landscapeStep; x += landscapeStep) {
				let y = map(noise(xoff, yoff), 0, 1, landMaxY, landMinY);

				curveVertex(x, y);
				xoff -= 0.06;
			}
			landMinY += height / 11;
			landMaxY += height / 10;
			landHue += 5;
			landSat -= 5;
			landBright -= 3;
			landscapeStep += 50;
			vertex(width, height);
			vertex(0, height);
			endShape(CLOSE);
		}
		yoff += 0.1;
	}

	function makeSky() {
		//background(30, 20, 40);
		let xoff = 0;
		let skyAlpha = 100;
		for (let i = 0; i < 25; i++) {
			beginShape();
			fill(skyHue, skySat, skyBright, skyAlpha);
			for (let x = 0; x <= width + skyStep; x += skyStep) {
				let y = map(noise(xoff, yoff), 0, 1, skyMaxY, skyMinY);
				curveVertex(x, y);
				xoff += 0.0004;
			}
			skyMinY += height / 23;
			skyMaxY += height / 11;
			skyHue -= 16;
			skySat += 10;
			skyBright += 10;
			skyAlpha += 5;
			vertex(width, height);
			vertex(0, height);
			endShape(CLOSE);
			if (skyHue <= 0) {
				skyHue = 359;
			}
			if (skyHue >= 360) {
				skyHue = 1;
			}
		}
		yoff += 0.1;
	}

	function createStars() {
		for (let i = 0; i <= 1500; i++) {
			let elW = random(5, 15);
			let elA = random(20, 80);
			let elX = random(0, width);
			let elY = random(0, height);
			stroke(0, 0, 100, elA);
			strokeWeight(elW);
			point(elX, elY);
		}
	}

	init();
	makeSky();
	createStars();
	createLandscape();

	// Return a renderer, which is like p5.js 'draw' function
	return ({p5, time, width, height}) => {
		// Draw with p5.js things
	};
}, settings);
