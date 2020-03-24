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
  background(137,20,99);

  let margin = 0;
  let wSpacing = width;
  let hSpacing = height;
  let xoff = 0.8;
  let yoff = 0.01;
  let woff = 0.3;
  let lenYOff = 0.002;
  let lenXOff = 0.2;
  let minLen = 0;
  let maxLen = 200;
  let minW = 1;
  let maxW = 6;
  let wContainer = wSpacing;
  let hContainer = hSpacing;

  function paint() {

    let x = map(noise(xoff), 0, 1, margin, wContainer);
    let y = map(noise(yoff), 0, 1, margin, hContainer);
    let lenX = map(noise(lenXOff), 0, 1, minLen, maxLen);
    let lenY = map(noise(lenYOff), 0, 1, minLen, maxLen);
    let elW = map(noise(woff), 0, 1, minW, maxW);

    let elHue = map(elW, minW, maxW, 69, 89, true);
    let elSat = map(elW, minW, maxW, 49, 69, true);
    let elBright = map(elW, minW, maxW, 71, 91, true);
    let elAlpha = map(elW, minW, maxW, 0, 30, true);

    //noStroke();
    noFill();
    strokeWeight(elW)
    stroke(elHue, elSat, elBright, elAlpha);
    line(x, y,x+lenX,y+lenY);


    xoff += 0.0002;
    yoff += 0.0001;
    lenYOff += 0.004;
    lenXOff += 0.003;
    woff += 0.005;
  }

  for (let index = 0; index < 40000; index++) {

    paint();
  }

  // Return a renderer, which is like p5.js 'draw' function
  return ({ p5, time, width, height }) => {
    // Draw with p5.js things
    //paint();
  };
}, settings);

function debugGrid(ix, iy, wSpacing, hSpacing) {
  strokeWeight(5)
  stroke(0, 100, 100)
  noFill();
  rect(ix, iy, wSpacing, hSpacing)
}
