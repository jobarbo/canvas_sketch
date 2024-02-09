const canvasSketch = require("canvas-sketch");
const p5 = require("p5");
new p5();

const settings = {
	// Pass the p5 instance, and preload function if necessary
	p5: true,
	dimensions: [8 * 300, 8 * 300],
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
	background(45, 5, 100);
	angleMode(DEGREES);

	let particle_num = 5000;

	let xoff = 0.6;
	let yoff = 0.001;
	let woff = 0.3;
	let xi = random(1000000000000);
	let yi = random(1000000000000);

	// Return a renderer, which is like p5.js 'draw' function
	return ({p5, time, width, height}) => {
		// Draw with p5.js things
		translate(width / 2, height / 2);

		//let angle = int(random([0, 45, 90]));
		//let angle = int(random([0, 45, 90, 180, 225, 270]));
		//let angle = int(random([0, 45, 90, 135, 180, 225, 270, 315]));
		let angle = 45;
		rotate(angle);
		paint(xoff, yoff, woff, particle_num, xi, yi);
	};
}, settings);

function paint(xoff, yoff, woff, particle_num, xi, yi) {
	for (let s = 0; s < particle_num; s++) {
		xoff = random(0, 1);
		yoff = random(0, 1);
		woff = random(0, 1);
		//noiseDetail(62, 0.45);
		//! Simple Block
		/* 		let x = map(noise(xoff), 0.1, 0.9, -width / 3, width / 3, true);
		let y = map(noise(yoff), 0.1, 0.9, -height / 3, height / 3, true); */
		//! Electron microscope
		/* let x = map(noise(xoff, yoff), 0.1, 0.9, -width / 3, width / 3, true);
		let y = map(noise(yoff, xoff), 0.1, 0.9, -height / 3, height / 3, true); */
		//!block Rect
		/* 		let x = map(noise(xoff, xoff, xi), 0.1, 0.9, -width / 3, width / 3, true);
		let y = map(noise(yoff, yoff, yi), 0.1, 0.9, -height / 3, height / 3, true); */

		//!Drapery Yin Yang
		/* 		let x = map(noise(xoff, yoff, xi), 0.1, 0.9, -width / 3, width / 3, true);
		let y = map(noise(xoff, yoff, yi), 0.1, 0.9, -height / 3, height / 3, true); */

		//!Drapery Equilibrium
		/* let x = map(noise(xoff, yoff, xi), 0.1, 0.9, -width / 3, width / 3, true);
		let y = map(noise(yoff, xoff, yi), 0.1, 0.9, -height / 3, height / 3, true); */

		//! Astral Beings
		let x = map(noise(xoff, random([xoff, yoff, yi])), 0.1, 0.9, -width / 3, width / 3, true);
		let y = map(noise(yoff, random([xoff, yoff, yi])), 0.1, 0.9, -height / 3, height / 3, true);

		//! Astral Beings 2
		/* 		let x = map(noise(xoff, random([xoff, yoff, xi])), 0.1, 0.9, -width / 3, width / 3, true);
		let y = map(noise(yoff, random([yoff, xoff, xi])), 0.1, 0.9, -height / 3, height / 3, true); */

		//! Astral Beings Asymmetrical
		/* 		let x = map(noise(xoff, random([xoff, yoff, xi])), 0.1, 0.9, -width / 3, width / 3, true);
		let y = map(noise(yoff, random([yoff, xoff, yi])), 0.1, 0.9, -height / 3, height / 3, true); */

		//! Hybrid Drapery Blocks
		/* let x = map(noise(xoff, random([xoff, xoff, yi])), 0.1, 0.9, -width / 3, width / 3, true);
		let y = map(noise(yoff, random([yoff, xoff, yi])), 0.1, 0.9, -height / 3, height / 3, true); */

		//!complex organism (aliens)
		/* 		let x = map(noise(xoff, yoff, random([yoff, xoff])), 0.1, 0.9, -width / 3, width / 3, true);
		let y = map(noise(yoff, xoff, random([yoff, xoff])), 0.1, 0.9, -height / 3, height / 3, true); */

		let elW = map(noise(woff), 0, 1, 0.1, 2);

		noStroke();
		stroke(190, 53, 89, 0);
		fill(0, 75, 10, 100);
		ellipse(x, y, elW, elW);

		xi += 0.00000000000000001;
		yi += 0.00000000000000001;
		woff += 0.1;
	}
}
