const canvasSketch = require('canvas-sketch');
const p5 = require('p5');
new p5();
const preload = p5 => {
  // You can use p5.loadImage() here, etc...
};

const settings = {
  // Pass the p5 instance, and preload function if necessary
  p5: true,
  //dimensions: [ 800, 800 ],
  dimensions: 'a4',
  pixelsPerInch: 300,
  units: 'in',
  // Turn on a render loop
  animate: true
};

canvasSketch(() => {
  colorMode(HSB,360,100,100,100);
  rectMode(CENTER);
  background(255);

  const rectWidth = width/36;
  const spacing = width/24;
  let saturation = 100;
  let brightness = 10;

  for( x = spacing; x < width; x += spacing){
    let hue = random(0,360);
    for(y=spacing;y<height;y+=spacing){
      stroke(hue,saturation,brightness);
      fill(hue,saturation,brightness);
      ellipse(x,y,rectWidth,rectWidth);
      hue+=10;
      if(hue>=360 ){
        hue = 0;
      }
    }
  }

  for(lineNum = 0;lineNum < 60;lineNum++){
    let randomX = random(0,width);
    let randomY = random(0,height);
    let diffX = random(-randomX,randomX);
    let diffY = random(-randomY,randomY);
    strokeWeight(random(5,10));
    strokeCap(round);
    stroke(360)
    line(randomX,randomY,randomX+diffX,randomY+diffY);
  }
  // Return a renderer, which is like p5.js 'draw' function
  return ({ time, width, height,dimensions }) => {
    // Draw with p5.js things
  };
}, settings);
