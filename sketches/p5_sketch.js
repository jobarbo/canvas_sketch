const canvasSketch = require('canvas-sketch');
const p5 = require('p5');
new p5();

const settings = {
  // Pass the p5 instance, and preload function if necessary
  p5: true,
  dimensions: [ 12*300, 12*300 ],
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
  colorMode(HSB, 360, 100, 100, 100);
  background(60,5,95);
  strokeWeight(30);
  noFill();

  // Initializing the array that will store all the points coordinate
  var coords = [];

  function storeCoordinate(xVal, yVal, array) {
    array.push({x: xVal, y: yVal});
  }

  for(points = 150; points <= width-150; points+=150){
    storeCoordinate(points, randomGaussian(height/2, 60), coords);
  }
  var totalCoords = coords.length-1;

  beginShape();
  curveVertex(coords[0].x,coords[0].y)
  for(i = 0; i<coords.length;i++){
    point(coords[i].x,coords[i].y);
    curveVertex(coords[i].x,coords[i].y)
  }
  curveVertex(coords[totalCoords].x,coords[totalCoords].y)
  endShape();


  // Return a renderer, which is like p5.js 'draw' function
  return ({ p5, time, width, height }) => {
    // Draw with p5.js things


  };
}, settings);

