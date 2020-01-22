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
  let margin = width/5;
  let spacing = width-margin;
  let xoff = 0;
  let yoff = 0.1;
  let hoff = 0.2;
  let woff = 0.2;
  let container = spacing/2;

  for(let i=0; i<2000;i++){
    let starAlpha = random(10,50);
    stroke(48,56,83,starAlpha);
    strokeWeight(random(5,10));
    point(random(width),random(height))
  }

  for(let ix = margin/2; ix < (width-margin); ix = ix + spacing){
    //noFill();
    //stroke(0);
    for(let iy = margin/2; iy < (height-margin); iy = iy + spacing){
      //strokeWeight(5)
      //stroke(0,100,100)
      //noFill();
      //rect(ix,iy,spacing,spacing)
      cx = ix+(spacing/2);
      cy = iy+(spacing/2);

      for(let s = 0; s < 50000; s++){
        let x = map(noise(xoff),0,1,cx-container,cx+container);
        let y = map(noise(yoff),0,1,cy-container,cy+container);
        //let elW = map(noise(woff),0,1,7,10);
        let elW =  map(abs(x-width/2), 0, width/2, 0, 30)
        let hue = map(noise(hoff),0,1,0,360);

        noStroke();
        //stroke(0,0,0)
        fill(48,56,83,20)
        ellipse(x,y,elW,elW);

        xoff += 0.1;
        yoff += 0.1;
        hoff += 0.01;
        woff += 0.01;
      }
    }
  }

  // Return a renderer, which is like p5.js 'draw' function
  return ({ p5, time, width, height }) => {
    // Draw with p5.js things


  };
}, settings);
