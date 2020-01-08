const canvasSketch = require('canvas-sketch');
const p5 = require('p5');
new p5();

const settings = {
  // Pass the p5 instance, and preload function if necessary
  p5: true,
  dimensions: [ 11, 17 ],
  //dimensions: 'a4',
  pixelsPerInch: 300,
  units: 'in',
  // Turn on a render loop
  animate: true
};

const preload = () => {
  // You can use p5.loadImage() here, etc...
};

canvasSketch(() => {
  // Return a renderer, which is like p5.js 'draw' function
  //background(0);
  let elX = (width/2)/settings.pixelsPerInch;
  let elY = (height/2)/settings.pixelsPerInch;
  return ({ p5, time, width, height }) => {
    // Draw with p5.js things
    background(0);

    //elX = elX + random(-0.05,0.05);
    //elY = elY + random(-0.05,0.05);

    fill(255,255);
    noStroke();

    const anim = sin(time - PI / 2) * 0.5 + 0.5;
    ellipse(elX, elY+anim, 0.1,0.1);
  };
}, settings);
