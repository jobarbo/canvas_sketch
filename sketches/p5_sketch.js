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
  let hillY;
  let hillX = 0;
  let hillY2;
  let hillX2 = 0;

  let waveSpacing;
  let waveY;
  let waveX = 0;
  let waveY2;
  let waveX2 = 0;
  let waveLen = 300;
  let waveLen2 = height/2;

  let hillSpacing = 5;
  let hillC1 = 15;
  let hillC2 = 50;
  let hillC3 = 50;
  let hillLen = 300;
  let hillLen2 = height/2;

  let hillEnd;
  let waveEnd;

  let strokeW = 3;
  let rad;

  let posX;
  let posY;
  let resolution = 150;

  let iteration = 0;
  let limit = 1;

  let time = 0;
  let timeChange = 0.2;

  let noiseVal;
  let noiseIntensity = 0.8;
  let noiseAmplitude = 1.5;

  let sunHue = 4;
  let sunSat = 65;
  let sunBright = 60;
  let sunAlpha = 30;

  let waveHue = 45;
  let waveSat = 40;
  let waveBright = 85;

  colorMode(HSB, 360, 100, 100);
  background(200, 20, 80);
  strokeCap(ROUND);

  hillSpacing = width/20;
  waveSpacing = width/20;

  while (iteration < limit) {
    posX = width/1.4;
    posY = height/1.4;
    rad = random(height, height+50);
    for (let i = rad; i > 0; i = i - rad/40) {
      drawSun(i, posX, posY);
      sunHue = sunHue +1 ;
      sunBright = sunBright + 1;
      sunSat = sunSat + 1;
      sunAlpha = sunAlpha + 1;
    }
    iteration++;
    sunHue = 22;
    sunBright = 95;
    sunSat = 88;
    sunAlpha = 50;
  }

  hillY = (height/1.16 );
  hillY2 = (height/1.16);
  hillEnd = width+hillSpacing;
  for ( let i = 0; i <= 10; i++) {
    createHills();
    hillC3 = hillC3-5;
    hillC2 = hillC2+7;
    hillC1 = hillC1-5;
    hillY2 = hillY2 + height/15;
  }

  waveY = (height*1.2);
  waveY2 = (height*1.2);
  waveEnd = width+waveSpacing;
  for (let i=0; i<=3; i++) {
    createWave();
    waveY2 = waveY2 + height/15;
  }


  function createHills() {
    hillX2 = 0;
    fill(hillC1, hillC2, hillC3);
    beginShape();
    curveVertex(hillX2, hillY2-hillLen2);
    while (hillX2<=hillEnd) {
      stroke(hillC1, hillC2, hillC3);
      strokeWeight(strokeW);
      hillLen2 = hillLen2 + random(-100, 100);
      curveVertex(hillX2, hillY2-hillLen2);
      hillX2 = hillX2 + hillSpacing;
    }
    curveVertex(hillX2, hillY2-hillLen2);
    vertex(width, height);
    vertex(0, height);
    endShape(CLOSE);
  }

  function createWave() {
    waveX2 = 0;
    fill(waveHue, waveSat, waveBright);
    beginShape();
    curveVertex(waveX2, waveY2-waveLen2);
    while (waveX2<=waveEnd) {
      stroke(waveHue, waveSat, waveBright);
      strokeWeight(strokeW);
      waveLen2 = waveLen2 + random(-15, 15);
      curveVertex(waveX2, waveY2-waveLen2);
      waveX2 = waveX2 + waveSpacing;
    }
    curveVertex(waveX2, waveY2-waveLen2);
    vertex(width, height);
    vertex(0, height);
    endShape(CLOSE);

    waveHue = waveHue-5;
    waveSat = waveSat+5;
    waveBright = waveBright-10;
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
      let noiseVal = map(noise(cos(a)*noiseIntensity+1, sin(a)*noiseIntensity+1, time), 0, 1, noiseAmplitude, 1.0);
      let r = radius + noiseVal;
      let x = cos(a) * r * noiseVal;
      let y = sin(a) * r * noiseVal;
      curveVertex(x, y);
    }
    endShape(CLOSE);
    pop();
  }

  // Return a renderer, which is like p5.js 'draw' function
  return ({ p5, time, width, height }) => {
    // Draw with p5.js things


  };
}, settings);

