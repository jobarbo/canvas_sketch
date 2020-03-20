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
  animate: true
};

const preload = () => {
  // You can use p5.loadImage() here, etc...

};

canvasSketch((context) => {
  // Sketch setup
  // Like p5.js 'setup' function

  blendMode(BLEND);
  colorMode(HSB, 360, 100, 100, 100);
  background(45, 5, 0);

  let margin = 0;
  let wSpacing = width;
  let hSpacing = height;
  let xoff = 0.1;
  let yoff = 0.4;
  let woff = 0.03;
  let minW = 2;
  let maxW = 15;
  let wContainer = wSpacing;
  let hContainer = hSpacing;

  function paint() {

    let x = map(noise(xoff), 0, 1, margin, wContainer);
    let y = map(noise(yoff), 0, 1, margin, hContainer);
    let elW = map(noise(woff), 0, 1, minW, maxW);

    let elHue = map(elW, minW, maxW, 0, 45, true);
    let elSat = map(elW, minW, maxW, 0, 5, true);
    let elBright = map(elW, minW, maxW, 0, 100, true);
    let elAlpha = map(elW, minW, maxW, 50, 100, true);

    noStroke();
    fill(elHue, elSat, elBright, elAlpha);
    ellipse(x, y, elW, elW);

    xoff += 0.1;
    yoff += 0.01;
    woff += 0.05;
  }

  // Return a renderer, which is like p5.js 'draw' function
  return ({ p5, time, width, height }) => {
    // Draw with p5.js things
    paint();
  };
}, settings);

function debugGrid(ix, iy, wSpacing, hSpacing) {
  strokeWeight(5)
  stroke(0, 100, 100)
  noFill();
  rect(ix, iy, wSpacing, hSpacing)
}
