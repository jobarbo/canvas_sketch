const canvasSketch = require('canvas-sketch');
const p5 = require('p5');
new p5();

const settings = {
  // Pass the p5 instance, and preload function if necessary
  p5: true,
  dimensions: [ 12*300, 12*300 ],
  //pixelsPerInch: 72,
  units: 'px',
  // Turn on a render loop
  animate: false
};

const preload = () => {
  // You can use p5.loadImage() here, etc...

};

canvasSketch((context) => {
  // Sketch setup
  // Like p5.js 'setup' function

  // Set the color mode
  colorMode(HSB, 360, 100, 100, 100);
  blendMode(ADD);
  background(10);
  let spacing = width/5;
  let margin = width/10;
  let xoff = 0;
  let yoff = 1;
  let hoff = 0;
  let container = spacing/4;


  for(let ix = margin; ix <= (width-margin); ix = ix + spacing){
    //noFill();
    //stroke(0);
    for(let iy = margin; iy <= (height-margin); iy = iy + spacing){
      for(let s = 0; s < spacing; s++){
        let x = map(noise(xoff),0,1,ix-container,ix+container);
        let y = map(noise(yoff),0,1,iy-container,iy+container);
        let hue = map(noise(hoff),0,1,0,360);

        noStroke();
        //stroke(0,0,0)
        fill(48,56,83,10)
        ellipse(x,y,7,7);

        xoff += 0.2;
        yoff += 0.001;
        hoff += 0.01;
      }
    }
  }

  // Return a renderer, which is like p5.js 'draw' function
  return ({ p5, time, width, height }) => {
    // Draw with p5.js things


  };
}, settings);
