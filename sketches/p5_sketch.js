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

  let y;
  let x = 0;
  let y2;
  let x2 = 0;
  let spacing = 680;
  let strokeW = 3;

  let len = 300;
  let len2 = height/2;
  let endLegs;

  let rad;

  let posX;
  let posY;
  let resolution = 150;

  let iteration = 0;
  let limit = 1;

  let time = 0;
  let timeChange = 0.2;

  let noiseVal;
  let noiseletensity = 0.8;
  let noiseAmplitude = 1.5;

  let sunHue = 0;
  let sunSat = 9;
  let sunBright = 95;
  let sunAlpha = 20;

  let waveHue = 186;
  let waveSat = 70;
  let waveBright = 65;

  colorMode(HSB, 360, 100, 100);
  background(0, 9, 94);
  strokeCap(ROUND);

  while (iteration < limit) {
    posX = width/1.1;
    posY = height/1.4;
    rad = random(height, height*1.2);

    for (let i=rad; i>0; i= i - rad/8) {
      drawSun(i, posX, posY);
    }
    iteration++;
  }

  y = (height*1.1);
  y2 = (height*1.1);
  endLegs = width+spacing;
  for (let i=0; i<=3; i++) {
    createWave();
    y2 = y2 + height/10;
  }

  function createWave() {
    x2 = 0;
    fill(waveHue, waveSat, waveBright);
    beginShape();
    curveVertex(x2, y2-len2);
    while (x2<=endLegs) {
      stroke(waveHue, waveSat, waveBright);
      strokeWeight(strokeW);
      len2 = len2 + random(-80, 80);
      curveVertex(x2, y2-len2);
      x2 = x2 + spacing;
    }
    curveVertex(x2, y2-len2);
    vertex(width, height);
    vertex(0, height);
    endShape(CLOSE);

    waveHue = waveHue+5;
    waveSat = waveSat+5;
  }

  function drawSun( radius,  posX,  posY) {
    noStroke();
    fill(sunHue, sunSat, sunBright, sunAlpha);
    push();
    translate( posX, posY);
    strokeJoin(ROUND);
    beginShape();
    time = time + timeChange;
    for (let a = 0; a < TWO_PI; a+=TWO_PI/resolution) {
      let noiseVal = map(noise(cos(a)*noiseletensity+1, sin(a)*noiseletensity+1, time), 0, 1, noiseAmplitude, 1.0);
      let r = radius + noiseVal;
      let x = cos(a) * r * noiseVal;
      let y = sin(a) * r * noiseVal;
      curveVertex(x, y);
    }
    endShape(CLOSE);
    pop();
    sunHue = sunHue +1 ;
    sunBright = sunBright + 8;
    sunSat = sunSat + 5;
    sunAlpha = sunAlpha + 6;
  }

  // Return a renderer, which is like p5.js 'draw' function
  return ({ p5, time, width, height }) => {
    // Draw with p5.js things


  };
}, settings);

