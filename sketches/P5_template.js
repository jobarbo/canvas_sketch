const canvasSketch = require('canvas-sketch');
const p5 = require('p5');
new p5();
const preload = p5 => {
  // You can use p5.loadImage() here, etc...
};

const settings = {
  // Pass the p5 instance, and preload function if necessary
  p5: true,
  dimensions: [ 800, 248 ],
  // Turn on a render loop
  animate: true
};

canvasSketch(() => {
  background(0);
  for(i=0;i<233;i++){
    stroke(255);
    point(random(0,800), random(0,248));
    console.log('hello')
  }
  // Return a renderer, which is like p5.js 'draw' function
  return ({ time, width, height,dimensions }) => {
    // Draw with p5.js things

    //background(0);
    fill(255);
    noStroke();

    const anim = sin(time - PI / 2) * 0.5 + 0.5;
    rect(0, 0, width * anim, height);
  };
}, settings);
