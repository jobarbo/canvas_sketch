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
  background(45, 5, 98);

  let margin = 0;
  let wSpacing = width;
  let hSpacing = height;
  let xoff = 0.6;
  let yoff = 0.001;
  let woff = 0.3;
  let initialX = width/2;
  let initialY = height/2;
  let wContainer = wSpacing / 1.5;
  let hContainer = hSpacing / 1.5;

  function paint() {

    for (let s = 0; s < wSpacing; s++) {

      let x = map(noise(xoff), 0, 1, wContainer, wContainer);
      let y = map(noise(yoff), 0, 1, hContainer, hContainer);
      let elW = map(noise(woff), 0, 1, 0, 10);

      let elHue = map(elW, 2, 8, 45, 0, true);
      let elSat = map(elW, 2, 8, 5, 75, true);
      let elBright = map(elW, 2, 8, 98, 10, true);
      let elAlpha = map(elW, 2, 8, 0, 100, true);

      noStroke();
      fill(elHue, elSat, elBright, elAlpha);
      ellipse(x, y, elW, elW);

      xoff += 0.1;
      yoff += 0.1;
      woff += 0.1;
    }
  }

  // Return a renderer, which is like p5.js 'draw' function
  return ({ p5, time, width, height }) => {
    // Draw with p5.js things
    woff = random(0, 1);
    yoff = random(0, 1);
    xoff = random(0, 1);

    paint();
  };
}, settings);

function debugGrid(ix, iy, wSpacing, hSpacing) {
  strokeWeight(5)
  stroke(0, 100, 100)
  noFill();
  rect(ix, iy, wSpacing, hSpacing)
}
