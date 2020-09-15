// Import sketch objects
const canvasSketch = require('canvas-sketch');
const p5 = require('p5');
new p5();
const horizontal = 12 * 300;
const vertical = 18 * 300;
// dimension 14 x 20 avec bleed

const settings = {
	// Pass the p5 instance, and preload function if necessary
	p5: true,
	dimensions: [horizontal, vertical],
	units: 'px',
	context: 'webgl',
	// bleed: 1 * 300,

	// pixelsPerInch: 72,

	// Turn on a render loop
	animate: true,
};
var theShader;

const preload = () => {
	theShader = loadShader('sketches/shader.vert', 'sketches/shader.frag');
};

preload();

canvasSketch((context, bleed, trimWidth, trimHeight) => {
	// Sketch setup
	// Like p5.js 'setup' function
	// Visualize the trim area with a yellow guide (ignored on export)

	// Return a renderer, which is like p5.js 'draw' function
	return ({ p5, time, width, height, context, exporting, bleed, trimWidth, trimHeight }) => {
		// Draw with p5.js things
		shader(theShader);
		theShader.setUniform('iResolution', [width, height]);
		theShader.setUniform('iFrame', frameCount);
		// rect gives us some geometry on the screen
		rect(0, 0, width, height);
	};
}, settings);
