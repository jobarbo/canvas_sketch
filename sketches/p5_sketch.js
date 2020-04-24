const canvasSketch = require('canvas-sketch');
const p5 = require('p5');
new p5();

const settings = {
  // Pass the p5 instance, and preload function if necessary
  p5: true,
  dimensions: [ 30*300, 20*300 ],
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

  //blendMode(ADD);

  let y;
  let x = width/20;
  let y2;
  let x2 = width/20;
  let spacing = 100;
  let strokeW = 15;
  let strokeC1 = 3;
  let strokeC2 = 150;
  let strokeC3 = 166;
  let len = 300;
  let len2 = height/10;
  let endLegs;

  background(242,220,220);
  strokeCap(ROUND);

  y = (height/2);
  y2 = (height/2);
  endLegs = width - x;

  noFill();
  beginShape();
  curveVertex(x, y+len);
  while (x<=endLegs) {
    stroke(strokeC1, strokeC2, strokeC3);
    strokeWeight(strokeW);
    len = len + random(-15, 7);
    //curveVertex(x,y);
    //curveVertex(x, y+len);
    line(x, y, width/2, height/1.35);
    x = x + spacing;
  }
  curveVertex(x, y+len);
  endShape();
  beginShape();
  curveVertex(x2, y2-len2);
  while (x2 <= endLegs) {
    stroke(strokeC1, strokeC2, strokeC3);
    strokeWeight(strokeW);
    len2 = len2 + random(-50, 80);
    curveVertex(x2, y2-len2);
    line(x2, y2, x2, y2-len2);
    x2 = x2 + spacing;
  }
  curveVertex(x2, y2-len2);
  endShape();

  // Return a renderer, which is like p5.js 'draw' function
  return ({ p5, time, width, height }) => {
    // Draw with p5.js things


  };
}, settings);

