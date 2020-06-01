import canvasSketch from 'canvas-sketch';
import createShader from 'canvas-sketch-util/shader';
import glsl from 'glslify';

// Note that you need to install `glslify` and `canvas-sketch-util`
// separately from `canvas-sketch`

// Configuration
const width = 8,
	height = 6,
	pixelsPerInch = 300;

const resolution = [width * pixelsPerInch, height * pixelsPerInch];

const settings = {
	context: 'webgl',
	dimensions: [width, height],
	units: 'in',
	animate: true,
	pixelsPerInch: pixelsPerInch,
};

// glsl code
const frag = glsl`
#ifdef GL_ES
precision mediump float;
#endif

  uniform vec3      iResolution;           // viewport resolution (in pixels)
  uniform float     iTime;                 // shader playback time (in seconds)
  uniform float     iTimeDelta;            // render time (in seconds)
  uniform int       iFrame;                // shader playback frame
  uniform float     iChannelTime[4];       // channel playback time (in seconds)
  uniform vec3      iChannelResolution[4]; // channel resolution (in pixels)
  uniform vec4      iMouse;                // mouse pixel coords. xy: current (if MLB down), zw: click
  uniform vec4      iDate;                 // (year, month, day, time in seconds)
  uniform float     iSampleRate;           // sound sample rate (i.e., 44100)

float plasma(vec2 uv, float t) {
  // these are just random values with time added (I'm not sure if I actually need this many)
  vec2 p0 = vec2(0.23 + t, 0.76 - 0.4 * t);
  vec2 p1 = vec2(-0.77 + 0.1 * t, 0.11 + 0.7 * t);
  vec2 p2 = vec2(0.63 - 0.3 * t, 0.26 + 0.2 * t);
  vec2 p3 = vec2(-0.47 - 0.55 * t, 0.91 - 0.35 * t);
  float a = 2.0;
  // here is the formula
  float grey = dot(sin(p0 + uv + a * sin(p1 + 1.6 * uv.yx)), sin(p2 + 1.4 * uv.yx + a * sin(p3 + 1.2 * uv)));
  return 0.5 + grey * 0.25;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
  // Normalized pixel coordinates (from 0 to 1)
  vec2 uv = fragCoord/iResolution.xy;
  // Time varying pixel color
  uv *= 4.0;
  vec3 col = vec3(plasma(uv, 0.0 + iTime), plasma(uv, 0.3 + iTime), plasma(uv, 0.6 + iTime));
  // Output to screen
  fragColor = vec4(col,1.0);
}
`;

// Drawing
// Uniforms are passed to your shaders here in the `uniforms` parameter.
const sketch = ({ gl }) => {
	return createShader({
		gl,
		frag,
		uniforms: {
			time: ({ time }) => time,
			resolution: resolution,
		},
	});
};

canvasSketch(sketch, settings);
