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
  colorMode(HSB, 360, 100, 100, 100);
  background(197, 95, 55);
  strokeWeight(60);
  stroke( 67, 1, 95);
  noFill();

  var margin = 500;
  var spacingY = 250;
  var spacingX = 500;

  // Initializing the array that will store all the points coordinate
  var coords = [];

  var deviation = 30;

  // initializing function that will store points in array
  function storeCoordinate(xVal, yVal, array) {
    array.push({x: xVal, y: yVal});
  }

  // Storing points in array
  for(h = margin; h <= height-margin; h+=spacingY){
    for(points = margin; points <= width-margin; points+=spacingX){
      storeCoordinate(points, randomGaussian(h, deviation), coords);

    }
    //deviation += 1;
    var totalCoords = coords.length-1;

    // path making function
    beginShape();
    curveVertex(coords[0].x,coords[0].y)
    for(i = 0; i<coords.length;i++){

      var ranNum = int(random(1,15));
      point(coords[i].x,coords[i].y);

      if(ranNum > 1){
        curveVertex(coords[i].x,coords[i].y);
      }else{
        curveVertex(coords[i].x,coords[i].y);
        curveVertex(coords[i].x,coords[i].y);
        endShape();
        beginShape();
      }

    }
    curveVertex(coords[totalCoords].x,coords[totalCoords].y)
    endShape();
    coords = [];
    console.log(deviation);
  }






  // Return a renderer, which is like p5.js 'draw' function
  return ({ p5, time, width, height }) => {
    // Draw with p5.js things


  };
}, settings);

