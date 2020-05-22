const canvasSketch = require('canvas-sketch');
const p5 = require('p5');
new p5();
const horizontal = 12*300;
const vertical =  12*300;

const settings = {
  // Pass the p5 instance, and preload function if necessary
  p5: true,
  dimensions: [ horizontal, vertical ],
  units: 'px',
  bleed: horizontal / 8,
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


  //blendMode(ADD);
  colorMode(HSB, 360, 100, 100, 100);
  background(60,5,95);

  bug = new Dot();

  // Return a renderer, which is like p5.js 'draw' function
  return ({ p5, time, width, height }) => {
    // Draw with p5.js things

    bug.move();
    bug.display();

  };
}, settings);
class Dot {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.diameter = random(150, 180);
    this.speed = 20;
  }
  move() {
    this.x += random(-this.speed, this.speed);
    this.y += random(-this.speed, this.speed);
  }

  display() {
    stroke(60,5,95);
    fill(0,0,0,100)
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}

