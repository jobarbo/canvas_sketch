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

  let h = 167;
  let s = 99;
  let b = 76;

  let h2 = 15;
  let s2 = 60;
  let b2 = 90;

  let sizeRand;
  let opacityRand;
  let angle;

  colorMode(HSB, 360, 100, 100);

  background(63, 22, 95);

  // Create random stars
  for (let starsCount = 0; starsCount < 350; starsCount = starsCount +1) {
    opacityRand = random(60, 200);
    sizeRand = random(1, 3);
    //stroke(255, opacityRand);
    //fill(255, opacityRand);
    //ellipse(random(0, width), random(0, height), sizeRand, sizeRand);
  }

  noStroke();
  rectMode(CENTER);

  for (let i = width/1.5; i > 30; i = i - 400) {
    fill(h2, s2, b2);

    ellipse(width-100, 100, 60-i, 60-i);
    //rotate(radians(0.1));
    //translate(0,50);
    h2 = h2 + 4.5;
    //s2 = s2 + 50;
    //b2 = b2 + 20;

    h2 = constrain(h2, 0, 250);
    s2 = constrain(s2, 0, 100);
    b2 = constrain(b2, 0, 100);
  }

  for (let i = height; i > 20; i = i - 600) {
    fill(h, s, b);
    push();
    translate(random(0, width), height);
    rotate(radians(45));
    rect(0, 0, 20-i, 20-i);
    pop();

    h = h + 0.55;
    s = s + 0;
    b = b - 3;

    h = constrain(h, 0, 350);
    s = constrain(s, 0, 100);
    b = constrain(b, 0, 100);
  }

  // Return a renderer, which is like p5.js 'draw' function
  return ({ p5, time, width, height }) => {
    // Draw with p5.js things


  };
}, settings);

