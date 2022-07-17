const canvasSketch = require('canvas-sketch');

// Grab P5.js from npm
const p5 = require('p5');

// Attach p5.js it to global scope
new p5();
const horizontal = 12 * 300;
const vertical = 18 * 300;

const settings = {
	// Tell canvas-sketch we're using p5.js
	p5: true,

	// Turn on a render loop (it's off by default in canvas-sketch)
	animate: true,
	dimensions: [horizontal, vertical],
	units: 'px',
	p5: true,
	// We can specify WebGL context if we want
	//context: 'webgl',
	// Optional loop duration
	// duration: 6,
	// Enable MSAA
	attributes: {
		antialias: true,
	},
};

// Optionally preload before you load the sketch
window.preload = () => {
	// Preload sounds/images/etc...
};

canvasSketch(() => {
	// Inside this is a bit like p5.js 'setup' function
	// ...
	// chose a nice background color
	colorMode(HSB, 360, 100, 100, 100);
	background(0, 0, 95);

	let stamps = [];
	// create new stamps objects with a random position and size and a random color
	for (let i = 0; i < 500; i++) {
		const x = random(horizontal);
		const y = random(vertical);
		const size = random(100);
		const hue = random(360);
		const saturation = random(100);
		const brightness = random(100);
		const speed = random(50);
		stamps[i] = new Stamp(x, y, size, hue, saturation, brightness, speed);
	}

	// Attach events to window to receive them
	window.mouseClicked = () => {
		console.log('Mouse clicked');
	};

	// Return a renderer to 'draw' the p5.js content
	return ({playhead, width, height}) => {
		// Draw with p5.js things
		// make an ellipse randomly walk around the screen
		for (let i = 0; i < stamps.length; i++) {
			// draw the stamp
			stamps[i].draw();

			// move the stamp
			stamps[i].move();
		}
	};
}, settings);

// create an stamp class
class Stamp {
	constructor(x, y, size, hue, saturation, brightness, speed) {
		this.x = x;
		this.y = y;
		this.size = size;
		this.speed = speed;
		this.hue = hue;
		this.saturation = saturation;
		this.brightness = brightness;
		console.log(this.speed);
	}

	move() {
		// move the ellipse
		this.x += random(-this.speed, this.speed);
		this.y += random(-this.speed, this.speed);

		// make the ellipse bounce off the walls
		if (this.x < 0) {
			this.x = 0;
		}
		if (this.x > horizontal) {
			this.x = horizontal;
		}
		if (this.y < 0) {
			this.y = 0;
		}
		if (this.y > vertical) {
			this.y = vertical;
		}
	}

	draw() {
		// draw the ellipse
		fill(this.hue, this.saturation, this.brightness);
		ellipse(this.x, this.y, this.size, this.size);
		// draw a line from the center of the screen to the mouse
		stroke(this.hue, this.saturation, this.brightness);
		line(width / 2, height / 2, mouseX, mouseY);

		// draw a line from the center of the screen to the center of the ellipse
		stroke(this.hue, this.saturation, this.brightness);
		line(width / 2, height / 2, this.x, this.y);
	}
}
