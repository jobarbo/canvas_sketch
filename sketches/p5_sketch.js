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

  let h = 255;
  let s = 100;
  let b = 60;

  let sizeRand;
  let opacityRand;
  let angle;


  colorMode(HSB,360,100,100);


  background(270,250,20);


  // Create random stars
  for (let starsCount = 0; starsCount < 350; starsCount = starsCount +1) {
    opacityRand = random(60, 200);
    sizeRand = random(1, 8);
    stroke(255, opacityRand);
    fill(255, opacityRand);
    ellipse(random(0, width), random(0, height), sizeRand, sizeRand);
  }

  noStroke();
  rectMode(CENTER);

  for (let i = height; i > 10; i = i - 800) {
    fill(h, s, b);
    push();
    translate(random(0, width), height);
    rotate(radians(45));
    rect(0, 0, 20-i, 20-i);
    pop();


    h = h + 3.15;
    s = s + 0;
    b = b + 10;

    h = constrain(h, 0, 350);
    s = constrain(s, 0, 100);
    b = constrain(b, 0, 100);
  }
  // Return a renderer, which is like p5.js 'draw' function
  return ({ p5, time, width, height }) => {
    // Draw with p5.js things


  };
}, settings);

