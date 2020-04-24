const canvasSketch = require('canvas-sketch');
const p5 = require('p5');
new p5();

const settings = {
  // Pass the p5 instance, and preload function if necessary
  p5: true,
  dimensions: [ 12*300, 18*300 ],
  units: 'px',
  //pixelsPerInch: 72,

  // Turn on a render loop
  animate: false
};

const preload = () => {
  // You can use p5.loadImage() here, etc...

};

canvasSketch((context) => {
  // Sketch setup
  // Like p5.js 'setup' function

  let yoff = 0.0; // 2nd dimension of perlin noise
  let minY = height/2;
  let maxY = height/1.8;
  let h = 209;
  let s = 34;
  let b = 77;
  let vertexStep = 20;

  colorMode(HSB,360,100,100,100);

  // Return a renderer, which is like p5.js 'draw' function
  return ({ p5, time, width, height }) => {
    // Draw with p5.js things

    createLandscape(yoff,minY,maxY,h,s,b,vertexStep);
    createSun();

  };
}, settings);

function createLandscape(yoff,minY,maxY,h,s,b,vertexStep) {

  background(202, 12, 92);
  noStroke();

  // We are going to draw a polygon out of the wave points

  let xoff = 0; // Option #1: 2D Noise

  // Iterate over horizontal pixels
  for (let i = 0; i < 4; i++) {
    beginShape();
    fill(h,s,b);
    for (let x = 0; x <= width+vertexStep; x += vertexStep) {

      let y = map(noise(xoff, yoff), 0, 1, maxY, minY);

      // Set the vertex
      curveVertex(x, y);

      // Increment x dimension for noise
      xoff += 0.008;
    }
    minY += height/8;
    maxY += height/8;
    h += 5;
    s += 5;
    b -= 5
    curveVertex(width, height);
    curveVertex(0, height);
    endShape(CLOSE);

  }

  // increment y dimension for noise
  yoff += 0.1;

}

function createSun() {
  fill( 39, 44, 95);
  ellipse(width/4,height/6,width/4,width/4);
}
