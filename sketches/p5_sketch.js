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
		waterMinY = height / 1.5;
		waterMaxY = height / 1.3;
		landHue = 253;
		landSat = 10;
		landBright = 84;
		skyHue = 37;
		skySat = 15;
		skyBright = 99;
		waterHue = 211;
		waterSat = 20;
		waterBright = 60;
		landscapeStep = 100;
		skyStep = 2;
		waterStep = 20;
		noiseSeed();
		noStroke();
	}

	function createLandscape() {
		let xoff = 0;
		landMinY = height / random(10, 20);
		landMaxY = height / random(1.3, 1.5);
		for (let i = 0; i < 3; i++) {
			beginShape();
			fill(landHue, landSat, landBright);

			for (let x = 0; x <= width + landscapeStep; x += landscapeStep) {
				let y = map(noise(xoff, yoff), 0, 1, landMaxY, landMinY);

				curveVertex(x, y);
				landMinY += 15;
				xoff += 0.04;
			}
			//landMinY += height / 7;
			landMaxY += height / 15;
			landHue += 5;
			landSat += 5;
			landBright -= 5;
			vertex(width, height / 1.3);
			vertex(width, height / 1.3);
			vertex(0, height / 1.3);
			vertex(0, height / 1.3);
			endShape(CLOSE);
		}
		yoff += 0.1;
	}

	function makeSky() {
		background(253, 20, 84);
		let xoff = 0;
		let skyAlpha = 30;
		for (let i = 0; i < 10; i++) {
			beginShape();
			fill(skyHue, skySat, skyBright, skyAlpha);
			for (let x = 0; x <= width + skyStep; x += skyStep) {
				let y = map(noise(xoff, yoff), 0, 1, skyMaxY, skyMinY);
				curveVertex(x, y);
				xoff += 0.001;
			}

			skyMinY += height / 10;
			skyMaxY += height / 8;
			skyHue -= 0.1;
			skySat += 5;
			skyBright += 5;
			skyAlpha += 5;
			vertex(width, height);
			vertex(0, height);
			endShape(CLOSE);
		}
		yoff += 0.1;
	}

	function makeWater() {
		//background(187, 34, 70);
		let xoff = 0;
		let waterAlpha = 100;
		for (let i = 0; i < 5; i++) {
			beginShape();
			fill(waterHue, waterSat, waterBright, waterAlpha);
			for (let x = 0; x <= width + waterStep; x += waterStep) {
				let y = map(noise(xoff, yoff), 0, 1, waterMaxY, waterMinY);
				curveVertex(x, y);
				xoff += 0.005;
			}
			waterMinY += height / 30;
			waterMaxY += height / 20;
			waterHue -= 2;
			waterSat += 5;
			waterBright += 5;
			vertex(width, height);
			vertex(0, height);
			endShape(CLOSE);
		}
		yoff += 0.1;
	}

	function createSun() {
		fill(358, 25, 100);
		ellipse(random(0, width), height / 2, width / 6, width / 6);
	}

	init();
	makeSky();
	createSun();
	createLandscape();
	makeWater();

	// Return a renderer, which is like p5.js 'draw' function
	return ({ p5, time, width, height }) => {
		// Draw with p5.js things
	};
}, settings);
